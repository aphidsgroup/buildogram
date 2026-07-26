# 09 — Route Metadata Fix Report

**Phase 2 · Sprint task 2** · 2026-07-26 · Status: **IMPLEMENTED, AWAITING DEPLOY**

## 1. The defect was wider than glossary

The reported symptom was that `/glossary/rcc` emitted `og:url = https://www.buildogram.in` and the homepage OG title. Investigating the shared generator showed the same root cause across **seven dynamic route families**, not one.

`src/lib/seo/metadata.js` already exports a correct `generateSEOMetadata()` helper — canonical, OG title/description/url/image/alt/locale, Twitter card, robots directives. It was written in a Phase 2 pass on 2026-07-24. **The dynamic routes were never wired to it.** Each hand-rolled its own partial metadata object, so Next.js fell back to the root `layout.js` defaults for everything the route omitted — which is why every glossary page shared one social card pointing at the homepage.

### Before

| Route family | title | canonical | openGraph | twitter | og:image |
| --- | :-: | :-: | :-: | :-: | :-: |
| `/glossary/[term]` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `/faqs/[category]` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `/compare/[slug]` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `/materials/[slug]` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `/proof/[slug]` | ✅ | ⚠ relative | ❌ | ❌ | ❌ |
| `/guides/[slug]` | ✅ | ✅ | ⚠ partial (no url, no image) | ❌ | ❌ |
| `/services/[slug]` | ✅ | ✅ | ⚠ partial (no image) | ❌ | ❌ |
| `/partners/[slug]` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/case-studies/[slug]` | ✅ | ✅ | ✅ | ✅ | ✅ |

`/partners/` and `/case-studies/` were already correct — they were the only two calling the helper.

### After

All nine families now route through `generateSEOMetadata({ title, description, path })`.

## 2. Changes

| File | Change |
| --- | --- |
| `src/app/glossary/[term]/page.js` | Wired to helper; added term-specific `ogImageAlt` |
| `src/app/faqs/[category]/page.js` | Wired to helper |
| `src/app/compare/[slug]/page.js` | Wired to helper |
| `src/app/materials/[slug]/page.js` | Wired to helper |
| `src/app/guides/[slug]/page.js` | Replaced partial `openGraph` object with helper |
| `src/app/services/[slug]/page.js` | Replaced partial `openGraph` object with helper |
| `src/app/proof/[slug]/page.js` | Wired to helper; **relative canonical `/proof/x` replaced with absolute URL** |

No page bodies, slugs, canonical targets or sitemap entries were changed. Canonical *values* are identical to before — only their completeness and absoluteness changed.

## 3. What each page now emits

Taking `/glossary/rcc`:

```
title           RCC (Reinforced Cement Concrete) — Buildogram Construction Glossary
canonical       https://www.buildogram.in/glossary/rcc
og:title        RCC (Reinforced Cement Concrete) — Buildogram Construction Glossary
og:description  RCC stands for Reinforced Cement Concrete — concrete that contains steel …
og:url          https://www.buildogram.in/glossary/rcc
og:image        https://www.buildogram.in/og-image.jpg  (1200×630, alt set)
og:locale       en_IN  (+ ta_IN alternate)
twitter:card    summary_large_image
twitter:title   RCC (Reinforced Cement Concrete) — Buildogram Construction Glossary
robots          index, follow, max-image-preview:large, max-snippet:-1
```

Previously `og:url` was `https://www.buildogram.in` and `og:title` was the homepage title, on all 26 glossary URLs.

## 4. Why this matters beyond social cards

- **`max-image-preview:large` and `max-snippet:-1`** were not being emitted per-route. These directives govern how much of a page Google may show in rich results and AI Overviews. Withholding them suppresses exactly the surface the AEO/GEO programme is targeting.
- **Duplicate OG signals across 26 URLs** give crawlers a weak consolidation hint in the wrong direction.
- **`/proof/[slug]` had a relative canonical.** Next.js resolves this against `metadataBase`, so it worked — but it is fragile and breaks silently if `metadataBase` is ever changed.

## 5. Verification

Post-deploy, confirm on at least one URL per family that `og:url` matches the page's own canonical:

```
/glossary/rcc   /glossary/rmc   /guides/what-is-boq-in-construction
/faqs/boq       /compare/boq-review-vs-contractor-estimate
/materials/cement   /services/villa-construction
```

Pass condition: `og:url == canonical == the requested URL`, and `og:title` describes the page, not the homepage.

Pre-deploy status: source verified, import and call present in all seven files. **Build not yet run in this environment** — run `npm run lint && npm test && npm run build` before deploying.
