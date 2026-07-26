# Phase 2 — Search Growth Execution · CHANGELOG

## 2026-07-26 — Sprint 1 opened

### Code changes (pending build + deploy)

| File | Change | Reason |
| --- | --- | --- |
| `src/app/glossary/[term]/page.js` | Wired to `generateSEOMetadata()` | Emitted homepage OG on all 26 URLs |
| `src/app/faqs/[category]/page.js` | Wired to `generateSEOMetadata()` | No OG/Twitter |
| `src/app/compare/[slug]/page.js` | Wired to `generateSEOMetadata()` | No OG/Twitter |
| `src/app/materials/[slug]/page.js` | Wired to `generateSEOMetadata()` | No OG/Twitter |
| `src/app/guides/[slug]/page.js` | Wired to `generateSEOMetadata()` | Partial OG (no url, no image), no Twitter |
| `src/app/services/[slug]/page.js` | Wired to `generateSEOMetadata()` | Partial OG (no image), no Twitter |
| `src/app/proof/[slug]/page.js` | Wired to `generateSEOMetadata()` | Relative canonical -> absolute; no OG/Twitter |
| `src/app/materials/cement/page.js` | "today's live rate" -> "today's indicative rate" | "live price" prohibited unless the feed is genuinely live and timestamped |
| `src/app/materials/network/page.js` | "Vendor Vetting / We verify GST, dealership certificates" -> "Supplier Onboarding Checks / We request GST registration, dealership documentation and past-supply references before listing a supplier" | "vetted" prohibited; describes what is requested rather than claiming verification |
| `src/app/materials/network/page.js` | "Supplier Vetting / Authorized Dealer Verification" -> "Supplier Onboarding Checks / Dealership documentation requested" | Same |
| `tests/banned-claims.test.mjs` | Rewritten as three-tier guard | Replaces literal-substring list that produced uncountable, unactionable results |

No page bodies, slugs, canonical targets, sitemap entries or structured data were changed.

### Test suite

`tests/banned-claims.test.mjs` now enforces three tiers per owner policy:

- **HARD_FAIL** (build-breaking): Authorised/Official Distributor or Dealer, Guaranteed lowest price, Guaranteed delivery, Official market/Chennai price, "verified supplier/contractor/partner/builder/architect/professional", "Buildogram Verified", "verified, stress-free", vetted, hand-picked, "the best architect/builder/contractor", "live price/rate".
- **WARN (PENDING_R1)**: we deliver, same-day delivery, direct delivery, stock available, inventory available, wholesale supply, bulk supply. Printed, non-blocking, pending OV02-R1 §R1.4.
- **Allowed, not checked**: "our engineers" (OV01 in-house), "we supply" / seller language (OV02-R1), "free consultation" (C5).

Scope: public source only. Excluded: `src/app/{ops,admin,client,partner,supplier,project,api}`, `src/lib/{services,content}`, `src/lib/partnerStore.js`. Allowlist prevents legal disclaimers ("cannot be guaranteed" in `terms/page.js`) being flagged.

**Result: 2 tests, 2 pass. 0 hard failures, 4 PENDING_R1 warnings.**

Warnings currently printed:
- `src/app/materials/finishing-materials/page.js:8` — "direct delivery"
- `src/app/materials/piling-foundation-materials/page.js:8` — "direct delivery"
- `src/data/services.js:702` — "We deliver"
- `src/data/services.js:794` — "We deliver"

### Deliverables created

`00-current-growth-baseline.md` · `03-top-20-existing-page-opportunities.csv` (193 rows) · `06-cannibalisation-actions.csv` (16 candidate clusters) · `09-glossary-metadata-fix-report.md` · `10-sitemap-submission-report.md` · this file.

### Open items

| Item | Blocker |
| --- | --- |
| `01-gsc-query-page-opportunities.csv` | GSC export not supplied |
| `02-ga4-organic-conversion-baseline.csv` | GA4 export not supplied |
| `04-first-five-page-selection.md` | Requires 01 + 02 |
| `05-first-five-page-briefs/` | Requires 04 |
| `07-internal-link-actions.csv` | Requires 04 |
| `08-aeo-geo-improvement-map.csv` | Requires 04 |
| `11-preview-validation.md` | Requires build + preview deploy |
| `12-post-release-performance.md` | Requires 14 days post-submission |
| Sitemap submission to Google + Bing | No connector authorised; owner action, runbook in `10` |

### Risk noted, not actioned

`src/lib/partnerApi.js` falls back to `partnerStore.js` demo fixtures when the API is unavailable. Those fixtures contain "UltraTech Authorized Distributor" and "Tata Tiscon Authorized Dealer". P0 guards block `demo-*` from the directory, both APIs, profile pages and the sitemap, so this should be unreachable — but the fallback path has not been tested with the database down. Worth confirming before the next release.

---

## 2026-07-26 — Sprint 2

### Code changes (pending build + deploy)

| File | Change | Reason |
| --- | --- | --- |
| `src/app/Navbar.js` | `AI BOQ Calculator (Coming Soon)` -> `BOQ Calculator` | The calculator is fully built (968 lines + engine + APIs + tests). The label was the only defect. "AI" dropped — it is a deterministic rate engine, not a model. |
| `seo-growth/preview-verification.sh` | Added section 5 — route-specific metadata checks over 18 URLs | Verifies the metadata-helper rewiring on preview and production |
| `src/app/materials/finishing-materials/page.js` | Reverted | Uncommitted change was 12/12 lines of CRLF noise, zero real change |
| `src/app/materials/piling-foundation-materials/page.js` | Reverted | Same |

