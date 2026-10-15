// Erklärseiten Unterstufe (neue Themen): Idee, Bild, Alltagsbeispiel, Rechenweg, Stolperfallen, Elterntipp.
export default {
  'g5-koerper5': {
    idea: 'Ein <b>Quader</b> ist eine Schachtel: 6 rechteckige Flächen, 12 Kanten, 8 Ecken. Beim <b>Würfel</b> sind alle Kanten gleich lang.<br>Das <b>Volumen</b> sagt, wie viele Würfel mit 1 cm Kantenlänge (1 cm³) hineinpassen. Auf den Boden passen a · b Würfel, und davon gibt es c Schichten übereinander: <span class="hl">V = a · b · c</span>. Beim Würfel: V = a · a · a = a³.<br>Die <b>Oberfläche</b> ist das ganze Papier, das du zum Einpacken brauchst. Jede Fläche gibt es doppelt (oben und unten, vorne und hinten, links und rechts): <span class="hl">O = 2 · (a · b + a · c + b · c)</span>. Beim Würfel sind es 6 gleiche Quadrate: O = 6 · a².<br>Bei den <b>Raummaßen</b> ist die Umrechnungszahl <span class="hl">1 000</span>, weil in einen großen Würfel 10 · 10 · 10 kleine passen. Und: <b>1 dm³ = 1 Liter</b>, 1 cm³ = 1 ml.',
    picture: '<svg viewBox="0 0 150 110" width="170" height="125" role="img" aria-label="Quader mit Kanten a, b, c"><g fill="none" stroke="currentColor" stroke-width="2"><path d="M10,40 H100 V100 H10 Z"/><path d="M10,40 L40,15 H130 L100,40"/><path d="M130,15 V75 L100,100"/></g><text x="55" y="108" font-size="11" fill="currentColor">a</text><text x="118" y="95" font-size="11" fill="currentColor">b</text><text x="0" y="72" font-size="11" fill="currentColor">c</text></svg><br><span class="cap">V = a · b · c &nbsp;&nbsp; O = 2 · (a · b + a · c + b · c)</span>',
    story: 'Ein Schuhkarton ist 30 cm lang, 20 cm breit und 10 cm hoch. Hinein passen 30 · 20 · 10 = 6 000 cm³, das sind 6 Liter. Willst du ihn als Geschenk einpacken, brauchst du mindestens 2 · (600 + 300 + 200) = 2 200 cm² Geschenkpapier.',
    example: { task: 'Quader mit a = 5 cm, b = 4 cm, c = 3 cm', lines: ['V = 5 · 4 · 3 = 60 cm³', 'Flächen: 5 · 4 = 20, 5 · 3 = 15, 4 · 3 = 12', 'O = 2 · (20 + 15 + 12) = 2 · 47 = 94 cm²'] },
    more: [
      { task: 'Würfel mit a = 3 cm', lines: ['V = 3 · 3 · 3 = 27 cm³', 'Eine Seitenfläche: 3 · 3 = 9 cm²', 'O = 6 · 9 = 54 cm²'] },
      { task: '2,5 l = ▢ cm³', lines: ['1 l = 1 dm³ = 1 000 cm³', '2,5 · 1 000 = 2 500 cm³'] },
      { task: 'Ein Aquarium ist 50 cm lang und 30 cm breit. Es sind 45 l Wasser drin. Wie hoch steht das Wasser?', lines: ['45 l = 45 dm³ = 45 000 cm³', 'Grundfläche: 50 · 30 = 1 500 cm²', 'Höhe: 45 000 : 1 500 = 30 cm'] },
    ],
    watch: [
      'Volumen in cm³, Oberfläche in cm². Die kleine Hochzahl verrät, was du ausgerechnet hast.',
      'Bei der Oberfläche nicht das „2 ·“ vergessen: Jede Fläche kommt doppelt vor.',
      'Würfel: a³ heißt a · a · a, nicht 3 · a.',
      'Raummaße: Umrechnungszahl 1 000, nicht 10 oder 100. Bei Flächen ist sie 100.',
    ],
    parents: 'Suchen Sie gemeinsam Schachteln im Haushalt (Müslipackung, Schuhkarton, Milchpackerl), messen Sie die Kanten und rechnen Sie das Volumen aus. Beim Milchpackerl lässt sich prüfen, ob wirklich etwa 1 000 cm³, also 1 Liter, herauskommt.',
  },

  'g6-winkel': {
    idea: 'Im <b>Dreieck</b> ergeben die drei Winkel zusammen immer <span class="hl">180°</span>, egal wie das Dreieck aussieht. Ein <b>Viereck</b> kannst du mit einer Diagonale in zwei Dreiecke zerlegen, darum hat es <span class="hl">360°</span>.<br>Schneiden sich zwei Geraden, entstehen vier Winkel. Zwei, die nebeneinander auf einer Geraden liegen, heißen <b>Nebenwinkel</b>: Zusammen sind sie ein gestreckter Winkel, also <span class="hl">180°</span>. Zwei, die einander gegenüberliegen, heißen <b>Scheitelwinkel</b>: Sie sind <span class="hl">gleich groß</span>.<br>Winkelarten: spitz (unter 90°), recht (90°), stumpf (zwischen 90° und 180°), gestreckt (180°), erhaben (über 180°).',
    picture: '<svg viewBox="0 0 160 110" width="170" height="117" role="img" aria-label="Zwei sich schneidende Geraden"><g stroke="currentColor" stroke-width="2"><path d="M10,95 L150,15"/><path d="M10,30 L150,80"/></g><text x="92" y="52" font-size="12" fill="currentColor">α</text><text x="60" y="66" font-size="12" fill="currentColor">α</text><text x="76" y="35" font-size="12" fill="currentColor">β</text><text x="76" y="84" font-size="12" fill="currentColor">β</text></svg><br>α + β = 180° (Nebenwinkel), gegenüber gleich groß (Scheitelwinkel)',
    story: 'Bei einer Schere, die du öffnest, bilden die zwei Klingen ein Kreuz. Machst du die Schere weiter auf, wird der Winkel vorne größer und der daneben genau um so viel kleiner. Zusammen bleiben die zwei immer 180°.',
    example: { task: 'Dreieck: α = 50°, β = 70°. γ = ?', lines: ['Winkelsumme im Dreieck: 180°', 'γ = 180° − 50° − 70° = 60°'] },
    more: [
      { task: 'Viereck: α = 90°, β = 100°, γ = 80°. δ = ?', lines: ['Winkelsumme im Viereck: 360°', 'δ = 360° − 90° − 100° − 80° = 90°'] },
      { task: 'Ein Winkel ist 65°. Nebenwinkel und Scheitelwinkel?', lines: ['Nebenwinkel: 180° − 65° = 115°', 'Scheitelwinkel: gleich groß, also 65°'] },
      { task: 'Gleichschenkliges Dreieck, Winkel an der Spitze 40°. Basiswinkel?', lines: ['Für beide Basiswinkel bleiben 180° − 40° = 140°', 'Sie sind gleich groß: 140° : 2 = 70°'] },
    ],
    watch: [
      'Dreieck 180°, Viereck 360°. Nicht verwechseln.',
      'Nebenwinkel ergänzen sich auf 180°, nicht auf 90°.',
      'Scheitelwinkel sind gleich groß, da wird nichts gerechnet.',
      'Im gleichschenkligen Dreieck sind die zwei Basiswinkel gleich, nicht der Winkel an der Spitze.',
    ],
    parents: 'Ein schöner Versuch: Ihr Kind schneidet ein beliebiges Dreieck aus Papier aus, reißt die drei Ecken ab und legt sie mit den Spitzen aneinander. Sie ergeben immer eine gerade Linie, also 180°. Das funktioniert mit jedem Dreieck und überzeugt mehr als jede Erklärung.',
  },

  'g6-statistik6': {
    idea: 'Mit Kennzahlen beschreibst du eine Liste von Werten mit einer einzigen Zahl.<br><b>Mittelwert</b> (Durchschnitt): <span class="hl">alle Werte zusammenzählen und durch die Anzahl teilen</span>. Das ist der Wert, den jeder hätte, wenn man gerecht verteilt.<br><b>Median</b>: Werte <span class="hl">der Größe nach ordnen</span> und den mittleren nehmen. Bei einer geraden Anzahl ist er die Mitte der zwei mittleren Werte.<br><b>Modus</b>: der Wert, der am häufigsten vorkommt.<br><b>Spannweite</b>: größter minus kleinster Wert. Sie zeigt, wie weit die Werte auseinanderliegen.',
    picture: '<span class="pic">📊</span> 5 · 6 · 6 · 8 · 30<br>Mittelwert 11, Median 6, Modus 6, Spannweite 25',
    story: 'Fünf Freunde vergleichen ihr Taschengeld pro Woche: 5 €, 8 €, 6 €, 30 €, 6 €. Der Mittelwert ist 55 : 5 = 11 €. Aber vier von fünf bekommen weniger als 11 €! Der Median, 6 €, beschreibt die Gruppe hier besser, weil ein einzelner großer Wert ihn kaum verschiebt.',
    example: { task: 'Taschengeld: 5, 8, 6, 30, 6 (in €)', lines: ['Mittelwert: (5 + 8 + 6 + 30 + 6) : 5 = 55 : 5 = 11 €', 'Ordnen: 5, 6, 6, 8, 30. Median: der 3. Wert, also 6 €', 'Modus: 6 € (kommt zweimal vor)', 'Spannweite: 30 − 5 = 25 €'] },
    more: [
      { task: 'Median von 4, 12, 7, 9', lines: ['Ordnen: 4, 7, 9, 12', 'Gerade Anzahl: zwei mittlere Werte, 7 und 9', 'Median: (7 + 9) : 2 = 8'] },
      { task: 'Tore in 4 Spielen: 2, 0, 3, 3. Mittelwert?', lines: ['Summe: 2 + 0 + 3 + 3 = 8', 'Auch die 0 ist ein Wert: 4 Spiele', 'Mittelwert: 8 : 4 = 2 Tore pro Spiel'] },
    ],
    watch: [
      'Für den Median zuerst ordnen, sonst bekommst du irgendeinen Wert.',
      'Beim Mittelwert durch die Anzahl der Werte teilen, auch Nullen zählen mit.',
      'Der Modus ist der häufigste Wert, nicht der größte.',
      'Ein einzelner Ausreißer verändert den Mittelwert stark, den Median kaum.',
    ],
    parents: 'Sammeln Sie gemeinsam echte Daten, zum Beispiel die Bildschirmzeit der letzten Woche oder die Temperaturen am Morgen. Lassen Sie Ihr Kind Mittelwert und Median ausrechnen und fragen Sie: „Welche Zahl beschreibt unsere Woche besser, und warum?“',
  },

  'g6-schluss6': {
    idea: 'Bei der <b>Schlussrechnung</b> schließt du von einer bekannten Menge auf eine andere. Der sichere Weg führt immer über die <span class="hl">Einheit</span>: Was gilt für <i>ein</i> Stück, <i>eine</i> Person, <i>eine</i> Stunde?<br><b>Direkt proportional</b>: Je mehr, desto mehr. Doppelt so viele Hefte kosten doppelt so viel. Auf 1 kommst du durch Teilen.<br><b>Indirekt proportional</b>: Je mehr, desto weniger. Doppelt so viele Leute brauchen nur halb so lang. Auf 1 kommst du hier durch Malnehmen.',
    picture: '<span class="pic">📓</span> 3 Hefte: 4,20 €, also 1 Heft: 1,40 €, also 5 Hefte: 7,00 €<br><span class="pic">🎨</span> 3 Leute: 8 h, also 1 Person: 24 h, also 4 Leute: 6 h',
    story: 'Eure Klasse malt die Pausenhalle aus. Zu dritt würdet ihr 8 Stunden brauchen. Eine Person allein bräuchte dreimal so lang, 24 Stunden. Seid ihr zu viert, teilt ihr die 24 Stunden auf: 6 Stunden. Mehr Leute, weniger Zeit.',
    example: { task: '3 Hefte kosten 4,20 €. Wie viel kosten 5 Hefte?', lines: ['Direkt: mehr Hefte, mehr Geld', '1 Heft: 4,20 € : 3 = 1,40 €', '5 Hefte: 1,40 € · 5 = 7,00 €'] },
    more: [
      { task: '3 Leute brauchen 8 h. Wie lange brauchen 4 Leute?', lines: ['Indirekt: mehr Leute, weniger Zeit', '1 Person: 8 h · 3 = 24 h', '4 Leute: 24 h : 4 = 6 h'] },
      { task: 'Ein Auto braucht für 100 km 6 Liter. Wie viel für 250 km?', lines: ['Direkt: mehr km, mehr Benzin', '1 km: 6 : 100 = 0,06 l', '250 km: 0,06 · 250 = 15 l'] },
    ],
    watch: [
      'Zuerst entscheiden: direkt oder indirekt? Frag dich: Wird das andere mehr oder weniger?',
      'Bei indirekt auf 1 zurück mit mal, dann weiter mit durch, also genau umgekehrt wie bei direkt.',
      'Einheiten mitschreiben (€, h, l), dann siehst du sofort, ob das Ergebnis Sinn ergibt.',
    ],
    parents: 'Rezepte sind ideal: „Das Rezept ist für 4 Personen, wir sind aber 6.“ Lassen Sie Ihr Kind die Zutaten über eine Person umrechnen. Für indirekte Aufgaben eignen sich Fragen wie: „Wenn wir zu dritt aufräumen statt allein, wie lange brauchen wir dann?“',
  },

  'g7-vierecke': {
    idea: 'Ein <b>Trapez</b> hat zwei parallele Seiten a und c. Legst du zwei gleiche Trapeze verkehrt aneinander, entsteht ein Parallelogramm mit der Grundseite a + c und der Höhe h. Ein Trapez ist davon die Hälfte: <span class="hl">A = (a + c) · h : 2</span>.<br>Bei <b>Raute</b> und <b>Deltoid</b> (Drachenviereck) stehen die Diagonalen e und f normal aufeinander. Zeichnest du ein Rechteck e mal f rundherum, füllt das Viereck genau die Hälfte davon: <span class="hl">A = e · f : 2</span>. Eine Raute ist außerdem ein Parallelogramm, also geht auch A = a · h.',
    picture: '<svg viewBox="0 0 160 90" width="180" height="101" role="img" aria-label="Trapez mit a, c und h"><path d="M10,80 H150 L115,15 H45 Z" fill="var(--accent)" fill-opacity="0.2" stroke="currentColor" stroke-width="2"/><path d="M45,15 V80" stroke="currentColor" stroke-dasharray="4 3"/><text x="78" y="10" font-size="11" fill="currentColor">c</text><text x="78" y="90" font-size="11" fill="currentColor">a</text><text x="49" y="52" font-size="11" fill="currentColor">h</text></svg><br><span class="cap">A = (a + c) · h : 2</span>',
    story: 'Ein Drachen für den Herbstwind ist ein Deltoid. Die Leisten sind 60 cm und 40 cm lang. Für die Bespannung brauchst du 60 · 40 : 2 = 1 200 cm² Stoff, genau die Hälfte vom Rechteck 60 mal 40.',
    example: { task: 'Trapez: a = 8 cm, c = 4 cm, h = 5 cm', lines: ['A = (a + c) · h : 2', '= (8 + 4) · 5 : 2', '= 12 · 5 : 2 = 30 cm²'] },
    more: [
      { task: 'Raute mit e = 6 cm, f = 8 cm', lines: ['A = e · f : 2 = 6 · 8 : 2 = 24 cm²'] },
      { task: 'Deltoid mit e = 10 cm, f = 6 cm', lines: ['A = e · f : 2 = 10 · 6 : 2 = 30 cm²'] },
      { task: 'Trapez: A = 30 cm², a = 8 cm, c = 4 cm. h = ?', lines: ['30 = (8 + 4) · h : 2', 'Mal 2: 60 = 12 · h', 'h = 60 : 12 = 5 cm'] },
    ],
    watch: [
      'Beim Trapez die parallelen Seiten zuerst addieren, dann mal h, dann durch 2.',
      'Die Höhe steht normal auf den parallelen Seiten. Die schräge Seite ist nicht die Höhe.',
      'Bei e · f das „: 2“ nicht vergessen.',
    ],
    parents: 'Zeichnen Sie mit Ihrem Kind ein Trapez auf Karopapier, schneiden Sie zwei gleiche aus und legen Sie sie zu einem Parallelogramm zusammen. So wird sichtbar, woher das „: 2“ in der Formel kommt.',
  },

  'g7-koerper7': {
    idea: 'Ein <b>Prisma</b> hat oben und unten zwei gleiche Vielecke (die <b>Grundflächen</b>) und dazwischen Rechtecke (den <b>Mantel</b>). Ein Quader ist ein Prisma mit Rechteck als Grundfläche.<br><b>Volumen</b>: Stell dir das Prisma als Stapel von dünnen Schichten vor, jede so groß wie die Grundfläche G. Darum gilt <span class="hl">V = G · h</span>.<br><b>Oberfläche</b>: zwei Grundflächen plus Mantel. Rollst du den Mantel ab, ist er ein Rechteck: so lang wie der Umfang u der Grundfläche und so hoch wie h. Also <span class="hl">O = 2 · G + u · h</span>.',
    picture: '<svg viewBox="0 0 160 100" width="170" height="106" role="img" aria-label="Dreiseitiges Prisma"><g fill="none" stroke="currentColor" stroke-width="2"><path d="M10,90 H50 L10,50 Z" fill="var(--accent)" fill-opacity="0.25"/><path d="M110,60 H150 L110,20 Z"/><path d="M10,90 L110,60 M50,90 L150,60 M10,50 L110,20"/></g><text x="70" y="98" font-size="11" fill="currentColor">h</text></svg><br><span class="cap">V = G · h &nbsp;&nbsp; O = 2 · G + u · h</span>',
    story: 'Eine dreieckige Schokoladenpackung ist ein Prisma. Ist die Grundfläche ein rechtwinkliges Dreieck mit 3 cm und 4 cm (und 5 cm langer Schrägseite) und die Packung 10 cm lang, passen 6 · 10 = 60 cm³ Schokolade hinein.',
    example: { task: 'Dreiseitiges Prisma: Dreieck 3 cm, 4 cm, 5 cm (rechter Winkel zwischen 3 und 4), h = 10 cm', lines: ['G = 3 · 4 : 2 = 6 cm²', 'V = G · h = 6 · 10 = 60 cm³', 'Mantel: u · h = (3 + 4 + 5) · 10 = 120 cm²', 'O = 2 · 6 + 120 = 132 cm²'] },
    more: [
      { task: 'Quadratisches Prisma: a = 3 cm, h = 10 cm', lines: ['G = 3 · 3 = 9 cm², V = 9 · 10 = 90 cm³', 'Mantel: 4 · 3 · 10 = 120 cm²', 'O = 2 · 9 + 120 = 138 cm²'] },
      { task: 'G = 16 cm², V = 160 cm³. Wie hoch ist das Prisma?', lines: ['V = G · h, also h = V : G', 'h = 160 : 16 = 10 cm'] },
    ],
    watch: [
      'Ist die Grundfläche ein Dreieck, ist G = g · h : 2. Die Prismenhöhe ist eine andere Höhe.',
      'Oberfläche: Es gibt zwei Grundflächen, nicht eine.',
      'Zum Mantel gehören alle Seiten der Grundfläche, auch die längste.',
    ],
    parents: 'Gehen Sie gemeinsam auf Prismen-Suche: Schokoladepackungen, Zelte, Bleistifte (sechseckig) oder Hausdächer. Fragen Sie jedes Mal: „Was ist hier die Grundfläche, und wo ist die Höhe?“ Das ist der wichtigste Schritt bei jeder Aufgabe.',
  },

  'g7-statistik7': {
    idea: 'Die <b>absolute Häufigkeit</b> ist einfach die Anzahl: 8 Kinder fahren mit dem Rad. Die <b>relative Häufigkeit</b> sagt, welcher Anteil das von allen ist: <span class="hl">Anzahl : Gesamtanzahl</span>. Mal 100 ergibt Prozent.<br>Warum relativ? Weil man nur so verschieden große Gruppen vergleichen kann. 8 von 20 sind mehr als 9 von 25, obwohl 9 die größere Zahl ist.<br>In einem <b>Kreisdiagramm</b> ist der ganze Kreis 100 %, also 360°. Darum sind <span class="hl">1 % = 3,6°</span>. In einem <b>Säulendiagramm</b> zeigt die Höhe die Anzahl, du musst nur wissen, wofür 1 cm steht.',
    picture: '<svg viewBox="0 0 100 100" width="110" height="110" role="img" aria-label="Kreisdiagramm mit einem Viertel markiert"><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50,50 L50,10 A40,40 0 0,1 90,50 Z" fill="var(--accent)"/></svg><br>90° von 360° = 25 %',
    story: 'In der 3a fahren 8 von 20 Kindern mit dem Rad, in der 3b 9 von 25. Welche Klasse ist radfreundlicher? 8 : 20 = 0,4, also 40 %. 9 : 25 = 0,36, also 36 %. Die 3a gewinnt, obwohl dort weniger Kinder radeln.',
    example: { task: 'Von 25 Befragten haben 8 ein Haustier. Relative Häufigkeit in %?', lines: ['8 : 25 = 0,32', '0,32 · 100 = 32 %'] },
    more: [
      { task: 'Im Kreisdiagramm hat „Bus“ 90°. Wie viel Prozent?', lines: ['Ganzer Kreis: 360° = 100 %', '90 : 360 = 0,25, also 25 %'] },
      { task: '40 % sollen im Kreisdiagramm dargestellt werden. Winkel?', lines: ['1 % = 3,6°', '40 · 3,6° = 144°'] },
      { task: 'Säulendiagramm: 1 cm steht für 20 Personen, die Säule ist 3,5 cm hoch', lines: ['3,5 · 20 = 70 Personen'] },
    ],
    watch: [
      'Absolute Häufigkeit ist eine Anzahl, relative ein Anteil. Nicht verwechseln.',
      'Immer durch alle zusammen teilen, nicht durch die anderen.',
      '0,32 ist schon die relative Häufigkeit. Für Prozent noch mal 100.',
      'Grad sind keine Prozent: 90° sind 25 %, nicht 90 %.',
    ],
    parents: 'Zeitungen und Nachrichten sind voll mit Diagrammen. Suchen Sie gemeinsam eines und lassen Sie Ihr Kind in eigenen Worten erklären, was es zeigt. Fragen Sie nach: „Sind das Anzahlen oder Prozent? Wie viele wurden insgesamt befragt?“',
  },

  'g8-koerper8': {
    idea: 'Ein <b>Zylinder</b> (Dose) ist wie ein Prisma mit einem Kreis als Grundfläche: <span class="hl">V = r² · π · h</span>.<br>Spitze Körper sind dünner: Ein <b>Kegel</b> passt genau dreimal in den Zylinder mit gleicher Grundfläche und Höhe, eine <b>Pyramide</b> dreimal ins passende Prisma. Darum: <span class="hl">V = G · h : 3</span>.<br>Eine <b>Kugel</b> hat <span class="hl">V = 4 · r³ · π : 3</span>. Merkhilfe: Sie füllt genau zwei Drittel des Zylinders, der sie gerade umschließt.',
    picture: '<span class="pic">🥫</span> Zylinder: r² · π · h<br><span class="pic">🍦</span> Kegel: r² · π · h : 3<br><span class="pic">⚽</span> Kugel: 4 · r³ · π : 3',
    story: 'Eine Getränkedose hat innen r = 3 cm und h = 10 cm. Hinein passen 9 · π · 10 ≈ 282,74 cm³, also etwa 0,28 Liter. Eine Eistüte (Kegel) mit gleichem Radius und gleicher Höhe fasst nur ein Drittel davon, etwa 94,25 cm³.',
    example: { task: 'Zylinder: r = 3 cm, h = 10 cm', lines: ['G = r² · π = 9 · π', 'V = G · h = 9 · π · 10 = 90 · π', '≈ 282,74 cm³'] },
    more: [
      { task: 'Kegel: r = 3 cm, h = 10 cm', lines: ['V = r² · π · h : 3 = 90 · π : 3 = 30 · π', '≈ 94,25 cm³'] },
      { task: 'Quadratische Pyramide: a = 6 cm, h = 5 cm', lines: ['G = 6 · 6 = 36 cm²', 'V = 36 · 5 : 3 = 60 cm³'] },
      { task: 'Kugel: r = 3 cm', lines: ['r³ = 3 · 3 · 3 = 27', 'V = 4 · 27 · π : 3 = 36 · π', '≈ 113,10 cm³'] },
    ],
    watch: [
      'Radius, nicht Durchmesser einsetzen. Ist d gegeben, zuerst halbieren.',
      'Kegel und Pyramide: „: 3“ nicht vergessen.',
      'Kugel: r hoch 3, nicht hoch 2. Volumen ist dreidimensional.',
      'π erst am Ende mit dem Taschenrechner ausrechnen, dann runden.',
    ],
    parents: 'Messen Sie mit Ihrem Kind eine Konservendose ab, rechnen Sie das Volumen aus und vergleichen Sie mit der Füllmenge auf dem Etikett (1 cm³ = 1 ml). Die kleine Abweichung kommt vom Blech und vom Luftraum, die Größenordnung muss aber passen.',
  },

  'g8-statistik8': {
    idea: 'Der <b>Median</b> teilt die geordnete Liste in eine untere und eine obere Hälfte. Die Mitte der unteren Hälfte ist das <b>untere Quartil q₁</b>, die Mitte der oberen Hälfte das <b>obere Quartil q₃</b>. Mit Minimum und Maximum hast du fünf Kennzahlen, die die Werte in <span class="hl">vier Viertel</span> teilen.<br>Ein <b>Boxplot</b> zeichnet genau diese fünf Zahlen. Die Box reicht von q₁ bis q₃ und enthält die mittleren 50 % der Werte. Ihre Breite heißt <b>Quartilsabstand</b> (q₃ − q₁), die ganze Länge ist die <b>Spannweite</b> (Maximum − Minimum).',
    picture: '<svg viewBox="0 0 260 70" width="260" height="70" role="img" aria-label="Boxplot 9, 11, 14, 18, 20"><g stroke="currentColor" stroke-width="2" fill="none"><path d="M10,25 H53.6 M206.4,25 H250 M10,15 V35 M250,15 V35"/><rect x="53.6" y="10" width="152.8" height="30" fill="var(--accent)" fill-opacity="0.25"/><path d="M119.1,10 V40"/></g><g font-size="11" fill="currentColor" text-anchor="middle"><text x="10" y="62">9</text><text x="53.6" y="62">11</text><text x="119.1" y="62">14</text><text x="206.4" y="62">18</text><text x="250" y="62">20</text></g></svg><br><span class="cap">Zwischen zwei Strichen liegt jeweils etwa ein Viertel der Werte.</span>',
    story: 'Beim Sportfest werden die Punkte von 7 Klassen notiert: 12, 15, 9, 20, 14, 18, 11. Der Boxplot zeigt auf einen Blick: Die mittlere Hälfte der Klassen hat zwischen 11 und 18 Punkten, die beste 20 und die schwächste 9.',
    example: { task: 'Werte: 12, 15, 9, 20, 14, 18, 11', lines: ['Ordnen: 9, 11, 12, 14, 15, 18, 20', 'Median: der 4. Wert, also 14', 'Untere Hälfte 9, 11, 12: q₁ = 11', 'Obere Hälfte 15, 18, 20: q₃ = 18', 'Quartilsabstand: 18 − 11 = 7, Spannweite: 20 − 9 = 11'] },
    more: [
      { task: 'Boxplot: Minimum 9, q₁ 11, Median 14, q₃ 18, Maximum 20. Wie viel Prozent liegen über 11?', lines: ['Von q₁ bis zum Maximum sind es drei Viertel', 'Also etwa 75 %'] },
      { task: 'Wie viel Prozent liegen zwischen 11 und 18?', lines: ['Das ist die Box, von q₁ bis q₃', 'Also etwa 50 %'] },
    ],
    watch: [
      'Immer zuerst ordnen.',
      'Bei ungerader Anzahl gehört der Median zu keiner Hälfte, wenn du q₁ und q₃ suchst.',
      'Eine lange Box heißt nicht „mehr Werte“: In jedem Viertel liegen gleich viele Werte, sie sind nur weiter verstreut.',
      'Spannweite (ganz) und Quartilsabstand (Box) nicht verwechseln.',
    ],
    parents: 'Notieren Sie eine Woche lang, wie viele Minuten der Schulweg dauert, und zeichnen Sie gemeinsam einen Boxplot. Fragen Sie: „In welchem Bereich liegt die Hälfte deiner Wege? Gab es einen Ausreißer?“',
  },

  'g8-gls8': {
    idea: 'Ein <b>Gleichungssystem</b> hat zwei Unbekannte, x und y, und zwei Gleichungen. Eine Gleichung allein reicht nicht, weil viele Paare passen würden. Erst beide zusammen legen x und y fest.<br>Der Trick ist immer gleich: <span class="hl">Eine Variable wegbringen</span>, dann hast du eine normale Gleichung mit nur einer Unbekannten.<br><b>Einsetzen</b>: Steht schon y = … da, setzt du das für y in die andere Gleichung ein.<br><b>Gleichsetzen</b>: Stehen zweimal y = … da, setzt du die rechten Seiten gleich.<br><b>Addieren</b>: Stehen vor y Gegenzahlen (+3y und −3y), zählst du die Gleichungen zusammen, und y fällt weg.<br>Zum Schluss den gefundenen Wert in eine Gleichung einsetzen und die Probe machen.',
    picture: '<span class="pic">🎬</span> I: 2x + y = 25<br>II: x + y = 15<br>I − II: x = 10',
    story: 'Im Kino kosten 2 Tickets und 1 Popcorn zusammen 25 €. 1 Ticket und 1 Popcorn kosten 15 €. Der Unterschied ist genau ein Ticket, also kostet es 25 − 15 = 10 €. Dann bleibt für das Popcorn 15 − 10 = 5 €. Genau das macht das Additionsverfahren.',
    example: { task: 'I: 3x + y = 16, II: y = 2x + 1', lines: ['II in I einsetzen: 3x + (2x + 1) = 16', 'Zusammenfassen: 5x + 1 = 16', '5x = 15, also x = 3', 'In II: y = 2 · 3 + 1 = 7', 'Probe in I: 3 · 3 + 7 = 16, stimmt.'] },
    more: [
      { task: 'I: y = 2x + 3, II: y = −x + 9', lines: ['Gleichsetzen: 2x + 3 = −x + 9', 'Plus x, minus 3: 3x = 6, also x = 2', 'In I: y = 2 · 2 + 3 = 7'] },
      { task: 'I: x + y = 10, II: x − y = 4', lines: ['I + II: y fällt weg, 2x = 14', 'x = 7', 'In I: 7 + y = 10, also y = 3'] },
    ],
    watch: [
      'Beim Einsetzen die ganze Klammer übernehmen und mit der Zahl davor malnehmen.',
      'Beim Addieren müssen die Zahlen vor y Gegenzahlen sein, sonst fällt y nicht weg.',
      'Nicht vergessen, auch die zweite Unbekannte auszurechnen.',
      'Die Probe in der Gleichung machen, die du zum Schluss nicht verwendet hast.',
    ],
    parents: 'Rätselaufgaben aus dem Alltag passen gut: „Ein Burger und zwei Getränke kosten 11 €, ein Burger und ein Getränk 8 €. Was kostet das Getränk?“ Viele Kinder lösen das zuerst mit Hausverstand. Zeigen Sie dann, dass genau dieses Denken das Additionsverfahren ist.',
  },
};
