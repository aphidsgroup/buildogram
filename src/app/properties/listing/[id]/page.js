import { notFound } from 'next/navigation';
import Link from 'next/link';
import sql from '@/lib/db';
import InquiryForm from './InquiryForm';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const [listing] = await sql`
    SELECT city, locality, metadata
    FROM leads
    WHERE id = ${id}
      AND lead_type = 'property_listing'
      AND metadata->>'public_status' = 'published'
  `;
  if (!listing) return { title: 'Listing Not Found | Buildogram' };
  
  const type = (listing.metadata?.listing_type || 'Property').charAt(0).toUpperCase() + (listing.metadata?.listing_type || 'property').slice(1);
  return {
    title: `${type} in ${listing.locality || listing.city} | Buildogram`,
    description: `Verified ${type.toLowerCase()} in ${listing.locality || listing.city} with 360° virtual tour.`,
  };
}

export default async function PropertyListingDetailPage({ params }) {
  const { id } = await params;

  let listing = null;
  try {
    const [row] = await sql`
      SELECT id, city, locality, message, metadata, created_at
      FROM leads
      WHERE id = ${id}
        AND lead_type = 'property_listing'
        AND metadata->>'public_status' = 'published'
    `;
    listing = row;
  } catch (e) {
    console.error('Failed to fetch listing detail:', e);
  }

  if (!listing) return notFound();

  const m = listing.metadata || {};
  const fmt = n => n ? '₹' + Number(n).toLocaleString('en-IN') : '—';
  const isRent = m.listing_type === 'rent' || m.listing_type === 'lease';

  return (
    <main style={{ background: '#F8FAFC', minHeight: '80vh', paddingBottom: '80px' }}>
      
      {/* ── 360 Tour Viewer ── */}
      <section style={{ background: '#000' }}>
        <div className="container" style={{ padding: 0, maxWidth: '1200px', margin: '0 auto' }}>
          {m.tour_embed_url ? (
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#111' }}>
              <iframe
                src={m.tour_embed_url}
                frameBorder="0"
                allowFullScreen
                title="TeleportMe 360 Tour"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              ></iframe>
            </div>
          ) : (
            <div style={{ width: '100%', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1e293b', color: 'white' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📸</div>
              <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>360° Tour Coming Soon</h2>
              <p style={{ color: '#94a3b8' }}>We are currently processing the virtual tour for this property.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Details ── */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="grid-2" style={{ gap: '40px', alignItems: 'start' }}>
            
            {/* Left Col: Info */}
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <span style={{ padding: '4px 12px', background: '#e2e8f0', color: '#475569', borderRadius: '999px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                  {m.property_type || 'Property'}
                </span>
                <span style={{ padding: '4px 12px', background: '#fef3c7', color: '#b45309', borderRadius: '999px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                  For {m.listing_type}
                </span>
                <span style={{ padding: '4px 12px', background: '#dcfce7', color: '#166534', borderRadius: '999px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                  Verified ✓
                </span>
              </div>

              <h1 style={{ fontSize: '32px', marginBottom: '8px', color: '#0f172a', lineHeight: 1.2 }}>
                {m.property_size_sqft ? `${m.property_size_sqft} sqft ` : ''}{m.property_type ? (m.property_type.charAt(0).toUpperCase() + m.property_type.slice(1)) : 'Property'} in {listing.locality || listing.city}
              </h1>
              <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '32px' }}>
                📍 {listing.locality ? `${listing.locality}, ` : ''}{listing.city}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>{isRent ? 'Expected Rent' : 'Expected Price'}</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', fontFamily: 'Space Grotesk, sans-serif' }}>{fmt(m.expected_price)}</div>
                </div>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Property Size</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', fontFamily: 'Space Grotesk, sans-serif' }}>{m.property_size_sqft ? `${m.property_size_sqft} sqft` : '—'}</div>
                </div>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Furnishing</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', textTransform: 'capitalize' }}>{m.furnishing_status || '—'}</div>
                </div>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Availability</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', textTransform: 'capitalize' }}>{m.availability?.replace(/_/g, ' ') || '—'}</div>
                </div>
              </div>

              {listing.message && (
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#0f172a' }}>About This Property</h3>
                  <div style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {listing.message}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Sticky Action Box */}
            <div style={{ position: 'sticky', top: '24px' }}>
              <InquiryForm listing={listing} />
              
              <div className="card mt-6" style={{ padding: '24px', background: 'white', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px', color: '#0f172a' }}>Have a property of your own?</h4>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>List it with Buildogram for free and get verified leads.</p>
                <Link href="/properties/list-your-property" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', border: '1px solid #cbd5e1' }}>
                  List Your Property
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
