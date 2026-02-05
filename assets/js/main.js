import { setTheme, applyTheme } from '/assets/js/theme.js';
import { getCookie, setCookie } from '/assets/js/utils.js';
import { checkCSSDebug, initDevTools } from '/assets/js/devMenu.js';
import { setVolume, getVolume } from '/assets/js/bgMusic.js';


// useless but i guess good for debugging to see if main.js is imported?
// idfk
console.log("welcome to miitube");

(function() {
  checkCSSDebug();
  initDevTools();
})();

window.addEventListener('DOMContentLoaded', () => {
  const savedBgVolume = getCookie('bgVolume');
  const savedSfxVolume = getCookie('sfxVolume');
  const savedTheme = getCookie('theme');

  console.log(`DEBUG:\n  bgvol: ${savedBgVolume},\n  sfxvol: ${savedSfxVolume},\n  thm: ${savedTheme}`);
  if (savedBgVolume) { setVolume(savedBgVolume / 100); }
  if (savedTheme) {
    applyTheme(savedTheme);
  }
});

const clickSfx = new Audio("/assets/sound/sfx/click.wav");
clickSfx.preload = "auto";

const toggleSfx = new Audio("/assets/sound/sfx/toggle.wav");
toggleSfx.preload = "auto";

const miscSfx = new Audio("/assets/sound/sfx/interaction.wav");
miscSfx.preload = "auto";


document.addEventListener("click", (e) => {
  const btn = e.target.closest("button, .clicksfx");
  const toggleThing = e.target.closest('input[type="checkbox"], .togglesfx');

  // Get sfx volume (0-100) from cookie, default to 100
  const savedSfxVolume = getCookie("sfxVolume");
  const sfxVol = savedSfxVolume ? (Number(savedSfxVolume) / 100) : 1;
  const volume = Math.max(0, Math.min(1, sfxVol));

  const miscThing = e.target.closest('.miscsfx');
  if (miscThing) {
    miscSfx.volume = volume;
    miscSfx.currentTime = 0;
    miscSfx.play().catch(() => {});
    return;
  }

  // Click sound
  if (btn) {
    if (btn.matches("button") && (btn.disabled || btn.classList.contains("disabled"))) return;

    clickSfx.volume = volume;
    clickSfx.currentTime = 0;
    clickSfx.play().catch(() => {});
    return;
  }

  // Toggle sound
  if (toggleThing) {
    toggleSfx.volume = volume;
    toggleSfx.currentTime = 0;
    toggleSfx.play().catch(() => {});
  }
});




// Add more here later if needed
// this file is added to all pages of the site btw