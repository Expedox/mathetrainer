import * as db from './db.js';
import * as srs from './srs.js';
import * as profiles from './profiles.js';
import * as mistakes from './mistakes.js';
import { esc, STAGES, THEMES, stageOf, classLabel, gradesBelow } from './util.js';
import { parentsRoute, lock } from './parents.js';
import { runSession, MODES } from './learn.js';
import { SKILLS, topicsFor, topic as getTopic, allTopics, entriesOf, buildPlan, topicOfSkill } from './skills.js';
import { mistakeCard } from './child.js';
import * as exams from './exams.js';
import { lessonFor, lessonHtml } from './lessons/index.js';
import { speak, stop } from './speech.js';
import { whyFor, whyHtml } from './why/index.js';

const state = { profile: null };
const view = document.getElementById('view');
const titleEl = document.getElementById('title');
const backBtn = document.getElementById('back-btn');

export function applyTheme(profile = state.profile) {
  const pref = profile?.theme ?? 'auto';
  const t = pref === 'auto' ? stageOf(profile?.grade ?? 1).theme : pref;
  document.body.dataset.theme = t;
  const color = getComputedStyle(document.body).getPropertyValue('--accent').trim();
  document.querySelector('meta[name=theme-color]').content = color;
}

function setHeader(title, back) {
  titleEl.textContent = title;
  backBtn.hidden = !back;
  backBtn.onclick = () => { location.hash = back; };
}

const starStr = (n) => `<span class="stars" aria-label="${n} von 3 Sternen">${'★'.repeat(n)}<span class="off">${'★'.repeat(3 - n)}</span></span>`;
const skillItems = (t) => t.skills.map((id) => ({ id }));

async function topicTiles(topics) {
  const rows = await Promise.all(topics.map(async (t) => ({ t, stars: srs.stars(skillItems(t), await srs.progressMap(state.profile.id, skillItems(t))) })));
  return `
    <div class="grid topics">
      ${rows.map(({ t, stars }) => `
        <a class="tile topic-tile" href="#/topic/${encodeURIComponent(t.id)}">
          <span class="emoji" aria-hidden="true">${esc(t.icon)}</span>
          <span class="name">${esc(t.title)}</span>
          ${starStr(stars)}
          <span class="small">${t.skills.length} ${t.skills.length === 1 ? 'Aufgabentyp' : 'Aufgabentypen'}</span>
        </a>`).join('')}
    </div>`;
}

async function todayStats(profile) {
  const sessions = await srs.sessionsFor(profile.id);
  const days = srs.perDay(sessions);
  const today = days.get(srs.dayKey(Date.now()))?.answers ?? 0;
  const solved = sessions.reduce((n, s) => n + s.right, 0);
  return { today, streak: srs.streak(days), goal: profile.dailyGoal || profiles.DEFAULT_GOAL, solved };
}

function goalRing(done, goal) {
  const pct = Math.min(1, done / goal);
  const r = 26; const c = 2 * Math.PI * r;
  return `
    <svg class="ring" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="${r}" class="ring-bg"/>
      <circle cx="32" cy="32" r="${r}" class="ring-fg" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct)}"/>
      <text x="32" y="37" text-anchor="middle">${pct >= 1 ? '✓' : Math.round(pct * 100) + '%'}</text>
    </svg>`;
}

// ---- Views -----------------------------------------------------------

export const gradeSelect = (selected) => STAGES.map((s) => `<optgroup label="${s.name}">${s.grades.map((g) => `<option value="${g}"${g === selected ? ' selected' : ''}>${classLabel(g)}</option>`).join('')}</optgroup>`).join('');

