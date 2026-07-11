import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'Plate Load Test in Chennai | Soil Bearing Capacity (SBC) | Buildogram',
  description: 'Conduct Plate Load Tests in Chennai to determine safe bearing capacity (SBC) of soil per IS 1888 and IS 1904. Essential before foundation design in Chennai clay and sandy soils.',
  path: '/plate-load-test-chennai',
});

const PROCEDURE = [
  { step: '1', title: 'Excavate to Foundation Level', desc: 'Dig a test pit to the proposed foundation depth. The pit size must be at least 5× the plate diameter.' },
  { step: '2', title: 'Place Steel Bearing Plate', desc: 'A 300mm or 450mm square rigid steel plate is seated on the prepared soil surface at the test pit base.' },
  { step: '3', title: 'Apply Incremental Loads', desc: 'Load is applied using a hydraulic jack acting against a kentledge (dead load) or anchor piles. Load is increased in increments of 1/5th the estimated ultimate load.' },
  { step: '4', title: 'Record Settlement', desc: 'Three dial gauges placed around the plate record settlement at each load increment. Readings taken at 1, 2.25, 4, 6.25, 9, 12, 16, 20, and 25 minutes.' },
  { step: '5', title: 'Plot Load-Settlement Curve', desc: 'Gross load vs settlement is plotted. The curve shape reveals whether soil fails by shear or excessive settlement.' },
  { step: '6', title: 'Determine SBC', desc: 'SBC = minimum of: (a) 1/2 of ultimate load where gross settlement = 25mm criterion, or (b) load corresponding to a settlement of 25mm — whichever governs.' },
];

const SBC_TABLE = [
  { soil: 'Soft Marine Clay', area: 'Velachery, Adyar, Thiruvanmiyur', sbc: '50–100 kN/m²', footing: 'Pile foundation recommended' },
  { soil: 'Medium Stiff Clay', area: 'Porur, Ambattur, Padi', sbc: '100–150 kN/m²', footing: 'Raft or combined footing' },
  { soil: 'Dense Sandy Soil', area: 'ECR, OMR, Sholinganallur', sbc: '150–250 kN/m²', footing: 'Isolated spread footing' },
  { soil: 'Hard Murrum / Laterite', area: 'Tambaram, Chromepet, Pallavaram', sbc: '300–500 kN/m²', footing: 'Shallow footing sufficient' },
  { soil: 'Hard Rock', area: 'Guindy, Madipakkam (Charnockite)', sbc: '600+ kN/m²', footing: 'Isolated footing on rock' },
];

const FAQS = [
  { question: 'How long does a Plate Load Test take in Chennai?', answer: 'A single Plate Load Test typically takes 4–8 hours on site depending on soil type (softer soils require longer settlement stabilization time). The full test report is delivered within 3–5 working days.' },
  { question: 'How much does a Plate Load Test cost?', answer: 'A single PLT in Chennai typically costs ₹12,000–₹20,000 depending on the test pit depth and equipment mobilization. For larger plots requiring multiple test locations, ask for a package rate.' },
  { question: 'What is the difference between a Plate Load Test and SPT?', answer: 'SPT (Standard Penetration Test) is conducted inside a borehole at various depths — it gives N-values used to estimate bearing capacity through empirical correlations. The Plate Load Test is conducted at the actual foundation level and directly measures how the soil actually behaves under load. PLT is generally more accurate for shallow foundation design.' },
  { question: 'When is a Plate Load Test required?', answer: 'A PLT is typically required when (a) the project is on unusual or variable soil, (b) shallow foundation design needs field verification, (c) the structural consultant specifically mandates it, or (d) CMDA/approval authority requires soil testing documentation.' },
  { question: 'Is IS 1888 compliance mandatory?', answer: 'For formal CMDA building approval, the soil investigation report should comply with IS 1888 (for Plate Load Test) and IS 1904 (for foundation design). Your structural engineer or architect will guide you on what specific tests the approving authority requires.' },
];

export default function PlateLoadTestChennai() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Plate Load Test</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Plate Load Test for Soil Bearing Capacity in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            The most reliable field method to determine your soil SBC before foundation design — as per IS 1888 and IS 1904. Get lab-grade SBC determination directly from your plot.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=soil-test" className="btn btn-primary btn-lg">Book Plate Load Test</Link>
            <Link href="/soil-testing-chennai" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>All Soil Tests</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* What is PLT */}
        <section style={{ marginBottom: '64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '16px' }}>What Is a Plate Load Test?</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '15px', marginBottom: '12px' }}>
              A Plate Load Test (PLT) is an in-situ geotechnical test that measures the actual load-settlement behavior of soil at the proposed foundation level. Unlike borehole tests (SPT), which estimate bearing capacity through indirect correlations, the PLT applies real load to a steel plate at the same depth and conditions as your foundation — and directly measures how much the soil settles.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '15px' }}>
              This gives you the <strong>Safe Bearing Capacity (SBC)</strong> in kN/m² — the number your structural engineer needs to design your foundation size and depth.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'var(--bg-card2)', borderRadius: 'var(--radius)', padding: '20px 24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>IS Code Compliance</div>
              <div style={{ fontSize: '15px', color: 'var(--secondary)', fontWeight: 600 }}>IS 1888 (Plate Load Test) + IS 1904 (Foundation Design)</div>
            </div>
            <div style={{ background: 'var(--bg-card2)', borderRadius: 'var(--radius)', padding: '20px 24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Plate Sizes Used</div>
              <div style={{ fontSize: '15px', color: 'var(--secondary)', fontWeight: 600 }}>300mm × 300mm or 450mm × 450mm rigid steel</div>
            </div>
            <div style={{ background: 'var(--bg-card2)', borderRadius: 'var(--radius)', padding: '20px 24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Report Includes</div>
              <div style={{ fontSize: '15px', color: 'var(--secondary)', fontWeight: 600 }}>Load-settlement curve, SBC value, foundation type recommendation</div>
            </div>
          </div>
        </section>

        {/* Procedure */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '32px' }}>Step-by-Step Plate Load Test Procedure</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {PROCEDURE.map((p, i) => (
              <div key={p.step} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', paddingBottom: i < PROCEDURE.length - 1 ? '24px' : 0, borderLeft: i < PROCEDURE.length - 1 ? '2px solid rgba(252,110,32,0.2)' : '2px solid transparent', marginLeft: '16px', paddingLeft: '24px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-12px', top: '0', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.step}</div>
                <div className="card" style={{ flex: 1, padding: '20px 24px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>{p.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SBC Table */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '20px' }}>Typical SBC Values Across Chennai</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'var(--secondary)', color: 'white' }}>
                  {['Soil Type', 'Location', 'SBC Range', 'Foundation Type'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SBC_TABLE.map((row, i) => (
                  <tr key={row.soil} style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card2)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--secondary)' }}>{row.soil}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{row.area}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--primary)' }}>{row.sbc}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{row.footing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', fontStyle: 'italic' }}>* These are indicative ranges. Always conduct a site-specific test before design.</p>
        </section>

        <FAQBlock title="Plate Load Test FAQs" faqs={FAQS} />

        <div className="card" style={{ marginTop: '48px', background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Book Your Plot's Plate Load Test</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>Get a certified SBC report for your Chennai plot in 3–5 days. Accepted by structural engineers and CMDA for plan approval.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=soil-test" className="btn btn-primary btn-lg">Book Plate Load Test</Link>
            <Link href="/soil-testing-chennai" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>All Soil Tests</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Plate Load Test in Chennai', path: '/plate-load-test-chennai' }]} />
    </>
  );
}
