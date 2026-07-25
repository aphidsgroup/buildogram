# 44 — Market Intelligence Validation Report (Phase 1B)

> **SUPERSEDED IN PART BY PHASE 1C (`52-phase1c-evidence-report.md`).** The "150 strongly validated" and "5,273 active" figures below were corrected: with zero observed queries the score ceiling is 49, so **0 clusters are strongly validated**; the active planning universe is now **277 evidence-backed / 243 priority**, with 5,803 rows archived to `02a`.

**RESEARCH-ONLY — NO PUBLICATION OR IMPLEMENTATION AUTHORISED**

Date: 2026-07-25 · Verdict on Phase 1A: **a research skeleton, not validated market intelligence** — your assessment was correct on every point.

## 1. Required metrics

| Metric | Value |
| --- | --- |
| Original candidate-query count | **6,080** |
| **Validated active-query count** | **5,273** (but see the provenance breakdown — "active" ≠ "validated") |
| Queries removed from active universe | **807** |
| **Observed search queries** | **0** — no GSC, autocomplete, PAA or SERP source was available |
| Repository-derived variants | **205** |
| Expert hypotheses (incl. Tamil/Tanglish/questions) | **72** in `02` + 59 in the dedicated language files |
| **Mechanically generated combinations** | **4,996** (82% of the original universe) |
| Exact duplicates | **0** |
| Semantic duplicate rows | **215** |
| Natural-language failures (template artefacts) | **807** |
| English queries | 6,056 → 5,249 active |
| Tamil queries | 12 → **33** (`39-tamil-search-universe.csv`) |
| Tanglish queries | 12 → **26** (`40-tanglish-search-universe.csv`) |
| Validated locality count | **0 of 161** — no locality has yet been confirmed against a tier-1 source |
| Localities flagged for conflicting/uncertain administrative sources | **20 prioritised** (`41-locality-source-validation.csv`), incl. 3 dataset omissions to add |
| Direct services (confirmed) | **0** — every one of the 183 rows carries `OWNER_CONFIRMATION_REQUIRED` |
| Coordinated services (asserted, unconfirmed) | ~120 |
| Directory categories | 12 |
| Informational-only subjects | ~30 |
| Unsupported / must-not-market services | flagged per row, pending OV01 |
| **Verified competitor gaps** | **0** |
| **Rejected / withdrawn gap hypotheses** | **2** (BOQ under-served; "no cost index exists") |
| Unproven gap hypotheses | 7 |
| AEO/GEO question count | 72 (10 seeds) — **below requirement**; 29 pillars specified, 10 covered |
| Property duplication matches | **9 title-and-slug-identical pairs across both portals** |
| Demonstration/test property records | **1 confirmed** ("Automated Test Property"), 9 suspected |
| Strongly validated clusters (80–100) | **150 queries** |
| Weak / mechanical (20–39) | **4,996** |
| Remove (0–19) | **807** |
| Owner dependencies | **16** (OV01–OV16) |
| First-party-data dependencies | **all 5,273 active rows** |

## 2. Cluster depth — rebuilt

Flat 30 clusters replaced with a six-level hierarchy applied to every row:

| Level | Count |
| --- | --- |
| Pillars | 12 |
| Segments | 15 |
| Service families | 15 |
| Intent clusters | 17 |
| **Sub-intents** | **51** |

Sub-intents now separate provider-seeking from consultant-seeking, price discovery from calculator use, supplier seeking from product seeking, diagnosis from assessment, and property seeking from tour seeking — rather than grouping by shared noun.

## 3. The two corrections you raised

**Cost index — I was wrong.** TN DES publishes a Building Construction Cost Index including a Chennai centre. `10-…md` now opens with the withdrawal, restates the opportunity as a *complementary* project-level cost intelligence product, distinguishes ten different cost-data source types, forbids the word "index" unless the methodology supports statistical indexing, proposes three accurate product names, and lists the fourteen methodology elements required before any figure is published.

**BOQ gap — unproven and partly contradicted.** Buildogram already has `/contractor-quote-review-chennai`, and you note another Chennai BOQ provider in search. The claim is withdrawn; all seven remaining hypotheses are marked `INSUFFICIENT EVIDENCE`.

**Locality sourcing — your Tambaram/Avadi example is exactly right.** `41-locality-source-validation.csv` establishes a nine-tier source hierarchy (gazette/G.O. first, single webpage fields explicitly insufficient), prioritises 20 localities, and records that Avadi's own portal carries contradictory titling. Three omissions you identified — **Pammal, Sembakkam, Mangadu** — plus **Kilambakkam** are logged as `NOT IN DATASET — ADD after verification`.

## 4. What this environment could not do — and what it blocks

| Capability | Status | Blocks |
| --- | --- | --- |
| Google/Tamil autocomplete, PAA, Related searches | Not available | Promoting any hypothesis to a validated variant |
| Chennai-localised SERP capture (en/ta × mobile/desktop, dated) | Not available | All 7 remaining gap hypotheses; `42-serp-evidence-sample.csv` is a 68-capture template |
| GSC / GA4 / GBP / Bing | Not connected | The only source of *observed* queries; all baselines |
| DataForSEO | Not authorised | Volume, CPC, difficulty, SERP features |
| Tamil YouTube/community language capture | Not available | Tamil/Tanglish validation beyond expert hypothesis |
| Portal database / API | No access | Full property reconciliation by ID, image hash, tour ID |
| TN gazette / GCC / CMDA / India Post lookups | Not performed | All 161 locality confirmations |

I have not simulated any of these. Every corresponding field reads `NOT_PERFORMED`, `NOT_COLLECTED` or `PENDING_*`.

## 5. Honest verdict

The Phase 1A headline "6,080 queries" measured my own combinatorics, not the Chennai market. **The defensible core today is roughly 205 repository-derived head terms plus ~130 hand-written language and journey queries.** Everything else is a coverage checklist awaiting evidence.

The fastest path to genuine market intelligence, in order:

1. **Connect GSC for all three domains** — the only way to get observed queries, and it will surface intents no combinatorial method produces.
2. **Answer OV01 (service delivery model) and OV02 (materials model)** — 2,506 queries are commercially untargetable until then, and the service taxonomy cannot distinguish direct from coordinated services.
3. **Populate `42-serp-evidence-sample.csv`** (68 captures) — converts 7 hypotheses into confirmed gaps or rejections.
4. **Engage a fluent Tamil reviewer** — 59 language rows are hypotheses until reviewed.
5. **Run the locality source validation** on the 20 prioritised entries.
6. **Get portal data access** — resolve the 9 duplicate pairs and the confirmed test record.

## 6. Deliverables in this phase

Updated: `01`, `02` (25 new audit columns), `10` (corrections), `35`.
Created: `37-cross-domain-property-integrity.csv` · `38-keyword-generation-quality-audit.md` · `39-tamil-search-universe.csv` · `40-tanglish-search-universe.csv` · `41-locality-source-validation.csv` · `42-serp-evidence-sample.csv` · `43-material-business-model-map.csv` · this report.

Not done, and stated plainly: `03`/`04`/`05`/`06`/`07`/`20` were not re-audited row-by-row in this pass — the service taxonomy QC (your item 13), the AEO expansion to 29 pillars (item 10), the locality search-behaviour classification (item 6) and the new-page decision matrix (item 11) remain outstanding. They are the first tasks of any Phase 1C.

**Nothing was published, deployed, created as a page, redirected or schema-changed.**