async function welcomeView(first) {
  setHeader(first ? 'Willkommen!' : 'Neues Profil', first ? null : '#/profiles');
  let avatar = profiles.AVATARS[0];
  view.innerHTML = `
    <form class="card form welcome" autocomplete="off">
      ${first ? '<p class="lead">Schön, dass du da bist! Wer rechnet hier?</p>' : ''}
      <label class="field"><span>Vorname</span><input name="name" required maxlength="20" placeholder="z. B. Lena"></label>
      <div class="field"><span>Wähle dein Bild</span>
        <div class="avatars">${profiles.AVATARS.map((a, i) => `<button type="button" class="avatar${i ? '' : ' on'}" data-a="${a}" aria-label="${a}">${a}</button>`).join('')}</div>
      </div>
      <label class="field"><span>Deine Klasse</span><select name="grade">${gradeSelect(1)}</select></label>
      <button class="btn primary">Los geht's</button>
    </form>`;
  const form = view.querySelector('form');
  form.querySelectorAll('.avatar').forEach((b) => {
    b.onclick = () => {
      form.querySelectorAll('.avatar').forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      avatar = b.dataset.a;
    };
  });
  form.onsubmit = async (e) => {
    e.preventDefault();
    state.profile = await profiles.create({ name: form.name.value, avatar, grade: Number(form.grade.value) });
    applyTheme();
    location.hash = '#/';
  };
}

async function profilesView() {
  setHeader('Wer rechnet?', state.profile ? '#/' : null);
  const list = await profiles.list();
  view.innerHTML = `
    <div class="grid profiles">
      ${list.map((p) => `
        <button class="tile profile-tile${p.id === state.profile?.id ? ' current' : ''}" data-id="${p.id}">
          <span class="big-emoji">${esc(p.avatar)}</span>
          <span class="name">${esc(p.name)}</span>
          <span class="small">${classLabel(p.grade)}</span>
        </button>`).join('')}
      <a class="tile profile-tile add" href="#/welcome"><span class="big-emoji">➕</span><span class="name">Neues Profil</span></a>
    </div>`;
  view.querySelectorAll('.profile-tile[data-id]').forEach((b) => {
    b.onclick = async () => {
      await profiles.select(b.dataset.id);
      state.profile = await profiles.current();
      applyTheme();
      location.hash = '#/';
    };
  });
}

const cta = (href, emoji, title, small, cls = '') => `
  <a class="card cta ${cls}" href="${href}">
    <span class="emoji" aria-hidden="true">${emoji}</span>
    <span><strong>${title}</strong><small>${small}</small></span>
    <span class="go" aria-hidden="true">›</span>
  </a>`;

