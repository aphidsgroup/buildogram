// src/lib/seo/localSchema.js
// Generate hyper-local JSON-LD schema for area and area+service pages.

const BASE_URL = 'https://www.buildogram.in';

/**
 * Generate LocalBusiness schema for Buildogram operating in a specific area.
 */
export function generateLocalBusinessSchema(area) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/locations/chennai/${area.slug}`,
    name: `Buildogram — Home Construction Support in ${area.name}`,
    description: `Engineer-led home construction support in ${area.name}, Chennai. BOQ reviews, verified builders, site supervision, and material sourcing.`,
    url: `${BASE_URL}/locations/chennai/${area.slug}`,
    telephone: '+91-XXXXXXXXXX',
    email: 'info@buildogram.in',
    address: {
      '@type': 'PostalAddress',
      addressLocality: area.name,
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
      postalCode: '600000',
    },
    geo: area.coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: area.coordinates.lat,
          longitude: area.coordinates.lng,
        }
      : undefined,
    areaServed: {
      '@type': 'Place',
      name: area.name,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Construction Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Construction' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'BOQ Review' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Site Supervision' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Construction Material Sourcing' } },
      ],
    },
    priceRange: `₹${area.costRange.min.toLocaleString('en-IN')}–₹${area.costRange.max.toLocaleString('en-IN')} per sqft`,
    sameAs: ['https://www.buildogram.in'],
  };
}

/**
 * Generate FAQPage schema from an array of FAQ objects.
 */
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

/**
 * Generate WebPage schema.
 */
export function generateWebPageSchema({ url, title, description, breadcrumbs }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name: title,
    description,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: `${BASE_URL}${crumb.href}`,
      })),
    },
  };
}

/**
 * Generate a Service schema for an area+service intersection.
 */
export function generateServiceSchema(area, service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} in ${area.name}, Chennai`,
    description: `Buildogram provides ${service.name.toLowerCase()} with engineer-led transparency in ${area.name}, Chennai.`,
    provider: {
      '@type': 'Organization',
      name: 'Buildogram',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'Place',
      name: `${area.name}, Chennai, Tamil Nadu`,
    },
    url: `${BASE_URL}/locations/chennai/${area.slug}/${service.slug}`,
  };
}
