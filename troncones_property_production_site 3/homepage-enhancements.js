(function () {
  'use strict';

  const STYLE_ID = 'discover-troncones-homepage-fixes';
  const BIO = `I was born and raised in Zihuatanejo and moved to Santa Cruz, California, at age 14, where I finished high school and graduated from the University of Santa Cruz. After 20 years of going back and forth between California and Mexico, I have finally come home.

I am a family man, restaurateur, and in the hotel business. I use my professional skills to help people achieve their dream of finding a primary or secondary residence on the Mexican coastline. I am a local and well known in the community. I am honest, I enjoy working with people, and I get things done in a professional manner.`;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .hero { filter:none!important; -webkit-filter:none!important; image-rendering:auto!important; background-position:center center!important; }
      .hero::before,.hero::after { backdrop-filter:none!important; -webkit-backdrop-filter:none!important; }
      #about.agent-section { position:relative!important; z-index:2!important; }
      #about .agent,.agent-section .agent { background-position:center top!important; background-repeat:no-repeat!important; background-size:contain!important; background-color:#e9e3d8!important; }
      .dt-realtor-layout { display:grid!important; grid-template-columns:minmax(280px,.85fr) minmax(320px,1.15fr)!important; gap:clamp(28px,5vw,70px)!important; align-items:center!important; }
      .dt-realtor-bio { max-width:620px; }
      .dt-realtor-bio .eyebrow { font-size:11px; letter-spacing:.18em; text-transform:uppercase; opacity:.62; margin:0 0 10px; }
      .dt-realtor-bio h2 { font-family:Georgia,'Times New Roman',serif; font-size:clamp(30px,4vw,48px); font-weight:400; line-height:1.05; margin:0 0 22px; }
      .dt-realtor-bio p { font-size:16px; line-height:1.75; margin:0 0 16px; color:#46524d; }
      @media(max-width:760px){ .dt-realtor-layout{grid-template-columns:1fr!important;gap:24px!important}.dt-realtor-bio{max-width:none}.dt-realtor-bio h2{font-size:34px} }
    `;
    document.head.appendChild(style);
  }

  function realtorSection() { return document.querySelector('#about.agent-section, section.agent-section, #about'); }

  function moveRealtorDirectlyBelowHero() {
    const hero=document.querySelector('section.hero,.hero'); const realtor=realtorSection();
    if(!hero||!realtor||hero===realtor)return;
    if(hero.nextElementSibling!==realtor)hero.insertAdjacentElement('afterend',realtor);
  }

  function fixPortraitCrop() {
    const portrait=document.querySelector('#about .agent,.agent-section .agent,.agent');
    if(!portrait)return;
    portrait.style.setProperty('background-position','center top','important');
    portrait.style.setProperty('background-repeat','no-repeat','important');
    portrait.style.setProperty('background-size','contain','important');
    portrait.style.setProperty('background-color','#e9e3d8','important');
  }

  function addBioBesidePortrait(){
    const section=realtorSection(); const portrait=document.querySelector('#about .agent,.agent-section .agent,.agent');
    if(!section||!portrait||section.querySelector('.dt-realtor-bio'))return;
    let layout=portrait.parentElement;
    if(!layout)return;
    layout.classList.add('dt-realtor-layout');
    const bio=document.createElement('div'); bio.className='dt-realtor-bio';
    const paragraphs=BIO.split('\n\n').map(p=>`<p>${p}</p>`).join('');
    bio.innerHTML=`<div class="eyebrow">Your Realtor</div><h2>Winter Ramos</h2>${paragraphs}`;
    portrait.insertAdjacentElement('afterend',bio);
  }

  function sharpenHero(){const hero=document.querySelector('section.hero,.hero');if(hero){hero.style.setProperty('filter','none','important');hero.style.setProperty('-webkit-filter','none','important');}}
  function runFixes(){addStyles();moveRealtorDirectlyBelowHero();fixPortraitCrop();addBioBesidePortrait();sharpenHero();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',runFixes,{once:true});else runFixes();
  window.addEventListener('load',runFixes,{once:true}); setTimeout(runFixes,300); setTimeout(runFixes,1000);
})();