async function homeView() {
  const p = state.profile;
  setHeader('Mathe Trainer');
  const { today, streak, goal, solved } = await todayStats(p);
  const due = await srs.dueSkills(p.id, 200);
  const open = await mistakes.list(p.id, { open: true });
  const tasks = (p.tasks || []).map(getTopic).filter(Boolean);
  const mine = topicsFor(p.grade);
  const weak = srs.weakestMode(srs.modeStats(await srs.sessionsFor(p.id)));
  const weakMode = weak && weak.mode !== p.mode && !p.taskMode ? MODES.find((m) => m.id === weak.mode) : null;
  const taskMode = p.taskMode && MODES.find((m) => m.id === p.taskMode);
  const hello = p.grade <= 4 ? `Hallo ${esc(p.name)}! 👋` : `Hi ${esc(p.name)}!`;
  const examCards = await Promise.all(exams.upcoming(p).map(async (e) => {
    const st = await exams.status(p, e);
    const d = srs.daysUntil(e.date);
    return `<a class="card exam-card" href="#/exam/${encodeURIComponent(e.id)}">
      <span class="exam-count"><b>${d > 0 ? d : d === 0 ? '!' : '✓'}</b><small>${d > 1 ? 'Tage' : d === 1 ? 'Tag' : d === 0 ? 'heute' : 'vorbei'}</small></span>
      <span class="exam-main"><strong>📅 ${esc(e.title)} ${exams.countdown(e)}</strong>
        <small>${st.ready} % sitzen schon${d >= 0 ? ` · heute ${st.portion} Aufgaben` : ''}</small>
        <span class="tp-bar"><span style="width:${st.ready}%"></span></span>
      </span>
      <span class="go" aria-hidden="true">›</span>
    </a>`;
  }));
  view.innerHTML = `
    <div class="hello">
      <a class="me" href="#/profiles" aria-label="Benutzer wechseln">${esc(p.avatar)}</a>
      <div>
        <h2>${hello}</h2>
        <p class="hint">${today >= goal ? 'Tagesziel geschafft! 🎉' : today ? `Noch ${goal - today} Aufgaben bis zum Tagesziel.` : 'Bereit für heute?'}</p>
      </div>
    </div>
    <div class="stats-row">
      <div class="stat">${goalRing(today, goal)}<span>Tagesziel<br><b>${Math.min(today, goal)}/${goal}</b></span></div>
      <div class="stat"><span class="stat-big">🔥 ${streak}</span><span>${streak === 1 ? 'Tag' : 'Tage'} in Folge</span></div>
      <div class="stat"><span class="stat-big">✅ ${solved}</span><span>Aufgaben gelöst</span></div>
    </div>
    ${taskMode ? `<p class="card nudge">📌 Aufgabe: Übe mit <b>${taskMode.icon} ${taskMode.name}</b>.</p>` : ''}
    ${weakMode ? `<div class="card nudge">
      <span>${weakMode.icon} <b>${weakMode.name}</b> klappt erst zu ${weak.rate} %. Heute ${weakMode.name} üben?</span>
      <button class="btn primary" id="take-weak" data-mode="${weakMode.id}">Ja, ${weakMode.name}</button>
    </div>` : ''}
    <h3 class="section">So übe ich</h3>
    ${modePicker(p)}
    ${examCards.join('')}
    ${due.length ? cta('#/review', '🔁', 'Heute wiederholen', `${due.length} ${due.length === 1 ? 'Aufgabentyp wartet' : 'Aufgabentypen warten'} auf dich`) : ''}
    ${open.length ? cta('#/mistakes', '📒', 'Fehlerheft', `${open.length} ${open.length === 1 ? 'Aufgabe' : 'Aufgaben'} nochmal rechnen`, 'soft') : ''}
    ${tasks.length ? `<h3 class="section">📌 Aufgaben</h3>${await topicTiles(tasks)}` : ''}
    <h3 class="section">${classLabel(p.grade)}</h3>
    ${mine.length > 1 ? cta(`#/mix/${p.grade}`, '🎯', 'Ganze Klasse üben', 'Alle Themen gemischt, z. B. vor einer Schularbeit', 'soft') : ''}
    ${await topicTiles(mine)}
    <a class="btn more-link" href="#/grades">Andere Klasse ansehen</a>
    ${open.length ? '' : '<a class="btn more-link" href="#/mistakes">📒 Fehlerheft</a>'}
  `;
  wireModePicker();
  view.querySelector('#take-weak')?.addEventListener('click', async (e) => {
    p.mode = e.target.dataset.mode;
    await profiles.save(p);
    homeView();
  });
}

async function gradesView() {
  setHeader('Alle Klassen', '#/');
  view.innerHTML = STAGES.map((s) => `
    <section class="stage stage-${s.id}">
      <h2><span class="badge">${s.short}</span> ${s.name}</h2>
      <div class="grid grades">
        ${s.grades.map((g) => `
          <a class="tile grade-tile${g === state.profile.grade ? ' current' : ''}" href="#/grade/${g}">
            <span class="big">${g <= 4 ? g : g - 4}</span>
            <span class="small">Klasse</span>
          </a>`).join('')}
      </div>
    </section>`).join('');
}

async function gradeView(grade) {
  const stage = stageOf(grade);
  setHeader(classLabel(grade), '#/grades');
  const topics = topicsFor(grade);
  view.innerHTML = `
    <p class="lead"><span class="badge">${stage.short}</span> ${stage.name} · Schulstufe ${grade}</p>
    ${topics.length > 1 ? cta(`#/mix/${grade}`, '🎯', 'Ganze Klasse üben', 'Alle oder ausgewählte Themen gemischt', 'soft') : ''}
    ${await topicTiles(topics)}
  `;
}

function modePicker(p) {
  return `
    <div class="modes" role="radiogroup" aria-label="Übungsart">
      ${MODES.map((m) => `
        <label class="mode">
          <input type="radio" name="mode" value="${m.id}"${m.id === p.mode ? ' checked' : ''}>
          <span><b>${m.icon}</b>${m.name}</span>
        </label>`).join('')}
    </div>
    <p class="hint mode-hint" id="mode-hint">${esc(MODES.find((m) => m.id === p.mode)?.hint ?? '')}</p>`;
}

function wireModePicker() {
  view.querySelectorAll('input[name=mode]').forEach((el) => el.addEventListener('change', () => {
    state.profile.mode = el.value; profiles.save(state.profile);
    view.querySelector('#mode-hint').textContent = MODES.find((x) => x.id === el.value).hint;
  }));
}

const dotFor = (pr) => (srs.needsRepeat(pr) ? '<span class="dot wrong" title="üben"></span>' : srs.isLearned(pr) ? '<span class="dot right" title="sitzt"></span>' : '<span class="dot"></span>');

async function topicView(topicId) {
  const t = getTopic(topicId);
  if (!t) { location.hash = '#/'; return; }
  const p = state.profile;
  const progress = await srs.progressMap(p.id, skillItems(t));
  const open = (await mistakes.list(p.id, { open: true })).filter((m) => m.topicId === topicId);
  const quick = t.skills.some((s) => SKILLS[s].quick);
  const fresh = t.skills.every((s) => !progress.get(s).seen);
  setHeader(t.title, t.grade === p.grade ? '#/' : `#/grade/${t.grade}`);
  view.innerHTML = `
    <div class="topic-head">
      <span class="emoji big-emoji" aria-hidden="true">${esc(t.icon)}</span>
      <div>
        ${starStr(srs.stars(skillItems(t), progress))}
        <p class="lead">${classLabel(t.grade)}</p>
      </div>
    </div>
    ${modePicker(p)}
    ${quick ? '' : '<p class="hint">⚡ Blitzrechnen gibt es hier nicht, diese Aufgaben brauchen etwas Zeit. Dann wird eingetippt.</p>'}
    ${lessonFor(topicId) ? (fresh ? `<a class="card cta" href="#/lesson/${encodeURIComponent(topicId)}">
      <span class="emoji" aria-hidden="true">📖</span>
      <span><strong>Neu hier? Lies zuerst die Erklärung</strong><small>Mit Beispielen, Schritt für Schritt</small></span>
      <span class="go" aria-hidden="true">›</span>
    </a>` : '') : ''}
    <div class="stack wide">
      <a class="btn primary big" href="#/learn/${encodeURIComponent(topicId)}">Los geht's!</a>
      ${lessonFor(topicId) && !fresh ? `<a class="btn" href="#/lesson/${encodeURIComponent(topicId)}">📖 Erklärung</a>` : ''}
      ${open.length ? `<a class="btn" href="#/mistakes/${encodeURIComponent(topicId)}">📒 ${open.length} Fehler nochmal rechnen</a>` : ''}
    </div>
    <ul class="wordlist">
      ${t.skills.map((s) => {
        const pr = progress.get(s);
        const n = pr.right + pr.wrong;
        return `<li>${dotFor(pr)}<span class="term">${esc(SKILLS[s].name)}</span><span class="trans">${n ? `${Math.round((pr.right / n) * 100)} % richtig` : 'neu'}</span></li>`;
      }).join('')}
    </ul>
    <p class="hint legend"><span class="dot right"></span> sitzt <span class="dot wrong"></span> üben <span class="dot"></span> neu</p>
  `;
  wireModePicker();
}

