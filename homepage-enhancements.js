(function () {
  'use strict';
  const STYLE_ID='dt-hero-brightness-adjustment';
  function brightenHero(){
    const hero=document.querySelector('section.hero,.hero');
    if(!hero)return;
    hero.style.setProperty('filter','brightness(1.09)','important');
    hero.style.setProperty('-webkit-filter','brightness(1.09)','important');
    hero.style.setProperty('background-position','center center','important');
    hero.style.setProperty('background-size','cover','important');
  }
  function run(){brightenHero()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  window.addEventListener('load',run,{once:true});
  setTimeout(run,300);
  setTimeout(run,1000);
})();