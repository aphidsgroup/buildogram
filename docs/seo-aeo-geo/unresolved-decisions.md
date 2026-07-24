# Buildogram — Unresolved Decisions

**Date:** 2026-07-24  
**Owner:** Buildogram management / legal  
**Purpose:** Decisions that require business or legal input before implementation can proceed.

---

## DECISION-1: Structural Warranty Legal Basis ⛔

**Blocking:** Phase 4 (entity positioning), Phase 5 (content upgrades)  
**Urgency:** High — false warranty claims carry legal risk

**Current claim in `src/data/seo/services.js`:**
> "10-Year Structural Warranty — Legally registered warranty on footings, columns, beams, and slabs."

**Questions:**
1. Is this warranty a real legally registered instrument?
2. Who is the warranting party — Buildogram or the executing contractor?
3. Under which law is it registered?
4. What does the warranty cover/exclude?
5. Is there a claims process? Who adjudicates?

**Options:**
- A) Keep claim — provide the legal document and registered warranty number  
- B) Soften to: "Buildogram coordinates a structural coverage commitment from the executing contractor, documented in the Property Passport."  
- C) Remove until warranty structure is formally defined

**Default until decided:** Option B (safest, no removal, no false claim)

---

## DECISION-2: Is Buildogram the Primary Contractor? ⛔

**Blocking:** All entity positioning, Organization schema, service page framing  
**Urgency:** High — incorrect description exposes legal and reputational risk

**Current ambiguity:**
- Some pages say "independent engineering layer"
- Some pages say "end-to-end from concept to handover"
- Turnkey pages imply Buildogram builds

**Questions:**
1. Does Buildogram sign the construction contract with the property owner?
2. Does Buildogram's verified partner sign directly with the property owner?
3. What is Buildogram's legal liability if construction fails?
4. Does Buildogram hold contractor licensing under Tamil Nadu licensing rules?

**Default until decided:** "Buildogram is an engineering review and coordination service. The executing contractor is a separately licensed, independently verified partner."

---

## DECISION-3: Expert Author System ⚠️

**Blocking:** Phase 4 (trust signals), Phase 5 (content quality)  
**Urgency:** Medium

**Questions:**
1. Do any named engineers at Buildogram consent to being listed as technical authors/reviewers on public content?
2. Are their qualifications (BE Civil, ME Structural, AMIE, IEI membership) available for accurate display?
3. Is there a review process to verify content before an engineer's name is attached?

**Without this:** Guide and methodology pages cannot show E-E-A-T signals (author, reviewer, qualification, date).

---

## DECISION-4: 616 Locality-Service Pages Quality Review ⚠️

**Blocking:** Phase 7 (programmatic SEO controls)  
**Urgency:** Medium

The site generates up to 616 `/locations/chennai/[area]/[service]` pages via the `isIndexable` gate in `localPageGenerator.js`.

**Questions:**
1. How many of the 28 areas have real project evidence, local photographs, or local partner data?
2. What is the current `isIndexable` threshold in `localPageGenerator.js`?
3. Should all passing pages be indexed, or should manual approval be required?

**Recommendation:** Audit a random sample of 20 pages before confirming index eligibility for all 616.

---

## DECISION-5: "Marketplace" vs "Coordination" Model ⚠️

**Blocking:** Phase 3 (IA), Phase 4 (entity positioning)  
**Urgency:** Medium

**Question:** Is Buildogram's partner directory a marketplace (owners contact partners directly) or a coordination service (Buildogram manages the engagement)?

**Impact on SEO:** The answer determines:
- How partner profile pages are framed
- Whether Product/Service schema is appropriate
- Whether Offer schema with pricing is appropriate
- Navigation labels and CTA language

---

## DECISION-6: Revenue Model Disclosure ℹ️

**Blocking:** None directly  
**Urgency:** Low

For compliance with Google's E-E-A-T and consumer trust guidelines, it is recommended to disclose:
- How Buildogram is compensated
- Whether partner listings are paid or merit-based
- How material pricing is sourced

This is especially relevant for material price pages and partner directory pages.

---

## DECISION-7: GA4 Measurement ID in Production ℹ️

**Blocking:** Phase 8 (measurement)  
**Urgency:** High for business, not for SEO  

Verify that `NEXT_PUBLIC_GA_ID` is set in the Vercel production environment. Without it, zero analytics data is collected.

---

## How to Resolve

For each decision:
1. Discuss internally
2. Record the decision in this file (replace "TBD" with resolution)
3. Notify the SEO agent to proceed with affected phases
4. The agent will implement based on the recorded decision

---

## Resolution Log

| Decision | Status | Resolution | Date |
|----------|--------|-----------|------|
| DECISION-1: Structural warranty | ⏳ Pending | — | — |
| DECISION-2: Contractor vs layer | ⏳ Pending | — | — |
| DECISION-3: Expert authors | ⏳ Pending | — | — |
| DECISION-4: 616 locality pages | ⏳ Pending | — | — |
| DECISION-5: Marketplace vs coordination | ⏳ Pending | — | — |
| DECISION-6: Revenue disclosure | ⏳ Pending | — | — |
| DECISION-7: GA4 in production | ⏳ Pending | — | — |
