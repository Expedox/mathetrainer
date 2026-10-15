// Numbers, fractions and terms: random helpers, display and answer checking.
//
// A task (made by a skill in skills.js) looks like
//   { q: html, kind, value | expr | vals, show: html, steps: [html], traps: [{ v, why }],
//     unit, tol, reduced, opts }
// kind: 'num'  – a number (also accepts fractions like 3/4), value, tol
//       'frac' – a fraction, value; reduced: true asks for the fully reduced form
//       'expr' – a term in x, expr (JS-like string, e.g. "3*x^2+2")
//       'anti' – an antiderivative (any constant is fine), expr
//       'pair' – x and y, vals: [x, y]
//       'set'  – solutions in any order, vals
//       'rest' – quotient and remainder, vals: [q, r]
//       'pick' – one of opts (always shown as buttons), value: the right option

// ---- Random ------------------------------------------------------------

export const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const nz = (a, b) => { let n; do n = ri(a, b); while (n === 0); return n; };
export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
export const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
export const round = (x, d = 2) => Math.round(x * 10 ** d) / 10 ** d;

// ---- Display -------------------------------------------------------------

const MINUS = '−';

// German number format: comma, thin spaces from 10 000 on, "−" for minus.
export function fmt(n, digits) {
  if (!Number.isFinite(n)) return String(n);
  let s = digits === undefined ? String(round(n, 6)) : n.toFixed(digits);
  if (s.includes('e')) s = n.toLocaleString('de-AT', { maximumFractionDigits: 10 });
  const neg = s.startsWith('-');
  if (neg) s = s.slice(1);
  let [int, dec] = s.split('.');
  if (int.length > 4) int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${neg ? MINUS : ''}${int}${dec ? `,${dec}` : ''}`;
}

// Number in brackets when negative, for "3 − (−4)".
export const br = (n) => (n < 0 ? `(${fmt(n)})` : fmt(n));

export function frac(n, d) {
  if (typeof n === 'string' || typeof d === 'string') return `<span class="frac"><span>${n}</span><span>${d}</span></span>`;
  if (d < 0) { n = -n; d = -d; }
  if (d === 1) return fmt(n);
  return `${n < 0 ? MINUS : ''}<span class="frac"><span>${Math.abs(n)}</span><span>${d}</span></span>`;
}

export function reduce(n, d) {
  const g = gcd(n, d);
  const s = d < 0 ? -1 : 1;
  return [s * n / g, s * d / g];
}

export const fracR = (n, d) => frac(...reduce(n, d));

// Polynomial from coefficients, highest power first: [3, 0, -2] → 3x² − 2.
export function poly(coeffs, v = 'x') {
  const deg = coeffs.length - 1;
  const parts = [];
  coeffs.forEach((c, i) => {
    if (!c) return;
    const p = deg - i;
    const abs = Math.abs(c);
    const num = abs === 1 && p > 0 ? '' : fmt(abs);
    const pow = p === 0 ? '' : p === 1 ? v : `${v}${sup(p)}`;
    parts.push({ neg: c < 0, s: `${num}${pow}` });
  });
  if (!parts.length) return '0';
  return parts.map((t, i) => (i === 0 ? `${t.neg ? MINUS : ''}${t.s}` : ` ${t.neg ? MINUS : '+'} ${t.s}`)).join('');
}

// Same polynomial as a string for the term checker.
export function polyExpr(coeffs, v = 'x') {
  const deg = coeffs.length - 1;
  return coeffs.map((c, i) => `(${c})*${v}^${deg - i}`).join('+') || '0';
}

const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
export const sup = (n) => String(n).split('').map((c) => SUP[c] ?? c).join('');

// ---- Parsing -------------------------------------------------------------

function clean(s) {
  return String(s).trim()
    .replace(/[−–—]/g, '-').replace(/[·×∙⋅]/g, '*').replace(/÷/g, ':')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, (m) => `^(${m.split('').map((c) => Object.keys(SUP).find((k) => SUP[k] === c)).join('')})`)
    .replace(/\s+/g, ' ');
}

// "3,5", "-2", "1.000.000", "1 000", "3/4", "1 1/2" → number, or null.
export function parseNumber(raw) {
  let s = clean(raw).replace(/\s*(?:mm|cm|dm|km|m)\^\([23]\)$/i, '').replace(/\s*(€|(?:mm|cm|dm|km|m)[²³]|(?:mm|cm|dm|km|m)|ha|ml|dl|kg|dag|l|a|g|%|°|h|min|s|c|t|Euro|Cent)$/i, '').trim();
  if (!s) return null;
  if (/^-?\d{1,3}(\.\d{3}){2,}$/.test(s)) s = s.replace(/\./g, '');
  const mixed = s.match(/^(-?)(\d+) (\d+)\/(\d+)$/);
  if (mixed) {
    const v = Number(mixed[2]) + Number(mixed[3]) / Number(mixed[4]);
    return mixed[1] ? -v : v;
  }
  s = s.replace(/ /g, '').replace(',', '.');
  const f = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (f) return Number(f[2]) ? Number(f[1]) / Number(f[2]) : null;
  return /^-?\d*\.?\d+$/.test(s) ? Number(s) : null;
}

// Fraction as written: [n, d], or null.
export function parseFraction(raw) {
  const s = clean(raw).replace(/ /g, '');
  const m = s.match(/^(-?\d+)\/(-?\d+)$/);
  if (m) return Number(m[2]) ? [Number(m[1]), Number(m[2])] : null;
  if (/^-?\d+$/.test(s)) return [Number(s), 1];
  return null;
}

// All numbers in an answer like "x = 3, y = -2" or "7 R 5".
export function parseNumbers(raw) {
  const s = clean(raw).replace(/\b[xy]\s*[₁₂12]?\s*=/gi, ' ');
  return [...s.matchAll(/-?\d+(?:[.,]\d+)?(?:\/\d+)?/g)].map((m) => parseNumber(m[0])).filter((n) => n !== null);
}

// Tiny term parser: + - * / : ^, brackets, implicit products (2x, 3(x+1)).
export function compile(raw) {
  const src = clean(raw).replace(/,/g, '.').toLowerCase();
  const toks = [];
  const re = /\s*(\d*\.?\d+|[a-z]|[-+*/:^()])/y;
  let m; let i = 0;
  while (i < src.length) {
    re.lastIndex = i;
    m = re.exec(src);
    if (!m) throw new Error('bad');
    toks.push(m[1]); i = re.lastIndex;
    while (src[i] === ' ') i++;
  }
  let p = 0;
  const peek = () => toks[p];
  const isAtomStart = (t) => t !== undefined && (/^[\d.]/.test(t) || /^[a-z]$/.test(t) || t === '(');
  function expr() {
    let left = term();
    while (peek() === '+' || peek() === '-') {
      const op = toks[p++]; const right = term(); const l = left;
      left = op === '+' ? (v) => l(v) + right(v) : (v) => l(v) - right(v);
    }
    return left;
  }
  function term() {
    let left = unary();
    for (;;) {
      if (peek() === '*' || peek() === '/' || peek() === ':') {
        const op = toks[p++]; const right = unary(); const l = left;
        left = op === '*' ? (v) => l(v) * right(v) : (v) => l(v) / right(v);
      } else if (isAtomStart(peek())) {
        const right = power(); const l = left;
        left = (v) => l(v) * right(v);
      } else return left;
    }
  }
  function unary() {
    if (peek() === '-') { p++; const f = unary(); return (v) => -f(v); }
    if (peek() === '+') { p++; return unary(); }
    return power();
  }
  function power() {
    const base = atom();
    if (peek() === '^') { p++; const e = unary(); return (v) => base(v) ** e(v); }
    return base;
  }
  function atom() {
    const t = toks[p++];
    if (t === undefined) throw new Error('bad');
    if (t === '(') { const e = expr(); if (toks[p++] !== ')') throw new Error('bad'); return e; }
    if (/^[\d.]/.test(t)) { const n = Number(t); return () => n; }
    if (/^[a-z]$/.test(t)) return (v) => (t in v ? v[t] : NaN);
    throw new Error('bad');
  }
  const f = expr();
  if (p !== toks.length) throw new Error('bad');
  return f;
}

const POINTS = [-2.3, -1.1, 0.4, 1.7, 3.2];
const close = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));

export function sameExpr(a, b, anti = false) {
  try {
    const f = compile(a); const g = compile(b);
    const d = (fn, x) => (anti ? fn({ x }) - fn({ x: 0 }) : fn({ x }));
    return POINTS.every((x) => { const u = d(f, x); const w = d(g, x); return Number.isFinite(u) && close(u, w); });
  } catch { return false; }
}

// ---- Checking ------------------------------------------------------------

const numEq = (a, b, tol) => (tol ? Math.abs(a - b) <= tol + 1e-9 : close(a, b, 1e-9));

// Does a raw answer equal a value of this task's kind (the solution or a trap)?
export function matches(task, raw, v) {
  switch (task.kind) {
    case 'pick': return raw === v;
    case 'expr': case 'anti': return sameExpr(raw, v, task.kind === 'anti');
    case 'pair': case 'rest': {
      const n = parseNumbers(raw);
      return n.length === v.length && n.every((x, i) => numEq(x, v[i], task.tol));
    }
    case 'set': {
      const n = parseNumbers(raw).sort((a, b) => a - b);
      const want = [...new Set(v)].sort((a, b) => a - b);
      const got = [...new Set(n.map((x) => round(x, 6)))].sort((a, b) => a - b);
      return got.length === want.length && got.every((x, i) => numEq(x, want[i], task.tol));
    }
    default: {
      const n = parseNumber(raw);
      return n !== null && numEq(n, v, task.tol);
    }
  }
}

export const answerOf = (task) => (['expr', 'anti'].includes(task.kind) ? task.expr : ['pair', 'set', 'rest'].includes(task.kind) ? task.vals : task.value);

// → { ok, why, empty, unreadable }
export function check(task, raw) {
  if (!String(raw).trim()) return { ok: false, empty: true };
  if (matches(task, raw, answerOf(task))) {
    if (task.kind === 'frac' && task.reduced) {
      const f = parseFraction(raw);
      if (!f) return { ok: false, why: 'Schreib das Ergebnis als Bruch, z. B. 3/4.' };
      if (gcd(f[0], f[1]) !== 1) return { ok: false, why: `Der Wert stimmt, aber der Bruch lässt sich noch durch ${gcd(f[0], f[1])} kürzen.` };
    }
    return { ok: true };
  }
  return { ok: false, why: diagnose(task, raw) };
}

// Why is the answer wrong? First the task's own typical mistakes, then general ones.
function diagnose(task, raw) {
  for (const t of task.traps ?? []) if (t.v !== undefined && matches(task, raw, t.v)) return t.why;
  if (task.kind === 'pick') return '';
  if (task.kind === 'expr' || task.kind === 'anti') {
    try { compile(raw); } catch { return 'Diesen Term konnte ich nicht lesen. Schreib z. B. 3x^2 + 2x − 1.'; }
    return '';
  }
  if (task.kind === 'pair') {
    // labels: names of the two values (default x and y), e.g. ['Stunde', 'Minute'].
    const [a, b] = task.labels ?? ['x', 'y'];
    const n = parseNumbers(raw);
    if (n.length !== 2) return `Gib beide Werte an, zuerst ${a}, dann ${b} (z. B. ${task.labels ? '9; 15' : '3; −2'}).`;
    if (matches(task, raw, [...task.vals].reverse())) return `Du hast ${a} und ${b} vertauscht.`;
    const ok = n.map((x, i) => numEq(x, task.vals[i], task.tol));
    if (ok[0] !== ok[1]) return `${ok[0] ? a : b} stimmt, ${ok[0] ? b : a} nicht.${task.labels ? '' : ' Setz deinen richtigen Wert in eine Gleichung ein und rechne den anderen neu aus.'}`;
    return '';
  }
  if (task.kind === 'set') {
    const n = parseNumbers(raw);
    const want = new Set(task.vals);
    if (n.length < want.size) return `Es gibt ${want.size} Lösungen. ${n.some((x) => task.vals.some((v) => numEq(x, v, task.tol))) ? 'Eine hast du schon richtig.' : ''}`;
    return '';
  }
  if (task.kind === 'rest') {
    const [q, r] = parseNumbers(raw);
    const [d] = [task.divisor];
    if (r === undefined) return 'Schreib das Ergebnis und den Rest, z. B. 7 R 5.';
    if (d && q * d + r === task.dividend && r >= d) return `Der Rest muss kleiner als ${d} sein. Da passt ${d} noch einmal hinein.`;
    if (q === task.vals[0]) return 'Das Ergebnis stimmt, aber der Rest nicht. Rechne: Zahl minus Ergebnis mal Teiler.';
    return '';
  }
  const n = parseNumber(raw);
  if (n === null) return task.kind === 'frac' ? 'Schreib den Bruch mit Schrägstrich, z. B. 3/4.' : 'Das ist keine Zahl, die ich lesen kann.';
  const v = task.value;
  if (v !== 0 && numEq(n, -v, task.tol)) return 'Fast: Nur das Vorzeichen ist falsch.';
  for (const k of [10, 100, 1000]) {
    if (v !== 0 && (numEq(n, v * k, task.tol) || numEq(n, v / k, task.tol))) return `Die Ziffern stimmen, aber die Zahl ist ${k}-mal zu ${numEq(n, v * k, task.tol) ? 'groß' : 'klein'}. Prüfe das Komma${task.unit ? ' und die Einheit' : ''}.`;
  }
  if (Number.isInteger(v) && Math.abs(v) >= 10 && Math.abs(n - v) <= 2) return 'Ganz knapp daneben. Prüfe deine Rechnung Schritt für Schritt.';
  return '';
}

// Display of the solution, for feedback and the mistake book.
export function solution(task) {
  if (task.show) return task.show;
  switch (task.kind) {
    case 'pair':
      if (task.pairStyle === 'clock') return `${task.vals[0]}:${String(task.vals[1]).padStart(2, '0')} Uhr`;
      if (task.labels) return `${fmt(task.vals[0])} ${task.labels[0]}, ${fmt(task.vals[1])} ${task.labels[1]}`;
      return `x = ${fmt(task.vals[0])}, y = ${fmt(task.vals[1])}`;
    case 'set': return [...new Set(task.vals)].map((v, i, a) => `x${a.length > 1 ? ['₁', '₂', '₃'][i] : ''} = ${fmt(v)}`).join(', ');
    case 'rest': return `${fmt(task.vals[0])} Rest ${fmt(task.vals[1])}`;
    default: return fmt(task.value);
  }
}

// Wrong options for multiple choice: typical mistakes first, then nearby values.
export function options(task, count = 4) {
  if (task.kind === 'pick') return task.opts.map((o) => ({ raw: o, html: o }));
  const right = { raw: rawOf(task, answerOf(task)), html: solution(task) };
  const out = [right];
  const add = (o) => {
    if (out.length >= count || !o) return;
    if (out.some((x) => x.raw === o.raw) || matches(task, o.raw, answerOf(task))) return;
    out.push(o);
  };
  for (const t of shuffle([...(task.traps ?? [])])) if (t.v !== undefined) add({ raw: rawOf(task, t.v), html: t.show ?? showOf(task, t.v) });
  if (task.kind === 'num' || task.kind === 'frac') {
    const v = task.value;
    const dec = task.tol ? Math.max(0, Math.ceil(-Math.log10(task.tol))) : 2;
    const base = Number.isInteger(v) ? Math.max(1, Math.round(Math.abs(v) * 0.1)) : Math.max(task.tol ? task.tol * 10 : 0.1, Math.abs(v) * 0.15);
    const ks = [1, -1, 2, -2, 3, -3, 4, 5, -4, 6, 7, 8, 9, 10, 12, 15];
    for (const k of shuffle(ks.slice(0, 6)).concat(ks.slice(6))) {
      const c = v + k * base;
      if (v >= 0 && c < 0) continue;
      const val = Number.isInteger(v) ? Math.round(c) : round(c, dec);
      add({ raw: rawOf(task, val), html: task.kind === 'frac' ? approxFrac(val) : fmt(val) });
    }
  } else if (task.coeffs) {
    for (let k = 0; out.length < count && k < 40; k++) {
      const c = task.coeffs.slice(); const i = Math.floor(Math.random() * c.length);
      c[i] = Math.random() < 0.3 && c[i] ? -c[i] : c[i] + pick([-2, -1, 1, 2]);
      add({ raw: polyExpr(c), html: poly(c) + (task.kind === 'anti' ? ' + C' : '') });
    }
  } else if (['pair', 'set', 'rest'].includes(task.kind)) {
    for (let k = 0; k < 12; k++) {
      const vals = task.vals.map((x) => x + pick([-2, -1, 1, 2]));
      add({ raw: rawOf(task, vals), html: showOf(task, vals) });
    }
  }
  return shuffle(out);
}

function approxFrac(v) {
  for (let d = 1; d <= 24; d++) if (Number.isInteger(round(v * d, 6))) return frac(round(v * d, 6), d);
  return fmt(v);
}

function rawOf(task, v) {
  if (Array.isArray(v)) return v.join(';');
  if (task.kind === 'frac') {
    for (let d = 1; d <= 400; d++) if (Number.isInteger(round(v * d, 6))) return d === 1 ? String(round(v, 6)) : `${round(v * d, 6)}/${d}`;
  }
  return String(v);
}

function showOf(task, v) {
  if (task.kind === 'expr' || task.kind === 'anti') return String(v).replace(/\*/g, '·').replace(/\^(\d)/g, (_, d) => sup(d)).replace(/-/g, '−');
  if (Array.isArray(v)) return solution({ ...task, vals: v, show: undefined });
  if (task.kind === 'frac') return approxFrac(v);
  return fmt(v);
}
