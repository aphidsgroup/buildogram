export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/ops/', '/client/', '/partner/', '/login', '/change-password'],
    },
    sitemap: 'https://www.buildogram.in/sitemap.xml',
  }
}
