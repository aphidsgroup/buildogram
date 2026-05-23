import sql from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60; // ISR cache for 60 seconds

const RECORD_SECTIONS = [
  { key: 'has_legal_docs',        icon: '📄', label: 'Legal & Approvals' },
  { key: 'has_drawings',          icon: '📐', label: 'Architectural Drawings' },
  { key: 'has_boq',               icon: '📊', label: 'Detailed BOQ' },
  { key: 'has_materials',         icon: '🧱', label: 'Material Specifications' },
  { key: 'has_quality_checks',    icon: '✅', label: 'Quality Control Reports' },
  { key: 'has_progress_media',    icon: '📸', label: 'Construction Media' },
  { key: 'has_warranty',          icon: '🔒', label: 'Warranty Certificates' },
  { key: 'has_maintenance_history', icon: '🔧', label: 'Maintenance History' },
];

function CompletenessRing({ pct, size = 64 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const fill = circ - (pct / 100) * circ;
  const color = pct >= 80 ? '#059669' : pct >= 50 ? '#d97706' : '#dc2626';
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} stroke="#e2e8f0" strokeWidth="6" fill="none" />
      <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="6" fill="none" strokeDasharray={circ} strokeDashoffset={fill} strokeLinecap="round" />
      <text x="50%" y="54%" textAnchor="middle" style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%', fontSize: size > 50 ? '14px' : '11px', fontWeight: 800, fill: color, fontFamily: 'Space Grotesk, sans-serif' }}>
        {pct}%
      </text>
    </svg>
  );
}

export default async function PublicPassportPage({ params }) {
  const { id } = await params;
  
  // Basic UUID validation
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) return notFound();

  let property;
  try {
    const [res] = await sql`SELECT * FROM properties WHERE id = ${id}`;
    property = res;
  } catch (e) {
    return notFound();
  }
  
  if (!property) return notFound();

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      {/* ── Public Topbar ── */}
      <header style={{ background: '#292929', padding: '16px 0', borderBottom: '4px solid #FFDA01' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'white', fontWeight: 800, fontSize: '20px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#FFDA01' }}>⬡</span> Buildogram
          </Link>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '999px', fontSize: '13px', color: 'rgba(255,255,255,0.9)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🛂</span> Verified Property Passport™
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
        
        {/* Cover / Header Section */}
        <div className="card" style={{ padding: '32px', marginBottom: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px', marginBottom: '24px' }}>
            <CompletenessRing pct={property.passport_completeness || 0} size={88} />
            <div>
              <h1 style={{ fontSize: '28px', marginBottom: '8px', lineHeight: 1.2, color: '#0f172a' }}>{property.title}</h1>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, textTransform: 'capitalize' }}>
                  {property.property_type}
                </span>
                <span style={{ color: '#64748b', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>📍</span> {property.locality ? `${property.locality}, ` : ''}{property.city}
                </span>
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Physical Specifications</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  ['Plot Area', property.plot_area_sqft ? `${property.plot_area_sqft} sqft` : '—'],
                  ['Built-up Area', property.built_up_area_sqft ? `${property.built_up_area_sqft} sqft` : '—'],
                  ['Floors', property.floors || '—'],
                  ['Year of Construction', property.construction_year || '—'],
                  ['Bedrooms', property.bedrooms || '—'],
                  ['Facing', property.facing || '—'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed #e2e8f0' }}>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>{k}</span>
                    <span style={{ color: '#0f172a', fontWeight: 600, fontSize: '14px' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Verified Vault</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {RECORD_SECTIONS.map(s => {
                  const active = property[s.key];
                  return (
                    <div key={s.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: active ? '#f8fafc' : 'white', border: active ? '1px solid #cbd5e1' : '1px dashed #e2e8f0', borderRadius: '8px', opacity: active ? 1 : 0.5 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '16px' }}>{s.icon}</span>
                        <span style={{ color: '#0f172a', fontWeight: active ? 600 : 400, fontSize: '14px' }}>{s.label}</span>
                      </div>
                      {active ? (
                        <span style={{ color: '#059669', fontSize: '11px', fontWeight: 700 }}>VERIFIED</span>
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '11px' }}>PENDING</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── 360 Virtual Tour (for Rentals) ── */}
        {property.listing_type === 'rental' && (
          <div className="card" style={{ padding: '32px', marginBottom: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>👓 360° Virtual Tour</h3>
                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Explore every room before scheduling a visit.</p>
              </div>
              <div style={{ background: '#FFDA01', color: '#292929', padding: '6px 14px', borderRadius: '8px', fontSize: '18px', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }}>
                ₹{Number(property.listing_rent_monthly).toLocaleString('en-IN')}/mo
              </div>
            </div>
            <div style={{ height: '400px', background: '#1e293b', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.2, background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }} />
              <span style={{ fontSize: '48px', marginBottom: '16px', position: 'relative', zIndex: 1 }}>📸</span>
              <p style={{ fontSize: '16px', fontWeight: 600, position: 'relative', zIndex: 1, margin: 0 }}>Interactive 360° Tour Viewer</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', position: 'relative', zIndex: 1, marginTop: '8px' }}>(Matterport / Kuula integration goes here)</p>
            </div>
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <Link href="/contact" className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: 'center' }}>Schedule Physical Visit</Link>
              <button className="btn btn-lg" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', flex: 1, justifyContent: 'center' }}>Apply for Rent</button>
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '24px', flexShrink: 0 }}>🛡️</div>
          <div>
            <h4 style={{ color: '#065f46', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>What is a Property Passport™?</h4>
            <p style={{ color: '#047857', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
              This property's construction quality, specifications, and legal status have been verified and documented by Buildogram. 
              The completeness score reflects the percentage of critical documentation available in the owner's private vault.
            </p>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{ background: 'white', borderTop: '1px solid #e2e8f0', padding: '32px 0', textAlign: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Powered by <Link href="/" style={{ color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Buildogram</Link> — The standard for construction quality.
        </p>
      </footer>
    </div>
  );
}
