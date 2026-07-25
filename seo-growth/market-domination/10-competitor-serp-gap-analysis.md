# 10 — Competitor & SERP Gap Analysis (PROVISIONAL)

**RESEARCH-ONLY — NO PUBLICATION OR IMPLEMENTATION AUTHORISED**

## ⚠️ PHASE 1B CORRECTION — two Phase 1A claims were wrong or unproven

**CORRECTION 1 (factual error).** Phase 1A stated: *"No dated, methodology-backed Chennai construction cost index exists publicly."* **This was incorrect and is withdrawn.** The Tamil Nadu Department of Economics and Statistics publishes a **Building Construction Cost Index (BCCI) that includes a Chennai centre index**, with quarterly change reported (owner-supplied reference: DES BCCI as at 30.06.2024, published 2025 — `des.tn.gov.in`). An official index exists and must be acknowledged, cited and used as a reference point.

The opportunity is therefore restated:

> There is an opportunity to create a homeowner- and project-level Chennai construction cost intelligence product that **complements** official index data by explaining scope, specifications, building type, procurement assumptions and real project applications.

**Buildogram must not call its own publication an official index.** Permitted product names: *Buildogram Chennai Construction Cost Monitor* · *Buildogram Chennai Residential Cost Benchmark* · *Buildogram Chennai Material Price Monitor*. The word "index" may be used **only** if the methodology genuinely supports statistical indexing over time (base period, fixed basket, weighting, revision policy).

Cost-data landscape that must be distinguished in any published work — these are different things and conflating them is a claim error:

| Source type | What it is | Buildogram's relationship |
| --- | --- | --- |
| TN DES Building Construction Cost Index | Official statistical index, Chennai centre | Cite as reference; never imitate the name |
| Wholesale / commodity price indicators | Input commodity movements | Context only |
| Schedule of Rates (SoR) | Government tendering rates | Reference; not market price |
| PWD rates | Public works rates | Reference; not private-market price |
| Market quotation observations | Dated supplier quotes | Buildogram's own potential dataset |
| Contractor package rates | Per-sqft turnkey offers | Buildogram's own potential dataset |
| Project-level BOQ cost data | Line-item actuals | Buildogram's strongest differentiator |
| Material dealer quotations | Dated dealer prices | Requires supplier panel |
| Labour observations | Trade rates | Requires collection method |
| Property-development cost data | Developer economics | Out of scope for now |

**Methodology proposal (required before any figure is published):** base period · basket definition · material categories · labour categories · weighting · geography · supplier sample and size · observation frequency · outlier handling · GST treatment · transport treatment · brand and grade normalisation · revision policy · stated limitations. Until every one of these is defined and populated, no Buildogram cost figure may be published.

**CORRECTION 2 (unproven claim).** Phase 1A stated that BOQ auditing has *"almost no dedicated Chennai content"*. That was narrative judgement, not evidence — and it is **contradicted in part by Buildogram's own inventory**, which already has a dedicated `/contractor-quote-review-chennai` page, plus at least one other Chennai-focused BOQ provider appearing in search per the owner. The claim is **withdrawn pending a reproducible SERP sample** (`42-serp-evidence-sample.csv`, currently unpopulated — 17 priority queries × 2 languages × 2 devices = 68 captures required).

**Every gap hypothesis in §2 below is now classified `INSUFFICIENT EVIDENCE` until that file is populated.** No gap conclusion in this document may be used to justify a page.

---

Date: 2026-07-25 · Method: repository inspection + live crawls of the three owned domains + structural analysis of the Chennai construction/property search market. **No competitor traffic, ranking, backlink or volume figure appears in this document** — none has been measured. All such fields are `PENDING_VALIDATED_PROVIDER` / `PENDING_GSC`.

## 1. Competitor classes (structural, not ranked)

| Class | Who occupies it | Why they win today | Buildogram's structural counter |
| --- | --- | --- | --- |
| **Direct commercial** | Chennai design-and-build firms, turnkey contractors, PMC consultancies | Portfolio photography, completed-project proof, referrals | Owner-side independence — a position none of them can occupy without a conflict of interest |
| **Search competitors (aggregators)** | National lead marketplaces and contractor-matching platforms | Domain authority, enormous page inventory, city×service coverage | They cannot publish *engineering judgement*; they monetise lead resale. Buildogram's `why-vs-aggregators` page is the right instinct but currently thin |
| **Local-pack competitors** | GBP-listed contractors, architects, surveyors, testing labs | Physical presence, review volume, category fit | Requires legitimate GBP optimisation + real reviews; blocked until GBP access |
| **Publisher / informational** | Construction blogs, cost-calculator sites, YouTube channels, real-estate portals' guide sections | Volume of informational content; already cited in AI answers | Buildogram's guides + calculators + AI tools are the closest existing asset; needs evidence and expert attribution to out-cite them |
| **Marketplace** | Material marketplaces, B2B suppliers | Product catalogues, price pages | **Blocked** until the materials business model is confirmed (OV02) — cannot compete on supplier/dealer keywords without the model |
| **Material suppliers** | Cement/steel/RMC dealers and their dealer-locator pages | Brand association, dealer networks | Citation partnership opportunity (dealer pages linking to Buildogram guides) rather than head-on competition |
| **Property portals** | National property portals; local Chennai agents | Inventory scale, brand recall | Tolet Board / Realprop cannot beat inventory scale — the differentiator must be 360° tours + verified availability + the construction-intelligence bridge |
| **AI-citation competitors** | Whoever AI assistants currently cite for "construction cost Chennai", "BOQ review", "structural audit Chennai" | Structured, extractable, sourced answers | **Unmeasured** — the `21-ai-citation-benchmark.csv` baseline must be captured before claiming any position |

