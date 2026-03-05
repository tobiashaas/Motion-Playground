/**
 * Vollständiger Motion-Vanilla-Build: komplette DOM-API (ohne React/Vue).
 * Alles, was das Paket "motion" (Haupt-Eintrag) exportiert = animate, scroll, inView,
 * keyframes, spring, stagger, hover, press, resize, timeline, etc. + motion-plus-dom.
 */
import * as Motion from "motion";
import * as MotionPlus from "motion-plus-dom";

if (typeof window !== "undefined") {
  window.Motion = Motion;
  window.MotionPlus = MotionPlus;
}
