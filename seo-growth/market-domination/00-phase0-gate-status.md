# 00 — Phase 0 Gate Status: Market-Domination Programme

Date: 2026-07-25 · Prepared before any expansion work, per **Part 1.1 (Complete P0 before expansion)**

## Verdict: PHASE 0 NOT SATISFIED — expansion work correctly withheld

Part 1.1 requires six conditions before market-expansion work begins. Verified status:

| # | Condition | Status | Evidence |
| --- | --- | --- | --- |
| 1 | P0 branch passes lint, tests, type check, production build | **NOT MET** | Tests 21/21 pass in sandbox; lint and build never executed anywhere (sandbox cannot; owner machine pending). Type check = N/A (JavaScript project, no `tsconfig.json`). |
| 2 | Vercel preview passes route/sitemap/canonical/content/claim validation | **NOT MET** | Preview never created — Vercel MCP token lacks access to team scope `aphidsgroup-3300s-projects` (403). |
| 3 | Owner confirms published NAP | **NOT MET** | NAP tabulated for sign-off in `../20-post-deployment-verification.md` §9; no confirmation received. |
| 4 | Production database verification completed read-only | **NOT MET** | No network route from this environment to Neon. Script ready (`../production-db-verification.sql`). |
| 5 | Approved P0 deployed and verified on production | **NOT MET** | Branch `seo/buildogram-organic-growth-system` is unmerged and undeployed. |
| 6 | Fresh production crawl confirms unsafe claims and broken routes resolved | **NOT MET** | Re-crawled 2026-07-25: `https://www.buildogram.in/guides/what-is-boq-in-construction` still returns **404**. Production is still running pre-P0 code. |

**Therefore:** no keyword universe, taxonomy, locality ontology, page-eligibility scoring or URL architecture has been produced in this pass. Building an authority programme on an unverified deployment is precisely what Part 1.1 prohibits. This document records what *was* safely established — brand-role confirmation from live crawls — and the new blockers discovered.

---

## What was completed safely (read-only, no expansion)

### Brand commercial roles — confirmed against live sites

| Domain | Live status | Observed role | Matches the brief? |
| --- | --- | --- | --- |
| `www.buildogram.in` | 200, pre-P0 code | Engineer-led construction services, materials, AI tools, partner directory, property passport | ✅ Yes |
| `www.toletboardchennai.in` | 200 | Chennai rent/lease listings, 360° tours, residential + commercial, WhatsApp/call CTAs (+91 93633 93324) | ✅ Yes |
| `www.realproprealty.com` | 200 | Chennai sale listings, 360° tours, residential + commercial, WhatsApp/call CTAs (+91 93603 93324) | ✅ Yes |

---

## BLOCKING FINDINGS discovered on the two property domains

These are new, were not in scope of the Buildogram P0, and must be resolved before either portal enters an authority programme. They fall under the same prohibitions the owner set for Buildogram (Part 1.3 "no unsupported claims", Part 1.4 "no fake project pages / fake listings", Part 13.1 "accurate availability").

### PF-1 — A literal test record is live and crawlable (CRITICAL)
`https://www.realproprealty.com/p/automated-test-property-1777531914985` — titled **"Automated Test Property"**, listed at ₹50L, 1200 sq ft, 2 BHK, and surfaced in the homepage "Recently Added" grid. A machine-generated test artefact is publicly indexable on a commercial property site.

### PF-2 — Both portals appear to share one identical, likely-seeded inventory (CRITICAL)
The same eight-plus properties appear on **both** domains, with the same names and specifications, one set priced as monthly rent and the same set priced as a sale:

| Property | Tolet Board (rent/lease) | Realprop (sale) |
| --- | --- | --- |
| 3BHK Sea View Apartment, ECR | ₹45K/mo | ₹1.2Cr |
| Premium 4BHK Penthouse, OMR | ₹95K, 3Y lease | ₹2.8Cr |
| 3BHK Premium Apartment, OMR | ₹35K/mo | ₹85L |
| Co-working Space, Nungambakkam | ₹50K, 2Y lease | ₹1.5Cr |
| Budget 2BHK, Chromepet | ₹14K/mo | ₹32L |
| Modern Office, Guindy | ₹85K, 3Y lease | ₹2.5Cr |
| Cozy Studio Apartment, Velachery | ₹12K/mo | ₹28L |
| Warehouse Space, Ambattur | ₹1.50L, 5Y lease | ₹4.5Cr |
| 2BHK Independent House, Tambaram | ₹18K/mo | ₹45L |

