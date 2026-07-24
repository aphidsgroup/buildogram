import { generateSEOMetadata } from '@/lib/seo/metadata';
import { generateFAQSchema, generateServiceSchema } from '@/lib/seo/schema';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Steel Structure Construction in Chennai | Structural Steel Buildings | Buildogram',
  description: 'Engineer-supervised structural steel construction in Chennai. Industrial buildings, steel frame houses, mezzanine floors and hybrid structures with BOQ and quality control.',
  path: '/steel-construction-chennai',
});

const faqSchema = generateFAQSchema([
  { question: 'What is the cost of structural steel construction per sqft in Chennai?', answer: 'Indicative rates in Chennai (2026): Steel frame industrial building — ₹1,600–2,200/sqft. Steel+RCC hybrid residential — ₹2,200–2,800/sqft. Mezzanine floor addition — ₹800–1,200/sqft. Actual cost depends on steel section sizes, span, height, and roof/cladding specification.' },
  { question: 'How long does steel fabrication and erection take?', answer: 'For a typical industrial shed of 5,000 sqft: fabrication takes 3–5 weeks and erection takes 1–2 weeks on-site. Total 4–7 weeks from drawing approval to structure complete.' },
  { question: 'Is structural steel construction permitted for residential buildings in Chennai?', answer: 'Yes. Steel structures are permitted for residential use under CMDA regulations, provided they meet structural safety requirements and have a structural engineer\'s certificate.' },
  { question: 'What is the difference between mild steel and HYSD steel?', answer: 'Mild Steel (IS 2062 E250) is used for structural sections (ISMB, ISMC, angles, plates) — yield strength 250 MPa. HYSD steel (Fe500D TMT bars) is used as reinforcement inside RCC concrete. They serve different structural purposes and are not interchangeable.' },
  { question: 'How do you prevent rust in Chennai\'s coastal climate?', answer: 'Chennai\'s proximity to the coast requires hot-dip galvanising or epoxy coating for structural steel. Within 5 km of the coast, bare mild steel shows significant corrosion within 12–18 months. Our specification includes minimum 6mm thickness for exposed plate connections.' },
  { question: 'Can you add a mezzanine floor to an existing building?', answer: 'Yes, subject to a structural assessment of the existing building\'s foundation and column capacity to carry the additional load. We assess the existing structure, calculate the permissible additional load, design the mezzanine frame within that limit, and supervise fabrication and erection.' },
  { question: 'Which IS code governs steel structure design in India?', answer: 'IS 800:2007 (General Construction in Steel) is the primary code. Material grades are governed by IS 2062. Welding is governed by IS 816. For bolted connections, IS 1367 covers fastener specifications.' },
]);

const serviceSchema = generateServiceSchema({
  name: 'Steel Structure Construction Chennai',
  description: 'Engineer-supervised structural steel fabrication, erection and quality control for industrial, commercial and residential projects in Chennai.',
  url: '/steel-construction-chennai',
  category: 'Steel Construction',
});

