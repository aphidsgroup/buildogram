import { notFound } from 'next/navigation';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { SERVICES, getService } from '@/data/services';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';

/**
 * generateStaticParams — WAF-optimised build-time static generation.
 * All 45 service routes are pre-rendered at build time with zero runtime DB calls.
 * This replaces 45 individual physical directories while preserving exact URL paths.
 * Compliant with google-cloud-waf-performance-optimization: decouple data from rendering,
 * modular data layer, single compilation unit for all service pages.
 */
export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    serviceSlug: service.slug,
  }));
}

/**
 * generateMetadata — Per-page metadata using verbatim title/description
 * from services.js (xSeek zero-loss extraction).
 * gingiris-seo-geo standard: canonical URL = original slug path (no /services/ prefix).
 */
export async function generateMetadata({ params }) {
  const { serviceSlug } = await params;
  const service = getService(serviceSlug);

  if (!service) {
    return {
      title: 'Service Not Found | Buildogram',
      description: 'The requested service page could not be found.',
    };
  }

  return generateSEOMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/${service.slug}`,
  });
}

/**
 * ServicePage — Dynamic route page component.
 * Renders using the shared ServicePageTemplate with per-service data.
 * Preserves 100% of original content (IS codes, Chennai localities, cost ranges)
 * via verbatim data in SERVICES array.
 */
export default async function ServicePage({ params }) {
  const { serviceSlug } = await params;
  const service = getService(serviceSlug);

  if (!service) {
    notFound();
  }

  return <ServicePageTemplate service={service} />;
}
