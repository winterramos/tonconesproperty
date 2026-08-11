(function () {
  'use strict';
  const PTB1='https://www.tronconesbeachproperty.com/assets/images/ptb11-1256x837.jpg';
  const COLLECTION_IMAGES={
    'Homes':PTB1,
    'Condos':'https://www.tronconesbeachproperty.com/assets/images/1mainphoto-1-1696x1131.jpg',
    'Lots & Land':'https://www.tronconesbeachproperty.com/assets/images/1main.jpg-1256x888.jpg',
    'Beachfront Lots':'https://www.tronconesbeachproperty.com/assets/images/1mainphotokbf-2-1696x1199.jpg',
    'Ranch / Palo Alto':'https://www.tronconesbeachproperty.com/assets/images/1mainphoto-32-1696x1199.jpg',
    'Playa Saladita':'https://www.tronconesbeachproperty.com/assets/images/1mainphoto20vms-4-1696x1199.jpg',
    'Commercial':'https://www.tronconesbeachproperty.com/assets/images/plh11-1359x754.jpg'
  };
  function styleCollections(){
    if(!document.getElementById('dt-collection-photo-style')){
      const style=document.createElement('style');
      style.id='dt-collection-photo-style';
      style.textContent='.area{position:relative!important;overflow:hidden!important;min-height:230px!important;background-size:cover!important;background-position:center!important;color:#fff!important;text-shadow:0 2px 14px rgba(0,0,0,.8)!important;border:0!important}.area:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,18,15,.08),rgba(8,18,15,.72));z-index:0}.area>*{position:relative;z-index:1}.area b{font-size:clamp(24px,3vw,38px)!important}@media(max-width:620px){.areas{grid-template-columns:1fr 1fr!important}.area{min-height:180px!important}}';
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
    fetch('https://raw.githubusercontent.com/winterramos/tonconesproperty/main/listing-galleries.js?v=ccd5-main-20260811',{cache:'no-store'})
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
      agent.style.setProperty('background-size','contain','important');
      agent.style.setProperty('background-position','center top','important');
      agent.style.setProperty('background-repeat','no-repeat','important');
      agent.style.setProperty('min-height',innerWidth<621?'380px':'460px','important');
    }
    styleCollections();
  }
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
