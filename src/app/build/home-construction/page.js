import Link from 'next/link';
import BuildLeadForm from '../BuildLeadForm';

export const metadata = {
  title: 'Home Construction in Chennai | Buildogram — Build with Proof',
  description: 'Build your dream home in Chennai with BOQ clarity, BQS quality checks, material verification and Property Passport. Individual house construction specialists.',
};

const process = [
  { step: '01', title: 'Consultation & BOQ', desc: 'We discuss your requirements, prepare a detailed BOQ with every item, rate and quantity declared.' },
  { step: '02', title: 'Agreement & Design', desc: 'Sign agreement with clear payment milestones. Finalise floor plan, elevation and material specs.' },
  { step: '03', title: 'Construction Execution', desc: 'Stage-by-stage construction with daily progress photos and BQS quality checks at every milestone.' },
  { step: '04', title: 'Material Verification', desc: 'Every material entry — brand, grade, test certificate, delivery photo — logged in your project.' },
  { step: '05', title: 'Quality Clearance', desc: 'Final quality inspection before handover. All issues resolved with photo proof.' },
  { step: '06', title: 'Handover + Passport', desc: 'Property handed over with complete Property Passport — documents, BOQ, materials, warranty, media.' },
];

const included = [
  'Foundation to terrace construction', 'Brick masonry with quality cement', 'RCC structure with tested steel',
  'Plastering (internal + external)', 'Waterproofing (terrace + basement)', 'Electrical wiring and DB',
  'Plumbing and sanitary', 'Flooring as per BOQ spec', 'Painting (2 coats internal, 1 external)',
  'Doors and windows (as per spec)', 'Grills and railings', 'Compound wall and gate',
];

export default function HomeConstructionPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '40px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 30%, rgba(204,255,0,0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <Link href="/build" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Build</Link>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
              <span style={{ color: '#CCFF00', fontSize: '14px' }}>Home Construction</span>
            </div>
            <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1, marginBottom: '24px' }}>
              Build Your Home in Chennai<br />
              <span style={{ color: '#CCFF00' }}>with Proof at Every Stage.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.7, marginBottom: '40px' }}>
              Individual house construction with transparent BOQ, 2500+ quality checks, material verification and a permanent Property Passport. No surprises.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="#consult" className="btn btn-primary btn-lg">Start Consultation</Link>
              <Link href="/cost-estimator" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>Calculate Cost</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: '#CCFF00', padding: '28px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[['₹1,600', 'Per sqft onwards'], ['2500+', 'Quality Checks'], ['6', 'Stage Process'], ['Lifetime', 'Property Passport']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 800, color: '#292929' }}>{n}</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#292929', opacity: 0.7 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">Our Process</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px' }}>How we build your home</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {process.map((s, i) => (
              <div key={s.step} style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', padding: '28px 0', borderBottom: i < process.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--secondary)', color: '#CCFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '18px', flexShrink: 0 }}>{s.step}</div>
                <div style={{ paddingTop: '6px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="tag">What's Included</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginTop: '16px' }}>Standard home construction scope</h2>
          </div>
          <div className="grid-3">
            {included.map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', border: '1px solid var(--border)', borderRadius: '12px' }}>
                <span style={{ color: '#292929', background: '#CCFF00', borderRadius: '50%', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0, fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="consult" className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>Start Your Home Consultation</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px' }}>Tell us about your plot and requirement. We'll prepare a BOQ estimate within 48 hours.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px' }}>
            <BuildLeadForm leadType="construction" sourcePage="/build/home-construction" ctaLabel="🏠 Start Home Consultation" />
          </div>
        </div>
      </section>
    </>
  );
}
