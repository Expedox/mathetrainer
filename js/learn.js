// A practice round in one of three modes:
//   write  – type the result (numbers, fractions, terms)
//   choice – pick the right result out of four (wrong options are typical mistakes)
//   speed  – Blitzrechnen: as many as possible in 60 seconds
// Tasks of kind 'pick' (<, >, =, ja/nein) are always buttons.
// A wrong answer shows why it is wrong and the worked solution, saves the task
// in the mistake book and brings a similar fresh task a little later.

import * as db from './db.js';
import * as srs from './srs.js';
import * as mistakes from './mistakes.js';
import { esc } from './util.js';
import { makeTask, SKILLS } from './skills.js';
import { check, options, solution, shuffle } from './math.js';
import { lessonFor, lessonHtml } from './lessons/index.js';
import { canSpeak, speak } from './speech.js';
import { whyHtml } from './why/index.js';

export const MODES = [
  { id: 'write', name: 'Eintippen', icon: '✍️', hint: 'Ergebnis selbst eintippen' },
  { id: 'choice', name: 'Auswählen', icon: '🔘', hint: 'Richtiges Ergebnis antippen' },
  { id: 'speed', name: 'Blitzrechnen', icon: '⚡', hint: '60 Sekunden, so viele wie möglich' },
];

const SPEED_SECONDS = 60;
const MAX_EXTRA = 5;

const PRAISE = {
  kids: ['Super! 🌟', 'Toll gemacht! 🎉', 'Spitze! 🦁', 'Klasse! 🚀', 'Wow! 🌈'],
  teen: ['Stark!', 'Perfekt!', 'Sehr gut!', 'Gut gemacht!', 'Weiter so!'],
  adult: ['Gut gemacht.', 'Sauber.', 'Weiter so.'],
};
const CHEER = {
  kids: ['Richtig! ⭐', 'Juhu! 🎈', 'Genau! 👍', 'Super! ✨'],
  teen: ['Richtig!', 'Genau!', 'Passt!', '👍'],
  adult: ['Richtig.', 'Korrekt.'],
};
const COMFORT = {
  kids: ['Nicht schlimm, schau mal:', 'Fast! So geht es:'],
  teen: ['Knapp daneben. So geht es:', 'Nicht ganz. Schau mal:'],
  adult: ['Nicht richtig. Lösungsweg:'],
};

const pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)];
const theme = () => document.body.dataset.theme;

function confetti(host) {
  if (theme() === 'adult' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#ff8a3d', '#ffb703', '#3fae5a', '#5b5bf0', '#e5534b', '#4fd1c5'];
  const box = document.createElement('div');
  box.className = 'confetti';
  box.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 40; i++) {
    const s = document.createElement('i');
    s.style.left = `${Math.random() * 100}%`;
    s.style.background = colors[i % colors.length];
    s.style.animationDelay = `${Math.random() * 0.4}s`;
    box.append(s);
  }
  host.append(box);
  setTimeout(() => box.remove(), 2500);
}

// Solution with unit, as shown in feedback and the mistake book.
export const solutionHtml = (task) => `${solution(task)}${task.unit && !task.show ? ` ${esc(task.unit)}` : ''}`;
export const stepsHtml = (task) => (task.steps?.length ? `<ol class="steps">${task.steps.map((s) => `<li>${s}</li>`).join('')}</ol>` : '');

// Extra keys the phone keyboard hides or makes hard to reach.
function extraKeys(task) {
  if (task.kind === 'expr' || task.kind === 'anti') return ['x', '²', '^', '(', ')', '−', '/'];
  if (task.kind === 'frac') return ['/', '−'];
  if (['pair', 'set'].includes(task.kind)) return [';', '−'];
  if (task.kind === 'rest') return ['R'];
  if (task.kind === 'num' && (task.value < 0 || task.traps?.some((t) => t.v < 0))) return ['−', ','];
  return [];
}

function inputMode(task) {
  if (task.kind !== 'num') return 'text';
  if (task.value < 0 || task.traps?.some((t) => t.v < 0)) return 'text';
  return Number.isInteger(task.value) && !task.tol ? 'numeric' : 'decimal';
}

/**
 * opts: { profile, plan: [{ skill, topicId }], retry: [mistake rows], mode, label,
 *         exam, topicId, onExit(), onFinish({ total, missed, missedIds }) → Promise<html> }
 */
