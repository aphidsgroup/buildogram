# OV02-R1 — Materials Operating Model: **REVISION OPENED**

**RESEARCH-ONLY — NO PUBLICATION OR IMPLEMENTATION AUTHORISED**

**Revision opened:** 2026-07-26 · **Supersedes:** row 1 and row 8-adjacent scope of `OV02-materials-operating-model.md` (decided 2026-07-25)
**Status: NOT RESOLVED — the reversal is recorded, the operating detail is not.**

---

## 1. What changed

| | 2026-07-25 (OV02) | 2026-07-26 (OV02-R1) |
| --- | --- | --- |
| Direct seller | **Not selected** — "Buildogram does not sell materials under its own invoice or represent itself as stockist, dealer or seller." | **Selected** — owner states Buildogram does sell. |

Trigger: during banned-claim triage the owner instructed that category **C4 (seller language)** be skipped on the grounds that "Buildogram is both seller and facilitator." That directly reverses OV02 row 1, which was formally returned one day earlier.

The reversal is accepted as an owner declaration. **It is not yet usable**, because a seller model cannot be encoded without knowing what is sold and who carries liability.

---

## 2. Why this cannot be applied as-is

OV02 was not a wording preference. It determined, per material query and per page:

- **Keyword eligibility** — 136 queries are currently BLOCKED solely because Buildogram was not a seller (dealer, stockist, wholesaler, warehouse, delivery, bulk-order intents).
- **Schema eligibility** — `Product` / `Offer` / `AggregateOffer` markup is currently forbidden. A seller may emit it; a referrer emitting it is misrepresentation to Google and to users.
- **Liability allocation** — who registers and charges GST on the supply, who issues the tax invoice, who owns short-delivery and off-spec batches, who handles returns, and who the customer's claim lies against.
- **Regulatory surface** — a seller operating an online catalogue engages the Consumer Protection (E-Commerce) Rules 2020 duties that a pure referrer does not: seller identity disclosure, grievance officer, returns/refund policy, and country-of-origin where applicable.

Publishing seller-positioned pages against an undefined model creates exposure that no SEO gain offsets.

---

## 3. Required detail before OV02-R1 can be closed

| # | Question | Why it gates |
| --- | --- | --- |
| R1.1 | **Which material lines does Buildogram sell under its own invoice?** Enumerate. (Cement · TMT steel · M-sand/P-sand · bricks/AAC · RMC · waterproofing · electrical · plumbing · fabrication steel · piling · finishing) | Determines per-page wording and per-query unblocking. Almost certainly not uniform — RMC in particular is normally delivered and invoiced by the batching plant. |
| R1.2 | For each line sold: **who issues the tax invoice** — Buildogram or the supplier? | The invoicing entity is the seller in law, regardless of site copy. |
| R1.3 | For each line sold: **is Buildogram GST-registered for that supply**, and is the HSN/GST treatment set up? | A seller claim without registered supply is a compliance problem, not a copy problem. |
| R1.4 | **Who owns delivery** — commitment, timing, shortfall, damage in transit? | OV02 row 8 (logistics coordinator) was *not selected*. If Buildogram now sells, delivery responsibility must be restated explicitly. |
| R1.5 | **Who owns quality, warranty and returns** on sold material? | Governs whether "we supply", "guaranteed", MTC and test-certificate claims are permissible. |
| R1.6 | Is Buildogram an **authorised dealer or distributor** for any named brand? If yes, which, with documentary proof. | `src/app/api/ops/seed-partners/route.js` currently contains "Authorized Distributor". Unsupported, this is a false trade claim. |
| R1.7 | Does the **price-publishing restriction** still hold (dated indicative observations, never "live rates")? | A seller publishing its own prices is different from a referrer publishing observed market rates. |
| R1.8 | Does Buildogram hold **stock/inventory**, or is it drop-ship against a supplier? | Determines whether "in stock", "available", "stockist" language is ever permissible. |

---

## 4. Documents placed in revision-pending state

The following must not be treated as current until R1.1–R1.8 are answered:

| File | Affected content |
| --- | --- |
| `OV02-materials-operating-model.md` | Row 1 (direct seller), row 8 (logistics), the commercial-structure paragraph, and the 213/71/136 keyword split |
| `43-material-business-model-map.csv` | Every `permitted` / `blocked` flag derived from non-seller status |
| `53-buildogram-capability-ledger.csv` | Materials rows: performer, contracting party, invoicing party, liability, warranty, complaint handling |
| `56-phase1d-final-evidence-report.md` | §2 metrics row "Materials operating model"; §7 addendum table (213 / 71 / 136) |
| `02-master-keyword-universe.csv` | 136 rows blocked on seller grounds |

---

## 5. Interim rule in force

Until R1.1–R1.8 are answered:

- **No materials commercial page may be created, expanded or re-positioned.**
- **No `Product` / `Offer` schema may be emitted.**
- **No new seller-facing copy may be added.** Existing C4 strings ("we supply", "we deliver", "Buy Materials", "Authorized Distributor") remain live per owner instruction, and are recorded here as **accepted risk pending R1**, not as verified claims.
- The 136 blocked queries stay blocked. Unblocking them requires a closed R1, not a declaration.

---

## 6. Provenance

| Field | Value |
| --- | --- |
| Original decision | OV02, owner-returned 2026-07-25, status RESOLVED |
| Reversal | Owner instruction 2026-07-26, during C2/C3/C6/C7 remediation |
| Reversal scope confirmed by owner | "Revise OV02 — Buildogram does sell" |
| Detail supplied | **NONE** — R1.1 through R1.8 all `OWNER_CONFIRMATION_REQUIRED` |
| Evidence supporting seller status | `NOT_PROVIDED` |
| This revision closes when | All eight R1 questions answered and `43`, `53`, `56`, `02` re-derived |
