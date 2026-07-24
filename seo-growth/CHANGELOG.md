# SEO Growth System — CHANGELOG

## 2026-07-25 — Readiness pass 3 (owner corrections 1–10, pre-preview-deploy)

**Item 7 (priority) — locality safety claims remediated.** 28 areas × soilType/soilNote/floodRisk neutralised; 26 legacy localities × soilNote; 23 prescriptive sentences (plinth heights, pile/raft prescriptions, waterproofing directives, marsh/water-table statements) removed from constructionTips across 12 entries; locality cost card, flood badge, area+service chips, generator cost FAQ and LocalBusiness `priceRange` removed; `/construction-in-chennai` "Pile foundations are mandatory", flood-zone locality list and 12 per-locality soil notes rewritten. All 28 area pages still clear the 150-word indexability gate (verified).
**Item 1** — "qualified structural engineers" removed from every Buildogram-team/service claim → "structural engineering professionals" / "structural engineering review coordination". Educational and legal guidance advising users to consult a licensed/registered engineer intentionally retained.
**Item 2** — screening implication fully removed (`screened`, `vetted`, plus 51 further "verified contractor/supplier/builder network" instances found in data files, the locality generator template, directory UI, notification template and brand positioning) → Buildogram Partner Network / Listed Professionals / listed partner.
**Item 3** — drone wording replaced with regulatory-responsibility formulation.
**Item 4** — "current Chennai market data" / "updated monthly" → "project inputs and available Chennai market references"; undated rate strips removed; dated instances (July 2026) retained.
**Item 5** — all BQS/QC numbers removed, including the logically invalid "up to 2,500+" → "structured quality checkpoints" / "documented inspection checkpoints".
**Item 6** — "3–5 working days" turnaround replaced with scope-confirmed wording in the credibility component and plan-review FAQ.
**Item 9 (NAP)** — defect found and fixed: locality LocalBusiness schema emitted placeholder telephone `+91-XXXXXXXXXX`, postalCode `600000` and a second email; now aligned to the single published NAP with street address and areaServed.
**Items 8+10** — register restructured into 5 sections (`register_section` column, 30 entries incl. new CL26–CL30); deployment gates reclassified across NEEDS-OWNER-VERIFICATION Sections 2/3/4.
**Scans after changes:** verified/screened/vetted 0 · engineer-qualification claims 0 (educational retained) · certified pilots 0 · undated market-data 0 · BQS/QC numbers 0 · old stats 0 · NAP placeholders 0 · public buildogram.com 0 · mojibake 0. Tests 21/21. Syntax checks on all modified files pass. Build/lint remain owner-machine gates.


## 2026-07-25 — Deployment-readiness phase (post-P0, pre-deploy)

- Partner wording tightened per owner directive: all public "screened"/"vetted"/"Engineer-Screened" wording (10 instances) replaced with neutral Partner Network terms; missed "Verified Contractors in Chennai" H1 fixed. Register CL24.
- "Qualified structural engineers" RETAINED with documented evidence basis (named founders on /about: structural engineering lead + B.E. credential; Person schema present). Register CL25 — owner to confirm formal credentials; fallback wording defined.
- Two additional async-params routes fixed: case-studies/[slug], proof/[slug] (blog has no slug route).
- Deployment-prep audit: no env/credential/secret files in any branch commit; no vercel.json (no redirect conflict surface); middleware matcher does not intersect any redirect source; all 8 redirects one-hop with sources absent from sitemap and internal links.
- Owner-safe production DB verification procedure created: seo-growth/production-db-verification.sql (read-only sections A/B; approval-gated cleanup C; heuristics for non-demo-slug seed data: seed phone numbers, ui-avatars/unsplash placeholders, unnumbered RERA/ISO claims, duplicate phones).
- Pre-deploy production baseline captured (incl. fresh confirmation that valid /guides/ slugs 404 live).
- Created seo-growth/20-post-deployment-verification.md: full post-deploy check framework, GSC/Bing procedures, URL Inspection priority list, risks, P1 gate. Current P1 status: NO-GO until deploy + production checks pass.
- Build/lint remain owner-machine gates (sandbox cannot run them — documented in 19 §12 and 20 §1).


## 2026-07-25 — P0 implementation (owner-approved)

Branch: `seo/buildogram-organic-growth-system` · No deploy performed; changes await owner review and merge.

