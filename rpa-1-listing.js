window.addEventListener('DOMContentLoaded', () => {
  const rpaCategory = ES_MODE ? 'El Rancho / Palo Alto' : 'Ranch / Palo Alto';
  const rpaListing = {
    code: 'RPA-1',
    category: rpaCategory,
    area: L('Rancho Palo Alto', 'Rancho Palo Alto'),
    title: L('Brand-New Independent Two-Level Home', 'Casa nueva de dos niveles independientes'),
    price: '$650,000 USD',
    image: 'assets/listings/rpa-1/04-house-and-pool.webp',
    description: L('A brand-new home near a world-class wave with 2,550 square feet of interior living space, plus a 760-square-foot rooftop pergola and a 360-square-foot garage.', 'Casa nueva cerca de una ola de clase mundial con 2,550 pies cuadrados de espacio interior, más una pérgola de 760 pies cuadrados en la azotea y un garaje de 360 pies cuadrados.'),
    highlights: ES_MODE ? ['2,550 pies² interiores', 'Pérgola de 760 pies²', 'Garaje de 360 pies²', '3,670 pies² cubiertos en total', '3 recámaras / 3 baños', '2 cocinas', 'Aire acondicionado en toda la casa', 'Niveles superior e inferior independientes', 'Alberca privada'] : ['2,550 ft² interior', '760 ft² rooftop pergola', '360 ft² garage', '3,670 ft² total covered space', '3 bedrooms / 3 bathrooms', '2 kitchens', 'Air conditioning throughout', 'Independent upper + lower levels', 'Private pool'],
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
      'assets/listings/rpa-1/18-downstairs-pool-view.webp',
      'assets/listings/rpa-1/19-laundry-room.webp',
      'assets/listings/rpa-1/10-upstairs-kitchen-living.webp',
      'assets/listings/rpa-1/17-full-kitchen.webp',
      'assets/listings/rpa-1/20-upstairs-ocean-view-living-kitchen.webp',
      'assets/listings/rpa-1/21-upstairs-kitchen-island.webp',
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
  areaGrid.innerHTML = cats.slice(1).map(c => {
    const huertas = c === 'Las Huertas · La Saladita';
    return `<div class="area${huertas ? ' dt-photo-tile' : ''}"${huertas ? ' style="background-image:url(\'/assets/las-huertas-instagram-aerial.jpeg\')"' : ''} onclick="openCollection('${c}')"><span>${listings.filter(p => p.category === c).length} ${L('properties', 'propiedades')}</span><b>${c}</b><span>${L('Explore →', 'Explorar →')}</span></div>`;
  }).join('');
});
