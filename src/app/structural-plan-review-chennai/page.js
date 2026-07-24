import { generateSEOMetadata } from '@/lib/seo/metadata';
import { generateFAQSchema, generateServiceSchema } from '@/lib/seo/schema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import EngineerCredibility from '@/components/seo/EngineerCredibility';

export const metadata = generateSEOMetadata({
  title: 'Structural Plan Review in Chennai | IS Code Compliance | Buildogram',
  description: 'Independent structural drawing review by licensed engineers in Chennai. IS 456, IS 1893 compliance, rebar check, foundation adequacy and load analysis. 5-day turnaround.',
  path: '/structural-plan-review-chennai',
});

const faqSchema = generateFAQSchema([
  { question: 'Is this the same as CMDA structural approval?', answer: 'No. CMDA approval is a statutory compliance check for zoning, setbacks, and permitted floor area. It does not check whether your column sizes are correct, whether your rebar cover is adequate, or whether your foundation is designed for the actual soil bearing capacity at your site. Buildogram\'s structural plan review fills that gap.' },
  { question: 'What file formats do you accept for drawings?', answer: 'We accept PDF, DWG, DXF, and scanned JPG/PNG of physical prints. For best results, send the full structural drawing set: foundation plan, column layout, beam/slab layout, reinforcement details, and section drawings.' },
  { question: 'How long does the structural plan review take?', answer: 'Standard turnaround is 5 working days from receipt of the complete drawing set. For complex structures (G+3 and above, long spans, irregular column grids) allow 7–10 working days.' },
  { question: 'Who actually conducts the review?', answer: 'A licensed structural engineer with a minimum of 8 years of residential and commercial building experience in Chennai. All reviewers are registered with a professional body. We do not use juniors or AI tools to replace engineering judgment for structural safety reviews.' },
  { question: 'What happens if critical issues are found in the drawings?', answer: 'You receive a marked drawing set clearly annotating each issue with its severity (Critical/Major/Minor) and a specific fix recommendation. Critical issues must be resolved in the design before construction begins.' },
  { question: 'Can you review drawings during construction, not just before?', answer: 'Yes. Mid-construction reviews are sometimes more urgent — for example, if you discover that construction is proceeding differently from the approved drawings. We offer a site-and-drawings review.' },
  { question: 'What is the difference between structural design and structural review?', answer: 'Structural design is the creation of the engineering design from scratch. Structural review is an independent check of an existing design, confirming it is correct and IS-code-compliant. Buildogram provides structural review; if your project does not yet have a structural engineer, we can refer you to one.' },
]);

const serviceSchema = generateServiceSchema({
  name: 'Structural Plan Review Chennai',
  description: 'Independent IS-code compliance review of structural drawings by licensed engineers — IS 456, IS 1893, foundation adequacy, rebar schedule and load analysis.',
  url: '/structural-plan-review-chennai',
  category: 'Structural Engineering Review',
});

const defects = [
  { defect: 'Columns undersized for G+2', detail: 'Designer sized columns for G+1 but owner plans G+2 later. Column will be overloaded.', severity: 'Critical' },
  { defect: 'No plinth beam specified', detail: 'Independent houses often omit the tie beam at plinth level. Differential settlement risk.', severity: 'Critical' },
  { defect: 'Cover not specified', detail: 'Rebar cover left to contractor discretion. In coastal Chennai, 40mm minimum is essential.', severity: 'Major' },
  { defect: 'Slab 100mm for 3.6m span', detail: 'IS 456 requires minimum L/32 = 112mm for a simply supported slab of 3.6m span.', severity: 'Major' },
  { defect: 'No footing tie beams', detail: 'Isolated footings without tie beams in expansive soil — lateral movement possible.', severity: 'Major' },
  { defect: 'No IS 1893 check', detail: 'Drawings show no seismic zone consideration. Chennai is Seismic Zone III.', severity: 'Critical' },
];

