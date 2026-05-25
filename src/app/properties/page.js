import Link from 'next/link';

export const metadata = {
  title: 'Property Portals | Buy/Sell and Rent/Lease Properties | Buildogram',
  description: 'Buildogram connects users to dedicated property portals: RealPropRealty for buy/sell properties and ToLetBoardChennai for rent/lease property opportunities.',
};

export default function PropertiesHubPage() {
  return (
    <div className="marketplacePage">
      {/* ── Hero ── */}
      <section className="fullBleedSection" style={{ background: '#292929', color: 'white', padding: 'clamp(48px, 6vw, 88px) 0 clamp(56px, 7vw, 104px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% -20%, rgba(252, 110, 32, 0.15) 0%, transparent 70%)' }} />
        <div className="sectionInnerWide" style={{ position: 'relative', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
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
      <section className="fullBleedSection" style={{ background: '#F8FAFC', padding: 'clamp(64px, 8vw, 112px) 0' }}>
        <div className="sectionInnerWide" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            
            {/* Card 1 */}
            <div style={{ padding: '48px 40px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', boxShadow: '0 12px 40px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '48px', marginBottom: '24px' }}>🏢</div>
              <h3 style={{ fontSize: '28px', color: '#292929', marginBottom: '16px' }}>Buy/Sell Properties</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '17px', lineHeight: 1.6, marginBottom: '32px', flexGrow: 1 }}>
                RealPropRealty helps users explore property buying and selling opportunities with a dedicated property-first experience, complete with 360° tours and verified builder listings.
              </p>
              <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 24px', fontSize: '16px', justifyContent: 'center' }}>
                Explore RealPropRealty <span>↗</span>
              </a>
            </div>

            {/* Card 2 */}
            <div style={{ padding: '48px 40px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', boxShadow: '0 12px 40px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '48px', marginBottom: '24px' }}>🔑</div>
              <h3 style={{ fontSize: '28px', color: '#292929', marginBottom: '16px' }}>Rent/Lease Properties</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '17px', lineHeight: 1.6, marginBottom: '32px', flexGrow: 1 }}>
                ToLetBoardChennai helps users explore rental and lease property opportunities with a focused rental-first experience and direct owner connections.
              </p>
              <a href="https://toletboardchennai.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 24px', fontSize: '16px', justifyContent: 'center' }}>
                Explore ToLetBoardChennai <span>↗</span>
              </a>
            </div>

          </div>

          <div style={{ textAlign: 'center', padding: '48px', background: 'white', border: '1px solid var(--border)', borderRadius: '24px', marginTop: '48px' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Need Construction Help?</h3>
            <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '700px', margin: '0 auto 24px' }}>
              Buildogram remains the marketplace layer for construction support, partner discovery, material quotes, Property Passport records, BOQ clarity, and maintenance services.
            </p>
            <Link href="/" className="btn btn-outline" style={{ display: 'inline-block' }}>Explore Construction Ecosystem</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
