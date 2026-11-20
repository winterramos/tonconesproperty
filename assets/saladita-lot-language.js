// Keep standalone Saladita lot pages in the language selected on the homepage.
if (new URLSearchParams(location.search).get('lang') === 'es') {
  document.documentElement.lang = 'es';
  document.querySelectorAll('[data-es]').forEach(element => {
    element.textContent = element.dataset.es;
  });
  document.querySelectorAll('[data-es-alt]').forEach(image => {
    image.alt = image.dataset.esAlt;
  });
  document.querySelectorAll('[data-es-content]').forEach(meta => {
    meta.content = meta.dataset.esContent;
  });
  document.querySelectorAll('header a, .crumb a, a.src').forEach(link => {
    const target = new URL(link.href);
    if (target.origin === location.origin) {
      target.searchParams.set('lang', 'es');
      link.href = target.href;
    }
  });
}
