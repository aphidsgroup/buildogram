# 52 — Phase 1C Evidence Report

**RESEARCH-ONLY — NO PUBLICATION OR IMPLEMENTATION AUTHORISED**

Date: 2026-07-25 · Base commit: `4c4854f` · Scope: evidence-cap correction, universe pruning, deferred-task completion

## 1. Required metrics

| Metric | Value |
| --- | --- |
| Raw candidate queries | **6,080** |
| **Archived to `02a` (raw research)** | **5,803** |
| **Evidence-backed universe `02b`** | **277** |
| **Priority planning universe `02c`** | **243** |
| Observed GSC queries | **0** — not connected |
| Observed Bing queries | **0** — not connected |
| Customer-language queries | **0** — no CRM/enquiry data supplied |
| Autocomplete observations | **0** — no access |
| PAA observations | **0** — no access |
| SERP-validated queries | **0** — no captures possible |
| Mechanical combinations archived | 4,996 |
| Removed artefacts archived | 807 |
| Exact duplicates | 0 |
| Semantic duplicates | 215 |
| **Proven opportunities (85–100)** | **0** |
| **Strongly evidenced (70–84)** | **0** |
| **Validated research opportunities (55–69)** | **0** |
| **Plausible hypotheses (40–54)** | **205** |
| Weak / mechanical (20–39) | 5,068 |
| Remove (0–19) | 807 |
| Direct services (confirmed) | **0** |
| Direct services (software tools, operating) | 12 |
| Buildogram-managed (asserted, unconfirmed) | 9 |
| Partner-coordinated | 29 |
| Directory categories | 12 |
| Informational subjects | 12 |
| Planned, not operating | 53 |
| Unsupported until model confirmed | 53 |
| Subservices merged into parent | 3 |
| Validated localities | **0 of 161** |
| Locality source conflicts logged | 20 prioritised (incl. 4 dataset omissions) |
| Tamil queries by evidence type | 33 — **all expert hypothesis**, 0 observed |
| Tanglish queries by evidence type | 26 — **all expert hypothesis**, 0 observed |
| Verified competitor gaps | **0** |
| Rejected gap hypotheses | 2 |
| AEO/GEO questions | **480** (29 pillars × 16 types) — **all hypothesised**, 0 observed |
| Cross-domain property conflicts | 9 identical pairs |
| Demonstration records | 1 confirmed, 9 suspected |
| Materials-model dependencies | 2,506 queries; ~520 permitted today (education + calculators) |
| Owner decisions pending | **21** (OV01–OV21) |
| First-party-data dependencies | all 277 evidence-backed rows |

## 2. Score-model correction — before and after

| Old band | Count | → | New band (capped) | Count |
| --- | ---: | --- | --- | ---: |
| Strongly validated 80–100 | 150 | → | **Proven 85–100** | **0** |
| Useful 60–79 | 55 | → | **Strongly evidenced 70–84** | **0** |
| Hypothesis 40–59 | 72 | → | **Validated research 55–69** | **0** |
| Weak 20–39 | 4,996 | → | **Plausible hypothesis 40–54** | **205** |
| Remove 0–19 | 807 | → | Weak / mechanical 20–39 | 5,068 |
| | | | Remove 0–19 | 807 |

**Your correction was right:** with zero observed queries the ceiling is 49, so the previous "150 strongly validated" collapses to **zero**. Repository relevance now maps to *plausible hypothesis*, which is what it actually is.

## 3. The ten questions

**1. What does the actual Chennai search market appear to contain?** *Unknown.* No observed search data exists in this programme. Anything I said about the market's shape was inference from business terminology, not measurement.

**2. What did the generator invent?** 4,996 mechanical seed×modifier and seed×locality combinations, plus 807 template artefacts — 95% of the original universe, now archived in `02a` and excluded from planning.

**3. Which queries are evidenced?** None by search data. 205 have repository/business evidence, 72 are expert hypotheses, 59 are language hypotheses. That is the honest total.

**4. Which services can Buildogram legitimately market?** Today: the 12 software tools, and informational content across all segments. Everything else — 53 planned, 53 unsupported, 29 coordinated, 9 managed — waits on OV01. Zero services are confirmed as directly delivered.

**5. Which locality opportunities are real?** Unknown — 0 of 161 are source-validated and 0 have search-behaviour evidence. Four localities you identified (Pammal, Sembakkam, Mangadu, Kilambakkam) are missing from the dataset entirely.

**6. Which domain owns each major intent?** This is settled and defensible: transaction intent → portals; assess/cost/improve/document intent → Buildogram; the property-ecosystem hub bridges them. It is the strongest output of the whole programme because it depends on business logic, not search data.

**7. Which existing pages should eventually be strengthened?** 18 of 30 clusters point at existing pages — the consolidation groups (construction company, house construction, BOQ review, structural audit, materials legacy duplicates) are the highest-value work and need no new URLs.

**8. Which new pages may genuinely be required?** Only four candidates survive: the property-ecosystem hub (QC26, strongest), an approvals tracker (QC21), a cost monitor (QC19 — owner-gated), and a 360° tour standard (QC25 — gated on OV03). Everything else is improvement or consolidation.

**9. Which content should not be created?** Locality-service pages at scale (QC27 — 616 potential pages, no evidence), empty property locality hubs (QC28), Tanglish keyword pages (QC29 — target via natural phrasing instead), and any materials commercial page until OV02 is answered.

**10. What evidence is still missing?** GSC/Bing/GA4/CRM (all four), 68+ SERP captures, autocomplete/PAA, Tamil fluent review, 161 locality source validations, portal database access, and 21 owner decisions.

## 4. What this environment could not do

GSC, Bing, GA4, CRM, autocomplete, PAA, Chennai-localised SERP capture, TN gazette/GCC/CMDA/India Post lookups, Tamil community language capture, portal database access. Files `42`, `45`, `46`, `47`, `48` are **ingestion templates with export instructions, not datasets**. `49` enumerates all 161 localities with the 10 modifier forms to test but every classification reads `INSUFFICIENT EVIDENCE`. Nothing was simulated.

## 5. Recommended next phase

**Do not start Phase 2.** The blocking sequence is unchanged and now quantified:

1. **GSC for three domains** — converts 0 observed queries into a real number and will surface intents no generator produces.
2. **OV01 + OV02** — unblocks 106 unsupported/planned service rows and ~1,900 materials queries.
3. **68 SERP captures** — converts 7 hypotheses into confirmed gaps or rejections.
4. **20 locality source validations** + add the 4 missing localities.
5. **Fluent Tamil reviewer** — 59 language rows.
6. **Portal data access** — 9 duplicate pairs + the test record.

Only after 1–3 can a defensible priority model or top-100 list exist. Attempting one now would reproduce exactly the error this phase corrected.
