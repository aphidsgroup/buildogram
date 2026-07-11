import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'Residential Construction in Chennai | G+1 G+2 Houses | Buildogram',
  description: 'Build your residential house in Chennai with engineer supervision. G+1, G+2, villa and duplex construction with capped BOQ, material sourcing and 10-year structural warranty.',
  path: '/residential-construction-chennai',
});

const HOUSE_TYPES = [
  { type: 'Individual House (G)', sqft: '600–1,200 sqft', desc: 'Single-floor homes on smaller plots. Common in older layouts of Anna Nagar, Adyar, and suburban areas.', icon: '🏠' },
  { type: 'G+1 Residential', sqft: '800–1,800 sqft', desc: 'Most popular residential format in Chennai. Ground floor + first floor, often with separate dwelling units for rental income.', icon: '🏡' },
  { type: 'G+2 Residential', sqft: '1,200–2,800 sqft', desc: 'Three-floor builds for larger families or investment properties. Structural design is critical — column and beam sizing must account for full load.', icon: '🏢' },
  { type: 'Duplex Villa', sqft: '2,000–4,000 sqft', desc: 'Premium residential build with full design integration. Split-level living, dedicated parking, and landscaping elements.', icon: '🏰' },
];

const PROCESS = [
  { step: '01', title: 'Plot Analysis & Soil Testing', desc: 'We assess your plot location, CMDA zone, setback requirements, and mandate a Soil Bearing Capacity (SBC) test to determine the appropriate foundation type for your specific location.' },
  { step: '02', title: 'Floor-Wise Architectural Design', desc: 'Our architects design each floor with natural light, cross-ventilation, and Vastu compliance in mind. All plans conform to CMDA/DTCP floor area ratio (FAR) limits for your zone.' },
  { step: '03', title: 'Structural Design & BOQ', desc: 'Structural engineers size the beams, columns, and slabs per IS 456 and IS 1893. The BOQ itemizes every material quantity — concrete grade, steel weight, brick count, and pipe lengths.' },
  { step: '04', title: 'Floor-by-Floor Construction', desc: 'Payments are tied to floor-wise milestones. No payment is released until the previous floor\'s concrete cube test results pass our threshold and the rebar inspection is signed off.' },
  { step: '05', title: 'Handover Documentation Kit', desc: 'On key handover, you receive structural blueprints, plumbing maps, electrical schematics, all lab test certificates, completion certificate application, and a 10-year structural warranty document.' },
];

const SPECS = [
  { label: 'Concrete Grade', value: 'M25 (structural), M20 (non-structural)' },
  { label: 'Steel Grade', value: 'Fe500D TMT (CRS for coastal areas)' },
  { label: 'Wall Type', value: '9-inch brick masonry or AAC blocks' },
  { label: 'Foundation', value: 'Isolated / Raft / Pile (per soil SBC)' },
  { label: 'Waterproofing', value: 'Crystalline + membrane (wet areas)' },
  { label: 'IS Code Compliance', value: 'IS 456, IS 1893, IS 2911, IS 1904' },
];

