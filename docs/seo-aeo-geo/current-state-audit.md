# Buildogram — Current State SEO/AEO/GEO Audit

**Audit Date:** 2026-07-24  
**Auditor:** Antigravity (automated + manual inspection)  
**Branch:** main (post-service-refactor commit 8cfbf18)  
**Stack:** Next.js 16.2.6 · React 19.2.4 · Prisma 6.4.1 · JavaScript · Vercel · Neon · Cloudinary

---

## 1. Technical Infrastructure Summary

| Component | Implementation | Status |
|-----------|---------------|--------|
| Framework | Next.js 16.2.6 App Router | ✅ Current |
| Language | JavaScript (no TypeScript) | ⚠️ No type safety on SEO utilities |
| Rendering | SSG + SSR + ISR mix | ✅ Appropriate |
| Fonts | Space Grotesk, Be Vietnam Pro, DM Serif Text via `next/font` | ✅ Optimal (display: swap) |
| Images | Cloudinary + next/image | ✅ |
| Analytics | GA4 via `NEXT_PUBLIC_GA_ID` (conditional) | ⚠️ Env var missing in local |
| PWA | Service Worker + manifest | ✅ |
| Organization Schema | `generateOrganizationSchema()` in layout.js | ✅ Present |
| LocalBusiness Schema | `generateLocalBusinessSchema()` in layout.js | ✅ Present |
| Metadata Factory | `generateSEOMetadata()` in `src/lib/seo/metadata.js` | ✅ Used across pages |
| Canonical System | Absolute URL via `SITE_URL + path` | ✅ Correct pattern |
| OG Tags | Present in metadata factory | ✅ |
| Twitter Tags | Present in metadata factory | ✅ |
| Breadcrumbs | `Breadcrumbs.jsx` + `BreadcrumbSchema.js` components | ✅ |
| SEO Components | 10 components in `src/components/seo/` | ✅ Rich set |
| Internal Links | `src/lib/seo/internalLinks.js` with categorized link maps | ✅ |
| Local Page Generator | `src/lib/seo/localPageGenerator.js` with `isIndexable` flag | ✅ Quality gating exists |

---

## 2. Critical Technical SEO Issues

### CRITICAL-1: Dual robots.txt Conflict ⛔

**Severity:** Critical  
**File:** `public/robots.txt` AND `src/app/robots.js`

Next.js App Router: when `public/robots.txt` exists, it is served as a static file and **overrides** the dynamic `src/app/robots.js` route. The dynamic route is never reached.

**Current `public/robots.txt`:**
```
User-agent: *
Allow: /
Disallow: /ops/
Disallow: /partner/
Disallow: /api/

Sitemap: https://www.buildogram.in/sitemap.xml
```

**Problems with static file:**
- Does NOT block `/admin/` (portal routes exposed to crawlers)
- Does NOT block `/login`, `/change-password`, `/forgot-password`, `/reset-password`
- Does NOT block `/client/` (client portal)
- Does NOT differentiate AI search crawlers (OAI-SearchBot, PerplexityBot, GPTBot)
- The dynamic `robots.js` (which does block `/client/` and `/change-password`) is silently ignored

**Fix:** Delete `public/robots.txt`. Enhance `src/app/robots.js`.

---

### CRITICAL-2: 7 Sitemap URLs Are 404s ⛔

**Severity:** Critical  
**File:** `src/app/sitemap.js` (static route array)

The dynamic `[serviceSlug]` migration moved 44 service pages to `src/data/services.js`. However, `sitemap.js` still contains 7 hardcoded static entries for URLs that were NOT included in services.js and now return 404:

| Sitemap URL | Expected Route | Status |
|-------------|---------------|--------|
| `/end-to-end-construction-support-chennai` | `[serviceSlug]` | **404** |
| `/boq-review-chennai` | `[serviceSlug]` | **404** |
| `/structural-plan-review-chennai` | `[serviceSlug]` | **404** |
| `/steel-construction-chennai` | `[serviceSlug]` | **404** |
| `/peb-building-contractors-chennai` | `[serviceSlug]` | **404** |
| `/industrial-shed-construction-chennai` | `[serviceSlug]` | **404** |
| `/apartment-structural-audit-chennai` | `[serviceSlug]` | **404** |

