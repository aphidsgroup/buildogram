const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    // Phase 5 perf: serve AVIF first (30-50% smaller than WebP), fall back to WebP
    // Measurable LCP improvement for image-heavy pages (materials, case studies, blog)
    formats: ['image/avif', 'image/webp'],
    // Standard responsive breakpoints: mobile → tablet → desktop → 4K
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 30-day CDN TTL for optimised images (Next.js default is 60s — too short for static builds)
    minimumCacheTTL: 2592000,
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Phase 5: add ui-avatars.com used in about/team sections
      { protocol: 'https', hostname: 'ui-avatars.com' },
    ],
  },

  serverExternalPackages: ['bcryptjs'],

  async headers() {
    return [
      // Security headers on all routes
      {
        source: '/(.*)',
        headers: securityHeaders,
      },

      // Phase 5 perf: 1-year immutable cache for hashed Next.js static assets
      // _next/static/* files contain content-hashes → safe to cache indefinitely
      // Without this, browsers re-validate on every page visit (extra round-trip = TTFB hit)
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // Phase 5 perf: 7-day cache for PWA icons (not content-hashed, but rarely change)
      {
        source: '/icons/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },

      // Phase 5 perf: 1-day cache for public static files (robots.txt, llms.txt, sitemap.xml)
      {
        source: '/:file(robots.txt|llms.txt|sitemap.xml|manifest.webmanifest|sw.js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=3600',
          },
        ],
      },

      // Phase 5 perf: Server-level preconnect Link headers for critical third-party origins.
      // These are sent in the HTTP response headers BEFORE the browser parses HTML,
      // eliminating DNS + TLS setup latency for Google Fonts (Space Grotesk, Be Vietnam Pro,
      // DM Serif Text), Cloudinary images, and Unsplash images.
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Link',
            value: [
              '<https://fonts.googleapis.com>; rel=preconnect',
              '<https://fonts.gstatic.com>; rel=preconnect; crossorigin',
              '<https://res.cloudinary.com>; rel=preconnect',
              '<https://images.unsplash.com>; rel=dns-prefetch',
            ].join(', '),
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/properties/buy',
        destination: 'https://www.realproprealty.com',
        permanent: true,
      },
      {
        source: '/properties/rent',
        destination: 'https://toletboardchennai.in',
        permanent: true,
      },
      {
        source: '/properties/list-your-property',
        destination: '/properties',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
