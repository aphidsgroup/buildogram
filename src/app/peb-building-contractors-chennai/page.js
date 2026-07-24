import { generateSEOMetadata } from '@/lib/seo/metadata';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'PEB Building Contractors in Chennai | Pre-Engineered Buildings | Buildogram',
  description: 'Source and supervise Pre-Engineered Building (PEB) contractors in Chennai. Factories, warehouses, cold storage — BOQ, contractor vetting and quality control.',
  path: '/peb-building-contractors-chennai',
});

const faqs = [
  { q: 'What is the difference between a PEB and conventional structural steel?', a: 'A Pre-Engineered Building (PEB) is a steel structure where every component — primary frame, secondary structure, cladding — is designed as a system and factory-fabricated to exact dimensions. Conventional structural steel is designed element-by-element and fabricated per project-specific drawings. PEBs are faster (50–70% less erection time), lighter, and typically more cost-effective for large spans. Conventional steel is better for complex, irregular structures or heavy industrial loads.' },
  { q: 'How long does a PEB factory or warehouse take to construct in Chennai?', a: 'A standard PEB building of 10,000 sqft: design and manufacturing takes 6–8 weeks, site erection takes 2–3 weeks. Total 8–12 weeks from order to structure complete. This compares to 6–9 months for an equivalent RCC industrial building. Foundation and civil work (slab, office block) runs in parallel and is typically the critical path.' },
  { q: 'Which PEB manufacturers are available in Chennai and Tamil Nadu?', a: 'Major PEB manufacturers with supply and erection capability in Tamil Nadu: Kirby Building Systems (largest in India), Tata BlueScope Steel (LYSAGHT brand), Interarch Building Products, Lloyd Insulations, and Zamil Steel. We tender to multiple vendors for each project to get competitive pricing and delivery commitments.' },
  { q: 'What approvals and permits are needed for a PEB industrial building in Tamil Nadu?', a: 'For SIDCO/SIPCOT plots: prior approval from the respective industrial estate authority. For private plots in industrial zones: CMDA (Greater Chennai Corporation area) or DTCP (elsewhere) building plan approval, fire NOC from Tamil Nadu Fire and Rescue Services (for buildings above certain area thresholds), and factories inspector registration for manufacturing facilities. We provide documentation support for all these.' },
  { q: 'Can a PEB building be expanded in the future?', a: 'Yes — future expansion is one of PEB\'s key advantages. A well-planned PEB building can be extended in the length direction (additional bays) with minimal disruption. Expansion in the width direction or height is more complex but possible. We recommend planning the future expansion direction at the design stage so that the foundation, column bases, and cladding are prepared for it.' },
  { q: 'What maintenance does a PEB roof require in Chennai?', a: 'Chennai PEB roofs (typically Zincalume or pre-painted metal sheet) require: annual inspection of ridge, eave, and gutter joints for sealant deterioration; cleaning of gutters after monsoon; inspection of fastener washers (typically neoprene) every 2 years; touch-up painting on any cut edges or scratched areas. Typical roofing lifespan with maintenance: 20–25 years.' },
  { q: 'Does Buildogram design PEB buildings?', a: 'Buildogram reviews and verifies PEB designs — we do not manufacture or fabricate them. The PEB vendor\'s in-house engineering team produces the design; we review it against IS 800:2007, client load specifications, and local wind/seismic requirements to ensure it is adequate. We also prepare the project specification document and conduct factory inspection during fabrication.' },
];

const applications = [
  { zone: 'Sriperumbudur Corridor', use: 'Auto ancillary manufacturing plants, tier-1 and tier-2 supplier units' },
  { zone: 'Oragadam Industrial Area', use: 'Large-format manufacturing, Hyundai and Renault-Nissan supply chain factories' },
  { zone: 'Ambattur / SIDCO Guindy', use: 'Light manufacturing, engineering component shops, electronics assembly' },
  { zone: 'SIPCOT Irungattukottai', use: 'Chemical, pharma, and heavy engineering plants' },
  { zone: 'Koyambedu / Poonamallee', use: 'Cold storage and logistics warehouses for agri and FMCG' },
  { zone: 'NH44 / NH48 Logistics Parks', use: 'E-commerce fulfilment centres, 3PL warehouses' },
];

