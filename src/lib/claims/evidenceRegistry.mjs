/**
 * Public claim evidence registry.
 *
 * Entries may describe wording that is approved, pending documented operating
 * evidence, or retired. Private evidence and customer data must never be stored
 * here. Tests consume this registry to keep exceptions narrow and reviewable.
 */
export const claimEvidenceRegistry = [
  {
    claimKey: 'PENDING_R1_FINISHING_DIRECT_DELIVERY',
    approvedWording: 'direct delivery',
    status: 'PENDING_R1',
    evidenceType: 'fulfilment-workflow',
    sourceReference: 'seo-growth/market-domination/OV02-R1-materials-model-revision.md',
    owner: 'Operations owner',
    lastReviewed: '2026-07-27',
    expiresAt: '2026-08-31',
    allowedRoutes: ['/materials/finishing-materials'],
  },
  {
    claimKey: 'PENDING_R1_PILING_DIRECT_DELIVERY',
    approvedWording: 'direct delivery',
    status: 'PENDING_R1',
    evidenceType: 'fulfilment-workflow',
    sourceReference: 'seo-growth/market-domination/OV02-R1-materials-model-revision.md',
    owner: 'Operations owner',
    lastReviewed: '2026-07-27',
    expiresAt: '2026-08-31',
    allowedRoutes: ['/materials/piling-foundation-materials'],
  },
  {
    claimKey: 'PENDING_R1_SERVICE_DELIVERY_702',
    approvedWording: 'We deliver',
    status: 'PENDING_R1',
    evidenceType: 'fulfilment-workflow',
    sourceReference: 'seo-growth/market-domination/OV02-R1-materials-model-revision.md',
    owner: 'Operations owner',
    lastReviewed: '2026-07-27',
    expiresAt: '2026-08-31',
    allowedRoutes: ['/services/quality-inspection'],
  },
  {
    claimKey: 'PENDING_R1_SERVICE_DELIVERY_794',
    approvedWording: 'We deliver',
    status: 'PENDING_R1',
    evidenceType: 'fulfilment-workflow',
    sourceReference: 'seo-growth/market-domination/OV02-R1-materials-model-revision.md',
    owner: 'Operations owner',
    lastReviewed: '2026-07-27',
    expiresAt: '2026-08-31',
    allowedRoutes: ['/services/construction-project-management'],
  },
];

export function getActiveClaimEvidence(referenceDate = new Date()) {
  const now = referenceDate.getTime();
  return claimEvidenceRegistry.filter((entry) => {
    const expiresAt = new Date(`${entry.expiresAt}T23:59:59Z`).getTime();
    return Number.isFinite(expiresAt) && expiresAt >= now;
  });
}
