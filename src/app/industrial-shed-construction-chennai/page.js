import { generateSEOMetadata } from '@/lib/seo/metadata';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Industrial Shed Construction in Chennai | Factory Shed Builders | Buildogram',
  description: 'Industrial shed and factory building construction support in Chennai. RCC frame, steel frame and PEB sheds with BOQ, supervision and quality control in Chennai industrial zones.',
  path: '/industrial-shed-construction-chennai',
});

const shedTypes = [
  { type: 'RCC Frame Shed', desc: 'Reinforced concrete columns and beams with brick/AAC block wall cladding. Ideal for multi-storey industrial buildings, chemical plants, and facilities requiring heavy floor loads. IS 456:2000 governs design.', cost: '₹2,200–3,000/sqft', timeline: '5–9 months' },
  { type: 'Steel Frame Shed', desc: 'ISMB/ISMC structural steel frame with metal sheet or polycarbonate roofing. Faster than RCC, cost-effective for clear-span sheds up to 20–25m. IS 800:2007 governs design.', cost: '₹1,600–2,200/sqft', timeline: '2–4 months' },
  { type: 'PEB Structure', desc: 'Pre-Engineered Building — factory-fabricated primary and secondary frame. Best for large clear spans (30–90m), logistics warehouses, and where speed is critical. 50–70% faster erection than RCC.', cost: '₹1,800–2,500/sqft', timeline: '8–14 weeks' },
  { type: 'Hybrid Structure', desc: 'RCC ground floor (heavy load, forklift, production area) with steel upper floor or mezzanine. Combines the strength of RCC below with the speed and economy of steel above.', cost: '₹2,000–2,600/sqft', timeline: '4–7 months' },
  { type: 'Open Canopy Shed', desc: 'Steel column and truss structure with metal roof, no side walls. Used for vehicle parking, loading docks, outdoor equipment storage, and covered walkways.', cost: '₹800–1,200/sqft', timeline: '3–6 weeks' },
  { type: 'Insulated Panel Cold Room', desc: 'Polyurethane insulated sandwich panels for cold storage and temperature-controlled environments. Agri produce, pharma, and FMCG cold chain applications.', cost: '₹2,500–4,000/sqft', timeline: '6–10 weeks' },
];

const faqs = [
  { q: 'Which type of industrial shed is best for a factory in Chennai?', a: 'It depends on your use: For a single-storey manufacturing shed with clear spans of 15–30m, a steel frame or PEB structure offers the best cost-to-speed ratio. For chemical or pharma plants requiring heavy floor loads and specific structural fire resistance, RCC frame is more appropriate. For large logistics warehouses needing 40m+ clear spans, PEB is the most economical choice. We assess your specific requirements and recommend accordingly.' },
  { q: 'How long does industrial shed construction take in Chennai?', a: 'Timeline by structure type: PEB shed: 8–14 weeks from order to structure complete (foundation runs in parallel). Steel frame shed: 2–4 months. RCC frame shed: 5–9 months. These are structural timelines — interior finishing (flooring, electrical, plumbing) adds additional time depending on scope.' },
  { q: 'What permits do I need for an industrial shed in SIDCO or SIPCOT Chennai?', a: 'For SIDCO plots: prior approval from SIDCO estate office + CMDA building plan approval (for Chennai Corporation limit plots) or DTCP (outside corporation limits) + fire NOC from Tamil Nadu Fire and Rescue Services (for buildings above 500 sqm built-up area) + Factories Inspector registration (if manufacturing activity). We provide documentation support for the full permit sequence.' },
  { q: 'Can you support construction of a crane bay inside an industrial shed?', a: 'Yes. Crane bay design requires: runway beam (ISMB or plate girder) sized for the EOT crane capacity and span; column brackets or surge beams at the right elevation; gantry rail specification and alignment. We review the crane manufacturer\'s load data, design the runway structure, and supervise installation and rail alignment. We also coordinate rail deflection checks after installation.' },
  { q: 'What floor slab specification do I need for forklift operations?', a: 'For forklifts operating in an industrial shed in Chennai: minimum M30 concrete (RMC, not site-mixed), minimum 150mm slab thickness, fibre-reinforced or mesh reinforcement, shrinkage control joints at 4.5m centres, floor hardener (dry-shake or liquid) for dust resistance and abrasion resistance. For heavy forklifts above 5 tonnes capacity, ground-bearing slab design should be by a structural engineer considering the specific sub-grade bearing capacity.' },
  { q: 'Do you work on expansion of an existing industrial shed?', a: 'Yes — shed expansion is a significant part of our industrial project portfolio. We assess the existing structure (foundation capacity, column load, connection details), determine the permissible expansion, and design and supervise the extension. Key consideration: whether the existing structure can carry the additional roof load, wind load from increased area, and any new crane or equipment load.' },
  { q: 'What is the minimum plot size for industrial shed construction in Chennai?', a: 'SIDCO and SIPCOT have plot sizes starting at 0.5 ground (1,200 sqft plot, typically 1,000–1,500 sqft built-up). For custom industrial plots in industrial zones under CMDA/DTCP, minimum setbacks govern the built-up area. Typically, a 2,400–3,000 sqft plot can accommodate an 1,800–2,000 sqft shed with adequate setbacks and access roads.' },
];