const FAQS = [
  { question: 'What is the difference between a G+1 and a duplex house?', answer: 'A G+1 (Ground + 1 floor) typically has two separate floors that may function as separate dwellings or be combined. A duplex has two complete dwelling units in one building — either side-by-side or one above the other — sharing a common wall or slab but with separate entrances, kitchens, and meters.' },
  { question: 'Do I need a structural engineer for a single-floor house?', answer: 'Yes. Even a single-floor house requires proper foundation design based on soil bearing capacity. Skipping structural design leads to cracked slabs, settlement, and waterproofing failures within 5 years — issues that cost far more to fix than the upfront engineering fee.' },
  { question: 'What is the CMDA FSI limit in Chennai?', answer: 'FSI limits vary by zone: 1.5 for most residential areas, 2.0 for multi-family in some corridors, and up to 3.5 for specific development zones. For plots along widened roads or IT corridors like OMR, special FSI bonuses may apply. Our architects verify your specific plot\'s limit before design.' },
  { question: 'How much does a G+1 house cost to build in Chennai?', answer: 'A basic quality G+1 (2,000 sqft total built-up) costs ₹32–38 lakh for structure, brickwork, plaster, and waterproofing. Adding standard finishes (tiles, electrical, plumbing, painting) brings the total to ₹45–60 lakh. Premium finishes push this to ₹65–80 lakh.' },
  { question: 'What is the difference between a per-sqft contract and an itemized BOQ?', answer: 'A per-sqft contract quotes a lump sum based on area. This hides which materials are used and what grade of steel or cement is specified. An itemized BOQ specifies brand, grade, and quantity of every material. If anything is substituted, it is a clear, auditable contract violation.' },
  { question: 'Can I build a rental unit on the ground floor?', answer: 'Yes, if your plot allows a G+1 or higher under the approved plan. Many Chennai homeowners build G+1 with the ground floor as a rental unit to offset construction EMIs. However, the electrical and plumbing systems need to be designed separately for the two units from the start.' },
  { question: 'How do I get a building plan approval in Chennai?', answer: 'Approval is through CMDA (for Chennai Metropolitan Area) or DTCP (for suburban plots). The process involves submitting architectural drawings, site plan, ownership documents, and NOC from relevant authorities. Our empanelled architects handle the entire filing process.' },
];

export default function ResidentialConstructionChennai() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Residential Construction</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Residential Construction in Chennai — G+1, G+2 & Villas
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            From compact individual houses to multi-floor residences and duplex villas — engineered to Chennai's soil conditions, IS codes, and CMDA norms, with every material specified in a legally capped BOQ.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=residential" className="btn btn-primary btn-lg">Talk to an Engineer</Link>
            <Link href="/boq-calculator" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Free Cost Estimate</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* House Types */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="tag" style={{ marginBottom: '12px' }}>Residential Types</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>What Type of Residential Build Do You Need?</h2>
          </div>
          <div className="grid-2" style={{ gap: '20px' }}>
            {HOUSE_TYPES.map(h => (
              <div key={h.type} className="card card-hover" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '36px', flexShrink: 0 }}>{h.icon}</span>
                <div>
                  <h3 style={{ fontSize: '17px', color: 'var(--secondary)', marginBottom: '4px' }}>{h.type}</h3>
                  <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, background: 'rgba(252,110,32,0.1)', padding: '2px 8px', borderRadius: '999px', display: 'inline-block', marginBottom: '8px' }}>{h.sqft}</span>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section style={{ background: 'var(--bg-card2)', borderRadius: 'var(--radius-lg)', padding: '56px 40px', marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>Our Floor-by-Floor Build Process</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {PROCESS.map(p => (
              <div key={p.step} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', background: 'white' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(252,110,32,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>{p.step}</div>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '6px' }}>{p.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Standard Specs */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '24px' }}>Our Standard Residential Specifications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {SPECS.map(s => (
              <div key={s.label} className="card" style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</span>
                <span style={{ fontSize: '14px', color: 'var(--secondary)', fontWeight: 700, textAlign: 'right' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </section>

        <FAQBlock title="Residential Construction FAQs" faqs={FAQS} />

        <div className="card" style={{ marginTop: '48px', background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h3 style={{ color: 'white', fontSize: '26px', marginBottom: '12px' }}>Ready to Build Your Home?</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '500px', margin: '0 auto 28px' }}>Talk to our structural engineers for a free consultation on your plot, floor plan, and construction budget.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=residential" className="btn btn-primary btn-lg">Book Free Consultation</Link>
            <Link href="/boq-calculator" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Calculate BOQ</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Residential Construction in Chennai', path: '/residential-construction-chennai' }]} />
    </>
  );
}
