import json
import os

scraped_file = r"C:\Users\Kawinfinite PC 32\Downloads\Buildogram\buildogram-app\scraped_services.json"

with open(scraped_file, "r", encoding="utf-8") as f:
    scraped = json.load(f)

manual = {
    "home-construction-chennai": {
        "jsonLdType": "construction",
        "hasHero": True,
        "heroTag": "Chennai Construction",
        "ctaHref": "/contact?type=construction",
        "ctaLabel": "Talk to an Engineer",
        "ctaSecondaryHref": "/boq-calculator",
        "ctaSecondaryLabel": "Free BOQ Calculator",
        "stats": [["500+", "Projects Supported"], ["\u20b912.8Cr", "Average Project Value"], ["18%", "Average Client Savings"], ["10-Year", "Structural Warranty"]],
        "relatedLinks": [["Turnkey Construction", "/turnkey-construction-chennai"], ["Site Supervision", "/site-supervision-chennai"], ["BOQ Calculator", "/boq-calculator"], ["Soil Testing", "/soil-testing-chennai"], ["Structural Audit", "/structural-audit-chennai"]]
    },
    "house-construction-chennai": {
        "title": "House Construction in Chennai | Verified Engineers & BOQ | Buildogram",
        "metaDescription": "Planning to build a house in Chennai? Buildogram connects you with verified engineers, reviews contractor quotes, and ensures transparent BOQ for your project.",
        "h1": "House Construction in Chennai",
        "hasHero": False,
        "answerQuestion": "Why use Buildogram for your project?",
        "answerText": "Planning to build a house in Chennai? Buildogram connects you with verified engineers, reviews contractor quotes, and ensures transparent BOQ for your project.",
        "processStepsTitle": "Our Approach to House Construction in Chennai",
        "steps": [{"step":"01","title":"Requirement Mapping","desc":"We map out your plot size, location, budget, and specific construction needs."},{"step":"02","title":"Plan & BOQ Review","desc":"Our engineers audit architectural plans and contractor quotes to prevent hidden costs."},{"step":"03","title":"Verified Partners","desc":"We connect you with trusted builders and contractors tailored to your project."},{"step":"04","title":"Site Tracking","desc":"Monitor milestones and material deliveries via our digital platform."}],
        "faqs": [{"question":"Do you provide direct construction services?","answer":"We are an engineer-led support platform. We connect you with verified contractors and audit their work to ensure quality and transparency."},{"question":"How much does BOQ review cost?","answer":"Our BOQ review pricing varies based on project size. Contact our engineers for a custom quote."},{"question":"Can I source materials through Buildogram?","answer":"Yes, we provide transparent quotes for cement, steel, sand, and other materials directly from verified suppliers in Chennai."}],
        "ctaHref": "/contact?type=construction",
        "ctaLabel": "Get Started",
        "jsonLdType": "construction",
        "breadcrumbLabel": "House Construction in Chennai"
    },
    "residential-construction-chennai": {
        "jsonLdType": "construction",
        "hasHero": True,
        "heroTag": "Residential Construction",
        "ctaHref": "/contact?type=residential"
    },
    "commercial-construction-chennai": {
        "title": "Commercial Construction in Chennai | Verified Contractors | Buildogram",
        "metaDescription": "Planning a commercial building in Chennai? Buildogram offers BOQ reviews, verified contractors, and material sourcing for commercial projects.",
        "h1": "Commercial Construction in Chennai",
        "hasHero": False,
        "answerQuestion": "Why use Buildogram for your project?",
        "answerText": "Planning a commercial building in Chennai? Buildogram offers BOQ reviews, verified contractors, and material sourcing for commercial projects.",
        "processStepsTitle": "Our Approach to Commercial Construction in Chennai",
        "steps": [{"step":"01","title":"Requirement Mapping","desc":"We map out your plot size, location, budget, and specific construction needs."},{"step":"02","title":"Plan & BOQ Review","desc":"Our engineers audit architectural plans and contractor quotes to prevent hidden costs."},{"step":"03","title":"Verified Partners","desc":"We connect you with trusted builders and contractors tailored to your project."},{"step":"04","title":"Site Tracking","desc":"Monitor milestones and material deliveries via our digital platform."}],
        "faqs": [{"question":"Do you provide direct construction services?","answer":"We are an engineer-led support platform. We connect you with verified contractors and audit their work to ensure quality and transparency."},{"question":"How much does BOQ review cost?","answer":"Our BOQ review pricing varies based on project size. Contact our engineers for a custom quote."},{"question":"Can I source materials through Buildogram?","answer":"Yes, we provide transparent quotes for cement, steel, sand, and other materials directly from verified suppliers in Chennai."}],
        "ctaHref": "/contact?type=construction",
        "jsonLdType": "construction",
        "breadcrumbLabel": "Commercial Construction in Chennai"
    },
    "turnkey-construction-chennai": {
        "jsonLdType": "construction"
    },
    "renovation-contractors-chennai": {
        "hasHero": True,
        "heroTag": "Renovation",
        "ctaHref": "/contact?type=renovation",
        "jsonLdType": "construction"
    },
    "construction-company-chennai": {
        "title": "Construction Company in Chennai | Verified Builders & BOQ Review | Buildogram",
        "metaDescription": "Looking for a construction company in Chennai? Buildogram helps you compare builders, review BOQs, verify quotes, source materials, and manage your project.",
        "h1": "Construction Company in Chennai",
        "hasHero": False,
        "answerQuestion": "Why use Buildogram for your project?",
        "answerText": "Looking for a construction company in Chennai? Buildogram helps you compare builders, review BOQs, verify quotes, source materials, and manage your project.",
        "processStepsTitle": "Our Approach to Construction Company in Chennai",
        "steps": [{"step":"01","title":"Requirement Mapping","desc":"We map out your plot size, location, budget, and specific construction needs."},{"step":"02","title":"Plan & BOQ Review","desc":"Our engineers audit architectural plans and contractor quotes to prevent hidden costs."},{"step":"03","title":"Verified Partners","desc":"We connect you with trusted builders and contractors tailored to your project."},{"step":"04","title":"Site Tracking","desc":"Monitor milestones and material deliveries via our digital platform."}],
        "faqs": [{"question":"Do you provide direct construction services?","answer":"We are an engineer-led support platform. We connect you with verified contractors and audit their work to ensure quality and transparency."},{"question":"How much does BOQ review cost?","answer":"Our BOQ review pricing varies based on project size. Contact our engineers for a custom quote."},{"question":"Can I source materials through Buildogram?","answer":"Yes, we provide transparent quotes for cement, steel, sand, and other materials directly from verified suppliers in Chennai."}],
        "ctaHref": "/contact?type=construction",
        "jsonLdType": "construction",
        "breadcrumbLabel": "Construction Company in Chennai"
    },
    "construction-project-management-chennai": {
        "title": "Construction Project Management in Chennai | Buildogram",
        "metaDescription": "Professional construction project management for Chennai property owners. Engineer-led site supervision, quality checks, and digital tracking.",
        "h1": "Construction Project Management in Chennai",
        "hasHero": False,
        "answerQuestion": "Why use Buildogram for your project?",
        "answerText": "Professional construction project management for Chennai property owners. Engineer-led site supervision, quality checks, and digital tracking.",
        "processStepsTitle": "Our Approach to Construction Project Management in Chennai",
        "steps": [{"step":"01","title":"Requirement Mapping","desc":"We map out your plot size, location, budget, and specific construction needs."},{"step":"02","title":"Plan & BOQ Review","desc":"Our engineers audit architectural plans and contractor quotes to prevent hidden costs."},{"step":"03","title":"Verified Partners","desc":"We connect you with trusted builders and contractors tailored to your project."},{"step":"04","title":"Site Tracking","desc":"Monitor milestones and material deliveries via our digital platform."}],
        "faqs": [{"question":"Do you provide direct construction services?","answer":"We are an engineer-led support platform. We connect you with verified contractors and audit their work to ensure quality and transparency."},{"question":"How much does BOQ review cost?","answer":"Our BOQ review pricing varies based on project size. Contact our engineers for a custom quote."},{"question":"Can I source materials through Buildogram?","answer":"Yes, we provide transparent quotes for cement, steel, sand, and other materials directly from verified suppliers in Chennai."}],
        "ctaHref": "/contact?type=construction",
        "jsonLdType": "construction",
        "breadcrumbLabel": "Construction Project Management"
    },
    "builders-in-chennai": {
        "title": "Builders in Chennai | Compare Verified Construction Partners | Buildogram",
        "metaDescription": "Find and compare builders in Chennai with Buildogram. Review contractor quotes, check BOQs, compare materials, and plan construction with engineer-led support.",
        "h1": "Verified Builders in Chennai",
        "hasHero": False,
        "answerQuestion": "Why use Buildogram for your project?",
        "answerText": "Find and compare builders in Chennai with Buildogram. Review contractor quotes, check BOQs, compare materials, and plan construction with engineer-led support.",
        "processStepsTitle": "Our Approach to Verified Builders in Chennai",
        "steps": [{"step":"01","title":"Requirement Mapping","desc":"We map out your plot size, location, budget, and specific construction needs."},{"step":"02","title":"Plan & BOQ Review","desc":"Our engineers audit architectural plans and contractor quotes to prevent hidden costs."},{"step":"03","title":"Verified Partners","desc":"We connect you with trusted builders and contractors tailored to your project."},{"step":"04","title":"Site Tracking","desc":"Monitor milestones and material deliveries via our digital platform."}],
        "faqs": [{"question":"Do you provide direct construction services?","answer":"We are an engineer-led support platform. We connect you with verified contractors and audit their work to ensure quality and transparency."},{"question":"How much does BOQ review cost?","answer":"Our BOQ review pricing varies based on project size. Contact our engineers for a custom quote."},{"question":"Can I source materials through Buildogram?","answer":"Yes, we provide transparent quotes for cement, steel, sand, and other materials directly from verified suppliers in Chennai."}],
        "ctaHref": "/contact?type=construction",
        "jsonLdType": "construction",
        "breadcrumbLabel": "Builders in Chennai"
    },
    "construction-cost-estimation-chennai": {
        "title": "Construction Cost Estimation in Chennai | Engineer-Led Budget Planning | Buildogram",
        "metaDescription": "Buildogram Construction Cost Estimation in Chennai - engineer-led, AI-driven construction support in Chennai.",
        "h1": "Construction Cost Estimation in Chennai",
        "hasHero": False,
        "answerQuestion": "How does Buildogram help with construction cost estimation?",
        "answerText": "Buildogram provides AI-engineered preliminary cost estimates and engineer-led detailed cost planning for construction projects in Chennai \u2014 covering civil, structural, finishes, MEP, and external works \u2014 helping owners set realistic budgets and evaluate contractor quotes accurately.",
        "processStepsTitle": "How It Works",
        "steps": [{"step":"01","title":"Initial Consultation","desc":"Share your project details and requirements with our team for an accurate scope assessment."},{"step":"02","title":"Engineer Assignment","desc":"A qualified engineer with relevant expertise is assigned to your project."},{"step":"03","title":"Assessment & Analysis","desc":"Detailed assessment is performed following structured protocols and industry standards."},{"step":"04","title":"Report & Recommendations","desc":"A formal report is issued with findings, recommendations, and next steps."},{"step":"05","title":"Follow-up Support","desc":"Our team remains available for follow-up queries and engineer-led clarification."}],
        "faqs": [{"question":"How do I get started?","answer":"Contact Buildogram through the form below or call our team. We will understand your requirements and connect you with the right engineer."},{"question":"What areas do you cover?","answer":"We cover Chennai and all major districts in Tamil Nadu through our verified engineer and partner network."},{"question":"How long does this service take?","answer":"Timelines depend on project scope. Initial consultation is typically within 24 hours. Full deliverables vary by service complexity."},{"question":"What makes Buildogram different?","answer":"Buildogram is engineer-led and report-based \u2014 every recommendation is backed by field data, technical analysis, and documented evidence rather than verbal advice."}],
        "relatedLinks": [["Home Construction", "/home-construction-chennai"], ["BOQ Review", "/boq-audit"], ["Structural Audit", "/structural-audit-chennai"], ["AI Tools", "/ai-tools"]],
        "ctaHref": "/contact?type=construction",
        "jsonLdType": "construction",
        "breadcrumbLabel": "Cost Estimation"
    },
    "contractor-quote-review-chennai": {
        "title": "Contractor Quote Review in Chennai | Engineer-Led Quote Analysis | Buildogram",
        "metaDescription": "Buildogram Contractor Quote Review in Chennai - engineer-led, AI-driven construction support in Chennai.",
        "h1": "Contractor Quote Review in Chennai",
        "hasHero": False,
        "answerQuestion": "Why should you get a contractor quote review before signing?",
        "answerText": "Contractor quotes in Chennai often contain vague specifications, missing BOQ items, unrealistic rates, and exclusion clauses that lead to disputes and cost overruns during construction. An engineer-led quote review identifies these issues before you are contractually committed.",
        "processStepsTitle": "How It Works",
        "steps": [{"step":"01","title":"Initial Consultation","desc":"Share your project details and requirements with our team for an accurate scope assessment."},{"step":"02","title":"Engineer Assignment","desc":"A qualified engineer with relevant expertise is assigned to your project."},{"step":"03","title":"Assessment & Analysis","desc":"Detailed assessment is performed following structured protocols and industry standards."},{"step":"04","title":"Report & Recommendations","desc":"A formal report is issued with findings, recommendations, and next steps."},{"step":"05","title":"Follow-up Support","desc":"Our team remains available for follow-up queries and engineer-led clarification."}],
        "faqs": [{"question":"How do I get started?","answer":"Contact Buildogram through the form below or call our team. We will understand your requirements and connect you with the right engineer."},{"question":"What areas do you cover?","answer":"We cover Chennai and all major districts in Tamil Nadu through our verified engineer and partner network."},{"question":"How long does this service take?","answer":"Timelines depend on project scope. Initial consultation is typically within 24 hours. Full deliverables vary by service complexity."},{"question":"What makes Buildogram different?","answer":"Buildogram is engineer-led and report-based \u2014 every recommendation is backed by field data, technical analysis, and documented evidence rather than verbal advice."}],
        "relatedLinks": [["Home Construction", "/home-construction-chennai"], ["BOQ Review", "/boq-audit"], ["Structural Audit", "/structural-audit-chennai"], ["AI Tools", "/ai-tools"]],
        "ctaHref": "/contact?type=construction",
        "jsonLdType": "construction",
        "breadcrumbLabel": "Quote Review"
    },
    "quality-inspection-chennai": {
        "title": "Quality Inspection Services in Chennai | Construction QC | Buildogram",
        "metaDescription": "Engineer-led quality inspection for construction in Chennai. Material checks, concrete testing, rebar inspection, and milestone sign-offs for your project.",
        "h1": "Quality Inspection in Chennai",
        "hasHero": False,
        "answerQuestion": "Why use Buildogram for your project?",
        "answerText": "Engineer-led quality inspection for construction in Chennai. Material checks, concrete testing, rebar inspection, and milestone sign-offs for your project.",
        "processStepsTitle": "Our Approach to Quality Inspection in Chennai",
        "steps": [{"step":"01","title":"Requirement Mapping","desc":"We map out your plot size, location, budget, and specific construction needs."},{"step":"02","title":"Plan & BOQ Review","desc":"Our engineers audit architectural plans and contractor quotes to prevent hidden costs."},{"step":"03","title":"Verified Partners","desc":"We connect you with trusted builders and contractors tailored to your project."},{"step":"04","title":"Site Tracking","desc":"Monitor milestones and material deliveries via our digital platform."}],
        "faqs": [{"question":"Do you provide direct construction services?","answer":"We are an engineer-led support platform. We connect you with verified contractors and audit their work to ensure quality and transparency."},{"question":"How much does BOQ review cost?","answer":"Our BOQ review pricing varies based on project size. Contact our engineers for a custom quote."},{"question":"Can I source materials through Buildogram?","answer":"Yes, we provide transparent quotes for cement, steel, sand, and other materials directly from verified suppliers in Chennai."}],
        "ctaHref": "/contact?type=construction",
        "jsonLdType": "construction",
        "breadcrumbLabel": "Quality Inspection"
    },
    "site-supervision-chennai": {
        "jsonLdType": "construction",
        "ctaHref": "/contact?type=supervision"
    },
    "structural-audit-chennai": {
        "jsonLdType": "audit"
    },
    "building-structural-audit-chennai": {
        "title": "Building Structural Audit in Chennai | Full Structural Assessment | Buildogram",
        "metaDescription": "Buildogram provides engineer-led Building Structural Audit in Chennai services in Chennai. Evidence-backed, report-based assessment by verified engineers.",
        "h1": "Building Structural Audit in Chennai",
        "hasHero": False,
        "answerQuestion": "What is included in a building structural audit?",
        "answerText": "A building structural audit includes visual inspection of all structural elements, NDT testing (rebound hammer, UPV, rebar scanning as required), crack mapping and classification, assessment of material deterioration, and a formal structural audit report with engineer recommendations for repair or further investigation.",
        "processStepsTitle": "Our Process",
        "steps": [{"step":"01","title":"Site Visit & Scope","desc":"Engineer visits the site to assess conditions, define test locations, and confirm the scope of work."},{"step":"02","title":"Testing & Data Collection","desc":"Testing is performed using calibrated equipment following IS/ASTM standards. All readings are documented."},{"step":"03","title":"Data Analysis","desc":"Collected data is analysed and compared against design specifications and code requirements."},{"step":"04","title":"Report Preparation","desc":"A formal technical report is prepared with findings, observations, and engineer recommendations."},{"step":"05","title":"Report Delivery","desc":"Report is delivered digitally with all data logs, photographs, and conclusion summary."}],
        "faqs": [{"question":"How do I book this service?","answer":"Contact Buildogram with your building address, type of structure, and area of concern. We will assign a qualified engineer and confirm the schedule."},{"question":"How long does the testing take?","answer":"Field testing for a typical residential building takes half a day to one full day. Report preparation takes 3\u20135 working days."},{"question":"Is this test destructive?","answer":"Most NDT tests are non-destructive \u2014 they do not damage the structure. Core testing requires small-diameter drilling but is localised and repaired after sampling."},{"question":"What standards are used?","answer":"All tests follow relevant IS (Indian Standard) codes and ASTM standards as applicable to the specific test method."}],
        "relatedLinks": [["Structural Audit", "/structural-audit-chennai"], ["NDT Testing", "/ndt-testing-chennai"], ["Crack Inspection", "/building-crack-inspection-chennai"], ["Old Building Audit", "/old-building-structural-audit-chennai"]],
        "ctaHref": "/contact?type=audit",
        "ctaLabel": "Request This Service",
        "jsonLdType": "audit",
        "breadcrumbLabel": "Building Audit"
    },
    "commercial-structural-audit-chennai": {
        "title": "Commercial Building Structural Audit Chennai | Office & Retail Audit | Buildogram",
        "metaDescription": "Buildogram provides engineer-led Commercial Building Structural Audit in Chennai services in Chennai. Evidence-backed, report-based assessment by verified engineers.",
        "h1": "Commercial Building Structural Audit in Chennai",
        "hasHero": False,
        "answerQuestion": "What special considerations apply to commercial building structural audits?",
        "answerText": "Commercial buildings face higher occupancy loads, frequent modifications, and longer operational periods than residential structures. A commercial structural audit evaluates load capacity, condition of structural members, previous modifications, fire damage, and compliance with current IS code requirements.",
        "processStepsTitle": "Our Process",
        "steps": [{"step":"01","title":"Site Visit & Scope","desc":"Engineer visits the site to assess conditions, define test locations, and confirm the scope of work."},{"step":"02","title":"Testing & Data Collection","desc":"Testing is performed using calibrated equipment following IS/ASTM standards. All readings are documented."},{"step":"03","title":"Data Analysis","desc":"Collected data is analysed and compared against design specifications and code requirements."},{"step":"04","title":"Report Preparation","desc":"A formal technical report is prepared with findings, observations, and engineer recommendations."},{"step":"05","title":"Report Delivery","desc":"Report is delivered digitally with all data logs, photographs, and conclusion summary."}],
        "faqs": [{"question":"How do I book this service?","answer":"Contact Buildogram with your building address, type of structure, and area of concern. We will assign a qualified engineer and confirm the schedule."},{"question":"How long does the testing take?","answer":"Field testing for a typical residential building takes half a day to one full day. Report preparation takes 3\u20135 working days."},{"question":"Is this test destructive?","answer":"Most NDT tests are non-destructive \u2014 they do not damage the structure. Core testing requires small-diameter drilling but is localised and repaired after sampling."},{"question":"What standards are used?","answer":"All tests follow relevant IS (Indian Standard) codes and ASTM standards as applicable to the specific test method."}],
        "relatedLinks": [["Structural Audit", "/structural-audit-chennai"], ["NDT Testing", "/ndt-testing-chennai"], ["Crack Inspection", "/building-crack-inspection-chennai"], ["Old Building Audit", "/old-building-structural-audit-chennai"]],
        "ctaHref": "/contact?type=audit",
        "ctaLabel": "Request This Service",
        "jsonLdType": "audit",
        "breadcrumbLabel": "Commercial Audit"
    },
    "old-building-structural-audit-chennai": {
        "title": "Old Building Structural Audit in Chennai | Renovation Safety Check",
        "metaDescription": "Certified structural health checks for buildings over 20 years old in Chennai. We test load-bearing capacity before you renovate, buy, or add a new floor.",
        "h1": "Old Building Structural Audit in Chennai",
        "hasHero": False,
        "answerQuestion": "What is the biggest threat to old buildings in Chennai?",
        "answerText": "Carbonation and Chloride attack. Chennai's salty, humid air slowly penetrates concrete over decades. Eventually, it reaches the steel reinforcement, causing the rebar to rust, expand, and blow off the concrete cover (spalling). If your old building has exposed rusting steel in the roof slab, a structural audit is urgently required before a collapse occurs.",
        "processStepsTitle": "Our Assessment Process",
        "steps": [{"step":"01","title":"Document & History Review","desc":"We review whatever original architectural drawings you have. If none exist, we digitally map the current layout to establish the structural grid."},{"step":"02","title":"Corrosion & Spalling Check","desc":"Old buildings in Chennai suffer from severe chloride attacks. We check columns and roof slabs for exposed, rusting steel (spalling)."},{"step":"03","title":"NDT Strength Testing","desc":"Using UPV and Rebound Hammer equipment, we non-destructively test the compressive strength of the 20+ year old concrete to ensure it hasn't degraded."},{"step":"04","title":"Load Capacity Analysis","desc":"Our engineers run software simulations to determine if the existing columns and foundation can safely support the additional weight of a new floor or a heavy roof garden."},{"step":"05","title":"Retrofitting Design","desc":"If the structure is weak, we don't just fail it. We provide engineered retrofitting solutions (like column jacketing) to safely upgrade the building's load capacity."}],
        "faqs": [{"question":"My house is 25 years old. Can I build a second floor on it?","answer":"You cannot assume it is safe just because the walls look fine. A 25-year-old foundation was likely only designed for one floor. We must perform an audit, scan the columns, and calculate the current strength before giving the green light."},{"question":"Is it cheaper to demolish and rebuild, or retrofit?","answer":"It depends on the audit results. Minor column jacketing or carbon wrapping is much cheaper than a full demolition. However, if the foundation has failed or the concrete is completely carbonated, we will advise demolition as the safest and most economical long-term option."},{"question":"We want to remove a wall to make the living room bigger. Is it safe?","answer":"If your old house has a load-bearing brick structure (no columns), removing a wall will cause the roof to collapse. Our engineers will audit the house to determine which walls are load-bearing and design safe steel-beam support systems if you want an open floor plan."},{"question":"How long does the audit take?","answer":"The site inspection and NDT scanning usually takes 1-2 days. The engineering analysis and final report generation takes an additional 4-5 working days."}],
        "relatedLinks": [["Structural Audit", "/structural-audit-chennai"], ["Building Crack Inspection", "/building-crack-inspection-chennai"], ["Rebar Scanning", "/rebar-scanning-chennai"], ["UPV Test", "/upv-test-chennai"]],
        "ctaHref": "/contact?type=audit",
        "ctaLabel": "Book a Building Audit",
        "jsonLdType": "audit",
        "breadcrumbLabel": "Old Building Audit"
    },
    "residential-structural-audit-chennai": {
        "title": "Residential Structural Audit Chennai | House & Villa Safety Check | Buildogram",
        "metaDescription": "Buildogram provides engineer-led Residential Structural Audit in Chennai services in Chennai. Evidence-backed, report-based assessment by verified engineers.",
        "h1": "Residential Structural Audit in Chennai",
        "hasHero": False,
        "answerQuestion": "Why should homeowners get a residential structural audit?",
        "answerText": "A residential structural audit identifies hidden structural risks in houses, villas, and apartments \u2014 including foundation settlement, corrosion of reinforcement, crack severity, and material degradation \u2014 before they escalate into costly failures or safety hazards.",
        "processStepsTitle": "Our Process",
        "steps": [{"step":"01","title":"Site Visit & Scope","desc":"Engineer visits the site to assess conditions, define test locations, and confirm the scope of work."},{"step":"02","title":"Testing & Data Collection","desc":"Testing is performed using calibrated equipment following IS/ASTM standards. All readings are documented."},{"step":"03","title":"Data Analysis","desc":"Collected data is analysed and compared against design specifications and code requirements."},{"step":"04","title":"Report Preparation","desc":"A formal technical report is prepared with findings, observations, and engineer recommendations."},{"step":"05","title":"Report Delivery","desc":"Report is delivered digitally with all data logs, photographs, and conclusion summary."}],
        "faqs": [{"question":"How do I book this service?","answer":"Contact Buildogram with your building address, type of structure, and area of concern. We will assign a qualified engineer and confirm the schedule."},{"question":"How long does the testing take?","answer":"Field testing for a typical residential building takes half a day to one full day. Report preparation takes 3\u20135 working days."},{"question":"Is this test destructive?","answer":"Most NDT tests are non-destructive \u2014 they do not damage the structure. Core testing requires small-diameter drilling but is localised and repaired after sampling."},{"question":"What standards are used?","answer":"All tests follow relevant IS (Indian Standard) codes and ASTM standards as applicable to the specific test method."}],
        "relatedLinks": [["Structural Audit", "/structural-audit-chennai"], ["NDT Testing", "/ndt-testing-chennai"], ["Crack Inspection", "/building-crack-inspection-chennai"], ["Old Building Audit", "/old-building-structural-audit-chennai"]],
        "ctaHref": "/contact?type=audit",
        "ctaLabel": "Request This Service",
        "jsonLdType": "audit",
        "breadcrumbLabel": "Residential Audit"
    },
    "building-crack-inspection-chennai": {
        "title": "Building Crack Inspection in Chennai | Structural Engineers",
        "metaDescription": "Certified engineers for building crack inspection in Chennai. We analyze wall and column cracks, identify the root cause (settlement, thermal, corrosion), and provide repair solutions.",
        "h1": "Building Crack Inspection in Chennai",
        "hasHero": False,
        "answerQuestion": "Is it safe to live in a house with a cracked roof slab?",
        "answerText": "A cracked roof slab is highly dangerous in Chennai. During the monsoon, rainwater seeps into the crack, reaching the steel reinforcement mesh. The steel rusts, expands, and pushes the concrete away (spalling). If left unchecked, large chunks of the concrete roof will eventually collapse inward.",
        "processStepsTitle": "Our Crack Inspection Process",
        "steps": [{"step":"01","title":"Crack Mapping","desc":"Our structural engineer visually maps out the pattern, width, and depth of all cracks, differentiating between harmless plaster cracks and dangerous structural shear cracks."},{"step":"02","title":"Telltale Glass Monitoring","desc":"For active cracks, we install glass telltales or digital crack monitors across the gap to track if the crack is actively widening over time."},{"step":"03","title":"Root Cause Analysis","desc":"We investigate the source: foundation settlement, thermal expansion, steel corrosion, or poor concrete shrinkage."},{"step":"04","title":"NDT Verification","desc":"If needed, we use UPV (Ultrasonic Pulse Velocity) or Rebar Scanning to check internal damage behind the visible crack."},{"step":"05","title":"Repair Methodology Report","desc":"You receive a detailed report with specific repair instructions, such as epoxy injection, micro-concreting, or foundation underpinning."}],
        "faqs": [{"question":"When should I be worried about a wall crack?","answer":"Hairline cracks in the plaster (web-like patterns) are usually harmless shrinkage cracks. However, diagonal \"staircase\" cracks, horizontal cracks near beams, or any crack wider than a coin edge indicates severe structural stress."},{"question":"Why do so many buildings in Chennai have diagonal cracks?","answer":"Diagonal cracks usually indicate differential foundation settlement. Due to Chennai's varied soil (especially in marshy areas like Velachery or Pallikaranai), one side of the foundation often sinks faster than the other, tearing the walls diagonally."},{"question":"Can cracks be permanently fixed with putty?","answer":"No. Putty or exterior crack-fillers only hide the symptom. If the crack is structural, the underlying movement will simply tear the new putty open within months. The root cause must be addressed."},{"question":"What is epoxy injection?","answer":"For deep structural cracks in columns or beams, we inject high-strength epoxy resin under high pressure. The resin penetrates deep into the concrete and cures stronger than the concrete itself, sealing and bonding the crack."}],
        "relatedLinks": [["Structural Audit", "/structural-audit-chennai"], ["Old Building Audit", "/old-building-structural-audit-chennai"], ["UPV Test", "/upv-test-chennai"], ["Rebar Scanning", "/rebar-scanning-chennai"]],
        "ctaHref": "/contact?type=audit",
        "ctaLabel": "Book an Engineer Inspection",
        "jsonLdType": "audit",
        "breadcrumbLabel": "Crack Inspection"
    },
    "construction-layout-marking-chennai": {
        "title": "Construction Layout Marking in Chennai | Total Station Setting Out",
        "metaDescription": "Precision construction layout and column center line marking in Chennai. We use Total Stations to ensure your building is erected exactly according to the architect's plan.",
        "h1": "Construction Layout Marking in Chennai",
        "hasHero": False,
        "answerQuestion": "What is the CMDA Setback Violation risk?",
        "answerText": "The Chennai Metropolitan Development Authority (CMDA) enforces strict setbacks (empty space between your building and the boundary wall). If your mason marks the building manually and accidentally shifts it 6 inches towards the boundary, you violate CMDA rules. This can result in building plan rejection, hefty fines, or demolition notices. Total Station marking guarantees your building stays exactly within the legal footprint.",
        "processStepsTitle": "Our Setting-Out Process",
        "steps": [{"step":"01","title":"CAD Upload","desc":"We take the final structural centerline drawing (AutoCAD file) from your architect and digitally upload it into our Total Station instrument."},{"step":"02","title":"Boundary Alignment","desc":"On site, we calibrate the Total Station with the property's exact boundary corners to establish the true orientation of the building."},{"step":"03","title":"Centerline Marking","desc":"Using lasers, the Total Station mathematically guides our surveyor to the exact X and Y coordinate of every column, footing, and retaining wall."},{"step":"04","title":"Physical Staking","desc":"We drive steel pegs or paint the center points physically on the ground or on the newly laid PCC (Plain Cement Concrete) bed."},{"step":"05","title":"Handover to Contractor","desc":"We verify all diagonal measurements and hand over the marked site to the masonry or piling contractor for excavation/drilling."}],
        "faqs": [{"question":"Why can't my mason or contractor do the layout marking?","answer":"Traditional masons use thread (nool) and measuring tapes to mark columns. Tapes stretch, and forming perfect 90-degree angles over large distances is impossible manually. This often results in skewed columns and rooms that aren't perfectly square, which ruins tile alignment later."},{"question":"At what stages do I need Layout Marking?","answer":"Usually twice. First, to mark the excavation trenches on the bare earth. Second, after the PCC (concrete bed) is laid in the pits, to mark the exact center point for the column steel cage to be placed."},{"question":"What happens if a column is marked in the wrong place?","answer":"If a column is offset by even 2 inches, the structural load doesn't transfer straight down to the foundation. Your structural engineer will have to issue a dangerous \"eccentric footing\" redesign, or you will have an ugly column bulging out of your living room wall."},{"question":"How much does Layout Marking cost?","answer":"For a standard independent house in Chennai, Total Station layout marking is highly affordable, usually ranging from \u20b93,000 to \u20b95,000 per visit."}],
        "relatedLinks": [["Total Station Survey", "/total-station-survey-chennai"], ["Pile Point Marking", "/pile-point-marking-chennai"], ["Topographic Survey", "/topographic-survey-chennai"], ["Land Survey", "/land-survey-chennai"]],
        "ctaHref": "/contact?type=survey",
        "ctaLabel": "Book Layout Marking",
        "jsonLdType": "survey",
        "breadcrumbLabel": "Layout Marking"
    },
    "land-survey-chennai": {
        "jsonLdType": "survey"
    },
    "drone-survey-chennai": {
        "jsonLdType": "survey"
    },
    "dgps-survey-chennai": {
        "title": "DGPS Survey in Chennai | Satellite-Guided Land Measurement",
        "metaDescription": "High-accuracy DGPS surveying in Chennai for large land parcels, CMDA approval coords, and agricultural plots. Fast, satellite-based boundary marking.",
        "h1": "DGPS Survey Services in Chennai",
        "hasHero": False,
        "answerQuestion": "When is DGPS the only option?",
        "answerText": "If you are buying a 10-acre parcel in Kanchipuram or Tiruvallur, the land is likely covered in thick shrubs and lacks clear boundary markers. A traditional surveyor would spend a week cutting bushes just to get a line of sight. DGPS ignores the bushes, talks directly to satellites, and maps the exact boundary in a single day, saving you massive amounts of time and labor costs.",
        "processStepsTitle": "How DGPS (RTK) Works",
        "steps": [{"step":"01","title":"Base Station Setup","desc":"We install a DGPS Base Station on a known, fixed coordinate point. This base communicates with satellites to calculate precise error-correction data."},{"step":"02","title":"Rover Deployment","desc":"Our surveyors walk the perimeter and interior of the land using a DGPS Rover. The rover receives real-time corrections from the base station via radio link."},{"step":"03","title":"Real-Time Kinematic (RTK) Measurement","desc":"As the rover is placed on boundary corners, it records X, Y, and Z coordinates with sub-centimeter accuracy instantly."},{"step":"04","title":"FMB Superimposition","desc":"The global coordinate data is overlaid onto the local government FMB (Field Measurement Book) sketch to verify legal boundaries."},{"step":"05","title":"Data Export","desc":"Coordinates are exported in formats required by CMDA/DTCP or imported directly into AutoCAD for drawing generation."}],
        "faqs": [{"question":"What is the difference between DGPS and Total Station?","answer":"Total Station uses lasers and requires a clear line-of-sight between the instrument and the target, making it perfect for dense urban areas. DGPS uses GPS satellites. It works over massive distances (like a 50-acre farm) and through thick bushes, but struggles inside cities surrounded by tall buildings."},{"question":"Why does CMDA require DGPS coordinates?","answer":"For large developments, CMDA and RERA require absolute global coordinates (Latitude/Longitude) to officially register the exact location of the project on the government's master map, ensuring it does not overlap with water bodies or reserve forests."},{"question":"How accurate is DGPS?","answer":"Standard GPS on your phone is accurate to about 3-5 meters. Differential GPS (DGPS) uses a stationary base to correct atmospheric errors, achieving sub-centimeter (millimeter-level) accuracy."},{"question":"Can you survey a forest or heavily vegetated land?","answer":"Yes. Unlike a Total Station which requires chopping down bushes to see the target, a DGPS rover only needs a clear view of the sky to communicate with satellites, making it ideal for overgrown plots."}],
        "relatedLinks": [["Total Station Survey", "/total-station-survey-chennai"], ["Drone Survey", "/drone-survey-chennai"], ["Land Survey", "/land-survey-chennai"], ["Topographic Survey", "/topographic-survey-chennai"]],
        "ctaHref": "/contact?type=survey",
        "ctaLabel": "Book a DGPS Survey",
        "jsonLdType": "survey",
        "breadcrumbLabel": "DGPS Survey"
    },
    "topographic-survey-chennai": {
        "jsonLdType": "survey"
    },
    "total-station-survey-chennai": {
        "jsonLdType": "survey"
    },
    "contour-survey-chennai": {
        "title": "Contour Survey in Chennai | Sloped Land Measurement",
        "metaDescription": "Accurate contour surveys for sloped and uneven terrains in Chennai. We map elevation differences to optimize earthwork, drainage, and foundation design.",
        "h1": "Contour Survey in Chennai",
        "hasHero": False,
        "answerQuestion": "How does a Contour Survey save you money on Earthwork?",
        "answerText": "Earthwork (cutting and filling soil) is incredibly expensive. If you blindly order truckloads of soil to level a plot, you will overspend. A contour survey creates a 3D model of your land and calculates the exact volume of soil needed to be moved. Often, the 'cut' from the high areas can be used to 'fill' the low areas, saving you lakhs in material transport costs.",
        "processStepsTitle": "Our Contour Mapping Process",
        "steps": [{"step":"01","title":"Benchmark Establishment","desc":"We establish a Temporary Bench Mark (TBM) tied to Mean Sea Level (MSL) or a local fixed reference point (like an adjacent road)."},{"step":"02","title":"Grid Spot Heights","desc":"Our surveyors take dense elevation readings at regular grid intervals using a Total Station or DGPS."},{"step":"03","title":"Breakline Mapping","desc":"We specifically map abrupt changes in elevation\u2014such as ditches, embankments, retaining walls, and natural drains."},{"step":"04","title":"Contour Generation","desc":"The 3D point cloud data is processed in Civil 3D software to generate smooth contour lines at specified intervals (e.g., every 0.5 meters)."},{"step":"05","title":"Earthwork Estimation","desc":"If required, we calculate the exact volume of soil that needs to be cut or filled to level the plot."}],
        "faqs": [{"question":"What is a Contour Line?","answer":"A contour line is an imaginary line on a map that connects points of equal elevation. If contour lines are close together, the land is steep. If they are far apart, the land is relatively flat."},{"question":"Why do I need a contour survey if my plot looks flat?","answer":"To the naked eye, a large plot may look flat, but it could have a subtle 1-meter drop from front to back. If your architect doesn't know this, rainwater might drain towards your house instead of towards the street."},{"question":"Can you calculate how many trucks of soil I need to fill my plot?","answer":"Yes. Based on the contour survey, we can generate a Cut/Fill report that tells you exactly how many cubic meters of gravel or soil you need to buy to raise your plot to the desired road level."},{"question":"Do you do contour surveys for large hilly terrains?","answer":"Yes, for large agricultural lands, industrial parks, or hilly terrains (like near Pallavaram or St. Thomas Mount), we use DGPS and Drone photogrammetry to map massive areas quickly."}],
        "relatedLinks": [["Topographic Survey", "/topographic-survey-chennai"], ["Drone Survey", "/drone-survey-chennai"], ["Land Survey", "/land-survey-chennai"], ["Soil Testing", "/soil-testing-chennai"]],
        "ctaHref": "/contact?type=survey",
        "ctaLabel": "Book a Contour Survey",
        "jsonLdType": "survey",
        "breadcrumbLabel": "Contour Survey"
    },
    "pile-point-marking-chennai": {
        "title": "Pile Point Marking in Chennai | Foundation Layout Services | Buildogram",
        "metaDescription": "Precise pile point marking services in Chennai to demarcate pile locations from structural drawings onto site using total station survey instruments.",
        "h1": "Pile Point Marking in Chennai",
        "hasHero": False,
        "answerQuestion": "What does pile point marking involve?",
        "answerText": "Pile point marking is the process of accurately transferring the approved pile layout drawing onto the ground surface, marking each pile centre point with stakes or paint using a total station or DGPS instrument \u2014 ensuring piles are installed at the exact designed locations.",
        "processStepsTitle": "Our Process",
        "steps": [{"step":"01","title":"Requirement Assessment","desc":"Review your project scope, site conditions, and required deliverable format before mobilisation."},{"step":"02","title":"Equipment Mobilisation","desc":"Verified survey team mobilised to site with appropriate instruments \u2014 total station, DGPS, or UAV."},{"step":"03","title":"Field Data Collection","desc":"Field measurements are taken systematically following the survey scope agreed with the client."},{"step":"04","title":"Data Processing & CAD","desc":"Field data is processed using CAD/GIS software to produce the required drawings and calculations."},{"step":"05","title":"Report & Handover","desc":"Formal survey report issued with CAD drawings, data files, and recommendations as applicable."}],
        "faqs": [{"question":"How do I request this service?","answer":"Contact Buildogram with your plot details, survey type required, and location. We will connect you with a verified surveyor and provide a project-specific quote."},{"question":"How long does the survey take?","answer":"Typical field work takes 1\u20132 days. Report preparation and CAD output delivery takes 2\u20133 working days after field completion."},{"question":"Are the surveyors licensed?","answer":"Buildogram connects you with verified survey professionals. All surveyors in our network are assessed for equipment, experience, and past project quality."},{"question":"What format are the deliverables in?","answer":"Deliverables are provided as CAD DWG files, PDF drawings, and a formal written report. GIS or other formats can be requested at the time of enquiry."}],
        "relatedLinks": [["Construction Layout Marking", "/construction-layout-marking-chennai"], ["Pile Foundation", "/pile-foundation-contractors-chennai"], ["Land Survey", "/land-survey-chennai"]],
        "ctaHref": "/contact?type=survey",
        "ctaLabel": "Request This Service",
        "jsonLdType": "survey",
        "breadcrumbLabel": "Pile Point Marking"
    },
    "pile-foundation-contractors-chennai": {
        "title": "Pile Foundation Contractors in Chennai | Bored, DMC & Micro Piling",
        "metaDescription": "Verified pile foundation contractors in Chennai. We execute Bored Cast-in-Situ, DMC piling, and Micro-piling with strict engineer supervision and load testing.",
        "h1": "Engineer-Supervised Pile Foundation in Chennai",
        "hasHero": False,
        "answerQuestion": "Why does piling require strict engineer supervision?",
        "answerText": "Piling happens completely underground. Once concrete is poured, you cannot see if the rebar cage shifted, if the borehole collapsed, or if the contractor stopped drilling 5 meters short of the hard rock layer. A Buildogram engineer verifies the bore depth, the bentonite density, and the tremie concrete pour to ensure zero defects.",
        "processStepsTitle": "Our Piling Execution Methodology",
        "steps": [{"step":"01","title":"Geotechnical Analysis","desc":"Our structural engineers review your soil test report (SBC) to determine the exact pile diameter, depth to hard strata, and pile grid layout."},{"step":"02","title":"Method Selection","desc":"Depending on site access and soil type (clay vs sandy), we select the right rig\u2014DMC tripod for tight spaces or rotary rigs for large commercial plots."},{"step":"03","title":"Boring & Bentonite Slurry","desc":"Drilling commences. For collapsible soil (common in Chennai coastal areas), we pump bentonite slurry to stabilize the borehole walls."},{"step":"04","title":"Rebar & Concreting","desc":"The customized Fe500D rebar cage is lowered. Concrete is pumped through a tremie pipe from bottom to top, displacing the bentonite."},{"step":"05","title":"Pile Load & Integrity Testing","desc":"After curing, we conduct Pile Integrity Tests (PIT) or Static Load Tests to physically prove the load-bearing capacity before superstructure work begins."}],
        "faqs": [{"question":"When is a pile foundation required in Chennai?","answer":"Piling is required when the soil's Safe Bearing Capacity (SBC) is extremely low near the surface. This is very common in marshy areas like Velachery, Pallikaranai, Madipakkam, and sandy coastal belts like ECR/OMR."},{"question":"What is the difference between DMC and Rotary Piling?","answer":"DMC (Direct Mud Circulation) uses a tripod rig that takes up very little space, perfect for narrow residential streets in Chennai. Rotary piling uses a heavy truck-mounted rig which is much faster but requires large site access."},{"question":"How do I know the contractor drilled to the correct depth?","answer":"In unmonitored sites, contractors often pour concrete before hitting hard rock to save time. Buildogram assigns a site engineer to personally verify the depth of the borehole and the nature of the rock strata before authorizing the concrete pour."},{"question":"What is the average cost of piling in Chennai?","answer":"Cost varies by diameter (e.g., 400mm, 600mm) and depth (e.g., 15m, 20m). Generally, DMC piling starts around \u20b91,000 - \u20b91,500 per running meter excluding steel and concrete. We provide transparent, itemized BOQs for exact costings."}],
        "relatedLinks": [["Soil Investigation", "/soil-investigation-chennai"], ["Pile Integrity Testing", "/pile-integrity-test-chennai"], ["Dynamic Pile Load Test", "/dynamic-pile-load-test-chennai"], ["Bored Cast-In-Situ", "/bored-cast-in-situ-piles-chennai"]],
        "ctaHref": "/contact?type=piling",
        "ctaLabel": "Request a Piling Quote",
        "jsonLdType": "piling",
        "breadcrumbLabel": "Pile Foundation Contractors"
    },
    "pile-load-test-chennai": {
        "ctaHref": "/contact?type=piling",
        "ctaLabel": "Book a Load Test",
        "jsonLdType": "piling",
        "relatedLinks": [["Dynamic Pile Load Test", "/dynamic-pile-load-test-chennai"], ["Pile Integrity Test", "/pile-integrity-test-chennai"], ["Bored Cast-In-Situ", "/bored-cast-in-situ-piles-chennai"], ["DMC Piling", "/dmc-piling-contractors-chennai"]]
    },
    "pile-integrity-test-chennai": {
        "ctaHref": "/contact?type=piling",
        "ctaLabel": "Book an Integrity Test",
        "jsonLdType": "piling",
        "relatedLinks": [["Pile Load Test", "/pile-load-test-chennai"], ["Bored Cast-In-Situ", "/bored-cast-in-situ-piles-chennai"], ["DMC Piling Contractors", "/dmc-piling-contractors-chennai"], ["Dynamic Pile Load Test", "/dynamic-pile-load-test-chennai"]]
    },
    "dynamic-pile-load-test-chennai": {
        "jsonLdType": "piling"
    },
    "plate-load-test-chennai": {
        "hasHero": True,
        "jsonLdType": "ndt"
    },
    "bored-cast-in-situ-piles-chennai": {
        "title": "Bored Cast-In-Situ Piles Chennai | Heavy Rotary Rig Piling",
        "metaDescription": "Fast, high-capacity Bored Cast-in-Situ piling for commercial buildings and apartments in Chennai. Executed using hydraulic rotary rigs under expert supervision.",
        "h1": "Bored Cast-In-Situ Piling in Chennai",
        "hasHero": False,
        "answerQuestion": "Why is Borehole Cleaning critical before concreting?",
        "answerText": "When a rotary rig drills, loose soil and rock fragments (muck) fall to the bottom of the hole. If concrete is poured over this muck, the pile will sit on a spongy layer of mud instead of hard rock, severely reducing its 'End Bearing' capacity. Our engineers ensure the pile bottom is thoroughly flushed and cleaned before the rebar cage is lowered.",
        "processStepsTitle": "Rotary Piling Execution",
        "steps": [{"step":"01","title":"Rotary Drilling","desc":"A heavy truck or crawler-mounted hydraulic rotary rig uses an auger or drilling bucket to rapidly cut through the soil and rock to the designed depth."},{"step":"02","title":"Temporary Casing","desc":"In loose sandy soils (like ECR/OMR), a temporary steel casing is driven into the top layer of the borehole to prevent the walls from caving in."},{"step":"03","title":"Borehole Cleaning","desc":"Once the hard strata is reached, the bottom of the pile is thoroughly cleaned to remove loose muck that could compromise the bearing capacity."},{"step":"04","title":"Steel Cage Installation","desc":"A heavy-duty reinforcement cage is lowered using a crane into the clean borehole."},{"step":"05","title":"High-Volume Concreting","desc":"Ready Mix Concrete (RMC) is pumped rapidly via a tremie pipe. As the concrete fills the hole, the temporary steel casing is slowly extracted."}],
        "faqs": [{"question":"What is the main advantage of Rotary Bored Cast-in-Situ piling?","answer":"Speed and capacity. A rotary rig can bore through hard rock rapidly and create large diameter piles (up to 1200mm+) that can support massive multi-story commercial buildings or apartments."},{"question":"Why can't I use this for my independent house?","answer":"You can, provided you have a wide access road (at least 30-40 feet wide) and no low-hanging electrical wires. The equipment is massive and requires significant clearance to operate, making it unsuitable for tight Chennai streets."},{"question":"How is the soil collapse prevented without Bentonite?","answer":"While bentonite is sometimes used, rotary rigs often rely on driving a temporary steel casing (a large steel pipe) into the ground. The drilling happens inside this pipe, completely preventing the surrounding soil from collapsing in."},{"question":"Is the concrete poured manually?","answer":"No. Due to the massive volume required, Bored Cast-in-Situ piles are always filled using continuous pumping from Ready Mix Concrete (RMC) transit mixers via a tremie pipe."}],
        "relatedLinks": [["Pile Foundation Contractors", "/pile-foundation-contractors-chennai"], ["DMC Piling", "/dmc-piling-contractors-chennai"], ["Dynamic Pile Load Test", "/dynamic-pile-load-test-chennai"], ["Pile Integrity Test", "/pile-integrity-test-chennai"]],
        "ctaHref": "/contact?type=piling",
        "ctaLabel": "Get a Rotary Piling Quote",
        "jsonLdType": "piling",
        "breadcrumbLabel": "Bored Cast-In-Situ"
    },
    "dmc-piling-contractors-chennai": {
        "title": "DMC Piling Contractors in Chennai | Tripod Piling for Small Plots",
        "metaDescription": "Verified DMC (Direct Mud Circulation) piling contractors in Chennai. Ideal for narrow streets and independent residential houses. Safe, engineer-supervised execution.",
        "h1": "DMC Piling Contractors in Chennai",
        "answerQuestion": "Why do you need an Engineer supervising your DMC piling contractor?",
        "answerText": "DMC contractors are paid per meter of drilling. A common malpractice is to stop drilling the moment they hit the first hard layer (to save labor time), even if it's just an isolated boulder and not the actual bedrock. A Buildogram engineer stays on site to verify the strata and ensure the drilling reaches the required depth mandated by the structural design.",
        "processStepsTitle": "The DMC Piling Process",
        "steps": [{"step":"01","title":"Tripod Erection","desc":"A vertical tripod rig is manually erected over the surveyed pile center point. Its compact size allows it to operate even in extremely narrow plots."},{"step":"02","title":"Drilling & Mud Circulation","desc":"A heavy chisel is dropped repeatedly to break the soil. Simultaneously, bentonite slurry is pumped down to flush out the debris and prevent the borehole walls from collapsing."},{"step":"03","title":"Hard Strata Verification","desc":"The chisel hits hard rock. A Buildogram engineer physically inspects the extracted rock samples to confirm it meets the structural engineer's depth requirement."},{"step":"04","title":"Rebar Cage Lowering","desc":"A pre-fabricated circular TMT steel cage (with concrete cover blocks attached) is carefully lowered into the borehole."},{"step":"05","title":"Tremie Concreting","desc":"A tremie pipe is lowered to the bottom. Concrete is poured through the pipe, displacing the lighter bentonite slurry upwards, ensuring a solid, void-free concrete pile."}],
        "faqs": [{"question":"Why is DMC piling so common for houses in Chennai?","answer":"Many residential plots in Chennai (like in T-Nagar, Triplicane, or Mylapore) are situated on narrow 20-foot streets where heavy truck-mounted rotary rigs simply cannot enter. A DMC tripod rig can be dismantled, carried inside manually, and assembled in very tight spaces."},{"question":"Is DMC piling slower than Rotary piling?","answer":"Yes. DMC piling is a manual, percussion-based method. It usually completes 1 to 1.5 piles a day. Rotary piling can complete 4 to 5 piles a day, but requires massive space and access roads."},{"question":"What is the biggest risk with DMC piling?","answer":"Borehole collapse and soil mixing. If the bentonite slurry isn't mixed at the correct density, the wet soil walls collapse into the hole while pouring concrete, resulting in a structurally weak \"mixed\" pile. Our engineers constantly monitor the bentonite density to prevent this."},{"question":"How much does DMC piling cost in Chennai?","answer":"Rates vary based on the pile diameter (e.g., 400mm or 600mm) and soil strata. The drilling labor usually costs \u20b91,000 to \u20b91,500 per meter, while steel and RMC concrete are billed as per actual consumption."}],
        "relatedLinks": [["Pile Foundation Contractors", "/pile-foundation-contractors-chennai"], ["Bored Cast-In-Situ", "/bored-cast-in-situ-piles-chennai"], ["Micro Piling", "/micro-piling-contractors-chennai"], ["Pile Integrity Test", "/pile-integrity-test-chennai"]],
        "ctaHref": "/contact?type=piling",
        "ctaLabel": "Get a DMC Piling Quote",
        "jsonLdType": "piling",
        "breadcrumbLabel": "DMC Piling"
    },
    "micro-piling-contractors-chennai": {
        "jsonLdType": "piling"
    },
    "ndt-testing-chennai": {
        "jsonLdType": "ndt"
    },
    "soil-testing-chennai": {
        "jsonLdType": "ndt"
    },
    "soil-investigation-chennai": {
        "jsonLdType": "ndt"
    },
    "rebound-hammer-test-chennai": {
        "ctaHref": "/contact?type=audit",
        "ctaLabel": "Book an NDT Test",
        "jsonLdType": "ndt",
        "relatedLinks": [["Structural Audit", "/structural-audit-chennai"], ["UPV Test", "/upv-test-chennai"], ["Core Test for Concrete", "/core-test-concrete-chennai"], ["Rebar Scanning", "/rebar-scanning-chennai"]]
    },
    "upv-test-chennai": {
        "jsonLdType": "ndt"
    },
    "core-test-concrete-chennai": {
        "ctaHref": "/contact?type=audit",
        "ctaLabel": "Book a Core Test",
        "jsonLdType": "ndt",
        "relatedLinks": [["Rebar Scanning", "/rebar-scanning-chennai"], ["UPV Test", "/upv-test-chennai"], ["Structural Audit", "/structural-audit-chennai"], ["Rebound Hammer Test", "/rebound-hammer-test-chennai"]]
    },
    "rebar-scanning-chennai": {
        "ctaHref": "/contact?type=audit",
        "ctaLabel": "Book a Rebar Scan",
        "jsonLdType": "ndt",
        "relatedLinks": [["Core Test Concrete", "/core-test-concrete-chennai"], ["Structural Audit", "/structural-audit-chennai"], ["UPV Test", "/upv-test-chennai"], ["Building Crack Inspection", "/building-crack-inspection-chennai"]]
    },
    "why-vs-aggregators": {
        "jsonLdType": "why"
    },
    "why-vs-mason": {
        "jsonLdType": "why"
    }
}

