export const SITE_URL = 'https://www.buildogram.in';

/**
 * Generates a consistent Next.js Metadata object with enforced canonicals and Open Graph tags.
 *
 * Phase 2 changes (2026-07-24):
 *   - og:image now has alt text (SEO + accessibility fix)
 *   - ogImage path is resolved to absolute URL (was relative, may render as broken in some crawlers)
 *   - twitter:image added (was missing)
 *   - og:locale:alternate added for ta_IN (Tamil Nadu audience)
 *
 * @param {Object} param0
 * @param {string} param0.title - The SEO title of the page.
 * @param {string} param0.description - The SEO description of the page.
 * @param {string} param0.path - The absolute path of the page starting with '/' (e.g., '/services/boq-review').
 * @param {boolean} param0.noIndex - Whether to block indexing.
 * @param {string} param0.ogImage - Optional custom OG image URL or path.
 * @param {string} param0.ogImageAlt - Optional OG image alt text. Defaults to title.
 * @returns {import('next').Metadata}
 */
export function generateSEOMetadata({
  title,
  description,
  path = '/',
  noIndex = false,
  noindex = false,
  ogImage = '/og-image.jpg',
  ogImageAlt,
}) {
  // Support both noIndex and noindex spellings
  const shouldNoindex = noIndex || noindex;
  const url = `${SITE_URL}${path === '/' ? '' : path}`;

  // Resolve ogImage to absolute URL — relative paths don't work in all Open Graph parsers
  const ogImageUrl = ogImage.startsWith('http')
    ? ogImage
    : `${SITE_URL}${ogImage}`;

  // Alt text: use provided alt, or derive from title (required for accessibility + screen readers)
  const resolvedAlt = ogImageAlt || `${title} — Buildogram`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Buildogram',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: resolvedAlt,       // Phase 2 fix: og:image:alt was missing
        },
      ],
      locale: 'en_IN',
      alternateLocale: ['ta_IN'], // Tamil Nadu audience
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: ogImageUrl, alt: resolvedAlt }], // Phase 2 fix: twitter:image was missing
    },
    robots: {
      index: !shouldNoindex,
      follow: !shouldNoindex,
      googleBot: {
        index: !shouldNoindex,
        follow: !shouldNoindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

