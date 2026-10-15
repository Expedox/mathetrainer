// Building blocks for skills: task makers, traps and worked-step helpers.

import { ri, nz, frac, reduce, poly, polyExpr } from './math.js';

export const M = '−';
export const num = (q, value, o = {}) => ({ kind: 'num', q, value, ...o });
export const T = (v, why, show) => ({ v, why, show });
// Only traps that differ from the answer (and from each other) are kept.
export const traps = (value, list) => list.filter((t, i) => t && t.v !== undefined && t.v !== value && Number.isFinite(t.v) && list.findIndex((u) => u?.v === t.v) === i);
export const N = (task) => ({ ...task, traps: traps(task.value, task.traps ?? []) });

export function digits(n) { return String(n).split('').map(Number); }
// Digit by digit difference without borrowing: the classic mistake.
export function noBorrow(a, b) {
  const da = digits(a).reverse(); const db = digits(b).reverse();
  return Number(da.map((d, i) => Math.abs(d - (db[i] ?? 0))).reverse().join(''));
}
export function noCarry(a, b) {
  const da = digits(a).reverse(); const db = digits(b).reverse();
  const len = Math.max(da.length, db.length);
  const out = [];
  for (let i = 0; i < len; i++) out.push(((da[i] ?? 0) + (db[i] ?? 0)) % 10);
  return Number(out.reverse().join(''));
}

// Written addition / subtraction as steps, column by column.
export function columnAdd(a, b) {
  const da = digits(a).reverse(); const db = digits(b).reverse();
  const names = ['Einer', 'Zehner', 'Hunderter', 'Tausender', 'Zehntausender'];
  const steps = []; let carry = 0;
  for (let i = 0; i < Math.max(da.length, db.length); i++) {
    const s = (da[i] ?? 0) + (db[i] ?? 0) + carry;
    steps.push(`${names[i]}: ${da[i] ?? 0} + ${db[i] ?? 0}${carry ? ` + ${carry} (Übertrag)` : ''} = ${s}${s >= 10 ? `, schreibe ${s % 10}, merke 1` : ''}`);
    carry = s >= 10 ? 1 : 0;
  }
  if (carry) steps.push('Den letzten Übertrag 1 vorne hinschreiben.');
  return steps;
}
// Austrian method: add up from the lower digit (plus what was carried) to the upper one.
export function columnSub(a, b) {
  const da = digits(a).reverse(); const db = digits(b).reverse();
  const names = ['Einer', 'Zehner', 'Hunderter', 'Tausender', 'Zehntausender'];
  const steps = []; let carry = 0;
  for (let i = 0; i < da.length; i++) {
    const low = (db[i] ?? 0) + carry;
    const top = da[i] < low ? da[i] + 10 : da[i];
    const lowText = carry ? `${db[i] ?? 0} + 1 = ${low}` : `${low}`;
    if (i >= db.length && !carry) { steps.push(`${names[i]}: ${da[i]} herunterschreiben`); continue; }
    steps.push(`${names[i]}: ${carry ? `${lowText}, ` : ''}${low} + ${top - low} = ${top}, schreibe ${top - low}${top > da[i] ? ', 1 weiter' : ''}`);
    carry = top > da[i] ? 1 : 0;
  }
  return steps;
}

// Long division step by step: take digits until the divisor fits, divide, carry the rest.
export function columnDiv(n, d) {
  const ds = digits(n); const steps = []; let rest = 0; let started = false;
  for (const digit of ds) {
    const cur = rest * 10 + digit;
    const q = Math.floor(cur / d);
    if (!started && q === 0) { rest = cur; continue; }
    started = true;
    steps.push(`${cur} : ${d} = ${q}${q === 0 ? ' (passt nicht, schreibe 0)' : ''}, ${q} · ${d} = ${q * d}, Rest ${cur - q * d}`);
    rest = cur - q * d;
  }
  return steps;
}

// ---- Volksschule ---------------------------------------------------------

export const fracTask = (q, n, d, o = {}) => {
  const [rn, rd] = reduce(n, d);
  return { kind: 'frac', q, value: rn / rd, show: frac(rn, rd), placeholder: 'z. B. 3/4', ...o, traps: (o.traps ?? []).filter((t) => t && Number.isFinite(t.v) && Math.abs(t.v - rn / rd) > 1e-9) };
};
export const FT = (n, d, why) => ({ v: n / d, why, show: frac(n, d) });
export const exprTask = (q, coeffs, o = {}) => ({ kind: 'expr', q, expr: polyExpr(coeffs), coeffs, show: poly(coeffs), placeholder: 'z. B. 3x^2 + 2x − 1', keys: true, ...o });
export const ET = (coeffs, why) => ({ v: polyExpr(coeffs), why, show: poly(coeffs) });
export const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29]];
export const deg = (r) => (r * 180) / Math.PI;
export const rad = (d) => (d * Math.PI) / 180;
export const randPoly = (deg) => [nz(-5, 6), ...Array.from({ length: deg }, () => ri(-9, 9))];
export const derive = (c) => c.slice(0, -1).map((x, i) => x * (c.length - 1 - i));
export const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return r; };

// Empty answer box inside a task text. Keeps "▢" as invisible text so speech and plain-text reports still work.
const BOX = 'display:inline-block;box-sizing:border-box;border:3px solid var(--accent);border-radius:7px;overflow:hidden;text-indent:-9em;white-space:nowrap;';
export const gap = () => `<span style="${BOX}width:1.15em;height:1.15em;vertical-align:-.2em">▢</span>`;
export const gapSup = () => `<span style="${BOX}width:.7em;height:.7em;border-width:2px;border-radius:4px;vertical-align:.6em;margin:0 .05em 0 .1em">▢</span>`;
export const ask = (title, what) => `<span style="display:block;font-size:.55em;font-weight:700;line-height:1.3;margin-bottom:.3em">${title}${what}</span>`;
