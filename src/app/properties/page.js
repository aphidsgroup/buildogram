import Link from 'next/link';

export const metadata = {
  title: 'Property Portals | Buy/Sell and Rent/Lease Properties | Buildogram',
  description: 'Buildogram connects users to dedicated property portals: RealPropRealty for buy/sell properties and ToLetBoardChennai for rent/lease property opportunities.',
};

export default function PropertiesHubPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: '#292929', color: 'white', padding: '60px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% -20%, rgba(252, 110, 32, 0.15) 0%, transparent 70%)' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Property Portals</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1, marginBottom: '24px' }}>
            Property Portals Connected to <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>Buildogram</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '20px', lineHeight: 1.6, marginBottom: '40px' }}>
            Buildogram connects construction, property records, materials, partners, and property opportunities. For property discovery, use our dedicated portals for buy/sell and rent/lease needs.
          </p>
        </div>
      </section>

      {/* ── Portals ── */}
      <section className="section" style={{ background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="grid-2" style={{ gap: '24px' }}>
            
            {/* Card 1 */}
            <div className="card" style={{ padding: '40px', background: 'white', border: '1px solid #E2E8F0', boxShadow: '0 12px 40px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏢</div>
              <h3 style={{ fontSize: '24px', color: '#292929', marginBottom: '16px' }}>Buy/Sell Properties</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
                RealPropRealty helps users explore property buying and selling opportunities with a dedicated property-first experience.
              </p>
              <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Visit RealPropRealty <span>↗</span>
              </a>
            </div>

            {/* Card 2 */}
            <div className="card" style={{ padding: '40px', background: 'white', border: '1px solid #E2E8F0', boxShadow: '0 12px 40px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔑</div>
              <h3 style={{ fontSize: '24px', color: '#292929', marginBottom: '16px' }}>Rent/Lease Properties</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
                ToLetBoardChennai helps users explore rental and lease property opportunities with a focused rental-first experience.
              </p>
              <a href="https://toletboardchennai.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Visit ToLetBoardChennai <span>↗</span>
              </a>
            </div>

          </div>

          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '15px', marginTop: '48px', maxWidth: '700px', margin: '48px auto 0' }}>
            Buildogram remains the marketplace layer for construction support, partner discovery, material quotes, Property Passport records, BOQ clarity, and maintenance services.
          </p>
        </div>
      </section>
    </>
  );
}
