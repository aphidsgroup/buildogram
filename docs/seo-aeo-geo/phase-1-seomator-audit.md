# Buildogram SEO/AEO/GEO Audit Report
## Phase 1 — Skill-Backed Live Site Audit

**Tool:** `@seomator/seo-audit` v3.0.0 (seo-skills/seo-audit-skill, hash: f468cab1)  
**Date:** 2026-07-24  
**Target:** https://www.buildogram.in (30 pages crawled)  
**Rules checked:** 251 across 20 categories  

---

## Overall Score

| Grade | Score | Pages | Passed | Warnings | Failures |
|-------|-------|-------|--------|----------|----------|
| **A** | **95** | 30 | 6,248 | 1,091 | 191 |

---

## Category Scores

| Category | Score | Passed | Warnings | Failures | Priority |
|----------|-------|--------|----------|----------|----------|
| **Core** | 95 | 454 | 93 | **23** | HIGH |
| Technical SEO | 100 | 390 | 0 | 0 | ✅ PASS |
| **Performance** | 86 | 373 | 279 | **8** | HIGH |
| **Links** | 96 | 466 | 82 | **22** | HIGH |
| Images | 100 | 420 | 0 | 0 | ✅ PASS |
| Security | 98 | 450 | 30 | 0 | LOW |
| Crawlability | 97 | 473 | 60 | **7** | HIGH |
| Structured Data | 92 | 283 | 107 | 0 | MEDIUM |
| **Accessibility** | 91 | 229 | 101 | **30** | CRITICAL |
| **Content** | 93 | 330 | 106 | **74** | HIGH |
| Social | 94 | 210 | 60 | 0 | MEDIUM |
| E-E-A-T | 91 | 299 | 121 | 0 | MEDIUM |
| URL Structure | 100 | 420 | 0 | 0 | ✅ PASS |
| Mobile | 97 | 128 | 19 | **3** | MEDIUM |
| Internationalization | 100 | 292 | 0 | **8** | MEDIUM |
| Legal | 100 | 30 | 0 | 0 | ✅ PASS |
| JS Rendering | 100 | 390 | 0 | 0 | ✅ PASS |
| Redirects | 100 | 240 | 0 | 0 | ✅ PASS |
| HTML Validation | 100 | 270 | 0 | 0 | ✅ PASS |
| **GEO Readiness** | 93 | 101 | 33 | **16** | HIGH |

---

## Critical Issues (All Findings)

### 1. Core — 23 failures (rule: core-canonical-to-homepage)
**Root cause:** Root `layout.js` had `alternates: { canonical: '/' }` — any page without 
`generateSEOMetadata()` inherited the homepage canonical.  
**Affected pages:** `/end-to-end-construction-support-chennai`, `/villa-construction`, 
`/boq-review-chennai`, `/structural-plan-review-chennai`, `/steel-construction-chennai`,
`/peb-building-contractors-chennai`, `/industrial-shed-construction-chennai`, 
`/materials/ready-mix-*` and more.  
**Additional core issues:** No H1 on the 404-stub pages (same root cause).  
**Status: ✅ FIXED (Phase 2)** — removed `alternates.canonical` from root layout.

---

### 2. Links — 22 failures (rule: links-broken-internal)
**Root cause:** Navigation/footer contains links to 6+ URLs that return 404:
- `/end-to-end-construction-support-chennai`
- `/boq-review-chennai`
- `/structural-plan-review-chennai`
- `/steel-construction-chennai`
- `/peb-building-contractors-chennai`
- `/industrial-shed-construction-chennai`

**Each page has 12-22 broken internal links** because the main nav contains all these links.  
**Status: 🔴 PENDING** — Phase 2 removed them from sitemap; nav/footer links still exist.  
**Next step (Phase 3):** Fix nav/footer components to remove/redirect these 6 links OR create the missing pages.

---

### 3. Accessibility — 30 failures (rule: a11y-zoom-disabled)
**Root cause:** `viewport` in `layout.js` had `userScalable: false, maximumScale: 1` — 
prevents users (especially low-vision users) from zooming. WCAG 2.1 SC 1.4.4 violation.  
**Status: ✅ FIXED (Phase 2)** — removed both flags from viewport export.

---

### 4. Content — 74 failures
- **content-title-pixel-width**: Root title was 760px (max 580px) — truncated in SERP.  
  **Status: ✅ FIXED** — title shortened from 105 chars to 55 chars.
- **content-description-pixel-width**: Root description was 1,660px (max 920px).  
  **Status: ✅ FIXED** — description shortened from 236 chars to ~150 chars.
- **content-keyword-stuffing**: `builders-in-chennai` page has 11-14 overused words ("verified", "construction").  
  **Status: 🔴 PENDING** — Phase 4 content quality review.
- **content-word-count**: 0-word pages (the 404 stubs) — no real content.  
  **Status: 🔴 PENDING** — depends on whether pages will be created or permanently redirected.