**Risk:** Google submits these, receives 404, may deindex adjacent pages, and wastes crawl budget.

**Fix Options (in order of preference):**
1. Add the 7 missing slugs to `src/data/services.js` with content
2. Remove from sitemap + create 301 redirects to nearest canonical URL
3. Minimum: Remove from sitemap immediately to stop crawl budget waste

Additionally, `/why-vs-aggregators` and `/why-vs-mason` appear as BOTH static sitemap entries AND are served via `[serviceSlug]` — creating duplicate sitemap entries.

---

### CRITICAL-3: `lastModified: now` on All Sitemap Entries ⛔

**Severity:** High  
**File:** `src/app/sitemap.js` (last line of return statement)

```javascript
.map((entry) => ({
  ...entry,
  lastModified: now,  // ← PROBLEM: `const now = new Date().toISOString()`
}))
```

Every page reports `lastModified` as the current build time on every Vercel deployment. This means:
- Google sees 1,000+ pages as "just updated" after every code push
- Dilutes the `lastmod` signal — Google learns to ignore it
- Obscures which pages actually have new content

**Fix:** Only add `lastModified` to entries where a real `updated_at` timestamp exists (DB-backed content). Omit `lastModified` for static content rather than faking it.

---

### HIGH-1: `/admin/` Portal Not Blocked in robots ⚠️

**Severity:** High  
**Current robots.js** blocks: `/api/`, `/ops/`, `/client/`, `/partner/`, `/login`, `/change-password`  
**Missing:** `/admin/`, `/forgot-password`, `/reset-password`, `/boq-report/`, `/plan-review-report/`, `/project/`, `/property-passport/` (token URLs)

The middleware correctly protects `/admin/` via auth, but search crawlers see the login redirect (200 with redirect) as potentially indexable content.

---

### HIGH-2: Root Layout Canonical is Relative ⚠️

**Severity:** High  
**File:** `src/app/layout.js`

```javascript
alternates: {
  canonical: '/',  // ← Relative URL
},
```

The root layout sets `canonical: '/'`. While individual pages override this with `generateSEOMetadata()`, any page that fails to call `generateSEOMetadata()` will inherit the root layout's `'/'` canonical — causing every undecorated page to canonicalize to the homepage.

**Fix:** Remove canonical from root layout. Set canonical per-page only.

---

### HIGH-3: Missing `og:image:alt` ⚠️

**Severity:** Medium  
**File:** `src/lib/seo/metadata.js`

The OG image in `generateSEOMetadata()` does not include an `alt` attribute:
```javascript
images: [{ url: ogImage, width: 1200, height: 630 }]  // ← missing alt
```

**Fix:** Add `alt: title` or a descriptive alt to every OG image object.

---

### MEDIUM-1: No AI Crawler Differentiation ⚠️

**Severity:** Medium  
**File:** `src/app/robots.js`

Current robots allows all crawlers identically. No distinction between:
- **Allow for search discovery:** OAI-SearchBot (ChatGPT Search), PerplexityBot, Bingbot
- **Decision needed:** GPTBot (OpenAI training), CCBot (Common Crawl training)

---

### MEDIUM-2: `keywords` Array in Layout Metadata ℹ️

**Severity:** Low (no ranking impact, minor clutter)  
**File:** `src/app/layout.js`

Google has ignored the `<meta name="keywords">` tag since ~2009. The `keywords` array in layout metadata generates a keywords meta tag that has zero SEO value and may be misleading to stakeholders.

**Fix:** Remove keywords from layout metadata. Keep effort on title/description quality.

---

### MEDIUM-3: GA4 Only Fires When `NEXT_PUBLIC_GA_ID` is Set ℹ️

