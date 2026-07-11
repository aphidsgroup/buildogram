import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'Soil Testing in Chennai | SBC & Geotechnical Investigation | Buildogram',
  description: 'Comprehensive soil testing and geotechnical investigation in Chennai. SBC determination, SPT boring, grain size analysis for safe foundation design as per IS 1904.',
  path: '/soil-testing-chennai',
});

const TESTS = [
  { icon: '🔩', name: 'Standard Penetration Test (SPT)', code: 'IS 2131', desc: 'N-value determination in cohesionless soils. Each blow count reflects soil resistance; used for foundation bearing capacity and liquefaction assessment.', link: '/soil-investigation-chennai' },
  { icon: '⚖️', name: 'Plate Load Test (PLT)', code: 'IS 1888', desc: 'Field test measuring load-settlement behavior using a steel bearing plate. Direct SBC determination in kN/m².', link: '/plate-load-test-chennai' },
  { icon: '🧪', name: 'Grain Size Analysis', code: 'IS 2720 Part 4', desc: 'Determines the particle size distribution — sand/silt/clay ratio — to classify the soil type and predict drainage behavior.', link: '/soil-investigation-chennai' },
  { icon: '💧', name: 'Atterberg Limits', code: 'IS 2720 Part 5', desc: 'Measures the Liquid Limit (LL) and Plastic Limit (PL) for fine-grained soils. Critical for identifying expansive clay.', link: '/soil-investigation-chennai' },
  { icon: '🏋️', name: 'Proctor Compaction Test', code: 'IS 2720 Part 7', desc: 'Finds the optimum moisture content for maximum dry density. Used for earthwork, backfill compaction specifications.', link: '/soil-investigation-chennai' },
  { icon: '🔬', name: 'Unconfined Compressive Strength (UCS)', code: 'IS 2720 Part 10', desc: 'Measures cohesive soil strength without lateral confinement. Used to determine undrained shear strength of stiff clay.', link: '/soil-investigation-chennai' },
];

const SOIL_MAP = [
  { area: 'Velachery / Adyar', type: 'Soft Marine Clay', sbc: '50–80 kN/m²', recommendation: 'Pile foundation essential', risk: 'high' },
  { area: 'OMR / Sholinganallur', type: 'Mixed Soil (Clay + Sand)', sbc: '100–150 kN/m²', recommendation: 'Isolated or raft footing', risk: 'medium' },
  { area: 'ECR / Injambakkam', type: 'Dense Sandy Soil', sbc: '150–200 kN/m²', recommendation: 'Spread footing feasible', risk: 'low' },
  { area: 'Perambur / North Chennai', type: 'Stiff Clay & Fill', sbc: 'Variable — Investigation essential', recommendation: 'SPT boring mandatory', risk: 'high' },
  { area: 'Tambaram / Chromepet', type: 'Hard Murrum / Weathered Rock', sbc: '400+ kN/m²', recommendation: 'Shallow footing sufficient', risk: 'low' },
];

const PROCESS = [
  { step: '1', title: 'Site Enquiry & Visit', desc: 'Our geotechnical engineer visits your site to determine number of bore holes, test locations, and required investigation depth.' },
  { step: '2', title: 'Bore Drilling', desc: 'Rotary drilling or wash boring to the required depth (typically 6–15m). SPT tests conducted at 1.5m intervals.' },
  { step: '3', title: 'Sample Collection', desc: 'Disturbed and undisturbed samples collected from each stratum and transported to an NABL-accredited laboratory.' },
  { step: '4', title: 'Laboratory Testing', desc: 'Grain size analysis, Atterberg limits, Proctor compaction, and UCS tests on samples. Takes 3–5 days.' },
  { step: '5', title: 'Report Delivery', desc: 'Comprehensive bore log, lab results, SBC values, and foundation type recommendation. Delivered in 7–10 days from site visit.' },
];

