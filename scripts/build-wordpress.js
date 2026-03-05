/**
 * Sammelt alle für WordPress nötigen Skripte in dist/:
 * - motion.js (Motion Core UMD)
 * - motion-plus-dom.js (aus plus-2.7.1 gebaut)
 *
 * Voraussetzung:
 * - npm install (Motion liegt in node_modules)
 * - motion-plus-dom: in plus-2.7.1 einmal "yarn" und "yarn build" ausführen
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const motionMin = path.join(ROOT, "node_modules", "motion", "dist", "motion.min.js");
const motionPath = fs.existsSync(motionMin) ? motionMin : path.join(ROOT, "node_modules", "motion", "dist", "motion.js");
const plusDomPath = path.join(ROOT, "plus-2.7.1", "packages", "motion-plus-dom", "dist", "motion-plus-dom.js");

if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST, { recursive: true });
}

// Motion Core UMD
if (fs.existsSync(motionPath)) {
  fs.copyFileSync(motionPath, path.join(DIST, "motion.js"));
  console.log("✓ dist/motion.js (Motion Core UMD)");
} else {
  console.warn("⚠ Motion nicht gefunden. Bitte im Projekt-Root ausführen: npm install");
}

// Motion+ DOM (optional – muss in plus-2.7.1 gebaut werden)
if (fs.existsSync(plusDomPath)) {
  fs.copyFileSync(plusDomPath, path.join(DIST, "motion-plus-dom.js"));
  console.log("✓ dist/motion-plus-dom.js");
} else {
  console.warn("⚠ motion-plus-dom noch nicht gebaut. In plus-2.7.1 ausführen: yarn && yarn build");
}

// Vanilla-Bundle (optional – vollständige DOM-API ohne React/Vue, ~130 KB)
const vanillaPath = path.join(DIST, "motion-vanilla.min.js");
if (fs.existsSync(vanillaPath)) {
  console.log("✓ dist/motion-vanilla.min.js (Vollständige Vanilla-API, für WordPress empfohlen)");
} else {
  console.log("  Tipp: npm run build:vanilla erzeugt das Vanilla-Bundle (animate, scroll, inView, keyframes, … + MotionPlus).");
}

console.log("\nFertig. Inhalte von dist/ im Theme/Plugin ablegen und in WordPress mit wp_enqueue_script() laden.");
