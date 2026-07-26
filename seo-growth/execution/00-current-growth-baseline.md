# 00 — Current Growth Baseline

**Phase 2 · Search Growth Execution** · baseline opened 2026-07-26

## 1. Release annotation

| Event | Date |
| --- | --- |
| P0 production release (route repair, redirects, sitemap, claims) | 2026-07-25 |
| Post-P0 cache purge and verification | 2026-07-26 |
| Metadata fix across 7 route families | 2026-07-26 (pending deploy) |
| **Baseline start — measure everything from here** | **2026-07-26** |

Annotate this date in GA4 (Admin → Annotations) and note it in Search Console. Any traffic comparison that spans 2026-07-25 is comparing a partly-broken site to a working one.

## 2. Site inventory — repo-derived, 2026-07-26

| Family | Public URLs |
| --- | ---: |
| Static routes | 114 |
| `/glossary/[term]` | 26 |
| `/guides/[slug]` | 22 |
| `/materials/[slug]` | 16 |
| `/services/[slug]` | 15 |
| `/faqs/[category]` | 10 |
| `/compare/[slug]` | 5 |
| **Total (excl. DB-driven)** | **193** |
| `/partners/[slug]`, `/case-studies/[slug]`, `/proof/[slug]` | DB-driven, counted at build |

Full inventory: `03-top-20-existing-page-opportunities.csv`.

## 3. Search metrics — not yet available

No Search Console, GA4 or Bing connector is authorised in this session, and no export has been supplied. These are recorded as pending, not estimated.

| Metric | Value | Source needed |
| --- | --- | --- |
| Indexed pages | `PENDING_GSC` | GSC Page indexing report |
| Impressions (28d) | `PENDING_GSC` | GSC Performance |
| Clicks (28d) | `PENDING_GSC` | GSC Performance |
| CTR | `PENDING_GSC` | GSC Performance |
| Average position | `PENDING_GSC` | GSC Performance |
| Distinct queries | `PENDING_GSC` | GSC Performance (16 months) |
| Ranking pages | `PENDING_GSC` | GSC Pages report |
| Bing impressions / clicks | `PENDING_BING` | Bing WMT |
| Organic landing sessions | `PENDING_GA4` | GA4 Traffic acquisition |
| Phone clicks | `PENDING_GA4` | GA4 event `phone_click` |
| WhatsApp clicks | `PENDING_GA4` | GA4 event `whatsapp_click` |
| Form submissions | `PENDING_GA4` | GA4 event `generate_lead` |
| Qualified calls | `NOT_INSTRUMENTED` | CRM / call log |
| Material enquiries | `PENDING_GA4` | Lead API `leadType` |
| Construction enquiries | `PENDING_GA4` | Lead API `leadType` |
| GBP views / calls / directions | `PENDING_GBP` | Google Business Profile |

**Nothing in this table is estimated or modelled.** A baseline built from guesses cannot measure improvement.

## 4. Exports required to unblock the sprint

| # | Export | Destination file | Notes |
| ---: | --- | --- | --- |
| 1 | GSC Performance → Queries **and** Pages, 16 months, all three domains separately | `01-gsc-query-page-opportunities.csv` | Use the **Export → CSV** on the Pages tab with the Query dimension, not the summary. |
| 2 | GSC Page indexing report (all statuses) | `00` §3 | Reveals what is excluded and why |
| 3 | GA4 Traffic acquisition + Landing page, organic only, 6 months | `02-ga4-organic-conversion-baseline.csv` | Include conversions per landing page |
| 4 | Bing WMT Performance export | `01` (separate tab) | |
| 5 | Redacted enquiry text — last 200 leads | `seo-growth/market-domination/48-…csv` | **Strip name, phone, email, address before export.** Customer wording is the highest-value keyword source available and it costs nothing. |
| 6 | GBP Insights, 6 months | `00` §3 | Local pack baseline |

Item 5 is the one most often skipped and the one with the best return — real customers describe their problem in words no keyword tool produces.

## 5. Instrumentation already in place

Confirmed present in the repo, so these will produce data as soon as GA4 is read:

| Signal | Implementation |
| --- | --- |
| GA4 | `src/app/layout.js` — `gtag.js` via `NEXT_PUBLIC_GA_ID`, `window.dataLayer` initialised |
| UTM + conversion-page attribution | `src/lib/analytics/attribution.js`, `src/components/analytics/AttributionTracker.jsx` |
| Lead capture | `src/app/api/leads/route.js` — `name`, `phone`, `leadType`, `sourcePage`, `utm*`, server-side attribution merge |
| Contextual enquiry form | Live on guides, glossary and service pages (3 fields: name, WhatsApp, project stage) |
| WhatsApp | `src/lib/whatsapp.js`, number from `src/lib/brand/positioning.js` — single source of truth |

**Gap:** `generate_lead`, `whatsapp_click` and `phone_click` event firing has not been verified end-to-end against GA4 DebugView. Confirm before treating conversion numbers as real.

## 6. Structural findings available without search data

These came from the repo and production crawl and do not need GSC to be true.

**BOQ intent is spread across 12 URLs.** `/ai-boq-checker`, `/ai-pile-foundation-boq-checker`, `/ai/boq-draft`, `/boq-audit`, `/boq-calculator`, `/boq-review-chennai`, `/compare/boq-review-vs-contractor-estimate`, `/faqs/boq`, `/glossary/boq`, `/guides/what-is-boq-in-construction`, `/guides/boq-checklist-for-homeowners`, `/services/boq-review`. This is the strongest differentiator in the business and its authority is fragmented. Highest-value consolidation target once query-to-page data lands.

**Probable duplicate material slugs.** `/materials/bricks` · `/materials/blocks` · `/materials/bricks-aac-blocks` cover one topic; `/materials/steel` · `/materials/tmt-steel` · `/materials/fabrication-steel` likewise. Candidates for consolidation, not yet actioned — the owner rule is that consolidation needs query evidence, not title similarity.

**`/boq-calculator` is labelled "Coming Soon" in the main navigation.** It is in the sitemap and crawlable. Either ship it or noindex it; an indexed placeholder on a head term is worse than no page.

Sixteen candidate clusters are recorded in `06-cannibalisation-actions.csv`, all marked `CANDIDATE_ONLY`.

## 7. What happens when GSC arrives

1. Populate `01-…csv` and `02-…csv`.
2. Rank the 193 URLs by impressions × (position 4–20) × commercial intent → fill `tier` in `03-…csv`.
3. Resolve `06-…csv` candidates using query-to-page mapping, starting with the BOQ cluster.
4. Select five pages, write briefs into `05-first-five-page-briefs/`, implement, deploy to preview, measure.

Until then the sprint proceeds on the work that does not require it: metadata correction (done), sitemap submission, and the structural findings above.
