# Mathe Trainer

Offline-Web-App zum Mathe-Üben (Schulstufe 1–12, österreichischer Lehrplan).
Läuft im Browser, lässt sich über „Zum Home-Bildschirm“ wie eine App installieren und speichert alle Daten nur auf dem Gerät.

- `js/skills.js` – Lehrplan: Themen pro Schulstufe und die Aufgabentypen dazu. Jeder Aufgabentyp erzeugt neue Aufgaben mit Rechenweg und typischen Fehlern samt Erklärung.
- `js/math.js` – Zahlen, Brüche und Terme lesen, Antworten prüfen, Auswahlantworten bauen
- `js/learn.js` – Übungsrunde (Eintippen, Auswählen, Blitzrechnen)
- `js/mistakes.js` – Fehlerheft: jede falsche Aufgabe mit Antwort und Erklärung
- `js/lessons/` – Erklärseite pro Thema (Idee, Alltag, Rechenweg, Pass auf, Tipp für Eltern)
- `js/why/` – „Warum ist das so?“: pro Aufgabentyp, warum die Regel funktioniert
- `js/` – übriger App-Code ohne Build-Schritt (wie beim Vokabeltrainer)
- `sw.js` – Offline-Cache; bei jeder Veröffentlichung `VERSION` erhöhen

## Lokal ausprobieren

Doppelklick auf `index.html` reicht nicht (Browser laden JavaScript-Module nicht von `file://`). Im Ordner einen kleinen Server starten:

    python -m http.server 8000

und http://localhost:8000 öffnen.

## Veröffentlichen

Den ganzen Ordner auf einen Webserver legen (z. B. GitHub Pages). Bei jeder neuen Version in `sw.js` die `VERSION` erhöhen.
