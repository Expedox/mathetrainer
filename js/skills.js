// The curriculum: topics per Schulstufe (Austrian Lehrplan) and the skills
// (task types) behind them. Every skill makes fresh tasks with a worked
// solution (steps) and typical mistakes (traps) that explain a wrong answer.
// See math.js for the task format.

import { ri, pick, nz, gcd, lcm, round, fmt, br, frac, fracR, reduce, poly, polyExpr, sup, matches, answerOf } from './math.js';
import { byNeed } from './srs.js';
import moreVs from './curriculum/vs.js';
import moreUs from './curriculum/us.js';
import moreOs from './curriculum/os.js';
import { M, num, T, traps, N, digits, noBorrow, noCarry, columnAdd, columnSub, columnDiv, fracTask, FT, exprTask, ET, TRIPLES, deg, rad, randPoly, derive, binom, gapSup, ask } from './kit.js';


const S = {};

S.plus10 = { name: 'Plus bis 10', quick: true, gen() {
  const a = ri(0, 9); const b = ri(1, 10 - a);
  return N(num(`${a} + ${b}`, a + b, { steps: [`Starte bei ${a} und zähle ${b} weiter: ${Array.from({ length: b }, (_, i) => a + i + 1).join(', ')}.`],
    traps: [a >= b && T(a - b, 'Du hast minus gerechnet. Bei + kommt etwas dazu, das Ergebnis wird größer.'), T(a + b - 1, 'Um eins verzählt. Zähle ab der Zahl danach weiter.'), T(a + b + 1, 'Um eins verzählt. Die Startzahl wird nicht mitgezählt.')] }));
} };

S.minus10 = { name: 'Minus bis 10', quick: true, gen() {
  const a = ri(2, 10); const b = ri(1, a);
  return N(num(`${a} ${M} ${b}`, a - b, { steps: [`Starte bei ${a} und zähle ${b} zurück: ${Array.from({ length: b }, (_, i) => a - i - 1).join(', ')}.`],
    traps: [T(a + b, 'Du hast plus gerechnet. Bei − wird etwas weggenommen, das Ergebnis wird kleiner.'), T(a - b + 1, 'Um eins verzählt. Die Startzahl wird nicht mitgezählt.')] }));
} };

S.fill10 = { name: 'Ergänzen bis 10', quick: true, gen() {
  const t = pick([10, 10, ri(6, 10)]); const a = ri(1, t - 1);
  return N(num(`${a} + ▢ = ${t}`, t - a, { steps: [`Wie viele fehlen von ${a} bis ${t}? ${t} ${M} ${a} = ${t - a}.`, `Probe: ${a} + ${t - a} = ${t}.`],
    traps: [T(t, `${t} ist das Ergebnis. Gesucht ist die Zahl, die zu ${a} dazukommt.`), T(t + a, 'Du hast alles zusammengezählt. Gesucht ist, was noch fehlt.')] }));
} };

S.plus20 = { name: 'Plus bis 20', quick: true, gen() {
  const a = ri(4, 9); const b = ri(11 - a, 9);
  const s = a + b; const rest = s - 10;
  return N(num(`${a} + ${b}`, s, { steps: [`Bis zur 10 ergänzen: ${a} + ${10 - a} = 10.`, `${b} = ${10 - a} + ${rest}, also noch ${rest} dazu: 10 + ${rest} = ${s}.`],
    traps: [T(rest, 'Den Zehner vergessen: Über die 10 hinaus musst du 10 + ' + rest + ' schreiben.'), T(s - 1, 'Um eins verzählt.'), T(s + 1, 'Um eins verzählt.')] }));
} };

S.minus20 = { name: 'Minus bis 20', quick: true, gen() {
  const b = ri(3, 9); const a = ri(11, 9 + b);
  const d = a - b; const u = a - 10;
  return N(num(`${a} ${M} ${b}`, d, { steps: a - 10 >= b ? [`${a} ${M} ${b} = ${d}`] : [`Zuerst bis zur 10: ${a} ${M} ${u} = 10.`, `Dann noch ${b - u} weg: 10 ${M} ${b - u} = ${d}.`],
    traps: [T(10 + Math.abs(u - b), `Bei den Einern hast du ${Math.max(u, b)} − ${Math.min(u, b)} gerechnet. Rechne lieber zuerst zur 10 zurück.`), T(a + b, 'Du hast plus gerechnet. Bei − wird weggenommen.')] }));
} };

S.compare20 = { name: 'Größer, kleiner, gleich', gen() {
  const a = ri(0, 20); const b = Math.random() < 0.15 ? a : ri(0, 20);
  const r = a < b ? '<' : a > b ? '>' : '=';
  return { kind: 'pick', q: `${a} ▢ ${b}`, opts: ['<', '=', '>'], value: r, show: `${a} ${r} ${b}`,
    steps: [r === '=' ? 'Beide Zahlen sind gleich groß.' : `${Math.max(a, b)} ist größer als ${Math.min(a, b)}. Die Spitze zeigt immer zur kleineren Zahl.`],
    traps: [{ v: r === '<' ? '>' : r === '>' ? '<' : undefined, why: 'Das Zeichen ist verkehrt herum. Die offene Seite zeigt zur größeren Zahl.' }] };
} };

S.neighbor = { name: 'Nachbarzahlen', quick: true, gen() {
  const n = ri(1, 19); const after = Math.random() < 0.5;
  const v = after ? n + 1 : n - 1;
  return N(num(`Welche Zahl kommt ${after ? 'nach' : 'vor'} ${n}?`, v, { steps: [`${n - 1}, ${n}, ${n + 1}: ${after ? 'Der Nachfolger ist um 1 größer.' : 'Der Vorgänger ist um 1 kleiner.'}`],
    traps: [T(after ? n - 1 : n + 1, `Das ist die Zahl ${after ? 'vor' : 'nach'} ${n}.`)] }));
} };

S.plus100 = { name: 'Plus bis 100', quick: true, gen() {
  const a = ri(11, 79); const b = ri(5, 99 - a);
  const s = a + b; const at = a - (a % 10); const bt = b - (b % 10);
  return N(num(`${a} + ${b}`, s, { steps: [`Zehner: ${at} + ${bt} = ${at + bt}`, `Einer: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}`, `Zusammen: ${at + bt} + ${(a % 10) + (b % 10)} = ${s}`],
    traps: [(a % 10) + (b % 10) >= 10 && T(noCarry(a, b), `Übertrag vergessen: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}, der Zehner muss dazu.`), T(Math.abs(a - b), 'Du hast minus gerechnet.')] }));
} };

S.minus100 = { name: 'Minus bis 100', quick: true, gen() {
  const a = ri(31, 99); const b = ri(11, a - 5);
  const d = a - b; const bt = b - (b % 10);
  return N(num(`${a} ${M} ${b}`, d, { steps: [`Zuerst die Zehner weg: ${a} ${M} ${bt} = ${a - bt}`, `Dann die Einer: ${a - bt} ${M} ${b % 10} = ${d}`],
    traps: [a % 10 < b % 10 && T(noBorrow(a, b), `Bei den Einern hast du ${b % 10} − ${a % 10} statt ${a % 10} − ${b % 10} gerechnet. ${a % 10} − ${b % 10} geht nicht, du musst einen Zehner aufmachen.`), T(a + b, 'Du hast plus gerechnet.')] }));
} };

function timesSteps(a, b) {
  if (b <= 3) return [`${a} · ${b} heißt ${b}-mal die ${a}: ${Array(b).fill(a).join(' + ')} = ${a * b}`];
  if (b === 5 || b === 10) return [`${a} · 10 = ${a * 10}${b === 5 ? `, die Hälfte davon: ${a * 5}` : ''}`];
  if (b < 5) return [`${a} · ${b - 1} = ${a * (b - 1)}`, `noch einmal ${a} dazu: ${a * (b - 1)} + ${a} = ${a * b}`];
  return [`${a} · 5 = ${a * 5}`, `${a} · ${b - 5} = ${a * (b - 5)}`, `zusammen: ${a * 5} + ${a * (b - 5)} = ${a * b}`];
}

const timesTraps = (a, b) => [T(a + b, 'Du hast plus statt mal gerechnet.'), T(a * (b - 1), `Eine Reihe zu wenig: ${a} · ${b - 1} = ${a * (b - 1)}, es fehlt noch einmal ${a}.`), T(a * (b + 1), `Eine Reihe zu viel: Das ist ${a} · ${b + 1}.`)];

S.times2510 = { name: 'Einmaleins 2, 5, 10', quick: true, gen() {
  const a = pick([2, 5, 10]); const b = ri(1, 10);
  const [x, y] = Math.random() < 0.5 ? [a, b] : [b, a];
  return N(num(`${x} · ${y}`, x * y, { steps: timesSteps(b, a), traps: timesTraps(x, y) }));
} };

S.times = { name: 'Einmaleins', quick: true, gen() {
  const a = ri(2, 10); const b = ri(2, 10);
  return N(num(`${a} · ${b}`, a * b, { steps: timesSteps(a, b), traps: timesTraps(a, b) }));
} };

S.divide = { name: 'Geteilt (Einsdurcheins)', quick: true, gen() {
  const d = ri(2, 10); const q = ri(1, 10);
  return N(num(`${d * q} : ${d}`, q, { steps: [`Umkehraufgabe: Welche Zahl mal ${d} ergibt ${d * q}?`, `${q} · ${d} = ${d * q}, also ${d * q} : ${d} = ${q}.`],
    traps: [T(d * q - d, 'Du hast minus gerechnet. Bei : wird gerecht aufgeteilt.'), T(q + 1, `Prüfe mit der Umkehraufgabe: ${q + 1} · ${d} = ${(q + 1) * d}.`), T(q - 1, `Prüfe mit der Umkehraufgabe: ${q - 1} · ${d} = ${(q - 1) * d}.`)] }));
} };

S.doubleHalf = { name: 'Verdoppeln und Halbieren', quick: true, gen() {
  if (Math.random() < 0.5) {
    const n = ri(6, 49);
    return N(num(`Verdopple ${n}`, 2 * n, { steps: [`${n} + ${n} = ${2 * n}`], traps: [T(n + 2, 'Verdoppeln heißt die Zahl noch einmal dazu, nicht 2 dazu.'), T(Math.floor(n / 2), 'Das ist die Hälfte. Verdoppeln macht die Zahl doppelt so groß.')] }));
  }
  const n = 2 * ri(6, 49);
  return N(num(`Halbiere ${n}`, n / 2, { steps: [`${n} : 2 = ${n / 2}, denn ${n / 2} + ${n / 2} = ${n}`], traps: [T(n * 2, 'Das ist das Doppelte. Halbieren macht die Zahl kleiner.'), T(n - 2, 'Halbieren heißt durch 2 teilen, nicht 2 weg.')] }));
} };

S.fill100 = { name: 'Ergänzen bis 100', quick: true, gen() {
  const a = ri(11, 89); const v = 100 - a; const up = a + (10 - (a % 10)) % 10;
  const wrongDigits = (9 - Math.floor(a / 10) + 1) * 10 + ((10 - (a % 10)) % 10);
  return N(num(`${a} + ▢ = 100`, v, { steps: [a % 10 ? `Zuerst zum nächsten Zehner: ${a} + ${up - a} = ${up}` : `${a} ist schon ein Zehner.`, `Dann bis 100: ${up} + ${100 - up} = 100`, `Zusammen: ${up - a} + ${100 - up} = ${v}`],
    traps: [a % 10 && T(wrongDigits, 'Die Einer machen schon einen Zehner voll. Bei den Zehnern brauchst du nur bis 9 zu ergänzen.'), T(100 + a, 'Du hast alles zusammengezählt. Gesucht ist, was fehlt.')] }));
} };

S.plus1000 = { name: 'Kopfrechnen bis 1000', quick: true, gen() {
  const plus = Math.random() < 0.5;
  const a = ri(12, 90) * 10; const b = ri(3, plus ? Math.min(90, 100 - a / 10) : a / 10 - 1) * 10;
  const v = plus ? a + b : a - b;
  return N(num(`${a} ${plus ? '+' : M} ${b}`, v, { steps: [`Rechne mit Zehnern: ${a / 10} ${plus ? '+' : M} ${b / 10} = ${v / 10}`, `also ${v}`],
    traps: [plus ? T(noCarry(a, b), 'Übertrag vergessen.') : T(noBorrow(a, b), 'Beim Entbündeln vertan: Du hast die kleinere von der größeren Ziffer abgezogen.'), T(v / 10, 'Die Null am Ende vergessen.')] }));
} };

