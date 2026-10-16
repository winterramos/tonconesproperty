// Casa del Sol only: listing data, placement and its red new-listing label.
(function () {
  const homeCategory = ES_MODE ? 'Casas' : 'Homes';
  const listing = {
  "code": "CDS-1",
  "category": "Homes",
  "area": "Troncones",
  "title": "Casa del Sol",
  "price": "$850,000 USD",
  "image": "/assets/listings/casa-del-sol/hero-1.webp",
  "description": "A three-year-old, three-bedroom home in a great location in beautiful Troncones, with amazing views and a stunning infinity pool. Set into the green hillside across the coastal road from the beach, Casa del Sol brings together contemporary design and relaxed coastal living. Open-plan living and dining spaces connect to a shaded terrace and infinity pool, creating an easy flow between indoors and outdoors. Warm wood finishes, expansive glass doors, a modern kitchen and tropical landscaping complete this inviting home, with three bedrooms and two and a half bathrooms.",
  "highlights": [
    "3 bedrooms",
    "2½ bathrooms",
    "Three-year-old home",
    "Amazing views",
    "Infinity pool",
    "Indoor–outdoor living",
    "Outdoor kitchen",
    "Tropical gardens"
  ],
  "status": "NEW LISTING",
  "source": "listings/cds-1.html",
  "gallery": [
    "/assets/listings/casa-del-sol/hero-1.webp",
    "/assets/listings/casa-del-sol/pool-1.webp",
    "/assets/listings/casa-del-sol/1st-floor-1.webp",
    "/assets/listings/casa-del-sol/living-dining.webp",
    "/assets/listings/casa-del-sol/dining-kitchen.webp",
    "/assets/listings/casa-del-sol/kitchen-1.webp",
    "/assets/listings/casa-del-sol/kitchen-2.webp",
    "/assets/listings/casa-del-sol/primary-2.webp",
    "/assets/listings/casa-del-sol/primary-3.webp",
    "/assets/listings/casa-del-sol/primary-1.webp",
    "/assets/listings/casa-del-sol/primary-bath.webp",
    "/assets/listings/casa-del-sol/guest-room.webp",
    "/assets/listings/casa-del-sol/guest-room-1.webp",
    "/assets/listings/casa-del-sol/guest-bath.webp",
    "/assets/listings/casa-del-sol/guest-bath-1.webp",
    "/assets/listings/casa-del-sol/kids-room.webp",
    "/assets/listings/casa-del-sol/powder-room.webp",
    "/assets/listings/casa-del-sol/pool-2.webp",
    "/assets/listings/casa-del-sol/pool-4.webp",
    "/assets/listings/casa-del-sol/pool-5.webp",
    "/assets/listings/casa-del-sol/pool-6.webp",
    "/assets/listings/casa-del-sol/1st-floor-2.webp",
    "/assets/listings/casa-del-sol/1st-floor-3.webp",
    "/assets/listings/casa-del-sol/outdoor-kitchen-1.webp",
    "/assets/listings/casa-del-sol/entry.webp",
    "/assets/listings/casa-del-sol/front-gate.webp",
    "/assets/listings/casa-del-sol/upstairs-foyer.webp",
    "/assets/listings/casa-del-sol/hero-2.webp",
    "/assets/listings/casa-del-sol/chicken-coop.webp",
    "/assets/listings/casa-del-sol/chickens.webp",
    "/assets/listings/casa-del-sol/aerial-approved-outline.webp",
    "/assets/listings/casa-del-sol/drone-0079-pin.webp",
    "/assets/listings/casa-del-sol/drone-0081-pin.webp",
    "/assets/listings/casa-del-sol/drone-0082-pin.webp",
    "/assets/listings/casa-del-sol/drone-0083-pin.webp"
  ]
};
  listing.category = homeCategory;
  if (ES_MODE) {
    listing.description = 'Casa de tres años de antigüedad con tres recámaras y dos baños y medio, en una excelente ubicación en el hermoso Troncones, con vistas increíbles y una espectacular alberca infinita. Ubicada en la ladera verde frente a la carretera costera, Casa del Sol combina diseño contemporáneo con un estilo de vida relajado junto al mar. Los espacios abiertos de sala y comedor se conectan con una terraza sombreada y la alberca. Acabados de madera, amplias puertas de cristal, cocina moderna y jardines tropicales completan esta acogedora casa.';
    listing.highlights = ['3 recámaras', '2½ baños', 'Casa de 3 años de antigüedad', 'Vistas increíbles', 'Alberca infinita', 'Espacios interiores y exteriores', 'Cocina exterior', 'Jardines tropicales'];
    listing.status = 'NUEVA PROPIEDAD';
  }
  if (!listings.some(p => p.code === listing.code)) {
    const homes = listings.map((p, i) => p.category === homeCategory ? i : -1).filter(i => i >= 0);
    listings.splice(homes[2] ?? ((homes.at(-1) ?? -1) + 1), 0, listing);
  }
  const style = document.createElement('style');
  style.textContent = '.card:has(img[src*="casa-del-sol/"]) .badge{color:#c73c35!important;background:#fff!important;font-size:12px!important;font-weight:600!important;letter-spacing:.08em!important}.cds-new-label{display:block;color:#c73c35;font:600 13px Arial,sans-serif;letter-spacing:.1em;margin:12px 0}';
  document.head.appendChild(style);
  const originalOpenDetail = window.openDetail;
  window.openDetail = function(code, push) {
    originalOpenDetail(code, push);
    if (code !== 'CDS-1') return;
    const heading = document.querySelector('#detailContent .detailheading');
    if (heading && !heading.querySelector('.cds-new-label')) {
      const label = document.createElement('span');
      label.className = 'cds-new-label';
      label.textContent = listing.status;
      heading.insertBefore(label, heading.querySelector('h2'));
    }
    const status = document.querySelector('#detailContent .sidecard .eyebrow');
    if (status) status.textContent = (ES_MODE ? 'En venta' : 'For Sale') + ' · CDS-1';
  };
  function refreshCasaListing() {
    render();
    const total = document.getElementById('totalstat');
    if (total) total.textContent = listings.length + '+';
    document.querySelectorAll('#areaGrid .area').forEach(tile => {
      if (tile.querySelector('b')?.textContent.trim() !== homeCategory) return;
      const count = tile.querySelector('span');
      if (count) count.textContent = listings.filter(p => listingInCategory(p, homeCategory)).length + (ES_MODE ? ' propiedades' : ' properties');
    });
    if (location.hash === '#listing=CDS-1') window.openDetail('CDS-1', false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', refreshCasaListing, {once:true});
  else refreshCasaListing();
})();