export default function IndustrialShedPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--secondary)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 40%, rgba(252,110,32,0.08) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(252,110,32,0.12)', border: '1px solid rgba(252,110,32,0.3)', borderRadius: '20px', padding: '4px 14px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>INDUSTRIAL CONSTRUCTION</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: '16px', maxWidth: '700px', lineHeight: 1.2 }}>
            Industrial Shed Construction in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px', marginBottom: '32px' }}>
            Engineer-supervised factory shed and industrial building construction across Chennai's industrial zones — SIDCO, SIPCOT, Oragadam, Sriperumbudur and beyond.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/contact" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '14px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>Discuss Your Industrial Project</a>
            <a href="/peb-building-contractors-chennai" style={{ display: 'inline-block', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '14px 28px', borderRadius: '8px', fontWeight: 500, textDecoration: 'none' }}>PEB Buildings →</a>
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '900px', padding: '60px 24px' }}>

        {/* Shed types comparison */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '24px' }}>
            Types of Industrial Sheds — Chennai Cost & Timeline Guide
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {shedTypes.map(shed => (
              <div key={shed.type} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'start' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{shed.type}</h3>
                  <p style={{ color: '#555', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{shed.desc}</p>
                </div>
                <div style={{ textAlign: 'right', minWidth: '140px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '15px' }}>{shed.cost}</div>
                  <div style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>{shed.timeline}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: '#888', fontSize: '12px', marginTop: '12px', fontStyle: 'italic' }}>* Indicative rates for Chennai, 2026. Actual cost depends on span, height, loading, and specification.</p>
        </section>

        {/* Industrial zones */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            Industrial Zones in Chennai Where We Work
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
            {[
              { zone: 'Ambattur Industrial Estate', detail: 'SIDCO plots, light engineering, textiles, electronics assembly. Well-established zone with good contractor base.' },
              { zone: 'SIDCO Guindy & Kakkalur', detail: 'Small and medium enterprises. Mix of RCC and steel frame sheds. Proximity to port and airport.' },
              { zone: 'Sriperumbudur Corridor', detail: 'Auto ancillary cluster (Hyundai, Nokia, Flextronics supply chain). Large-format PEB and steel frame factories.' },
              { zone: 'Oragadam Industrial Area', detail: 'Hyundai and Renault-Nissan OEMs with tier-1/tier-2 supplier base. Modern industrial shed requirements.' },
              { zone: 'SIPCOT Irungattukottai', detail: 'Chemical, pharmaceutical, and heavy engineering. Stricter fire NOC and pollution control requirements.' },
              { zone: 'NH44/NH48 Logistics Parks', detail: 'E-commerce and 3PL warehouses. Large clear-span PEB structures with dock levellers and material handling.' },
            ].map(item => (
              <div key={item.zone} style={{ background: '#f8f9fa', borderRadius: '10px', padding: '18px', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{item.zone}</h3>
                <p style={{ color: '#555', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Industrial challenges */}
        <section style={{ marginBottom: '56px', background: 'linear-gradient(135deg, #f8f9fa, #fff)', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px 32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>Industrial Construction Challenges We Address</h2>
          <ul style={{ paddingLeft: '20px', color: '#555', lineHeight: 2.2, fontSize: '15px' }}>
            <li><strong>Forklift floor loading:</strong> M30 RMC + 150mm slab + shrinkage control joints — specified and supervised.</li>
            <li><strong>Crane runway beams:</strong> Structural design and rail alignment for overhead EOT cranes up to 20T capacity.</li>
            <li><strong>Column grid planning:</strong> Future plant layout flexibility considered at design stage — avoid columns that block future equipment.</li>
            <li><strong>Foundation on SIDCO plots:</strong> Soft ground and poor SBC is common. Pile foundation design and load test coordination.</li>
            <li><strong>Fire NOC requirements:</strong> Tamil Nadu Fire and Rescue Services documentation support for sprinkler specification and escape route design.</li>
            <li><strong>Power room and DG room integration:</strong> Structural opening and room sizing coordinated with electrical consultant.</li>
            <li><strong>Floor hardener and epoxy coating:</strong> Specification, contractor vetting, and application supervision for dust-free, durable industrial floors.</li>
          </ul>
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
            {[['/steel-construction-chennai', 'Steel Construction'], ['/peb-building-contractors-chennai', 'PEB Buildings'], ['/pile-foundation-contractors-chennai', 'Pile Foundation'], ['/structural-audit-chennai', 'Structural Audit']].map(([href, label]) => (
              <a key={href} href={href} style={{ display: 'inline-block', background: '#f0f0f0', color: 'var(--secondary)', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>{label}</a>
            ))}
          </div>
        </section>

        <section style={{ background: 'var(--secondary)', borderRadius: '16px', padding: '48px 40px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Discuss Your Industrial Project</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '480px', margin: '0 auto 28px' }}>Tell us your plot, span, usage, and timeline. We'll recommend the right structure type and get the process started.</p>
          <a href="/contact" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '16px 36px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '16px' }}>Start Your Project →</a>
        </section>
      </div>

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.buildogram.in' },
        { name: 'Services', url: 'https://www.buildogram.in/services' },
        { name: 'Industrial Shed Construction Chennai', url: 'https://www.buildogram.in/industrial-shed-construction-chennai' },
      ]} />
    </>
  );
}