const faqs = [
  { q: 'Is this the same as CMDA structural approval?', a: 'No. CMDA approval is a statutory compliance check for zoning, setbacks, and permitted floor area — it is not an engineering adequacy review. CMDA does not check whether your column sizes are correct, whether your rebar cover is adequate, or whether your foundation is designed for the actual soil bearing capacity at your site. Buildogram\'s structural plan review fills that gap.' },
  { q: 'What file formats do you accept for drawings?', a: 'We accept PDF, DWG (AutoCAD), DXF, and scanned JPG/PNG of physical prints. For best results, send the full structural drawing set: foundation plan, column layout, beam/slab layout, reinforcement details, and section drawings. If you only have an architectural plan, we can work with that but the review scope will be limited.' },
  { q: 'How long does the structural plan review take?', a: 'Standard turnaround is 5 working days from receipt of the complete drawing set. For complex structures (G+3 and above, long spans, irregular column grids) or when additional calculations need to be verified, allow 7–10 working days. We will confirm at submission.' },
  { q: 'Who actually conducts the review?', a: 'A licensed structural engineer with a minimum of 8 years of residential and commercial building experience in Chennai. All reviewers are registered with a professional body. We do not use juniors or AI tools to replace engineering judgment for structural safety reviews.' },
  { q: 'What happens if critical issues are found in the drawings?', a: 'You receive a marked drawing set clearly annotating each issue with its severity (Critical/Major/Minor) and a specific fix recommendation. Critical issues must be resolved in the design before construction begins. We can also work directly with your structural engineer to clarify the technical basis for our findings.' },
  { q: 'Can you review drawings during construction, not just before?', a: 'Yes. Mid-construction reviews are sometimes more urgent — for example, if you discover that construction is proceeding differently from the approved drawings. We offer a site-and-drawings review that checks whether what is being built matches the design.' },
  { q: 'What is the difference between structural design and structural review?', a: 'Structural design is the creation of the engineering design from scratch — calculating loads, selecting column sizes, designing foundations, preparing the reinforcement schedule. Structural review is an independent check of an existing design, confirming it is correct and IS-code-compliant. Buildogram provides structural review; if your project does not yet have a structural engineer, we can refer you to one.' },
];