S.colAdd = { name: 'Schriftlich addieren', gen() {
  const a = ri(120, 899); const b = ri(105, 999 - a);
  return N(num(`${a} + ${b} (schriftlich)`, a + b, { steps: columnAdd(a, b), traps: [T(noCarry(a, b), 'Übertrag vergessen: Wenn eine Spalte 10 oder mehr ergibt, kommt 1 in die nächste Spalte.')] }));
} };

S.colSub = { name: 'Schriftlich subtrahieren', gen() {
  const a = ri(300, 999); const b = ri(101, a - 50);
  return N(num(`${a} ${M} ${b} (schriftlich)`, a - b, { steps: columnSub(a, b), traps: [T(noBorrow(a, b), 'Du hast in einer Spalte die kleinere von der größeren Ziffer abgezogen. Oben steht die kleinere? Dann 10 dazunehmen und links 1 merken.')] }));
} };

S.times10 = { name: 'Mal mit Zehnern', quick: true, gen() {
  const a = ri(2, 9); const b = ri(2, 9); const z = pick([10, 100]);
  const [x, y] = Math.random() < 0.5 ? [a * z, b] : [a, b * z];
  return N(num(`${x} · ${y}`, x * y, { steps: [`${a} · ${b} = ${a * b}`, `dann ${z === 10 ? 'eine Null' : 'zwei Nullen'} anhängen: ${x * y}`], traps: [T(a * b, `Null${z === 100 ? 'en' : ''} vergessen: ${a} · ${b} = ${a * b}, dann ${z === 10 ? 'eine Null' : 'zwei Nullen'} anhängen.`), T(a * b * z * 10, 'Eine Null zu viel.')] }));
} };

S.divRest = { name: 'Teilen mit Rest', gen() {
  const d = ri(3, 9); const q = ri(2, 9); const r = ri(1, d - 1); const n = d * q + r;
  return { kind: 'rest', q: `${n} : ${d}`, vals: [q, r], dividend: n, divisor: d, placeholder: 'z. B. 7 R 2',
    steps: [`Größte Zahl aus dem ${d}er-Einmaleins bis ${n}: ${q} · ${d} = ${d * q}`, `Rest: ${n} ${M} ${d * q} = ${r}`, `Ergebnis: ${q} Rest ${r}`],
    traps: [{ v: [q - 1, r + d], why: `Der Rest ${r + d} ist größer als ${d}. Da passt ${d} noch einmal hinein.` }, { v: [q, d - r], why: `Rest: ${n} − ${d * q} = ${r}, nicht ${d - r}.` }] };
} };

const UNITS_LEN = [['m', 'cm', 100], ['cm', 'mm', 10], ['km', 'm', 1000], ['m', 'mm', 1000]];
S.unitsLen = { name: 'Längen umrechnen', gen() {
  const [big, small, f] = pick(UNITS_LEN.slice(0, 3));
  const a = ri(1, 9); const b = ri(1, f - 1);
  return N(num(`${a} ${big} ${b} ${small} = ▢ ${small}`, a * f + b, { unit: small, steps: [`1 ${big} = ${f} ${small}`, `${a} ${big} = ${a * f} ${small}`, `${a * f} + ${b} = ${a * f + b} ${small}`],
    traps: [T(Number(`${a}${b}`), `Ein ${big} hat ${f} ${small}. ${a} ${big} sind ${a * f} ${small}, dazu ${b}.`), f !== 10 && T(a * 10 + b, `1 ${big} = ${f} ${small}, nicht 10.`), f !== 100 && T(a * 100 + b, `1 ${big} = ${f} ${small}, nicht 100.`)] }));
} };

S.money = { name: 'Euro und Cent', gen() {
  if (Math.random() < 0.5) {
    const e = ri(1, 9); const c = ri(5, 95);
    return N(num(`${e} € ${c} c = ▢ c`, e * 100 + c, { unit: 'c', steps: ['1 € = 100 c', `${e} € = ${e * 100} c, dazu ${c} c: ${e * 100 + c} c`], traps: [T(e * 10 + c, '1 € hat 100 Cent, nicht 10.'), T(Number(`${e}${c}`) !== e * 100 + c ? Number(`${e}${c}`) : undefined, 'Bei weniger als 10 Cent fehlt eine Null: 1 € 5 c = 105 c.')] }));
  }
  const a = ri(1, 30) * 10 + pick([0, 5]); const b = ri(1, 20) * 10 + pick([0, 5]);
  return N(num(`${fmt(a / 100, 2)} € + ${fmt(b / 100, 2)} € = ▢ €`, (a + b) / 100, { unit: '€', tol: 0.001, show: `${fmt((a + b) / 100, 2)} €`,
    steps: [`In Cent: ${a} c + ${b} c = ${a + b} c`, `${a + b} c = ${fmt((a + b) / 100, 2)} €`] }));
} };

S.time = { name: 'Stunden und Minuten', gen() {
  if (Math.random() < 0.5) {
    const h = ri(1, 4); const m = ri(1, 11) * 5;
    return N(num(`${h} h ${m} min = ▢ min`, h * 60 + m, { unit: 'min', steps: ['1 h = 60 min', `${h} h = ${h * 60} min, dazu ${m}: ${h * 60 + m} min`], traps: [T(h * 100 + m, 'Eine Stunde hat 60 Minuten, nicht 100.'), T(h + m, 'Die Stunden musst du zuerst in Minuten umrechnen: 1 h = 60 min.')] }));
  }
  const m = ri(65, 250);
  return { kind: 'pair', labels: ['h', 'min'], q: `${m} min = ▢ h ▢ min`, vals: [Math.floor(m / 60), m % 60], placeholder: 'z. B. 2; 15', show: `${Math.floor(m / 60)} h ${m % 60} min`,
    steps: [`Wie oft passt 60 in ${m}? ${Math.floor(m / 60)}-mal (${Math.floor(m / 60) * 60} min).`, `Rest: ${m} − ${Math.floor(m / 60) * 60} = ${m % 60} min`],
    traps: [{ v: [Math.floor(m / 100), m % 100], why: 'Eine Stunde hat 60 Minuten, nicht 100.' }] };
} };

S.round = { name: 'Runden', gen() {
  const n = ri(1000, 999999); const [p, name] = pick([[10, 'Zehner'], [100, 'Hunderter'], [1000, 'Tausender']]);
  const v = Math.round(n / p) * p; const down = Math.floor(n / p) * p;
  const digit = Math.floor((n % p) / (p / 10));
  return N(num(`Runde ${fmt(n)} auf ${name}`, v, { steps: [`Schau auf die Ziffer rechts von den ${name}n: ${digit}`, digit >= 5 ? '5 oder mehr: aufrunden.' : 'weniger als 5: abrunden.', `${fmt(n)} ≈ ${fmt(v)}`],
    traps: [T(down, 'Abgeschnitten statt gerundet. Bei 5, 6, 7, 8, 9 wird aufgerundet.'), T(down + p, 'Bei 0 bis 4 wird abgerundet.')] }));
} };

S.colMul = { name: 'Schriftlich multiplizieren', gen() {
  if (Math.random() < 0.5) {
    const a = ri(102, 987); const b = ri(3, 9);
    let carry = 0;
    const mulSteps = digits(a).reverse().map((d, i) => {
      const v = d * b + carry; const line = `${['Einer', 'Zehner', 'Hunderter'][i]}: ${d} · ${b} = ${d * b}${carry ? `, plus ${carry} gemerkt = ${v}` : ''}, schreibe ${i === 2 ? v : v % 10}${i < 2 && v >= 10 ? `, merke ${Math.floor(v / 10)}` : ''}`;
      carry = Math.floor(v / 10); return line;
    });
    return N(num(`${a} · ${b} (schriftlich)`, a * b, { steps: [...mulSteps, `Ergebnis: ${a * b}`],
      traps: [T(Number(digits(a).map((d) => (d * b) % 10).join('')), 'Die Überträge vergessen: Bei jedem Schritt die gemerkte Zahl dazuzählen.')] }));
  }
  const a = ri(12, 99); const b = ri(12, 99); const bt = Math.floor(b / 10); const bu = b % 10;
  return N(num(`${a} · ${b} (schriftlich)`, a * b, { steps: [`${a} · ${bt * 10} = ${a * bt * 10}`, `${a} · ${bu} = ${a * bu}`, `${a * bt * 10} + ${a * bu} = ${a * b}`],
    traps: [T(a * bt + a * bu, `Die Zehnerzeile muss eine Stelle nach links: ${a} · ${bt * 10}, nicht ${a} · ${bt}.`)] }));
} };

S.colDiv = { name: 'Schriftlich dividieren', gen() {
  const d = ri(2, 9); let q;
  do q = ri(102, 999); while (!String(q).slice(1).includes('0') && Math.random() < 0.6);
  const n = d * q; const noZero = Number(String(q).replace(/0/g, ''));
  return N(num(`${fmt(n)} : ${d}`, q, { steps: [...columnDiv(n, d), `Ergebnis: ${q}. Probe: ${q} · ${d} = ${n}`],
    traps: [noZero !== q && T(noZero, `Eine Null im Ergebnis vergessen: Wenn ${d} nicht hineinpasst, schreibe 0 ins Ergebnis.`)] }));
} };

S.unitsMass = { name: 'Gewicht und Zeit umrechnen', gen() {
  const k = pick([['kg', 'g', 1000], ['t', 'kg', 1000], ['min', 's', 60], ['h', 'min', 60]]);
  const [big, small, f] = k; const a = ri(2, 9); const b = ri(1, f === 60 ? 59 : 999);
  return N(num(`${a} ${big} ${b} ${small} = ▢ ${small}`, a * f + b, { unit: small, steps: [`1 ${big} = ${f} ${small}`, `${a} · ${f} + ${b} = ${a * f + b}`],
    traps: [f === 60 && T(a * 100 + b, `1 ${big} hat 60 ${small}, nicht 100.`), f === 1000 && T(a * 100 + b, `1 ${big} = 1000 ${small}.`), T(Number(`${a}${b}`), `Zuerst ${a} ${big} in ${small} umrechnen: ${a} · ${f}.`)] }));
} };

S.bigNumbers = { name: 'Rechnen mit großen Zahlen', quick: true, gen() {
  const plus = Math.random() < 0.5; const a = ri(12, 900) * 1000; const b = ri(5, plus ? 99 : Math.min(99, a / 1000 - 1)) * 1000;
  const v = plus ? a + b : a - b;
  return N(num(`${fmt(a)} ${plus ? '+' : M} ${fmt(b)}`, v, { steps: [`In Tausendern: ${a / 1000} ${plus ? '+' : M} ${b / 1000} = ${v / 1000}`, `also ${fmt(v)}`], traps: [T(v / 1000, 'Die drei Nullen der Tausender vergessen.')] }));
} };

S.story4 = { name: 'Sachaufgaben', gen() {
  const kind = ri(0, 2);
  if (kind === 0) {
    const n = ri(3, 8); const c = ri(12, 95) * 5;
    return N(num(`Lena kauft ${n} Hefte zu je ${fmt(c / 100, 2)} €. Wie viel zahlt sie?`, (n * c) / 100, { unit: '€', tol: 0.001, show: `${fmt((n * c) / 100, 2)} €`, steps: [`${n} · ${c} c = ${n * c} c`, `${n * c} c = ${fmt((n * c) / 100, 2)} €`], traps: [T((n + c) / 100, 'Hier passt mal, nicht plus: Jedes Heft kostet gleich viel.')] }));
  }
  if (kind === 1) {
    const kids = ri(3, 9); const each = ri(4, 12); const total = kids * each;
    return N(num(`${total} Kekse werden gerecht an ${kids} Kinder verteilt. Wie viele bekommt jedes Kind?`, each, { steps: [`${total} : ${kids} = ${each}`, `Probe: ${each} · ${kids} = ${total}`], traps: [T(total - kids, 'Gerecht verteilen heißt teilen, nicht abziehen.')] }));
  }
  const start = ri(7, 10); const m = ri(1, 11) * 5; const dur = ri(25, 95);
  const end = start * 60 + m + dur;
  return { kind: 'pair', labels: ['Stunde', 'Minute'], pairStyle: 'clock', q: `Der Film beginnt um ${start}:${String(m).padStart(2, '0')} Uhr und dauert ${dur} Minuten. Wann ist er aus? (Stunde; Minute)`, vals: [Math.floor(end / 60), end % 60], placeholder: 'z. B. 10; 45', show: `${Math.floor(end / 60)}:${String(end % 60).padStart(2, '0')} Uhr`,
    steps: [`${dur} min = ${Math.floor(dur / 60)} h ${dur % 60} min`, `${start}:${String(m).padStart(2, '0')} + ${dur} min = ${Math.floor(end / 60)}:${String(end % 60).padStart(2, '0')}`],
    traps: [{ v: [start + Math.floor((m + dur) / 100), (m + dur) % 100], why: 'Eine Stunde hat 60 Minuten. Ab 60 Minuten beginnt die nächste Stunde.' }] };
} };