slugs = [
    'home-construction-chennai',
    'house-construction-chennai',
    'residential-construction-chennai',
    'commercial-construction-chennai',
    'turnkey-construction-chennai',
    'renovation-contractors-chennai',
    'construction-company-chennai',
    'construction-project-management-chennai',
    'builders-in-chennai',
    'construction-cost-estimation-chennai',
    'contractor-quote-review-chennai',
    'quality-inspection-chennai',
    'site-supervision-chennai',
    'structural-audit-chennai',
    'building-structural-audit-chennai',
    'commercial-structural-audit-chennai',
    'old-building-structural-audit-chennai',
    'residential-structural-audit-chennai',
    'building-crack-inspection-chennai',
    'site-supervision-chennai',
    'construction-layout-marking-chennai',
    'land-survey-chennai',
    'drone-survey-chennai',
    'dgps-survey-chennai',
    'topographic-survey-chennai',
    'total-station-survey-chennai',
    'contour-survey-chennai',
    'pile-point-marking-chennai',
    'pile-foundation-contractors-chennai',
    'pile-load-test-chennai',
    'pile-integrity-test-chennai',
    'dynamic-pile-load-test-chennai',
    'plate-load-test-chennai',
    'bored-cast-in-situ-piles-chennai',
    'dmc-piling-contractors-chennai',
    'micro-piling-contractors-chennai',
    'ndt-testing-chennai',
    'soil-testing-chennai',
    'soil-investigation-chennai',
    'rebound-hammer-test-chennai',
    'upv-test-chennai',
    'core-test-concrete-chennai',
    'rebar-scanning-chennai',
    'why-vs-aggregators',
    'why-vs-mason'
]

