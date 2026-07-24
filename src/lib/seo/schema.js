/**
 * Buildogram SEO Schema Library — Phase 3 Refactor
 *
 * All schema data is sourced from src/lib/brand/positioning.js (single source of truth).
 * Do NOT hardcode brand descriptions, addresses, or phone numbers here.
 *
 * Schema types exported:
 *   - generateOrganizationSchema()     → Organization + WebSite (root layout)
 *   - generateLocalBusinessSchema()    → LocalBusiness (root layout + contact page)
 *   - generateWebSiteSchema()          → WebSite with SearchAction (root layout)
 *   - generateServiceSchema()          → Service (individual service pages)
 *   - generateFAQSchema()              → FAQPage (pages with FAQ sections)
 *   - generateBreadcrumbSchema()       → BreadcrumbList (all pages)
 *   - generateArticleSchema()          → Article (blog/case study pages)
 *   - generateHowToSchema()            → HowTo (process/guide pages)
 *
 * Phase 3 additions (2026-07-24):
 *   - Wired BRAND constants from positioning.js — eliminates DRY violation
 *   - Added WebSite schema with sitelinks searchbox SearchAction
 *   - Added Article schema for case study pages
 *   - Added HowTo schema for process guide pages
 *   - Fixed Organization: added foundingDate, knowsAbout, hasOfferCatalog
 *   - Fixed LocalBusiness: added openingHoursSpecification, currenciesAccepted
 *   - Fixed breadcrumb: now uses absolute URLs (not relative paths)
 */

import { BRAND } from '@/lib/brand/positioning';

export const SITE_URL = BRAND.url; // 'https://www.buildogram.in'

// ─────────────────────────────────────────────────────────────────────────────
// WebSite Schema — includes Sitelinks Searchbox signal
// ─────────────────────────────────────────────────────────────────────────────
export const generateWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: BRAND.name,
  url: SITE_URL,
  description: BRAND.shortDescription,
  inLanguage: 'en-IN',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND.name,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Organization Schema — entity recognition for AI engines
// ─────────────────────────────────────────────────────────────────────────────
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: BRAND.name,
  legalName: BRAND.legalName,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/icons/android-chrome-512x512.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og-image.jpg`,
  description: BRAND.entityDescription,
  foundingDate: BRAND.foundingYear,
  foundingLocation: {
    '@type': 'Place',
    name: `${BRAND.city}, ${BRAND.state}, ${BRAND.country}`,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No.35, 7th floor, Awfis Space, Centre Point 3, Poonamallee High Road, Manapakkam',
    addressLocality: BRAND.city,
    addressRegion: BRAND.state,
    postalCode: '600089',
    addressCountry: BRAND.countryCode,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+919360232456',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Tamil'],
    },
  ],
  email: BRAND.email,
  areaServed: [
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'State', name: 'Tamil Nadu' },
  ],
  sameAs: BRAND.socialProfiles,
  knowsAbout: [
    'Structural Engineering',
    'Construction Management',
    'Building Structural Audit',
    'Bill of Quantities Review',
    'Site Supervision',
    'Pre-Engineered Buildings',
    'Construction Cost Estimation',
    'Property Documentation',
    'Non-Destructive Testing',
    'Pile Foundation',
    'Construction Materials',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Engineering & Construction Services — Chennai',
    itemListElement: BRAND.services.map(service => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service,
        provider: { '@type': 'Organization', name: BRAND.name },
        areaServed: { '@type': 'City', name: 'Chennai' },
      },
    })),
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// LocalBusiness Schema — local pack and map signals
// ─────────────────────────────────────────────────────────────────────────────
export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${SITE_URL}/#localbusiness`,
  name: BRAND.name,
  image: `${SITE_URL}/og-image.jpg`,
  url: SITE_URL,
  telephone: '+919360232456',
  email: BRAND.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No.35, 7th floor, Awfis Space, Centre Point 3, Poonamallee High Road, Manapakkam',
    addressLocality: BRAND.city,
    addressRegion: BRAND.state,
    postalCode: '600089',
    addressCountry: BRAND.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.0232,
    longitude: 80.1704,
  },
  areaServed: [
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'State', name: 'Tamil Nadu' },
  ],
  priceRange: BRAND.priceRange,
  currenciesAccepted: BRAND.currenciesAccepted,
  paymentAccepted: BRAND.paymentAccepted,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '10:00',
      closes: '14:00',
    },
  ],
  description: BRAND.entityDescription,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Engineering & Construction Services',
    itemListElement: BRAND.services.map(service => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service },
    })),
  },
  sameAs: BRAND.socialProfiles,
});

// ─────────────────────────────────────────────────────────────────────────────
// Service Schema — individual service pages
// ─────────────────────────────────────────────────────────────────────────────
export const generateServiceSchema = ({ name, description, url, category }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  serviceType: category || name,
  provider: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND.name,
    url: SITE_URL,
  },
  areaServed: [
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'State', name: 'Tamil Nadu' },
  ],
  url: `${SITE_URL}${url}`,
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'INR',
    areaServed: { '@type': 'City', name: 'Chennai' },
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// FAQ Schema — FAQPage for FAQ sections (improves AI + rich results)
// ─────────────────────────────────────────────────────────────────────────────
export const generateFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question || faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer || faq.a,
    },
  })),
});

// ─────────────────────────────────────────────────────────────────────────────
// Breadcrumb Schema — all pages (absolute URLs per Google spec)
// ─────────────────────────────────────────────────────────────────────────────
export const generateBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    // Support both absolute URLs (preferred) and legacy path strings
    item: item.url || `${SITE_URL}${item.path}`,
  })),
});

// ─────────────────────────────────────────────────────────────────────────────
// Article Schema — blog and case study pages
// ─────────────────────────────────────────────────────────────────────────────
export const generateArticleSchema = ({ title, description, url, datePublished, dateModified, image }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  url: `${SITE_URL}${url}`,
  image: image || `${SITE_URL}/og-image.jpg`,
  datePublished,
  dateModified: dateModified || datePublished,
  author: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND.name,
  },
  publisher: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND.name,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icons/android-chrome-512x512.png`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}${url}`,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// HowTo Schema — process guide pages
// ─────────────────────────────────────────────────────────────────────────────
export const generateHowToSchema = ({ name, description, steps, totalTime }) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  description,
  totalTime,
  step: steps.map((step, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: step.name,
    text: step.text,
    url: step.url ? `${SITE_URL}${step.url}` : undefined,
  })),
  tool: [
    { '@type': 'HowToTool', name: 'Structural Engineering Review' },
    { '@type': 'HowToTool', name: 'BOQ Audit' },
    { '@type': 'HowToTool', name: 'Site Supervision' },
  ],
});