// ---- Unterstufe ------------------------------------------------------------

S.order = { name: 'Punkt vor Strich', quick: true, gen() {
  const a = ri(2, 20); const b = ri(2, 9); const c = ri(2, 9);
  const t = ri(0, 2);
  if (t === 0) return N(num(`${a} + ${b} · ${c}`, a + b * c, { steps: [`Zuerst mal: ${b} · ${c} = ${b * c}`, `Dann plus: ${a} + ${b * c} = ${a + b * c}`], traps: [T((a + b) * c, 'Punkt vor Strich: Zuerst wird mal gerechnet, dann plus.')] }));
  if (t === 1) { const d = ri(2, 9); const x = b * c; const y = Math.min(d * ri(1, 4), x - 1);
    const yy = y - (y % d) || d; return N(num(`${x} ${M} ${yy} : ${d}`, x - yy / d, { steps: [`Zuerst geteilt: ${yy} : ${d} = ${yy / d}`, `Dann minus: ${x} ${M} ${yy / d} = ${x - yy / d}`], traps: [T((x - yy) / d, 'Punkt vor Strich: Zuerst wird geteilt, dann abgezogen.')] })); }
  return N(num(`(${a} + ${b}) · ${c}`, (a + b) * c, { steps: [`Zuerst die Klammer: ${a} + ${b} = ${a + b}`, `Dann mal: ${a + b} · ${c} = ${(a + b) * c}`], traps: [T(a + b * c, 'Die Klammer kommt zuerst, auch vor dem Malrechnen.')], rule: '<b>Klammer zuerst:</b> Was in der Klammer steht, wird immer zuerst ausgerechnet, sogar vor Mal und Geteilt.' }));
} };

const DIV_RULES = {
  2: (n) => `Endziffer ${n % 10} ist ${n % 2 ? 'ungerade' : 'gerade'}.`,
  3: (n) => `Ziffernsumme ${digits(n).join(' + ')} = ${digits(n).reduce((a, b) => a + b)} ist ${digits(n).reduce((a, b) => a + b) % 3 ? 'nicht ' : ''}durch 3 teilbar.`,
  4: (n) => `Die letzten zwei Ziffern ${n % 100} sind ${(n % 100) % 4 ? 'nicht ' : ''}durch 4 teilbar.`,
  5: (n) => `Die Endziffer ist ${n % 10}. Nur 0 oder 5 sind durch 5 teilbar.`,
  9: (n) => `Ziffernsumme ${digits(n).join(' + ')} = ${digits(n).reduce((a, b) => a + b)} ist ${digits(n).reduce((a, b) => a + b) % 9 ? 'nicht ' : ''}durch 9 teilbar.`,
  10: (n) => `Die Endziffer ist ${n % 10}. Nur Zahlen mit 0 am Ende sind durch 10 teilbar.`,
};
S.divisible = { name: 'Teilbarkeit', gen() {
  const k = pick([2, 3, 4, 5, 9, 10]);
  const n = Math.random() < 0.5 ? k * ri(12, 300) : ri(100, 3000);
  const yes = n % k === 0;
  return { kind: 'pick', q: `Ist ${fmt(n)} durch ${k} teilbar?`, opts: ['ja', 'nein'], value: yes ? 'ja' : 'nein', show: yes ? 'ja' : 'nein',
    steps: [DIV_RULES[k](n)], traps: [{ v: yes ? 'nein' : 'ja', why: DIV_RULES[k](n) }] };
} };

S.decAdd = { name: 'Dezimalzahlen plus und minus', gen() {
  const a = ri(100, 9999) / 100; const b = ri(1, 99) / 10; const plus = Math.random() < 0.5 || a < b;
  const v = round(plus ? a + b : a - b, 2);
  const shifted = round(plus ? a + b / 10 : a - b / 10, 3);
  return N(num(`${fmt(a)} ${plus ? '+' : M} ${fmt(b)}`, v, { tol: 0.001, steps: [`Komma unter Komma schreiben: ${fmt(b)} = ${fmt(b, 2)}`, `${fmt(a, 2)} ${plus ? '+' : M} ${fmt(b, 2)} = ${fmt(v, 2)}`],
    traps: [T(shifted, `Komma unter Komma! ${fmt(b)} hat Zehntel, die gehören unter die Zehntel von ${fmt(a)}.`)] }));
} };

S.decShift = { name: 'Mal und durch 10, 100, 1000', quick: true, gen() {
  const a = ri(11, 9999) / 100; const k = pick([10, 100, 1000]); const mul = Math.random() < 0.5;
  const v = round(mul ? a * k : a / k, 6); const z = String(k).length - 1;
  return N(num(`${fmt(a)} ${mul ? '·' : ':'} ${fmt(k)}`, v, { tol: 1e-7, steps: [`${mul ? 'Mal' : 'Durch'} ${fmt(k)}: Komma um ${z} Stelle${z > 1 ? 'n' : ''} nach ${mul ? 'rechts' : 'links'}.`, `${fmt(a)} wird zu ${fmt(v)}`],
    traps: [T(round(mul ? a / k : a * k, 6), `Falsche Richtung. Beim ${mul ? 'Malnehmen wird die Zahl größer: Komma nach rechts' : 'Teilen wird die Zahl kleiner: Komma nach links'}.`)] }));
} };

S.fracOf = { name: 'Bruchteil einer Menge', quick: true, gen() {
  const d = pick([2, 3, 4, 5, 6, 8, 10]); const n = ri(1, d - 1); const unit = ri(2, 12); const m = d * unit;
  return N(num(`${frac(n, d)} von ${m}`, n * unit, { steps: [`Ein ${d}tel: ${m} : ${d} = ${unit}`, `${n} davon: ${unit} · ${n} = ${n * unit}`], traps: [n > 1 && T(unit, `Das ist erst ${frac(1, d)}. Gesucht sind ${n} solche Teile.`), T(m * n, `Zuerst durch ${d} teilen, dann mal ${n}.`), T(m / n, `Durch den Nenner ${d} teilen, nicht durch den Zähler.`)] }));
} };

S.rect = { name: 'Rechteck: Umfang und Fläche', gen() {
  const a = ri(3, 25); const b = ri(2, 20); const area = Math.random() < 0.5;
  return N(num(`Rechteck: a = ${a} cm, b = ${b} cm. ${area ? 'Flächeninhalt' : 'Umfang'} = ?`, area ? a * b : 2 * (a + b), { unit: area ? 'cm²' : 'cm',
    steps: area ? [`A = a · b = ${a} · ${b} = ${a * b} cm²`] : [`u = 2 · a + 2 · b = 2 · ${a} + 2 · ${b} = ${2 * (a + b)} cm`],
    traps: area ? [T(2 * (a + b), 'Das ist der Umfang. Die Fläche ist a · b.'), T(a + b, 'Für die Fläche wird mal gerechnet: a · b.')] : [T(a * b, 'Das ist die Fläche. Der Umfang ist rundherum: 2 · a + 2 · b.'), T(a + b, 'Das ist nur der halbe Umfang. Jede Seite kommt zweimal vor.')] }));
} };


S.fracReduce = { name: 'Brüche kürzen', gen() {
  const d0 = ri(2, 9); const n0 = ri(1, d0 - 1); const g0 = gcd(n0, d0);
  const [a, b] = [n0 / g0, d0 / g0]; const k = ri(2, 6) * (Math.random() < 0.5 ? 1 : 2);
  return fracTask(`Kürze vollständig: ${frac(a * k, b * k)}`, a, b, { reduced: true, steps: [`ggT von ${a * k} und ${b * k} ist ${k}.`, `${a * k} : ${k} = ${a}, ${b * k} : ${k} = ${b}`, `Ergebnis: ${frac(a, b)}`] });
} };

S.fracAdd = { name: 'Brüche addieren und subtrahieren', gen() {
  const b = ri(2, 9); const d = Math.random() < 0.4 ? b : ri(2, 9);
  const a = ri(1, b - 1 || 1); const c = ri(1, d - 1 || 1); const plus = Math.random() < 0.6 || a / b < c / d;
  const L = lcm(b, d); const n = plus ? a * (L / b) + c * (L / d) : a * (L / b) - c * (L / d);
  return fracTask(`${frac(a, b)} ${plus ? '+' : M} ${frac(c, d)}`, n, L, {
    steps: [b === d ? `Gleicher Nenner: Zähler ${plus ? 'addieren' : 'subtrahieren'}.` : `Gemeinsamer Nenner ${L}: ${frac(a, b)} = ${frac(a * L / b, L)}, ${frac(c, d)} = ${frac(c * L / d, L)}`, `${a * L / b} ${plus ? '+' : M} ${c * L / d} = ${n}, also ${frac(n, L)}`, gcd(n, L) > 1 ? `gekürzt: ${fracR(n, L)}` : ''].filter(Boolean),
    traps: [b + d && FT(plus ? a + c : a - c, plus ? b + d : Math.abs(b - d) || 1, `Die Nenner werden nicht ${plus ? 'addiert' : 'subtrahiert'}. Mach die Brüche zuerst gleichnamig.`), b === d ? FT(plus ? a + c : a - c, 2 * b, 'Bei gleichem Nenner bleibt der Nenner gleich.') : FT(plus ? a + c : a - c, L, 'Beim Erweitern muss auch der Zähler mit malgenommen werden.')] });
} };

S.fracMul = { name: 'Brüche multiplizieren und dividieren', gen() {
  const a = ri(1, 9); const b = ri(2, 9); const c = ri(1, 9); const d = ri(2, 9); const mul = Math.random() < 0.5;
  if (mul) return fracTask(`${frac(a, b)} · ${frac(c, d)}`, a * c, b * d, { steps: [`Zähler mal Zähler, Nenner mal Nenner: ${frac(`${a} · ${c}`, `${b} · ${d}`)} = ${frac(a * c, b * d)}`, gcd(a * c, b * d) > 1 ? `gekürzt: ${fracR(a * c, b * d)}` : ''].filter(Boolean),
    traps: [FT(a * d, b * c, 'Du hast mit dem Kehrwert malgenommen. Das macht man nur beim Dividieren.'), b === d ? FT(a * c, b, 'Beim Multiplizieren werden auch die Nenner multipliziert.') : null] });
  return fracTask(`${frac(a, b)} : ${frac(c, d)}`, a * d, b * c, { steps: [`Mit dem Kehrwert malnehmen: ${frac(a, b)} · ${frac(d, c)}`, `= ${frac(a * d, b * c)}${gcd(a * d, b * c) > 1 ? ` = ${fracR(a * d, b * c)}` : ''}`],
    traps: [FT(a * c, b * d, 'Du hast multipliziert. Beim Dividieren mit dem Kehrwert des zweiten Bruchs malnehmen.'), FT(b * c, a * d, 'Den Kehrwert vom falschen Bruch genommen. Umgedreht wird der zweite Bruch.')] });
} };