async function lessonView(topicId) {
  const t = getTopic(topicId);
  const l = lessonFor(topicId);
  if (!t || !l) { location.hash = '#/'; return; }
  setHeader(t.title, `#/topic/${encodeURIComponent(topicId)}`);
  view.innerHTML = `
    <div class="lesson">
      <p class="lead">${esc(t.icon)} ${classLabel(t.grade)}</p>
      ${lessonHtml(l, { speakAll: t.grade <= 4 })}
      ${t.skills.some(whyFor) ? `<section class="card lesson-part"><h2>🤔 Warum ist das so?</h2>${t.skills.map((s) => whyHtml(s, { speak: t.grade <= 4, title: esc(SKILLS[s].name) })).join('')}</section>` : ''}
      <a class="btn primary big" href="#/learn/${encodeURIComponent(topicId)}">Jetzt üben!</a>
    </div>`;
}

async function finishExtra(topicId) {
  const p = state.profile;
  const { today, streak, goal } = await todayStats(p);
  let starsHtml = '';
  const t = topicId && getTopic(topicId);
  if (t) starsHtml = `<div class="finish-stat">${starStr(srs.stars(skillItems(t), await srs.progressMap(p.id, skillItems(t))))}<span>Sterne im Thema</span></div>`;
  return `
    <div class="finish-stats">
      ${starsHtml}
      <div class="finish-stat"><b>🔥 ${streak}</b><span>${streak === 1 ? 'Tag' : 'Tage'} in Folge</span></div>
      <div class="finish-stat"><b>${Math.min(today, goal)}/${goal}</b><span>${today >= goal ? 'Tagesziel geschafft!' : 'Tagesziel'}</span></div>
    </div>`;
}