The round-number pricing, generic naming and perfect overlap match the seeded-demo pattern already found in Buildogram's `ops/seed-partners`. **If these are demo records, both sites are publishing fabricated property inventory with fabricated prices** — prohibited by Part 1.3 and Part 1.4, and a direct duplicate-content problem across two domains (Part 3.4 forbids duplicated property descriptions).

### PF-3 — Unverified technical-service claims on every Realprop listing
Each card advertises "Technical Services on Request: **Property Valuation · Legal Verification · Structural Auditing**". These are the same class of claim the owner has just spent three passes removing from Buildogram. They require: who performs them, under what qualification, and whether the service actually exists today.

### PF-4 — Realprop technical SEO is materially incomplete
Homepage emits **no canonical, no robots meta, no Open Graph/Twitter tags, no site-name metadata**; every listing page inspected inherits the generic homepage `<title>` and description ("Realprop Realty - 360° Property Tours") — i.e. **duplicate titles and descriptions across the entire listing corpus**, with no per-property metadata. Tolet Board is considerably better configured (canonical, robots, OG, per-listing anchors) but uses an obsolete `meta-keywords` tag.

### PF-5 — No 360° tour content is exposed to crawlers on the pages inspected
Listing pages render as near-empty documents to a non-JS fetch. If the tour and property detail are client-rendered only, none of it is indexable — which would nullify the entire "360° tours" search proposition (Part 13.2).

---

## Required before Phase 0 can be declared complete

**Buildogram (existing gates):**
1. `npm ci && npm run lint && npm test && npm run build` on the owner machine → record into `../19-test-and-validation-results.md` §16.
2. Create the protected Vercel preview (re-authenticate the team scope) → run `../preview-verification.sh`.
3. Confirm NAP (`../20-…md` §9).
4. Run read-only Sections A+B of `../production-db-verification.sql`.
5. Deploy to production and re-crawl.

**Property portals (new gates raised by this inspection):**
6. Confirm whether the shared inventory is real or seeded. If seeded: remove or noindex it on both domains before any SEO work — an authority programme built on fabricated listings is unrecoverable reputationally and violates Parts 1.3/1.4.
7. Delete/noindex `automated-test-property-1777531914985` and audit for other test records.
8. Confirm the Property Valuation / Legal Verification / Structural Auditing services exist and who is qualified to deliver them; otherwise remove the claim.
9. Confirm whether listing pages server-render their content and 360° tours.
10. Grant Search Console + GA4 access for all three domains (Part 2.5) — without first-party data, the keyword universe and eligibility scoring in Parts 4–9 would be guesswork, which Part 2.5 forbids.

## Tooling reality check (Part 2)

The `claude-seo`, `claude-blog`, `aaron-marketing-skills` plugins and `/seo` commands run in **interactive Claude Code**, not in this Cowork session — no claim is made here that any of them has been installed or executed. `geo-optimizer-skill` requires `uvx` and network egress unavailable here. Commands to run, in Claude Code:

```text
/plugin marketplace add AgriciDaniel/claude-seo
/plugin install claude-seo@agricidaniel-seo
/seo setup
/seo doctor
/seo audit https://www.buildogram.in
```
…then repeat the audit workflows for the two portal domains and import the reports into `seo-growth/market-domination/imported-reports/`.

## Recommendation

**Do not start Parts 4–24.** Clear gates 1–5 (Buildogram deployment) and gates 6–10 (portal data integrity and analytics access) first. Gates 6–8 are urgent independent of SEO: fabricated listings and a live "Automated Test Property" are publishing risks today, on two domains that are currently indexable.

Once gates clear, Phase 1 begins with the keyword universe and taxonomies built on real GSC data — not inferred volumes.