S.decMul = { name: 'Dezimalzahlen mal und durch', gen() {
  if (Math.random() < 0.5) {
    const a = ri(2, 99) / 10; const b = ri(2, 99) / pick([10, 100]);
    const da = String(a).split('.')[1]?.length ?? 0; const db = String(b).split('.')[1]?.length ?? 0;
    const v = round(a * b, 6); const ia = Math.round(a * 10 ** da); const ib = Math.round(b * 10 ** db);
    return N(num(`${fmt(a)} · ${fmt(b)}`, v, { tol: 1e-7, steps: [`Ohne Komma rechnen: ${ia} · ${ib} = ${ia * ib}`, `Nachkommastellen zählen: ${da} + ${db} = ${da + db}`, `Ergebnis: ${fmt(v)}`],
      traps: [T(round(v * 10, 6), `Zu wenige Kommastellen: Das Ergebnis braucht ${da + db} Stellen nach dem Komma.`), T(round(v / 10, 6), `Zu viele Kommastellen: Das Ergebnis braucht ${da + db} Stellen nach dem Komma.`)] }));
  }
  const b = pick([0.2, 0.4, 0.5, 0.25, 1.5, 2.5, 0.3]); const q = ri(2, 40); const a = round(b * q, 4);
  const k = 10 ** (String(b).split('.')[1]?.length ?? 0);
  return N(num(`${fmt(a)} : ${fmt(b)}`, q, { tol: 1e-7, steps: [`Bei beiden das Komma um ${String(k).length - 1} Stelle${k > 10 ? 'n' : ''} nach rechts: ${fmt(round(a * k, 4))} : ${fmt(round(b * k, 4))}`, `= ${q}`],
    traps: [T(round(q / k, 6), `Das Komma muss bei beiden Zahlen gleich weit verschoben werden.`), T(round(a * b, 6), 'Du hast multipliziert.')] }));
} };

S.gcdLcm = { name: 'ggT und kgV', gen() {
  const g = ri(2, 9); const x = ri(2, 7); let y; do y = ri(2, 9); while (gcd(x, y) !== 1 || x === y);
  const a = g * x; const b = g * y;
  if (Math.random() < 0.5) return N(num(`ggT(${a}, ${b})`, g, { steps: [`Teiler von ${a} und ${b}: der größte gemeinsame ist ${g}.`, `${a} = ${g} · ${x}, ${b} = ${g} · ${y}`], traps: [T(lcm(a, b), 'Das ist das kgV. Der ggT ist der größte gemeinsame Teiler, er ist höchstens so groß wie die kleinere Zahl.'), T(Math.min(a, b), `${Math.min(a, b)} ist kein Teiler von ${Math.max(a, b)}.`)] }));
  return N(num(`kgV(${a}, ${b})`, lcm(a, b), { steps: [`Vielfache von ${Math.max(a, b)}: ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => k * Math.max(a, b)).filter((v) => v <= lcm(a, b)).join(', ')}`, `Das erste, das auch durch ${Math.min(a, b)} teilbar ist: ${lcm(a, b)}`],
    traps: [T(a * b, `${a} · ${b} ist ein gemeinsames Vielfaches, aber nicht das kleinste.`), T(g, 'Das ist der ggT. Gesucht ist das kleinste gemeinsame Vielfache.')] }));
} };

S.percentBasic = { name: 'Prozent von einer Zahl', quick: true, gen() {
  const p = pick([5, 10, 20, 25, 30, 40, 50, 75, 15]); const base = ri(2, 40) * 20;
  const v = (p * base) / 100;
  return N(num(`${p} % von ${fmt(base)}`, v, { tol: 0.001, steps: [`1 % = ${fmt(base)} : 100 = ${fmt(base / 100)}`, `${p} % = ${fmt(base / 100)} · ${p} = ${fmt(v)}`], traps: [T(round(base / p, 4), 'Du hast durch die Prozentzahl geteilt. Prozent heißt Hundertstel: zuerst durch 100, dann mal.'), T(base - v, `Das ist der Rest (${100 - p} %), nicht ${p} %.`)] }));
} };

S.triangle = { name: 'Dreieck und Parallelogramm', gen() {
  const g = ri(3, 20); const h = ri(2, 15); const tri = Math.random() < 0.6;
  const v = tri ? (g * h) / 2 : g * h;
  return N(num(`${tri ? 'Dreieck' : 'Parallelogramm'}: g = ${g} cm, h = ${h} cm. Flächeninhalt = ?`, v, { unit: 'cm²', tol: 0.001, steps: [tri ? `A = g · h : 2 = ${g} · ${h} : 2 = ${fmt(v)} cm²` : `A = g · h = ${g} · ${h} = ${v} cm²`],
    traps: tri ? [T(g * h, 'Beim Dreieck noch durch 2 teilen: Es ist ein halbes Parallelogramm.')] : [T((g * h) / 2, 'Das wäre ein Dreieck. Beim Parallelogramm wird nicht halbiert.')] }));
} };

S.intAdd = { name: 'Ganze Zahlen plus und minus', quick: true, gen() {
  let a = nz(-15, 15); const b = nz(-15, 15); if (a > 0 && b > 0) a = -a; const plus = Math.random() < 0.5;
  const v = plus ? a + b : a - b;
  return N(num(`${fmt(a)} ${plus ? '+' : M} ${br(b)}`, v, { steps: [plus ? (b < 0 ? `+ (${fmt(b)}) heißt ${M} ${-b}` : `${fmt(a)} + ${b}`) : (b < 0 ? `${M} (${fmt(b)}) heißt + ${-b}` : `${fmt(a)} ${M} ${b}`), `= ${fmt(v)}`],
    traps: [T(plus ? a - b : a + b, b < 0 ? (plus ? 'Plus mal minus ergibt minus: + (−b) ist − b.' : 'Minus mal minus ergibt plus: − (−b) ist + b.') : 'Falsches Rechenzeichen.'), T(-v, 'Das Vorzeichen stimmt nicht. Zeichne dir eine Zahlengerade.')] }));
} };

S.intMul = { name: 'Ganze Zahlen mal und durch', quick: true, gen() {
  let a = nz(-12, 12); const b = nz(-12, 12); if (a > 0 && b > 0) a = -a;
  if (Math.random() < 0.5) return N(num(`${br(a)} · ${br(b)}`, a * b, { steps: [`${Math.abs(a)} · ${Math.abs(b)} = ${Math.abs(a * b)}`, `Vorzeichen: ${(a < 0) === (b < 0) ? 'gleiche Vorzeichen, also plus' : 'verschiedene Vorzeichen, also minus'}`], traps: [T(-a * b, (a < 0) === (b < 0) ? 'Minus mal minus ergibt plus.' : 'Minus mal plus ergibt minus.')] }));
  return N(num(`${br(a * b)} : ${br(b)}`, a, { steps: [`${Math.abs(a * b)} : ${Math.abs(b)} = ${Math.abs(a)}`, `Vorzeichen: ${(a * b < 0) === (b < 0) ? 'gleiche Vorzeichen, also plus' : 'verschiedene Vorzeichen, also minus'}`], traps: [T(-a, 'Das Vorzeichen stimmt nicht: Gleiche Vorzeichen ergeben plus, verschiedene minus.')] }));
} };

S.eq1 = { name: 'Gleichungen lösen', gen() {
  const x = nz(-9, 12); const t = ri(0, 2);
  if (t === 0) { const a = nz(-15, 20); const b = x + a;
    return N(num(`x ${a < 0 ? M : '+'} ${Math.abs(a)} = ${fmt(b)}`, x, { steps: [`Auf beiden Seiten ${a < 0 ? `+ ${-a}` : `${M} ${a}`}`, `x = ${fmt(b)} ${a < 0 ? '+' : M} ${Math.abs(a)} = ${fmt(x)}`], traps: [T(b + a, `Auf beiden Seiten das Gegenteil rechnen: ${a < 0 ? 'plus' : 'minus'} ${Math.abs(a)}.`)] })); }
  const a = nz(2, 9) * pick([1, 1, -1]);
  if (t === 1) return N(num(`${fmt(a)}x = ${fmt(a * x)}`, x, { steps: [`Beide Seiten durch ${br(a)}`, `x = ${fmt(a * x)} : ${br(a)} = ${fmt(x)}`], traps: [T(a * x - a, `${fmt(a)}x heißt ${fmt(a)} · x. Also durch ${br(a)} teilen, nicht abziehen.`), T(a * a * x, 'Du hast malgenommen statt geteilt.')] }));
  const b = nz(-12, 12); const c = a * x + b;
  return N(num(`${fmt(a)}x ${b < 0 ? M : '+'} ${Math.abs(b)} = ${fmt(c)}`, x, { steps: [`${b < 0 ? `+ ${-b}` : `${M} ${b}`} auf beiden Seiten: ${fmt(a)}x = ${fmt(c - b)}`, `Durch ${br(a)} teilen: x = ${fmt(x)}`], traps: [T(round((c + b) / a, 6), `Zuerst ${b < 0 ? `+ ${-b}` : `${M} ${b}`} rechnen: Das Gegenteil von ${b < 0 ? M : '+'} ${Math.abs(b)}.`), T(round(c / a - b, 6), 'Zuerst die Zahl ohne x auf die andere Seite bringen, dann teilen.')] }));
} };

S.percent = { name: 'Prozentrechnung', gen() {
  const t = ri(0, 1);
  if (t === 0) { const p = pick([10, 20, 25, 30, 40, 60, 75]); const G = ri(2, 30) * 20; const W = (p * G) / 100;
    return N(num(`${p} % sind ${fmt(W)} €. Wie viel sind 100 %?`, G, { unit: '€', tol: 0.001, steps: [`1 % = ${fmt(W)} : ${p} = ${fmt(W / p)}`, `100 % = ${fmt(W / p)} · 100 = ${fmt(G)} €`], traps: [T((p * W) / 100, `Hier ist der Prozentwert gegeben. Gesucht ist der Grundwert: ${fmt(W)} : ${p} · 100.`), T(W + p, 'Prozent nicht einfach dazuzählen.')] })); }
  const G = pick([20, 25, 40, 50, 60, 80, 120, 200]); const p = pick([5, 10, 15, 20, 25, 30, 40, 75].filter((x) => (x * G) % 100 === 0));
  const W = (p * G) / 100;
  return N(num(`${fmt(W)} von ${G} sind wie viel Prozent?`, p, { unit: '%', tol: 0.001, steps: [`${fmt(W)} : ${G} = ${fmt(W / G)}`, `${fmt(W / G)} · 100 = ${p} %`], traps: [T(round((G / W) * 100, 4), 'Umgekehrt geteilt: Anteil durch Ganzes, also ' + fmt(W) + ' : ' + G + '.')] }));
} };

S.power = { name: 'Potenzen', quick: true, gen() {
  const b = pick([2, 3, 4, 5, 10, -2, -3]); const e = ri(2, b === 2 ? 6 : b === 10 ? 6 : 4);
  const v = b ** e;
  return N(num(`${br(b)}${sup(e)}`, v, { steps: [`${br(b)}${sup(e)} = ${Array(e).fill(br(b)).join(' · ')} = ${fmt(v)}`], traps: [T(b * e, `${br(b)}${sup(e)} heißt ${e}-mal ${br(b)} malnehmen, nicht ${br(b)} · ${e}.`), b < 0 && T(-v, `Bei negativer Basis: ${e % 2 ? 'ungerader' : 'gerader'} Exponent ergibt ${e % 2 ? 'minus' : 'plus'}.`)] }));
} };

S.sqrt = { name: 'Quadratzahlen und Wurzeln', quick: true, gen() {
  const n = ri(2, 20);
  if (Math.random() < 0.5) return N(num(`√${n * n}`, n, { steps: [`Welche Zahl mal sich selbst ergibt ${n * n}? ${n} · ${n} = ${n * n}`], traps: [T((n * n) / 2, 'Die Wurzel ist nicht die Hälfte. Gesucht ist die Zahl, die mit sich selbst malgenommen ' + n * n + ' ergibt.')] }));
  return N(num(`${n}²`, n * n, { steps: [`${n} · ${n} = ${n * n}`], traps: [T(2 * n, `${n}² heißt ${n} · ${n}, nicht ${n} · 2.`)] }));
} };