### Findings

**BOQ calculator is complete — Sprint 1's assessment was wrong.** Inferred from the nav label without reading the implementation. Decision recorded in `13-boq-calculator-decision.md`: Option A, keep indexed, five page-level follow-ups (highest: verify the "COCENA Dec 2025 rates" claim in its metadata).

**Seven `/materials/*` route collisions.** `cement`, `electrical`, `plumbing`, `sand`, `steel`, `tiles`, `waterproofing` exist as BOTH static directories and slugs in `src/data/seo/materials.js`. In the App Router the static segment always wins, so those seven dynamic entries never render — while the sitemap emits them from the dynamic list. Four of the static winners are thin stubs: `/materials/steel` (1.7 KB), `/materials/sand` (1.6 KB), `/materials/tiles` (1.6 KB), `/materials/bricks` (1.6 KB). This is a rendering defect, not a keyword decision. Recorded in `14-material-intent-map.csv`.

**`ready-mix-concrete` is both a generated slug and a redirect source.** Present in `seo/materials.js` and redirected to `/materials/rmc` in `next.config.mjs`. The sitemap already excludes it; the data entry should go too.

**`next.config.mjs` carries a dead `eslint` key.** Next 16 removed `next lint` and no longer reads it. Classification: fix before production, non-blocking.

**Line-ending noise recurred (third time).** Recommend `.gitattributes` with `*.js text eol=lf`.

### Test result

79 tests, 79 pass, 0 fail, 8 suites. Claim guard: 0 hard failures, 2 PENDING_R1 warnings (`We deliver` x2 in `src/data/services.js`).

### Could not run here

`next build` — Next 16 downloads `@next/swc-linux-x64-gnu` at build time and this sandbox has no route to `registry.npmjs.org`. Environment limit, not a code fault. Build, preview deploy, production promotion, sitemap submission and URL Inspection are all owner-machine actions.

### Deliverables

Created: `11-preview-validation.md` · `12-production-validation.md` · `13-boq-calculator-decision.md` · `14-material-intent-map.csv` (27 rows).
Renamed: `09-glossary-metadata-fix-report.md` -> `09-metadata-release-report.md`; `03-top-20-existing-page-opportunities.csv` -> `03-top-existing-page-opportunities.csv`.

### Still blocked on data

`01-gsc-query-page-opportunities.csv` · `02-ga4-organic-conversion-baseline.csv` · `04-first-five-page-selection.md` · `05-first-five-page-briefs/` · `07-internal-link-actions.csv` · `08-aeo-geo-improvement-map.csv`. No GSC/GA4/Bing connector is authorised and no export has been supplied. Nothing was estimated in their place.

---

## 2026-07-26 — Release gate evaluation

**VERDICT: NO-GO — INSUFFICIENT EVIDENCE.** No terminal output supplied; build, lint, test and `npm ci` results are `NOT_SUPPLIED`.

### Blocking discovery

The release instruction directs `git checkout seo/buildogram-organic-growth-system`. That branch is **6 commits behind** the working branch and building from it would restore the banned claims removed on 2026-07-26 ("Turnkey construction", "Direct from suppliers", "The best architects", "verified, stress-free") and drop the entire conversion system. It would also abort on, or discard, 12 uncommitted files carrying all of Sprint 1 and Sprint 2.

Correct branch to build: `feat/contextual-lead-conversion-system`. Full sequence in `12-production-validation.md`.

### Code changes

| File | Change |
| --- | --- |
| `seo-growth/preview-verification.sh` | Bypass-token hardening: accepts `VERCEL_PROTECTION_BYPASS` (preferred) or `BYPASS`; sent only as an `x-vercel-protection-bypass` header; never echoed (length only), never written to any `.tsv` via a `redact()` filter; never placed in a URL. Section 0's protection probe deliberately stays unauthenticated so the 401/403 assertion remains valid. |
| `seo-growth/preview-verification.sh` | **New section 6 — stale-cache detection.** Runs on production only. For 10 critical routes it fetches the bare canonical path and the same path with a random cache-bust query, then compares byte length and `og:url`. Status codes never revealed the two previous stale-HTML incidents; only a content comparison does. Emits `06-cache.tsv` and prints a purge instruction on any STALE row. |

Script is now 188 lines, sections 0-6, `bash -n` clean.

---

## 2026-07-26 — Release engineering pass 2

**VERDICT: NO-GO — INSUFFICIENT EVIDENCE.** Lint diagnostics not supplied; preview verification void and re-run pending.

| Commit | Contents |
| --- | --- |
| `eaebced` | Metadata across 7 families, tiered claim guard, BOQ calculator label, verifier sections 5-6 |
| `debab83` | Verifier auth-wall abort, xmllint/grep-P made optional, cross-platform test glob |
| `56b1522` | `next.config.mjs` dead `eslint` key removed; `COCENA Src` -> `Reference rate`; PDF header and disclaimer reworded |

Deleted `seo-growth/preview-results/*` — that run measured vercel.com's login page. Directory is gitignored.

Latest review: 94 tests pass, 0 fail, 8 suites; build passes with 1,082/1,082 static pages; repository lint remains blocked at 233 errors and 16 warnings. Claim guard: 0 hard failures, 4 PENDING_R1.