export default function PEBBuildingPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--secondary)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 60%, rgba(252,110,32,0.08) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(252,110,32,0.12)', border: '1px solid rgba(252,110,32,0.3)', borderRadius: '20px', padding: '4px 14px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>PRE-ENGINEERED BUILDINGS</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: '16px', maxWidth: '700px', lineHeight: 1.2 }}>
            PEB Building Contractors in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px', marginBottom: '32px' }}>
            Engineer-supervised PEB procurement, factory inspection and erection supervision for factories, warehouses and industrial buildings across Chennai and Tamil Nadu.
          </p>
          <a href="/contact" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '14px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>Get PEB Project Support</a>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--primary)', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['90m', 'Max Clear Span'], ['50–70%', 'Faster Than RCC'], ['₹1,800+', 'Per Sqft Starting Cost'], ['8–12 Weeks', 'Design to Structure Complete']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '900px', padding: '60px 24px' }}>

        {/* What is PEB */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            What is a Pre-Engineered Building?
          </h2>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '16px', marginBottom: '16px' }}>
            A Pre-Engineered Building (PEB) is a structural steel system where every component is optimally designed as an integrated system and factory-fabricated to exact dimensions — then shipped to site and assembled. Unlike conventional construction where each element is designed and fabricated independently, a PEB system is engineered holistically for the specific building's loads, spans, and usage.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '24px' }}>
            {[['Primary Frame', 'Tapered columns and rafters — the main load-bearing structure. Factory welded to exact design.'], ['Secondary Structure', 'Purlins, girts, and eave struts — support the cladding and transfer loads to primary frame.'], ['Roof & Wall Cladding', 'Pre-painted Zincalume or GI sheets, typically 0.5mm. Available with insulation options.'], ['Accessories', 'Ridge ventilators, skylights, gutter systems, louvers, and access doors.']].map(([title, desc]) => (
              <div key={title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '18px', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</h3>
                <p style={{ color: '#555', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Applications */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            PEB Applications in Chennai & Tamil Nadu
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--secondary)', color: 'white' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Industrial Zone</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Typical PEB Applications</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((row, i) => (
                  <tr key={row.zone} style={{ background: i % 2 === 0 ? '#f8f9fa' : 'white', borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--secondary)' }}>{row.zone}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Our role */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            Our Role in Your PEB Project
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { step: '01', title: 'Requirement Briefing & Specification', desc: 'Clear span, eave height, bay spacing, loading requirements (floor loads, crane load if any), roof/wall specification, and future expansion plan documented.' },
              { step: '02', title: 'PEB Vendor Tendering (3+ Quotes)', desc: 'We tender to Kirby, Tata BlueScope, Interarch, and other qualified vendors with a detailed specification. Evaluate on tonnage, design adequacy, delivery commitment, and erection capability.' },
              { step: '03', title: 'Design Review (IS 800:2007)', desc: 'The winning vendor\'s design is reviewed against IS 800, client load specs, and Chennai wind/seismic requirements before order placement.' },
              { step: '04', title: 'Factory Inspection During Fabrication', desc: 'Our inspector visits the fabrication facility during production to check: section dimensions, weld quality, painting/coating, and despatch documentation.' },
              { step: '05', title: 'Site Erection Supervision', desc: 'Anchor bolt alignment, column base plate grouting, bolt torquing, plumb and level checks, ridge and eave flashing, and gutter installation.' },
              { step: '06', title: 'Handover & Warranty Documentation', desc: 'Erection completion certificate, structural warranty from vendor, maintenance schedule, as-built drawings.' },
            ].map((phase, i, arr) => (
              <div key={phase.step} style={{ display: 'flex', gap: '24px', paddingBottom: '28px', borderLeft: i < arr.length - 1 ? '2px solid rgba(252,110,32,0.25)' : 'none', marginLeft: '20px', paddingLeft: '32px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-14px', top: '0', width: '28px', height: '28px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: '11px', fontWeight: 700 }}>{phase.step}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>{phase.title}</h3>
                  <p style={{ color: '#555', lineHeight: 1.7, fontSize: '14px', margin: 0 }}>{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical data */}
        <section style={{ marginBottom: '56px', background: 'linear-gradient(135deg, #f8f9fa, #fff)', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px 32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>Key Technical Data for Chennai PEB Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '14px' }}>
            {[['Basic Wind Speed', '50 m/s per IS 875 Part 3 (Chennai coastal)'], ['Seismic Zone', 'Zone III per IS 1893:2016'], ['Column Pitch', '6–7.5m (typical)'], ['Bay Spacing', '6–9m (optimised for purlins)'], ['Roof Slope', '1:10 minimum for drainage'], ['Cladding', '0.5mm Zincalume or PPGI'], ['Design Code', 'IS 800:2007 (Limit State Method)'], ['Anchor Bolts', 'M24–M36, Grade 8.8']].map(([param, value]) => (
              <div key={param} style={{ background: 'white', borderRadius: '8px', padding: '14px 16px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase' }}>{param}</div>
                <div style={{ color: '#333', fontSize: '13px' }}>{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '28px' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map(faq => (
              <details key={faq.q} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', padding: '16px 20px' }}>
                <summary style={{ fontWeight: 600, color: 'var(--secondary)', cursor: 'pointer', fontSize: '15px' }}>{faq.q}</summary>
                <p style={{ color: '#555', lineHeight: 1.8, fontSize: '15px', marginTop: '12px', marginBottom: 0 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>Related Services</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[['/steel-construction-chennai', 'Steel Construction'], ['/industrial-shed-construction-chennai', 'Industrial Sheds'], ['/commercial-construction-chennai', 'Commercial Construction']].map(([href, label]) => (
              <a key={href} href={href} style={{ display: 'inline-block', background: '#f0f0f0', color: 'var(--secondary)', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>{label}</a>
            ))}
          </div>
        </section>

        <section style={{ background: 'var(--secondary)', borderRadius: '16px', padding: '48px 40px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Get PEB Project Support</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '480px', margin: '0 auto 28px' }}>Share your span, height, and usage — we'll prepare a specification and get you 3 competitive quotes.</p>
          <a href="/contact" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '16px 36px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '16px' }}>Start Your PEB Project →</a>
        </section>
      </div>

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.buildogram.in' },
        { name: 'Services', url: 'https://www.buildogram.in/services' },
        { name: 'PEB Building Contractors Chennai', url: 'https://www.buildogram.in/peb-building-contractors-chennai' },
      ]} />
    </>
  );
}
