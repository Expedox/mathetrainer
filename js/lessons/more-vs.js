// Erklärseiten Volksschule für die zusätzlichen Themen (curriculum/vs.js).

import { GEO } from '../curriculum/vs.js';

const B = (v, gap) => `<span style="display:inline-block;min-width:2.3em;padding:.05em .25em;margin:2px;border:2px solid currentColor;border-radius:6px;${gap ? 'background:color-mix(in srgb, var(--accent) 25%, transparent);' : ''}">${v}</span>`;
const wall = (rows) => `<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle">${rows.map((r) => `<span style="display:flex;justify-content:center">${r.map((v) => B(v, v === '▢')).join('')}</span>`).join('')}</span>`;

const { flatSvg, formsRow, solidSvg, solidsRow, rulerSvg, gridSvg, patternSvg } = GEO;

export default {
  'g2-rechenmauer': {
    idea: 'Eine <b>Rechenmauer</b> ist wie eine Mauer aus Ziegeln. Jeder Stein liegt auf zwei Steinen. Seine Zahl ist immer die <b>Summe</b> der zwei Steine darunter. Fehlt oben ein Stein, rechnest du plus. Fehlt unten ein Stein, rechnest du minus. Im <b>Malturm</b> geht es Stockwerk für Stockwerk hinauf: Das Ergebnis wird immer mit der nächsten Zahl malgenommen. Hinunter wird geteilt, bis wieder die Startzahl herauskommt.',
    picture: `${wall([[15], [8, 7], [3, 5, 2]])}<br>3 + 5 = 8, 5 + 2 = 7, oben 8 + 7 = <span class="hl">15</span>`,
    story: 'Tim baut mit Bausteinen eine Mauer. Auf jeden Stein schreibt er eine Zahl. Unten stehen 3, 5 und 2. Seine Schwester Mia sagt: „Der Stein oben drauf bekommt immer die zwei Zahlen darunter zusammen.“ So wächst die Mauer Reihe für Reihe bis zur Spitze.',
    example: {
      task: `Welche Zahl steht oben? ${wall([['▢'], ['', ''], [3, 5, 2]])}`,
      lines: [
        'Fang unten an und rechne Reihe für Reihe.',
        'Mitte links: 3 + 5 = 8. Mitte rechts: 5 + 2 = 7.',
        'Oben: 8 + 7 = 15.',
        'Lösung: <span class="hl">15</span>',
      ],
    },
    more: [
      {
        task: `Welche Zahl fehlt unten? ${wall([[20], [12, 8], ['▢', 5, 3]])}`,
        lines: [
          'Der Stein über dem Kästchen ist 12. Er ist ▢ + 5.',
          '▢ + 5 = 12, also 12 − 5 = 7.',
          'Probe: 7 + 5 = 12. Lösung: <span class="hl">7</span>',
        ],
      },
      {
        task: 'Malturm: Starte mit 3. Hinauf · 2, · 3, · 4, dann hinunter : 2, : 3, : 4.',
        lines: [
          'Hinauf: 3 · 2 = 6, dann 6 · 3 = 18, dann 18 · 4 = 72.',
          'Ganz oben steht <span class="hl">72</span>.',
          'Hinunter: 72 : 2 = 36, dann 36 : 3 = 12, dann 12 : 4 = 3.',
          'Unten kommt wieder die Startzahl <span class="hl">3</span> heraus. So weißt du, dass alles stimmt.',
        ],
      },
    ],
    watch: [
      'Nicht einfach alle unteren Zahlen zusammenzählen. Bei 3, 5, 2 ist das 10, oben steht aber 15, weil die mittlere 5 zweimal mitzählt.',
      'Fehlt unten ein Stein, rechnest du minus: oberer Stein minus Nachbarstein.',
      'Im Malturm nimmst du immer das letzte Ergebnis weiter mal, nicht die Startzahl.',
      'Kommt beim Hinunterrechnen nicht die Startzahl heraus? Dann steckt irgendwo ein Fehler.',
    ],
    parents: 'Rechenmauern üben Plus und Minus auf spielerische Weise, weil das Kind selbst merkt, ob alles zusammenpasst. Bauen Sie eine Mauer mit Legosteinen oder Zetteln und lassen Sie das Kind die Zahlen eintragen. Fragen Sie auch umgekehrt: „Oben steht 20, welche Zahlen könnten darunter stehen?“ Beim Malturm ist das Hinunterrechnen die eingebaute Probe. Kommt die Startzahl nicht heraus, sucht das Kind den Fehler selbst. Das ist wertvoller, als wenn Sie ihn zeigen.',
  },

  'g2-groessen2': {
    idea: 'Eine <b>Stunde</b> hat <b>60 Minuten</b>, nicht 100. Wenn du mit der Uhr rechnest, gehst du zuerst bis zur <b>vollen Stunde</b>. Dann rechnest du den Rest weiter. Beim <b>Geld</b> gilt: 1 Euro hat 100 Cent. Wenn du mit einem Schein zahlst, ergänzt du vom Preis bis zum Schein. Das ist dein Rückgeld.',
    picture: '<span class="pic">🕗</span> 8:45 Uhr, noch 15 Minuten bis 9:00 Uhr<br><span class="pic">💶</span> 37 € + <span class="hl">13 €</span> = 50 €',
    story: 'Lena hat um 8:45 Uhr Schwimmtraining. Das Training dauert 30 Minuten. Bis 9:00 Uhr sind es 15 Minuten, dann noch einmal 15 Minuten. Um 9:15 Uhr ist das Training aus. Danach kauft sie sich ein Spiel um 37 €. Sie zahlt mit einem 50-€-Schein und bekommt 13 € zurück.',
    example: {
      task: 'Es ist 8:45 Uhr. Wie spät ist es in 30 Minuten?',
      lines: [
        'Von 8:45 Uhr bis 9:00 Uhr sind es 15 Minuten.',
        'Von den 30 Minuten bleiben noch 15 Minuten übrig.',
        '9:00 Uhr und noch 15 Minuten: 9:15 Uhr.',
        'Lösung: <span class="hl">9:15 Uhr</span>',
      ],
    },
    more: [
      {
        task: 'Von 8:45 Uhr bis 9:20 Uhr. Wie viele Minuten sind das?',
        lines: [
          'Von 8:45 Uhr bis 9:00 Uhr: 15 Minuten.',
          'Von 9:00 Uhr bis 9:20 Uhr: 20 Minuten.',
          'Zusammen: 15 + 20 = <span class="hl">35 Minuten</span>',
        ],
      },
      {
        task: 'Du zahlst mit einem 50-€-Schein. Das Spiel kostet 37 €. Wie viel bekommst du zurück?',
        lines: [
          'Ergänze von 37 bis 50.',
          'Zuerst bis zum nächsten Zehner: 37 + 3 = 40.',
          'Dann bis 50: 40 + 10 = 50.',
          'Zusammen: 3 + 10 = <span class="hl">13 €</span>. Probe: 37 + 13 = 50.',
        ],
      },
    ],
    watch: [
      'Eine Stunde hat 60 Minuten. 8:75 Uhr gibt es nicht! Ab 60 Minuten beginnt die nächste Stunde.',
      '„In 20 Minuten“ heißt später, „vor 20 Minuten“ heißt früher.',
      'Beim Zurückgeben ergänzt du vom Preis bis zum Schein. Zählst du Preis und Schein zusammen, kommt viel zu viel heraus.',
    ],
    parents: 'Eine echte Zeigeruhr hilft mehr als jede Digitalanzeige, weil das Kind sieht, wie weit es noch bis zur vollen Stunde ist. Fragen Sie im Alltag: „Wir fahren in 20 Minuten. Wie spät ist es dann?“ Beim Einkaufen darf das Kind bezahlen und das Rückgeld vorher selbst ausrechnen, so wie an der Kasse: vom Preis hinauf bis zum Schein.',
  },

  'g3-mauern3': {
    idea: 'Rechenmauern und Maltürme funktionieren mit großen Zahlen genauso wie mit kleinen. Bei der <b>Rechenmauer</b> ist jeder Stein die Summe der zwei Steine darunter. Im <b>Malturm</b> nimmst du hinauf immer mal und teilst hinunter. Große Malaufgaben rechnest du <b>halbschriftlich</b>: Zerlege die Zahl in Hunderter, Zehner und Einer, nimm jeden Teil mal und zähle alles zusammen.',
    picture: `${wall([[520], [205, 315], [120, 85, 230]])}<br>120 + 85 = 205, 85 + 230 = 315, oben 205 + 315 = <span class="hl">520</span>`,
    story: 'Im Hochhaus fährt der Lift von Stockwerk zu Stockwerk. Beim Malturm ist es ähnlich: In jedem Stockwerk wird die Zahl größer, weil sie malgenommen wird. Fährst du wieder hinunter, wird geteilt. Ganz unten steigst du wieder bei der Startzahl aus.',
    example: {
      task: 'Malturm: Starte mit 23. Hinauf · 2, · 3, · 4. Welche Zahl steht oben?',
      lines: [
        '23 · 2 = 46',
        '46 · 3 = 40 · 3 + 6 · 3 = 120 + 18 = 138',
        '138 · 4 = 100 · 4 + 30 · 4 + 8 · 4 = 400 + 120 + 32 = 552',
        'Oben steht <span class="hl">552</span>.',
      ],
    },
    more: [
      {
        task: 'Und wieder hinunter: 552 : 2, dann : 3, dann : 4.',
        lines: [
          '552 = 400 + 140 + 12, also 552 : 2 = 200 + 70 + 6 = 276.',
          '276 : 3 = 92, denn 92 · 3 = 276.',
          '92 : 4 = 23, denn 23 · 4 = 92.',
          'Unten kommt wieder <span class="hl">23</span> heraus. Der Turm stimmt!',
        ],
      },
      {
        task: `Welche Zahl fehlt? ${wall([[600], ['▢', 340], ['', '', '']])}`,
        lines: [
          'Oben steht 600. Es ist die Summe der zwei Steine darunter.',
          '▢ + 340 = 600, also 600 − 340 = 260.',
          'Lösung: <span class="hl">260</span>',
        ],
      },
    ],
    watch: [
      'Bei 46 · 3 auch die Einer malnehmen: 40 · 3 und 6 · 3. Nur 120 + 6 wäre falsch.',
      'Bei Zehnern die Null nicht vergessen: 30 · 4 = 120, nicht 12.',
      'In der Rechenmauer fehlt unten ein Stein? Dann rechnest du minus, nicht plus.',
      'Beim Hinunterrechnen musst du wieder bei der Startzahl ankommen. Das ist deine Probe.',
    ],
    parents: 'Maltürme sind gutes Kopfrechentraining, weil jedes Ergebnis gleich weiterverwendet wird. Lassen Sie das Kind die Zerlegung aufschreiben (138 · 4 = 400 + 120 + 32), bevor es zusammenzählt. So bleiben Zwischenergebnisse sichtbar. Wenn am Ende nicht die Startzahl herauskommt, ist das kein Drama, sondern ein Rätsel: In welchem Stockwerk ist der Fehler passiert?',
  },

  'g4-flaeche4': {
    idea: 'Der <b>Umfang</b> ist der Weg einmal rundherum um eine Figur. Du zählst alle Seiten zusammen und misst in <b>cm</b>. Die <b>Fläche</b> sagt, wie viele kleine Quadrate mit 1 cm Seitenlänge hineinpassen. Ein solches Quadrat heißt <b>1 cm²</b> (Quadratzentimeter). Beim Rechteck rechnest du: Länge mal Breite.',
    picture: '<span class="pic" style="line-height:1.05">🟦🟦🟦🟦🟦<br>🟦🟦🟦🟦🟦<br>🟦🟦🟦🟦🟦</span>5 cm lang, 3 cm breit<br>Fläche: 3 Reihen mit je 5 Kästchen = <span class="hl">15 cm²</span><br>Umfang: 5 + 3 + 5 + 3 = <span class="hl">16 cm</span>',
    story: 'Mia will ein Bild auf ein Blatt kleben und mit Geschenkband einrahmen. Für das Band braucht sie den <b>Umfang</b>, denn das Band geht einmal rundherum. Für das Bild selbst zählt die <b>Fläche</b>: Wie viel Platz braucht es auf dem Blatt?',
    example: {
      task: 'Ein Rechteck ist 5 cm lang und 3 cm breit. Berechne Fläche und Umfang.',
      lines: [
        'Fläche: In eine Reihe passen 5 Zentimeterquadrate, und es gibt 3 Reihen.',
        '5 · 3 = <span class="hl">15 cm²</span>',
        'Umfang: einmal rundherum: 5 + 3 + 5 + 3 = <span class="hl">16 cm</span>',
      ],
    },
    more: [
      {
        task: 'Ein Quadrat hat eine Seitenlänge von 4 cm. Berechne Fläche und Umfang.',
        lines: [
          'Fläche: 4 Reihen mit je 4 Kästchen: 4 · 4 = <span class="hl">16 cm²</span>',
          'Umfang: 4 gleiche Seiten: 4 · 4 = <span class="hl">16 cm</span>',
          'Gleiche Zahl, aber etwas ganz anderes: einmal Kästchen, einmal ein Weg rundherum.',
        ],
      },
      {
        task: 'Ein Rechteck hat 24 cm² Fläche und ist 6 cm lang. Wie breit ist es?',
        lines: [
          'Länge mal Breite ist die Fläche: 6 · ▢ = 24.',
          '24 : 6 = 4',
          'Das Rechteck ist <span class="hl">4 cm</span> breit. Probe: 6 · 4 = 24.',
        ],
      },
    ],
    watch: [
      'Umfang und Fläche nicht verwechseln: Umfang ist rundherum (plus), Fläche sind die Kästchen innen (mal).',
      'Die Einheit verrät, was du ausgerechnet hast: Umfang in cm, Fläche in cm².',
      'Beim Umfang vom Rechteck alle vier Seiten zählen, nicht nur Länge und Breite einmal.',
      'Fläche vom Quadrat ist Seite mal Seite, nicht Seite mal 2.',
    ],
    parents: 'Karopapier ist das beste Werkzeug: Lassen Sie das Kind Rechtecke einzeichnen, die Kästchen innen zählen (Fläche) und mit dem Finger am Rand entlangfahren (Umfang). Im Haushalt eignen sich Fliesen, Schokoladetafeln oder ein Tischtuch. Ein spannender Versuch: Zeichnen Sie verschiedene Rechtecke mit 12 Kästchen. Die Fläche ist immer gleich, der Umfang aber nicht.',
  },
  'g1-formen1': {
    idea: 'Jede <b>Form</b> hat ihre Merkmale. Ein <b>Dreieck</b> hat 3 Ecken und 3 Seiten. Ein <b>Quadrat</b> hat 4 Ecken und 4 gleich lange Seiten. Ein <b>Rechteck</b> hat auch 4 Ecken, aber 2 lange und 2 kurze Seiten. Ein <b>Kreis</b> hat keine Ecken, er ist ganz rund. Eine <b>Ecke</b> ist eine Spitze, eine <b>Seite</b> ist eine gerade Linie dazwischen. Auch <b>Muster</b> gehören dazu: Du erkennst, was sich wiederholt, und machst weiter.',
    picture: `${formsRow(220)}<br>Quadrat, Rechteck, Dreieck, Kreis`,
    story: 'Lena sortiert Bausteine in vier Kisten. In die erste Kiste kommen die Bausteine mit 3 Ecken. In die zweite die mit 4 gleich langen Seiten. In die dritte die langen mit 4 Ecken. Und in die vierte alle, die rund sind und sich gut rollen lassen. Zum Schluss legt sie eine Kette: Kreis, Dreieck, Kreis, Dreieck, Kreis. Was kommt als Nächstes? Natürlich ein Dreieck!',
    example: {
      task: `Wie viele Ecken hat diese Form? ${flatSvg('Fünfeck', { marks: true, width: 110 })}`,
      lines: [
        'Setze auf jede Ecke einen Punkt, so wie im Bild.',
        'Fange bei einem Punkt an und zähle rundherum: 1, 2, 3, 4, 5.',
        'Lösung: <span class="hl">5</span> Ecken. Es ist ein Fünfeck, und es hat auch 5 Seiten.',
      ],
    },
    more: [
      {
        task: `Wie heißt diese Form? ${flatSvg('Rechteck', { width: 110 })}`,
        lines: [
          'Zähle die Ecken: Es sind 4.',
          'Sind alle Seiten gleich lang? Nein, zwei sind länger und zwei sind kürzer.',
          'Lösung: <span class="hl">Rechteck</span>. Beim Quadrat wären alle Seiten gleich lang.',
        ],
      },
      {
        task: `Welche Form kommt als Nächstes? ${patternSvg(['Kreis', 'Dreieck', 'Kreis', 'Dreieck', 'Kreis', null])}`,
        lines: [
          'Es wiederholt sich: Kreis, Dreieck, Kreis, Dreieck.',
          'Zuletzt kam ein Kreis. Danach kommt wieder das Dreieck.',
          'Lösung: <span class="hl">Dreieck</span>',
        ],
      },
      {
        task: 'Setze fort: 2, 4, 6, 8, ▢',
        lines: [
          'Schau, um wie viel es wächst: 4 − 2 = 2, 6 − 4 = 2.',
          'Jedes Mal kommen 2 dazu: 8 + 2 = 10.',
          'Lösung: <span class="hl">10</span>',
        ],
      },
    ],
    watch: [
      'Quadrat und Rechteck haben beide 4 Ecken. Der Unterschied: Beim Quadrat sind alle Seiten gleich lang.',
      'Beim Zählen der Ecken einen Punkt auf die erste Ecke setzen, sonst zählst du sie doppelt.',
      'Ein Kreis hat keine Ecken, auch nicht eine.',
      'Bei Zahlenfolgen schaust du auf den Abstand zwischen den Zahlen und nicht nur auf die letzte Zahl.',
    ],
    parents: 'Suchen Sie gemeinsam im Alltag nach Formen: Das Fenster, die Uhr, ein Taschentuch, ein Verkehrsschild. Lassen Sie Ihr Kind Ecken mit dem Finger nachfahren und laut zählen. Für Muster eignen sich Perlen, Legosteine oder Knöpfe: Legen Sie eine Reihe vor und fragen Sie, wie sie weitergeht. Wichtig ist, dass Ihr Kind sagen kann, warum es so weitergeht. Ein Quadrat ist übrigens ein besonderes Rechteck. In der Volksschule lernen die Kinder zuerst, beide zu unterscheiden.',
  },

  'g2-koerper2': {
    idea: '<b>Körper</b> kann man in die Hand nehmen. Der <b>Würfel</b> hat 6 gleich große Quadrate als Flächen. Der <b>Quader</b> hat Rechtecke als Flächen, zum Beispiel eine Schachtel. Die <b>Kugel</b> ist ganz rund. Der <b>Zylinder</b> hat oben und unten einen Kreis, wie eine Dose. Der <b>Kegel</b> hat unten einen Kreis und oben eine Spitze, wie eine Eistüte. Die <b>Pyramide</b> hat unten ein Viereck und oben eine Spitze. Würfel und Quader haben <b>6 Flächen, 12 Kanten und 8 Ecken</b>. Beim <b>Spiegeln</b> faltest du ein Bild an einer Linie, der <b>Spiegelachse</b>. Liegen beide Hälften genau aufeinander, ist das Bild <b>symmetrisch</b>.',
    picture: `${solidsRow(['Würfel', 'Quader', 'Kugel', 'Zylinder', 'Kegel', 'Pyramide'], 220)}<br>Würfel, Quader, Kugel, Zylinder, Kegel, Pyramide`,
    story: 'Tim packt seine Spielsachen in eine Schachtel. Den Spielwürfel, den Ball und die Dose mit den Murmeln legt er hinein. Der Ball rollt sofort davon, die Dose rollt auch, aber der Würfel bleibt liegen. Danach faltet Tim ein Blatt Papier in der Mitte und schneidet ein Herz aus. Beide Hälften sind gleich: Das Herz ist symmetrisch.',
    example: {
      task: `Wie viele Kanten hat ein Würfel? ${solidSvg('Würfel', 110)}`,
      lines: [
        'Eine Kante ist eine Linie, wo zwei Flächen zusammenstoßen.',
        'Oben sind 4 Kanten, unten sind auch 4 Kanten, und 4 Kanten stehen senkrecht.',
        '4 + 4 + 4 = 12',
        'Lösung: <span class="hl">12</span> Kanten. Die gestrichelten Linien liegen hinten, sie zählen mit.',
      ],
    },
    more: [
      {
        task: `Wie viele Kästchen musst du rechts noch färben, damit das Bild symmetrisch wird? ${gridSvg(6, 4, [[1, 0], [2, 1], [0, 2]], 'Ein Raster mit drei gefärbten Kästchen links von einer gestrichelten Linie')}`,
        lines: [
          'Links von der gestrichelten Linie sind 3 Kästchen gefärbt.',
          'Rechts kommt für jedes Kästchen ein Spiegelbild im gleichen Abstand zur Linie.',
          'Lösung: <span class="hl">3</span> Kästchen',
        ],
      },
      {
        task: 'Welcher Körper rollt nicht: Kugel, Zylinder, Würfel oder Kegel?',
        lines: [
          'Kugel, Zylinder und Kegel haben runde Teile, sie können rollen.',
          'Der Würfel hat nur ebene Flächen.',
          'Lösung: <span class="hl">Würfel</span>',
        ],
      },
      {
        task: 'Welcher Buchstabe ist symmetrisch: F, A, R oder G?',
        lines: [
          'Falte jeden Buchstaben in Gedanken in der Mitte von oben nach unten.',
          'Beim A liegen die linke und die rechte Hälfte genau aufeinander.',
          'Lösung: <span class="hl">A</span>',
        ],
      },
    ],
    watch: [
      'Beim Zählen der Kanten und Ecken auch die verdeckten Teile hinten nicht vergessen.',
      'Kanten sind Linien, Ecken sind Spitzen, Flächen sind ebene Seiten. Diese drei Wörter nicht verwechseln.',
      'Würfel und Quader unterscheiden: Beim Würfel sind alle Kanten gleich lang.',
      'Beim Spiegeln liegt das Spiegelbild genauso weit hinter der Linie wie das Original davor.',
    ],
    parents: 'Körper begreift man am besten mit den Händen. Suchen Sie gemeinsam zu Hause Würfel, Quader, Kugeln und Dosen, und lassen Sie Ihr Kind sie rollen, stapeln und betasten. Aus Knetmasse und Zahnstochern kann Ihr Kind einen Würfel bauen: 8 Kugeln als Ecken, 12 Stäbchen als Kanten. Für die Symmetrie ist ein kleiner Spiegel an der Mittellinie eines Bildes ein tolles Hilfsmittel, ebenso das Falten und Ausschneiden von Papier.',
  },

  'g2-lineal2': {
    idea: 'Mit dem <b>Lineal</b> misst du Längen in <b>Zentimetern</b>, kurz <b>cm</b>. Lege das Lineal so an, dass der Anfang genau bei der <b>0</b> liegt. Dort, wo das Ende ist, liest du die Zahl ab. Das ist die Länge. Willst du wissen, <b>wie viel länger</b> etwas ist, rechnest du <b>minus</b>: lange Länge minus kurze Länge.',
    picture: `${rulerSvg([6], 'Ein Lineal mit einem Streifen, der bei null beginnt und bei sechs endet')}<br>Der Streifen ist <span class="hl">6 cm</span> lang.`,
    story: 'Mia misst ihren Bleistift und ihren Radiergummi. Sie legt das Lineal an und achtet darauf, dass der Anfang bei der 0 liegt. Der Bleistift endet bei 9, der Radiergummi bei 4. Wie viel länger ist der Bleistift? Mia rechnet 9 − 4 = 5. Der Bleistift ist 5 cm länger.',
    example: {
      task: `Wie viel länger ist der obere Streifen als der untere? ${rulerSvg([7, 3])}`,
      lines: [
        'Der obere Streifen endet bei 7, er ist 7 cm lang.',
        'Der untere Streifen endet bei 3, er ist 3 cm lang.',
        '7 − 3 = 4',
        'Lösung: <span class="hl">4 cm</span>',
      ],
    },
    more: [
      {
        task: `Der Streifen beginnt bei 0. Wie lang ist er? ${rulerSvg([8])}`,
        lines: [
          'Schau, bei welcher Zahl das Ende liegt.',
          'Das Ende liegt bei der 8.',
          'Lösung: <span class="hl">8 cm</span>',
        ],
      },
      {
        task: 'Das Lineal ist 10 cm lang. Der Streifen ist 4 cm lang. Wie viele cm fehlen noch bis zum Ende?',
        lines: [
          'Es fehlt, was von 4 bis 10 noch übrig ist.',
          '10 − 4 = 6',
          'Lösung: <span class="hl">6 cm</span>',
        ],
      },
    ],
    watch: [
      'Der Streifen muss bei der 0 beginnen und nicht bei der 1. Sonst misst du zu wenig oder zu viel.',
      'Du liest die Zahl am Ende ab. Die Striche zu zählen führt oft zu einem Fehler um 1.',
      'Bei „wie viel länger“ rechnest du minus, nicht plus.',
      'Die Einheit nicht vergessen: cm.',
    ],
    parents: 'Geben Sie Ihrem Kind ein echtes Lineal und lassen Sie es Alltagsdinge messen: Stifte, Bücher, den eigenen Finger. Lassen Sie es vorher raten und dann nachmessen. Achten Sie darauf, dass der Anfang genau bei der 0 liegt. Viele Kinder starten beim Rand des Lineals und nicht bei der Null, das ist ein häufiger Fehler. Ein selbst gebauter Papierstreifen mit Zentimeterstrichen hilft beim Verstehen.',
  },
};
