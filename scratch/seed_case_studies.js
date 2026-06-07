const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Case Studies...');

  const caseStudies = [
    {
      slug: 'boq-review-residential-velachery',
      title: 'BOQ Review & Optimization for Residential Project',
      category: 'BOQ Review',
      location_area: 'Velachery, Chennai',
      property_type: 'Residential (G+2)',
      scope_of_work: 'Comprehensive review of contractor BOQ to identify hidden costs and verify structural material quantities.',
      starting_problem: 'Client received a quote from a local contractor but suspected inflated material quantities and ambiguous finish specifications.',
      process: 'Our engineers re-calculated structural quantities from architectural drawings and cross-checked standard market rates for finishes.',
      tools_used: ['Buildogram BOQ Engine', 'AutoCAD'],
      materials_used: ['TMT Steel', 'Cement'],
      observations: 'Identified 15% excess in steel quantities and missing waterproofing specifications in the original quote.',
      proof_records: ['Revised BOQ Document', 'Quantity Takeoff Sheet'],
      outcome: 'Saved the client ₹4.5 Lakhs in potential overbilling and standardized the contract terms before project kickoff.',
      timeline: '4 Days',
      related_services: ['boq-review-chennai', 'contractor-quote-review-chennai'],
      status: 'draft',
      seo_title: 'BOQ Review Case Study in Velachery | Buildogram',
      seo_description: 'Discover how Buildogram helped a residential client in Velachery optimize their BOQ and save ₹4.5L on construction costs.'
    },
    {
      slug: 'structural-audit-old-building-tnagar',
      title: 'Structural Safety Audit for 30-Year-Old Building',
      category: 'Structural Audit',
      location_area: 'T. Nagar, Chennai',
      property_type: 'Commercial/Residential Mix',
      scope_of_work: 'Non-Destructive Testing (NDT) and visual inspection to assess structural viability for an additional floor.',
      starting_problem: 'Owner wanted to add a floor to a 30-year-old load-bearing structure but noticed severe cracking in the ground floor columns.',
      process: 'Conducted Rebound Hammer Test, UPV, and core extraction. Assessed foundation settling and reinforcement corrosion levels.',
      tools_used: ['Rebound Hammer', 'Ultrasonic Pulse Velocity Tester', 'Cover Meter'],
      materials_used: [],
      observations: 'Concrete strength in critical columns was 30% below required capacity for vertical expansion. Significant rebar corrosion detected.',
      proof_records: ['NDT Test Report', 'Structural Stability Certificate', 'Crack Mapping Log'],
      outcome: 'Advised against vertical expansion. Provided a comprehensive retrofitting and structural strengthening plan instead.',
      timeline: '2 Weeks',
      related_services: ['structural-audit-chennai', 'ndt-testing-chennai', 'old-building-structural-audit-chennai'],
      status: 'draft',
      seo_title: 'Structural Audit of Old Building in T. Nagar | Buildogram',
      seo_description: 'Case study on structural safety audit and NDT testing for an old building in T. Nagar, Chennai by Buildogram engineers.'
    },
    {
      slug: 'land-survey-layout-marking-tambaram',
      title: 'Precision Land Survey & Layout Marking',
      category: 'Land Survey',
      location_area: 'Tambaram, Chennai',
      property_type: 'Empty Plot (2400 sqft)',
      scope_of_work: 'Boundary verification using Total Station and precise grid layout marking for excavation.',
      starting_problem: 'Plot boundaries were ambiguous due to missing physical markers and discrepancies with neighbor fences.',
      process: 'Correlated patta documents with FMB sketch. Used Total Station to fix boundary coordinates and establish a permanent benchmark (TBM).',
      tools_used: ['Total Station', 'AutoCAD Civil 3D'],
      materials_used: [],
      observations: 'Found a 2-foot encroachment on the eastern boundary. Successfully resolved boundary alignment before foundation work.',
      proof_records: ['Survey Drawing', 'FMB Overlay', 'TBM Coordinate Sheet'],
      outcome: 'Clear boundary established, preventing future legal disputes. Excavation layout marked accurately as per structural drawings.',
      timeline: '2 Days',
      related_services: ['total-station-survey-chennai', 'land-survey-chennai'],
      status: 'draft',
      seo_title: 'Land Survey & Layout Marking in Tambaram | Buildogram',
      seo_description: 'See how Buildogram resolved boundary disputes with a precise Total Station survey for a residential plot in Tambaram.'
    },
    {
      slug: 'soil-investigation-pile-foundation-omr',
      title: 'Deep Soil Investigation for Pile Foundation',
      category: 'Soil Investigation',
      location_area: 'OMR, Chennai',
      property_type: 'Commercial Building (Stilt + 4)',
      scope_of_work: 'Borehole drilling, SPT, and lab analysis to recommend safe bearing capacity and pile depth.',
      starting_problem: 'Client purchased land in a known marshy area along OMR and needed exact foundation design parameters.',
      process: 'Executed 3 boreholes up to 20m depth. Conducted Standard Penetration Tests at 1.5m intervals and collected undisturbed samples.',
      tools_used: ['Rotary Drilling Rig', 'SPT Equipment'],
      materials_used: [],
      observations: 'Top 6 meters consisted of highly compressible marine clay. Hard stratum (weathered rock) encountered at 16 meters.',
      proof_records: ['Geotechnical Report', 'Borelog Chart', 'Lab Test Results'],
      outcome: 'Recommended Bored Cast In-Situ piles resting at 17m depth. Structural engineer used the report to design a safe and optimized pile layout.',
      timeline: '10 Days',
      related_services: ['soil-testing-chennai', 'pile-foundation-contractors-chennai'],
      status: 'draft',
      seo_title: 'Soil Investigation for Pile Foundation in OMR | Buildogram',
      seo_description: 'Case study: Deep soil testing and geotechnical investigation for a commercial building in OMR, Chennai.'
    },
    {
      slug: 'material-sourcing-tmt-cement-annanagar',
      title: 'Verified Material Sourcing for Villa Construction',
      category: 'Material Sourcing',
      location_area: 'Anna Nagar, Chennai',
      property_type: 'Luxury Villa',
      scope_of_work: 'Direct sourcing, quality verification, and delivery of primary structural materials (TMT and Cement).',
      starting_problem: 'Client was managing construction directly and struggled with fluctuating market rates and fake branded materials.',
      process: 'Connected client directly with authorized primary dealers. Conducted batch verification upon site delivery.',
      tools_used: ['Buildogram Procurement OS'],
      materials_used: ['Primary TMT Steel (Fe550D)', 'OPC 53 Grade Cement'],
      observations: 'Ensured 100% authentic materials with valid test certificates. Eliminated middleman margins.',
      proof_records: ['Material Test Certificates (MTC)', 'Delivery Challans'],
      outcome: 'Supplied 15 Tons of TMT and 1200 bags of cement on schedule. Saved client 8% on overall structural material costs.',
      timeline: 'Ongoing Supply (3 Months)',
      related_services: ['materials/tmt-steel', 'materials/cement'],
      status: 'draft',
      seo_title: 'TMT & Cement Material Sourcing in Anna Nagar | Buildogram',
      seo_description: 'How Buildogram secured authentic, factory-direct TMT steel and cement for a luxury villa project in Anna Nagar.'
    }
  ];

  for (const cs of caseStudies) {
    await prisma.case_studies.upsert({
      where: { slug: cs.slug },
      update: cs,
      create: cs
    });
  }

  console.log('Case studies seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
