window.addEventListener('DOMContentLoaded', () => {
  const rpaCategory = ES_MODE ? 'El Rancho / Palo Alto' : 'Ranch / Palo Alto';
  const rpaListing = {
    code: 'RPA-1',
    category: rpaCategory,
    area: L('Rancho Palo Alto', 'Rancho Palo Alto'),
    title: L('Brand-New Independent Two-Level Home', 'Casa nueva de dos niveles independientes'),
    price: '$650,000 USD',
    image: 'assets/listings/rpa-1/04-house-and-pool.webp',
    description: L('A brand-new 2,200-square-foot home near a world-class wave, designed with fully independent upstairs and downstairs living areas.', 'Casa nueva de 2,200 pies cuadrados cerca de una ola de clase mundial, diseñada con áreas independientes en la planta alta y la planta baja.'),
    highlights: ES_MODE ? ['2,200 pies²', '3 recámaras / 2 baños', '2 cocinas', 'Niveles superior e inferior independientes', 'Alberca privada'] : ['2,200 ft²', '3 bedrooms / 2 bathrooms', '2 kitchens', 'Independent upper + lower levels', 'Private pool'],
    status: L('For Sale', 'En venta'),
    source: 'listings/rpa-1.html',
    gallery: [
      'assets/listings/rpa-1/04-house-and-pool.webp',
      'assets/listings/rpa-1/01-aerial-property-outline.webp',
      'assets/listings/rpa-1/02-aerial-coast-outline.webp',
      'assets/listings/rpa-1/03-front-exterior.webp',
      'assets/listings/rpa-1/05-pool.webp',
      'assets/listings/rpa-1/06-downstairs-living-kitchen.webp',
      'assets/listings/rpa-1/07-downstairs-bedroom.webp',
      'assets/listings/rpa-1/08-downstairs-kitchen.webp',
      'assets/listings/rpa-1/09-downstairs-bathroom.webp',
      'assets/listings/rpa-1/10-upstairs-kitchen-living.webp',
      'assets/listings/rpa-1/11-upstairs-living.webp',
      'assets/listings/rpa-1/12-upstairs-bedroom.webp',
      'assets/listings/rpa-1/13-upstairs-bathroom.webp',
      'assets/listings/rpa-1/14-second-bathroom.webp',
      'assets/listings/rpa-1/15-covered-terrace.webp',
      'assets/listings/rpa-1/16-hammock-terrace.webp'
    ]
  };
  const rpaIndex = listings.findIndex(p => p.category === rpaCategory);
  listings.splice(rpaIndex < 0 ? listings.length : rpaIndex, 0, rpaListing);
  document.getElementById('totalstat').textContent = listings.length + '+';
  renderFilters();
  render();
  areaGrid.innerHTML = cats.slice(1).map(c => `<div class="area" onclick="setCat('${c}')"><span>${listings.filter(p => p.category === c).length} properties</span><b>${c}</b><span>Explore →</span></div>`).join('');
});
