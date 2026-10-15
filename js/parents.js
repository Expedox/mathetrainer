// Parents/teachers area behind a 4-digit PIN.

import * as db from './db.js';
import { esc, classLabel } from './util.js';
import * as io from './io.js';
import * as profiles from './profiles.js';
import { childSummary, childView, tasksView, editChildView } from './child.js';
import { examFormView } from './exams.js';
import * as srs from './srs.js';

const UNLOCK_MS = 10 * 60 * 1000;
let unlockedUntil = 0;
let pinKey = () => {};

async function hashPin(pin) {
  let salt = await db.getMeta('pinSalt');
  if (!salt) { salt = io.newId('salt'); await db.setMeta('pinSalt', salt); }
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${pin}`));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const isUnlocked = () => Date.now() < unlockedUntil;
const touch = () => { unlockedUntil = Date.now() + UNLOCK_MS; };
export const lock = () => { unlockedUntil = 0; };

function toast(view, text, kind = 'ok') {
  const el = view.querySelector('.toast');
  if (!el) return;
  el.textContent = text;
  el.className = `toast ${kind}`;
  el.hidden = false;
}

// ---- PIN -------------------------------------------------------------

function pinPad(view, { title, hint, onPin, extra = '' }) {
  let pin = '';
  view.innerHTML = `
    <div class="pin">
      <div class="lock" aria-hidden="true">🔒</div>
      <h2>${title}</h2>
      <p class="hint">${hint}</p>
      <div class="pin-dots" aria-live="polite">${'<span></span>'.repeat(4)}</div>
      <p class="pin-error" hidden></p>
      <div class="keypad">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button class="key" data-k="${n}">${n}</button>`).join('')}
        <span></span><button class="key" data-k="0">0</button><button class="key" data-k="del" aria-label="Löschen">⌫</button>
      </div>
      ${extra}
    </div>`;
  const dots = view.querySelectorAll('.pin-dots span');
  const err = view.querySelector('.pin-error');
  const draw = () => dots.forEach((d, i) => d.classList.toggle('on', i < pin.length));
  const press = async (k) => {
    if (k === 'del') pin = pin.slice(0, -1);
    else if (pin.length < 4) pin += k;
    err.hidden = true;
    draw();
    if (pin.length === 4) {
      const msg = await onPin(pin);
      if (msg) { err.textContent = msg; err.hidden = false; pin = ''; setTimeout(draw, 150); }
    }
  };
  view.querySelectorAll('.key').forEach((b) => { b.onclick = () => press(b.dataset.k); });
  document.removeEventListener('keydown', pinKey);
  pinKey = (e) => {
    if (!view.querySelector('.keypad')) return document.removeEventListener('keydown', pinKey);
    if (/^\d$/.test(e.key)) press(e.key);
    else if (e.key === 'Backspace') press('del');
  };
  document.addEventListener('keydown', pinKey);
}

function setupPin(view, done) {
  pinPad(view, {
    title: 'PIN festlegen',
    hint: 'Wähle einen 4-stelligen PIN für den Elternbereich. Kinder sollten ihn nicht kennen.',
    onPin: (first) => {
      pinPad(view, {
        title: 'PIN wiederholen',
        hint: 'Bitte gib den PIN noch einmal ein.',
        onPin: async (second) => {
          if (second !== first) { setupPin(view, done); return null; }
          await db.setMeta('pinHash', await hashPin(first));
          touch();
          done();
          return null;
        },
      });
      return null;
    },
  });
}

function mathReset(view, done) {
  const a = 12 + Math.floor(Math.random() * 30);
  const b = 13 + Math.floor(Math.random() * 20);
  view.innerHTML = `
    <form class="card form pin-reset">
      <h2>PIN vergessen?</h2>
      <p class="hint">Löse die Aufgabe, dann kannst du einen neuen PIN festlegen.</p>
      <label class="field"><span>Wie viel ist ${a} × ${b}?</span><input name="answer" inputmode="numeric" autocomplete="off" required></label>
      <p class="pin-error" hidden>Leider falsch.</p>
      <button class="btn primary">Prüfen</button>
    </form>`;
  const form = view.querySelector('form');
  form.onsubmit = (e) => {
    e.preventDefault();
    if (Number(new FormData(form).get('answer')) === a * b) setupPin(view, done);
    else { view.querySelector('.pin-error').hidden = false; }
  };
}

