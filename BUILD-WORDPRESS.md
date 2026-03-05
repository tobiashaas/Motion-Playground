# Motion + Motion+ DOM für WordPress

## Brauchst du Standard-Motion?

**Ja.** Beides wird gebraucht:

- **Motion (Core)** – liefert `animate`, `stagger`, `inView` und setzt `window.Motion` (wird von motion-plus-dom erwartet).
- **motion-plus-dom** – liefert `splitText` und andere Motion+-Features.

Beide liegen jetzt im Projekt: Motion als Dependency im Root, motion-plus-dom wird aus `plus-2.7.1` gebaut.

---

## Build-Ablauf (einmal lokal, für WordPress)

Auf dem WordPress-Server läuft **kein** Node/npx – du lieferst nur statische Dateien aus `dist/`.

### 1. Im Projekt-Root (Motion.dev)

```bash
npm install
```

Damit liegt **Motion** in `node_modules` (wird für den Build und für `dist/motion.js` genutzt).

### 2. Motion+ DOM bauen (plus-2.7.1)

```bash
cd plus-2.7.1
yarn
yarn build
cd ..
```

(Yarn z.B. per `corepack enable` nutzbar machen, falls nötig.)

### 3. WordPress-Dist erzeugen

```bash
npm run build
```

Das Skript `scripts/build-wordpress.js`:

- legt `dist/` an,
- kopiert `node_modules/motion/dist/motion.min.js` → `dist/motion.js`,
- kopiert, falls vorhanden, `plus-2.7.1/.../motion-plus-dom.js` → `dist/motion-plus-dom.js`.

Ergebnis für WordPress:

- **dist/motion.js** – Motion Core UMD
- **dist/motion-plus-dom.js** – Motion+ DOM (splitText etc.)

Diese beiden Dateien im Theme/Plugin ablegen (z.B. `assets/js/`) und in WordPress nacheinander mit `wp_enqueue_script()` laden: zuerst `motion.js`, dann `motion-plus-dom.js`. Dein Code nutzt weiter `window.Motion` und `window.MotionPlus.splitText`.

---

## Warum plus-2.7.1?

Der Ordner `plus-2.7.1` ist die offizielle **Motion+ 2.7.1**-Quelle (aktueller als das öffentliche npm-Paket 1.5.1), mit gleicher API (`splitText`, Optionen etc.). Die gebaute Datei ist reines Browser-JS (UMD), kein Node auf dem Server nötig.

---

## Motion MCP (Cursor)

Im Projekt steht das **Motion MCP** zur Verfügung. Damit lassen sich z.B. Spring- und Bounce-Easing für CSS erzeugen, z. B. für `transition`:

- **Spring:** z.B. `transition: transform 450ms linear(0, 0.2459, 0.6526, …);` (per MCP „generate-css-spring“).
- **Bounce:** z.B. `transition: transform 0.6s linear(0, 0.0022, …);` (per MCP „generate-css-bounce-easing“).

So bleiben CSS-Animationen konsistent mit Motion’s Spring-Feel, ohne zusätzliche JS-Animationen.

---

## Kurz

- **Motion (Core)** und **motion-plus-dom** sind beide nötig; beide liegen im Projekt.
- **Build:** `npm install` → in `plus-2.7.1`: `yarn && yarn build` → im Root: `npm run build` → `dist/` enthält die Dateien für WordPress.
- **WordPress:** Nur statische Dateien aus `dist/` einbinden, **kein** npx/Node auf dem Server.
