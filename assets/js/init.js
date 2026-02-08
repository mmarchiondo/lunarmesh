document.documentElement.dataset.phase = "full";
// Later: calculate real lunar phase 🌕
// assets/js/init.js
import { getLunarPhase } from "./lunar-phase.js";

const phase = getLunarPhase();
document.documentElement.dataset.phase = phase.key;

const phaseEl = document.querySelector("[data-lunar-phase]");
if (phaseEl) {
  phaseEl.textContent = `${phase.emoji} ${phase.name}`;
}