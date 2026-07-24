# 01 — Current State Audit

> **P0 UPDATE (2026-07-25):** Findings P0-1 through P0-6 below are now FIXED on the branch, plus a larger discovery made during implementation: six data-driven dynamic route families (`/services/[slug]`, `/guides/[slug]`, `/glossary/[term]`, `/faqs/[category]`, `/compare/[slug]`, dynamic `/materials/[slug]`, and `/partners/[slug]`) were 404ing in production because `params` was accessed synchronously (Next 16 requires `await params`) — roughly 85 sitemap URLs affected, all fixed. Additional broken links found and fixed: `/verified-contractors-chennai`, `/build/commercial-construction`, `/build/interiors`, `/build/pmc`, `/services/cost-estimator`. Robots AI-crawl policy ratified by owner (OAI-SearchBot allowed; GPTBot/CCBot blocked as training opt-out). See CHANGELOG and `19-test-and-validation-results.md`.

Date: 2026-07-25 · Auditor: Claude (Cowork session) · Branch: `seo/buildogram-organic-growth-system`
Method: full repository inspection + live crawls of `https://www.buildogram.in` (robots.txt, homepage, service pages, suspected-404 URLs). GSC/GA4 not yet connected in this environment — all traffic fields in the inventory are pending first-party data.

## 1. Technology and rendering architecture

Next.js 16 App Router, JavaScript, CSS Modules. React 19. Deployed on Vercel. Neon Postgres via Prisma 6 and raw SQL. Cloudinary media, Razorpay payments, Resend email.

Public SEO surface is driven by a dedicated data layer in `src/data/`:

| Source | Renders | Count |
| --- | --- | --- |
| `src/data/services.js` (SERVICES) | `/[serviceSlug]` — statically generated at build | 44 entries (1 duplicate) |
| `src/data/seo/services.js` | `/services/[slug]` | 15 |
| `src/data/seo/serviceHubs.js` | sitemap entries only — **3 have no renderer (404)** | 14 |
| `src/data/seo/guides.js` | `/guides/[slug]` | 22 |
| `src/data/seo/glossary.js` | `/glossary/[term]` | 26 |
| `src/data/seo/faqs.js` | `/faqs/[category]` | 10 |
| `src/data/seo/comparisons.js` | `/compare/[slug]` | 5 |
| `src/data/seo/materials.js` + physical dirs | `/materials/*` | 16+ |
| `src/data/seo/areas.js` × `localServices.js` | `/locations/chennai/[area](/[service])` | 28 areas × 22 services (max ~616 pages), quality-gated |
| DB | `/blog/[slug]`, `/case-studies/[slug]`, `/partners/[slug]` | dynamic |

Rendering: service pages are server-rendered via `generateStaticParams` (good). Metadata is centralised in `src/lib/seo/metadata.js` with enforced canonicals, OG images with alt, `ta_IN` locale alternate (good). Robots and sitemap are dynamic App Router routes (`src/app/robots.js`, `src/app/sitemap.js`). Schema lives in `src/lib/seo/schema.js` + `localSchema.js` (Organization, WebSite, LocalBusiness/ProfessionalService, Service/OfferCatalog, breadcrumbs, FAQ components).

Total public indexable surface (excluding dashboards): roughly 236 physical routes, of which ~85 are dashboard/auth (correctly disallowed in robots), plus the programmatic locality surface.

## 2. What is working well

- Middleware + robots.txt correctly exclude `/ops`, `/partner`, `/client`, `/admin`, `/api`, report and portal routes.
- Live robots.txt matches source; sitemap referenced; host directive present. AI crawlers (OAI-SearchBot, PerplexityBot, anthropic-ai, Bingbot) explicitly allowed; GPTBot/CCBot blocked pending a documented decision.
- Canonicals: self-canonical via shared `generateSEOMetadata`; homepage and service page verified live with correct `.in` canonical and robots `index, follow`.
- Locality pages have a real quality gate (`localPageGenerator.js`): word/FAQ/link thresholds, `noindex` for thin pages, and the sitemap only includes gate-passing pages — unusually disciplined for programmatic local SEO.
- `lastModified` deliberately omitted from sitemap rather than fake-stamped (correct call, documented in code).
- Entity direction is right: engineer-led owner-side positioning is consistent across homepage metadata, footer NAP is complete (address, phone, email), breadcrumbs and FAQ components exist.

## 3. Critical findings (P0)

**P0-1 — Sitemap contains 404 URLs.** `steel-fabrication-contractors-chennai`, `warehouse-steel-building-chennai`, `factory-shed-construction-chennai` exist in `serviceHubs.js` and are emitted to the sitemap, but have no renderer (not in SERVICES, no physical dir). Confirmed 404 live. Sitemap 404s corrode crawl trust.

