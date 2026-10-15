// Additional skills and topics (vs), merged into skills.js.

import { ri, pick, fmt, frac } from '../math.js';
import { M, num, T, N, digits, noBorrow, noCarry } from '../kit.js';

const pad = (m) => String(m).padStart(2, '0');
const clockText = (h, m) => `${h}:${pad(m)} Uhr`;
const placeParts = (n) => digits(n).map((d, i, arr) => d * 10 ** (arr.length - 1 - i)).filter((x) => x);

// ---- Rechenmauer: each brick is the sum of the two below ------------------

const brick = (v) => `<span style="display:inline-block;min-width:2.3em;padding:.05em .25em;border:2px solid currentColor;border-radius:6px;${v === '▢' ? 'background:color-mix(in srgb, var(--accent) 25%, transparent);' : ''}">${v === null ? '&nbsp;' : v}</span>`;
// rows: top row first, each an array of numbers, '▢' (the gap) or null (empty brick)
const wallHtml = (rows) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;font-size:.75em;vertical-align:middle">${rows.map((r) => `<span style="display:flex;gap:4px;justify-content:center">${r.map(brick).join('')}</span>`).join('')}</span>`;
const small = (s) => `<span style="font-size:.55em;font-weight:600;display:block;margin-bottom:.3em">${s}</span>`;

function buildWall(k, lo, hi, topMin, topMax) {
  for (;;) {
    const rows = [Array.from({ length: k }, () => ri(lo, hi))];
    while (rows[rows.length - 1].length > 1) { const r = rows[rows.length - 1]; rows.push(r.slice(1).map((x, i) => r[i] + x)); }
    const top = rows[rows.length - 1][0];
    if (top >= topMin && top <= topMax) return rows; // rows[0] = bottom
  }
}

function wallTask(k, lo, hi, topMin, topMax) {
  const rows = buildWall(k, lo, hi, topMin, topMax);
  const top = rows[k - 1][0];
  const disp = (fn) => rows.map((r, lvl) => r.map((v, i) => fn(lvl, i, v))).reverse();
  const q = (shown) => `${small('Rechenmauer: Jeder Stein ist die Summe der zwei Steine darunter. Welche Zahl gehört ins Feld ▢?')}${wallHtml(shown)}`;
  const mode = pick(['top', 'top', 'bottom', 'bottom', 'fromTop']);
  if (mode === 'top') {
    const steps = rows.slice(1).map((r, lvl) => `${lvl === k - 2 ? 'Oben' : `Reihe ${lvl + 2} von unten`}: ${r.map((v, i) => `${rows[lvl][i]} + ${rows[lvl][i + 1]} = ${v}`).join(', ')}`);
    const bottomSum = rows[0].reduce((a, b) => a + b, 0);
    return N(num(q(disp((lvl, i, v) => (lvl === 0 ? v : lvl === k - 1 ? '▢' : null))), top, { steps: ['Rechne von unten nach oben, Reihe für Reihe.', ...steps],
      traps: [T(bottomSum, 'Du hast nur die unteren Steine zusammengezählt. Rechne Reihe für Reihe nach oben. Die mittleren Steine zählen dabei mehrmals mit.'),
        k === 4 && T(rows[1].reduce((a, b) => a + b, 0), 'Du hast eine Reihe übersprungen. Rechne jede Reihe einzeln aus, bis oben nur noch ein Stein übrig ist.'),
        T(rows[k - 2][0], `Das ist nur ein Stein aus der Reihe darunter. Oben steht ${rows[k - 2][0]} + ${rows[k - 2][1]}.`)] }));
  }
  if (mode === 'bottom') {
    const i = ri(0, k - 1); const v = rows[0][i];
    const left = i > 0 && (i === k - 1 || Math.random() < 0.5); // use the brick above-left
    const above = left ? rows[1][i - 1] : rows[1][i]; const nb = left ? rows[0][i - 1] : rows[0][i + 1];
    return N(num(q(disp((lvl, j, x) => (lvl === 0 && j === i ? '▢' : x))), v, { steps: [`Der Stein darüber ist ${above}. Er ist die Summe aus ▢ und dem Nachbarstein ${nb}.`, `▢ + ${nb} = ${above}, also ${above} ${M} ${nb} = ${v}.`, `Probe: ${v} + ${nb} = ${above}.`],
      traps: [T(above + nb, `Du hast plus gerechnet. Der Stein unten ist kleiner als der darüber: ${above} ${M} ${nb}.`), T(above, `${above} steht schon darüber. Gesucht ist, was zu ${nb} dazukommt, damit ${above} herauskommt.`)] }));
  }
  const i = ri(0, 1); const v = rows[k - 2][i]; const other = rows[k - 2][1 - i];
  return N(num(q(disp((lvl, j, x) => (lvl === k - 1 ? x : lvl === k - 2 ? (j === i ? '▢' : x) : null))), v, { steps: [`Oben steht ${top}. Das ist die Summe der zwei Steine darunter: ${i === 0 ? `▢ + ${other}` : `${other} + ▢`} = ${top}.`, `${top} ${M} ${other} = ${v}.`, `Probe: ${other} + ${v} = ${top}.`],
    traps: [T(top + other, `Du hast plus gerechnet. Der Stein darunter ist kleiner: ${top} ${M} ${other}.`), T(top, `${top} ist der obere Stein. Gesucht ist der Stein, der mit ${other} zusammen ${top} ergibt.`)] }));
}

// ---- Turmrechnen (Malturm) ---------------------------------------------------

// Halbschriftlich: 37 · 4 = 30 · 4 + 7 · 4 = 120 + 28 = 148
function mulLine(a, f) {
  if (a < 10) return `${a} · ${f} = ${a * f}`;
  const parts = placeParts(a);
  if (parts.length === 1) return `${a} · ${f} = ${a * f} (rechne ${parts[0] / 10 ** (String(a).length - 1)} · ${f} und hänge die Null${String(a).length > 2 ? 'en' : ''} an)`;
  return `${a} · ${f} = ${parts.map((p) => `${p} · ${f}`).join(' + ')} = ${parts.map((p) => p * f).join(' + ')} = ${a * f}`;
}
// 984 : 2 = 400 + 90 + 2, because 800 + 180 + 4 = 984
function divLine(n, f) {
  const q = n / f; const parts = placeParts(q);
  if (n <= 100 || parts.length === 1) return `${n} : ${f} = ${q}, denn ${q} · ${f} = ${n}`;
  return `${n} = ${parts.map((p) => p * f).join(' + ')}, also ${n} : ${f} = ${parts.join(' + ')} = ${q}`;
}

function towerTask(s, fs) {
  const lines = []; let v = s;
  for (const f of fs) { lines.push({ from: v, op: '·', f, to: v * f }); v *= f; }
  for (const f of fs) { lines.push({ from: v, op: ':', f, to: v / f }); v /= f; }
  const top = lines[fs.length - 1].to;
  const head = small(`Malturm: Starte mit ${s}. Hinauf ${fs.map((f) => `· ${f}`).join(', ')}, dann wieder hinunter ${fs.map((f) => `: ${f}`).join(', ')}.`);
  if (Math.random() < 0.3) {
    const prodF = fs.reduce((a, b) => a * b, 1);
    return N(num(`${head}Welche Zahl steht ganz oben im Turm?`, top, { steps: lines.slice(0, fs.length).map((l) => mulLine(l.from, l.f)),
      traps: [T(s + fs.reduce((a, b) => a + b, 0), 'Du hast plus gerechnet. Im Malturm wird bei jedem Stockwerk malgenommen.'), T(prodF, `Die Startzahl vergessen: Du beginnst mit ${s}, nicht mit 1.`), T(s * fs[fs.length - 1], `Ein Stockwerk nimmt immer das Ergebnis vom Stockwerk darunter. Rechne der Reihe nach: ${s} · ${fs[0]}, dann weiter.`)] }));
  }
  const j = ri(1, lines.length - 1); const l = lines[j];
  const shown = lines.slice(0, j + 1).map((x, i) => `${x.from} ${x.op} ${x.f} = ${i === j ? '▢' : x.to}`);
  const q = `${head}<span style="display:inline-block;text-align:left;font-size:.75em;line-height:1.45">${shown.join('<br>')}</span>`;
  if (l.op === '·') {
    return N(num(q, l.to, { steps: [`Das Ergebnis vom Stockwerk davor ist ${l.from}. Das nimmst du mal ${l.f}.`, mulLine(l.from, l.f)],
      traps: [T(l.from + l.f, 'Du hast plus statt mal gerechnet.'), T(l.from * (l.f - 1), `Einmal ${l.from} zu wenig: Das ist ${l.from} · ${l.f - 1}.`), T(l.from * (l.f + 1), `Einmal ${l.from} zu viel: Das ist ${l.from} · ${l.f + 1}.`)] }));
  }
  return N(num(q, l.to, { steps: [`Jetzt geht es hinunter: ${l.from} durch ${l.f}.`, divLine(l.from, l.f), `Probe: ${l.to} · ${l.f} = ${l.from}.`],
    traps: [T(l.from * l.f, 'Du hast mal gerechnet. Hinunter wird geteilt.'), T(l.from - l.f, 'Du hast minus gerechnet. Hinunter wird durch die Zahl geteilt.'), T(l.to + 1, `Prüfe mit der Umkehraufgabe: ${l.to + 1} · ${l.f} = ${(l.to + 1) * l.f}, nicht ${l.from}.`)] }));
}

// ---- Uhrzeit ---------------------------------------------------------------------

const asTime = (t) => [Math.floor(t / 60), t % 60];
const timeTrap = (h, m, why) => ({ v: [h, m], why, show: `${h}:${pad(m)} Uhr` });

// ---- Schriftlich dividieren durch zweistellige Zahl (österreichisch: ergänzen) --

function div2Steps(n, d) {
  const ds = digits(n); const steps = []; let i = 0; let cur = 0;
  while (i < ds.length && cur < d) { cur = cur * 10 + ds[i]; i++; }
  steps.push(`Nimm so viele Ziffern, bis ${d} hineinpasst: ${cur}.`);
  const dr = Math.round(d / 10) * 10;
  let pre = '';
  for (;;) {
    const q = Math.floor(cur / d); const r = cur - q * d;
    if (q === 0) steps.push(`${pre}${cur} : ${d} geht nicht, schreibe 0 ins Ergebnis. Rest ${cur}.`);
    else {
      const est = Math.min(9, Math.floor(cur / dr));
      const ov = est > q ? `, aber ${est} · ${d} = ${est * d} ist zu viel, also ${q}` : est < q ? `, es passt aber ${q}-mal` : '';
      steps.push(`${pre}${cur} : ${d}. Überschlag: ${cur} : ${dr} ist ungefähr ${est}${ov}. ${q} · ${d} = ${q * d}, ${q * d} und ${r} ist ${cur}, Rest ${r}.`);
    }
    if (i >= ds.length) break;
    cur = r * 10 + ds[i]; pre = `Hole die ${ds[i]} herunter: `; i++;
  }
  return steps;
}

// ---- Geometrie: kleine Bilder als Inline-SVG --------------------------------

