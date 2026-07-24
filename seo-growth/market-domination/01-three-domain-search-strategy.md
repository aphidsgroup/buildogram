# 01 — Three-Domain Search Strategy (role definition only)

Date: 2026-07-25 · **Status: role architecture defined; keyword/URL work withheld pending Phase 0 gates (see `00-phase0-gate-status.md`)**

This document defines *ownership boundaries only*. It deliberately contains no keyword universe, no locality ontology and no page-eligibility scoring, because Part 1.1 blocks expansion until P0 is deployed and verified, and Part 2.5 forbids inferring metrics when first-party data is obtainable but not yet connected.

## 1. Domain ownership boundaries

| Intent family | Owner | Supporting role for the other two |
| --- | --- | --- |
| Planning, design review, estimation, BOQ, quotation audit | **Buildogram** | Portals link out for buyer/tenant decision support |
| Construction execution, PMC, supervision, quality inspection | **Buildogram** | — |
| Structural audit, diagnostics, NDT, retrofitting | **Buildogram** | Realprop links for pre-purchase inspection; Tolet Board for pre-lease condition checks |
| Soil, survey, geotechnical, piling | **Buildogram** | — |
| Renovation, interiors, maintenance | **Buildogram** | Tolet Board → rent-ready improvement; Realprop → post-purchase renovation |
| Construction materials | **Buildogram** | — |
| Construction professionals directory | **Buildogram** | — |
| Property **rent / lease** discovery | **Tolet Board Chennai** | Buildogram links out contextually; must not host rental inventory |
| Property **sale / purchase** discovery | **Realprop Realty** | Buildogram links out contextually; must not host sale inventory |
| 360° tours | **Both portals**, each for its own transaction type | Buildogram may explain the standard, not host tours |
| Property due diligence & documentation (Property Passport) | **Buildogram** | Both portals refer inbound |

**Conflict rule:** if a query's dominant intent is *to transact on a property*, it belongs to a portal. If the dominant intent is *to build, assess, cost, improve or document a property*, it belongs to Buildogram. Queries that read as both (e.g. "old house inspection before buying Chennai") belong to Buildogram, with the portal linked as the discovery step.

## 2. Cross-domain rules (from Part 3.4) — to be enforced when work begins

- Contextual, branded anchors only; **no sitewide exact-match link blocks** between the three domains.
- **No cross-domain canonicals.** No `sameAs` between the brands unless they are legally the same organisation — currently **unconfirmed**, so `sameAs` must not be used yet.
- **No duplicated property descriptions across domains** — ⚠️ currently **violated in practice**: the same nine-plus listings appear on both portals (see `00-…md` PF-2). This must be resolved before any cross-linking is added, or the link architecture will amplify a duplication problem.
- Separate sitemaps, Search Console properties and GA4 properties per domain.
- Cross-domain journeys tracked with UTMs or first-party attribution; assisted conversions measured.
- Each domain must independently satisfy its user's intent — no domain may exist purely to funnel to another.

## 3. Intended lifecycle journeys (to implement after gates clear)

```
Realprop listing → 360° tour → Buildogram pre-purchase inspection → structural audit
                                    → renovation estimate → interiors → Property Passport
Tolet Board listing → 360° tour → enquiry → Buildogram rent-ready renovation → maintenance
Buildogram cost guide → BOQ review → contractor selection → supervision → handover documentation
Buildogram crack inspection → structural audit → NDT → repair/retrofitting
```

Each link must answer a real next question for the user, not merely pass traffic.

## 4. Deliverables deferred (and why)

`02`–`36` of the Part 22 list are **not** produced in this pass:

- `02-master-keyword-universe.csv`, `07-query-to-url-map.csv`, `08-page-eligibility-score.csv`, `20-aeo-geo-query-fanout.csv`, `21-ai-citation-benchmark.csv` — require GSC/GA4/Bing data and (optionally) DataForSEO. Producing them from intuition would breach Part 2.5 and Part 1.5 (every action needs a *current baseline*).
- `06-chennai-locality-master.csv` — requires an authoritative source for GCC zones/divisions, CMDA planning area, municipalities and panchayats, plus owner confirmation of the **real operating market**. Part 7 explicitly forbids an incomplete handwritten list; Part 1.3 forbids inferring service availability.
- `03/04/05` taxonomies — can be drafted from the repository's existing service, material and property data models *after* the P0 deployment is verified, so the taxonomy reflects the corrected content rather than the superseded wording.
- `16`–`19` page briefs — blocked behind the query-to-URL map by Part 19 gates 1–3.
- `12`/`13` portal information architecture — blocked behind the portal data-integrity gates (PF-1 to PF-5).

## 5. Immediate observation carried forward to Phase 1

Buildogram's existing cannibalisation map (`../05-cannibalisation-map.csv`, 14 groups) already documents the largest architectural problem: three parallel page systems competing for the same commercial intents. The Part 9 "one canonical owner page per intent" work should **start from that map**, not from a blank sheet — it is the highest-value architecture work available the moment Phase 0 clears.
