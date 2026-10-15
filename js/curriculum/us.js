// Additional skills and topics (us), merged into skills.js.

import { ri, pick, nz, round, fmt, br, poly, sup, shuffle } from '../math.js';
import { M, num, T, N, TRIPLES } from '../kit.js';

// ---- Helpers ---------------------------------------------------------------

const sum = (a) => a.reduce((s, x) => s + x, 0);
const sorted = (a) => [...a].sort((x, y) => x - y);
const list = (a) => a.map((x) => fmt(x)).join('; ');
const medianOf = (a) => { const s = sorted(a); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
// Exclusive halves; for n = 4k + 3 this agrees with "smallest value with at least 25 % at or below it".
const quartiles = (a) => { const s = sorted(a); const n = s.length; const k = (n + 1) / 4; return { s, q1: s[k - 1], med: s[(n - 1) / 2], q3: s[n - k], lower: s.slice(0, (n - 1) / 2), upper: s.slice((n + 1) / 2) }; };
const isPrime = (n) => { if (n < 2) return false; for (let p = 2; p * p <= n; p++) if (n % p === 0) return false; return true; };
const sgn = (b) => (b < 0 ? M : '+');
// "3x − 2y" for the equation systems.
const lin = (a, b) => `${poly([a, 0])} ${sgn(b)} ${poly([Math.abs(b), 0], 'y')}`;
const deg = (v) => `${fmt(v)}°`;
const cap = (s) => s[0].toUpperCase() + s.slice(1);

// Data for statistics tasks: a short teen-life context and a value maker.
const DATA = [
  { txt: 'Tore von Mia in den letzten Spielen', g: () => ri(0, 6) },
  { txt: 'Punkte bei den Mathe-Tests', g: () => ri(8, 24) },
  { txt: 'Bildschirmzeit in Minuten an einzelnen Tagen', g: () => ri(8, 36) * 5 },
  { txt: 'Taschengeld pro Woche in € in einer Freundesgruppe', g: () => ri(5, 20) },
  { txt: 'Weitsprung in cm in der Turnstunde', g: () => ri(280, 420) },
  { txt: 'Liegestütze in einer Minute', g: () => ri(10, 40) },
];

// Boxplot as a small drawing with the five numbers written underneath.
function boxplot([mn, q1, md, q3, mx]) {
  const x = (v) => round(10 + ((v - mn) / (mx - mn)) * 240, 1);
  const lab = (v) => `<text x="${x(v)}" y="62" text-anchor="middle" font-size="11" fill="currentColor">${fmt(v)}</text>`;
  return `<svg viewBox="0 0 260 70" width="260" height="70" role="img" aria-label="Boxplot"><g stroke="currentColor" stroke-width="2" fill="none"><path d="M${x(mn)},25 H${x(q1)} M${x(q3)},25 H${x(mx)} M${x(mn)},15 V35 M${x(mx)},15 V35"/><rect x="${x(q1)}" y="10" width="${x(q3) - x(q1)}" height="30" fill="var(--accent)" fill-opacity="0.25"/><path d="M${x(md)},10 V40"/></g>${[mn, q1, md, q3, mx].map(lab).join('')}</svg>`;
}

const AREA = ['mm²', 'cm²', 'dm²', 'm²', 'a', 'ha', 'km²'];
// Volume units, measured in cm³ (= ml).
const VOL = [{ u: 'mm³', f: 0.001 }, { u: 'cm³', f: 1 }, { u: 'ml', f: 1 }, { u: 'dm³', f: 1000 }, { u: 'l', f: 1000 }, { u: 'm³', f: 1e6 }];

export default {
  skills: {
    // ---- 5. Schulstufe -----------------------------------------------------
    laws: { name: 'Vorteilhaft rechnen', quick: true, rule: '<b>Rechengesetze:</b> Beim Malnehmen darfst du vertauschen und geschickt zusammenfassen. <b>Verteilungsgesetz:</b> a · (b + c) = a · b + a · c.', gen() {
      const t = ri(0, 3);
      if (t === 0) {
        const a = ri(3, 9); const base = pick([100, 100, 200, 1000]); const k = pick([1, 2, 3]) * pick([1, 1, -1]); const b = base - k; const kk = Math.abs(k);
        const op = k > 0 ? M : '+'; const v = a * b;
        return N(num(`Rechne geschickt: ${a} · ${fmt(b)}`, v, { steps: [`${fmt(b)} = ${fmt(base)} ${op} ${kk}`, `${a} · ${fmt(b)} = ${a} · ${fmt(base)} ${op} ${a} · ${kk}`, `= ${fmt(a * base)} ${op} ${a * kk} = ${fmt(v)}`],
          traps: [T(a * base - k, `Auch die ${kk} muss mit ${a} malgenommen werden: ${a} · ${kk} = ${a * kk}.`), T(a * base + a * k, `${fmt(b)} liegt ${k > 0 ? 'unter' : 'über'} ${fmt(base)}, also wird ${a} · ${kk} ${k > 0 ? 'abgezogen' : 'dazugezählt'}.`)] }));
      }
      if (t === 1) {
        const [p, q] = pick([[25, 4], [4, 25], [5, 2], [2, 5], [50, 2], [20, 5], [125, 8]]); const b = ri(7, 49); const v = p * q * b;
        return N(num(`Rechne geschickt: ${p} · ${b} · ${q}`, v, { steps: [`Vertauschen: ${p} · ${q} · ${b}`, `${p} · ${q} = ${p * q}`, `${p * q} · ${b} = ${fmt(v)}`],
          traps: [T(p * q + b, `Nach dem Vertauschen wird weiter malgenommen, nicht addiert: ${p * q} · ${b}.`)] }));
      }
      if (t === 2) {
        const a = ri(7, 39); const s = pick([10, 20, 100]); const plus = Math.random() < 0.6;
        let x; let y;
        if (plus) { x = ri(1, s - 1); y = s - x; } else { y = ri(3, 60); x = y + s; }
        const op = plus ? '+' : M; const v = a * s;
        return N(num(`Rechne geschickt: ${a} · ${x} ${op} ${a} · ${y}`, v, { steps: [`${a} kommt in beiden Produkten vor, also herausheben:`, `${a} · ${x} ${op} ${a} · ${y} = ${a} · (${x} ${op} ${y})`, `= ${a} · ${s} = ${fmt(v)}`],
          traps: [T(2 * a * s, `${a} kommt nur einmal vor die Klammer: ${a} · (${x} ${op} ${y}).`), T(a * x + (plus ? y : -y), `Auch die ${y} muss mit ${a} malgenommen werden.`)] }));
      }
      const a = ri(3, 9); let n; do n = ri(21, 99); while (n % 10 === 0);
      const tens = n - (n % 10); const u = n % 10; const v = a * n;
      return N(num(`Rechne im Kopf mit dem Verteilungsgesetz: ${a} · ${n}`, v, { steps: [`${n} = ${tens} + ${u}`, `${a} · ${n} = ${a} · ${tens} + ${a} · ${u}`, `= ${a * tens} + ${a * u} = ${v}`],
        traps: [T(a * tens + u, `Auch die ${u} Einer müssen mit ${a} malgenommen werden: ${a} · ${u} = ${a * u}.`), T(a * tens, `Die Einer fehlen: noch ${a} · ${u} = ${a * u} dazu.`)] }));
    } },

    decRound: { name: 'Dezimalzahlen runden und vergleichen', quick: true, rule: '<b>Runden:</b> Schau auf die Ziffer nach der Rundungsstelle: 0 bis 4 abrunden, 5 bis 9 aufrunden. <b>Vergleichen:</b> Stelle für Stelle von links, zuerst die Ganzen, dann die Zehntel.', gen() {
      const t = ri(0, 2);
      if (t === 0) {
        let n; do n = ri(1001, 99999); while (n % 10 === 0);
        const x = n / 1000; const d = pick([0, 1, 1, 2]);
        const names = ['auf Ganze', 'auf Zehntel (1 Dezimale)', 'auf Hundertstel (2 Dezimalen)']; const place = ['Einer', 'Zehntel', 'Hundertstel'][d];
        const rnd = (dd) => Math.round(n / 10 ** (3 - dd)) / 10 ** dd;
        const v = rnd(d); const next = Math.floor(n / 10 ** (2 - d)) % 10; const cut = Math.floor(n / 10 ** (3 - d)) / 10 ** d;
        return N(num(`Runde ${fmt(x)} ${names[d]}.`, v, { tol: 1e-7, show: fmt(v, d), steps: [`Rundungsstelle: ${place}. Die Ziffer danach ist ${next}.`, next >= 5 ? `${next} ist 5 oder mehr, also aufrunden.` : `${next} ist kleiner als 5, also abrunden: Die ${place}ziffer bleibt.`, `${fmt(x)} ≈ ${fmt(v, d)}`],
          traps: [next >= 5 ? T(cut, `Die Ziffer nach der Rundungsstelle ist ${next}, also 5 oder mehr. Dann wird aufgerundet, nicht nur abgeschnitten.`) : T(round(cut + 10 ** -d, 6), `Die Ziffer nach der Rundungsstelle ist ${next}, also kleiner als 5. Dann wird abgerundet.`), T(rnd(d === 2 ? 1 : d + 1), `Falsche Stelle: Gerundet wird ${names[d]}.`)] }));
      }
      if (t === 1) {
        const w = ri(0, 12); const d1 = ri(1, 9); const A = w * 100 + d1 * 10;
        const same = Math.random() < 0.2; let h; do h = ri(1, 99); while (h % 10 === 0);
        const B = same ? A : w * 100 + h;
        const sA = fmt(A / 100); const sB = same ? `${fmt(A / 100)}0` : fmt(B / 100);
        const flip = Math.random() < 0.5; const [L, R, sL, sR] = flip ? [B, A, sB, sA] : [A, B, sA, sB];
        const r = L < R ? '<' : L > R ? '>' : '=';
        const why = same ? `Eine Null am Ende ändert den Wert nicht: ${sA} = ${sA}0.` : 'Mehr Nachkommastellen machen eine Zahl nicht größer. Fülle auf gleich viele Stellen auf und vergleiche dann.';
        return { kind: 'pick', q: `${sL} ▢ ${sR}`, opts: ['<', '=', '>'], value: r, show: `${sL} ${r} ${sR}`,
          steps: [`Auf gleich viele Stellen auffüllen: ${fmt(L / 100, 2)} und ${fmt(R / 100, 2)}`, `Jetzt wie ganze Hundertstel vergleichen: ${L} ${r} ${R}`],
          traps: same ? [{ v: sL.length > sR.length ? '>' : '<', why }] : [{ v: r === '<' ? '>' : '<', why }, { v: '=', why: 'Die Zahlen sind nicht gleich. Vergleiche die Zehntel und Hundertstel einzeln.' }] };
      }
      // Largest of four numbers with different lengths.
      const w = ri(0, 9); const d1 = ri(2, 9); const longWins = Math.random() < 0.4;
      const A = w * 1000 + d1 * 100;
      const B = w * 1000 + (d1 - 1) * 100 + ri(1, 9) * 10;
      const C = longWins ? w * 1000 + d1 * 100 + ri(11, 99) : w * 1000 + (d1 - 1) * 100 + ri(1, 99);
      const D = w * 1000 + ri(1, 9) * 10;
      const vals = [A, B, C, D];
      if (new Set(vals).size < 4 || C % 10 === 0) return null;
      const s = (v) => fmt(v / 1000); const best = Math.max(...vals);
      const opts = shuffle(vals.map(s));
      return { kind: 'pick', q: 'Welche Zahl ist am größten?', opts, value: s(best), show: s(best),
        steps: [`Auf drei Nachkommastellen auffüllen: ${vals.map((v) => fmt(v / 1000, 3)).join('; ')}`, `Ganze sind überall ${w}. Danach Zehntel, Hundertstel, Tausendstel vergleichen.`, `Am größten: ${s(best)}`],
        traps: longWins ? [{ v: s(A), why: `${s(A)} = ${fmt(A / 1000, 3)}. ${s(C)} hat gleich viele Zehntel und dazu noch Hundertstel, ist also größer.` }] : [{ v: s(C), why: `${s(C)} hat zwar mehr Ziffern, aber weniger Zehntel als ${s(A)}. Vergleiche Stelle für Stelle von links.` }, { v: s(B), why: `${s(B)} hat weniger Zehntel als ${s(A)}.` }] };
    } },

    areaUnits: { name: 'Flächenmaße umrechnen', rule: '<b>Flächenmaße:</b> mm², cm², dm², m², a, ha, km². Von einer Einheit zur nächsten ist die Umrechnungszahl <b>100</b>.', gen() {
      const t = ri(0, 2);
      const chain = (i, j) => { const out = []; for (let k = i; k > j; k--) out.push(`1 ${AREA[k]} = 100 ${AREA[k - 1]}`); return out.join(', '); };
      if (t === 2) {
        const i = ri(1, 6); const p = ri(1, 20); const q = ri(1, 99); const v = p * 100 + q;
        return N(num(`Rechne um: ${p} ${AREA[i]} ${q} ${AREA[i - 1]} = ▢ ${AREA[i - 1]}`, v, { unit: AREA[i - 1], steps: [chain(i, i - 1), `${p} ${AREA[i]} = ${p * 100} ${AREA[i - 1]}`, `${p * 100} + ${q} = ${fmt(v)} ${AREA[i - 1]}`],
          traps: [q < 10 && T(Number(`${p}${q}`), `${q} ${AREA[i - 1]} sind zwei Stellen: 0${q}. Also ${p}0${q}, weil 1 ${AREA[i]} = 100 ${AREA[i - 1]}.`), T(p * 10 + q, `Bei Flächenmaßen ist die Umrechnungszahl 100, nicht 10.`)] }));
      }
      const d = pick([1, 1, 2]);
      if (t === 0) {
        const i = ri(d, 6); const j = i - d; const x = Math.random() < 0.6 ? ri(2, 95) : ri(11, 99) / 10; const v = round(x * 100 ** d, 6);
        return N(num(`Rechne um: ${fmt(x)} ${AREA[i]} = ▢ ${AREA[j]}`, v, { unit: AREA[j], steps: [chain(i, j), `In die kleinere Einheit: mal ${fmt(100 ** d)}`, `${fmt(x)} · ${fmt(100 ** d)} = ${fmt(v)} ${AREA[j]}`],
          traps: [T(round(x * 10 ** d, 6), `Bei Flächenmaßen ist die Umrechnungszahl 100, nicht 10. Ein Quadrat mit 1 ${AREA[i]} hat 10 mal 10 Quadrate der kleineren Einheit.`), T(round(x / 100 ** d, 8), 'Falsche Richtung: In die kleinere Einheit werden es mehr, also malnehmen.')] }));
      }
      const j = ri(d, 6); const i = j - d; const v = Math.random() < 0.6 ? ri(2, 95) : ri(11, 99) / 10; const x = round(v * 100 ** d, 6);
      return N(num(`Rechne um: ${fmt(x)} ${AREA[i]} = ▢ ${AREA[j]}`, v, { unit: AREA[j], steps: [chain(j, i), `In die größere Einheit: durch ${fmt(100 ** d)}`, `${fmt(x)} : ${fmt(100 ** d)} = ${fmt(v)} ${AREA[j]}`],
        traps: [T(round(x / 10 ** d, 6), 'Bei Flächenmaßen ist die Umrechnungszahl 100, nicht 10.'), T(round(x * 100 ** d, 6), 'Falsche Richtung: In die größere Einheit werden es weniger, also teilen.')] }));
    } },

    volUnits: { name: 'Raummaße umrechnen', rule: '<b>Raummaße:</b> mm³, cm³, dm³, m³. Umrechnungszahl <b>1000</b>. 1 dm³ = 1 l und 1 cm³ = 1 ml.', gen() {
      let a; let b;
      do { a = pick(VOL); b = pick(VOL); } while (a === b || ![1, 1000, 0.001].some((r) => Math.abs(a.f / b.f - r) < 1e-12));
      const r = round(a.f / b.f, 6);
      let x; let v;
      if (r >= 1) { x = pick([ri(2, 60), ri(11, 99) / 10, pick([0.5, 0.25, 0.75, 1.5])]); v = round(x * r, 6); }
      else { v = pick([ri(2, 60), ri(11, 99) / 10, pick([0.25, 0.5, 0.75, 0.33, 0.2])]); x = round(v / r, 6); }
      const big = a.f >= b.f ? a : b; const small = big === a ? b : a;
      const rel = r === 1 ? `1 ${a.u} = 1 ${b.u}, das ist dasselbe` : `1 ${big.u} = 1 000 ${small.u}`;
      const steps = [rel, r === 1 ? `${fmt(x)} ${a.u} = ${fmt(v)} ${b.u}` : `${r > 1 ? 'In die kleinere Einheit: mal 1 000' : 'In die größere Einheit: durch 1 000'}`, r === 1 ? '' : `${fmt(x)} ${r > 1 ? '·' : ':'} 1 000 = ${fmt(v)} ${b.u}`].filter(Boolean);
      if ([a.u, b.u].some((u) => u === 'l' || u === 'ml') && r !== 1) steps.unshift('Merke: 1 l = 1 dm³ und 1 ml = 1 cm³.');
      return N(num(`Rechne um: ${fmt(x)} ${a.u} = ▢ ${b.u}`, v, { unit: b.u, steps,
        traps: r === 1 ? [T(round(x * 1000, 6), `${a.u} und ${b.u} sind gleich groß: 1 dm³ ist genau 1 Liter, 1 cm³ genau 1 ml.`), T(round(x / 1000, 6), `${a.u} und ${b.u} sind gleich groß, du musst gar nicht umrechnen.`)]
          : [T(round(r > 1 ? x * 100 : x / 100, 6), 'Bei Raummaßen ist die Umrechnungszahl 1 000, nicht 100. Ein Würfel hat 10 mal 10 mal 10 kleine Würfel.'), T(round(r > 1 ? x / 1000 : x * 1000, 6), 'Falsche Richtung: In die kleinere Einheit werden es mehr, in die größere weniger.')] }));
    } },

    cuboid: { name: 'Quader und Würfel', rule: '<b>Quader:</b> V = a · b · c, O = 2 · (a · b + a · c + b · c). <b>Würfel:</b> V = a³, O = 6 · a².', gen() {
      const t = ri(0, 4);
      if (t === 4) {
        const a = pick([40, 50, 60, 80]); const b = pick([20, 25, 30, 40]); const c = ri(4, 12) * 5; const V = a * b * c; const L = V / 1000;
        return N(num(`Ein Aquarium ist innen ${a} cm lang und ${b} cm breit. Es sind ${fmt(L)} Liter Wasser drin. Wie hoch steht das Wasser?`, c, { unit: 'cm', tol: 0.001, steps: [`${fmt(L)} l = ${fmt(L)} dm³ = ${fmt(V)} cm³`, `Grundfläche: ${a} · ${b} = ${fmt(a * b)} cm²`, `Höhe = V : (a · b) = ${fmt(V)} : ${fmt(a * b)} = ${c} cm`],
          traps: [T(round(L / (a * b), 6), 'Zuerst die Liter in cm³ umrechnen: 1 l = 1 dm³ = 1 000 cm³.'), T(round(V / (a + b), 2), 'Durch die Grundfläche a · b teilen, nicht durch a + b.')] }));
      }
      if (t <= 1) {
        const a = ri(2, 15); const b = ri(2, 12); const c = ri(2, 10); const V = a * b * c; const O = 2 * (a * b + a * c + b * c);
        if (t === 0) return N(num(`Quader: a = ${a} cm, b = ${b} cm, c = ${c} cm. Volumen V = ?`, V, { unit: 'cm³', steps: [`V = a · b · c = ${a} · ${b} · ${c} = ${V} cm³`],
          traps: [T(O, 'Das ist die Oberfläche. Das Volumen ist a · b · c.'), T(a * b, 'Das ist nur die Grundfläche. Noch mal die Höhe c.'), T(a + b + c, 'Beim Volumen wird malgenommen, nicht addiert.')] }));
        return N(num(`Quader: a = ${a} cm, b = ${b} cm, c = ${c} cm. Oberfläche O = ?`, O, { unit: 'cm²', steps: [`a · b = ${a * b}, a · c = ${a * c}, b · c = ${b * c}`, `Jede Fläche gibt es zweimal: O = 2 · (${a * b} + ${a * c} + ${b * c}) = 2 · ${O / 2} = ${O} cm²`],
          traps: [T(O / 2, 'Jede Fläche kommt zweimal vor: oben und unten, vorne und hinten, links und rechts.'), T(V, 'Das ist das Volumen. Für die Oberfläche alle sechs Flächen addieren.')] }));
      }
      const a = ri(2, 12);
      if (t === 2) return N(num(`Würfel mit a = ${a} cm. Volumen V = ?`, a ** 3, { unit: 'cm³', steps: [`V = a³ = ${a} · ${a} · ${a} = ${a ** 3} cm³`],
        traps: [T(3 * a, `a³ heißt a · a · a, nicht 3 · a.`), T(6 * a * a, 'Das ist die Oberfläche (6 Quadrate).'), T(a * a, 'Das ist nur eine Seitenfläche. Noch mal a.')] }));
      return N(num(`Würfel mit a = ${a} cm. Oberfläche O = ?`, 6 * a * a, { unit: 'cm²', steps: [`Eine Seitenfläche: ${a} · ${a} = ${a * a} cm²`, `Ein Würfel hat 6 Seitenflächen: 6 · ${a * a} = ${6 * a * a} cm²`],
        traps: [T(4 * a * a, 'Ein Würfel hat 6 Flächen, nicht 4. Boden und Deckel gehören dazu.'), T(a ** 3, 'Das ist das Volumen.'), T(6 * a, 'Jede Seitenfläche ist a · a, nicht nur a.')] }));
    } },

    angleTypes: { name: 'Winkelarten', quick: true, rule: '<b>Winkelarten:</b> spitz unter 90°, recht genau 90°, stumpf zwischen 90° und 180°, gestreckt genau 180°, erhaben über 180°.', gen() {
      const kind = pick(['spitz', 'spitz', 'recht', 'stumpf', 'stumpf', 'gestreckt', 'erhaben', 'erhaben']);
      const a = { spitz: ri(5, 89), recht: 90, stumpf: ri(91, 179), gestreckt: 180, erhaben: ri(181, 355) }[kind];
      const trap = { spitz: { v: 'stumpf', why: `Stumpf sind nur Winkel zwischen 90° und 180°. ${deg(a)} ist kleiner als ein rechter Winkel, also spitz.` },
        recht: { v: 'spitz', why: 'Genau 90° ist ein rechter Winkel, wie die Ecke von einem Blatt Papier.' },
        stumpf: { v: a > 135 ? 'gestreckt' : 'spitz', why: a > 135 ? 'Gestreckt ist nur genau 180°, dann sind beide Schenkel eine gerade Linie.' : `${deg(a)} ist mehr als ein rechter Winkel, also stumpf.` },
        gestreckt: { v: 'stumpf', why: 'Bei genau 180° liegen die Schenkel auf einer Geraden: gestreckter Winkel.' },
        erhaben: { v: 'stumpf', why: 'Stumpf geht nur bis 180°. Über 180° heißt der Winkel erhaben.' } }[kind];
      return { kind: 'pick', q: `Welche Winkelart ist α = ${deg(a)}?`, opts: ['spitz', 'recht', 'stumpf', 'gestreckt', 'erhaben'], value: kind, show: kind,
        steps: ['spitz: unter 90°, recht: 90°, stumpf: zwischen 90° und 180°, gestreckt: 180°, erhaben: über 180°', `${deg(a)} ist also ${kind}.`], traps: [trap] };
    } },

    // ---- 6. Schulstufe -----------------------------------------------------
    angles: { name: 'Winkel berechnen', rule: '<b>Winkelsumme:</b> im Dreieck 180°, im Viereck 360°. <b>Nebenwinkel</b> ergeben zusammen 180°, <b>Scheitelwinkel</b> sind gleich groß.', gen() {
      const t = ri(0, 4);
      if (t === 0) {
        const a = ri(25, 100); const b = ri(25, 155 - a); const g = 180 - a - b;
        return N(num(`Dreieck: α = ${deg(a)}, β = ${deg(b)}. Wie groß ist γ?`, g, { unit: '°', show: deg(g), steps: ['Im Dreieck ist die Winkelsumme 180°.', `γ = 180° ${M} ${deg(a)} ${M} ${deg(b)} = ${deg(g)}`],
          traps: [T(360 - a - b, 'Das ist die Winkelsumme im Viereck. Im Dreieck sind es 180°.'), T(a + b, 'Das ist α + β. Gesucht ist, was auf 180° fehlt.')] }));
      }
      if (t === 1) {
        let a; let b; let c; let d;
        do { a = ri(50, 130); b = ri(50, 130); c = ri(50, 130); d = 360 - a - b - c; } while (d < 30 || d > 200);
        return N(num(`Viereck: α = ${deg(a)}, β = ${deg(b)}, γ = ${deg(c)}. Wie groß ist δ?`, d, { unit: '°', show: deg(d), steps: ['Im Viereck ist die Winkelsumme 360°.', `δ = 360° ${M} ${deg(a)} ${M} ${deg(b)} ${M} ${deg(c)} = ${deg(d)}`],
          traps: [T(180 - a - b - c, 'Im Viereck ist die Winkelsumme 360°, nicht 180°. Ein Viereck besteht aus zwei Dreiecken.'), T(a + b + c, 'Das ist die Summe der drei Winkel. Gesucht ist, was auf 360° fehlt.')] }));
      }
      if (t === 2) {
        let a; do a = ri(15, 165); while (a === 90);
        return N(num(`Zwei Geraden schneiden sich. Ein Winkel ist ${deg(a)} groß. Wie groß ist sein Nebenwinkel?`, 180 - a, { unit: '°', show: deg(180 - a), steps: ['Nebenwinkel liegen nebeneinander auf einer Geraden und ergeben zusammen 180°.', `180° ${M} ${deg(a)} = ${deg(180 - a)}`],
          traps: [a < 90 && T(90 - a, 'Nebenwinkel ergeben zusammen 180°, nicht 90°.'), T(a, 'Gleich groß ist der Scheitelwinkel (gegenüber). Der Nebenwinkel ergänzt auf 180°.'), T(360 - a, 'Nebenwinkel ergeben zusammen 180°, nicht 360°.')] }));
      }
      if (t === 3) {
        let a; do a = ri(15, 165); while (a === 90);
        return N(num(`Zwei Geraden schneiden sich. Ein Winkel ist ${deg(a)} groß. Wie groß ist der Scheitelwinkel (der gegenüberliegende Winkel)?`, a, { unit: '°', show: deg(a), steps: ['Scheitelwinkel liegen einander gegenüber und sind gleich groß.', `Also auch ${deg(a)}.`],
          traps: [T(180 - a, 'Das wäre der Nebenwinkel. Scheitelwinkel liegen gegenüber und sind gleich groß.'), T(360 - a, 'Scheitelwinkel sind gleich groß, du musst nichts abziehen.')] }));
      }
      if (Math.random() < 0.5) {
        const g = ri(10, 70) * 2; const b = (180 - g) / 2;
        return N(num(`Gleichschenkliges Dreieck: Der Winkel an der Spitze ist γ = ${deg(g)}. Wie groß ist ein Basiswinkel?`, b, { unit: '°', show: deg(b), steps: ['Die zwei Basiswinkel sind gleich groß.', `Für beide zusammen: 180° ${M} ${deg(g)} = ${deg(180 - g)}`, `Einer: ${deg(180 - g)} : 2 = ${deg(b)}`],
          traps: [T(180 - g, 'Das ist für beide Basiswinkel zusammen. Noch durch 2 teilen.'), T(g, 'Die Basiswinkel sind gleich groß wie einander, nicht wie die Spitze.')] }));
      }
      const b = ri(25, 85); const g = 180 - 2 * b;
      return N(num(`Gleichschenkliges Dreieck: Ein Basiswinkel ist ${deg(b)}. Wie groß ist der Winkel γ an der Spitze?`, g, { unit: '°', show: deg(g), steps: ['Beide Basiswinkel sind gleich groß.', `γ = 180° ${M} 2 · ${deg(b)} = 180° ${M} ${deg(2 * b)} = ${deg(g)}`],
        traps: [T(180 - b, 'Es gibt zwei gleich große Basiswinkel. Zieh beide ab.'), T(b, 'Gleich groß sind nur die zwei Basiswinkel, nicht die Spitze.')] }));
    } },

    primes: { name: 'Primzahlen und Primfaktoren', rule: '<b>Primzahl:</b> hat genau zwei Teiler, 1 und sich selbst. Jede Zahl lässt sich eindeutig als Produkt von Primzahlen schreiben.', gen() {
      const t = ri(0, 2);
      if (t === 0) {
        const n = Math.random() < 0.45 ? pick([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97])
          : pick([1, 9, 21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93, 99, 15, 45, 26, 34]);
        const yes = isPrime(n);
        let why;
        if (n === 1) why = '1 hat nur einen einzigen Teiler. Eine Primzahl braucht genau zwei: 1 und sich selbst.';
        else if (n === 2) why = '2 ist zwar gerade, aber ihre einzigen Teiler sind 1 und 2. Also ist 2 eine Primzahl, sogar die einzige gerade.';
        else if (yes) {
          const ps = [2, 3, 5, 7].filter((p) => p * p <= n); const nextP = [2, 3, 5, 7, 11][ps.length];
          why = ps.length ? `Prüfe ${ps.join(', ')}: keine davon teilt ${n}. Mehr muss man nicht prüfen, weil ${nextP} · ${nextP} = ${nextP * nextP} schon größer als ${n} ist. ${n} hat nur die Teiler 1 und ${n}.` : `${n} hat nur die Teiler 1 und ${n}.`;
        } else { const p = [2, 3, 5, 7].find((q) => n % q === 0); why = `${n} = ${p} · ${n / p}. Also hat ${n} mehr als zwei Teiler.`; }
        return { kind: 'pick', q: `Ist ${n} eine Primzahl?`, opts: ['ja', 'nein'], value: yes ? 'ja' : 'nein', show: yes ? 'ja' : 'nein', steps: [why, yes ? 'Also: Primzahl.' : 'Also: keine Primzahl.'], traps: [{ v: yes ? 'nein' : 'ja', why }] };
      }
      if (t === 1) {
        let ps; let es; let n; let hide;
        do {
          ps = shuffle([2, 3, 5, 7, 11, 13]).slice(0, 3).sort((x, y) => x - y);
          es = ps.map((p) => (p === 2 ? ri(1, 3) : p <= 5 ? ri(1, 2) : 1));
          hide = ri(0, 2); es[hide] = 1;
          n = ps.reduce((s, p, i) => s * p ** es[i], 1);
        } while (n > 1000 || n < 30);
        const h = ps[hide]; const pw = (i) => `${ps[i]}${es[i] > 1 ? sup(es[i]) : ''}`;
        const shown = ps.map((p, i) => (i === hide ? '▢' : pw(i))).join(' · ');
        const K = n / h; const plain = ps.reduce((s, p, i) => (i === hide ? s : s * p), 1);
        const known = ps.map((p, i) => (i === hide ? null : es[i] > 1 ? `${pw(i)} = ${p ** es[i]}` : `${p}`)).filter(Boolean).join(', ');
        return N(num(`Primfaktorzerlegung: ${n} = ${shown}`, h, { steps: [`Bekannte Faktoren: ${known}, zusammen ${K}`, `${n} : ${K} = ${h}`, `${h} ist eine Primzahl. Probe: ${ps.map((p, i) => pw(i)).join(' · ')} = ${n}`],
          traps: [plain !== K && T(n / plain, `Die Hochzahl zählt mit: ${ps.map((p, i) => (i !== hide && es[i] > 1 ? `${pw(i)} = ${p ** es[i]}` : null)).filter(Boolean).join(', ')}. Teile also durch ${K}.`)] }));
      }
      let n; let p; let e; let rest;
      do { p = pick([2, 2, 3]); e = ri(2, p === 2 ? 5 : 3); rest = pick(p === 2 ? [3, 5, 7, 15, 21, 9, 35] : [2, 5, 7, 10, 14]); n = p ** e * rest; } while (n > 1000);
      const restTxt = { 15: '3 · 5', 21: '3 · 7', 9: '3²', 35: '5 · 7', 10: '2 · 5', 14: '2 · 7' }[rest] ?? String(rest);
      return N(num(`Primfaktorzerlegung: ${n} = ${p}<sup>▢</sup> · ${restTxt}`, e, { steps: [`${n} : ${rest} = ${p ** e}`, `${p ** e} = ${Array(e).fill(p).join(' · ')}, also ${e}-mal die ${p}`, `${n} = ${p}${sup(e)} · ${restTxt}`],
        traps: [T(p ** e, `Gefragt ist die Hochzahl, also wie oft ${p} vorkommt. ${p ** e} = ${p}${sup(e)}.`), T(e - 1, `Um eins verzählt: ${p ** e} = ${Array(e).fill(p).join(' · ')}.`)] }));
    } },

    mean: { name: 'Mittelwert, Median, Modus', rule: '<b>Mittelwert:</b> Summe durch Anzahl. <b>Median:</b> der mittlere Wert der geordneten Liste. <b>Modus:</b> der häufigste Wert. <b>Spannweite:</b> größter minus kleinster Wert.', gen() {
      const t = ri(0, 3); const ctx = pick(DATA);
      if (t === 0) {
        const n = ri(4, 6); const vals = Array.from({ length: n }, ctx.g);
        const r = sum(vals) % n; if (r) vals[n - 1] += vals[n - 1] - r >= 0 && Math.random() < 0.5 ? -r : n - r;
        const s = sum(vals); const m = s / n; const md = medianOf(vals);
        return N(num(`${ctx.txt}: ${list(vals)}. Berechne den Mittelwert.`, m, { tol: 0.001, steps: [`Summe: ${vals.join(' + ')} = ${s}`, `Anzahl: ${n} Werte`, `Mittelwert: ${s} : ${n} = ${fmt(m)}`],
          traps: [T(s, 'Das ist die Summe. Noch durch die Anzahl der Werte teilen.'), T(md, 'Das ist der Median (der mittlere Wert). Der Mittelwert ist Summe durch Anzahl.'), T(round(s / (n - 1), 2), `Du hast durch ${n - 1} geteilt. Zähle die Werte genau: Es sind ${n}.`)] }));
      }
      if (t === 1) {
        const n = pick([5, 7, 6]); let vals; do vals = Array.from({ length: n }, ctx.g); while (new Set(vals).size < Math.min(n - 1, 5));
        const s = sorted(vals); const md = medianOf(vals); const raw = n % 2 ? vals[(n - 1) / 2] : (vals[n / 2 - 1] + vals[n / 2]) / 2;
        return N(num(`${ctx.txt}: ${list(vals)}. Wie groß ist der Median?`, md, { tol: 0.001, steps: [`Der Größe nach ordnen: ${list(s)}`, n % 2 ? `${n} Werte: Der mittlere ist der ${(n + 1) / 2}. Wert, also ${fmt(md)}.` : `${n} Werte: Es gibt zwei mittlere, ${s[n / 2 - 1]} und ${s[n / 2]}. Median: (${s[n / 2 - 1]} + ${s[n / 2]}) : 2 = ${fmt(md)}`],
          traps: [T(raw, 'Zuerst der Größe nach ordnen! Erst dann ist der mittlere Wert der Median.'), T(round(sum(vals) / n, 2), 'Das ist der Mittelwert. Der Median ist der mittlere Wert der geordneten Liste.')] }));
      }
      if (t === 2) {
        let base; do base = Array.from({ length: 4 }, ctx.g); while (new Set(base).size < 4);
        const mode = base[0]; const vals = shuffle([mode, mode, mode, base[1], base[1], base[2], base[3]].slice(0, ri(6, 7)));
        const mx = Math.max(...vals);
        return N(num(`${ctx.txt}: ${list(vals)}. Welcher Wert ist der Modus?`, mode, { steps: ['Der Modus ist der Wert, der am häufigsten vorkommt.', `${fmt(mode)} kommt 3-mal vor, öfter als jeder andere Wert.`],
          traps: [T(mx, 'Der Modus ist der häufigste Wert, nicht der größte.'), T(medianOf(vals), 'Das ist der Median. Der Modus ist der Wert, der am öftesten vorkommt.')] }));
      }
      const n = ri(5, 7); let vals; do vals = Array.from({ length: n }, ctx.g); while (new Set(vals).size < 3);
      const mx = Math.max(...vals); const mn = Math.min(...vals);
      return N(num(`${ctx.txt}: ${list(vals)}. Wie groß ist die Spannweite?`, mx - mn, { steps: [`Größter Wert: ${fmt(mx)}, kleinster Wert: ${fmt(mn)}`, `Spannweite: ${fmt(mx)} ${M} ${fmt(mn)} = ${fmt(mx - mn)}`],
        traps: [T(mx, 'Das ist nur der größte Wert. Spannweite = größter minus kleinster Wert.'), T(Math.abs(vals[n - 1] - vals[0]), 'Nicht letzter minus erster Wert: Such den größten und den kleinsten Wert.'), T(mx + mn, 'Spannweite heißt Abstand, also minus.')] }));
    } },

    // ---- 7. Schulstufe -----------------------------------------------------
    quads: { name: 'Trapez, Raute, Deltoid', rule: '<b>Trapez:</b> A = (a + c) · h : 2. <b>Raute und Deltoid:</b> A = e · f : 2 (e, f sind die Diagonalen). Raute auch A = a · h.', gen() {
      const t = ri(0, 3);
      if (t === 0) {
        const a = ri(6, 20); const c = ri(2, a - 2); const h = ri(2, 12); const A = ((a + c) * h) / 2;
        return N(num(`Trapez: a = ${a} cm, c = ${c} cm, h = ${h} cm. Flächeninhalt = ?`, A, { unit: 'cm²', tol: 0.001, steps: [`A = (a + c) · h : 2`, `= (${a} + ${c}) · ${h} : 2 = ${a + c} · ${h} : 2 = ${fmt(A)} cm²`],
          traps: [T((a + c) * h, 'Noch durch 2 teilen: Zwei gleiche Trapeze ergeben ein Parallelogramm.'), T((a * c * h) / 2, 'Die zwei parallelen Seiten werden addiert, nicht malgenommen: (a + c).')] }));
      }
      if (t === 1) {
        if (Math.random() < 0.5) {
          const a = ri(3, 15); const h = ri(2, a - 1);
          return N(num(`Raute: Seite a = ${a} cm, Höhe h = ${h} cm. Flächeninhalt = ?`, a * h, { unit: 'cm²', tol: 0.001, steps: ['Eine Raute ist ein Parallelogramm: A = a · h', `A = ${a} · ${h} = ${a * h} cm²`],
            traps: [T((a * h) / 2, 'Mit Seite und Höhe wird nicht halbiert, wie beim Parallelogramm. Halbiert wird nur bei e · f.'), T(a * a, 'Nicht a · a: Die Raute ist kein Quadrat. Rechne mit der Höhe.')] }));
        }
        const e = ri(3, 16); const f = ri(2, 14); const A = (e * f) / 2;
        return N(num(`Raute mit den Diagonalen e = ${e} cm und f = ${f} cm. Flächeninhalt = ?`, A, { unit: 'cm²', tol: 0.001, steps: ['A = e · f : 2', `A = ${e} · ${f} : 2 = ${fmt(A)} cm²`],
          traps: [T(e * f, 'Noch durch 2 teilen: e · f ist das Rechteck rundherum, die Raute ist genau die Hälfte.'), T(2 * (e + f), 'Für die Fläche werden die Diagonalen malgenommen: e · f : 2.')] }));
      }
      if (t === 2) {
        const e = ri(4, 18); const f = ri(3, 14); const A = (e * f) / 2;
        return N(num(`Deltoid (Drachenviereck) mit den Diagonalen e = ${e} cm und f = ${f} cm. Flächeninhalt = ?`, A, { unit: 'cm²', tol: 0.001, steps: ['Wie bei der Raute: A = e · f : 2', `A = ${e} · ${f} : 2 = ${fmt(A)} cm²`],
          traps: [T(e * f, 'Das ist das Rechteck rundherum. Das Deltoid füllt genau die Hälfte: noch durch 2.'), T(e + f, 'Die Diagonalen werden malgenommen, dann halbiert.')] }));
      }
      const a = ri(6, 20); const c = ri(2, a - 2); const h = ri(2, 12); const A = ((a + c) * h) / 2;
      return N(num(`Trapez: A = ${fmt(A)} cm², a = ${a} cm, c = ${c} cm. Wie groß ist die Höhe h?`, h, { unit: 'cm', tol: 0.001, steps: ['A = (a + c) · h : 2, also h = 2 · A : (a + c)', `h = 2 · ${fmt(A)} : ${a + c} = ${fmt(2 * A)} : ${a + c} = ${h} cm`],
        traps: [T(round(A / (a + c), 4), 'Wegen „: 2“ in der Formel musst du A zuerst verdoppeln: h = 2 · A : (a + c).'), T(round((2 * A) / (a * c), 4), 'Durch a + c teilen, nicht durch a · c.')] }));
    } },

    prism: { name: 'Prismen: Volumen und Oberfläche', rule: '<b>Prisma:</b> V = G · h. O = 2 · G + M, der Mantel M = Umfang der Grundfläche · h.', gen() {
      const t = ri(0, 3);
      if (t <= 1) {
        const [a, b, c] = pick(TRIPLES.slice(0, 5)); const h = ri(3, 20); const G = (a * b) / 2; const M2 = (a + b + c) * h;
        if (t === 0) return N(num(`Ein dreiseitiges Prisma hat als Grundfläche ein rechtwinkliges Dreieck mit den Katheten ${a} cm und ${b} cm. Die Höhe des Prismas ist ${h} cm. Volumen = ?`, G * h, { unit: 'cm³', tol: 0.001, steps: [`G = ${a} · ${b} : 2 = ${fmt(G)} cm²`, `V = G · h = ${fmt(G)} · ${h} = ${fmt(G * h)} cm³`],
          traps: [T(a * b * h, 'Die Grundfläche ist ein Dreieck: G = a · b : 2, nicht a · b.'), T(G, 'Das ist nur die Grundfläche. Noch mal die Höhe h.')] }));
        const O = 2 * G + M2;
        return N(num(`Ein dreiseitiges Prisma hat als Grundfläche ein rechtwinkliges Dreieck mit den Seiten ${a} cm, ${b} cm und ${c} cm (rechter Winkel zwischen ${a} cm und ${b} cm). Die Höhe ist ${h} cm. Oberfläche = ?`, O, { unit: 'cm²', tol: 0.001, steps: [`G = ${a} · ${b} : 2 = ${fmt(G)} cm²`, `M = u · h = (${a} + ${b} + ${c}) · ${h} = ${M2} cm²`, `O = 2 · G + M = 2 · ${fmt(G)} + ${M2} = ${fmt(O)} cm²`],
          traps: [T(G + M2, 'Ein Prisma hat zwei Grundflächen, oben und unten: 2 · G.'), T(2 * G + (a + b) * h, `Der Mantel besteht aus drei Rechtecken. Auch die Seite ${c} cm gehört dazu.`), T(M2, 'Das ist nur der Mantel. Die zwei Grundflächen fehlen.')] }));
      }
      if (t === 2) {
        if (Math.random() < 0.5) {
          const a = ri(2, 10); const h = ri(3, 20);
          if (Math.random() < 0.5) return N(num(`Quadratisches Prisma: Grundkante a = ${a} cm, Höhe h = ${h} cm. Volumen = ?`, a * a * h, { unit: 'cm³', steps: [`G = a² = ${a * a} cm²`, `V = G · h = ${a * a} · ${h} = ${a * a * h} cm³`],
            traps: [T(a * h, 'Die Grundfläche ist ein Quadrat: G = a · a.'), T(2 * a * a + 4 * a * h, 'Das ist die Oberfläche.')] }));
          const O = 2 * a * a + 4 * a * h;
          return N(num(`Quadratisches Prisma: Grundkante a = ${a} cm, Höhe h = ${h} cm. Oberfläche = ?`, O, { unit: 'cm²', steps: [`2 · G = 2 · ${a * a} = ${2 * a * a} cm²`, `M = 4 · a · h = 4 · ${a} · ${h} = ${4 * a * h} cm²`, `O = ${2 * a * a} + ${4 * a * h} = ${O} cm²`],
            traps: [T(a * a + 4 * a * h, 'Zwei Grundflächen: Boden und Deckel.'), T(a * a * h, 'Das ist das Volumen.')] }));
        }
        const a = ri(6, 14); const c = ri(2, a - 2); const ht = ri(2, 8); const H = ri(5, 20); const G = ((a + c) * ht) / 2;
        return N(num(`Ein Prisma hat als Grundfläche ein Trapez mit a = ${a} cm, c = ${c} cm und Höhe ${ht} cm. Das Prisma ist ${H} cm lang. Volumen = ?`, G * H, { unit: 'cm³', tol: 0.001, steps: [`G = (a + c) · h : 2 = (${a} + ${c}) · ${ht} : 2 = ${fmt(G)} cm²`, `V = G · Länge = ${fmt(G)} · ${H} = ${fmt(G * H)} cm³`],
          traps: [T((a + c) * ht * H, 'Die Trapezfläche ist (a + c) · h : 2. Das : 2 fehlt.'), T(G, 'Das ist nur die Grundfläche. Noch mal die Länge des Prismas.')] }));
      }
      const G = ri(4, 40); const h = ri(3, 15);
      return N(num(`Ein Prisma hat die Grundfläche G = ${G} cm² und das Volumen V = ${G * h} cm³. Wie hoch ist es?`, h, { unit: 'cm', steps: ['V = G · h, also h = V : G', `h = ${G * h} : ${G} = ${h} cm`],
        traps: [T(G * h - G, 'Mal wird mit durch rückgängig gemacht, nicht mit minus: h = V : G.'), T(G * h * G, 'Umgekehrt: h = V : G, nicht V · G.')] }));
    } },

    relFreq: { name: 'Absolute und relative Häufigkeit', rule: '<b>Relative Häufigkeit:</b> Anzahl : Gesamtanzahl. Mal 100 ergibt Prozent. Im Kreisdiagramm sind 100 % genau 360°, also 1 % = 3,6°.', gen() {
      const t = ri(0, 4);
      const CTX = ['fahren mit dem Rad zur Schule', 'haben ein Haustier', 'spielen in einem Sportverein', 'lesen regelmäßig Bücher', 'haben eine Spielkonsole'];
      if (t === 0) {
        const Nn = pick([20, 25, 40, 50]); const k = ri(1, Nn - 1); const p = (k / Nn) * 100;
        return N(num(`Von ${Nn} befragten Jugendlichen ${pick(CTX)}: ${k}. Wie groß ist die relative Häufigkeit in Prozent?`, p, { unit: '%', tol: 0.001, steps: [`Relative Häufigkeit: ${k} : ${Nn} = ${fmt(k / Nn)}`, `In Prozent: ${fmt(k / Nn)} · 100 = ${fmt(p)} %`],
          traps: [T(k, `${k} ist die absolute Häufigkeit, also die Anzahl. Relativ heißt: im Verhältnis zu allen ${Nn}.`), T(round(k / Nn, 6), 'Das ist die relative Häufigkeit als Dezimalzahl. In Prozent noch mal 100.'), T(round((Nn / k) * 100, 2), `Umgekehrt geteilt: Anzahl durch Gesamtanzahl, also ${k} : ${Nn}.`)] }));
      }
      if (t === 1) {
        const Nn = pick([20, 25, 40, 50, 200, 300]); const ps = [5, 10, 15, 20, 25, 30, 40, 45, 60, 75].filter((x) => (x * Nn) % 100 === 0); const p = pick(ps); const k = (p * Nn) / 100;
        return N(num(`In einer Umfrage unter ${Nn} Jugendlichen sagen ${p} %, dass sie täglich Musik streamen. Wie viele Jugendliche sind das?`, k, { steps: [`1 % von ${Nn} ist ${fmt(Nn / 100)}`, `${p} % sind ${fmt(Nn / 100)} · ${p} = ${k}`],
          traps: [T(p, `${p} ist der Prozentsatz. Gesucht ist die Anzahl: ${p} % von ${Nn}.`), T(Nn - k, `Das sind die anderen ${100 - p} %.`)] }));
      }
      if (t === 2) {
        const Nn = pick([20, 25, 50]); const names = ['Fußball', 'Basketball', 'Schwimmen', 'Tanzen'];
        const c = [ri(2, Math.floor(Nn / 2)), ri(2, Math.floor(Nn / 4)), ri(1, Math.floor(Nn / 5))]; c.push(Nn - sum(c)); if (c[3] < 1) return null;
        const i = ri(0, 3); const p = (c[i] / Nn) * 100;
        return N(num(`Umfrage „Lieblingssport“: ${names.map((s, j) => `${s} ${c[j]}`).join(', ')}. Wie viel Prozent haben ${names[i]} gewählt?`, p, { unit: '%', tol: 0.001, steps: [`Alle zusammen: ${c.join(' + ')} = ${Nn}`, `${names[i]}: ${c[i]} : ${Nn} = ${fmt(c[i] / Nn)}`, `Das sind ${fmt(p)} %.`],
          traps: [T(c[i], `${c[i]} ist die Anzahl. Für Prozent durch alle ${Nn} teilen und mal 100.`), T(round((c[i] / (Nn - c[i])) * 100, 2), `Teile durch alle Befragten zusammen (${Nn}), nicht nur durch die anderen.`), T(round(c[i] / Nn, 6), 'Das ist die Dezimalzahl. In Prozent noch mal 100.')] }));
      }
      if (t === 3) {
        const [a, p] = pick([[36, 10], [18, 5], [45, 12.5], [54, 15], [72, 20], [90, 25], [108, 30], [126, 35], [144, 40], [162, 45], [180, 50], [216, 60], [252, 70]]);
        const way = pick(['Bus', 'Rad', 'zu Fuß', 'Auto', 'Straßenbahn']);
        if (Math.random() < 0.5) return N(num(`Im Kreisdiagramm „Wie kommst du zur Schule?“ hat der Bereich „${way}“ einen Winkel von ${a}°. Wie viel Prozent sind das?`, p, { unit: '%', tol: 0.001, steps: ['Der ganze Kreis hat 360°, das sind 100 %.', `${a}° : 360° = ${fmt(a / 360)}`, `Das sind ${fmt(p)} %.`],
          traps: [T(a, 'Grad sind keine Prozent. Der ganze Kreis hat 360°, das sind 100 %.'), T(round((a / 180) * 100, 2), 'Der ganze Kreis hat 360°, nicht 180°.')] }));
        return N(num(`In einem Kreisdiagramm soll „${way}“ ${fmt(p)} % darstellen. Wie groß muss der Winkel sein?`, a, { unit: '°', tol: 0.001, show: deg(a), steps: ['100 % sind der ganze Kreis, also 360°. 1 % sind 3,6°.', `${fmt(p)} · 3,6° = ${a}°`],
          traps: [T(p, 'Prozent sind keine Grad. 1 % des Kreises sind 3,6°.'), T(round(p * 1.8, 2), 'Der ganze Kreis hat 360°, nicht 180°. Also mal 3,6.')] }));
      }
      const scale = pick([5, 10, 20, 25, 50]); const hgt = ri(2, 16) / 2; const v = scale * hgt;
      if (!Number.isInteger(v)) return null;
      return N(num(`In einem Säulendiagramm steht 1 cm für ${scale} Personen. Die Säule für „Streaming“ ist ${fmt(hgt)} cm hoch. Wie viele Personen sind das?`, v, { steps: [`1 cm sind ${scale} Personen.`, `${fmt(hgt)} cm sind ${fmt(hgt)} · ${scale} = ${v} Personen`],
        traps: [T(hgt, 'Das ist die Höhe in cm, nicht die Anzahl der Personen.'), T(round(scale / hgt, 2), `Jeder cm steht für ${scale} Personen, also Höhe mal ${scale}.`)] }));
    } },

    // ---- 8. Schulstufe -----------------------------------------------------
    formula: { name: 'Formeln umformen', rule: '<b>Formel umformen:</b> Wie bei einer Gleichung auf beiden Seiten dasselbe tun, bis die gesuchte Größe allein steht. Mal wird mit durch rückgängig gemacht, plus mit minus.', gen() {
      const t = ri(0, 4);
      if (t === 0) {
        const a = ri(2, 8); const b = ri(2, 8); const c = ri(2, 12); const V = a * b * c;
        return N(num(`V = a · b · c. V = ${V} cm³, a = ${a} cm, b = ${b} cm. c = ?`, c, { unit: 'cm', steps: ['Nach c auflösen: beide Seiten durch a · b. c = V : (a · b)', `c = ${V} : (${a} · ${b}) = ${V} : ${a * b} = ${c} cm`],
          traps: [T(V - a * b, 'Mal wird mit durch rückgängig gemacht, nicht mit minus.'), T(round((V / a) * b, 4), 'Durch a und durch b teilen: V : (a · b), nicht V : a · b.')] }));
      }
      if (t === 1) {
        const v = pick([12, 15, 18, 20, 24, 30, 45, 60, 80, 90, 120]); const tt = pick([0.5, 1.5, 2, 2.5, 3, 4]); const s = v * tt; const who = pick(['Ein Zug', 'Ein Bus', 'Ein Moped', 'Ein Radfahrer']);
        const w = ri(0, 2);
        if (w === 0) return N(num(`v = s : t. ${who} fährt ${fmt(tt)} h lang mit v = ${v} km/h. Wie weit kommt er? s = ?`, s, { unit: 'km', tol: 0.001, steps: ['Nach s auflösen: beide Seiten mal t. s = v · t', `s = ${v} · ${fmt(tt)} = ${fmt(s)} km`],
          traps: [T(round(v / tt, 4), 'Das : t wird mit mal t rückgängig gemacht: s = v · t.'), T(round(tt / v, 4), 's = v · t, nicht t : v.')] }));
        if (w === 1) return N(num(`v = s : t. ${who} fährt ${fmt(s)} km mit v = ${v} km/h. Wie lange braucht er? t = ?`, tt, { unit: 'h', tol: 0.001, steps: ['Zuerst mal t: s = v · t', `Dann durch v: t = s : v = ${fmt(s)} : ${v} = ${fmt(tt)} h`],
          traps: [T(round(v / s, 4), 'Umgekehrt geteilt: t = s : v.'), T(s * v, 'Durch v teilen, nicht malnehmen: t = s : v.')] }));
        return N(num(`v = s : t. ${who} fährt ${fmt(s)} km in ${fmt(tt)} h. Wie schnell ist er im Durchschnitt? v = ?`, v, { unit: 'km/h', tol: 0.001, steps: [`v = s : t = ${fmt(s)} : ${fmt(tt)} = ${v} km/h`],
          traps: [T(round(tt / s, 6), 'Umgekehrt geteilt: Weg durch Zeit.'), T(round(s * tt, 4), 'Weg durch Zeit, nicht mal.')] }));
      }
      if (t === 2) {
        const a = ri(6, 20); const c = ri(2, a - 2); const h = ri(2, 12); const A = ((a + c) * h) / 2;
        return N(num(`A = (a + c) · h : 2. A = ${fmt(A)} cm², a = ${a} cm, c = ${c} cm. h = ?`, h, { unit: 'cm', tol: 0.001, steps: ['Mal 2: 2 · A = (a + c) · h', 'Durch (a + c): h = 2 · A : (a + c)', `h = ${fmt(2 * A)} : ${a + c} = ${h} cm`],
          traps: [T(round(A / (a + c), 4), 'Zuerst das „: 2“ rückgängig machen: A mal 2.'), T(round((2 * A) / a - c, 4), 'Durch die ganze Klammer (a + c) teilen, nicht nur durch a.')] }));
      }
      if (t === 3) {
        const a = ri(3, 20); const b = ri(2, 15); const u = 2 * a + 2 * b;
        return N(num(`u = 2 · a + 2 · b. u = ${u} cm, a = ${a} cm. b = ?`, b, { unit: 'cm', tol: 0.001, steps: [`Zuerst 2 · a abziehen: 2 · b = u ${M} 2 · a = ${u} ${M} ${2 * a} = ${2 * b}`, `Dann durch 2: b = ${2 * b} : 2 = ${b} cm`],
          traps: [T(u - 2 * a, 'Das ist 2 · b. Noch durch 2 teilen.'), T(round((u - a) / 2, 4), `2 · a abziehen, nicht nur a: ${u} ${M} ${2 * a}.`), T(round(u / 2 - 2 * a, 4), 'Reihenfolge: zuerst 2 · a abziehen, dann durch 2 teilen.')] }));
      }
      const [stoff, rho] = pick([['Aluminium', 2.7], ['Eisen', 7.9], ['Kupfer', 8.9], ['Blei', 11.3], ['Glas', 2.5]]);
      const V = pick([10, 20, 50, 100, 200, 5, 40]); const m = round(rho * V, 4);
      if (Math.random() < 0.5) return N(num(`Dichte ρ = m : V. Ein Stück ${stoff} hat ρ = ${fmt(rho)} g/cm³ und m = ${fmt(m)} g. Welches Volumen hat es? V = ?`, V, { unit: 'cm³', tol: 0.001, steps: ['Mal V: ρ · V = m', `Durch ρ: V = m : ρ = ${fmt(m)} : ${fmt(rho)} = ${V} cm³`],
        traps: [T(round(m * rho, 4), 'Durch ρ teilen, nicht malnehmen: V = m : ρ.'), T(round(rho / m, 6), 'Umgekehrt geteilt: V = m : ρ.')] }));
      return N(num(`Dichte ρ = m : V. Ein Stück ${stoff} hat ρ = ${fmt(rho)} g/cm³ und V = ${V} cm³. Wie schwer ist es? m = ?`, m, { unit: 'g', tol: 0.001, steps: ['Beide Seiten mal V: m = ρ · V', `m = ${fmt(rho)} · ${V} = ${fmt(m)} g`],
        traps: [T(round(rho / V, 6), 'Das : V wird mit mal V rückgängig gemacht: m = ρ · V.'), T(round(V / rho, 4), 'm = ρ · V, nicht V : ρ.')] }));
    } },

    bodies: { name: 'Zylinder, Kegel, Pyramide, Kugel', rule: '<b>Volumen:</b> Zylinder V = r² · π · h, Kegel V = r² · π · h : 3, Pyramide V = G · h : 3, Kugel V = 4 · r³ · π : 3.', gen() {
      const t = ri(0, 3);
      const mk = (q, v, steps, traps) => N(num(`${q} (auf 2 Dezimalen)`, round(v, 2), { unit: 'cm³', tol: Math.max(0.02, v * 0.0012), show: `${fmt(round(v, 2), 2)} cm³`, steps, traps }));
      const r = ri(2, 10); const h = ri(3, 20); const P = Math.PI;
      if (t === 0) {
        const useD = Math.random() < 0.35; const v = r * r * P * h;
        return mk(`Zylinder mit ${useD ? `d = ${2 * r}` : `r = ${r}`} cm und h = ${h} cm. Volumen = ?`, v, [useD ? `r = d : 2 = ${r} cm` : '', `G = r² · π = ${r * r} · π`, `V = G · h = ${r * r} · π · ${h} ≈ ${fmt(round(v, 2), 2)} cm³`].filter(Boolean),
          [T(round(2 * r * P * h, 2), 'Das ist der Mantel (2 · r · π · h). Volumen: Grundfläche r² · π mal Höhe.'), T(round(4 * r * r * P * h, 2), 'Mit dem Durchmesser statt dem Radius gerechnet.'), T(round(r * r * P, 2), 'Das ist nur die Grundfläche. Noch mal die Höhe.')]);
      }
      if (t === 1) {
        const v = (r * r * P * h) / 3;
        return mk(`Kegel mit r = ${r} cm und h = ${h} cm. Volumen = ?`, v, [`G = r² · π = ${r * r} · π`, `V = G · h : 3 = ${r * r} · π · ${h} : 3 ≈ ${fmt(round(v, 2), 2)} cm³`],
          [T(round(r * r * P * h, 2), 'Das wäre ein Zylinder. Ein Kegel ist nur ein Drittel davon: noch durch 3.'), T(round((r * r * P * h) / 2, 2), 'Durch 3 teilen, nicht durch 2.')]);
      }
      if (t === 2) {
        const a = ri(2, 15); const v = (a * a * h) / 3;
        return mk(`Quadratische Pyramide: Grundkante a = ${a} cm, Höhe h = ${h} cm. Volumen = ?`, v, [`G = a² = ${a * a} cm²`, `V = G · h : 3 = ${a * a} · ${h} : 3 ≈ ${fmt(round(v, 2), 2)} cm³`],
          [T(a * a * h, 'Das wäre ein Prisma. Eine Pyramide ist ein Drittel davon: noch durch 3.'), T(round((a * a * h) / 2, 2), 'Durch 3 teilen, nicht durch 2.')]);
      }
      const R = ri(2, 12); const v = (4 * R ** 3 * P) / 3;
      return mk(`Kugel mit r = ${R} cm. Volumen = ?`, v, [`r³ = ${R} · ${R} · ${R} = ${R ** 3}`, `V = 4 · r³ · π : 3 = 4 · ${R ** 3} · π : 3 ≈ ${fmt(round(v, 2), 2)} cm³`],
        [T(round(4 * R * R * P, 2), 'Das ist die Oberfläche (4 · r² · π). Beim Volumen kommt r³ vor.'), T(round(R ** 3 * P, 2), 'Der Faktor 4 : 3 fehlt.'), T(round((4 * R * R * P) / 3, 2), 'Volumen ist dreidimensional: r hoch 3, nicht r².')]);
    } },

    quartile: { name: 'Quartile und Boxplot', rule: '<b>Quartile:</b> Ordnen, dann teilt der Median die Liste in zwei Hälften. q₁ ist der Median der unteren Hälfte, q₃ der der oberen. Im Boxplot liegt zwischen zwei Strichen jeweils etwa ein Viertel der Werte.', gen() {
      const t = ri(0, 4); let ctx = pick(DATA);
      if (t <= 2) {
        const n = pick([7, 11]); let vals; do vals = Array.from({ length: n }, ctx.g); while (new Set(vals).size < Math.min(n - 2, 5));
        const { s, q1, med, q3, lower, upper } = quartiles(vals);
        const sortStep = `Ordnen: ${list(s)}`; const medStep = `Median (der ${(n + 1) / 2}. Wert): ${fmt(med)}`;
        if (t === 0) return N(num(`${ctx.txt}: ${list(vals)}. Wie groß ist der Median?`, med, { steps: [sortStep, medStep],
          traps: [T(vals[(n - 1) / 2], 'Zuerst der Größe nach ordnen! Erst dann ist der mittlere Wert der Median.'), T(round(sum(vals) / n, 2), 'Das ist der Mittelwert. Der Median ist der mittlere Wert der geordneten Liste.')] }));
        if (t === 1) {
          const low = Math.random() < 0.5; const v = low ? q1 : q3;
          return N(num(`${ctx.txt}: ${list(vals)}. Wie groß ist das ${low ? 'untere Quartil q₁' : 'obere Quartil q₃'}?`, v, { steps: [sortStep, medStep, low ? `Untere Hälfte (ohne Median): ${list(lower)}. Ihre Mitte: q₁ = ${fmt(q1)}` : `Obere Hälfte (ohne Median): ${list(upper)}. Ihre Mitte: q₃ = ${fmt(q3)}`],
            traps: [T(low ? q3 : q1, low ? 'Das ist das obere Quartil. q₁ liegt in der unteren Hälfte.' : 'Das ist das untere Quartil. q₃ liegt in der oberen Hälfte.'), T(med, 'Das ist der Median. Das Quartil ist die Mitte einer Hälfte.'), T(low ? vals[(n + 1) / 4 - 1] : vals[n - (n + 1) / 4], 'Zuerst der Größe nach ordnen!')] }));
        }
        return N(num(`${ctx.txt}: ${list(vals)}. Wie groß ist der Quartilsabstand q₃ ${M} q₁?`, q3 - q1, { steps: [sortStep, `q₁ = ${fmt(q1)} (Mitte der unteren Hälfte), q₃ = ${fmt(q3)} (Mitte der oberen Hälfte)`, `q₃ ${M} q₁ = ${fmt(q3)} ${M} ${fmt(q1)} = ${fmt(q3 - q1)}`],
          traps: [T(s[n - 1] - s[0], 'Das ist die Spannweite (größter minus kleinster Wert). Der Quartilsabstand ist q₃ − q₁.'), T(Math.abs(vals[n - (n + 1) / 4] - vals[(n + 1) / 4 - 1]), 'Zuerst der Größe nach ordnen!')] }));
      }
      const ctx2 = pick(DATA.slice(1)); let f;
      do { const qq = quartiles(Array.from({ length: 11 }, ctx2.g)); f = [qq.s[0], qq.q1, qq.med, qq.q3, qq.s[10]]; } while (f.some((v, i) => i && v <= f[i - 1]));
      const [mn, q1, md, q3, mx] = f; ctx = ctx2;
      if (t === 3) {
        const [i, j, word] = pick([[0, 2, 'zwischen'], [1, 3, 'zwischen'], [0, 3, 'zwischen'], [1, 4, 'zwischen'], [2, 4, 'zwischen'], [1, 2, 'zwischen'], [2, 4, 'über'], [3, 4, 'über'], [0, 1, 'unter'], [0, 2, 'unter']]);
        const p = (j - i) * 25;
        const txt = word === 'zwischen' ? `zwischen ${fmt(f[i])} und ${fmt(f[j])}` : word === 'über' ? `über ${fmt(f[i])}` : `unter ${fmt(f[j])}`;
        const why = `Zwischen zwei benachbarten Strichen (Minimum, q₁, Median, q₃, Maximum) liegt jeweils etwa ein Viertel der Werte. ${cap(txt)} sind es ${j - i} Viertel, also ${p} %.`;
        return N(num(`${boxplot(f)}<br>Der Boxplot zeigt: ${ctx.txt}. Wie viel Prozent der Werte liegen ungefähr ${txt}?`, p, { unit: '%', steps: ['Die fünf Striche teilen die Werte in vier Teile mit je etwa 25 %.', `${cap(txt)}: ${j - i} Viertel, also ${p} %`],
          traps: [25, 50, 75].filter((x) => x !== p).map((x) => T(x, why)) }));
      }
      if (Math.random() < 0.5) return N(num(`${boxplot(f)}<br>Der Boxplot zeigt: ${ctx.txt}. Wie groß ist die Spannweite?`, mx - mn, { steps: [`Maximum ${fmt(mx)}, Minimum ${fmt(mn)}`, `Spannweite: ${fmt(mx)} ${M} ${fmt(mn)} = ${fmt(mx - mn)}`],
        traps: [T(q3 - q1, 'Das ist der Quartilsabstand (die Breite der Box). Die Spannweite reicht von ganz links bis ganz rechts.'), T(mx, 'Das ist nur das Maximum. Spannweite = Maximum − Minimum.')] }));
      return N(num(`${boxplot(f)}<br>Der Boxplot zeigt: ${ctx.txt}. Wie groß ist der Quartilsabstand?`, q3 - q1, { steps: [`Die Box reicht von q₁ = ${fmt(q1)} bis q₃ = ${fmt(q3)}.`, `Quartilsabstand: ${fmt(q3)} ${M} ${fmt(q1)} = ${fmt(q3 - q1)}`],
        traps: [T(mx - mn, 'Das ist die Spannweite. Der Quartilsabstand ist nur die Breite der Box: q₃ − q₁.'), T(md - q1, 'Die Box geht von q₁ bis q₃, nicht nur bis zum Median.')] }));
    } },

    lgs8: { name: 'Gleichungssysteme lösen', rule: '<b>Gleichungssystem:</b> Eine Variable wegbringen: einsetzen, gleichsetzen oder Gleichungen addieren. Dann die andere ausrechnen und einsetzen.', gen() {
      const x = ri(-5, 6); const y = ri(-5, 6); const t = ri(0, 2);
      const base = { kind: 'pair', vals: [x, y], placeholder: 'x; y  z. B. 3; −2', keys: true };
      if (t === 0) {
        const m = nz(-3, 3); const n = y - m * x; let a; let b; do { a = nz(-4, 5); b = nz(-4, 4); } while (a + b * m === 0);
        const e = a * x + b * y; const traps = [];
        const x2 = (e - n) / (a + b * m); if (n !== 0 && Number.isInteger(x2) && x2 !== x) traps.push({ v: [x2, m * x2 + n], why: `Beim Einsetzen die ganze Klammer mit ${br(b)} malnehmen, auch die ${fmt(n)}.` });
        return { ...base, q: `I: ${lin(a, b)} = ${fmt(e)}<br>II: y = ${poly([m, n])}`,
          steps: [`II in I einsetzen: ${fmt(a)}x + ${br(b)} · (${poly([m, n])}) = ${fmt(e)}`, `Ausmultiplizieren und zusammenfassen: ${poly([a + b * m, b * n])} = ${fmt(e)}`, `${poly([a + b * m, 0])} = ${fmt(e - b * n)}, also x = ${fmt(x)}`, `x in II einsetzen: y = ${fmt(m)} · ${br(x)} ${sgn(n)} ${Math.abs(n)} = ${fmt(y)}`, `Probe in I: ${fmt(a)} · ${br(x)} + ${br(b)} · ${br(y)} = ${fmt(e)}, stimmt.`], traps };
      }
      if (t === 1) {
        let m1; let m2; do { m1 = nz(-4, 4); m2 = nz(-4, 4); } while (m1 === m2);
        const n1 = y - m1 * x; const n2 = y - m2 * x;
        return { ...base, q: `I: y = ${poly([m1, n1])}<br>II: y = ${poly([m2, n2])}`,
          steps: [`Beide rechten Seiten sind y, also gleichsetzen: ${poly([m1, n1])} = ${poly([m2, n2])}`, `Alle x nach links, Zahlen nach rechts: ${poly([m1 - m2, 0])} = ${fmt(n2 - n1)}`, `x = ${fmt(n2 - n1)} : ${br(m1 - m2)} = ${fmt(x)}`, `x in I einsetzen: y = ${fmt(m1)} · ${br(x)} ${sgn(n1)} ${Math.abs(n1)} = ${fmt(y)}`],
          traps: x !== 0 ? [{ v: [-x, -m1 * x + n1], why: 'Beim Hinüberbringen ändert sich das Vorzeichen. Prüfe den Schritt, in dem die x auf eine Seite kommen.' }] : [] };
      }
      let a; let b; let c; do { a = nz(-4, 5); b = nz(-4, 4); c = nz(-4, 5); } while (a + c === 0);
      const e = a * x + b * y; const f = c * x - b * y;
      return { ...base, q: `I: ${lin(a, b)} = ${fmt(e)}<br>II: ${lin(c, -b)} = ${fmt(f)}`,
        steps: ['In I und II steht vor y die gleiche Zahl mit verschiedenem Vorzeichen. Addieren, dann fällt y weg.', `I + II: ${poly([a + c, 0])} = ${fmt(e + f)}`, `x = ${fmt(e + f)} : ${br(a + c)} = ${fmt(x)}`, `x in I einsetzen: ${fmt(a * x)} ${sgn(b)} ${poly([Math.abs(b), 0], 'y')} = ${fmt(e)}`, `${poly([b, 0], 'y')} = ${fmt(e - a * x)}, also y = ${fmt(y)}`],
        traps: y !== 0 ? [{ v: [x, -y], why: 'x stimmt. Beim Ausrechnen von y ist ein Vorzeichen verloren gegangen.' }] : [] };
    } },
  },

  topics: [
    [5, 'koerper5', 'Quader und Würfel', '🧊', ['cuboid', 'volUnits']],
    [6, 'winkel', 'Winkel', '📐', ['angles', 'angleTypes']],
    [6, 'statistik6', 'Statistik', '📊', ['mean']],
    [6, 'schluss6', 'Schlussrechnung', '🔗', ['proportion']],
    [7, 'vierecke', 'Vierecke', '🔷', ['quads']],
    [7, 'koerper7', 'Prismen', '🧀', ['prism']],
    [7, 'statistik7', 'Statistik', '📊', ['relFreq', 'mean']],
    [8, 'koerper8', 'Zylinder, Kegel, Kugel', '🥫', ['bodies']],
    [8, 'statistik8', 'Statistik', '📦', ['quartile', 'mean']],
    [8, 'gls8', 'Gleichungssysteme', '🔀', ['lgs8']],
  ],

  add: {
    'g5-rechenregeln': ['laws'],
    'g5-dezimal5': ['decRound'],
    'g5-geometrie5': ['areaUnits', 'angleTypes'],
    'g6-teiler': ['primes'],
    'g7-potenzen7': ['sci'],
    'g8-gleichungen8': ['formula'],
  },
};
