(function () {
  'use strict';

  const STYLE_ID = 'discover-troncones-homepage-fixes';

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #about.agent-section {
        position: relative !important;
        z-index: 2 !important;
      }
      #about .agent,
      .agent-section .agent {
        background-position: center top !important;
        background-repeat: no-repeat !important;
        background-size: contain !important;
        background-color: #e9e3d8 !important;
      }
    `;
    document.head.appendChild(style);
  }

  function moveRealtorDirectlyBelowHero() {
    const hero = document.querySelector('section.hero, .hero');
    const realtor = document.querySelector('#about.agent-section, section.agent-section, #about');
    if (!hero || !realtor || hero === realtor) return;
    if (hero.nextElementSibling !== realtor) hero.insertAdjacentElement('afterend', realtor);
  }

  function fixPortraitCrop() {
    const portrait = document.querySelector('#about .agent, .agent-section .agent, .agent');
    if (!portrait) return;
    portrait.style.setProperty('background-position', 'center top', 'important');
    portrait.style.setProperty('background-repeat', 'no-repeat', 'important');
    portrait.style.setProperty('background-size', 'contain', 'important');
    portrait.style.setProperty('background-color', '#e9e3d8', 'important');
  }

  function runFixes() {
    addStyles();
    moveRealtorDirectlyBelowHero();
    fixPortraitCrop();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runFixes, { once: true });
  else runFixes();

  window.addEventListener('load', runFixes, { once: true });
  setTimeout(runFixes, 300);
  setTimeout(runFixes, 1000);
})();