## 2. Structural gaps observable without competitor metrics

These are gaps in *content type*, verifiable from the market's page inventory rather than from traffic data:

1. **[WITHDRAWN PENDING EVIDENCE]** Hypothesis: owner-side BOQ/quote auditing is under-served in Chennai. Buildogram already ranks a dedicated page for this intent and at least one other Chennai BOQ provider exists, so the category is **not** empty. Reclassified `INSUFFICIENT EVIDENCE`; requires the SERP sample before any strategic weight is placed on it.
2. **[REVISED — see correction above]** An official TN DES Building Construction Cost Index exists for the Chennai centre. The observed gap is different: *project-level, scope-explicit, homeowner-facing* cost intelligence that translates index movement into what a specific build will actually cost. `INSUFFICIENT EVIDENCE` until SERP sample confirms how competitors currently answer these queries.
3. **Structural audit content is service-brochure shallow.** Scope, test-selection logic, report contents and *limitations* are rarely explained. Answer engines reward exactly that specificity.
4. **Approval/regulatory content (CMDA/GCC/DTCP) is fragmented and undated.** A maintained, source-cited approvals tracker with last-verified dates is a durable authority asset.
5. **Property tours are marketed as a feature, not explained as a decision tool.** Nobody publishes "what a 360° tour cannot show you". That honesty angle is citation-friendly and differentiating.
6. **Tamil/Tanglish technical construction content is close to absent**, while a large share of the audience searches that way. Opportunity is real but gated on a fluent reviewer (OV16).
7. **Property + construction lifecycle is not connected by anyone locally.** Portals stop at the listing; contractors start at the contract. The gap between "I bought/rented this" and "now what do I fix" is unowned — and is exactly what the three-domain ecosystem can own.

## 3. Buildogram's own competitive liabilities (from the P0/P1 work)

Recorded here so the gap analysis is honest in both directions:

- Three parallel page systems cannibalising the core commercial intents (14 documented groups) — a competitor with one clean page per intent beats three split ones.
- Several flagship pages are thin in server-rendered body (`/structural-audit-chennai` renders H1 → FAQ).
- No published proof assets yet (engineer profiles, report samples, case studies), which is precisely what both Google's reviews systems and AI assistants use to decide who to cite.
- Portal inventory integrity is unconfirmed and includes a live "Automated Test Property".

## 4. What must be measured before this document becomes actionable

| Field | Source | Status |
| --- | --- | --- |
| Competitor ranking positions per cluster | DataForSEO / manual SERP capture (dated, Chennai-localised, mobile+desktop) | `PENDING_VALIDATED_PROVIDER` |
| SERP feature presence (local pack, AIO, PAA) | Same | `PENDING_VALIDATED_PROVIDER` |
| Buildogram current positions | GSC | `PENDING_GSC` |
| Backlink gaps | Provider | `PENDING_VALIDATED_PROVIDER` |
| AI citation share | `21-ai-citation-benchmark.csv` prompt runs | `NOT_YET_MEASURED` |
| Local pack visibility | GBP + local grid | `PENDING_GBP` |

**Do not infer that a competitor is strong because it ranks for one query** — that inference is explicitly prohibited and no such inference is made here.

## 5. Gap classification status (Phase 1B)

Every hypothesis in §2 now carries one of the owner's classifications. Current state:

| Hypothesis | Classification |
| --- | --- |
| BOQ/quote auditing under-served | **INSUFFICIENT EVIDENCE** (withdrawn — competitor exists) |
| Project-level cost intelligence gap | **INSUFFICIENT EVIDENCE** (official index exists; different gap) |
| Structural audit content shallow | **INSUFFICIENT EVIDENCE** |
| Approvals content fragmented/undated | **INSUFFICIENT EVIDENCE** |
| 360° tours marketed not explained | **INSUFFICIENT EVIDENCE** |
| Tamil/Tanglish technical content sparse | **INSUFFICIENT EVIDENCE** |
| Property–construction lifecycle unowned | **INSUFFICIENT EVIDENCE** |

**Confirmed gaps: 0. Rejected/withdrawn hypotheses: 2. Unproven hypotheses: 7.** No gap has been verified because no SERP sample has been collected in this environment.
