import Link from 'next/link';
import BuildLeadForm from '../BuildLeadForm';

export const metadata = {
  title: 'Home Renovation in Chennai | Old House Upgrade | Buildogram',
  description: 'Renovate, upgrade or reconstruct your old home with structural review, waterproofing, interiors and proof at every stage. Chennai renovation specialists.',
};

const renovationTypes = [
  { icon: '🔨', title: 'Complete Renovation', desc: 'Full demolition and reconstruction of old structure with modern design.' },
  { icon: '💧', title: 'Waterproofing', desc: 'Terrace, bathroom, basement and wall waterproofing with warranty.' },
  { icon: '⚡', title: 'Electrical Upgrade', desc: 'Complete re-wiring, MCB upgrades, new fan and light points.' },
  { icon: '🚿', title: 'Plumbing Upgrade', desc: 'CPVC/UPVC pipe replacement, new sanitary fittings and tiles.' },
  { icon: '🎨', title: 'Interior Refresh', desc: 'False ceiling, modular furniture, painting and flooring upgrade.' },
  { icon: '🧱', title: 'Structural Repair', desc: 'Crack filling, column jacketing, beam strengthening and plastering.' },
];

export default function RenovationPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '40px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 40% 60%, rgba(204,255,0,0.06) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <Link href="/build" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Build</Link>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
              <span style={{ color: '#CCFF00', fontSize: '14px' }}>Renovation</span>
            </div>
            <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1, marginBottom: '24px' }}>
              Renovate with Proof.<br />
              <span style={{ color: '#CCFF00' }}>Not just promises.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.7, marginBottom: '40px' }}>
              Structural review, waterproofing, electrical, plumbing, interiors — every renovation work captured with before/after proof and material records.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="#consult" className="btn btn-primary btn-lg">Get Renovation Quote</Link>
              <Link href="/cost-estimator" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>Calculate Cost</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">Renovation Services</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px' }}>What we can renovate for you</h2>
          </div>
          <div className="grid-3">
            {renovationTypes.map(r => (
              <div key={r.title} className="card card-hover">
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{r.icon}</div>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{r.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'white' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <div>
              <span className="tag">Why Buildogram Renovation</span>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginTop: '16px', marginBottom: '24px' }}>Before/after proof at every stage</h2>
              {['Structural assessment before any work begins', 'BOQ declared before work starts — no surprises', 'Before photos documented at every item', 'After photos with quality sign-off', 'Material records (brand, batch, quantity)', 'All work added to your Property Passport'].map(p => (
                <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                  <span style={{ background: '#CCFF00', color: '#292929', borderRadius: '50%', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0, marginTop: '2px' }}>✓</span>
                  <span style={{ fontSize: '15px', color: 'var(--text)' }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'linear-gradient(135deg, #292929, #1a1a1a)', borderRadius: '20px', padding: '40px', color: 'white' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📸</div>
              <h3 style={{ color: '#CCFF00', fontSize: '22px', marginBottom: '12px' }}>Before/After Proof</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6 }}>Every renovation item is photographed before and after, with material records attached. You get a digital proof trail, not just a bill.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="consult" className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>Get Renovation Quote</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px' }}>Tell us about your property. We'll plan and quote your renovation.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px' }}>
            <BuildLeadForm leadType="construction" sourcePage="/build/renovation" ctaLabel="🔨 Get Renovation Quote" />
          </div>
        </div>
      </section>
    </>
  );
}