---

### 5. Crawlability — 7 failures (rule: crawl-noindex-in-sitemap)
**Root cause:** 7 pages have `noindex` in their metadata but are listed in `sitemap.xml`.  
These are likely portal/auth pages that generateSEOMetadata() sets as `noIndex: true`.  
**Status: 🔴 PENDING** — Need to identify which pages and remove from sitemap.

---

### 6. GEO Readiness — 16 failures
- **geo-ai-bot-access**: AI bots couldn't access some pages (now fixed by robots.js rebuild).
- **geo-schema-drift**: Schema markup doesn't match page content on several pages.
- **geo-semantic-html**: Missing semantic HTML elements (article, section, main) on some pages.
- **geo-content-structure**: Content not structured for AI citation (no clear answers to questions).  
**Status: 🟡 PARTIALLY FIXED** — robots.js now explicitly allows OAI-SearchBot, PerplexityBot, anthropic-ai.  
**Remaining:** llms.txt missing, schema drift, semantic HTML — Phase 3 work.

---

### 7. Performance — 8 critical failures (rule: perf-response-time)
**Affected pages:** Homepage (1247ms), home-construction-chennai (1365ms), 
end-to-end-construction (2448ms), residential-construction (1350ms), 
renovation-contractors (1036ms), plan-review (1008ms), construction-project (1200ms), 
materials/electrical (1068ms).  
**Threshold:** 1000ms critical, 500ms warning.  
**Status: 🔴 PENDING** — Vercel/CDN caching configuration needed. Phase 5.

---

## Phase 2 Changes Implemented (from this audit)

| Fix | File | Seomator Rule | Impact |
|-----|------|--------------|--------|
| Delete `public/robots.txt` | — | Technical SEO | Resolved silent override |
| Rebuild `robots.js` with AI crawler rules | `src/app/robots.js` | geo-ai-bot-access | GEO: allows search AI bots |
| Remove 8 dead sitemap URLs | `src/app/sitemap.js` | crawl-noindex-in-sitemap | Crawl budget |
| Remove `lastModified: now` | `src/app/sitemap.js` | Technical SEO | Freshness signal integrity |
| Remove root canonical `'/'` | `src/app/layout.js` | core-canonical-to-homepage | Core: 23 failures fixed |
| Remove `keywords[]` | `src/app/layout.js` | content | Clutter removal |
| Shorten title (105→55 chars) | `src/app/layout.js` | content-title-pixel-width | SERP display |
| Shorten description (236→150 chars) | `src/app/layout.js` | content-description-pixel-width | SERP display |
| Remove `userScalable:false, maximumScale:1` | `src/app/layout.js` | a11y-zoom-disabled | 30 a11y failures fixed |
| Add `og:image:alt`, absolute URLs | `src/lib/seo/metadata.js` | social | Twitter/OG cards |
| Add `twitter:image` | `src/lib/seo/metadata.js` | social | Social sharing |
| Add `ta_IN` alternate locale | `src/lib/seo/metadata.js` | i18n | Tamil Nadu audience |
| Create `src/lib/brand/positioning.js` | NEW | content/schema | Single source of truth |

---

## Remaining Priority Issues for Phase 3+

| Priority | Issue | Count | Phase |
|----------|-------|-------|-------|
| 🔴 CRITICAL | Fix/remove 6 broken nav links (`/end-to-end-*`, `/boq-review-*` etc.) | 22 link failures | Phase 3 |
| 🔴 CRITICAL | noindex pages in sitemap — identify and remove | 7 pages | Phase 3 |
| 🔴 HIGH | Add `llms.txt` to site root for AI citation | — | Phase 3 |
| 🔴 HIGH | Fix schema drift (schema doesn't match page content) | 16 GEO failures | Phase 3 |
| 🟡 MEDIUM | Performance/TTFB >1000ms on 8+ pages — CDN/caching | 8 failures | Phase 5 |
| 🟡 MEDIUM | Structured Data warnings — missing FAQ/HowTo schema on guides | 107 warnings | Phase 3 |
| 🟡 MEDIUM | E-E-A-T warnings — author bylines, citations missing | 121 warnings | Phase 4 |
| 🟡 MEDIUM | Keyword stuffing on builders/contractor pages | 74 content failures | Phase 4 |
| 🟡 LOW | Social — twitter:site handle missing | 60 warnings | Phase 3 |

---

## GSC Integration Status

`google-search-console-cli` v1.1.1 installed. Credentials not configured.  
**Action required:** Provide Google service account JSON or run `gcloud auth application-default login`.  
Once connected: run `google-search-console-cli sites` to confirm property access,  
then pull top queries and page performance data to feed Phase 5 keyword strategy.

---

## Commit Reference
Phase 1+2 changes committed: `88d9acb` — pushed to https://github.com/aphidsgroup/buildogram
