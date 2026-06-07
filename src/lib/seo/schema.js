export const SITE_URL = 'https://www.buildogram.in';

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Buildogram',
  url: SITE_URL,
  logo: `${SITE_URL}/globe.svg`,
  description: 'Buildogram is an AI-driven, engineer-led construction companion and property ecosystem helping owners plan, build, source materials, track site progress, and maintain digital property records in Chennai.',
  areaServed: {
    '@type': 'City',
    name: 'Chennai'
  },
  sameAs: [
    'https://www.linkedin.com/company/buildogram'
  ]
});

export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Buildogram',
  image: `${SITE_URL}/og-image.jpg`,
  '@id': SITE_URL,
  url: SITE_URL,
  telephone: '+919360232456',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No.35, 7th floor, Awfis Space, Centre Point 3, Poonamallee High Road, Manapakkam, Porur',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600089',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.0232, // More accurate for Manapakkam/Porur
    longitude: 80.1704,
  },
  areaServed: {
    '@type': 'City',
    name: 'Chennai'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction & Property Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Construction' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'BOQ & Plan Review' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Building Structural Audit' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Construction Material Sourcing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Land & Property Survey' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Soil Testing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pile Foundation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Property Passport Documentation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Verified Partner Network' } }
    ]
  },
  description: 'AI-driven, engineer-led home construction and property support in Chennai.',
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