out_lines = [
    "export const SERVICES = [",
]

for s in slugs:
    obj = scraped.get(s, {})
    if s in manual:
        for k, v in manual[s].items():
            obj[k] = v

    # copy obj to not modify original in case of dupes
    obj = dict(obj)

    if "slug" not in obj:
        obj["slug"] = s
        
    for k in ["h1", "title", "metaDescription", "hasHero", "heroTag", "answerQuestion", "answerText", "processStepsTitle", "ctaHref", "ctaLabel", "ctaSecondaryHref", "ctaSecondaryLabel", "breadcrumbLabel", "jsonLdType"]:
        if k not in obj:
            obj[k] = ""
            
    if "steps" not in obj: obj["steps"] = []
    if "faqs" not in obj: obj["faqs"] = []
    if "stats" not in obj: obj["stats"] = []
    if "relatedLinks" not in obj: obj["relatedLinks"] = []
    if "extraSections" not in obj: obj["extraSections"] = []
    
    if not obj["breadcrumbLabel"]:
        obj["breadcrumbLabel"] = obj["h1"] if obj["h1"] else s.replace("-chennai", "").replace("-", " ").title()

    has_hero = "true" if obj.get("hasHero") else "false"

    out_lines.append("  {")
    out_lines.append(f"    slug: {json.dumps(obj['slug'])},")
    out_lines.append(f"    title: {json.dumps(obj['title'])},")
    out_lines.append(f"    metaDescription: {json.dumps(obj['metaDescription'])},")
    out_lines.append(f"    h1: {json.dumps(obj['h1'])},")
    out_lines.append(f"    heroSubtitle: '',")
    out_lines.append(f"    heroTag: {json.dumps(obj.get('heroTag', ''))},")
    out_lines.append(f"    hasHero: {has_hero},")
    out_lines.append(f"    answerQuestion: {json.dumps(obj.get('answerQuestion', ''))},")
    out_lines.append(f"    answerText: {json.dumps(obj.get('answerText', ''))},")
    out_lines.append(f"    processStepsTitle: {json.dumps(obj.get('processStepsTitle', 'Our Process'))},")
    
    out_lines.append("    steps: [")
    for step in obj["steps"]:
        out_lines.append(f"      {{ step: {json.dumps(step.get('step',''))}, title: {json.dumps(step.get('title',''))}, desc: {json.dumps(step.get('desc',''))} }},")
    out_lines.append("    ],")
    
    out_lines.append("    faqs: [")
    for fq in obj["faqs"]:
        out_lines.append(f"      {{ question: {json.dumps(fq.get('question',''))}, answer: {json.dumps(fq.get('answer',''))} }},")
    out_lines.append("    ],")
    
    out_lines.append(f"    stats: {json.dumps(obj['stats'])},")
    out_lines.append(f"    ctaHref: {json.dumps(obj.get('ctaHref', ''))},")
    out_lines.append(f"    ctaLabel: {json.dumps(obj.get('ctaLabel', ''))},")
    out_lines.append(f"    ctaSecondaryHref: {json.dumps(obj.get('ctaSecondaryHref', ''))},")
    out_lines.append(f"    ctaSecondaryLabel: {json.dumps(obj.get('ctaSecondaryLabel', ''))},")
    out_lines.append(f"    breadcrumbLabel: {json.dumps(obj.get('breadcrumbLabel', ''))},")
    out_lines.append(f"    relatedLinks: {json.dumps(obj['relatedLinks'])},")
    out_lines.append(f"    jsonLdType: {json.dumps(obj.get('jsonLdType', 'construction'))},")
    out_lines.append("    extraSections: [],")
    out_lines.append("  },")

out_lines.append("];")
out_lines.append("")
out_lines.append("export function getService(slug) {")
out_lines.append("  return SERVICES.find(s => s.slug === slug) || null;")
out_lines.append("}")

os.makedirs(r"C:\Users\Kawinfinite PC 32\Downloads\Buildogram\buildogram-app\src\data", exist_ok=True)
with open(r"C:\Users\Kawinfinite PC 32\Downloads\Buildogram\buildogram-app\src\data\services.js", "w", encoding="utf-8") as f:
    f.write("\n".join(out_lines))
