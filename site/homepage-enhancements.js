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
        background-position: 50% 8% !important;
        background-repeat: no-repeat !important;
        background-size: cover !important;
      }
      .hero {
        filter: none !important;
        -webkit-filter: none !important;
        image-rendering: auto !important;
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
    portrait.style.setProperty('background-position', '50% 8%', 'important');
    portrait.style.setProperty('background-repeat', 'no-repeat', 'important');
    portrait.style.setProperty('background-size', 'cover', 'important');
  }

  function extractUrl(backgroundImage) {
    if (!backgroundImage || backgroundImage === 'none') return null;
    const matches = [...backgroundImage.matchAll(/url\(["']?(.*?)["']?\)/g)];
    return matches.length ? matches[matches.length - 1][1] : null;
  }

  function imageInfo(src) {
    return new Promise((resolve) => {
      if (!src) return resolve(null);
      const img = new Image();
      img.onload = function () {
        resolve({ src, width: img.naturalWidth || img.width, height: img.naturalHeight || img.height });
      };
      img.onerror = function () { resolve(null); };
      img.src = src;
    });
  }

  async function sharpenHero() {
    const hero = document.querySelector('section.hero, .hero');
    if (!hero) return;

    const candidateSources = new Set();

    document.querySelectorAll('img').forEach((img) => {
      if (img.closest('.agent-section, #about, header, nav, footer')) return;
      const src = img.currentSrc || img.src;
      if (src) candidateSources.add(src);
    });

    document.querySelectorAll('section, article, div, figure, a').forEach((el) => {
      if (el === hero || el.closest('.agent-section, #about, header, nav, footer')) return;
      const src = extractUrl(getComputedStyle(el).backgroundImage);
      if (src) candidateSources.add(src);
    });

    const currentHeroSrc = extractUrl(getComputedStyle(hero).backgroundImage);
    const infos = (await Promise.all([...candidateSources].slice(0, 100).map(imageInfo))).filter(Boolean);
    const landscapes = infos.filter((i) => i.width >= 1200 && i.height >= 650 && i.width / i.height >= 1.35);
    landscapes.sort((a, b) => (b.width * b.height) - (a.width * a.height));
    const best = landscapes[0];

    if (best && best.src && best.src !== currentHeroSrc) {
      hero.style.setProperty('background-image', `linear-gradient(rgba(0,0,0,.12), rgba(0,0,0,.34)), url("${best.src.replace(/"/g, '\\"')}")`, 'important');
      hero.style.setProperty('background-size', 'cover', 'important');
      hero.style.setProperty('background-position', 'center center', 'important');
      hero.dataset.sharpHeroApplied = '1';
    }
    hero.style.setProperty('filter', 'none', 'important');
    hero.style.setProperty('-webkit-filter', 'none', 'important');
  }

  function runImmediateFixes() {
    addStyles();
    moveRealtorDirectlyBelowHero();
    fixPortraitCrop();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runImmediateFixes, { once: true });
  else runImmediateFixes();

  window.addEventListener('load', function () {
    runImmediateFixes();
    sharpenHero();
  }, { once: true });

  setTimeout(runImmediateFixes, 300);
  setTimeout(runImmediateFixes, 1000);
  setTimeout(sharpenHero, 1200);
})();