const FAQS = [
  { question: 'How much does soil testing cost in Chennai?', answer: 'Basic soil investigation with one bore hole and SPT typically costs ₹8,000–₹15,000. A comprehensive 3-bore investigation with full lab analysis costs ₹25,000–₹45,000 depending on boring depth and tests required.' },
  { question: 'What does SBC mean and why does it matter?', answer: 'SBC stands for Safe Bearing Capacity — the maximum load per unit area that your soil can safely carry without shear failure or excessive settlement. It is the fundamental input for foundation design. Using the wrong SBC can result in an over-designed (costly) or under-designed (dangerous) foundation.' },
  { question: 'How deep does the soil boring go?', answer: 'For residential buildings (G+1, G+2), boring is typically done to 6–10 meters. For taller buildings or areas with known deep soft strata (like Velachery marine clay), boring may extend to 15–20 meters to properly characterize all soil layers.' },
  { question: 'Is soil testing mandatory for building in Chennai?', answer: 'Yes. IS 1904:1986 ("Code of Practice for Design and Construction of Foundations in Soils") mandates that the safe bearing capacity of soil must be determined before foundation design. CMDA building plan approvals for G+1 and above typically require a soil investigation report.' },
  { question: 'Can I skip soil testing and rely on a neighbour\'s report?', answer: 'This is risky. Soil can vary significantly within a small area — a 50-meter gap can mean the difference between hard murrum and soft clay. This is especially true in Chennai\'s heterogeneous urban landscape where old tank beds, stream channels, and filled areas exist in close proximity.' },
  { question: 'What is the difference between SPT and Plate Load Test?', answer: 'SPT (Standard Penetration Test) is a borehole-based test that measures soil resistance at depth using blow counts. It gives N-values used to estimate bearing capacity. The Plate Load Test (PLT) is conducted at the surface at the actual intended foundation level — it directly measures settlement under load and gives SBC more accurately for shallow foundations.' },
];

export default function SoilTestingChennai() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Soil Testing</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Geotechnical Soil Testing in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            Know your soil before you build. IS 1904 mandates SBC testing — the wrong foundation design on Chennai's variable soils costs lakhs in repairs or rebuilding.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=soil-test" className="btn btn-primary btn-lg">Book Soil Test</Link>
            <Link href="/pile-foundation-contractors-chennai" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Foundation Types</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* Why mandatory */}
        <section style={{ marginBottom: '64px', background: 'rgba(252,110,32,0.04)', border: '1px solid rgba(252,110,32,0.12)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '16px' }}>Why Soil Testing Is Mandatory in Chennai</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '12px' }}>IS 1904:1986 requires that the Safe Bearing Capacity of the soil be determined before any foundation design. Chennai's geology is highly variable — within the same city, you can find:</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
            <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--primary)', fontWeight: 700 }}>•</span>Soft marine clay in Velachery and Adyar (SBC as low as 50 kN/m²) requiring pile foundations</li>
            <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--primary)', fontWeight: 700 }}>•</span>Hard laterite or murrum in Tambaram and Chromepet (SBC above 400 kN/m²) fine for shallow footings</li>
            <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--primary)', fontWeight: 700 }}>•</span>Old tank beds and reclaimed land in many older localities — with deep fills and unknown bearing layers</li>
          </ul>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '12px' }}>Designing a foundation without a soil test in Chennai is an engineering and financial risk that can only be discovered after construction has begun — and by then, correcting it costs several lakhs.</p>
        </section>

        {/* Tests */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="tag" style={{ marginBottom: '12px' }}>6 Tests Available</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>Soil Tests We Conduct</h2>
          </div>
          <div className="grid-2" style={{ gap: '16px' }}>
            {TESTS.map(t => (
              <div key={t.name} className="card" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '26px', flexShrink: 0 }}>{t.icon}</span>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>{t.name}</h3>
                    <span style={{ fontSize: '11px', background: 'rgba(252,110,32,0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '999px' }}>{t.code}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chennai Soil Map */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Chennai Soil Characteristics by Area</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'var(--secondary)', color: 'white' }}>
                  {['Area', 'Soil Type', 'SBC Range', 'Foundation Recommendation'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SOIL_MAP.map((row, i) => (
                  <tr key={row.area} style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card2)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--secondary)' }}>{row.area}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{row.type}</td>
                    <td style={{ padding: '12px 16px', color: row.risk === 'high' ? '#e74c3c' : row.risk === 'medium' ? '#f39c12' : 'var(--success)', fontWeight: 600 }}>{row.sbc}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{row.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', fontStyle: 'italic' }}>* SBC ranges are indicative. Always conduct site-specific investigation before foundation design.</p>
        </section>

        {/* Process */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '32px' }}>Our Soil Investigation Process</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {PROCESS.map((p, i) => (
              <div key={p.step} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', paddingBottom: i < PROCESS.length - 1 ? '24px' : 0, borderLeft: i < PROCESS.length - 1 ? '2px solid rgba(252,110,32,0.2)' : '2px solid transparent', marginLeft: '16px', paddingLeft: '24px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-12px', top: '0', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.step}</div>
                <div className="card" style={{ flex: 1, padding: '20px 24px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '4px' }}>{p.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FAQBlock title="Soil Testing FAQs" faqs={FAQS} />

        <div className="card" style={{ marginTop: '48px', background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Don't Build on Unknown Ground</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>Book a soil investigation and get your SBC report, bore logs, and foundation recommendation in 7–10 days.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=soil-test" className="btn btn-primary btn-lg">Book Soil Test</Link>
            <Link href="/plate-load-test-chennai" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Learn About Plate Load Test</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Soil Testing in Chennai', path: '/soil-testing-chennai' }]} />
    </>
  );
}
