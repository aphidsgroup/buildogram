import Link from 'next/link';
import sql from '@/lib/db';

export const revalidate = 60;

export const metadata = {
  title: '360° Verified Rentals | Buildogram',
  description: 'Rent premium, verified homes in Chennai with 360° virtual tours.',
};

export default async function PropertiesRentPage() {
  let listings = [];
  try {
    listings = await sql`
      SELECT id, city, locality, metadata
      FROM leads
      WHERE lead_type = 'property_listing'
        AND metadata->>'public_status' = 'published'
        AND metadata->>'listing_type' IN ('rent', 'lease')
      ORDER BY created_at DESC
    `;
  } catch (e) {
    console.error('Failed to fetch rent listings:', e);
  }

  const fmt = n => n ? '₹' + Number(n).toLocaleString('en-IN') : '—';

  return (
    <>
      <section style={{ background: '#292929', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Verified Rentals</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            Browse through 360° tours and find your perfect home without the surprises.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: '#F8FAFC', minHeight: '60vh' }}>
        <div className="container">
          {listings.length === 0 ? (
            <div className="card text-center" style={{ padding: '60px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏘️</div>
              <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>No Rentals Available</h2>
              <p className="text-muted">All our published rental properties are currently occupied. Check back soon!</p>
            </div>
          ) : (
            <div className="grid-3" style={{ gap: '24px' }}>
              {listings.map(l => (
                <Link key={l.id} href={`/properties/listing/${l.id}`} className="card" style={{ padding: 0, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                >
                  {/* Cover */}
                  <div style={{ height: '220px', background: '#1e293b', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '40px', zIndex: 1 }}>📸</span>
                    {l.metadata.tour_status === 'available' && (
                      <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: 'white' }}>
                        👓 360° Tour
                      </div>
                    )}
                    <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
                      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>Monthly Rent</div>
                      <div style={{ color: 'white', fontSize: '24px', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }}>
                        {fmt(l.metadata.expected_price)}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ padding: '20px' }}>
                    <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>📍</span> {l.locality ? `${l.locality}, ` : ''}{l.city}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Type</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', textTransform: 'capitalize' }}>{l.metadata.property_type || '—'}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Size</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{l.metadata.property_size_sqft ? `${l.metadata.property_size_sqft} sqft` : '—'}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Furnishing</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', textTransform: 'capitalize' }}>{l.metadata.furnishing_status || '—'}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