const svgPic = (w, h, label, inner, width = 100) => `<svg viewBox="0 0 ${w} ${h}" width="${width}" height="${Math.round((width * h) / w)}" role="img" aria-label="${label}" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">${inner}</svg>`;
const FILL = 'fill="var(--accent)" fill-opacity=".3"';
const DASH = 'stroke-dasharray="3 2"';
const pts = (a) => a.map((p) => p.join(',')).join(' ');
const regular = (n, cx, cy, r) => Array.from({ length: n }, (_, i) => { const a = (-90 + (360 / n) * i) * Math.PI / 180; return [+(cx + r * Math.cos(a)).toFixed(1), +(cy + r * Math.sin(a)).toFixed(1)]; });
const dots = (p) => p.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="currentColor" stroke="none"/>`).join('');

// Flache Formen (Bild 60 mal 60)
const FLAT = {
  Quadrat: { n: 4, art: 'das', aria: 'Ein Quadrat', body: () => ({ inner: `<rect x="10" y="10" width="40" height="40" ${FILL}/>`, corners: [[10, 10], [50, 10], [50, 50], [10, 50]] }) },
  Rechteck: { n: 4, art: 'das', aria: 'Ein Rechteck', body: () => { const flat = Math.random() < 0.6; const r = flat ? [4, 16, 52, 28] : [16, 4, 28, 52]; return { inner: `<rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" ${FILL}/>`, corners: [[r[0], r[1]], [r[0] + r[2], r[1]], [r[0] + r[2], r[1] + r[3]], [r[0], r[1] + r[3]]] }; } },
  Dreieck: { n: 3, art: 'das', aria: 'Ein Dreieck', body: () => { const c = pick([[[30, 8], [54, 50], [6, 50]], [[8, 50], [8, 10], [52, 50]], [[14, 48], [34, 8], [56, 44]]]); return { inner: `<polygon points="${pts(c)}" ${FILL}/>`, corners: c }; } },
  Kreis: { n: 0, art: 'der', aria: 'Ein Kreis', body: () => ({ inner: `<circle cx="30" cy="30" r="22" ${FILL}/>`, corners: [] }) },
  Fünfeck: { n: 5, art: 'das', aria: 'Ein Fünfeck', body: () => { const c = regular(5, 30, 32, 25); return { inner: `<polygon points="${pts(c)}" ${FILL}/>`, corners: c }; } },
  Sechseck: { n: 6, art: 'das', aria: 'Ein Sechseck', body: () => { const c = regular(6, 30, 30, 25); return { inner: `<polygon points="${pts(c)}" ${FILL}/>`, corners: c }; } },
};
const flatSvg = (name, { marks = false, width = 90 } = {}) => { const b = FLAT[name].body(); return svgPic(60, 60, FLAT[name].aria, b.inner + (marks ? dots(b.corners) : ''), width); };
// Alle vier Grundformen in einer Reihe
const formsRow = (width = 140) => svgPic(250, 60, 'Quadrat, Rechteck, Dreieck und Kreis nebeneinander', ['Quadrat', 'Rechteck', 'Dreieck', 'Kreis'].map((n, i) => `<g transform="translate(${i * 64} 0)">${FLAT[n].body().inner}</g>`).join(''), width);

// Körper (Bild 60 mal 60), verdeckte Kanten gestrichelt
const SOLID_SVG = {
  Würfel: { aria: 'Ein Würfel', inner: `<polygon points="8,22 36,22 36,50 8,50" ${FILL}/><polygon points="8,22 22,8 50,8 36,22"/><polygon points="36,22 50,8 50,36 36,50"/><path d="M22 8V36M22 36H50M22 36L8 50" ${DASH}/>` },
  Quader: { aria: 'Ein Quader', inner: `<polygon points="4,26 40,26 40,52 4,52" ${FILL}/><polygon points="4,26 20,10 56,10 40,26"/><polygon points="40,26 56,10 56,36 40,52"/><path d="M20 10V36M20 36H56M20 36L4 52" ${DASH}/>` },
  Kugel: { aria: 'Eine Kugel', inner: `<circle cx="30" cy="30" r="23" ${FILL}/><path d="M7 30A23 7 0 0 0 53 30"/><path d="M7 30A23 7 0 0 1 53 30" ${DASH}/>` },
  Zylinder: { aria: 'Ein Zylinder', inner: `<path d="M12 14V46A18 6 0 0 0 48 46V14" ${FILL}/><ellipse cx="30" cy="14" rx="18" ry="6" ${FILL}/>` },
  Kegel: { aria: 'Ein Kegel', inner: `<path d="M10 46L30 6L50 46A20 7 0 0 1 10 46Z" ${FILL}/><path d="M10 46A20 7 0 0 0 50 46"/>` },
  Pyramide: { aria: 'Eine Pyramide', inner: `<polygon points="30,6 8,46 36,46" ${FILL}/><path d="M30 6L52 36L36 46"/><path d="M30 6L24 36M24 36L8 46M24 36H52" ${DASH}/>` },
};
const solidSvg = (name, width = 90) => svgPic(60, 60, SOLID_SVG[name].aria, SOLID_SVG[name].inner, width);
const solidsRow = (names, width = 140) => svgPic(64 * names.length, 60, 'Körper nebeneinander', names.map((n, i) => `<g transform="translate(${i * 64} 0)">${SOLID_SVG[n].inner}</g>`).join(''), width);

// Ziffern aus Strichen (damit beim Vorlesen keine Zahlenreihe vom Lineal mitgesprochen wird)
const SEG = ['abcdef', 'bc', 'abged', 'abgcd', 'fgbc', 'afgcd', 'afgedc', 'abc', 'abcdefg', 'abcdfg'];
const digitPath = (d, x, y, w = 4, h = 8) => {
  const m = h / 2;
  const seg = { a: `M${x} ${y}h${w}`, b: `M${x + w} ${y}v${m}`, c: `M${x + w} ${y + m}v${m}`, d: `M${x} ${y + h}h${w}`, e: `M${x} ${y + m}v${m}`, f: `M${x} ${y}v${m}`, g: `M${x} ${y + m}h${w}` };
  return [...SEG[d]].map((s) => seg[s]).join('');
};
const numberPath = (n, cx, y) => { const ds = String(n).split('').map(Number); const total = ds.length * 4 + (ds.length - 1) * 2.5; return ds.map((d, i) => digitPath(d, cx - total / 2 + i * 6.5, y)).join(''); };
// Lineal von 0 bis 10 cm; bars sind Längen in cm, die von 0 aus gezeichnet werden
const rulerSvg = (bars, label = 'Ein Lineal mit Streifen, die bei null beginnen') => {
  const x0 = 12; const u = 11.6; const barH = 9;
  const ry = 4 + bars.length * (barH + 4) - 2; const h = ry + 26;
  const body = bars.map((len, i) => `<rect x="${x0}" y="${4 + i * (barH + 4)}" width="${+(len * u).toFixed(1)}" height="${barH}" ${FILL}/>`).join('');
  const ticks = Array.from({ length: 21 }, (_, i) => `M${+(x0 + i * u / 2).toFixed(1)} ${ry}v${i % 2 ? 4 : 8}`).join('');
  const nums = Array.from({ length: 11 }, (_, i) => numberPath(i, +(x0 + i * u).toFixed(1), ry + 12)).join('');
  return svgPic(140, h, label, `${body}<rect x="2" y="${ry}" width="136" height="24" stroke-width="1.5"/><path d="${ticks}" stroke-width="1"/><path d="${nums}" stroke-width="1"/>`, 140);
};

// Rasterbild für Spiegelaufgaben: cols mal rows Kästchen, gestrichelte Achse in der Mitte
const gridSvg = (cols, rows, filled, label) => {
  const c = 8; const cells = filled.map(([x, y]) => `<rect x="${1 + x * c}" y="${1 + y * c}" width="${c}" height="${c}" ${FILL} stroke-width=".8"/>`).join('');
  const lines = Array.from({ length: cols + 1 }, (_, i) => `M${1 + i * c} 1v${rows * c}`).join('') + Array.from({ length: rows + 1 }, (_, i) => `M1 ${1 + i * c}h${cols * c}`).join('');
  return svgPic(cols * c + 2, rows * c + 2, label, `${cells}<path d="${lines}" stroke-width=".5" opacity=".5"/><path d="M${1 + (cols / 2) * c} -1v${rows * c + 4}" stroke-width="1.5" ${DASH}/>`, Math.min(140, (cols * c + 2) * 2.4));
};

// Reihe aus einfachen Formen; null ist die Lücke
const MINI = {
  Kreis: (x) => `<circle cx="${x + 9}" cy="11" r="7"/>`,
  Dreieck: (x) => `<polygon points="${x + 9},3 ${x + 16},18 ${x + 2},18"/>`,
  Quadrat: (x) => `<rect x="${x + 3}" y="5" width="12" height="12"/>`,
};
const patternSvg = (seq) => svgPic(19 * seq.length, 22, 'Eine Reihe aus Formen, an der letzten Stelle ist eine Lücke', seq.map((s, i) => (s ? MINI[s](i * 19) : `<rect x="${i * 19 + 2}" y="3" width="14" height="16" rx="3" ${DASH} stroke-width="1.5"/>`)).join(''), 140);
const stairsSvg = () => svgPic(84, 30, 'Drei Treppen aus Klötzchen, die erste mit einer, die zweite mit zwei, die dritte mit drei Stufen', [1, 2, 3].map((n, k) => { const x0 = [1, 14, 36][k]; let s = ''; for (let col = 0; col < n; col++) for (let row = 0; row <= col; row++) s += `<rect x="${x0 + col * 7}" y="${22 - row * 7}" width="7" height="7" ${FILL} stroke-width="1"/>`; return s; }).join(''), 140);

export const GEO = { svgPic, flatSvg, formsRow, solidSvg, solidsRow, rulerSvg, gridSvg, patternSvg, stairsSvg, FILL };

