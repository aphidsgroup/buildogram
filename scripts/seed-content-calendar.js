const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const starterItems = [
  // WEEK 1
  {
    title: 'BOQ Review Importance',
    slug: 'boq-review-importance-w1',
    channel: 'website_proof',
    category: 'construction',
    target_area: 'Anna Nagar',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/boq-review-chennai',
    target_keywords: ['BOQ review Chennai', 'contractor quote check'],
    internal_links: ['/services/boq-review', '/case-studies']
  },
  {
    title: 'Cement & TMT Quote Comparison',
    slug: 'cement-tmt-quote-w1',
    channel: 'instagram_reel',
    category: 'materials',
    target_area: 'OMR',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/materials/tmt-steel',
    target_keywords: ['TMT steel price Chennai', 'Cement price today'],
    internal_links: ['/materials/cement', '/materials/tmt-steel']
  },
  {
    title: 'Structural Audit: Crack Inspection',
    slug: 'structural-audit-crack-w1',
    channel: 'google_business_profile',
    category: 'structural_audit',
    target_area: 'T Nagar',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/structural-audit-chennai',
    target_keywords: ['building crack inspection', 'structural engineer'],
    internal_links: ['/building-crack-inspection-chennai']
  },
  {
    title: 'Plot Measurement / Land Survey',
    slug: 'plot-measurement-w1',
    channel: 'linkedin_post',
    category: 'land_survey',
    target_area: 'Tambaram',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/land-survey-chennai',
    target_keywords: ['land survey', 'plot measurement'],
    internal_links: ['/land-survey-chennai']
  },
  {
    title: 'What is a Property Passport?',
    slug: 'property-passport-explainer-w1',
    channel: 'learn_article',
    category: 'property_passport',
    target_area: 'Chennai',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/property-passport',
    target_keywords: ['property passport', 'home maintenance records'],
    internal_links: ['/property-passport']
  },

  // WEEK 2
  {
    title: 'Soil Investigation for Foundation',
    slug: 'soil-investigation-w2',
    channel: 'website_proof',
    category: 'soil_testing',
    target_area: 'Velachery',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/soil-investigation-chennai',
    target_keywords: ['soil testing', 'soil investigation for building'],
    internal_links: ['/soil-investigation-chennai', '/pile-foundation-contractors-chennai']
  },
  {
    title: 'Pile Foundation Depth Check',
    slug: 'pile-foundation-check-w2',
    channel: 'instagram_reel',
    category: 'piling',
    target_area: 'Madipakkam',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/pile-foundation-contractors-chennai',
    target_keywords: ['pile foundation contractors', 'pile load test'],
    internal_links: ['/pile-foundation-contractors-chennai']
  },
  {
    title: 'Waterproofing Proof Check',
    slug: 'waterproofing-proof-w2',
    channel: 'google_business_profile',
    category: 'construction',
    target_area: 'Adyar',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/materials/waterproofing',
    target_keywords: ['waterproofing contractors', 'roof leakage fix'],
    internal_links: ['/materials/waterproofing']
  },
  {
    title: 'Partner Project Showcase',
    slug: 'partner-showcase-w2',
    channel: 'linkedin_post',
    category: 'partner_project',
    target_area: 'Chennai',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/partners',
    target_keywords: ['construction partners', 'vetted contractors'],
    internal_links: ['/partners/directory']
  },
  {
    title: 'AI BOQ Checker Explainer',
    slug: 'ai-boq-checker-w2',
    channel: 'youtube_short',
    category: 'ai_tools',
    target_area: 'Chennai',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/boq-review-chennai',
    target_keywords: ['AI construction tools', 'BOQ analyzer'],
    internal_links: ['/boq-review-chennai']
  },

  // WEEK 3
  {
    title: 'Site Supervision Importance',
    slug: 'site-supervision-w3',
    channel: 'website_proof',
    category: 'construction',
    target_area: 'Porur',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/site-supervision-chennai',
    target_keywords: ['site supervision', 'quality checking engineer'],
    internal_links: ['/site-supervision-chennai']
  },
  {
    title: 'Rebar Scanning (NDT)',
    slug: 'rebar-scanning-w3',
    channel: 'instagram_reel',
    category: 'structural_audit',
    target_area: 'Guindy',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/ndt-testing-chennai',
    target_keywords: ['NDT testing', 'rebar scanning'],
    internal_links: ['/ndt-testing-chennai']
  },
  {
    title: 'M-Sand vs P-Sand Quality',
    slug: 'sand-quality-w3',
    channel: 'google_business_profile',
    category: 'materials',
    target_area: 'Chennai',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/materials/msand-psand',
    target_keywords: ['M Sand price', 'P Sand quality'],
    internal_links: ['/materials/msand-psand']
  },
  {
    title: 'Construction Cost Estimation Guide',
    slug: 'cost-estimation-guide-w3',
    channel: 'learn_article',
    category: 'construction',
    target_area: 'Chennai',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/construction-cost-estimation-chennai',
    target_keywords: ['construction cost calculator', 'build cost per sqft'],
    internal_links: ['/construction-cost-estimation-chennai', '/cost-estimator']
  },
  {
    title: 'Upcoming Case Study Teaser',
    slug: 'case-study-teaser-w3',
    channel: 'linkedin_post',
    category: 'case_study',
    target_area: 'ECR',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/case-studies',
    target_keywords: ['construction case study', 'villa project'],
    internal_links: ['/case-studies']
  },

  // WEEK 4
  {
    title: 'RMC Slump Test at Site',
    slug: 'rmc-slump-test-w4',
    channel: 'website_proof',
    category: 'materials',
    target_area: 'Perungudi',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/materials/rmc',
    target_keywords: ['RMC quality', 'slump test concrete'],
    internal_links: ['/materials/rmc', '/quality-system']
  },
  {
    title: 'Plumbing & Electrical Quality',
    slug: 'mep-quality-w4',
    channel: 'instagram_reel',
    category: 'construction',
    target_area: 'Pallikaranai',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/materials/electrical-plumbing',
    target_keywords: ['plumbing inspection', 'electrical wiring check'],
    internal_links: ['/materials/electrical-plumbing']
  },
  {
    title: 'Survey Layout Marking',
    slug: 'survey-marking-w4',
    channel: 'google_business_profile',
    category: 'land_survey',
    target_area: 'Avadi',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/construction-layout-marking-chennai',
    target_keywords: ['layout marking', 'plot survey boundary'],
    internal_links: ['/construction-layout-marking-chennai']
  },
  {
    title: 'BQS Quality Checkpoint system',
    slug: 'bqs-system-w4',
    channel: 'youtube_short',
    category: 'construction',
    target_area: 'Chennai',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/quality-system',
    target_keywords: ['quality checking construction', 'Buildogram Quality System'],
    internal_links: ['/quality-system', '/site-supervision-chennai']
  },
  {
    title: 'Welcoming New Partners',
    slug: 'partner-onboarding-w4',
    channel: 'linkedin_post',
    category: 'partner_project',
    target_area: 'Chennai',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/join-as-partner',
    target_keywords: ['construction partner program', 'contractor registration'],
    internal_links: ['/join-as-partner']
  },
  
  // WEEK 5
  {
    title: 'Why Choose Buildogram vs Local Mason?',
    slug: 'buildogram-vs-local-mason-w5',
    channel: 'website_proof',
    category: 'construction',
    target_area: 'Tambaram',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/why-vs-mason',
    target_keywords: ['mason vs engineer', 'home builder Chennai'],
    internal_links: ['/why-vs-mason']
  },
  {
    title: 'Electrical Safety Audit at Site',
    slug: 'electrical-safety-w5',
    channel: 'instagram_reel',
    category: 'structural_audit',
    target_area: 'OMR',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/materials/electrical-plumbing',
    target_keywords: ['electrical inspection', 'site safety'],
    internal_links: ['/materials/electrical-plumbing']
  },
  {
    title: 'Tile Selection Guide for Living Room',
    slug: 'tile-selection-w5',
    channel: 'google_business_profile',
    category: 'materials',
    target_area: 'Chennai',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/materials/tiles',
    target_keywords: ['floor tiles price', 'living room tiles'],
    internal_links: ['/materials/tiles']
  },
  {
    title: 'Drone Survey for Large Plot',
    slug: 'drone-survey-w5',
    channel: 'linkedin_post',
    category: 'land_survey',
    target_area: 'ECR',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/drone-survey-chennai',
    target_keywords: ['drone survey Chennai', 'topographical survey'],
    internal_links: ['/drone-survey-chennai']
  },
  {
    title: 'How to Prevent Building Cracks',
    slug: 'prevent-cracks-w5',
    channel: 'learn_article',
    category: 'construction',
    target_area: 'Chennai',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/building-crack-inspection-chennai',
    target_keywords: ['how to stop building cracks', 'wall crack repair'],
    internal_links: ['/building-crack-inspection-chennai']
  },

  // WEEK 6
  {
    title: 'Turnkey Construction Handover',
    slug: 'turnkey-handover-w6',
    channel: 'website_proof',
    category: 'partner_project',
    target_area: 'Anna Nagar',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/turnkey-construction-chennai',
    target_keywords: ['turnkey home builder', 'house handover'],
    internal_links: ['/turnkey-construction-chennai']
  },
  {
    title: 'Property Passport Maintenance Update',
    slug: 'passport-maintenance-w6',
    channel: 'youtube_short',
    category: 'property_passport',
    target_area: 'Chennai',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/property-passport',
    target_keywords: ['home maintenance log', 'property records'],
    internal_links: ['/property-passport']
  },
  {
    title: 'DMC Piling vs Micro Piling',
    slug: 'dmc-vs-micro-piling-w6',
    channel: 'learn_article',
    category: 'piling',
    target_area: 'Chennai',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/dmc-piling-contractors-chennai',
    target_keywords: ['DMC piling vs micro piling', 'piling contractors Chennai'],
    internal_links: ['/dmc-piling-contractors-chennai', '/micro-piling-contractors-chennai']
  },
  {
    title: 'Core Test for Concrete Strength',
    slug: 'core-test-concrete-w6',
    channel: 'instagram_reel',
    category: 'structural_audit',
    target_area: 'Porur',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/core-test-concrete-chennai',
    target_keywords: ['core test concrete', 'NDT testing'],
    internal_links: ['/core-test-concrete-chennai']
  },
  {
    title: 'Partner Highlight: Top Architect',
    slug: 'partner-highlight-architect-w6',
    channel: 'linkedin_post',
    category: 'partner_project',
    target_area: 'Chennai',
    status: 'drafted',
    privacy_review_status: 'pending',
    linked_service_url: '/partners',
    target_keywords: ['architects in Chennai', 'best home design'],
    internal_links: ['/partners']
  }
];

async function main() {
  console.log('Seeding Content Calendar (30 Day Plan)...');
  
  const today = new Date();
  
  for (let i = 0; i < starterItems.length; i++) {
    const item = starterItems[i];
    
    // Spread dates across 30 days (1-2 days apart roughly)
    const plannedDate = new Date(today);
    plannedDate.setDate(today.getDate() + Math.floor(i * 1.5));
    
    item.planned_date = plannedDate;

    await prisma.content_calendar_items.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
    
    console.log(`Created/Updated: ${item.title} (${item.planned_date.toISOString().split('T')[0]})`);
  }

  console.log('✅ Content Calendar Seeded Successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