**P0-2 — Sitewide navigation links to four 404s** (in every page's header, thousands of internal broken links):
- `/villa-construction` (real content at `/build/villa-construction` and `/services/villa-construction`)
- `/apartment-structural-audit-chennai` (page never created; sitemap comment acknowledges it)
- `/material-quotes` (real route `/materials/request-quote`)
- `/materials/ready-mix-concrete` (real route `/materials/rmc`)

**P0-3 — Wrong-domain references with functional impact.** Legal pages instruct users to email `privacy@buildogram.com` / `support@buildogram.com` (wrong TLD — likely undeliverable, and a privacy-rights compliance problem). `whatsapp.js` sends clients to `app.buildogram.com`; `trackingUrlBuilder.js` falls back to `buildogram.com`.

**P0-4 — Unsupported safety/marketing claims rendered sitewide.** The stats bar on ~43 service pages asserts "500+ Projects Supported", "₹12.8Cr Average Project Value", "18% Average Client Savings", "10-Year Partner Warranty*" with no evidence in the repo, and the structural-audit cluster claims "Certified"/"licensed structural engineers". See `18-claim-verification-register.csv` and `NEEDS-OWNER-VERIFICATION.md`. These fail Google's E-E-A-T expectations for safety-adjacent YMYL content and are legally sensitive.

**P0-5 — Mojibake (encoding corruption) in `src/data/seo/serviceHubs.js`.** Literal `â‚¹` / `â€“` sequences in source will render corrupted ₹ and dash characters in user-visible FAQ answers on hub pages.

**P0-6 — Duplicate sitemap entries.** Six service URLs (end-to-end, boq-review, structural-plan-review, steel-construction, peb, industrial-shed) are emitted both in `staticRoutes` and again via `serviceHubRoutes`.

## 4. High-impact findings (P1)

**P1-1 — Heavy cannibalisation across the core commercial cluster.** Three parallel page systems target the same intents: `/[serviceSlug]` -chennai pages, `/services/[slug]` seo-data pages, and `/build/*` journey pages. 14 documented overlap groups in `05-cannibalisation-map.csv`; worst: construction company/builders (3 pages), home/house construction (4), structural audit (5), BOQ/quote review (5), resources tree (entire duplicate hierarchy).

**P1-2 — Thin SSR body on key money pages.** Live `/structural-audit-chennai` renders H1 → FAQ with almost no service body between (data entry is one of the smallest in SERVICES at ~2KB). Several audit/survey pages share this pattern. These pages are competing for high-value queries with ~200 words of unique content.

**P1-3 — `/[serviceSlug]` data duplicate.** `site-supervision-chennai` appears twice in SERVICES.

**P1-4 — Navigation/IA inconsistencies confusing internal signals.** Nav labels `/building-structural-audit-chennai` as "Residential Structural Audit" while `/residential-structural-audit-chennai` also exists; "Villa Construction" points at a 404 while two villa pages exist; materials nav mixes legacy and enriched slugs.

**P1-5 — Demo/illustrative data presented as real on the homepage.** "Live Rates" TMT comparison names suppliers with a "Verified" badge and specific ₹/MT rates; the site OS mock shows named engineers and invoice values. If these are demo values they must be labelled.

**P1-6 — Programmatic locality surface needs an indexation census.** Up to 616 area×service pages plus 28 area pages. The gate exists, but nobody has measured how many pass, how many are indexed, and whether per-area soil/flood/cost statements are sourced. Risk of scaled-content classification if the gate is looser in practice than in intent.

**P1-7 — No GSC/GA4 evidence loop connected in this environment.** All prioritisation beyond technical severity is currently inference; first-party data connection is the top enabling task.

## 5. Medium findings (P2)

- Legacy material pages (`bricks`, `sand`, `steel`, `electrical-plumbing`) live alongside enriched versions without redirects.
- Freshness: multiple guides/FAQs carry 2025-dated figures without "last reviewed" lines; `2024/2025` references found across seo data files.
- Case studies / proof routes exist but are absent from the sitemap (evidence assets under-leveraged).
- `noindex` for gated locality pages is injected as a body `<meta>` tag in JSX in addition to metadata — redundant and invalid placement (metadata API already handles it).
- GPTBot/CCBot blocked "pending decision" — decision never recorded.
- Schema breadth is good but there is no automated schema validation test; AggregateRating/Offer usage on partner/material pages needs a truthfulness audit against visible content.

## 6. Local vs production comparison

- Production serves the dynamic robots.txt (matches source — the old `public/robots.txt` conflict is resolved).
- Live nav contains all four 404 links listed in P0-2 (deployed = current source; no stale-deploy divergence detected on sampled pages).
- Sitemap 404s (P0-1) confirmed live.
- No production-only routes detected in sampling; blog/case-study/partner URLs are DB-driven and were not exhaustively enumerated (needs GSC coverage report to complete).

## 7. Evidence log

- Live fetches (2026-07-25): `/robots.txt` (200), `/` (200), `/structural-audit-chennai` (200), `/apartment-structural-audit-chennai` (404), `/villa-construction` (404), `/material-quotes` (404), `/materials/ready-mix-concrete` (404), `/warehouse-steel-building-chennai` (404), `/steel-fabrication-contractors-chennai` (404), `/factory-shed-construction-chennai` (404).
- Repo greps: wrong-domain refs (7 files), mojibake (serviceHubs.js), duplicate SERVICES entry, stats claims (`services.js:29`), savings claims (`serviceHubs.js:401`, `localServices.js:87`).
