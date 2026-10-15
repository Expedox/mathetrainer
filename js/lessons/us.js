// Erklärseiten Unterstufe: Idee, Bild, Alltagsbeispiel, Rechenweg, Stolperfallen, Elterntipp.
export default {
  'g5-rechenregeln': {
    idea: 'Damit alle Menschen bei derselben Rechnung dasselbe Ergebnis bekommen, gibt es feste <b>Rechenregeln</b>: <span class="hl">Klammern zuerst</span>, dann <span class="hl">Punkt vor Strich</span> (· und : vor + und −), sonst von links nach rechts. Warum Punkt vor Strich? „3 + 4 · 5“ heißt: 3 und dazu <i>vier Fünfer</i>. Die vier Fünfer gehören zusammen, darum rechnest du sie zuerst aus.<br><b>Teilbarkeit</b> heißt: Die Zahl lässt sich ohne Rest teilen. Dafür gibt es Abkürzungen, damit du nicht dividieren musst.',
    picture: '<span class="pic">3 + <span class="hl">4 · 5</span></span><br><b>4 · 5</b> heißt 4-mal die 5: 5 + 5 + 5 + 5 = <b>20</b><br>Also 3 + 20 = <b>23</b>, nicht 7 · 5 = 35.<br><br><b>Teilbar? Kurz-Check:</b><br>durch 2: Endziffer 0, 2, 4, 6 oder 8<br>durch 5: Endziffer 0 oder 5<br>durch 10: Endziffer 0<br>durch 4: die letzten zwei Ziffern<br>durch 3 und 9: die Ziffernsumme',
    story: 'Du kaufst 1 Heft um 3 € und 4 Stifte um je 5 €. Bezahlen musst du 3 + 4 · 5 = 23 €, nicht (3 + 4) · 5 = 35 €. Und ob 36 Schokostücke gerecht auf 4 Freunde aufgehen? 36 ist durch 4 teilbar, also ja: jeder bekommt 9.',
    example: { task: '3 + 4 · 5', lines: ['Punkt vor Strich: zuerst 4 · 5 = 20', '3 + 20 = 23'] },
    more: [
      { task: '18 − 12 : 3 + 2', lines: ['Zuerst 12 : 3 = 4', '18 − 4 + 2 von links nach rechts', '14 + 2 = 16'] },
      { task: '(3 + 4) · 5', lines: ['Klammer zuerst: 3 + 4 = 7', '7 · 5 = 35'] },
      { task: 'Ist 1 236 durch 2, 3, 4, 5, 9, 10 teilbar?', lines: ['Endziffer 6: durch 2 ja, durch 5 und 10 nein', 'Letzte zwei Ziffern 36 = 4 · 9, also durch 4 ja', 'Ziffernsumme 1 + 2 + 3 + 6 = 12', '12 ist durch 3 teilbar, also 1 236 auch', '12 ist nicht durch 9 teilbar, also 1 236 auch nicht'] },
    ],
    watch: [
      'Nicht stur von links nach rechts rechnen: Erst nachsehen, wo · oder : steht.',
      'Bei Minus und Plus nebeneinander von links nach rechts: 10 − 3 + 2 = 9, nicht 5.',
      'Die Ziffernsumme gilt nur für 3 und 9. Für 4 schaust du auf die letzten zwei Ziffern.',
    ],
    parents: 'Lassen Sie Ihr Kind beim Einkaufen kleine Rechnungen aufstellen („2 Semmeln zu 40 Cent und 1 Milch zu 1,20 €“) und laut sagen, was zuerst gerechnet wird. Fragen Sie: „Warum rechnest du das zuerst?“ Zur Kontrolle hilft ein Taschenrechner am Handy, denn der kennt Punkt vor Strich auch.',
  },

  'g5-dezimal5': {
    idea: 'Eine <b>Dezimalzahl</b> ist eine Zahl mit Komma, zum Beispiel 3,75 €. Links vom Komma stehen die Ganzen, rechts davon die Zehntel, Hundertstel, Tausendstel. Beim Plus- und Minusrechnen darfst du nur Gleiches zusammenzählen: Ganze zu Ganzen, Zehntel zu Zehnteln. Darum schreibst du <span class="hl">Komma unter Komma</span>.<br>Mal 10 macht jede Stelle zehnmal so groß: Die Ziffern rutschen eine Stelle nach links. Das sieht aus, als ob das <span class="hl">Komma nach rechts wandert</span>, und zwar so viele Stellen, wie Nullen da sind. Bei „durch“ wandert es nach links.',
    picture: '<span class="pic">💶</span> 3,25 · 100 = 325 (Komma 2 nach rechts)<br>47,5 : 10 = 4,75 (Komma 1 nach links)',
    story: 'Ein Eis kostet 2,90 €, ein Getränk 1,85 €. Zusammen: 4,75 €. Und wenn 100 Kinder je 3,25 € für den Ausflug zahlen, sind das 325 €.',
    example: { task: '12,5 + 3,75', lines: ['Komma unter Komma schreiben:', '12,50<br>+ 3,75', 'Leere Stelle mit 0 auffüllen: 12,50', 'Stellenweise addieren: 16,25'] },
    more: [
      { task: '8,4 − 2,65', lines: ['8,40 − 2,65 (Null ergänzen)', 'Hundertstel: 0 − 5 geht nicht, borgen', 'Ergebnis: 5,75', 'Probe: 5,75 + 2,65 = 8,40 ✓'] },
      { task: '3,25 · 100 und 47,5 : 10', lines: ['100 hat zwei Nullen, also Komma 2 Stellen nach rechts: 325', '10 hat eine Null, also Komma 1 Stelle nach links: 4,75'] },
      { task: '6,8 : 1000', lines: ['Drei Nullen, also Komma 3 Stellen nach links', 'Fehlende Stellen mit 0 auffüllen: 0,0068'] },
    ],
    watch: [
      'Nicht hinten bündig schreiben, sondern Komma unter Komma.',
      'Mal macht die Zahl größer (Komma nach rechts), durch macht sie kleiner (Komma nach links). Kurz überlegen, ob das Ergebnis Sinn ergibt.',
      'Fehlende Stellen mit Nullen auffüllen: 6,8 : 1000 = 0,0068.',
    ],
    parents: 'Kassenbons sind ideales Übungsmaterial: Lassen Sie Ihr Kind zwei oder drei Preise zusammenzählen und mit dem Bon vergleichen. Beim Komma-Verschieben hilft die Frage: „Wird die Zahl größer oder kleiner?“',
  },

  'g5-brueche5': {
    idea: 'Ein <b>Bruch</b> beschreibt einen Teil von einem Ganzen. Der <b>Nenner</b> (unten) sagt, in wie viele gleich große Teile das Ganze zerlegt wird. Der <b>Zähler</b> (oben) sagt, wie viele dieser Teile du nimmst. <span class="frac"><span>3</span><span>4</span></span> heißt also: in 4 gleiche Teile schneiden, 3 davon nehmen.<br>Für einen Bruchteil einer Menge machst du genau das: <span class="hl">durch den Nenner teilen, mal den Zähler nehmen</span>.',
    picture: '<svg viewBox="0 0 100 100" width="110" height="110" role="img" aria-label="Pizza mit 3 von 4 Stücken"><path d="M50,50 L50,10 A40,40 0 1,1 10,50 Z" fill="var(--accent)"/><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50,10 L50,90 M10,50 L90,50" stroke="currentColor" stroke-width="2"/></svg><br><span class="frac"><span>3</span><span>4</span></span> der Pizza',
    story: 'In der Klasse sind 20 Kinder, <span class="frac"><span>3</span><span>4</span></span> davon fahren mit dem Bus. Teile die 20 Kinder in 4 gleich große Gruppen: je 5 Kinder. 3 Gruppen fahren mit dem Bus, also 15 Kinder.',
    example: { task: '<span class="frac"><span>3</span><span>4</span></span> von 20', lines: ['Durch den Nenner: 20 : 4 = 5 (das ist <span class="frac"><span>1</span><span>4</span></span>)', 'Mal den Zähler: 5 · 3 = 15', '<span class="frac"><span>3</span><span>4</span></span> von 20 sind 15'] },
    more: [
      { task: '<span class="frac"><span>2</span><span>5</span></span> von 30 €', lines: ['30 : 5 = 6, also sind <span class="frac"><span>1</span><span>5</span></span> 6 €', '6 · 2 = 12, also sind <span class="frac"><span>2</span><span>5</span></span> 12 €'] },
      { task: 'Eine Schokolade hat 8 gleiche Stücke, 3 sind gegessen. Welcher Bruchteil ist weg?', lines: ['Das Ganze hat 8 Stücke, also Nenner 8', '3 Stücke sind weg, also Zähler 3', 'Gegessen wurden <span class="frac"><span>3</span><span>8</span></span>'] },
    ],
    watch: [
      'Die Teile müssen gleich groß sein, sonst ist es kein richtiger Bruch.',
      'Reihenfolge: zuerst durch den Nenner, dann mal den Zähler. Nicht verwechseln, wer oben und wer unten steht.',
      'Je größer der Nenner, desto kleiner das Stück: <span class="frac"><span>1</span><span>8</span></span> ist weniger als <span class="frac"><span>1</span><span>4</span></span>.',
    ],
    parents: 'Pizza, Kuchen oder eine Tafel Schokolade eignen sich perfekt: Lassen Sie Ihr Kind „ein Viertel“ oder „drei Achtel“ wirklich abteilen. Fragen Sie: „In wie viele Teile schneidest du? Wie viele nimmst du?“',
  },

  'g5-geometrie5': {
    idea: 'Der <b>Umfang</b> ist der Weg einmal rundherum, wie ein Zaun um ein Feld. Ein Rechteck hat zwei lange Seiten a und zwei kurze Seiten b, also <span class="hl">u = 2 · a + 2 · b</span>. Beim Quadrat sind alle vier Seiten gleich: u = 4 · a.<br>Die <b>Fläche</b> sagt, wie viele Kästchen von 1 cm mal 1 cm hineinpassen. In jede Reihe passen a Kästchen, und es gibt b Reihen: <span class="hl">A = a · b</span>. Darum ist die Einheit cm² („Quadratzentimeter“), der Umfang dagegen in cm.',
    picture: '<svg viewBox="0 0 130 90" width="170" height="118" role="img" aria-label="Rechteck 6 mal 4 Kästchen"><g stroke="var(--border)" stroke-width="1"><path d="M25,5 V85 M45,5 V85 M65,5 V85 M85,5 V85 M105,5 V85 M5,25 H125 M5,45 H125 M5,65 H125"/></g><rect x="5" y="5" width="120" height="80" fill="none" stroke="var(--accent)" stroke-width="3"/></svg><br>6 cm · 4 cm = 24 Kästchen = 24 cm²',
    story: 'Dein Zimmer ist 4 m lang und 3 m breit. Für die Sesselleiste rundherum brauchst du den Umfang: 2 · 4 + 2 · 3 = 14 m. Für den Teppich brauchst du die Fläche: 4 · 3 = 12 m².',
    example: { task: 'Rechteck mit a = 6 cm, b = 4 cm', lines: ['u = 2 · 6 + 2 · 4 = 12 + 8 = 20 cm', 'A = 6 · 4 = 24 cm²'] },
    more: [
      { task: 'Quadrat mit a = 5 cm', lines: ['u = 4 · 5 = 20 cm', 'A = 5 · 5 = 25 cm²', 'Gleicher Umfang wie oben, aber mehr Fläche!'] },
      { task: 'Rechteck: A = 36 cm², a = 9 cm. Wie lang ist b?', lines: ['A = a · b, also 36 = 9 · b', 'b = 36 : 9 = 4 cm'] },
    ],
    watch: [
      'Umfang und Fläche nicht verwechseln: Umfang = rundherum (cm), Fläche = innen drin (cm²).',
      'Beim Umfang alle vier Seiten zählen, nicht nur a + b.',
      'Beide Seiten müssen dieselbe Einheit haben. Sonst zuerst umrechnen (z. B. 1 m = 100 cm).',
    ],
    parents: 'Messen Sie gemeinsam ein Blatt Papier, den Tisch oder ein Fenster ab und lassen Sie Umfang und Fläche ausrechnen. Fragen Sie: „Brauchst du hier einen Zaun (Umfang) oder einen Teppich (Fläche)?“ Achten Sie darauf, dass die Einheit dabei steht.',
  },

  'g6-brueche6': {
    idea: '<b>Kürzen</b>: Du teilst Zähler und Nenner durch dieselbe Zahl. Der Wert bleibt gleich, nur die Stücke werden größer und weniger. Am schnellsten geht es mit dem ggT.<br><b>Plus und Minus</b>: Du kannst nur gleich große Stücke zusammenzählen. <span class="frac"><span>1</span><span>4</span></span> + <span class="frac"><span>1</span><span>6</span></span> sind Viertel und Sechstel, also verschiedene Stücke. Darum machst du die Brüche zuerst <span class="hl">gleichnamig</span> (gleicher Nenner), dann rechnest du nur mit den Zählern. Die Nenner werden nie addiert!<br><b>Mal</b>: Zähler mal Zähler, Nenner mal Nenner. <b>Durch</b>: mit dem <span class="hl">Kehrwert</span> malnehmen. <span class="frac"><span>3</span><span>4</span></span> : <span class="frac"><span>1</span><span>2</span></span> fragt: Wie oft passt eine Hälfte in drei Viertel? Eineinhalb Mal.',
    picture: '<span class="pic">🍕</span> <span class="frac"><span>1</span><span>4</span></span> = <span class="frac"><span>3</span><span>12</span></span> und <span class="frac"><span>1</span><span>6</span></span> = <span class="frac"><span>2</span><span>12</span></span>. Jetzt sind die Stücke gleich groß!',
    story: 'Lisa isst <span class="frac"><span>1</span><span>4</span></span> einer Torte, Tom <span class="frac"><span>1</span><span>6</span></span>. Wie viel ist weg? Schneide die Torte in 12 Stücke: Lisa hatte 3, Tom 2, zusammen <span class="frac"><span>5</span><span>12</span></span>.',
    example: { task: '<span class="frac"><span>1</span><span>4</span></span> + <span class="frac"><span>1</span><span>6</span></span>', lines: ['kgV von 4 und 6 ist 12', '<span class="frac"><span>1</span><span>4</span></span> = <span class="frac"><span>3</span><span>12</span></span>, <span class="frac"><span>1</span><span>6</span></span> = <span class="frac"><span>2</span><span>12</span></span>', '<span class="frac"><span>3</span><span>12</span></span> + <span class="frac"><span>2</span><span>12</span></span> = <span class="frac"><span>5</span><span>12</span></span>'] },
    more: [
      { task: '<span class="frac"><span>18</span><span>24</span></span> kürzen und <span class="frac"><span>5</span><span>6</span></span> − <span class="frac"><span>1</span><span>4</span></span>', lines: ['ggT(18, 24) = 6, also <span class="frac"><span>18</span><span>24</span></span> = <span class="frac"><span>3</span><span>4</span></span>', '<span class="frac"><span>5</span><span>6</span></span> − <span class="frac"><span>1</span><span>4</span></span> = <span class="frac"><span>10</span><span>12</span></span> − <span class="frac"><span>3</span><span>12</span></span> = <span class="frac"><span>7</span><span>12</span></span>'] },
      { task: '<span class="frac"><span>2</span><span>3</span></span> · <span class="frac"><span>3</span><span>4</span></span>', lines: ['Zähler mal Zähler: 2 · 3 = 6', 'Nenner mal Nenner: 3 · 4 = 12', '<span class="frac"><span>6</span><span>12</span></span> = <span class="frac"><span>1</span><span>2</span></span> (gekürzt)'] },
      { task: '<span class="frac"><span>3</span><span>4</span></span> : <span class="frac"><span>1</span><span>2</span></span>', lines: ['Kehrwert von <span class="frac"><span>1</span><span>2</span></span> ist <span class="frac"><span>2</span><span>1</span></span>', '<span class="frac"><span>3</span><span>4</span></span> · <span class="frac"><span>2</span><span>1</span></span> = <span class="frac"><span>6</span><span>4</span></span>', 'Kürzen: <span class="frac"><span>3</span><span>2</span></span> = 1 <span class="frac"><span>1</span><span>2</span></span>'] },
    ],
    watch: [
      'Bei Plus und Minus niemals Nenner addieren: <span class="frac"><span>1</span><span>4</span></span> + <span class="frac"><span>1</span><span>6</span></span> ist nicht <span class="frac"><span>2</span><span>10</span></span>.',
      'Beim Kürzen und Erweitern immer oben und unten dasselbe tun.',
      'Beim Dividieren nur den zweiten Bruch umdrehen, nicht den ersten.',
      'Ergebnis am Schluss so weit wie möglich kürzen.',
    ],
    parents: 'Backen eignet sich gut: „Wir brauchen <span class="frac"><span>3</span><span>4</span></span> Liter Milch, haben aber nur einen <span class="frac"><span>1</span><span>4</span></span>-Liter-Becher.“ Fragen Sie Ihr Kind, warum man die Nenner nicht einfach zusammenzählen darf. Wenn es das mit Tortenstücken erklären kann, hat es den Kern verstanden.',
  },

  'g6-dezimal6': {
    idea: '<b>Mal</b>: Du rechnest zuerst so, als gäbe es kein Komma. Dann <span class="hl">zählst du die Kommastellen</span> beider Zahlen zusammen, so viele bekommt auch das Ergebnis. Warum? 2,4 ist 24 Zehntel, 1,3 ist 13 Zehntel. Zehntel mal Zehntel ergibt Hundertstel, also zwei Stellen.<br><b>Durch</b>: Durch eine Kommazahl teilt es sich schwer. Darum <span class="hl">verschiebst du bei beiden Zahlen das Komma gleich weit</span>, bis der Teiler eine ganze Zahl ist. Das Ergebnis bleibt gleich, so wie 6 : 2 dasselbe ist wie 60 : 20.',
    picture: '<span class="pic">✂️</span> 7,2 : 0,3 = 72 : 3<br>(beide Zahlen mal 10)',
    story: 'Ein Kilo Käse kostet 12,40 €, du kaufst 0,5 kg: 12,40 · 0,5 = 6,20 €. Und wie viele 0,3-Liter-Becher kannst du aus 7,2 Liter Saft füllen? 7,2 : 0,3 = 24 Becher.',
    example: { task: '2,4 · 1,3', lines: ['Ohne Komma: 24 · 13 = 312', 'Kommastellen: 1 + 1 = 2', 'Ergebnis: 3,12', 'Überschlag: 2 · 1 = 2, also passt etwa 3'] },
    more: [
      { task: '0,6 · 0,4', lines: ['6 · 4 = 24', '1 + 1 = 2 Kommastellen', '0,24'] },
      { task: '7,2 : 0,3', lines: ['Der Teiler hat 1 Kommastelle, also bei beiden das Komma 1 Stelle nach rechts', '72 : 3 = 24'] },
      { task: '4,5 : 1,5', lines: ['Beide · 10: 45 : 15', '= 3'] },
    ],
    watch: [
      'Beim Malnehmen nicht Komma unter Komma stellen, sondern Kommastellen zählen.',
      'Beim Dividieren das Komma bei <b>beiden</b> Zahlen gleich weit verschieben.',
      'Mal einer Zahl kleiner als 1 macht kleiner: 12,40 · 0,5 ist weniger als 12,40. Mit einem Überschlag prüfen.',
    ],
    parents: 'Beim Obst- oder Wurststand lässt sich wunderbar üben: „0,3 kg zu 9,90 € pro Kilo, was zahlen wir?“ Lassen Sie Ihr Kind zuerst schätzen und dann rechnen. Fragen Sie: „Muss das Ergebnis größer oder kleiner sein als der Kilopreis?“',
  },

  'g6-teiler': {
    idea: 'Ein <b>Teiler</b> einer Zahl geht ohne Rest hinein, ein <b>Vielfaches</b> bekommst du durch Malnehmen (die Einmaleins-Reihe).<br>Der <span class="hl">ggT</span> (größter gemeinsamer Teiler) ist die größte Zahl, die in beide Zahlen passt. Den brauchst du zum Kürzen.<br>Das <span class="hl">kgV</span> (kleinstes gemeinsames Vielfaches) ist die kleinste Zahl, die in beiden Reihen vorkommt. Das brauchst du als gemeinsamen Nenner.',
    picture: 'Teiler 12: 1, 2, 3, 4, <b>6</b>, 12<br>Teiler 18: 1, 2, 3, <b>6</b>, 9, 18<br>Größter gemeinsamer Teiler: ggT = 6',
    story: 'Du hast 12 Gummibärchen und 18 Zuckerl und willst gleiche Sackerl packen, ohne dass etwas übrig bleibt. Höchstens 6 Sackerl gehen (ggT). Und: Bus A fährt alle 4 Minuten, Bus B alle 6 Minuten. Nach 12 Minuten (kgV) fahren beide wieder gleichzeitig ab.',
    example: { task: 'ggT(12, 18)', lines: ['Teiler von 12: 1, 2, 3, 4, 6, 12', 'Teiler von 18: 1, 2, 3, 6, 9, 18', 'Gemeinsam: 1, 2, 3, 6', 'Der größte: ggT = 6'] },
    more: [
      { task: 'kgV(4, 6)', lines: ['Vielfache von 4: 4, 8, 12, 16, …', 'Vielfache von 6: 6, 12, 18, …', 'Kleinstes gemeinsames: kgV = 12'] },
      { task: 'kgV(6, 8)', lines: ['Tipp: Reihe der größeren Zahl durchgehen', '8, 16, 24 – ist 24 durch 6 teilbar? Ja', 'kgV = 24'] },
    ],
    watch: [
      'ggT und kgV nicht verwechseln: Der ggT ist höchstens so groß wie die kleinere Zahl, das kgV mindestens so groß wie die größere.',
      'Bei den Teilern 1 und die Zahl selbst nicht vergessen.',
      'Das Produkt (4 · 6 = 24) ist ein gemeinsames Vielfaches, aber nicht immer das kleinste.',
    ],
    parents: 'Fragen Sie im Alltag: „Wir haben 24 Kekse und 16 Äpfel. Wie viele Kinder können gleich viel von beidem bekommen?“ (ggT 8). Gutes Einmaleins ist hier die halbe Miete. Lassen Sie Ihr Kind Reihen ruhig laut aufsagen.',
  },

  'g6-prozent6': {
    idea: '<b>Prozent</b> heißt „von Hundert“. 20 % bedeutet: 20 von 100 Teilen, also <span class="frac"><span>20</span><span>100</span></span>. Weil sich alles auf 100 bezieht, gilt: <span class="hl">1 % = die Zahl durch 100</span>. Dann nimmst du mal die Prozentzahl.<br>Praktische Abkürzungen: 50 % ist die Hälfte, 25 % ein Viertel, 10 % ist durch 10, 100 % ist alles.',
    picture: '<span class="pic">🏷️ −20 %</span><br>100 % = alles · 50 % = Hälfte · 10 % = durch 10',
    story: 'Ein Paar Sportschuhe kostet 80 €, im Abverkauf gibt es 20 % Rabatt. 1 % von 80 € sind 0,80 €, 20 % sind 20 · 0,80 = 16 €. Du sparst 16 € und zahlst 64 €.',
    example: { task: '20 % von 80 €', lines: ['1 %: 80 : 100 = 0,80 €', '20 %: 0,80 · 20 = 16 €'] },
    more: [
      { task: '15 % von 60', lines: ['1 %: 60 : 100 = 0,6', '15 %: 0,6 · 15 = 9', 'Kontrolle: 10 % = 6, 5 % = 3, zusammen 9 ✓'] },
      { task: '25 % von 48', lines: ['25 % ist ein Viertel', '48 : 4 = 12'] },
    ],
    watch: [
      'Prozent ist kein Euro-Betrag: 20 % von 80 € sind 16 €, nicht 20 €.',
      'Zuerst durch 100, dann mal die Prozentzahl. Nicht vergessen, durch 100 zu teilen.',
      'Rabatt abziehen nicht vergessen, wenn nach dem neuen Preis gefragt ist.',
    ],
    parents: 'Prospekte und Rabattschilder sind perfekte Übungsaufgaben. Fragen Sie: „Wie viel sparen wir mit 30 %? Was kostet es dann?“ Ein guter Trick zum Prüfen: zuerst 10 % ausrechnen (durch 10) und davon ausgehen.',
  },

  'g6-geometrie6': {
    idea: 'Ein <b>Parallelogramm</b> kannst du in ein Rechteck verwandeln: Schneide links ein Dreieck ab und setz es rechts wieder an. Das Rechteck hat dieselbe Grundlinie g und als Breite die <b>Höhe</b> h, darum <span class="hl">A = g · h</span>.<br>Ein <b>Dreieck</b> ist genau ein halbes Parallelogramm: Zwei gleiche Dreiecke ergeben zusammen ein Parallelogramm. Darum <span class="hl">A = g · h : 2</span>.<br>Die Höhe steht immer <b>senkrecht</b> (im rechten Winkel) auf der Grundlinie.',
    picture: '<svg viewBox="0 0 150 80" width="180" height="96" role="img" aria-label="Parallelogramm mit Diagonale und Höhe"><path d="M10,70 L110,70 L140,10 L40,10 Z" fill="var(--muted)" stroke="currentColor" stroke-width="2"/><path d="M10,70 L140,10" stroke="var(--accent)" stroke-width="2"/><path d="M40,10 L40,70" stroke="var(--accent)" stroke-width="2" stroke-dasharray="4 3"/><text x="44" y="45" font-size="12" fill="currentColor">h</text><text x="60" y="80" font-size="12" fill="currentColor">g</text></svg><br>2 Dreiecke = 1 Parallelogramm',
    story: 'Ein dreieckiges Segel hat unten 8 m Breite und ist 5 m hoch. Für den Stoff brauchst du 8 · 5 : 2 = 20 m².',
    example: { task: 'Dreieck mit g = 8 cm, h = 5 cm', lines: ['A = g · h : 2', 'A = 8 · 5 : 2 = 40 : 2', 'A = 20 cm²'] },
    more: [
      { task: 'Parallelogramm mit g = 7 cm, h = 4 cm', lines: ['A = g · h', 'A = 7 · 4 = 28 cm²'] },
      { task: 'Dreieck: A = 15 cm², g = 6 cm. Wie hoch ist h?', lines: ['g · h : 2 = 15, also g · h = 30', 'h = 30 : 6 = 5 cm'] },
    ],
    watch: [
      'Beim Dreieck das „: 2“ nicht vergessen.',
      'Die Höhe ist nicht die schräge Seite, sondern der senkrechte Abstand.',
      'Fläche immer in cm² (oder m²) angeben.',
    ],
    parents: 'Schneiden Sie gemeinsam aus Papier ein Parallelogramm aus und verwandeln Sie es mit einer Schere in ein Rechteck. Dann ein Rechteck diagonal halbieren. Fragen Sie: „Warum teilt man beim Dreieck durch 2?“',
  },

  'g7-ganze': {
    idea: 'Negative Zahlen liegen auf der <b>Zahlengerade</b> links von 0, wie Minusgrade am Thermometer. <span class="hl">Plus</span> heißt: nach rechts gehen, <span class="hl">Minus</span>: nach links. Eine negative Zahl abziehen ist wie Schulden wegnehmen: Das macht dich reicher. Darum gilt <span class="hl">− (−4) = + 4</span>.<br>Beim <b>Mal</b> und <b>Durch</b>: gleiche Vorzeichen ergeben plus, verschiedene minus. Warum ist minus mal minus plus? Schau dir die Reihe an: (−3) · 2 = −6, (−3) · 1 = −3, (−3) · 0 = 0. Jedes Mal kommen 3 dazu. Also geht es weiter mit (−3) · (−1) = +3.',
    picture: '<svg viewBox="0 0 220 40" width="240" height="44" role="img" aria-label="Zahlengerade von minus 5 bis 5"><path d="M5,20 H215" stroke="currentColor" stroke-width="2"/><g stroke="currentColor"><path d="M10,15 V25 M30,15 V25 M50,15 V25 M70,15 V25 M90,15 V25 M110,12 V28 M130,15 V25 M150,15 V25 M170,15 V25 M190,15 V25 M210,15 V25"/></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="10" y="38">−5</text><text x="50" y="38">−3</text><text x="110" y="38">0</text><text x="150" y="38">2</text><text x="210" y="38">5</text></g><path d="M50,10 H150" stroke="var(--accent)" stroke-width="2"/><circle cx="150" cy="10" r="3" fill="var(--accent)"/></svg><br>−3 + 5 = 2',
    story: 'In der Früh hat es −3 °C, zu Mittag ist es um 5 Grad wärmer: −3 + 5 = 2 °C. In der Nacht fällt die Temperatur von 2 °C um 6 Grad: 2 − 6 = −4 °C.',
    example: { task: '−5 − (−4)', lines: ['Minus minus wird plus: −5 + 4', 'Von −5 vier Schritte nach rechts', '= −1'] },
    more: [
      { task: '−3 + 5 und 2 − 6', lines: ['−3 + 5: von −3 fünf nach rechts, da landest du bei 2', '2 − 6: von 2 sechs nach links, da landest du bei −4'] },
      { task: '(−3) · 4 und (−6) · (−2)', lines: ['Verschiedene Vorzeichen, also minus: −12', 'Gleiche Vorzeichen, also plus: +12'] },
      { task: '(−20) : 5 und (−18) : (−3)', lines: ['Verschiedene Vorzeichen, also minus: −4', 'Gleiche Vorzeichen, also plus: +6'] },
    ],
    watch: [
      'Die Vorzeichenregel (gleich = plus) gilt nur für Mal und Durch! −3 − 4 ist −7, nicht +7.',
      'Zwei Minus direkt hintereinander zu Plus zusammenfassen: 7 − (−2) = 7 + 2 = 9.',
      'Bei Plus und Minus im Zweifel die Zahlengerade zeichnen.',
    ],
    parents: 'Thermometer, Kontostand oder Stockwerke (Garage im Keller = −2) sind gute Beispiele. Fragen Sie: „Es hat −4 Grad und wird 7 Grad wärmer. Wie warm ist es dann?“ Lassen Sie sich die Antwort an einer gezeichneten Zahlengerade zeigen.',
  },

  'g7-gleichungen7': {
    idea: 'Eine <b>Gleichung</b> ist wie eine <b>Waage</b> im Gleichgewicht: Links und rechts ist gleich viel. x ist ein unbekanntes Gewicht. Wenn du <span class="hl">auf beiden Seiten dasselbe tust</span> (gleich viel wegnehmen, beide Seiten halbieren …), bleibt die Waage im Gleichgewicht. So arbeitest du dich vor, bis x allein auf einer Seite steht.<br>Du machst immer das <b>Gegenteil</b>: + 7 wird mit − 7 weggemacht, · 4 mit : 4. Zum Schluss machst du die <span class="hl">Probe</span>: x in die Gleichung einsetzen.',
    picture: '<svg viewBox="0 0 160 80" width="180" height="90" role="img" aria-label="Waage"><path d="M80,20 V72 M55,72 H105 M20,20 H140" stroke="currentColor" stroke-width="3"/><path d="M80,20 L74,10 H86 Z" fill="currentColor"/><rect x="18" y="0" width="18" height="18" fill="var(--accent)"/><text x="23" y="13" font-size="12" fill="currentColor">x</text><circle cx="48" cy="12" r="7" fill="var(--muted)" stroke="currentColor"/><circle cx="120" cy="12" r="7" fill="var(--muted)" stroke="currentColor"/><circle cx="136" cy="12" r="7" fill="var(--muted)" stroke="currentColor"/></svg><br><span class="cap">x + 1 = 2</span>',
    story: 'Du hast schon etwas Taschengeld gespart, die Oma gibt dir 7 € dazu, jetzt hast du 12 €. Wie viel hattest du? x + 7 = 12, also x = 5 €.',
    example: { task: '3 · x + 5 = 20', lines: ['Auf beiden Seiten − 5: 3 · x = 15', 'Auf beiden Seiten : 3: x = 5', 'Probe: 3 · 5 + 5 = 20 ✓'] },
    more: [
      { task: 'x + 7 = 12', lines: ['Beide Seiten − 7', 'x = 5', 'Probe: 5 + 7 = 12 ✓'] },
      { task: '4 · x = 28', lines: ['Beide Seiten : 4', 'x = 7', 'Probe: 4 · 7 = 28 ✓'] },
    ],
    watch: [
      'Immer auf <b>beiden</b> Seiten dasselbe tun, nicht nur auf einer.',
      'Bei a · x + b = c zuerst das Plus/Minus wegmachen, dann teilen.',
      'Die Probe zeigt sofort, ob dein x stimmt. Mach sie immer.',
    ],
    parents: 'Stellen Sie Rätsel: „Ich denke mir eine Zahl, nehme sie mal 3 und zähle 5 dazu. Es kommt 20 heraus.“ Lassen Sie Ihr Kind erklären, was es auf beiden Seiten tut. Kontrollieren können Sie ohne Mathe-Kenntnisse ganz einfach mit der Probe: Zahl einsetzen und nachrechnen.',
  },

  'g7-prozent7': {
    idea: 'Bei der Prozentrechnung gibt es drei Größen: den <b>Grundwert</b> G (das Ganze, 100 %), den <b>Prozentsatz</b> p % und den <b>Prozentwert</b> W (der Teil). Eine davon fehlt immer. Der sichere Weg: <span class="hl">Rechne über 1 %</span>.<br>Prozentwert: G : 100 · p. Grundwert: W : p · 100. Prozentsatz: W : G ergibt einen Anteil, mal 100 sind es Prozent.',
    picture: '<span class="pic">📊</span> W = G · p : 100<br>Grundwert = 100 %',
    story: 'Du hast 30 % deines Ferienjobs schon gespart, das sind 45 €. Wie viel hast du insgesamt verdient? 1 % sind 45 : 30 = 1,50 €, 100 % sind 150 €.',
    example: { task: '30 % sind 45 €. Wie groß ist der Grundwert?', lines: ['1 %: 45 : 30 = 1,50 €', '100 %: 1,50 · 100 = 150 €', 'Kontrolle: 30 % von 150 € = 45 € ✓'] },
    more: [
      { task: '18 von 60 sind wie viel Prozent?', lines: ['Anteil: 18 : 60 = 0,3', '0,3 · 100 = 30 %'] },
      { task: '25 % von 80 (Prozentwert)', lines: ['1 %: 80 : 100 = 0,8', '25 %: 0,8 · 25 = 20'] },
    ],
    watch: [
      'Genau lesen: Ist das Ganze gesucht (Grundwert) oder ein Teil davon?',
      'Beim Prozentsatz immer Teil : Ganzes rechnen, nicht umgekehrt.',
      'Prüfe mit Hausverstand: Der Grundwert ist (unter 100 %) größer als der Prozentwert.',
    ],
    parents: 'Schularbeitsnoten, Akkuanzeige oder Rabatte bieten Übungsstoff: „Von 40 Punkten hast du 32. Wie viel Prozent sind das?“ (80 %). Fragen Sie immer: „Was ist hier das Ganze, also 100 %?“',
  },

  'g7-potenzen7': {
    idea: 'Eine <b>Potenz</b> ist eine Abkürzung für wiederholtes Malnehmen: 2⁵ = 2 · 2 · 2 · 2 · 2 = 32. Die kleine Zahl oben (Hochzahl) sagt, <span class="hl">wie oft</span> die Basis mit sich selbst multipliziert wird. Achtung: 2⁵ ist nicht 2 · 5!<br>Eine <b>Quadratzahl</b> ist eine Zahl mal sich selbst, zum Beispiel 7² = 49. Sie ist die Fläche eines Quadrats mit Seite 7. Die <b>Quadratwurzel</b> geht den Weg zurück: <span class="hl">√49 = 7</span>, weil 7 · 7 = 49.',
    picture: 'Quadratzahlen: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225',
    story: 'Eine Nachricht wird weitergeleitet: Du schickst sie 2 Freunden, jeder schickt sie wieder 2 Freunden … In der 5. Runde bekommen sie 2⁵ = 32 Leute. Und ein quadratischer Garten mit 144 m² hat eine Seitenlänge von √144 = 12 m.',
    example: { task: '2⁵', lines: ['2 · 2 = 4', '4 · 2 = 8', '8 · 2 = 16', '16 · 2 = 32'] },
    more: [
      { task: '(−3)² und −3²', lines: ['(−3)² = (−3) · (−3) = +9', '−3² = −(3 · 3) = −9 (nur die 3 wird quadriert)', '(−2)³ = (−2) · (−2) · (−2) = −8'] },
      { task: '√49 und √144', lines: ['Welche Zahl mal sich selbst ergibt 49? 7', 'Welche Zahl mal sich selbst ergibt 144? 12'] },
    ],
    watch: [
      '2⁵ ist nicht 2 · 5 = 10, sondern 32.',
      'Klammern beachten: (−3)² = 9, aber −3² = −9.',
      'Negative Basis mit gerader Hochzahl gibt plus, mit ungerader minus.',
      'Die Quadratzahlen bis 15² auswendig zu können, spart viel Zeit.',
    ],
    parents: 'Üben Sie die Quadratzahlen wie früher das Einmaleins, z. B. im Auto oder beim Abwasch: „Was ist 13²?“ – „169.“ Und umgekehrt: „Wurzel aus 81?“ – „9.“ Fragen Sie auch: „Ist 2³ dasselbe wie 2 · 3?“',
  },

  'g7-schluss': {
    idea: 'Bei der <b>Schlussrechnung</b> schließt du von einer bekannten Menge auf eine andere. Der sichere Trick: <span class="hl">Rechne zuerst auf 1 zurück</span> (die Einheit), dann auf die gesuchte Menge.<br><b>Direkt</b> (proportional): Doppelt so viel Ware kostet doppelt so viel. „Je mehr, desto mehr.“<br><b>Indirekt</b> (umgekehrt proportional): Doppelt so viele Arbeiter brauchen halb so lange. „Je mehr, desto weniger.“ Hier rechnest du genau umgekehrt.',
    picture: '<span class="pic">🍎</span> mehr kg, also mehr €<br><span class="pic">👷</span> mehr Arbeiter, also weniger Tage',
    story: 'Am Markt kosten 3 kg Äpfel 4,50 €. Für 5 kg rechnest du: 1 kg kostet 1,50 €, also 5 kg 7,50 €. Und wenn 4 Leute 6 Tage brauchen, um einen Zaun zu streichen, schaffen es 6 Leute schneller.',
    example: { task: 'Direkt: 3 kg kosten 4,50 €. Was kosten 5 kg?', lines: ['1 kg: 4,50 : 3 = 1,50 €', '5 kg: 1,50 · 5 = 7,50 €'] },
    more: [
      { task: 'Indirekt: 4 Arbeiter brauchen 6 Tage. Wie lange brauchen 6 Arbeiter?', lines: ['1 Arbeiter allein braucht länger: 6 · 4 = 24 Tage', '6 Arbeiter: 24 : 6 = 4 Tage'] },
    ],
    watch: [
      'Zuerst entscheiden: direkt oder indirekt? Frag dich: „Wird es mehr oder weniger?“',
      'Bei indirekt auf 1 zurück wird <b>mal</b> gerechnet, nicht durch.',
      'Ergebnis mit Hausverstand prüfen: Mehr Arbeiter dürfen nicht länger brauchen.',
    ],
    parents: 'Rezepte umrechnen ist perfekt: „Das Rezept ist für 4 Personen, wir sind 6.“ Fragen Sie: „Wie viel bräuchte eine Person?“ Für indirekt: „Wenn 3 Kinder 20 Minuten zum Aufräumen brauchen, wie lange braucht eines allein?“',
  },

  'g8-terme': {
    idea: 'Ein <b>Term</b> ist ein Rechenausdruck mit Variablen. <b>Zusammenfassen</b> darfst du nur <span class="hl">gleichartige Glieder</span>: 3 Äpfel + 5 Äpfel = 8 Äpfel, aber Äpfel und Birnen bleiben getrennt. So wird 3a + 5a = 8a, aber a + b bleibt a + b, und a² und a sind auch verschieden.<br><b>Ausmultiplizieren</b>: Die Zahl vor der Klammer wird mit <span class="hl">jedem</span> Glied in der Klammer malgenommen: a(b + c) = ab + ac.<br>Die <b>binomischen Formeln</b> sind Abkürzungen fürs Ausmultiplizieren:<br>(a + b)² = a² + 2ab + b²<br>(a − b)² = a² − 2ab + b²<br>(a + b)(a − b) = a² − b²',
    picture: '<svg viewBox="0 0 110 110" width="130" height="130" role="img" aria-label="Quadrat a plus b zum Quadrat"><rect x="5" y="5" width="65" height="65" fill="var(--accent)" stroke="currentColor"/><rect x="70" y="5" width="35" height="65" fill="var(--muted)" stroke="currentColor"/><rect x="5" y="70" width="65" height="35" fill="var(--muted)" stroke="currentColor"/><rect x="70" y="70" width="35" height="35" fill="none" stroke="currentColor"/><g font-size="12" fill="currentColor" text-anchor="middle"><text x="37" y="42">a²</text><text x="87" y="42">ab</text><text x="37" y="92">ab</text><text x="87" y="92">b²</text></g></svg><br>(a + b)² = a² + 2ab + b²',
    story: 'Du kaufst 3 Hefte (h) und 2 Blöcke (b), deine Freundin 5 Hefte und 1 Block: zusammen 3h + 2b + 5h + b = 8h + 3b. Du weißt sofort, was ihr insgesamt habt, auch ohne Preise.',
    example: { task: '3a + 2b + 5a − b', lines: ['a-Glieder: 3a + 5a = 8a', 'b-Glieder: 2b − b = b', 'Ergebnis: 8a + b'] },
    more: [
      { task: '3(x + 4) und 2a(3a − 5)', lines: ['3 · x + 3 · 4 = 3x + 12', '2a · 3a − 2a · 5 = 6a² − 10a'] },
      { task: '(x + 3)² und (2x − 5)²', lines: ['x² + 2 · x · 3 + 3² = x² + 6x + 9', '(2x)² − 2 · 2x · 5 + 5² = 4x² − 20x + 25'] },
      { task: '(x + 4)(x − 4)', lines: ['3. binomische Formel: a² − b²', 'x² − 16'] },
    ],
    watch: [
      '(a + b)² ist <b>nicht</b> a² + b². Das Mittelglied 2ab fehlt sonst (siehe Bild).',
      'Beim Ausmultiplizieren jedes Glied in der Klammer erwischen.',
      'Vorzeichen mitnehmen: −2(x − 3) = −2x + 6.',
      'x und x² sind verschiedene Glieder und dürfen nicht zusammengefasst werden.',
    ],
    parents: 'Lassen Sie Ihr Kind mit einer eingesetzten Zahl kontrollieren: Für x = 2 muss (x + 3)² dasselbe ergeben wie x² + 6x + 9 (beide 25). Fragen Sie: „Warum darf man a und b nicht zusammenzählen?“',
  },

  'g8-gleichungen8': {
    idea: 'Auch Gleichungen mit Klammern sind eine <b>Waage</b>: Auf beiden Seiten dasselbe tun. Du gehst immer in derselben Reihenfolge vor:<br>1. <span class="hl">Klammern ausmultiplizieren</span>,<br>2. jede Seite zusammenfassen,<br>3. <span class="hl">alle x auf eine Seite</span>, alle Zahlen auf die andere,<br>4. durch die Zahl vor x teilen,<br>5. <b>Probe</b>: x in die <i>ursprüngliche</i> Gleichung einsetzen.',
    picture: '<span class="pic">⚖️</span> 3(x + 2) = 2x + 10',
    story: 'Drei Freunde kaufen je ein Ticket und ein Getränk um 2 €. Das kostet gleich viel wie zwei Tickets und 10 € für Popcorn. Was kostet ein Ticket? 3(x + 2) = 2x + 10 – die Antwort ist 4 €.',
    example: { task: '3(x + 2) = 2x + 10', lines: ['Ausmultiplizieren: 3x + 6 = 2x + 10', 'Beide Seiten − 2x: x + 6 = 10', 'Beide Seiten − 6: x = 4', 'Probe: 3 · (4 + 2) = 18 und 2 · 4 + 10 = 18 ✓'] },
    more: [
      { task: '5(x − 1) − 2(x + 3) = 4', lines: ['Ausmultiplizieren: 5x − 5 − 2x − 6 = 4', 'Achtung: −2 · (+3) = −6', 'Zusammenfassen: 3x − 11 = 4', 'Beide Seiten + 11: 3x = 15', 'Beide Seiten : 3: x = 5', 'Probe: 5 · 4 − 2 · 8 = 20 − 16 = 4 ✓'] },
    ],
    watch: [
      'Minus vor der Klammer dreht <b>alle</b> Vorzeichen darin um: −2(x + 3) = −2x − 6.',
      'Wenn du ein Glied auf die andere Seite bringst, ändert sich sein Rechenzeichen (+ wird −).',
      'Die Probe immer in die Gleichung mit Klammern einsetzen, nicht in eine Zwischenzeile.',
    ],
    parents: 'Sie müssen die Gleichung nicht selbst lösen können: Lassen Sie Ihr Kind die Lösung einsetzen und links und rechts getrennt ausrechnen. Kommt beides gleich heraus, stimmt die Lösung. Fragen Sie bei einem Fehler: „Was passiert mit dem Minus vor der Klammer?“',
  },

  'g8-pythagoras': {
    idea: 'In einem <b>rechtwinkeligen Dreieck</b> heißt die längste Seite <b>Hypotenuse</b> c. Sie liegt <span class="hl">gegenüber dem rechten Winkel</span>. Die beiden anderen Seiten a und b heißen <b>Katheten</b>. Pythagoras hat entdeckt: Baust du auf jeder Seite ein Quadrat, dann haben die zwei kleinen Quadrate zusammen genau so viel Fläche wie das große:<br><span class="hl">a² + b² = c²</span><br>Suchst du eine Kathete, rechnest du mit Minus: b² = c² − a².',
    picture: '<svg viewBox="0 0 120 100" width="140" height="116" role="img" aria-label="Rechtwinkeliges Dreieck"><path d="M15,85 L105,85 L15,15 Z" fill="var(--muted)" stroke="currentColor" stroke-width="2"/><path d="M15,73 H27 V85" fill="none" stroke="currentColor"/><path d="M105,85 L15,15" stroke="var(--accent)" stroke-width="3"/><g font-size="12" fill="currentColor"><text x="56" y="98">a</text><text x="3" y="54">b</text><text x="64" y="44">c</text></g></svg><br><span class="cap">c liegt gegenüber vom rechten Winkel</span>',
    story: 'Eine 5 m lange Leiter lehnt an einer Hauswand, unten steht sie 3 m von der Wand weg. Wie hoch reicht sie? 5² − 3² = 25 − 9 = 16, √16 = 4 m.',
    example: { task: 'a = 3 cm, b = 4 cm. Wie lang ist c?', lines: ['c² = a² + b² = 9 + 16 = 25', 'c = √25 = 5 cm'] },
    more: [
      { task: 'c = 13 cm, a = 5 cm. Wie lang ist b?', lines: ['b² = c² − a² = 169 − 25 = 144', 'b = √144 = 12 cm'] },
      { task: 'a = 6 m, b = 8 m. Wie lang ist c?', lines: ['c² = 36 + 64 = 100', 'c = √100 = 10 m'] },
    ],
    watch: [
      'Zuerst die Hypotenuse finden: gegenüber dem rechten Winkel, immer die längste Seite.',
      'Bei der Kathete minus rechnen: Groß minus klein, sonst kommt etwas Negatives heraus.',
      'Am Schluss die Wurzel ziehen nicht vergessen.',
      'Gilt nur in rechtwinkeligen Dreiecken.',
    ],
    parents: 'Messen Sie gemeinsam Fernseher- oder Handy-Bildschirme: Breite und Höhe messen, Diagonale ausrechnen und mit dem Maßband prüfen. Fragen Sie: „Welche Seite ist die Hypotenuse und warum?“',
  },

  'g8-kreis': {
    idea: 'Der <b>Radius</b> r geht vom Mittelpunkt zum Rand, der <b>Durchmesser</b> d einmal ganz durch: <span class="hl">d = 2 · r</span>. Bei jedem Kreis ist der Umfang etwas mehr als 3-mal so lang wie der Durchmesser, genauer π ≈ 3,14159-mal.<br>Darum: <span class="hl">u = 2 · r · π</span> (also d · π) und <span class="hl">A = r² · π</span>. Verwende die π-Taste am Taschenrechner und runde erst am Ende auf 2 Dezimalen.',
    picture: '<svg viewBox="0 0 100 100" width="110" height="110" role="img" aria-label="Kreis mit Radius"><circle cx="50" cy="50" r="40" fill="var(--muted)" stroke="currentColor" stroke-width="2"/><path d="M50,50 L90,50" stroke="var(--accent)" stroke-width="3"/><circle cx="50" cy="50" r="2.5" fill="currentColor"/><text x="64" y="45" font-size="12" fill="currentColor">r</text></svg><br><span class="cap">d = 2 · r</span>',
    story: 'Ein Fahrradreifen hat einen Radius von 35 cm. Bei einer Umdrehung fährt das Rad u = 2 · 35 · π ≈ 219,91 cm, also gut 2 m weit. Und für eine runde Pizza mit r = 15 cm ist die Fläche 15² · π ≈ 706,86 cm².',
    example: { task: 'r = 5 cm: Umfang und Fläche', lines: ['u = 2 · 5 · π = 10 · π ≈ 31,42 cm', 'A = 5² · π = 25 · π ≈ 78,54 cm²'] },
    more: [
      { task: 'd = 8 cm: Umfang und Fläche', lines: ['Zuerst Radius: r = 8 : 2 = 4 cm', 'u = 2 · 4 · π ≈ 25,13 cm', 'A = 4² · π = 16 · π ≈ 50,27 cm²'] },
    ],
    watch: [
      'Ist der Durchmesser gegeben, zuerst halbieren, bevor du in A = r² · π einsetzt.',
      'r² heißt r · r, nicht r · 2.',
      'π-Taste verwenden und erst am Schluss runden. Mit 3,14 kommen leicht andere Kommastellen heraus.',
      'Umfang in cm, Fläche in cm².',
    ],
    parents: 'Messen Sie mit einer Schnur den Umfang von Tellern, Dosen oder Töpfen und teilen Sie ihn durch den Durchmesser: Es kommt immer etwa 3,14 heraus. Das ist ein schönes Aha-Erlebnis. Fragen Sie: „Ist hier Radius oder Durchmesser angegeben?“',
  },

  'g8-funktionen8': {
    idea: 'Eine <b>lineare Funktion</b> f(x) = k · x + d ist eine Regel, die jedem x genau einen Wert zuordnet. Ihr Graph ist eine <b>Gerade</b>. <span class="hl">d</span> ist der Startwert (dort schneidet die Gerade die y-Achse). <span class="hl">k</span> ist die Steigung: So viel geht es nach oben, wenn du einen Schritt nach rechts gehst.<br>Steigung aus zwei Punkten: <span class="hl">k = Δy : Δx</span> (Höhenunterschied durch Abstand nach rechts). Die <b>Nullstelle</b> ist das x, bei dem f(x) = 0 ist: Dort schneidet die Gerade die x-Achse.',
    picture: '<svg viewBox="0 0 120 120" width="130" height="130" role="img" aria-label="Gerade f von x gleich 2x plus 1"><path d="M10,110 H115 M10,110 V5" stroke="currentColor" stroke-width="1.5"/><path d="M10,100 L65,0" stroke="var(--accent)" stroke-width="3"/><path d="M21,80 H43 V40" fill="none" stroke="currentColor" stroke-dasharray="3 3"/><g font-size="10" fill="currentColor"><text x="26" y="92">Δx</text><text x="46" y="64">Δy</text></g></svg><br><span class="cap">f(x) = 2x + 1</span>',
    story: 'Ein Handytarif kostet 10 € Grundgebühr und 2 € pro Gigabyte: f(x) = 2 · x + 10. Für 3 GB zahlst du f(3) = 16 €. Die Grundgebühr ist d, der Preis pro GB ist k.',
    example: { task: 'f(x) = 2x + 1. Berechne f(3).', lines: ['x = 3 einsetzen: f(3) = 2 · 3 + 1', '= 6 + 1 = 7'] },
    more: [
      { task: 'Steigung durch P(1 | 3) und Q(4 | 9)', lines: ['Δy = 9 − 3 = 6', 'Δx = 4 − 1 = 3', 'k = 6 : 3 = 2', 'd: 3 = 2 · 1 + d, also d = 1, also f(x) = 2x + 1'] },
      { task: 'Nullstelle von f(x) = 2x − 6', lines: ['f(x) = 0 setzen: 2x − 6 = 0', '2x = 6', 'x = 3'] },
    ],
    watch: [
      'Bei der Steigung beide Differenzen in derselben Reihenfolge bilden (zweiter Punkt minus erster).',
      'Δy kommt oben, Δx unten: k = Δy : Δx, nicht umgekehrt.',
      'Negatives k heißt: Die Gerade fällt.',
      'Für die Nullstelle f(x) = 0 setzen, nicht x = 0 (das ergibt d).',
    ],
    parents: 'Handytarife, Taxipreise oder Stromrechnungen haben fast immer „Grundgebühr plus Preis pro Einheit“. Fragen Sie: „Was ist hier k und was ist d?“ Ihr Kind kann die Tabelle für 0, 1, 2, 3 Einheiten aufschreiben und prüfen, ob sie gleichmäßig wächst.',
  },

  'g8-zinsen': {
    idea: 'Wenn du Geld auf die Bank legst, borgst du es ihr. Dafür bekommst du <b>Zinsen</b>. Das Geld nennt man <b>Kapital</b> K, den Zinssatz p %. Zinsen sind einfach Prozentrechnung: <span class="hl">Jahreszinsen Z = K · p : 100</span>.<br>Liegt das Geld nur ein paar Monate, bekommst du nur einen Teil davon. Ein Jahr hat 12 Monate, darum <span class="hl">Z = K · p : 100 · Monate : 12</span>.',
    picture: '<span class="pic">🏦💶</span> 1 Jahr = 12 Monate',
    story: 'Du legst 2 000 € auf ein Sparbuch mit 3 % Zinsen. Nach einem Jahr bekommst du 60 € Zinsen dazu. (In echt zieht die Bank davon noch Steuer ab, die KESt, aber das brauchst du hier nicht.)',
    example: { task: 'K = 2 000 €, p = 3 %. Jahreszinsen?', lines: ['Z = 2 000 · 3 : 100', 'Z = 6 000 : 100 = 60 €'] },
    more: [
      { task: 'Wie oben, aber nur 8 Monate', lines: ['Jahreszinsen: 60 €', 'Pro Monat: 60 : 12 = 5 €', '8 Monate: 5 · 8 = 40 €'] },
      { task: 'K = 1 500 €, p = 2 %, 3 Monate', lines: ['Jahreszinsen: 1 500 · 2 : 100 = 30 €', '3 Monate: 30 · 3 : 12 = 7,50 €'] },
    ],
    watch: [
      'Bei Monaten durch 12 teilen und mit der Zahl der Monate malnehmen, sonst rechnest du ein ganzes Jahr.',
      'Zinsen sind nur der Zuwachs. Ist das neue Guthaben gefragt, noch K dazuzählen.',
      'p % nicht direkt malnehmen: 3 % ist 3 : 100, nicht 3.',
    ],
    parents: 'Schauen Sie gemeinsam ein echtes Sparangebot oder einen Kontoauszug an und lassen Sie Ihr Kind ausrechnen, was nach einem Jahr dazukommt. Fragen Sie: „Wie viel wäre es nach einem halben Jahr?“ (die Hälfte). Mit dem Handy-Taschenrechner lässt sich das leicht überprüfen.',
  },
};
