# Buildogram SEO/AEO/GEO Project Status

*Last Updated: 2026-07-25*

## 1. Overview & Verified Strategy Definition

This project implements a multi-faceted discoverability strategy designed specifically for the Chennai construction market. The following definitions strictly govern the implementation scope:

*   **SEO:** Search Engine Optimisation for traditional organic search discovery, indexing, relevance, authority, and performance.
*   **AEO:** Answer Engine Optimisation for clear, extractable, and directly useful answers across search features, assistants, and answer interfaces.
*   **GEO:** Generative Engine Optimisation for improving the ability of generative search and AI systems to understand, retrieve, cite, and accurately describe Buildogram.
*   **Local SEO:** Chennai and locality-based organic and map-search relevance for capturing local commercial intent.

## 2. Accurate Official Summary Language

Buildogram’s entity signals, crawlable content, internal consistency, and structured information have been improved to increase the likelihood that search and answer engines can correctly understand, retrieve, summarise, and cite Buildogram. Citation, ranking, and recommendation are not guaranteed.

## 3. Site Architecture & Internal Linking Status

**Status: Implemented and Verified**
*   **Hub-and-Spoke Architecture:** The site is structured hierarchically. The top-level `/` links to major service hubs (`/home-construction-chennai`, `/boq-review-chennai`, `/materials`, `/structural-audit-chennai`), which link to specific granular service pages (e.g., `/soil-testing-chennai`).
*   **Verification:** A local crawler script sampled 50 pages and verified that `<a>` tags connect hubs to sub-pages with 0 missing required canonical links.
*   **Evidence:** `docs/seo-aeo-geo/raw-audit-data/local-crawl.json`

## 4. Metadata & Answer-Engine Payload Status

**Status: Implemented and Verified**
*   **Server-Side Rendering (SSR):** Title tags, meta descriptions, and semantic HTML (H1, H2s) are successfully rendered on the server, ensuring crawler accessibility without requiring JavaScript execution.
*   **Verification:** Verified via direct HTTP request tests against the production build preview.
*   **Evidence:** `docs/seo-aeo-geo/ssr-verification.md`

## 5. Semantic Entity Structuring (JSON-LD) Status

**Status: Implemented, Under Review**
*   **Schema Applied:** `BreadcrumbList`, `LocalBusiness`, and `FAQPage` schemas have been dynamically injected using the `generateSEOMetadata` utility.
*   **FAQPage Correction:** `FAQPage` schema is currently emitted via the `FAQBlock` component. While not treated as a Google rich-result growth strategy, it is retained for semantic extraction by non-Google semantic engines.
*   **Evidence:** `src/components/seo/FAQBlock.js`

## 6. Technical Readiness & Crawlability Status

**Status: Baseline Established**
*   **Robots & Sitemap:** `public/robots.txt` and `public/sitemap.xml` (or dynamic generation) are configured to permit crawling.
*   **Crawl Health:** A local baseline crawl of 50 URLs found 46 indexable URLs, 0 schema parsing errors, and 0 thin pages (<2000 chars).
*   **Evidence:** `docs/seo-aeo-geo/raw-audit-data/local-crawl.json`

## 7. Local SEO & Location Targeting Status

**Status: Implemented**
*   **Implementation:** Over 45 pages explicitly target "Chennai" or specific Chennai localities (Velachery, ECR, OMR, etc.) within H1 tags, titles, and body content to satisfy local commercial intent.
*   **Evidence:** Local intents mapped in `docs/seo-aeo-geo/keyword-intent-map.csv` and verified during the technical claims scan.

## 8. Baseline Performance & Monitoring

**Status: Tracking Configured, Awaiting Production Data**
*   **Dashboards:** The `/ops/seo` dashboard has been updated to query the Serper.dev API for on-demand rank snapshots and the Google Search Console API for recent search metrics.
*   **Dashboard Compliance:** UI explicitly labels API fetch timestamps, whether data is preliminary, and accurately states "Most recently available Search Console data" instead of "Real-time."
*   **Baselines Logged:** Pre-launch baselines have been recorded.
*   **Evidence:** `docs/seo-aeo-geo/performance-baseline.md` and `docs/seo-aeo-geo/ai-citation-baseline.csv`

## 9. Legal & Compliance Status (Provisional)

**Status: Provisional Drafts Active**
*   **Positioning:** All legal documents and site copy correctly reflect Buildogram as an "Independent Advisory & Coordination Consultant," stripping away absolute marketing claims (e.g., "100% guarantee").
*   **Review Pending:** The Terms of Service and Legal Disclaimers remain **PROVISIONAL LEGAL DRAFTS**. They are explicitly NOT marked as solicitor-approved. They await formal review by an India-qualified solicitor familiar with Tamil Nadu contracts.
*   **Evidence:** `src/app/terms/page.js` and `docs/legal/legal-review-status.md`

## 10. Outstanding Technical Evidence & QA Gaps

*   **Engineering Claims Review:** 15 technical terms (IS Codes, NBC, CAPWAP, NDT, etc.) are used across the site. A technical claims register has been generated, but all instances currently require engineering sign-off to ensure complete factual accuracy.
*   **Evidence:** `docs/seo-aeo-geo/technical-claims-register.csv`
*   **External Tooling:** No external GitHub SEO skills (e.g., coreyhaines31/marketingskills, Auriti-Labs/geo-optimizer-skill) were installed or executed. All logic was hand-coded.
*   **Evidence:** `docs/seo-aeo-geo/external-tools.md`

## 11. Content Pipeline Status

**Status: Active**
*   Core structural and materials hub pages are completed. Future content (e.g., case studies, specific material guides) will inherit the existing SEO components (`FAQBlock`, `EntitySummary`, `generateSEOMetadata`).

## 12. Operational Maintenance

*   Ongoing monitoring relies on the native `/ops/seo` dashboard.
*   GSC performance reviews should occur monthly.
*   Manual AI citation tests (from the baseline CSV) should be run quarterly to track GEO improvements.

## 13. Approval & Next Steps

*   **Next Action:** Submit `docs/seo-aeo-geo/technical-claims-register.csv` to the lead structural engineer for verification.
*   **Next Action:** Execute manual baseline tests for AI citations once the site is fully indexed in production.
*   **Next Action:** Obtain formal solicitor approval for the provisional legal drafts.