export default function StructuralPlanReviewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {/* Hero */}
      <section style={{ background: 'var(--secondary)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(252,110,32,0.08) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(252,110,32,0.12)', border: '1px solid rgba(252,110,32,0.3)', borderRadius: '20px', padding: '4px 14px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>STRUCTURAL REVIEW</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: '16px', maxWidth: '700px', lineHeight: 1.2 }}>
            Structural Plan Review in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px', marginBottom: '32px' }}>
            Independent IS-code compliance review of your structural drawings — before a single column is poured. CMDA approval is not a structural safety check. This is.
          </p>
          <a href="/contact" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '14px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>Submit Your Drawings for Review</a>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--primary)', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['200+', 'Drawings Reviewed'], ['87%', 'Had ≥1 Major Finding'], ['5 Days', 'Standard Turnaround'], ['IS 456 · IS 1893 · IS 875', 'Codes Referenced']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '900px', padding: '60px 24px' }}>

        {/* Why it matters */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            Why Independent Structural Review Matters
          </h2>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '16px', marginBottom: '16px' }}>
            In Chennai, a significant proportion of residential structural drawings are prepared by drafting technicians rather than licensed structural engineers. The drawings may look complete — column layout, beam sections, rebar details — but without engineering calculations behind them, the sizes and spacings are often based on rules of thumb rather than actual load analysis.
          </p>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '16px', marginBottom: '16px' }}>
            CMDA approves your building plan for regulatory compliance — setbacks, height, floor area ratio. It does not verify whether your column is large enough to carry the beam and slab loads above it, or whether your foundation is designed for the actual soil bearing capacity at your specific site.
          </p>
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '10px', padding: '20px 24px' }}>
            <p style={{ margin: 0, fontWeight: 600, color: '#991b1b' }}>🚨 87% of the structural drawing sets we review have at least one Major finding. 23% have at least one Critical finding — a defect that could affect the structural integrity of the building.</p>
          </div>
        </section>

        {/* What we review */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            What Buildogram Reviews in Your Structural Drawings
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { title: 'Foundation Adequacy', desc: 'Foundation type checked against site soil bearing capacity (SBC). Isolated footings vs. raft vs. pile foundation — based on actual soil test results.' },
              { title: 'Column Sizing', desc: 'Column cross-section and reinforcement checked against actual load: self-weight, live load, and wind load combination per IS 875.' },
              { title: 'Beam Span-to-Depth', desc: 'Beam dimensions verified for deflection control and shear capacity per IS 456 span-to-depth ratios.' },
              { title: 'Rebar Schedule', desc: 'Diameter, spacing, and cover checked for each structural element. Minimum cover in Chennai coastal environment: 40mm for columns, 25mm for slabs.' },
              { title: 'Seismic Compliance (Zone III)', desc: 'Chennai is Seismic Zone III per IS 1893:2016. Ductility requirements, beam-column joint detailing, and lateral force resisting system checked.' },
              { title: 'Wind Load (Coastal)', desc: 'Basic wind speed for Chennai: 50 m/s per IS 875 Part 3. Wind pressure on walls and roof checked, especially for terraces and cantilevers.' },
            ].map(card => (
              <div key={card.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '20px', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{card.title}</h3>
                <p style={{ color: '#555', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* IS Codes */}
        <section style={{ marginBottom: '56px', background: 'linear-gradient(135deg, #f8f9fa, #fff)', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px 32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>IS Codes Referenced in Our Review</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {[['IS 456:2000', 'Plain and Reinforced Concrete — Code of Practice'], ['IS 875 Part 1', 'Dead Loads for Buildings'], ['IS 875 Part 2', 'Imposed Loads for Buildings'], ['IS 875 Part 3', 'Wind Loads (Chennai: 50 m/s)'], ['IS 1893:2016', 'Criteria for Earthquake Design (Zone III)'], ['SP 16:1980', 'Design Aids for Reinforced Concrete to IS 456']].map(([code, desc]) => (
              <div key={code} style={{ background: 'white', borderRadius: '8px', padding: '14px 16px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '14px', marginBottom: '4px' }}>{code}</div>
                <div style={{ color: '#555', fontSize: '13px' }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Common defects */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '20px' }}>
            Common Defects Found in Chennai Residential Drawings
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--secondary)', color: 'white' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Defect</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Detail</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Severity</th>
                </tr>
              </thead>
              <tbody>
                {defects.map((row, i) => (
                  <tr key={row.defect} style={{ background: i % 2 === 0 ? '#f8f9fa' : 'white', borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--secondary)' }}>{row.defect}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{row.detail}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: row.severity === 'Critical' ? '#fee2e2' : '#fef3c7', color: row.severity === 'Critical' ? '#991b1b' : '#92400e', padding: '2px 8px', borderRadius: '4px', fontWeight: 600, fontSize: '12px' }}>{row.severity}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Deliverables */}
        <section style={{ marginBottom: '56px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '28px', border: '1px solid #eee' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>What You Receive</h2>
            <ul style={{ paddingLeft: '20px', color: '#555', lineHeight: 2, fontSize: '15px' }}>
              <li>Annotated drawing set with findings</li>
              <li>Written review report (Critical/Major/Minor)</li>
              <li>Specification notes for each finding</li>
              <li>Revised calculation checks where applicable</li>
              <li>45-minute review call with engineer</li>
              <li>Follow-up review of revised drawings (one round)</li>
            </ul>
          </div>
          <div style={{ background: 'linear-gradient(135deg, var(--secondary), #1a2a3a)', borderRadius: '16px', padding: '28px', color: 'white' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>Pricing & Turnaround</h2>
            <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>₹6,999</div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '16px' }}>for a standard G+1 residential drawing set</p>
            <ul style={{ paddingLeft: '20px', color: 'rgba(255,255,255,0.85)', lineHeight: 2, fontSize: '14px' }}>
              <li>G+2 and above: ₹9,999</li>
              <li>Commercial buildings: Custom quote</li>
              <li>Mid-construction review: ₹8,999</li>
              <li>Turnaround: 5 working days</li>
            </ul>
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
            {[['/structural-audit-chennai', 'Structural Audit'], ['/end-to-end-construction-support-chennai', 'End-to-End Support'], ['/site-supervision-chennai', 'Site Supervision'], ['/boq-review-chennai', 'BOQ Review']].map(([href, label]) => (
              <a key={href} href={href} style={{ display: 'inline-block', background: '#f0f0f0', color: 'var(--secondary)', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>{label}</a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--secondary)', borderRadius: '16px', padding: '48px 40px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Build on a Solid Foundation</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '500px', margin: '0 auto 28px' }}>Submit your structural drawings and know in 5 days whether they are safe to build from.</p>
          <a href="/contact" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '16px 36px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '16px' }}>Submit Drawings →</a>
        </section>
      </div>

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.buildogram.in' },
        { name: 'Services', url: 'https://www.buildogram.in/services' },
        { name: 'Structural Plan Review Chennai', url: 'https://www.buildogram.in/structural-plan-review-chennai' },
      ]} />
    </>
  );
}
