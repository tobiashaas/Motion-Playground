/**
 * Vanilla-JS-Bundle: nur animate, stagger, inView + splitText (kein React).
 * Tree-Shaking inklusive → kleinere Datei als motion.js + motion-plus-dom.js einzeln.
 */
const esbuild = require("esbuild");
const path = require("path");

const outFile = path.join(__dirname, "..", "dist", "motion-vanilla.min.js");

esbuild
  .build({
    entryPoints: [path.join(__dirname, "..", "src", "vanilla-entry.js")],
    bundle: true,
    format: "iife",
    minify: true,
    outfile: outFile,
    platform: "browser",
    target: ["es2020"],
    sourcemap: false,
    logLevel: "info",
  })
  .then(() => {
    const fs = require("fs");
    const size = (fs.statSync(outFile).size / 1024).toFixed(1);
    console.log("\n✓ " + path.basename(outFile) + " (" + size + " KB)");
    console.log("  Vollständige Vanilla-API: animate, scroll, inView, keyframes, spring, stagger, hover, press, resize, timeline, … + MotionPlus (splitText, etc.). Kein React/Vue.");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
