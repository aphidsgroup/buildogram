import Link from 'next/link';
import MaterialLeadForm from './MaterialLeadForm';

export const metadata = {
  title: 'Construction Material Quote Marketplace | Buildogram',
  description: 'Buy cement, steel, sand, blocks, tiles and all construction materials at market-best rates with delivery verification and material proof records.',
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
  { icon: '💰', title: 'Market-Best Rates', desc: 'We compare rates across trusted suppliers and negotiate best prices for you.' },
  { icon: '✅', title: 'Verified Delivery', desc: 'Every delivery is photo-verified — brand, quantity and batch confirmed.' },
  { icon: '📄', title: 'Test Certificates', desc: 'Get test certificates for steel, cement and key structural materials.' },
  { icon: '🛂', title: 'Passport Entry', desc: 'All materials auto-logged in your Property Passport for lifetime records.' },
  { icon: '🔄', title: 'Supplier Comparison', desc: 'We send your requirement to multiple suppliers and show you the best quotes.' },
  { icon: '📦', title: 'One Request, Many Quotes', desc: 'One material request form — we handle supplier coordination for you.' },
];

export default function MaterialsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '40px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Material Marketplace</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(34px, 5vw, 60px)', lineHeight: 1.1, marginBottom: '24px' }}>
            Buy Construction Materials<br />
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>with Verified Proof.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Cement, steel, sand, blocks, electrical, plumbing, tiles, paint — at market-best rates with delivery verification and material proof records.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#quote" className="btn btn-primary btn-lg">Request Material Quote</Link>
            <Link href="/cost-estimator" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>Estimate Materials</Link>
          </div>
        </div>
      </section>

      {/* ── Material Categories ── */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">Material Categories</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px' }}>All construction materials. One request.</h2>
          </div>
          <div className="grid-4">
            {categories.map(c => (
              <Link key={c.name} href={c.href} style={{ textDecoration: 'none' }}>
                <div className="card card-hover" style={{ textAlign: 'center', padding: '24px 16px' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>{c.icon}</div>
                  <h3 style={{ fontSize: '17px', marginBottom: '8px', color: '#292929' }}>{c.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: 1.5 }}>{c.brands}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Buildogram ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">Why Buildogram Materials</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px' }}>Not just materials. Verified materials.</h2>
          </div>
          <div className="grid-3">
            {whyBuildogram.map(w => (
              <div key={w.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '32px', flexShrink: 0 }}>{w.icon}</div>
                <div>
                  <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>{w.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Form ── */}
      <section id="quote" className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>Request Material Quote</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px' }}>Tell us what materials you need. We'll share competitive quotes within 24 hours.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px' }}>
            <MaterialLeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
