// src/data/seo/localServices.js
// The 10 core construction services used for the service-area intersection pages
// Each entry includes FAQs and process steps unique to that service

export const localServices = [
  {
    slug: 'home-construction',
    name: 'Home Construction',
    shortName: 'Home Construction',
    verb: 'building your home',
    h1Template: 'Home Construction in {area}, Chennai',
    introTemplate:
      'Planning to build a home in {area}? Buildogram connects you with engineer-verified contractors, provides transparent BOQ reviews, and gives you full visibility into construction costs and material quality — so your {area} home project starts right and finishes strong.',
    processSummary: 'Plan → BOQ Review → Verified Contractor Match → Site Supervision → Quality Handover',
    processSteps: [
      { step: '01', title: 'Requirements & Feasibility', desc: 'Map your plot size, budget, soil conditions, and approval requirements for {area}.' },
      { step: '02', title: 'Architectural Plan & BOQ', desc: 'Our engineers review your architect\'s drawings and itemise the BOQ — catching over-priced line items before construction begins.' },
      { step: '03', title: 'Contractor Matching', desc: 'We connect you with verified contractors with a track record of residential projects in {area} and surrounding localities.' },
      { step: '04', title: 'Site Supervision', desc: 'Our engineers conduct milestone inspections and document quality at each stage — foundation, structure, waterproofing, finishes.' },
      { step: '05', title: 'Property Passport Handover', desc: 'You receive a digital Property Passport with all construction records, warranty documents, and material details.' },
    ],
    faqs: [
      {
        q: 'How do I find a reliable home construction contractor in {area}?',
        a: 'Buildogram\'s verified contractor network includes builders with validated project histories in {area} and across Chennai. All contractors undergo background and quality screening before listing on our platform.',
      },
      {
        q: 'What is the approximate cost of home construction in {area}?',
        a: 'Home construction costs in {area} typically range from {costMin} to {costMax} per sqft depending on specification — basic, standard, or premium. The final cost depends on foundation type, floor count, interior finishes, and material grades. Contact our engineers for a project-specific estimate.',
      },
      {
        q: 'Do I need CMDA or GCC approval for home construction in {area}?',
        a: 'Yes. {approvalNote}. Building without approval is illegal and can result in demolition orders. Buildogram helps you verify approval requirements for your specific plot.',
      },
      {
        q: 'What is a BOQ review and why does it matter for my home construction?',
        a: 'A Bill of Quantities (BOQ) lists every material, labour item, and its quantity and rate. Buildogram\'s engineers audit your contractor\'s BOQ against market rates and engineering norms. This typically saves 8–15% on construction cost by identifying over-priced materials and inflated quantities.',
      },
      {
        q: 'How long does home construction take in {area}?',
        a: 'A standard ground-floor house (800–1200 sqft) typically takes 6–8 months from approval to handover. Multi-storey structures take 10–14 months. Timeline depends on design complexity, monsoon scheduling, and material availability.',
      },
      {
        q: 'What soil challenges should I be aware of when building in {area}?',
        a: '{soilNote}',
      },
    ],
    internalLinks: [
      { text: 'BOQ Review Service', href: '/boq-audit' },
      { text: 'Construction Cost Estimator', href: '/cost-estimator' },
      { text: 'AI Floor Plan Creator', href: '/ai-floor-plan-creator' },
      { text: 'Find Verified Builders', href: '/partners/directory' },
      { text: 'Chennai Construction Locations', href: '/locations/chennai' },
    ],
  },
  {
    slug: 'builders',
    name: 'Verified Builders',
    shortName: 'Builders',
    verb: 'finding verified builders',
    h1Template: 'Verified Builders in {area}, Chennai',
    introTemplate:
      'Looking for trusted builders in {area}? Buildogram\'s verified contractor network includes local builders who have completed residential, commercial, and renovation projects in {area} and nearby localities. We screen every contractor for experience, quality, and reliability.',
    processSummary: 'Verify → Match → Quote Review → Supervised Execution',
    processSteps: [
      { step: '01', title: 'Contractor Screening', desc: 'Every builder in our network is vetted for project history, technical capability, and client references.' },
      { step: '02', title: 'Local Match', desc: 'We shortlist contractors with specific experience in {area}\'s soil, approval, and construction context.' },
      { step: '03', title: 'Quote & BOQ Review', desc: 'We review the contractor\'s quote against market rates before you sign any agreement.' },
      { step: '04', title: 'Engineer Supervision', desc: 'Milestone quality checks at every structural stage ensure the contractor delivers what was promised.' },
    ],
    faqs: [
      {
        q: 'How do I verify a builder\'s credentials in {area}?',
        a: 'Buildogram\'s contractor verification process includes project site visits, client reference checks, and engineer assessment. All listed contractors have verifiable project histories in and around {area}.',
      },
      {
        q: 'What is the difference between a builder and a contractor in Chennai?',
        a: 'A contractor executes based on your plans. A builder typically provides a package deal covering design, approval, and construction. Buildogram works with both — we help you choose the right model and verify their capability.',
      },
      {
        q: 'How many quotes should I get for construction in {area}?',
        a: 'We recommend getting at least 3 quotes and having an engineer review all of them side by side. Buildogram\'s BOQ review service ensures you\'re comparing like-for-like and not being misled by low headline numbers.',
      },
      {
        q: 'What is the typical builder margin on a construction project in Chennai?',
        a: 'Reputable contractors typically quote 15–25% profit margin above material and labour cost. If a quote is significantly below market, investigate which items have been compromised — often material grade or foundation specification.',
      },
      {
        q: 'Can Buildogram supervise my builder during construction in {area}?',
        a: 'Yes. Our site supervision service covers milestone inspections at foundation, plinth, column casting, slab casting, brickwork, waterproofing, and finishing stages. Reports are provided with photographic evidence.',
      },
    ],
    internalLinks: [
      { text: 'Partner Directory', href: '/partners/directory' },
      { text: 'BOQ Audit', href: '/boq-audit' },
      { text: 'Site Supervision Service', href: '/services' },
      { text: 'Plan Review', href: '/plan-review' },
      { text: 'All Chennai Locations', href: '/locations/chennai' },
    ],
  },
  {
    slug: 'boq-review',
    name: 'BOQ & Estimate Review',
    shortName: 'BOQ Review',
    verb: 'reviewing your BOQ and estimates',
    h1Template: 'BOQ & Contractor Quote Review in {area}, Chennai',
    introTemplate:
      'Got a quote from a contractor for your {area} project? Buildogram\'s engineers audit your Bill of Quantities against current Chennai market rates, engineering norms, and quality benchmarks — helping you avoid hidden costs and over-pricing before work begins.',
    processSummary: 'Submit Quote → Engineer Audit → Market Rate Comparison → Report → Negotiation Support',
    processSteps: [
      { step: '01', title: 'Submit Contractor Quote', desc: 'Share your contractor\'s BOQ (Excel or PDF) with our engineers.' },
      { step: '02', title: 'Line-Item Audit', desc: 'We audit every material quantity, labour rate, and item specification against current market data.' },
      { step: '03', title: 'Market Rate Comparison', desc: 'We compare rates for cement, TMT steel, aggregates, labour, and sub-contractor items against prevailing {area} and Chennai market rates.' },
      { step: '04', title: 'Detailed Report', desc: 'You receive a comprehensive BOQ audit report highlighting over-priced items, missing items, and areas of risk.' },
      { step: '05', title: 'Negotiation Support', desc: 'Our engineers can join contractor meetings to help you negotiate a fair, transparent agreement.' },
    ],
    faqs: [
      {
        q: 'What is a BOQ review and why do I need it for my {area} project?',
        a: 'A Bill of Quantities (BOQ) is a line-by-line cost breakdown of your construction project. BOQ review by Buildogram\'s engineers identifies over-priced items, missing items, and specification risks before you sign with a contractor — typically saving 8–15% on total project cost.',
      },
      {
        q: 'What construction materials should I verify in a BOQ for a {area} project?',
        a: 'Key materials to verify include: cement (grade and quantity), TMT steel (grade and weight), M-sand vs river sand, RMC mix design, tile specifications, waterproofing compound, electrical conduit and wiring specs, and plumbing pipe grades.',
      },
      {
        q: 'How much does a BOQ audit cost at Buildogram?',
        a: 'BOQ audit pricing varies by project size and complexity. Contact our team for a project-specific quote. Given the typical savings of 8–15%, the audit cost is usually recovered in the first phase of construction.',
      },
      {
        q: 'What is the difference between a package quote and a BOQ?',
        a: 'A package quote (e.g., ₹1,800/sqft all-in) gives you one number but hides material specifications and quantities. A BOQ breaks down every cost separately, giving you full transparency and accountability throughout the project.',
      },
      {
        q: 'Can a contractor refuse a BOQ audit?',
        a: 'Any reputable contractor should be comfortable with independent BOQ review. Resistance to a BOQ audit is itself a red flag. Buildogram always recommends insisting on a detailed BOQ before signing any construction agreement.',
      },
    ],
    internalLinks: [
      { text: 'BOQ Audit Tool', href: '/boq-audit' },
      { text: 'Construction Cost Estimator', href: '/cost-estimator' },
      { text: 'Find Verified Builders', href: '/partners/directory' },
      { text: 'Home Construction Guide', href: '/resources/construction-guide' },
      { text: 'Chennai Locations', href: '/locations/chennai' },
    ],
  },
  {
    slug: 'construction-cost',
    name: 'Construction Cost Estimate',
    shortName: 'Construction Cost',
    verb: 'estimating your construction cost',
    h1Template: 'Home Construction Cost in {area}, Chennai — 2025 Guide',
    introTemplate:
      'Wondering how much it costs to build a house in {area}? Buildogram provides transparent, engineer-verified construction cost breakdowns for residential projects in {area}, covering foundation, structure, brickwork, roofing, and all finishes.',
    processSummary: 'Plot Details → Cost Estimate → BOQ Breakdown → Market Rate Verification',
    processSteps: [
      { step: '01', title: 'Enter Plot & Project Details', desc: 'Provide your plot size, location in {area}, floor count, and specification level (basic, standard, or premium).' },
      { step: '02', title: 'AI Cost Estimate', desc: 'Buildogram\'s estimator generates a cost range based on current market data and area-specific factors.' },
      { step: '03', title: 'Engineer Review', desc: 'Our engineers review your estimate and flag any unusual variables — soil conditions in {area}, floor count, or specification choices that affect cost.' },
      { step: '04', title: 'BOQ Generation', desc: 'Convert your estimate into a full project BOQ — ready for contractor comparison.' },
    ],
    faqs: [
      {
        q: 'What is the construction cost per sqft in {area} in 2025?',
        a: 'Construction costs in {area} typically range from {costMin} to {costMax} per sqft depending on specification level. Basic (₹{costMin}–{midCost}/sqft): standard materials, simple finishes. Premium (₹{midCost}–{costMax}/sqft): higher specification, quality finishes, imported tiles. These are estimates — final cost depends on soil conditions, number of floors, and specific finish choices.',
      },
      {
        q: 'What factors affect construction cost in {area}?',
        a: 'Key factors include: soil type (pile foundation costs more), number of floors, material specification (OPC cement, TMT grade, tile quality), interior finishes, bathroom fixtures, and electrical complexity. {area}-specific factors: {soilNote}',
      },
      {
        q: 'Is construction cheaper in {area} compared to central Chennai?',
        a: 'Generally, {area} has {costCompare}. Labour costs across Chennai are similar, but land and specific material logistics may vary. Always get site-specific quotes.',
      },
      {
        q: 'What is typically not included in a contractor\'s sqft rate?',
        a: 'Most sqft-rate quotes exclude: government approvals and plan fees, soil testing, site clearing and demolition, compound wall and gate, bore well, overhead water tank, landscaping, utility connections, and interior furniture. Always ask for a detailed inclusion list.',
      },
      {
        q: 'How can I reduce construction cost in {area} without compromising quality?',
        a: 'Key strategies: (1) Get an independent BOQ review before signing — save 8–15%. (2) Source cement and TMT steel directly through Buildogram marketplace at verified rates. (3) Use M-sand instead of river sand where appropriate. (4) Plan multiple floors from the start (amortises foundation cost). (5) Avoid mid-project specification changes.',
      },
    ],
    internalLinks: [
      { text: 'Online Construction Cost Estimator', href: '/cost-estimator' },
      { text: 'BOQ Audit', href: '/boq-audit' },
      { text: 'Construction Materials Marketplace', href: '/materials' },
      { text: 'Find Verified Contractors', href: '/partners/directory' },
      { text: 'Home Construction Guide', href: '/resources/construction-guide' },
    ],
  },
  {
    slug: 'site-supervision',
    name: 'Site Supervision',
    shortName: 'Site Supervision',
    verb: 'supervising your construction site',
    h1Template: 'Construction Site Supervision in {area}, Chennai',
    introTemplate:
      'Is your contractor delivering what was promised? Buildogram\'s engineer-led site supervision service provides independent milestone inspections for construction projects in {area} — giving you photographic evidence, quality reports, and professional accountability at every stage.',
    processSummary: 'Kickoff Meeting → Milestone Schedule → Site Visits → Photo Reports → Deficiency Tracking',
    processSteps: [
      { step: '01', title: 'Project Onboarding', desc: 'Review your construction agreement, BOQ, and site location in {area}. Define inspection milestones.' },
      { step: '02', title: 'Milestone Inspections', desc: 'Engineer visits at critical stages: foundation excavation, footing concrete, plinth beam, column casting, slab shuttering, slab concrete, brickwork, waterproofing, and finishes.' },
      { step: '03', title: 'Photo Documentation', desc: 'Every site visit produces a dated photographic report documenting actual conditions, materials used, and concrete grades.' },
      { step: '04', title: 'Deficiency Reports', desc: 'Non-conformances are documented and issued to the contractor with resolution timelines.' },
      { step: '05', title: 'Property Passport Integration', desc: 'All inspection records become part of your Property Passport — a permanent quality and warranty record.' },
    ],
    faqs: [
      {
        q: 'Why do I need site supervision in {area}?',
        a: 'Contractors self-report on quality. Independent engineering supervision verifies the actual work — concrete mix, rebar spacing, waterproofing application, and material grade. This protects your investment and catches problems before they become permanent.',
      },
      {
        q: 'What milestones should a site supervisor check for a home in {area}?',
        a: 'Foundation excavation and depth verification, footing concrete pour, plinth beam concrete, column reinforcement before pour, slab shuttering level, slab concrete pour (grade and slump test), brickwork dimensions, waterproofing on slab and below-plinth, plaster and finish quality, and final electrical/plumbing checks.',
      },
      {
        q: 'How often will the Buildogram engineer visit my site in {area}?',
        a: 'Visit frequency depends on your project phase and selected supervision package. Typically: structural stages warrant weekly visits, finishing stages fortnightly. Emergency visits can be arranged for any critical pour or waterproofing application.',
      },
      {
        q: 'Can I use site supervision if construction has already started?',
        a: 'Yes. Buildogram can onboard mid-project. We conduct a baseline condition assessment and continue from the current stage. Early onboarding is better, but mid-project supervision still adds significant value.',
      },
      {
        q: 'What happens if the contractor ignores the site supervisor\'s deficiency report?',
        a: 'Buildogram\'s supervision reports are documented evidence. If a contractor refuses to correct deficiencies, you have written engineering records to support contractual action, withholding of payments, or escalation.',
      },
    ],
    internalLinks: [
      { text: 'BOQ Audit', href: '/boq-audit' },
      { text: 'Property Passport', href: '/property-passport' },
      { text: 'Plan Review', href: '/plan-review' },
      { text: 'Verified Contractor Directory', href: '/partners/directory' },
      { text: 'Quality Inspection Guide', href: '/resources/construction-guide' },
    ],
  },
  {
    slug: 'plan-review',
    name: 'Architectural Plan Review',
    shortName: 'Plan Review',
    verb: 'reviewing your architectural plan',
    h1Template: 'Architectural Plan Review for {area}, Chennai — Engineer Check',
    introTemplate:
      'Before you submit for CMDA or GCC approval — or hand drawings to a contractor — get your architectural plan independently reviewed. Buildogram\'s engineers audit your plan for structural feasibility, CMDA/GCC compliance, Vastu considerations, and practical construction viability in {area}.',
    processSummary: 'Submit Plans → Structural Audit → Compliance Check → Feedback Report',
    processSteps: [
      { step: '01', title: 'Upload Plans', desc: 'Share architectural drawings (PDF or DWG) along with your plot details and {area} location.' },
      { step: '02', title: 'Structural Feasibility', desc: 'Engineers check floor plan layout, load path, beam and column grid, and slab design for the given site conditions in {area}.' },
      { step: '03', title: 'Approval Compliance', desc: 'Verify setbacks, FSI, height compliance, and relevant local rules for {approvalBody} jurisdiction.' },
      { step: '04', title: 'Practical Feedback', desc: 'Receive a detailed feedback report covering structural concerns, value engineering opportunities, and construction sequence recommendations.' },
    ],
    faqs: [
      {
        q: 'Why should I get my plan reviewed before construction in {area}?',
        a: 'Architectural plans drawn without structural engineering input often contain inadequate beam/column sizing, incorrect slab spans, or compliance issues. Catching these before construction saves costly rework. {area}\'s specific conditions — {soilNote} — make professional review especially important.',
      },
      {
        q: 'What does a plan review check for {area} specifically?',
        a: 'For {area}: structural adequacy given soil conditions, compliance with {approvalBody} setback and FSI norms, adequate waterproofing provisions (if flood risk zone), appropriate plinth height, and practical material logistics on your site.',
      },
      {
        q: 'Can I get a Vastu compliance check during the plan review?',
        a: 'Yes. Buildogram\'s plan review includes a Vastu orientation check covering main door direction, kitchen placement, bedroom zones, and toilet placement relative to the compass direction — an important consideration for many homeowners in Chennai.',
      },
      {
        q: 'What is the turnaround time for a plan review?',
        a: 'Standard plan review takes 3–5 working days. We provide a detailed written report with annotated drawings highlighting concerns and recommendations.',
      },
    ],
    internalLinks: [
      { text: 'AI Floor Plan Creator', href: '/ai-floor-plan-creator' },
      { text: 'BOQ Audit', href: '/boq-audit' },
      { text: 'Site Supervision', href: '/services' },
      { text: 'Find Verified Architects', href: '/partners/directory' },
      { text: 'Construction Cost Estimator', href: '/cost-estimator' },
    ],
  },
  {
    slug: 'material-sourcing',
    name: 'Construction Material Sourcing',
    shortName: 'Material Sourcing',
    verb: 'sourcing construction materials',
    h1Template: 'Construction Material Sourcing in {area}, Chennai — Transparent Rates',
    introTemplate:
      'Getting market-rate pricing on cement, TMT steel, M-sand, and other construction materials in {area}? Buildogram connects you directly with verified suppliers and provides transparent material pricing — no middlemen, no markup opacity.',
    processSummary: 'Material Requirement → Supplier Match → Rate Comparison → Verified Delivery',
    processSteps: [
      { step: '01', title: 'Share Material Needs', desc: 'Input your project BOQ material requirements for your {area} project.' },
      { step: '02', title: 'Supplier Matching', desc: 'We match you with verified suppliers who service {area} with proven delivery reliability.' },
      { step: '03', title: 'Transparent Quotes', desc: 'Receive side-by-side rate comparisons — cement, TMT, M-sand, bricks, aggregates, and more.' },
      { step: '04', title: 'Delivery Coordination', desc: 'We help coordinate logistics — delivery scheduling, load sizes, and site access planning for your {area} project.' },
    ],
    faqs: [
      {
        q: 'What is the current price of cement in {area} (2025)?',
        a: 'Cement prices in Chennai and {area} vary by brand and grade. OPC 53 Grade typically ranges from ₹380–₹430 per bag (50kg) from direct suppliers. Retail store prices are typically 5–10% higher. Contact Buildogram for current verified rates.',
      },
      {
        q: 'What is the current TMT steel price in {area}?',
        a: 'TMT steel (Fe500D, 8mm–25mm) in Chennai ranges from ₹58,000–₹70,000 per metric tonne depending on brand and current market conditions. Verify before purchase as steel prices fluctuate. Buildogram provides current verified rates from accredited suppliers.',
      },
      {
        q: 'Should I use M-sand or river sand for construction in {area}?',
        a: 'M-sand (manufactured sand) is the legally preferred and more sustainable option in Tamil Nadu given restrictions on river sand quarrying. Quality M-sand from certified manufacturers provides equivalent or better construction results. Buildogram verifies M-sand grading compliance for suppliers.',
      },
      {
        q: 'How can I avoid adulterated or substandard materials in {area}?',
        a: 'Ask for material test certificates (IS compliance, lab test reports). Buildogram\'s supplier network is verified for material quality compliance. We recommend third-party material testing for any large-volume purchase of cement, steel, or concrete.',
      },
    ],
    internalLinks: [
      { text: 'Construction Materials Marketplace', href: '/materials' },
      { text: 'Cement Pricing', href: '/materials/cement' },
      { text: 'TMT Steel', href: '/materials/steel' },
      { text: 'M-Sand', href: '/materials/sand' },
      { text: 'BOQ Audit', href: '/boq-audit' },
    ],
  },
  {
    slug: 'commercial-construction',
    name: 'Commercial Construction',
    shortName: 'Commercial Construction',
    verb: 'commercial construction projects',
    h1Template: 'Commercial Construction in {area}, Chennai',
    introTemplate:
      'Planning a commercial building in {area}? Buildogram\'s engineer-led support covers commercial project feasibility, structural plan review, BOQ audit, contractor verification, and site supervision — giving business owners full control and transparency over their construction investment.',
    processSummary: 'Feasibility → Plan Compliance → BOQ → Verified Contractor → Supervised Build',
    processSteps: [
      { step: '01', title: 'Commercial Feasibility', desc: 'Assess plot zoning, FSI, FAR, and commercial use permissions for your {area} plot.' },
      { step: '02', title: 'Structural & Compliance Review', desc: 'Review commercial structural plans for load requirements, fire safety, and {approvalBody} compliance.' },
      { step: '03', title: 'BOQ Audit', desc: 'Audit the commercial BOQ — verify structural steel, concrete grades, MEP specifications, and finishing specifications.' },
      { step: '04', title: 'Contractor Selection', desc: 'Match with contractors experienced in commercial building in {area}.' },
      { step: '05', title: 'Supervised Execution', desc: 'Regular milestone inspections with documented quality reports.' },
    ],
    faqs: [
      {
        q: 'What approval is needed for commercial construction in {area}?',
        a: '{approvalBody} building plan approval is required for commercial construction. Commercial buildings typically require additional clearances: fire NOC, lift NOC (for multi-floor), and environmental clearance for large footprint projects. Buildogram helps you navigate the {area} approval process.',
      },
      {
        q: 'What is the commercial construction cost per sqft in {area}?',
        a: 'Commercial construction in {area} typically costs 20–40% more than residential per sqft due to heavier structural requirements, MEP (mechanical, electrical, plumbing) complexity, and commercial-grade finishes. Contact Buildogram engineers for a project-specific estimate.',
      },
      {
        q: 'Is {area} suitable for commercial construction?',
        a: '{area} is {region}, making it {commercialSuitability}. Verify commercial zoning permission for your specific plot before purchase — not all residential-zone plots permit commercial construction.',
      },
    ],
    internalLinks: [
      { text: 'BOQ Audit', href: '/boq-audit' },
      { text: 'Find Commercial Contractors', href: '/partners/directory' },
      { text: 'Construction Cost Estimator', href: '/cost-estimator' },
      { text: 'All Services', href: '/services' },
      { text: 'Chennai Locations', href: '/locations/chennai' },
    ],
  },
  {
    slug: 'renovation',
    name: 'Renovation & Remodelling',
    shortName: 'Renovation',
    verb: 'renovating your property',
    h1Template: 'Home Renovation Contractors in {area}, Chennai',
    introTemplate:
      'Renovating an existing home or commercial space in {area}? Buildogram provides renovation contractor verification, scope-of-work review, material pricing, and site supervision — ensuring your renovation in {area} delivers value without hidden costs or contractor surprises.',
    processSummary: 'Scope Review → Contractor Verification → Material Quote → Supervised Work',
    processSteps: [
      { step: '01', title: 'Renovation Scope Definition', desc: 'Clearly define what is being renovated — waterproofing, flooring, kitchen, bathroom, structural alterations — and document it precisely.' },
      { step: '02', title: 'Structural Safety Check', desc: 'If structural changes are planned, our engineers verify the impact on existing structure — especially critical in older buildings.' },
      { step: '03', title: 'Contractor Verification', desc: 'We verify renovation contractors for quality work history in {area}.' },
      { step: '04', title: 'Material & Rate Check', desc: 'Audit renovation quotes for material rates and labour items against current market.' },
    ],
    faqs: [
      {
        q: 'Do I need approval for home renovation in {area}?',
        a: 'Minor internal modifications typically do not require new building plan approval. However, structural changes (removing load-bearing walls, adding floors) require {approvalBody} sanction. Waterproofing, painting, and non-structural interior work generally does not.',
      },
      {
        q: 'What is the renovation cost per sqft in {area}?',
        a: 'Full renovation (tiling, electrical, plumbing, painting, and kitchen/bathroom remodel) typically ranges from ₹600–₹1,200 per sqft in {area} depending on finish specification. Structural renovation costs vary significantly — contact Buildogram for a scope-specific estimate.',
      },
      {
        q: 'How do I avoid renovation fraud in {area}?',
        a: 'Common red flags: no written scope of work, cash-only requests, unusually low quotes, no material specification, and requests for large advance. Buildogram\'s contractor verification and scope review process protects against these risks.',
      },
    ],
    internalLinks: [
      { text: 'Renovation Contractor Directory', href: '/partners/directory' },
      { text: 'BOQ Audit', href: '/boq-audit' },
      { text: 'Materials Marketplace', href: '/materials' },
      { text: 'Site Supervision', href: '/services' },
      { text: 'Construction Guide', href: '/resources/construction-guide' },
    ],
  },
  {
    slug: 'turnkey-construction',
    name: 'Turnkey Construction',
    shortName: 'Turnkey',
    verb: 'turnkey construction',
    h1Template: 'Turnkey Home Construction in {area}, Chennai',
    introTemplate:
      'Want a single contractor to manage your entire home construction in {area} from design to handover? Buildogram helps you choose and supervise a trustworthy turnkey contractor — ensuring transparency, quality, and accountability throughout the process.',
    processSummary: 'Design → BOQ → Fixed Price Agreement → Supervised Build → Quality Handover',
    processSteps: [
      { step: '01', title: 'Turnkey Scope Definition', desc: 'Define a precise scope of work — from foundation to interior finishes. Ambiguity is the main risk in turnkey contracts.' },
      { step: '02', title: 'BOQ Verification', desc: 'Buildogram engineers audit the turnkey BOQ to ensure all line items are included and priced fairly for {area}.' },
      { step: '03', title: 'Contract Review', desc: 'We review the construction agreement for milestone payment terms, penalty clauses, material specifications, and warranty conditions.' },
      { step: '04', title: 'Supervised Execution', desc: 'Independent milestone inspections ensure the turnkey contractor delivers what was agreed.' },
    ],
    faqs: [
      {
        q: 'What is the turnkey construction rate in {area}?',
        a: 'Turnkey packages in {area} typically range from ₹{costMin}–₹{costMax} per sqft, but what is included varies enormously. Always demand a detailed specification list before comparing packages.',
      },
      {
        q: 'What is the risk with turnkey construction?',
        a: 'The main risk is specification ambiguity — a low turnkey price often hides downgraded material grades, thinner walls, or excluded items. Buildogram\'s contract and BOQ review service identifies these gaps before you sign.',
      },
      {
        q: 'Can I get a fixed price guarantee for my {area} project?',
        a: 'A genuinely fixed price requires a fully defined scope with no scope gaps. Buildogram helps you create a watertight scope of work and BOQ — the foundation of any valid fixed-price agreement.',
      },
    ],
    internalLinks: [
      { text: 'BOQ Audit', href: '/boq-audit' },
      { text: 'Find Turnkey Contractors', href: '/partners/directory' },
      { text: 'Construction Cost Estimator', href: '/cost-estimator' },
      { text: 'Property Passport', href: '/property-passport' },
      { text: 'Home Construction Guide', href: '/resources/construction-guide' },
    ],
  },
];

export const localServiceMap = Object.fromEntries(localServices.map(s => [s.slug, s]));
