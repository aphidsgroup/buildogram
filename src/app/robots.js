/**
 * Dynamic robots.txt — served by Next.js App Router.
 *
 * IMPORTANT: Delete public/robots.txt before deploying.
 * Static files in /public override this route; both cannot coexist.
 *
 * Responsibility matrix (from docs/seo-aeo-geo/skill-setup-log.md):
 *   - Blocks admin/auth/portal routes from all crawlers
 *   - Allows AI search crawlers (OAI-SearchBot, PerplexityBot, Bingbot)
 *   - Defers GPTBot (OpenAI training) — currently disallowed pending decision
 *   - Defers CCBot (Common Crawl training) — currently disallowed pending decision
 *
 * Phase 2 change: rebuilt from scratch; replaces the overriding public/robots.txt
 */
export default function robots() {
  return {
    rules: [
      // ── Default rule: all standard crawlers ─────────────────────────────
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/ops/',
          '/client/',
          '/partner/',
          '/admin/',
          '/login',
          '/change-password',
          '/forgot-password',
          '/reset-password',
          '/project/',
          '/property-passport/',
          '/boq-report/',
          '/plan-review-report/',
        ],
      },

      // ── Google: explicit allow for AI Overviews + AI Mode ───────────────
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/ops/',
          '/client/',
          '/partner/',
          '/admin/',
          '/login',
          '/change-password',
          '/forgot-password',
          '/reset-password',
          '/project/',
          '/property-passport/',
          '/boq-report/',
          '/plan-review-report/',
        ],
      },

      // ── ChatGPT Search (OAI-SearchBot) — allow, supports GEO ───────────
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/api/', '/ops/', '/client/', '/partner/', '/admin/'],
      },

      // ── Perplexity — allow, supports GEO citations ──────────────────────
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/ops/', '/client/', '/partner/', '/admin/'],
      },

      // ── Anthropic (Claude.ai web search) — allow ────────────────────────
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/api/', '/ops/', '/client/', '/partner/', '/admin/'],
      },

      // ── GPTBot (OpenAI training) — blocked pending business decision ────
      // To allow: change disallow to ['/api/', '/ops/', '/client/', '/partner/', '/admin/']
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },

      // ── CCBot (Common Crawl training) — blocked pending decision ────────
      {
        userAgent: 'CCBot',
        disallow: ['/'],
      },

      // ── Bing + Copilot — allow ──────────────────────────────────────────
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/ops/', '/client/', '/partner/', '/admin/'],
      },
    ],
    sitemap: 'https://www.buildogram.in/sitemap.xml',
    host: 'https://www.buildogram.in',
  };
}
