(() => {
  const photos = [127, 126, 137, 139, 140, 135, 143, 136, 138, 131, 129, 132, 142]
    .map(number => '/assets/listings/alc-1/' + number + '.webp');
  const listing = {
    code: 'ALC-1',
    category: L('Condos', 'Condominios'),
    area: 'Punta Majahua',
    title: L('Oceanfront Condo with Plunge Pool', 'Condominio frente al mar con alberca'),
    price: L('Price upon request', 'Precio a consultar'),
    image: photos[0],
    gallery: photos,
    description: L(
      'A ground-floor condo in Punta Majahua, Guerrero. Folding glass doors connect the living area and kitchen to a shaded terrace with a plunge pool and built-in grill. From the terrace, look across the garden to the Pacific.',
      'Condominio en planta baja en Punta Majahua, Guerrero. Las puertas plegables de vidrio conectan la sala y la cocina con una terraza techada con alberca y asador integrado. Desde la terraza se aprecia el Pacífico más allá del jardín.'
    ),
    highlights: [
      L('Ground floor', 'Planta baja'),
      L('Ocean views', 'Vista al mar'),
      L('Plunge pool', 'Alberca'),
      L('Terrace with built-in grill', 'Terraza con asador integrado')
    ],
    status: L('For Sale', 'En venta')
  };
  if (listings.some(property => property.code === listing.code)) return;
  const index = listings.findIndex(property => property.category === listing.category);
  listings.splice(index === -1 ? listings.length : index, 0, listing);
  render();
  document.getElementById('totalstat').textContent = listings.length + '+';
  const tile = Array.from(document.querySelectorAll('#areaGrid .area'))
    .find(area => area.querySelector('b')?.textContent.trim() === listing.category);
  const countLabel = tile?.querySelector('span');
  if (countLabel) {
    const total = listings.filter(property => listingInCategory(property, listing.category)).length;
    countLabel.textContent = total + L(' properties', ' propiedades');
  }
  if (location.hash === '#listing=' + listing.code) openDetail(listing.code, false);
})();