S.proportion = { name: 'Schlussrechnung', gen() {
  if (Math.random() < 0.6) {
    const k = ri(2, 6); const price = ri(5, 60) * 25; const m = ri(2, 9); const total = k * price;
    return N(num(`${k} kg kosten ${fmt(total / 100, 2)} €. Wie viel kosten ${m} kg?`, (m * price) / 100, { unit: '€', tol: 0.001, show: `${fmt((m * price) / 100, 2)} €`, steps: [`1 kg: ${fmt(total / 100, 2)} € : ${k} = ${fmt(price / 100, 2)} €`, `${m} kg: ${fmt(price / 100, 2)} € · ${m} = ${fmt((m * price) / 100, 2)} €`], traps: [T(round(total / 100 + (m - k), 4), 'Hier musst du über 1 kg rechnen: zuerst teilen, dann mal.')] }));
  }
  const w = ri(2, 6); const d = ri(2, 12); const total = w * d; const ws = [1, 2, 3, 4, 6, 8, 12].filter((x) => x !== w && total % x === 0); const w2 = pick(ws);
  return N(num(`${w} Personen brauchen ${d} Tage für eine Arbeit. Wie lange brauchen ${w2} Personen?`, total / w2, { unit: 'Tage', tol: 0.001, steps: [`Indirekt: mehr Personen, weniger Tage.`, `1 Person: ${d} · ${w} = ${total} Tage`, `${w2} Personen: ${total} : ${w2} = ${fmt(total / w2)} Tage`], traps: [T(round((d / w) * w2, 4), 'Das ist ein indirektes Verhältnis: Mehr Personen brauchen weniger Zeit.')] }));
} };

// Terms: expected answer as expression, shown nicely.

S.collect = { name: 'Terme zusammenfassen', gen() {
  const a = nz(-6, 9); const b = nz(-9, 9); const c = nz(-6, 6); const d = nz(-9, 9);
  return exprTask(`${poly([a, b])} ${c < 0 ? M : '+'} ${poly([Math.abs(c), 0])} ${d < 0 ? M : '+'} ${Math.abs(d)}`, [a + c, b + d], {
    steps: [`x-Glieder: ${fmt(a)}x ${c < 0 ? M : '+'} ${Math.abs(c)}x = ${fmt(a + c)}x`, `Zahlen: ${fmt(b)} ${d < 0 ? M : '+'} ${Math.abs(d)} = ${fmt(b + d)}`],
    traps: [ET([0, a + b + c + d], 'x-Glieder und Zahlen ohne x darf man nicht zusammenzählen.'), ET([a - c, b + d], 'Achte auf das Vorzeichen vor dem x-Glied.')] });
} };

S.expand = { name: 'Ausmultiplizieren', gen() {
  const a = nz(-6, 8); const b = nz(-5, 6); const c = nz(-9, 9);
  return exprTask(`${fmt(a)}·(${poly([b, c])})`, [a * b, a * c], { steps: [`Jedes Glied in der Klammer mal ${br(a)}:`, `${br(a)} · ${br(b)}x = ${fmt(a * b)}x`, `${br(a)} · ${br(c)} = ${fmt(a * c)}`],
    traps: [ET([a * b, c], `Auch die ${fmt(c)} in der Klammer muss mit ${br(a)} malgenommen werden.`), ET([a * b, -a * c], 'Vorzeichenfehler beim zweiten Glied: Minus mal minus ergibt plus.')] });
} };

S.binom = { name: 'Binomische Formeln', gen() {
  const a = ri(1, 9); const t = ri(0, 2);
  if (t === 2) return exprTask(`(x + ${a})(x ${M} ${a})`, [1, 0, -a * a], { steps: ['3. binomische Formel: (a + b)(a − b) = a² − b²', `x² ${M} ${a * a}`], traps: [ET([1, 0, a * a], `Das Ergebnis ist eine Differenz: x² − ${a * a}.`), ET([1, -2 * a, -a * a], 'Die Mittelglieder heben sich auf: +ax und −ax.')] });
  const s = t === 0 ? 1 : -1;
  return exprTask(`(x ${s > 0 ? '+' : M} ${a})²`, [1, 2 * s * a, a * a], { steps: [`${s > 0 ? '1.' : '2.'} binomische Formel: (a ${s > 0 ? '+' : '−'} b)² = a² ${s > 0 ? '+' : '−'} 2ab + b²`, `x² ${s > 0 ? '+' : M} 2·${a}·x + ${a * a} = ${poly([1, 2 * s * a, a * a])}`],
    traps: [ET([1, 0, a * a], `Das Mittelglied 2 · ${a} · x fehlt. (x ${s > 0 ? '+' : '−'} ${a})² ist nicht x² + ${a}².`), ET([1, s * a, a * a], `Das Mittelglied ist 2 · ${a} · x, also ${2 * a}x.`), s < 0 && ET([1, -2 * a, -a * a], 'b² ist immer positiv: (−' + a + ')² = +' + a * a + '.')] });
} };

S.eq2 = { name: 'Gleichungen mit Klammern', gen() {
  const x = nz(-8, 12); const a = nz(2, 6); const b = nz(-6, 6); const c = nz(-4, 5);
  const cc = c === a ? a + 1 : c; const d = a * (x + b) - cc * x;
  return N(num(`${a}(x ${b < 0 ? M : '+'} ${Math.abs(b)}) = ${poly([cc, d])}`, x, { steps: [`Ausmultiplizieren: ${poly([a, a * b])} = ${poly([cc, d])}`, `x auf eine Seite: ${poly([a - cc, 0])} = ${fmt(d - a * b)}`, `x = ${fmt(d - a * b)} : ${br(a - cc)} = ${fmt(x)}`],
    traps: [T(round((d - b) / (a - cc), 6), `Beim Ausmultiplizieren auch ${fmt(b)} mal ${a} nehmen.`)] }));
} };

S.pythagoras = { name: 'Satz des Pythagoras', gen() {
  const [a, b, c] = pick(TRIPLES); const k = pick([1, 1, 2, 3]);
  const [A, B, C] = [a * k, b * k, c * k];
  if (Math.random() < 0.5) return N(num(`Rechtwinkliges Dreieck: a = ${A} cm, b = ${B} cm. Wie lang ist die Hypotenuse c?`, C, { unit: 'cm', tol: 0.01, steps: [`c² = a² + b² = ${A * A} + ${B * B} = ${C * C}`, `c = √${C * C} = ${C} cm`], traps: [T(A + B, 'Die Seiten nicht einfach addieren: c² = a² + b².'), T(C * C, 'Am Ende noch die Wurzel ziehen.')] }));
  return N(num(`Rechtwinkliges Dreieck: Hypotenuse c = ${C} cm, a = ${A} cm. Wie lang ist b?`, B, { unit: 'cm', tol: 0.01, steps: [`b² = c² − a² = ${C * C} − ${A * A} = ${B * B}`, `b = √${B * B} = ${B} cm`], traps: [T(round(Math.sqrt(C * C + A * A), 2), 'Für eine Kathete wird subtrahiert: b² = c² − a².'), T(C - A, 'Nicht die Seiten abziehen, sondern die Quadrate.')] }));
} };

S.circle = { name: 'Kreis: Umfang und Fläche', gen() {
  const r = ri(2, 15); const area = Math.random() < 0.5; const useD = Math.random() < 0.3;
  const v = area ? Math.PI * r * r : 2 * Math.PI * r;
  return N(num(`Kreis mit ${useD ? `d = ${2 * r}` : `r = ${r}`} cm. ${area ? 'Flächeninhalt' : 'Umfang'} = ? (auf 2 Dezimalen)`, round(v, 2), { unit: area ? 'cm²' : 'cm', tol: Math.max(0.02, v * 0.0012), show: `${fmt(round(v, 2))} ${area ? 'cm²' : 'cm'}`,
    steps: [useD ? `r = d : 2 = ${r} cm` : '', area ? `A = r² · π = ${r * r} · π ≈ ${fmt(round(v, 2))} cm²` : `u = 2 · r · π = ${2 * r} · π ≈ ${fmt(round(v, 2))} cm`].filter(Boolean),
    traps: area ? [T(round(2 * Math.PI * r, 2), 'Das ist der Umfang. Fläche: r² · π.'), T(round(Math.PI * 4 * r * r, 2), 'Mit dem Durchmesser statt dem Radius gerechnet.'), T(round(2 * r * Math.PI, 2), '')] : [T(round(Math.PI * r * r, 2), 'Das ist die Fläche. Umfang: 2 · r · π.'), T(round(Math.PI * r, 2), 'Umfang ist d · π, also 2 · r · π.'), T(round(4 * Math.PI * r, 2), 'Mit dem Durchmesser statt dem Radius in 2 · r · π gerechnet.')] }));
} };

S.linear = { name: 'Lineare Funktionen', gen() {
  const k = nz(-4, 4); const d = ri(-6, 6); const t = ri(0, 2);
  if (t === 0) { const x = ri(-5, 6); return N(num(`f(x) = ${poly([k, d])}. Berechne f(${fmt(x)}).`, k * x + d, { steps: [`Für x ${fmt(x)} einsetzen: ${fmt(k)} · ${br(x)} ${d < 0 ? M : '+'} ${Math.abs(d)} = ${fmt(k * x + d)}`], traps: [T(k + x + d, 'k · x heißt mal, nicht plus.'), T(k * x - d, 'Vorzeichen von d beachten.')] })); }
  const x1 = ri(-4, 2); const x2 = x1 + ri(1, 4);
  const y1 = k * x1 + d; const y2 = k * x2 + d;
  if (t === 1) return N(num(`Die Gerade geht durch P(${fmt(x1)} | ${fmt(y1)}) und Q(${fmt(x2)} | ${fmt(y2)}). Steigung k = ?`, k, { steps: [`k = (y₂ − y₁) : (x₂ − x₁) = (${fmt(y2)} − ${br(y1)}) : (${fmt(x2)} − ${br(x1)}) = ${fmt(y2 - y1)} : ${x2 - x1} = ${fmt(k)}`], traps: [T(round((x2 - x1) / (y2 - y1), 6), 'Umgekehrt geteilt: k = Δy : Δx (hinauf durch hinüber).'), T(-k, 'Vorzeichenfehler beim Abziehen.')] }));
  const zero = round(-d / k, 4);
  return N(num(`Nullstelle von f(x) = ${poly([k, d])}`, zero, { tol: 0.01, steps: [`f(x) = 0: ${poly([k, d])} = 0`, `${fmt(k)}x = ${fmt(-d)}`, `x = ${fmt(zero)}`], traps: [T(d, 'd ist der Schnittpunkt mit der y-Achse, nicht die Nullstelle.'), T(round(d / k, 4), 'Beim Umformen das Vorzeichen ändern: x = −d : k.')] }));
} };

S.interest = { name: 'Zinsen', gen() {
  const K = ri(5, 100) * 100; const p = pick([1, 1.5, 2, 2.5, 3, 4, 5]); const months = pick([12, 12, 6, 3]);
  const v = round((K * p * months) / 1200, 2);
  return N(num(`${fmt(K)} € werden ${months === 12 ? 'ein Jahr' : `${months} Monate`} lang mit ${fmt(p)} % verzinst. Wie viel Zinsen gibt es?`, v, { unit: '€', tol: 0.01, show: `${fmt(v, 2)} €`, steps: [`Jahreszinsen: ${fmt(K)} · ${fmt(p)} : 100 = ${fmt((K * p) / 100)} €`, months < 12 ? `für ${months} Monate: · ${months} : 12 = ${fmt(v, 2)} €` : ''].filter(Boolean), traps: [months < 12 && T(round((K * p) / 100, 2), `Das sind die Zinsen für ein ganzes Jahr. Für ${months} Monate noch · ${months} : 12.`), T(round(K + v, 2), 'Gefragt sind nur die Zinsen, nicht das ganze Kapital.')] }));
} };

// ---- Oberstufe -----------------------------------------------------------

S.lgs = { name: 'Gleichungssysteme', gen() {
  const x = ri(-6, 8); const y = ri(-6, 8);
  let a, b, c, d; do { a = nz(-5, 5); b = nz(-5, 5); c = nz(-5, 5); d = nz(-5, 5); } while (a * d - b * c === 0);
  const e = a * x + b * y; const f = c * x + d * y;
  return { kind: 'pair', q: `I: ${poly([a, 0])} ${b < 0 ? M : '+'} ${poly([Math.abs(b), 0], 'y')} = ${fmt(e)}<br>II: ${poly([c, 0])} ${d < 0 ? M : '+'} ${poly([Math.abs(d), 0], 'y')} = ${fmt(f)}`, vals: [x, y], placeholder: 'x; y  z. B. 3; −2', keys: true,
    steps: [`x soll wegfallen: I · ${br(c)} und II · ${br(a)}`, `I: ${poly([a * c, 0])} ${b * c < 0 ? M : '+'} ${poly([Math.abs(b * c), 0], 'y')} = ${fmt(e * c)}`, `II: ${poly([a * c, 0])} ${a * d < 0 ? M : '+'} ${poly([Math.abs(a * d), 0], 'y')} = ${fmt(a * f)}`, `I − II: ${poly([b * c - a * d, 0], 'y')} = ${fmt(e * c - a * f)} → y = ${fmt(y)}`, `y in I einsetzen: ${fmt(a)}x + ${br(b)} · ${br(y)} = ${fmt(e)} → ${fmt(a)}x = ${fmt(e - b * y)} → x = ${fmt(x)}`, `Probe in II: ${fmt(c)} · ${br(x)} + ${br(d)} · ${br(y)} = ${fmt(f)} ✓`] };
} };

