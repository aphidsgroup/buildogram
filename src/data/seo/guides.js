// src/data/seo/guides.js
// Guide/article data for /guides/[slug]

export const guides = [
  {
    slug: 'what-is-boq-in-construction',
    category: 'boq',
    title: 'What is a BOQ in Construction?',
    metaTitle: 'What is a BOQ in House Construction? Complete Guide | Buildogram',
    metaDescription: 'Learn what a Bill of Quantities (BOQ) is in construction, why it matters, what it should contain, and how to use it to protect yourself as a homeowner.',
    intro: 'A Bill of Quantities (BOQ) is the most important document in a construction project. It is a detailed, itemized list of all materials, quantities, specifications, and rates required to complete a construction project. Yet most homeowners sign BOQs without fully understanding what they contain — or what they are missing.',
    sections: [
      {
        heading: 'Why a BOQ Matters for Homeowners',
        content: 'Without a proper BOQ, your construction cost is a guess — not a commitment. A detailed BOQ locks your contractor to specific materials, grades, and quantities. Any deviation from the BOQ is a measurable, documentable change — not a subjective dispute.',
      },
      {
        heading: 'What a Good BOQ Must Include',
        items: ['Substructure: Excavation, PCC, foundations, anti-termite treatment', 'Superstructure: RCC columns, beams, slabs with specified concrete grades', 'Masonry: Block/brick type, mortar specification', 'Plastering: Internal and external plastering with thickness', 'Waterproofing: Terrace, bathrooms, sump specification', 'Flooring: Tile type, brand, size for each area', 'Doors & Windows: Material, size, hardware specification', 'Electrical: Wire grade, brand, switch brands, MCB ratings', 'Plumbing: Pipe material, brand, fixture specification', 'Painting: Brand, grade, number of coats', 'Miscellaneous: Sump, overhead tank, staircase, elevation features'],
      },
      {
        heading: 'Common BOQ Red Flags',
        content: 'Watch out for these warning signs in a contractor\'s BOQ:',
        items: ['Generic descriptions like "concrete work" without specifying grade (M20, M25)', 'No mention of steel grade (Fe500, Fe500D)', '"Quality materials as per site" — meaning the contractor decides at their convenience', 'Missing items: often temporary works, excavation, plinth beam, or waterproofing', 'Lump sum amounts without item breakdown', 'Rates that seem unusually low (often because key items are missing)'],
      },
      {
        heading: 'The Buildogram Approach to BOQ',
        content: 'Buildogram creates itemized BOQs where every line item has a quantity, unit, specification, and rate. Your BOQ is generated from structural drawings, ensuring quantities match what is actually being built. The BOQ is part of your contract — it is not a quotation that changes during construction.',
      },
    ],
    checklist: ['Is every construction activity listed? (Not just "civil work")','Is the concrete grade specified for each RCC element?','Is the steel grade and diameter specified?','Are material brands named for key items (cement, steel, tiles, paint)?','Are quantities cross-verified against your architectural drawings?','Are rates realistic for current Chennai market conditions?','Are payment milestones linked to specific BOQ completion items?'],
    faqs: [
      { q: 'Is a BOQ the same as a contractor estimate?', a: 'No. A contractor estimate is often a rough guess or strategic low number to win the contract. A BOQ is a detailed, itemized document with quantities, specifications, and rates that becomes part of your contract.' },
      { q: 'Who prepares the BOQ?', a: 'The contractor or quantity surveyor prepares the BOQ. Buildogram prepares your BOQ from your architectural and structural drawings, ensuring quantities are calculated — not guessed.' },
      { q: 'What should I do if my contractor refuses to give a detailed BOQ?', a: 'A contractor who refuses to give an itemized BOQ is a risk. Walk away or insist in writing. Buildogram can review any BOQ you receive and identify gaps before you sign.' },
      { q: 'Can the BOQ change during construction?', a: 'BOQ changes should only happen through a signed Change Order document. Any cost increase must be documented, explained, and approved by you in writing before the contractor proceeds.' },
    ],
    relatedServices: ['/boq-audit', '/services/boq-review', '/services/construction-consultation'],
    relatedGuides: ['how-to-compare-contractor-quotes', 'boq-checklist-for-homeowners', 'why-low-construction-quote-can-be-risky'],
    cta: { text: 'Get Your BOQ Reviewed', href: '/boq-audit' },
  },

  {
    slug: 'how-to-compare-contractor-quotes',
    category: 'boq',
    title: 'How to Compare Contractor Quotes for House Construction',
    metaTitle: 'How to Compare Contractor Quotes for Home Construction | Buildogram',
    metaDescription: 'A step-by-step guide to comparing contractor quotes accurately for house construction in Chennai. What to look for, red flags, and how to make an informed decision.',
    intro: 'Receiving 3 quotes from contractors and choosing the lowest one is one of the most common and costly mistakes homeowners make. Quotes are not comparable unless they are based on identical scope, specifications, and materials. This guide teaches you how to compare them the right way.',
    sections: [
      { heading: 'Why the Lowest Quote is Often a Trap', content: 'A low quote usually means items are missing from scope, material grades are not specified, or the contractor is planning to escalate costs mid-construction. By the time you notice, you have already paid mobilization amounts and are committed.' },
      { heading: 'Step 1: Make Sure All Quotes Are Based on the Same Scope', content: 'Before comparing numbers, ensure every contractor quoted for the same built-up area, same floors, same material grades, and same scope items. A quote for "construction" without specifying tile type, electrical brand, or steel grade is not a comparable quote.' },
      { heading: 'Step 2: Check for Missing Line Items', items: ['Temporary works: site cleaning, shuttering, scaffolding', 'Soil testing costs', 'Foundation type (footings vs. piles)', 'Waterproofing (terrace, bathrooms, sump)', 'External work: compound wall, drive, drainage', 'Electrical: mains wiring, DB board, earthing', 'Plumbing: complete system including overhead tank'] },
      { heading: 'Step 3: Verify Material Specifications', content: 'For every major material, the quote should specify: Concrete grades (M20, M25, M30) for each element. Steel grade (Fe500D preferred). Cement brand (or "equivalent brand" should be challenged). Tile brands and grade. Wire brands and specification.' },
      { heading: 'Step 4: Understand Payment Terms', content: 'Milestone-based payments tied to construction stages are safer than time-based or demand-based payments. Ensure the payment schedule is linked to verifiable completion — not just calendar dates.' },
      { heading: 'Step 5: Get a BOQ Audit', content: 'If you have received quotes and are confused about how to compare them, Buildogram\'s BOQ review service will analyze each quote and provide a clear comparison of scope, specifications, and rates.' },
    ],
    checklist: ['Are all quotes based on identical scope?', 'Are concrete grades specified?', 'Is steel grade specified?', 'Are brands mentioned for key materials?', 'Are waterproofing and electrical fully scoped?', 'Are payment terms milestone-based?', 'Is there a warranty clause in the contract?'],
    faqs: [
      { q: 'Should I always choose the middle quote?', a: 'Not necessarily. The middle quote may be as incomplete as the lowest. Evaluate scope and specifications first. The right choice is the most transparent and complete quote, not the median price.' },
      { q: 'Can Buildogram review multiple contractor quotes for me?', a: 'Yes. Upload your quotes to Buildogram\'s BOQ audit service and we will provide a comparative analysis identifying scope gaps, specification differences, and rate benchmarks.' },
    ],
    relatedServices: ['/boq-audit', '/services/construction-consultation'],
    relatedGuides: ['what-is-boq-in-construction', 'why-low-construction-quote-can-be-risky', 'questions-to-ask-before-finalizing-contractor'],
    cta: { text: 'Review Your Contractor Quotes', href: '/boq-audit' },
  },

  {
    slug: 'why-low-construction-quote-can-be-risky',
    category: 'boq',
    title: 'Why a Low Construction Quote Can Be Risky',
    metaTitle: 'Why Low Construction Quotes Are Risky for Homeowners | Buildogram',
    metaDescription: 'Understand why accepting a low construction quote without scrutiny is one of the biggest financial risks homeowners face. Common tactics and how to protect yourself.',
    intro: 'A low construction quote feels like a win. But in most cases, it is the beginning of a series of costly surprises. Understanding how and why low quotes are structured helps you make a more informed decision.',
    sections: [
      { heading: 'How Low Quotes Are Typically Structured', items: ['Missing items: waterproofing, compound wall, external work left out', 'Underspecified materials: "M15 concrete" instead of M25', 'Low labour rates that change during construction', 'No warranty provisions', 'Open-ended clauses: "Materials as per availability"'] },
      { heading: 'The Escalation Pattern', content: 'Most low-quote projects follow this pattern: mobilization advance paid → contractor starts work → "surprise" scope additions appear → homeowner is committed financially and emotionally → final cost is 30–50% above original quote.' },
      { heading: 'Hidden Costs That Are Commonly Omitted', items: ['SBC (Soil Bearing Capacity) testing', 'Anti-termite treatment', 'External drainage and RCC drain channels', 'Staircase and parapet walls', 'Overhead water tank (RCC or Sintex)', 'Sump construction', 'Electrical main panels and earthing', 'Plumbing overhead tank connection'] },
      { heading: 'How to Protect Yourself', content: 'Always insist on an itemized BOQ with specifications before signing. Have an independent engineer review the BOQ. Link all payments to milestone completion. Use a signed change order process for any scope additions.' },
    ],
    faqs: [
      { q: 'Is it ever safe to go with the lowest quote?', a: 'Yes, if the lowest quote is fully itemized, with all specifications, realistic quantities, and comparable scope to higher quotes. The problem is rarely price — it is scope completeness.' },
    ],
    relatedServices: ['/boq-audit', '/services/boq-review'],
    relatedGuides: ['what-is-boq-in-construction', 'how-to-compare-contractor-quotes'],
    cta: { text: 'Get BOQ Reviewed Before Signing', href: '/boq-audit' },
  },

  {
    slug: 'construction-cost-per-square-foot-chennai',
    category: 'boq',
    title: 'Construction Cost Per Square Foot in Chennai (2024–25 Guide)',
    metaTitle: 'House Construction Cost Per Sq Ft in Chennai 2024 | Buildogram',
    metaDescription: 'Understand realistic house construction costs per square foot in Chennai for 2024–25. Standard, premium, and luxury ranges with cost drivers explained.',
    intro: 'One of the first questions every homeowner asks is: "What is the construction cost per square foot in Chennai?" The honest answer is: it depends on what you are building and how. This guide explains the ranges, what drives cost up or down, and how to use this information wisely.',
    sections: [
      { heading: 'Why "Per Sq Ft" Rates Are Misleading', content: 'Per sq.ft. rates are marketing tools, not engineering measurements. A contractor can quote ₹1,600 per sq.ft. but exclude waterproofing, compound wall, electrical, and premium finishes. Another quotes ₹2,200 but includes everything. Always compare itemized BOQs — not per sq.ft. rates.' },
      { heading: 'Typical Cost Ranges in Chennai (2024–25)', items: ['Standard specification (M25 RCC, economy tiles, standard electrical): ₹1,800–₹2,400 per sq.ft. (built-up area)', 'Mid-range specification (M25 RCC, vitrified tiles, branded electrical, good finish): ₹2,400–₹3,200 per sq.ft.', 'Premium specification (M25-M30 RCC, premium tiles, premium brands throughout): ₹3,200–₹4,500+ per sq.ft.'], },
      { heading: 'Key Factors That Drive Construction Cost', items: ['Concrete grade specified (M25 vs M20)', 'Steel grade (Fe500D vs Fe415)', 'Tile brand and size', 'Electrical brand (Havells/Legrand vs local)', 'Number of floors (multi-floor adds structural cost)', 'Basement or car park (significant additional cost)', 'Elevation complexity (premium elevation costs more)', 'Site conditions (rock in soil = higher excavation cost)'] },
      { heading: 'Cost Is Not Everything', content: 'The quality of your construction is determined by what goes into it — materials, supervision, and structural engineering rigor. A home built at ₹2,200/sqft with proper documentation, correct specification, and engineer supervision will outlast a home built at ₹1,800/sqft without any quality control.' },
    ],
    faqs: [
      { q: 'Does Buildogram offer fixed per sq.ft. contracts?', a: 'No. Buildogram uses itemized BOQ contracts. A BOQ locks your cost by specifying every line item — which is far more reliable than a per sq.ft. rate that leaves room for hidden cost escalation.' },
      { q: 'What is the cost for a G+1 house in Chennai?', a: 'A G+1 house with standard specification (1200 sq.ft. built-up) in Chennai typically falls in the range of ₹22–₹35 lakh for civil and structural work, depending on specification level and site conditions. Use our cost estimator for a more detailed range.' },
    ],
    relatedServices: ['/cost-estimator', '/boq-audit', '/services/house-construction'],
    relatedGuides: ['what-is-boq-in-construction', 'how-to-avoid-hidden-construction-costs'],
    cta: { text: 'Try Our Cost Estimator', href: '/cost-estimator' },
  },

  {
    slug: 'boq-checklist-for-homeowners',
    category: 'boq',
    title: 'BOQ Checklist for Homeowners: What to Verify Before Signing',
    metaTitle: 'BOQ Checklist for Homeowners Before Signing a Construction Contract | Buildogram',
    metaDescription: 'A practical BOQ checklist for homeowners to verify before signing a construction contract in Chennai. Structural items, finishes, MEP, and payment terms.',
    intro: 'Before you sign any construction contract, use this checklist to verify your contractor\'s BOQ is complete, specific, and realistic. Missing even one major item can lead to a costly dispute mid-construction.',
    sections: [
      { heading: 'Structural & Substructure Checklist', items: ['SBC testing cost included?', 'Excavation and disposal included?', 'PCC bed specified (mix grade)?', 'Foundation type specified (isolated footing, raft, pile)?', 'Anti-termite treatment included?', 'Plinth beam and plinth filling included?', 'Concrete grade specified for each element (footing, column, slab)?', 'Steel grade and diameter schedule provided?'] },
      { heading: 'Masonry & Plastering', items: ['Block/brick type specified (solid, hollow, AAC)?', 'Mortar mix specified?', 'Internal plaster thickness specified?', 'External plaster specification?', 'Parapet wall height and thickness?'] },
      { heading: 'Waterproofing', items: ['Terrace waterproofing system specified (brand and type)?', 'Bathroom waterproofing included?', 'Sump waterproofing included?', 'Water testing / ponding test included?'] },
      { heading: 'Flooring & Finishes', items: ['Tile type and brand per area?', 'Skirting specification?', 'Staircase finishing?'] },
      { heading: 'MEP (Mechanical, Electrical, Plumbing)', items: ['Wire brand and grade?', 'Switch brand?', 'MCB and DB board specification?', 'Earthing specification?', 'Plumbing pipe brand and material (CPVC/uPVC)?', 'Bathroom fixtures specification?', 'Overhead tank — RCC or Sintex, capacity?', 'Sump capacity?'] },
      { heading: 'External Work', items: ['Compound wall included?', 'Drive / pathway?', 'RCC drain / stormwater?', 'Gate specification?'] },
    ],
    faqs: [
      { q: 'What if my contractor\'s BOQ is missing some of these items?', a: 'Ask the contractor to add missing items with quantities and rates before signing. If they refuse or cannot explain the omission, use Buildogram\'s BOQ audit service for an independent review.' },
    ],
    relatedServices: ['/boq-audit', '/services/construction-consultation'],
    relatedGuides: ['what-is-boq-in-construction', 'how-to-compare-contractor-quotes'],
    cta: { text: 'Get Your BOQ Audited', href: '/boq-audit' },
  },

  {
    slug: 'questions-to-ask-before-finalizing-contractor',
    category: 'boq',
    title: '20 Questions to Ask Before Finalizing a Construction Contractor',
    metaTitle: '20 Questions to Ask Your Contractor Before Signing | Buildogram',
    metaDescription: '20 critical questions every homeowner should ask a construction contractor before signing a contract. Covers quality, experience, BOQ, warranty, and payment terms.',
    intro: 'Choosing the right contractor is one of the most important decisions in your construction journey. These 20 questions will help you evaluate a contractor\'s reliability, transparency, and technical capability before you commit.',
    sections: [
      { heading: 'Experience & References', items: ['How many residential construction projects have you completed in the last 2 years?', 'Can I visit one of your recently completed projects?', 'Can you provide contact details of 2-3 past clients who are willing to speak?', 'Have you built in this specific area/soil type before?'] },
      { heading: 'BOQ & Pricing', items: ['Will you provide a detailed itemized BOQ with quantities, brands, and rates?', 'What happens if material prices change after signing?', 'What items are NOT included in your quote?', 'Can you explain why your quote is different from the other quotes I received?'] },
      { heading: 'Construction Quality', items: ['Who is the site engineer responsible for my project daily?', 'Do you conduct concrete slump tests and cube compression tests?', 'What concrete grades do you use for slabs and columns?', 'What steel grade do you specify?'] },
      { heading: 'Documentation & Warranty', items: ['Do you provide Lab test reports at each stage?', 'What warranty do you provide and what does it cover?', 'Will you hand over all test records and documentation at handover?', 'Do you provide a Property Passport or any kind of property record at handover?'] },
      { heading: 'Payment & Timeline', items: ['What is the payment milestone schedule?', 'What is the penalty for construction delays?', 'Under what circumstances can you claim additional cost?', 'What dispute resolution process is in our contract?'] },
    ],
    faqs: [
      { q: 'What if a contractor refuses to answer these questions?', a: 'A contractor who cannot or will not answer these questions is a red flag. Transparency about process, quality checks, and documentation should not be difficult for a confident, experienced contractor.' },
    ],
    relatedServices: ['/services/construction-consultation', '/boq-audit'],
    relatedGuides: ['what-is-boq-in-construction', 'how-to-compare-contractor-quotes'],
    cta: { text: 'Book a Pre-Contract Consultation', href: '/contact' },
  },

  {
    slug: 'how-to-avoid-hidden-construction-costs',
    category: 'boq',
    title: 'How to Avoid Hidden Construction Costs in India',
    metaTitle: 'How to Avoid Hidden Construction Costs in India | Buildogram',
    metaDescription: 'Learn the most common hidden construction costs in India and how to protect yourself with a proper BOQ, transparent contract, and independent supervision.',
    intro: 'Hidden construction costs are the single biggest source of homeowner distress in India. Projects regularly end up 30–60% over the original quote, not because of genuine price changes, but because of deliberate scope omissions and poor contracts.',
    sections: [
      { heading: 'Most Common Hidden Costs', items: ['SBC lab testing', 'Anti-termite treatment', 'Sump and overhead tank construction', 'Compound wall and gate', 'Staircase handrail and finish', 'External drainage and rainwater channels', 'Electrical main panel, earthing', 'Temporary shed and site setup costs', 'Water supply for construction', 'Transportation and crane charges', 'Change orders for "design modifications"'] },
      { heading: 'The Simple Rule to Avoid Hidden Costs', content: 'Insist on an itemized BOQ that covers all categories above. If any item is not in the BOQ — it is not in the price. Before signing, use a checklist to verify the BOQ is complete.' },
      { heading: 'Red Clause Alert: Watch for These Contract Phrases', items: ['"Any additional work as directed by client" — unlimited scope expansion', '"Materials as per site availability" — contractor decides quality', '"Payment on demand" — not milestone-tied', '"Subject to material price revision" — rate escalation clause', '"GST and taxes extra" — check how this is calculated'] },
    ],
    faqs: [
      { q: 'Should I pay a percentage advance to a contractor?', a: 'Avoid large advances. A mobilization advance of 5–10% of contract value is standard. Tie all subsequent payments to specific, verifiable construction milestones — not to time elapsed or contractor demand.' },
    ],
    relatedServices: ['/boq-audit', '/services/construction-consultation'],
    relatedGuides: ['what-is-boq-in-construction', 'boq-checklist-for-homeowners'],
    cta: { text: 'Get Protected with a BOQ Audit', href: '/boq-audit' },
  },

  {
    slug: 'house-construction-checklist-for-first-time-owners',
    category: 'construction',
    title: 'House Construction Checklist for First-Time Homeowners in Chennai',
    metaTitle: 'House Construction Checklist for First-Time Owners in Chennai | Buildogram',
    metaDescription: 'A complete house construction checklist for first-time homeowners in Chennai. From plot purchase to handover — every step explained.',
    intro: 'Building your first home is one of the most exciting — and challenging — experiences of your life. This checklist walks you through every important stage so nothing is missed and you are never caught off guard.',
    sections: [
      { heading: 'Before Construction: Plot and Legal', items: ['Verify encumbrance certificate (EC) — minimum 15 years', 'Confirm clear patta (land ownership document)', 'Check if plot has any mortgage or legal dispute', 'Verify setback rules and FSI for your local body zone', 'Get plot survey and corner marking done', 'Verify CMDA / DTCP approval requirement for your zone'] },
      { heading: 'Design and Engineering Stage', items: ['Engage a licensed structural engineer', 'Get SBC (Soil Bearing Capacity) lab test done', 'Get architectural plan prepared and verified', 'Get structural drawings including foundation design', 'Review plan for space efficiency, ventilation, and light', 'Submit plan for approval (if required)'] },
      { heading: 'BOQ and Contractor Selection', items: ['Prepare / receive detailed itemized BOQ', 'Verify BOQ covers all scope items (use checklist)', 'Get BOQ audited if needed', 'Get minimum 3 contractor quotes', 'Compare quotes on apples-to-apples basis', 'Sign a detailed construction contract with milestone payments'] },
      { heading: 'During Construction', items: ['Confirm soil testing report before foundation work', 'Attend foundation concrete pour if possible', 'Request slump test records for each pour', 'Request cube compression test results at 28 days', 'Photo-document each construction stage', 'Verify material deliveries against BOQ', 'Check rebar placement against structural drawings before pouring'] },
      { heading: 'Handover', items: ['Walk through with contractor for snag list', 'Request all test reports and laboratory certificates', 'Obtain structural warranty certificate', 'Create/update Property Passport with all records', 'Get as-built drawings from contractor', 'Test all electrical, plumbing, and drainage systems'] },
    ],
    faqs: [
      { q: 'What is an Encumbrance Certificate (EC)?', a: 'An EC is an official record of all registered transactions on a property for a specified period. It confirms whether the plot is free from legal encumbrances like mortgages or disputes. Always verify EC before purchase.' },
    ],
    relatedServices: ['/services/house-construction', '/boq-audit', '/property-passport'],
    relatedGuides: ['what-is-boq-in-construction', 'boq-checklist-for-homeowners'],
    cta: { text: 'Start Your Construction Journey', href: '/contact' },
  },

  {
    slug: 'how-to-prepare-a-property-for-rent',
    category: 'rental',
    title: 'How to Prepare a Property for Rent in Chennai',
    metaTitle: 'How to Prepare Your Property for Rent in Chennai | Buildogram',
    metaDescription: 'Practical steps to prepare a residential property for rental in Chennai. Repairs, safety checks, documentation, and listing your property for faster tenant acquisition.',
    intro: 'Preparing a property for rental is not just about cleaning and painting. To attract good tenants quickly and at the right price, your property needs to be structurally sound, well-maintained, properly documented, and effectively presented.',
    sections: [
      { heading: 'Physical Preparation', items: ['Check all plumbing for leaks and fix', 'Test all electrical points and switches', 'Fix any waterproofing issues before tenant moves in', 'Paint interior if more than 3 years old', 'Service or replace fans and fittings', 'Clean sump and check water supply', 'Ensure all door locks work smoothly'] },
      { heading: 'Safety Checks', items: ['Verify electrical earthing is functional', 'Check ELCB and MCB settings', 'Test RO water filter or ensure water quality', 'Verify staircase handrail is secure', 'Check terrace access is properly locked'] },
      { heading: 'Documentation', items: ['Prepare rental agreement with clear terms', 'Collect tenant KYC documents', 'Create inventory list for furnished properties', 'Note utility meter readings at handover', 'Consider registering rental agreement'] },
      { heading: 'Property Presentation', items: ['Professional photography of all rooms', '360° virtual tour increases tenant interest significantly', 'Accurate description with measurements', 'Be transparent about building age and recent repairs'] },
    ],
    faqs: [
      { q: 'What documents does a tenant typically need to provide in Chennai?', a: 'Standard tenant documents include government-issued photo ID (Aadhaar/PAN/Passport), proof of employment or income, and reference from previous landlord if applicable. Always verify documents.' },
      { q: 'Should I furnish the property before renting?', a: 'Semi-furnished (fans, fixtures, kitchen fittings) typically commands better rent than bare shell, without the high investment of fully furnished. Fully furnished properties target premium tenants and expats.' },
    ],
    relatedServices: ['/properties/rent', '/properties/list-your-property', '/property-passport'],
    relatedGuides: ['rental-property-listing-checklist', 'how-360-property-tours-help-property-owners'],
    cta: { text: 'List Your Property on Buildogram', href: '/properties/list-your-property' },
  },

  {
    slug: 'how-to-improve-resale-value-before-listing',
    category: 'resale',
    title: 'How to Improve Your Property\'s Resale Value Before Listing',
    metaTitle: 'How to Improve Property Resale Value Before Selling | Buildogram',
    metaDescription: 'Practical steps to improve your residential property\'s resale value before listing in Chennai. Repairs, documentation, presentation, and property records.',
    intro: 'Improving resale value is not always about expensive renovations. Often, documentation, presentation, and addressing obvious defects have a greater impact on buyer confidence and final price than cosmetic upgrades.',
    sections: [
      { heading: 'High-Impact Low-Cost Actions', items: ['Fix all visible water stains and damp patches', 'Repaint interior walls if stained or dated', 'Fix all plumbing leaks', 'Repair or replace broken tiles', 'Service all electrical fixtures', 'Deep clean entire property', 'Ensure all doors and windows operate smoothly'] },
      { heading: 'Documentation That Improves Buyer Confidence', items: ['Property Passport with all historical records', 'Original structural drawings', 'Concrete test reports if available', 'Structural warranty certificate', 'EC (Encumbrance Certificate) updated', 'Property tax receipts up to date', 'Original plan approval documents'] },
      { heading: 'Presentation', items: ['Professional photography', '360° virtual tour significantly increases online interest', 'Accurate floor plan measurement', 'Honest disclosure of building age and any repairs done'] },
      { heading: 'When to Invest in Renovation Before Resale', content: 'Invest in renovation only if the expected price increase exceeds renovation cost. Kitchen and bathroom upgrades typically have the best return on investment. Cosmetic improvements like paint and flooring have moderate returns. Structural renovations rarely pay for themselves unless there is a genuine defect.' },
    ],
    faqs: [
      { q: 'Does a Property Passport help in resale?', a: 'Yes. Buyers who can see documented construction history, test reports, and warranty records have higher confidence in the property, which translates to fewer price negotiations and faster closure.' },
    ],
    relatedServices: ['/property-passport', '/properties/list-your-property', '/services/renovation-construction'],
    relatedGuides: ['resale-property-listing-checklist', 'how-property-records-help-resale'],
    cta: { text: 'Create Your Property Passport', href: '/property-passport' },
  },

  {
    slug: 'how-property-records-help-resale',
    category: 'resale',
    title: 'How Property Records Help You Get a Better Resale Price',
    metaTitle: 'How Property Records Help Resale | Buildogram Property Passport',
    metaDescription: 'Understand how having complete property records — construction history, test reports, structural warranty — improves buyer confidence and resale price for your Chennai property.',
    intro: 'When a buyer is choosing between two similar properties, the one with complete construction records, test reports, and a Property Passport will almost always be preferred — often at a premium price. This guide explains why and how.',
    sections: [
      { heading: 'What Buyers Actually Worry About', content: 'Most property buyers in India are afraid of hidden structural problems that are not visible during inspection. A property with documented construction history and test certificates eliminates this fear.' },
      { heading: 'What Records Make a Difference', items: ['SBC lab test report: confirms foundation design is based on tested soil', 'Concrete cube compression test records: confirms structural concrete achieved specified strength', 'Material delivery invoices with brand verification: confirms quality materials were used', 'Structural warranty certificate: gives buyer post-sale protection', 'Architectural and structural drawings: allows buyer to understand and verify the structure', 'Property tax and utility payment history: confirms no dues'] },
      { heading: 'The Property Passport Difference', content: 'A Buildogram Property Passport organizes all of these records in a digital, shareable format. Buyers and their engineers can review records before purchase — reducing negotiation friction and increasing buyer confidence.' },
    ],
    faqs: [
      { q: 'What if my property was built without any documentation?', a: 'It is still possible to create a partial Property Passport with available records and current property condition. A quality inspection report on the current state of the property can help fill the gap.' },
    ],
    relatedServices: ['/property-passport', '/properties/list-your-property'],
    relatedGuides: ['how-to-improve-resale-value-before-listing', 'resale-property-listing-checklist'],
    cta: { text: 'Create Your Property Passport', href: '/property-passport' },
  },

  {
    slug: 'home-maintenance-checklist',
    category: 'maintenance',
    title: 'Annual Home Maintenance Checklist for Chennai Homeowners',
    metaTitle: 'Annual Home Maintenance Checklist for Chennai Homes | Buildogram',
    metaDescription: 'A seasonal home maintenance checklist for Chennai homeowners. Pre-monsoon, post-monsoon, and annual checks to protect your property and prevent costly repairs.',
    intro: 'Regular maintenance is the lowest-cost way to protect your property investment. Most major home repair problems — seepage, structural cracks, electrical failures — develop from small ignored issues. This checklist helps Chennai homeowners stay ahead of problems.',
    sections: [
      { heading: 'Pre-Monsoon Checks (April–May)', items: ['Inspect terrace waterproofing for cracks or blistering', 'Clear all roof drains and gutters', 'Check bathroom waterproofing for damp patches', 'Inspect all windows and door frames for gaps or rot', 'Service rainwater pipes and downspouts', 'Check sump and overhead tank for leaks', 'Inspect compound wall drainage outlets'] },
      { heading: 'Post-Monsoon Checks (November)', items: ['Inspect walls for new damp patches or seepage', 'Check all window sills for water penetration', 'Inspect terrace for standing water patches', 'Check for any new cracks in walls or ceiling', 'Service all water pumps after extended use', 'Inspect external drains and clear any blockages'] },
      { heading: 'Annual Checks', items: ['Electrical: test all MCBs, ELCB, earthing points', 'Plumbing: check for slow drains, water hammer, pressure issues', 'Painting: inspect for peeling or damp patches before repainting', 'Gate and grills: check for rust and lubricate hinges', 'Sump: clean annually', 'Overhead tank: clean and inspect every 6 months'] },
      { heading: 'Record Your Maintenance', content: 'Record all maintenance work with dates, service provider details, and materials used in your Property Passport. A maintained maintenance log significantly improves resale buyer confidence.' },
    ],
    faqs: [
      { q: 'How often should I repaint my home exterior in Chennai?', a: 'In Chennai\'s climate, a quality exterior weatherproof paint should last 5–7 years. Annual inspection for peeling or damp patches is recommended. Interior paint typically lasts longer — 7–10 years.' },
    ],
    relatedServices: ['/maintenance', '/property-passport'],
    relatedGuides: ['common-waterproofing-problems', 'rental-property-maintenance-checklist'],
    cta: { text: 'Request Maintenance Service', href: '/maintenance/request' },
  },

  {
    slug: 'common-waterproofing-problems',
    category: 'maintenance',
    title: 'Common Waterproofing Problems in Chennai Homes',
    metaTitle: 'Common Waterproofing Problems in Chennai Homes | Buildogram',
    metaDescription: 'Identify and fix common waterproofing problems in Chennai homes. Terrace leaks, bathroom seepage, wall dampness, and sump issues — causes and solutions.',
    intro: 'Waterproofing failures are the most common structural complaint from Chennai homeowners, especially after monsoon season. Understanding the cause of water problems helps you fix them correctly — not just temporarily.',
    sections: [
      { heading: 'Terrace Leaks', content: 'The most common waterproofing complaint. Usually caused by: cracks in waterproofing membrane, blistering from heat-UV cycles, inadequate slope causing water ponding, or blocked drains. Fix: identify source, repair or re-apply system over the affected area after proper preparation.' },
      { heading: 'Bathroom Seepage to Below Floor', content: 'Usually caused by: waterproofing not applied before tiling, cracks in the waterproofing layer after tile movement, or failed water test after application. Fix: in most cases, full bathroom waterproofing redoplication requires tile removal. Address before it damages structural elements below.' },
      { heading: 'Damp Walls', content: 'Causes include: rising dampness from inadequate plinth DPC, lateral dampness from external soil contact, or rainwater penetration from cracks in plaster or wall joints. Identify source before applying any treatment.' },
      { heading: 'Sump Leakage', content: 'Usually poor original waterproofing or shrinkage cracks. Fix: drain the sump, prepare surface, apply crystalline or cementitious waterproofing system, re-test.' },
    ],
    faqs: [
      { q: 'Can I waterproof over existing tiles?', a: 'Some surface-applied waterproofing systems can be applied over tiles without removal. However, for bathroom floor waterproofing where the primary layer has failed, tile removal is usually required for a lasting fix.' },
    ],
    relatedServices: ['/maintenance/waterproofing', '/maintenance'],
    relatedGuides: ['home-maintenance-checklist', 'rental-property-maintenance-checklist'],
    cta: { text: 'Book Waterproofing Service', href: '/maintenance/request' },
  },

  {
    slug: 'house-plan-review-checklist',
    category: 'plan-review',
    title: 'House Plan Review Checklist: What to Check Before Construction',
    metaTitle: 'House Plan Review Checklist for Homeowners | Buildogram',
    metaDescription: 'A practical house plan review checklist. Verify space efficiency, structural feasibility, ventilation, setbacks, and cost impact before construction begins.',
    intro: 'Reviewing your house plan before construction is one of the cheapest interventions you can make. Changes on paper cost ₹0. Changes after concrete is poured cost lakhs. This checklist helps you identify key issues to review in your plan.',
    sections: [
      { heading: 'Space and Layout', items: ['Is built-up area matching your plot FSI limit?', 'Is circulation space (corridors, stairs) proportionate to room sizes?', 'Are bedroom sizes adequate for furniture placement?', 'Is the kitchen design practical for Indian cooking?', 'Is there adequate storage space planned?', 'Are all bathrooms ventilated (window or shaft)?'] },
      { heading: 'Structural Feasibility', items: ['Are spans between columns reasonable (typically max 5–6m for residential)?', 'Is the number of columns adequate for the loads?', 'Is foundation type appropriate for your soil bearing capacity?', 'Are setbacks meeting local body requirements?'] },
      { heading: 'Ventilation and Light', items: ['Does each bedroom receive adequate natural cross-ventilation?', 'Is the kitchen adequately ventilated?', 'Does the living and dining area receive natural light?', 'Are wet areas (bathrooms, utility) properly ventilated?'] },
      { heading: 'Cost Impact', items: ['Are any cantilever elements designed (structurally complex and expensive)?', 'Is the elevation design straightforward or complex in cross-section?', 'Are room shapes regular or irregular (irregular shapes cost more)?', 'Is the staircase placement efficient?'] },
    ],
    faqs: [
      { q: 'What are setback requirements in Chennai?', a: 'Setback requirements depend on your road width, plot area, and local body. CMDA and DTCP have different rules. Your structural engineer or local body can provide the correct setback rules for your specific plot.' },
    ],
    relatedServices: ['/plan-review', '/services/house-plan-review'],
    relatedGuides: ['common-floor-plan-mistakes', 'how-plan-design-affects-construction-cost'],
    cta: { text: 'Submit Your Plan for Review', href: '/plan-review' },
  },

  {
    slug: 'common-floor-plan-mistakes',
    category: 'plan-review',
    title: 'Common Floor Plan Mistakes to Avoid in House Construction',
    metaTitle: 'Common Floor Plan Mistakes in House Construction | Buildogram',
    metaDescription: 'Avoid common floor plan mistakes that increase construction cost, reduce functionality, or limit future resale value of your Chennai home.',
    intro: 'A poorly designed floor plan affects your quality of life for decades and adds unnecessary construction cost. These are the most common mistakes — and how to avoid them.',
    sections: [
      { heading: 'Wasted Circulation Space', content: 'Oversized corridors and redundant hallways consume built-up area that could be usable rooms. Aim for corridors not more than 3 feet wide for standard residential. Every sq.ft. of unnecessary corridor costs you construction money and property tax.' },
      { heading: 'Kitchens Without Cross-Ventilation', content: 'Indian cooking generates significant smoke and odor. A kitchen without a window or shaft creates health and air quality issues. Always plan a window or mechanical ventilation shaft for the kitchen.' },
      { heading: 'Bathrooms Without External Ventilation', content: 'Interior bathrooms with only a duct (no window) become damp and moldy in Chennai\'s humidity. Where possible, plan bathrooms with an external window.' },
      { heading: 'Column Placement that Reduces Furniture Options', content: 'Columns in the wrong positions can awkwardly project into living rooms or bedrooms, reducing usable space and furniture placement options. Review column placement with a structural engineer and interior layout in mind.' },
      { heading: 'Inadequate Parking Design', content: 'Parking is a major value driver in Chennai. Ensure your plan allows adequate parking, including turning radius for modern cars. Planning parking as an afterthought often wastes the ground floor.' },
      { heading: 'No Terrace Access Plan', content: 'Terrace access is needed for maintenance, water tank, AC outdoor units, and solar panels. Not planning access results in ladder-only access for maintenance, which is impractical and unsafe.' },
    ],
    faqs: [
      { q: 'Can I change my floor plan after submitting it for approval?', a: 'Minor changes are possible before actual approval is granted. Changes after construction begins may require as-built drawing revisions. Significant changes after approval may require re-submission. Always consult your architect and local body.' },
    ],
    relatedServices: ['/plan-review', '/services/house-plan-review'],
    relatedGuides: ['house-plan-review-checklist', 'how-plan-design-affects-construction-cost'],
    cta: { text: 'Get Your Plan Reviewed', href: '/plan-review' },
  },

  {
    slug: 'how-plan-design-affects-construction-cost',
    category: 'plan-review',
    title: 'How House Plan Design Affects Your Construction Cost',
    metaTitle: 'How Floor Plan Design Affects Construction Cost | Buildogram',
    metaDescription: 'Understand how your house plan design decisions directly affect construction cost in Chennai. Structural choices, room shapes, elevation complexity, and span lengths.',
    intro: 'Many homeowners receive their plan from an architect without understanding how specific design decisions add to construction cost. This guide explains the connection between plan design and your total construction budget.',
    sections: [
      { heading: 'Span Length and Number of Columns', content: 'Longer spans between columns require larger beam sizes, more steel, and more concrete. Optimal residential column spacing is 4–5 meters. Designs requiring 7+ meter spans significantly increase structural cost.' },
      { heading: 'Irregular Room Shapes', content: 'L-shaped rooms, angled walls, and non-orthogonal layouts require more formwork, more steel cutting, and more labor compared to rectangular rooms. Square or rectangular floor plates are the most cost-efficient.' },
      { heading: 'Cantilevered Balconies and Overhangs', content: 'Cantilever structures require heavier reinforcement and structural engineering attention. A small cantilever adds disproportionate cost compared to a structurally supported balcony.' },
      { heading: 'Elevation Complexity', content: 'Complex elevations — multiple setbacks, jali work, pitched roofs, projections — are aesthetically pleasing but cost significantly more than a simple flat elevation. Each elevation feature adds to shuttering, masonry, and plaster cost.' },
      { heading: 'Sump and Basement Planning', content: 'Underground sump depth, basement inclusion, and water retention design all affect cost significantly based on soil conditions and water table. These should be sized right from the beginning — not as afterthoughts.' },
    ],
    faqs: [
      { q: 'Can my plan be redesigned to reduce cost without changing the look much?', a: 'Often yes. A structural engineer reviewing your plan for cost efficiency can identify structural adjustments that reduce cost while maintaining the key design intent. Buildogram\'s plan review service includes this analysis.' },
    ],
    relatedServices: ['/plan-review', '/cost-estimator'],
    relatedGuides: ['house-plan-review-checklist', 'common-floor-plan-mistakes'],
    cta: { text: 'Get a Cost Impact Plan Review', href: '/plan-review' },
  },

  {
    slug: 'what-is-property-passport',
    category: 'property-passport',
    title: 'What is a Property Passport and Why Do You Need One?',
    metaTitle: 'What is a Property Passport? Complete Guide | Buildogram',
    metaDescription: 'Understand what a Property Passport is, what records it contains, how it helps during resale and rental, and how to create one for your property in Chennai.',
    intro: 'A Property Passport is a digital record that contains all essential information about a property — its construction history, material records, test certificates, legal documents, maintenance history, and quality reports. It is the property\'s identity document.',
    sections: [
      { heading: 'What a Property Passport Contains', items: ['Architectural and structural drawings', 'Soil Bearing Capacity (SBC) test report', 'Concrete cube compression test records', 'Material delivery invoices with brand details', 'Structural warranty certificate', 'Electrical and plumbing system layouts', 'Property tax records', 'Legal title documents reference list', 'Maintenance history log', 'Occupancy certificate / completion certificate', 'EC (Encumbrance Certificate)'] },
      { heading: 'How a Property Passport Helps', items: ['During resale: buyers can verify construction quality and legal standing', 'During rental: transparent property information for tenant trust', 'During maintenance: complete history of past repairs and systems', 'During insurance: documented records support insurance claims', 'During disputes: documented specifications resolve contractor disputes'] },
      { heading: 'Who Needs a Property Passport', content: 'Every property owner benefits from a Property Passport — whether the property is newly constructed, under renovation, or an older property without documentation. Even a partial record is better than none.' },
    ],
    faqs: [
      { q: 'Is a Property Passport a legal document?', a: 'The Property Passport is an organized digital record of property information. It does not replace legal title documents, government approvals, or certified structural drawings. It is a transparency and information tool.' },
      { q: 'Can I create a Property Passport for an old property?', a: 'Yes. For older properties without original documentation, we help you compile available records and add a current property condition assessment to your Property Passport.' },
    ],
    relatedServices: ['/property-passport', '/services/quality-inspection'],
    relatedGuides: ['how-property-records-help-resale', 'property-documents-checklist-india'],
    cta: { text: 'Create Your Property Passport', href: '/property-passport' },
  },

  {
    slug: 'property-documents-checklist-india',
    category: 'property-passport',
    title: 'Property Documents Checklist for Homeowners in India',
    metaTitle: 'Property Documents Checklist for Indian Homeowners | Buildogram',
    metaDescription: 'A complete list of property documents every Indian homeowner should have. Legal documents, construction records, approval documents, and maintenance records.',
    intro: 'Many Indian homeowners do not have a clear idea of which property documents they should have, where they are, or whether they are complete. This checklist helps you audit your property documentation and identify gaps.',
    sections: [
      { heading: 'Legal Documents', items: ['Sale deed (original or certified copy)', 'Encumbrance Certificate (EC) — updated annually', 'Patta (land ownership record)', 'Chitta (land classification document)', 'Survey settlement register extract', 'Property tax receipts (last 5 years at minimum)'] },
      { heading: 'Approval Documents', items: ['Plan approval / building permit from local body', 'Completion certificate / occupancy certificate (if applicable)', 'TNEB electricity connection approval', 'CMWSSB water connection approval'] },
      { heading: 'Construction Records (For Owner-Built Properties)', items: ['Original architectural drawings', 'Structural drawings', 'BOQ (Bill of Quantities)', 'Construction contract', 'SBC lab test report', 'Concrete cube test records', 'Structural warranty certificate', 'Material invoices for major items'] },
      { heading: 'Maintenance Records', items: ['Annual maintenance service records', 'Waterproofing repair records', 'Electrical repair records', 'Plumbing repair records', 'Any structural repair with engineer certification'] },
    ],
    faqs: [
      { q: 'What is an Encumbrance Certificate (EC)?', a: 'An EC is an official certificate confirming that a property has no registered financial or legal encumbrances (mortgages, disputes) for the period specified. Get an EC from the Sub-Registrar\'s office for at least 13 years before selling or buying.' },
      { q: 'What if I have lost my original sale deed?', a: 'You can apply for a certified copy of the registered document from the Sub-Registrar\'s office where the original was registered. Your property lawyer can assist with this process.' },
    ],
    relatedServices: ['/property-passport'],
    relatedGuides: ['what-is-property-passport', 'how-property-records-help-resale'],
    cta: { text: 'Organize Your Property Records', href: '/property-passport' },
  },

  {
    slug: 'rental-property-listing-checklist',
    category: 'rental',
    title: 'Rental Property Listing Checklist for Chennai Landlords',
    metaTitle: 'Rental Property Listing Checklist for Chennai | Buildogram',
    metaDescription: 'A complete checklist to prepare and list your rental property in Chennai. Property condition, documentation, photography, and listing tips.',
    intro: 'A well-prepared rental listing fills faster and attracts better tenants. This checklist ensures your property is rent-ready and your listing is complete and trustworthy.',
    sections: [
      { heading: 'Property Condition Checklist', items: ['All plumbing working and no active leaks', 'All electrical points and fixtures working', 'All doors and windows opening smoothly', 'Interior freshly painted or visibly clean', 'Sump full and water supply working', 'Bathrooms clean with functioning fixtures', 'Gas pipeline or provision checked'] },
      { heading: 'Documentation for Listing', items: ['Property address and landmark clearly defined', 'Built-up area (sq.ft.) accurately measured', 'Number of bedrooms, bathrooms, and floors', 'Parking availability confirmed', 'Maintenance charges specified', 'Society rules (if applicable) noted'] },
      { heading: 'Photography Checklist', items: ['All rooms photographed in good natural light', 'Kitchen, bathrooms, and balconies included', 'View from window (if notable)', '360° tour creates significantly better tenant interest', 'Exterior and parking area photographed'] },
      { heading: 'Listing Details', items: ['Rent amount competitive with current market', 'Deposit amount stated (typically 2–6 months rent)', 'Preferred tenant profile (family, bachelor, company) stated', 'Immediately available or from specific date?', 'Contact details verified'] },
    ],
    faqs: [
      { q: 'Does a 360° tour actually help find tenants faster?', a: 'Yes. Tenants who view a property via 360° tour before physical visit are better qualified — they have already confirmed interest in the layout and feel. This reduces unnecessary visits and increases conversion.' },
    ],
    relatedServices: ['/properties/list-your-property', '/properties/rent'],
    relatedGuides: ['how-to-prepare-a-property-for-rent', 'how-360-property-tours-help-property-owners'],
    cta: { text: 'List Your Property Now', href: '/properties/list-your-property' },
  },

  {
    slug: 'how-360-property-tours-help-property-owners',
    category: 'rental',
    title: 'How 360° Property Tours Help Landlords and Property Owners',
    metaTitle: 'How 360° Property Tours Help Landlords and Property Owners | Buildogram',
    metaDescription: 'Understand how 360° property tours help landlords rent or sell faster with qualified leads, fewer wasted visits, and premium tenant/buyer positioning.',
    intro: 'A 360° virtual property tour is no longer a premium option — it is becoming a standard expectation from quality tenants and buyers. This guide explains how it benefits property owners.',
    sections: [
      { heading: 'Benefits for Rental Property Owners', items: ['Attract tenants who are genuinely interested in your layout', 'Reduce number of physical visits from unqualified leads', 'Allow NRI or out-of-city tenants to view remotely', 'Present your property in the best possible light at any time of day', 'Stand out from listings with only static photos'] },
      { heading: 'Benefits for Resale Property Owners', items: ['Buyers can take a detailed virtual look before their physical visit', 'Serious buyers qualify themselves through the tour', 'International/NRI buyers can evaluate remotely', 'Reduces time wasted on non-serious visits', 'Positions your property as premium and well-maintained'] },
      { heading: 'Privacy and Consent', content: 'Buildogram\'s property listings do not expose owner contact information publicly. Tenant/buyer inquiries go through Buildogram\'s platform. Owner consent is obtained before any 360° tour is shared publicly.' },
    ],
    faqs: [
      { q: 'How is a 360° tour created?', a: 'Buildogram uses 360° camera equipment during the property listing shoot. The resulting tour is embedded into your listing and accessible to verified inquirers.' },
      { q: 'Is my personal contact information visible in the 360° tour?', a: 'No. Property tours on Buildogram are accessed through the platform only. Owner contact details are not embedded in the tour or visible to public browsers.' },
    ],
    relatedServices: ['/properties/list-your-property', '/properties/rent'],
    relatedGuides: ['rental-property-listing-checklist', 'how-to-prepare-a-property-for-rent'],
    cta: { text: 'List with a 360° Tour', href: '/properties/list-your-property' },
  },

  {
    slug: 'resale-property-listing-checklist',
    category: 'resale',
    title: 'Resale Property Listing Checklist for Chennai Sellers',
    metaTitle: 'Resale Property Listing Checklist for Chennai Sellers | Buildogram',
    metaDescription: 'A complete checklist to prepare and list a resale property in Chennai. Property condition, legal documents, pricing, and listing presentation.',
    intro: 'Selling a property in Chennai requires preparation across legal documentation, property condition, and listing presentation. A well-prepared resale listing attracts serious buyers and reduces price negotiation.',
    sections: [
      { heading: 'Legal Documentation Checklist', items: ['Original sale deed ready', 'EC (Encumbrance Certificate) for last 15 years obtained', 'Property tax receipts up to date', 'Patta in current owner name', 'Any approval documents (plan approval, OC) available', 'Loan closure/NOC from bank if property was mortgaged'] },
      { heading: 'Property Condition', items: ['All visible repairs done', 'Fresh paint if required', 'No active plumbing leaks', 'Electrical fixtures working', 'Presentation clean for photography'] },
      { heading: 'Construction Records (If Available)', items: ['Original BOQ', 'Structural drawings', 'Test reports and warranties', 'Material delivery records', 'Property Passport'] },
      { heading: 'Pricing and Listing', items: ['Realistic market pricing based on comparable sales', '360° tour and professional photographs', 'Accurate area measurement (built-up + UDS)', 'Clear description of property condition and features'] },
    ],
    faqs: [
      { q: 'How do I price my resale property in Chennai?', a: 'Pricing should be based on recent comparable sales in your locality, your property\'s condition, documentation status, and current market sentiment. An overpriced property sits unsold. A well-documented, correctly-priced property with a 360° tour sells faster.' },
    ],
    relatedServices: ['/properties/list-your-property', '/property-passport'],
    relatedGuides: ['how-to-improve-resale-value-before-listing', 'how-property-records-help-resale'],
    cta: { text: 'List for Resale on Buildogram', href: '/properties/list-your-property' },
  },

  {
    slug: 'rental-friendly-house-plan-guide',
    category: 'rental',
    title: 'Rental-Friendly House Plan Guide for Chennai',
    metaTitle: 'Rental-Friendly House Plan Design Guide for Chennai | Buildogram',
    metaDescription: 'Design your house plan with rental income in mind. Independent units, separate utilities, tenant-friendly layouts for maximum rental yield in Chennai.',
    intro: 'If you are building a home with rental income as a goal, your floor plan decisions directly affect the rental yield you can achieve. This guide explains how to design for rental optimization.',
    sections: [
      { heading: 'Key Principles for Rental-Optimized Design', items: ['Independent entry for each unit (separate gate/door)', 'Separate electricity meter for each unit', 'Separate water connection or sub-meter for each unit', 'Sound insulation between units (good masonry, avoid thin partitions)', 'Self-contained bathrooms for each unit', 'Covered parking (adds significant rental premium)'] },
      { heading: 'Which Floor Fetches Better Rent?', content: 'In Chennai, ground floor typically fetches lower rent (privacy, noise issues) except for commercial use. First floor commands the best rent for residential. Second floor and above are acceptable. Ensure lifts are available for 3+ floor buildings if you want premium tenant profiles.' },
      { heading: 'Bedroom Configuration for Rental Demand', content: '2BHK units have the highest demand-to-supply ratio in most Chennai localities. 1BHK units command high per-sq.ft. rent but attract short-stay tenants. 3BHK units attract family tenants who typically stay longer.' },
      { heading: 'Amenities That Justify Premium Rent', items: ['Covered car parking', 'Generator backup for common areas', 'Security / CCTV at entry', 'Piped gas or LPG provision', 'High-speed internet infrastructure ready', 'Balcony or sit-out area'] },
    ],
    faqs: [
      { q: 'Is it better to build independent units or rent rooms in a house?', a: 'Independent self-contained units (with attached bathrooms and independent entry) command significantly higher rent than room rentals and attract better-quality tenants. The upfront construction cost difference is worth the rental premium over time.' },
    ],
    relatedServices: ['/services/home-construction-for-rental-income', '/services/duplex-house-construction'],
    relatedGuides: ['how-to-prepare-a-property-for-rent', 'rental-property-listing-checklist'],
    cta: { text: 'Plan Your Rental Property', href: '/contact' },
  },
];

export const guideMap = Object.fromEntries(guides.map(g => [g.slug, g]));
export const guideCategories = [...new Set(guides.map(g => g.category))];
