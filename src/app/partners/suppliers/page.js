import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Material Suppliers in Chennai | Verified Construction Suppliers | Buildogram',
  description: 'Connect with verified cement, TMT steel, M-sand, AAC block and RMC suppliers in Chennai. All suppliers MTC-verified, weighbridge-checked with transparent pricing.',
  path: '/partners/suppliers',
});

const VERIFICATION = [
  { icon: '📄', title: 'GST & Trade License', desc: 'Valid GST registration and trade license verified for all listed suppliers. Invoicing compliance mandatory.' },
  { icon: '🏭', title: 'Manufacturer Authorization', desc: 'For brand-specific products (e.g., UltraTech cement, Tata Tiscon steel), supplier must hold a valid dealer authorization letter from the manufacturer.' },
  { icon: '⚖️', title: 'Weighbridge Slip History', desc: 'Delivery weight verification using NABL-certified weighbridges. We audit past weighbridge slips and cross-check against invoiced quantities.' },
  { icon: '📋', title: 'MTC Documentation Practice', desc: 'Suppliers must consistently provide Manufacturer Test Certificates with every structural material batch. No MTC = no delivery accepted.' },
];

const CATEGORIES = [
  { icon: '🏗️', name: 'Cement Suppliers', brands: 'UltraTech · Dalmia · Ramco · India Cements', note: 'OPC 53, PPC, PSC grades. Batch date verified — no cement >90 days old.' },
  { icon: '⚙️', name: 'TMT Steel Dealers', brands: 'Tata Tiscon · JSW · SAIL · RINL', note: 'Fe500D and CRS grades for coastal projects. With mill test certificates.' },
  { icon: '🏖️', name: 'M-Sand & P-Sand', brands: 'IS 383 Grade II & III', note: 'Quarry-approved, particle size tested. No silt-laden natural river sand.' },
  { icon: '🧱', name: 'AAC Block Suppliers', brands: 'Nuvoco · SIPOREX · Premium AAC', note: 'IS 2185 Part 3 grade blocks. Density, strength, and moisture certificates.' },
  { icon: '🪨', name: 'Ready Mix Concrete', brands: 'UltraTech RMC · Prism · ACC', note: 'M20–M40 grades. Slump tests and cube samples at delivery.' },
];

export default function SuppliersPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Partner Directory</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>Verified Material Suppliers in Chennai</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '620px', lineHeight: 1.7, marginBottom: '32px' }}>MTC-verified, weighbridge-checked material suppliers with manufacturer authorization — sourced at Broadway wholesale pricing.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=material-quote" className="btn btn-primary btn-lg">Get Material Quote</Link>
            <Link href="/materials" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Browse Materials</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Supplier Verification Standards</h2>
          <div className="grid-2" style={{ gap: '20px' }}>
            {VERIFICATION.map(v => (
              <div key={v.title} className="card" style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{v.icon}</span>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '6px' }}>{v.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Material Categories</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CATEGORIES.map(c => (
              <div key={c.name} className="card" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '20px', alignItems: 'center' }}>
                <span style={{ fontSize: '28px' }}>{c.icon}</span>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '4px' }}>{c.name}</h3>
                  <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, marginBottom: '2px' }}>{c.brands}</div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{c.note}</p>
                </div>
                <Link href="/contact?type=material-quote" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', textDecoration: 'none' }}>Get Quote →</Link>
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>📦</div>
            <h3 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '8px' }}>Request Material Quote</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>Share your BOQ quantities and we get you same-day wholesale quotes from verified suppliers.</p>
            <Link href="/contact?type=material-quote" className="btn btn-primary">Request Quote</Link>
          </div>
          <div className="card" style={{ background: 'var(--secondary)', textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🏭</div>
            <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>Supplier? Join Our Network</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>Become a verified Buildogram material supplier and access consistent B2B project procurement.</p>
            <Link href="/join-as-partner" className="btn btn-primary">Join as Supplier</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Partners', path: '/partners' }, { name: 'Suppliers', path: '/partners/suppliers' }]} />
    </>
  );
}