S.quadratic = { name: 'Quadratische Gleichungen', gen() {
  const x1 = ri(-8, 8); const x2 = ri(-8, 8); const p = -(x1 + x2); const q = x1 * x2;
  const set = [...new Set([x1, x2])];
  return { kind: 'set', q: `${poly([1, p, q])} = 0`, vals: set, placeholder: 'z. B. 2; −3', keys: true,
    steps: ['Kleine Lösungsformel: x = −p/2 ± √((p/2)² − q)', `p = ${fmt(p)}, q = ${fmt(q)}`, `−p/2 = ${fmt(-p / 2)}, (p/2)² − q = ${fmt((p / 2) ** 2 - q)}, Wurzel = ${fmt(Math.sqrt((p / 2) ** 2 - q))}`, `x₁ = ${fmt(Math.max(x1, x2))}, x₂ = ${fmt(Math.min(x1, x2))}`],
    traps: [{ v: [...new Set([-x1, -x2])], why: 'Vorzeichenfehler: Die Lösung beginnt mit −p/2. Ist p positiv, wird −p/2 negativ.' }].filter((t) => x1 + x2 !== 0) };
} };

S.powNeg = { name: 'Negative Hochzahlen', gen() {
  const b = pick([2, 3, 4, 5, 10]); const e = ri(1, b === 10 ? 4 : 3);
  return fracTask(`${b}${sup(-e)}`, 1, b ** e, { steps: [`Negative Hochzahl heißt Kehrwert: ${b}${sup(-e)} = 1 : ${b}${sup(e)}`, `= ${frac(1, b ** e)}`],
    traps: [{ v: -(b ** e), why: 'Eine negative Hochzahl macht die Zahl nicht negativ, sondern bildet den Kehrwert.' }, { v: -b * e, why: `${b}${sup(-e)} ist nicht ${b} · (−${e}).` }] });
} };

S.sci = { name: 'Gleitkommadarstellung', gen() {
  const m = ri(11, 99) / 10; const e = pick([-6, -5, -4, -3, 3, 4, 5, 6, 7]);
  const n = m * 10 ** e;
  const s = e < 0 ? n.toFixed(-e + 1).replace('.', ',') : fmt(Math.round(n));
  return N(num(`${ask('', 'Welche Hochzahl fehlt?')}${s} = ${fmt(m)} · <span style="white-space:nowrap">10${gapSup()}</span>`, e, { steps: [`Das Komma wandert von ${fmt(m)} aus um ${Math.abs(e)} Stellen nach ${e < 0 ? 'links' : 'rechts'}.`, `Hochzahl: ${fmt(e)}`], traps: [T(-e, e < 0 ? 'Kleine Zahlen (unter 1) haben eine negative Hochzahl.' : 'Große Zahlen haben eine positive Hochzahl.'), T(e < 0 ? e + 1 : e + 1, 'Um eine Stelle verzählt: Zähle, wie oft das Komma springt.')] }));
} };

S.trig = { name: 'Trigonometrie im rechtwinkligen Dreieck', gen() {
  const c = ri(5, 20); const alpha = ri(15, 75); const t = ri(0, 2);
  if (t < 2) {
    const sin = t === 0; const v = round(c * (sin ? Math.sin(rad(alpha)) : Math.cos(rad(alpha))), 2);
    return N(num(`Rechtwinkliges Dreieck, Hypotenuse c = ${c} cm, α = ${alpha}°. ${sin ? 'Gegenkathete a' : 'Ankathete b'} = ? (2 Dezimalen)`, v, { unit: 'cm', tol: 0.02, steps: [sin ? 'sin α = Gegenkathete : Hypotenuse' : 'cos α = Ankathete : Hypotenuse', `${sin ? 'a' : 'b'} = ${c} · ${sin ? 'sin' : 'cos'} ${alpha}° ≈ ${fmt(v)} cm`],
      traps: [T(round(c * (sin ? Math.cos(rad(alpha)) : Math.sin(rad(alpha))), 2), `${sin ? 'Gegenkathete gehört zu sin' : 'Ankathete gehört zu cos'}, nicht ${sin ? 'cos' : 'sin'}.`), T(round(c * (sin ? Math.sin(alpha) : Math.cos(alpha)), 2), 'Der Taschenrechner steht auf RAD. Stelle ihn auf DEG (Grad).')] }));
  }
  const a = ri(3, 15); const b = ri(3, 15); const v = round(deg(Math.atan(a / b)), 1);
  return N(num(`Rechtwinkliges Dreieck mit Gegenkathete a = ${a} cm und Ankathete b = ${b} cm. α = ? (1 Dezimale, in Grad)`, v, { unit: '°', tol: 0.1, steps: ['tan α = a : b', `α = tan⁻¹(${a} : ${b}) ≈ ${fmt(v)}°`], traps: [T(round(90 - v, 1), 'Das ist β. Für α: Gegenkathete durch Ankathete.')] }));
} };

S.log = { name: 'Logarithmen', quick: true, gen() {
  const b = pick([2, 3, 5, 10]); const e = ri(b === 2 ? -3 : 0, b === 2 ? 8 : 4);
  const n = b ** e;
  const nShow = e < 0 ? frac(1, b ** -e) : fmt(n);
  return N(num(`${b === 10 ? 'lg' : `log<sub>${b}</sub>`}(${nShow})`, e, { steps: [`Frage: ${b} hoch wie viel ergibt ${nShow}?`, `${b}${sup(e)} = ${nShow}, also ${fmt(e)}`], traps: [e >= 0 && T(n / b, `log heißt nicht teilen. Gesucht ist die Hochzahl: ${b} hoch ? = ${nShow}.`), T(-e, 'Vorzeichen: Für Zahlen unter 1 ist der Logarithmus negativ.')] }));
} };

S.growth = { name: 'Exponentielles Wachstum', gen() {
  const K = ri(5, 50) * 100; const p = pick([2, 3, 4, 5, 8, 10]); const n = ri(2, 10); const up = Math.random() < 0.7;
  const q = up ? 1 + p / 100 : 1 - p / 100; const v = round(K * q ** n, 2);
  return N(num(`${fmt(K)} ${up ? 'wachsen' : 'nehmen'} jährlich um ${p} %${up ? '' : ' ab'}. Wert nach ${n} Jahren? (2 Dezimalen)`, v, { tol: Math.max(0.02, v * 1e-4), show: fmt(v, 2), steps: [`Faktor: q = ${up ? '1 +' : '1 −'} ${p}/100 = ${fmt(q)}`, `${fmt(K)} · ${fmt(q)}${sup(n)} ≈ ${fmt(v, 2)}`],
    traps: [T(round(K * (1 + (up ? 1 : -1) * (p * n) / 100), 2), 'Das ist lineares Wachstum. Prozent wirken jedes Jahr auf den neuen Wert: · q hoch n.'), T(round(K * q * n, 2), 'q wird n-mal malgenommen, also q hoch n, nicht q · n.')] }));
} };

S.sequences = { name: 'Folgen', gen() {
  const n = ri(5, 20);
  if (Math.random() < 0.5) {
    const a1 = ri(-10, 20); const d = nz(-6, 8); const v = a1 + (n - 1) * d;
    return N(num(`Arithmetische Folge: a₁ = ${fmt(a1)}, d = ${fmt(d)}. a<sub>${n}</sub> = ?`, v, { steps: [`aₙ = a₁ + (n − 1) · d`, `a<sub>${n}</sub> = ${fmt(a1)} + ${n - 1} · ${br(d)} = ${fmt(v)}`], traps: [T(a1 + n * d, 'Um eins verzählt: Bis zum n-ten Glied kommt d nur (n − 1)-mal dazu.')] }));
  }
  const a1 = ri(1, 6); const q = pick([2, 3, -2]); const m = ri(4, 8); const v = a1 * q ** (m - 1);
  return N(num(`Geometrische Folge: a₁ = ${a1}, q = ${fmt(q)}. a<sub>${m}</sub> = ?`, v, { steps: [`aₙ = a₁ · qⁿ⁻¹`, `a<sub>${m}</sub> = ${a1} · ${br(q)}${sup(m - 1)} = ${fmt(v)}`], traps: [T(a1 * q ** m, 'Um eins verzählt: q kommt nur (n − 1)-mal vor.'), T(a1 + (m - 1) * q, 'Das wäre arithmetisch. Geometrisch wird jedes Mal mit q malgenommen.')] }));
} };

S.vectors = { name: 'Vektoren', gen() {
  const t = ri(0, 2);
  if (t === 0) { const [a, b, c] = pick(TRIPLES); const k = pick([1, 2]);
    return N(num(`Betrag von (${fmt(a * k * pick([1, -1]))} | ${fmt(b * k * pick([1, -1]))})`, c * k, { steps: [`|v| = √(x² + y²) = √(${(a * k) ** 2} + ${(b * k) ** 2}) = ${c * k}`], traps: [T(a * k + b * k, 'Den Betrag nicht einfach addieren: √(x² + y²).')] })); }
  const dim = t === 1 ? 2 : 3;
  const u = Array.from({ length: dim }, () => ri(-6, 6)); const v = Array.from({ length: dim }, () => ri(-6, 6));
  const dot = u.reduce((s, x, i) => s + x * v[i], 0);
  return N(num(`Skalarprodukt (${u.map((x) => fmt(x)).join(' | ')}) · (${v.map((x) => fmt(x)).join(' | ')})`, dot, { steps: [u.map((x, i) => `${br(x)} · ${br(v[i])}`).join(' + ') + ` = ${fmt(dot)}`], traps: [T(u.reduce((s, x) => s + x, 0) * v.reduce((s, x) => s + x, 0), 'Komponente mal Komponente, dann addieren.')] }));
} };

S.derive = { name: 'Ableiten', gen() {
  const c = randPoly(ri(2, 4)); const d = derive(c);
  return exprTask(`f(x) = ${poly(c)}. f′(x) = ?`, d, { steps: ['Potenzregel: (xⁿ)′ = n · xⁿ⁻¹, Konstanten fallen weg.', ...c.slice(0, -1).map((x, i) => (x ? `(${poly([x, ...Array(c.length - 1 - i).fill(0)])})′ = ${poly([x * (c.length - 1 - i), ...Array(c.length - 2 - i).fill(0)])}` : '')).filter(Boolean)],
    traps: [c.at(-1) && ET(d.map((x, i) => (i === d.length - 1 ? x + c.at(-1) : x)), 'Konstanten fallen beim Ableiten weg.'), ET(c.slice(0, -1).map((x) => x), 'Den Exponenten als Faktor nach vorne holen: (3x²)′ = 6x.'), ET(c.map((x, i) => x * (c.length - 1 - i)), 'Der Exponent wird um 1 kleiner: (x³)′ = 3x², nicht 3x³.')].filter(Boolean) });
} };

S.slope = { name: 'Steigung an einer Stelle', gen() {
  const c = randPoly(ri(2, 3)); const x0 = ri(-3, 3); const d = derive(c);
  const v = d.reduce((s, k) => s * x0 + k, 0); const f0 = c.reduce((s, k) => s * x0 + k, 0);
  return N(num(`f(x) = ${poly(c)}. Steigung der Tangente bei x = ${fmt(x0)}?`, v, { steps: [`f′(x) = ${poly(d)}`, `f′(${fmt(x0)}) = ${fmt(v)}`], traps: [T(f0, 'Das ist der Funktionswert f(' + x0 + '). Die Steigung ist f′(' + x0 + ').')] }));
} };