**Severity:** Low  
**File:** `src/app/layout.js`

GA4 is conditionally rendered:
```javascript
{process.env.NEXT_PUBLIC_GA_ID && (...)}
```

This is correct behavior. However, verify the env var is set in Vercel production. No analytics data = no conversion measurement.

---

## 3. Programmatic Page Scale Audit

| Content Type | Data Source | Count | Quality Gate? |
|-------------|------------|-------|--------------|
| `[serviceSlug]` pages | `src/data/services.js` | **44** | ✅ Static data |
| `/services/[slug]` pages | `src/data/seo/services.js` | **15** | ✅ Static data |
| `/guides/[slug]` pages | `src/data/seo/guides.js` | **22** | ✅ Static data |
| `/glossary/[term]` pages | `src/data/seo/glossary.js` | **26** | ✅ Static data |
| `/faqs/[category]` pages | `src/data/seo/faqs.js` | **10** | ✅ Static data |
| `/compare/[slug]` pages | `src/data/seo/comparisons.js` | **5** | ✅ Static data |
| `/materials/[slug]` pages | `src/data/seo/materials.js` | **16** | ✅ Static data |
| `/locations/chennai/[area]` pages | `src/data/seo/areas.js` | **28** | ✅ `isIndexable` gate |
| `/locations/chennai/[area]/[service]` pages | areas × localServices | **616** | ✅ `isIndexable` gate |
| Partner profiles | Prisma DB | Variable | ✅ `public_profile_enabled` gate |
| Case studies | Prisma DB | Variable | ✅ `status: published` gate |

**Total programmatic pages at scale: ~800+ (excluding DB-backed content)**

**Risk Assessment of `/locations/chennai/[area]/[service]`:**  
28 areas × 22 services = 616 possible combinations. Even if `localPageGenerator.isIndexable` filters some, many may be template-thin. Manual review recommended before any content upgrades.

---

## 4. Sitemap Analysis

**Current single sitemap:** `https://www.buildogram.in/sitemap.xml`

### Issues
- Single flat sitemap (no separation by content type)
- All entries get `lastModified: now` (fake timestamps)
- 7 static entries pointing to 404 URLs
- 2 duplicate entries (`why-vs-aggregators`, `why-vs-mason` appear as static + dynamic)
- No image sitemap
- No sitemap index (fine for current scale, needed as content grows)

### Recommended Sitemap Groups (Phase 2)
- Core pages (static, high-priority)
- Service pages (`[serviceSlug]`)
- Guides + resources
- Glossary + FAQs
- Materials
- Partners (DB-backed, only verified)
- Locality pages (only `isIndexable` = true)
- Case studies (only published)

---

## 5. Existing SEO Infrastructure (Strengths)

The following infrastructure is already in place and working:

| Asset | File | Notes |
|-------|------|-------|
| Metadata factory | `src/lib/seo/metadata.js` | Canonical, OG, Twitter, robots — all correct |
| Organization schema | `src/lib/seo/schema.js` | Injected in root layout |
| LocalBusiness schema | `src/lib/seo/schema.js` | Injected in root layout |
| BreadcrumbList | `src/components/seo/Breadcrumbs.jsx` | Used across service pages |
| FAQPage schema | In `[serviceSlug]/page.js` via ServicePageTemplate | All 44 service pages |
| Answer blocks | `src/components/seo/AnswerBlock.js` | Component exists, usage varies |
| Internal links system | `src/lib/seo/internalLinks.js` | Categorized link maps |
| Local page generator | `src/lib/seo/localPageGenerator.js` | `isIndexable` quality gate |
| Google Fonts via next/font | `layout.js` | Optimal (no render-blocking) |
| Quality gate for locality | `localPageGenerator.js` | Gates area + service-area pages |
| Partner profile gate | `sitemap.js` | `verification_status: verified` |

---

## 6. Content & Entity Audit

### Buildogram Positioning in Current Public Content

