// src/lib/seo/localPageGenerator.js
// Quality-gated content generation for area and area+service pages.
// Applies template substitution and determines if a page meets indexability threshold.

import { areas, areaMap } from '@/data/seo/areas';
import { localServices, localServiceMap } from '@/data/seo/localServices';
import { localityMap } from '@/data/seo/localities';

const QUALITY_THRESHOLD_WORDS = 700;
const QUALITY_THRESHOLD_FAQS = 5;
const QUALITY_THRESHOLD_LINKS = 5;

/**
 * Substitute template variables into a string.
 */
function substitute(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] !== undefined ? vars[key] : `{${key}}`);
}

/**
 * Count approximate words in a string.
 */
function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Build the page data for /locations/chennai/[area]
 */
export function generateAreaPage(areaSlug) {
  // Primary: rich areas data
  let area = areaMap[areaSlug];

  // Fallback: legacy localities data — adapt to expected shape
  if (!area) {
    const loc = localityMap[areaSlug];
    if (!loc) return null;
    area = {
      slug: loc.slug,
      name: loc.name,
      region: loc.region,
      zone: 'GCC / CMDA',
      approvalBody: 'Greater Chennai Corporation (GCC) / CMDA',
      desc: loc.desc,
      soilType: 'Varies by zone. Site testing recommended.',
      soilNote: loc.soilNote,
      floodRisk: 'Moderate (verify site-specifically)',
      constructionTips: loc.constructionTips,
      approvalNotes: 'Building plan approval required from local authority. Verify jurisdiction before commencing work.',
      costRange: { min: 1700, max: 2600, currency: 'INR', unit: 'per sqft' },
      materialLogistics: 'Material supply available from local and nearby yards. Verify road access for heavy vehicles.',
      nearbyAreas: loc.nearbyLocalities || [],
      demandDrivers: loc.demandNote,
      propertyTypes: loc.properties || ['Residential', 'Commercial'],
      coordinates: null,
    };
  }

  const vars = {
    area: area.name,
    region: area.region,
    approvalBody: area.approvalBody,
    approvalNote: area.approvalNotes,
    soilNote: area.soilNote,
    costMin: area.costRange.min.toLocaleString('en-IN'),
    costMax: area.costRange.max.toLocaleString('en-IN'),
    midCost: Math.round((area.costRange.min + area.costRange.max) / 2).toLocaleString('en-IN'),
    costCompare: area.costRange.min < 2000 ? 'competitive pricing vs central Chennai' : 'premium pricing reflecting location value',
    commercialSuitability: area.region.toLowerCase().includes('commercial') ? 'well-suited for commercial development' : 'primarily a residential zone',
  };

  const title = `Home Construction in ${area.name}, Chennai | Verified Builders | Buildogram`;
  const description = `Planning home construction in ${area.name}, Chennai? Buildogram provides BOQ reviews, verified local builders, site supervision, and material sourcing with engineer-led transparency.`;
  const h1 = `Home Construction in ${area.name}, Chennai`;

  const services = localServices.map(s => ({
    slug: s.slug,
    name: s.name,
    href: `/locations/chennai/${area.slug}/${s.slug}`,
  }));

  const faqs = [
    {
      q: `What is the construction cost per sqft in ${area.name}?`,
      a: `Home construction costs in ${area.name} range from ₹${area.costRange.min.toLocaleString('en-IN')}–₹${area.costRange.max.toLocaleString('en-IN')} per sqft depending on specification. Basic builds use standard materials; premium builds include higher concrete grades, quality tiles, and full interior finishing. Contact Buildogram for a detailed project estimate.`,
    },
    {
      q: `What approval body governs construction in ${area.name}?`,
      a: `${area.approvalNotes}`,
    },
    {
      q: `What soil conditions should I know about in ${area.name}?`,
      a: area.soilNote,
    },
    {
      q: `How do I find a verified builder in ${area.name}?`,
      a: `Buildogram\'s verified contractor network includes builders with proven project histories in ${area.name} and surrounding ${area.nearbyAreas.slice(0, 3).join(', ')}. All contractors undergo engineering and reference verification before listing.`,
    },
    {
      q: `What are the main construction challenges in ${area.name}?`,
      a: area.constructionTips,
    },
    {
      q: `What localities are near ${area.name} that also have Buildogram coverage?`,
      a: `Nearby areas we service include ${area.nearbyAreas.join(', ')}. Each area has its own local construction context — explore our location pages for area-specific guidance.`,
    },
  ];

  const internalLinks = [
    { text: 'BOQ Audit Tool', href: '/boq-audit' },
    { text: 'Construction Cost Estimator', href: '/cost-estimator' },
    { text: 'AI Floor Plan Creator', href: '/ai-floor-plan-creator' },
    { text: 'Verified Builder Directory', href: '/partners/directory' },
    { text: 'All Chennai Locations', href: '/locations/chennai' },
    ...area.nearbyAreas.slice(0, 3).map(n => ({
      text: `Construction in ${n}`,
      href: `/locations/chennai/${n.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`,
    })),
  ];

  // Quality score
  const wordTotal = wordCount([area.desc, area.soilNote, area.constructionTips, area.approvalNotes, ...faqs.map(f => f.a)].join(' '));
  const qualityScore = {
    words: wordTotal,
    faqs: faqs.length,
    internalLinks: internalLinks.length,
    passWords: wordTotal >= QUALITY_THRESHOLD_WORDS,
    passFaqs: faqs.length >= QUALITY_THRESHOLD_FAQS,
    passLinks: internalLinks.length >= QUALITY_THRESHOLD_LINKS,
  };
  const isIndexable = qualityScore.passWords && qualityScore.passFaqs && qualityScore.passLinks;

  return {
    area,
    title,
    description,
    h1,
    services,
    faqs,
    internalLinks,
    qualityScore,
    isIndexable,
    vars,
  };
}

