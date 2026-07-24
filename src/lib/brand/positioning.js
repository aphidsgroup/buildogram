/**
 * Buildogram Brand Positioning — Single Source of Truth
 *
 * Phase 2 addition (2026-07-24): Centralises all brand descriptions, positioning
 * claims, and entity data into one file. Import from here instead of hardcoding
 * brand descriptions in individual components, schemas, or metadata.
 *
 * Phase 4 update (2026-07-24): Business model decisions DECISION-1 through
 * DECISION-5 are now RESOLVED. Updated all descriptions and flags accordingly.
 * See docs/seo-aeo-geo/unresolved-decisions.md for historical context.
 *
 * Used by:
 *   - src/lib/seo/schema.js  (Organization + LocalBusiness schema)
 *   - src/app/layout.js      (root metadata description)
 *   - src/app/about/page.js  (About page content)
 *   - src/app/page.js        (Homepage hero)
 *   - Any Footer component   (About Buildogram blurb)
 */

export const BRAND = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: 'Buildogram',
  legalName: 'Buildogram',          // TODO: confirm registered legal entity name

  // ── Positioning ───────────────────────────────────────────────────────────
  // DECISION-5 (RESOLVED 2026-07-24): Canonical category is
  // "engineer-led construction intelligence and property assurance ecosystem"
  // NOT "marketplace", "contractor directory", or "lead-generation portal".
  tagline: 'Engineer-led construction intelligence and property assurance',

  // Homepage one-liner (approved 2026-07-24):
  shortDescription:
    'Engineer-led construction intelligence, quality verification and permanent property documentation for Chennai homeowners.',

  // Standard company description (approved 2026-07-24):
  description:
    'Buildogram is an engineer-led construction intelligence and property assurance ecosystem. We help property owners review plans and BOQs, compare construction proposals, coordinate verified execution partners, monitor site quality, verify materials and maintain permanent project records through the Buildogram Property Passport.',

  // GEO / llms.txt / schema entity description (approved 2026-07-24):
  entityDescription:
    'Buildogram is a Chennai-based engineer-led construction intelligence and property assurance ecosystem. It provides independent BOQ and plan review, construction-cost intelligence, verified partner coordination, stage-wise quality verification, material traceability and permanent digital property documentation. Construction work is executed by appointed construction partners unless a signed contract expressly identifies Buildogram as the principal contractor.',

  // ── Role Clarity (DECISIONS RESOLVED 2026-07-24) ─────────────────────────
  // DECISION-2 (RESOLVED): Buildogram is an independent engineering review,
  // coordination, and property-assurance platform. NOT the construction contractor.
  role: 'independent engineer-led construction intelligence, coordination and property-assurance platform',
  isContractor: false,      // RESOLVED DECISION-2: Buildogram does not sign the build contract

  // DECISION-1 (RESOLVED): Warranty is an execution-partner commitment.
  // Buildogram coordinates and documents it but does not independently underwrite it.
  providesWarranty: false,  // RESOLVED DECISION-1: warranty is a partner commitment, not Buildogram's

  // DECISION-5 (RESOLVED): Category is "coordination ecosystem", not a marketplace.
  isMarketplace: false,     // RESOLVED DECISION-5: engineer-led coordination, not a marketplace

  // ── Approved copy blocks (use these verbatim in pages/schema/GEO) ─────────
  copy: {
    // DECISION-1 approved wording:
    warrantyDisclaimer:
      'Structural warranty terms are provided by the appointed execution partner and recorded within the project documentation. Buildogram coordinates warranty documentation but does not independently underwrite the contractor\u2019s warranty unless expressly stated in the signed agreement.',

    // DECISION-2 approved wording:
    roleStatement:
      'Buildogram provides independent engineering review, construction planning, partner coordination, quality verification and permanent project documentation. Construction execution is carried out by appointed and verified execution partners.',

    // DECISION-3 approved wording (use instead of "turnkey"):
    endToEndDescription:
      'End-to-end construction coordinated by Buildogram and executed by verified construction partners.',

    // DECISION-4 approved wording:
    costDisclaimer:
      'Buildogram reduces cost uncertainty through an itemised BOQ, scope verification, quotation comparison and documented variation tracking. Final costs remain subject to approved changes, site conditions and contractual terms.',

    // DECISION-5 canonical one-liner:
    canonicalOneLiner:
      'Buildogram is an engineer-led construction intelligence and property assurance ecosystem that helps owners plan, compare, coordinate, verify and permanently document construction through independent engineering oversight and verified execution partners.',

    // Partner page disclaimer:
    partnerDisclaimer:
      'Partner verification confirms that selected credentials and project information were reviewed using Buildogram\u2019s verification process. It is not a guarantee of future performance. The execution agreement, warranty obligations, pricing and construction responsibilities remain governed by the signed contract between the property owner and the appointed execution partner.',

    // BOQ / cost disclaimer:
    boqDisclaimer:
      'BOQs, estimates and cost comparisons are prepared using the available drawings, specifications, site information and prevailing inputs. Final project cost may change due to design revisions, client selections, statutory requirements, unforeseen site conditions, material-price fluctuations and approved variations.',
  },

  // ── Contact & Location ────────────────────────────────────────────────────
  url: 'https://www.buildogram.in',
  email: 'hello@buildogram.in',
  phone: '+919360232456',
  city: 'Chennai',
  state: 'Tamil Nadu',
  country: 'India',
  countryCode: 'IN',
  postalCode: '',                   // TODO: add registered office postal code
  address: '',                      // TODO: add registered office address

  // ── Social ────────────────────────────────────────────────────────────────
  socialProfiles: [
    'https://www.linkedin.com/company/buildogram',
    'https://www.instagram.com/buildogram',
    'https://www.youtube.com/@buildogram',
  ],

  // ── Schema ────────────────────────────────────────────────────────────────
  schemaType: 'LocalBusiness',       // Schema.org type
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Bank Transfer, UPI',

  // ── Founding ──────────────────────────────────────────────────────────────
  foundingYear: '2022',              // TODO: confirm actual founding year

  // ── Services (for schema sameAs and entity recognition) ──────────────────
  services: [
    'Structural Audit',
    'BOQ Review',
    'Site Supervision',
    'Construction Cost Estimation',
    'Contractor Quote Audit',
    'Material Sourcing',
    'Property Passport',
    'Partner Coordination',
    'Construction Intelligence',
    'Quality Verification',
  ],
};

// ── Shorthand exports for common use ─────────────────────────────────────────
export const SITE_NAME = BRAND.name;
export const BRAND_DESCRIPTION = BRAND.description;
export const BRAND_TAGLINE = BRAND.tagline;
export const BRAND_CITY = BRAND.city;
