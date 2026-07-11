import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'NDT Testing Services in Chennai | Non-Destructive Concrete Testing | Buildogram',
  description: 'Expert NDT testing for buildings and concrete structures in Chennai. Rebound hammer, UPV, rebar scanning, core extraction and half-cell potential testing by certified engineers.',
  path: '/ndt-testing-chennai',
});

const NDT_METHODS = [
  { icon: '🔨', name: 'Rebound Hammer Test', code: 'IS 13311 Part 2', desc: 'Surface hardness test for concrete quality assessment. Results in 30 minutes.', usecase: 'Quick quality screening, concrete uniformity checks', link: '/rebound-hammer-test-chennai' },
  { icon: '🔊', name: 'Ultrasonic Pulse Velocity (UPV)', code: 'IS 13311 Part 1', desc: 'Measures pulse velocity through concrete to detect internal voids, cracks and poor quality zones.', usecase: 'Internal crack detection, concrete quality mapping', link: '/upv-test-chennai' },
  { icon: '🧲', name: 'Rebar / Cover Meter Scanning', code: 'IS 456', desc: 'Locates embedded steel bars, measures concrete cover depth, and identifies corrosion potential.', usecase: 'Cover depth verification, rebar location without breaking concrete', link: '/rebar-scanning-chennai' },
  { icon: '🪨', name: 'Concrete Core Extraction & Testing', code: 'IS 516', desc: 'Extracts a cylindrical core from the slab or column. Tested in a lab for actual compressive strength.', usecase: 'Actual strength determination, dispute resolution', link: '/core-test-concrete-chennai' },
  { icon: '⚡', name: 'Half-Cell Potential Test', code: 'ASTM C876', desc: 'Detects active electrochemical corrosion in reinforcing steel using potential mapping.', usecase: 'Corrosion activity assessment in coastal or old structures', link: '/rebar-scanning-chennai' },
];

const WHEN_NEEDED = [
  { icon: '🏗️', situation: 'Before Adding a Floor', detail: 'Verify existing slab and column strength can carry additional load' },
  { icon: '🏠', situation: 'Buying an Old Property', detail: 'Assess hidden structural condition before purchase' },
  { icon: '🌊', situation: 'After Flooding or Earthquake', detail: 'Check if structure was damaged by water ingress or seismic forces' },
  { icon: '⚠️', situation: 'Visible Cracks or Spalling', detail: 'Determine if cracks are structural or cosmetic' },
  { icon: '📅', situation: '15+ Year Old Building', detail: 'Routine structural health check for aging concrete' },
  { icon: '🔧', situation: 'Before Major Renovation', detail: 'Confirm structural integrity before adding loads or removing walls' },
];

const PACKAGES = [
  { name: 'Basic', price: '₹8,000 – ₹15,000', tests: ['Rebound Hammer Test (IS 13311 P2)', 'Ultrasonic Pulse Velocity - UPV (IS 13311 P1)', 'Test report with recommendations'], color: 'var(--border)' },
  { name: 'Standard', price: '₹15,000 – ₹25,000', tests: ['All Basic tests', 'Rebar / Cover Meter Scanning (IS 456)', 'Corrosion potential assessment', 'Detailed zone-wise report'], color: 'var(--primary)', popular: true },
  { name: 'Comprehensive', price: '₹30,000 – ₹50,000', tests: ['All Standard tests', 'Concrete Core Extraction & Lab Test (IS 516)', 'Half-Cell Potential Mapping (ASTM C876)', 'Full structural health assessment report'], color: 'var(--secondary)' },
];

const FAQS = [
  { question: 'What is Non-Destructive Testing (NDT)?', answer: 'NDT is a group of testing methods that assess the structural health of a building without damaging it. Unlike destructive testing (which requires breaking samples), NDT uses sound waves, magnetic fields, and electrochemical measurements to evaluate concrete quality and rebar condition from the surface.' },
  { question: 'Does NDT damage my building?', answer: 'No — that\'s precisely what makes it non-destructive. Methods like rebound hammer and UPV leave no visible marks. The only exception is core extraction, which removes a small cylindrical sample (60–100mm diameter), leaving a minor hole that is patched after testing.' },
  { question: 'How accurate are NDT results?', answer: 'Each method has a defined accuracy range. UPV is accurate to ±5% for concrete quality. Rebound hammer is accurate to ±15–20% (it\'s a relative method, best used for uniformity checks). Core test compressive strength is the most accurate (laboratory-grade) with ±5% precision.' },
  { question: 'Is NDT testing accepted by IS codes?', answer: 'Yes. All our NDT tests follow Bureau of Indian Standards (BIS) codes — IS 13311 Part 1 (UPV), IS 13311 Part 2 (Rebound Hammer), IS 516 (Core Test). Reports issued comply with IS 456 structural assessment requirements.' },
  { question: 'How long does NDT take?', answer: 'A Basic package (Rebound + UPV) takes 2–4 hours on site. Standard package takes 4–6 hours. Core extraction requires lab curing (28 days for full strength, 7-day fast test option available). Reports are issued within 5–7 working days after site visit.' },
  { question: 'How much does NDT testing cost in Chennai?', answer: 'Basic NDT (Rebound Hammer + UPV) starts at ₹8,000 for a standard residential building. Comprehensive packages with core extraction and half-cell potential testing range from ₹30,000 to ₹50,000 depending on the number of test locations and building size.' },
];

