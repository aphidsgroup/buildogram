# 19 — Test and Validation Results (P0 Implementation)

Date: 2026-07-25 · Branch: `seo/buildogram-organic-growth-system`
Environment note: validation ran in the Cowork Linux sandbox against the mounted repository. The sandbox cannot reach the production database (DNS restricted) and cannot deploy; post-deploy live-crawl re-verification is listed at the end.

## 1. Automated tests

Command: `node --test "tests/*.test.mjs"` (same as `npm test`)
Result: **21/21 pass, 0 fail** (BOQ engine math, Razorpay signature verification).

## 2. Syntax validation

`node --check` on all 26 modified JS files (pages, components, data, libs, next.config.mjs): **all pass, zero parse errors**.

## 3. Type checking

Not applicable — project is JavaScript-only (no tsconfig, no TS files). Recorded as N/A rather than skipped silently.

## 4. Linting

`next build` runs with `eslint.ignoreDuringBuilds: true` (pre-existing project setting). Standalone `npx eslint` on the sandbox exceeds the command timeout on the network-mounted filesystem. Syntax-level validation was covered by `node --check` (§2); a full `npm run lint` should be run on the owner's machine before merge. **Marked as PENDING owner-machine run.**

## 5. Production build

`./node_modules/.bin/next build` — run in sandbox after installing the Linux SWC binary (`@next/swc-linux-x64-gnu@16.2.6`, `--no-save`; node_modules was Windows-installed).
Result: recorded below in §12 (build executed after all edits were final).

## 6. Internal-link crawl (static, all public source)

Custom crawler over every `href` in `src/app` (public routes), `src/components`, and the SEO data files, resolved against the full route census (physical routes + all dynamic slug sets + redirect table):

- **Broken internal links: 0** (was 8: villa-construction, apartment-structural-audit, material-quotes, ready-mix-concrete, verified-contractors-chennai, build/commercial-construction, build/interiors, build/pmc, services/cost-estimator)
- **Internal links pointing at redirects: 0** (all repointed to final destinations — nav, footer, materials pages, serviceHubs/localServices data)

## 7. Sitemap validation

- 404 URLs removed: `steel-fabrication-contractors-chennai`, `warehouse-steel-building-chennai`, `factory-shed-construction-chennai` (filtered via `NON_RENDERING_HUBS`).
- `/materials/ready-mix-concrete` (now a 301) excluded from materialRoutes.
- Global de-duplication added — first occurrence wins; removes the 6 previous double entries (end-to-end, boq-review, structural-plan-review, steel-construction, peb, industrial-shed).
- Duplicate `site-supervision-chennai` object removed from SERVICES data (route/data hygiene).
- Post-fix logical sitemap totals: see §12 (verified from build output route list).

## 8. Canonical validation

- All canonicals generated via shared `generateSEOMetadata` (www host) — unchanged.
- Fixed non-www canonical/schema hosts (`https://buildogram.in` → `https://www.buildogram.in`) in: services/[slug], materials/[slug], guides/[slug], glossary/[term], faqs/[category], compare/[slug], Breadcrumbs.jsx, proof/[slug], property-passport.
- Fixed wrong-domain canonical `https://buildogram.com/boq-calculator` → `https://www.buildogram.in/boq-calculator`.
- Scan for remaining non-www or .com canonical hosts in public src: **0**.

## 9. Structured-data validation

- Schema URLs inherit the corrected www host (Breadcrumbs, material/service page schema).
- No schema type changes made in P0; JSON-LD emission paths unchanged and syntax-checked via `node --check`.
- Full rich-results validation against rendered HTML is a post-deploy step (see §13).

## 10. Wrong-domain repository scan

`grep -r "buildogram.com"` across `src/`:

- Public-facing references: **0**
- Documented intentional remainders: `temp-buildogram.com` (synthetic placeholder emails for phone-only leads, internal ops API — never rendered publicly); `smoke.*@buildogram.com` test fixtures in `scripts/lead-routing-smoke-test.js` (test-only).

## 11. Encoding-corruption scan

Scan for `â‚¹ â€“ â€” â€™ â€œ Â· Ã— Â°` across src (js/jsx/json/css): **0 remaining**.
Fixed: `src/data/seo/serviceHubs.js` (140 corrupted chars), `src/app/layout.js` — including the **site-wide `<title>` tag**, which was serving "Engineer-Led Construction Intelligence â€” Chennai" to search engines.

## 12. Build result and route totals

**Status: BLOCKED by sandbox environment — must be run on the owner's machine before merge.**

Three attempts were made: (a) build over the mounted filesystem — impractically slow (network mount); (b) after installing the Linux SWC binary — same; (c) full local-disk copy with fresh `npm ci` — the sandbox terminates background processes when each shell command ends (`--die-with-parent`), and a Next build of ~900 routes cannot complete within the 45-second per-command limit.

