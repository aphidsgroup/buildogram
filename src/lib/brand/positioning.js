/**
 * Buildogram Brand Positioning — Single Source of Truth
 *
 * Phase 2 addition (2026-07-24): Centralises all brand descriptions, positioning
 * claims, and entity data into one file. Import from here instead of hardcoding
 * brand descriptions in individual components, schemas, or metadata.
 *
 * Used by:
 *   - src/lib/seo/schema.js  (Organization + LocalBusiness schema)
 *   - src/app/layout.js      (root metadata description)
 *   - src/app/about/page.js  (About page content)
 *   - src/app/page.js        (Homepage hero)
 *   - Any Footer component   (About Buildogram blurb)
 *
 * IMPORTANT — Safe defaults until legal review is complete:
 *   - isContractor: false (Buildogram is NOT the executing contractor)
 *   - providesWarranty: false (warranty is a partner commitment, not Buildogram's)
 *   - isMarketplace: false (pending business model confirmation)
 *   See docs/seo-aeo-geo/unresolved-decisions.md for DECISION-1 through DECISION-5.
 */

export const BRAND = {
  // ── Identity ─────────────────────────────────────────────────────────────
  name: 'Buildogram',
  legalName: 'Buildogram',          // TODO: confirm registered legal entity name

  // ── Positioning ───────────────────────────────────────────────────────────
  // One approved description to use everywhere.
  // Do NOT deviate from this in individual pages without review.
  tagline: 'Engineer-led construction intelligence and property assurance',
  description:
    'Buildogram provides engineer-led construction intelligence, technical review, partner coordination, quality verification and permanent project documentation for property owners in Chennai.',
  shortDescription: 'Engineer-led construction intelligence — Chennai.',

  // One-sentence entity description for schema and AI crawlers:
  entityDescription:
    'Buildogram is an engineer-led construction intelligence and property assurance platform based in Chennai, India, providing BOQ review, structural audit, site supervision, partner coordination, and permanent project documentation.',

  // ── Role Clarity (safe defaults — do NOT override without legal review) ───
  role: 'engineering review and coordination service',
  isContractor: false,      // PENDING DECISION-2: Buildogram does not sign the build contract
  providesWarranty: false,  // PENDING DECISION-1: warranty is a partner commitment, not Buildogram's
  isMarketplace: false,     // PENDING DECISION-5: coordination model, not a marketplace

  // ── Contact & Location ────────────────────────────────────────────────────
  url: 'https://www.buildogram.in',
  email: 'hello@buildogram.in',
  phone: '',                        // TODO: add verified business phone
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
  priceRange: '₹₹',                  // For LocalBusiness schema
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
  ],
};

// ── Shorthand exports for common use ─────────────────────────────────────────
export const SITE_NAME = BRAND.name;
export const BRAND_DESCRIPTION = BRAND.description;
export const BRAND_TAGLINE = BRAND.tagline;
export const BRAND_CITY = BRAND.city;
