import { notFound } from 'next/navigation';
import sql from '@/lib/db';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { id } = await params;
  
  // UUID validation to prevent DB errors
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) return { title: 'Partner Not Found' };

  const [partner] = await sql`
    SELECT name, metadata
    FROM leads
    WHERE id = ${id}
      AND lead_type = 'partner_application'
      AND metadata->>'verification_status' = 'verified'
      AND metadata->>'public_status' = 'published'
  `;

  if (!partner) return { title: 'Partner Not Found' };

  return {
    title: `${partner.metadata.business_name} - Buildogram Verified Partner`,
    description: `${partner.metadata.partner_category} based in ${partner.metadata.service_areas}. Contact them via Buildogram.`,
  };
}

export default async function PartnerProfilePage({ params }) {
  const { id } = await params;
  
  // UUID validation
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) notFound();

  // Strict query: MUST be verified and published
  const [partner] = await sql`
    SELECT id, name, city, locality, metadata, created_at
    FROM leads
    WHERE id = ${id}
      AND lead_type = 'partner_application'
      AND metadata->>'verification_status' = 'verified'
      AND metadata->>'public_status' = 'published'
  `;

  if (!partner) notFound();

  const m = partner.metadata;
  const joinYear = new Date(partner.created_at).getFullYear();

  // Secure external link formatting
  const igLink = m.instagram_url 
    ? (m.instagram_url.startsWith('http') ? m.instagram_url : `https://instagram.com/${m.instagram_url.replace('@', '')}`)
    : null;
    
  const websiteLink = m.website_url 
    ? (m.website_url.startsWith('http') ? m.website_url : `https://${m.website_url}`)
    : null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* ── Cover / Hero ── */}
      <div style={{ height: '200px', background: 'var(--secondary)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(204,255,0,0.08) 0%, transparent 55%)' }} />
      </div>

      <div className="container mx-auto max-w-4xl px-4" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
        
        {/* Main Card */}
        <div className="card" style={{ padding: '40px', background: 'white', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '999px', fontSize: '13px', fontWeight: 700, border: '1px solid #a7f3d0' }}>
                  ✓ Buildogram Verified
                </span>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Partner since {joinYear}</span>
              </div>
              
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', lineHeight: 1.1 }}>
                {m.business_name}
              </h1>
              <div style={{ fontSize: '18px', color: '#475569', fontWeight: 500, marginBottom: '20px' }}>
                {m.partner_category} · {partner.city}
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '200px' }}>
              <Link href="/contact" className="btn btn-primary" style={{ justifyContent: 'center', padding: '14px 24px', fontSize: '15px' }}>
                Contact via Buildogram
              </Link>
              <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'center', lineHeight: 1.4 }}>
                We route requests to verified partners to ensure accountability and quality.
              </div>
            </div>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid #e2e8f0', margin: '32px 0' }} />

          {/* Details Grid */}
          <div className="grid-2" style={{ gap: '40px' }}>
            
            {/* Left Col */}
            <div>
              {m.services_offered && (
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Services Offered</h3>
                  <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {m.services_offered}
                  </p>
                </div>
              )}

              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Service Areas</h3>
                <div style={{ fontSize: '15px', color: '#334155', fontWeight: 500 }}>
                  📍 {m.service_areas}
                </div>
              </div>

              {m.years_experience && (
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Experience</h3>
                  <div style={{ fontSize: '15px', color: '#334155', fontWeight: 500 }}>
                    ⏳ {m.years_experience}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col */}
            <div>
              {(websiteLink || igLink || m.portfolio_links) && (
                <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Links & Portfolio</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {websiteLink && (
                      <a href={websiteLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'white', borderRadius: '8px', border: '1px solid #cbd5e1' }}>🌐</span>
                        Visit Website ↗
                      </a>
                    )}
                    
                    {igLink && (
                      <a href={igLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'white', borderRadius: '8px', border: '1px solid #cbd5e1', color: '#e1306c' }}>📸</span>
                        Instagram Profile ↗
                      </a>
                    )}

                    {m.portfolio_links && (
                      <div style={{ marginTop: '8px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>Portfolio Link:</div>
                        <div style={{ fontSize: '14px', color: '#334155', wordBreak: 'break-all' }}>{m.portfolio_links}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Buildogram Trust Box */}
              <div style={{ marginTop: '24px', padding: '24px', background: '#fffbeb', borderRadius: '16px', border: '1px solid #fde68a' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#92400e', marginBottom: '8px' }}>Why book through Buildogram?</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li style={{ fontSize: '13px', color: '#78350f', display: 'flex', gap: '8px' }}><span>✓</span> Payment milestones protection</li>
                  <li style={{ fontSize: '13px', color: '#78350f', display: 'flex', gap: '8px' }}><span>✓</span> Verified material supply</li>
                  <li style={{ fontSize: '13px', color: '#78350f', display: 'flex', gap: '8px' }}><span>✓</span> Dedicated Ops Manager</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
