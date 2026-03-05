# Motion Playground

Performance-oriented Motion demo playground with standalone HTML experiments built on local `motion` and `motion-plus-dom`.

## Included demos

- `parallax.html`: Scroll-driven layered hero inspired by the referenced x.com clip
- `splitText.html`: Basic split text reveal demo
- `text-animation-green.html`: Scroll text reveal experiment

## Parallax Demo

`parallax.html` uses:

- `dist/motion.js` for scroll-driven transforms and entrance animation
- `dist/motion-plus-dom.js` for split-word text reveals in the lower intro section

The demo is intentionally kept as a standalone HTML file so it can be opened directly or moved into another project with minimal changes.

## Local usage

Open `parallax.html` directly in a browser, or serve the folder with any static file server.

Example:

```bash
npx serve .
```

## Build notes

The bundled Motion files are already included in `dist/`.

If needed, rebuild them with:

```bash
npm run build:vanilla
```
