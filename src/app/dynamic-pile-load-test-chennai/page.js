import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'Dynamic Pile Load Test (PDA) in Chennai | CAPWAP Analysis | Buildogram',
  description: 'High Strain Dynamic Load Testing (PDA) for piles in Chennai with CAPWAP analysis per IS 2911 Part 4. Fast, accurate pile capacity verification during installation.',
  path: '/dynamic-pile-load-test-chennai',
});

const PROCESS = [
  { step: '1', title: 'Sensor Installation', desc: 'Strain gauges and accelerometers are bolted to the pile head at two diametrically opposite positions, 1.5D (1.5 times the diameter) from the top.' },
  { step: '2', title: 'Hammer Application', desc: 'A hydraulic drop hammer or diesel hammer strikes the pile head. The mass and drop height are calibrated to produce a measurable stress wave.' },
  { step: '3', title: 'Signal Capture', desc: 'The PDA device records force and velocity traces from the stress wave propagating down and back up the pile. Data capture is at 10,000–20,000 samples/second.' },
  { step: '4', title: 'CAPWAP Analysis', desc: 'The CAse Pile Wave Analysis Program (CAPWAP) iteratively matches the measured velocity trace by adjusting a soil model until the computed force matches measurements. This extracts pile capacity and soil distribution.' },
  { step: '5', title: 'Report Delivery', desc: 'Comprehensive report with pile capacity at test date, CAPWAP match quality (MQ), driving records, pile integrity zone assessment, and recommendations.' },
];

const VS_TABLE = [
  { aspect: 'Test Duration', pda: '2–3 hours per pile', static: '2–3 days setup + 24h test' },
  { aspect: 'Piles Tested Per Day', pda: '5–20 piles', static: '1 pile only' },
  { aspect: 'Cost', pda: '₹30,000–₹60,000 per pile', static: '₹2–5L per pile' },
  { aspect: 'Accuracy', pda: '±15–20% vs static', static: 'Direct measurement' },
  { aspect: 'Pile Integrity Check', pda: '✅ Included', static: '❌ Separate test needed' },
  { aspect: 'Suitable for Driven Piles', pda: '✅ Yes', static: '✅ Yes' },
  { aspect: 'IS Code Acceptance', pda: '✅ IS 2911 Part 4', static: '✅ IS 2911 Part 1' },
];

const FAQS = [
  { question: 'What is CAPWAP analysis?', answer: 'CAPWAP (CAse Pile Wave Analysis Program) is a signal-matching software used to analyze PDA data. It builds a soil model and iteratively adjusts it until the computed pile response matches the measured PDA data. The output includes total pile capacity, distribution between skin friction and end bearing, and pile integrity assessment.' },
  { question: 'How accurate is PDA testing vs static load test?', answer: 'PDA with CAPWAP analysis typically agrees within ±15–20% of static load test results. ASTM D4945 and IS 2911 Part 4 recognize PDA as a valid pile testing method. Many projects use PDA for quality assurance of all piles and static test for 1–2 confirmation piles.' },
  { question: 'Is dynamic pile testing accepted by Indian Standards?', answer: 'Yes. IS 2911 (Part 4): 1985 "Code of Practice for Design and Construction of Pile Foundations — Part 4: Load Test on Piles" covers High Strain Dynamic Testing. The test must be conducted by a qualified geotechnical engineer using calibrated PDA equipment.' },
  { question: 'How fast can PDA testing be completed?', answer: 'A single pile PDA test takes 2–3 hours including sensor installation and data collection. CAPWAP analysis takes 1–2 additional days. For large projects, we can test 10–20 piles in a single day with multiple PDA units.' },
  { question: 'What does a PDA test cost in Chennai?', answer: 'PDA testing per pile ranges from ₹30,000–₹60,000 depending on mobilization distance, pile diameter, and number of piles tested. For large pile groups (20+ piles), mobilization costs are amortized and per-pile cost reduces significantly.' },
  { question: 'Can PDA detect damaged or defective piles?', answer: 'Yes. The stress wave response from a PDA test is sensitive to impedance changes along the pile shaft — which indicate necking, soil inclusions, or cracks. While PDA is not as precise as Pile Integrity Testing (PIT/sonic echo) for defect location, it does flag major anomalies and zones requiring further investigation.' },
];

export default function DynamicPileLoadTestChennai() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Dynamic Pile Testing</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            High Strain Dynamic Pile Load Testing (PDA) in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            Verify pile capacity in hours, not weeks. PDA testing with CAPWAP analysis per IS 2911 Part 4 — for driven, bored, and precast piles across Chennai.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=pile-testing" className="btn btn-primary btn-lg">Book PDA Test</Link>
            <Link href="/pile-load-test-chennai" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Static Load Test</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* What it is */}
        <section style={{ marginBottom: '64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '16px' }}>What Is PDA (High Strain Dynamic) Testing?</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '15px', marginBottom: '12px' }}>
              Pile Driving Analyzer (PDA) testing is a High Strain Dynamic Test that uses stress wave theory to determine pile capacity and integrity during installation. Sensors attached to the pile head measure force and velocity as a hammer strikes the pile top.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '15px', marginBottom: '12px' }}>
              The measured data is then analyzed using CAPWAP (CAse Pile Wave Analysis Program) — a signal-matching algorithm that builds a soil model and extracts pile capacity, skin friction distribution, and end bearing.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '15px' }}>
              PDA is particularly valuable for <strong>large pile groups</strong> where testing every pile with a static load test would be prohibitively expensive and time-consuming.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'IS Code', value: 'IS 2911 Part 4 + ASTM D4945' },
              { label: 'Suitable Pile Types', value: 'Driven (precast, steel H), bored cast-in-situ, franki piles' },
              { label: 'Test Duration Per Pile', value: '2–3 hours (including sensor installation)' },
              { label: 'Report Turnaround', value: '3–5 working days from test date' },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--bg-card2)', borderRadius: 'var(--radius)', padding: '16px 20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>{item.label}</div>
                <div style={{ fontSize: '14px', color: 'var(--secondary)', fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '32px' }}>The PDA Test Process</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {PROCESS.map((p, i) => (
              <div key={p.step} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', paddingBottom: i < PROCESS.length - 1 ? '24px' : 0, borderLeft: i < PROCESS.length - 1 ? '2px solid rgba(252,110,32,0.2)' : '2px solid transparent', marginLeft: '16px', paddingLeft: '24px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-12px', top: '0', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.step}</div>
                <div className="card" style={{ flex: 1, padding: '20px 24px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>{p.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PDA vs Static */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>PDA vs Static Pile Load Test</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'var(--secondary)', color: 'white' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Aspect</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>PDA (Dynamic Test)</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Static Load Test</th>
                </tr>
              </thead>
              <tbody>
                {VS_TABLE.map((row, i) => (
                  <tr key={row.aspect} style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card2)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--secondary)' }}>{row.aspect}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text)' }}>{row.pda}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{row.static}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <FAQBlock title="PDA Testing FAQs" faqs={FAQS} />

        <div className="card" style={{ marginTop: '48px', background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Verify Your Pile Capacity with PDA Testing</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>Schedule PDA testing during pile installation for real-time quality assurance — at a fraction of the cost of static load tests.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=pile-testing" className="btn btn-primary btn-lg">Book PDA Test</Link>
            <Link href="/pile-integrity-test-chennai" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Pile Integrity Test</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Dynamic Pile Load Test in Chennai', path: '/dynamic-pile-load-test-chennai' }]} />
    </>
  );
}
