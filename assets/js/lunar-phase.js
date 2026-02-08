// assets/js/lunar-phase.js

export function getLunarPhase(date = new Date()) {
  const synodicMonth = 29.530588853;
  const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14)); // Jan 6, 2000

  const daysSince =
    (date.getTime() - knownNewMoon.getTime()) / 86400000;

  const phase = ((daysSince % synodicMonth) + synodicMonth) % synodicMonth;
  const normalized = phase / synodicMonth;

  let name, emoji, key;

  if (normalized < 0.03 || normalized > 0.97) {
    name = "New Moon";
    emoji = "🌑";
    key = "new";
  } else if (normalized < 0.22) {
    name = "Waxing Crescent";
    emoji = "🌒";
    key = "waxing";
  } else if (normalized < 0.28) {
    name = "First Quarter";
    emoji = "🌓";
    key = "quarter";
  } else if (normalized < 0.47) {
    name = "Waxing Gibbous";
    emoji = "🌔";
    key = "waxing";
  } else if (normalized < 0.53) {
    name = "Full Moon";
    emoji = "🌕";
    key = "full";
  } else if (normalized < 0.72) {
    name = "Waning Gibbous";
    emoji = "🌖";
    key = "waning";
  } else if (normalized < 0.78) {
    name = "Last Quarter";
    emoji = "🌗";
    key = "quarter";
  } else {
    name = "Waning Crescent";
    emoji = "🌘";
    key = "waning";
  }

  return { name, emoji, key, normalized };
}