async function learnView(topicId) {
  const t = getTopic(topicId);
  if (!t) { location.hash = '#/'; return; }
  const back = `#/topic/${encodeURIComponent(topicId)}`;
  setHeader(t.title, back);
  const p = state.profile;
  const plan = buildPlan(entriesOf([t]), p.roundSize || 10, await srs.progressMap(p.id, skillItems(t)));
  await runSession(view, {
    profile: p, plan, mode: p.mode, topicId, label: `${t.icon} ${t.title}`,
    onExit: () => { location.hash = back; },
    onFinish: () => finishExtra(topicId),
  });
}

// Exam practice: several (by default all) topics of one class in one round.
const MIX_SIZES = [10, 20, 30, 50];

async function mixView(grade) {
  const p = state.profile;
  const back = grade === p.grade ? '#/' : `#/grade/${grade}`;
  setHeader(`${classLabel(grade)} üben`, back);
  const topics = topicsFor(grade);
  const saved = await db.getMeta(`mix:${p.id}:${grade}`, null);
  const chosen = new Set(saved?.topics ?? topics.map((t) => t.id));
  const size = saved?.size ?? 20;
  view.innerHTML = `
    <form class="form mix">
      <section class="card">
        <div class="row between"><h2>Themen</h2><button type="button" class="link-btn" id="toggle-all">Alle an/aus</button></div>
        <div class="choices">
          ${topics.map((t) => `<label class="choice"><input type="checkbox" name="t" value="${esc(t.id)}"${chosen.has(t.id) ? ' checked' : ''}><span><strong>${esc(t.icon)} ${esc(t.title)}</strong><small>${t.skills.map((s) => esc(SKILLS[s].name)).join(', ')}</small></span></label>`).join('')}
        </div>
      </section>
      ${gradesBelow(grade).length ? `<label class="choice card"><input type="checkbox" name="prev"${saved?.prev ? ' checked' : ''}><span><strong>Auch alle früheren Klassen</strong><small>Gesamter Stoff bis ${classLabel(grade)}, die unsichersten Aufgabentypen zuerst</small></span></label>` : ''}
      <section class="card">
        <h2>Wie viele Aufgaben?</h2>
        <div class="segmented">
          ${MIX_SIZES.map((n) => `<label><input type="radio" name="size" value="${n}"${n === size ? ' checked' : ''}><span>${n}</span></label>`).join('')}
        </div>
      </section>
      ${modePicker(p)}
      <p class="hint" id="mix-info"></p>
      <button class="btn primary big sticky-save">Los geht's!</button>
    </form>`;
  wireModePicker();
  const form = view.querySelector('form');
  const selected = () => [...form.querySelectorAll('input[name=t]:checked')].map((el) => el.value);
  view.querySelector('#toggle-all').onclick = () => {
    const boxes = [...form.querySelectorAll('input[name=t]')];
    const on = !boxes.every((b) => b.checked);
    boxes.forEach((b) => { b.checked = on; });
  };
  form.onsubmit = async (e) => {
    e.preventDefault();
    const prev = !!form.prev?.checked;
    const below = new Set(gradesBelow(grade));
    const list = [...selected().map(getTopic), ...(prev ? allTopics().filter((t) => below.has(t.grade)) : [])];
    if (!list.length) { view.querySelector('#mix-info').textContent = 'Bitte mindestens ein Thema wählen.'; return; }
    const n = Number(new FormData(form).get('size'));
    await db.setMeta(`mix:${p.id}:${grade}`, { topics: selected(), size: n, prev });
    const entries = entriesOf(list);
    const plan = buildPlan(entries, n, await srs.progressMap(p.id, entries.map((x) => ({ id: x.skill }))));
    await runSession(view, {
      profile: p, plan, mode: p.mode, label: `🎯 ${classLabel(grade)}${prev ? ' (mit früheren Klassen)' : ''}`,
      onExit: () => { location.hash = back; },
      onFinish: () => finishExtra(null),
    });
  };
}

