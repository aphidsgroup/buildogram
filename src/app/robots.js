export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/ops/', '/client/', '/partner/'],
    },
    sitemap: 'https://www.buildogram.in/sitemap.xml',
  }
}
