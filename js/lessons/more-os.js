// Erklärseiten Oberstufe (neue Themen): Idee, Bild, Alltagsbeispiel, Rechenweg, Stolperfallen, Elterntipp.
export default {
  'g9-terme9': {
    idea: 'Drei Werkzeuge, die du in der ganzen Oberstufe brauchst. <b>Zahlenmengen:</b> ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ. In ℚ liegen alle Brüche, auch endliche und periodische Dezimalzahlen. Zahlen wie √2 oder π lassen sich nicht als Bruch schreiben, sie sind <b>irrational</b> und liegen erst in ℝ. <b>Ungleichungen</b> löst du fast wie Gleichungen, mit einer wichtigen Ausnahme: <span class="hl">Multiplizierst oder dividierst du mit einer negativen Zahl, dreht sich das Ungleichheitszeichen um.</span> Die Lösung ist kein einzelner Wert, sondern ein ganzer Bereich, z. B. x &lt; −3. <b>Formeln umformen</b> heißt: Schritt für Schritt die Gegenoperation auf beiden Seiten, bis die gesuchte Größe allein steht.',
    picture: '<svg viewBox="0 0 220 70" width="220" height="70"><line x1="10" y1="35" x2="210" y2="35" stroke="currentColor"/><line x1="10" y1="35" x2="98" y2="35" stroke="var(--accent)" stroke-width="4"/><circle cx="110" cy="35" r="6" fill="none" stroke="var(--accent)" stroke-width="2"/><text x="102" y="60" font-size="12" fill="currentColor">−3</text><text x="30" y="22" font-size="12" fill="currentColor">x &lt; −3</text><text x="140" y="22" font-size="11" fill="currentColor">−3 gehört nicht dazu</text></svg>',
    story: 'Ein Handytarif kostet 9 € Grundgebühr plus 2 € pro GB, das Budget sind 25 €. Aus 9 + 2x ≤ 25 folgt x ≤ 8: Du kannst <b>höchstens 8 GB</b> verbrauchen. Ungleichungen beantworten genau solche Fragen nach „höchstens“ und „mindestens“.',
    example: {
      task: 'Löse die Ungleichung −2x + 5 &gt; 11.',
      lines: [
        '− 5 auf beiden Seiten: −2x &gt; 6',
        ': (−2) auf beiden Seiten. Negative Zahl, also dreht sich das Zeichen um: x &lt; −3',
        'Probe mit x = −4: −2 · (−4) + 5 = 13 &gt; 11 ✓',
        'Gegenprobe mit x = 0: 5 &gt; 11 ist falsch ✓',
        'Lösung: alle x &lt; −3'
      ]
    },
    more: [
      {
        task: 'Forme V = r² · π · h nach h um und berechne h für V = 500 cm³, r = 5 cm.',
        lines: [
          'h steht mit r² · π malgenommen da, also durch r² · π dividieren:',
          'h = V : (r² · π)',
          'h = 500 : (25 · π) ≈ 6,37 cm',
          'Erst umformen, dann einsetzen: So bleibt der Rechenweg übersichtlich.'
        ]
      },
      {
        task: 'In welcher kleinsten Zahlenmenge liegen 0,3̅ (periodisch), √2 und √(−4)?',
        lines: [
          '0,3̅ = 1/3 ist ein Bruch, also ℚ.',
          '√2 ≈ 1,41421356… endet nie und wiederholt sich nicht, also irrational: ℝ.',
          '√(−4) gibt es in ℝ nicht, denn jedes Quadrat ist ≥ 0. Es ist 2i und liegt in ℂ.'
        ]
      }
    ],
    watch: [
      'Bei Division durch eine <b>negative</b> Zahl das Zeichen umdrehen, bei positiver Zahl nicht.',
      '&lt; und &gt; heißen: Die Grenze gehört nicht dazu. ≤ und ≥: Sie gehört dazu.',
      'Periodische Dezimalzahlen sind rational, nicht irrational.',
      'Beim Umformen immer die <b>ganze</b> Seite behandeln: Klammern setzen, wenn durch eine Summe dividiert wird.'
    ],
    parents: 'Ein guter Test: Lassen Sie Ihr Kind nach dem Lösen einer Ungleichung eine Zahl aus der Lösungsmenge und eine außerhalb einsetzen. Die eine muss passen, die andere nicht. Bei Formeln hilft die Frage: „Was wurde mit der gesuchten Größe zuletzt gemacht?“ Das wird zuerst rückgängig gemacht.'
  },

  'g9-statistik9': {
    idea: 'Die <b>beschreibende Statistik</b> fasst viele Werte in wenigen Kennzahlen zusammen. <b>Lagemaße</b> sagen, wo die Daten liegen: der <b>Mittelwert</b> x̄ = Summe : Anzahl und der <b>Median</b>, der mittlere Wert der geordneten Liste. <b>Streumaße</b> sagen, wie weit sie auseinanderliegen: die <b>Spannweite</b> (Maximum − Minimum), der <b>Quartilsabstand</b> q₃ − q₁ und die <b>Standardabweichung</b> <span class="hl">σ = √((1/n) · Σ (xᵢ − x̄)²)</span>. Die Quartile teilen die geordnete Liste in vier Viertel: q₁ ist der Median der unteren Hälfte, q₃ der Median der oberen Hälfte. Mit Minimum, q₁, Median, q₃ und Maximum zeichnest du einen <b>Boxplot</b>.',
    picture: '<svg viewBox="0 0 220 70" width="220" height="70"><line x1="20" y1="30" x2="60" y2="30" stroke="currentColor"/><rect x="60" y="15" width="70" height="30" fill="none" stroke="var(--accent)" stroke-width="2"/><line x1="95" y1="15" x2="95" y2="45" stroke="var(--accent)" stroke-width="2"/><line x1="130" y1="30" x2="200" y2="30" stroke="currentColor"/><line x1="20" y1="22" x2="20" y2="38" stroke="currentColor"/><line x1="200" y1="22" x2="200" y2="38" stroke="currentColor"/><text x="12" y="62" font-size="10" fill="currentColor">Min</text><text x="54" y="62" font-size="10" fill="currentColor">q₁</text><text x="84" y="62" font-size="10" fill="currentColor">Med</text><text x="124" y="62" font-size="10" fill="currentColor">q₃</text><text x="188" y="62" font-size="10" fill="currentColor">Max</text></svg>',
    story: 'Fünf Personen in einem kleinen Betrieb verdienen 2000 €, 2200 €, 2400 €, 2500 € und die Chefin 15 000 €. Der Mittelwert ist 4820 €, aber vier von fünf verdienen weniger als die Hälfte davon. Der Median 2400 € beschreibt das „typische“ Gehalt viel besser. Darum geben Statistikämter beim Einkommen oft den Median an.',
    example: {
      task: 'Daten: 3; 7; 8; 5; 12; 7. Berechne Mittelwert, Median, Quartile und Spannweite.',
      lines: [
        'Ordnen: 3; 5; 7; 7; 8; 12 (n = 6)',
        'Mittelwert: 42 : 6 = 7',
        'Median: (7 + 7) : 2 = 7',
        'q₁ = Median von 3; 5; 7 = 5, &nbsp;q₃ = Median von 7; 8; 12 = 8',
        'Spannweite: 12 − 3 = 9'
      ]
    },
    more: [
      {
        task: 'Standardabweichung derselben Daten (Division durch n).',
        lines: [
          'Abweichungen von x̄ = 7: −4; −2; 0; 0; 1; 5',
          'Quadrate: 16; 4; 0; 0; 1; 25, Summe 46',
          'σ² = 46 : 6 ≈ 7,67',
          'σ = √7,67 ≈ 2,77'
        ]
      },
      {
        task: 'Was ändert sich, wenn statt 12 der Wert 60 dabei ist?',
        lines: [
          'Mittelwert: 90 : 6 = 15, er springt stark nach oben.',
          'Median: bleibt 7, denn die Mitte der Liste ändert sich nicht.',
          'Merke: Der Median ist robust gegen Ausreißer, der Mittelwert nicht.'
        ]
      }
    ],
    watch: [
      'Für Median und Quartile die Daten <b>zuerst ordnen</b>.',
      'Bei gerader Anzahl ist der Median der Mittelwert der beiden mittleren Werte.',
      'σ (durch n) und s (durch n − 1) unterscheiden sich. Lies genau, welche gefragt ist.',
      'Die Varianz ist σ², die Standardabweichung ist die Wurzel daraus.'
    ],
    parents: 'Statistik steckt in jeder Zeitung. Suchen Sie gemeinsam eine Grafik oder Meldung mit „Durchschnitt“ und fragen Sie: Wäre hier der Median aussagekräftiger? Gibt es Ausreißer? Diese Fragen sind genau das, was bei der Matura unter „Interpretieren“ verlangt wird.'
  },

  'g10-einheitskreis': {
    idea: 'Im <b>Einheitskreis</b> (Radius 1, Mittelpunkt im Ursprung) gehört zu jedem Winkel α ein Punkt P = (<b>cos α</b> | <b>sin α</b>). So sind Sinus und Cosinus für <b>alle</b> Winkel erklärt, nicht nur bis 90°. Das Vorzeichen ergibt sich aus dem <b>Quadranten</b>: sin (y-Koordinate) ist im I. und II. positiv, cos (x-Koordinate) im I. und IV., tan = sin : cos im I. und III. Winkel kann man auch im <b>Bogenmaß</b> messen: die Länge des Bogens am Einheitskreis. Eine volle Runde ist 2π, also <span class="hl">180° = π</span>. Die <b>Sinusfunktion</b> f(x) = a · sin(b · x) hat die Amplitude |a| und die Periode <span class="hl">p = 2π : b</span>.',
    picture: '<svg viewBox="0 0 200 150" width="200" height="150"><line x1="10" y1="75" x2="190" y2="75" stroke="var(--border)"/><line x1="100" y1="5" x2="100" y2="145" stroke="var(--border)"/><circle cx="100" cy="75" r="60" fill="none" stroke="currentColor"/><line x1="100" y1="75" x2="48" y2="45" stroke="var(--accent)" stroke-width="2"/><circle cx="48" cy="45" r="4" fill="var(--accent)"/><line x1="48" y1="45" x2="48" y2="75" stroke="var(--accent)" stroke-dasharray="3 3"/><text x="10" y="40" font-size="10" fill="currentColor">(cos α | sin α)</text><text x="140" y="20" font-size="11" fill="currentColor">I</text><text x="52" y="20" font-size="11" fill="currentColor">II</text><text x="52" y="135" font-size="11" fill="currentColor">III</text><text x="140" y="135" font-size="11" fill="currentColor">IV</text><path d="M120 75 A20 20 0 0 0 83 65" fill="none" stroke="var(--accent)"/></svg>',
    story: 'Ein Riesenrad dreht sich gleichmäßig. Die Höhe einer Gondel über der Achse ist r · sin(Drehwinkel), sie schwankt auf und ab wie eine Sinuskurve. Auch Wechselstrom, Schallwellen und Ebbe und Flut werden mit Sinusfunktionen beschrieben.',
    example: {
      task: 'Berechne sin(150°) und cos(150°).',
      lines: [
        '150° liegt im II. Quadranten.',
        'Bezugswinkel: 180° − 150° = 30°',
        'sin 30° = 0,5, im II. Quadranten ist sin positiv: sin(150°) = 0,5',
        'cos 30° ≈ 0,87, im II. Quadranten ist cos negativ: cos(150°) ≈ −0,87',
        'Probe: 0,5² + 0,87² ≈ 0,25 + 0,75 = 1 ✓'
      ]
    },
    more: [
      {
        task: 'Rechne 135° ins Bogenmaß um.',
        lines: [
          '135 : 180 = <span class="frac"><span>3</span><span>4</span></span>',
          'α = <span class="frac"><span>3π</span><span>4</span></span> ≈ 2,36'
        ]
      },
      {
        task: 'f(x) = 3 · sin(2x): Amplitude und Periode?',
        lines: [
          'Amplitude |a| = 3, der Graph schwankt zwischen −3 und 3.',
          'Periode p = 2π : 2 = π',
          'Die Kurve läuft doppelt so schnell wie sin(x).'
        ]
      }
    ],
    watch: [
      'Rechner-Modus prüfen: DEG für Grad, RAD für Bogenmaß.',
      'sin(α) = sin(180° − α), cos(α) = cos(360° − α): Zu einem Wert gibt es meist zwei Winkel zwischen 0° und 360°.',
      'Die Amplitude ist |a|, auch wenn a negativ ist.',
      'Periode 2π : b, nicht π : b und nicht b : 2π.'
    ],
    parents: 'Lassen Sie Ihr Kind einen Einheitskreis aufzeichnen und die Vorzeichen in die vier Quadranten schreiben. Wer das Bild im Kopf hat, braucht keine Merksätze. Ein Smartphone mit Rechner-App hilft beim Prüfen, aber achten Sie auf den Grad-Modus.'
  },

  'g11-aenderung': {
    idea: 'Wie stark ändert sich eine Größe? Dafür gibt es vier <b>Änderungsmaße</b> von f im Intervall [a; b]:<br><b>absolute Änderung</b> f(b) − f(a), in der Einheit der Größe.<br><b>relative Änderung</b> <span class="frac"><span>f(b) − f(a)</span><span>f(a)</span></span>, meist in Prozent.<br><b>mittlere Änderungsrate (Differenzenquotient)</b> <span class="frac"><span>f(b) − f(a)</span><span>b − a</span></span>, die Änderung pro Einheit, geometrisch die Steigung der Sekante.<br><b>momentane Änderungsrate (Differentialquotient)</b> f′(x), die Steigung der Tangente. Sie entsteht, wenn das Intervall immer kleiner wird: <span class="hl">f′(x) = lim<sub>h→0</sub> <span class="frac"><span>f(x + h) − f(x)</span><span>h</span></span></span>.',
    picture: '<svg viewBox="0 0 200 130" width="200" height="130"><line x1="10" y1="120" x2="190" y2="120" stroke="var(--border)"/><line x1="20" y1="5" x2="20" y2="125" stroke="var(--border)"/><path d="M20 115 Q110 110 180 15" fill="none" stroke="currentColor" stroke-width="2"/><line x1="40" y1="118" x2="190" y2="25" stroke="var(--accent)" stroke-width="1.5"/><circle cx="65" cy="112" r="3" fill="var(--accent)"/><circle cx="160" cy="45" r="3" fill="var(--accent)"/><text x="120" y="95" font-size="10" fill="currentColor">Sekante: mittlere</text><text x="120" y="107" font-size="10" fill="currentColor">Änderungsrate</text></svg>',
    story: 'Ein Paar Sneaker kostet zuerst 40 €, dann 50 €. Absolute Änderung: +10 €. Relative Änderung: 10 : 40 = +25 %. Wird es danach wieder auf 40 € gesenkt, sind das −10 €, aber nur −20 %, weil sich der Prozentsatz jetzt auf 50 € bezieht. Wer Änderungsmaße versteht, durchschaut solche Werbetricks.',
    example: {
      task: 'f(x) = x². Berechne alle vier Änderungsmaße in [1; 3].',
      lines: [
        'f(1) = 1, f(3) = 9',
        'absolute Änderung: 9 − 1 = 8',
        'relative Änderung: 8 : 1 = 8 = 800 %',
        'mittlere Änderungsrate: 8 : (3 − 1) = 4',
        'momentane Änderungsrate: f′(x) = 2x, also f′(1) = 2 und f′(3) = 6'
      ]
    },
    more: [
      {
        task: 'Ein Stein fällt: s(t) = 5t² (s in m, t in s). Mittlere Geschwindigkeit in [1; 3], momentane bei t = 2?',
        lines: [
          's(3) = 45, s(1) = 5',
          'mittlere Geschwindigkeit: (45 − 5) : 2 = 20 m/s',
          'momentane: v(t) = s′(t) = 10t, v(2) = 20 m/s'
        ]
      },
      {
        task: 'Was bedeutet <span class="frac"><span>N(10) − N(5)</span><span>5</span></span>, wenn N(t) die Follower nach t Tagen sind?',
        lines: [
          'Zähler: Zuwachs von Tag 5 bis Tag 10.',
          'Nenner: 5 Tage.',
          'Also: durchschnittlicher Zuwachs pro Tag im Intervall [5; 10], die mittlere Änderungsrate.'
        ]
      }
    ],
    watch: [
      'Relative Änderung immer auf den <b>Anfangswert</b> beziehen.',
      'Mittlere Änderungsrate: durch die Intervalllänge b − a dividieren.',
      'f(a) ist ein Funktionswert, f′(a) eine Steigung. Beide nicht verwechseln.',
      'Einheiten mitdenken: Die Änderungsrate hat die Einheit „Größe pro Zeit“, z. B. m/s.'
    ],
    parents: 'Diese Begriffe sind ein Fixpunkt der Matura, meist in Textform. Lassen Sie Ihr Kind einen Ausdruck wie (T(8) − T(6)) : 2 in einem Satz deuten, etwa: „Die Temperatur steigt zwischen 6 und 8 Uhr im Schnitt um … Grad pro Stunde.“ Das Formulieren ist oft schwieriger als das Rechnen.'
  },

  'g11-kurven': {
    idea: 'Bei einer <b>Kurvendiskussion</b> liest du aus dem Funktionsterm ab, wie der Graph aussieht. <b>Nullstellen:</b> f(x) = 0. <b>Monotonie:</b> f′(x) &gt; 0 steigend, f′(x) &lt; 0 fallend. <b>Extremstellen:</b> f′(x) = 0, dann entscheidet f″: <span class="hl">f″ &lt; 0 Hochpunkt, f″ &gt; 0 Tiefpunkt</span>. <b>Wendestellen:</b> f″(x) = 0 (mit Vorzeichenwechsel), dort wechselt die Krümmung. <b>Krümmung:</b> f″ &gt; 0 linksgekrümmt (positiv gekrümmt), f″ &lt; 0 rechtsgekrümmt (negativ gekrümmt). Bei <b>Extremwertaufgaben</b> stellst du selbst eine Funktion auf und suchst ihr Maximum oder Minimum.',
    picture: '<svg viewBox="0 0 200 130" width="200" height="130"><line x1="5" y1="60" x2="195" y2="60" stroke="var(--border)"/><path d="M15 125 C40 -10 60 20 100 70 S170 140 190 5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="52" cy="30" r="4" fill="var(--accent)"/><circle cx="148" cy="99" r="4" fill="var(--accent)"/><circle cx="100" cy="68" r="4" fill="none" stroke="var(--accent)" stroke-width="2"/><text x="40" y="18" font-size="10" fill="currentColor">Hochpunkt</text><text x="125" y="120" font-size="10" fill="currentColor">Tiefpunkt</text><text x="106" y="84" font-size="10" fill="currentColor">Wendepunkt</text></svg>',
    story: 'Eine Firma will den Gewinn G(x) = −x² + 40x − 300 (x in Stück, G in €) maximieren. G′(x) = −2x + 40 = 0 ergibt x = 20 Stück. Der maximale Gewinn ist G(20) = −400 + 800 − 300 = 100 €. Ohne Ableitung müsste man raten oder sehr viele Werte probieren.',
    example: {
      task: 'Diskutiere f(x) = x³ − 3x².',
      lines: [
        'Nullstellen: x² · (x − 3) = 0, also x = 0 und x = 3',
        'f′(x) = 3x² − 6x = 3x · (x − 2) = 0, also x = 0 und x = 2',
        'f″(x) = 6x − 6: f″(0) = −6 &lt; 0 Hochpunkt H(0 | 0), f″(2) = 6 &gt; 0 Tiefpunkt T(2 | −4)',
        'Wendestelle: 6x − 6 = 0, also x = 1, W(1 | −2)',
        'Monotonie: steigend in (−∞; 0], fallend in [0; 2], steigend in [2; ∞)'
      ]
    },
    more: [
      {
        task: 'Ein Rechteck hat den Umfang 20 m. Wann ist die Fläche maximal?',
        lines: [
          'Nebenbedingung: 2a + 2b = 20, also b = 10 − a',
          'Hauptbedingung: A(a) = a · (10 − a) = 10a − a²',
          'A′(a) = 10 − 2a = 0, also a = 5 und b = 5',
          'A = 25 m², das Quadrat ist optimal.'
        ]
      },
      {
        task: 'Nullstellen von f(x) = x⁴ − 5x² + 4',
        lines: [
          'u = x²: u² − 5u + 4 = 0, also u = 1 oder u = 4',
          'x² = 1 ergibt x = ±1, x² = 4 ergibt x = ±2',
          'Vier Nullstellen: −2; −1; 1; 2'
        ]
      }
    ],
    watch: [
      'Nie durch x dividieren: x herausheben, sonst geht die Lösung x = 0 verloren.',
      'f′ = 0 ist nur ein Kandidat. Erst f″ (oder ein Vorzeichenwechsel von f′) sagt, ob Hoch-, Tief- oder Sattelpunkt.',
      'Für den Punkt die x-Stelle in <b>f</b> einsetzen, nicht in f′.',
      'Monotonie-Intervalle enden an den Extremstellen.'
    ],
    parents: 'GeoGebra oder ein grafikfähiger Rechner zeigen den Graphen sofort. Lassen Sie Ihr Kind zuerst rechnen und dann mit dem Graphen vergleichen: Liegen Hoch- und Tiefpunkt dort, wo sie berechnet wurden? So wird Technologie zur Kontrolle, wie bei der Matura.'
  },

  'g12-normal': {
    idea: 'Viele Messgrößen (Körpergröße, Füllmengen, Messfehler) sind <b>normalverteilt</b>: Die Werte häufen sich symmetrisch um den Erwartungswert μ, die Standardabweichung σ gibt die Breite der Glockenkurve an. Wahrscheinlichkeiten sind Flächen unter der Kurve. Mit <span class="hl">z = (x − μ) : σ</span> wird jede Normalverteilung auf die Standardnormalverteilung zurückgeführt: P(X ≤ a) = Φ(z). Faustregeln: ca. <b>68 %</b> liegen in μ ± σ, <b>95 %</b> in μ ± 2σ, <b>99,7 %</b> in μ ± 3σ. Für eine Binomialverteilung ist σ = √(n · p · (1 − p)). Aus einer Stichprobe mit relativer Häufigkeit h schätzt das <b>95-%-Konfidenzintervall</b> <span class="hl">h ± 1,96 · √(h · (1 − h) : n)</span> den unbekannten Anteil p.',
    picture: '<svg viewBox="0 0 220 110" width="220" height="110"><line x1="10" y1="95" x2="210" y2="95" stroke="var(--border)"/><path d="M10 94 C60 93 80 10 110 10 S160 93 210 94" fill="none" stroke="currentColor" stroke-width="2"/><path d="M80 95 L80 48 C90 22 100 10 110 10 S130 22 140 48 L140 95 Z" fill="var(--accent)" opacity="0.3"/><line x1="110" y1="10" x2="110" y2="95" stroke="var(--accent)" stroke-dasharray="3 3"/><text x="104" y="107" font-size="10" fill="currentColor">μ</text><text x="66" y="107" font-size="10" fill="currentColor">μ − σ</text><text x="130" y="107" font-size="10" fill="currentColor">μ + σ</text><text x="92" y="80" font-size="10" fill="currentColor">68 %</text></svg>',
    story: 'Vor einer Wahl befragt ein Institut 400 Personen, 120 wollen Partei A wählen. Das sind h = 30 %. Das 95-%-Konfidenzintervall reicht von etwa 25,5 % bis 34,5 %. Darum sagen seriöse Umfragen immer dazu, wie groß die Schwankungsbreite ist.',
    example: {
      task: 'Körpergröße: μ = 175 cm, σ = 7 cm. Berechne P(X ≤ 182) und P(168 ≤ X ≤ 182).',
      lines: [
        'z = (182 − 175) : 7 = 1',
        'P(X ≤ 182) = Φ(1) ≈ 0,8413',
        '168 und 182 sind μ − σ und μ + σ',
        'P(168 ≤ X ≤ 182) = Φ(1) − Φ(−1) ≈ 0,8413 − 0,1587 = 0,6827, also rund 68 %'
      ]
    },
    more: [
      {
        task: 'Konfidenzintervall: n = 400, davon 120 mit „ja“.',
        lines: [
          'h = 120 : 400 = 0,3',
          '√(0,3 · 0,7 : 400) ≈ 0,0229',
          '1,96 · 0,0229 ≈ 0,0449',
          'Intervall: [0,2551; 0,3449]'
        ]
      },
      {
        task: 'Binomialverteilung n = 100, p = 0,5: σ und das 2σ-Intervall.',
        lines: [
          'μ = 100 · 0,5 = 50',
          'σ = √(100 · 0,5 · 0,5) = √25 = 5',
          'μ ± 2σ = [40; 60], darin liegen etwa 95 % der Ergebnisse.'
        ]
      }
    ],
    watch: [
      'P(X ≥ a) = 1 − Φ(z), nicht Φ(z).',
      'Erst standardisieren: (x − μ) : σ. σ ist die Standardabweichung, nicht die Varianz.',
      'Für 95 % ist z = 1,96, für 90 % z = 1,645.',
      'Unter der Wurzel im Konfidenzintervall steht „: n“. Vierfaches n halbiert die Breite.'
    ],
    parents: 'Umfragen in den Nachrichten sind ein idealer Anlass: Fragen Sie, wie groß die Stichprobe war und ob der Unterschied zwischen zwei Parteien innerhalb der Schwankungsbreite liegt. GeoGebra hat einen Wahrscheinlichkeitsrechner, mit dem sich jede Rechnung prüfen lässt.'
  },

  'g12-matura-teil1': {
    idea: 'Teil 1 der schriftlichen Zentralmatura prüft die <b>Grundkompetenzen</b> aus dem Katalog in kurzen, voneinander unabhängigen Aufgaben. Die vier Inhaltsbereiche: <b>AG</b> Algebra und Geometrie (Zahlenmengen, Terme, Gleichungen, Ungleichungen, Vektoren, Trigonometrie), <b>FA</b> Funktionale Abhängigkeiten (Funktionsbegriff, lineare, Potenz-, Polynom-, Exponential- und Sinusfunktionen), <b>AN</b> Analysis (Änderungsmaße, Ableitung, Stammfunktion, Integral) und <b>WS</b> Wahrscheinlichkeit und Statistik (Kennzahlen, Wahrscheinlichkeiten, Verteilungen, Konfidenzintervalle). Typische Formate sind Ankreuzen, Zuordnen, Lückentexte und kurze offene Antworten. Hier geht es weniger um lange Rechnungen als darum, Begriffe <span class="hl">sicher zu erkennen und richtig zu deuten</span>.',
    story: 'Teil-1-Aufgaben sind wie Vokabeln: Jede einzelne ist schnell erledigt, wenn man das Konzept kennt, und kaum lösbar, wenn nicht. Darum lohnt es sich, jede Woche ein paar Aufgaben aus allen vier Bereichen zu üben, statt einen Bereich auf einmal.',
    example: {
      task: 'Je eine Mini-Aufgabe aus jedem Bereich',
      lines: [
        '<b>AG:</b> −3x + 6 ≤ 0, also −3x ≤ −6, also x ≥ 2 (Zeichen dreht sich um)',
        '<b>FA:</b> f(x) = 200 · 0,9ˣ nimmt pro Schritt um 10 % ab, denn 0,9 = 1 − 0,1',
        '<b>AN:</b> f(x) = x², mittlere Änderungsrate in [1; 4]: (16 − 1) : 3 = 5',
        '<b>WS:</b> Daten 2; 4; 4; 10: Mittelwert 5, Median 4'
      ]
    },
    more: [
      {
        task: 'Formulierungen entschlüsseln',
        lines: [
          '„relative Änderung“: Änderung durch den Anfangswert',
          '„mittlere Änderungsrate“: Differenzenquotient, Steigung der Sekante',
          '„lokale Änderungsrate“ oder „momentane Änderungsrate“: f′(x)',
          '„streng monoton fallend“: f′(x) &lt; 0 im ganzen Intervall'
        ]
      },
      {
        task: 'Typische Fallen in Teil 1',
        lines: [
          'Bei Ankreuzaufgaben zählt nur die ganz richtige Antwort, prüfe jede Aussage einzeln.',
          'Die Amplitude von −3 · sin(x) ist 3, nicht −3.',
          'P(A | B) und P(B | A) sind verschieden.',
          'Zwei Vektoren sind orthogonal, wenn das Skalarprodukt 0 ist.'
        ]
      }
    ],
    watch: [
      'Genau lesen, was gefragt ist: Wert, Stelle, Intervall oder Deutung im Kontext.',
      'Einheiten und Kontext in die Antwort schreiben.',
      'Nicht zu lange an einer Aufgabe hängen bleiben, sie sind unabhängig voneinander.',
      'Formelsammlung und Rechner vorher gut kennen.'
    ],
    parents: 'Gerade Teil 1 lässt sich in kleinen Einheiten trainieren: 15 Minuten täglich mit gemischten Aufgaben wirken besser als ein langer Lernnachmittag. Fragen Sie Ihr Kind nach jeder Aufgabe, zu welchem Bereich (AG, FA, AN, WS) sie gehört. Das schärft den Blick für die Struktur der Matura.'
  },
};
