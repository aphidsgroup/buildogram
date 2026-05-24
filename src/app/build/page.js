import Link from 'next/link';
import BuildLeadForm from './BuildLeadForm';

export const metadata = {
  title: 'Construction Support and Contractor Marketplace | Buildogram',
  description: 'Find construction clarity, BOQ support, project tracking, partner coordination, and material support through Buildogram. Serving Chennai and Tamil Nadu.',
};

const services = [
  { icon: '🏠', title: 'Home Construction', desc: 'Individual homes built with transparent BOQ, material proof and quality checks.', href: '/build/home-construction', tag: 'Most Popular' },
  { icon: '🏛️', title: 'Villa Construction', desc: 'Premium villas with 3D planning, luxury materials and complete handover documentation.', href: '/build/villa-construction', tag: 'Premium' },
  { icon: '🏢', title: 'Commercial Construction', desc: 'Showrooms, offices, warehouses, clinics and schools — built to spec.', href: '/build/commercial-construction', tag: '' },
  { icon: '🔨', title: 'Renovation', desc: 'Structural upgrades, waterproofing, interiors and before/after proof.', href: '/build/renovation', tag: '' },
  { icon: '🎨', title: 'Interiors', desc: 'Modular kitchens, wardrobes, false ceilings and complete interior fit-outs.', href: '/build/interiors', tag: '' },
  { icon: '📋', title: 'PMC', desc: 'Project Management Consulting — we supervise your project and protect your investment.', href: '/build/pmc', tag: '' },
];

const proofPoints = [
  { icon: '📊', title: 'Transparent BOQ', desc: 'Every item, rate and quantity declared upfront. No hidden costs.' },
  { icon: '✅', title: 'BQS™ Quality Checks', desc: '2500+ evidence-backed checks at every construction stage.' },
  { icon: '🧱', title: 'Material Verification', desc: 'Brand, grade, test certificate and delivery photo for every material.' },
  { icon: '📸', title: 'Progress Proof', desc: 'Daily/weekly photo and video updates on your project app.' },
  { icon: '🛂', title: 'Property Passport', desc: 'Permanent digital record of your property from Day 1.' },
  { icon: '🔒', title: 'Warranty Coverage', desc: 'Structural and waterproofing warranty backed by documentation.' },
];

const stats = [['Chennai', 'Primary Market'], ['Transparent', 'BOQ Policy'], ['2500+', 'Quality Checks'], ['100%', 'Proof-Based']];

export default function BuildPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '40px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(255,218,1,0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,218,1,0.12)', border: '1px solid rgba(255,218,1,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
              <span style={{ color: '#FFDA01', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Construction with Proof</span>
            </div>
            <h1 style={{ color: 'white', fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.1, marginBottom: '24px' }}>
              Build with proof,<br />
              <span style={{ color: '#FFDA01' }}>not promises.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.7, marginBottom: '40px' }}>
              From home construction to villa projects — Buildogram gives you cost clarity, material verification, quality proof and a permanent Property Passport.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="#consult" className="btn btn-primary btn-lg">Get Free Consultation</Link>
              <Link href="/cost-estimator" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>Calculate Cost</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: '#FFDA01', padding: '28px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {stats.map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 800, color: '#292929' }}>{n}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#292929', opacity: 0.7 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">Our Construction Services</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px', marginBottom: '16px' }}>What would you like to build?</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto', fontSize: '17px' }}>
              Every service comes with BOQ transparency, quality checks and Property Passport.
            </p>
          </div>
          <div className="grid-3">
            {services.map(s => (
              <Link key={s.title} href={s.href} style={{ display: 'block', textDecoration: 'none' }}>
                <div className="card card-hover" style={{ height: '100%', position: 'relative' }}>
                  {s.tag && (
                    <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#FFDA01', color: '#292929', borderRadius: '999px', padding: '3px 12px', fontSize: '11px', fontWeight: 700 }}>{s.tag}</div>
                  )}
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#292929' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>{s.desc}</p>
                  <div style={{ marginTop: '20px', color: '#BBA07A', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>Learn more →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof Points ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">The Buildogram Difference</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px' }}>Every project is built with proof</h2>
          </div>
          <div className="grid-3">
            {proofPoints.map(p => (
              <div key={p.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '32px', flexShrink: 0 }}>{p.icon}</div>
                <div>
                  <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Consultation Form ── */}
      <section id="consult" className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>Get a Free Consultation</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px' }}>Tell us about your project. We'll respond within 24 hours.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px' }}>
            <BuildLeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
