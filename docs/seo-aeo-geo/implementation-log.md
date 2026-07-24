# Buildogram SEO/AEO/GEO — Implementation Log

---

## Phase 1: Discovery & Current-State Audit

**Date:** 2026-07-24  
**Branch:** main (read-only, no code changes)  
**Objective:** Understand current state before any changes.

### Files Created
- `docs/seo-aeo-geo/README.md`
- `docs/seo-aeo-geo/current-state-audit.md`
- `docs/seo-aeo-geo/url-inventory.csv`
- `docs/seo-aeo-geo/keyword-intent-map.csv`
- `docs/seo-aeo-geo/redirect-map.csv`
- `docs/seo-aeo-geo/entity-positioning.md`
- `docs/seo-aeo-geo/unresolved-decisions.md`
- `docs/seo-aeo-geo/external-tools.md`
- `docs/seo-aeo-geo/implementation-log.md` (this file)

### Routes Affected
None — read-only phase.

### Tests Performed
- Repository inspection via PowerShell
- File content audit of: `layout.js`, `next.config.mjs`, `robots.js`, `sitemap.js`, `metadata.js`, `schema.js`, all `src/lib/seo/` files, `src/components/seo/` directory
- Programmatic page count verification
- 404 detection for sitemap static entries vs `[serviceSlug]` route

### Build Result
No changes — not applicable.

### Key Findings
1. **CRITICAL:** `public/robots.txt` overrides `src/app/robots.js` — dynamic robots is silently unused
2. **CRITICAL:** 7 hardcoded sitemap URLs are 404s (not in services.js)
3. **HIGH:** `lastModified: now` on all sitemap entries — fake timestamps
4. **HIGH:** `/admin/` not blocked in either robots file
5. **HIGH:** Root layout sets relative canonical `'/'` — risk of inheritance by undecorated pages
6. **MEDIUM:** No AI crawler differentiation (OAI-SearchBot, PerplexityBot, GPTBot)
7. **MEDIUM:** `og:image:alt` missing in metadata factory
8. **MEDIUM:** `keywords` array in layout.js (zero SEO value)
9. **MEDIUM:** 616 locality-service pages — quality of pages unknown
10. **CONTENT:** "10-Year Structural Warranty — Legally registered" claim requires legal verification
11. **CONTENT:** house-construction vs residential-construction cannibalization (HIGH risk)
12. **CONTENT:** `/services/[slug]` pages and `/build/[type]` pages may cannibalize `[serviceSlug]` pages

### Risks
- Crawl budget waste from 7 sitemap 404s
- Crawler access to admin portal (middleware redirects but not explicit robots block)
- Legal risk from unverified warranty claim
- Keyword cannibalization from duplicate intent pages

### Rollback Instructions
No changes made — no rollback needed.

### Decisions Required Before Phase 2
- None blocking Phase 2 (Phase 2 is purely technical fixes)
- See `unresolved-decisions.md` for Phase 4+ blockers

---

## Phase 2: SEO Foundation

**Date:** TBD  
**Branch:** `feat/buildogram-seo-aeo-geo-transformation`  
**Status:** ⏳ Awaiting approval

*This section will be updated when Phase 2 begins.*

---

## Phase 3–9

*To be logged as each phase completes.*