async function reviewView() {
  setHeader('Heute wiederholen', '#/');
  const p = state.profile;
  const due = await srs.dueSkills(p.id, 15);
  if (!due.length) {
    view.innerHTML = '<p class="empty">Heute ist nichts mehr fällig. 🎉<br><a class="btn" href="#/">Zurück</a></p>';
    return;
  }
  await runSession(view, {
    profile: p, plan: due.map((skill) => ({ skill, topicId: topicOfSkill(skill, p.grade) })), mode: p.mode, label: '🔁 Wiederholung',
    onExit: () => { location.hash = '#/'; },
    onFinish: () => finishExtra(null),
  });
}

async function mistakesView(topicId) {
  const p = state.profile;
  const back = topicId ? `#/topic/${encodeURIComponent(topicId)}` : '#/';
  setHeader('Fehlerheft', back);
  const all = (await mistakes.list(p.id)).filter((m) => !topicId || m.topicId === topicId);
  const open = all.filter((m) => !m.fixed);
  const solved = all.filter((m) => m.fixed).slice(0, 30);
  view.innerHTML = `
    <p class="lead">${open.length ? `${open.length} ${open.length === 1 ? 'Aufgabe wartet' : 'Aufgaben warten'} darauf, noch einmal gerechnet zu werden.` : 'Keine offenen Fehler. 🎉'}</p>
    ${open.length ? `<button class="btn primary big" id="retry">✏️ ${Math.min(open.length, 15)} ${open.length === 1 ? 'Aufgabe' : 'Aufgaben'} nochmal rechnen</button>` : ''}
    <p class="hint">Hier steht jede falsch gelöste Aufgabe mit Erklärung. Richtig nachgerechnet wandert sie zu „Schon geschafft“.</p>
    ${open.length ? `<ul class="mistakes">${open.map((m) => mistakeCard(m)).join('')}</ul>` : ''}
    ${solved.length ? `<details class="card"><summary><h2>Schon geschafft (${solved.length})</h2></summary><ul class="mistakes">${solved.map((m) => mistakeCard(m)).join('')}</ul></details>` : ''}
  `;
  view.querySelector('#retry')?.addEventListener('click', () => runSession(view, {
    profile: p, retry: open.slice(0, 15).reverse(), mode: p.mode === 'speed' ? 'write' : p.mode, label: '📒 Fehlerheft',
    onExit: () => { if (location.hash === back) route(); else location.hash = back; },
    onFinish: () => finishExtra(null),
  }));
}

