export const SITE_URL = 'https://www.buildogram.in';

/**
 * Generates a consistent Next.js Metadata object with enforced canonicals and Open Graph tags.
 * @param {Object} param0 
 * @param {string} param0.title - The SEO title of the page.
 * @param {string} param0.description - The SEO description of the page.
 * @param {string} param0.path - The absolute path of the page starting with '/' (e.g., '/services/boq-review').
 * @param {boolean} param0.noIndex - Whether to block indexing.
 * @param {string} param0.ogImage - Optional custom OG image path.
 * @returns {import('next').Metadata}
 */
export function generateSEOMetadata({
  title,
  description,
  path = '/',
  noIndex = false,
  noindex = false,
  ogImage = '/og-image.jpg',
}) {
  // Support both noIndex and noindex spellings
  const shouldNoindex = noIndex || noindex;
  const url = `${SITE_URL}${path === '/' ? '' : path}`;

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
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
