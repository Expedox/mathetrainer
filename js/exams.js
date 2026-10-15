// Planned exams (Schularbeit, Test): parents set date, topics and size; the
// child sees a countdown, gets a daily prep portion and can take a practice test.
//
// profile.exams: [{ id, title, date, grade, topics: [topicId], includePrev,
//                   size, mode, created, results: [{ at, total, right, missed: [mistakeId] }] }]

import * as db from './db.js';
import * as srs from './srs.js';
import * as profiles from './profiles.js';
import { esc, STAGES, classLabel, plainText } from './util.js';
import { allTopics, topicsFor, entriesOf, SKILLS } from './skills.js';
import { shuffle, solution } from './math.js';

export const SIZES = [10, 15, 20, 30];
const MIN_PORTION = 10;
const MAX_PORTION = 25;

const fmtDate = (t) => new Date(t).toLocaleDateString('de-AT', { weekday: 'short', day: 'numeric', month: 'numeric' });

export function countdown(exam) {
  const d = srs.daysUntil(exam.date);
  if (d > 1) return `in ${d} Tagen`;
  if (d === 1) return 'morgen';
  if (d === 0) return 'heute';
  return `war am ${fmtDate(exam.date)}`;
}

// Upcoming plus those up to 3 days past, soonest first.
export function upcoming(p) {
  return (p.exams || []).filter((e) => srs.daysUntil(e.date) >= -3).sort((a, b) => a.date - b.date);
}

export function examTopics(exam) {
  const ids = new Set(exam.topics);
  return allTopics().filter((t) => ids.has(t.id) || (exam.includePrev && t.grade < exam.grade));
}

// One entry per skill (the first topic that has it).
function examEntries(exam) {
  const seen = new Set();
  return entriesOf(examTopics(exam)).filter((e) => !seen.has(e.skill) && seen.add(e.skill));
}

// How ready the child is, and today's portion of tasks.
export async function status(p, exam) {
  const entries = examEntries(exam);
  const progress = await srs.progressMap(p.id, entries.map((e) => ({ id: e.skill })));
  const boxes = entries.map((e) => progress.get(e.skill).box);
  const solid = boxes.filter((b) => b >= 2).length;
  // Readiness: a skill solved right once counts half, twice or more counts full.
  const score = boxes.reduce((n, b) => n + Math.min(b, 2) / 2, 0);
  const open = entries.length - solid;
  const days = Math.max(1, srs.daysUntil(exam.date));
  const portion = Math.max(MIN_PORTION, Math.min(MAX_PORTION, Math.ceil((open * 3) / days)));
  return { entries, progress, solid, total: entries.length, ready: entries.length ? Math.round((score / entries.length) * 100) : 0, portion };
}

// Practice test: the whole material, evenly spread and shuffled.
export function testPlan(entries, size) {
  const plan = [];
  const order = shuffle(entries.slice());
  for (let i = 0; plan.length < size && order.length; i++) plan.push({ ...order[i % order.length] });
  return shuffle(plan);
}

export function bestResult(exam) {
  return (exam.results || []).reduce((best, r) => (!best || r.right / r.total > best.right / best.total ? r : best), null);
}

export const pct = (r) => Math.round((r.right / Math.max(1, r.total)) * 100);

// ---- Parents: plan / edit ----------------------------------------------

