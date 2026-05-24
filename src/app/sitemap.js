export default function sitemap() {
  const baseUrl = 'https://buildogram.in';

  // Core public pages
  const routes = [
    '',
    '/about',
    '/build',
    '/build/home-construction',
    '/build/villa-construction',
    '/build/commercial-construction',
    '/build/renovation',
    '/boq-audit',
    '/cost-estimator',
    '/plan-review',
    '/materials',
    '/materials/cement',
    '/materials/steel',
    '/property-passport',
    '/properties/list-your-property',
    '/locations/chennai',
    '/contact',
    '/privacy-policy',
    '/terms'
  ];

  const map = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return map;
}