async function gate(view, done) {
  const stored = await db.getMeta('pinHash');
  if (!stored) { setupPin(view, done); return; }
  pinPad(view, {
    title: 'Elternbereich',
    hint: 'Bitte PIN eingeben.',
    extra: '<button class="link-btn" id="forgot">PIN vergessen?</button>',
    onPin: async (pin) => {
      if (await hashPin(pin) !== stored) return 'Falscher PIN';
      touch();
      done();
      return null;
    },
  });
  view.querySelector('#forgot').onclick = () => mathReset(view, done);
}

// ---- Views -----------------------------------------------------------

async function dashboard(ctx) {
  const { view } = ctx;
  ctx.setHeader('Elternbereich', '#/settings');
  const kids = await profiles.list();
  const sums = await Promise.all(kids.map(childSummary));
  const lastBackup = await db.getMeta('lastBackup');
  const needBackup = kids.length && sums.some((x) => x.sessions.length) && (!lastBackup || Date.now() - lastBackup > 30 * 864e5);
  // New school year (September/October): offer to move each child up one class.
  const year = srs.schoolYear();
  const month = new Date().getMonth();
  const moveUp = month >= 8 && month <= 9 ? kids.filter((k) => k.grade < 12 && (k.gradeYear ?? srs.schoolYear(k.created)) < year) : [];
  view.innerHTML = `
    ${moveUp.map((k) => `<div class="card cta soft school-year">
      <span class="emoji" aria-hidden="true">🎒</span>
      <span><strong>Neues Schuljahr</strong><small>Ist ${esc(k.name)} jetzt in der ${classLabel(k.grade + 1)}?</small>
        <span class="row"><button class="btn primary" data-up="${esc(k.id)}">Ja, hochstufen</button><button class="btn" data-keep="${esc(k.id)}">Nein</button></span>
      </span>
    </div>`).join('')}
    ${needBackup ? `<a class="card cta warn" href="#/parents/export">
      <span class="emoji" aria-hidden="true">💾</span>
      <span><strong>Sicherung empfohlen</strong><small>${lastBackup ? 'Die letzte Sicherung ist über einen Monat alt.' : 'Es gibt noch keine Sicherung des Lernfortschritts.'}</small></span>
      <span class="go" aria-hidden="true">›</span>
    </a>` : ''}
    <h3 class="section">Lernfortschritt</h3>
    ${kids.length ? `<div class="kid-cards">
      ${kids.map((k, i) => {
        const s = sums[i];
        const today = s.last14.at(-1).answers;
        return `<a class="card kid-card" href="#/parents/child/${encodeURIComponent(k.id)}">
          <span class="big-emoji">${esc(k.avatar)}</span>
          <span class="kid-main">
            <strong>${esc(k.name)}</strong>
            <small>${classLabel(k.grade)}</small>
            <span class="kid-facts">
              <span>${today ? `heute ${today} Aufgaben` : 'heute noch nicht geübt'}</span>
              <span>${s.weekDays}/7 Tage · ${s.weekQuote} % richtig · 📒 ${s.openMistakes} offen</span>
            </span>
          </span>
          <span class="go" aria-hidden="true">›</span>
        </a>`;
      }).join('')}
    </div>` : '<p class="hint">Noch kein Kind angelegt.</p>'}
    <h3 class="section">Verwalten</h3>
    <div class="grid actions">
      <a class="tile action" href="#/parents/export"><span class="emoji">💾</span><span class="name">Sichern &amp; Wiederherstellen</span></a>
      <a class="tile action" href="#/parents/pin"><span class="emoji">🔑</span><span class="name">PIN ändern</span></a>
    </div>
    <button class="btn" id="lock">🔒 Elternbereich sperren</button>
  `;
  view.querySelector('#lock').onclick = () => { lock(); location.hash = '#/'; };
  view.querySelectorAll('[data-up],[data-keep]').forEach((b) => {
    b.onclick = async () => {
      const k = await db.get('profiles', b.dataset.up || b.dataset.keep);
      if (b.dataset.up) k.grade = Math.min(12, k.grade + 1);
      k.gradeYear = year;
      await profiles.save(k);
      await ctx.refresh();
      dashboard(ctx);
    };
  });
}