export async function examFormView(ctx, childId, examId) {
  const { view } = ctx;
  const p = await db.get('profiles', childId);
  if (!p) { location.hash = '#/parents'; return; }
  const back = `#/parents/child/${encodeURIComponent(childId)}`;
  const existing = (p.exams || []).find((e) => e.id === examId);
  const exam = existing ?? {
    title: 'Schularbeit', date: srs.startOfDay(Date.now()) + 7 * 864e5, grade: p.grade,
    topics: null, includePrev: false, size: 15, mode: p.grade <= 2 ? 'choice' : 'write',
  };
  ctx.setHeader(existing ? 'Prüfung bearbeiten' : 'Prüfung planen', back);
  const toInput = (t) => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

  view.innerHTML = `
    <form class="form">
      <section class="card form">
        <label class="field"><span>Was steht an?</span><input name="title" required maxlength="40" value="${esc(exam.title)}" placeholder="z. B. Schularbeit, Test"></label>
        <label class="field"><span>Datum</span><input type="date" name="date" required value="${toInput(exam.date)}"></label>
        <label class="field"><span>Stoff aus Klasse</span>
          <select name="grade">${STAGES.map((s) => `<optgroup label="${s.name}">${s.grades.map((g) => `<option value="${g}"${g === exam.grade ? ' selected' : ''}>${classLabel(g)}</option>`).join('')}</optgroup>`).join('')}</select>
        </label>
        <label class="choice"><input type="checkbox" name="prev"${exam.includePrev ? ' checked' : ''}><span><strong>Auch alle früheren Klassen</strong><small>Für Prüfungen, bei denen alter Stoff dazukommt</small></span></label>
      </section>
      <section class="card">
        <div class="row between"><h2>Themen</h2><button type="button" class="link-btn" id="toggle-all">Alle an/aus</button></div>
        <div class="choices" id="topics"></div>
      </section>
      <section class="card form">
        <label class="field"><span>Aufgaben in der Probe-Prüfung</span>
          <select name="size">${SIZES.map((n) => `<option value="${n}"${n === exam.size ? ' selected' : ''}>${n}</option>`).join('')}</select>
        </label>
        <label class="field"><span>Art der Prüfung</span>
          <select name="mode">
            <option value="write"${exam.mode === 'write' ? ' selected' : ''}>Eintippen (wie bei der Schularbeit)</option>
            <option value="choice"${exam.mode === 'choice' ? ' selected' : ''}>Auswählen</option>
          </select>
        </label>
        <p class="hint" id="exam-info"></p>
      </section>
      <button class="btn primary big sticky-save">${existing ? 'Speichern' : 'Prüfung planen'}</button>
      ${existing ? '<button type="button" class="btn danger" id="delete">Prüfung löschen</button>' : ''}
    </form>`;

  const form = view.querySelector('form');
  const box = view.querySelector('#topics');
  const info = view.querySelector('#exam-info');
  const checked = () => [...form.querySelectorAll('input[name=t]:checked')].map((el) => el.value);

  function updateInfo() {
    const n = examEntries({ grade: Number(form.grade.value), includePrev: form.prev.checked, topics: checked() }).length;
    info.textContent = n ? `${n} Aufgabentypen Prüfungsstoff.` : 'Bitte mindestens ein Thema wählen.';
  }
  function drawTopics(keep) {
    const list = topicsFor(Number(form.grade.value));
    const chosen = keep ?? new Set(list.map((t) => t.id));
    box.innerHTML = list.map((t) => `<label class="choice"><input type="checkbox" name="t" value="${esc(t.id)}"${chosen.has(t.id) ? ' checked' : ''}><span><strong>${esc(t.icon)} ${esc(t.title)}</strong><small>${t.skills.map((s) => esc(SKILLS[s].name)).join(', ')}</small></span></label>`).join('');
    updateInfo();
  }
  form.grade.addEventListener('change', () => drawTopics());
  form.addEventListener('change', (e) => { if (e.target.name !== 'grade') updateInfo(); });
  view.querySelector('#toggle-all').onclick = () => {
    const boxes = [...box.querySelectorAll('input')];
    const on = !boxes.every((b) => b.checked);
    boxes.forEach((b) => { b.checked = on; });
    updateInfo();
  };
  drawTopics(exam.topics ? new Set(exam.topics) : null);

  form.onsubmit = async (e) => {
    e.preventDefault();
    const topics = checked();
    if (!topics.length && !form.prev.checked) { info.textContent = 'Bitte mindestens ein Thema wählen.'; return; }
    const [y, m, d] = form.date.value.split('-').map(Number);
    const next = {
      ...exam,
      id: existing?.id ?? `x-${Date.now().toString(36)}`,
      title: form.title.value.trim(), date: new Date(y, m - 1, d).getTime(),
      grade: Number(form.grade.value), topics, includePrev: form.prev.checked,
      size: Number(form.size.value), mode: form.mode.value,
      created: existing?.created ?? Date.now(), results: existing?.results ?? [],
    };
    p.exams = [...(p.exams || []).filter((x) => x.id !== next.id), next];
    await profiles.save(p);
    await ctx.refresh();
    location.hash = back;
  };
  view.querySelector('#delete')?.addEventListener('click', async () => {
    if (!confirm(`„${exam.title}“ löschen?`)) return;
    p.exams = (p.exams || []).filter((x) => x.id !== exam.id);
    await profiles.save(p);
    await ctx.refresh();
    location.hash = back;
  });
}

// Section for the parents' child page.
export async function examsSection(p) {
  const list = (p.exams || []).slice().sort((a, b) => b.date - a.date);
  const rows = await Promise.all(list.map(async (e) => ({ e, s: await status(p, e) })));
  const base = `#/parents/child/${encodeURIComponent(p.id)}`;
  return `
    <section class="card">
      <h2>Prüfungen</h2>
      ${rows.length ? `<ul class="exam-list">
        ${rows.map(({ e, s }) => {
          const best = bestResult(e);
          const last = e.results?.at(-1);
          return `<li>
            <a href="${base}/exam/${encodeURIComponent(e.id)}">
              <span class="exam-main"><strong>${esc(e.title)}</strong><small>${fmtDate(e.date)} · ${countdown(e)} · ${s.total} Aufgabentypen</small></span>
              <span class="exam-side">${s.ready} % bereit${last ? `<small>Probe: ${pct(last)} %${best !== last ? ` (best ${pct(best)} %)` : ''}</small>` : '<small>noch keine Probe</small>'}</span>
            </a>
            <span class="tp-bar"><span style="width:${s.ready}%"></span></span>
            ${e.results?.length ? `<button class="link-btn share-exam" data-id="${esc(e.id)}">📤 Ergebnis teilen</button>` : ''}
          </li>`;
        }).join('')}
      </ul>` : '<p class="hint">Plane eine Schularbeit oder einen Test: Das Kind sieht dann einen Countdown und bekommt jeden Tag eine passende Portion zum Üben.</p>'}
      <a class="btn" href="${base}/exam/new">📅 Prüfung planen</a>
    </section>`;
}

export async function examReport(p, exam) {
  const s = await status(p, exam);
  const lines = [`${exam.title} von ${p.name} am ${new Date(exam.date).toLocaleDateString('de-AT')}`, `Stoff: ${s.total} Aufgabentypen, davon ${s.solid} sicher (${s.ready} %).`];
  for (const r of (exam.results || []).slice(-5)) {
    lines.push(`Probe-Prüfung ${new Date(r.at).toLocaleDateString('de-AT')}: ${r.right}/${r.total} richtig (${pct(r)} %)`);
  }
  const last = exam.results?.at(-1);
  if (last?.missed.length) {
    const rows = (await Promise.all(last.missed.map((id) => db.get('mistakes', id)))).filter(Boolean);
    lines.push('', 'Fehler in der letzten Probe:', ...rows.map((m) => `- ${plainText(m.task.q)}: ${m.given || '–'} statt ${plainText(solution(m.task))}`));
  }
  return lines.join('\n');
}
