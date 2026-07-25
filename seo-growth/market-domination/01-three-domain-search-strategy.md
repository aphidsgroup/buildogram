# 01 — Three-Domain Search Strategy (revised)

> **Revision 4 (Phase 1C):** active planning universe reduced from 5,273 to **277 evidence-backed / 243 priority** rows; 5,803 archived. **0 queries carry observed search evidence**, so no cluster may be labelled strongly validated. Domain-ownership model below is unchanged and remains the most defensible output of the programme.

**RESEARCH-ONLY — NO PUBLICATION OR IMPLEMENTATION AUTHORISED**

Date: 2026-07-25 · Revision 3 (Phase 1B) — see `44-market-intelligence-validation-report.md`: the Phase 1A cost-index claim was factually wrong and is withdrawn; the BOQ gap claim is withdrawn pending SERP evidence; 0 of 161 localities are source-validated; 0 queries are observed in real search data.

Date: 2026-07-25 · Revision 2 — incorporates the owner's five strategic corrections · Stage: **Phase 1A — Read-Only Market Intelligence**

## 1. Scope of this stage

Permitted and performed: repository analysis, live crawls of all three domains, competitor structure research, keyword discovery, taxonomies, Chennai locality ontology, intent clustering, duplicate/overlap identification, provisional URL recommendations, AEO/GEO fan-out, evidence-gap identification.

Not performed: production changes, redirects, publication, indexable page creation, canonical changes, sitemap changes, schema deployment, deployment, programmatic locality-service generation, and any final delete/merge/redirect/indexability decision.

## 2. Core ownership rule

**Property *transaction* intent → the relevant portal. Construction, assessment, improvement, costing and documentation intent → Buildogram.**

Tie-break for mixed queries: if the user's next action is *to view or transact on a specific property*, the portal owns it. If the next action is *to assess, cost, improve or document* a property, Buildogram owns it.

## 3. Correction 1 — Buildogram owns a property-ecosystem hub

Buildogram gets **one central property-lifecycle hub** (proposed, not created). It explains and routes, and hosts **no listing inventory**:

- Discover rental and lease properties → Tolet Board Chennai
- Discover sale properties → Realprop Realty
- Explore 360° property tours → portals
- Pre-purchase inspection · structural/condition assessment → Buildogram
- Renovation planning · interiors estimation → Buildogram
- Construction on acquired land → Buildogram
- Property Passport documentation → Buildogram

Mapped in `07-query-to-url-map.csv` as cluster **QC26**; the twelve supporting queries are in `02-master-keyword-universe.csv` under `property-lifecycle`. The hub is the single highest-value cross-domain asset because no local competitor connects the two halves of the lifecycle (see `10-…md` §2.7).

## 4. Correction 2 — refined 360° tour boundary

| Asset | Owner | Condition |
| --- | --- | --- |
| Individual property listing pages | Relevant portal | — |
| Individual 360° tour pages | Relevant portal | — |
| 360° tour **ecosystem overview** | Buildogram | — |
| 360° tour **quality & accessibility standard** | Buildogram | Original-research asset (Part 11) |
| Buyer / tenant / landlord / seller **education** on using tours | Buildogram | — |
| A tour **service page** (production/coordination) | Buildogram | **Only if the owner confirms Buildogram genuinely produces or coordinates tours** — register `OV03`. Not asserted until then. |

## 5. Correction 3 — duplicate listings are conditional, not prohibited

A property may legitimately appear on both portals **when it is genuinely available for both rent and sale**. In that case each page must:

- target its own transaction intent (rent/lease vs sale/purchase);
- carry transaction-specific title, description, copy, price, availability and CTA;
- be **self-canonical** (never cross-domain canonical);
- carry independently verified, timestamped availability;
- use structured data matching that transaction;
- avoid identical property descriptions.

If a property is available under only one transaction type, it belongs on only one portal.

**Required classification of every currently duplicated listing** (from the crawl, the same nine-plus properties appear on both domains): `Legitimately available for rent and sale` · `Rent only` · `Sale only` · `Availability unconfirmed` · `Demonstration record` · `Expired` · `Duplicate requiring removal`. Registered as `OV08`/`OV09`. Note that one live record is literally titled **"Automated Test Property"**, which classifies as *Demonstration record* on sight.

## 6. Correction 4 — materials ownership must match the real model

The materials programme is **blocked at the keyword level**, not just the content level, until the owner confirms which model applies: direct seller · quotation aggregator · sourcing coordinator · supplier directory · price-information service · combination.

Consequences recorded in `04-material-taxonomy.csv` (every row carries `MODEL_UNCONFIRMED`) and `02-master-keyword-universe.csv` (374 material queries carry `business_model_confirmation = MATERIALS MODEL UNCONFIRMED`):

- "supplier", "dealer", "wholesale", "bulk order" keywords may **not** be targeted unless the model supports them.
- `Product` / `Offer` schema may **not** be used without a real visible purchasing or quotation process.
- Price queries are targetable **only** through a dated methodology asset (cluster QC19), never a standing rate.

## 7. Correction 5 — discovery proceeds with `PENDING_*` baselines

Every metric column in every dataset produced in this stage uses an explicit pending token — `PENDING_GSC`, `PENDING_GA4`, `PENDING_GBP`, `PENDING_BING`, `PENDING_VALIDATED_PROVIDER`, `NOT_YET_MEASURED`, `OWNER_CONFIRMATION_REQUIRED` — and **no numerical metric has been estimated or invented**. Discovery was not blocked by their absence; prioritisation is explicitly marked `PROVISIONAL — P0 AND DATA GATES PENDING` throughout.

## 8. Cross-domain rules (unchanged, enforced later)

Contextual branded anchors only; no sitewide exact-match link blocks; no cross-domain canonicals; no `sameAs` between brands until the legal relationship is confirmed (`OV15`); separate sitemaps, GSC and GA4 properties; UTM/first-party attribution for cross-domain enquiries; each domain must independently satisfy its user's intent.

## 9. Deliverables produced in this stage

`02` keyword universe · `03` service taxonomy · `04` material taxonomy · `05` property taxonomy · `06` Chennai locality master · `07` provisional query→format map · `10` competitor/SERP gap analysis · `20` AEO/GEO fan-out · `35` owner verification register · this document.

## 10. Still deferred (per owner instruction §9)

Final ranking-opportunity scores · final top-100 priority list · traffic and conversion forecasts · final URL deletion, redirect and indexability decisions · content publication · programmatic page generation · production implementation · digital PR outreach · GBP changes.
