(function () {
  'use strict';
  const PTB1='https://www.tronconesbeachproperty.com/assets/images/ptb11-1256x837.jpg';
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
  }
  document.addEventListener('click',function(event){
    const card=event.target.closest&&event.target.closest('.card');
    if(!card||typeof window.openDetail!=='function')return;
    const match=(card.querySelector('.sub')?.textContent||'').match(/([A-Z]{3}-[^ ·]+)/);
    if(!match)return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.openDetail(match[1]);
  },true);
  document.addEventListener('keydown',function(event){
    if(event.key!=='Enter')return;
    const card=event.target.closest&&event.target.closest('.card');
    if(card)card.click();
  },true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',protectHomepage,{once:true});else protectHomepage();
  window.addEventListener('load',protectHomepage,{once:true});
  setTimeout(protectHomepage,300);
})();