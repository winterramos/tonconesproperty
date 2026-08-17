(function () {
  'use strict';
  const PTB1='https://www.tronconesbeachproperty.com/assets/images/ptb11-1256x837.jpg';
  const HAMMOCK_PROFILE='https://cdn.prod.website-files.com/68bdfb8e9ed721a61c9acc19/6928983cc927661131b58431_IMG_4697.avif';
  const COLLECTION_IMAGES={
    'Homes':PTB1,
    'Condos':'https://www.tronconesbeachproperty.com/assets/images/1mainphoto-1-1696x1131.jpg',
    'Lots & Land':'https://www.tronconesbeachproperty.com/assets/images/1main.jpg-1256x888.jpg',
    'Beachfront Lots':'https://www.tronconesbeachproperty.com/assets/images/1mainphotokbf-2-1696x1199.jpg',
    'Ranch / Palo Alto':'https://www.tronconesbeachproperty.com/assets/images/1mainphoto-32-1696x1199.jpg',
    'Playa Saladita':'https://www.tronconesbeachproperty.com/assets/images/1mainphoto20vms-4-1696x1199.jpg',
    'Commercial':'https://www.tronconesbeachproperty.com/assets/images/plh11-1359x754.jpg'
  };
  Object.assign(COLLECTION_IMAGES,{
    'Casas':COLLECTION_IMAGES['Homes'],
    'Condominios':COLLECTION_IMAGES['Condos'],
    'Terrenos frente al mar':COLLECTION_IMAGES['Beachfront Lots'],
    'Lotes y terrenos':COLLECTION_IMAGES['Lots & Land'],
    'El Rancho / Palo Alto':COLLECTION_IMAGES['Ranch / Palo Alto'],
    'Comercial':COLLECTION_IMAGES['Commercial']
  });
  function showMobileTopTiles(){
    if(document.getElementById('dt-mobile-top-tiles'))return;
    const style=document.createElement('style');
    style.id='dt-mobile-top-tiles';
    style.textContent='@media(max-width:900px){header nav{flex-wrap:wrap!important}.mobileMenu{display:none!important}.langChoices{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;order:3;flex:0 0 100%;gap:5px!important}.langChoice{display:flex!important;align-items:center;justify-content:center;text-align:center;white-space:nowrap;padding:8px 4px!important;font-size:9px!important;letter-spacing:.02em!important}}';
    document.head.appendChild(style);
  }
  function styleCollections(){
    if(!document.getElementById('dt-collection-photo-style')){
      const style=document.createElement('style');
      style.id='dt-collection-photo-style';
      style.textContent='.areas{display:grid!important;grid-template-columns:repeat(12,minmax(0,1fr))!important;gap:12px!important;background:transparent!important;border:0!important;max-width:1040px;margin-left:auto!important;margin-right:auto!important}.area{position:relative!important;overflow:hidden!important;grid-column:span 3;min-height:170px!important;padding:22px 18px!important;background-size:cover!important;background-position:center!important;color:#fff!important;text-shadow:0 2px 14px rgba(0,0,0,.8)!important;border:0!important}.area:nth-child(-n+3){grid-column:span 4}.area:nth-child(n+4){grid-column:span 3}.area:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,18,15,.08),rgba(8,18,15,.72));z-index:0}.area>*{position:relative;z-index:1}.area b{font-size:clamp(20px,2.2vw,30px)!important}.filters{display:none!important}#grid{scroll-margin-top:155px}@media(max-width:760px){.areas{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}.area,.area:nth-child(n){grid-column:span 1!important;min-height:150px!important}.area:last-child{grid-column:1/-1!important;max-width:calc(50% - 5px);width:100%;justify-self:center}}';
      document.head.appendChild(style);
    }
    document.querySelectorAll('.area').forEach(area=>{
      const label=area.querySelector('b')?.textContent.trim();
      if(COLLECTION_IMAGES[label])area.style.backgroundImage=`url("${COLLECTION_IMAGES[label]}")`;
    });
  }
  function showFullGallery(code){
    const images=window.DT_GALLERIES&&window.DT_GALLERIES[code.toLowerCase()];
    if(!images||!images.length)return;
    const gallery=document.querySelector('#detailContent .gallery');
    if(!gallery)return;
    const detailHero=document.querySelector('#detailContent .detailhero img');
    if(detailHero)detailHero.src=images[0];
    gallery.classList.toggle('onephoto',images.length===1);
    gallery.innerHTML=images.map((src,index)=>`<img loading="${index?'lazy':'eager'}" src="${src}" alt="${code} property photo ${index+1}">`).join('');
    const note=document.querySelector('#detailContent .gallery-note');
    if(note)note.remove();
  }
  function syncListingThumbnails(){
    if(!window.DT_GALLERIES)return;
    document.querySelectorAll('.card').forEach(card=>{
      const code=(card.querySelector('.sub')?.textContent||'').match(/([A-Z]{3}-[^ ·]+)/)?.[1];
      const image=code&&window.DT_GALLERIES[code.toLowerCase()]?.[0];
      const target=card.querySelector('.pic img');
      if(image&&target)target.src=image;
    });
  }
  function loadGalleryData(){
    if(window.DT_GALLERIES)return;
    fetch('https://raw.githubusercontent.com/winterramos/tonconesproperty/main/listing-galleries.js?v=stt1-mountain-coast-coj1-20260811',{cache:'no-store'})
      .then(response=>{if(!response.ok)throw new Error('Gallery data unavailable');return response.text();})
      .then(source=>{
        const script=document.createElement('script');
        const blob=URL.createObjectURL(new Blob([source],{type:'text/javascript'}));
        script.src=blob;
        script.onload=()=>{
          URL.revokeObjectURL(blob);
          const code=location.hash.match(/listing=([^&]+)/)?.[1];
          if(code)showFullGallery(decodeURIComponent(code));
          syncListingThumbnails();
          setTimeout(syncListingThumbnails,300);
        };
        document.head.appendChild(script);
      });
  }
  function protectHomepage(){
    showMobileTopTiles();
    const hero=document.querySelector('main section.hero,main .hero');
    if(hero){
      hero.style.setProperty('background-image',`linear-gradient(180deg,rgba(9,17,15,.12),rgba(9,17,15,.64)),url("${PTB1}")`,'important');
      hero.style.setProperty('filter','none','important');
      hero.style.setProperty('-webkit-filter','none','important');
      hero.style.setProperty('background-position','center center','important');
      hero.style.setProperty('background-size','cover','important');
    }
    const about=document.getElementById('about');
    if(hero&&about&&hero.nextElementSibling!==about)hero.insertAdjacentElement('afterend',about);
    const agent=about&&about.querySelector('.agent');
    if(agent){
      agent.style.setProperty('background-image',`url("${HAMMOCK_PROFILE}")`,'important');
      agent.style.setProperty('background-size','contain','important');
      agent.style.setProperty('background-position','center top','important');
      agent.style.setProperty('background-repeat','no-repeat','important');
      agent.style.setProperty('min-height',innerWidth<621?'380px':'460px','important');
    }
    styleCollections();
  }
  document.addEventListener('click',function(event){
    const tile=event.target.closest&&event.target.closest('.area');
    if(!tile)return;
    setTimeout(()=>document.querySelector('#grid')?.scrollIntoView({behavior:'smooth',block:'start'}),120);
  },true);
  document.addEventListener('click',function(event){
    const card=event.target.closest&&event.target.closest('.card');
    if(!card||typeof window.openDetail!=='function')return;
    const match=(card.querySelector('.sub')?.textContent||'').match(/([A-Z]{3}-[^ ·]+)/);
    if(!match)return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.openDetail(match[1]);
    showFullGallery(match[1]);
    setTimeout(()=>showFullGallery(match[1]),100);
  },true);
  document.addEventListener('keydown',function(event){
    if(event.key!=='Enter')return;
    const card=event.target.closest&&event.target.closest('.card');
    if(card)card.click();
  },true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',protectHomepage,{once:true});else protectHomepage();
  loadGalleryData();
  window.addEventListener('load',protectHomepage,{once:true});
  setTimeout(protectHomepage,300);
})();
