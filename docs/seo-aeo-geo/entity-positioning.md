# Buildogram — Entity Positioning Audit

**Date:** 2026-07-24  
**Purpose:** Identify contradictions in how Buildogram describes its role across public content, then establish a single approved positioning.

---

## 1. What Buildogram Must NOT Be Presented As

Per the strategic mandate, Buildogram must not appear as:
- A simple contractor directory
- A lead-selling platform
- A listing marketplace
- A generic construction company
- An unverified price-comparison site
- A mass-generated locality-page website

---

## 2. Contradictions Identified in Current Content

### Contradiction A: "Independent Layer" vs "We Handle Execution"

| Claim | Source | File | Risk |
|-------|--------|------|------|
| "Engineer-led construction **support platform**" | Homepage hero | `src/app/page.js` | Low — "support" is safe |
| "End-to-End Construction Support — From concept to **key handover**" | Homepage SERVICES | `src/app/page.js` | Low — "support" is safe |
| "**10-Year Structural Warranty** — Legally registered warranty on footings, columns, beams, and slabs" | House construction service | `src/data/seo/services.js` | **HIGH — if not a real legal instrument, this is a false claim** |
| "Signed agreement with **fixed milestones, payment schedule**, and material specifications" | Same | `src/data/seo/services.js` | Medium — implies contractual relationship |
| "**Contractor bears overruns**" | Not confirmed in audit — search required | TBD | High if present |

**Resolution required:** Is the "10-Year Structural Warranty" a real legally registered warranty document that Buildogram provides? If yes — document the legal structure. If no — this must be flagged and softened to: *"Buildogram coordinates a 10-year structural coverage commitment from the executing contractor."*

---

### Contradiction B: "Marketplace" Signals

| Claim | Source | File | Risk |
|-------|--------|------|------|
| "Connect with screened contractors and verified suppliers" | HOW_IT_WORKS step 4 | `src/app/page.js` | Medium — sounds like marketplace |
| "Verified Contractor & Material Match" | Same | Same | Medium |
| Partner directory with 9 categories | `PARTNER_CATEGORIES` | Same | Low — informational |

**Resolution:** Safe reframe: *"Buildogram evaluates and coordinates with engineers and contractors on your behalf — this is not a lead marketplace."* Add this distinction to the How It Works page and About page.

---

### Contradiction C: "Construction Company" vs "Engineering Layer"

| Signal | URL | Problem |
|--------|-----|---------|
| `/construction-company-chennai` | `[serviceSlug]` | Page targets "construction company Chennai" — positions Buildogram as a company that does construction |
| Homepage step: "Build with real-time portal updates" | `/` | Implies Buildogram is the builder |
| "Turnkey Construction" | `/turnkey-construction-chennai` | Implies Buildogram IS the contracting entity |

**Resolution:** Each of these pages must clearly state Buildogram's role. Example disclaimer for turnkey page: *"Buildogram provides engineering oversight, coordination, and quality verification for turnkey projects. A verified partner contractor executes the physical construction under a separate agreement."*

---

### Contradiction D: Quality Claims Inconsistency

| Claim | Location |
|-------|---------|
| "500+ quality checks" | (previously used — search needed) |
| "2,500+ checks" | (may appear in Quality System page) |

**Resolution:** The Quality System methodology page must define: total master checklist size, checks per project type, mandatory vs conditional checks, visual vs measurement-based checks. Use ONE number consistently or explain the relationship.

---

## 3. Approved Safe Positioning (Default Until Legally Reviewed)

Use this verbatim in all brand descriptions, Organization schema, About page, footer, and metadata until legally reviewed:

> **"Buildogram provides engineer-led construction intelligence, technical review, partner coordination, quality verification and permanent project documentation for property owners in Chennai."**

**One-line version:**
> "Engineer-led construction intelligence and property assurance — Chennai."

**What Buildogram IS (safe claims):**
- An engineering review and oversight service
- A BOQ and contractor quote audit service
- A quality verification and site supervision service
- A platform for permanent property records (Property Passport)
- A coordination layer between property owners and vetted construction partners
- A source of construction intelligence, cost data, and technical guidance

**What Buildogram is NOT (until legally confirmed):**
- The primary contractor or builder
- A warranty provider (unless legally structured)
- A marketplace (unless this is the actual model)
- A construction company executing physical work

---

## 4. Files Requiring Content Update (Phase 4)

| File | Current Claim | Required Change |
|------|-------------|-----------------|
| `src/data/seo/services.js` | "10-Year Structural Warranty — Legally registered" | Verify legal basis OR soften |
| `src/data/services.js` | Any warranty/execution claims | Audit per service |
| `src/app/page.js` | "Connect with screened contractors" | Clarify coordination vs matchmaking |
| `src/app/about/page.js` | TBD — needs reading | Add approved positioning |
| `src/components/templates/ServicePageTemplate.jsx` | Any warranty claims | Audit |
| `src/app/layout.js` Organization schema | Check `description` field | Use approved positioning |

---

## 5. Central Configuration Recommendation

Create `src/lib/brand/positioning.js`:

```javascript
export const BRAND = {
  name: 'Buildogram',
  legalName: 'Buildogram',  // confirm legal entity name
  tagline: 'Engineer-led construction intelligence and property assurance',
  description: 'Buildogram provides engineer-led construction intelligence, technical review, partner coordination, quality verification and permanent project documentation for property owners in Chennai.',
  shortDescription: 'Engineer-led construction intelligence — Chennai.',
  role: 'engineering review and coordination service',
  isContractor: false,       // PENDING legal review
  providesWarranty: false,   // PENDING legal review — use coordinator framing
  isMarketplace: false,      // PENDING — verify business model
  city: 'Chennai',
  country: 'India',
  state: 'Tamil Nadu',
}
```

This single file becomes the source of truth imported by Organization schema, LocalBusiness schema, About page, footer, homepage hero, and all metadata descriptions.
