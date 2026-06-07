// Define Priority Money Pages across clusters

export const CLUSTERS = {
  construction: [
    { label: 'Home Construction in Chennai', href: '/home-construction-chennai', description: 'Engineer-led home building services.' },
    { label: 'Verified Builders', href: '/builders-in-chennai', description: 'Find top construction companies and contractors.' },
    { label: 'BOQ & Plan Review', href: '/boq-review-chennai', description: 'Audit your construction plans and estimates.' },
    { label: 'Contractor Quote Review', href: '/contractor-quote-review-chennai', description: 'Find hidden costs in builder quotes.' },
    { label: 'Site Supervision', href: '/site-supervision-chennai', description: 'Expert engineering oversight for your site.' },
    { label: 'Quality System', href: '/quality-system', description: 'Our 400+ point construction quality checklist.' },
    { label: 'Property Passport', href: '/property-passport', description: 'Digital handover and maintenance records.' },
    { label: 'All Construction Services', href: '/services', description: 'View our complete range of services.' }
  ],
  materials: [
    { label: 'Construction Materials Hub', href: '/materials', description: 'Source genuine materials direct to site.' },
    { label: 'Cement Quotes', href: '/materials/cement', description: 'Get bulk rates on top cement brands.' },
    { label: 'TMT Steel Rates', href: '/materials/tmt-steel', description: 'Current market rates for primary TMT steel.' },
    { label: 'M-Sand & P-Sand', href: '/materials/msand-psand', description: 'Quality tested river sand alternatives.' },
    { label: 'Bricks & AAC Blocks', href: '/materials/bricks-aac-blocks', description: 'Red bricks, fly ash, and AAC blocks.' },
    { label: 'Ready Mix Concrete (RMC)', href: '/materials/rmc', description: 'High-grade RMC delivery in Chennai.' },
    { label: 'Waterproofing Materials', href: '/materials/waterproofing', description: 'Chemicals and membranes for leak prevention.' },
    { label: 'Electrical & Plumbing', href: '/materials/electrical-plumbing', description: 'Pipes, wires, and fixtures.' }
  ],
  structural_audit: [
    { label: 'Structural Audit', href: '/structural-audit-chennai', description: 'Comprehensive building health assessments.' },
    { label: 'NDT Testing', href: '/ndt-testing-chennai', description: 'Non-Destructive Testing for concrete strength.' },
    { label: 'Rebound Hammer Test', href: '/rebound-hammer-test-chennai', description: 'Surface hardness and compressive strength.' },
    { label: 'UPV Test', href: '/upv-test-chennai', description: 'Ultrasonic Pulse Velocity for internal flaws.' },
    { label: 'Rebar Scanning', href: '/rebar-scanning-chennai', description: 'Detect embedded reinforcement and cover.' },
    { label: 'Core Test Concrete', href: '/core-test-concrete-chennai', description: 'Direct compressive strength analysis.' },
    { label: 'Crack Inspection', href: '/building-crack-inspection-chennai', description: 'Expert diagnosis of building cracks.' },
    { label: 'Property Passport', href: '/property-passport', description: 'Digitize your audit reports for the future.' }
  ],
  survey_piling: [
    { label: 'Land Survey', href: '/land-survey-chennai', description: 'Accurate boundary and topographical surveys.' },
    { label: 'DGPS Survey', href: '/dgps-survey-chennai', description: 'Satellite-based high-precision land mapping.' },
    { label: 'Total Station Survey', href: '/total-station-survey-chennai', description: 'Digital layout and contour marking.' },
    { label: 'Soil Investigation', href: '/soil-investigation-chennai', description: 'Borehole testing for foundation design.' },
    { label: 'Plate Load Test', href: '/plate-load-test-chennai', description: 'Determine safe bearing capacity of soil.' },
    { label: 'Pile Foundation Contractors', href: '/pile-foundation-contractors-chennai', description: 'Deep foundation execution and testing.' },
    { label: 'DMC Piling', href: '/dmc-piling-contractors-chennai', description: 'Direct Mud Circulation piling services.' },
    { label: 'Pile Load Test', href: '/pile-load-test-chennai', description: 'Verify load-carrying capacity of piles.' }
  ],
  proof_trust: [
    { label: 'Case Studies', href: '/case-studies', description: 'Detailed breakdowns of completed projects.' },
    { label: 'Field Proof', href: '/proof', description: 'Real updates from our engineers on site.' },
    { label: 'Quality System', href: '/quality-system', description: 'The strict standards we enforce.' },
    { label: 'Verified Partners', href: '/partners', description: 'The best architects and builders in Chennai.' },
    { label: 'Chennai Service Hub', href: '/locations/chennai', description: 'Our hyper-local ecosystem footprint.' },
    { label: 'Property Passport', href: '/property-passport', description: 'Secure digital handover records.' }
  ],
  partner: [
    { label: 'Partner Network', href: '/partners', description: 'Find verified professionals.' },
    { label: 'Join as Partner', href: '/join-as-partner', description: 'Apply to join Buildogram\'s trusted network.' },
    { label: 'Partner OS', href: '/partner-os', description: 'The operating system for modern builders.' },
    { label: 'Architects', href: '/partners/architects', description: 'Design experts and structural engineers.' },
    { label: 'Builders', href: '/builders-in-chennai', description: 'Verified construction execution partners.' },
    { label: 'Material Suppliers', href: '/partners/suppliers', description: 'Verified distributors and manufacturers.' },
    { label: 'Piling Contractors', href: '/pile-foundation-contractors-chennai', description: 'Deep foundation specialists.' }
  ]
};

