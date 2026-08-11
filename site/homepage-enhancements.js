(function () {
  'use strict';

  const STYLE_ID = 'discover-troncones-homepage-fixes';
  const BIO = `I was born and raised in Zihuatanejo and moved to Santa Cruz, California, at age 14, where I finished high school and graduated from the University of Santa Cruz. After 20 years of going back and forth between California and Mexico, I have finally come home.\n\nI am a family man, restaurateur, and in the hotel business. I use my professional skills to help people achieve their dream of finding a primary or secondary residence on the Mexican coastline. I am a local and well known in the community. I am honest, I enjoy working with people, and I get things done in a professional manner.`;
  const RAW_BASE = 'https://raw.githubusercontent.com/winterramos/tonconesproperty/main/site/';

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .hero{filter:saturate(1.04) contrast(1.16) brightness(1.05)!important;-webkit-filter:saturate(1.04) contrast(1.16) brightness(1.05)!important;image-rendering:auto!important;background-position:center center!important;background-size:cover!important}
      .hero::before,.hero::after{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
      #about.agent-section{position:relative!important;z-index:2!important}
      #about .agent,.agent-section .agent{background-position:center top!important;background-repeat:no-repeat!important;background-size:contain!important;background-color:#e9e3d8!important}
      .dt-realtor-layout{display:grid!important;grid-template-columns:minmax(280px,.85fr) minmax(320px,1.15fr)!important;gap:clamp(28px,5vw,70px)!important;align-items:center!important}
      .dt-realtor-bio{max-width:620px}.dt-realtor-bio .eyebrow{font-size:11px;letter-spacing:.18em;text-transform:uppercase;opacity:.62;margin:0 0 10px}.dt-realtor-bio h2{font-family:Georgia,'Times New Roman',serif;font-size:clamp(30px,4vw,48px);font-weight:400;line-height:1.05;margin:0 0 22px}.dt-realtor-bio p{font-size:16px;line-height:1.75;margin:0 0 16px;color:#46524d}
      .dt-feature-strip{background:#f7f4ed;border-top:1px solid rgba(18,43,48,.09);border-bottom:1px solid rgba(18,43,48,.09);padding:22px 20px}.dt-feature-inner{max-width:1220px;margin:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:0}.dt-feature{display:flex;align-items:center;justify-content:center;gap:14px;padding:0 24px;min-height:58px;border-right:1px solid rgba(18,43,48,.12)}.dt-feature:last-child{border-right:0}.dt-feature-icon{font-size:30px;line-height:1;color:#143641;width:38px;text-align:center}.dt-feature strong{display:block;font-size:13px;letter-spacing:.045em;color:#142b32;margin-bottom:4px}.dt-feature span{display:block;font-size:13px;color:#536066}
      .dt-collections{background:#fbfaf6;padding:34px 22px 56px}.dt-collections-inner{max-width:1480px;margin:auto}.dt-collections h2{text-align:center;font-family:Georgia,'Times New Roman',serif;font-size:clamp(29px,3.3vw,42px);font-weight:400;letter-spacing:.015em;color:#16343d;margin:0 0 26px}.dt-collections h2:after{content:'';display:block;width:46px;height:2px;background:#c79a43;margin:10px auto 0}.dt-collection-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}.dt-collection-card{position:relative;min-height:270px;border-radius:3px;overflow:hidden;background:#18343a;cursor:pointer;box-shadow:0 9px 25px rgba(8,30,35,.09);isolation:isolate}.dt-collection-card:before{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(3,20,26,.82) 0%,rgba(3,20,26,.18) 62%,rgba(3,20,26,.04) 100%);z-index:1}.dt-collection-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .45s ease}.dt-collection-card:hover img{transform:scale(1.04)}.dt-collection-copy{position:absolute;z-index:2;left:18px;right:18px;bottom:17px;color:white;text-align:center}.dt-collection-copy strong{display:block;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:400;letter-spacing:.02em;text-transform:uppercase;margin-bottom:5px;text-shadow:0 1px 3px rgba(0,0,0,.35)}.dt-collection-copy span{display:block;font-size:12px;line-height:1.25;margin-bottom:14px;opacity:.94}.dt-collection-link{font-size:10px;letter-spacing:.08em;text-transform:uppercase;border-top:1px solid rgba(255,255,255,.55);padding-top:10px;display:inline-block}
      .dt-old-collections-hidden{display:none!important}
      @media(max-width:1100px){.dt-collection-grid{grid-template-columns:repeat(3,1fr)}.dt-feature-inner{grid-template-columns:repeat(2,1fr)}.dt-feature:nth-child(2){border-right:0}.dt-feature:nth-child(-n+2){margin-bottom:18px}}
      @media(max-width:760px){.hero{filter:saturate(1.03) contrast(1.13) brightness(1.05)!important;-webkit-filter:saturate(1.03) contrast(1.13) brightness(1.05)!important}.dt-realtor-layout{grid-template-columns:1fr!important;gap:24px!important}.dt-realtor-bio{max-width:none}.dt-realtor-bio h2{font-size:34px}.dt-feature-inner{grid-template-columns:1fr}.dt-feature{justify-content:flex-start;border-right:0;border-bottom:1px solid rgba(18,43,48,.10);padding:12px 8px;margin:0!important}.dt-feature:last-child{border-bottom:0}.dt-collections{padding:30px 14px 42px}.dt-collection-grid{grid-template-columns:repeat(2,1fr);gap:10px}.dt-collection-card{min-height:225px}.dt-collection-copy{left:10px;right:10px;bottom:13px}.dt-collection-copy strong{font-size:15px}.dt-collection-copy span{font-size:11px}}
      @media(max-width:430px){.dt-collection-grid{grid-template-columns:1fr}.dt-collection-card{min-height:245px}}
    `;
    document.head.appendChild(style);
  }

  function realtorSection(){return document.querySelector('#about.agent-section,section.agent-section,#about')}
  function moveRealtorDirectlyBelowHero(){const hero=document.querySelector('section.hero,.hero');const realtor=realtorSection();if(!hero||!realtor||hero===realtor)return;if(hero.nextElementSibling!==realtor)hero.insertAdjacentElement('afterend',realtor)}
  function fixPortraitCrop(){const portrait=document.querySelector('#about .agent,.agent-section .agent,.agent');if(!portrait)return;portrait.style.setProperty('background-position','center top','important');portrait.style.setProperty('background-repeat','no-repeat','important');portrait.style.setProperty('background-size','contain','important');portrait.style.setProperty('background-color','#e9e3d8','important')}
  function addBioBesidePortrait(){const section=realtorSection();const portrait=document.querySelector('#about .agent,.agent-section .agent,.agent');if(!section||!portrait||section.querySelector('.dt-realtor-bio'))return;const layout=portrait.parentElement;if(!layout)return;layout.classList.add('dt-realtor-layout');const bio=document.createElement('div');bio.className='dt-realtor-bio';const paragraphs=BIO.split('\n\n').map(p=>`<p>${p}</p>`).join('');bio.innerHTML=`<div class="eyebrow">Your Realtor</div><h2>Winter Ramos</h2>${paragraphs}`;portrait.insertAdjacentElement('afterend',bio)}

  function collectPropertyImages(){const urls=[];const seen=new Set();const push=url=>{if(!url||seen.has(url)||url.startsWith('data:image/svg'))return;seen.add(url);urls.push(url)};document.querySelectorAll('.listing img,.card img,[class*="listing"] img,[class*="property"] img,main img').forEach(img=>push(img.currentSrc||img.src));document.querySelectorAll('.listing,.card,[class*="listing"],[class*="property"]').forEach(el=>{const bg=getComputedStyle(el).backgroundImage||'';const m=bg.match(/url\(["']?(.*?)["']?\)/);if(m)push(m[1])});const hero=document.querySelector('section.hero,.hero');if(hero){const bg=getComputedStyle(hero).backgroundImage||'';const matches=[...bg.matchAll(/url\(["']?(.*?)["']?\)/g)];matches.forEach(m=>push(m[1]))}return urls}

  function hideOldCollectionSection(){
    [...document.querySelectorAll('h1,h2,h3')].forEach(h=>{
      const t=(h.textContent||'').trim().toLowerCase();
      if((t.includes('explore the collections')||t.includes('explore collections'))&&!h.closest('.dt-collections')){
        const section=h.closest('section')||h.parentElement;
        if(section)section.classList.add('dt-old-collections-hidden');
      }
    });
  }

  function triggerExistingFilter(label){const candidates=[...document.querySelectorAll('button,a,[role="button"],option')];const normalized=label.toLowerCase();const aliases={'all properties':['all properties','all listings','all'],'homes':['homes','houses','home'],'condos':['condos','condominiums','condo'],'lots':['lots','lot'],'beachfront lots':['beachfront lots','beach lots','beachfront land'],'land':['land','lots']}[normalized]||[normalized];const hit=candidates.find(el=>aliases.some(a=>(el.textContent||'').trim().toLowerCase()===a));if(hit&&hit.tagName!=='OPTION'){hit.click();return true}const listings=document.querySelector('#listings,.listings,[data-section="listings"]');if(listings){listings.scrollIntoView({behavior:'smooth',block:'start'});return true}return false}

  function buildFeatureStrip(){if(document.querySelector('.dt-feature-strip'))return;const hero=document.querySelector('section.hero,.hero');if(!hero)return;const realtor=realtorSection();const anchor=realtor&&hero.nextElementSibling===realtor?realtor:hero;const strip=document.createElement('section');strip.className='dt-feature-strip';strip.innerHTML=`<div class="dt-feature-inner"><div class="dt-feature"><div class="dt-feature-icon">◉</div><div><strong>BEACHFRONT LIVING</strong><span>Stunning ocean views</span></div></div><div class="dt-feature"><div class="dt-feature-icon">♧</div><div><strong>NATURAL BEAUTY</strong><span>Surf, sun & serenity</span></div></div><div class="dt-feature"><div class="dt-feature-icon">⌁</div><div><strong>SUSTAINABLE LUXURY</strong><span>Thoughtful & timeless</span></div></div><div class="dt-feature"><div class="dt-feature-icon">◇</div><div><strong>LOCAL EXPERTISE</strong><span>We know Troncones</span></div></div></div>`;anchor.insertAdjacentElement('afterend',strip)}

  function buildCollections(){if(document.querySelector('.dt-collections'))return;const strip=document.querySelector('.dt-feature-strip');if(!strip)return;const images=collectPropertyImages();const fallback=images[0]||'';const cards=[['All Properties','View all listings',images[0]||fallback],['Homes','Luxury residences',images[1]||fallback],['Condos','Turnkey & stylish',images[2]||fallback],['Lots','Build your dream',images[3]||fallback],['Beachfront Lots','Absolute oceanfront',images[4]||fallback],['Land','Investment opportunity',images[5]||fallback]];const section=document.createElement('section');section.className='dt-collections';section.innerHTML=`<div class="dt-collections-inner"><h2>EXPLORE THE COLLECTIONS</h2><div class="dt-collection-grid">${cards.map(([title,sub,img])=>`<article class="dt-collection-card" tabindex="0" role="button" data-dt-filter="${title}">${img?`<img src="${img}" alt="${title}" loading="lazy">`:''}<div class="dt-collection-copy"><strong>${title}</strong><span>${sub}</span><div class="dt-collection-link">View Listings &nbsp;→</div></div></article>`).join('')}</div></div>`;strip.insertAdjacentElement('afterend',section);section.querySelectorAll('.dt-collection-card').forEach(card=>{const go=()=>triggerExistingFilter(card.dataset.dtFilter);card.addEventListener('click',go);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})})}

  function sharpenHero(){const hero=document.querySelector('section.hero,.hero');if(!hero)return;hero.style.setProperty('filter','saturate(1.04) contrast(1.16) brightness(1.05)','important');hero.style.setProperty('-webkit-filter','saturate(1.04) contrast(1.16) brightness(1.05)','important');hero.style.setProperty('background-size','cover','important');hero.style.setProperty('background-position','center center','important')}

  async function openListing(path){
    try{
      const clean=path.replace(/^\/+/, '').replace(/^site\//,'');
      if(!/^listings\/[A-Za-z0-9._-]+\.html$/.test(clean))return false;
      const [pageResp,cssResp]=await Promise.all([
        fetch(RAW_BASE+clean+'?v='+Date.now(),{cache:'no-store'}),
        fetch(RAW_BASE+'assets/listing.css?v='+Date.now(),{cache:'no-store'})
      ]);
      if(!pageResp.ok)throw new Error('Listing page unavailable');
      let html=await pageResp.text();
      const css=cssResp.ok?await cssResp.text():'';
      html=html.replace(/<link[^>]+href=["']\.\.\/assets\/listing\.css["'][^>]*>/i,css?`<style>${css}</style>`:'');
      html=html.replace(/href=["']\.\.\/index\.html(?:#listings)?["']/gi,'href="/"');
      history.pushState({listing:clean},'', '/?listing='+encodeURIComponent(clean.split('/').pop().replace(/\.html$/,'')));
      document.open();document.write(html);document.close();
      return true;
    }catch(err){console.error(err);alert('This listing could not be opened. Please try again.');return false}
  }

  function installListingRouter(){
    document.addEventListener('click',e=>{
      const a=e.target.closest('a[href]');if(!a)return;
      let href=a.getAttribute('href')||'';
      if(!href.includes('listings/'))return;
      let path='';
      try{path=new URL(href,location.href).pathname.replace(/^\//,'')}catch(_){path=href.replace(/^\.\.\//,'').replace(/^\.\//,'').replace(/^\//,'')}
      if(!path.startsWith('listings/')){const i=path.indexOf('listings/');if(i>=0)path=path.slice(i)}
      if(/^listings\/[A-Za-z0-9._-]+\.html$/.test(path)){e.preventDefault();openListing(path)}
    },true);
  }

  function openListingFromQuery(){
    const q=new URLSearchParams(location.search).get('listing');
    if(q&&/^[A-Za-z0-9._-]+$/.test(q))openListing('listings/'+q.replace(/\.html$/,'')+'.html');
  }

  function runFixes(){addStyles();moveRealtorDirectlyBelowHero();fixPortraitCrop();addBioBesidePortrait();sharpenHero();hideOldCollectionSection();buildFeatureStrip();buildCollections();installListingRouter()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{runFixes();openListingFromQuery()},{once:true});else{runFixes();openListingFromQuery()}
  window.addEventListener('load',runFixes,{once:true});setTimeout(runFixes,300);setTimeout(runFixes,1000);
})();