async function exportView(ctx) {
  const { view } = ctx;
  ctx.setHeader('Sichern', '#/parents');
  const lastBackup = await db.getMeta('lastBackup');
  const date = new Date().toISOString().slice(0, 10);
  view.innerHTML = `
    <section class="card">
      <h2>Komplette Sicherung</h2>
      <p>Alle Kinder mit Lernfortschritt, Fehlerheft und der PIN in einer Datei. Damit kannst du auf ein neues Gerät umziehen oder nach dem Löschen der Browserdaten alles zurückholen.</p>
      <p class="hint">${lastBackup ? `Letzte Sicherung: ${new Date(lastBackup).toLocaleDateString('de-AT')}` : 'Noch keine Sicherung gemacht.'}</p>
      <div class="stack">
        <button class="btn primary" id="backup">💾 Sicherung speichern</button>
        <label class="btn file-btn">♻️ Sicherung wiederherstellen<input type="file" id="restore" accept=".json,application/json" hidden></label>
      </div>
      <p class="hint">Am iPhone öffnet sich das Teilen-Menü: „In Dateien sichern“, AirDrop oder Mail.</p>
      <p class="toast" hidden></p>
    </section>`;
  view.querySelector('#backup').onclick = async () => {
    await io.saveFile(`mathetrainer-sicherung-${date}.json`, JSON.stringify(await io.makeBackup()), 'application/json');
    await db.setMeta('lastBackup', Date.now());
  };
  view.querySelector('#restore').onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!confirm('Alle Kinder, Lernfortschritte und Fehlerhefte auf diesem Gerät durch die Sicherung ersetzen?')) { e.target.value = ''; return; }
    try {
      const r = await io.restoreBackup(await file.text());
      await ctx.refresh();
      toast(view, `Wiederhergestellt: ${r.profiles} Kinder, ${r.mistakes} Einträge im Fehlerheft.`);
    } catch (err) { toast(view, err.message, 'warn'); }
    e.target.value = '';
  };
}

function changePin(ctx) {
  ctx.setHeader('PIN ändern', '#/parents');
  setupPin(ctx.view, () => { location.hash = '#/parents'; });
}

// ---- Router ----------------------------------------------------------

export async function parentsRoute(ctx, rest) {
  const run = async () => {
    touch();
    let m;
    if (rest === '') return dashboard(ctx);
    if (rest === '/export') return exportView(ctx);
    if (rest === '/pin') return changePin(ctx);
    if ((m = rest.match(/^\/child\/([^/]+)\/tasks$/))) return tasksView(ctx, decodeURIComponent(m[1]));
    if ((m = rest.match(/^\/child\/([^/]+)\/edit$/))) return editChildView(ctx, decodeURIComponent(m[1]));
    if ((m = rest.match(/^\/child\/([^/]+)\/exam\/new$/))) return examFormView(ctx, decodeURIComponent(m[1]), null);
    if ((m = rest.match(/^\/child\/([^/]+)\/exam\/([^/]+)$/))) return examFormView(ctx, decodeURIComponent(m[1]), decodeURIComponent(m[2]));
    if ((m = rest.match(/^\/child\/([^/]+)$/))) return childView(ctx, decodeURIComponent(m[1]));
    return dashboard(ctx);
  };
  if (isUnlocked()) return run();
  ctx.setHeader('Elternbereich', '#/settings');
  return gate(ctx.view, run);
}
