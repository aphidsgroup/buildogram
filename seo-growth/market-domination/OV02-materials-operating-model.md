# OV02 — Materials Operating Model: **SUPERSEDED IN PART — REVISION OPEN**

> ⚠ **2026-07-26: row 1 (direct seller) was REVERSED by the owner.** Buildogram now states it does sell materials.
> The reversal is recorded in **`OV02-R1-materials-model-revision.md`** and is **not yet operable** — eight
> questions (R1.1–R1.8: which lines, who invoices, GST, delivery, warranty, dealer status, price publishing,
> inventory) are unanswered. Until R1 closes, the keyword split below (213 / 71 / 136), the schema
> prohibitions and the commercial-structure paragraph must be treated as **under revision, not current**.
> No materials commercial page, `Product`/`Offer` schema or new seller copy may be produced in the meantime.

**RESEARCH-ONLY — NO PUBLICATION OR IMPLEMENTATION AUTHORISED**
**Decision date:** 2026-07-25 · **Status: PARTIALLY SUPERSEDED 2026-07-26** (15 operational sub-confirmations remain open)

## Confirmed model

| # | Model | Decision | Operating limitation |
| - | --- | --- | --- |
| 1 | Direct seller | **Not selected** | Buildogram does not sell materials under its own invoice or represent itself as stockist, dealer or seller. |
| 2 | Material quotation collector | **Selected** | May collect and compare supplier quotations for customers. |
| 3 | Material sourcing coordinator | **Selected** | May coordinate sourcing within construction, renovation, BOQ or project-support engagements. |
| 4 | Procurement consultant | **Selected** | May advise on specifications, brands, grades, quotation comparison, quantities, exclusions and procurement decisions. |
| 5 | Supplier referral network | **Selected** | May introduce customers to suppliers; supplier and customer complete the transaction unless separately agreed in writing. |
| 6 | Supplier directory | **Selected** | May list real suppliers where each listing is current, transparent and supported by genuine business information. |
| 7 | Price-information publisher | **Selected with restrictions** | Dated, indicative observations only, with source, unit, GST, transport, date and limitations disclosed. **Manually collected observations must never be called "live rates."** |
| 8 | Logistics coordinator | **Not selected** | May communicate delivery requirements to suppliers; must not claim logistics responsibility, delivery execution or delivery guarantees. |
| 9 | No active fulfilment | **Not selected** | Quotation, sourcing, procurement-support, referral and directory functions are active. |

## Confirmed commercial structure

Unless a specific written contract states otherwise: **the supplier issues the quotation, invoices the customer, and is responsible for availability, quality, GST invoicing, transport and delivery commitments.** The customer transacts directly with the supplier. Buildogram collects quotations, compares specifications, coordinates sourcing, advises on procurement and introduces suppliers — and must disclose any sourcing, consultation, referral or commission fee. Buildogram must not represent itself as authorised dealer, stockist, manufacturer, wholesaler or direct seller without documentary proof, and must not guarantee supplier performance, pricing, delivery or quality unless a signed agreement says so.

## Effect on the keyword universe — measured

Of the materials queries in the master universe (420 classified):

| Status | Count | Meaning |
| --- | ---: | --- |
| **PERMITTED** | **213** | Quotation, sourcing, procurement, supplier-directory and informational/tool queries — commercial targeting now allowed with correct positioning |
| **PERMITTED WITH RESTRICTIONS** | **71** | Price/rate queries — dated indicative observations only |
| **BLOCKED** | **136** | Direct-seller/dealer/stockist/wholesale/warehouse terms (direct-seller model not selected) and delivery/bulk-order terms (logistics not selected) |

Blocked terms remain eligible for **informational or directory** treatment — what is prohibited is Buildogram appearing as the seller or delivery guarantor.

## Positioning language

**Acceptable:** find relevant suppliers · compare supplier quotations · request construction-material quotations · get material sourcing support · explore listed suppliers · review brands, grades and specifications · coordinate site-specific material requirements.

**Not permitted:** buy cement from Buildogram · Buildogram cement/TMT dealer · construction material shop · wholesale materials from Buildogram · cement stockist · same-day delivery by Buildogram · Buildogram material warehouse · Buildogram authorised dealership.

## Supplier-directory requirements

A supplier page is indexable only with: legal/public business name · material categories · brands and grades · areas served · minimum-order info where available · GST availability · delivery capability · contact/quotation pathway · last-verified date · listing-relationship disclosure · verification status **based on an actual published procedure**.

Prohibited without corresponding evidence and published criteria: "verified supplier", "approved supplier", "trusted supplier", "authorised dealer". **The directory page itself must not be marked as a `LocalBusiness`.** Individual supplier entities may carry business structured data only when the visible listing contains real, matching information.

## Price-publishing rules

Every observation must show: material · brand or generic category · grade/specification · unit · observation date · supplier sample or source type · GST inclusion · transport inclusion · delivery geography · minimum quantity where relevant · price validity · indicative-data disclaimer · update status.

**Approved terminology:** indicative Chennai market observation · supplier quotation observed on [date] · indicative material price range · recent quotation range · dated market-rate observation.
**Prohibited:** live rates · real-time rates · today's guaranteed price · lowest price in Chennai · official Chennai material rate · Buildogram material price index.
**Product name until a formal statistical methodology exists: "Buildogram Chennai Material Price Monitor" — never "index."**

## Schema permissions

| Schema | Permission |
| --- | --- |
| `Article` / `BlogPosting` | Permitted for genuine educational content |
| `FAQPage` | Permitted when FAQs are visible and useful |
| `WebApplication` / `SoftwareApplication` | Permitted for functioning, accurate calculators |
| `ItemList` | Permitted for a genuine visible supplier directory |
| Individual business schema | Only for real supplier profiles with matching visible data |
| `Product` | **Not permitted** unless Buildogram presents a genuine specific product offering |
| `Offer` | **Not permitted** for ordinary quote-collection forms or indicative rate observations |
| `AggregateRating` | **Prohibited** without genuine, visible, policy-compliant review data |

## Three permitted layers

1. **Education and tools** — guides, specifications, comparisons, quality checks, calculators (brand-neutral unless documented product evidence supports comparison).
2. **Procurement and quotation support** — quotation collection, specification review, supplier comparison, sourcing coordination.
3. **Supplier discovery** — maintained directory and referral experiences.

**Blocked layer:** direct product sales · dealer positioning · wholesale positioning · inventory claims · delivery guarantees · `Product`/`Offer` schema.

## Remaining owner confirmations before any commercial material page

Active supplier count · onboarding procedure · listing update frequency · quotation request workflow · who is charged (customer, supplier or both) · commission and referral disclosure policy · quotation validity handling · GST treatment · transport treatment · minimum-order handling · Chennai delivery coverage · complaint and dispute process · price-observation collection method · publication frequency · rate correction and revision policy.

**These 15 items are now the gating set for the materials programme — the model itself is settled.**
