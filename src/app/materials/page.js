import Link from 'next/link';
import MaterialLeadForm from './MaterialLeadForm';

export const metadata = {
  title: 'Construction Material Quote Marketplace | Buildogram',
  description: 'Buy cement, steel, sand, blocks, tiles and all construction materials with competitive quote routing and material proof records.',
};

const categories = [
  { icon: '🏭', name: 'Cement', brands: 'UltraTech, Ramco, Dalmia, Chettinad', href: '/materials/cement' },
  { icon: '⚙️', name: 'Steel (TMT)', brands: 'Tata Tiscon, SAIL, Vizag, JSW', href: '/materials/steel' },
  { icon: '🪨', name: 'Sand & M-Sand', brands: 'River sand, M-Sand, P-Sand', href: '/materials/sand' },
  { icon: '🧱', name: 'Blocks & Bricks', brands: 'Solid blocks, Hollow blocks, Red brick', href: '/materials/blocks' },
  { icon: '🔌', name: 'Electrical', brands: 'Havells, Legrand, Finolex, Polycab', href: '/materials/electrical' },
  { icon: '🚿', name: 'Plumbing', brands: 'Ashirvad, Supreme, Finolex pipes', href: '/materials/plumbing' },
  { icon: '🏠', name: 'Tiles & Flooring', brands: 'Asian, Kajaria, Johnson, Orient', href: '/materials/tiles' },
  { icon: '🎨', name: 'Paint', brands: 'Asian Paints, Berger, Nerolac, Dulux', href: '/materials/paint' },
];

const whyBuildogram = [
  { icon: '💰', title: 'Competitive Quote Routing', desc: 'Submit one request and we route it to our supplier network to help you find competitive quotes.' },
  { icon: '📦', title: 'Delivery Record Where Available', desc: 'Delivery records where submitted — brand, quantity and batch noted when provided by supplier.' },
  { icon: '📄', title: 'Test Certificates', desc: 'Request test certificates for steel, cement and key structural materials where available.' },
  { icon: '🛂', title: 'Passport Entry', desc: 'Materials can be logged in your Property Passport for project records.' },
  { icon: '🔄', title: 'Supplier Comparison', desc: 'Compare quotes from multiple suppliers in our network before committing.' },
  { icon: '📋', title: 'One Request, Many Quotes', desc: 'One material request form — we handle supplier coordination and quote collection for you.' },
];

export default function MaterialsPage() {
  return (
    <div className="marketplacePage">
      {/* ── Hero ── */}
      <section className="fullBleedSection" style={{ background: 'var(--secondary)', color: 'white', padding: 'clamp(48px, 6vw, 88px) 0 clamp(56px, 7vw, 104px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="sectionInnerWide" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Material Marketplace</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(38px, 5vw, 64px)', lineHeight: 1.1, marginBottom: '24px' }}>
            Buy Construction Materials<br />
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>with Verified Proof.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Cement, steel, sand, blocks, electrical, plumbing, tiles, paint — with competitive quote routing and delivery records where submitted by supplier.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>Request Current Rate</Link>
            <Link href="/cost-estimator" className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', borderColor: 'rgba(255,255,255,0.2)', padding: '16px 32px', fontSize: '16px' }}>Estimate Materials</Link>
          </div>
        </div>
      </section>

      {/* ── Material Categories ── */}
      <section className="fullBleedSection" style={{ background: '#F9F9F9', padding: 'clamp(64px, 8vw, 112px) 0' }}>
        <div className="sectionInnerWide">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: '999px', padding: '0.4rem 0.8rem', background: 'rgba(252, 110, 32, 0.1)', color: 'var(--primary)', border: '1px solid rgba(252, 110, 32, 0.2)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Material Categories</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginTop: '20px', fontFamily: '"Space Grotesk", sans-serif', color: 'var(--secondary)' }}>All construction materials. One request.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {categories.map(c => (
              <Link key={c.name} href={c.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px 24px', textAlign: 'center', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }} className="card-hover">
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>{c.icon}</div>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#292929', fontFamily: '"Space Grotesk", sans-serif' }}>{c.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5 }}>{c.brands}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Buildogram ── */}
      <section className="fullBleedSection" style={{ background: 'white', padding: 'clamp(64px, 8vw, 112px) 0', borderTop: '1px solid var(--border)' }}>
        <div className="sectionInnerWide">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: '999px', padding: '0.4rem 0.8rem', background: 'rgba(252, 110, 32, 0.1)', color: 'var(--primary)', border: '1px solid rgba(252, 110, 32, 0.2)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Why Buildogram Materials</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginTop: '20px', fontFamily: '"Space Grotesk", sans-serif', color: 'var(--secondary)' }}>Not just materials. Verified materials.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {whyBuildogram.map(w => (
              <div key={w.title} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '32px', borderRadius: '24px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                <div style={{ fontSize: '36px', flexShrink: 0 }}>{w.icon}</div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--secondary)' }}>{w.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Form ── */}
      <section id="quote" className="fullBleedSection" style={{ background: 'var(--secondary)', padding: 'clamp(64px, 8vw, 112px) 0' }}>
        <div className="sectionInnerWide" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '16px', fontFamily: '"Space Grotesk", sans-serif' }}>Request Material Quote</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>Tell us what materials you need. We'll share competitive quotes within 24 hours.</p>
          </div>
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '24px', padding: '48px' }}>
            <MaterialLeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}
