import { services } from '@/data/seo/services';
import { guides } from '@/data/seo/guides';
import { glossaryTerms } from '@/data/seo/glossary';
import { faqCategories } from '@/data/seo/faqs';
import { comparisons } from '@/data/seo/comparisons';
import { localities } from '@/data/seo/localities';
import { materials } from '@/data/seo/materials';

export default function sitemap() {
  const baseUrl = 'https://buildogram.in';
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
    { url: `${baseUrl}/properties/buy`, priority: 0.85, changeFrequency: 'daily' },
    { url: `${baseUrl}/properties/rent`, priority: 0.85, changeFrequency: 'daily' },
    { url: `${baseUrl}/properties/list-your-property`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/build`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/build/home-construction`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/build/villa-construction`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/build/renovation`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/maintenance`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/maintenance/request`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/partners`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/partners/directory`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/specifications`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/warranty-and-maintenance`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/why-vs-aggregators`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/why-vs-mason`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/construction-in-chennai`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/privacy-policy`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${baseUrl}/terms`, priority: 0.5, changeFrequency: 'yearly' },
    // Hub pages
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/guides`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/glossary`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/faqs`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/compare`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/materials`, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/locations/chennai`, priority: 0.9, changeFrequency: 'weekly' },
  ];

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

  // Dynamic: localities
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

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...guideRoutes,
    ...glossaryRoutes,
    ...faqRoutes,
    ...compareRoutes,
    ...localityRoutes,
    ...materialRoutes,
  ].map((entry) => ({
    ...entry,
    lastModified: now,
  }));
}
