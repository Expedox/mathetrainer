// Additional skills and topics (os), merged into skills.js.
// Oberstufe AHS (Schulstufe 9–12), aligned with the SRDP-Grundkompetenzkatalog (AG, FA, AN, WS).

import { ri, pick, nz, gcd, round, fmt, br, frac, poly, sup, shuffle } from '../math.js';
import { M, num, T, N, fracTask, FT, deg, rad, derive } from '../kit.js';

// ---- Helpers ---------------------------------------------------------------

// Multiple choice: traps must be one of the options.
const PK = (q, opts, value, steps, traps = [], o = {}) => ({ kind: 'pick', q, opts, value, show: value, steps,
  traps: traps.filter((t) => t && t.v !== value && opts.includes(t.v)), ...o });
const TP = (v, why) => ({ v, why });
const ev = (c, x) => c.reduce((s, k) => s * x + k, 0);
const pmul = (a, b) => { const r = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { r[i + j] += x * y; })); return r; };
const fromRoots = (k, roots) => roots.reduce((c, r) => pmul(c, [1, -r]), [k]);
const anti = (c) => [...c.map((k, i) => k / (c.length - i)), 0];
const integ = (c, a, b) => ev(anti(c), b) - ev(anti(c), a);
const padd = (a, b) => { const n = Math.max(a.length, b.length); const A = [...Array(n - a.length).fill(0), ...a]; const B = [...Array(n - b.length).fill(0), ...b]; return A.map((x, i) => x + B[i]); };
const f2 = (x) => fmt(round(x, 2), 2);
const f4 = (x) => fmt(round(x, 4), 4);
const iv = (a, b) => `[${fmt(a)}; ${fmt(b)}]`;
const vec = (v) => `(${v.map((x) => fmt(x)).join(' | ')})`;
const dotp = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
const len = (u) => Math.sqrt(dotp(u, u));
const sq = (x) => (x < 0 ? `(${fmt(x)})²` : `${fmt(x)}²`);
const TD = 'style="border:1px solid var(--border);padding:.2em .7em;text-align:center"';
const table = (rows) => `<table style="border-collapse:collapse;margin:.5em auto">${rows.map((r) => `<tr>${r.map((c) => `<td ${TD}>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const unique = (arr) => arr.filter((x, i) => arr.indexOf(x) === i);
const one = (k) => (k === 1 ? '' : k);

// Normal distribution: erf after Abramowitz and Stegun 7.1.26 (error below 2 · 10⁻⁷).
const erf = (x) => { const s = Math.sign(x); const a = Math.abs(x); const t = 1 / (1 + 0.3275911 * a);
  return s * (1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)); };
const Phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
const invPhi = (p) => { let lo = -8; let hi = 8; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (Phi(m) < p) lo = m; else hi = m; } return (lo + hi) / 2; };

const S = {};

// ---- AG 1, AG 2: Zahlen, Formeln, Ungleichungen (Schulstufe 9) -------------

const SETS = ['ℕ', 'ℤ', 'ℚ', 'ℝ', 'ℂ'];
const OVER = (d) => `0,<span style="text-decoration:overline">${d}</span>`;
const NUMS = [
  () => { const n = ri(2, 40); return [fmt(n), 'ℕ', `${n} ist eine natürliche Zahl.`, [TP('ℤ', `${n} liegt schon in ℕ. ℤ stimmt zwar auch, ist aber nicht die kleinste Menge.`)]]; },
  () => { const n = ri(2, 30); return [`${M}${n}`, 'ℤ', `${M}${n} ist eine negative ganze Zahl, also nicht in ℕ, aber in ℤ.`, [TP('ℕ', 'Natürliche Zahlen sind nie negativ.')]]; },
  () => { const k = ri(2, 9); return [`√${k * k}`, 'ℕ', `√${k * k} = ${k}, eine natürliche Zahl.`, [TP('ℝ', `Nicht jede Wurzel ist irrational: √${k * k} = ${k}.`)]]; },
  () => { const k = ri(2, 9); return [`${M}√${k * k}`, 'ℤ', `${M}√${k * k} = ${M}${k}, eine negative ganze Zahl.`, [TP('ℝ', `√${k * k} geht auf: ${M}√${k * k} = ${M}${k} ist ganz.`)]]; },
  () => { let a; let b; do { a = ri(1, 9); b = ri(2, 9); } while (a % b === 0); return [frac(a, b), 'ℚ', `${frac(a, b)} ist ein Bruch und keine ganze Zahl.`, [TP('ℝ', 'Jeder Bruch aus ganzen Zahlen liegt schon in ℚ.')]]; },
  () => { const d = pick(['3', '6', '7', '18']); return [OVER(d), 'ℚ', `Periodische Dezimalzahlen sind Brüche: ${OVER(d)} = ${frac(Number(d), d.length === 1 ? 9 : 99)}.`, [TP('ℝ', 'Unendlich viele Nachkommastellen heißt nicht irrational: Periodische Dezimalzahlen sind Brüche.')]]; },
  () => { let x; do { x = ri(11, 99); } while (x % 10 === 0); return [fmt(x / 10), 'ℚ', `${fmt(x / 10)} = ${frac(x, 10)}, ein Bruch.`, [TP('ℝ', 'Endliche Dezimalzahlen lassen sich als Bruch schreiben, also ℚ.')]]; },
  () => { const k = pick([2, 3, 5, 6, 7, 10, 11]); return [`√${k}`, 'ℝ', `√${k} geht nicht auf, die Dezimalzahl ist unendlich und nicht periodisch: irrational.`, [TP('ℚ', `√${k} lässt sich nicht als Bruch schreiben, ${k} ist keine Quadratzahl.`)]]; },
  () => ['π', 'ℝ', 'π ist irrational: unendlich viele Nachkommastellen ohne Periode.', [TP('ℚ', '3,14 oder 22/7 sind nur Näherungen. π selbst ist kein Bruch.')]],
  () => { const k = ri(2, 6); return [`√(${M}${k * k})`, 'ℂ', `Keine reelle Zahl ergibt quadriert eine negative Zahl: √(${M}${k * k}) = ${k}i liegt in ℂ.`, [TP('ℤ', `√(${M}${k * k}) ist nicht ${M}${k}, denn (${M}${k})² = ${k * k}.`)]]; },
];
S.numSets = { name: 'Zahlenmengen', rule: '<b>Zahlenmengen:</b> ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ. ℚ sind alle Brüche (auch endliche und periodische Dezimalzahlen), irrationale Zahlen wie √2 oder π liegen erst in ℝ.', gen() {
  if (Math.random() < 0.75) {
    const [x, right, why, tr] = pick(NUMS)();
    const ri0 = SETS.indexOf(right);
    return PK(`Was ist die kleinste Zahlenmenge, in der ${x} liegt?`, SETS, right, [why, 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ'], [...tr, ...SETS.map((s, i) => TP(s, i > ri0 ? `${x} liegt zwar auch in ${s}, aber schon in der kleineren Menge ${right}. ${why}` : why))]);
  }
  const k = pick([2, 3, 5, 7, 8, 12]); const irr = pick([`√${k}`, 'π', `2 + √${k}`]);
  const q = ri(2, 9) ** 2; const a = ri(1, 6); const b = pick([7, 9, 11]);
  const opts = shuffle([irr, `√${q}`, frac(a, b), OVER(ri(1, 9))]);
  return PK('Welche dieser Zahlen ist irrational?', opts, irr, [`√${q} = ${Math.sqrt(q)}, ${frac(a, b)} ist ein Bruch, periodische Dezimalzahlen sind Brüche.`, `${irr} lässt sich nicht als Bruch schreiben: irrational.`],
    opts.map((o) => TP(o, o.startsWith('√') ? `${o} = ${Math.sqrt(q)} geht auf, also rational.` : 'Brüche und periodische Dezimalzahlen sind rational.')));
} };

const FLIP = { '<': '>', '>': '<', '≤': '≥', '≥': '≤' };
const TOGGLE = { '<': '≤', '≤': '<', '>': '≥', '≥': '>' };
S.ineq = { name: 'Lineare Ungleichungen', rule: '<b>Ungleichungen</b> löst du wie Gleichungen. Aber: Multiplizierst oder dividierst du mit einer <b>negativen</b> Zahl, dreht sich das Ungleichheitszeichen um.', gen() {
  const t = ri(0, 2); const s = ri(-6, 8); const rel = pick(['<', '>', '≤', '≥']);
  let A; let lhs; let rhs; const steps = [];
  if (t === 1) {
    let a; let d; do { a = nz(-6, 6); d = nz(-6, 6); } while (a === d);
    A = a - d; const b = ri(-9, 9); const e = A * s + b;
    lhs = poly([a, b]); rhs = poly([d, e]);
    steps.push(`${lhs} ${rel} ${rhs}`, `x nach links, Zahlen nach rechts: ${poly([A, 0])} ${rel} ${fmt(e - b)}`);
  } else {
    A = nz(-6, 6); const b = ri(-9, 9);
    lhs = poly([A, b]); rhs = fmt(A * s + b);
    steps.push(`${lhs} ${rel} ${rhs}`);
    if (b) steps.push(`${b > 0 ? `${M} ${b}` : `+ ${-b}`} auf beiden Seiten: ${poly([A, 0])} ${rel} ${fmt(A * s)}`);
  }
  const rel2 = A < 0 ? FLIP[rel] : rel;
  if (A !== 1) steps.push(`: ${br(A)} auf beiden Seiten${A < 0 ? ` (negative Zahl, das Zeichen dreht sich um: aus ${rel} wird ${rel2})` : ''}: x ${rel2} ${fmt(s)}`);
  if (t === 2) {
    const lower = rel2 === '>' || rel2 === '≥'; const strict = rel2 === '>' || rel2 === '<';
    const v = rel2 === '>' ? s + 1 : rel2 === '<' ? s - 1 : s;
    steps.push(`${lower ? 'Kleinste' : 'Größte'} ganze Zahl mit x ${rel2} ${fmt(s)}: ${fmt(v)}${strict ? ` (${fmt(s)} selbst gehört nicht dazu)` : ''}`);
    return N(num(`${lhs} ${rel} ${rhs}. Welche ist die ${lower ? 'kleinste' : 'größte'} ganze Zahl, die die Ungleichung erfüllt?`, v, { steps,
      traps: [strict && T(s, `Bei ${rel2} gehört die Grenze ${fmt(s)} nicht dazu.`), T(lower ? v - 1 : v + 1, `Prüfe durch Einsetzen: ${fmt(lower ? v - 1 : v + 1)} erfüllt die Ungleichung nicht.`)] }));
  }
  const opts = ['<', '≤', '>', '≥'].map((r) => `x ${r} ${fmt(s)}`);
  const right = `x ${rel2} ${fmt(s)}`;
  return PK(`Löse die Ungleichung: ${lhs} ${rel} ${rhs}`, opts, right, steps, [
    A < 0 ? TP(`x ${rel} ${fmt(s)}`, `Zeichen nicht umgedreht: Du dividierst durch ${fmt(A)}, eine negative Zahl. Dann wird aus ${rel} ein ${rel2}.`)
      : TP(`x ${FLIP[rel]} ${fmt(s)}`, `Du dividierst durch ${fmt(A)}, eine positive Zahl. Nur bei negativen Zahlen dreht sich das Zeichen um.`),
    TP(`x ${TOGGLE[rel2]} ${fmt(s)}`, rel2 === '<' || rel2 === '>' ? 'Bei < oder > gehört die Grenze nicht dazu, also kein Gleichheitszeichen.' : 'Bei ≤ oder ≥ gehört die Grenze selbst dazu.'),
    TP(`x ${FLIP[TOGGLE[rel2]]} ${fmt(s)}`, 'Richtung und Gleichheitszeichen stimmen nicht. Setz zur Probe eine Zahl ein.'),
  ]);
} };

// Formulas: symbolic rearranging (pick) or rearrange and compute (num).
const FORMULAS = [
  { f: `v = ${frac('s', 't')}`, to: 't', right: `t = ${frac('s', 'v')}`, calc: (o) => o.s / o.v, unit: 'h',
    vals: () => { const v = pick([60, 80, 90, 100, 120]); const t = pick([0.5, 0.75, 1.5, 2, 2.5, 3]); return { s: v * t, v }; }, given: (o) => `s = ${fmt(o.s)} km und v = ${fmt(o.v)} km/h`, sub: (o) => frac(fmt(o.s), fmt(o.v)),
    wrong: [['t = s · v', 't steht im Nenner: Zuerst mit t multiplizieren (v · t = s), dann durch v dividieren.', (o) => o.s * o.v], [`t = ${frac('v', 's')}`, 'Zähler und Nenner vertauscht: Aus v · t = s folgt t = s : v.', (o) => o.v / o.s], ['t = s − v', 'Einen Bruch löst du nicht durch Subtrahieren auf, sondern durch Multiplizieren und Dividieren.', (o) => o.s - o.v]] },
  { f: `A = ${frac('(a + c) · h', '2')}`, to: 'h', right: `h = ${frac('2A', 'a + c')}`, calc: (o) => o.h, unit: 'cm',
    vals: () => { const a = ri(4, 14); const c = ri(2, a - 1); const h = ri(2, 12); return { a, c, h, A: ((a + c) * h) / 2 }; }, given: (o) => `A = ${fmt(o.A)} cm², a = ${o.a} cm und c = ${o.c} cm`, sub: (o) => frac(`2 · ${fmt(o.A)}`, `${o.a} + ${o.c}`),
    wrong: [[`h = ${frac('A', '2 · (a + c)')}`, 'Die 2 stand im Nenner: Mit 2 multiplizieren, nicht dividieren.', (o) => o.A / (2 * (o.a + o.c))], ['h = 2A − (a + c)', '(a + c) ist ein Faktor, kein Summand: Durch (a + c) dividieren.', (o) => 2 * o.A - o.a - o.c], [`h = ${frac('2A', 'a')} + c`, 'Klammer vergessen: Durch die ganze Summe (a + c) dividieren.', (o) => (2 * o.A) / o.a + o.c]] },
  { f: 'V = r² · π · h', to: 'h', right: `h = ${frac('V', 'r² · π')}`, calc: (o) => o.V / (o.r ** 2 * Math.PI), unit: 'cm',
    vals: () => { const r = ri(2, 9); const h = ri(3, 20); return { r, V: round(r * r * Math.PI * h, 2) }; }, given: (o) => `V = ${fmt(o.V)} cm³ und r = ${o.r} cm`, sub: (o) => frac(fmt(o.V), `${o.r}² · π`),
    wrong: [['h = V · r² · π', 'Durch r² · π dividieren, nicht multiplizieren.', (o) => o.V * o.r ** 2 * Math.PI], [`h = ${frac('V', '2 · r · π')}`, 'r² heißt r · r, nicht 2 · r.', (o) => o.V / (2 * o.r * Math.PI)], ['h = V − r² · π', 'r² · π ist ein Faktor: dividieren, nicht subtrahieren.', (o) => o.V - o.r ** 2 * Math.PI]] },
  { f: 'V = r² · π · h', to: 'r', right: `r = √(${frac('V', 'π · h')})`, calc: (o) => Math.sqrt(o.V / (Math.PI * o.h)), unit: 'cm',
    vals: () => { const r = ri(2, 9); const h = ri(3, 20); return { h, V: round(r * r * Math.PI * h, 2) }; }, given: (o) => `V = ${fmt(o.V)} cm³ und h = ${o.h} cm`, sub: (o) => `√(${frac(fmt(o.V), `π · ${o.h}`)})`,
    wrong: [[`r = ${frac('V', 'π · h')}`, 'Das ist r². Am Ende noch die Wurzel ziehen.', (o) => o.V / (Math.PI * o.h)], [`r = ${frac('V', '2 · π · h')}`, 'r² ist nicht 2 · r: Nach dem Dividieren die Wurzel ziehen.', (o) => o.V / (2 * Math.PI * o.h)], ['r = √V : (π · h)', 'Die Wurzel gehört über den ganzen Bruch.', (o) => Math.sqrt(o.V) / (Math.PI * o.h)]] },
  { f: `E = ${frac('m · v²', '2')}`, to: 'v', right: `v = √(${frac('2E', 'm')})`, calc: (o) => o.v, unit: 'm/s',
    vals: () => { const m = pick([2, 4, 5, 10, 50, 80]); const v = ri(2, 20); return { m, v, E: (m * v * v) / 2 }; }, given: (o) => `E = ${fmt(o.E)} J und m = ${o.m} kg`, sub: (o) => `√(${frac(`2 · ${fmt(o.E)}`, o.m)})`,
    wrong: [[`v = ${frac('2E', 'm')}`, 'Das ist v². Am Ende noch die Wurzel ziehen.', (o) => (2 * o.E) / o.m], [`v = √(${frac('E', '2m')})`, 'Die 2 stand im Nenner: Mit 2 multiplizieren, nicht dividieren.', (o) => Math.sqrt(o.E / (2 * o.m))], ['v = √(2E · m)', 'm ist rechts ein Faktor: durch m dividieren.', (o) => Math.sqrt(2 * o.E * o.m)]] },
  { f: 'F = 1,8 · C + 32', to: 'C', right: `C = ${frac('F − 32', '1,8')}`, calc: (o) => o.C, unit: '°C',
    vals: () => { const C = 5 * ri(-6, 8); return { C, F: round(1.8 * C + 32, 2) }; }, given: (o) => `F = ${fmt(o.F)} °F`, sub: (o) => frac(`${fmt(o.F)} − 32`, '1,8'),
    wrong: [[`C = ${frac('F', '1,8')} − 32`, 'Reihenfolge: Zuerst die 32 abziehen, dann durch 1,8 dividieren.', (o) => o.F / 1.8 - 32], [`C = ${frac('F + 32', '1,8')}`, 'Die + 32 kommt mit Minus auf die andere Seite.', (o) => (o.F + 32) / 1.8], ['C = 1,8 · (F − 32)', 'Durch 1,8 dividieren, nicht multiplizieren.', (o) => 1.8 * (o.F - 32)]] },
  { f: 'Kₙ = K₀ · (1 + i)ⁿ', to: 'K₀', right: `K₀ = ${frac('Kₙ', '(1 + i)ⁿ')}`, calc: (o) => o.Kn / (1 + o.i) ** o.n, unit: '€',
    vals: () => { const K = ri(10, 80) * 100; const i = pick([0.02, 0.025, 0.03, 0.04]); const n = ri(3, 10); return { i, n, Kn: round(K * (1 + i) ** n, 2) }; }, given: (o) => `Kₙ = ${fmt(o.Kn, 2)} €, i = ${fmt(o.i)} und n = ${o.n}`, sub: (o) => frac(fmt(o.Kn, 2), `${fmt(1 + o.i)}${sup(o.n)}`),
    wrong: [['K₀ = Kₙ · (1 + i)ⁿ', 'Durch (1 + i)ⁿ dividieren, nicht multiplizieren.', (o) => o.Kn * (1 + o.i) ** o.n], [`K₀ = ${frac('Kₙ', '1 + i · n')}`, 'Das wäre einfache Verzinsung. Bei Zinseszins steht (1 + i)ⁿ.', (o) => o.Kn / (1 + o.i * o.n)], ['K₀ = Kₙ − (1 + i)ⁿ', '(1 + i)ⁿ ist ein Faktor: dividieren, nicht subtrahieren.', (o) => o.Kn - (1 + o.i) ** o.n]] },
];
S.formulaOs = { name: 'Formeln umformen', rule: '<b>Formeln umformen:</b> Schritt für Schritt die Gegenoperation auf beiden Seiten: Plus gegen Minus, Mal gegen Durch, Quadrat gegen Wurzel. Zuerst umformen, dann einsetzen.', gen() {
  const F = pick(FORMULAS);
  if (Math.random() < 0.5) {
    const opts = shuffle([F.right, ...F.wrong.map((w) => w[0])]);
    return PK(`Forme die Formel ${F.f} nach ${F.to} um.`, opts, F.right, [`Gesucht ist ${F.to}: alles andere mit der Gegenoperation auf die andere Seite bringen.`, F.right], F.wrong.map((w) => TP(w[0], w[1])));
  }
  const o = F.vals(); const v = round(F.calc(o), 2);
  return N(num(`${F.f}. Berechne ${F.to} für ${F.given(o)}. (2 Dezimalen)`, v, { unit: F.unit, tol: 0.011, show: f2(v), steps: [`Umformen: ${F.right}`, `Einsetzen: ${F.to} = ${F.sub(o)} ≈ ${f2(v)} ${F.unit}`],
    traps: F.wrong.map((w) => T(round(w[2](o), 2), w[1])) }));
} };

// ---- WS 1: Beschreibende Statistik -----------------------------------------

const median = (s) => (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2);
S.stats = { name: 'Beschreibende Statistik', rule: '<b>Kennzahlen:</b> Mittelwert = Summe : Anzahl. Median = mittlerer Wert der <b>geordneten</b> Liste. Quartile = Mediane der unteren und oberen Hälfte. Spannweite = Maximum − Minimum. σ = √(mittlere quadratische Abweichung).', gen() {
  const [ctx, lo, hi, unit] = pick([['Punkte bei einem Test', 4, 24, ''], ['Tageshöchsttemperaturen in °C', 12, 31, '°C'], ['Wartezeiten beim Arzt in Minuten', 2, 40, 'min'], ['Preise von Kopfhörern in €', 20, 90, '€'], ['Laufzeiten über 400 m in Sekunden', 58, 80, 's']]);
  const t = ri(0, 5);
  const n = t === 3 || t === 4 ? pick([6, 10]) : ri(5, 9);
  let d; do { d = Array.from({ length: n }, () => ri(lo, hi)); } while (d.every((x, i) => i === 0 || x >= d[i - 1]));
  const s = [...d].sort((a, b) => a - b); const sum = d.reduce((a, b) => a + b, 0);
  const mean = sum / n; const med = median(s);
  const q = `${ctx}: ${d.map((x) => fmt(x)).join('; ')}.`;
  const sorted = `Geordnet: ${s.map((x) => fmt(x)).join('; ')}`;
  if (t === 0) {
    const v = round(mean, 2);
    return N(num(`${q} Berechne den Mittelwert x̄. (2 Dezimalen)`, v, { tol: 0.011, show: f2(v), unit, steps: [`Summe: ${d.join(' + ')} = ${sum}`, `x̄ = ${sum} : ${n} ≈ ${f2(v)}`],
      traps: [T(med, 'Das ist der Median. Der Mittelwert ist Summe durch Anzahl.'), T(round(sum / (n - 1), 2), `Durch die Anzahl der Werte (${n}) dividieren.`)] }));
  }
  if (t === 1) {
    return N(num(`${q} Bestimme den Median.`, med, { unit, steps: [sorted, n % 2 ? `${n} Werte (ungerade): Der Median ist der ${(n + 1) / 2}. Wert: ${fmt(med)}` : `${n} Werte (gerade): Mittelwert der beiden mittleren: (${s[n / 2 - 1]} + ${s[n / 2]}) : 2 = ${fmt(med)}`],
      traps: [T(n % 2 ? d[(n - 1) / 2] : (d[n / 2 - 1] + d[n / 2]) / 2, 'Vorher der Größe nach ordnen! Der Median ist der mittlere Wert der geordneten Liste.'), T(round(mean, 2), 'Das ist (ungefähr) der Mittelwert. Der Median ist der mittlere Wert.')] }));
  }
  if (t === 2) {
    return N(num(`${q} Wie groß ist die Spannweite?`, s[n - 1] - s[0], { unit, steps: [`Maximum ${s[n - 1]}, Minimum ${s[0]}`, `Spannweite = ${s[n - 1]} − ${s[0]} = ${s[n - 1] - s[0]}`],
      traps: [T(Math.abs(d[n - 1] - d[0]), 'Größter minus kleinster Wert, nicht letzter minus erster.'), T(s[n - 1], 'Vom Maximum noch das Minimum abziehen.')] }));
  }
  if (t === 3 || t === 4) {
    const lowH = s.slice(0, n / 2); const upH = s.slice(n / 2);
    const q1 = median(lowH); const q3 = median(upH); const first = t === 3;
    return N(num(`${q} Bestimme das ${first ? 'erste (untere)' : 'dritte (obere)'} Quartil q<sub>${first ? 1 : 3}</sub>.`, first ? q1 : q3, { unit, steps: [sorted, `${first ? 'Untere' : 'Obere'} Hälfte: ${(first ? lowH : upH).join('; ')}`, `Median dieser Hälfte: q<sub>${first ? 1 : 3}</sub> = ${fmt(first ? q1 : q3)}`],
      traps: [T(first ? q3 : q1, `Das ist das ${first ? 'dritte' : 'erste'} Quartil.`), T(med, 'Das ist der Median (das zweite Quartil).'), T(median(first ? d.slice(0, n / 2) : d.slice(n / 2)), 'Vorher der Größe nach ordnen.')] }));
  }
  const varN = d.reduce((a, x) => a + (x - mean) ** 2, 0) / n; const v = round(Math.sqrt(varN), 2);
  return N(num(`${q} Berechne die empirische Standardabweichung σ (Division durch n). (2 Dezimalen)`, v, { tol: 0.011, show: f2(v), unit, steps: [`x̄ = ${sum} : ${n} ≈ ${fmt(round(mean, 4))}`, `σ² = (1/${n}) · Σ (xᵢ − x̄)² ≈ ${fmt(round(varN, 4))}`, `σ = √${fmt(round(varN, 4))} ≈ ${f2(v)}`],
    traps: [T(round(Math.sqrt((varN * n) / (n - 1)), 2), 'Das ist die Stichproben-Standardabweichung s mit Division durch n − 1. Gefragt ist σ mit Division durch n.'), T(round(varN, 2), 'Das ist die Varianz σ². Noch die Wurzel ziehen.')] }));
} };

// ---- FA 1–5: Funktionen ---------------------------------------------------

const TYPES = ['linear', 'quadratisch', 'exponentiell', 'Potenzfunktion'];
S.funcRead = { name: 'Funktionsbegriff', rule: '<b>Funktionen:</b> f(x₀) heißt x₀ einsetzen. Nullstelle: f(x) = 0. Steigung k = (y₂ − y₁) : (x₂ − x₁). Linear: gleiche Differenzen, exponentiell: gleiche Quotienten, quadratisch: gleiche zweite Differenzen.', gen() {
  const t = ri(0, 4);
  if (t === 0) {
    const c = [nz(-3, 3), ri(-6, 6), ri(-9, 9)]; const x0 = nz(-4, 4); const v = ev(c, x0);
    return N(num(`f(x) = ${poly(c)}. Berechne f(${fmt(x0)}).`, v, { steps: [`x = ${fmt(x0)} einsetzen: ${fmt(c[0])} · ${sq(x0)} + ${br(c[1])} · ${br(x0)} + ${br(c[2])}`, `= ${fmt(c[0] * x0 * x0)} + ${br(c[1] * x0)} + ${br(c[2])} = ${fmt(v)}`],
      traps: [x0 < 0 && T(-c[0] * x0 * x0 + c[1] * x0 + c[2], `Klammer um die negative Zahl: (${fmt(x0)})² = ${x0 * x0}, nicht ${M}${x0 * x0}.`), T(c[0] * 2 * x0 + c[1] * x0 + c[2], 'x² heißt x · x, nicht 2 · x.')] }));
  }
  if (t === 1) {
    const k = pick([-4, -3, -2, -1, 1, 2, 3, 4, 0.5, -0.5]); const x0 = nz(-6, 6) * (Math.abs(k) === 0.5 ? 2 : 1); const d = -k * x0;
    return N(num(`f(x) = ${poly([k, d])}. Berechne die Nullstelle.`, x0, { steps: [`f(x) = 0: ${poly([k, d])} = 0`, `${poly([k, 0])} = ${fmt(-d)}`, `x = ${fmt(-d)} : ${br(k)} = ${fmt(x0)}`],
      traps: [T(-x0, `Vorzeichen: ${d > 0 ? `+ ${fmt(d)}` : `${M} ${fmt(-d)}`} kommt mit umgekehrtem Vorzeichen auf die andere Seite.`), T(d, `${fmt(d)} ist der Schnittpunkt mit der y-Achse (x = 0), nicht die Nullstelle.`), T(round(-d * k, 4), `Durch k = ${fmt(k)} dividieren, nicht multiplizieren.`)] }));
  }
  if (t === 2) {
    const k = pick([-3, -2, -1, 1, 2, 3, 0.5, -0.5, 1.5]); const dx = ri(1, 4) * (Number.isInteger(k) ? 1 : 2); const x1 = ri(-5, 4); const y1 = ri(-6, 8);
    const x2 = x1 + dx; const y2 = y1 + k * dx;
    return N(num(`Eine lineare Funktion geht durch A = (${fmt(x1)} | ${fmt(y1)}) und B = (${fmt(x2)} | ${fmt(y2)}). Wie groß ist die Steigung k?`, k, { steps: ['k = (y₂ − y₁) : (x₂ − x₁)', `k = (${fmt(y2)} − ${br(y1)}) : (${fmt(x2)} − ${br(x1)}) = ${fmt(y2 - y1)} : ${dx} = ${fmt(k)}`],
      traps: [T(round(dx / (y2 - y1), 4), 'Kehrwert: Δy kommt in den Zähler, Δx in den Nenner.'), T(-k, 'Vorzeichenfehler: In Zähler und Nenner in derselben Reihenfolge abziehen.'), T(y2 - y1, `Noch durch Δx = ${dx} dividieren.`)] }));
  }
  const type = pick(TYPES);
  if (t === 3) {
    const xs = [1, 2, 3, 4]; let f; let why;
    if (type === 'linear') { const k = nz(-5, 5); const d = ri(-5, 9); f = (x) => k * x + d; why = `Die Differenzen sind immer gleich (${fmt(k)}): linear.`; }
    else if (type === 'quadratisch') { const a = nz(-2, 3); const b = nz(-4, 4); const c = ri(-3, 5); f = (x) => a * x * x + b * x + c; why = `Die ersten Differenzen ändern sich, die zweiten Differenzen sind immer ${fmt(2 * a)}: quadratisch.`; }
    else if (type === 'exponentiell') { const a = pick([2, 3, 0.5]); const c = a === 0.5 ? ri(1, 3) * 32 : ri(1, 4); f = (x) => c * a ** x; why = `Der Quotient aufeinanderfolgender Werte ist immer ${fmt(a)}: exponentiell.`; }
    else if (Math.random() < 0.5) { const a = ri(1, 3); f = (x) => a * x ** 3; why = `f(x) = ${a === 1 ? '' : `${a} · `}x³: Verdoppelt sich x, wird f(x) 8-mal so groß. Das ist eine Potenzfunktion.`; }
    else { const a = pick([12, 24, 36]); f = (x) => a / x; why = `x · f(x) ist immer ${a}, also f(x) = ${a} : x = ${a} · x⁻¹: eine Potenzfunktion.`; }
    const ys = xs.map(f);
    const quot = ys.some((y) => y === 0) ? 'nicht alle berechenbar (ein Wert ist 0)' : ys.slice(1).map((y, i) => fmt(round(y / ys[i], 3))).join('; ');
    return PK(`Welcher Funktionstyp passt zur Tabelle?${table([['x', ...xs.map((x) => fmt(x))], ['f(x)', ...ys.map((y) => fmt(y))]])}`, TYPES, type, [`Differenzen: ${ys.slice(1).map((y, i) => fmt(y - ys[i])).join('; ')}`, `Quotienten: ${quot}`, why],
      TYPES.map((x) => TP(x, why)));
  }
  let term; let why;
  if (type === 'linear') { term = poly([pick([-3, -2, 2, 3, 0.5, 4]), ri(-5, 9)]); why = 'x kommt nur in der ersten Potenz vor: f(x) = k · x + d ist linear.'; }
  else if (type === 'quadratisch') { const r = nz(-4, 4); const s = nz(-4, 4); term = Math.random() < 0.5 ? poly([nz(-3, 3), ri(-5, 5), ri(-5, 5)]) : `(x ${r < 0 ? '+' : M} ${Math.abs(r)}) · (x ${s < 0 ? '+' : M} ${Math.abs(s)})`; why = 'Höchste Potenz ist x² (ausmultipliziert a · x² + b · x + c): quadratisch.'; }
  else if (type === 'exponentiell') { term = `${fmt(ri(2, 9) * 10)} · ${fmt(pick([1.05, 0.8, 2, 1.2, 0.95]))}<sup>x</sup>`; why = 'x steht in der Hochzahl: f(x) = c · aˣ ist exponentiell.'; }
  else { const e = pick([3, 4, -1, -2]); term = `${ri(2, 6)} · x${sup(e)}`; why = 'x steht in der Basis, die Hochzahl ist eine feste Zahl: f(x) = a · xᶻ ist eine Potenzfunktion.'; }
  return PK(`f(x) = ${term}. Welcher Funktionstyp ist das?`, TYPES, type, [why], [TP('exponentiell', 'Bei exponentiell steht x in der Hochzahl, z. B. 2ˣ. Hier ist das nicht so.'), TP('Potenzfunktion', type === 'exponentiell' ? 'Bei einer Potenzfunktion steht x in der Basis (x³). Hier steht x in der Hochzahl.' : 'Eine Potenzfunktion ist f(x) = a · xᶻ mit nur einem Glied.'), TP('linear', 'Linear heißt: x nur hoch 1.'), TP('quadratisch', 'Quadratisch heißt: höchste Potenz x² (Polynom 2. Grades).')]);
} };

// ---- AG 4 / FA 6: Einheitskreis und Winkelfunktionen ------------------------

const QUAD = (a) => (a % 360 < 90 ? 1 : a % 360 < 180 ? 2 : a % 360 < 270 ? 3 : 4);
const QN = ['', 'I', 'II', 'III', 'IV'];
const REF = (a) => { const x = a % 360; return [x, 180 - x, x - 180, 360 - x][QUAD(x) - 1]; };
const FN = { sin: (x) => Math.sin(rad(x)), cos: (x) => Math.cos(rad(x)), tan: (x) => Math.tan(rad(x)) };
const SIGNS = { sin: [1, 1, -1, -1], cos: [1, -1, -1, 1], tan: [1, -1, 1, -1] };
const piFrac = (n, d) => { const g = gcd(n, d); const a = n / g; const b = d / g; const top = `${a === 1 ? '' : a}π`; return b === 1 ? top : frac(top, b); };
const SPECIAL = [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330];
S.unitCircle = { name: 'Einheitskreis', rule: '<b>Einheitskreis:</b> Der Punkt zum Winkel α ist (cos α | sin α). sin ist positiv im I. und II., cos im I. und IV., tan im I. und III. Quadranten. 180° = π.', gen() {
  const t = ri(0, 5);
  if (t === 0) {
    const a = 15 * ri(1, 24);
    return fracTask(`Gib α = ${a}° im Bogenmaß an: α = ▢ · π (als Bruch)`, a, 180, { steps: ['180° entspricht π, also α = Grad : 180 · π.', `${a} : 180 = ${frac(a / gcd(a, 180), 180 / gcd(a, 180))}, also α = ${piFrac(a, 180)}`],
      traps: [FT(180, a, 'Umgekehrt: Grad durch 180, nicht 180 durch Grad.'), FT(a, 360, '180° entsprechen π, nicht 360°.')] });
  }
  if (t === 1) {
    if (Math.random() < 0.5) {
      const a = 15 * ri(1, 24);
      return N(num(`Wie viel Grad sind ${piFrac(a, 180)}?`, a, { unit: '°', steps: ['π entspricht 180°.', `${piFrac(a, 180)} = ${fmt(round(a / 180, 4))} · 180° = ${a}°`], traps: [T(2 * a, 'π entspricht 180°, nicht 360°.'), T(a / 2, 'π entspricht 180°, nicht 90°.')] }));
    }
    const x = pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5]); const v = round(deg(x), 1);
    return N(num(`Wie viel Grad sind ${fmt(x)} rad? (1 Dezimale)`, v, { unit: '°', tol: 0.06, show: fmt(v, 1), steps: [`α = ${fmt(x)} · 180° : π ≈ ${fmt(v, 1)}°`], traps: [T(round(rad(x), 1), 'Falsche Richtung: Von Bogenmaß in Grad mit 180 : π multiplizieren.'), T(round(x * 180, 1), 'Durch π dividieren nicht vergessen.')] }));
  }
  if (t === 2) {
    let a; do { a = ri(1, 359); } while (a % 90 === 0); if (Math.random() < 0.25) a += 360;
    const Q = QUAD(a); const opts = ['I', 'II', 'III', 'IV'].map((x) => `${x}. Quadrant`);
    return PK(`In welchem Quadranten liegt der Punkt am Einheitskreis zum Winkel α = ${a}°?`, opts, opts[Q - 1], [a >= 360 ? `${a}° − 360° = ${a - 360}° (eine volle Runde weniger)` : 'I: 0° bis 90°, II: 90° bis 180°, III: 180° bis 270°, IV: 270° bis 360°', `${a % 360}° liegt im ${QN[Q]}. Quadranten.`],
      opts.map((o) => TP(o, 'Die Quadranten zählen gegen den Uhrzeigersinn: I bis 90°, II bis 180°, III bis 270°, IV bis 360°.')));
  }
  const fn = pick(['sin', 'cos', 'tan']);
  if (t === 3) {
    let a; do { a = ri(1, 359); } while (a % 90 === 0);
    const Q = QUAD(a); const pos = SIGNS[fn][Q - 1] > 0; const right = pos ? 'positiv' : 'negativ';
    const why = `α = ${a}° liegt im ${QN[Q]}. Quadranten. Dort ist ${fn === 'sin' ? 'die y-Koordinate (sin)' : fn === 'cos' ? 'die x-Koordinate (cos)' : 'tan = sin : cos'} ${right}.`;
    return PK(`Welches Vorzeichen hat ${fn}(${a}°)?`, ['positiv', 'negativ'], right, [why], [TP(pos ? 'negativ' : 'positiv', why)]);
  }
  if (t === 4) {
    const a = pick(SPECIAL); const v = round(FN[fn](a), 2); const Q = QUAD(a); const ref = REF(a);
    return N(num(`${fn}(${a}°) = ? (2 Dezimalen)`, v, { tol: 0.011, show: f2(v), steps: [`${a}° liegt im ${QN[Q]}. Quadranten, Bezugswinkel ${ref}°.`, `${fn}(${ref}°) ≈ ${f2(Math.abs(v))}, Vorzeichen im ${QN[Q]}. Quadranten: ${SIGNS[fn][Q - 1] > 0 ? '+' : M}`, `${fn}(${a}°) ≈ ${f2(v)}`],
      traps: [T(-v, `Vorzeichen: Im ${QN[Q]}. Quadranten ist ${fn} ${v > 0 ? 'positiv' : 'negativ'}.`), T(round(FN[fn]((a * 180) / Math.PI), 2), 'Der Rechner steht auf RAD. Stelle ihn auf DEG (Grad).')] }));
  }
  const f = Math.random() < 0.5 ? 'sin' : 'cos';
  let a; do { a = ri(5, 175); } while (a === 90);
  const v = f === 'sin' ? 180 - a : 360 - a;
  return N(num(`Für welchen zweiten Winkel β zwischen 0° und 360° gilt ${f}(β) = ${f}(${a}°)?`, v, { unit: '°', steps: [f === 'sin' ? 'Gleicher Sinus heißt gleiche Höhe (y-Koordinate): Spiegelung an der y-Achse, β = 180° − α.' : 'Gleicher Cosinus heißt gleiche x-Koordinate: Spiegelung an der x-Achse, β = 360° − α.', `β = ${f === 'sin' ? 180 : 360}° − ${a}° = ${v}°`],
    traps: [T(f === 'sin' ? 360 - a : 180 - a, `Bei diesem Winkel ist der ${f === 'sin' ? 'Cosinus' : 'Sinus'} gleich, nicht der ${f === 'sin' ? 'Sinus' : 'Cosinus'}.`), T(180 + a, `Bei 180° + α hat ${f} das umgekehrte Vorzeichen.`)] }));
} };

const B_LIST = [[1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [1, 3], [2, 3]];
const bShow = ([n, d]) => (d === 1 ? (n === 1 ? '' : `${n}`) : frac(n, d));
const aSin = (a, b) => `${a === 1 ? '' : a === -1 ? M : `${fmt(a)} · `}sin(${bShow(b)}${bShow(b) ? ' · ' : ''}x)`;
S.sineFn = { name: 'Sinusfunktion', rule: '<b>f(x) = a · sin(b · x):</b> |a| ist die Amplitude (größte Auslenkung), die Periode ist p = 2π : b. Mit + d verschiebt sich der Graph um d nach oben.', gen() {
  const t = ri(0, 3); const a = pick([-3, -2, 2, 3, 4, 5, 0.5, 1.5, -1]); const b = pick(B_LIST);
  if (t === 0) {
    return N(num(`f(x) = ${aSin(a, b)}. Wie groß ist die Amplitude?`, Math.abs(a), { steps: ['Die Amplitude ist |a|, denn sin schwankt zwischen −1 und 1.', `|${fmt(a)}| = ${fmt(Math.abs(a))}`],
      traps: [a < 0 && T(a, 'Die Amplitude ist ein Abstand und darum positiv: |a|. Das Minus spiegelt die Kurve nur.'), T(2 * Math.abs(a), 'Die Amplitude ist der Abstand von der Mittellinie zum Maximum, nicht vom Minimum zum Maximum.'), T(b[0] / b[1], 'b bestimmt die Periode, a die Amplitude.')] }));
  }
  if (t === 1) {
    const [bn, bd] = b;
    return fracTask(`f(x) = ${aSin(a, b)}. Gib die Periode an: p = ▢ · π (als Bruch)`, 2 * bd, bn, { steps: ['p = 2π : b', `p = 2π : ${bShow(b) || '1'} = ${piFrac(2 * bd, bn)}`],
      traps: [FT(bd, bn, 'Die volle Periode ist 2π : b, nicht π : b.'), FT(bn, 2 * bd, 'Umgekehrt: p = 2π : b, nicht b : 2π.'), FT(2 * bn, bd, 'Durch b dividieren, nicht mit b multiplizieren.')] });
  }
  if (t === 2) {
    const [pn, pd] = pick([[1, 1], [4, 1], [6, 1], [2, 3], [1, 2], [8, 1]]); const g = gcd(2 * pd, pn);
    return fracTask(`f(x) = sin(b · x) hat die Periode p = ${piFrac(pn, pd)}. Wie groß ist b? (als Bruch)`, 2 * pd, pn, { steps: ['p = 2π : b, also b = 2π : p', `b = 2π : ${piFrac(pn, pd)} = ${frac((2 * pd) / g, pn / g)}`],
      traps: [FT(pn, 2 * pd, 'Umgekehrt: b = 2π : p.'), FT(pn, pd, 'b ist nicht die Periode selbst.')] });
  }
  const d = nz(-4, 6); const max = Math.random() < 0.5;
  const v = max ? d + Math.abs(a) : d - Math.abs(a);
  return N(num(`f(x) = ${aSin(a, b)} ${d < 0 ? M : '+'} ${Math.abs(d)}. Wie groß ist der ${max ? 'größte' : 'kleinste'} Funktionswert?`, v, { steps: [`sin schwankt zwischen −1 und 1, also schwankt ${aSin(a, b)} zwischen ${fmt(-Math.abs(a))} und ${fmt(Math.abs(a))}.`, `${max ? 'Maximum' : 'Minimum'}: ${fmt(d)} ${max ? '+' : M} ${fmt(Math.abs(a))} = ${fmt(v)}`],
    traps: [T(max ? d - Math.abs(a) : d + Math.abs(a), `Das ist der ${max ? 'kleinste' : 'größte'} Wert.`), T(max ? Math.abs(a) : -Math.abs(a), `Die Verschiebung um ${fmt(d)} nicht vergessen.`), T(max ? d + a : d - a, 'Die Amplitude ist |a|, auch wenn a negativ ist.')] }));
} };

// FA 5: Exponentialfunktionen.
const EXP_BASES = [[2, 1], [3, 1], [0.5, 8], [1.5, 8], [1.2, 125], [0.8, 125]];
S.expFn = { name: 'Exponentialfunktion', rule: '<b>f(x) = c · aˣ:</b> c = f(0) ist der Startwert, a ist der Wachstumsfaktor: Bei jedem Schritt um 1 wird mit a multipliziert. a > 1 Wachstum, 0 < a < 1 Abnahme, a = 1 ± p/100.', gen() {
  const t = ri(0, 3);
  if (t <= 1) {
    const [a, base] = pick(EXP_BASES); const c = base * ri(1, 3);
    const x1 = ri(0, 1); const x2 = x1 + ri(1, 3 - x1); const y1 = round(c * a ** x1, 6); const y2 = round(c * a ** x2, 6); const dx = x2 - x1;
    const q = `Eine Exponentialfunktion f(x) = c · aˣ geht durch die Punkte (${x1} | ${fmt(y1)}) und (${x2} | ${fmt(y2)}).`;
    if (t === 0 || x1 === 0) {
      return N(num(`${q} Wie groß ist a?`, a, { steps: [`f(${x2}) : f(${x1}) = a${dx > 1 ? sup(dx) : ''}`, `${fmt(y2)} : ${fmt(y1)} = ${fmt(round(y2 / y1, 6))}${dx > 1 ? `, also a = ${dx === 2 ? '√' : '∛'}${fmt(round(y2 / y1, 6))}` : ''} = ${fmt(a)}`],
        traps: [T(round((y2 - y1) / dx, 4), 'Das ist die Steigung einer linearen Funktion. Bei exponentiell dividierst du die Funktionswerte.'), dx > 1 && T(round(y2 / y1, 4), `Zwischen x = ${x1} und x = ${x2} liegen ${dx} Schritte: a${sup(dx)} = ${fmt(round(y2 / y1, 4))}, also noch die ${dx}. Wurzel ziehen.`)] }));
    }
    return N(num(`${q} Wie groß ist c?`, c, { steps: [`a: f(${x2}) : f(${x1}) = ${fmt(round(y2 / y1, 6))}${dx > 1 ? ` = a${sup(dx)}` : ''}, a = ${fmt(a)}`, `c = f(0) = f(1) : a = ${fmt(y1)} : ${fmt(a)} = ${fmt(c)}`],
      traps: [T(y1, 'f(1) ist nicht der Startwert. c = f(0): einen Schritt zurück, also durch a dividieren.'), T(round(y1 * a, 4), 'Zurück zu x = 0 dividierst du durch a, nicht multiplizieren.'), T(round(y1 - (y2 - y1) / dx, 4), 'Das wäre linear zurückgerechnet. Bei exponentiell durch a dividieren.')] }));
  }
  if (t === 2) {
    const p = pick([1.5, 2, 2.5, 3.5, 4, 6, 8, 12, 15]); const up = Math.random() < 0.5; const a = round(up ? 1 + p / 100 : 1 - p / 100, 4);
    const ctx = up ? 'Ein Kapital wächst nach K(t) = ' : 'Die Menge eines Medikaments im Blut sinkt nach M(t) = ';
    return N(num(`${ctx}${ri(2, 9) * 100} · ${fmt(a)}<sup>t</sup> (t in ${up ? 'Jahren' : 'Stunden'}). Um wie viel Prozent ${up ? 'wächst' : 'sinkt'} der Wert pro ${up ? 'Jahr' : 'Stunde'}?`, p, { unit: '%', steps: [`a = ${fmt(a)} = 1 ${up ? '+' : M} ${fmt(p / 100)}`, `${fmt(p / 100)} = ${fmt(p)} %`],
      traps: [T(round(a * 100, 4), `${fmt(round(a * 100, 2))} % ist der Anteil, der ${up ? 'nach einem Jahr da ist' : 'übrig bleibt'}. Die Änderung ist der Unterschied zu 100 %.`), T(round(p / 100, 4), `${fmt(p / 100)} ist der Dezimalwert. In Prozent: · 100.`)] }));
  }
  const p = pick([2, 3, 5, 8, 10, 20, 25]); const up = Math.random() < 0.5; const a = round(up ? 1 + p / 100 : 1 - p / 100, 4);
  return N(num(`Ein Bestand ${up ? 'wächst' : 'nimmt'} pro Jahr um ${p} %${up ? '' : ' ab'}. Wie groß ist der Wachstumsfaktor a in f(t) = c · aᵗ?`, a, { steps: [`a = 1 ${up ? '+' : M} ${p}/100 = ${fmt(a)}`],
    traps: [T(round(p / 100, 4), 'Das ist nur die Änderung. Der Faktor enthält auch den bisherigen Bestand: 1 ± p/100.'), T(round(up ? 1 - p / 100 : 1 + p / 100, 4), up ? 'Bei Wachstum ist a > 1.' : 'Bei Abnahme ist a < 1.'), T(p, 'Prozent in eine Dezimalzahl umrechnen: durch 100.')] }));
} };

S.halfLife = { name: 'Halbwertszeit und Verdopplungszeit', rule: '<b>Halbwertszeit:</b> aᵗ = 0,5, also t = ln 0,5 : ln a. <b>Verdopplungszeit:</b> aᵗ = 2, also t = ln 2 : ln a. Bei e<sup>−λt</sup>: T = ln 2 : λ.', gen() {
  const t = ri(0, 4);
  if (t === 0) {
    const p = pick([2, 3, 4, 5, 8, 10, 12, 15, 20]); const a = 1 - p / 100; const v = round(Math.log(0.5) / Math.log(a), 2);
    return N(num(`Ein radioaktiver Stoff zerfällt pro Jahr um ${p} %. Berechne die Halbwertszeit. (2 Dezimalen)`, v, { unit: 'Jahre', tol: 0.011, show: f2(v), steps: [`a = 1 − ${fmt(p / 100)} = ${fmt(a)}`, `${fmt(a)}ᵗ = 0,5, logarithmieren: t · ln ${fmt(a)} = ln 0,5`, `t = ln 0,5 : ln ${fmt(a)} ≈ ${f2(v)} Jahre`],
      traps: [T(round(50 / p, 2), 'Das wäre linearer Zerfall. Bei exponentiellem Zerfall nimmt jedes Jahr der Prozentsatz vom kleineren Rest ab.'), T(round(Math.log(2) / (p / 100), 2), 'Das ist die Faustregel ln 2 : p, nur eine Näherung. Exakt: ln 0,5 : ln a.')] }));
  }
  if (t === 1) {
    const p = pick([2, 3, 4, 5, 6, 8, 10, 25]); const a = 1 + p / 100; const v = round(Math.log(2) / Math.log(a), 2);
    return N(num(`Die Nutzerzahl einer App wächst pro Monat um ${p} %. Nach wie vielen Monaten hat sie sich verdoppelt? (2 Dezimalen)`, v, { unit: 'Monate', tol: 0.011, show: f2(v), steps: [`a = ${fmt(a)}`, `${fmt(a)}ᵗ = 2, also t = ln 2 : ln ${fmt(a)} ≈ ${f2(v)}`],
      traps: [T(round(100 / p, 2), 'Das wäre lineares Wachstum. Die Zunahme bezieht sich jeden Monat auf den größeren Bestand.'), T(round(Math.log(2) / Math.log(p), 2), `Der Faktor ist a = ${fmt(a)}, nicht ${p}.`)] }));
  }
  if (t === 2) {
    const lam = pick([0.01, 0.02, 0.04, 0.05, 0.1, 0.2, 0.25]); const down = Math.random() < 0.6; const v = round(Math.log(2) / lam, 2);
    return N(num(`N(t) = N₀ · e<sup>${down ? M : ''}${fmt(lam)} · t</sup> (t in Tagen). Berechne die ${down ? 'Halbwertszeit' : 'Verdopplungszeit'}. (2 Dezimalen)`, v, { unit: 'Tage', tol: 0.011, show: f2(v), steps: [`e<sup>${down ? M : ''}${fmt(lam)}t</sup> = ${down ? '0,5' : '2'}`, `${down ? M : ''}${fmt(lam)} · t = ln ${down ? '0,5' : '2'}`, `t = ln 2 : ${fmt(lam)} ≈ ${f2(v)} Tage`],
      traps: [T(round(0.5 / lam, 2), `Nicht 0,5 : λ, sondern ${down ? 'ln 0,5 : (−λ)' : 'ln 2 : λ'}.`), T(round(1 / lam, 2), 'Logarithmieren: ln 2 im Zähler, nicht 1.')] }));
  }
  if (t === 3) {
    const [name, T2, u] = pick([['Iod-131', 8, 'Tagen'], ['Cäsium-137', 30, 'Jahren'], ['Kohlenstoff-14', 5730, 'Jahren'], ['Technetium-99m', 6, 'Stunden']]);
    const k = ri(2, 5); const N0 = 2 ** k * ri(1, 6) * 10; const v = N0 / 2 ** k;
    return N(num(`${name} hat eine Halbwertszeit von ${fmt(T2)} ${u}. Von ${N0} mg sind nach ${fmt(k * T2)} ${u} noch wie viele mg übrig?`, v, { unit: 'mg', steps: [`${fmt(k * T2)} : ${fmt(T2)} = ${k} Halbwertszeiten`, `${k}-mal halbieren: ${N0} · 0,5${sup(k)} = ${N0} : ${2 ** k} = ${fmt(v)}`],
      traps: [T(N0 / (2 * k), `Nicht durch 2 · ${k}, sondern ${k}-mal halbieren: durch 2${sup(k)}.`), T(N0 / 2, `Das wäre nach einer Halbwertszeit. Hier sind es ${k}.`)] }));
  }
  const T2 = pick([4, 5, 8, 10, 12, 20, 30]); const v = round(0.5 ** (1 / T2), 4);
  return N(num(`Ein Stoff hat eine Halbwertszeit von ${T2} Jahren. Wie groß ist der jährliche Zerfallsfaktor a? (4 Dezimalen)`, v, { tol: 0.00011, show: f4(v), steps: [`a${sup(T2)} = 0,5`, `a = 0,5<sup>1/${T2}</sup> ≈ ${f4(v)}`],
    traps: [T(round(1 - 0.5 / T2, 4), 'Das wäre linear gedacht. Bei exponentiellem Zerfall gilt: a hoch Halbwertszeit = 0,5.'), T2 <= 12 && T(round(0.5 ** T2, 4), `Nicht 0,5 hoch ${T2}, sondern die ${T2}. Wurzel aus 0,5.`)] }));
} };

// ---- AG 3: Vektoren --------------------------------------------------------

S.vecAngle = { name: 'Winkel und Normalvektoren', rule: '<b>Winkel:</b> cos φ = (a · b) : (|a| · |b|). <b>Orthogonal</b> heißt a · b = 0. Ein Normalvektor zu (x | y) ist (−y | x).', gen() {
  const t = ri(0, 3); const dim = Math.random() < 0.6 ? 2 : 3;
  const rv = () => { let u; do { u = Array.from({ length: dim }, () => ri(-5, 5)); } while (u.every((x) => x === 0)); return u; };
  if (t === 0) {
    let u; let v; let c; do { u = rv(); v = rv(); c = dotp(u, v) / (len(u) * len(v)); } while (Math.abs(c) > 0.995 || c === 0);
    const phi = round(deg(Math.acos(c)), 1);
    return N(num(`Berechne den Winkel zwischen a = ${vec(u)} und b = ${vec(v)}. (1 Dezimale, in Grad)`, phi, { unit: '°', tol: 0.11, show: fmt(phi, 1), steps: [`a · b = ${u.map((x, i) => `${br(x)} · ${br(v[i])}`).join(' + ')} = ${fmt(dotp(u, v))}`, `|a| = √${dotp(u, u)}, |b| = √${dotp(v, v)}`, `cos φ = ${fmt(dotp(u, v))} : (√${dotp(u, u)} · √${dotp(v, v)}) ≈ ${fmt(round(c, 4))}`, `φ ≈ ${fmt(phi, 1)}°`],
      traps: [T(round(Math.acos(c), 1), 'Das ist das Bogenmaß. Stelle den Rechner auf DEG.'), T(round(180 - phi, 1), 'Vorzeichen des Skalarprodukts beachten: Ist es negativ, ist der Winkel stumpf.'), T(dotp(u, v), 'Das ist nur das Skalarprodukt. Noch durch |a| · |b| dividieren und cos⁻¹ nehmen.')] }));
  }
  if (t === 1) {
    const u = rv(); let v;
    if (Math.random() < 0.5) {
      if (dim === 2) { const k = nz(-2, 2); v = [-u[1] * k, u[0] * k]; }
      else { const w = rv(); v = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]]; if (v.every((x) => x === 0) || v.some((x) => Math.abs(x) > 30)) v = u[0] || u[1] ? [-u[1], u[0], 0] : [1, 0, 0]; }
    } else { do { v = rv(); } while (dotp(u, v) === 0); }
    const d = dotp(u, v); const right = d === 0 ? 'ja' : 'nein';
    const why = `a · b = ${u.map((x, i) => `${br(x)} · ${br(v[i])}`).join(' + ')} = ${fmt(d)}${d === 0 ? ', also orthogonal.' : ' ≠ 0, also nicht orthogonal.'}`;
    return PK(`Sind a = ${vec(u)} und b = ${vec(v)} orthogonal (normal) zueinander?`, ['ja', 'nein'], right, [why], [TP(d === 0 ? 'nein' : 'ja', why)]);
  }
  if (t === 2) {
    let a; let b; do { a = nz(-6, 6); b = nz(-6, 6); } while (Math.abs(a) === Math.abs(b));
    const right = Math.random() < 0.5 ? vec([-b, a]) : vec([b, -a]);
    const opts = shuffle([right, vec([b, a]), vec([-a, -b]), vec([a, -b])]);
    return PK(`Welcher Vektor ist ein Normalvektor zu v = ${vec([a, b])}?`, opts, right, ['Normalvektor: Koordinaten vertauschen und bei einer das Vorzeichen ändern.', `Probe: ${vec([a, b])} · ${right} = 0`],
      [TP(vec([b, a]), `Nur vertauschen reicht nicht: ${fmt(a)} · ${br(b)} + ${br(b)} · ${br(a)} = ${fmt(2 * a * b)} ≠ 0. Ein Vorzeichen muss sich ändern.`), TP(vec([-a, -b]), 'Das ist der Gegenvektor: parallel, nicht normal.'), TP(vec([a, -b]), `Vertauschen nicht vergessen: Das Skalarprodukt ist ${fmt(a * a - b * b)} ≠ 0.`)]);
  }
  let z; let p; let r; let s; do { z = nz(-6, 6); r = nz(-6, 6); s = nz(-6, 6); p = (-z * s) / r; } while (!Number.isInteger(p) || p === 0 || Math.abs(p) > 12);
  return N(num(`Für welches z ist a = (${fmt(p)} | z) orthogonal zu b = ${vec([r, s])}?`, z, { steps: [`a · b = 0: ${br(p)} · ${br(r)} + z · ${br(s)} = 0`, `${fmt(p * r)} + ${br(s)} · z = 0`, `z = ${fmt(-p * r)} : ${br(s)} = ${fmt(z)}`],
    traps: [T(-z, 'Vorzeichenfehler beim Umformen.'), T(round((-p * s) / r, 4), 'Erste Koordinate mit erster, zweite mit zweiter multiplizieren.')] }));
} };

S.line2d = { name: 'Geraden in Parameterform', rule: '<b>Parameterform:</b> g: X = P + t · v. Ein Punkt liegt auf g, wenn <b>ein</b> t beide Koordinaten erfüllt. Schnittpunkt: P + t · v = Q + s · w nach t und s lösen.', gen() {
  const t = ri(0, 3);
  const rv = () => { let v; do { v = [ri(-4, 4), ri(-4, 4)]; } while (v[0] === 0 || v[1] === 0); return v; };
  const P = [ri(-5, 5), ri(-5, 5)]; const v = rv();
  const g = `g: X = ${vec(P)} + t · ${vec(v)}`;
  if (t <= 1) {
    const tt = nz(-3, 4); const Q = [P[0] + tt * v[0], P[1] + tt * v[1]];
    if (t === 1) {
      return N(num(`${g}. Der Punkt Q = ${vec(Q)} liegt auf g. Für welches t?`, tt, { steps: [`x: ${fmt(P[0])} + t · ${br(v[0])} = ${fmt(Q[0])}, also t = ${fmt(Q[0] - P[0])} : ${br(v[0])} = ${fmt(tt)}`, `Probe y: ${fmt(P[1])} + ${br(tt)} · ${br(v[1])} = ${fmt(Q[1])} ✓`],
        traps: [T(-tt, 'Q − P rechnen, nicht P − Q.'), T(Q[0] - P[0], `Noch durch die x-Koordinate des Richtungsvektors (${fmt(v[0])}) dividieren.`)] }));
    }
    const yes = Math.random() < 0.5; const R = yes ? Q : [Q[0] + nz(-2, 2), Q[1]];
    const t1 = (R[0] - P[0]) / v[0]; const t2 = (R[1] - P[1]) / v[1];
    const why = `x: t = ${fmt(R[0] - P[0])} : ${br(v[0])} = ${fmt(round(t1, 3))}, y: t = ${fmt(R[1] - P[1])} : ${br(v[1])} = ${fmt(round(t2, 3))}. ${yes ? 'Gleiches t, also liegt R auf g.' : 'Verschiedene t, also liegt R nicht auf g.'}`;
    return PK(`${g}. Liegt der Punkt R = ${vec(R)} auf g?`, ['ja', 'nein'], yes ? 'ja' : 'nein', ['R = P + t · v für ein t? Jede Koordinate einzeln nach t auflösen.', why], [TP(yes ? 'nein' : 'ja', yes ? why : `${why} Eine Koordinate allein reicht nicht.`)]);
  }
  if (t === 2) {
    let w; do { w = rv(); } while (v[0] * w[1] - v[1] * w[0] === 0);
    const Sx = [ri(-5, 6), ri(-5, 6)]; const tt = nz(-3, 3); const ss = nz(-3, 3);
    const P2 = [Sx[0] - tt * v[0], Sx[1] - tt * v[1]]; const Q = [Sx[0] - ss * w[0], Sx[1] - ss * w[1]];
    return { kind: 'pair', q: `g: X = ${vec(P2)} + t · ${vec(v)}<br>h: X = ${vec(Q)} + s · ${vec(w)}<br>Berechne den Schnittpunkt S = (x | y).`, vals: Sx, placeholder: 'x; y  z. B. 3; −2', keys: true,
      steps: ['Gleichsetzen, je Koordinate eine Gleichung:', `I: ${fmt(P2[0])} + ${br(v[0])} · t = ${fmt(Q[0])} + ${br(w[0])} · s`, `II: ${fmt(P2[1])} + ${br(v[1])} · t = ${fmt(Q[1])} + ${br(w[1])} · s`, `Lösung des Gleichungssystems: t = ${fmt(tt)}, s = ${fmt(ss)}`, `t in g einsetzen: S = ${vec(P2)} + ${br(tt)} · ${vec(v)} = ${vec(Sx)}`],
      traps: [{ v: [tt, ss], why: 't und s sind die Parameter, nicht der Punkt. Setze t in g (oder s in h) ein.' }, { v: [P2[0] + ss * v[0], P2[1] + ss * v[1]], why: 's gehört zu h. In g musst du t einsetzen.' }] };
  }
  const kind = pick(['schneidend', 'parallel', 'identisch']);
  let w; let Q;
  if (kind === 'schneidend') { do { w = rv(); } while (v[0] * w[1] - v[1] * w[0] === 0); Q = [ri(-5, 5), ri(-5, 5)]; }
  else { const k = pick([-2, -1, 2, 3]); w = [k * v[0], k * v[1]]; const s0 = nz(-2, 2); Q = [P[0] + s0 * v[0], P[1] + s0 * v[1]]; if (kind === 'parallel') Q = [Q[0] + nz(-2, 2), Q[1]]; }
  const par = kind !== 'schneidend';
  const steps = [par ? `Richtungsvektoren: ${vec(w)} = ${fmt(w[0] / v[0])} · ${vec(v)}, also parallel.` : `${vec(w)} ist kein Vielfaches von ${vec(v)}: Die Geraden schneiden einander.`];
  if (par) steps.push(`Liegt ${vec(Q)} auf g? ${kind === 'identisch' ? 'Ja, also sind die Geraden identisch.' : 'Nein, also parallel und verschieden.'}`);
  return PK(`${g}<br>h: X = ${vec(Q)} + s · ${vec(w)}<br>Wie liegen g und h zueinander?`, ['schneidend', 'parallel', 'identisch'], kind, steps,
    [TP('schneidend', 'Die Richtungsvektoren sind Vielfache voneinander, also schneiden die Geraden einander nicht in genau einem Punkt.'), TP(kind === 'schneidend' ? 'parallel' : kind === 'parallel' ? 'identisch' : 'parallel', kind === 'schneidend' ? 'Parallel nur, wenn ein Richtungsvektor ein Vielfaches des anderen ist.' : kind === 'parallel' ? 'Identisch nur, wenn der Punkt von h auch auf g liegt. Prüfe das.' : 'Der Punkt von h liegt auch auf g, also sind die Geraden identisch.'), TP(kind === 'identisch' ? 'schneidend' : 'identisch', 'Identisch nur, wenn die Richtungsvektoren parallel sind und der Punkt von h auf g liegt.')]);
} };

// ---- AN 1: Änderungsmaße ---------------------------------------------------

const RATE_LABELS = ['absolute Änderung', 'mittlere Änderungsrate', 'relative Änderung', 'momentane Änderungsrate'];
S.diffQuot = { name: 'Änderungsmaße', rule: '<b>Änderungsmaße</b> von f in [a; b]: absolut f(b) − f(a), relativ (f(b) − f(a)) : f(a), mittlere Änderungsrate (Differenzenquotient) (f(b) − f(a)) : (b − a), momentane Änderungsrate (Differentialquotient) f′(x).', gen() {
  const t = ri(0, 4);
  if (t === 0) {
    const [ctx, u] = pick([['Die Einwohnerzahl einer Gemeinde', ''], ['Der Preis eines E-Bikes (in €)', '€'], ['Die Anzahl der Abonnent:innen eines Kanals', '']]);
    const A = ri(10, 45) * 200; const p = pick([-20, -12.5, -8, -5, 4, 5, 6, 10, 12, 15, 25, 30]); const B = round(A * (1 + p / 100), 2);
    const y1 = ri(2016, 2021); const y2 = y1 + ri(2, 5);
    if (Math.random() < 0.6) return N(num(`${ctx} war ${y1} ${fmt(A)} und ${y2} ${fmt(B)}. Berechne die relative Änderung in Prozent (Abnahme negativ, 2 Dezimalen).`, p, { unit: '%', tol: 0.011, steps: [`(${fmt(B)} − ${fmt(A)}) : ${fmt(A)} = ${fmt(round(B - A, 2))} : ${fmt(A)} = ${fmt(p / 100)}`, `= ${fmt(p)} %`],
      traps: [T(round(((B - A) / B) * 100, 2), `Bezugswert ist der Anfangswert ${fmt(A)}, nicht der Endwert.`), T(round((B / A) * 100, 2), 'Das ist der neue Wert in Prozent vom alten. Die Änderung ist der Unterschied zu 100 %.'), T(round(B - A, 2), 'Das ist die absolute Änderung. Relativ heißt: durch den Anfangswert dividieren.')] }));
    const v = round((B - A) / (y2 - y1), 2);
    return N(num(`${ctx} war ${y1} ${fmt(A)} und ${y2} ${fmt(B)}. Berechne die mittlere Änderung pro Jahr. (2 Dezimalen)`, v, { tol: 0.011, show: f2(v), unit: u, steps: [`(${fmt(B)} − ${fmt(A)}) : (${y2} − ${y1}) = ${fmt(round(B - A, 2))} : ${y2 - y1} ≈ ${f2(v)}`],
      traps: [T(round(B - A, 2), `Das ist die absolute Änderung. Pro Jahr: noch durch ${y2 - y1} Jahre dividieren.`), T(round((B - A) / A, 4), 'Das ist die relative Änderung. Gefragt ist die Änderung pro Jahr.')] }));
  }
  if (t === 1) {
    const c = [nz(-2, 2), ri(-5, 5), ri(-6, 6)]; if (Math.random() < 0.4) c.unshift(pick([-1, 1]));
    const a = ri(-3, 2); const b = a + ri(1, 3); const fa = ev(c, a); const fb = ev(c, b); const v = (fb - fa) / (b - a); const vs = Number.isInteger(v) ? fmt(v) : f2(v);
    return N(num(`f(x) = ${poly(c)}. Berechne den Differenzenquotienten (mittlere Änderungsrate) in ${iv(a, b)}.${Number.isInteger(v) ? '' : ' (2 Dezimalen)'}`, round(v, 2), { tol: 0.011, show: vs, steps: [`f(${fmt(b)}) = ${fmt(fb)}, f(${fmt(a)}) = ${fmt(fa)}`, `(${fmt(fb)} − ${br(fa)}) : (${fmt(b)} − ${br(a)}) = ${fmt(fb - fa)} : ${b - a} = ${vs}`],
      traps: [b - a > 1 && T(fb - fa, `Noch durch die Intervalllänge ${b - a} dividieren.`), fb !== fa && T(round((b - a) / (fb - fa), 2), 'Kehrwert: f-Werte in den Zähler, x-Werte in den Nenner.'), T(ev(derive(c), a), `Das ist die momentane Änderungsrate f′(${fmt(a)}). Gefragt ist die mittlere.`)] }));
  }
  if (t === 2) {
    const k = pick([1, 2, 3, 4, 5]); const t1 = ri(0, 4); const t2 = t1 + ri(1, 4); const t0 = ri(1, 6);
    const s = `s(t) = ${one(k)}t²`;
    if (Math.random() < 0.5) return N(num(`Ein Fahrzeug fährt aus dem Stand los: ${s} (s in Metern, t in Sekunden). Berechne die mittlere Geschwindigkeit in ${iv(t1, t2)}.`, k * (t1 + t2), { unit: 'm/s', steps: [`s(${t2}) = ${k * t2 * t2} m, s(${t1}) = ${k * t1 * t1} m`, `(${k * t2 * t2} − ${k * t1 * t1}) : (${t2} − ${t1}) = ${k * (t2 * t2 - t1 * t1)} : ${t2 - t1} = ${k * (t1 + t2)} m/s`],
      traps: [T(k * (t2 * t2 - t1 * t1), `Das ist der Weg. Für die Geschwindigkeit noch durch die Zeit ${t2 - t1} s dividieren.`), T(2 * k * t2, `Das ist die Momentangeschwindigkeit bei t = ${t2}.`)] }));
    return N(num(`Ein Fahrzeug fährt aus dem Stand los: ${s} (s in Metern, t in Sekunden). Berechne die Momentangeschwindigkeit bei t = ${t0} s.`, 2 * k * t0, { unit: 'm/s', steps: [`v(t) = s′(t) = ${2 * k}t`, `v(${t0}) = ${2 * k} · ${t0} = ${2 * k * t0} m/s`],
      traps: [T(k * t0, `s(${t0}) : ${t0} ist die mittlere Geschwindigkeit seit dem Start. Momentan heißt ableiten.`), T(k * t0 * t0, `Das ist der Weg s(${t0}), nicht die Geschwindigkeit.`)] }));
  }
  if (t === 3) {
    const c = [nz(-3, 3), ri(-6, 6), ri(-6, 6)]; if (Math.random() < 0.5) c.unshift(nz(-2, 2));
    const x0 = ri(-3, 3); const d = derive(c); const v = ev(d, x0);
    return N(num(`f(x) = ${poly(c)}. Berechne den Differentialquotienten (die momentane Änderungsrate) an der Stelle x = ${fmt(x0)}.`, v, { steps: [`f′(x) = ${poly(d)}`, `f′(${fmt(x0)}) = ${fmt(v)}`],
      traps: [T(ev(c, x0), `Das ist der Funktionswert f(${fmt(x0)}). Der Differentialquotient ist f′(${fmt(x0)}).`), T(ev(c, x0 + 1) - ev(c, x0), 'Das ist ein Differenzenquotient (mittlere Rate über ein Intervall der Länge 1), nicht der Grenzwert.')] }));
  }
  const [fn, what, unit] = pick([['T', 'die Temperatur in °C nach t Stunden', 'Stunde'], ['V', 'das Wasservolumen eines Beckens in Litern nach t Minuten', 'Minute'], ['N', 'die Anzahl der Follower nach t Tagen', 'Tag']]);
  const a = ri(1, 6); const b = a + ri(2, 6); const k = ri(0, 3);
  const exprs = [`${fn}(${b}) − ${fn}(${a})`, `${frac(`${fn}(${b}) − ${fn}(${a})`, b - a)}`, `${frac(`${fn}(${b}) − ${fn}(${a})`, `${fn}(${a})`)}`, `${fn}′(${a})`];
  const means = [`um wie viel sich der Wert von t = ${a} bis t = ${b} insgesamt ändert`, `um wie viel sich der Wert im Intervall [${a}; ${b}] durchschnittlich pro ${unit} ändert`, `um welchen Anteil (Prozentsatz) sich der Wert von t = ${a} bis t = ${b} ändert`, `wie schnell sich der Wert genau zum Zeitpunkt t = ${a} ändert (pro ${unit})`];
  return PK(`${fn}(t) beschreibt ${what}. Was gibt ${exprs[k]} an?`, RATE_LABELS, RATE_LABELS[k], [`${exprs[k]} sagt, ${means[k]}.`, RATE_LABELS[k]],
    RATE_LABELS.map((l, i) => TP(l, `Die ${l} wäre ${exprs[i]}. Hier steht ${exprs[k]}: ${means[k]}.`)));
} };

// ---- FA 4 / AN 3: Kurvendiskussion ------------------------------------------

S.roots = { name: 'Nullstellen von Polynomen', rule: '<b>Nullstellen:</b> f(x) = 0. Fehlt das konstante Glied, x herausheben (x = 0 ist eine Lösung). Biquadratisch: x² = u setzen. Ein Produkt ist 0, wenn ein Faktor 0 ist.', gen() {
  const t = ri(0, 3);
  if (t === 0) {
    let r1; let r2; do { r1 = nz(-5, 5); r2 = nz(-5, 5); } while (r1 === r2);
    const a = pick([1, 1, -1, 2]); const c = fromRoots(a, [0, r1, r2]); const q = [a, -a * (r1 + r2), a * r1 * r2];
    return { kind: 'set', q: `f(x) = ${poly(c)}. Berechne alle Nullstellen.`, vals: [0, r1, r2].sort((x, y) => x - y), placeholder: 'z. B. 0; 2; −3', keys: true,
      steps: [`x herausheben: x · (${poly(q)}) = 0`, 'x = 0 oder die Klammer ist 0.', `${poly(q)} = 0 ergibt x = ${fmt(Math.min(r1, r2))} oder x = ${fmt(Math.max(r1, r2))}`],
      traps: [{ v: [r1, r2], why: 'x = 0 vergessen: Nach dem Herausheben ist auch der Faktor x selbst eine Lösung.' }, { v: [0, -r1, -r2], why: 'Vorzeichenfehler: (x − 3) = 0 ergibt x = +3.' }] };
  }
  if (t === 1) {
    const p = ri(1, 3); const q = ri(p + 1, 4); const c = [1, 0, -(p * p + q * q), 0, p * p * q * q];
    return { kind: 'set', q: `f(x) = ${poly(c)}. Berechne alle Nullstellen.`, vals: [-q, -p, p, q], show: `x = ±${p}, x = ±${q}`, placeholder: 'z. B. −2; 2; −1; 1', keys: true,
      steps: ['Biquadratisch: u = x² setzen.', `u² − ${p * p + q * q}u + ${p * p * q * q} = 0, also u = ${p * p} oder u = ${q * q}`, `x² = ${p * p} ergibt x = ±${p}, x² = ${q * q} ergibt x = ±${q}`],
      traps: [{ v: [p, q], why: 'x² = u hat zwei Lösungen: +√u und −√u. Es sind vier Nullstellen.' }, { v: [p * p, q * q], why: 'Das sind die Lösungen für u = x². Noch rücksubstituieren: x = ±√u.' }] };
  }
  if (t === 2) {
    let rs; do { rs = [nz(-4, 4), nz(-4, 4), ri(-4, 4)]; } while (new Set(rs).size < 3);
    const c = fromRoots(1, rs); const rest = pmul([1, -rs[1]], [1, -rs[2]]);
    return { kind: 'set', q: `f(x) = ${poly(c)}. x = ${fmt(rs[0])} ist eine Nullstelle. Berechne alle Nullstellen.`, vals: [...rs].sort((x, y) => x - y), placeholder: 'z. B. 1; −2; 3', keys: true,
      steps: [`Polynomdivision: (${poly(c)}) : (${poly([1, -rs[0]])}) = ${poly(rest)}`, `${poly(rest)} = 0 ergibt x = ${fmt(Math.min(rs[1], rs[2]))} oder x = ${fmt(Math.max(rs[1], rs[2]))}`, `Alle Nullstellen: ${[...rs].sort((a, b) => a - b).map((x) => fmt(x)).join('; ')}`],
      traps: [{ v: [rs[1], rs[2]], why: `Die gegebene Nullstelle x = ${fmt(rs[0])} gehört auch dazu.` }, { v: rs.map((x) => -x), why: 'Vorzeichenfehler: Aus (x + 2) = 0 folgt x = −2.' }] };
  }
  const k = ri(1, 5); const a = pick([1, 2, -1, 3]);
  return { kind: 'set', q: `f(x) = ${poly([a, 0, -a * k * k, 0])}. Berechne alle Nullstellen.`, vals: [-k, 0, k], placeholder: 'z. B. −2; 0; 2', keys: true,
    steps: [`Herausheben: ${a === 1 ? '' : a === -1 ? M : a}x · (x² − ${k * k}) = 0`, `x = 0 oder x² = ${k * k}, also x = ±${k}`],
    traps: [{ v: [-k, k], why: 'x = 0 vergessen: Der herausgehobene Faktor x liefert auch eine Nullstelle.' }, { v: [0, k], why: `x² = ${k * k} hat zwei Lösungen: +${k} und −${k}.` }] };
} };

// A cubic with extrema at x1 < x2: f′(x) = 3a(x − x1)(x − x2).
function cubicExt() {
  let a; let x1; let x2; do { a = pick([1, -1, 2, -2]); x1 = ri(-4, 3); x2 = x1 + ri(1, 5); } while ((a % 2 && (x1 + x2) % 2) || x2 > 5);
  const c = [a, (-3 * a * (x1 + x2)) / 2, 3 * a * x1 * x2, ri(-6, 6)];
  return { a, x1, x2, c, d1: derive(c), d2: derive(derive(c)), xw: (x1 + x2) / 2 };
}
S.monotony = { name: 'Monotonie', rule: '<b>Monotonie:</b> f′(x) > 0 heißt streng monoton steigend, f′(x) < 0 streng monoton fallend. Das Verhalten wechselt nur an Extremstellen (f′ = 0 mit Vorzeichenwechsel).', gen() {
  const up = Math.random() < 0.5; const word = up ? 'streng monoton steigend' : 'streng monoton fallend';
  if (Math.random() < 0.6) {
    const { a, x1, x2, c, d1 } = cubicExt();
    const I = iv(x1, x2); const O = `(−∞; ${fmt(x1)}] und [${fmt(x2)}; ∞)`; const L = `(−∞; ${fmt(x2)}]`; const R = `[${fmt(x1)}; ∞)`;
    const inside = (a > 0) !== up; const right = inside ? I : O;
    const xt = inside ? x2 + 1 : (x1 + x2) / 2; const ft = ev(d1, xt);
    return PK(`f(x) = ${poly(c)}. In welchem Bereich ist f ${word}?`, [I, O, L, R], right, [`f′(x) = ${poly(d1)} = 0 ergibt x = ${fmt(x1)} und x = ${fmt(x2)}.`, `f′ ist eine Parabel, ${a > 0 ? 'nach oben' : 'nach unten'} offen: zwischen den Nullstellen ${a > 0 ? 'negativ' : 'positiv'}, außen ${a > 0 ? 'positiv' : 'negativ'}.`, `${word}: ${right}`],
      [TP(inside ? O : I, `Prüfe mit einem Testwert: f′(${fmt(xt)}) = ${fmt(ft)}. Dort ist f also ${ft > 0 ? 'steigend' : 'fallend'}.`), TP(L, `Das Intervall geht über die Extremstelle x = ${fmt(x1)} hinaus. Dort ändert sich das Monotonieverhalten.`), TP(R, `Das Intervall geht über die Extremstelle x = ${fmt(x2)} hinaus. Dort ändert sich das Monotonieverhalten.`)]);
  }
  const a = nz(-3, 3); const xs = ri(-5, 5); const c = [a, -2 * a * xs, ri(-8, 8)]; const ys = ev(c, xs);
  const A = `(−∞; ${fmt(xs)}]`; const B = `[${fmt(xs)}; ∞)`; const right = (a > 0) === up ? B : A;
  const opts = unique([A, B, 'ℝ', `[${fmt(ys)}; ∞)`, `(−∞; ${fmt(xs + 2)}]`]).slice(0, 4);
  return PK(`f(x) = ${poly(c)}. In welchem Bereich ist f ${word}?`, opts, right, [`f′(x) = ${poly([2 * a, -2 * a * xs])} = 0 ergibt den Scheitel bei x = ${fmt(xs)}.`, `Parabel nach ${a > 0 ? 'oben' : 'unten'} offen: ${a > 0 ? 'links fallend, rechts steigend' : 'links steigend, rechts fallend'}.`, `${word}: ${right}`],
    [TP(right === A ? B : A, `Die Parabel ist nach ${a > 0 ? 'oben' : 'unten'} offen. Prüfe f′ links und rechts vom Scheitel.`), TP('ℝ', 'Eine Parabel ändert am Scheitel ihr Monotonieverhalten.'), TP(`[${fmt(ys)}; ∞)`, `${fmt(ys)} ist der y-Wert des Scheitels. Monotonie-Intervalle beziehen sich auf x.`), TP(`(−∞; ${fmt(xs + 2)}]`, `Das Intervall geht über den Scheitel x = ${fmt(xs)} hinaus.`)]);
} };

S.inflection = { name: 'Wendepunkte', rule: '<b>Wendestelle:</b> f″(x) = 0 (mit Vorzeichenwechsel von f″). f″ > 0: linksgekrümmt (positiv gekrümmt), f″ < 0: rechtsgekrümmt (negativ gekrümmt).', gen() {
  const a = nz(-3, 3); const xw = ri(-4, 4); const c = [a, -3 * a * xw, ri(-9, 9), ri(-9, 9)]; const d1 = derive(c); const d2 = derive(d1);
  const t = ri(0, 3); const base = [`f′(x) = ${poly(d1)}`, `f″(x) = ${poly(d2)}`];
  if (t === 0) {
    return N(num(`f(x) = ${poly(c)}. Berechne die Wendestelle.`, xw, { steps: [...base, `f″(x) = 0: x = ${fmt(-d2[1])} : ${br(d2[0])} = ${fmt(xw)}`],
      traps: [T(-xw, 'Vorzeichenfehler beim Auflösen von f″(x) = 0.'), T(3 * xw, `f″(x) = 6ax + 2b. Durch ${fmt(d2[0])} dividieren, nicht durch a.`), T(round(xw / 2, 4), 'f″ richtig bilden: (ax³)″ = 6ax und (bx²)″ = 2b.')] }));
  }
  if (t === 1) {
    const y = ev(c, xw);
    return N(num(`f(x) = ${poly(c)}. Berechne die y-Koordinate des Wendepunkts.`, y, { steps: [...base, `f″(x) = 0 ergibt x = ${fmt(xw)}`, `f(${fmt(xw)}) = ${fmt(y)}`],
      traps: [T(ev(d1, xw), `Das ist f′(${fmt(xw)}), die Steigung im Wendepunkt. Die y-Koordinate ist f(${fmt(xw)}).`), T(xw, 'Das ist die Wendestelle (x-Koordinate). Noch in f einsetzen.')] }));
  }
  if (t === 2) {
    const s = ev(d1, xw);
    return N(num(`f(x) = ${poly(c)}. Wie groß ist die Steigung der Wendetangente?`, s, { steps: [...base, `Wendestelle: x = ${fmt(xw)}`, `Steigung: f′(${fmt(xw)}) = ${fmt(s)}`],
      traps: [T(ev(c, xw), 'Das ist der Funktionswert. Die Steigung ist f′ an der Wendestelle.'), T(0, 'f″ ist an der Wendestelle 0, die Steigung f′ ist dort meist nicht 0.')] }));
  }
  let x0; do { x0 = ri(-5, 5); } while (x0 === xw);
  const k = ev(d2, x0); const L = 'linksgekrümmt (positiv gekrümmt)'; const R = 'rechtsgekrümmt (negativ gekrümmt)'; const right = k > 0 ? L : R;
  return PK(`f(x) = ${poly(c)}. Wie ist f an der Stelle x = ${fmt(x0)} gekrümmt?`, [L, R], right, [base[1], `f″(${fmt(x0)}) = ${fmt(k)} ${k > 0 ? '> 0' : '< 0'}`, right],
    [TP(k > 0 ? R : L, `f″(${fmt(x0)}) = ${fmt(k)} ist ${k > 0 ? 'positiv' : 'negativ'}. Entscheidend ist f″, nicht f oder f′.`)]);
} };

S.curve = { name: 'Kurvendiskussion', rule: '<b>Kurvendiskussion:</b> Nullstellen f(x) = 0, Extremstellen f′(x) = 0 (f″ > 0 Tiefpunkt, f″ < 0 Hochpunkt), Wendestellen f″(x) = 0, Krümmung über das Vorzeichen von f″.', gen() {
  const t = ri(0, 5);
  if (t === 0) {
    let r1; let r2; do { r1 = nz(-4, 4); r2 = nz(-4, 4); } while (r1 === r2);
    const a = pick([1, -1]); const c = fromRoots(a, [0, r1, r2]);
    return { kind: 'set', q: `Kurvendiskussion von f(x) = ${poly(c)}: Berechne die Nullstellen.`, vals: [0, r1, r2].sort((x, y) => x - y), placeholder: 'z. B. 0; 2; −3', keys: true,
      steps: [`x herausheben: x · (${poly([a, -a * (r1 + r2), a * r1 * r2])}) = 0`, `x = 0, x = ${fmt(Math.min(r1, r2))}, x = ${fmt(Math.max(r1, r2))}`],
      traps: [{ v: [r1, r2], why: 'x = 0 vergessen: Der herausgehobene Faktor x ist auch eine Lösung.' }, { v: [0, -r1, -r2], why: 'Vorzeichenfehler: Aus (x − 3) = 0 folgt x = +3.' }] };
  }
  const { a, x1, x2, c, d1, d2, xw } = cubicExt();
  const H = a > 0 ? x1 : x2; const Tt = a > 0 ? x2 : x1;
  const base = [`f′(x) = ${poly(d1)} = 0 ergibt x = ${fmt(x1)} und x = ${fmt(x2)}`, `f″(x) = ${poly(d2)}`];
  const q = `Kurvendiskussion von f(x) = ${poly(c)}:`;
  if (t === 1) {
    const hi = Math.random() < 0.5; const v = hi ? H : Tt;
    return N(num(`${q} An welcher Stelle hat f einen ${hi ? 'Hochpunkt' : 'Tiefpunkt'}?`, v, { steps: [...base, `f″(${fmt(H)}) = ${fmt(ev(d2, H))} < 0: Hochpunkt bei x = ${fmt(H)}`, `f″(${fmt(Tt)}) = ${fmt(ev(d2, Tt))} > 0: Tiefpunkt bei x = ${fmt(Tt)}`],
      traps: [T(hi ? Tt : H, `Dort ist f″ ${hi ? 'positiv' : 'negativ'}, also ein ${hi ? 'Tiefpunkt' : 'Hochpunkt'}.`), T(xw, 'Das ist die Wendestelle (f″ = 0), keine Extremstelle.')] }));
  }
  if (t === 2) {
    const x0 = pick([x1, x2]); const k = ev(d2, x0); const right = k < 0 ? 'Hochpunkt' : 'Tiefpunkt';
    return PK(`${q} An der Stelle x = ${fmt(x0)} ist f′(x) = 0. Was liegt dort vor?`, ['Hochpunkt', 'Tiefpunkt', 'Sattelpunkt'], right, [base[1], `f″(${fmt(x0)}) = ${fmt(k)} ${k < 0 ? '< 0: rechtsgekrümmt, also Hochpunkt' : '> 0: linksgekrümmt, also Tiefpunkt'}`],
      [TP(k < 0 ? 'Tiefpunkt' : 'Hochpunkt', `f″(${fmt(x0)}) = ${fmt(k)}. Negativ heißt Hochpunkt (Kurve wie ein Berg), positiv heißt Tiefpunkt (Kurve wie ein Tal).`), TP('Sattelpunkt', `Bei einem Sattelpunkt wäre auch f″(${fmt(x0)}) = 0. Hier ist f″ = ${fmt(k)}.`)]);
  }
  if (t === 3) {
    const hi = Math.random() < 0.5; const x0 = hi ? H : Tt; const y = ev(c, x0);
    return N(num(`${q} Berechne die y-Koordinate des ${hi ? 'Hochpunkts' : 'Tiefpunkts'}.`, y, { steps: [...base, `${hi ? 'Hochpunkt' : 'Tiefpunkt'} bei x = ${fmt(x0)} (f″(${fmt(x0)}) = ${fmt(ev(d2, x0))})`, `f(${fmt(x0)}) = ${fmt(y)}`],
      traps: [T(ev(c, hi ? Tt : H), `Das ist der y-Wert des ${hi ? 'Tiefpunkts' : 'Hochpunkts'}.`), T(x0, 'Das ist die x-Koordinate. Noch in f einsetzen.'), T(0, 'f′ ist dort 0, der Funktionswert f(x) nicht.')] }));
  }
  if (t === 4) {
    return N(num(`${q} Berechne die Wendestelle.`, xw, { steps: [base[1], `f″(x) = 0: x = ${fmt(xw)}`, `Probe: Die Wendestelle liegt genau in der Mitte der Extremstellen ${fmt(x1)} und ${fmt(x2)}.`],
      traps: [T(-xw, 'Vorzeichenfehler beim Auflösen von f″(x) = 0.'), T(x1, 'Das ist eine Extremstelle (f′ = 0). Die Wendestelle kommt aus f″ = 0.'), T(x2, 'Das ist eine Extremstelle (f′ = 0). Die Wendestelle kommt aus f″ = 0.')] }));
  }
  let x0; do { x0 = ri(-5, 5); } while (x0 === xw);
  const k = ev(d2, x0); const L = 'linksgekrümmt'; const R = 'rechtsgekrümmt'; const right = k > 0 ? L : R;
  return PK(`${q} Wie ist der Graph bei x = ${fmt(x0)} gekrümmt?`, [L, R], right, [base[1], `f″(${fmt(x0)}) = ${fmt(k)} ${k > 0 ? '> 0: linksgekrümmt' : '< 0: rechtsgekrümmt'}`],
    [TP(k > 0 ? R : L, `f″(${fmt(x0)}) = ${fmt(k)}. f″ > 0 heißt linksgekrümmt, f″ < 0 rechtsgekrümmt.`)]);
} };

S.optimize = { name: 'Extremwertaufgaben', rule: '<b>Extremwertaufgabe:</b> Hauptbedingung (was optimiert wird) aufstellen, mit der Nebenbedingung auf eine Variable bringen, ableiten, = 0 setzen, lösen und die gefragte Größe angeben.', gen() {
  const t = ri(0, 2);
  if (t === 0) {
    const U = 4 * ri(3, 30); const a = U / 4;
    if (Math.random() < 0.4) return N(num(`Ein Rechteck hat den Umfang ${U} m. Wie lang ist die Seite a, wenn die Fläche maximal ist?`, a, { unit: 'm', steps: [`Nebenbedingung: 2a + 2b = ${U}, also b = ${U / 2} − a`, `Hauptbedingung: A(a) = a · (${U / 2} − a) = ${U / 2}a − a²`, `A′(a) = ${U / 2} − 2a = 0, also a = ${fmt(a)} m (ein Quadrat)`],
      traps: [T(U / 2, `${U / 2} ist a + b. Optimal ist a = b = ${fmt(a)}.`), T(U / 8, 'A′(a) = U/2 − 2a richtig nullsetzen.')] }));
    return N(num(`Ein Rechteck hat den Umfang ${U} m. Wie groß ist die maximale Fläche?`, a * a, { unit: 'm²', steps: [`b = ${U / 2} − a, A(a) = ${U / 2}a − a²`, `A′(a) = ${U / 2} − 2a = 0, also a = ${fmt(a)}, b = ${fmt(a)}`, `A = ${fmt(a)} · ${fmt(a)} = ${fmt(a * a)} m²`],
      traps: [T((U / 2) ** 2, `Die Seite ist nicht ${U / 2} (das ist a + b), sondern ${fmt(a)}.`), T(a, 'Das ist die Seitenlänge. Gefragt ist die Fläche a · b.')] }));
  }
  if (t === 1) {
    const L = 8 * ri(3, 15); const x = L / 4; const y = L / 2; const A = x * y;
    const q = `Mit ${L} m Zaun wird an einer geraden Mauer ein rechteckiges Beet eingezäunt (die Mauer bildet eine Seite).`;
    const steps = [`x = Seite normal zur Mauer (zweimal), y = Seite parallel: 2x + y = ${L}`, `A(x) = x · (${L} − 2x) = ${L}x − 2x²`, `A′(x) = ${L} − 4x = 0, also x = ${fmt(x)} m, y = ${fmt(y)} m`];
    if (Math.random() < 0.4) return N(num(`${q} Wie lang muss die Seite normal zur Mauer sein, damit die Fläche maximal ist?`, x, { unit: 'm', steps, traps: [T(round(L / 3, 2), 'Drei gleich lange Seiten sind nicht optimal. Ableiten!'), T(y, 'Das ist die Seite parallel zur Mauer.')] }));
    return N(num(`${q} Wie groß ist die maximale Fläche?`, A, { unit: 'm²', steps: [...steps, `A = ${fmt(x)} · ${fmt(y)} = ${fmt(A)} m²`],
      traps: [T(round((L / 3) ** 2, 2), 'Ein Quadrat mit drei gleichen Zaunseiten ist hier nicht optimal. Ableiten!'), T((L / 4) ** 2, 'Ohne Mauer wäre ein Quadrat optimal, hier sind aber nur drei Seiten aus Zaun.')] }));
  }
  const a = pick([0.5, 1, 2, 0.25]); const xs = ri(4, 20) * (a === 0.25 ? 2 : 1); const b = ri(2, 20); const c = ri(10, 80) * 10; const p = b + 2 * a * xs;
  const G = (x) => p * x - (a * x * x + b * x + c);
  const q = `Ein Betrieb hat die Kostenfunktion K(x) = ${poly([a, b, c])} und verkauft jede Mengeneinheit um ${fmt(p)} GE (x in ME, Kosten und Preis in GE).`;
  const steps = [`G(x) = E(x) − K(x) = ${fmt(p)}x − (${poly([a, b, c])}) = ${poly([-a, p - b, -c])}`, `G′(x) = ${poly([-2 * a, p - b])} = 0, also x = ${fmt(xs)} ME`];
  if (Math.random() < 0.5) return N(num(`${q} Bei welcher Menge ist der Gewinn maximal?`, xs, { unit: 'ME', steps, traps: [T(round(p / (2 * a), 4), 'Die Kosten b · x gehören auch in G(x): G(x) = E(x) − K(x).'), T(round((p - b) / a, 4), `G′(x): Die Ableitung von ${fmt(a)}x² ist ${fmt(2 * a)}x.`)] }));
  return N(num(`${q} Wie groß ist der maximale Gewinn?`, round(G(xs), 4), { unit: 'GE', steps: [...steps, `G(${fmt(xs)}) = ${fmt(round(G(xs), 2))} GE`],
    traps: [T(p * xs, 'Das ist der Erlös E(x). Gewinn = Erlös − Kosten.'), T(xs, 'Das ist die optimale Menge. Gefragt ist G(x) an dieser Stelle.')] }));
} };

// ---- AN 2: Ableitungsregeln ----------------------------------------------

S.chain = { name: 'Ableitungsregeln (Kettenregel)', rule: '<b>Kettenregel:</b> äußere Ableitung mal innere Ableitung. (eᵏˣ)′ = k · eᵏˣ, (sin(bx))′ = b · cos(bx), (cos(bx))′ = −b · sin(bx), (ln x)′ = 1/x, ((ax + b)ⁿ)′ = n · a · (ax + b)ⁿ⁻¹.', gen() {
  const t = ri(0, 4);
  if (t === 0) {
    const c = pick([1, 2, 3, 5, 10]); const k = pick([-2, -1, -0.5, 0.5, 2, 3, 0.1]); const x0 = pick([0, 0, 1, 2]);
    const v = round(c * k * Math.exp(k * x0), 2);
    return N(num(`f(x) = ${c === 1 ? '' : `${c} · `}e<sup>${fmt(k)}x</sup>. Berechne f′(${x0}).${x0 ? ' (2 Dezimalen)' : ''}`, v, { tol: 0.011, show: x0 ? f2(v) : fmt(v), steps: [`Kettenregel: f′(x) = ${c === 1 ? '' : `${c} · `}${br(k)} · e<sup>${fmt(k)}x</sup>`, `f′(${x0}) = ${fmt(c * k)} · e<sup>${fmt(k * x0)}</sup> ≈ ${x0 ? f2(v) : fmt(v)}`],
      traps: [T(round(c * Math.exp(k * x0), 2), `Innere Ableitung vergessen: Die Hochzahl ${fmt(k)}x abgeleitet ergibt ${fmt(k)}, das kommt als Faktor dazu.`), x0 !== 0 && T(round(c * k * x0 * Math.exp(k * x0 - 1), 2), 'eˣ ist keine Potenz von x: Die Hochzahl wird nicht nach vorne geholt.')] }));
  }
  if (t === 1) {
    const a = pick([1, 2, 3, -2, 4]); const b = pick([1, 2, 3]); const m = ri(0, 2);
    const x0 = [0, Math.PI / b, (2 * Math.PI) / b][m]; const show = ['0', b === 1 ? 'π' : frac('π', b), b === 1 ? '2π' : frac('2π', b)][m];
    const v = Math.round(a * b * Math.cos(b * x0));
    return N(num(`f(x) = ${a === 1 ? '' : `${fmt(a)} · `}sin(${one(b)}x). Berechne f′(${show}).`, v, { steps: [`f′(x) = ${a === 1 ? '' : `${fmt(a)} · `}${b === 1 ? '' : `${b} · `}cos(${one(b)}x)`, `${b === 1 ? '' : `${b} · `}${show} = ${['0', 'π', '2π'][m]}, cos(${['0', 'π', '2π'][m]}) = ${m === 1 ? M : ''}1, also f′ = ${fmt(v)}`],
      traps: [b !== 1 && T(Math.round(a * Math.cos(b * x0)), `Innere Ableitung ${b} vergessen.`), T(-v, '(sin x)′ = cos x, ohne Minus. Das Minus kommt erst bei (cos x)′ = −sin x.'), T(0, 'Das ist f selbst (sin), nicht die Ableitung (cos).')] }));
  }
  if (t === 2) {
    const a = pick([1, 2, 3, 4]); const b = pick([1, 2, 3, 4]); const v = -a * b;
    const xs = frac('π', 2 * b);
    return N(num(`f(x) = ${a === 1 ? '' : `${a} · `}cos(${one(b)}x). Berechne f′(${xs}).`, v, { steps: [`f′(x) = ${fmt(-a * b)} · sin(${one(b)}x)`, `${b === 1 ? '' : `${b} · `}${xs} = ${frac('π', 2)}, sin(${frac('π', 2)}) = 1`, `f′ = ${fmt(v)}`],
      traps: [T(-v, '(cos x)′ = −sin x: Das Minus nicht vergessen.'), b !== 1 && T(-a, `Innere Ableitung ${b} vergessen.`)] }));
  }
  if (t === 3) {
    const a = pick([1, 2, 3, 5]); const b = ri(-3, 4); const x0 = ri(1, 4); const inner = a * x0 + b;
    if (inner <= 0) return S.chain.gen();
    const v = round(a / inner, 2);
    return N(num(`f(x) = ln(${poly([a, b])}). Berechne f′(${x0}). (2 Dezimalen)`, v, { tol: 0.011, show: f2(v), steps: [`f′(x) = ${frac(a, poly([a, b]))} (äußere Ableitung 1/u, innere ${a})`, `f′(${x0}) = ${frac(a, inner)} ≈ ${f2(v)}`],
      traps: [a !== 1 && T(round(1 / inner, 2), `Innere Ableitung ${a} vergessen.`), T(round(Math.log(inner), 2), 'Das ist f selbst. Die Ableitung von ln u ist 1/u.')] }));
  }
  const a = pick([2, 3, -1, 4, -2]); const b = ri(-3, 3); const n = ri(2, 4); const x0 = ri(-1, 2); const inner = a * x0 + b;
  const v = n * a * inner ** (n - 1);
  return N(num(`f(x) = (${poly([a, b])})${sup(n)}. Berechne f′(${fmt(x0)}).`, v, { steps: [`f′(x) = ${n} · (${poly([a, b])})${n - 1 > 1 ? sup(n - 1) : ''} · ${br(a)}`, `f′(${fmt(x0)}) = ${n} · ${br(inner)}${n - 1 > 1 ? sup(n - 1) : ''} · ${br(a)} = ${fmt(v)}`],
    traps: [T(n * inner ** (n - 1), `Innere Ableitung ${fmt(a)} vergessen.`), T(n * a * inner ** n, 'Die Hochzahl wird um 1 kleiner.')] }));
} };

// ---- WS 2: Wahrscheinlichkeit ------------------------------------------------

S.probTree = { name: 'Baumdiagramme', rule: '<b>Pfadregeln:</b> Entlang eines Pfades multiplizieren, mehrere Pfade addieren. „Mindestens einmal“ über das Gegenereignis: 1 − P(keinmal).', gen() {
  const t = ri(0, 3);
  if (t <= 1) {
    const r = ri(2, 6); const b = ri(2, 6); const n = r + b;
    if (t === 0) return fracTask(`In einer Box liegen ${r} rote und ${b} blaue Kugeln. Es werden zwei ohne Zurücklegen gezogen. P(beide rot) = ?`, r * (r - 1), n * (n - 1), { steps: [`1. Zug: ${frac(r, n)}, 2. Zug: nur noch ${r - 1} rote von ${n - 1}: ${frac(r - 1, n - 1)}`, `Multiplizieren: ${frac(r, n)} · ${frac(r - 1, n - 1)} = ${frac(r * (r - 1), n * (n - 1))}`],
      traps: [FT(r * r, n * n, 'Das wäre mit Zurücklegen. Ohne Zurücklegen ist beim 2. Zug eine Kugel weniger drin.'), FT(r, n, 'Das ist nur der erste Zug. Entlang des Pfades multiplizieren.'), FT(r * (n - 1) + (r - 1) * n, n * (n - 1), 'Wahrscheinlichkeiten entlang eines Pfades werden multipliziert, nicht addiert.')] });
    return fracTask(`In einer Box liegen ${r} rote und ${b} blaue Kugeln. Es werden zwei ohne Zurücklegen gezogen. P(genau eine rote) = ?`, 2 * r * b, n * (n - 1), { steps: [`Pfad rot-blau: ${frac(r, n)} · ${frac(b, n - 1)} = ${frac(r * b, n * (n - 1))}`, `Pfad blau-rot: ${frac(b, n)} · ${frac(r, n - 1)} = ${frac(r * b, n * (n - 1))}`, `Addieren: ${frac(2 * r * b, n * (n - 1))}`],
      traps: [FT(r * b, n * (n - 1), 'Nur ein Pfad. Rot-blau und blau-rot sind zwei Pfade, beide addieren.'), FT(2 * r * b, n * n, 'Das wäre mit Zurücklegen.')] });
  }
  if (t === 2) {
    const [txt, things, ev1, ps] = pick([['Ein Bauteil ist mit Wahrscheinlichkeit P defekt', 'Bauteile', 'mindestens eines defekt', [0.02, 0.05, 0.1]], ['Ein Freiwurf geht mit Wahrscheinlichkeit P daneben', 'Freiwürfe', 'mindestens einer daneben', [0.2, 0.3, 0.4]], ['Ein Rubbellos gewinnt mit Wahrscheinlichkeit P', 'Lose', 'mindestens ein Gewinn', [0.1, 0.15, 0.2]]]);
    const p = pick(ps); const n = ri(3, 10); const v = round(1 - (1 - p) ** n, 4);
    return N(num(`${txt.replace('P', fmt(p))}. Es werden ${n} ${things} unabhängig voneinander betrachtet. P(${ev1}) = ? (4 Dezimalen)`, v, { tol: 0.00051, show: f4(v), steps: [`Gegenereignis: keinmal. P(keinmal) = ${fmt(round(1 - p, 2))}${sup(n)} ≈ ${f4((1 - p) ** n)}`, `P(mindestens einmal) = 1 − ${f4((1 - p) ** n)} ≈ ${f4(v)}`],
      traps: [n * p <= 1 && T(round(n * p, 4), 'n · p ist der Erwartungswert, keine Wahrscheinlichkeit. „Mindestens einmal“ über das Gegenereignis.'), T(round((1 - p) ** n, 4), 'Das ist P(keinmal). Noch von 1 abziehen.'), p ** n > 0.0001 && T(round(1 - p ** n, 4), 'Das Gegenereignis von „mindestens einmal“ ist „keinmal“: (1 − p)ⁿ, nicht pⁿ.')] }));
  }
  const pA = ri(2, 9) / 10; const pB = ri(2, 9) / 10; const k = ri(0, 2);
  const vals = [pA * pB, pA * (1 - pB) + (1 - pA) * pB, 1 - (1 - pA) * (1 - pB)]; const names = ['beide grün', 'genau eine grün', 'mindestens eine grün'];
  const v = round(vals[k], 4);
  const steps = [[`P = ${fmt(pA)} · ${fmt(pB)} = ${fmt(v)}`], [`grün-rot: ${fmt(pA)} · ${fmt(round(1 - pB, 2))} = ${fmt(round(pA * (1 - pB), 4))}`, `rot-grün: ${fmt(round(1 - pA, 2))} · ${fmt(pB)} = ${fmt(round((1 - pA) * pB, 4))}`, `Summe: ${fmt(v)}`], [`Gegenereignis „keine grün“: ${fmt(round(1 - pA, 2))} · ${fmt(round(1 - pB, 2))} = ${fmt(round((1 - pA) * (1 - pB), 4))}`, `P = 1 − ${fmt(round((1 - pA) * (1 - pB), 4))} = ${fmt(v)}`]][k];
  return N(num(`Auf dem Schulweg liegen zwei unabhängige Ampeln. Die erste ist mit Wahrscheinlichkeit ${fmt(pA)} grün, die zweite mit ${fmt(pB)}. P(${names[k]}) = ?`, v, { tol: 0.00011, steps,
    traps: [T(round(pA + pB, 4), k === 2 ? 'Addieren darf man nur bei unvereinbaren Ereignissen. Beide können grün sein: über das Gegenereignis rechnen.' : k === 1 ? 'Nicht einfach addieren: Pfade grün-rot und rot-grün einzeln multiplizieren, dann addieren.' : 'Entlang eines Pfades wird multipliziert, nicht addiert.'), k === 1 && T(round(pA * (1 - pB), 4), 'Nur ein Pfad. Es gibt zwei: grün-rot und rot-grün.')] }));
} };

S.condProb = { name: 'Bedingte Wahrscheinlichkeit', rule: '<b>Bedingte Wahrscheinlichkeit:</b> P(A | B) = P(A ∩ B) : P(B). In der Vierfeldertafel: Anzahl von „A und B“ durch die Anzahl von B (nur die Zeile oder Spalte der Bedingung zählt).', gen() {
  const t = ri(0, 2);
  if (t === 0) {
    const [A, nA, B, nB, ctx] = pick([['krank', 'gesund', 'positiv', 'negativ', 'Bei einem Schnelltest wurden Personen untersucht.'], ['Oberstufe', 'Unterstufe', 'fährt mit Öffis', 'kommt anders', 'An einer Schule wurde gefragt, wie die Schüler:innen zur Schule kommen.'], ['Neukund:in', 'Stammkund:in', 'mit Gutschein', 'ohne Gutschein', 'Ein Onlineshop wertet Bestellungen aus.']]);
    const a = ri(10, 90); const b = ri(5, 60); const c = ri(10, 120); const d = ri(50, 400); const n = a + b + c + d;
    const tab = table([['', B, nB, 'Summe'], [A, a, b, a + b], [nA, c, d, c + d], ['Summe', a + c, b + d, n]]);
    const k = ri(0, 2);
    const qs = [`P(${A} | ${B})`, `P(${B} | ${A})`, `P(${A} und ${B})`];
    const v = round([a / (a + c), a / (a + b), a / n][k], 4);
    const steps = [[`Bedingung „${B}“: nur die Spalte ${B} zählt (${a + c}).`, `P = ${a} : ${a + c} ≈ ${f4(v)}`], [`Bedingung „${A}“: nur die Zeile ${A} zählt (${a + b}).`, `P = ${a} : ${a + b} ≈ ${f4(v)}`], [`Keine Bedingung: durch alle ${n} dividieren.`, `P = ${a} : ${n} ≈ ${f4(v)}`]][k];
    return N(num(`${ctx}${tab}Berechne ${qs[k]}. (4 Dezimalen)`, v, { tol: 0.00051, show: f4(v), steps,
      traps: [k !== 2 && T(round(a / n, 4), 'Das ist P(A und B). Bei der bedingten Wahrscheinlichkeit nur durch die Bedingung dividieren, nicht durch alle.'), k === 0 && T(round(a / (a + b), 4), `Bedingung verwechselt: Das ist ${qs[1]}.`), k === 1 && T(round(a / (a + c), 4), `Bedingung verwechselt: Das ist ${qs[0]}.`), k === 2 && T(round(a / (a + c), 4), `Das ist ${qs[0]}. Bei „und“ durch alle ${n} dividieren.`)] }));
  }
  if (t === 1) {
    const pK = pick([0.01, 0.02, 0.05, 0.1]); const se = pick([0.9, 0.95, 0.98]); const fp = pick([0.02, 0.05, 0.1]);
    const pPos = pK * se + (1 - pK) * fp; const v = round((pK * se) / pPos, 4);
    return N(num(`${fmt(pK * 100)} % der Bevölkerung haben eine Krankheit. Ein Test erkennt Kranke mit ${fmt(se * 100)} %, bei Gesunden ist er mit ${fmt(fp * 100)} % fälschlich positiv. Wie groß ist P(krank | positiv)? (4 Dezimalen)`, v, { tol: 0.00051, show: f4(v), steps: [`P(krank und positiv) = ${fmt(pK)} · ${fmt(se)} = ${fmt(round(pK * se, 5))}`, `P(gesund und positiv) = ${fmt(round(1 - pK, 2))} · ${fmt(fp)} = ${fmt(round((1 - pK) * fp, 5))}`, `P(positiv) = ${fmt(round(pPos, 5))}`, `P(krank | positiv) = ${fmt(round(pK * se, 5))} : ${fmt(round(pPos, 5))} ≈ ${f4(v)}`],
      traps: [T(se, 'Das ist P(positiv | krank). Gefragt ist umgekehrt: Welcher Anteil der Positiven ist krank?'), T(round(pK * se, 4), 'Das ist P(krank und positiv). Noch durch P(positiv) dividieren.')] }));
  }
  let N0; let pA; let pB; let a; let nA; let nB; const indep = Math.random() < 0.5;
  do { N0 = pick([200, 400, 500]); pA = pick([0.2, 0.4, 0.5]); pB = pick([0.1, 0.3, 0.5]); nA = Math.round(N0 * pA); nB = Math.round(N0 * pB); a = Math.round(N0 * pA * pB) + (indep ? 0 : pick([-10, 10, 15])); }
  while (a < 1 || nA - a < 1 || nB - a < 1 || N0 - nA - nB + a < 1);
  const tab = table([['', 'B', 'nicht B', 'Summe'], ['A', a, nA - a, nA], ['nicht A', nB - a, N0 - nA - nB + a, N0 - nA], ['Summe', nB, N0 - nB, N0]]);
  const prod = round(pA * pB, 4); const pAB = round(a / N0, 4); const right = indep ? 'ja, unabhängig' : 'nein, abhängig';
  const why = `P(A) · P(B) = ${fmt(pA)} · ${fmt(pB)} = ${fmt(prod)}, P(A ∩ B) = ${a} : ${N0} = ${fmt(pAB)}. ${indep ? 'Gleich, also unabhängig.' : 'Verschieden, also abhängig.'}`;
  return PK(`Sind die Ereignisse A und B unabhängig?${tab}`, ['ja, unabhängig', 'nein, abhängig'], right, ['Unabhängig heißt P(A ∩ B) = P(A) · P(B).', why], [TP(indep ? 'nein, abhängig' : 'ja, unabhängig', why)]);
} };

S.randVar = { name: 'Zufallsvariablen', rule: '<b>Diskrete Zufallsvariable:</b> E(X) = Σ xᵢ · pᵢ, V(X) = Σ (xᵢ − E)² · pᵢ, σ = √V. Die Wahrscheinlichkeiten ergeben zusammen 1.', gen() {
  const t = ri(0, 3); const k = ri(3, 4);
  const xs = pick([[0, 2, 5, 20], [-2, 0, 3, 10], [1, 2, 3, 4], [0, 1, 2, 3], [-5, 0, 5, 50]]).slice(0, k);
  let parts; do { parts = Array.from({ length: k }, () => ri(1, 10)); } while (parts.reduce((a, b) => a + b, 0) !== 20);
  const ps = parts.map((x) => x / 20);
  const E = xs.reduce((s, x, i) => s + x * ps[i], 0); const V = xs.reduce((s, x, i) => s + (x - E) ** 2 * ps[i], 0);
  const miss = ri(0, k - 1);
  const tab = (hide) => table([['x', ...xs.map((x) => fmt(x))], ['P(X = x)', ...ps.map((p, i) => (hide && i === miss ? '?' : fmt(p)))]]);
  const ctx = 'Bei einem Spiel ist X der Gewinn in €.';
  const sumStr = xs.map((x, i) => `${br(x)} · ${fmt(ps[i])}`).join(' + ');
  if (t === 0) return N(num(`${ctx}${tab()}Berechne den Erwartungswert E(X).`, round(E, 4), { unit: '€', steps: [`E(X) = ${sumStr} = ${fmt(round(E, 4))}`],
    traps: [T(round(xs.reduce((a, b) => a + b, 0) / k, 4), 'Das ist der Mittelwert der Werte. Jeder Wert zählt mit seiner Wahrscheinlichkeit.'), T(xs.reduce((a, b) => a + b, 0), 'Jeden Wert mit seiner Wahrscheinlichkeit multiplizieren.')] }));
  if (t === 1) {
    const v = round(V, 2);
    return N(num(`${ctx}${tab()}Berechne die Varianz V(X). (2 Dezimalen)`, v, { tol: 0.011, show: f2(v), steps: [`E(X) = ${fmt(round(E, 4))}`, `V(X) = ${xs.map((x, i) => `${br(round(x - E, 4))}² · ${fmt(ps[i])}`).join(' + ')} ≈ ${f2(v)}`],
      traps: [T(round(V + E * E, 2), 'Das ist E(X²). Für die Varianz noch E(X)² abziehen oder mit (xᵢ − E)² rechnen.'), T(round(Math.sqrt(V), 2), 'Das ist die Standardabweichung σ. Die Varianz ist σ².')] }));
  }
  if (t === 2) {
    const v = round(Math.sqrt(V), 2);
    return N(num(`${ctx}${tab()}Berechne die Standardabweichung σ. (2 Dezimalen)`, v, { tol: 0.011, show: f2(v), steps: [`E(X) = ${fmt(round(E, 4))}`, `V(X) = Σ (xᵢ − E)² · pᵢ ≈ ${fmt(round(V, 4))}`, `σ = √V ≈ ${f2(v)}`],
      traps: [T(round(V, 2), 'Das ist die Varianz. Noch die Wurzel ziehen.'), T(round(Math.sqrt(V + E * E), 2), 'Bei der Varianz die Abweichung vom Erwartungswert quadrieren: (xᵢ − E)².')] }));
  }
  const rest = round(1 - ps[miss], 4);
  return N(num(`${ctx}${tab(true)}Welche Wahrscheinlichkeit fehlt in der Tabelle?`, ps[miss], { steps: ['Alle Wahrscheinlichkeiten ergeben zusammen 1.', `Summe der anderen: ${fmt(rest)}`, `1 − ${fmt(rest)} = ${fmt(ps[miss])}`],
    traps: [T(rest, 'Das ist die Summe der anderen. Die fehlende ist 1 minus diese Summe.'), T(round(1 / k, 4), 'Die Werte sind nicht gleich wahrscheinlich. Rechne 1 minus die Summe der anderen.')] }));
} };

// ---- AN 4: Integral -------------------------------------------------------

S.areaBetween = { name: 'Flächen mit dem Integral', rule: '<b>Fläche:</b> Bei Vorzeichenwechsel an den Nullstellen aufteilen und die Beträge addieren. Zwischen zwei Kurven: ∫ (obere − untere) dx von Schnittstelle zu Schnittstelle.', gen() {
  const t = ri(0, 2);
  if (t === 0) {
    let rs; do { rs = [ri(-3, 2), ri(-2, 3), ri(-1, 4)].sort((a, b) => a - b); } while (rs[0] === rs[1] || rs[1] === rs[2]);
    const s = pick([1, -1]); const c = fromRoots(s, rs);
    const A1 = integ(c, rs[0], rs[1]); const A2 = integ(c, rs[1], rs[2]); const v = round(Math.abs(A1) + Math.abs(A2), 2);
    return N(num(`f(x) = ${poly(c)} hat die Nullstellen ${rs.map((x) => fmt(x)).join(', ')}. Berechne die Fläche, die der Graph von x = ${fmt(rs[0])} bis x = ${fmt(rs[2])} mit der x-Achse einschließt. (2 Dezimalen)`, v, { unit: 'FE', tol: 0.011, show: f2(v), steps: [`Vorzeichenwechsel bei x = ${fmt(rs[1])}: aufteilen.`, `∫ von ${fmt(rs[0])} bis ${fmt(rs[1])} f(x) dx ≈ ${f2(A1)}`, `∫ von ${fmt(rs[1])} bis ${fmt(rs[2])} f(x) dx ≈ ${f2(A2)}`, `A = |${f2(A1)}| + |${f2(A2)}| ≈ ${f2(v)} FE`],
      traps: [T(round(Math.abs(A1 + A2), 2), 'Ohne Aufteilen heben sich die Flächen oberhalb und unterhalb der x-Achse teilweise auf.'), T(round(Math.abs(A1), 2), 'Beide Teilflächen addieren.')] }));
  }
  if (t === 1) {
    let u; let w; do { u = ri(-3, 2); w = u + ri(1, 4); } while (w > 4);
    const s = pick([1, -1]); const c = fromRoots(s, [u, w]); const b = w + ri(1, 2);
    const A1 = integ(c, u, w); const A2 = integ(c, w, b); const v = round(Math.abs(A1) + Math.abs(A2), 2);
    return N(num(`f(x) = ${poly(c)}. Berechne die Fläche zwischen dem Graphen und der x-Achse im Intervall ${iv(u, b)}. (2 Dezimalen)`, v, { unit: 'FE', tol: 0.011, show: f2(v), steps: [`Nullstellen: x = ${fmt(u)} und x = ${fmt(w)}. In ${iv(u, b)} wechselt f bei ${fmt(w)} das Vorzeichen.`, `∫ von ${fmt(u)} bis ${fmt(w)} ≈ ${f2(A1)}, ∫ von ${fmt(w)} bis ${fmt(b)} ≈ ${f2(A2)}`, `A = ${f2(Math.abs(A1))} + ${f2(Math.abs(A2))} ≈ ${f2(v)} FE`],
      traps: [T(round(Math.abs(A1 + A2), 2), `Das Integral über ${iv(u, b)} ist keine Fläche: Teile unter der x-Achse zählen negativ. Bei x = ${fmt(w)} aufteilen.`), T(round(Math.abs(A1), 2), `Das ist nur die Fläche bis x = ${fmt(w)}. Das Stück bis ${fmt(b)} gehört dazu.`)] }));
  }
  let u; let w; do { u = ri(-3, 2); w = u + ri(1, 4); } while (w > 5);
  const k = pick([1, -1]); const diff = fromRoots(k, [u, w]); const g = [nz(-3, 3), ri(-4, 4)]; const f = padd(diff, g);
  const I = integ(diff, u, w); const A = round(Math.abs(I), 2); const top = k > 0 ? 'g' : 'f';
  return N(num(`f(x) = ${poly(f)} und g(x) = ${poly(g)} schneiden einander bei x = ${fmt(u)} und x = ${fmt(w)}. Berechne die eingeschlossene Fläche. (2 Dezimalen)`, A, { unit: 'FE', tol: 0.011, show: f2(A), steps: [`f(x) − g(x) = ${poly(diff)}`, `${top} liegt zwischen den Schnittstellen oben (Testwert x = ${fmt((u + w) / 2)}).`, `∫ von ${fmt(u)} bis ${fmt(w)} (f − g) dx ≈ ${f2(I)}`, `A ≈ ${f2(A)} FE`],
    traps: [T(round(Math.abs(integ(f, u, w)), 2), 'Das ist nur die Fläche unter f. Gesucht ist die Fläche zwischen f und g: ∫ (f − g) dx.'), T(round(I, 2), 'Eine Fläche ist nie negativ: obere minus untere Funktion, oder den Betrag nehmen.')] }));
} };

S.motion = { name: 'Weg, Geschwindigkeit, Beschleunigung', rule: '<b>Bewegung:</b> v(t) = s′(t), a(t) = v′(t) = s″(t). Umgekehrt: Der Weg ist das Integral der Geschwindigkeit, ∫ v(t) dt.', gen() {
  const t = ri(0, 3);
  const al = ri(0, 1); const be = ri(al ? 0 : 1, 3); const ga = ri(1, 10); const s = [al, be, ga, 0]; const v = derive(s); const a = derive(v);
  const vs = poly(v, 't'); const ss = poly(s, 't');
  if (t === 0) {
    const T2 = ri(2, 6); const w = ev(s, T2);
    return N(num(`Ein Fahrzeug hat die Geschwindigkeit v(t) = ${vs} (t in s, v in m/s). Welchen Weg legt es in den ersten ${T2} Sekunden zurück?`, w, { unit: 'm', steps: [`s = ∫ von 0 bis ${T2} v(t) dt`, `Stammfunktion: ${ss}`, `s(${T2}) − s(0) = ${fmt(w)} m`],
      traps: [T(ev(v, T2) * T2, 'Die Geschwindigkeit ist nicht konstant. Der Weg ist das Integral, nicht v(T) · T.'), T(ev(v, T2), 'Das ist die Geschwindigkeit am Ende, nicht der Weg.')] }));
  }
  if (t === 1) {
    const t0 = ri(1, 5); const val = ev(v, t0);
    return N(num(`Ein Körper bewegt sich nach s(t) = ${ss} (t in s, s in m). Wie groß ist die Geschwindigkeit bei t = ${t0} s?`, val, { unit: 'm/s', steps: [`v(t) = s′(t) = ${vs}`, `v(${t0}) = ${fmt(val)} m/s`],
      traps: [T(ev(s, t0), 'Das ist der Weg s(t). Die Geschwindigkeit ist die Ableitung s′(t).'), T(round(ev(s, t0) / t0, 4), 'Das ist die mittlere Geschwindigkeit seit dem Start, nicht die momentane.')] }));
  }
  if (t === 2) {
    const t0 = ri(1, 5); const val = ev(a, t0);
    return N(num(`Ein Körper bewegt sich nach s(t) = ${ss} (t in s, s in m). Wie groß ist die Beschleunigung bei t = ${t0} s?`, val, { unit: 'm/s²', steps: [`v(t) = ${vs}`, `a(t) = v′(t) = ${poly(a, 't')}`, `a(${t0}) = ${fmt(val)} m/s²`],
      traps: [T(ev(v, t0), 'Das ist die Geschwindigkeit. Die Beschleunigung ist die zweite Ableitung.'), T(ev(s, t0), 'Das ist der Weg. Zweimal ableiten.')] }));
  }
  const [v0, dec] = pick([[10, 2], [12, 3], [15, 3], [20, 4], [20, 5], [25, 5], [30, 6], [16, 4], [30, 5]]);
  const tt = v0 / dec; const w = (v0 * v0) / (2 * dec);
  return N(num(`Ein Auto fährt mit ${v0} m/s und bremst gleichmäßig mit ${dec} m/s². Wie lang ist der Bremsweg?`, w, { unit: 'm', steps: [`v(t) = ${v0} − ${dec}t = 0, also Stillstand nach t = ${fmt(tt)} s`, `s(t) = ∫ v dt = ${v0}t − ${fmt(dec / 2)}t²`, `s(${fmt(tt)}) = ${fmt(v0 * tt)} − ${fmt((dec / 2) * tt * tt)} = ${fmt(w)} m`],
    traps: [T(v0 * tt, 'Das wäre der Weg ohne Bremsen. Die Geschwindigkeit nimmt ab: integrieren.'), T((v0 * v0) / dec, 'Bei s = v₀² : (2a) die 2 im Nenner nicht vergessen.')] }));
} };

// ---- WS 3 / WS 4: Normalverteilung, Binomial, Konfidenzintervall ------------

const NCTX = [['die Körpergröße von Erwachsenen (in cm)', () => ri(168, 178), () => ri(6, 10)], ['die Füllmenge von Flaschen (in ml)', () => 500, () => ri(2, 6)], ['das Gewicht von Mehlpackungen (in g)', () => 1000, () => ri(5, 15)], ['die Lebensdauer von Akkus (in Stunden)', () => 10 * ri(70, 90), () => 10 * ri(4, 8)], ['das Ergebnis eines IQ-Tests', () => 100, () => 15]];
S.normal = { name: 'Normalverteilung', rule: '<b>Normalverteilung:</b> Standardisieren z = (x − μ) : σ, dann P(X ≤ a) = Φ(z). P(X ≥ a) = 1 − Φ(z), P(a ≤ X ≤ b) = Φ(z_b) − Φ(z_a). Ca. 68 % liegen in μ ± σ, 95 % in μ ± 2σ, 99,7 % in μ ± 3σ.', gen() {
  const [ctx, mf, sf] = pick(NCTX); const mu = mf(); const sg = sf(); const t = ri(0, 4);
  const q = `X beschreibt ${ctx}, normalverteilt mit μ = ${fmt(mu)} und σ = ${fmt(sg)}.`;
  const pt = () => mu + Math.round((ri(-20, 20) / 10) * sg);
  if (t <= 1) {
    let a; do { a = pt(); } while (a === mu);
    const z = (a - mu) / sg; const P = Phi(z); const v = round(t === 0 ? P : 1 - P, 4);
    return N(num(`${q} Berechne P(X ${t === 0 ? '≤' : '≥'} ${fmt(a)}). (4 Dezimalen)`, v, { tol: 0.002, show: f4(v), steps: [`z = (${fmt(a)} − ${fmt(mu)}) : ${fmt(sg)} ≈ ${fmt(round(z, 4))}`, `Φ(${fmt(round(z, 2))}) ≈ ${f4(P)}`, ...(t === 1 ? [`P(X ≥ ${fmt(a)}) = 1 − ${f4(P)} ≈ ${f4(v)}`] : [])],
      traps: [T(round(t === 0 ? 1 - P : P, 4), t === 0 ? 'Das ist P(X ≥ a). Φ(z) gibt direkt P(X ≤ a).' : 'Das ist P(X ≤ a). Für ≥ noch 1 − Φ(z).'), Math.abs(z) < 1 && T(round(Math.abs(z), 4), 'Das ist der z-Wert. Die Wahrscheinlichkeit ist Φ(z).')] }));
  }
  if (t === 2) {
    let a; let b; do { a = pt(); b = pt(); } while (b - a < sg / 2);
    const za = (a - mu) / sg; const zb = (b - mu) / sg; const v = round(Phi(zb) - Phi(za), 4);
    return N(num(`${q} Berechne P(${fmt(a)} ≤ X ≤ ${fmt(b)}). (4 Dezimalen)`, v, { tol: 0.002, show: f4(v), steps: [`z₁ = (${fmt(a)} − ${fmt(mu)}) : ${fmt(sg)} ≈ ${fmt(round(za, 4))}, z₂ = (${fmt(b)} − ${fmt(mu)}) : ${fmt(sg)} ≈ ${fmt(round(zb, 4))}`, `Φ(z₂) − Φ(z₁) ≈ ${f4(Phi(zb))} − ${f4(Phi(za))} ≈ ${f4(v)}`],
      traps: [T(round(Phi(zb), 4), `Das ist P(X ≤ ${fmt(b)}). Den Teil unter ${fmt(a)} noch abziehen.`), T(round(1 - v, 4), 'Das ist die Wahrscheinlichkeit außerhalb des Intervalls.')] }));
  }
  if (t === 3) {
    const [k, pct] = pick([[1, '68 %'], [2, '95 %'], [3, '99,7 %']]); const kk = k === 1 ? '' : k;
    const opt = (m) => `[${fmt(mu - m * sg)}; ${fmt(mu + m * sg)}]`;
    if (Math.random() < 0.5) {
      const opts = [0.5, 1, 2, 3].map(opt); const right = opt(k);
      return PK(`${q} In welchem Intervall liegen ungefähr ${pct} der Werte?`, opts, right, [`${pct} liegen im Bereich μ ± ${kk}σ.`, `${fmt(mu)} ± ${fmt(k * sg)} ergibt ${right}`],
        opts.map((o) => TP(o, `Faustregeln: 68 % in μ ± σ, 95 % in μ ± 2σ, 99,7 % in μ ± 3σ. Hier ${pct}: μ ± ${kk}σ.`)));
    }
    const v = round(Phi(k) - Phi(-k), 4);
    return N(num(`${q} Berechne P(${fmt(mu - k * sg)} ≤ X ≤ ${fmt(mu + k * sg)}). (4 Dezimalen)`, v, { tol: 0.002, show: f4(v), steps: [`Das ist der Bereich μ ± ${kk}σ (z = ±${k}).`, `Φ(${k}) − Φ(−${k}) ≈ ${f4(v)}`],
      traps: [T(round(Phi(k), 4), `Das ist P(X ≤ μ + ${kk}σ). Den Teil links von μ − ${kk}σ noch abziehen.`), T(round(Phi(k) - 0.5, 4), 'Das ist nur die Hälfte des Intervalls (von μ bis μ + kσ).')] }));
  }
  const p = pick([0.8, 0.9, 0.95, 0.99, 0.1, 0.05]); const z = invPhi(p); const v = round(mu + z * sg, 1);
  return N(num(`${q} Für welchen Wert a gilt P(X ≤ a) = ${fmt(p)}? (1 Dezimale)`, v, { tol: 0.15, show: fmt(v, 1), steps: [`Φ(z) = ${fmt(p)} ergibt z ≈ ${fmt(round(z, 4))}`, `a = μ + z · σ = ${fmt(mu)} + ${br(round(z, 4))} · ${fmt(sg)} ≈ ${fmt(v, 1)}`],
    traps: [T(round(mu - z * sg, 1), `Vorzeichen von z: Für P = ${fmt(p)} liegt a ${p > 0.5 ? 'rechts' : 'links'} von μ.`), T(round(mu + z, 1), 'z noch mit σ multiplizieren: a = μ + z · σ.')] }));
} };

S.binomSigma = { name: 'Standardabweichung der Binomialverteilung', rule: '<b>Binomialverteilung:</b> E(X) = μ = n · p, V(X) = n · p · (1 − p), σ = √(n · p · (1 − p)).', gen() {
  const n = pick([20, 50, 80, 100, 200, 400, 500, 1000]); const p = pick([0.05, 0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75]); const t = ri(0, 2);
  const V = round(n * p * (1 - p), 8); const sg = Math.sqrt(V); const mu = round(n * p, 8);
  const q = `X ist binomialverteilt mit n = ${n} und p = ${fmt(p)}.`;
  if (t === 0) return N(num(`${q} Berechne die Standardabweichung σ. (2 Dezimalen)`, round(sg, 2), { tol: 0.011, show: f2(sg), steps: [`σ = √(n · p · (1 − p)) = √(${n} · ${fmt(p)} · ${fmt(round(1 - p, 2))})`, `= √${fmt(round(V, 4))} ≈ ${f2(sg)}`],
    traps: [T(round(V, 2), 'Das ist die Varianz. σ ist die Wurzel daraus.'), T(round(Math.sqrt(mu), 2), 'Der Faktor (1 − p) fehlt.'), T(mu, 'Das ist der Erwartungswert n · p.')] }));
  if (t === 1) return N(num(`${q} Berechne die Varianz V(X). (2 Dezimalen)`, round(V, 2), { tol: 0.011, show: f2(V), steps: [`V(X) = ${n} · ${fmt(p)} · ${fmt(round(1 - p, 2))} = ${fmt(round(V, 4))}`],
    traps: [T(round(sg, 2), 'Das ist σ. Die Varianz ist σ² = n · p · (1 − p) ohne Wurzel.'), T(mu, 'Das ist der Erwartungswert. Mal (1 − p) fehlt.')] }));
  const low = Math.random() < 0.5; const v = round(low ? mu - 2 * sg : mu + 2 * sg, 2);
  return N(num(`${q} Berechne die ${low ? 'untere' : 'obere'} Grenze des Intervalls μ ± 2σ. (2 Dezimalen)`, v, { tol: 0.011, show: f2(v), steps: [`μ = ${fmt(mu)}, σ = √${fmt(round(V, 4))} ≈ ${fmt(round(sg, 4))}`, `μ ${low ? M : '+'} 2σ ≈ ${f2(v)}`],
    traps: [T(round(low ? mu - sg : mu + sg, 2), 'Das ist μ ± σ. Gefragt ist das 2σ-Intervall.'), T(round(low ? mu - 2 * V : mu + 2 * V, 2), 'Mit σ rechnen, nicht mit der Varianz.')] }));
} };

S.confInt = { name: 'Konfidenzintervall', rule: '<b>95-%-Konfidenzintervall</b> für einen Anteil: h ± 1,96 · √(h · (1 − h) : n), h = relative Häufigkeit in der Stichprobe. Vierfaches n halbiert die Breite.', gen() {
  const n = pick([200, 400, 500, 800, 1000, 1200, 1500]); const k = Math.round(n * (ri(10, 70) / 100)); const h = k / n;
  const sd = Math.sqrt((h * (1 - h)) / n); const half = 1.96 * sd; const t = ri(0, 3);
  const q = `Bei einer Umfrage unter ${n} zufällig ausgewählten Personen gaben ${k} an, regelmäßig einen Streamingdienst zu nutzen.`;
  const steps = [`h = ${k} : ${n} = ${fmt(round(h, 4))}`, `1,96 · √(${fmt(round(h, 4))} · ${fmt(round(1 - h, 4))} : ${n}) ≈ ${f4(half)}`];
  if (t <= 1) {
    const low = t === 0; const sgn = low ? -1 : 1; const v = round(h + sgn * half, 4);
    return N(num(`${q} Berechne die ${low ? 'untere' : 'obere'} Grenze des 95-%-Konfidenzintervalls für den Anteil. (4 Dezimalen)`, v, { tol: 0.0011, show: f4(v), steps: [...steps, `${fmt(round(h, 4))} ${low ? M : '+'} ${f4(half)} ≈ ${f4(v)}`],
      traps: [T(round(h + sgn * 1.645 * sd, 4), '1,645 gehört zu 90 %. Für 95 % ist z = 1,96.'), T(round(h + sgn * 1.96 * sd * sd, 4), 'Die Wurzel über h · (1 − h) : n vergessen.'), T(round(h + sgn * 1.96 * Math.sqrt(h * (1 - h)), 4), 'Unter der Wurzel noch durch n dividieren.')] }));
  }
  if (t === 2) {
    const v = round(2 * half, 4);
    return N(num(`${q} Wie breit ist das 95-%-Konfidenzintervall? (4 Dezimalen)`, v, { tol: 0.0011, show: f4(v), steps: [...steps, `Breite = 2 · ${f4(half)} ≈ ${f4(v)}`],
      traps: [T(round(half, 4), 'Das ist nur die halbe Breite (von h bis zu einer Grenze).'), T(round(2 * 1.96 * sd * sd, 4), 'Die Wurzel über h · (1 − h) : n vergessen.')] }));
  }
  const [f, right] = pick([[4, 'halbiert'], [9, 'gedrittelt'], [16, 'geviertelt']]);
  const opts = ['halbiert', 'gedrittelt', 'geviertelt', 'bleibt gleich'];
  return PK(`${q} Wie ändert sich die Breite des Konfidenzintervalls (bei gleichem h), wenn man ${f}-mal so viele Personen befragt?`, opts, right, ['n steht unter der Wurzel im Nenner: Die Breite ist proportional zu 1 : √n.', `√${f} = ${Math.sqrt(f)}, also wird die Breite durch ${Math.sqrt(f)} geteilt: ${right}`],
    opts.map((o) => TP(o, `Die Breite hängt von 1 : √n ab, nicht von 1 : n. ${f}-faches n teilt die Breite durch √${f} = ${Math.sqrt(f)}.`)));
} };

export default {
  skills: S,
  topics: [
    [9, 'terme9', 'Terme, Formeln, Ungleichungen', '🧷', ['numSets', 'ineq', 'formulaOs']],
    [9, 'statistik9', 'Beschreibende Statistik', '📊', ['stats']],
    [10, 'einheitskreis', 'Trigonometrie am Einheitskreis', '🌀', ['unitCircle', 'sineFn']],
    [11, 'aenderung', 'Änderungsmaße', '📏', ['diffQuot']],
    [11, 'kurven', 'Kurvendiskussion', '〰️', ['roots', 'monotony', 'inflection', 'curve', 'optimize']],
    [12, 'normal', 'Normalverteilung und Konfidenzintervall', '🔔', ['normal', 'confInt']],
    [12, 'matura-teil1', 'Matura Teil 1: Grundkompetenzen', '✅', ['numSets', 'ineq', 'vecAngle', 'funcRead', 'expFn', 'sineFn', 'diffQuot', 'monotony', 'stats', 'condProb', 'binomSigma']],
  ],
  add: {
    'g9-funktionen9': ['funcRead'],
    'g10-wachstum': ['expFn', 'halfLife'],
    'g10-vektoren': ['vecAngle', 'line2d'],
    'g11-vektoren3d': ['vecAngle'],
    'g11-ableitung': ['chain'],
    'g11-wahrscheinlichkeit': ['probTree', 'condProb', 'randVar'],
    'g12-integral': ['areaBetween', 'motion'],
    'g12-binomial': ['binomSigma'],
    'g12-matura': ['curve', 'diffQuot', 'normal', 'condProb', 'expFn', 'unitCircle', 'stats', 'ineq', 'vecAngle', 'areaBetween'],
  },
};
