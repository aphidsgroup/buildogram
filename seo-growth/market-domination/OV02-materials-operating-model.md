# OV02 — Materials Operating Model: Owner Decision Record

**RESEARCH-ONLY — NO PUBLICATION OR IMPLEMENTATION AUTHORISED** · Status: **AWAITING OWNER DECISION**

## Why this blocks 2,506 queries

Keyword eligibility, page format, schema type and claim wording all derive from what Buildogram actually *does* with materials. The same query — "cement suppliers in chennai" — is legitimate under a directory model, misleading under a no-fulfilment model, and requires `Product`/`Offer` schema only under a direct-sales model. No amount of content quality fixes a mismatch here.

## Decision required — select ALL that currently apply

| # | Model | Definition | Select |
| --- | --- | --- | --- |
| 1 | **Direct seller** | Buildogram sells material, invoices the customer, owns the transaction | ☐ |
| 2 | **Material quotation collector** | Buildogram gathers quotes from suppliers on the customer's behalf | ☐ |
| 3 | **Material sourcing coordinator** | Buildogram arranges supply as part of a project engagement | ☐ |
| 4 | **Procurement consultant** | Buildogram advises on procurement; customer transacts | ☐ |
| 5 | **Supplier referral network** | Buildogram introduces suppliers, no transaction involvement | ☐ |
| 6 | **Supplier directory** | Buildogram publishes a listing of suppliers | ☐ |
| 7 | **Price-information publisher** | Buildogram publishes dated market rate observations | ☐ |
| 8 | **Logistics coordinator** | Buildogram arranges delivery to site | ☐ |
| 9 | **No active material fulfilment yet** | Materials pages are informational only today | ☐ |

**Additional confirmations needed if any of 1–3 or 7–8 are selected:**
- Supplier panel size and how suppliers are onboarded
- Who issues the quotation, and its validity period
- GST treatment and whether quoted prices include transport
- Minimum order quantity and delivery radius
- For model 7: collection method, sample size, observation frequency, revision policy

## What each model permits

| Query family | Requires model | Commercial targeting | Informational targeting | Schema permitted |
| --- | --- | --- | --- | --- |
| "buy cement chennai", "construction material shop" | 1 | Only under model 1 | Yes (buying guides) | `Product`/`Offer` **only** with a real visible purchase flow |
| "cement suppliers in chennai", "tmt dealers chennai" | 5 or 6 | Only with real, maintained listings | Yes | `LocalBusiness` for each genuinely listed business; **never** for the directory page itself |
| "get cement quote chennai", "material sourcing chennai" | 2, 3 or 4 | Only with a real quotation workflow | Yes | `Offer` only if a genuine quotation process is visible |
| "cement price chennai", "tmt rate today" | 7 | Only with a dated, maintained dataset | Yes, with methodology + limitations | No price schema without a maintained feed |
| "opc vs ppc", "fe500 vs fe500d", "m-sand quality test" | none — expertise only | N/A | **Yes — permitted today** | `Article`/`FAQ` |
| "cement quantity calculator" | none — tool | N/A | **Yes — permitted today** | `WebApplication` if accurate |
| "cement delivery chennai", "bulk order m-sand" | 8 | Only under model 8 | Yes (delivery planning guide) | None |

## Current position, pending the decision

**Permitted today without any model confirmation:** material selection/education content (~400 queries) and quantity calculators (~120 queries). These are the only materials queries that can be planned for now, and they happen to carry the highest AI-citation value in the set.

**Blocked today:** direct purchase (~120), dealer/supplier discovery (~340), quotation/sourcing (~150), price/rate (~200), logistics (~90).

**Important nuance recorded per your instruction:** a supplier or dealer query is **not automatically unusable**. Under models 5/6 it remains eligible as directory content, and under any model it remains eligible for informational content that explains how to choose and verify a supplier. What is prohibited is implying a fulfilment capability that does not exist.

## Consequence if no decision is made

The materials programme stalls at educational content only. That is a defensible position — it is honest and citation-friendly — but it forfeits the commercial half of the materials opportunity indefinitely.