export async function runSession(view, opts) {
  const { profile, onExit } = opts;
  const retry = opts.retry ?? null;
  // Blitzrechnen only with quick skills; without any it falls back to typing.
  const quick = (opts.plan ?? []).filter((p) => SKILLS[p.skill]?.quick);
  const mode = opts.mode === 'speed' && !opts.exam && !retry && quick.length ? 'speed' : opts.mode === 'speed' ? 'write' : opts.mode;
  const queue = retry ? retry.map((m) => ({ skill: m.skill, topicId: m.topicId, task: m.task, mistakeId: m.id })) : (opts.plan ?? []).map((p) => ({ ...p }));
  if (!queue.length) {
    view.innerHTML = '<p class="empty">Keine Aufgaben für diese Runde.</p>';
    return;
  }
  const skillIds = [...new Set(queue.map((q) => q.skill))];
  const progress = await srs.progressMap(profile.id, skillIds.map((id) => ({ id })));
  const session = srs.newSession(profile.id, opts.topicId ?? null, mode);
  if (opts.label) session.label = opts.label;

  let total = mode === 'speed' ? 0 : queue.length;
  let done = 0; let right = 0; let extra = 0;
  const missedSkills = new Set();
  const saved = [];
  let answered = false; let busy = false; let keys = {};
  let deadline = 0; let timer = null;

  function frame(inner) {
    const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    view.innerHTML = `
      <div class="learn">
        ${mode === 'speed' ? `<div class="speed-bar"><span class="clock">⚡ ${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}</span><span>${right} richtig</span></div>
          <div class="progress"><div class="bar" style="width:${(left / SPEED_SECONDS) * 100}%"></div></div>`
        : `<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}"><div class="bar" style="width:${(done / total) * 100}%"></div></div>
        <p class="counter">${opts.exam ? `Frage ${Math.min(done + 1, total)} von ${total}` : `Aufgabe ${Math.min(done + 1, total)} von ${total}${missedSkills.size ? ` · ${saved.length} im Fehlerheft` : ''}`}</p>`}
        ${inner}
      </div>`;
  }

  function render() {
    answered = false;
    const item = queue[0];
    item.task ??= makeTask(item.skill, item.topicId);
    const t = item.task;
    if (mode === 'choice' || t.kind === 'pick') renderChoice(t);
    else renderWrite(t);
  }

  // "= ?" only after a bare calculation, not after a question or instruction.
  const bare = (t) => t.kind !== 'pick' && !/▢|\?/.test(t.q) && !/[A-Za-zÄÖÜäöüß]{3,}/.test(t.q.replace(/<[^>]+>/g, ''));
  // Young kids get a read-aloud button on every task.
  const readOut = profile.grade <= 4 && canSpeak();
  const prompt = (t) => `<div class="prompt-card math">${readOut ? `<button class="speak" type="button" data-say="${encodeURIComponent(t.q + (bare(t) ? ' = ?' : ''))}" aria-label="Vorlesen">🔊</button>` : ''}<span class="task">${t.q}</span>${bare(t) ? '<span class="eq"> = ?</span>' : ''}</div>`;

  // The topic's explanation as an overlay, so the round keeps going afterwards.
  function showLesson(topicId) {
    const l = lessonFor(topicId);
    if (!l) return;
    const dlg = document.createElement('dialog');
    dlg.className = 'lesson-dialog';
    dlg.innerHTML = `<div class="lesson">${lessonHtml(l, { speakAll: profile.grade <= 4 })}</div><form method="dialog" class="dialog-close"><button class="btn primary">Zurück zur Aufgabe</button></form>`;
    document.body.append(dlg);
    dlg.addEventListener('close', () => { speechSynthesis?.cancel?.(); dlg.remove(); });
    dlg.showModal();
  }

  function renderChoice(t) {
    const opts2 = options(t);
    frame(`${prompt(t)}
      <div class="options${t.kind === 'pick' && opts2.length === 3 ? ' three' : ''}">
        ${opts2.map((o, i) => `<button class="btn option" data-i="${i}">${o.html}</button>`).join('')}
      </div>
      <div class="feedback" hidden></div>`);
    const choose = (btn) => {
      if (answered) return;
      const o = opts2[Number(btn.dataset.i)];
      const res = check(t, o.raw);
      view.querySelectorAll('.option').forEach((b) => {
        b.disabled = true;
        if (check(t, opts2[Number(b.dataset.i)].raw).ok) b.classList.add('is-right');
      });
      if (!res.ok) btn.classList.add('is-wrong');
      feedback(t, res, o.raw, o.html);
    };
    view.querySelectorAll('.option').forEach((b) => { b.onclick = () => choose(b); });
    keys = { pick: (n) => { const b = view.querySelectorAll('.option')[n]; if (b) choose(b); } };
  }

  function renderWrite(t) {
    const extras = extraKeys(t);
    frame(`${prompt(t)}
      <form class="write-form" autocomplete="off">
        <div class="input-row">
          <input class="write-input" name="answer" inputmode="${inputMode(t)}" placeholder="${esc(t.placeholder ?? 'Ergebnis')}" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" aria-label="Ergebnis">
          ${t.unit ? `<span class="unit">${esc(t.unit)}</span>` : ''}
        </div>
        ${extras.length ? `<div class="extra-keys">${extras.map((k) => `<button type="button" class="key-btn" data-k="${esc(k)}">${esc(k)}</button>`).join('')}</div>` : ''}
        <p class="tip" hidden></p>
        <div class="row">
          ${mode === 'speed' || opts.exam ? '' : '<button type="button" class="btn" id="tip" aria-label="Tipp">💡</button>'}
          ${mode === 'speed' ? '' : '<button type="button" class="btn" id="giveup">Weiß ich nicht</button>'}
          <button class="btn primary">Prüfen</button>
        </div>
      </form>
      <div class="feedback" hidden></div>`);
    const form = view.querySelector('form');
    const input = form.answer;
    setTimeout(() => input.focus(), 50);
    form.querySelectorAll('.key-btn').forEach((b) => {
      b.onclick = () => {
        const k = b.dataset.k === '²' ? '^2' : b.dataset.k === 'R' ? ' R ' : b.dataset.k;
        const [s, e] = [input.selectionStart ?? input.value.length, input.selectionEnd ?? input.value.length];
        input.value = input.value.slice(0, s) + k + input.value.slice(e);
        input.focus();
        input.setSelectionRange(s + k.length, s + k.length);
      };
    });
    const settle = (res, raw) => {
      input.disabled = true;
      input.classList.add(res.ok ? 'is-right' : 'is-wrong');
      form.querySelector('.row').hidden = true;
      form.querySelector('.extra-keys')?.setAttribute('hidden', '');
      feedback(t, res, raw, raw ? esc(raw) : '');
    };
    form.onsubmit = (e) => {
      e.preventDefault();
      if (answered) return;
      const res = check(t, input.value);
      if (res.empty) { input.focus(); return; }
      settle(res, input.value.trim());
    };
    view.querySelector('#giveup')?.addEventListener('click', () => { if (!answered) settle({ ok: false }, ''); });
    // Tip: the first steps of the solution, one more per tap (never the last one).
    let shown = 0;
    view.querySelector('#tip')?.addEventListener('click', () => {
      const steps = t.steps ?? [];
      if (steps.length < 2) return;
      shown = Math.min(shown + 1, steps.length - 1);
      const tip = form.querySelector('.tip');
      tip.innerHTML = steps.slice(0, shown).join('<br>');
      tip.hidden = false;
      input.focus();
    });
    keys = {};
  }

  // Right answers move on by themselves; wrong ones explain and wait for a tap.
  function feedback(t, res, raw, givenHtml) {
    answered = true;
    const box = view.querySelector('.feedback');
    const th = theme();
    box.className = `feedback ${res.ok ? 'ok' : 'no'}`;
    if (res.ok) {
      box.innerHTML = `<strong>${pickOne(CHEER[th])}</strong>`;
      box.hidden = false;
      setTimeout(() => answer(true, raw, ''), mode === 'speed' ? 350 : 800);
      return;
    }
    const why = res.why || '';
    box.innerHTML = `
      <strong>${opts.exam ? 'Leider falsch.' : pickOne(COMFORT[th])}</strong>
      <div class="compare">
        ${givenHtml ? `<span>Deine Antwort: <b class="given">${givenHtml}</b></span>` : '<span>Keine Antwort</span>'}
        <span>Richtig: <b class="right">${solutionHtml(t)}</b></span>
      </div>
      ${why ? `<p class="why">💡 ${why}</p>` : ''}
      ${t.rule && !opts.exam ? `<p class="rule">📏 ${t.rule}</p>${whyHtml(t.skill, { speak: profile.grade <= 4 })}` : ''}
      ${mode === 'speed' || (t.steps?.length === 1 && t.steps[0] === why) ? '' : stepsHtml(t)}
      ${queue[0].mistakeId ? '' : '<p class="hint">📒 Steht jetzt in deinem Fehlerheft.</p>'}
      <div class="row center">
        ${!opts.exam && lessonFor(queue[0].topicId) ? '<button class="btn" id="lesson">📖 Erklärung</button>' : ''}
        <button class="btn primary" id="next">Weiter</button>
      </div>`;
    box.hidden = false;
    const next = box.querySelector('#next');
    box.querySelector('#lesson')?.addEventListener('click', () => showLesson(queue[0].topicId));
    next.onclick = () => answer(false, raw, why);
    next.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    keys = { next: () => answer(false, raw, why) };
  }

  async function answer(ok, raw, why) {
    if (busy || !view.querySelector('.learn')) return;
    busy = true;
    const item = queue.shift();
    const p = progress.get(item.skill) ?? srs.blank(profile.id, item.skill);
    progress.set(item.skill, p);
    srs.applyAnswer(p, ok, missedSkills.has(item.skill));
    done++;
    if (ok) right++;
    const writes = [srs.logAnswer(session, item.skill, ok, mode), db.put('progress', p)];
    if (item.mistakeId) writes.push(mistakes.retried(item.mistakeId, ok, raw, why));
    else if (!ok) writes.push(mistakes.add(profile.id, item.task, raw, why).then((row) => saved.push(row)));
    if (!ok) {
      missedSkills.add(item.skill);
      // A similar fresh task comes back a bit later (not in tests, not for retries).
      if (!opts.exam && !retry && mode !== 'speed' && extra < MAX_EXTRA) {
        queue.splice(Math.min(2, queue.length), 0, { skill: item.skill, topicId: item.topicId });
        extra++; total++;
      }
    }
    if (mode === 'speed') {
      total = done;
      if (!queue.length) queue.push(...shuffle(quick.map((q) => ({ skill: q.skill, topicId: q.topicId }))));
    }
    await Promise.all(writes);
    busy = false;
    if (mode === 'speed' && Date.now() >= deadline) finish();
    else if (queue.length) render(); else finish();
  }

  async function finish() {
    keys = {};
    clearInterval(timer);
    const th = theme();
    const wrong = done - right;
    const perfect = wrong === 0 && done > 0;
    const extraHtml = opts.onFinish ? await opts.onFinish({ total: done, missed: wrong, missedIds: saved.map((m) => m.id), right }) : '';
    view.innerHTML = `
      <div class="learn done">
        <div class="result-emoji" aria-hidden="true">${th === 'adult' ? '✓' : perfect ? '🏆' : mode === 'speed' ? '⚡' : '⭐'}</div>
        <h2>${mode === 'speed' ? `${right} in ${SPEED_SECONDS} Sekunden!` : perfect ? pickOne(PRAISE[th]) : opts.exam ? 'Probe-Prüfung beendet' : th === 'adult' ? 'Runde beendet.' : 'Geschafft!'}</h2>
        <p class="lead">${done} Aufgaben · ${right} richtig${wrong ? ` · ${wrong} falsch` : ''}</p>
        ${extraHtml}
        <div class="stack">
          ${saved.length ? `<button class="btn primary" id="again-missed">${saved.length === 1 ? 'Den Fehler' : `Die ${saved.length} Fehler`} nochmal rechnen</button>` : ''}
          ${opts.exam || retry ? '' : `<button class="btn${saved.length ? '' : ' primary'}" id="again">Nochmal</button>`}
          <button class="btn" id="exit">Fertig</button>
        </div>
      </div>`;
    if (wrong <= done / 4 && done) confetti(view);
    view.querySelector('#again-missed')?.addEventListener('click', () => runSession(view, { ...opts, exam: false, label: undefined, mode: opts.mode === 'speed' ? 'write' : opts.mode, retry: saved.slice() }));
    view.querySelector('#again')?.addEventListener('click', () => runSession(view, { ...opts, plan: (opts.plan ?? []).map(({ skill, topicId }) => ({ skill, topicId })) }));
    view.querySelector('#exit').onclick = onExit;
  }

  // Keyboard: 1–4 choose, Enter continues.
  document.removeEventListener('keydown', window.__learnKey);
  window.__learnKey = (e) => {
    if (!view.querySelector('.learn') || e.target.tagName === 'INPUT') return;
    if (e.key === 'Enter' && keys.next) { e.preventDefault(); keys.next(); }
    else if (/^[1-4]$/.test(e.key) && keys.pick) keys.pick(Number(e.key) - 1);
  };
  document.addEventListener('keydown', window.__learnKey);

  if (mode === 'speed') {
    queue.splice(0, queue.length, ...shuffle(quick.map((q) => ({ ...q }))));
    deadline = Date.now() + SPEED_SECONDS * 1000;
    timer = setInterval(() => {
      if (!view.querySelector('.learn')) { clearInterval(timer); return; }
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      const clock = view.querySelector('.clock');
      if (clock) clock.textContent = `⚡ 0:${String(left).padStart(2, '0')}`;
      const bar = view.querySelector('.progress .bar');
      if (bar) bar.style.width = `${(left / SPEED_SECONDS) * 100}%`;
      if (left <= 0) { clearInterval(timer); if (!busy && !answered) finish(); else if (!busy && answered) { /* finishes after this answer */ } }
    }, 250);
  }
  render();
}