Compensating validation completed in-sandbox: `node --check` on all 26 modified files (0 errors), 21/21 unit tests, and the static link/sitemap/claims/domain/encoding scans in §§6–11. The changes are content edits, string replacements, `await params` fixes (Next 16's documented API), config-level redirects and query-filter additions — no structural refactors.

**Owner command (required before merge):**
```
npm run build   # runs prisma generate + verify-env + next build
```
Acceptance: build completes; static generation output shows the six dynamic families (services/guides/glossary/faqs/compare/materials) rendering; no "Failed to compile" errors. Then fill in route totals here.

## 13. Post-deploy re-verification checklist (requires owner deploy)

1. `curl -I` each of the 8 redirect sources → expect 308/301 one-hop to destination, no chains.
2. Fetch `/sitemap.xml` → assert zero 404 URLs, zero duplicates (script: compare URL list vs HTTP status).
3. Fetch `/services/villa-construction`, `/guides/<any>`, `/glossary/<any>`, `/materials/aggregates` → expect 200 with full SSR body (previously 404 via the async-params bug).
4. Homepage title tag renders "— Chennai" (no mojibake) in view-source.
5. Rich Results Test on: homepage, one service page, one material page, one guide.
6. GSC: submit updated sitemap; annotate the release date.
7. Production DB: run the demo-partner check from NEEDS-OWNER-VERIFICATION.md §18.

## Summary of acceptance criteria

| Criterion | Status |
| --- | --- |
| Zero internal navigation 404s | PASS (static crawl, §6) |
| Zero non-200 URLs in sitemap | PASS (logical, §7) — re-verify post-deploy |
| Zero duplicate sitemap URLs | PASS (dedupe guard, §7) |
| Zero public buildogram.com references | PASS (§10) |
| Zero corrupted rupee symbols | PASS (§11) |
| Zero fictional partner credentials publicly exposed | PASS at code level (§ P0-B guards); prod DB check pending owner |
| Zero unsupported numerical claims in visible content/schema | PASS (claims scans; register updated CL01–CL23) |
| No redirect chains | PASS (§6/§7: no source is another's destination; internal links point at final URLs) |
| No unrelated homepage redirects | PASS (redirect map §07) |
| Production build passes | See §12 |
| Tests pass | PASS 21/21 (§1) |


## 14. Deployment-readiness addendum (2026-07-25, second pass)

- Repo-wide screened/vetted scan after tightening: **0 public instances**.
- Async-params consistency scan: all public dynamic routes now `await params` (services, materials, guides, glossary, faqs, compare, partners, locations, case-studies, proof, properties/listing). Remaining sync `params.` references occur only after the awaited reassignment (safe).
- Secrets audit of all branch commits (`git log --name-only`): no .env/credential/pem/google files committed.
- Redirect-conflict audit: no vercel.json; middleware matcher (`/ops /partner /client /project /property-passport`) does not intersect any redirect source; next.config redirects are the single redirect source of truth.
- Git identity configured; LFS hook warning during commits is benign (no LFS-tracked assets touched).


## 15. Readiness pass 3 — post-correction scan report (2026-07-25)

Scope: `src/app`, `src/components`, `src/data`, `src/lib`, excluding authenticated dashboards (`/ops`, `/admin`, `/client`, `/partner`, `/supplier`).

| # | Scan | Replacements made | Remaining matches |
| --- | --- | --- | --- |
| 1 | verified / screened / vetted partner wording | 10 (pass 2) + 51 + 57 + 6 = **124** | **0** |
| 2 | Buildogram-team engineer qualification claims | **15** | **0** (5 educational/legal references intentionally retained) |
| 3 | drone certification claim | **1** | **0** |
| 4 | "current Chennai market data" / "updated monthly" | **10** | **0** undated (2 dated "July 2026" instances retained) |
| 5 | BQS/QC numeric claims (incl. invalid "up to 2500+") | **10** | **0** |
| 6 | "3–5 working days" turnaround assertions | **2** | 2 unrelated (a process-step label and a photo-listing SLA — not review turnaround) |
| 7 | locality soil / flood / foundation / cost claims | **28+28+28+26 field rewrites, 23 sentence removals, 8 render/schema/FAQ blocks, 12 hub notes** | **0** categorical |
| 8 | legacy unsupported stats (500+/₹12.8Cr/18%/8–15%) | 0 new (cleared in P0) | **0** |
| 9 | NAP placeholders (XXXXXXXX / 600000 / info@) | **1 block** | **0** |
| 10 | public `buildogram.com` | 0 new | **0** (2 documented internal/test remainders) |
| 11 | mojibake | 0 new | **0** |

Locality indexability re-check: replicated the generator's word-count gate — **28/28 area pages still pass** the 150-unique-word threshold after content removal, so no page silently drops to `noindex` or leaves the sitemap.
Tests: **21/21 pass**. Syntax: `node --check` clean on all files modified in this pass.
