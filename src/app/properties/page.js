import Link from 'next/link';

export const metadata = {
  title: '360° Verified Properties | Buildogram',
  description: 'Rent or buy premium, verified homes with immersive 360° virtual tours.',
};

export default function PropertiesHubPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: '#292929', color: 'white', padding: '40px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% -20%, rgba(255,218,1,0.15) 0%, transparent 70%)' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,218,1,0.1)', border: '1px solid rgba(255,218,1,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
            <span style={{ color: '#FFDA01', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Zero Brokerage · 100% Verified</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1, marginBottom: '24px' }}>
            First Visit From <span style={{ color: '#FFDA01' }}>Home.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '20px', lineHeight: 1.6, marginBottom: '40px' }}>
            Explore premium rental and resale properties through immersive 360° virtual tours. No hidden surprises.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/properties/rent" className="btn btn-primary btn-lg" style={{ minWidth: '180px', justifyContent: 'center' }}>
              Explore Rentals
            </Link>
            <Link href="/properties/buy" className="btn btn-lg" style={{ minWidth: '180px', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
              Explore Resales
            </Link>
          </div>
        </div>
      </section>

      {/* ── Owner CTA ── */}
      <section className="section" style={{ background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="card" style={{ padding: '48px', textAlign: 'center', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 12px 40px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📸</div>
            <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>List Your Property</h2>
            <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
              Have a property to rent or sell? Stand out with a 360° tour and our Property Passport. Get verified leads, faster.
            </p>
            <Link href="/properties/list-your-property" className="btn btn-primary btn-lg">
              List Your Property Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
