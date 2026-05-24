import Link from 'next/link';
import MaintenanceLeadForm from './MaintenanceLeadForm';

export const metadata = {
  title: 'Home Maintenance Services Chennai | AMC & Repairs | Buildogram',
  description: 'Professional home maintenance, waterproofing, plumbing, electrical repairs and AMC services in Chennai. All work documented with before/after proof.',
};

const services = [
  { icon: '💧', title: 'Waterproofing', desc: 'Terrace, bathroom, wall and basement waterproofing with warranty.' },
  { icon: '🚿', title: 'Plumbing Repair', desc: 'Pipe leaks, blockages, new fittings and sanitary replacements.' },
  { icon: '⚡', title: 'Electrical Repair', desc: 'Wiring faults, fan/light issues, switch upgrades and board additions.' },
  { icon: '🎨', title: 'Painting & Plastering', desc: 'Interior/exterior painting, crack repair and wall plastering.' },
  { icon: '🔧', title: 'General Repairs', desc: 'Door/window fixing, tile replacement, grill repair and misc work.' },
  { icon: '📋', title: 'AMC Contracts', desc: 'Annual maintenance contract — regular check-ups and priority service.' },
];

const amcPlans = [
  { plan: 'Basic AMC', price: 'From ₹4,999/yr', features: ['2 scheduled visits/year', 'Plumbing & electrical check', 'Priority service response', 'Digital service records'] },
  { plan: 'Standard AMC', price: 'From ₹9,999/yr', features: ['4 scheduled visits/year', 'Plumbing, electrical & civil', 'Waterproofing inspection', 'Before/after photo records', 'Priority service response'], highlight: true },
  { plan: 'Premium AMC', price: 'From ₹18,999/yr', features: ['6 scheduled visits/year', 'Full property maintenance', 'Minor repair included', 'Property Passport update', '24hr emergency response'] },
];

export default function MaintenancePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '40px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 60%, rgba(252, 110, 32, 0.06) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Home Maintenance</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(34px, 5vw, 60px)', lineHeight: 1.1, marginBottom: '24px' }}>
            Maintain your property<br />
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>with proof of every fix.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Waterproofing, plumbing, electrical, painting and AMC services — with before/after photos, material records and Property Passport updates.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#request" className="btn btn-primary btn-lg">Request Maintenance Service</Link>
            <Link href="#amc" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>View AMC Plans</Link>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">Our Services</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px' }}>What we maintain for you</h2>
          </div>
          <div className="grid-3">
            {services.map(s => (
              <div key={s.title} className="card card-hover">
                <div style={{ fontSize: '36px', marginBottom: '14px' }}>{s.icon}</div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMC Plans ── */}
      <section id="amc" className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">Annual Maintenance Contracts</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px' }}>Choose your AMC plan</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '17px', marginTop: '12px' }}>Predictable maintenance costs. Proof at every visit.</p>
          </div>
          <div className="grid-3">
            {amcPlans.map(p => (
              <div key={p.plan} style={{
                borderRadius: '20px', padding: '36px 28px',
                border: p.highlight ? '2px solid #FC6E20' : '1px solid var(--border)',
                background: p.highlight ? '#292929' : 'white',
                position: 'relative',
              }}>
                {p.highlight && (
                  <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gradient-orange)', color: '#292929', borderRadius: '999px', padding: '4px 16px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>Most Popular</div>
                )}
                <h3 style={{ fontSize: '20px', marginBottom: '8px', color: p.highlight ? 'white' : '#292929' }}>{p.plan}</h3>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 800, color: p.highlight ? '#FC6E20' : '#292929', marginBottom: '20px' }}>{p.price}</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: p.highlight ? 'rgba(255,255,255,0.8)' : 'var(--text)' }}>
                      <span style={{ background: p.highlight ? '#FC6E20' : '#292929', color: p.highlight ? '#292929' : '#FC6E20', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="#request" className={p.highlight ? 'btn btn-primary' : 'btn btn-outline'} style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                  Get This Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Request Form ── */}
      <section id="request" className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>Request Maintenance Service</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px' }}>Tell us what needs fixing. We'll schedule a visit.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px' }}>
            <MaintenanceLeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
