# SEO Growth System — CHANGELOG

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