S.extrema = { name: 'Extremstellen', gen() {
  if (Math.random() < 0.5) {
    const a = nz(-4, 4); const xs = ri(-6, 6); const b = -2 * a * xs; const c = ri(-9, 9);
    return N(num(`f(x) = ${poly([a, b, c])}. Bei welchem x liegt der ${a > 0 ? 'Tiefpunkt' : 'Hochpunkt'}?`, xs, { steps: [`f′(x) = ${poly([2 * a, b])} = 0`, `x = ${fmt(-b)} : ${br(2 * a)} = ${fmt(xs)}`], traps: [T(-xs, 'Vorzeichenfehler beim Auflösen von f′(x) = 0.'), T(round(-b / a, 4), 'f′(x) = 2ax + b: Der Faktor 2 fehlt.')] }));
  }
  const k = ri(1, 4);
  return { kind: 'set', q: `f(x) = ${poly([1, 0, -3 * k * k, ri(-5, 5)])}. Extremstellen x = ?`, vals: [-k, k], placeholder: 'z. B. −2; 2',
    steps: [`f′(x) = 3x² − ${3 * k * k} = 0`, `x² = ${k * k}`, `x = ±${k}`], traps: [{ v: [k], why: `x² = ${k * k} hat zwei Lösungen: +${k} und −${k}.` }, { v: [-k * k, k * k].filter((v, i, a) => a.indexOf(v) === i), why: 'Am Ende noch die Wurzel ziehen.' }] };
} };

S.laplace = { name: 'Wahrscheinlichkeit (Laplace)', gen() {
  if (Math.random() < 0.5) {
    const s = ri(2, 12); const ways = 6 - Math.abs(7 - s);
    return fracTask(`Zwei Würfel: Wahrscheinlichkeit für die Augensumme ${s}?`, ways, 36, { steps: [`36 gleich wahrscheinliche Paare.`, `Günstig: ${ways} (${Array.from({ length: 6 }, (_, i) => i + 1).filter((a) => s - a >= 1 && s - a <= 6).map((a) => `${a}+${s - a}`).join(', ')})`, `P = ${frac(ways, 36)}${gcd(ways, 36) > 1 ? ` = ${fracR(ways, 36)}` : ''}`],
      traps: [FT(1, 11, 'Die 11 Augensummen sind nicht gleich wahrscheinlich. Zähle die 36 Paare.'), FT(Math.ceil(ways / 2), 21, 'Die Würfel sind unterscheidbar: 1+2 und 2+1 sind zwei verschiedene Ergebnisse.')] });
  }
  const r = ri(2, 8); const b = ri(2, 8); const g = ri(0, 5); const tot = r + b + g;
  return fracTask(`In einer Urne liegen ${r} rote, ${b} blaue${g ? ` und ${g} grüne` : ''} Kugeln. Wie groß ist die Wahrscheinlichkeit, eine rote zu ziehen?`, r, tot, { steps: [`günstig : möglich = ${r} : ${tot}`], traps: [FT(r, b + g, 'Im Nenner stehen alle Kugeln, auch die roten.')] });
} };

S.antiderive = { name: 'Stammfunktionen', gen() {
  const deg2 = ri(1, 3); const c = Array.from({ length: deg2 + 1 }, (_, i) => (i === 0 ? nz(1, 4) * (deg2 + 1) : ri(-4, 4) * (deg2 + 1 - i)));
  const F = [...c.map((k, i) => k / (deg2 + 1 - i)), 0];
  return { kind: 'anti', q: `Finde eine Stammfunktion von f(x) = ${poly(c)}`, expr: polyExpr(F), coeffs: F, show: `${poly(F)} + C`, placeholder: 'z. B. x^3 + 2x', keys: true,
    steps: ['(xⁿ⁺¹ : (n + 1))′ = xⁿ: Exponent um 1 erhöhen und durch den neuen Exponenten teilen.', `F(x) = ${poly(F)} + C`],
    traps: [{ v: polyExpr(derive(c)), why: 'Das ist die Ableitung. Gesucht ist die Umkehrung.' }, { v: polyExpr([...c, 0]), why: 'Nach dem Erhöhen des Exponenten noch durch den neuen Exponenten teilen.' }] };
} };

S.integral = { name: 'Bestimmtes Integral', gen() {
  const c = [3 * nz(-1, 1), 2 * ri(-2, 2), ri(-5, 5)]; const a = ri(-2, 1); const b = a + ri(1, 3);
  const F = (x) => (c[0] * x ** 3) / 3 + (c[1] * x ** 2) / 2 + c[2] * x;
  const v = round(F(b) - F(a), 4);
  return N(num(`∫ von ${fmt(a)} bis ${fmt(b)} (${poly(c)}) dx = ? (2 Dezimalen)`, v, { tol: 0.01, show: fmt(round(v, 2)), steps: [`F(x) = ${poly([c[0] / 3, c[1] / 2, c[2], 0])}`, `F(${fmt(b)}) − F(${fmt(a)}) = ${fmt(round(F(b), 3))} − ${br(round(F(a), 3))} = ${fmt(round(v, 2))}`],
    traps: [a !== 0 && T(round(F(b), 4), 'Die untere Grenze noch abziehen: F(b) − F(a).'), T(round(F(a) - F(b), 4), 'Umgekehrt abgezogen: obere minus untere Grenze.')] }));
} };

S.binomial = { name: 'Binomialverteilung', gen() {
  const n = ri(4, 10); const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6]); const k = ri(1, n - 1);
  const v = round(binom(n, k) * p ** k * (1 - p) ** (n - k), 4);
  if (Math.random() < 0.3) return N(num(`X ist binomialverteilt mit n = ${n}, p = ${fmt(p)}. Erwartungswert E(X) = ?`, round(n * p, 4), { tol: 0.001, steps: [`E(X) = n · p = ${n} · ${fmt(p)} = ${fmt(n * p)}`], traps: [T(round(n * p * (1 - p), 4), 'Das ist die Varianz. E(X) = n · p.')] }));
  return N(num(`X ist binomialverteilt mit n = ${n}, p = ${fmt(p)}. P(X = ${k}) = ? (4 Dezimalen)`, v, { tol: 0.0006, show: fmt(v, 4), steps: [`P(X = k) = (n über k) · pᵏ · (1 − p)ⁿ⁻ᵏ`, `(${n} über ${k}) = ${binom(n, k)}`, `${binom(n, k)} · ${fmt(p)}${sup(k)} · ${fmt(round(1 - p, 2))}${sup(n - k)} ≈ ${fmt(v, 4)}`],
    traps: [T(round(p ** k * (1 - p) ** (n - k), 4), `Der Binomialkoeffizient (${n} über ${k}) = ${binom(n, k)} fehlt.`), T(round(binom(n, k) * p ** k, 4), 'Die Gegenwahrscheinlichkeit (1 − p)ⁿ⁻ᵏ fehlt.')] }));
} };


// The rule behind each task type, shown with every wrong answer.
const RULES = {
  plus10: '<b>Plus</b> heißt: Es kommt etwas dazu. Das Ergebnis wird größer.',
  minus10: '<b>Minus</b> heißt: Es wird etwas weggenommen. Das Ergebnis wird kleiner.',
  fill10: '<b>Ergänzen:</b> Wie viel fehlt noch bis zur Zahl? Rechne Ziel minus Start.',
  plus20: '<b>Über die 10:</b> Zuerst bis 10 auffüllen, dann den Rest dazu.',
  minus20: '<b>Über die 10 zurück:</b> Zuerst bis 10 hinunter, dann den Rest weg.',
  compare20: '<b>Größer, kleiner:</b> Die Spitze zeigt zur kleineren Zahl, die offene Seite zur größeren.',
  neighbor: '<b>Nachbarzahlen:</b> Der Vorgänger ist 1 weniger, der Nachfolger 1 mehr.',
  plus100: '<b>Zehner und Einer getrennt:</b> Zehner plus Zehner, Einer plus Einer, dann zusammen.',
  minus100: '<b>Schrittweise:</b> Zuerst die Zehner abziehen, dann die Einer.',
  times2510: '<b>Mal</b> heißt: gleich große Gruppen zusammenzählen. 5 · 3 = 5 + 5 + 5.',
  times: '<b>Mal</b> heißt: gleich große Gruppen zusammenzählen. Tauschen ist erlaubt: 3 · 7 = 7 · 3.',
  divide: '<b>Geteilt</b> ist die Umkehrung von Mal: 24 : 6 = 4, weil 4 · 6 = 24.',
  doubleHalf: '<b>Verdoppeln</b> heißt mal 2, <b>Halbieren</b> heißt durch 2.',
  fill100: '<b>Ergänzen bis 100:</b> Zuerst zum nächsten Zehner, dann bis 100.',
  plus1000: '<b>Mit Zehnern rechnen:</b> Die Null am Ende weglassen, rechnen, Null wieder anhängen.',
  colAdd: '<b>Schriftlich addieren:</b> Stellen genau untereinander, rechts bei den Einern beginnen, Übertrag mitnehmen.',
  colSub: '<b>Schriftlich subtrahieren:</b> Von unten nach oben ergänzen. Geht es nicht, 10 dazu und 1 weiter.',
  times10: '<b>Mal 10, mal 100:</b> Ohne Nullen rechnen und die Nullen dann anhängen.',
  divRest: '<b>Teilen mit Rest:</b> Der Rest ist immer kleiner als die Zahl, durch die du teilst.',
  unitsLen: '<b>Längen:</b> 1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm.',
  money: '<b>Geld:</b> 1 € = 100 Cent.',
  time: '<b>Zeit:</b> 1 Stunde hat 60 Minuten, nicht 100.',
  round: '<b>Runden:</b> Schau auf die Ziffer rechts davon. 0 bis 4 abrunden, 5 bis 9 aufrunden.',
  colMul: '<b>Schriftlich multiplizieren:</b> Jede Stelle malnehmen, Übertrag dazuzählen. Die Zehnerzeile rückt eine Stelle nach links.',
  colDiv: '<b>Schriftlich dividieren:</b> Von links Stelle für Stelle teilen. Passt es nicht, steht 0 im Ergebnis.',
  unitsMass: '<b>Umrechnen:</b> 1 kg = 1000 g, 1 t = 1000 kg, 1 h = 60 min, 1 min = 60 s.',
  bigNumbers: '<b>Große Zahlen:</b> In Tausendern rechnen und die drei Nullen dranhängen.',
  story4: '<b>Sachaufgabe:</b> Was ist gefragt? Welche Rechnung passt? Am Ende ein Antwortsatz.',
  order: '<b>Punkt vor Strich:</b> Mal und Geteilt werden vor Plus und Minus gerechnet. Klammern kommen noch davor.',
  divisible: '<b>Teilbarkeit:</b> durch 2: gerade Endziffer · durch 5: Endziffer 0 oder 5 · durch 3 oder 9: Ziffernsumme · durch 4: letzte zwei Ziffern.',
  decAdd: '<b>Komma unter Komma:</b> Beim Plus und Minus stehen die Kommas genau untereinander.',
  decShift: '<b>Komma verschieben:</b> Bei mal 10, 100, 1000 rückt das Komma nach rechts, bei durch nach links. So viele Stellen wie Nullen.',
  fracOf: '<b>Bruchteil einer Menge:</b> Durch den Nenner teilen, dann mal den Zähler.',
  rect: '<b>Rechteck:</b> Umfang = 2 · a + 2 · b (rundherum), Fläche = a · b.',
  fracReduce: '<b>Kürzen:</b> Zähler und Nenner durch dieselbe Zahl teilen. Vollständig gekürzt mit dem ggT.',
  fracAdd: '<b>Brüche plus und minus:</b> Erst gleichnamig machen (gleicher Nenner), dann nur die Zähler rechnen.',
  fracMul: '<b>Brüche mal:</b> Zähler mal Zähler, Nenner mal Nenner. <b>Brüche durch:</b> mit dem Kehrwert malnehmen.',
  decMul: '<b>Dezimalzahlen mal:</b> Ohne Komma rechnen, dann so viele Kommastellen wie beide Zahlen zusammen.',
  gcdLcm: '<b>ggT:</b> größte Zahl, die beide teilt. <b>kgV:</b> kleinste Zahl, die beide teilen.',
  percentBasic: '<b>Prozent</b> heißt Hundertstel: 1 % = Zahl durch 100.',
  triangle: '<b>Dreieck:</b> A = g · h : 2. <b>Parallelogramm:</b> A = g · h.',
  intAdd: '<b>Vorzeichen:</b> + (−a) heißt − a, und − (−a) heißt + a.',
  intMul: '<b>Vorzeichen beim Mal und Durch:</b> gleiche Vorzeichen ergeben plus, verschiedene ergeben minus.',
  eq1: '<b>Waage-Regel:</b> Was du auf einer Seite rechnest, musst du auch auf der anderen Seite rechnen.',
  percent: '<b>Prozentrechnung:</b> Prozentwert = Grundwert · Prozentsatz : 100. Über 1 % rechnen hilft immer.',
  power: '<b>Potenz:</b> Die Hochzahl sagt, wie oft die Basis mit sich selbst malgenommen wird.',
  sqrt: '<b>Wurzel:</b> √a ist die Zahl, die mit sich selbst malgenommen a ergibt.',
  proportion: '<b>Schlussrechnung:</b> Über die Einheit (1 Stück, 1 Person) rechnen. Direkt: beide werden größer. Indirekt: eines größer, eines kleiner.',
  collect: '<b>Zusammenfassen:</b> Nur gleichartige Glieder zusammenzählen: x mit x, Zahlen mit Zahlen.',
  expand: '<b>Ausmultiplizieren:</b> Die Zahl vor der Klammer mit jedem Glied in der Klammer malnehmen.',
  binom: '<b>Binomische Formeln:</b> (a + b)² = a² + 2ab + b² · (a − b)² = a² − 2ab + b² · (a + b)(a − b) = a² − b²',
  eq2: '<b>Gleichung mit Klammern:</b> Zuerst ausmultiplizieren, dann alle x auf eine Seite, dann teilen.',
  pythagoras: '<b>Pythagoras:</b> a² + b² = c². c ist die längste Seite, gegenüber vom rechten Winkel.',
  circle: '<b>Kreis:</b> Umfang u = 2 · r · π, Fläche A = r² · π. Radius = halber Durchmesser.',
  linear: '<b>Lineare Funktion:</b> f(x) = k · x + d. k = Steigung (Δy : Δx), d = Schnitt mit der y-Achse.',
  interest: '<b>Zinsen:</b> Jahreszinsen = Kapital · Zinssatz : 100. Für Monate noch · Monate : 12.',
  lgs: '<b>Gleichungssystem:</b> Eine Variable wegschaffen (Gleichungen passend malnehmen und abziehen), die andere ausrechnen, einsetzen.',
  quadratic: '<b>Kleine Lösungsformel:</b> x² + px + q = 0 → x = −p/2 ± √((p/2)² − q).',
  powNeg: '<b>Negative Hochzahl:</b> a⁻ⁿ = 1 : aⁿ (Kehrwert, nicht negativ).',
  sci: '<b>Gleitkomma:</b> Zahl = (Zahl zwischen 1 und 10) · 10ⁿ. Große Zahlen: n positiv, kleine Zahlen: n negativ.',
  trig: '<b>SOH-CAH-TOA:</b> sin = Gegenkathete : Hypotenuse, cos = Ankathete : Hypotenuse, tan = Gegenkathete : Ankathete.',
  log: '<b>Logarithmus:</b> log<sub>b</sub>(n) ist die Hochzahl, mit der man b potenzieren muss, um n zu bekommen.',
  growth: '<b>Exponentiell:</b> Jedes Jahr mal denselben Faktor q = 1 ± p/100. Nach n Jahren: K · qⁿ.',
  sequences: '<b>Folgen:</b> arithmetisch aₙ = a₁ + (n − 1) · d, geometrisch aₙ = a₁ · qⁿ⁻¹.',
  vectors: '<b>Vektoren:</b> Betrag = √(x² + y²). Skalarprodukt = Komponenten paarweise mal, dann addieren.',
  derive: '<b>Potenzregel:</b> (xⁿ)′ = n · xⁿ⁻¹. Konstanten fallen weg, Faktoren bleiben stehen.',
  slope: '<b>Steigung an einer Stelle:</b> Erst ableiten, dann die Stelle in f′(x) einsetzen.',
  extrema: '<b>Extremstellen:</b> f′(x) = 0 setzen und nach x lösen.',
  laplace: '<b>Laplace:</b> Wahrscheinlichkeit = günstige Fälle : mögliche Fälle (wenn alle gleich wahrscheinlich sind).',
  antiderive: '<b>Stammfunktion:</b> Hochzahl um 1 erhöhen und durch die neue Hochzahl teilen. + C nicht vergessen.',
  integral: '<b>Bestimmtes Integral:</b> Stammfunktion F bilden, dann F(obere Grenze) − F(untere Grenze).',
  binomial: '<b>Binomialverteilung:</b> P(X = k) = (n über k) · pᵏ · (1 − p)ⁿ⁻ᵏ. Erwartungswert E(X) = n · p.',
};
for (const [id, rule] of Object.entries(RULES)) S[id].rule = rule;
// More skills live in curriculum/*.js: { skills: { id: { name, rule, quick?, gen } }, topics: [[grade, id, title, icon, skills]], add: { topicId: [skill] } }.
const MORE = [moreVs, moreUs, moreOs];
for (const m of MORE) Object.assign(S, m.skills);
for (const [id, s] of Object.entries(S)) s.id = id;
export const SKILLS = S;

