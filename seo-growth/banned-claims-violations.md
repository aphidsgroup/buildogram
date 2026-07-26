# Banned-Claim Violations — Classified Scan

Generated 2026-07-26 · scope `src/**/*.{js,jsx,mjs}` (677 files) · regex + word-boundary + disclaimer allowlist

**Public-facing (indexable): 159 across 68 files**  

**Internal (ops/admin/client/partner/supplier/api — not indexable): 17** — review, do NOT bulk-fix


> The 161-figure from the literal-substring test counts file×string pairs and includes false positives
> (e.g. `terms/page.js` "cannot be guaranteed" is a legal disclaimer; `admin/quotations` "LOWEST PRICE" is a sort label).
> Do not run a global replace over that list.


---

# PUBLIC-FACING


## C1-credential — 110 hits

_Asserts Buildogram employs/directs engineers. OV01 UNCONFIRMED._

| File | Line | Match | Context |
| --- | ---: | --- | --- |
| `src/app/about/page.js` | 140 | `our structural engineering team` | From mandatory Soil Bearing Capacity (SBC) lab tests to concrete cube compression reports, our structural engineering team safeguards your home&apos;s |
| `src/app/ai-boq-checker/BOQCheckerClient.jsx` | 177 | `Our engineer` | alert("Thanks! Your request has been received. Our engineer will contact you shortly."); |
| `src/app/ai-construction-cost-estimator/CostEstimatorClient.jsx` | 221 | `Our engineer` | alert("Thanks! Your request has been received. Our engineer will contact you shortly."); |
| `src/app/ai-contractor-quote-analyzer/QuoteAnalyzerClient.jsx` | 219 | `Our engineer` | alert("Thanks! Your quote analysis has been logged. Our engineer will contact you."); |
| `src/app/ai-floor-plan-creator/components/EngineerReviewCTA.js` | 33 | `Our engineers` | <strong>Review Requested!</strong> Our engineers will contact you shortly. |
| `src/app/ai-floor-plan-creator/components/EngineerReviewCTA.js` | 42 | `our engineers` | AI concepts need structural validation before building. Send this to our engineers for a quote on formal blueprints. |
| `src/app/ai-material-estimator/page.js` | 108 | `our engineers` | a: 'Yes. Select M20 or M25 concrete grade and Fe415/Fe500D steel grade to get grade-appropriate quantity estimates. For higher grade concrete (M30+) u |
| `src/app/ai-pile-foundation-boq-checker/PileFoundationClient.jsx` | 165 | `Our structural engineer` | alert("Thanks! Your piling quote has been logged. Our structural engineer will contact you."); |
| `src/app/ai-structural-audit-intake/StructuralAuditClient.jsx` | 57 | `our structural engineers` | infoNote: "This initial assessment helps our structural engineers prepare the right diagnostic tools (e.g., rebound hammer, rebar locator) for your si |
| `src/app/ai-structural-audit-intake/StructuralAuditClient.jsx` | 65 | `our structural engineers` | description="Describe your building's condition. Our AI will assess the urgency and prepare a briefing for our structural engineers." |
| `src/app/ai-structural-audit-intake/StructuralAuditClient.jsx` | 171 | `Our engineering team` | alert("Thanks! Your audit request has been logged. Our engineering team will contact you to schedule a site visit."); |
| `src/app/ai-structural-audit-intake/page.js` | 74 | `our engineers` | a: 'Yes. We conduct an "as-built" structural audit where our engineers create a structural drawing from site measurements, then assess structural adeq |
| `src/app/ai-tools/page.js` | 397 | `Our Engineers` | <span style={{ color: 'var(--primary)' }}>Our Engineers Give You Certainty.</span> |
| `src/app/ai/plan-review/page.js` | 18 | `Our engineers` | faqs={[{"q":"Does this replace human review?","a":"No. AI is a fast first-pass filter. Our engineers do the final comprehensive review."}]} |
| `src/app/blog/page.js` | 43 | `our structural engineers` | excerpt: 'From hairline cracks to exposed rusting rebar and floor vibrations — these are the seven signs our structural engineers say you should never |
| `src/app/blog/page.js` | 75 | `our engineering team` | Expert articles on home construction, BOQ auditing, structural safety, and property investment in Chennai — written by our engineering team. |
| `src/app/blog/page.js` | 122 | `our engineering team` | <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '440px', margin: '0 auto 28px', lineHeight: 1.6 }}>New articles on BOQ, materials, structural au |
| `src/app/boq-audit/BOQAuditForm.js` | 66 | `Our engineering team` | Our engineering team will review your quote and highlight any discrepancies. We'll contact you within 24 hours. |
| `src/app/boq-audit/page.js` | 40 | `Our structural engineers` | { step: '02', title: 'Engineer Review', desc: 'Our structural engineers analyse every line item against Chennai market rates and standard specs.' }, |
| `src/app/boq-audit/page.js` | 210 | `Our engineers` | description="Share your contractor quote (even a verbal one). Our engineers will review it and identify every discrepancy before you sign." |
| `src/app/boq-review-chennai/page.js` | 64 | `Our structural engineers` | Don't sign a contractor quote without an independent review. Our structural engineers check every line — quantities against drawings, rates against cu |
| `src/app/build/home-construction/page.js` | 16 | `Our engineers` | serviceDetails={[{"title":"Contract Drafting","desc":"We ensure your contract protects you against delays and scope creep."},{"title":"Stage-wise Insp |
| `src/app/build/renovation/page.js` | 18 | `our structural engineers` | faqs={[{"q":"Can you add a floor to my old house?","a":"Only after our structural engineers conduct a thorough foundation assessment."}]} |
| `src/app/case-studies/[slug]/page.js` | 217 | `Our engineers` | Our engineers are ready to assist you. Contact us for a technical consultation. |
| `src/app/compare/[slug]/page.js` | 138 | `our engineers` | <p style={{ color: '#CBD5E1', fontSize: '16px', marginBottom: '28px' }}>Talk to our engineers for free — no commitment required.</p> |
| `src/app/contact/page.js` | 94 | `Our engineering team` | Our engineering team will review your requirement and contact you shortly. |
| `src/app/contact/page.js` | 425 | `Our engineering team` | Our engineering team typically reviews and responds to enquiries within 24 hours during working days. |
| `src/app/cost-estimator/page.js` | 36 | `our engineers` | { q: 'How does this work?', a: 'Simply reach out to us and our engineers will guide you.' }, |
| `src/app/faqs/[category]/page.js` | 127 | `Our engineers` | <p style={{ color: '#CBD5E1', fontSize: '16px', marginBottom: '28px' }}>Our engineers answer specific questions about your project for free.</p> |
| `src/app/faqs/[category]/page.js` | 129 | `Our Engineers` | <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>Ask Our Engineers</Link> |
| `src/app/faqs/page.js` | 30 | `our structural engineers` | Clear, honest answers from our structural engineers and property experts. |
| `src/app/faqs/page.js` | 50 | `our structural engineers` | <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>Book a free consultation with our structural engineers.</p> |
| `src/app/guides/[slug]/page.js` | 178 | `our structural engineers` | <p style={{ color: '#CBD5E1', fontSize: '16px', marginBottom: '28px' }}>Talk to our structural engineers for project-specific advice.</p> |
| `src/app/how-it-works/HowItWorksClient.jsx` | 46 | `our structural engineer` | desc: 'Rebar frame structural layouts are signed off by our structural engineer before every slab casting. We enforce CRS (Corrosion Resistant) steel  |
| `src/app/locations/chennai/page.js` | 143 | `Our engineers` | <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>Our engineers are familiar with construction conditions across all Chennai localit |
| `src/app/locations/chennai/page.js` | 144 | `Our Engineers` | <Link href="/contact" className="btn btn-primary btn-lg">Talk to Our Engineers</Link> |
| `src/app/locations/page.js` | 66 | `Our engineers` | Buildogram operates across all major Chennai localities. Each area has unique soil conditions, municipal zoning rules, and flood risk factors that dir |
| `src/app/locations/page.js` | 218 | `Our structural engineer` | Tell us your locality and plot details. Our structural engineer will assess your soil type, CMDA zone, and flood risk — and recommend the right founda |
| `src/app/materials/bricks-aac-blocks/page.js` | 72 | `our engineers` | Getting 'First Class' red bricks in Chennai is increasingly difficult due to topsoil mining bans. Much of the supply is under-burnt (yellowish, crumbl |
| `src/app/materials/cement/page.js` | 32 | `Our engineers` | { step: "03", title: "Brand & Grade Selection", desc: "Our engineers recommend the right mix—OPC 53 for structural members and PPC for plastering/bric |
| `src/app/materials/cement/page.js` | 59 | `Our engineers` | { q: "How do you check the manufacturing date?", a: "Every cement bag has a printed code indicating the Week, Month, and Year of packing. Our engineer |
| `src/app/materials/rmc/page.js` | 35 | `Our engineers` | { question: 'Why do contractors add water to the RMC truck?', answer: 'Thick, high-strength concrete is difficult to spread and level. Lazy contractor |
| `src/app/materials/tmt-steel/page.js` | 16 | `our engineers` | heroSub="Secure primary-brand Fe500D and Fe550D TMT steel bars directly from authorized distributors. Every delivery includes an MTC (Material Test Ce |
| `src/app/materials/tmt-steel/page.js` | 27 | `Our engineers` | { step: "01", title: "BOQ & Bar Bending Schedule", desc: "Our engineers review your structural drawings to extract exact diameter-wise requirements (8 |
| `src/app/page.js` | 273 | `Our engineers` | description="Our engineers review contractor quotes line-by-line to find missing items, vague specifications, and exclusions before you sign the dotte |
| `src/app/partner-os/page.js` | 10 | `our engineer` | const FAQS = [{ question: 'How do I get started?', answer: 'Contact Buildogram through the form below or call our team. We will understand your requir |
| `src/app/partners/contractors/page.js` | 30 | `our engineer` | { step: '3', title: 'Sign a Milestone Contract', desc: 'Never pay more than 20% upfront. Structure payments around milestones: foundation, slab, roof, |
| `src/app/partners/directory/layout.js` | 3 | `Our engineering team` | description: 'Find builders, contractors, architects, and consultants in Chennai. Our engineering team reviews profiles to ensure quality and reliabil |
| `src/app/plan-review/PlanReviewForm.js` | 49 | `Our structural engineers` | Our structural engineers will contact you within 24 hours to start your plan review. |
| `src/app/plan-review/page.js` | 116 | `Our engineers` | Most architectural errors are invisible until construction is halfway done. Our engineers catch spatial, structural, and compliance issues before a si |
| `src/app/privacy-policy/page.js` | 25 | `our engineering team` | • **Communication Records**: Enquiry messages, support tickets, and consultations with our engineering team. |
| `src/app/quality-system/page.js` | 18 | `Our engineers` | { title: '1. Project Scope Mapping', desc: 'Our engineers map your project\u2019s specific requirements against the BQS checkpoint framework to determ |
| `src/app/quality-system/page.js` | 84 | `our engineers` | The Buildogram Quality System (BQS) is an operational software layer used by our engineers to track field execution against defined standards. Rather  |
| `src/app/services/[slug]/page.js` | 226 | `our structural engineers` | <p style={{ color: '#CBD5E1', fontSize: '16px', marginBottom: '28px' }}>Talk to our structural engineers and get a free initial consultation.</p> |
| `src/app/services/page.js` | 69 | `our structural engineers` | <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px', fontSize: '18px', maxWidth: '600px', margin: '0 auto 32px' }}>Book a free 30-minute  |
| `src/components/seo/ContextualCTA.jsx` | 28 | `our engineering team` | subtitle = "Want similar results? Let our engineering team manage your next requirement."; |
| `src/components/seo/EngineerCredibility.js` | 59 | `Buildogram's engineering team` | aria-label="About Buildogram's engineering team" |
| `src/components/templates/ServicePageTemplate.jsx` | 152 | `our engineers` | <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '540px', margin: '0 auto 28px' }}>Talk to our engineers in Chennai for a c |
| `src/data/seo/comparisons.js` | 25 | `Our Engineers` | cta: { text: 'Talk to Our Engineers', href: '/contact' }, |
| `src/data/seo/faqs.js` | 10 | `our structural engineers` | intro: 'Everything you need to know about building a home in Chennai — answered clearly by our structural engineers.', |
| `src/data/seo/localServices.js` | 17 | `Our engineers` | { step: '02', title: 'Architectural Plan & BOQ', desc: 'Our engineers review your architect\'s drawings and itemise the BOQ — catching over-priced lin |
| `src/data/seo/localServices.js` | 19 | `Our engineers` | { step: '04', title: 'Site Supervision', desc: 'Our engineers conduct milestone inspections and document quality at each stage — foundation, structure |
| `src/data/seo/localServices.js` | 24 | `our engineers` | { q: 'What is the approximate cost of home construction in {area}?', a: 'Construction cost in {area} depends on specification level, structural design |
| `src/data/seo/localServices.js` | 78 | `our engineers` | { step: '01', title: 'Submit Contractor Quote', desc: 'Share your contractor\'s BOQ (Excel or PDF) with our engineers.' }, |
| `src/data/seo/localServices.js` | 82 | `Our engineers` | { step: '05', title: 'Negotiation Support', desc: 'Our engineers can join contractor meetings to help you negotiate a fair, transparent agreement.' }, |
| `src/data/seo/localServices.js` | 111 | `Our engineers` | { step: '03', title: 'Engineer Review', desc: 'Our engineers review your estimate and flag any unusual variables — soil conditions in {area}, floor co |
| `src/data/seo/localServices.js` | 180 | `our engineers` | { q: 'Will a plan review help me save money on construction in {area}?', a: 'Yes. By identifying structural over-design (like unnecessarily large colu |
| `src/data/seo/localServices.js` | 304 | `Our engineers` | { q: 'What is the soil condition in {area} and how does it affect my construction plan?', a: '{soilNote} This affects your foundation design, construc |
| `src/data/seo/localServices.js` | 635 | `our engineers` | { step: '02', title: 'Structural Safety Check', desc: 'If structural changes are planned, our engineers verify the impact on existing structure — espe |
| `src/data/seo/serviceHubs.js` | 382 | `Our engineers` | tagline: 'Your contractor\'s BOQ is their best sales pitch. Our engineers make sure it\'s also an honest one.', |
| `src/data/seo/serviceHubs.js` | 423 | `Our engineers` | tagline: 'A low quote is not always a good deal. Our engineers know exactly what to look for — and what\'s missing.', |
| `src/data/seo/services.js` | 25 | `our structural engineers` | { step: '01', title: 'Free Consultation', desc: 'Discuss your plot, budget, and requirements with our structural engineers.' }, |
| `src/data/seo/services.js` | 179 | `Our engineer` | { title: 'Independent Engineer Supervision', desc: 'Our engineer visits your site at all critical construction stages.' }, |
| `src/data/seo/services.js` | 228 | `Our engineer` | { step: '02', title: 'Engineer Visit', desc: 'Our engineer visits at your scheduled time.' }, |
| `src/data/seo/services.js` | 305 | `our structural engineers` | { step: '03', title: 'Expert Advice', desc: 'Detailed guidance from our structural engineers.' }, |
| `src/data/seo/services.js` | 475 | `Our engineers` | metaDescription: 'Professional BOQ review and contractor quote audit in Chennai. Our engineers check your contractor\'s BOQ for missing items, undersp |
| `src/data/seo/services.js` | 477 | `our engineers` | heroSubtitle: 'Before you sign — let our engineers review your contractor\'s BOQ for gaps, risks, and hidden cost escalation points.', |
| `src/data/seo/services.js` | 492 | `Our structural engineer` | { step: '02', title: 'Engineer Review', desc: 'Our structural engineer reviews within 2–3 working days.' }, |
| `src/data/seo/services.js` | 530 | `Our engineer` | { step: '02', title: 'Engineer Review', desc: 'Our engineer reviews with your goals in mind.' }, |
| `src/data/seo/services.js` | 550 | `Our engineers` | metaDescription: 'Get a realistic construction cost estimate for your Chennai home. Our engineers review your plot, plan, and specifications to give y |
| `src/data/seo/services.js` | 566 | `Our engineers` | { step: '02', title: 'Cost Estimate', desc: 'Our engineers prepare a cost range based on your inputs.' }, |
| `src/data/services.js` | 52 | `Our engineers` | { step: "02", title: "Plan & BOQ Review", desc: "Our engineers audit architectural plans and contractor quotes to prevent hidden costs." }, |
| `src/data/services.js` | 58 | `our engineers` | { question: "How much does BOQ review cost?", answer: "Our BOQ review pricing varies based on project size. Contact our engineers for a custom quote." |
| `src/data/services.js` | 121 | `Our engineers` | { step: "02", title: "Plan & BOQ Review", desc: "Our engineers audit architectural plans and contractor quotes to prevent hidden costs." }, |
| `src/data/services.js` | 127 | `our engineers` | { question: "How much does BOQ review cost?", answer: "Our BOQ review pricing varies based on project size. Contact our engineers for a custom quote." |
| `src/data/services.js` | 184 | `our engineers` | { step: "01", title: "Old Structure Assessment", desc: "Before any demolition, our engineers assess the existing structure. We use Rebound Hammer test |
| `src/data/services.js` | 191 | `Our engineers` | { question: "How do I know if a wall is load-bearing before demolishing it?", answer: "The safest method is to review original structural drawings and |
| `src/data/services.js` | 192 | `Our structural engineers` | { question: "Can I add a floor to my existing house in Chennai?", answer: "Only if the existing foundation and columns can carry the additional load.  |
| `src/data/services.js` | 222 | `Our engineers` | { step: "02", title: "Plan & BOQ Review", desc: "Our engineers audit architectural plans and contractor quotes to prevent hidden costs." }, |
| `src/data/services.js` | 228 | `our engineers` | { question: "How much does BOQ review cost?", answer: "Our BOQ review pricing varies based on project size. Contact our engineers for a custom quote." |
| `src/data/services.js` | 254 | `Our engineers` | { step: "02", title: "Plan & BOQ Review", desc: "Our engineers audit architectural plans and contractor quotes to prevent hidden costs." }, |
| `src/data/services.js` | 260 | `our engineers` | { question: "How much does BOQ review cost?", answer: "Our BOQ review pricing varies based on project size. Contact our engineers for a custom quote." |
| `src/data/services.js` | 286 | `Our engineers` | { step: "02", title: "Plan & BOQ Review", desc: "Our engineers audit architectural plans and contractor quotes to prevent hidden costs." }, |
| `src/data/services.js` | 292 | `our engineers` | { question: "How much does BOQ review cost?", answer: "Our BOQ review pricing varies based on project size. Contact our engineers for a custom quote." |
| `src/data/services.js` | 325 | `our engineer` | { question: "What areas do you cover?", answer: "We cover Chennai and all major districts in Tamil Nadu through our engineer and partner network." }, |
| `src/data/services.js` | 359 | `our engineer` | { question: "What areas do you cover?", answer: "We cover Chennai and all major districts in Tamil Nadu through our engineer and partner network." }, |
| `src/data/services.js` | 386 | `Our engineers` | { step: "02", title: "Plan & BOQ Review", desc: "Our engineers audit architectural plans and contractor quotes to prevent hidden costs." }, |
| `src/data/services.js` | 392 | `our engineers` | { question: "How much does BOQ review cost?", answer: "Our BOQ review pricing varies based on project size. Contact our engineers for a custom quote." |
| `src/data/services.js` | 420 | `our engineers` | { question: "How often does the site engineer visit?", answer: "For active construction phases (foundation, slab casting, plaster), our engineers visi |
| `src/data/services.js` | 549 | `Our engineers` | { step: "04", title: "Load Capacity Analysis", desc: "Our engineers run software simulations to determine if the existing columns and foundation can s |
| `src/data/services.js` | 555 | `Our engineers` | { question: "We want to remove a wall to make the living room bigger. Is it safe?", answer: "If your old house has a load-bearing brick structure (no  |
| `src/data/services.js` | 614 | `Our structural engineer` | { step: "01", title: "Crack Mapping", desc: "Our structural engineer visually maps out the pattern, width, and depth of all cracks, differentiating be |
| `src/data/services.js` | 900 | `Our structural engineers` | { step: "01", title: "Geotechnical Analysis", desc: "Our structural engineers review your soil test report (SBC) to determine the exact pile diameter, |
| `src/data/services.js` | 1055 | `Our engineers` | answerText: "When a rotary rig drills, loose soil and rock fragments (muck) fall to the bottom of the hole. If concrete is poured over this muck, the  |
| `src/data/services.js` | 1101 | `Our engineers` | { question: "What is the biggest risk with DMC piling?", answer: "Borehole collapse and soil mixing. If the bentonite slurry isn't mixed at the correc |
| `src/data/services.js` | 1313 | `our structural engineers` | { question: "What happens if my Core Test fails the M20/M25 requirement?", answer: "If the core strength is significantly lower than the designed grad |
| `src/lib/ai-tools/followUpRules.js` | 44 | `our engineering team` | result.suggested_call_script = 'Hi, we saw you uploaded a BOQ. Do you need a second opinion from our engineering team?'; |
| `src/lib/ai-tools/followUpRules.js` | 78 | `our structural engineer` | result.suggested_call_script = 'Hi, we received your structural audit request. Given the issues mentioned, we recommend scheduling an urgent site visi |
| `src/lib/notifications/notificationTemplates.js` | 46 | `Our engineering team` | Our engineering team is reviewing your requirement. We believe in building with clarity, so our first step will be understanding your scope without an |
| `src/lib/seo/internalLinks.js` | 46 | `our engineers` | { label: 'Field Proof', href: '/proof', description: 'Real updates from our engineers on site.' }, |

## C2-verified-entity — 8 hits

_Claims a third party has been verified by Buildogram. No verification process evidenced._

| File | Line | Match | Context |
| --- | ---: | --- | --- |
| `src/app/join-as-partner/page.js` | 20 | `verified leads` | { title: '4. Join Partner OS', desc: 'Access the Partner OS to receive verified leads, manage projects, and showcase proof assets.' }, |
| `src/app/properties/listing/[id]/page.js` | 136 | `verified leads` | <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>List it with Buildogram for free and get verified leads.</p> |
| `src/app/services/[slug]/page.js` | 76 | `Verified Service` | <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, |
| `src/data/services.js` | 156 | `verified execution` | { question: "What is the difference between Buildogram\u2019s end-to-end coordination and a self-managed contractor build?", answer: "In a self-manage |
| `src/data/services.js` | 342 | `Verified Execution` | metaDescription: "Verified Execution Partner Quote Review in Chennai - engineer-led, AI-driven construction support in Chennai.", |
| `src/lib/brand/positioning.js` | 37 | `verified execution` | 'Buildogram is an engineer-led construction intelligence and property assurance ecosystem. We help property owners review plans and BOQs, compare cons |
| `src/lib/brand/positioning.js` | 64 | `verified execution` | 'Buildogram provides independent engineering review, construction planning, partner coordination, quality verification and permanent project documenta |
| `src/lib/brand/positioning.js` | 76 | `verified execution` | 'Buildogram is an engineer-led construction intelligence and property assurance ecosystem that helps owners plan, compare, coordinate, verify and perm |

## C3-verified-brand — 3 hits

_"Buildogram Verified" badge / "verified, stress-free". Brand-level verification claim._

| File | Line | Match | Context |
| --- | ---: | --- | --- |
| `src/app/partners/register/page.js` | 58 | `Buildogram verified` | Thank you for applying to join the Buildogram verified construction ecosystem. Our team will review your application and reach out within 2–3 business |
| `src/app/property/list/page.js` | 17 | `Buildogram Verified` | proofData={{"title":"Listing Power","desc":"Standing out.","dashboardTitle":"Buyer Trust Signals","items":["Buildogram Verified Tag","Access to BOQ su |
| `src/app/services/[slug]/page.js` | 76 | `Buildogram Verified` | <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, |

## C4-seller — 16 hits

_Seller / supplier / delivery claim. CONTRADICTS CONFIRMED OV02 (not a seller)._

| File | Line | Match | Context |
| --- | ---: | --- | --- |
| `src/app/materials/electrical/page.js` | 20 | `We supply` | { title: '4. Switchgear (MCB/RCCB) Planning', desc: 'We supply highly sensitive RCCBs (Residual Current Circuit Breakers) that instantly cut power if  |
| `src/app/materials/fabrication-steel/page.js` | 12 | `We supply` | description: 'Heavy fabrication steel in Chennai. We supply tested I-beams, H-beams, channels, and angles for industrial sheds, PEB buildings, and com |
| `src/app/materials/fabrication-steel/page.js` | 48 | `we supply` | The backbone of industrial and fast-track construction. Whether you are building a massive warehouse in Sriperumbudur or a lightweight roof structure  |
| `src/app/materials/fabrication-steel/page.js` | 72 | `We supply` | Modern factories and warehouses are built using PEB technology. We supply the raw high-tensile plates that are cut and welded into custom tapered colu |
| `src/app/materials/network/page.js` | 17 | `Authorized Dealer` | proofData={{"title":"Network Quality","desc":"Who makes the cut.","dashboardTitle":"Supplier Vetting","items":["Authorized Dealer Verification","Finan |
| `src/app/materials/plumbing/page.js` | 12 | `We supply` | description: 'Plumbing pipes and fittings in Chennai. We supply lead-free CPVC for hot water, UPVC for cold water, and heavy-duty SWR pipes for draina |
| `src/app/materials/plumbing/page.js` | 19 | `We supply` | { title: '3. Fitting Selection', desc: 'Leaks rarely happen in the middle of a pipe; they happen at the joints (elbows, tees). We supply high-grade mo |
| `src/app/materials/plumbing/page.js` | 48 | `We supply` | A leak behind a tiled wall is a homeowner's worst nightmare. We supply 100% genuine, pressure-rated CPVC and UPVC pipes that are guaranteed to withsta |
| `src/app/materials/rmc/page.js` | 48 | `We supply` | Guaranteed strength, delivered to your door. For large roof slabs and deep pile foundations, manual mixing is too slow and risky. We supply verified,  |
| `src/app/materials/tmt-steel/page.js` | 16 | `authorized distributors` | heroSub="Secure primary-brand Fe500D and Fe550D TMT steel bars directly from authorized distributors. Every delivery includes an MTC (Material Test Ce |
| `src/app/materials/waterproofing/page.js` | 18 | `we supply` | { title: '2. Material Selection', desc: 'Based on the diagnosis, we supply the right material: Liquid Applied Polyurethane (PU) for exposed roofs, Cry |
| `src/app/materials/waterproofing/page.js` | 48 | `we supply` | Stop water before it destroys your steel. From high-tech crystalline admixtures for deep basements to UV-resistant polyurethane coatings for sun-baked |
| `src/data/services.js` | 702 | `We deliver` | metaDescription: "Fast, high-resolution Drone Surveys in Chennai. Perfect for large layouts, mining, and industrial plots. We deliver orthomosaic maps |
| `src/data/services.js` | 794 | `We deliver` | metaDescription: "Precision Total Station surveying in Chennai. Ideal for urban plots, boundary disputes, and architect layout marking. We deliver acc |
| `src/lib/partnerStore.js` | 156 | `Authorized Distributor` | certifications: ['ISO 9001 Certified Dealer', 'UltraTech Authorized Distributor', 'Tata Tiscon Authorized Dealer'], |
| `src/lib/partnerStore.js` | 156 | `Authorized Dealer` | certifications: ['ISO 9001 Certified Dealer', 'UltraTech Authorized Distributor', 'Tata Tiscon Authorized Dealer'], |

## C5-free — 17 hits

_"Free consultation" / "for free" — pricing promise._

| File | Line | Match | Context |
| --- | ---: | --- | --- |
| `src/app/about/page.js` | 245 | `free consultation` | Book a direct, free consultation call with our IIT-alumni structural engineering team. |
| `src/app/build/BuildLeadForm.js` | 5 | `Free Consultation` | export default function BuildLeadForm({ leadType = 'construction', sourcePage = '/build', ctaLabel = '🏗️ Get Free Consultation' }) { |
| `src/app/build/page.js` | 51 | `Free Consultation` | <Link href="#consult" className="btn btn-primary btn-lg">Get Free Consultation</Link> |
| `src/app/build/page.js` | 123 | `Free Consultation` | <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>Get a Free Consultation</h2> |
| `src/app/compare/[slug]/page.js` | 138 | `for free` | <p style={{ color: '#CBD5E1', fontSize: '16px', marginBottom: '28px' }}>Talk to our engineers for free — no commitment required.</p> |
| `src/app/cost-estimator/page.js` | 37 | `free initial consultation` | { q: 'Is there a fee?', a: 'We offer a free initial consultation.' } |
| `src/app/end-to-end-construction-support-chennai/page.js` | 68 | `Free Consultation` | <a href="/contact" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '14px 28px', borderRadius: '8px', fontWeig |
| `src/app/end-to-end-construction-support-chennai/page.js` | 199 | `Free Consultation` | Book Free Consultation → |
| `src/app/faqs/[category]/page.js` | 127 | `for free` | <p style={{ color: '#CBD5E1', fontSize: '16px', marginBottom: '28px' }}>Our engineers answer specific questions about your project for free.</p> |
| `src/app/faqs/page.js` | 50 | `free consultation` | <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>Book a free consultation with our structural engineers.</p> |
| `src/app/properties/listing/[id]/page.js` | 136 | `for free` | <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>List it with Buildogram for free and get verified leads.</p> |
| `src/app/services/[slug]/page.js` | 226 | `free initial consultation` | <p style={{ color: '#CBD5E1', fontSize: '16px', marginBottom: '28px' }}>Talk to our structural engineers and get a free initial consultation.</p> |
| `src/app/services/page.js` | 70 | `Free Consultation` | <Link href="/contact" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>Book Free Consultation</Link> |
| `src/app/warranty-and-maintenance/page.js` | 92 | `Free Consultation` | <a href="/contact" className="btn btn-primary btn-lg">Book Free Consultation</a> |
| `src/app/warranty-and-maintenance/page.js` | 326 | `Free Consultation` | <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--accent)' }}>Book Free Consultation</Link> |
| `src/data/seo/services.js` | 25 | `Free Consultation` | { step: '01', title: 'Free Consultation', desc: 'Discuss your plot, budget, and requirements with our structural engineers.' }, |
| `src/data/seo/services.js` | 316 | `Free Consultation` | cta: { text: 'Book Free Consultation', href: '/contact' }, |

## C6-superlative — 2 hits

_Superlative / price claim._

| File | Line | Match | Context |
| --- | ---: | --- | --- |
| `src/app/join-as-partner/page.js` | 48 | `top-tier` | We are looking for top-tier construction professionals, material suppliers, and vendors to join our trusted network. |
| `src/app/materials/rmc/page.js` | 48 | `top-tier` | Guaranteed strength, delivered to your door. For large roof slabs and deep pile foundations, manual mixing is too slow and risky. We supply verified,  |

## C7-guarantee — 3 hits

_Outcome guarantee._

| File | Line | Match | Context |
| --- | ---: | --- | --- |
| `src/app/materials/plumbing/page.js` | 48 | `are guaranteed` | A leak behind a tiled wall is a homeowner's worst nightmare. We supply 100% genuine, pressure-rated CPVC and UPVC pipes that are guaranteed to withsta |
| `src/app/materials/rmc/page.js` | 32 | `guaranteed strength` | { question: 'Why use RMC instead of mixing concrete on-site (Site Mix)?', answer: 'Manual site mixing is inconsistent. Laborers often guess the sand/c |
| `src/app/materials/rmc/page.js` | 48 | `Guaranteed strength` | Guaranteed strength, delivered to your door. For large roof slabs and deep pile foundations, manual mixing is too slow and risky. We supply verified,  |

---

# INTERNAL — assess separately


## C1-credential — 7 hits

_Asserts Buildogram employs/directs engineers. OV01 UNCONFIRMED._

| File | Line | Match | Context |
| --- | ---: | --- | --- |
| `src/app/client/dashboard/page.js` | 97 | `Our engineers` | <p className={styles.emptyDesc}>You don't have any live construction or renovation projects at the moment. Our engineers are ready when you are.</p> |
| `src/app/ops/proof-assets/GbpGenerator.js` | 5 | `Our engineering team` | construction: "Project Update from {area}: Our engineering team just completed a major milestone for this home construction project. {description} We  |
| `src/app/ops/proof-assets/GbpGenerator.js` | 5 | `our engineers` | construction: "Project Update from {area}: Our engineering team just completed a major milestone for this home construction project. {description} We  |
| `src/app/ops/proof-assets/GbpGenerator.js` | 7 | `Our structural engineering team` | structural_audit: "Structural Audit Completed in {area}: Safety first. Our structural engineering team just finished an assessment in {area}. {descrip |
| `src/app/ops/proof-assets/GbpGenerator.js` | 10 | `our engineers` | piling: "Pile Foundation Work in {area}: Deep foundation progress update! Our team executed pile foundation work in {area} using {methods_used}. {desc |
| `src/lib/content/contentCalendarTemplates.js` | 19 | `Our engineering team` | text += `Our engineering team ensures top quality and durability for every structural requirement in ${areaStr}.\n\n`; |
| `src/lib/content/contentCalendarTemplates.js` | 96 | `Buildogram's Engineer` | ## Buildogram's Engineer-Led Approach |

## C2-verified-entity — 5 hits

_Claims a third party has been verified by Buildogram. No verification process evidenced._

| File | Line | Match | Context |
| --- | ---: | --- | --- |
| `src/app/ops/leads/page.js` | 486 | `Verified Partner` | <label style={{ fontSize: '11px', fontWeight: 700, color: '#92400e', display: 'block', marginBottom: '4px' }}>Select Verified Partner</label> |
| `src/app/ops/proof-assets/GbpGenerator.js` | 11 | `Verified Partner` | partner_project: "Verified Partner Project in {area}: Check out this excellent execution by one of Buildogram's verified partners in {area}. {descript |
| `src/app/ops/proof-assets/GbpGenerator.js` | 11 | `verified partners` | partner_project: "Verified Partner Project in {area}: Check out this excellent execution by one of Buildogram's verified partners in {area}. {descript |
| `src/app/ops/proof-assets/GbpGenerator.js` | 11 | `verified professional` | partner_project: "Verified Partner Project in {area}: Check out this excellent execution by one of Buildogram's verified partners in {area}. {descript |
| `src/app/supplier/dashboard/page.js` | 112 | `Verified Supplier` | <div style={{ fontWeight: 700, fontSize: '15px', color: '#15803D', marginBottom: '4px' }}>✅ Buildogram Verified Supplier</div> |

## C3-verified-brand — 1 hits

_"Buildogram Verified" badge / "verified, stress-free". Brand-level verification claim._

| File | Line | Match | Context |
| --- | ---: | --- | --- |
| `src/app/supplier/dashboard/page.js` | 112 | `Buildogram Verified` | <div style={{ fontWeight: 700, fontSize: '15px', color: '#15803D', marginBottom: '4px' }}>✅ Buildogram Verified Supplier</div> |

## C4-seller — 1 hits

_Seller / supplier / delivery claim. CONTRADICTS CONFIRMED OV02 (not a seller)._

| File | Line | Match | Context |
| --- | ---: | --- | --- |
| `src/app/api/ops/seed-partners/route.js` | 130 | `Authorized Distributor` | certifications: ['ISO 9001 Certified', 'UltraTech Authorized Distributor', 'Tata Tiscon Authorized'], |

## C5-free — 1 hits

_"Free consultation" / "for free" — pricing promise._

| File | Line | Match | Context |
| --- | ---: | --- | --- |
| `src/lib/content/contentCalendarTemplates.js` | 48 | `free consultation` | "Planning to build or renovate? Tap the link in our bio for a free consultation!" |

## C6-superlative — 2 hits

_Superlative / price claim._

| File | Line | Match | Context |
| --- | ---: | --- | --- |
| `src/app/admin/quotations/page.js` | 108 | `LOWEST PRICE` | <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#FC6E20', color: 'white', padding: '3px 14p |
| `src/lib/services/quotationService.js` | 69 | `lowest price` | * Find the best quote for a request (lowest price). |