/**
 * Build the page data for /locations/chennai/[area]/[service]
 */
export function generateServiceAreaPage(areaSlug, serviceSlug) {
  const area = areaMap[areaSlug];
  const service = localServiceMap[serviceSlug];
  if (!area || !service) return null;

  const vars = {
    area: area.name,
    region: area.region,
    approvalBody: area.approvalBody,
    approvalNote: area.approvalNotes,
    soilNote: area.soilNote,
    costMin: area.costRange.min.toLocaleString('en-IN'),
    costMax: area.costRange.max.toLocaleString('en-IN'),
    midCost: Math.round((area.costRange.min + area.costRange.max) / 2).toLocaleString('en-IN'),
    costCompare: area.costRange.min < 2000 ? 'competitive pricing vs central Chennai' : 'premium pricing reflecting location value',
    commercialSuitability: area.region.toLowerCase().includes('commercial') ? 'well-suited for commercial development' : 'primarily residential',
  };

  const title = `${service.name} in ${area.name}, Chennai | Buildogram`;
  const description = `Looking for ${service.name.toLowerCase()} in ${area.name}, Chennai? Buildogram provides engineer-verified ${service.name.toLowerCase()} with transparent pricing and local construction expertise.`;
  const h1 = substitute(service.h1Template, vars);
  const intro = substitute(service.introTemplate, vars);

  const processSteps = service.processSteps.map(step => ({
    ...step,
    desc: substitute(step.desc, vars),
  }));

  const faqs = service.faqs.map(faq => ({
    q: substitute(faq.q, vars),
    a: substitute(faq.a, vars),
  }));

  const internalLinks = [
    ...service.internalLinks,
    { text: `${area.name} Local Guide`, href: `/locations/chennai/${area.slug}` },
    { text: 'All Chennai Locations', href: '/locations/chennai' },
    ...area.nearbyAreas.slice(0, 3).map(n => ({
      text: `${service.name} in ${n}`,
      href: `/locations/chennai/${n.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}/${service.slug}`,
    })),
  ];

  // Quality score
  const wordTotal = wordCount([intro, area.desc, area.soilNote, area.constructionTips, ...faqs.map(f => f.a), ...processSteps.map(s => s.desc)].join(' '));
  const qualityScore = {
    words: wordTotal,
    faqs: faqs.length,
    internalLinks: internalLinks.length,
    passWords: wordTotal >= QUALITY_THRESHOLD_WORDS,
    passFaqs: faqs.length >= QUALITY_THRESHOLD_FAQS,
    passLinks: internalLinks.length >= QUALITY_THRESHOLD_LINKS,
  };
  const isIndexable = qualityScore.passWords && qualityScore.passFaqs && qualityScore.passLinks;

  return {
    area,
    service,
    title,
    description,
    h1,
    intro,
    processSteps,
    faqs,
    internalLinks,
    qualityScore,
    isIndexable,
    vars,
  };
}

/**
 * Generate all valid area+service combinations for use in generateStaticParams.
 */
export function getAllAreaServiceCombinations() {
  const combinations = [];
  for (const area of areas) {
    for (const service of localServices) {
      combinations.push({ area: area.slug, service: service.slug });
    }
  }
  return combinations;
}
