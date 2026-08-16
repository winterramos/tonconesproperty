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
  Object.assign(COLLECTION_IMAGES,{
    'Casas':COLLECTION_IMAGES['Homes'],
    'Condominios':COLLECTION_IMAGES['Condos'],
    'Terrenos frente al mar':COLLECTION_IMAGES['Beachfront Lots'],
    'Lotes y terrenos':COLLECTION_IMAGES['Lots & Land'],
    'El Rancho / Palo Alto':COLLECTION_IMAGES['Ranch / Palo Alto'],
    'Comercial':COLLECTION_IMAGES['Commercial']
  });
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
    if(!document.getElementById('dt-profile-tightening-style')){
      const style=document.createElement('style');
      style.id='dt-profile-tightening-style';
      style.textContent='#about{padding:58px 0!important}#about .wrap.contact{gap:44px!important;align-items:center!important}.stats{grid-template-columns:repeat(2,minmax(0,1fr))!important;max-width:760px;margin-left:auto!important;margin-right:auto!important}@media(max-width:620px){#about{padding:46px 0!important}#about .wrap.contact{gap:24px!important}.stats{grid-template-columns:repeat(2,minmax(0,1fr))!important}}';
      document.head.appendChild(style);
    }
    const agent=about&&about.querySelector('.agent');
    if(agent){
      agent.style.setProperty('background-image','url("https://cdn.jsdelivr.net/gh/winterramos/tonconesproperty@d9cd856e6368a623f24c70211bcfad50f1daf4ac/assets/winter-hammock-profile.jpg")','important');
      agent.style.setProperty('background-size','cover','important');
      agent.style.setProperty('background-position','center center','important');
      agent.style.setProperty('background-repeat','no-repeat','important');
      agent.style.setProperty('min-height',innerWidth<621?'330px':'400px','important');
      agent.setAttribute('role','img');
      agent.setAttribute('aria-label','Winter Ramos relaxing in a blue hammock in Troncones');
    }
    const stats=document.querySelector('.stats');
    if(stats&&stats.children.length>2)Array.from(stats.children).slice(2).forEach(stat=>stat.remove());
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
  function addHaciendaLaSaladita(){
    if(typeof listings==='undefined'||typeof cats==='undefined'||typeof render!=='function')return;
    const common={code:'HLS-1',category:'Hacienda La Saladita',area:'La Saladita',image:'https://cdn.prod.website-files.com/673cfab3a3e6e1b2ebb64693/673e7e933d76963944c15d0c_casa-mango-la-saladita-guerrero03.webp',source:'https://www.facebook.com/groups/407697642711557/posts/3588647711283185/',gallery:['https://cdn.prod.website-files.com/673cfab3a3e6e1b2ebb64693/673e7e933d76963944c15d0c_casa-mango-la-saladita-guerrero03.webp']};
    const property=ES_MODE?{...common,title:'Lotes residenciales Hacienda La Saladita',price:'Desde $1,560,000 MXN',description:'Lotes residenciales en Hacienda La Saladita, disponibles en distintas medidas cerca de la comunidad de surf y los servicios locales.',highlights:['Desde aprox. 520 m²','Opciones hasta 800 m²','Anunciados en $3,000 MXN/m²','Plano actualizado disponible'],status:'En venta'}:{...common,title:'Hacienda La Saladita Homesites',price:'From $1,560,000 MXN',description:'Residential homesites in Hacienda La Saladita, offered in a range of sizes near the surf community and local services.',highlights:['From approx. 520 m²','Options up to 800 m²','Advertised at $3,000 MXN/m²','Current lot map on request'],status:'For Sale'};
    if(!listings.some(item=>item.code===property.code))listings.push(property);
    const commercial=ES_MODE?'Comercial':'Commercial';
    if(!cats.includes(common.category))cats.splice(cats.indexOf(commercial),0,common.category);
    const collectionStat=document.querySelectorAll('.stats .stat b')[1];
    if(collectionStat)collectionStat.textContent='9';
    if(typeof renderFilters==='function')renderFilters();
    render();
    if(typeof areaGrid!=='undefined'&&areaGrid)areaGrid.innerHTML=cats.slice(1).map(category=>`<div class="area" onclick="setCat('${category}')"><span>${listings.filter(item=>item.category===category).length} ${L('properties','propiedades')}</span><b>${category}</b><span>${L('Explore →','Explorar →')}</span></div>`).join('');
  }
  addHaciendaLaSaladita();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',protectHomepage,{once:true});else protectHomepage();
  loadGalleryData();
  window.addEventListener('load',protectHomepage,{once:true});
  setTimeout(protectHomepage,300);
})();