async function examView(id) {
  const p = state.profile;
  const exam = (p.exams || []).find((e) => e.id === id);
  if (!exam) { location.hash = '#/'; return; }
  setHeader(exam.title, '#/');
  const st = await exams.status(p, exam);
  const d = srs.daysUntil(exam.date);
  const last = exam.results?.at(-1);
  view.innerHTML = `
    <div class="exam-hero">
      <div class="exam-big">${d > 0 ? d : d === 0 ? '🎯' : '✓'}</div>
      <p class="lead">${d > 1 ? 'Tage bis' : d === 1 ? 'Tag bis' : ''} ${esc(exam.title)} ${d <= 0 ? exams.countdown(exam) : ''}</p>
    </div>
    <section class="card">
      <h2>So gut sitzt der Stoff</h2>
      <div class="tp-bar big-bar"><span style="width:${st.ready}%"></span></div>
      <p class="hint">${st.ready} % geschafft · ${st.solid} von ${st.total} Aufgabentypen sitzen schon sicher.${last ? ` Letzte Probe-Prüfung: ${last.right}/${last.total} richtig.` : ''}</p>
    </section>
    <div class="stack wide">
      <a class="btn primary big" href="#/exam/${encodeURIComponent(id)}/prep">💪 Heute üben: ${st.portion} Aufgaben</a>
      <a class="btn big" href="#/exam/${encodeURIComponent(id)}/test">📝 Probe-Prüfung (${exam.size} Aufgaben)</a>
    </div>
    <p class="hint">Beim Üben kommen zuerst die Aufgabentypen, die noch nicht sitzen. Die Probe-Prüfung mischt den ganzen Stoff wie bei der echten Prüfung, ohne Tipps.</p>
  `;
}

async function examRunView(id, kind) {
  const p = state.profile;
  const exam = (p.exams || []).find((e) => e.id === id);
  if (!exam) { location.hash = '#/'; return; }
  const back = `#/exam/${encodeURIComponent(id)}`;
  setHeader(kind === 'test' ? `Probe: ${exam.title}` : exam.title, back);
  const st = await exams.status(p, exam);
  const plan = kind === 'test' ? exams.testPlan(st.entries, exam.size) : buildPlan(st.entries, st.portion, st.progress);
  await runSession(view, {
    profile: p, plan, mode: kind === 'test' ? exam.mode : p.mode, exam: kind === 'test',
    label: `${kind === 'test' ? '📝 Probe' : '📅 Vorbereitung'}: ${exam.title}`,
    onExit: () => { location.hash = back; },
    onFinish: async ({ total, right, missedIds }) => {
      if (kind !== 'test') return finishExtra(null);
      const fresh = await db.get('profiles', p.id);
      const e = fresh.exams.find((x) => x.id === id);
      e.results = [...(e.results || []), { at: Date.now(), total, right, missed: missedIds }];
      await profiles.save(fresh);
      state.profile = fresh;
      const score = Math.round((right / Math.max(1, total)) * 100);
      const verdict = score >= 90 ? 'Du bist bestens vorbereitet! 🏆' : score >= 75 ? 'Schon richtig gut! Rechne die Fehler noch einmal.' : score >= 50 ? 'Auf dem Weg. Schau dir die Fehler im Fehlerheft an.' : 'Da geht noch was. Übe jeden Tag ein bisschen.';
      return `<div class="finish-stats"><div class="finish-stat"><b>${score} %</b><span>richtig</span></div></div><p class="hint">${verdict}</p>`;
    },
  });
}

