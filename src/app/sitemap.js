import { services } from '@/data/seo/services';
import { guides } from '@/data/seo/guides';
import { glossaryTerms } from '@/data/seo/glossary';
import { faqCategories } from '@/data/seo/faqs';
import { comparisons } from '@/data/seo/comparisons';
import { localities } from '@/data/seo/localities';
import { materials } from '@/data/seo/materials';
import { areas } from '@/data/seo/areas';
import { localServices } from '@/data/seo/localServices';
import { serviceHubs } from '@/data/seo/serviceHubs';
import { generateAreaPage, generateServiceAreaPage } from '@/lib/seo/localPageGenerator';

export default function sitemap() {
  const baseUrl = 'https://www.buildogram.in';
  const now = new Date().toISOString();

  const staticRoutes = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/how-it-works`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/boq-audit`, priority: 0.95, changeFrequency: 'weekly' },
    { url: `${baseUrl}/cost-estimator`, priority: 0.95, changeFrequency: 'weekly' },
    { url: `${baseUrl}/plan-review`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/property-passport`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/properties`, priority: 0.85, changeFrequency: 'daily' },
    { url: `${baseUrl}/build`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/build/home-construction`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/build/villa-construction`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/build/renovation`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/maintenance`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/maintenance/request`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/partners`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/partners/directory`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/partners/register`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/specifications`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/warranty-and-maintenance`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/why-vs-aggregators`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/why-vs-mason`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/construction-in-chennai`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/privacy-policy`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${baseUrl}/terms`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${baseUrl}/quality-system`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/join-as-partner`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/partner-os`, priority: 0.8, changeFrequency: 'monthly' },
    // Hub pages
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/guides`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/glossary`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/faqs`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/materials`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/locations/chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/ai-tools`, priority: 0.9, changeFrequency: 'weekly' },
    // Service Pages
    { url: `${baseUrl}/builders-in-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/home-construction-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/house-construction-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/commercial-construction-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/construction-company-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/construction-project-management-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/quality-inspection-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/residential-construction-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/renovation-contractors-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/site-supervision-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/turnkey-construction-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/end-to-end-construction-support-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/boq-review-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/contractor-quote-review-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/construction-cost-estimation-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/structural-plan-review-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/steel-construction-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/peb-building-contractors-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/industrial-shed-construction-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    // Structural Audit & NDT
    { url: `${baseUrl}/structural-audit-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/building-structural-audit-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/residential-structural-audit-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/commercial-structural-audit-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/apartment-structural-audit-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/old-building-structural-audit-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/building-crack-inspection-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/ndt-testing-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/rebound-hammer-test-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/upv-test-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/rebar-scanning-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/core-test-concrete-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    // Survey & Piling
    { url: `${baseUrl}/land-survey-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/topographic-survey-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/contour-survey-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/dgps-survey-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/total-station-survey-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/drone-survey-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/construction-layout-marking-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/pile-point-marking-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/soil-testing-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/soil-investigation-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/plate-load-test-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/pile-foundation-contractors-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/bored-cast-in-situ-piles-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/dmc-piling-contractors-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/micro-piling-contractors-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/pile-load-test-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/pile-integrity-test-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/dynamic-pile-load-test-chennai`, priority: 0.9, changeFrequency: 'weekly' },
    // AI Tools
    { url: `${baseUrl}/ai-construction-cost-estimator`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/ai-boq-checker`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/ai-contractor-quote-analyzer`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/ai-material-estimator`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/ai-structural-audit-intake`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/ai-survey-requirement-builder`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/ai-soil-test-requirement-builder`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/ai-pile-foundation-boq-checker`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/ai-property-passport-assistant`, priority: 0.9, changeFrequency: 'weekly' },
  ];

  // Dynamic: new service hub pages
  const serviceHubRoutes = serviceHubs.map((h) => ({
    url: `${baseUrl}${h.canonicalPath}`,
    priority: h.priority || 0.9,
    changeFrequency: 'weekly',
  }));

  // Dynamic: services
  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    priority: 0.9,
    changeFrequency: 'monthly',
  }));

  // Dynamic: guides
  const guideRoutes = guides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    priority: 0.85,
    changeFrequency: 'monthly',
  }));

  // Dynamic: glossary
  const glossaryRoutes = glossaryTerms.map((t) => ({
    url: `${baseUrl}/glossary/${t.slug}`,
    priority: 0.75,
    changeFrequency: 'monthly',
  }));

  // Dynamic: faqs
  const faqRoutes = faqCategories.map((c) => ({
    url: `${baseUrl}/faqs/${c.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
  }));

  // Dynamic: comparisons
  const compareRoutes = comparisons.map((c) => ({
    url: `${baseUrl}/compare/${c.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
  }));

  // Dynamic: localities (legacy — kept for URL continuity)
  const localityRoutes = localities.map((l) => ({
    url: `${baseUrl}/locations/chennai/${l.slug}`,
    priority: 0.85,
    changeFrequency: 'monthly',
  }));

  // Dynamic: materials
  const materialRoutes = materials.map((m) => ({
    url: `${baseUrl}/materials/${m.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
  }));

  // Dynamic: quality-gated area pages
  const areaRoutes = areas
    .map(a => {
      const page = generateAreaPage(a.slug);
      if (!page || !page.isIndexable) return null;
      return {
        url: `${baseUrl}/locations/chennai/${a.slug}`,
        priority: 0.9,
        changeFrequency: 'monthly',
      };
    })
    .filter(Boolean);

  // Dynamic: quality-gated service+area pages
  const serviceAreaRoutes = [];
  for (const area of areas) {
    for (const service of localServices) {
      const page = generateServiceAreaPage(area.slug, service.slug);
      if (!page || !page.isIndexable) continue;
      serviceAreaRoutes.push({
        url: `${baseUrl}/locations/chennai/${area.slug}/${service.slug}`,
        priority: 0.85,
        changeFrequency: 'monthly',
      });
    }
  }

  return [
    ...staticRoutes,
    ...serviceHubRoutes,
    ...serviceRoutes,
    ...guideRoutes,
    ...glossaryRoutes,
    ...faqRoutes,
    ...compareRoutes,
    ...localityRoutes,
    ...materialRoutes,
    ...areaRoutes,
    ...serviceAreaRoutes,
  ].map((entry) => ({
    ...entry,
    lastModified: now,
  }));
}