/**
 * Returns related links from a specific cluster, excluding the current path.
 */
export function getRelatedLinks(clusterName, currentPath, limit = 6) {
  const cluster = CLUSTERS[clusterName] || [];
  return cluster
    .filter(link => link.href !== currentPath)
    .slice(0, limit);
}

/**
 * Derives a mix of high-priority links depending on the page type to cross-pollinate.
 */
export function getContextualLinks(pageType, currentPath, limit = 6) {
  let combined = [];

  switch (pageType) {
    case 'service':
      combined = [...CLUSTERS.proof_trust, ...CLUSTERS.construction, ...CLUSTERS.materials];
      break;
    case 'material':
      combined = [...CLUSTERS.materials, ...CLUSTERS.construction, ...CLUSTERS.proof_trust];
      break;
    case 'audit':
      combined = [...CLUSTERS.structural_audit, ...CLUSTERS.proof_trust, ...CLUSTERS.survey_piling];
      break;
    case 'survey':
      combined = [...CLUSTERS.survey_piling, ...CLUSTERS.construction, ...CLUSTERS.proof_trust];
      break;
    case 'proof':
    case 'case_study':
      combined = [...CLUSTERS.construction, ...CLUSTERS.materials, ...CLUSTERS.structural_audit];
      break;
    case 'location':
      combined = [...CLUSTERS.construction, ...CLUSTERS.structural_audit, ...CLUSTERS.survey_piling, ...CLUSTERS.materials];
      break;
    default:
      combined = [...CLUSTERS.construction, ...CLUSTERS.materials, ...CLUSTERS.proof_trust];
  }

  // Deduplicate by href
  const uniqueLinks = [];
  const seen = new Set([currentPath]); // Exclude current path immediately

  for (const link of combined) {
    if (!seen.has(link.href)) {
      uniqueLinks.push(link);
      seen.add(link.href);
    }
  }

  return uniqueLinks.slice(0, limit);
}

/**
 * Returns top tier money pages for general injection (like homepage)
 */
export function getMoneyPageLinks(limit = 8) {
  const topTier = [
    CLUSTERS.construction[0], // Home construction
    CLUSTERS.materials[0],    // Materials Hub
    CLUSTERS.construction[2], // BOQ Review
    CLUSTERS.structural_audit[0], // Structural Audit
    CLUSTERS.survey_piling[0], // Land Survey
    CLUSTERS.partner[0],      // Partners
    CLUSTERS.proof_trust[0],  // Case studies
    CLUSTERS.proof_trust[1],  // Proof
  ];
  return topTier.slice(0, limit);
}