**Homepage (`/page.js`) self-describes as:**
> "Engineer-led construction support platform for property owners in Chennai"

**Services described include:**
- "End-to-End Construction Support — From concept to key handover"
- "Site Supervision"
- "BOQ & Contractor Quote Audit"
- "Structural Audit"
- "Material Sourcing Support"
- "Property Passport"
- "AI Floor Plan Creator"

**Potential Contradictions Identified:**
1. `src/data/seo/services.js` → house-construction: mentions **"10-Year Structural Warranty — Legally registered warranty"** — Is this a real legal instrument?
2. Homepage HOW_IT_WORKS step 4: "Verified Contractor & Material Match — Connect with screened contractors" — implies matchmaking/marketplace
3. Sitemap includes `/why-vs-aggregators` and `/why-vs-mason` — positioning Buildogram against aggregators, but some service pages describe Buildogram similarly

**Safe default positioning (use until legally reviewed):**
> Buildogram provides engineer-led construction intelligence, technical review, partner coordination, quality verification and permanent project documentation.

---

## 7. robots.js Comparison

| Route | public/robots.txt | src/app/robots.js | Middleware `X-Robots-Tag` |
|-------|------------------|------------------|--------------------------|
| `/ops/` | Disallow | Disallow | noindex, nofollow |
| `/partner/` | Disallow | Disallow | noindex, nofollow |
| `/client/` | **MISSING** | Disallow | noindex, nofollow |
| `/api/` | Disallow | Disallow | — |
| `/admin/` | **MISSING** | **MISSING** | — |
| `/login` | **MISSING** | Disallow | — |
| `/change-password` | **MISSING** | Disallow | — |
| `/forgot-password` | **MISSING** | **MISSING** | — |
| `/reset-password` | **MISSING** | **MISSING** | — |
| `/project/` | **MISSING** | **MISSING** | noindex, nofollow |
| `/property-passport/[token]` | **MISSING** | **MISSING** | noindex, nofollow |

**The active file is `public/robots.txt`** (static takes precedence). The dynamic `src/app/robots.js` is unused.

---

## 8. Performance & CWV Risks

| Risk | Source | Severity |
|------|--------|---------|
| Service worker registered inline in layout | `layout.js` inline script | Low |
| FloatingReelPlayerClientWrapper on every page | May load video assets | Medium |
| Potential CLS from dynamic schema injection | `dangerouslySetInnerHTML` in head | Low |
| No explicit LCP image prioritization | Not audited per page | Medium |
| No `sizes` on OG images | Missing width/height on some | Low |

---

## 9. Summary Action Matrix

| Issue | Severity | Phase | Effort |
|-------|---------|-------|--------|
| Delete `public/robots.txt`, fix `src/app/robots.js` | ⛔ Critical | 2 | 30 min |
| Remove 7 dead URLs from sitemap | ⛔ Critical | 2 | 30 min |
| Add missing slugs to services.js OR create redirects | ⛔ Critical | 2 | 2 hr |
| Fix `lastModified: now` in sitemap | 🔴 High | 2 | 1 hr |
| Remove root layout canonical | 🔴 High | 2 | 15 min |
| Add `og:image:alt` to metadata factory | 🟡 Medium | 2 | 15 min |
| Block `/admin/` in robots | 🔴 High | 2 | 15 min |
| AI crawler differentiation in robots | 🟡 Medium | 2 | 30 min |
| Remove `keywords` from layout metadata | 🟢 Low | 2 | 10 min |
| Separate sitemap into groups | 🟡 Medium | 2 | 2 hr |
| Legal review: "10-Year Structural Warranty" claim | ⛔ Business | 4 | Manual |
| Manual review: 616 locality-service pages quality | 🔴 High | 7 | Manual |
| Add author/reviewer system to guides | 🟡 Medium | 4–5 | 4 hr |
| Verify GA4 env var is set in Vercel | 🔴 High | 8 | 10 min |
