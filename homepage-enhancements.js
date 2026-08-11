(function () {
  'use strict';

  function norm(s) {
    return (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function addStyles() {
    if (document.getElementById('dt-homepage-fixes')) return;
    const style = document.createElement('style');
    style.id = 'dt-homepage-fixes';
    style.textContent = `
      .dt-realtor-fixed {
        scroll-margin-top: 90px;
        position: relative !important;
        z-index: 2;
      }
      .dt-realtor-fixed img {
        object-fit: contain !important;
        object-position: center top !important;
        width: 100% !important;
        height: auto !important;
        max-height: none !important;
        display: block !important;
      }
      .dt-realtor-fixed [class*="image"],
      .dt-realtor-fixed [class*="photo"],
      .dt-realtor-fixed [class*="portrait"],
      .dt-realtor-fixed picture,
      .dt-realtor-fixed figure {
        overflow: visible !important;
        height: auto !important;
        max-height: none !important;
      }
      .dt-hero-sharp {
        background-size: cover !important;
        background-position: center center !important;
        filter: none !important;
        image-rendering: auto !important;
      }
      .dt-hero-sharp::before,
      .dt-hero-sharp::after {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
      @media (max-width: 720px) {
        .dt-realtor-fixed img {
          object-position: center top !important;
          object-fit: contain !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function findHero() {
    return document.querySelector('.hero, [class*="hero"]') ||
      (document.querySelector('h1') && document.querySelector('h1').closest('section')) ||
      document.querySelector('main > section') ||
      document.querySelector('header + *');
  }

  function scoreRealtorCandidate(el) {
    if (!el) return -1;
    const t = norm(el.textContent);
    let score = 0;
    if (t.includes('know your realtor')) score += 10;
    if (t.includes('meet your realtor')) score += 10;
    if (t.includes('realtor')) score += 6;
    if (t.includes('agent')) score += 3;
    if (t.includes('winter')) score += 4;
    if (t.includes('ramos')) score += 4;
    const imgs = el.querySelectorAll ? el.querySelectorAll('img') : [];
    if (imgs.length) score += 2;
    return score;
  }

  function findRealtorSection() {
    const explicit = document.querySelector('[class*="realtor"], [id*="realtor"], [class*="agent"], [id*="agent"]');
    if (explicit && scoreRealtorCandidate(explicit) >= 4) {
      return explicit.closest('section') || explicit;
    }

    const nodes = Array.from(document.querySelectorAll('section, article, div'));
    let best = null;
    let bestScore = -1;
    for (const el of nodes) {
      if (el.children.length > 30) continue;
      const score = scoreRealtorCandidate(el);
      if (score > bestScore) {
        bestScore = score;
        best = el;
      }
    }
    if (best && bestScore >= 6) return best.closest('section') || best;
    return null;
  }

  function moveRealtorUp() {
    const hero = findHero();
    const realtor = findRealtorSection();
    if (!hero || !realtor || hero === realtor || realtor.contains(hero)) return false;

    const heroSection = hero.closest('section') || hero;
    heroSection.insertAdjacentElement('afterend', realtor);
    realtor.classList.add('dt-realtor-fixed');
    return true;
  }

  function fixPortrait() {
    const realtor = findRealtorSection();
    if (!realtor) return false;
    realtor.classList.add('dt-realtor-fixed');

    realtor.querySelectorAll('img').forEach((img) => {
      img.style.setProperty('object-fit', 'contain', 'important');
      img.style.setProperty('object-position', 'center top', 'important');
      img.style.setProperty('width', '100%', 'important');
      img.style.setProperty('height', 'auto', 'important');
      img.style.setProperty('max-height', 'none', 'important');
      img.style.setProperty('display', 'block', 'important');
      let p = img.parentElement;
      for (let i = 0; p && i < 3; i++, p = p.parentElement) {
        p.style.setProperty('overflow', 'visible', 'important');
        p.style.setProperty('max-height', 'none', 'important');
      }
    });
    return true;
  }

  function bestLandscapeImage() {
    const candidates = [];
    document.querySelectorAll('img').forEach((img) => {
      const src = img.currentSrc || img.src || '';
      if (!src || src.startsWith('data:')) return;
      const alt = norm(img.alt);
      if (/logo|icon|avatar|realtor|agent|portrait|headshot/.test(alt)) return;
      const w = img.naturalWidth || Number(img.getAttribute('width')) || 0;
      const h = img.naturalHeight || Number(img.getAttribute('height')) || 0;
      if (w < 1100 || h < 550 || w / Math.max(h, 1) < 1.35) return;
      candidates.push({ src, area: w * h, ratio: w / h });
    });
    candidates.sort((a, b) => (b.area - a.area) || (Math.abs(1.78 - a.ratio) - Math.abs(1.78 - b.ratio)));
    return candidates[0] ? candidates[0].src : null;
  }

  function sharpenHero() {
    const hero = findHero();
    if (!hero) return false;
    const target = hero.matches('.hero, [class*="hero"]') ? hero : (hero.querySelector('.hero, [class*="hero"]') || hero);
    target.classList.add('dt-hero-sharp');
    target.style.setProperty('filter', 'none', 'important');

    const replacement = bestLandscapeImage();
    if (replacement) {
      target.style.setProperty(
        'background-image',
        `linear-gradient(180deg, rgba(9,17,15,.10), rgba(9,17,15,.48)), url("${replacement.replace(/"/g, '%22')}")`,
        'important'
      );
      target.style.setProperty('background-size', 'cover', 'important');
      target.style.setProperty('background-position', 'center center', 'important');
    }
    target.querySelectorAll('img').forEach((img) => {
      img.style.setProperty('filter', 'none', 'important');
      img.style.setProperty('opacity', '1', 'important');
    });
    return true;
  }

  function run() {
    addStyles();
    moveRealtorUp();
    fixPortrait();
    sharpenHero();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }

  window.addEventListener('load', run, { once: true });
  [300, 900, 1800, 3200].forEach((delay) => setTimeout(run, delay));
})();
