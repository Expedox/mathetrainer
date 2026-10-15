// Parents' view of one child: progress, problem topics, mistake book, tasks, settings, report.

import * as db from './db.js';
import * as srs from './srs.js';
import * as profiles from './profiles.js';
import * as mistakes from './mistakes.js';
import { esc, STAGES, classLabel, plainText } from './util.js';
import { saveFile } from './io.js';
import { examsSection, examReport } from './exams.js';
import { MODES, solutionHtml, stepsHtml } from './learn.js';
import { SKILLS, allTopics, topic as getTopic, topicsFor } from './skills.js';
import { solution } from './math.js';
import { whyHtml } from './why/index.js';
import { lessonFor } from './lessons/index.js';

const WEEKDAY = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const fmtDate = (t) => new Date(t).toLocaleDateString('de-AT', { day: 'numeric', month: 'numeric' });
const fmtDateTime = (t) => new Date(t).toLocaleString('de-AT', { weekday: 'short', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' });
const minutes = (ms) => Math.max(1, Math.round(ms / 60000));
const pl = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);

// One mistake as a card: task, own answer, solution, why, worked solution.
export function mistakeCard(m) {
  const t = getTopic(m.topicId);
  return `
    <li class="mistake${m.fixed ? ' solved' : ''}">
      <div class="mistake-head"><span class="mistake-task">${m.task.q}</span><small>${esc(t?.title ?? '')} · ${fmtDate(m.at)}${m.tries > 1 ? ` · ${m.tries}× falsch` : ''}${m.fixed ? ' · ✅ nachgerechnet' : ''}</small></div>
      <div class="compare">
        <span>Antwort: <b class="given">${m.given ? esc(m.given) : '–'}</b></span>
        <span>Richtig: <b class="right">${solutionHtml(m.task)}</b></span>
      </div>
      ${m.why ? `<p class="why">💡 ${m.why}</p>` : ''}
      ${m.task.rule ? `<p class="rule">📏 ${m.task.rule}</p>` : ''}
      ${whyHtml(m.task.skill)}
      ${m.task.steps?.length ? `<details><summary>So rechnet man</summary>${stepsHtml(m.task)}</details>` : ''}
      ${lessonFor(m.topicId) ? `<a class="link-btn" href="#/lesson/${encodeURIComponent(m.topicId)}">📖 Erklärung zum Thema</a>` : ''}
    </li>`;
}

export async function childSummary(p) {
  const sessions = await srs.sessionsFor(p.id);
  const days = srs.perDay(sessions);
  const progress = await srs.allProgress(p.id);
  const allMistakes = await mistakes.list(p.id);
  const last14 = srs.lastDays(days, 14);
  const week = last14.slice(7);
  const weekAnswers = week.reduce((n, d) => n + d.answers, 0);
  const weekRight = week.reduce((n, d) => n + d.right, 0);
  return {
    sessions, days, progress, last14, mistakes: allMistakes,
    openMistakes: allMistakes.filter((m) => !m.fixed).length,
    streak: srs.streak(days),
    solved: sessions.reduce((n, s) => n + s.right, 0),
    learned: progress.filter(srs.isLearned).length,
    solid: progress.filter((r) => r.box >= 3).length,
    due: progress.filter((r) => srs.isDue(r)).length,
    weekDays: week.filter((d) => d.answers).length,
    weekAnswers,
    weekQuote: pct(weekRight, weekAnswers),
    weekMinutes: week.reduce((n, d) => n + (d.answers ? minutes(d.ms) : 0), 0),
    last: sessions.at(-1)?.end ?? null,
  };
}

function barChart(last14, goal) {
  const max = Math.max(goal, ...last14.map((d) => d.answers), 1);
  return `
    <figure class="chart" aria-label="Aufgaben pro Tag, letzte 14 Tage">
      <div class="bars">
        ${last14.map((d) => {
          const label = `${WEEKDAY[d.date.getDay()]} ${fmtDate(d.date)}: ${d.answers} Aufgaben${d.answers ? `, ${pct(d.right, d.answers)} % richtig, ca. ${minutes(d.ms)} Min.` : ''}`;
          return `<button class="bar-col" type="button" data-tip="${esc(label)}" aria-label="${esc(label)}">
            <span class="bar-fill${d.answers >= goal ? ' met' : ''}" style="height:${(d.answers / max) * 100}%"></span>
          </button>`;
        }).join('')}
        <span class="goal-line" style="bottom:${(goal / max) * 100}%"><span>Ziel ${goal}</span></span>
      </div>
      <div class="bar-labels">${last14.map((d, i) => `<span>${i === 13 ? 'heute' : (13 - i) % 2 ? '' : WEEKDAY[d.date.getDay()]}</span>`).join('')}</div>
      <figcaption class="chart-tip" aria-live="polite">Tippe auf einen Balken für Details.</figcaption>
    </figure>`;
}

// Topics the child worked on (or has as a task), with how firmly the skills sit.
function topicRows(p, progressRows) {
  const by = new Map(progressRows.map((r) => [r.vocabId, r]));
  return allTopics().map((t) => {
    const rows = t.skills.map((s) => by.get(s) ?? srs.blank(p.id, s));
    return { t, task: (p.tasks || []).includes(t.id), seen: rows.some((r) => r.seen), solid: rows.filter((r) => r.box >= 2).length, total: rows.length, stars: srs.stars(t.skills.map((id) => ({ id })), new Map(t.skills.map((s, i) => [s, rows[i]]))) };
  }).filter((r) => (r.seen && r.t.grade <= p.grade + 1) || r.task)
    .sort((a, b) => Number(b.task) - Number(a.task) || a.t.grade - b.t.grade);
}

// Task types that go wrong most often.
function problemSkills(progressRows, limit = 8) {
  return progressRows.filter((r) => r.wrong > 0 && SKILLS[r.vocabId] && (r.box <= 1 || r.wrong > r.right))
    .sort((a, b) => b.wrong / (b.right + b.wrong) - a.wrong / (a.right + a.wrong) || b.wrong - a.wrong)
    .slice(0, limit);
}

function reportText(p, s, topics, problems) {
  const lines = [
    `Lernbericht Mathe ${p.name} (${classLabel(p.grade)}) – ${new Date().toLocaleDateString('de-AT')}`,
    '',
    `Letzte 7 Tage: an ${pl(s.weekDays, 'Tag', 'Tagen')} geübt, ${pl(s.weekAnswers, 'Aufgabe', 'Aufgaben')}, ${s.weekQuote} % richtig, ca. ${pl(s.weekMinutes, 'Minute', 'Minuten')}.`,
    `Serie: ${pl(s.streak, 'Tag', 'Tage')} in Folge.`,
    `Aufgaben gelöst insgesamt: ${s.solved}.`,
    `Fehlerheft: ${pl(s.openMistakes, 'Aufgabe', 'Aufgaben')} offen.`,
  ];
  const ms = srs.modeStats(s.sessions).filter((r) => r.answers);
  if (ms.length) {
    lines.push('', 'Übungsarten (30 Tage):');
    for (const r of ms) lines.push(`- ${MODES.find((m) => m.id === r.mode)?.name ?? r.mode}: ${r.rate} % richtig (${pl(r.answers, 'Aufgabe', 'Aufgaben')})`);
  }
  if (topics.length) {
    lines.push('', 'Themen:');
    for (const r of topics) lines.push(`- ${r.t.title} (${classLabel(r.t.grade)}): ${r.solid}/${r.total} Aufgabentypen sicher ${'★'.repeat(r.stars)}${r.task ? ' [Aufgabe]' : ''}`);
  }
  if (problems.length) {
    lines.push('', 'Schwierige Aufgabentypen:');
    for (const r of problems) lines.push(`- ${SKILLS[r.vocabId].name}: ${pct(r.right, r.right + r.wrong)} % richtig (${r.wrong}× falsch)`);
  }
  const open = s.mistakes.filter((m) => !m.fixed).slice(0, 10);
  if (open.length) {
    lines.push('', 'Letzte Fehler:');
    for (const m of open) lines.push(`- ${plainText(m.task.q)}: ${m.given || '–'} statt ${plainText(solution(m.task))}${m.why ? ` (${plainText(m.why)})` : ''}`);
  }
  return lines.join('\n');
}

export async function childView(ctx, id) {
  const { view } = ctx;
  const p = await db.get('profiles', id);
  if (!p) { location.hash = '#/parents'; return; }
  ctx.setHeader(`${p.avatar} ${p.name}`, '#/parents');
  const s = await childSummary(p);
  const topics = topicRows(p, s.progress);
  const problems = problemSkills(s.progress);
  const recent = s.sessions.slice(-8).reverse();
  const goal = p.dailyGoal || profiles.DEFAULT_GOAL;
  const modeName = Object.fromEntries(MODES.map((m) => [m.id, m.name]));
  const latest = s.mistakes.slice(0, 8);

  view.innerHTML = `
    <p class="lead">${classLabel(p.grade)} <a class="link-btn" href="#/parents/child/${encodeURIComponent(p.id)}/edit">Klasse ändern</a><br>${s.last ? `zuletzt geübt ${fmtDateTime(s.last)}` : 'hat noch nicht geübt'}</p>
    <div class="kpis">
      <div class="kpi"><b>${s.weekDays}/7</b><span>Übungstage (7 Tage)</span></div>
      <div class="kpi"><b>${s.weekQuote} %</b><span>richtig (7 Tage)</span></div>
      <div class="kpi"><b>${s.solved}</b><span>Aufgaben gelöst</span></div>
      <div class="kpi"><b>📒 ${s.openMistakes}</b><span>offene Fehler</span></div>
      <div class="kpi"><b>🔥 ${s.streak}</b><span>Tage in Folge</span></div>
    </div>

    ${await examsSection(p)}

    <section class="card">
      <h2>Schwierige Aufgabentypen</h2>
      ${problems.length ? `<ul class="topic-progress">
        ${problems.map((r) => `<li class="weak">
          <span class="tp-name">${esc(SKILLS[r.vocabId].name)} <small>${pl(r.wrong, 'Fehler', 'Fehler')} von ${r.right + r.wrong}</small></span>
          <span class="tp-bar"><span style="width:${pct(r.right, r.right + r.wrong)}%"></span></span>
          <span class="tp-num">${pct(r.right, r.right + r.wrong)} %</span>
        </li>`).join('')}
      </ul><p class="hint">Diese Aufgabentypen kommen beim Kind unter „Heute wiederholen“ automatisch öfter.</p>` : '<p class="hint">Noch keine Aufgabentypen, die öfter falsch waren.</p>'}
    </section>

    <section class="card">
      <h2>Fehlerheft <small class="hint">${s.openMistakes} offen</small></h2>
      ${latest.length ? `<ul class="mistakes">${latest.map(mistakeCard).join('')}</ul>` : '<p class="hint">Noch keine Fehler gespeichert.</p>'}
    </section>

    ${modeSection(srs.modeStats(s.sessions))}
    ${p.taskMode ? `<p class="hint">📌 Vorgegebene Übungsart: <b>${MODES.find((m) => m.id === p.taskMode)?.name ?? ''}</b> (unter „Aufgaben“ änderbar)</p>` : ''}

    <section class="card">
      <h2>Aufgaben pro Tag</h2>
      ${barChart(s.last14, goal)}
      <p class="hint">${s.weekAnswers} Aufgaben in den letzten 7 Tagen, ca. ${s.weekMinutes} Minuten. ${s.due ? `${pl(s.due, 'Aufgabentyp ist', 'Aufgabentypen sind')} zum Wiederholen fällig.` : ''}</p>
    </section>

    <section class="card">
      <h2>Themen</h2>
      ${topics.length ? `<ul class="topic-progress">
        ${topics.map((r) => `
          <li>
            <span class="tp-name">${esc(r.t.icon)} ${esc(r.t.title)} <small>${classLabel(r.t.grade)}${r.task ? ' · 📌 Aufgabe' : ''}</small></span>
            <span class="tp-bar"><span style="width:${pct(r.solid, r.total)}%"></span></span>
            <span class="tp-num">${r.solid}/${r.total}</span>
          </li>`).join('')}
      </ul>` : '<p class="hint">Noch kein Thema begonnen.</p>'}
    </section>

    <section class="card">
      <h2>Letzte Übungsrunden</h2>
      ${recent.length ? `<ul class="wordlist">
        ${recent.map((r) => `<li><span class="term">${esc(r.label ?? 'Runde')}<small>${fmtDateTime(r.start)} · ${modeName[r.mode] ?? ''}</small></span><span class="trans">${r.right}/${r.answers} richtig</span></li>`).join('')}
      </ul>` : '<p class="hint">Noch keine Übungsrunden.</p>'}
    </section>

    <div class="stack wide">
      <a class="btn primary" href="#/parents/child/${encodeURIComponent(p.id)}/tasks">📌 Aufgaben festlegen</a>
      <button class="btn" id="report">📤 Lernbericht teilen</button>
      <a class="btn" href="#/parents/child/${encodeURIComponent(p.id)}/edit">⚙️ Einstellungen für ${esc(p.name)}</a>
    </div>
  `;
  const tip = view.querySelector('.chart-tip');
  view.querySelectorAll('.bar-col').forEach((b) => {
    const show = () => { tip.textContent = b.dataset.tip; view.querySelectorAll('.bar-col').forEach((x) => x.classList.toggle('active', x === b)); };
    b.addEventListener('click', show);
    b.addEventListener('mouseenter', show);
  });
  view.querySelectorAll('.share-exam').forEach((b) => {
    b.onclick = async () => {
      const exam = p.exams.find((e) => e.id === b.dataset.id);
      shareText(`${exam.title}-${p.name}.txt`, await examReport(p, exam));
    };
  });
  view.querySelector('#report').onclick = () => shareText(`Lernbericht-${p.name}.txt`, reportText(p, s, topics, problems));
}

// Hit rate per exercise type (last 30 days), weakest one marked.
export function modeSection(stats, who = 'das Kind') {
  const weak = srs.weakestMode(stats);
  const byId = new Map(stats.map((r) => [r.mode, r]));
  const rows = MODES.map((m) => ({ m, r: byId.get(m.id) })).filter(({ r }) => r?.answers);
  return `
    <section class="card">
      <h2>Übungsarten <small class="hint">letzte 30 Tage</small></h2>
      ${rows.length ? `<ul class="topic-progress modes-stats">
        ${rows.map(({ m, r }) => `
          <li${weak?.mode === m.id ? ' class="weak"' : ''}>
            <span class="tp-name">${m.icon} ${m.name} <small>${pl(r.answers, 'Aufgabe', 'Aufgaben')}${r.trend !== null ? ` · ${r.trend > 0 ? '↗' : r.trend < 0 ? '↘' : '→'} ${r.trend > 0 ? '+' : ''}${r.trend} % zur Vorwoche` : ''}</small></span>
            <span class="tp-bar"><span style="width:${r.rate}%"></span></span>
            <span class="tp-num">${r.rate} %</span>
          </li>`).join('')}
      </ul>
      ${weak ? `<p class="hint">👉 <b>${MODES.find((m) => m.id === weak.mode)?.name}</b> klappt erst zu ${weak.rate} %. Das sollte ${who} öfter üben.</p>` : '<p class="hint">Keine Übungsart fällt deutlich ab.</p>'}`
      : '<p class="hint">Noch keine Aufgaben in den letzten 30 Tagen.</p>'}
    </section>`;
}

async function shareText(name, text) {
  if (navigator.share) {
    try { await navigator.share({ title: name.replace(/\.txt$/, ''), text }); return; }
    catch (e) { if (e.name === 'AbortError') return; }
  }
  await saveFile(name, text, 'text/plain');
}

export async function tasksView(ctx, id) {
  const { view } = ctx;
  const p = await db.get('profiles', id);
  if (!p) { location.hash = '#/parents'; return; }
  ctx.setHeader('Aufgaben', `#/parents/child/${encodeURIComponent(id)}`);
  const tasks = new Set(p.tasks || []);
  const grades = STAGES.flatMap((s) => s.grades);
  // Show the child's own class first.
  grades.sort((a, b) => (a === p.grade ? -1 : b === p.grade ? 1 : a - b));
  view.innerHTML = `
    <p class="hint">Gewählte Themen erscheinen bei ${esc(p.name)} ganz oben als „📌 Aufgaben“, z. B. für die nächste Schularbeit.</p>
    <form class="form">
      <section class="card form">
        <label class="field"><span>Übungsart vorgeben</span>
          <select name="taskMode">
            <option value="">Keine, das Kind wählt selbst</option>
            ${MODES.map((m) => `<option value="${m.id}"${p.taskMode === m.id ? ' selected' : ''}>${m.icon} ${m.name}</option>`).join('')}
          </select>
        </label>
        <p class="hint">Die Übungsart wird bei ${esc(p.name)} eingestellt und auf der Startseite als Aufgabe angezeigt.</p>
      </section>
      ${grades.map((g) => {
        const list = topicsFor(g);
        if (!list.length) return '';
        return `<details class="card"${g === p.grade || list.some((t) => tasks.has(t.id)) ? ' open' : ''}>
          <summary><h2>${classLabel(g)}</h2></summary>
          <div class="choices">
            ${list.map((t) => `<label class="choice"><input type="checkbox" name="t" value="${esc(t.id)}"${tasks.has(t.id) ? ' checked' : ''}><span><strong>${esc(t.icon)} ${esc(t.title)}</strong></span></label>`).join('')}
          </div>
        </details>`;
      }).join('')}
      <button class="btn primary sticky-save">Speichern</button>
    </form>`;
  view.querySelector('form').onsubmit = async (e) => {
    e.preventDefault();
    p.tasks = [...view.querySelectorAll('input[name=t]:checked')].map((el) => el.value);
    p.taskMode = e.target.taskMode.value || null;
    if (p.taskMode) p.mode = p.taskMode;
    await profiles.save(p);
    await ctx.refresh();
    location.hash = `#/parents/child/${encodeURIComponent(id)}`;
  };
}

export async function editChildView(ctx, id) {
  const { view } = ctx;
  const p = await db.get('profiles', id);
  if (!p) { location.hash = '#/parents'; return; }
  const back = `#/parents/child/${encodeURIComponent(id)}`;
  ctx.setHeader(`Einstellungen ${p.name}`, back);
  view.innerHTML = `
    <form class="card form">
      <label class="field"><span>Name</span><input name="name" required maxlength="20" value="${esc(p.name)}"></label>
      <div class="field"><span>Bild</span>
        <div class="avatars">${profiles.AVATARS.map((a) => `<button type="button" class="avatar${a === p.avatar ? ' on' : ''}" data-a="${a}">${a}</button>`).join('')}</div>
      </div>
      <label class="field"><span>Klasse (z. B. beim Schuljahreswechsel ändern, der Lernfortschritt bleibt)</span>
        <select name="grade">${STAGES.map((s) => `<optgroup label="${s.name}">${s.grades.map((g) => `<option value="${g}"${g === p.grade ? ' selected' : ''}>${classLabel(g)}</option>`).join('')}</optgroup>`).join('')}</select>
      </label>
      <label class="field"><span>Tagesziel (Aufgaben pro Tag)</span>
        <select name="goal">${[10, 15, 20, 30, 40, 50].map((n) => `<option value="${n}"${n === (p.dailyGoal || profiles.DEFAULT_GOAL) ? ' selected' : ''}>${n} Aufgaben</option>`).join('')}</select>
      </label>
      <button class="btn primary">Speichern</button>
    </form>
    <section class="card danger-zone">
      <h2>Zurücksetzen</h2>
      <div class="stack">
        <button class="btn danger" id="clear-mistakes">Fehlerheft leeren</button>
        <button class="btn danger" id="reset">Lernfortschritt löschen</button>
        <button class="btn danger" id="delete">${esc(p.name)} ganz entfernen</button>
      </div>
    </section>`;
  const form = view.querySelector('form');
  let avatar = p.avatar;
  form.querySelectorAll('.avatar').forEach((b) => {
    b.onclick = () => { form.querySelectorAll('.avatar').forEach((x) => x.classList.remove('on')); b.classList.add('on'); avatar = b.dataset.a; };
  });
  form.onsubmit = async (e) => {
    e.preventDefault();
    Object.assign(p, { name: form.name.value.trim(), avatar, grade: Number(form.grade.value), dailyGoal: Number(form.goal.value), gradeYear: srs.schoolYear() });
    await profiles.save(p);
    await ctx.refresh();
    location.hash = back;
  };
  view.querySelector('#clear-mistakes').onclick = async () => {
    if (!confirm(`Das ganze Fehlerheft von ${p.name} löschen?`)) return;
    await mistakes.removeAll(p.id);
    location.hash = back;
  };
  view.querySelector('#reset').onclick = async () => {
    if (!confirm(`Den gesamten Lernfortschritt von ${p.name} löschen? Das kann man nicht rückgängig machen.`)) return;
    await profiles.resetProgress(p.id);
    location.hash = back;
  };
  view.querySelector('#delete').onclick = async () => {
    if (!confirm(`${p.name} mit allem Lernfortschritt entfernen?`)) return;
    await profiles.remove(p.id);
    await ctx.refresh();
    location.hash = '#/parents';
  };
}
