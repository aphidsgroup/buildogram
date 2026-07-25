# 38 — Keyword Generation Quality Audit

**RESEARCH-ONLY — NO PUBLICATION OR IMPLEMENTATION AUTHORISED**

Date: 2026-07-25 · Phase 1B · Subject: the 6,080-row `02-master-keyword-universe.csv` produced in Phase 1A

## 1. How the 6,080 rows were actually produced — full disclosure

I wrote the generator, so this is not an estimate. The universe came from four mechanisms:

| Mechanism | Rows | What it means |
| --- | --- | --- |
| **Repository terminology** — seeds lifted from `data/services.js`, `data/seo/*`, live navigation, and the two portals' category pages | **205** | `VALIDATED SEARCH VARIANT` — these are head terms the business already uses and that appear in live navigation. Still **not** SERP-validated. |
| **Generated combination** — seed × 26 service modifiers, seed × 10 material modifiers, seed × 70 localities | **4,996** | `MECHANICAL COMBINATION`. **A generated combination is not evidence that anyone searches it.** |
| **Expert hypothesis / language research** — hand-written question forms, property-lifecycle queries, Tamil, Tanglish | **72** | `PLAUSIBLE RESEARCH HYPOTHESIS` |
| **Template artefacts** — strings my expansion produced that no human would type (e.g. "… vs alternative chennai", "… scope chennai") | **807** | `UNNATURAL OR LOW-VALUE` → removed from the active universe |

**Conclusion: 6,080 was never a market-size figure.** Only **205 rows (3.4%)** have any provenance stronger than my own combinatorics, and even those are unvalidated against a SERP.

## 2. Validation results

| Measure | Count |
| --- | --- |
| Original candidate queries | 6,080 |
| Exact duplicates | 0 (deduplicated at generation) |
| **Semantic duplicate rows** (differ only by stop-words/word order) | **215** |
| **Unnatural / template artefacts** | **807** |
| **Removed from active universe** | **807** |
| **Active universe after audit** | **5,273** |
| — of which mechanically generated | 4,996 (94.7% of the active set) |

### Validation-score bands (no guessed volume used)

| Band | Count | Interpretation |
| --- | --- | --- |
| 80–100 Strongly validated | **150** | Repository-sourced head terms with an existing page and clear intent |
| 60–79 Useful, more data needed | **55** | Repository-sourced, page or model gap |
| 40–59 Research hypothesis | **72** | Hand-written questions, Tamil, Tanglish, lifecycle |
| 20–39 Weak / mechanical | **4,996** | Combinatorial expansion — capped at 39 by rule |
| 0–19 Remove | **807** | Template artefacts |

**The honest headline: roughly 205 queries are currently defensible, ~277 are worth planning around, and the remaining ~5,000 are hypotheses awaiting autocomplete/PAA/SERP or GSC evidence.** Your instinct — that a validated 2,000 beats a mechanical 20,000 — is correct, and the current dataset is on the wrong side of that line until validation runs.

## 3. Deep cluster structure now applied

The flat 30-cluster structure has been replaced with a six-level hierarchy on every row (`pillar → segment → service_family → intent_cluster → sub_intent → query`):

| Level | Count |
| --- | --- |
| Pillars | **12** |
| Segments | **15** |
| Service families | **15** |
| Intent clusters | **17** |
| **Sub-intents** | **51** |

Sub-intents now separate the materially different needs you listed rather than grouping by noun: *Provider seeking · Independent-consultant seeking · Price discovery · Self-serve estimation · Quotation request · Checklist seeking · Learning/definition · Comparison · Proximity search · Supplier seeking · Assessment seeking · Rental property seeking · Sale property seeking · Virtual tour seeking · Provider shortlisting · General service interest*.

## 4. What could NOT be done in this environment — and what it blocks

| Required | Status | Blocks |
| --- | --- | --- |
| Google autocomplete capture | **NOT PERFORMED** — no autocomplete API access here | Promoting hypotheses to validated variants |
| People Also Ask / Related searches | **NOT PERFORMED** | Same |
| Chennai-localised SERP capture (mobile + desktop, en/ta, dated) | **NOT PERFORMED** | Every `serp_*` column is `NOT_PERFORMED`; competitor-gap confirmation |
| Google Trends | **NOT PERFORMED** | Seasonality, relative demand |
| GSC / Bing query data | **NOT CONNECTED** | The only source of *observed* queries |
| DataForSEO | **NOT AUTHORISED** | Volume, CPC, difficulty, SERP features |

**Therefore the count of `OBSERVED SEARCH QUERY` rows is currently 0.** Not one query in this dataset has been observed in real search data. Every row is repository-derived, hypothesised or generated. That is the single most important correction to the Phase 1A report.

## 5. Recommended remediation sequence

1. **Connect GSC for all three domains** — instantly converts an unknown number of rows to `OBSERVED SEARCH QUERY` and reveals queries no combinatorial method would find.
2. **Run autocomplete + PAA capture** on the 205 validated head terms (not on 5,000 rows) — cheap, high-yield, promotes real variants.
3. **Delete the 807 artefacts** from the active universe permanently.
4. **Collapse the 215 semantic duplicates** into their canonical form.
5. **Re-score only what survives** — target a validated core of roughly 1,500–2,500 queries rather than defending 6,080.
6. **Treat the 4,996 mechanical rows as a coverage checklist, not a target list** — they are useful to confirm no intent is missing, not to justify pages.
