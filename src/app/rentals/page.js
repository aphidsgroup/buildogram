import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import sql from '@/lib/db';

export const revalidate = 60; // ISR cache

export const metadata = generateSEOMetadata({
title: 'Verified Rentals in Chennai | Buildogram Property Passport™',
  description: 'Rent premium, verified homes in Chennai. Zero broker fees. Every property comes with a verified Property Passport™ covering structural quality, plumbing, and electrical specs.',,
  path: '/rentals',
});

export default async function RentalsPage() {
  let rentals = [];
  try {
    rentals = await sql`
      SELECT id, title, property_type, city, locality, plot_area_sqft, built_up_area_sqft, floors, bedrooms, bathrooms, listing_rent_monthly, passport_completeness
      FROM properties
      WHERE listing_type = 'rental' AND listing_status IN ('listed', 'under_negotiation')
      ORDER BY created_at DESC
    `;
  } catch (e) {
    console.error('Failed to fetch rentals:', e);
  }

  const fmt = n => n ? '₹' + Number(n).toLocaleString('en-IN') : '—';

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: '#292929', color: 'white', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% -20%, rgba(252, 110, 32, 0.15) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: '720px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Zero Brokerage · 100% Verified</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1, marginBottom: '20px' }}>
            Rent a Home that comes with a <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>Verified Passport.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.6, marginBottom: '0' }}>
            No hidden plumbing issues. No electrical surprises. Every rental listed here was either built or audited by Buildogram engineers.
          </p>
        </div>
      </section>

      {/* ── Features Bar ── */}
      <section style={{ background: 'var(--gradient-orange)', padding: '24px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[
            { icon: '📸', text: '360° Virtual Tours' },
            { icon: '🛂', text: 'Verified Property Passport' },
            { icon: '🚫', text: 'Zero Brokerage Fees' },
            { icon: '🔧', text: 'Buildogram Maintenance' },
          ].map(f => (
            <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>{f.icon}</span>
              <span style={{ color: '#292929', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rental Grid ── */}
      <section className="section" style={{ background: '#F8FAFC', minHeight: '50vh' }}>
        <div className="container">
          {rentals.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏘️</div>
              <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>No Rentals Available Right Now</h2>
              <p style={{ color: '#64748b' }}>All our verified properties are currently occupied. Check back soon!</p>
            </div>
          ) : (
            <div className="grid-3" style={{ gap: '24px' }}>
              {rentals.map(p => (
                <Link key={p.id} href={`/passport/${p.id}`} className="card" style={{ padding: 0, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                >
                  {/* Image Placeholder (would be actual 360 cover in prod) */}
                  <div style={{ height: '220px', background: '#e2e8f0', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6))' }} />
                    <span style={{ fontSize: '40px', position: 'relative', zIndex: 1 }}>📸</span>
                    <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }} /> Available
                    </div>
                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      👓 360° Tour
                    </div>
                    <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Monthly Rent</div>
                        <div style={{ color: 'white', fontSize: '24px', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }}>{fmt(p.listing_rent_monthly)}</div>
                      </div>
                      <div style={{ background: 'var(--gradient-orange)', color: '#292929', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                        {p.passport_completeness}% VERIFIED
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', lineHeight: 1.3 }}>{p.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>📍</span> {p.locality ? `${p.locality}, ` : ''}{p.city}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Type</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', textTransform: 'capitalize' }}>{p.property_type}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Area</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{p.built_up_area_sqft || p.plot_area_sqft || '—'} sqft</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Format</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{p.bedrooms ? `${p.bedrooms} BHK` : '—'}</div>
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
