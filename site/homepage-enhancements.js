(function () {
  'use strict';

  const CATEGORY_NAMES = [
    'Homes', 'Condos', 'Lots', 'Beachfront Lots', 'Beach Lots', 'Beachfront', 'All Properties'
  ];

  function normalize(text) {
    return (text || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function addStyles() {
    if (document.getElementById('dt-homepage-enhancement-styles')) return;
    const style = document.createElement('style');
    style.id = 'dt-homepage-enhancement-styles';
    style.textContent = `
      .dt-category-photo-card {
        position: relative !important;
        overflow: hidden !important;
        min-height: 190px !important;
        border-radius: 18px !important;
        background-size: cover !important;
        background-position: center !important;
        isolation: isolate;
        display: flex !important;
        align-items: flex-end !important;
        padding: 22px !important;
        color: #fff !important;
        text-shadow: 0 2px 10px rgba(0,0,0,.42);
        transition: transform .22s ease, box-shadow .22s ease !important;
      }
      .dt-category-photo-card::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background: linear-gradient(180deg, rgba(12,27,25,.05) 20%, rgba(12,27,25,.72) 100%);
      }
      .dt-category-photo-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 30px rgba(0,0,0,.18) !important;
      }
      .dt-category-photo-card, .dt-category-photo-card * { color: #fff !important; }
      .dt-category-photo-card h2, .dt-category-photo-card h3,
      .dt-category-photo-card h4, .dt-category-photo-card strong,
      .dt-category-photo-card b {
        font-size: clamp(1.2rem, 2.1vw, 1.75rem) !important;
        line-height: 1.08 !important;
      }
      .dt-realtor-promoted { scroll-margin-top: 90px; }
      .dt-realtor-promoted img {
        object-position: center top !important;
        object-fit: contain !important;
        width: 100% !important;
        height: auto !important;
        max-height: none !important;
        display: block !important;
      }
      .dt-realtor-promoted [class*="image"],
      .dt-realtor-promoted [class*="photo"],
      .dt-realtor-promoted [class*="portrait"] {
        overflow: visible !important;
        height: auto !important;
        max-height: none !important;
      }
      .dt-hero-restored {
        background-size: cover !important;
        background-position: center center !important;
        filter: none !important;
      }
      .dt-hero-restored img {
        filter: none !important;
        opacity: 1 !important;
      }
      @media (max-width: 720px) {
        .dt-category-photo-card {
          min-height: 150px !important;
          border-radius: 14px !important;
          padding: 16px !important;
        }
        .dt-realtor-promoted img {
          object-position: center top !important;
          object-fit: contain !important;
          height: auto !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function isUsablePropertyImage(img) {
    const src = img.currentSrc || img.src || '';
    if (!src || src.indexOf('image') === -1) return false;
    const alt = normalize(img.alt);
    if (/logo|realtor|agent|portrait|headshot|icon/.test(alt)) return false;
    const nw = img.naturalWidth || Number(img.getAttribute('width')) || 0;
    const nh = img.naturalHeight || Number(img.getAttribute('height')) || 0;
    if (nw && nh && (nw < 500 || nh < 260)) return false;
    return true;
  }

  function collectPropertyImages() {
    const seen = new Set();
    const images = [];
    document.querySelectorAll('img').forEach((img) => {
      if (!isUsablePropertyImage(img)) return;
      const src = img.currentSrc || img.src;
      if (seen.has(src)) return;
      seen.add(src);
      images.push(src);
    });
    return images;
  }

  function candidateCategoryCards() {
    const selectors = [
      '#areaGrid > *', '.areas > *', '.area-grid > *',
      '[class*="collection"] > *', '[class*="categor"] > *'
    ];
    const found = [];
    const seen = new Set();
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (seen.has(el)) return;
        const text = normalize(el.textContent);
        const matches = CATEGORY_NAMES.some((name) => text === normalize(name) || text.startsWith(normalize(name) + ' ') || text.includes(normalize(name)));
        if (matches && el.getBoundingClientRect().width > 80) {
          seen.add(el); found.push(el);
        }
      });
    });
    if (found.length < 3) {
      document.querySelectorAll('a,button,article,div').forEach((el) => {
        if (seen.has(el) || el.children.length > 8) return;
        const text = normalize(el.textContent);
        const matches = CATEGORY_NAMES.some((name) => text === normalize(name) || text.startsWith(normalize(name) + ' '));
        if (matches && el.getBoundingClientRect().width > 120 && el.getBoundingClientRect().height > 45) {
          seen.add(el); found.push(el);
        }
      });
    }
    return found;
  }

  function enhanceCategories() {
    const cards = candidateCategoryCards();
    const images = collectPropertyImages();
    if (!cards.length || !images.length) return false;
    cards.forEach((card, index) => {
      if (!card.classList.contains('dt-category-photo-card')) {
        const image = images[(index + 2) % images.length];
        card.classList.add('dt-category-photo-card');
        card.style.backgroundImage = `url("${image.replace(/"/g, '%22')}")`;
      }
    });
    return true;
  }

  function findRealtorSection() {
    const nodes = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,p,strong,div,span'));
    const heading = nodes.find((el) => {
      const t = normalize(el.textContent);
      return t === 'know your realtor' || t.includes('know your realtor') || t === 'meet your realtor';
    });
    if (!heading) return null;
    return heading.closest('section') || heading.closest('[class*="realtor"]') ||
      heading.closest('[class*="agent"]') || heading.closest('article') || heading.parentElement;
  }

  function findHeroSection() {
    const main = document.querySelector('main');
    const heroByClass = document.querySelector('.hero, [class*="hero"]');
    if (heroByClass) return heroByClass.closest('section') || heroByClass;
    const h1 = document.querySelector('h1');
    if (h1) return h1.closest('section') || h1.closest('header') || h1.parentElement;
    if (main && main.firstElementChild) return main.firstElementChild;
    return document.querySelector('header');
  }

  function restoreHeroClarity() {
    const hero = findHeroSection();
    if (!hero) return false;
    const target = hero.matches('.hero, [class*="hero"]') ? hero : (hero.querySelector('.hero, [class*="hero"]') || hero);
    const bg = getComputedStyle(target).backgroundImage || '';
    const urlMatch = bg.match(/url\((['"]?)(.*?)\1\)/i);
    if (urlMatch && urlMatch[2]) {
      target.style.backgroundImage = `linear-gradient(180deg, rgba(9,17,15,.03), rgba(9,17,15,.30)), url("${urlMatch[2].replace(/"/g, '%22')}")`;
    }
    target.style.backgroundSize = 'cover';
    target.style.backgroundPosition = 'center center';
    target.style.filter = 'none';
    target.classList.add('dt-hero-restored');
    target.querySelectorAll('img').forEach((img) => {
      img.style.filter = 'none';
      img.style.opacity = '1';
    });
    return true;
  }

  function fixRealtorPortrait(realtor) {
    if (!realtor) return false;
    realtor.querySelectorAll('img').forEach((img) => {
      img.style.setProperty('object-position', 'center top', 'important');
      img.style.setProperty('object-fit', 'contain', 'important');
      img.style.setProperty('width', '100%', 'important');
      img.style.setProperty('height', 'auto', 'important');
      img.style.setProperty('max-height', 'none', 'important');
      img.style.setProperty('display', 'block', 'important');
      if (img.parentElement) {
        img.parentElement.style.setProperty('overflow', 'visible', 'important');
        img.parentElement.style.setProperty('height', 'auto', 'important');
        img.parentElement.style.setProperty('max-height', 'none', 'important');
      }
    });
    return true;
  }

  function promoteRealtor() {
    const realtor = findRealtorSection();
    const hero = findHeroSection();
    if (!realtor || !hero || realtor === hero || realtor.contains(hero)) return false;
    const heroSection = hero.closest('section') || hero;
    heroSection.insertAdjacentElement('afterend', realtor);
    realtor.classList.add('dt-realtor-promoted');
    fixRealtorPortrait(realtor);
    return true;
  }

  function promoteCollections() {
    const cards = candidateCategoryCards();
    if (cards.length < 2) return false;
    const block = cards[0].parentElement;
    if (!block) return false;
    const realtor = findRealtorSection();
    const hero = findHeroSection();
    const anchor = realtor && realtor.classList.contains('dt-realtor-promoted') ? realtor : hero;
    if (!anchor || block === anchor || block.contains(anchor) || anchor.contains(block)) return false;
    anchor.insertAdjacentElement('afterend', block);
    return true;
  }

  function runEnhancements() {
    addStyles();
    restoreHeroClarity();
    promoteRealtor();
    fixRealtorPortrait(findRealtorSection());
    enhanceCategories();
    promoteCollections();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runEnhancements, { once: true });
  } else {
    runEnhancements();
  }
  [250, 750, 1500, 3000].forEach((delay) => setTimeout(runEnhancements, delay));
})();