### Claims remediation (owner decisions 1–10)
- Removed "500+ Projects Supported", "₹12.8Cr / ₹2.1Cr / ₹50Cr+" value claims, "18% Average Client Savings", "10-Year Warranty" from: services.js stats bar (~43 pages), about page (stats + timeline), end-to-end page, locations/chennai hub, EngineerCredibility component ("12+ engineers", "500+ projects since 2022").
- "Certified/licensed structural engineers" → "qualified structural engineers" across audit/plan-review cluster, EngineerCredibility, AI audit intake. Kept generic professional references (e.g. "verify with a licensed structural engineer", stability-certificate legal requirement).
- "8–15% savings" claims (serviceHubs, localServices ×4, materials FAQ) → variable-outcome wording per owner phrasing.
- Structural audit "starts around ₹10,000" → quote-based wording.
- "Certified pilots" → coordination wording without certification claim.
- "Verified Partner Network"/"vetted" → "Partner Network"/"screened" across homepage, nav, footer, contact, partner category pages, directory metadata, materials pages (28 files). "Every builder is RERA-registered / no fake reviews" absolutes removed.
- Homepage TMT "Live Rates" table → anonymised suppliers/brands, badge changed to "Illustrative Example", disclaimer line added.
- GCC/CMDA report-acceptance claim → conditional wording (CL21).
- All removed claims preserved in `18-claim-verification-register.csv` (CL01–CL23) for restoration when evidence arrives.

### Routing and crawl integrity
- **Discovered and fixed a Next 16 async-`params` bug that 404'd six entire dynamic route families in production** (~85 sitemap URLs): `/services/[slug]`, `/materials/[slug]`, `/guides/[slug]`, `/glossary/[term]`, `/faqs/[category]`, `/compare/[slug]`, plus `/partners/[slug]`. All now `await params`.
- 8 one-hop 301 redirects added in `next.config.mjs` (see `07-content-pruning-and-redirect-map.csv`).
- Navbar fixed: villa-construction, material-quotes, ready-mix-concrete links; apartment-structural-audit item removed. locations page verified-contractors link fixed. build page (3 broken links), materials pages (2), serviceHubs/localServices internal links repointed off redirected URLs.
- Sitemap: 3 non-rendering 404 URLs excluded; ready-mix-concrete (redirect) excluded; global URL dedupe added (removes 6 double entries); duplicate `site-supervision-chennai` object removed from SERVICES.

### Wrong-domain fixes
- privacy-policy/terms emails → `hello@buildogram.in`; WhatsApp portal fallback → `www.buildogram.in/client/dashboard`; tracking fallback → `www.buildogram.in`; boq-calculator canonical/OG `buildogram.com` → `www.buildogram.in`; homepage cosmetic ref → `buildogram.in`.
- Canonical host consistency: non-www `buildogram.in` canonicals/schema → `www.buildogram.in` in 9 files.
- Intentional remainders documented: `temp-buildogram.com` internal placeholder emails; smoke-test fixtures.

### Encoding
- Mojibake repaired in `serviceHubs.js` (140 chars) and `layout.js` — including the site-wide `<title>` that served "â€”" to search engines. Repo-wide scan now clean.

### Partner data safety
- `demo-*` slugs blocked from: partners directory SSR query, `/api/partners` (3 queries), `/api/partners/[slug]`, `/partners/[slug]` page + metadata, sitemap partnerRoutes.
- `ops/seed-partners` now requires `ENABLE_DEMO_SEED=true` (plus existing admin auth).
- Production DB purge check documented for owner (sandbox cannot reach prod DB).

### Robots / AI-crawl policy (owner-ratified, no code change needed)
- OAI-SearchBot, PerplexityBot, anthropic-ai, Bingbot: allowed (search/answer discovery).
- GPTBot, CCBot: disallowed (model-training opt-out). Decision now recorded here and in NEEDS-OWNER-VERIFICATION §21.
- Dashboards/auth/report/portal routes remain disallowed.

### Validation
- Tests 21/21; syntax checks 26/26; internal-link crawl 0 broken / 0 redirect-pointing; domain scan 0 public `.com`; encoding scan 0; claims scans 0 unsupported numerics remaining. Build: see `19-test-and-validation-results.md` §12.

## 2026-07-25 — Phase One: diagnosis
(unchanged — see previous entry content in git history)
- Full repo + live-site audit; deliverables 00/01/02/05/18/NEEDS-OWNER-VERIFICATION created; 7 live 404s confirmed; claims registered; no production changes.
