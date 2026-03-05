# Motion Scroll Text Effekt (WordPress)

Diese Anleitung beschreibt den Effekt aus `text-animation-green.html`:

- Text wird pro Wort gestaffelt animiert
- `opacity` + leichter `y`-Move beim Reinscrollen
- Farbe wechselt mit Delay von Hatom-Grün (`#7ec242`) zu Schwarz
- Effekt triggert bei jedem Reinscrollen erneut

## 1) Voraussetzungen

- WordPress Seite/Beitrag mit `Custom HTML` Block
- Internetzugriff auf CDN (`jsdelivr`) für Motion

## 2) HTML

```html
<p class="js-scroll-text">
  We create digital experiences that move brands and people forward.
</p>
```

Du kannst mehrere Elemente mit `.js-scroll-text` auf einer Seite verwenden.

## 3) CSS

```css
.js-scroll-text {
  --hatom-green-local: #7ec242;
  color: #000;
}

.js-word {
  display: inline-block;
  opacity: 0;
  color: var(--hatom-green-local);
  transform: translateY(6px);
  will-change: transform, opacity, color;
}
```

## 4) JavaScript (Motion, Vanilla)

```html
<script type="module">
  import { inView, animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

  document.querySelectorAll(".js-scroll-text").forEach((el) => {
    const originalText = el.textContent.trim();
    const tokens = originalText.split(/(\s+)/);
    const fragment = document.createDocumentFragment();
    const words = [];

    el.setAttribute("aria-label", originalText);
    el.textContent = "";

    tokens.forEach((token) => {
      if (/^\s+$/.test(token)) {
        fragment.appendChild(document.createTextNode(token));
        return;
      }

      const span = document.createElement("span");
      span.className = "js-word";
      span.textContent = token;
      span.setAttribute("aria-hidden", "true");
      words.push(span);
      fragment.appendChild(span);
    });

    el.appendChild(fragment);

    inView(
      el,
      () => {
        animate(
          words,
          { opacity: [0, 1], y: [6, 0] },
          {
            duration: 0.42,
            delay: stagger(0.03),
            easing: "ease-out",
          }
        );

        animate(
          words,
          { color: ["#7ec242", "#000000"] },
          {
            duration: 1,
            delay: stagger(0.03, { startDelay: 0.22 }),
            easing: "ease-out",
          }
        );

        // Re-trigger: Beim Verlassen zurücksetzen
        return () => {
          animate(
            words,
            { opacity: 0, y: 6, color: "#7ec242" },
            { duration: 0.18, easing: "linear" }
          );
        };
      },
      { amount: 0.45 }
    );
  });
</script>
```

## 5) WordPress Einbau

1. `Custom HTML` Block einfügen.
2. HTML + `<style>` + `<script type="module">` in denselben Block setzen.
3. Speichern und Frontend testen.

Optional sauberer:

1. CSS in den Customizer (`Zusätzliches CSS`).
2. JS über Theme/Child-Theme laden.
3. Im Content nur das HTML (`.js-scroll-text`) lassen.

## 6) Parameter Cheat Sheet

- Mehr Grün-Zeit:
  - `startDelay` erhöhen, z. B. `0.35`
  - oder Farb-`duration` erhöhen, z. B. `1.2`
- Schnellere Wort-Kaskade:
  - `stagger(0.03)` auf `0.02`
- Dezentere Bewegung:
  - `y: [6, 0]` auf `y: [4, 0]`
- Früher/später triggern:
  - `amount: 0.45` (kleiner = früher, größer = später)

## 7) Accessibility Hinweis

- Durch `aria-label` bleibt der Satz für Screenreader als normaler Text lesbar.
- Die Word-`span`s sind mit `aria-hidden="true"` markiert.

## 8) Motion+ (splitText) in WordPress

Wenn du **Motion+** (z. B. `splitText`) nutzen willst, brauchst du die gebaute Datei aus `plus-2.7.1` (siehe **BUILD-WORDPRESS.md**). Einmal bauen, dann die statische `motion-plus-dom.js` im Theme/Plugin ablegen und per `wp_enqueue_script()` nach Motion laden. Auf dem WordPress-Server wird **kein** Node/npx benötigt.

## 9) Typische Probleme

- Effekt läuft gar nicht:
  - Prüfen, ob `type="module"` gesetzt ist.
  - Prüfen, ob der CDN Import geblockt wird (CSP/Plugin).
- Script wird in WordPress entfernt:
  - Manche Setups filtern `<script>` im Editor.
  - Dann JS im Theme/Child-Theme oder per Snippet-Plugin einbinden.
- Zu viel Stottern auf Mobile:
  - `y` kleiner setzen (`4`), `duration` reduzieren, weniger große Textblöcke animieren.

