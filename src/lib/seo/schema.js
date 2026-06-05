export const SITE_URL = 'https://www.buildogram.in';

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Buildogram',
  url: SITE_URL,
  logo: `${SITE_URL}/globe.svg`,
  description: 'Buildogram is an engineer-led construction companion and property ecosystem helping owners plan, build, source materials, track site progress, and maintain digital property records in Chennai.',
});

export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Buildogram',
  image: `${SITE_URL}/og-image.jpg`,
  '@id': SITE_URL,
  url: SITE_URL,
  telephone: '+919999999999', // Placeholder
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.0827,
    longitude: 80.2707,
  },
  priceRange: '₹₹',
  description: 'Engineer-led home construction and property support in Chennai.',
});

export const generateFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const generateBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export const generateServiceSchema = ({ name, description, url }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  provider: {
    '@type': 'Organization',
    name: 'Buildogram',
  },
  areaServed: {
    '@type': 'City',
    name: 'Chennai',
  },
  url: `${SITE_URL}${url}`,
});
