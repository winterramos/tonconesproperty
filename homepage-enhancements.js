(function () {
  'use strict';

  // Discover Troncones homepage enhancements: realtor placement + photo category cards.
  const CATEGORY_NAMES = [
    'Homes',
    'Condos',
    'Lots',
    'Beachfront Lots',
    'Beach Lots',
    'Beachfront',
    'All Properties'
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
      .dt-category-photo-card, .dt-category-photo-card * {
        color: #fff !important;
      }
      .dt-category-photo-card h2,
      .dt-category-photo-card h3,
      .dt-category-photo-card h4,
      .dt-category-photo-card strong,
      .dt-category-photo-card b {
        font-size: clamp(1.2rem, 2.1vw, 1.75rem) !important;
        line-height: 1.08 !important;
      }
      .dt-realtor-promoted {
        scroll-margin-top: 90px;
      }
      @media (max-width: 720px) {
        .dt-category-photo-card {
          min-height: 150px !important;
          border-radius: 14px !important;
          padding: 16px !important;
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
      '#areaGrid > *',
      '.areas > *',
      '.area-grid > *',
      '[class*="collection"] > *',
      '[class*="categor"] > *'
    ];
    const found = [];
    const seen = new Set();
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (seen.has(el)) return;
        const text = normalize(el.textContent);
        const matches = CATEGORY_NAMES.some((name) => text === normalize(name) || text.startsWith(normalize(name) + ' ') || text.includes(normalize(name)));
        if (matches && el.getBoundingClientRect().width > 80) {
          seen.add(el);
          found.push(el);
        }
      });
    });

    if (found.length < 3) {
      document.querySelectorAll('a,button,article,div').forEach((el) => {
        if (seen.has(el) || el.children.length > 8) return;
        const text = normalize(el.textContent);
        const matches = CATEGORY_NAMES.some((name) => text === normalize(name) || text.startsWith(normalize(name) + ' '));
        if (matches && el.getBoundingClientRect().width > 120 && el.getBoundingClientRect().height > 45) {
          seen.add(el);
          found.push(el);
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
      if (card.classList.contains('dt-category-photo-card')) return;
      const image = images[(index + 2) % images.length];
      card.classList.add('dt-category-photo-card');
      card.style.backgroundImage = `url("${image.replace(/"/g, '%22')}")`;
    });
    return true;
  }

  function findRealtorSection() {
    const textNodes = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,p,strong,div,span'));
    const heading = textNodes.find((el) => {
      const t = normalize(el.textContent);
      return t === 'know your realtor' || t.includes('know your realtor') || t === 'meet your realtor';
    });
    if (!heading) return null;

    return heading.closest('section') ||
      heading.closest('[class*="realtor"]') ||
      heading.closest('[class*="agent"]') ||
      heading.closest('article') ||
      heading.parentElement;
  }

  function findStatsAnchor() {
    const direct = document.querySelector('#totalstat, #totalStat, [id*="totalstat" i]');
    if (direct) {
      return direct.closest('.stats, .stat-row, [class*="stats"], section') || direct.parentElement || direct;
    }

    const candidates = Array.from(document.querySelectorAll('.stats, [class*="stats"], [class*="stat"]'));
    const likely = candidates.find((el) => /propert|listing|available|for sale/i.test(el.textContent || ''));
    if (likely) return likely;

    const textCandidates = Array.from(document.querySelectorAll('div,p,span,strong'));
    const propertyCount = textCandidates.find((el) => /\b\d+\s+(properties|listings)\b/i.test((el.textContent || '').trim()));
    return propertyCount ? (propertyCount.closest('section') || propertyCount.parentElement) : null;
  }

  function promoteRealtor() {
    const realtor = findRealtorSection();
    const anchor = findStatsAnchor();
    if (!realtor || !anchor || realtor === anchor || realtor.contains(anchor)) return false;
    if (realtor.classList.contains('dt-realtor-promoted')) return true;

    anchor.insertAdjacentElement('afterend', realtor);
    realtor.classList.add('dt-realtor-promoted');
    return true;
  }

  function runEnhancements() {
    addStyles();
    promoteRealtor();
    enhanceCategories();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runEnhancements, { once: true });
  } else {
    runEnhancements();
  }

  [250, 750, 1500, 3000].forEach((delay) => setTimeout(runEnhancements, delay));
})();