const faqs = [
  { q: 'What is the cost of structural steel construction per sqft in Chennai?', a: 'Indicative rates in Chennai (2026): Steel frame industrial building — ₹1,600–2,200/sqft. Steel+RCC hybrid residential — ₹2,200–2,800/sqft. Mezzanine floor addition — ₹800–1,200/sqft of mezzanine area. These are construction costs only and exclude interior finishing. Actual cost depends on steel section sizes, span, height, and roof/cladding specification.' },
  { q: 'How long does steel fabrication and erection take?', a: 'For a typical industrial shed of 5,000 sqft: fabrication takes 3–5 weeks (off-site, in the fabricator\'s yard) and erection takes 1–2 weeks on-site. Total 4–7 weeks from drawing approval to structure complete. This is significantly faster than an equivalent RCC structure (which would take 4–6 months for the frame alone).' },
  { q: 'Is structural steel construction permitted for residential buildings in Chennai under CMDA rules?', a: 'Yes. Steel structures are permitted for residential use under CMDA regulations, provided they meet structural safety requirements and have a structural engineer\'s certificate. Many G+2 and G+3 developments in Chennai use steel+RCC hybrid structures — steel columns and beams with RCC slabs.' },
  { q: 'What is the difference between mild steel (MS) and HYSD steel?', a: 'Mild Steel (MS) — like IS 2062 E250 — is used for structural sections (ISMB, ISMC, angles, plates). It has a yield strength of 250 MPa and is welded or bolted for structural frames. HYSD steel (High Yield Strength Deformed) — like Fe500D TMT bars — is used as reinforcement inside RCC concrete. They serve different structural purposes and are not interchangeable.' },
  { q: 'How do you prevent rust in Chennai\'s coastal climate?', a: 'Chennai\'s proximity to the coast means high humidity and salt-laden air, which accelerates corrosion of structural steel. Our specification for coastal Chennai projects: hot-dip galvanising (HDG) for purlins, girts, and secondary members; epoxy primer + polyurethane finish for primary frame members; or full powder coating. We also specify minimum 6mm thickness for exposed plate connections and avoid crevice-prone joints.' },
  { q: 'Can you add a mezzanine floor to an existing building?', a: 'Yes, subject to a structural assessment of the existing building\'s foundation and column capacity to carry the additional load. We assess the existing structure, calculate the permissible additional load, design the mezzanine frame within that limit, and supervise fabrication and erection. This is common in Ambattur and Guindy industrial premises where additional storage space is needed.' },
  { q: 'Which IS code governs steel structure design in India?', a: 'IS 800:2007 (General Construction in Steel — Code of Practice) is the primary code. Material grades are governed by IS 2062 (Hot Rolled Medium and High Tensile Structural Steel). Welding is governed by IS 816 (Code of Practice for Use of Metal Arc Welding for General Construction). For bolted connections, IS 1367 covers fastener specifications.' },
];

