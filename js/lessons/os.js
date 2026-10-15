// Erklärseiten Oberstufe: Idee, Bild, Alltagsbeispiel, Rechenweg, Stolperfallen, Elterntipp.
export default {
  'g9-gls': {
    idea: 'Ein <b>Gleichungssystem</b> besteht aus zwei Gleichungen mit zwei Unbekannten x und y. Jede Gleichung allein hat unendlich viele Lösungspaare – erst <b>beide zusammen</b> legen ein Paar (x | y) fest. Grafisch ist jede Gleichung eine Gerade, und die Lösung ist der <span class="hl">Schnittpunkt</span>. Beim <b>Eliminationsverfahren</b> addierst oder subtrahierst du die Gleichungen so, dass eine Variable wegfällt. Das ist erlaubt, weil du auf beiden Seiten Gleiches dazurechnest. Beim <b>Einsetzungsverfahren</b> löst du eine Gleichung nach einer Variablen auf und setzt sie in die andere ein.',
    picture: '<svg viewBox="0 0 200 120" width="200" height="120"><line x1="10" y1="110" x2="190" y2="110" stroke="var(--border)"/><line x1="20" y1="5" x2="20" y2="115" stroke="var(--border)"/><line x1="20" y1="100" x2="190" y2="15" stroke="var(--accent)" stroke-width="2"/><line x1="20" y1="20" x2="190" y2="105" stroke="currentColor" stroke-width="2"/><circle cx="105" cy="57.5" r="4" fill="var(--accent)"/><text x="112" y="52" font-size="11" fill="currentColor">Schnittpunkt = Lösung</text></svg>',
    story: 'Handytarif A kostet 10 € Grundgebühr plus 2 € pro GB, Tarif B 20 € Grundgebühr plus 1 € pro GB. Mit y = 10 + 2x und y = 20 + x findest du: Bei <b>x = 10 GB</b> kosten beide gleich viel (30 €). Darunter ist A billiger, darüber B.',
    example: {
      task: 'Löse: I: x + y = 10 &nbsp; II: x − y = 4',
      lines: [
        'In I steht +y, in II −y → addieren, dann fällt y weg.',
        'I + II: 2x = 14',
        'x = 7',
        'x in I einsetzen: 7 + y = 10 → y = 3',
        'Probe in II: 7 − 3 = 4 ✓',
        'Lösung: (7 | 3)'
      ]
    },
    more: [
      {
        task: 'Löse: I: 2x + 3y = 12 &nbsp; II: x + y = 5',
        lines: [
          'II · 2: 2x + 2y = 10',
          'I − (II · 2): y = 2',
          'In II: x + 2 = 5 → x = 3',
          'Probe in I: 2 · 3 + 3 · 2 = 12 ✓',
          'Lösung: (3 | 2)'
        ]
      },
      {
        task: 'Einsetzungsverfahren: I: y = 2x − 1 &nbsp; II: 3x + y = 9',
        lines: [
          'y aus I in II einsetzen: 3x + (2x − 1) = 9',
          '5x − 1 = 9 → 5x = 10 → x = 2',
          'y = 2 · 2 − 1 = 3',
          'Probe in II: 3 · 2 + 3 = 9 ✓',
          'Lösung: (2 | 3)'
        ]
      }
    ],
    watch: [
      'Beim Multiplizieren einer Gleichung <b>jeden</b> Term multiplizieren – auch die rechte Seite.',
      'Beim Subtrahieren auf die Vorzeichen achten: −(−y) = +y.',
      'Nach x auch y ausrechnen! Die Lösung ist immer ein <b>Paar</b>.',
      'Probe in der Gleichung machen, die du <b>nicht</b> zum Einsetzen verwendet hast.'
    ],
    parents: 'Sie müssen die Rechnung nicht nachvollziehen: Lassen Sie Ihr Kind die gefundenen Werte in <b>beide</b> Ausgangsgleichungen einsetzen. Stimmen beide, ist die Lösung richtig. Fragen Sie auch: „Was bedeutet das Ergebnis im Text?“ – das trainiert Textaufgaben.'
  },

  'g9-quadratisch': {
    idea: 'In einer <b>quadratischen Gleichung</b> kommt x² vor. In der Normalform x² + px + q = 0 hilft die <b>kleine Lösungsformel</b>:<br><span class="hl">x = −<span class="frac"><span>p</span><span>2</span></span> ± √((<span class="frac"><span>p</span><span>2</span></span>)² − q)</span><br>Sie entsteht durch quadratisches Ergänzen: Man macht aus x² + px ein Quadrat (x + <span class="frac"><span>p</span><span>2</span></span>)² und zieht dann die Wurzel. Weil eine Wurzel positiv oder negativ sein kann, gibt es meist <b>zwei</b> Lösungen. Der Ausdruck unter der Wurzel heißt <b>Diskriminante</b> D: D &gt; 0 → zwei Lösungen, D = 0 → eine Lösung, D &lt; 0 → keine reelle Lösung.',
    picture: '<svg viewBox="0 0 200 120" width="200" height="120"><line x1="5" y1="70" x2="195" y2="70" stroke="var(--border)"/><path d="M15 10 Q55 130 95 10" fill="none" stroke="var(--accent)" stroke-width="2"/><path d="M75 15 Q105 125 135 15" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/><path d="M140 20 Q165 100 190 20" fill="none" stroke="var(--muted)" stroke-width="2"/><text x="30" y="85" font-size="10" fill="currentColor">2 Lös.</text><text x="95" y="85" font-size="10" fill="currentColor">1 Lös.</text><text x="150" y="85" font-size="10" fill="currentColor">keine</text></svg>',
    story: 'Ein Ball wird geworfen und fliegt auf einer <b>Parabel</b>. Wann er wieder am Boden ist, findest du, indem du „Höhe = 0“ setzt – das ergibt eine quadratische Gleichung. Die negative Lösung ist dort physikalisch oft sinnlos.',
    example: {
      task: 'Löse x² − 2x − 8 = 0',
      lines: [
        'p = −2, q = −8',
        '−<span class="frac"><span>p</span><span>2</span></span> = 1, &nbsp;(<span class="frac"><span>p</span><span>2</span></span>)² = 1',
        'D = 1 − (−8) = 9 &gt; 0 → zwei Lösungen',
        'x = 1 ± √9 = 1 ± 3',
        'x₁ = 4, &nbsp;x₂ = −2',
        'Probe: 16 − 8 − 8 = 0 ✓, &nbsp;4 + 4 − 8 = 0 ✓'
      ]
    },
    more: [
      {
        task: 'Löse x² + 6x + 9 = 0',
        lines: [
          'p = 6, q = 9 → −<span class="frac"><span>p</span><span>2</span></span> = −3',
          'D = 3² − 9 = 0 → genau eine Lösung',
          'x = −3'
        ]
      },
      {
        task: 'Löse x² + 2x + 5 = 0',
        lines: [
          'p = 2, q = 5 → −<span class="frac"><span>p</span><span>2</span></span> = −1',
          'D = 1 − 5 = −4 &lt; 0',
          'Aus einer negativen Zahl gibt es keine reelle Wurzel → <b>keine Lösung</b>'
        ]
      }
    ],
    watch: [
      'Vorzeichen von p und q mitnehmen: bei x² − 2x − 8 ist p = <b>−2</b> und q = <b>−8</b>.',
      '−q heißt bei q = −8: minus minus 8 = +8.',
      'Steht vor x² eine Zahl (z. B. 2x²), zuerst die ganze Gleichung durch diese Zahl dividieren.',
      'Die Gleichung muss rechts = 0 stehen, bevor du p und q abliest.'
    ],
    parents: 'Bitten Sie Ihr Kind, die Lösungen in die Gleichung einzusetzen – kommt 0 heraus, stimmt es. Viele Fehler sind Vorzeichenfehler; lassen Sie p und q zuerst aufschreiben, bevor gerechnet wird. GeoGebra zeigt die Parabel und ihre Nullstellen als Kontrolle.'
  },

  'g9-potenzen9': {
    idea: 'Eine <b>negative Hochzahl</b> bedeutet „Kehrwert“: a<sup>−n</sup> = <span class="frac"><span>1</span><span>aⁿ</span></span>. Warum? Geh die Reihe 2³ = 8, 2² = 4, 2¹ = 2, 2⁰ = 1 entlang: Jeder Schritt nach unten <b>halbiert</b>. Weiter geht es mit 2<sup>−1</sup> = <span class="frac"><span>1</span><span>2</span></span>, 2<sup>−2</sup> = <span class="frac"><span>1</span><span>4</span></span>. Die <b>Gleitkommadarstellung</b> schreibt sehr große oder kleine Zahlen als <span class="hl">m · 10ⁿ</span> mit 1 ≤ m &lt; 10. Die Hochzahl n sagt, um wie viele Stellen das Komma verschoben wird.',
    story: 'Die Erde ist ca. 150 000 000 km von der Sonne entfernt = <b>1,5 · 10⁸ km</b>. Ein Bakterium ist etwa 0,000002 m groß = <b>2 · 10<sup>−6</sup> m</b>. So bleiben Nullen übersichtlich – auch im Taschenrechner (Anzeige „E“ oder „×10“).',
    example: {
      task: 'Berechne 2<sup>−3</sup> und 10<sup>−2</sup>',
      lines: [
        '2<sup>−3</sup> = <span class="frac"><span>1</span><span>2³</span></span> = <span class="frac"><span>1</span><span>8</span></span> = 0,125',
        '10<sup>−2</sup> = <span class="frac"><span>1</span><span>10²</span></span> = <span class="frac"><span>1</span><span>100</span></span> = 0,01'
      ]
    },
    more: [
      {
        task: 'Schreibe in Gleitkommadarstellung: 45 000 000 und 0,00032',
        lines: [
          '45 000 000: Komma 7 Stellen nach links → 4,5 · 10⁷',
          '0,00032: Komma 4 Stellen nach rechts → 3,2 · 10<sup>−4</sup>',
          'Merke: große Zahl → positive Hochzahl, Zahl unter 1 → negative Hochzahl'
        ]
      },
      {
        task: 'Berechne (<span class="frac"><span>2</span><span>3</span></span>)<sup>−2</sup>',
        lines: [
          'Kehrwert bilden: (<span class="frac"><span>3</span><span>2</span></span>)²',
          '= <span class="frac"><span>9</span><span>4</span></span> = 2,25'
        ]
      }
    ],
    watch: [
      'Negative Hochzahl macht die Zahl <b>nicht</b> negativ: 2<sup>−3</sup> = 0,125, nicht −8.',
      'Bei m · 10ⁿ muss m zwischen 1 und 10 liegen: 45 · 10⁶ ist richtig gerechnet, aber keine Gleitkommadarstellung.',
      'Stellen zählen: Bei 0,00032 wandert das Komma bis hinter die 3 – das sind 4 Stellen.'
    ],
    parents: 'Lassen Sie sich die „Halbierungsreihe“ 8, 4, 2, 1, ½ … erklären – wer sie versteht, versteht negative Hochzahlen. Zur Kontrolle von Gleitkommazahlen eignet sich der Taschenrechner gut. Alltagszahlen aus Nachrichten (Staatsschulden, Virengröße) sind gute Übungsanlässe.'
  },

  'g9-trigonometrie': {
    idea: 'In einem <b>rechtwinkligen Dreieck</b> hängen Winkel und Seitenverhältnisse fest zusammen: Alle rechtwinkligen Dreiecke mit demselben Winkel α sind nur vergrößerte Kopien voneinander. Darum ist z. B. das Verhältnis Gegenkathete : Hypotenuse immer gleich – das ist der <b>Sinus</b>. Die <b>Hypotenuse (HY)</b> liegt gegenüber dem rechten Winkel, die <b>Gegenkathete (GK)</b> gegenüber von α, die <b>Ankathete (AK)</b> liegt an α.<br><span class="hl">sin α = <span class="frac"><span>GK</span><span>HY</span></span>, cos α = <span class="frac"><span>AK</span><span>HY</span></span>, tan α = <span class="frac"><span>GK</span><span>AK</span></span></span>',
    picture: '<svg viewBox="0 0 200 120" width="200" height="120"><polygon points="20,100 170,100 170,20" fill="none" stroke="currentColor" stroke-width="2"/><rect x="160" y="90" width="10" height="10" fill="none" stroke="currentColor"/><path d="M50 100 A30 30 0 0 0 46.5 86" fill="none" stroke="var(--accent)" stroke-width="2"/><text x="55" y="95" font-size="11" fill="var(--accent)">α</text><text x="80" y="115" font-size="11" fill="currentColor">AK</text><text x="175" y="65" font-size="11" fill="currentColor">GK</text><text x="70" y="52" font-size="11" fill="currentColor">HY</text></svg>',
    story: 'Eine Rollstuhlrampe ist 5 m lang und hat 30° Neigung – wie hoch führt sie? Höhe = 5 · sin 30° = 2,5 m. Genauso berechnen Vermesser die Höhe eines Turms aus Abstand und Blickwinkel.',
    example: {
      task: 'AK = 8 cm, α = 35°. Berechne GK.',
      lines: [
        'Gegeben AK, gesucht GK → tan',
        'tan 35° = <span class="frac"><span>GK</span><span>8</span></span>',
        'GK = 8 · tan 35°',
        'GK ≈ 8 · 0,7002 ≈ 5,60 cm'
      ]
    },
    more: [
      {
        task: 'HY = 10 cm, α = 60°. Berechne AK.',
        lines: [
          'Gegeben HY, gesucht AK → cos',
          'AK = 10 · cos 60° = 10 · 0,5 = 5 cm'
        ]
      },
      {
        task: 'GK = 3 cm, AK = 4 cm. Berechne α.',
        lines: [
          'tan α = <span class="frac"><span>3</span><span>4</span></span> = 0,75',
          'α = tan<sup>−1</sup>(0,75) (Taste SHIFT + tan)',
          'α ≈ 36,87°'
        ]
      }
    ],
    watch: [
      'Taschenrechner auf <b>DEG</b> stellen! Bei RAD oder GRAD kommen falsche Werte (sin 30 wäre dann nicht 0,5).',
      'GK und AK hängen vom Winkel ab: Für den anderen spitzen Winkel tauschen sie die Rollen.',
      'Die Formeln gelten nur im <b>rechtwinkligen</b> Dreieck.',
      'tan<sup>−1</sup> ist nicht <span class="frac"><span>1</span><span>tan</span></span>, sondern die Umkehrung: aus dem Verhältnis den Winkel.'
    ],
    parents: 'Prüfen Sie gemeinsam, ob der Taschenrechner „D“ oder „DEG“ anzeigt – das ist die häufigste Fehlerquelle bei Schularbeiten. Lassen Sie Ihr Kind am Dreieck zeigen, welche Seite GK, AK und HY ist. Eine Skizze vor jeder Rechnung lohnt sich immer.'
  },

  'g9-funktionen9': {
    idea: 'Eine <b>lineare Funktion</b> f(x) = k · x + d ergibt als Graph eine Gerade. <b>d</b> ist der Startwert: dort schneidet die Gerade die y-Achse. <b>k</b> ist die Steigung: Gehst du 1 nach rechts, geht es um k nach oben (oder bei negativem k nach unten). Aus zwei Punkten P(x₁ | y₁) und Q(x₂ | y₂) erhältst du <span class="hl">k = <span class="frac"><span>y₂ − y₁</span><span>x₂ − x₁</span></span></span> – also „Höhenunterschied durch Weg nach rechts“. Die <b>Nullstelle</b> ist dort, wo f(x) = 0 ist, also die Gerade die x-Achse schneidet.',
    picture: '<svg viewBox="0 0 200 120" width="200" height="120"><line x1="10" y1="100" x2="190" y2="100" stroke="var(--border)"/><line x1="40" y1="5" x2="40" y2="115" stroke="var(--border)"/><line x1="10" y1="110" x2="180" y2="25" stroke="var(--accent)" stroke-width="2"/><polyline points="80,80 120,80 120,60" fill="none" stroke="currentColor" stroke-dasharray="3 2"/><text x="92" y="92" font-size="10" fill="currentColor">1</text><text x="124" y="74" font-size="10" fill="currentColor">k</text><circle cx="40" cy="95" r="3" fill="currentColor"/><text x="44" y="112" font-size="10" fill="currentColor">d</text></svg>',
    story: 'Ein Taxi verlangt 4 € Grundgebühr und 1,50 € pro km: f(x) = 1,5 · x + 4. Hier ist d = 4 € (zahlst du immer) und k = 1,50 € (jeder weitere km). Für 10 km zahlst du f(10) = 19 €.',
    example: {
      task: 'Gerade durch P(1 | 3) und Q(4 | 9): Bestimme f(x).',
      lines: [
        'k = <span class="frac"><span>9 − 3</span><span>4 − 1</span></span> = <span class="frac"><span>6</span><span>3</span></span> = 2',
        'P einsetzen: 3 = 2 · 1 + d',
        'd = 1',
        'f(x) = 2x + 1',
        'Probe mit Q: 2 · 4 + 1 = 9 ✓'
      ]
    },
    more: [
      {
        task: 'Nullstelle von f(x) = 2x + 1',
        lines: [
          'f(x) = 0 setzen: 2x + 1 = 0',
          '2x = −1',
          'x = −0,5 → Nullstelle N(−0,5 | 0)'
        ]
      }
    ],
    watch: [
      'Bei k oben und unten in <b>derselben Reihenfolge</b> subtrahieren (beide Male Q minus P).',
      'Negative Steigung heißt: Gerade fällt. Vorzeichen nicht verlieren.',
      'Nullstelle ist ein x-Wert, bei dem y = 0 ist – nicht der y-Achsenabschnitt d.'
    ],
    parents: 'Suchen Sie gemeinsam Alltagsbeispiele mit Grundgebühr und Preis pro Einheit (Strom, Taxi, Handy) und fragen Sie: „Was ist hier k, was ist d?“ In GeoGebra kann Ihr Kind die Funktion eintippen und sofort sehen, ob die Punkte auf der Geraden liegen.'
  },

  'g10-log': {
    idea: 'Der <b>Logarithmus</b> beantwortet die Frage: „<i>Mit welcher Hochzahl</i> muss ich die Basis potenzieren, um die Zahl zu bekommen?“ Also: <span class="hl">log<sub>b</sub>(n) = x &nbsp;⇔&nbsp; bˣ = n</span>. Der Logarithmus ist die Umkehrung des Potenzierens – so wie Wurzelziehen die Umkehrung des Quadrierens ist. <b>lg</b> ist der Logarithmus zur Basis 10. Weil 10<sup>−1</sup> = 0,1 ist, sind Logarithmen von Zahlen <b>zwischen 0 und 1 negativ</b>. Von 0 und negativen Zahlen gibt es keinen Logarithmus.',
    story: 'Die Lautstärke in Dezibel und die Erdbebenstärke (Richterskala) sind logarithmisch: Ein Erdbeben der Stärke 6 hat eine 10-mal so große Ausschlagsamplitude wie eines der Stärke 5. Auch die Frage „Nach wie vielen Jahren verdoppelt sich mein Geld?“ löst man mit Logarithmen.',
    example: {
      task: 'Berechne log₂(8) und lg(1000).',
      lines: [
        'log₂(8): 2 hoch wie viel ist 8? 2³ = 8 → <b>3</b>',
        'lg(1000): 10 hoch wie viel ist 1000? 10³ = 1000 → <b>3</b>'
      ]
    },
    more: [
      {
        task: 'Berechne lg(0,01) und log₃(81).',
        lines: [
          '0,01 = <span class="frac"><span>1</span><span>100</span></span> = 10<sup>−2</sup> → lg(0,01) = −2',
          '3⁴ = 81 → log₃(81) = 4'
        ]
      },
      {
        task: 'Berechne log₂(10) mit dem Taschenrechner.',
        lines: [
          'Umrechnen: log₂(10) = lg(10) : lg(2)',
          '= 1 : 0,30103 ≈ 3,32',
          'Probe: 2<sup>3,32</sup> ≈ 10 ✓'
        ]
      }
    ],
    watch: [
      'Das Ergebnis ist die <b>Hochzahl</b>, nicht die Zahl selbst.',
      'lg(0,5) ≈ −0,301 ist negativ – das ist richtig, kein Rechenfehler.',
      'Am Taschenrechner: „log“ ist meist lg (Basis 10), „ln“ ist Basis e – nicht verwechseln.'
    ],
    parents: 'Lassen Sie Ihr Kind jede Aufgabe als Frage aussprechen: „2 hoch wie viel ergibt 8?“ Das macht den Logarithmus greifbar. Die Probe ist einfach: Basis hoch Ergebnis muss die Ausgangszahl liefern – das kann man mit dem Taschenrechner leicht prüfen.'
  },

  'g10-wachstum': {
    idea: 'Beim <b>linearen Wachstum</b> kommt in jedem Schritt <b>derselbe Betrag</b> dazu (+30 € pro Jahr). Beim <b>exponentiellen Wachstum</b> wird in jedem Schritt mit <b>demselben Faktor</b> multipliziert (+3 % pro Jahr). Da die Prozente immer vom schon gewachsenen Wert berechnet werden, wächst es immer schneller. Formel: <span class="hl">K<sub>n</sub> = K₀ · qⁿ</span> mit Wachstumsfaktor q = 1 + <span class="frac"><span>p</span><span>100</span></span>, bei Abnahme (Zerfall) q = 1 − <span class="frac"><span>p</span><span>100</span></span>. q &gt; 1 heißt Wachstum, 0 &lt; q &lt; 1 heißt Zerfall.',
    picture: '<svg viewBox="0 0 200 120" width="200" height="120"><line x1="20" y1="105" x2="190" y2="105" stroke="var(--border)"/><line x1="20" y1="5" x2="20" y2="105" stroke="var(--border)"/><line x1="20" y1="85" x2="185" y2="45" stroke="currentColor" stroke-width="2"/><path d="M20 85 C100 80 150 60 185 8" fill="none" stroke="var(--accent)" stroke-width="2"/><text x="140" y="70" font-size="10" fill="currentColor">linear</text><text x="120" y="25" font-size="10" fill="var(--accent)">exponentiell</text></svg>',
    story: 'Sparbuch: 1 000 € mit 3 % Zinsen wachsen jedes Jahr um 3 % vom <i>aktuellen</i> Guthaben (Zinseszins). Medikament im Blut: Der Körper baut pro Stunde 20 % ab – es bleiben jeweils 80 % übrig.',
    example: {
      task: '1 000 € werden 5 Jahre mit 3 % verzinst. Wie viel ist es dann?',
      lines: [
        'q = 1 + <span class="frac"><span>3</span><span>100</span></span> = 1,03',
        'K₅ = 1000 · 1,03⁵',
        'K₅ ≈ 1159,27 €',
        'Vergleich linear (+30 € pro Jahr): 1000 + 5 · 30 = 1150 €'
      ]
    },
    more: [
      {
        task: '200 mg Wirkstoff, pro Stunde werden 20 % abgebaut. Wie viel ist nach 3 Stunden übrig?',
        lines: [
          'q = 1 − 0,20 = 0,8',
          '200 · 0,8³ = 200 · 0,512',
          '= 102,4 mg'
        ]
      }
    ],
    watch: [
      'Bei Abnahme ist q = 1 − <span class="frac"><span>p</span><span>100</span></span>, also bei 20 % q = 0,8 – nicht 0,2!',
      'Prozent nicht einfach mal Jahre rechnen: 5 · 3 % = 15 % wäre linear gedacht.',
      'Die Hochzahl n ist die Anzahl der Zeitschritte – Einheit (Jahre, Stunden) prüfen.'
    ],
    parents: 'Ein Kontoauszug oder ein Kreditangebot ist ein ideales Übungsbeispiel. Fragen Sie: „Wächst das um einen festen Betrag oder um einen festen Prozentsatz?“ Mit einer Tabelle (Jahr für Jahr ausrechnen) kann Ihr Kind die Formel selbst überprüfen.'
  },

  'g10-folgen': {
    idea: 'Eine <b>Folge</b> ist eine nummerierte Liste von Zahlen a₁, a₂, a₃, … Bei einer <b>arithmetischen Folge</b> kommt immer dieselbe Differenz d dazu (5, 8, 11, 14 …). Vom 1. zum n-ten Glied machst du n − 1 Schritte, daher <span class="hl">aₙ = a₁ + (n − 1) · d</span>. Bei einer <b>geometrischen Folge</b> wird immer mit demselben Faktor q multipliziert (3, 6, 12, 24 …). Hier gilt <span class="hl">aₙ = a₁ · qⁿ<sup>−1</sup></span>. Arithmetisch entspricht linearem, geometrisch exponentiellem Wachstum.',
    story: 'Du legst jede Woche 5 € mehr zur Seite als in der Woche davor – arithmetisch. Eine Kettennachricht, die jede Person an 2 weitere schickt, verdoppelt sich in jeder Runde – geometrisch.',
    example: {
      task: 'Arithmetische Folge: a₁ = 5, d = 3. Berechne a₁₀.',
      lines: [
        'a₁₀ = a₁ + (10 − 1) · d',
        '= 5 + 9 · 3',
        '= 5 + 27 = 32'
      ]
    },
    more: [
      {
        task: 'Geometrische Folge: a₁ = 3, q = 2. Berechne a₆.',
        lines: [
          'a₆ = a₁ · q<sup>6 − 1</sup> = 3 · 2⁵',
          '= 3 · 32 = 96',
          'Kontrolle: 3, 6, 12, 24, 48, 96 ✓'
        ]
      }
    ],
    watch: [
      'Es heißt (n − 1), nicht n: Bis zum 10. Glied gibt es nur 9 Schritte.',
      'Arithmetisch: Differenz gleich? Geometrisch: Quotient gleich? Vorher prüfen, welcher Typ vorliegt.',
      'Bei a₁ · qⁿ<sup>−1</sup> nur q potenzieren, nicht a₁ · q.'
    ],
    parents: 'Lassen Sie die ersten Glieder einfach händisch aufschreiben – so kann Ihr Kind die Formel selbst kontrollieren. Die Frage „Kommt immer gleich viel dazu oder wird immer mit gleich viel multipliziert?“ klärt den Typ.'
  },

  'g10-vektoren': {
    idea: 'Ein <b>Vektor</b> ist ein Pfeil, der eine <b>Verschiebung</b> beschreibt: a = (3 | 4) heißt „3 nach rechts, 4 nach oben“. Alle Pfeile mit gleicher Richtung und Länge sind derselbe Vektor, egal wo sie beginnen. Die Länge heißt <b>Betrag</b>; nach Pythagoras gilt <span class="hl">|a| = √(x² + y²)</span>. Das <b>Skalarprodukt</b> zweier Vektoren ist eine Zahl: <span class="hl">a · b = a₁ · b₁ + a₂ · b₂</span>. Ist es <b>0</b>, stehen die Vektoren <b>normal</b> (im rechten Winkel) aufeinander.',
    picture: '<svg viewBox="0 0 200 120" width="200" height="120"><line x1="10" y1="105" x2="190" y2="105" stroke="var(--border)"/><line x1="60" y1="5" x2="60" y2="115" stroke="var(--border)"/><line x1="60" y1="105" x2="120" y2="25" stroke="var(--accent)" stroke-width="2"/><polygon points="120,25 110,32 117,37" fill="var(--accent)"/><line x1="60" y1="105" x2="140" y2="105" stroke="none"/><line x1="120" y1="25" x2="120" y2="105" stroke="var(--muted)" stroke-dasharray="3 2"/><text x="125" y="70" font-size="10" fill="currentColor">4</text><text x="88" y="117" font-size="10" fill="currentColor">3</text><text x="72" y="55" font-size="10" fill="var(--accent)">|a| = 5</text></svg>',
    story: 'Ein Navi beschreibt Wege als Verschiebungen: „300 m Richtung Osten, 400 m Richtung Norden“ – Luftlinie sind das √(300² + 400²) = 500 m. Auch Kräfte und Geschwindigkeiten in der Physik sind Vektoren.',
    example: {
      task: 'Berechne den Betrag von a = (3 | 4).',
      lines: [
        '|a| = √(3² + 4²)',
        '= √(9 + 16) = √25',
        '= 5'
      ]
    },
    more: [
      {
        task: 'Berechne a · b für a = (2 | 1), b = (3 | 5).',
        lines: [
          'a · b = 2 · 3 + 1 · 5',
          '= 6 + 5 = 11'
        ]
      },
      {
        task: 'Stehen a = (3 | 4) und b = (−4 | 3) normal aufeinander?',
        lines: [
          'a · b = 3 · (−4) + 4 · 3',
          '= −12 + 12 = 0',
          'Skalarprodukt 0 → ja, sie stehen normal aufeinander.'
        ]
      }
    ],
    watch: [
      '√(9 + 16) ist nicht √9 + √16 = 7! Erst addieren, dann Wurzel ziehen.',
      'Beim Quadrieren wird alles positiv: (−4)² = 16.',
      'Das Skalarprodukt ist eine <b>Zahl</b>, kein Vektor.'
    ],
    parents: 'Lassen Sie Ihr Kind Vektoren auf Karopapier als Pfeile zeichnen – das macht die Rechnung anschaulich. Der Betrag lässt sich mit dem Lineal nachmessen. GeoGebra kann Vektoren direkt darstellen und rechnen.'
  },

  'g11-ableitung': {
    idea: 'Die <b>Ableitung</b> f′(x) gibt an, wie <b>steil</b> der Graph an einer Stelle ist – die <b>momentane Änderungsrate</b>. Man stellt sich vor, zwei Punkte auf dem Graphen rücken immer näher zusammen: Die Sekante wird zur <b>Tangente</b>, und deren Steigung ist f′(x₀). Rechenregel (<b>Potenzregel</b>): <span class="hl">(xⁿ)′ = n · xⁿ<sup>−1</sup></span> – Hochzahl nach vorne, Hochzahl um 1 kleiner. Faktoren bleiben stehen, <b>Konstanten fallen weg</b> (sie verschieben den Graphen nur nach oben, ändern die Steilheit nicht). An Hoch- und Tiefpunkten ist die Tangente waagrecht, also gilt dort <b>f′(x) = 0</b>.',
    picture: '<svg viewBox="0 0 200 120" width="200" height="120"><path d="M10 110 Q100 -40 190 110" fill="none" stroke="currentColor" stroke-width="2"/><line x1="40" y1="100" x2="130" y2="10" stroke="var(--accent)" stroke-width="2"/><circle cx="68" cy="72" r="3" fill="var(--accent)"/><line x1="60" y1="35" x2="140" y2="35" stroke="var(--muted)" stroke-dasharray="4 3"/><text x="135" y="20" font-size="10" fill="var(--accent)">Tangente</text><text x="145" y="38" font-size="10" fill="currentColor">f′ = 0</text></svg>',
    story: 'Der Tacho im Auto zeigt die <b>momentane</b> Geschwindigkeit – das ist die Ableitung des zurückgelegten Weges nach der Zeit. Die Durchschnittsgeschwindigkeit (Weg : Zeit) entspricht dagegen der Sekantensteigung.',
    example: {
      task: 'f(x) = x³ − 4x² + 2x − 7. Berechne f′(x) und die Tangentensteigung bei x₀ = 2.',
      lines: [
        'x³ → 3x², &nbsp;−4x² → −8x, &nbsp;2x → 2, &nbsp;−7 → 0',
        'f′(x) = 3x² − 8x + 2',
        'f′(2) = 3 · 4 − 8 · 2 + 2',
        '= 12 − 16 + 2 = −2 → Tangente fällt mit Steigung −2'
      ]
    },
    more: [
      {
        task: 'Extremstelle von f(x) = x² − 6x + 5',
        lines: [
          'f′(x) = 2x − 6',
          '2x − 6 = 0 → x = 3',
          'f(3) = 9 − 18 + 5 = −4',
          'Nach oben offene Parabel → Tiefpunkt T(3 | −4)'
        ]
      },
      {
        task: 'Extremstellen von f(x) = x³ − 12x (Form x³ − 3a²x mit a = 2)',
        lines: [
          'f′(x) = 3x² − 12',
          '3x² − 12 = 0 → x² = 4 → x = ±2 (allgemein x = ±a)',
          'f(−2) = −8 + 24 = 16 → Hochpunkt H(−2 | 16)',
          'f(2) = 8 − 24 = −16 → Tiefpunkt T(2 | −16)',
          'Kontrolle mit f″(x) = 6x: f″(2) = 12 &gt; 0 → Tiefpunkt ✓'
        ]
      }
    ],
    watch: [
      'Konstante Zahlen fallen beim Ableiten ganz weg (−7 → 0), 2x wird zu 2 (nicht 0).',
      'f′(x₀) ist die Steigung, nicht der Funktionswert – für den Punkt brauchst du f(x₀).',
      'Bei x² = 4 gibt es <b>zwei</b> Lösungen: +2 und −2.',
      'Nach f′(x) = 0 noch den y-Wert mit f(x) ausrechnen.'
    ],
    parents: 'Fragen Sie: „Was bedeutet die Ableitung in Worten?“ – die Antwort „Steigung“ oder „wie schnell sich etwas ändert“ zeigt echtes Verständnis. In GeoGebra lässt sich jede Funktion zeichnen und ein Hoch- oder Tiefpunkt ablesen; so kann Ihr Kind sich selbst kontrollieren.'
  },

  'g11-wahrscheinlichkeit': {
    idea: 'Wenn alle Ergebnisse eines Zufallsversuchs <b>gleich wahrscheinlich</b> sind (Laplace-Versuch), gilt:<br><span class="hl">P(E) = <span class="frac"><span>Anzahl günstige Fälle</span><span>Anzahl mögliche Fälle</span></span></span><br>Das Ergebnis liegt immer zwischen 0 (unmöglich) und 1 (sicher). Bei <b>zwei Würfeln</b> gibt es 6 · 6 = <b>36</b> gleich wahrscheinliche Paare (erster Würfel, zweiter Würfel). Wichtig: (1, 6) und (6, 1) sind verschiedene Paare. Darum sind Augensummen nicht gleich wahrscheinlich – die 7 kommt am häufigsten.',
    picture: '<svg viewBox="0 0 132 132" width="132" height="132"><g stroke="var(--border)" fill="none"><rect x="6" y="6" width="120" height="120"/><line x1="26" y1="6" x2="26" y2="126"/><line x1="46" y1="6" x2="46" y2="126"/><line x1="66" y1="6" x2="66" y2="126"/><line x1="86" y1="6" x2="86" y2="126"/><line x1="106" y1="6" x2="106" y2="126"/><line x1="6" y1="26" x2="126" y2="26"/><line x1="6" y1="46" x2="126" y2="46"/><line x1="6" y1="66" x2="126" y2="66"/><line x1="6" y1="86" x2="126" y2="86"/><line x1="6" y1="106" x2="126" y2="106"/></g><g fill="var(--accent)"><rect x="106" y="6" width="20" height="20"/><rect x="86" y="26" width="20" height="20"/><rect x="66" y="46" width="20" height="20"/><rect x="46" y="66" width="20" height="20"/><rect x="26" y="86" width="20" height="20"/><rect x="6" y="106" width="20" height="20"/></g></svg>',
    story: 'Bei „Mensch ärgere dich nicht“ brauchst du einen Sechser: P = <span class="frac"><span>1</span><span>6</span></span>. Bei der Losbude mit 20 Losen und 5 Gewinnen ist P(Gewinn) = <span class="frac"><span>5</span><span>20</span></span> = 25 %.',
    example: {
      task: 'Zwei Würfel: Wie wahrscheinlich ist die Augensumme 7?',
      lines: [
        'Mögliche Fälle: 6 · 6 = 36',
        'Günstige: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6',
        'P = <span class="frac"><span>6</span><span>36</span></span> = <span class="frac"><span>1</span><span>6</span></span> ≈ 16,7 %'
      ]
    },
    more: [
      {
        task: 'Zwei Würfel: Augensumme 10?',
        lines: [
          'Günstige: (4,6), (5,5), (6,4) → 3',
          'P = <span class="frac"><span>3</span><span>36</span></span> = <span class="frac"><span>1</span><span>12</span></span> ≈ 8,3 %'
        ]
      },
      {
        task: 'Urne mit 3 roten und 5 blauen Kugeln. Eine Kugel wird gezogen: P(rot)?',
        lines: [
          'Mögliche: 3 + 5 = 8 Kugeln',
          'Günstige: 3 rote',
          'P(rot) = <span class="frac"><span>3</span><span>8</span></span> = 0,375 = 37,5 %'
        ]
      }
    ],
    watch: [
      '(5,5) zählt nur einmal, (4,6) und (6,4) zählen doppelt.',
      'Mögliche Fälle sind <b>alle</b> Kugeln, nicht nur die anderen Farben.',
      'Eine Wahrscheinlichkeit größer als 1 ist immer ein Fehler.'
    ],
    parents: 'Würfeln Sie gemeinsam 50-mal mit zwei Würfeln und zählen Sie die Augensummen – die 7 gewinnt fast immer. Das macht den Unterschied zwischen „Paaren“ und „Summen“ sichtbar. Lassen Sie Ihr Kind günstige Fälle immer vollständig auflisten.'
  },

  'g11-vektoren3d': {
    idea: 'Im Raum hat ein Vektor <b>drei</b> Koordinaten: a = (x | y | z) – nach vorne, zur Seite, nach oben. Alles aus der Ebene funktioniert genauso, nur mit einer Komponente mehr. Der <b>Betrag</b> (Länge) ist <span class="hl">|a| = √(x² + y² + z²)</span> – das ist zweimal Pythagoras hintereinander. Das <b>Skalarprodukt</b> ist <span class="hl">a · b = a₁b₁ + a₂b₂ + a₃b₃</span>. Wie in 2D gilt: Skalarprodukt 0 heißt, die Vektoren stehen normal aufeinander.',
    story: 'Die Raumdiagonale eines Schuhkartons (30 cm × 20 cm × 12 cm) ist √(30² + 20² + 12²) = √1444 = 38 cm lang – so weißt du, ob ein Regenschirm hineinpasst. Auch Drohnenflüge und 3D-Computerspiele rechnen mit Raumvektoren.',
    example: {
      task: 'Berechne |a| für a = (2 | 3 | 6).',
      lines: [
        '|a| = √(2² + 3² + 6²)',
        '= √(4 + 9 + 36) = √49',
        '= 7'
      ]
    },
    more: [
      {
        task: 'Berechne a · b für a = (2 | −1 | 3), b = (1 | 4 | 2).',
        lines: [
          'a · b = 2 · 1 + (−1) · 4 + 3 · 2',
          '= 2 − 4 + 6 = 4'
        ]
      },
      {
        task: 'Stehen a = (1 | 2 | 3) und b = (4 | −5 | 2) normal aufeinander?',
        lines: [
          'a · b = 4 − 10 + 6 = 0',
          '→ ja, sie stehen normal aufeinander.'
        ]
      }
    ],
    watch: [
      'Nur gleiche Komponenten multiplizieren: x mit x, y mit y, z mit z.',
      'Negative Komponenten in Klammern setzen: (−1) · 4 = −4, aber (−1)² = 1.',
      'Die z-Komponente nicht vergessen – das ist der häufigste Fehler beim Umstieg von 2D.'
    ],
    parents: 'Messen Sie gemeinsam eine Schachtel aus und lassen Sie Ihr Kind die Raumdiagonale berechnen – dann mit einer Schnur nachmessen. GeoGebra 3D zeigt Raumvektoren anschaulich und rechnet zur Kontrolle mit.'
  },

  'g12-integral': {
    idea: 'Das <b>Integrieren</b> ist die Umkehrung des Ableitens. Eine <b>Stammfunktion</b> F von f ist eine Funktion mit F′ = f. Regel: <span class="hl">xⁿ → <span class="frac"><span>xⁿ<sup>+1</sup></span><span>n + 1</span></span></span> (Hochzahl um 1 größer, durch die neue Hochzahl dividieren). Weil Konstanten beim Ableiten wegfallen, schreibt man <b>+ C</b> dazu. Das <b>bestimmte Integral</b> ∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a) misst die <b>orientierte Fläche</b> zwischen Graph und x-Achse: Flächen oberhalb zählen positiv, unterhalb negativ.',
    picture: '<svg viewBox="0 0 200 120" width="200" height="120"><path d="M50 100 L50 70 Q100 30 150 40 L150 100 Z" fill="var(--accent)" opacity="0.3" stroke="none"/><line x1="10" y1="100" x2="190" y2="100" stroke="var(--border)"/><path d="M15 90 Q50 75 50 70 Q100 30 150 40 Q170 45 190 30" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="70" x2="50" y2="100" stroke="var(--muted)" stroke-dasharray="3 2"/><line x1="150" y1="40" x2="150" y2="100" stroke="var(--muted)" stroke-dasharray="3 2"/><text x="46" y="114" font-size="11" fill="currentColor">a</text><text x="146" y="114" font-size="11" fill="currentColor">b</text><text x="85" y="85" font-size="11" fill="currentColor">Fläche</text></svg>',
    story: 'Zeigt der Tacho die Geschwindigkeit über die Zeit, dann ist die <b>Fläche</b> unter dieser Kurve der zurückgelegte <b>Weg</b>: Bei konstant 50 km/h über 2 Stunden ist das ein Rechteck mit 50 · 2 = 100 km. Ebenso ergibt die Fläche unter einer Zuflusskurve die Wassermenge im Tank.',
    example: {
      task: 'Berechne ∫<sub>1</sub><sup>3</sup> (2x + 1) dx',
      lines: [
        'Stammfunktion: F(x) = x² + x',
        'F(3) = 9 + 3 = 12',
        'F(1) = 1 + 1 = 2',
        'F(3) − F(1) = 12 − 2 = 10'
      ]
    },
    more: [
      {
        task: 'Bestimme eine Stammfunktion von f(x) = 3x² + 4x',
        lines: [
          '3x² → 3 · <span class="frac"><span>x³</span><span>3</span></span> = x³',
          '4x → 4 · <span class="frac"><span>x²</span><span>2</span></span> = 2x²',
          'F(x) = x³ + 2x² + C',
          'Probe: F′(x) = 3x² + 4x ✓'
        ]
      },
      {
        task: 'Berechne ∫<sub>0</sub><sup>3</sup> (x² − 3x) dx und deute das Ergebnis.',
        lines: [
          'F(x) = <span class="frac"><span>x³</span><span>3</span></span> − <span class="frac"><span>3x²</span><span>2</span></span>',
          'F(3) = 9 − 13,5 = −4,5, &nbsp;F(0) = 0',
          'Ergebnis −4,5: Der Graph liegt zwischen 0 und 3 <b>unter</b> der x-Achse.',
          'Die Fläche selbst ist 4,5 Flächeneinheiten.'
        ]
      }
    ],
    watch: [
      'Beim unbestimmten Integral das <b>+ C</b> nicht vergessen.',
      'Reihenfolge: F(<b>obere</b> Grenze) − F(<b>untere</b> Grenze).',
      'Liegt ein Teil unter der x-Achse, heben sich Flächen auf – für die echte Fläche die Teile einzeln (mit Betrag) berechnen.',
      'Probe: Stammfunktion ableiten – es muss wieder f(x) herauskommen.'
    ],
    parents: 'Die beste Selbstkontrolle ist: „Leite deine Stammfunktion ab – kommt die Ausgangsfunktion heraus?“ Das kann Ihr Kind ohne fremde Hilfe prüfen. GeoGebra berechnet Integrale mit dem Befehl Integral(f, a, b) und färbt die Fläche ein.'
  },

  'g12-binomial': {
    idea: 'Die <b>Binomialverteilung</b> beschreibt, wie oft ein Ereignis bei <b>n unabhängigen Wiederholungen</b> mit gleicher Trefferwahrscheinlichkeit p eintritt.<br><span class="hl">P(X = k) = (<sup>n</sup><sub>k</sub>) · pᵏ · (1 − p)ⁿ<sup>−k</sup></span><br>Die drei Faktoren: <b>pᵏ</b> – k Treffer; <b>(1 − p)ⁿ<sup>−k</sup></b> – die übrigen n − k Versuche sind Nieten; <b>(n über k)</b> – so viele verschiedene Reihenfolgen gibt es, die k Treffer auf n Versuche zu verteilen. Der <b>Erwartungswert</b> <span class="hl">E(X) = n · p</span> sagt, wie viele Treffer man im Schnitt erwartet.',
    story: 'Ein Fußballer trifft beim Elfmeter mit 80 %. Wie wahrscheinlich trifft er bei 5 Elfmetern genau 4-mal? Im Schnitt erwartet man 5 · 0,8 = 4 Treffer – aber genau 4 passiert trotzdem nur in rund 41 % der Fälle.',
    example: {
      task: 'n = 5, p = 0,8. Berechne P(X = 4).',
      lines: [
        '(<sup>5</sup><sub>4</sub>) = 5 (der eine Fehlschuss kann an 5 Stellen sein)',
        '0,8⁴ = 0,4096',
        '0,2¹ = 0,2',
        'P(X = 4) = 5 · 0,4096 · 0,2 = 0,4096 ≈ 41 %',
        'E(X) = 5 · 0,8 = 4'
      ]
    },
    more: [
      {
        task: 'Wie wahrscheinlich trifft er mindestens einmal (n = 5, p = 0,8)?',
        lines: [
          'Gegenereignis: kein Treffer',
          'P(X = 0) = 1 · 0,8⁰ · 0,2⁵ = 0,00032',
          'P(X ≥ 1) = 1 − 0,00032 = 0,99968'
        ]
      },
      {
        task: 'Ein Würfel wird 10-mal geworfen. P(genau 2 Sechser)?',
        lines: [
          'n = 10, p = <span class="frac"><span>1</span><span>6</span></span>, k = 2',
          '(<sup>10</sup><sub>2</sub>) = 45',
          'P = 45 · (<span class="frac"><span>1</span><span>6</span></span>)² · (<span class="frac"><span>5</span><span>6</span></span>)⁸ ≈ 0,291'
        ]
      }
    ],
    watch: [
      'Die Hochzahlen müssen zusammen n ergeben: k + (n − k) = n.',
      '„Mindestens einmal“ fast immer über das Gegenereignis 1 − P(X = 0) rechnen.',
      'Nur anwendbar, wenn p bei jedem Versuch gleich bleibt (z. B. Ziehen <b>mit</b> Zurücklegen).'
    ],
    parents: 'Lassen Sie Ihr Kind die drei Faktoren der Formel in eigenen Worten erklären – wer das kann, hat es verstanden. Auf dem Taschenrechner oder in GeoGebra (Wahrscheinlichkeitsrechner) lässt sich jedes Ergebnis prüfen. Alltagsbeispiele aus dem Sport eignen sich gut.'
  },

  'g12-matura': {
    idea: 'Hier ist dein <b>Spickzettel</b> für die Zentralmatura: die wichtigsten Rechenwege auf einen Blick, je mit einem Mini-Beispiel. Die schriftliche Matura besteht aus <b>Teil 1</b> (Typ-1-Aufgaben zu Grundkompetenzen, kurz und einzeln) und <b>Teil 2</b> (Typ-2-Aufgaben, längere Kontexte). Du darfst die offizielle <b>Formelsammlung</b> und die zugelassene Technologie (z. B. GeoGebra oder deinen Taschenrechner) verwenden – kenne beide gut, bevor es ernst wird.',
    story: 'Vorbereitung wie beim Sport: lieber jede Woche ein paar Aufgaben als alles in der letzten Woche. Rechne alte Maturaaufgaben aus dem offiziellen <b>Aufgabenpool</b> (IQS, früher BIFIE) unter Zeitdruck und mit genau den Hilfsmitteln, die du bei der Matura hast.',
    example: {
      task: 'Spickzettel – Teil A',
      lines: [
        '<b>Ableiten:</b> (x⁴ − 3x + 2)′ = 4x³ − 3',
        '<b>Integral:</b> ∫<sub>0</sub><sup>1</sup> 3x² dx = [x³]₀¹ = 1 − 0 = 1',
        '<b>Binomial:</b> n = 3, p = 0,5: P(X = 2) = 3 · 0,5² · 0,5 = 0,375',
        '<b>Wachstum:</b> 500 € mit 2 % auf 10 Jahre: 500 · 1,02¹⁰ ≈ 609,50 €'
      ]
    },
    more: [
      {
        task: 'Spickzettel – Teil B',
        lines: [
          '<b>Quadratische Gleichung:</b> x² − 5x + 6 = 0 → x = 2,5 ± √(6,25 − 6) = 2,5 ± 0,5 → x₁ = 3, x₂ = 2',
          '<b>Trigonometrie:</b> HY = 10, α = 30°: GK = 10 · sin 30° = 5 (Rechner auf DEG!)',
          '<b>Extremstelle:</b> f′(x) = 0 setzen, x in f einsetzen',
          '<b>Erwartungswert:</b> E(X) = n · p'
        ]
      },
      {
        task: 'So bereitest du dich vor',
        lines: [
          'Ab ca. 3 Monaten vorher: jede Woche ein Themenblock aus dem Aufgabenpool',
          'Fehler sammeln: eigene „Fehlerliste“ führen und vor der Matura durchlesen',
          'Formelsammlung kennen: wo steht was?',
          'Probematura unter echter Zeit rechnen; bei Teil 1 nicht zu lange an einer Aufgabe hängen'
        ]
      }
    ],
    watch: [
      'Bei Typ-1-Aufgaben genau lesen, was gefragt ist (ankreuzen, zuordnen, ergänzen) – die Form zählt.',
      'Einheiten und Kontext angeben: „609,50 €“ statt nur „609,5“.',
      'Rechner-Modus (DEG) und Akku vor der Matura prüfen.',
      'Ergebnisse auf Plausibilität prüfen: Wahrscheinlichkeit zwischen 0 und 1, Fläche nicht negativ.'
    ],
    parents: 'Helfen Sie bei der Zeitplanung: ein fixer Wochenplan mit Matura-Themen ab dem Frühjahr nimmt viel Druck. Fragen Sie regelmäßig: „Welches Thema hast du diese Woche geübt, und wo hakt es noch?“ Sie müssen die Mathematik nicht beherrschen – ruhige Lernzeiten und das Bestehen auf Probematuras unter Echtbedingungen helfen am meisten.'
  }
};