export default {
  skills: {
    split: { name: 'Zahlen zerlegen', quick: true, rule: '<b>Zerlegen:</b> Jede Zahl lässt sich in zwei Teile zerlegen. Zahlen ab 10 bestehen aus Zehnern und Einern: 17 = 10 + 7.', gen() {
      const t = ri(0, 3);
      if (t === 0) {
        const n = ri(4, 10); const a = ri(1, n - 1);
        return N(num(`Zerlege ${n}: ${n} = ${a} + ▢`, n - a, { steps: [`Wie viel fehlt von ${a} bis ${n}? ${n} ${M} ${a} = ${n - a}.`, `Probe: ${a} + ${n - a} = ${n}.`],
          traps: [T(n, `${n} ist die ganze Zahl. Gesucht ist der zweite Teil, der zu ${a} dazukommt.`), T(n + a, 'Du hast alles zusammengezählt. Gesucht ist der Teil, der noch fehlt.'), T(n - a + 1, 'Um eins verzählt. Zähle von der Zahl danach weiter.')] }));
      }
      if (t === 1) {
        const n = ri(11, 19); const e = n - 10;
        if (Math.random() < 0.5) return N(num(`${n} = 10 + ▢`, e, { steps: [`${n} ist ein Zehner und ${e} Einer.`, `${n} = 10 + ${e}`], traps: [T(1, `Die 1 vorne ist der Zehner, und der steht schon da (10). Gesucht sind die Einer: ${e}.`), T(n, `${n} ist die ganze Zahl. Gesucht ist, was zu 10 dazukommt.`), T(e + 1, 'Um eins verzählt. Die Einer sind die hintere Ziffer.')] }));
        return N(num(`${n} = ▢ + ${e}`, 10, { steps: [`${n} ist ein Zehner und ${e} Einer.`, `Ein Zehner sind 10 Einer, also ${n} = 10 + ${e}.`], traps: [T(1, 'Ein Zehner ist 10 wert, nicht 1. Ins Kästchen kommt die ganze Zehn.'), T(n, `${n} ist die ganze Zahl. Gesucht ist, was zu ${e} dazukommt.`), T(n + e, 'Du hast zusammengezählt. Gesucht ist der Teil, der fehlt.')] }));
      }
      if (t === 2) {
        const n = ri(10, 20); const z = Math.floor(n / 10); const e = n % 10;
        const tr = (a, b, why) => ({ v: [a, b], why, show: `${a} Zehner und ${b} Einer` });
        return { kind: 'pair', labels: ['Zehner', 'Einer'], q: `${n} hat ▢ Zehner und ▢ Einer. (Zehner; Einer)`, vals: [z, e], placeholder: 'z. B. 1; 4', show: `${z} Zehner und ${e} Einer`,
          steps: [`Die vordere Ziffer zeigt die Zehner: ${z}.`, `Die hintere Ziffer zeigt die Einer: ${e}.`, `${n} = ${z * 10} + ${e}`],
          traps: [tr(e, z, 'Vertauscht: Die vordere Ziffer sind die Zehner, die hintere die Einer.'), tr(z * 10, e, `Gefragt ist, wie viele Zehner. ${z * 10} ist ${z === 1 ? 'ein Zehner' : `${z} Zehner`}, also ${z}.`), tr(0, n, 'Nicht alles als Einer zählen. Je 10 Einer bündelst du zu einem Zehner.'), tr(z + 1, e > 0 ? e - 1 : e + 1, `Schau genau auf die Ziffern: vorne ${z}, hinten ${e}.`)] };
      }
      const n = ri(11, 20); const z = Math.floor(n / 10); const e = n % 10;
      return N(num(`${z} Zehner und ${e} Einer = ▢`, n, { steps: [`${z} Zehner sind ${z * 10}.`, `${z * 10} + ${e} = ${n}`],
        traps: [T(z + e, `Ein Zehner ist 10 wert, nicht 1. ${z * 10} + ${e} = ${n}.`), e > 0 && T(e * 10 + z, 'Vertauscht: Die Zehner schreibst du vorne, die Einer hinten.')] }));
    } },

    wall20: { name: 'Rechenmauer bis 20', rule: '<b>Rechenmauer:</b> Jeder Stein ist die Summe der zwei Steine darunter. Fehlt ein Stein unten, rechnest du minus.', gen() {
      return wallTask(3, 1, 7, 8, 20);
    } },

    wall: { name: 'Rechenmauer bis 100', rule: '<b>Rechenmauer:</b> Jeder Stein ist die Summe der zwei Steine darunter. Fehlt ein Stein unten, rechnest du minus.', gen() {
      return Math.random() < 0.6 ? wallTask(3, 4, 35, 30, 100) : wallTask(4, 1, 15, 25, 100);
    } },

    wallBig: { name: 'Rechenmauer bis 1000', rule: '<b>Rechenmauer:</b> Jeder Stein ist die Summe der zwei Steine darunter. Fehlt ein Stein unten, rechnest du minus.', gen() {
      return Math.random() < 0.55 ? wallTask(3, 25, 320, 300, 1000) : wallTask(4, 12, 160, 300, 1000);
    } },

    tower: { name: 'Malturm', rule: '<b>Malturm:</b> Hinauf nimmst du das Ergebnis jedes Mal mit der nächsten Zahl mal, hinunter teilst du. Unten kommt wieder die Startzahl heraus.', gen() {
      return Math.random() < 0.7 ? towerTask(ri(1, 4), [2, 3, 4]) : towerTask(ri(2, 9), pick([[2, 5], [3, 3], [2, 2, 2], [5, 2]]));
    } },

    towerBig: { name: 'Malturm mit großen Zahlen', rule: '<b>Malturm:</b> Hinauf mal, hinunter durch. Große Zahlen zerlegst du: 37 · 4 = 30 · 4 + 7 · 4.', gen() {
      const [lo, hi, fs] = pick([[11, 41, [2, 3, 4]], [11, 16, [3, 4, 5]], [11, 16, [2, 5, 6]], [11, 49, [4, 5]], [12, 24, [5, 8]], [2, 8, [2, 3, 4, 5]]]);
      return towerTask(ri(lo, hi), fs);
    } },

    halfWritten: { name: 'Halbschriftlich multiplizieren', rule: '<b>Halbschriftlich mal:</b> Zerlege in Zehner und Einer, nimm beide mal und zähle zusammen: 6 · 47 = 6 · 40 + 6 · 7.', gen() {
      const a = ri(3, 9); let b; do b = ri(12, 99); while (b % 10 === 0);
      const z = b - (b % 10); const e = b % 10; const v = a * b;
      if (Math.random() < 0.3) {
        return N(num(`${a} · ${b} = ${a * z} + ▢`, a * e, { steps: [`${a} · ${b} = ${a} · ${z} + ${a} · ${e}`, `${a} · ${z} = ${a * z} steht schon da. Es fehlt ${a} · ${e} = ${a * e}.`],
          traps: [T(e, `Die Einer musst du auch mit ${a} malnehmen: ${a} · ${e} = ${a * e}.`), T(v, `${v} ist das ganze Ergebnis. Gesucht ist nur der Teil ${a} · ${e}.`)] }));
      }
      return N(num(`${a} · ${b} (halbschriftlich)`, v, { steps: [`Zerlege ${b} in ${z} und ${e}.`, `${a} · ${z} = ${a * z} (denn ${a} · ${z / 10} = ${a * z / 10}, dann eine Null dazu)`, `${a} · ${e} = ${a * e}`, `${a * z} + ${a * e} = ${v}`],
        traps: [T(a * z + e, `Die Einer vergessen malzunehmen: Auch die ${e} muss mal ${a} gerechnet werden.`), T(a * (z / 10) + a * e, `Bei ${a} · ${z} fehlt die Null: Das sind ${a * z}, nicht ${a * z / 10}.`), T(a + b, 'Du hast plus statt mal gerechnet.')] }));
    } },

    halfAddSub: { name: 'Plus und Minus bis 1000', rule: '<b>Schrittweise rechnen:</b> Zerlege die zweite Zahl in Hunderter, Zehner und Einer und rechne Schritt für Schritt.', gen() {
      const plus = Math.random() < 0.5;
      let a; let b;
      if (plus) { a = ri(120, 780); b = ri(105, 999 - a); } else { a = ri(320, 990); b = ri(105, a - 30); }
      const parts = placeParts(b);
      const steps = []; let cur = a;
      for (const p of parts) { const nx = plus ? cur + p : cur - p; steps.push(`${cur} ${plus ? '+' : M} ${p} = ${nx}`); cur = nx; }
      const v = plus ? a + b : a - b;
      return N(num(`${a} ${plus ? '+' : M} ${b}`, v, { steps: [`Zerlege ${b} in ${parts.join(', ')}.`, ...steps],
        traps: [plus ? T(noCarry(a, b), 'Übertrag vergessen: Wenn Einer oder Zehner 10 oder mehr ergeben, wird die nächste Stelle um 1 größer.') : T(noBorrow(a, b), 'In einer Stelle hast du die kleinere Ziffer von der größeren abgezogen. Rechne schrittweise über den Zehner oder Hunderter.'),
          T(plus ? a - b : a + b, plus ? 'Du hast minus gerechnet.' : 'Du hast plus gerechnet.')] }));
    } },

    placeValue: { name: 'Hunderter, Zehner, Einer', quick: true, rule: '<b>Stellenwert:</b> Jede Ziffer zählt so viel wie ihre Stelle: Hunderter, Zehner oder Einer. 10 Einer sind 1 Zehner, 10 Zehner sind 1 Hunderter.', gen() {
      const t = ri(0, 3);
      const h = ri(1, 9); let z = ri(0, 9); const e = ri(0, 9);
      if (t === 0) {
        if (Math.random() < 0.4) z = 0;
        const n = 100 * h + 10 * z + e;
        const q = [`${h} H`, z ? `${z} Z` : '', e ? `${e} E` : ''].filter(Boolean).join(' ');
        return N(num(`${q} = ▢`, n, { steps: [`${h} H = ${100 * h}${z ? `, ${z} Z = ${10 * z}` : ', keine Zehner'}${e ? `, ${e} E = ${e}` : ', keine Einer'}`, `${100 * h} + ${10 * z} + ${e} = ${n}`],
          traps: [(!z || !e) && T(Number(`${h}${z || ''}${e || ''}`), `Eine Stelle ist leer. Dort schreibst du 0, sonst rutschen die Ziffern an die falsche Stelle: ${n}.`), T(h + z + e, 'Du hast nur die Ziffern zusammengezählt. Ein Hunderter ist 100 wert, ein Zehner 10.')] }));
      }
      if (t === 1) {
        const n = 100 * h + 10 * z + e; const order = pick([['E', 'H', 'Z'], ['Z', 'E', 'H'], ['E', 'Z', 'H']]);
        const val = { H: h, Z: z, E: e };
        const written = Number(order.map((k) => val[k]).join(''));
        return N(num(`${order.map((k) => `${val[k]} ${k}`).join(' ')} = ▢`, n, { steps: ['Ordne zuerst: Hunderter vorne, dann Zehner, dann Einer.', `${h} H ${z} Z ${e} E = ${n}`],
          traps: [T(written, 'Du hast die Ziffern einfach der Reihe nach hingeschrieben. Schau auf die Buchstaben: H kommt vorne hin, E ganz hinten.'), T(h + z + e, 'Du hast nur die Ziffern zusammengezählt. Ein Hunderter ist 100 wert, ein Zehner 10.')] }));
      }
      if (t === 2) {
        const n = 100 * h + 10 * ri(1, 9) + ri(1, 9); const ds = digits(n); const pos = ri(0, 2); const d = ds[pos];
        if (ds.filter((x) => x === d).length > 1) return null;
        const v = d * 10 ** (2 - pos); const place = ['Hundertern', 'Zehnern', 'Einern'][pos];
        return N(num(`Wie viel ist die Ziffer ${d} in ${n} wert?`, v, { steps: [`Die ${d} steht bei den ${place}.`, `Also ist sie ${v} wert.`],
          traps: [T(d, `Die Ziffer allein ist ${d}, aber sie steht bei den ${place}. Dort ist sie ${v} wert.`), T(d * 10 ** pos, 'Die Stellen von rechts zählen: ganz rechts Einer, dann Zehner, dann Hunderter.'), T(n, `Gefragt ist nur, was die Ziffer ${d} wert ist, nicht die ganze Zahl.`)] }));
      }
      const zz = ri(10, 19); const n = 100 * h + 10 * zz + e;
      if (n > 999) return null;
      return N(num(`${h} H ${zz} Z ${e} E = ▢`, n, { steps: [`${zz} Zehner sind ${zz * 10}, also 1 Hunderter und ${zz - 10} Zehner.`, `${100 * h} + ${zz * 10} + ${e} = ${n}`],
        traps: [T(Number(`${h}${zz}${e}`), `${zz} Zehner passen nicht in eine Stelle. 10 Zehner bündelst du zu einem Hunderter.`), T(100 * h + 10 * (zz - 10) + e, `Der Hunderter aus den ${zz} Zehnern fehlt. 10 Zehner sind 1 Hunderter.`)] }));
    } },

    money2: { name: 'Rechnen mit Geld', rule: '<b>Geld:</b> 1 € = 100 Cent. Beim Zurückgeben ergänzt du vom Preis bis zum Schein.', gen() {
      const t = ri(0, 2);
      if (t === 0) {
        const [x, y] = pick([['Ein Ball', 'ein Buch'], ['Ein Rucksack', 'eine Trinkflasche'], ['Ein Puzzle', 'ein Malkasten'], ['Eine Mütze', 'ein Schal']]);
        const a = ri(11, 69); const b = ri(5, 99 - a);
        const at = a - (a % 10); const bt = b - (b % 10);
        return N(num(`${x} kostet ${a} €, ${y} kostet ${b} €. Wie viel kostet beides zusammen?`, a + b, { unit: '€', steps: [`Zehner: ${at} + ${bt} = ${at + bt}`, `Einer: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}`, `Zusammen: ${at + bt} + ${(a % 10) + (b % 10)} = ${a + b} €`],
          traps: [(a % 10) + (b % 10) >= 10 && T(noCarry(a, b), 'Übertrag vergessen: Die Einer ergeben 10 oder mehr, also kommt ein Zehner dazu.'), T(Math.abs(a - b), 'Zusammen heißt plus, nicht minus.')] }));
      }
      if (t === 1) {
        const note = pick([20, 50, 50, 100]); const p = ri(Math.round(note * 0.3), note - 2);
        const v = note - p; const up = p + ((10 - (p % 10)) % 10);
        return N(num(`Du zahlst mit einem ${note}-€-Schein. Das Spiel kostet ${p} €. Wie viel Geld bekommst du zurück?`, v, { unit: '€', steps: [`Ergänze von ${p} bis ${note}: ${p} + ▢ = ${note}`, ...(p % 10 ? [`Zuerst bis zum nächsten Zehner: ${p} + ${up - p} = ${up}`, `Dann bis ${note}: ${up} + ${note - up} = ${note}`, `Zusammen: ${up - p} + ${note - up} = ${v}`] : [`${note} ${M} ${p} = ${v}`]), `Du bekommst ${v} € zurück. Probe: ${p} + ${v} = ${note}`],
          traps: [T(note + p, 'Du hast zusammengezählt. Zurück bekommst du nur, was vom Schein übrig bleibt.'), p % 10 && T(v + 10, 'Die Einer machen schon einen Zehner voll. Ergänze zuerst bis zum nächsten Zehner.'), T(p, `${p} € kostet das Spiel. Gesucht ist, was du zurückbekommst.`)] }));
      }
      const c = ri(2, 19) * 5; const v = 100 - c;
      return N(num(`Du hast 1 €. Ein Eis kostet ${c} Cent. Wie viel Cent bleiben dir?`, v, { unit: 'c', steps: ['1 € = 100 Cent', `100 ${M} ${c} = ${v}`, `Probe: ${c} + ${v} = 100`],
        traps: [c % 10 && T((10 - Math.floor(c / 10)) * 10 + (10 - (c % 10)), 'Die Einer machen schon einen Zehner voll. Bei den Zehnern brauchst du nur bis 9 zu ergänzen.'), T(c, `${c} Cent kostet das Eis. Gesucht ist, was übrig bleibt.`), T(100 + c, 'Du hast zusammengezählt. Gesucht ist, was übrig bleibt.')] }));
    } },

    clock: { name: 'Uhrzeit und Zeitspanne', rule: '<b>Uhrzeit:</b> Eine Stunde hat 60 Minuten. Rechne zuerst bis zur vollen Stunde, dann weiter.', gen() {
      const t = ri(0, 2);
      const h = pick([7, 8, 9, 10, 11, 13, 14, 15, 16, 17]);
      if (t === 0) {
        const m = pick([0, 15, 30, 45, ri(1, 11) * 5]); let d; do d = pick([10, 15, 20, 25, 30, 35, 40, 45, 50]); while (m + d < 60 && Math.random() < 0.7);
        const [eh, em] = asTime(h * 60 + m + d); const over = m + d >= 60; const toFull = 60 - m;
        const steps = over
          ? [`Von ${clockText(h, m)} bis ${clockText(h + 1, 0)} sind es ${toFull} Minuten.`, `Von den ${d} Minuten bleiben noch ${d - toFull}.`, `${clockText(h + 1, 0)} und noch ${d - toFull} Minuten: ${clockText(eh, em)}.`]
          : [`${m} + ${d} = ${m + d} Minuten. Das ist weniger als 60, die Stunde bleibt gleich.`, `Es ist dann ${clockText(eh, em)}.`];
        const traps = [timeTrap(...asTime(h * 60 + m - d), `Du hast zurückgerechnet. „In ${d} Minuten“ heißt später, also weiter.`), timeTrap(...asTime(h * 60 + m + d + 60), 'Eine Stunde zu viel. Zähle nur die Minuten dazu.')];
        if (over) traps.unshift({ v: [h, m + d], why: `Eine Stunde hat 60 Minuten. ${m + d} Minuten gibt es auf der Uhr nicht, ab 60 beginnt die nächste Stunde.`, show: `${h}:${m + d} Uhr` }, timeTrap(h, em, 'Die Minuten stimmen, aber du bist über die volle Stunde gekommen. Die Stunde wird um 1 größer.'));
        else traps.push(timeTrap(...asTime(h * 60 + m + d + 5), 'Um 5 Minuten verzählt.'));
        return { kind: 'pair', labels: ['Stunde', 'Minute'], pairStyle: 'clock', q: `Es ist ${clockText(h, m)}. Wie spät ist es in ${d} Minuten? (Stunde; Minute)`, vals: [eh, em], placeholder: 'z. B. 9; 15', show: clockText(eh, em), steps, traps };
      }
      if (t === 1) {
        const m = pick([0, 5, 10, 15, 20, 30, ri(1, 11) * 5]); let d; do d = pick([10, 15, 20, 25, 30, 35, 40, 45]); while (m - d >= 0 && Math.random() < 0.7);
        const [eh, em] = asTime(h * 60 + m - d); const under = m - d < 0;
        const steps = under
          ? (m ? [`Von ${clockText(h, m)} zurück bis ${clockText(h, 0)} sind es ${m} Minuten.`, `Von den ${d} Minuten fehlen noch ${d - m}.`, `${d - m} Minuten vor der vollen Stunde: 60 ${M} ${d - m} = ${em}, also ${clockText(eh, em)}.`]
            : [`Es ist genau ${clockText(h, 0)}. Eine Stunde hat 60 Minuten.`, `${d} Minuten vor der vollen Stunde: 60 ${M} ${d} = ${em}, also ${clockText(eh, em)}.`])
          : [`${m} ${M} ${d} = ${m - d} Minuten. Die Stunde bleibt gleich.`, `Es war ${clockText(eh, em)}.`];
        const traps = [timeTrap(...asTime(h * 60 + m + d), `„Vor ${d} Minuten“ heißt früher. Du musst zurückrechnen, nicht weiter.`), timeTrap(...asTime(h * 60 + m - d - 60), 'Eine Stunde zu weit zurück. Zähle nur die Minuten zurück.')];
        if (under) traps.unshift({ v: [h - 1, 100 + m - d], why: 'Eine Stunde hat 60 Minuten, nicht 100. Rechne zuerst zurück bis zur vollen Stunde.', show: `${h - 1}:${100 + m - d} Uhr` }, timeTrap(h, em, 'Die Minuten stimmen, aber du bist über die volle Stunde zurückgegangen. Die Stunde wird um 1 kleiner.'));
        else traps.push(timeTrap(...asTime(h * 60 + m - d - 5), 'Um 5 Minuten verzählt.'));
        return { kind: 'pair', labels: ['Stunde', 'Minute'], pairStyle: 'clock', q: `Es ist ${clockText(h, m)}. Wie spät war es vor ${d} Minuten? (Stunde; Minute)`, vals: [eh, em], placeholder: 'z. B. 8; 45', show: clockText(eh, em), steps, traps };
      }
      const m = pick([15, 30, 45, ri(1, 11) * 5]); const d = ri(3, 22) * 5;
      const [eh, em] = asTime(h * 60 + m + d);
      const steps = [];
      if (eh === h) steps.push(`Die Stunde bleibt gleich: ${em} ${M} ${m} = ${d} Minuten.`);
      else {
        steps.push(`Von ${clockText(h, m)} bis ${clockText(h + 1, 0)}: ${60 - m} Minuten.`);
        if (eh > h + 1) steps.push(`Von ${clockText(h + 1, 0)} bis ${clockText(eh, 0)}: ${(eh - h - 1) * 60} Minuten.`);
        if (em) steps.push(`Von ${clockText(eh, 0)} bis ${clockText(eh, em)}: ${em} Minuten.`);
        steps.push(`Zusammen: ${d} Minuten${d >= 60 ? ` (${Math.floor(d / 60)} h${d % 60 ? ` ${d % 60} min` : ''})` : ''}.`);
      }
      return N(num(`Von ${clockText(h, m)} bis ${clockText(eh, em)}. Wie viele Minuten sind das?`, d, { unit: 'min', steps,
        traps: [eh !== h && T((eh * 100 + em) - (h * 100 + m), 'Eine Stunde hat 60 Minuten, nicht 100. Rechne zuerst bis zur vollen Stunde.'), T(Math.abs(em - m), 'Du hast nur die Minuten abgezogen und die Stunden vergessen.'), T(d + 60, 'Eine Stunde zu viel gezählt.')] }));
    } },

    colDiv2: { name: 'Durch zweistellige Zahl dividieren', rule: '<b>Schriftlich durch eine zweistellige Zahl:</b> Mit einem Überschlag schätzen, malnehmen, bis zur Zahl ergänzen, nächste Ziffer herunterholen.', gen() {
      let d; do d = ri(12, 39); while (d % 10 === 0);
      let q; do q = pick([ri(12, 99), ri(102, 399)]); while (q * d > 9900);
      if (Math.random() < 0.25) { const s = String(q); if (s.length === 3) q = Number(`${s[0]}0${s[2]}`); }
      const rest = Math.random() < 0.5; const r = rest ? ri(1, d - 1) : 0; const n = q * d + r;
      const steps = [...div2Steps(n, d), `Ergebnis: ${q}${r ? ` Rest ${r}` : ''}. Probe: ${q} · ${d}${r ? ` + ${r}` : ''} = ${n}`];
      const noZero = Number(String(q).replace(/0/g, ''));
      if (!rest) {
        return N(num(`${fmt(n)} : ${d}`, q, { steps,
          traps: [noZero !== q && T(noZero, `Eine Null im Ergebnis vergessen: Wenn ${d} nicht hineinpasst, schreibe 0 ins Ergebnis.`), T(q + 1, `Probe: ${q + 1} · ${d} = ${(q + 1) * d}. Das ist mehr als ${fmt(n)}.`), T(q - 1, `Probe: ${q - 1} · ${d} = ${(q - 1) * d}. Da bleibt noch ${d} übrig, also passt ${d} noch einmal hinein.`)] }));
      }
      const tr = [{ v: [q - 1, r + d], why: `Der Rest ${r + d} ist größer als ${d}. Da passt ${d} noch einmal hinein.` }];
      if (noZero !== q) tr.push({ v: [noZero, r], why: `Eine Null im Ergebnis vergessen: Wenn ${d} nicht hineinpasst, schreibe 0 ins Ergebnis.` });
      tr.push({ v: [q, d - r], why: `Der Rest ist das, was übrig bleibt: ${fmt(n)} ${M} ${q * d} = ${r}.` });
      return { kind: 'rest', q: `${fmt(n)} : ${d}`, vals: [q, r], dividend: n, divisor: d, placeholder: 'z. B. 47 R 5', steps, traps: tr };
    } },

    area4: { name: 'Umfang und Fläche', rule: '<b>Umfang:</b> einmal rundherum, alle Seiten zusammen (cm). <b>Fläche:</b> wie viele Zentimeterquadrate hineinpassen, Länge mal Breite (cm²).', gen() {
      const t = ri(0, 7);
      let a = ri(3, 12); const b = ri(2, 9); if (a === b) a += 1;
      if (t === 0) return N(num(`Ein Rechteck ist ${a} cm lang und ${b} cm breit. Wie groß ist seine Fläche?`, a * b, { unit: 'cm²', steps: [`In eine Reihe passen ${a} Zentimeterquadrate, und es gibt ${b} Reihen.`, `${a} · ${b} = ${a * b} cm²`],
        traps: [T(2 * a + 2 * b, 'Das ist der Umfang (rundherum). Die Fläche ist Länge mal Breite.'), T(a + b, 'Länge plus Breite ist weder Fläche noch Umfang. Fläche: Länge mal Breite.')] }));
      if (t === 1) return N(num(`Ein Rechteck ist ${a} cm lang und ${b} cm breit. Wie groß ist sein Umfang?`, 2 * a + 2 * b, { unit: 'cm', steps: ['Umfang heißt: einmal rundherum. Ein Rechteck hat 2 lange und 2 kurze Seiten.', `${a} + ${b} + ${a} + ${b} = ${2 * a + 2 * b} cm`],
        traps: [T(a * b, 'Das ist die Fläche. Für den Umfang zählst du alle vier Seiten zusammen.'), T(a + b, 'Nur zwei Seiten gezählt. Ein Rechteck hat vier Seiten.'), T(2 * a + b, 'Eine Seite vergessen. Zähle alle vier Seiten.')] }));
      a = ri(2, 10);
      if (t === 2) return N(num(`Ein Quadrat hat eine Seitenlänge von ${a} cm. Wie groß ist seine Fläche?`, a * a, { unit: 'cm²', steps: ['Beim Quadrat sind alle Seiten gleich lang.', `${a} Reihen mit je ${a} Zentimeterquadraten: ${a} · ${a} = ${a * a} cm²`],
        traps: [T(4 * a, 'Das ist der Umfang. Die Fläche ist Seite mal Seite.'), T(2 * a, `Seite mal Seite heißt ${a} · ${a}, nicht ${a} · 2.`)] }));
      if (t === 3) return N(num(`Ein Quadrat hat eine Seitenlänge von ${a} cm. Wie groß ist sein Umfang?`, 4 * a, { unit: 'cm', steps: ['Ein Quadrat hat 4 gleich lange Seiten.', `4 · ${a} = ${4 * a} cm`],
        traps: [T(a * a, 'Das ist die Fläche. Für den Umfang zählst du die vier Seiten zusammen.'), T(2 * a, 'Nur zwei Seiten gezählt. Ein Quadrat hat vier Seiten.')] }));
      if (t === 4) {
        const l = ri(3, 10); const w = ri(2, 9); const A = l * w;
        return N(num(`Ein Rechteck hat eine Fläche von ${A} cm². Es ist ${l} cm lang. Wie breit ist es?`, w, { unit: 'cm', steps: [`Länge mal Breite = Fläche: ${l} · ▢ = ${A}`, `${A} : ${l} = ${w} cm`, `Probe: ${l} · ${w} = ${A}`],
          traps: [T(A - l, `Du hast minus gerechnet. Die Fläche ist ${l} mal die Breite, also teilen: ${A} : ${l}.`), T(A * l, 'Du hast mal gerechnet. Gesucht ist eine Seite, also teilen.')] }));
      }
      if (t === 5) {
        const s = ri(2, 12);
        return N(num(`Ein Quadrat hat einen Umfang von ${4 * s} cm. Wie lang ist eine Seite?`, s, { unit: 'cm', steps: ['Der Umfang besteht aus 4 gleich langen Seiten.', `${4 * s} : 4 = ${s} cm`],
          traps: [T(2 * s, 'Ein Quadrat hat vier Seiten, nicht zwei. Teile durch 4.'), T(4 * s - 4, 'Du hast 4 abgezogen. Teile den Umfang durch 4.')] }));
      }
      const c = ri(3, 7); const r = ri(2, 4);
      const grid = `<span style="display:block;font-size:.55em;line-height:1.05;margin:.2em 0">${Array.from({ length: r }, () => '🟦'.repeat(c)).join('<br>')}</span>`;
      if (t === 6) return N(num(`Jedes Kästchen ist 1 cm² groß. Wie groß ist die Fläche?${grid}`, c * r, { unit: 'cm²', steps: [`Es sind ${r} Reihen mit je ${c} Kästchen.`, `${r} · ${c} = ${c * r} Kästchen, also ${c * r} cm²`],
        traps: [T(2 * c + 2 * r, 'Du bist am Rand rundherum gegangen. Das ist der Umfang. Für die Fläche zählst du alle Kästchen.'), T(c + r, 'Nur eine Reihe und eine Spalte gezählt. Zähle alle Kästchen: Reihen mal Kästchen pro Reihe.')] }));
      return N(num(`Jedes Kästchen ist 1 cm lang und 1 cm breit. Wie groß ist der Umfang der ganzen Figur?${grid}`, 2 * c + 2 * r, { unit: 'cm', steps: [`Die Figur ist ${c} cm lang und ${r} cm breit.`, `Rundherum: ${c} + ${r} + ${c} + ${r} = ${2 * c + 2 * r} cm`],
        traps: [T(c * r, 'Das ist die Fläche (alle Kästchen). Für den Umfang gehst du nur am Rand entlang.'), T(c + r, 'Nur zwei Seiten gezählt. Geh einmal ganz rundherum.'), T(2 * c + 2 * r - 4, 'Du hast die Kästchen am Rand gezählt. Für den Umfang zählst du die Kanten am Rand: Die Eckkästchen haben je zwei Kanten außen.')] }));
    } },

    fracSimple: { name: 'Halbe, Viertel, Achtel, Zehntel', quick: true, rule: '<b>Bruchteil:</b> Teile das Ganze in so viele gleiche Teile, wie unten steht. ½ von 20 heißt 20 : 2.', gen() {
      const NAME = { 2: 'Hälfte', 4: 'Viertel', 8: 'Achtel', 10: 'Zehntel' };
      if (Math.random() < 0.35) {
        const [n, d, unitBig, unit, base] = pick([[1, 2, 'h', 'min', 60], [1, 4, 'h', 'min', 60], [3, 4, 'h', 'min', 60], [1, 2, 'kg', 'g', 1000], [1, 4, 'kg', 'g', 1000], [3, 4, 'kg', 'g', 1000], [1, 8, 'kg', 'g', 1000], [1, 10, 'kg', 'g', 1000], [1, 2, 'm', 'cm', 100], [1, 4, 'm', 'cm', 100], [1, 10, 'm', 'cm', 100], [1, 2, '€', 'c', 100], [1, 4, '€', 'c', 100], [1, 10, '€', 'c', 100], [1, 2, 'km', 'm', 1000], [1, 4, 'km', 'm', 1000]]);
        const one = base / d; const v = one * n;
        return N(num(`${frac(n, d)} ${unitBig} = ▢ ${unit}`, v, { unit, steps: [`1 ${unitBig} = ${base} ${unit}`, `${base} : ${d} = ${one} ${unit}${n > 1 ? `. Davon ${n} Teile: ${n} · ${one} = ${v} ${unit}` : ''}`],
          traps: [base === 60 && T((100 / d) * n, 'Eine Stunde hat 60 Minuten, nicht 100.'), n > 1 && T(one, 'Das ist nur ein Viertel. Drei Viertel sind 3-mal so viel.'), T(d === 2 ? base / 4 : base / 2, d === 2 ? 'Das ist ein Viertel. Die Hälfte ist doppelt so viel.' : 'Das ist die Hälfte. Teile durch die Zahl unten im Bruch.')] }));
      }
      const [n, d] = pick([[1, 2], [1, 2], [1, 4], [1, 4], [3, 4], [1, 8], [1, 10], [3, 10]]);
      const q = ri(2, d === 2 ? 30 : d === 4 ? 15 : d === 8 ? 8 : 10); const total = q * d;
      const v = q * n;
      const things = pick(['Kindern', 'Äpfeln', 'Murmeln', 'Euro', 'Zuckerln', 'Seiten']);
      return N(num(`${frac(n, d)} von ${total} ${things} = ▢`, v, { steps: [`Teile ${total} in ${d} gleiche Teile: ${total} : ${d} = ${q}. Das ist ${d === 2 ? 'eine' : 'ein'} ${NAME[d]}.`, ...(n > 1 ? [`${n} Teile davon: ${n} · ${q} = ${v}`] : [])],
        traps: [T(total - d, `Du hast ${d} weggenommen. ${frac(1, d)} heißt: durch ${d} teilen.`), d !== 2 && n === 1 && T(total / 2, `Das ist die Hälfte. Ein ${NAME[d]} bekommst du mit ${total} : ${d}.`), n > 1 && T(q, `Das ist nur ein Teil. ${frac(n, d)} sind ${n} solche Teile.`), T(total * d, 'Du hast mal gerechnet. Ein Bruchteil ist kleiner als das Ganze.')] }));
    } },

    shapes: { name: 'Formen erkennen', quick: true, rule: '<b>Formen:</b> Das Quadrat hat 4 gleich lange Seiten. Das Rechteck hat 2 lange und 2 kurze Seiten. Das Dreieck hat 3 Ecken. Der Kreis ist rund und hat keine Ecken.', gen() {
      const names = ['Quadrat', 'Rechteck', 'Dreieck', 'Kreis'];
      const FEAT = { Quadrat: '4 Ecken und 4 gleich lange Seiten', Rechteck: '4 Ecken, 2 lange und 2 kurze Seiten', Dreieck: '3 Ecken und 3 Seiten', Kreis: 'keine Ecken, er ist ganz rund' };
      const cap = (s) => s[0].toUpperCase() + s.slice(1);
      const trapsFor = (right, why) => names.filter((n) => n !== right).map((n) => ({ v: n, why: why(n) }));
      const generic = (right) => (n) => (n === 'Rechteck' && right === 'Quadrat' ? 'Ein Rechteck hat zwei lange und zwei kurze Seiten. Hier sind alle vier Seiten gleich lang, das ist ein Quadrat.'
        : n === 'Quadrat' && right === 'Rechteck' ? 'Beim Quadrat sind alle vier Seiten gleich lang. Hier sind zwei Seiten länger, das ist ein Rechteck.'
        : `${cap(FLAT[n].art)} ${n} hat ${FEAT[n]}. Dieses Bild zeigt ${FLAT[right].art === 'der' ? 'einen' : 'ein'} ${right}: ${FEAT[right]}.`);
      const t = pick([0, 0, 0, 1, 1, 2]);
      if (t === 0) {
        const right = pick(names);
        return { kind: 'pick', q: `Wie heißt diese Form? Schau genau: Wie viele Ecken hat sie, und sind die Seiten gleich lang?<br>${flatSvg(right)}`, opts: names, value: right, show: right,
          steps: [FEAT[right] === FEAT.Kreis ? 'Die Form hat keine Ecken und ist rund.' : `Zähle die Ecken: ${FLAT[right].n}.`, `${cap(FLAT[right].art)} ${right} hat ${FEAT[right]}.`], traps: trapsFor(right, generic(right)) };
      }
      if (t === 1) {
        const [q, right] = pick([['Welche Form hat genau 3 Ecken?', 'Dreieck'], ['Welche Form hat keine Ecken und ist ganz rund?', 'Kreis'], ['Welche Form hat 4 gleich lange Seiten?', 'Quadrat'], ['Welche Form hat 4 Ecken, aber 2 lange und 2 kurze Seiten?', 'Rechteck'], ['Welche Form hat überhaupt keine gerade Seite?', 'Kreis']]);
        return { kind: 'pick', q: `${q}<br>${formsRow()}`, opts: names, value: right, show: right,
          steps: [`Du suchst: ${right === 'Kreis' ? 'keine Ecken' : right === 'Dreieck' ? '3 Ecken' : right === 'Quadrat' ? '4 gleich lange Seiten' : '4 Ecken, 2 lange und 2 kurze Seiten'}.`, `${cap(FLAT[right].art)} ${right} hat ${FEAT[right]}.`], traps: trapsFor(right, (n) => `${cap(FLAT[n].art)} ${n} hat ${FEAT[n]}. Das passt nicht zur Frage.`) };
      }
      const [thing, right] = pick([['Eine Pizza (von oben)', 'Kreis'], ['Eine Münze', 'Kreis'], ['Die Vorderseite von einem Heft', 'Rechteck'], ['Eine Tür', 'Rechteck'], ['Eine Fliese mit vier gleich langen Seiten', 'Quadrat'], ['Ein Dreieckstuch', 'Dreieck'], ['Ein Verkehrsschild „Vorrang geben“', 'Dreieck'], ['Ein Fensterglas mit vier gleich langen Seiten', 'Quadrat']]);
      return { kind: 'pick', q: `${thing} hat ungefähr die Form von …`, opts: names, value: right, show: right,
        steps: [`Denk an die Ecken und Seiten: ${FEAT[right]}.`, `Also ein ${right}.`], traps: trapsFor(right, (n) => `${cap(FLAT[n].art)} ${n} hat ${FEAT[n]}. Das passt hier nicht, gesucht ist ein ${right}.`) };
    } },

    corners: { name: 'Ecken und Seiten zählen', quick: true, rule: '<b>Ecken und Seiten:</b> Eine Ecke ist eine Spitze, eine Seite ist eine gerade Linie. Bei jeder Form mit geraden Seiten gibt es genau so viele Ecken wie Seiten.', gen() {
      const names = ['Dreieck', 'Quadrat', 'Rechteck', 'Fünfeck', 'Sechseck'];
      const name = pick(names); const n = FLAT[name].n;
      const t = pick([0, 0, 1, 1, 2, 3, 4]);
      if (t === 0) {
        return N(num(`Wie viele Ecken hat diese Form?<br>${flatSvg(name, { marks: true })}`, n, { steps: [`Setze auf jede Ecke einen Punkt. Das Bild zeigt es schon.`, `Zähle die Punkte: ${n}.`],
          traps: [T(n - 1, 'Um eins zu wenig: Du hast eine Ecke übersehen. Fahre mit dem Finger langsam rundherum und zähle jeden Punkt.'), T(n + 1, 'Um eins zu viel: Du hast eine Ecke doppelt gezählt. Fang bei einem Punkt an und höre bei diesem wieder auf.')] }));
      }
      if (t === 1) {
        return N(num(`Wie viele Seiten hat diese Form? Eine Seite ist eine gerade Linie von Ecke zu Ecke.<br>${flatSvg(name)}`, n, { steps: [`Fahre mit dem Finger den Rand entlang. Jede gerade Linie ist eine Seite.`, `Zähle die Linien: ${n}.`],
          traps: [T(n - 1, 'Um eins zu wenig: Du hast eine Seite übersehen. Zähle rundherum und markiere die erste Seite.'), T(n + 1, 'Um eins zu viel: Du hast eine Seite doppelt gezählt.'), T(n * 2, `Das sind Ecken und Seiten zusammen. Gefragt sind nur die Seiten: ${n}.`)] }));
      }
      if (t === 2) {
        return N(num(`Wie viele Ecken und Seiten hat die Form zusammen?<br>${flatSvg(name, { marks: true })}`, n * 2, { steps: [`Ecken: ${n}.`, `Seiten: ${n}.`, `${n} + ${n} = ${n * 2}`],
          traps: [T(n, `Das sind nur die Ecken (oder nur die Seiten). Gefragt sind beide zusammen: ${n} + ${n}.`), T(n * 2 - 1, 'Um eins verzählt. Zähle Ecken und Seiten jeweils einzeln.')] }));
      }
      if (t === 3) {
        const a = pick(['Dreieck', 'Quadrat', 'Rechteck']); const b = pick(['Quadrat', 'Fünfeck', 'Sechseck', 'Dreieck']); const sum = FLAT[a].n + FLAT[b].n;
        return N(num(`Beide Formen haben zusammen wie viele Ecken?<br>${flatSvg(a, { width: 70 })} ${flatSvg(b, { width: 70 })}`, sum, { steps: [`Die erste Form hat ${FLAT[a].n} Ecken, die zweite ${FLAT[b].n}.`, `${FLAT[a].n} + ${FLAT[b].n} = ${sum}`],
          traps: [T(FLAT[a].n, 'Das sind nur die Ecken der ersten Form. Zähle auch die zweite Form dazu.'), T(FLAT[b].n, 'Das sind nur die Ecken der zweiten Form. Zähle auch die erste Form dazu.'), T(sum - 1, 'Um eins verzählt. Zähle jede Form einzeln und zähle dann zusammen.')] }));
      }
      return N(num(`Wie viele Ecken hat ein Kreis?<br>${flatSvg('Kreis', { width: 80 })}`, 0, { steps: ['Ein Kreis ist rundherum glatt. Man kann keine Spitze finden.', 'Er hat keine Ecken: 0.'],
        traps: [T(1, 'Ein Kreis hat keine einzige Ecke, auch nicht eine. Er ist überall rund.')] }));
    } },

    solids: { name: 'Körper erkennen', rule: '<b>Körper:</b> Würfel und Quader haben Ecken und ebene Flächen. Kugel, Zylinder und Kegel haben runde Teile. Die Pyramide hat unten ein Viereck und oben eine Spitze.', gen() {
      const names = ['Würfel', 'Quader', 'Kugel', 'Zylinder', 'Kegel', 'Pyramide'];
      const PROP = { Würfel: 'hat lauter gleich große Quadrate als Flächen', Quader: 'hat Rechtecke als Flächen, nicht alle gleich lang', Kugel: 'ist ganz rund, ohne Ecken und Kanten', Zylinder: 'hat oben und unten einen Kreis und dazwischen eine runde Wand', Kegel: 'hat unten einen Kreis und oben eine Spitze', Pyramide: 'hat unten ein Viereck und oben eine Spitze, die Seiten sind Dreiecke' };
      const ART = { Würfel: 'Ein', Quader: 'Ein', Kugel: 'Eine', Zylinder: 'Ein', Kegel: 'Ein', Pyramide: 'Eine' };
      const options = (right) => { const o = [right, ...names.filter((x) => x !== right).sort(() => Math.random() - 0.5).slice(0, 3)]; return o.sort(() => Math.random() - 0.5); };
      const trapsFor = (right, opts) => opts.filter((n) => n !== right).map((n) => ({ v: n, why: n === 'Quader' && right === 'Würfel' ? 'Ein Quader ist länger als breit oder hoch. Hier sind alle Flächen gleich große Quadrate, das ist ein Würfel.'
        : n === 'Würfel' && right === 'Quader' ? 'Beim Würfel sind alle Kanten gleich lang. Hier ist eine Seite länger, das ist ein Quader.'
        : `${ART[n]} ${n} ${PROP[n]}. Das passt nicht. ${ART[right]} ${right} ${PROP[right]}.` }));
      const t = pick([0, 0, 1, 1, 2]);
      if (t === 0) {
        const right = pick(names); const opts = options(right);
        return { kind: 'pick', q: `Wie heißt dieser Körper?<br>${solidSvg(right)}`, opts, value: right, show: right, steps: ['Schau auf die Flächen, die Ecken und die runden Teile.', `Das ist ${ART[right] === 'Eine' ? 'eine' : 'ein'} ${right}.`], traps: trapsFor(right, opts) };
      }
      if (t === 1) {
        const [thing, right] = pick([['Ein Spielwürfel', 'Würfel'], ['Ein Zuckerwürfel', 'Würfel'], ['Eine Schuhschachtel', 'Quader'], ['Eine Milchpackung', 'Quader'], ['Ein Ziegelstein', 'Quader'], ['Ein Fußball', 'Kugel'], ['Eine Orange', 'Kugel'], ['Eine Konservendose', 'Zylinder'], ['Eine Kerze (rund und gerade)', 'Zylinder'], ['Eine Eistüte', 'Kegel'], ['Ein Verkehrshütchen', 'Kegel'], ['Die Pyramiden in Ägypten', 'Pyramide']]);
        const opts = options(right);
        return { kind: 'pick', q: `${thing} hat die Form von ${right === 'Pyramide' ? 'einer' : right === 'Kugel' ? 'einer' : 'einem'} …`, opts, value: right, show: right,
          steps: [`${thing}: Denk an die Flächen und Ecken.`, `${ART[right]} ${right} ${PROP[right]}.`], traps: trapsFor(right, opts) };
      }
      const [q, right] = pick([['Welcher Körper ist ganz rund und hat keine Ecke?', 'Kugel'], ['Welcher Körper hat lauter gleich große Quadrate als Flächen?', 'Würfel'], ['Welcher Körper hat unten einen Kreis und oben eine Spitze?', 'Kegel'], ['Welcher Körper hat oben und unten einen Kreis?', 'Zylinder'], ['Welcher Körper hat unten ein Viereck und oben eine Spitze?', 'Pyramide'], ['Welcher Körper hat nur Rechtecke als Flächen?', 'Quader']]);
      const opts = options(right);
      return { kind: 'pick', q: q, opts, value: right, show: right, steps: [`Du suchst: ${right === 'Kugel' ? 'ganz rund' : right === 'Würfel' ? 'lauter gleiche Quadrate' : right === 'Kegel' ? 'unten ein Kreis, oben eine Spitze' : right === 'Zylinder' ? 'oben und unten ein Kreis' : right === 'Pyramide' ? 'unten ein Viereck, oben eine Spitze' : 'nur Rechtecke'}.`, `${ART[right]} ${right} ${PROP[right]}.`], traps: trapsFor(right, opts) };
    } },

    solidFaces: { name: 'Flächen, Kanten, Ecken', rule: '<b>Würfel und Quader:</b> 6 Flächen, 12 Kanten und 8 Ecken. Eine Fläche ist eine ebene Seite, eine Kante ist eine Linie zwischen zwei Flächen, eine Ecke ist eine Spitze.', gen() {
      const t = pick([0, 0, 0, 1, 2, 3]);
      if (t === 0) {
        const [what, v] = pick([['Flächen', 6], ['Kanten', 12], ['Ecken', 8]]); const body = pick(['Würfel', 'Quader']);
        const hint = { Flächen: 'Eine Fläche ist eine ebene Seite, zum Beispiel oben oder unten.', Kanten: 'Eine Kante ist eine Linie, wo zwei Flächen zusammenstoßen. Die gestrichelten Linien liegen hinten.', Ecken: 'Eine Ecke ist eine Spitze, wo mehrere Kanten zusammenkommen. Auch die Ecke hinten zählt.' }[what];
        const steps = { Flächen: ['4 Flächen stehen rundherum, dazu kommen oben und unten.', '4 + 2 = 6'], Kanten: ['4 Kanten oben, 4 Kanten unten und 4 Kanten, die senkrecht stehen.', '4 + 4 + 4 = 12'], Ecken: ['4 Ecken oben und 4 Ecken unten.', '4 + 4 = 8'] }[what];
        const traps = { Flächen: [T(4, 'Du hast nur die Seiten rundherum gezählt. Oben und unten sind auch Flächen.'), T(8, 'Das sind die Ecken. Gefragt sind die Flächen.'), T(12, 'Das sind die Kanten. Gefragt sind die Flächen.')],
          Kanten: [T(8, 'Das sind die Ecken. Kanten sind die Linien.'), T(6, 'Das sind die Flächen. Gefragt sind die Linien zwischen den Flächen.'), T(9, 'Du hast nur die durchgezogenen Linien gezählt. Die 3 gestrichelten Kanten liegen hinten und zählen auch.'), T(4, 'Das sind nur die Kanten, die senkrecht stehen. Oben und unten kommen noch je 4 dazu.')],
          Ecken: [T(12, 'Das sind die Kanten. Gefragt sind die Ecken.'), T(6, 'Das sind die Flächen. Gefragt sind die Ecken.'), T(7, 'Die Ecke hinten ist verdeckt, aber sie gibt es. Oben 4 und unten 4 Ecken, das sind 8.')] }[what];
        return N(num(`Wie viele ${what} hat ein ${body}? ${hint}<br>${solidSvg(body, 110)}`, v, { steps, traps }));
      }
      if (t === 1) {
        const [what, v] = pick([['Flächen', 5], ['Kanten', 8], ['Ecken', 5]]);
        const steps = { Flächen: ['Unten ist ein Viereck. Dazu kommen 4 Dreiecke an den Seiten.', '1 + 4 = 5'], Kanten: ['Unten 4 Kanten rundherum.', 'Von den 4 Ecken unten gehen noch 4 Kanten zur Spitze: 4 + 4 = 8'], Ecken: ['Unten 4 Ecken, oben die Spitze.', '4 + 1 = 5'] }[what];
        const traps = { Flächen: [T(4, 'Du hast das Viereck am Boden vergessen. Es ist auch eine Fläche.'), T(6, 'Eine Fläche zu viel. Es sind 4 Dreiecke und 1 Viereck.')],
          Kanten: [T(4, 'Das sind nur die Kanten am Boden. Dazu kommen 4 Kanten zur Spitze.'), T(5, 'Das sind die Ecken. Gefragt sind die Kanten.'), T(12, 'Das sind die Kanten von einem Würfel. Die Pyramide hat nur 8.')],
          Ecken: [T(4, 'Du hast die Spitze vergessen. Unten 4 Ecken, oben 1.'), T(8, 'Das sind die Kanten. Gefragt sind die Ecken.')] }[what];
        return N(num(`Wie viele ${what} hat diese Pyramide? Unten ist ein Viereck.<br>${solidSvg('Pyramide', 110)}`, v, { steps, traps }));
      }
      if (t === 2) {
        const [q, right, others] = pick([['Welcher Körper rollt nicht, wenn du ihn auf den Tisch legst?', pick(['Würfel', 'Quader', 'Pyramide']), ['Kugel', 'Zylinder', 'Kegel']]]);
        const WHY = { Kugel: 'Eine Kugel rollt in jede Richtung.', Zylinder: 'Ein Zylinder rollt, wenn du ihn auf die runde Seite legst.', Kegel: 'Ein Kegel rollt im Kreis, wenn du ihn auf die Seite legst.' };
        const opts = [right, ...others].sort(() => Math.random() - 0.5);
        return { kind: 'pick', q: q, opts, value: right, show: right, steps: [`Körper mit ebenen Flächen liegen fest auf dem Tisch. ${right} hat nur ebene Flächen.`, 'Runde Körper können rollen.'], traps: others.map((o) => ({ v: o, why: `${WHY[o]} Gesucht ist der Körper, der liegen bleibt.` })) };
      }
      const [q, right, others] = pick([['Welcher Körper rollt in jede Richtung?', 'Kugel', { Zylinder: 'Ein Zylinder rollt nur geradeaus, wenn er liegt. Aufgestellt bleibt er stehen.', Würfel: 'Ein Würfel hat ebene Flächen und bleibt liegen.', Kegel: 'Ein Kegel rollt im Kreis, aber nicht in jede Richtung gleich.', Quader: 'Ein Quader hat ebene Flächen und bleibt liegen.' }]]);
      const opts = [right, ...Object.keys(others).sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5);
      return { kind: 'pick', q: q, opts, value: right, show: right, steps: ['Die Kugel ist überall gleich rund.', 'Darum rollt sie in jede Richtung.'], traps: opts.filter((o) => o !== right).map((o) => ({ v: o, why: others[o] })) };
    } },

    symmetry: { name: 'Spiegeln und symmetrisch', rule: '<b>Symmetrie:</b> Ein Bild ist symmetrisch, wenn du es an einer Linie falten kannst und beide Hälften genau aufeinanderliegen. Diese Linie heißt Spiegelachse.', gen() {
      const t = pick([0, 1, 1, 2, 2, 3, 4]);
      if (t === 0) {
        const right = pick(['A', 'H', 'M', 'T', 'U', 'V', 'W', 'Y', 'O', 'X', 'I']);
        const wrongs = ['F', 'G', 'J', 'L', 'P', 'R', 'N', 'S', 'Z'].sort(() => Math.random() - 0.5).slice(0, 3);
        const opts = [right, ...wrongs].sort(() => Math.random() - 0.5);
        return { kind: 'pick', q: 'Welcher Buchstabe ist symmetrisch? Wenn du ihn in der Mitte von oben nach unten faltest, liegen beide Hälften genau aufeinander.', opts, value: right, show: right,
          steps: [`Falte den Buchstaben in Gedanken in der Mitte von oben nach unten.`, `Beim ${right} liegen links und rechts genau aufeinander.`],
          traps: wrongs.map((l) => ({ v: l, why: `Falte das ${l} in der Mitte: Die linke und die rechte Hälfte sehen verschieden aus. Es ist nicht symmetrisch.` })) };
      }
      if (t === 1) {
        const ys = [6, 20, 34, 48].slice(0, 3 + ri(0, 1)); const L = ys.map((y) => [ri(8, 24), y]);
        const R = L.map(([x, y]) => [60 - x, y]);
        const sym = Math.random() < 0.5;
        const Rm = R.map((p) => [...p]);
        if (!sym) { const k = ri(0, Rm.length - 1); Rm[k][0] += Rm[k][0] > 48 ? -7 : 7; }
        const ptsAll = [[30, 2], ...L, [30, 56], ...Rm.slice().reverse()];
        const pic = svgPic(60, 58, 'Eine Figur mit einer gestrichelten Linie in der Mitte', `<polygon points="${pts(ptsAll)}" ${FILL}/><path d="M30 0V58" stroke-width="1.5" ${DASH}/>`, 100);
        const ans = sym ? 'ja' : 'nein';
        return { kind: 'pick', q: `Ist die Figur symmetrisch? Die gestrichelte Linie ist die Spiegelachse. Jeder Punkt links muss rechts einen Partner im gleichen Abstand haben.<br>${pic}`, opts: ['ja', 'nein'], value: ans, show: ans,
          steps: ['Schau, ob links und rechts der Linie alles gleich aussieht.', sym ? 'Jeder Punkt hat rechts einen Partner im gleichen Abstand. Die Figur ist symmetrisch.' : 'Ein Punkt liegt rechts nicht dort, wo sein Spiegelpunkt sein müsste. Die Figur ist nicht symmetrisch.'],
          traps: [{ v: sym ? 'nein' : 'ja', why: sym ? 'Prüfe Punkt für Punkt: Jeder Punkt links hat rechts einen Partner im gleichen Abstand zur Linie. Es passt alles.' : 'Schau genau: Einer der Punkte rechts liegt weiter innen oder außen als sein Partner links. Die Hälften sind nicht gleich.' }] };
      }
      const rows = 4; const cols = 6; const cellsL = []; const k = ri(3, 6);
      while (cellsL.length < k) { const c = [ri(0, 2), ri(0, rows - 1)]; if (!cellsL.some((d) => d[0] === c[0] && d[1] === c[1])) cellsL.push(c); }
      if (t === 2) {
        return N(num(`Das Bild soll symmetrisch werden. Die gestrichelte Linie ist die Spiegelachse. Wie viele Kästchen musst du rechts von der Linie noch färben?<br>${gridSvg(cols, rows, cellsL, 'Ein Raster mit gefärbten Kästchen links von einer gestrichelten Linie')}`, k, { steps: [`Links sind ${k} Kästchen gefärbt.`, `Rechts brauchst du genauso viele, im gleichen Abstand zur Linie: ${k}.`],
          traps: [T(k * 2, `Das sind alle gefärbten Kästchen, wenn das Bild fertig ist. Gefragt sind nur die auf der rechten Seite: ${k}.`), T(k - 1, 'Um eins zu wenig: Zähle die gefärbten Kästchen links noch einmal langsam.'), T(k + 1, 'Um eins zu viel: Zähle die gefärbten Kästchen links noch einmal langsam.')] }));
      }
      if (t === 3) {
        return N(num(`Das Bild wird nach rechts gespiegelt. Wie viele Kästchen sind am Ende insgesamt gefärbt, links und rechts zusammen?<br>${gridSvg(cols, rows, cellsL, 'Ein Raster mit gefärbten Kästchen links von einer gestrichelten Linie')}`, k * 2, { steps: [`Links sind ${k} Kästchen gefärbt.`, `Rechts kommen noch einmal ${k} dazu.`, `${k} + ${k} = ${k * 2}`],
          traps: [T(k, `Das sind nur die Kästchen links. Rechts kommen noch ${k} dazu.`), T(k * 2 - 1, 'Um eins verzählt. Zähle erst die linke Seite genau und rechne dann doppelt.'), T(k * 2 + 1, 'Um eins verzählt. Zähle erst die linke Seite genau und rechne dann doppelt.')] }));
      }
      const gap = ri(0, 2); const col = 3 - 1 - gap; const row = ri(0, 2);
      return N(num(`Das gefärbte Kästchen hat ${gap === 0 ? 'kein leeres Kästchen' : gap === 1 ? '1 leeres Kästchen' : `${gap} leere Kästchen`} bis zur gestrichelten Linie. Das Spiegelbild liegt auf der anderen Seite. Wie viele leere Kästchen liegen dort zwischen Linie und Spiegelbild?<br>${gridSvg(6, 3, [[col, row]], 'Ein Raster mit einem gefärbten Kästchen links von einer gestrichelten Linie')}`, gap, { steps: ['Das Spiegelbild ist genauso weit von der Linie entfernt.', `Auf der anderen Seite liegen ebenfalls ${gap} leere Kästchen dazwischen.`],
        traps: [T(gap + 1, 'Du hast das gefärbte Kästchen selbst mitgezählt. Gefragt sind nur die leeren Kästchen dazwischen.'), T(gap * 2, `Das sind die leeren Kästchen auf beiden Seiten. Gefragt sind nur die auf der anderen Seite: ${gap}.`), gap > 0 && T(gap - 1, 'Um eins zu wenig: Zähle die leeren Kästchen noch einmal.')] }));
    } },

    patterns: { name: 'Muster und Folgen', quick: true, rule: '<b>Muster:</b> In einem Muster wiederholt sich etwas. Finde heraus, was sich wiederholt oder um wie viel es jedes Mal wächst, und mach genauso weiter.', gen() {
      const t = pick([0, 0, 1, 1, 1, 2, 3]);
      if (t === 0) {
        const kinds = ['Kreis', 'Dreieck', 'Quadrat']; const shuffled = kinds.slice().sort(() => Math.random() - 0.5); const [A, B, C] = shuffled;
        const base = pick([[A, B], [A, A, B], [A, B, C], [A, B, B], [A, B, A, C]]);
        const len = base.length === 2 ? 5 : base.length === 3 ? 7 : 9;
        const seq = Array.from({ length: len + 1 }, (_, i) => base[i % base.length]);
        const right = seq[len]; const shown = seq.slice(0, len);
        const showN = Math.min(len, 6); const shownPic = shown.slice(len - showN);
        const words = shownPic.join(', ');
        const prev = shown[len - 1];
        return { kind: 'pick', q: `Welche Form kommt als Nächstes? Die Reihe lautet: ${words} und dann?<br>${patternSvg([...shownPic, null])}`, opts: kinds, value: right, show: right,
          steps: [`Suche, was sich wiederholt: ${base.join(', ')}.`, `Danach geht es von vorne los. Als Nächstes kommt ${right === 'Kreis' ? 'der' : 'das'} ${right}.`],
          traps: kinds.filter((k) => k !== right).map((k) => ({ v: k, why: k === prev ? `Das ist die Form, die zuletzt kam. Schau, was sich im Muster wiederholt: ${base.join(', ')}.` : `${k === 'Kreis' ? 'Der' : 'Das'} ${k} passt hier nicht ins Muster. Es wiederholt sich: ${base.join(', ')}.` })) };
      }
      if (t === 1) {
        const d = pick([1, 2, 2, 3, 4, 5, 5, 10]); const up = Math.random() < 0.7;
        const start = up ? ri(1, 10) : d * ri(6, 9) + ri(0, 1) * d;
        const seq = Array.from({ length: 6 }, (_, i) => (up ? start + i * d : start - i * d));
        const g = Math.random() < 0.65 ? 5 : ri(2, 4); const value = seq[g]; const prev = seq[g - 1];
        const shown = seq.map((x, i) => (i === g ? '▢' : x)).join(', ');
        return N(num(`Setze fort: ${shown}`, value, { steps: [`Schau, um wie viel es sich ändert: Jedes Mal ${up ? 'kommen' : 'gehen'} ${d} ${up ? 'dazu' : 'weg'}.`, `${prev} ${up ? '+' : M} ${d} = ${value}`],
          traps: [d !== 1 && up && T(prev + 1, `Es wird nicht immer um 1 mehr, sondern um ${d}.`), !up && T(prev + d, `Die Zahlen werden kleiner. Es gehen jedes Mal ${d} weg.`), d !== 1 && !up && T(prev - 1, `Es wird nicht um 1 weniger, sondern um ${d}.`), up && T(prev + 2 * d, `Eine Zahl übersprungen. Nach ${prev} kommt gleich ${value}.`), T(value + 1, 'Um eins verzählt. Rechne vom Nachbarn aus genau einen Schritt.')] }));
      }
      if (t === 2) {
        let a; let b; do { a = pick([1, 2, 3]); b = pick([2, 3, 4]); } while (a === b);
        const s = ri(1, 4); const seq = [s]; for (let i = 0; i < 5; i++) seq.push(seq[i] + (i % 2 === 0 ? a : b));
        const value = seq[5];
        return N(num(`Setze fort: ${seq.slice(0, 5).join(', ')}, ▢. Tipp: Es wird abwechselnd um ${a} und um ${b} mehr.`, value, { steps: [`Die Schritte wechseln sich ab: erst ${a}, dann ${b}, dann wieder ${a}.`, `Der letzte Schritt war ${b}, jetzt kommt ${a}: ${seq[4]} + ${a} = ${value}`],
          traps: [T(seq[4] + b, `Der Schritt wechselt jedes Mal. Nach dem Schritt ${b} kommt wieder ${a}.`), T(seq[4] + 1, 'Es wächst nicht immer um 1. Schau auf die Schritte.')] }));
      }
      return N(num(`Die Treppe wächst jedes Mal um eine Stufe. Wie viele Klötzchen braucht die 4. Treppe? Die ersten drei Treppen haben 1, 3 und 6 Klötzchen.<br>${stairsSvg()}`, 10, { steps: ['Von 1 zu 3 kommen 2 dazu, von 3 zu 6 kommen 3 dazu.', 'Jetzt kommen 4 dazu: 6 + 4 = 10.'],
        traps: [T(9, 'Es kommt nicht jedes Mal 3 dazu. Es wird immer um eins mehr: erst 2, dann 3, dann 4.'), T(8, 'Es kommen 4 dazu, nicht 2. Die neue Stufe hat 4 Klötzchen.'), T(4, 'Das ist die Zahl der Stufen. Gefragt sind alle Klötzchen.')] }));
    } },

    lengthsCm: { name: 'Mit dem Lineal messen', rule: '<b>Lineal:</b> Lege den Streifen mit dem Anfang an die 0. Das Ende zeigt dir die Länge in Zentimetern (cm).', gen() {
      const t = pick([0, 0, 0, 1, 1, 2]);
      if (t === 0) {
        const n = ri(2, 9);
        return N(num(`Der Streifen beginnt bei 0 auf dem Lineal. Wie lang ist er? (in cm)<br>${rulerSvg([n])}`, n, { unit: 'cm', steps: ['Der Streifen beginnt bei 0.', `Sein Ende liegt bei der Zahl ${n}.`, `Er ist ${n} cm lang.`],
          traps: [T(n + 1, 'Du hast die Striche gezählt, nicht die Abstände. Lies die Zahl am Ende vom Streifen ab.'), T(n - 1, 'Um eins zu wenig. Lies die Zahl genau am Ende des Streifens ab.'), T(10 - n, 'Das fehlt noch bis zur 10. Gefragt ist, wie lang der Streifen selbst ist.')] }));
      }
      if (t === 1) {
        const a = ri(4, 9); const b = ri(1, a - 1);
        return N(num(`Wie viel länger ist der obere Streifen als der untere? (in cm)<br>${rulerSvg([a, b])}`, a - b, { unit: 'cm', steps: [`Der obere Streifen ist ${a} cm lang, der untere ${b} cm.`, `${a} ${M} ${b} = ${a - b}`],
          traps: [T(a + b, 'Du hast plus gerechnet. Der Unterschied ist die Differenz, also minus.'), T(a, `Das ist die Länge vom oberen Streifen. Gefragt ist, wie viel er länger ist als der untere: ${a} ${M} ${b}.`), T(b, `Das ist die Länge vom unteren Streifen. Gefragt ist der Unterschied: ${a} ${M} ${b}.`)] }));
      }
      const n = ri(2, 8);
      return N(num(`Das Lineal ist 10 cm lang. Der Streifen ist ${n} cm lang. Wie viele cm fehlen noch bis zum Ende vom Lineal?<br>${rulerSvg([n])}`, 10 - n, { unit: 'cm', steps: [`Das Lineal ist 10 cm lang, der Streifen ${n} cm.`, `10 ${M} ${n} = ${10 - n}`],
        traps: [T(n, `Das ist die Länge vom Streifen. Gefragt ist, was bis 10 noch fehlt: 10 ${M} ${n}.`), T(10 + n, 'Du hast plus gerechnet. Was fehlt, rechnest du mit minus.'), T(10 - n + 1, 'Um eins verzählt. Rechne 10 minus die Länge.')] }));
    } },
  },

  topics: [
    [2, 'rechenmauer', 'Rechenmauern und Rechentürme', '🧱', ['wall', 'tower']],
    [2, 'groessen2', 'Uhr und Geld', '🕒', ['clock', 'money2']],
    [3, 'mauern3', 'Rechenmauern und Maltürme', '🗼', ['wallBig', 'towerBig']],
    [4, 'flaeche4', 'Umfang und Fläche', '⬛', ['area4']],
    [1, 'formen1', 'Formen', '🔺', ['shapes', 'corners', 'patterns']],
    [2, 'koerper2', 'Körper und Spiegeln', '🎲', ['solids', 'solidFaces', 'symmetry']],
    [2, 'lineal2', 'Messen mit dem Lineal', '📏', ['lengthsCm']],
  ],

  add: {
    'g1-zahlen20': ['split'],
    'g1-plusminus20': ['wall20'],
    'g3-zr1000': ['placeValue', 'halfAddSub'],
    'g3-einmaleins3': ['halfWritten'],
    'g3-groessen3': ['clock'],
    'g4-schriftlich4': ['colDiv2', 'towerBig'],
    'g4-groessen4': ['fracSimple'],
  },
};