export default function SteelConstructionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {/* Hero */}
      <section style={{ background: 'var(--secondary)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(252,110,32,0.08) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(252,110,32,0.12)', border: '1px solid rgba(252,110,32,0.3)', borderRadius: '20px', padding: '4px 14px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>STEEL CONSTRUCTION</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: '16px', maxWidth: '700px', lineHeight: 1.2 }}>
            Steel Structure Construction in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px', marginBottom: '32px' }}>
            Engineer-supervised structural steel fabrication, erection and quality control for industrial, commercial and residential projects in Chennai.
          </p>
          <a href="/contact" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '14px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>Get a Steel Construction Estimate</a>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--primary)', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['120+', 'Steel Projects'], ['₹45L', 'Average Project Value'], ['IS 800:2007', 'Design Code'], ['4–7 Weeks', 'Typical Frame Erection']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '900px', padding: '60px 24px' }}>

        {/* Types */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            Types of Steel Structures We Support
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {[
              { title: 'Steel Frame Industrial Buildings', desc: 'Column-and-beam steel frames for factory, warehouse, and workshop sheds. ISMB/ISMC sections with metal or polycarbonate roofing.' },
              { title: 'Steel + RCC Hybrid Residential', desc: 'Steel columns and beams combined with RCC slabs. Faster than full RCC, economical for G+2 and G+3 projects.' },
              { title: 'Mezzanine Floor Additions', desc: 'Adding a mezzanine floor inside an existing industrial building to increase usable area without new civil work.' },
              { title: 'Steel Canopy & Shed Extensions', desc: 'Extending an existing building with a steel canopy, parking shed, or factory extension — faster and less disruptive than RCC.' },
              { title: 'Rooftop Additions', desc: 'Steel structure additions on existing RCC rooftops — lighter than RCC, subject to structural capacity assessment.' },
              { title: 'Crane Runway Beams', desc: 'Structural steel crane runway beams (rail girders) for overhead EOT cranes in industrial and manufacturing facilities.' },
            ].map(card => (
              <div key={card.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '20px', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{card.title}</h3>
                <p style={{ color: '#555', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why steel in Chennai */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            Why Steel Construction in Chennai
          </h2>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '16px', marginBottom: '16px' }}>
            Structural steel offers specific advantages in Chennai's construction environment: faster erection than full RCC (weeks vs months for the structural frame), better spanning capability for large industrial spaces (clear spans up to 30m+ without intermediate columns), and lighter dead loads — particularly relevant when adding structures to existing buildings whose foundations may have limited remaining capacity.
          </p>
          <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px' }}>
            <p style={{ margin: 0, fontWeight: 600, color: '#856404' }}>⚠ Chennai Coastal Consideration: Structural steel within 5 km of the coast requires hot-dip galvanising or epoxy coating. Bare mild steel will show significant surface corrosion within 12–18 months in Chennai's salt-laden coastal air.</p>
          </div>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '16px' }}>
            IS codes governing steel construction: <strong>IS 800:2007</strong> (design), <strong>IS 2062</strong> (material — E250 grade for general structural steel), <strong>IS 816</strong> (welding).
          </p>
        </section>

        {/* Our role */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            Our Role — Engineering Oversight, Not Fabrication
          </h2>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '16px', marginBottom: '20px' }}>
            Buildogram is not a steel fabricator or erection contractor. We are the engineering oversight layer — reviewing the design, preparing the BOQ, vetting fabricators, and supervising quality during fabrication and erection. This gives you independent accountability.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {[['Structural Design Review', 'IS 800 compliance, deflection check, connection design'], ['BOQ Preparation', 'Steel tonnage, fabrication, erection, coating'], ['Fabricator Vetting', '3+ competitive tenders, capacity assessment'], ['Fabrication Inspection', 'Section dimensions, weld quality, coating'], ['Erection Supervision', 'Bolt torquing, plumb/level, connection checks'], ['Anti-Corrosion Spec', 'Galvanising or coating specification and inspection']].map(([title, desc]) => (
              <div key={title} style={{ background: '#f8f9fa', borderRadius: '10px', padding: '16px', border: '1px solid #eee' }}>
                <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '13px', marginBottom: '6px' }}>{title}</div>
                <div style={{ color: '#555', fontSize: '13px', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical specs */}
        <section style={{ marginBottom: '56px', background: 'linear-gradient(135deg, #f8f9fa, #fff)', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px 32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>Technical Specifications for Chennai Steel Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[['Primary Beams', 'ISMB 200–600 (Indian Standard Medium Weight Beams)'], ['Columns', 'ISHB, SHS/RHS hollow sections'], ['Secondary Members', 'ISMC channels, ISA angles'], ['Connections', 'HSFG bolts Grade 8.8; fillet welds per IS 816'], ['Material Grade', 'IS 2062 E250 (mild steel) or E350 for high-stress zones'], ['Roof Purlins', 'Z/C sections, 1.5–2.5mm hot-dip galvanised']].map(([item, spec]) => (
              <div key={item} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
                <div style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '13px', marginBottom: '4px' }}>{item}</div>
                <div style={{ color: '#555', fontSize: '13px' }}>{spec}</div>
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

        {/* Related */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>Related Services</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[['/peb-building-contractors-chennai', 'PEB Buildings'], ['/industrial-shed-construction-chennai', 'Industrial Sheds'], ['/structural-audit-chennai', 'Structural Audit'], ['/site-supervision-chennai', 'Site Supervision']].map(([href, label]) => (
              <a key={href} href={href} style={{ display: 'inline-block', background: '#f0f0f0', color: 'var(--secondary)', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>{label}</a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--secondary)', borderRadius: '16px', padding: '48px 40px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Get a Steel Construction Estimate</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '480px', margin: '0 auto 28px' }}>Share your span, height, and usage — we'll give you a ballpark BOQ within 48 hours.</p>
          <a href="/contact" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '16px 36px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '16px' }}>Request Estimate →</a>
        </section>
      </div>

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.buildogram.in' },
        { name: 'Services', url: 'https://www.buildogram.in/services' },
        { name: 'Steel Construction Chennai', url: 'https://www.buildogram.in/steel-construction-chennai' },
      ]} />
    </>
  );
}
