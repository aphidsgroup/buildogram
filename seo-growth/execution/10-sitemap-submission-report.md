# 10 — Sitemap Submission Report

**Phase 2 · Search Growth Execution** · opened 2026-07-26

## 1. Canonical sitemap

| Field | Value |
| --- | --- |
| Sitemap URL | `https://www.buildogram.in/sitemap.xml` |
| Generator | `src/app/sitemap.js` (Next.js Metadata Route) |
| Robots | `https://www.buildogram.in/robots.txt` |
| Preview URLs | **Must not be submitted.** Preview deployments carry Standard Protection and return 401. |
| Host rule | `www.buildogram.in` only. Zero non-www hosts, zero `vercel.app` hosts, zero `demo-*` partner URLs. |
| Page inventory (repo-derived) | **193 public URLs** — 114 static routes + 15 services + 26 glossary + 22 guides + 16 materials + 10 FAQ categories + 5 comparisons (partner, case-study and proof profiles are DB-driven and counted at build) |

## 2. Google Search Console — submission steps

I cannot execute this: no Search Console connector is authorised in this session. Run it in the browser and paste the results into §4.

1. Search Console → select the property. **Use the Domain property (`buildogram.in`) if it exists** — it aggregates www, non-www and both schemes. If only a URL-prefix property exists, it must be `https://www.buildogram.in/` exactly.
2. Left nav → **Indexing → Sitemaps**.
3. Under "Add a new sitemap", enter `sitemap.xml`. Submit.
4. Wait for the status row. "Success" only means the file parsed — it is not an indexing signal.
5. Record: submission date, status, discovered URL count, and any errors.

**If no property is verified yet:** verify by DNS TXT record (works for the Domain property and survives host changes) rather than by HTML file, which can be lost on redeploy.

## 3. Bing Webmaster Tools — submission steps

1. Bing Webmaster Tools → **Import from Google Search Console** if available. This carries over verification and saves the DNS step.
2. Otherwise add `https://www.buildogram.in` and verify by DNS TXT.
3. **Sitemaps → Submit sitemap** → `https://www.buildogram.in/sitemap.xml`.
4. Enable **IndexNow** — Bing indexes far faster with it, and it also feeds Yandex/Naver. Next.js can ping IndexNow on deploy; worth doing once the sprint stabilises.

## 4. Results — to be completed on submission

| Field | Google | Bing |
| --- | --- | --- |
| Property type | `NOT_RUN` | `NOT_RUN` |
| Property URL | `NOT_RUN` | `NOT_RUN` |
| Verification method | `NOT_RUN` | `NOT_RUN` |
| Sitemap URL submitted | `NOT_RUN` | `NOT_RUN` |
| Submission date | `NOT_RUN` | `NOT_RUN` |
| Processing status | `NOT_RUN` | `NOT_RUN` |
| URLs discovered | `NOT_RUN` | `NOT_RUN` |
| Errors reported | `NOT_RUN` | `NOT_RUN` |
| Warnings reported | `NOT_RUN` | `NOT_RUN` |

## 5. URL Inspection priority set

Request indexing for these 15 only. Google rate-limits manual requests, and spending them on thin or duplicate pages wastes the quota.

| # | URL | Why |
| ---: | --- | --- |
| 1 | `/` | Homepage — anchors the entity |
| 2 | `/construction-company-chennai` | Primary Chennai commercial head term |
| 3 | `/home-construction-chennai` | Highest-volume service intent |
| 4 | `/construction-cost-estimation-chennai` | Cost pillar entry |
| 5 | `/boq-review-chennai` | Strongest differentiator |
| 6 | `/contractor-quote-review-chennai` | Strongest differentiator |
| 7 | `/structural-audit-chennai` | Distinct high-intent service |
| 8 | `/materials` | Materials hub — revised seller model |
| 9 | `/materials/cement` | Buyer-intent category |
| 10 | `/materials/tmt-steel` | Buyer-intent category |
| 11 | `/materials/msand-psand` | Buyer-intent category |
| 12 | `/guides/what-is-boq-in-construction` | **Async-params canary — confirm it is indexed, not just 200** |
| 13 | `/glossary/rcc` | Glossary canary — first page with corrected OG metadata |
| 14 | `/compare/boq-review-vs-contractor-estimate` | Comparison canary |
| 15 | `/faqs/boq` | FAQ-category canary |

Do **not** request indexing for: `demo-*` partner profiles, `/boq-calculator` (marked "Coming Soon"), duplicate material slugs pending consolidation (`/materials/bricks`, `/materials/blocks`, `/materials/steel`), or any preview URL.

## 6. Post-submission checks — first 14 days

| Day | Check |
| ---: | --- |
| 1 | Sitemap status = Success; discovered count ≈ 193 (±DB-driven profiles). A large shortfall means URLs are being dropped by the generator. |
| 3 | **Page indexing report** — read every "Not indexed" reason. `Crawled — currently not indexed` on many URLs is a quality signal, not a bug. |
| 7 | First impressions appear for the repaired route families. Confirm `/guides/*` and `/services/*` are earning impressions — that is the proof the P0 repair reached the index. |
| 14 | Export **16 months** of query+page data into `01-gsc-query-page-opportunities.csv`. This is the input the whole sprint is waiting on. |

## 7. Known caveats

- The 8 P0 redirects emit **308**, not 301. Search Console reports these as `Page with redirect` — expected, not an error.
- Impressions will look flat for roughly 7–14 days after submission. Do not re-submit the sitemap or re-request indexing in response; it does not accelerate anything.
- Two route families (`/partners/[slug]`, `/case-studies/[slug]`, `/proof/[slug]`) are DB-driven. If the database is unreachable at build time, they silently drop out of the sitemap. Compare the discovered count between deploys.