// ---- Topics per Schulstufe -------------------------------------------------

const TOPICS = [
  [1, 'zahlen20', 'Zahlen bis 20', '🔢', ['neighbor', 'compare20']],
  [1, 'plusminus10', 'Plus und Minus bis 10', '➕', ['plus10', 'minus10', 'fill10']],
  [1, 'plusminus20', 'Plus und Minus bis 20', '🔟', ['plus20', 'minus20']],
  [2, 'zr100', 'Rechnen bis 100', '💯', ['plus100', 'minus100', 'fill100']],
  [2, 'einmaleins', 'Einmaleins', '✖️', ['times2510', 'times']],
  [2, 'teilen', 'Teilen', '➗', ['divide', 'doubleHalf']],
  [3, 'zr1000', 'Rechnen bis 1000', '🧮', ['plus1000', 'times10']],
  [3, 'schriftlich3', 'Schriftlich rechnen', '✏️', ['colAdd', 'colSub']],
  [3, 'einmaleins3', 'Einmaleins und Teilen', '✖️', ['times', 'divide', 'divRest']],
  [3, 'groessen3', 'Längen, Geld und Zeit', '📏', ['unitsLen', 'money', 'time']],
  [4, 'million', 'Zahlen bis zur Million', '🌍', ['bigNumbers', 'round']],
  [4, 'schriftlich4', 'Schriftlich mal und durch', '✏️', ['colMul', 'colDiv']],
  [4, 'groessen4', 'Größen umrechnen', '⚖️', ['unitsMass', 'unitsLen', 'money']],
  [4, 'sach4', 'Sachaufgaben', '📖', ['story4']],
  [5, 'rechenregeln', 'Rechenregeln', '📐', ['order', 'divisible']],
  [5, 'dezimal5', 'Dezimalzahlen', '🔸', ['decAdd', 'decShift']],
  [5, 'brueche5', 'Brüche', '🍕', ['fracOf']],
  [5, 'geometrie5', 'Rechteck und Quadrat', '⬛', ['rect']],
  [6, 'brueche6', 'Bruchrechnen', '🍰', ['fracReduce', 'fracAdd', 'fracMul']],
  [6, 'dezimal6', 'Dezimalzahlen mal und durch', '🔹', ['decMul']],
  [6, 'teiler', 'ggT und kgV', '🧩', ['gcdLcm']],
  [6, 'prozent6', 'Prozent', '💸', ['percentBasic']],
  [6, 'geometrie6', 'Dreieck und Parallelogramm', '🔺', ['triangle']],
  [7, 'ganze', 'Ganze Zahlen', '🌡️', ['intAdd', 'intMul']],
  [7, 'gleichungen7', 'Gleichungen', '⚖️', ['eq1']],
  [7, 'prozent7', 'Prozentrechnung', '📊', ['percent', 'percentBasic']],
  [7, 'potenzen7', 'Potenzen und Wurzeln', '🚀', ['power', 'sqrt']],
  [7, 'schluss', 'Schlussrechnung', '🔗', ['proportion']],
  [8, 'terme', 'Terme', '🔤', ['collect', 'expand', 'binom']],
  [8, 'gleichungen8', 'Gleichungen mit Klammern', '⚖️', ['eq2']],
  [8, 'pythagoras', 'Pythagoras', '📐', ['pythagoras']],
  [8, 'kreis', 'Kreis', '⭕', ['circle']],
  [8, 'funktionen8', 'Lineare Funktionen', '📈', ['linear']],
  [8, 'zinsen', 'Zinsen', '🏦', ['interest']],
  [9, 'gls', 'Gleichungssysteme', '🔀', ['lgs']],
  [9, 'quadratisch', 'Quadratische Gleichungen', '🟰', ['quadratic']],
  [9, 'potenzen9', 'Potenzen', '🔬', ['powNeg', 'sci']],
  [9, 'trigonometrie', 'Trigonometrie', '📐', ['trig']],
  [9, 'funktionen9', 'Lineare Funktionen', '📈', ['linear']],
  [10, 'log', 'Logarithmen', '🪵', ['log']],
  [10, 'wachstum', 'Wachstum und Zerfall', '🌱', ['growth']],
  [10, 'folgen', 'Folgen', '🔢', ['sequences']],
  [10, 'vektoren', 'Vektoren', '➡️', ['vectors']],
  [11, 'ableitung', 'Differentialrechnung', '📉', ['derive', 'slope', 'extrema']],
  [11, 'wahrscheinlichkeit', 'Wahrscheinlichkeit', '🎲', ['laplace']],
  [11, 'vektoren3d', 'Vektoren im Raum', '🧊', ['vectors']],
  [12, 'integral', 'Integralrechnung', '∫', ['antiderive', 'integral']],
  [12, 'binomial', 'Binomialverteilung', '🎯', ['binomial']],
  [12, 'matura', 'Maturatraining gemischt', '🎓', ['derive', 'integral', 'binomial', 'growth', 'quadratic', 'trig']],
  ...MORE.flatMap((m) => m.topics),
].map(([grade, id, title, icon, skills]) => ({ id: `g${grade}-${id}`, grade, title, icon, skills }))
  .map((t, i) => ({ ...t, i })).sort((a, b) => a.grade - b.grade || a.i - b.i).map(({ i, ...t }) => t);
for (const m of MORE) for (const [id, more] of Object.entries(m.add)) TOPICS.find((t) => t.id === id).skills.push(...more);

export const topicsFor = (grade) => TOPICS.filter((t) => t.grade === grade);
export const topic = (id) => TOPICS.find((t) => t.id === id);
export const allTopics = () => TOPICS;

// A fresh task of a skill, tagged with where it comes from.
export function makeTask(skillId, topicId) {
  const s = SKILLS[skillId];
  for (let i = 0; i < 20; i++) {
    const t = s.gen();
    if (!t) continue;
    const right = answerOf(t);
    const seen = [];
    t.traps = (t.traps ?? []).filter((x) => {
      if (!x || x.v === undefined || !x.why) return false;
      const raw = Array.isArray(x.v) ? x.v.join(';') : String(x.v);
      if (matches(t, raw, right) || seen.some((v) => matches(t, raw, v))) return false;
      seen.push(x.v);
      return true;
    });
    return { rule: s.rule, ...t, skill: skillId, topicId, id: `${skillId}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}` };
  }
  throw new Error(`Keine Aufgabe für ${skillId}`);
}

// All skills of some topics, each with its topic.
export const entriesOf = (topics) => topics.flatMap((t) => t.skills.map((skill) => ({ skill, topicId: t.id })));

// Plan of a round: the skills that need it most first, then round robin.
export function buildPlan(entries, size, progress) {
  const ranked = byNeed(entries.map((e) => ({ ...e, id: e.skill })), progress);
  const plan = [];
  for (let i = 0; plan.length < size && ranked.length; i++) plan.push(ranked[i % ranked.length]);
  return plan.map(({ skill, topicId }) => ({ skill, topicId }));
}

// A topic that has the skill, preferably from the given class.
export const topicOfSkill = (skill, grade) => (TOPICS.find((t) => t.grade === grade && t.skills.includes(skill)) ?? TOPICS.find((t) => t.skills.includes(skill)))?.id;
