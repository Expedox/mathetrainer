// Erklärseiten Volksschule: Idee, Bild, Alltagsbeispiel, Rechenweg, Stolperfallen, Elterntipp.
export default {
  'g1-zahlen20': {
    idea: 'Eine Zahl sagt dir, <b>wie viele</b> Dinge da sind. Bis zehn kennst du die Zahlen schon gut. Danach geht es so weiter: <b>ein Zehner und noch etwas</b>. Dreizehn heißt: ein Zehner und drei Einer. Die <b>Nachbarzahlen</b> stehen direkt davor und direkt danach.',
    picture: '<span class="pic">🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵</span> <span class="pic">🔴🔴🔴</span><br>10 blaue und 3 rote Punkte sind <span class="hl">13</span>.',
    story: 'Lena hat zwölf Murmeln. Tim hat neun Murmeln. Lena hat mehr. Also ist zwölf <b>größer</b> als neun. Tim hat weniger. Neun ist <b>kleiner</b> als zwölf.',
    example: {
      task: 'Finde die Nachbarzahlen: ▢ 14 ▢',
      lines: [
        'Zähle eins zurück: vor 14 kommt 13.',
        'Zähle eins weiter: nach 14 kommt 15.',
        'Lösung: <span class="hl">13</span>, 14, <span class="hl">15</span>',
      ],
    },
    more: [
      {
        task: 'Setze ein: 15 ▢ 18',
        lines: [
          'Beim Zählen kommt 15 vor 18. Also ist 15 kleiner.',
          'Das Zeichen ist wie ein hungriges Krokodil: das offene Maul schaut zur größeren Zahl.',
          'Lösung: 15 <span class="hl">&lt;</span> 18',
        ],
      },
      {
        task: 'Setze ein: 7 ▢ 7',
        lines: [
          'Beide Zahlen sind gleich viel.',
          'Lösung: 7 <span class="hl">=</span> 7',
        ],
      },
    ],
    watch: [
      '&lt; und &gt; verwechselt? Denk an das Krokodil: Es will immer die größere Zahl fressen.',
      '12 und 21 sind nicht gleich! Bei 12 steht die 1 vorne: ein Zehner und zwei Einer.',
      'Nachbarn von 10 sind 9 und 11. Nachbarn von 20 sind 19 und 21.',
    ],
    parents: 'Zählen Sie im Alltag mit: Stufen, Gummibärchen, Löffel. Bündeln Sie zehn Dinge zu einem Häufchen (z. B. 10 Nudeln in ein Sackerl), dann sieht das Kind: 13 ist ein Zehner und 3 Einer. Spielen Sie „Wer hat mehr?“ mit zwei Murmelhaufen. Sagen Sie nicht nur „das Zeichen zeigt nach links“, sondern immer: Die offene Seite zeigt zur größeren Zahl.',
  },

  'g1-plusminus10': {
    idea: '<b>Plus</b> heißt: Es kommt etwas dazu. Dann werden es mehr. <b>Minus</b> heißt: Es geht etwas weg. Dann werden es weniger. Beim <b>Ergänzen</b> fragst du: Wie viele fehlen noch bis zehn?',
    picture: '<span class="pic">🍎🍎🍎🍎</span> plus <span class="pic">🍎🍎🍎</span> = <span class="pic">🍎🍎🍎🍎🍎🍎🍎</span> (7)',
    story: 'Auf der Wiese sitzen drei Hasen 🐰🐰🐰. Dann kommen zwei Hasen dazu 🐰🐰. Jetzt sind es fünf Hasen. Später hoppeln zwei Hasen weg. Dann sind wieder drei Hasen da.',
    example: {
      task: '4 + 3 = ▢',
      lines: [
        'Du hast 4. Merke dir die 4 im Kopf.',
        'Zähle 3 weiter: 5, 6, 7.',
        'Lösung: 4 + 3 = <span class="hl">7</span>',
      ],
    },
    more: [
      {
        task: '9 − 4 = ▢',
        lines: [
          'Du hast 9. Vier gehen weg.',
          'Zähle 4 zurück: 8, 7, 6, 5.',
          'Lösung: 9 − 4 = <span class="hl">5</span>',
        ],
      },
      {
        task: '3 + ▢ = 10',
        lines: [
          'Wie viele fehlen von 3 bis 10?',
          'Zähle weiter und zähle mit den Fingern: 4, 5, 6, 7, 8, 9, 10. Das sind 7 Finger.',
          '3 und 7 sind <b>Zehnerfreunde</b>. Lösung: 3 + <span class="hl">7</span> = 10',
        ],
      },
    ],
    watch: [
      'Beim Weiterzählen die erste Zahl nicht noch einmal zählen. Bei 4 + 3 sagst du „5, 6, 7“, nicht „4, 5, 6“.',
      'Bei Minus wird es weniger. Ist dein Ergebnis größer als die erste Zahl? Dann schau noch einmal.',
      'Beim Ergänzen schreibst du nur die fehlende Zahl ins Kästchen. Bei 3 + ▢ = 10 ist das 7, nicht 10.',
    ],
    parents: 'Rechnen Sie mit echten Dingen: Kekse auf einem Teller, Spielzeugautos, Löffel. Legen Sie dazu oder nehmen Sie weg und lassen Sie das Kind erzählen, was passiert. Üben Sie die Zehnerfreunde (1 und 9, 2 und 8, 3 und 7, 4 und 6, 5 und 5) mit den zehn Fingern. Fingerrechnen ist am Anfang erlaubt; das Ziel ist aber, dass sich das Kind diese Paare merkt.',
  },

  'g1-plusminus20': {
    idea: 'Manchmal springst du beim Rechnen über die Zehn. Das ist der <b>Zehnerübergang</b>. Der Trick: Mach zuerst die Zehn voll. Dann rechnest du den Rest dazu. Bei Minus gehst du zuerst bis zur Zehn zurück.',
    picture: '<span class="pic">🔴🔴🔴🔴🔴</span><br><span class="pic">🔴🔴🔴🔵🔵</span> Die Zehn ist voll!<br><span class="pic">🔵🔵🔵</span> Noch 3 dazu.<br>8 plus 5 ist <span class="hl">13</span>.',
    story: 'In einen Eierkarton passen zehn Eier 🥚. Es liegen schon acht Eier drin. Du bekommst fünf Eier dazu. Zwei passen noch hinein, dann ist der Karton voll. Drei Eier bleiben übrig. Das sind zusammen dreizehn Eier.',
    example: {
      task: '8 + 5 = ▢',
      lines: [
        'Bis zur 10 fehlen 2. Zerlege die 5 in 2 und 3.',
        '8 + 2 = 10',
        '10 + 3 = 13',
        'Lösung: 8 + 5 = <span class="hl">13</span>',
      ],
    },
    more: [
      {
        task: '13 − 5 = ▢',
        lines: [
          'Von 13 zurück bis zur 10 sind es 3. Zerlege die 5 in 3 und 2.',
          '13 − 3 = 10',
          '10 − 2 = 8',
          'Lösung: 13 − 5 = <span class="hl">8</span>',
        ],
      },
    ],
    watch: [
      'Immer zuerst bis zur 10 rechnen. Dann ist der Rest ganz leicht.',
      'Merke dir, wie viel von der Zahl noch übrig ist. Bei 8 + 5 sind nach den 2 noch 3 übrig.',
      'Prüfe Minus mit Plus: 8 + 5 = 13, also stimmt 13 − 5 = 8.',
    ],
    parents: 'Ein Eierkarton (10 Plätze) oder zwei Hände mit zehn Fingern sind perfekte Hilfen: Erst den Karton voll machen, dann den Rest daneben legen. Die Zehnerfreunde aus der ersten Klasse müssen dafür sicher sitzen. Lassen Sie das Kind nicht einfach von 8 aus fünfmal weiterzählen, sondern üben Sie den Weg über die 10, denn er wird später für größere Zahlen gebraucht.',
  },

  'g2-zr100': {
    idea: 'Zahlen bis 100 bestehen aus <b>Zehnern</b> und <b>Einern</b>. 47 sind 4 Zehner und 7 Einer. Beim Rechnen rechnest du zuerst mit den Zehnern und dann mit den Einern. So bleibt jeder Schritt klein und leicht.',
    picture: '<span class="pic">🟦🟦🟦🟦</span> <span class="pic">🔸🔸🔸🔸🔸🔸🔸</span><br>4 Zehnerstangen und 7 Einer sind <span class="hl">47</span>.',
    story: 'Oma hat 47 Kekse gebacken 🍪. Dann backt sie noch 25 Kekse. Zuerst zählt sie die 20 dazu, das sind 67. Dann noch die 5, das sind 72 Kekse.',
    example: {
      task: '47 + 25 = ▢',
      lines: [
        'Zuerst die Zehner: 47 + 20 = 67',
        'Dann die Einer: 67 + 5 = 72',
        'Lösung: 47 + 25 = <span class="hl">72</span>',
      ],
    },
    more: [
      {
        task: '63 − 27 = ▢',
        lines: [
          'Zuerst die Zehner: 63 − 20 = 43',
          'Dann die Einer: 43 − 7 = 36 (über die 40: 43 − 3 = 40, 40 − 4 = 36)',
          'Lösung: 63 − 27 = <span class="hl">36</span>',
        ],
      },
      {
        task: '64 + ▢ = 100',
        lines: [
          'Zuerst bis zum nächsten Zehner: 64 + 6 = 70',
          'Dann bis 100: 70 + 30 = 100',
          'Zusammen: 6 + 30 = 36. Lösung: 64 + <span class="hl">36</span> = 100',
        ],
      },
    ],
    watch: [
      'Zehner und Einer nicht vermischen. Bei 47 + 25 kommen 2 Zehner und 5 Einer dazu.',
      'Beim Ergänzen bis 100: 64 + 46 ist 110, nicht 100! Richtig ist 36.',
      'Bei Minus mit Zehnerübergang (43 − 7) wieder über den Zehner rechnen.',
    ],
    parents: 'Geld ist ein ideales Material: 10-Cent-Münzen sind Zehner, 1-Cent-Münzen sind Einer. Lassen Sie das Kind Beträge legen und „einkaufen“. Auch eine Hundertertafel oder ein Maßband hilft. Sagen Sie nicht „die Einer zuerst“, denn beim Kopfrechnen ist „Zehner zuerst“ der Weg, den die Schule übt.',
  },

  'g2-einmaleins': {
    idea: '<b>Mal</b> heißt: gleich große Gruppen. 3 · 4 bedeutet: drei Gruppen mit je vier Dingen. Das ist 4 plus 4 plus 4, also 12. Mal ist ein schneller Weg für lange Plus-Rechnungen. Die Reihen mit 2, 5 und 10 sind die leichtesten.',
    picture: '🍽️ <span class="pic">🍪🍪🍪🍪</span><br>🍽️ <span class="pic">🍪🍪🍪🍪</span><br>🍽️ <span class="pic">🍪🍪🍪🍪</span><br>3 Teller mit je 4 Keksen: 3 · 4 = <span class="hl">12</span>',
    story: 'Ein Hund hat vier Pfoten 🐶. Fünf Hunde haben fünf mal vier Pfoten. Das sind zwanzig Pfoten. Ein Paar Socken sind zwei Socken. Sechs Paar Socken sind zwölf Socken.',
    example: {
      task: '6 · 5 = ▢',
      lines: [
        'Trick: Die 5er-Reihe ist die Hälfte der 10er-Reihe.',
        '6 · 10 = 60',
        'Die Hälfte von 60 ist 30.',
        'Lösung: 6 · 5 = <span class="hl">30</span>',
      ],
    },
    more: [
      {
        task: '3 · 8 = ▢',
        lines: [
          'Tauschaufgabe: 3 · 8 ist gleich viel wie 8 · 3.',
          '8 · 3 kennst du vielleicht schon: 24.',
          'Oder: 8 + 8 + 8 = 24. Lösung: 3 · 8 = <span class="hl">24</span>',
        ],
      },
      {
        task: '9 · 4 = ▢',
        lines: [
          'Nachbaraufgabe: 10 · 4 = 40 ist leicht.',
          '9 · 4 ist eine Vierergruppe weniger: 40 − 4 = 36',
          'Lösung: 9 · 4 = <span class="hl">36</span>',
        ],
      },
    ],
    watch: [
      'Mal ist nicht Plus! 3 · 4 ist 12, nicht 7.',
      'Bei der Nachbaraufgabe eine ganze Gruppe weg- oder dazurechnen, nicht nur 1.',
      'Alles mal 0 ist 0. Alles mal 1 bleibt gleich.',
    ],
    parents: 'Suchen Sie Malaufgaben im Alltag: Eierschachteln, Schokoladetafeln (Reihen und Spalten), Autoräder. Sagen Sie die Reihen gemeinsam auf, z. B. beim Stiegensteigen. Wichtig ist, dass das Kind versteht, was 3 · 4 bedeutet, und die Tricks (Tausch, Nachbar, halbe 10er) nutzt, statt nur auswendig zu leiern. Täglich fünf Minuten wirken mehr als eine Stunde am Wochenende.',
  },

  'g2-teilen': {
    idea: '<b>Teilen</b> heißt: gerecht verteilen. Alle bekommen gleich viel. 12 : 3 bedeutet: zwölf Dinge, drei Kinder. Jedes Kind bekommt vier. Teilen ist die Umkehr vom Mal: drei mal vier ist zwölf. <b>Halbieren</b> heißt durch zwei teilen. <b>Verdoppeln</b> heißt mal zwei.',
    picture: '<span class="pic">🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬</span><br>👧 <span class="pic">🍬🍬🍬🍬</span> 👦 <span class="pic">🍬🍬🍬🍬</span> 🧒 <span class="pic">🍬🍬🍬🍬</span><br>12 : 3 = <span class="hl">4</span>',
    story: 'Du hast zwölf Zuckerl und zwei Freunde. Ihr seid zu dritt. Du gibst jedem eins, dann wieder jedem eins, immer reihum. Am Ende hat jeder vier Zuckerl. Keiner wird übersehen.',
    example: {
      task: '12 : 3 = ▢',
      lines: [
        'Frage: Wie oft passt die 3 in die 12? Oder: Welche Zahl mal 3 ist 12?',
        '3 · 4 = 12',
        'Lösung: 12 : 3 = <span class="hl">4</span>',
      ],
    },
    more: [
      {
        task: 'Verdopple 16. Halbiere 34.',
        lines: [
          'Verdoppeln: 16 + 16. Zehner: 10 + 10 = 20. Einer: 6 + 6 = 12. Zusammen <span class="hl">32</span>.',
          'Halbieren: Die Hälfte von 30 ist 15. Die Hälfte von 4 ist 2.',
          'Zusammen: 15 + 2 = <span class="hl">17</span>',
        ],
      },
    ],
    watch: [
      'Prüfe jedes Teilen mit Mal: 12 : 3 = 4, denn 3 · 4 = 12.',
      'Bei Teilen darfst du nicht tauschen: 12 : 3 ist nicht dasselbe wie 3 : 12.',
      'Halbieren und Verdoppeln nicht verwechseln: Halbieren macht kleiner, Verdoppeln macht größer.',
    ],
    parents: 'Lassen Sie das Kind wirklich verteilen: Gummibärchen auf Teller, Karten an Mitspieler, Pizzastücke. Fragen Sie danach: „Wie kann man das mit Mal schreiben?“ Halbieren lässt sich gut mit Geld üben (die Hälfte von 50 Cent). Sagen Sie nicht „Teilen macht immer kleiner“, denn das stimmt später nicht mehr (z. B. bei Brüchen).',
  },

  'g3-zr1000': {
    idea: 'Bis 1000 gibt es <b>Hunderter</b>, <b>Zehner</b> und <b>Einer</b>. 450 sind 4 Hunderter und 5 Zehner. Mit großen Zahlen rechnest du im Kopf genauso wie mit kleinen: Zerlege die Zahl und rechne Schritt für Schritt. Bei Malaufgaben mit Zehnern rechnest du zuerst die kleine Aufgabe und denkst dann an die Stelle.',
    story: 'Im Zoo gibt es am Vormittag 450 Besucherinnen und Besucher 🦒, am Nachmittag 380. Zusammen sind das 830 Menschen. Eine Familienkarte kostet 30 €. Vier Familienkarten kosten 4 mal 30 €, also 120 €.',
    example: {
      task: '450 + 380 = ▢',
      lines: [
        'Zuerst die Hunderter dazu: 450 + 300 = 750',
        'Dann die Zehner: 750 + 80 = 830 (über die 800: 750 + 50 = 800, 800 + 30 = 830)',
        'Lösung: 450 + 380 = <span class="hl">830</span>',
      ],
    },
    more: [
      {
        task: '30 · 4 = ▢',
        lines: [
          '30 sind 3 Zehner.',
          '3 Zehner · 4 = 12 Zehner',
          '12 Zehner sind 120. Lösung: 30 · 4 = <span class="hl">120</span>',
        ],
      },
      {
        task: '7 · 600 = ▢',
        lines: [
          '600 sind 6 Hunderter.',
          '7 · 6 Hunderter = 42 Hunderter',
          '42 Hunderter sind 4200. Lösung: 7 · 600 = <span class="hl">4200</span>',
        ],
      },
    ],
    watch: [
      'Den Übergang nicht vergessen: 450 + 380 ist 830, nicht 730.',
      'Bei Mal mit Zehnern und Hundertern auf die Nullen achten: 7 · 600 ist 4200, nicht 420.',
      'Schätze vorher: 450 + 380 ist ungefähr 400 + 400 = 800. Dein Ergebnis muss in der Nähe sein.',
    ],
    parents: 'Sprechen Sie Zahlen mit ihrer Bedeutung aus: „7 mal 6 Hunderter“ statt „7 mal 600“. So versteht das Kind, warum die Nullen dazukommen. Vermeiden Sie den Satz „Häng einfach die Nullen hinten an“, denn das führt später bei Kommazahlen zu Fehlern. Preise im Prospekt oder Kilometer auf Wegweisern sind gutes Übungsmaterial.',
  },

  'g3-schriftlich3': {
    idea: 'Bei großen Zahlen hilft das <b>schriftliche Rechnen</b>. Du schreibst die Zahlen genau untereinander: Einer unter Einer, Zehner unter Zehner, Hunderter unter Hunderter. Dann rechnest du Spalte für Spalte, immer <b>von rechts nach links</b>, also mit den Einern zuerst. Was nicht in eine Spalte passt, merkst du dir für die nächste.',
    story: 'Ein Bus fährt am Montag 347 Kilometer 🚌 und am Dienstag 285 Kilometer. Zusammen sind das 632 Kilometer. Ein Bauer hat 532 Äpfel und verkauft 278. Dann bleiben ihm 254 Äpfel.',
    example: {
      task: '347 + 285 schriftlich',
      lines: [
        `<pre class="column">  3 4 7
+ 2 8 5
  ¹ ¹
-------
  6 3 2</pre>`,
        'Einer: 7 + 5 = 12. Schreib 2, merk 1.',
        'Zehner: 4 + 8 + 1 = 13. Schreib 3, merk 1.',
        'Hunderter: 3 + 2 + 1 = 6. Schreib 6.',
        'Lösung: <span class="hl">632</span>',
      ],
    },
    more: [
      {
        task: '532 − 278 schriftlich (ergänzen)',
        lines: [
          `<pre class="column">  5 3 2
− 2 7 8
  ¹ ¹
-------
  2 5 4</pre>`,
          'Einer: Von 8 auf 2 geht nicht, oben ist es kleiner. Nimm 10 dazu: von 8 auf 12 sind es 4. Schreib 4, 1 gemerkt.',
          'Zehner: Die gemerkte 1 kommt unten dazu: 7 + 1 = 8. Von 8 auf 3 geht nicht. Von 8 auf 13 sind es 5. Schreib 5, 1 gemerkt.',
          'Hunderter: 2 + 1 = 3. Von 3 auf 5 sind es 2. Schreib 2.',
          'Lösung: <span class="hl">254</span>. Probe: 254 + 278 = 532 ✓',
        ],
      },
    ],
    watch: [
      'Die Stellen genau untereinander schreiben. Kästchenpapier hilft dabei.',
      'Die gemerkte 1 klein hinschreiben, damit du sie nicht vergisst.',
      'Beim Minus die gemerkte 1 unten zur nächsten Ziffer dazuzählen, nicht oben abziehen.',
      'Mach die Probe: Ergebnis plus untere Zahl muss die obere Zahl ergeben.',
    ],
    parents: 'In Österreich wird beim Minus <b>ergänzt</b>: Man fragt „von unten auf oben“ und schreibt die gemerkte 1 zur nächsten unteren Ziffer. Bitte zeigen Sie dem Kind kein anderes Verfahren (etwa „Ausborgen“ oben), das verwirrt nur. Lassen Sie es laut mitsprechen: „8 auf 12 ist 4, 1 gemerkt.“ Kassenzettel nachrechnen ist eine gute Übung.',
  },

  'g3-einmaleins3': {
    idea: 'Das <b>Einmaleins</b> brauchst du ab jetzt bei fast jeder Rechnung. Teilen ist die Umkehr davon. Manchmal geht das Teilen aber nicht genau auf. Dann bleibt etwas übrig. Das nennt man den <b>Rest</b>. Der Rest ist immer kleiner als die Zahl, durch die du teilst.',
    picture: '<span class="pic">🍪🍪🍪🍪🍪</span> | <span class="pic">🍪🍪🍪🍪🍪</span> | <span class="pic">🍪🍪🍪🍪🍪</span> | <span class="pic">🍪🍪🍪🍪🍪</span> | Rest: <span class="pic">🍪🍪🍪</span><br>23 : 4 = <span class="hl">5 R 3</span>',
    story: 'Vier Kinder teilen sich 23 Kekse 🍪. Jedes Kind bekommt fünf Kekse, das sind zusammen 20. Drei Kekse bleiben übrig. Die reichen nicht mehr für alle vier Kinder. Das ist der Rest.',
    example: {
      task: '6 · 7 = ▢ und 42 : 6 = ▢',
      lines: [
        '6 · 7: Nachbaraufgabe 5 · 7 = 35, plus noch einmal 7: 35 + 7 = 42.',
        'Also 6 · 7 = <span class="hl">42</span>.',
        'Umkehr: 42 : 6 heißt „Wie oft passt die 6 in die 42?“ Genau 7-mal.',
        'Also 42 : 6 = <span class="hl">7</span>.',
      ],
    },
    more: [
      {
        task: '23 : 4 = ▢',
        lines: [
          'Suche die größte Zahl in der 4er-Reihe, die nicht über 23 ist: 4 · 5 = 20 (4 · 6 = 24 ist zu viel).',
          'Was bleibt übrig? 23 − 20 = 3',
          'Ist 3 kleiner als 4? Ja. Lösung: <span class="hl">5 R 3</span>',
        ],
      },
    ],
    watch: [
      'Der Rest muss kleiner sein als der Teiler. 23 : 4 = 4 R 7 ist falsch, denn in die 7 passt die 4 noch einmal.',
      'Schreib die Antwort so: 5 R 3 (Ergebnis, dann R, dann Rest).',
      'Probe: 4 · 5 + 3 = 23 ✓',
    ],
    parents: 'Üben Sie Teilen mit Rest beim Verteilen: 17 Karten an 3 Spieler – wie viele bleiben übrig? Das Einmaleins sollte jetzt flüssig sitzen; kurze, tägliche Abfragen (z. B. im Auto) helfen. Fragen Sie bei Teilaufgaben immer nach der passenden Malaufgabe. Sagen Sie nicht „der Rest ist das, was halt übrig bleibt“, ohne zu prüfen, ob er kleiner als der Teiler ist.',
  },

  'g3-groessen3': {
    idea: 'Längen, Geld und Zeit misst man in verschiedenen <b>Einheiten</b>. Große Einheiten bestehen aus vielen kleinen. Wichtig sind diese Regeln: <b>1 m = 100 cm</b>, <b>1 cm = 10 mm</b>, <b>1 km = 1000 m</b>, <b>1 € = 100 c</b>. Bei der Zeit ist es anders: <b>1 h = 60 min</b>, nicht 100!',
    story: 'Dein Schulweg ist 1 km lang, das sind 1000 Meter 🚶. Ein Eis kostet 2 € 50 c, das sind 250 Cent 🍦. Die Turnstunde dauert 50 Minuten. Ein Kinofilm von 1 Stunde und 20 Minuten dauert 80 Minuten.',
    example: {
      task: '345 cm = ▢ m ▢ cm',
      lines: [
        '100 cm sind 1 m. In 345 cm stecken 3 ganze Hunderter.',
        'Das sind 3 m. Übrig bleiben 45 cm.',
        'Lösung: 345 cm = <span class="hl">3 m 45 cm</span>',
      ],
    },
    more: [
      {
        task: '2 € 50 c = ▢ c',
        lines: [
          '1 € = 100 c, also 2 € = 200 c.',
          '200 c + 50 c = 250 c',
          'Lösung: <span class="hl">250 c</span>',
        ],
      },
      {
        task: '1 h 20 min = ▢ min',
        lines: [
          '1 h = 60 min (nicht 100!)',
          '60 min + 20 min = 80 min',
          'Lösung: <span class="hl">80 min</span>',
        ],
      },
    ],
    watch: [
      'Eine Stunde hat 60 Minuten. 1 h 20 min sind 80 min, nicht 120 min.',
      '90 min sind 1 h 30 min, nicht 1 h 90 min und nicht 9 h.',
      '3 m 5 cm sind 305 cm, nicht 35 cm. Die Null hält den Platz frei.',
    ],
    parents: 'Messen Sie gemeinsam: Körpergröße, Tischlänge, Schritte bis zum Bäcker. Lassen Sie das Kind kleine Einkäufe mit Münzen selbst bezahlen und rechnen Sie das Rückgeld nach. Eine Uhr mit Zeigern hilft, die 60 Minuten zu sehen. Sagen Sie nie „1,5 Stunden sind 1 Stunde 50 Minuten“, denn eine halbe Stunde sind 30 Minuten.',
  },

  'g4-million': {
    idea: 'Nach den Tausendern geht es weiter: <b>Zehntausender</b>, <b>Hunderttausender</b> und dann die <b>Million</b>. Eine Million sind 1 000 000, also tausend Tausender. Mit Tausendern rechnest du wie mit kleinen Zahlen: 34 Tausender plus 8 Tausender sind 42 Tausender. Beim <b>Runden</b> machst du eine Zahl einfacher, damit man sie sich leicht merkt.',
    picture: '<pre class="column">HT ZT  T   H  Z  E\n    3  4   4  6  7</pre>34 467 = 3 Zehntausender, 4 Tausender, 4 Hunderter, 6 Zehner, 7 Einer',
    story: 'Ins Fußballstadion passen 34 000 Fans ⚽. Bei einem großen Spiel kommen noch 8 000 Fans auf Zusatzplätzen dazu. Dann sind 42 000 Fans da. Im Radio sagen sie: „Rund 40 000 Fans.“ Das ist gerundet.',
    example: {
      task: '34 000 + 8 000 = ▢',
      lines: [
        'Denk in Tausendern: 34 T + 8 T',
        '34 + 8 = 42',
        'Also 42 Tausender. Lösung: <span class="hl">42 000</span>',
      ],
    },
    more: [
      {
        task: 'Runde 3 467 auf Hunderter.',
        lines: [
          'Die Hunderterstelle ist die 4. Schau auf die Ziffer rechts daneben: die Zehnerstelle, eine 6.',
          'Regel: Bei 0, 1, 2, 3, 4 abrunden. Bei 5, 6, 7, 8, 9 aufrunden.',
          '6 heißt aufrunden: aus 34 Hundertern werden 35 Hunderter.',
          'Lösung: 3 467 ≈ <span class="hl">3 500</span>',
        ],
      },
    ],
    watch: [
      'Beim Runden nur die eine Ziffer rechts neben der Rundungsstelle anschauen.',
      'Hinter der Rundungsstelle stehen danach nur Nullen: 3 500, nicht 3 567.',
      'Manchmal springt es weiter: 2 951 auf Hunderter gerundet ist 3 000.',
      'Große Zahlen in Dreiergruppen schreiben (42 000), dann verzählst du dich nicht bei den Nullen.',
    ],
    parents: 'Suchen Sie große Zahlen in der Zeitung, bei Einwohnerzahlen von Städten oder auf dem Kilometerzähler im Auto und lassen Sie sie vorlesen und runden. Sagen Sie nicht „ab der Hälfte aufrunden“, sondern genau: „Ist die Ziffer rechts daneben 5 oder größer, wird aufgerundet.“ Eine Stellenwerttafel (HT, ZT, T, H, Z, E) auf Papier hilft beim Lesen.',
  },

  'g4-schriftlich4': {
    idea: 'Auch Mal und Geteilt kannst du schriftlich rechnen. Beim <b>Multiplizieren</b> rechnest du von rechts nach links und merkst dir, was über die Zehn geht. Bei einer zweistelligen Zahl rechnest du zwei Zeilen und zählst sie dann zusammen. Beim <b>Dividieren</b> beginnst du links, bei der größten Stelle.',
    story: 'Eine Schule kauft für 26 Klassen je 34 Hefte 📒. Das sind 884 Hefte. Drei Klassen teilen sich 624 Buntstifte gerecht auf. Jede Klasse bekommt 208 Stifte.',
    example: {
      task: '243 · 6 schriftlich',
      lines: [
        `<pre class="column">2 4 3 · 6
---------
1 4 5 8</pre>`,
        '6 · 3 = 18. Schreib 8, merk 1.',
        '6 · 4 = 24, plus 1 = 25. Schreib 5, merk 2.',
        '6 · 2 = 12, plus 2 = 14. Schreib 14.',
        'Lösung: <span class="hl">1458</span>',
      ],
    },
    more: [
      {
        task: '34 · 26 schriftlich',
        lines: [
          `<pre class="column">3 4 · 2 6
---------
    6 8
    2 0 4
---------
    8 8 4</pre>`,
          'Zehnerzeile: 34 · 2 = 68. Die 8 steht unter der 2, also eine Stelle eingerückt.',
          'Einerzeile: 34 · 6 = 204. Die 4 steht unter der 6.',
          'Zusammenzählen: 4, dann 8 + 0 = 8, dann 6 + 2 = 8. Lösung: <span class="hl">884</span>',
        ],
      },
      {
        task: '624 : 3 schriftlich',
        lines: [
          `<pre class="column">6 2 4 : 3 = 2 0 8
0 2
  2 4
    0</pre>`,
          '6 : 3 = 2. Rest 0. Hol die 2 herunter.',
          '2 : 3 geht nicht, also <b>0</b> ins Ergebnis schreiben! Rest 2. Hol die 4 herunter.',
          '24 : 3 = 8. Rest 0. Lösung: <span class="hl">208</span>. Probe: 208 · 3 = 624 ✓',
        ],
      },
    ],
    watch: [
      'Bei zweistelliger Malrechnung die Zehnerzeile um eine Stelle einrücken.',
      'Beim Dividieren nie die Null im Ergebnis vergessen: 624 : 3 ist 208, nicht 28.',
      'Für jede heruntergeholte Ziffer kommt genau eine Ziffer ins Ergebnis.',
      'Mach die Probe mit der Umkehrrechnung.',
    ],
    parents: 'Lassen Sie das Kind laut mitsprechen, so wie in der Schule („6 mal 3 ist 18, schreib 8, merk 1“). Bei der Division hilft die Regel: Jedes Herunterholen bringt eine Ergebnisziffer. Zeigen Sie bitte keine anderen Schreibweisen aus Ihrer eigenen Schulzeit, ohne mit der Lehrkraft zu reden. Mit einem Taschenrechner darf das Kind am Ende die Probe machen.',
  },

  'g4-groessen4': {
    idea: 'Größen kannst du in verschiedene Einheiten umrechnen. Dazu musst du wissen, wie viele kleine Einheiten in einer großen stecken: <b>1 kg = 1000 g</b>, <b>1 t = 1000 kg</b>, <b>1 km = 1000 m</b>, <b>1 m = 100 cm</b>, <b>1 € = 100 c</b>. Bei der Zeit: <b>1 h = 60 min</b> und <b>1 min = 60 s</b>. Von groß nach klein wird die Zahl größer, von klein nach groß wird sie kleiner.',
    story: 'Ein Sackerl Mehl wiegt 1 kg, also 1000 g 🥖. Ein Elefant wiegt etwa 5 t, das sind 5 000 kg 🐘. Ein Lied dauert 2 min 15 s, also 135 Sekunden.',
    example: {
      task: '3 kg 250 g = ▢ g',
      lines: [
        '1 kg = 1000 g, also 3 kg = 3000 g.',
        '3000 g + 250 g = 3250 g',
        'Lösung: <span class="hl">3250 g</span>',
      ],
    },
    more: [
      {
        task: '2 min 15 s = ▢ s',
        lines: [
          '1 min = 60 s, also 2 min = 120 s.',
          '120 s + 15 s = 135 s',
          'Lösung: <span class="hl">135 s</span>',
        ],
      },
      {
        task: '4 t = ▢ kg und 3 h = ▢ min',
        lines: [
          '1 t = 1000 kg, also 4 t = <span class="hl">4000 kg</span>.',
          '1 h = 60 min, also 3 h = 3 · 60 min = <span class="hl">180 min</span>.',
        ],
      },
    ],
    watch: [
      '2 kg 50 g sind 2050 g, nicht 250 g. Gramm haben drei Stellen.',
      'Bei der Zeit mit 60 rechnen, nicht mit 100: 2 min sind 120 s.',
      'Erst alles in dieselbe Einheit umrechnen, dann rechnen.',
    ],
    parents: 'Wiegen Sie beim Kochen gemeinsam ab und lesen Sie Packungsangaben (500 g Nudeln, 1 kg Mehl). Stoppen Sie Zeiten mit dem Handy in Minuten und Sekunden. Eine Umrechnungstabelle auf einem Zettel am Kühlschrank hilft. Sagen Sie nicht „einfach Nullen dranhängen“, sondern immer, wie viele kleine Einheiten in einer großen stecken.',
  },

  'g4-sach4': {
    idea: 'In einer <b>Sachaufgabe</b> steckt die Rechnung in einer Geschichte. Du gehst in vier Schritten vor: 1. Lies genau und finde die <b>Frage</b>. 2. Schreib heraus, was du weißt. 3. Schreib die <b>Rechnung</b> und rechne. 4. Schreib einen <b>Antwortsatz</b>, der zur Frage passt.',
    story: 'Mia geht einkaufen 🛒. Sie kauft 3 Hefte. Jedes kostet 2 € 40 c. Sie zahlt mit einem 10-Euro-Schein. Die Frage ist: Wie viel Geld bekommt sie zurück?',
    example: {
      task: 'Mia kauft 3 Hefte zu je 2 € 40 c. Sie zahlt mit 10 €. Wie viel bekommt sie zurück?',
      lines: [
        'Frage: Wie viel Rückgeld bekommt Mia?',
        'Rechnung 1: 3 · 2 € 40 c = 3 · 240 c = 720 c = 7 € 20 c',
        'Rechnung 2: 10 € − 7 € 20 c = 2 € 80 c',
        'Antwort: Mia bekommt <span class="hl">2 € 80 c</span> zurück.',
      ],
    },
    more: [
      {
        task: '84 Sticker werden gerecht an 4 Kinder verteilt. Wie viele bekommt jedes Kind?',
        lines: [
          'Rechnung: 84 : 4 = 21 (80 : 4 = 20, 4 : 4 = 1)',
          'Antwort: Jedes Kind bekommt <span class="hl">21 Sticker</span>.',
        ],
      },
      {
        task: 'Ein Film beginnt um 16:45 Uhr und dauert 1 h 35 min. Wann ist er aus?',
        lines: [
          '16:45 + 1 h = 17:45',
          '17:45 + 15 min = 18:00, dann noch 20 min: 18:20',
          'Antwort: Der Film ist um <span class="hl">18:20 Uhr</span> aus.',
        ],
      },
    ],
    watch: [
      'Lies die Aufgabe zweimal. Unterstreiche die Frage.',
      'Nicht einfach alle Zahlen zusammenzählen. Überlege, was wirklich gefragt ist.',
      'Bei Uhrzeiten über die volle Stunde rechnen: Eine Stunde hat 60 Minuten.',
      'Der Antwortsatz braucht eine Einheit (€, Stück, Uhr). Passt die Antwort zur Frage?',
    ],
    parents: 'Machen Sie aus Alltagssituationen kleine Sachaufgaben: „Wir kaufen 4 Semmeln zu je 45 Cent, wie viel zahlen wir?“ oder „Der Bus fährt um 7:50, wir brauchen 15 Minuten zur Haltestelle.“ Lassen Sie das Kind die Aufgabe in eigenen Worten nacherzählen, bevor es rechnet. Sagen Sie nicht, auf Signalwörter zu achten („zusammen heißt immer plus“), denn das stimmt oft nicht. Bestehen Sie freundlich auf dem Antwortsatz.',
  },
};
