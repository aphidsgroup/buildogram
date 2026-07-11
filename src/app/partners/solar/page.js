import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Solar Panel Installers in Chennai | MNRE Approved Solar Partners | Buildogram',
  description: 'Find verified solar panel installers in Chennai. MNRE-approved, CET-certified, with on-grid and off-grid installation expertise for residential and commercial projects.',
  path: '/partners/solar',
});

const CRITERIA = [
  { icon: '☀️', title: 'MNRE Empanelment', desc: 'Listed with Ministry of New and Renewable Energy (MNRE) and Tamil Nadu Energy Development Agency (TEDA) — mandatory for grid-connected solar subsidies.' },
  { icon: '🏅', title: 'ALMM-Listed Panels Only', desc: 'Only use panels from the Approved List of Models and Manufacturers (ALMM) by MNRE. Ensures subsidy eligibility and quality compliance.' },
  { icon: '⚡', title: 'TANGEDCO Coordination', desc: 'Experience handling TANGEDCO grid connection applications, net metering agreements and synchronization testing — the most complex part of any rooftop solar installation in Chennai.' },
  { icon: '🛡️', title: '10-Year Workmanship Warranty', desc: 'Structural mounting, wiring, earthing, and inverter installation covered. Panel manufacturer warranties (typically 25 years) transferred directly to client.' },
];

const SYSTEMS = [
  { name: 'On-Grid (Grid-Tied)', desc: 'Most popular for homes and offices. Connected to TANGEDCO grid. Excess power exported; net metering credits reduce electricity bill. 3 kW systems start at ₹1.5–2L (post PM-Surya Ghar subsidy).', icon: '🔌', badge: 'Most Popular' },
  { name: 'Off-Grid (Battery Backup)', desc: 'Independent of TANGEDCO. Works during power cuts. Higher cost due to battery bank. Ideal for areas with frequent load-shedding or remote locations.', icon: '🔋', badge: 'Backup Power' },
  { name: 'Hybrid Systems', desc: 'On-grid with battery backup. Grid-connected during stable supply; seamless battery switchover during outages. Best of both worlds at higher upfront cost.', icon: '⚡', badge: 'Premium' },
];

const SUBSIDY = [
  { program: 'PM-Surya Ghar (2024)', amount: 'Up to ₹78,000 for 3 kW system', coverage: 'Residential systems up to 3 kW' },
  { program: 'TEDA Tamil Nadu Subsidy', amount: '20–40% of system cost', coverage: 'State top-up for residential solar' },
  { program: 'Net Metering Benefit', amount: 'Earn ₹4–6 per unit exported', coverage: 'TANGEDCO export tariff for surplus generation' },
];

export default function SolarPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Solar Partners</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>Solar Panel Installers in Chennai</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '620px', lineHeight: 1.7, marginBottom: '32px' }}>MNRE-empanelled solar installers with TANGEDCO grid connection experience — maximize PM Surya Ghar subsidies with verified experts.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=solar-quote" className="btn btn-primary btn-lg">Get Solar Quote</Link>
            <Link href="/join-as-partner" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Join as Solar Partner</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Our Solar Partner Verification Criteria</h2>
          <div className="grid-2" style={{ gap: '20px' }}>
            {CRITERIA.map(c => (
              <div key={c.title} className="card" style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '6px' }}>{c.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Solar System Types</h2>
          <div className="grid-3" style={{ gap: '20px' }}>
            {SYSTEMS.map(s => (
              <div key={s.name} className="card" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--primary)', color: 'white', fontSize: '11px', fontWeight: 700, padding: '2px 10px', borderRadius: '999px' }}>{s.badge}</div>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{s.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{s.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '56px', background: 'rgba(252,110,32,0.04)', border: '1px solid rgba(252,110,32,0.12)', borderRadius: 'var(--radius-lg)', padding: '36px' }}>
          <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '20px' }}>Subsidies & Incentives Available in Tamil Nadu (2025)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SUBSIDY.map(s => (
              <div key={s.program} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', padding: '16px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '14px' }}>{s.program}</div>
                <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '14px' }}>{s.amount}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{s.coverage}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>☀️</div>
            <h3 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '8px' }}>Get a Solar Quote</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>We match you with MNRE-approved solar installers and help you maximize your subsidy eligibility.</p>
            <Link href="/contact?type=solar-quote" className="btn btn-primary">Get Quote</Link>
          </div>
          <div className="card" style={{ background: 'var(--secondary)', textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🔋</div>
            <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>Solar Installer? Join Us</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>Get quality Chennai residential and commercial solar leads from our verified partner network.</p>
            <Link href="/join-as-partner" className="btn btn-primary">Apply to Join</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Partners', path: '/partners' }, { name: 'Solar Installers', path: '/partners/solar' }]} />
    </>
  );
}