export default function NDTTestingChennai() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>NDT Testing</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Non-Destructive Testing for Buildings in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            Assess concrete strength, detect hidden rebar corrosion, and evaluate structural health — without damaging your building. IS-code compliant reports by certified structural engineers.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=ndt" className="btn btn-primary btn-lg">Book NDT Assessment</Link>
            <Link href="/structural-audit-chennai" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>All Structural Services</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* Why NDT Matters */}
        <section style={{ marginBottom: '64px', background: 'rgba(252,110,32,0.04)', border: '1px solid rgba(252,110,32,0.12)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '16px' }}>Why NDT Is Critical for Chennai Buildings</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '15px', marginBottom: '12px' }}>
            Chennai's coastal environment — salt-laden sea breeze, high humidity, and monsoon moisture — creates ideal conditions for <strong>chloride-induced rebar corrosion</strong>. Chloride ions penetrate concrete, reach the steel reinforcement, and trigger rusting. This expansion cracks the concrete from the inside — invisible until large chunks begin falling off (concrete spalling).
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '15px' }}>
            NDT catches this process <strong>before visible damage occurs</strong>. A Half-Cell Potential test can identify active corrosion zones even when the surface looks intact, giving you time to apply protective coatings or localized repairs at a fraction of the cost of full structural rehabilitation.
          </p>
        </section>

        {/* NDT Methods */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="tag" style={{ marginBottom: '12px' }}>5 Methods</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>NDT Methods We Offer</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {NDT_METHODS.map(method => (
              <div key={method.name} className="card" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '20px', alignItems: 'center' }}>
                <span style={{ fontSize: '32px', width: '48px', textAlign: 'center' }}>{method.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>{method.name}</h3>
                    <span style={{ fontSize: '11px', background: 'rgba(252,110,32,0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>{method.code}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '4px' }}>{method.desc}</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>Best for: {method.usecase}</p>
                </div>
                <Link href={method.link} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', textDecoration: 'none' }}>Details →</Link>
              </div>
            ))}
          </div>
        </section>

        {/* When Do You Need NDT */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>When Do You Need NDT Testing?</h2>
          <div className="grid-3" style={{ gap: '16px' }}>
            {WHEN_NEEDED.map(w => (
              <div key={w.situation} className="card" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>{w.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--secondary)', marginBottom: '4px' }}>{w.situation}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{w.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NDT Packages */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', color: 'var(--secondary)' }}>NDT Package Pricing</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>Pricing varies by building size and number of test locations. Final pricing on site assessment.</p>
          </div>
          <div className="grid-3" style={{ gap: '20px' }}>
            {PACKAGES.map(pkg => (
              <div key={pkg.name} className="card" style={{ border: pkg.popular ? `2px solid var(--primary)` : undefined, position: 'relative' }}>
                {pkg.popular && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', fontSize: '11px', fontWeight: 700, padding: '3px 14px', borderRadius: '999px' }}>MOST POPULAR</div>}
                <h3 style={{ color: 'var(--secondary)', marginBottom: '6px' }}>{pkg.name}</h3>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', marginBottom: '20px' }}>{pkg.price}</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {pkg.tests.map(t => (
                    <li key={t} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--text)' }}>
                      <span style={{ color: 'var(--success)', fontWeight: 800, flexShrink: 0 }}>✓</span>{t}
                    </li>
                  ))}
                </ul>
                <Link href="/contact?type=ndt" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>Get Quote</Link>
              </div>
            ))}
          </div>
        </section>

        <FAQBlock title="NDT Testing FAQs" faqs={FAQS} />

        <div className="card" style={{ marginTop: '48px', background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Ready to Assess Your Building's Structural Health?</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '500px', margin: '0 auto 28px' }}>Our certified NDT engineers visit your site, conduct all tests, and deliver a comprehensive IS-code compliant report within 7 days.</p>
          <Link href="/contact?type=ndt" className="btn btn-primary btn-lg">Book NDT Assessment</Link>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'NDT Testing in Chennai', path: '/ndt-testing-chennai' }]} />
    </>
  );
}