async function settingsView() {
  const p = state.profile;
  setHeader('Einstellungen', '#/');
  view.innerHTML = `
    <section class="card">
      <h2>Design für ${esc(p.name)}</h2>
      <div class="choices">
        ${THEMES.map((t) => `
          <label class="choice">
            <input type="radio" name="theme" value="${t.id}"${t.id === (p.theme || 'auto') ? ' checked' : ''}>
            <span><strong>${t.name}</strong><small>${t.hint}</small></span>
          </label>`).join('')}
      </div>
    </section>
    <section class="card">
      <h2>Aufgaben pro Runde</h2>
      <div class="segmented">
        ${[5, 10, 15, 20].map((n) => `<label><input type="radio" name="round" value="${n}"${n === (p.roundSize || 10) ? ' checked' : ''}><span>${n}</span></label>`).join('')}
      </div>
    </section>
    <a class="btn more-link" href="#/profiles">👥 Benutzer wechseln</a>
    <a class="btn more-link parents-link" href="#/parents">🔒 Elternbereich</a>
  `;
  view.querySelectorAll('input[name=theme]').forEach((el) => el.addEventListener('change', async () => {
    p.theme = el.value; await profiles.save(p); applyTheme();
  }));
  view.querySelectorAll('input[name=round]').forEach((el) => el.addEventListener('change', async () => {
    p.roundSize = Number(el.value); await profiles.save(p);
  }));
}

// ---- Router ----------------------------------------------------------

const routes = [
  [/^#\/welcome$/, () => welcomeView(false)],
  [/^#\/profiles$/, () => profilesView()],
  [/^#\/grades$/, () => gradesView()],
  [/^#\/grade\/(\d+)$/, (m) => gradeView(Number(m[1]))],
  [/^#\/topic\/(.+)$/, (m) => topicView(decodeURIComponent(m[1]))],
  [/^#\/learn\/(.+)$/, (m) => learnView(decodeURIComponent(m[1]))],
  [/^#\/lesson\/(.+)$/, (m) => lessonView(decodeURIComponent(m[1]))],
  [/^#\/review$/, () => reviewView()],
  [/^#\/mistakes$/, () => mistakesView(null)],
  [/^#\/mistakes\/(.+)$/, (m) => mistakesView(decodeURIComponent(m[1]))],
  [/^#\/mix\/(\d+)$/, (m) => mixView(Number(m[1]))],
  [/^#\/exam\/([^/]+)\/(prep|test)$/, (m) => examRunView(decodeURIComponent(m[1]), m[2])],
  [/^#\/exam\/([^/]+)$/, (m) => examView(decodeURIComponent(m[1]))],
  [/^#\/settings$/, () => settingsView()],
  [/^#\/parents(.*)$/, (m) => parentsRoute({ view, setHeader, grade: state.profile?.grade, refresh: refreshProfile }, m[1])],
];

async function refreshProfile() {
  state.profile = await profiles.current();
  applyTheme();
}

async function route() {
  const hash = location.hash || '#/';
  stop();
  // Leaving the parents area locks it again, so kids can't just tap back in.
  if (!hash.startsWith('#/parents')) lock();
  if (!state.profile && !hash.startsWith('#/parents')) {
    await welcomeView(true);
  } else {
    let matched = false;
    for (const [re, fn] of routes) {
      const m = hash.match(re);
      if (m) { await fn(m); matched = true; break; }
    }
    if (!matched) await homeView();
  }
  document.getElementById('settings-btn').hidden = !state.profile || hash.startsWith('#/parents');
  view.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

async function start() {
  state.profile = await profiles.current();
  applyTheme();
  document.getElementById('settings-btn').onclick = () => { location.hash = '#/settings'; };
  // Read-aloud buttons anywhere (lessons, tasks, dialogs).
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.speak[data-say]');
    if (b) { e.preventDefault(); e.stopPropagation(); speak(decodeURIComponent(b.dataset.say)); }
  });
  db.persist();
  window.addEventListener('hashchange', route);
  await route();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
}

start().catch((err) => {
  view.innerHTML = `<p class="empty">Fehler beim Starten: ${esc(err.message)}</p>`;
});
