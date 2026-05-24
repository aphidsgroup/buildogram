import Link from 'next/link';
import { notFound } from 'next/navigation';
import sql from '@/lib/db';

const DEMO_PARTNERS = [
  { id: 'demo-1', metadata: { business_name: 'Premium Builders Co.', category: 'Builder', slug: 'demo-builder', location: 'Chennai', services_offered: ['Residential Construction', 'Turnkey Solutions'], shortDescription: 'Premium turnkey builders.' } },
  { id: 'demo-2', metadata: { business_name: 'Visionary Architects', category: 'Architect', slug: 'demo-architect', location: 'Chennai', services_offered: ['Architectural Design', 'Floor Planning'], shortDescription: 'Award-winning architecture.' } },
  { id: 'demo-3', metadata: { business_name: 'Elegant Interiors', category: 'Interior Designer', slug: 'demo-interior-designer', location: 'Chennai', services_offered: ['Interior Design', 'Modular Kitchens'], shortDescription: 'Luxury interior designs.' } },
  { id: 'demo-4', metadata: { business_name: 'Prime Materials', category: 'Material Supplier', slug: 'demo-material-supplier', location: 'Chennai', services_offered: ['Cement', 'Steel', 'Bricks'], shortDescription: 'Wholesale materials.' } },
  { id: 'demo-5', metadata: { business_name: 'Smart Home Solutions', category: 'Home Automation', slug: 'demo-home-automation', location: 'Chennai', services_offered: ['Lighting Automation', 'Security Systems'], shortDescription: 'Next-gen smart homes.' } },
  { id: 'demo-6', metadata: { business_name: 'SunPower Solar', category: 'Solar', slug: 'demo-solar', location: 'Chennai', services_offered: ['Solar Panels', 'Inverters'], shortDescription: 'Clean energy solutions.' } },
  { id: 'demo-7', metadata: { business_name: 'LiftTech Elevators', category: 'Elevators', slug: 'demo-elevator', location: 'Chennai', services_offered: ['Home Elevators', 'Commercial Lifts'], shortDescription: 'Safe and modern elevators.' } },
  { id: 'demo-8', metadata: { business_name: 'AquaSeal Experts', category: 'Waterproofing', slug: 'demo-waterproofing', location: 'Chennai', services_offered: ['Terrace Waterproofing', 'Basement Waterproofing'], shortDescription: '100% leak-proof solutions.' } }
];

export const dynamic = 'force-dynamic';

async function getPartner(slug) {
  const [partner] = await sql`
    SELECT id, city, metadata
    FROM leads
    WHERE lead_type = 'partner_application'
      AND metadata->>'public_status' = 'published'
      AND (metadata->>'slug' = ${slug} OR id::text = ${slug})
    LIMIT 1
  `;
  return partner || null;
}

async function getRelatedPartners(category, excludeSlug) {
  if (!category) return [];
  const partners = await sql`
    SELECT id, city, metadata
    FROM leads
    WHERE lead_type = 'partner_application'
      AND metadata->>'public_status' = 'published'
      AND metadata->>'category' = ${category}
      AND metadata->>'slug' != ${excludeSlug}
    ORDER BY created_at DESC
    LIMIT 3
  `;
  return partners;
}

export async function generateMetadata({ params }) {
  const partner = await getPartner(params.slug);
  if (!partner) return { title: 'Partner Not Found | Buildogram' };
  
  const meta = partner.metadata || {};
  const name = meta.business_name || meta.name || 'Partner';
  const category = meta.category || 'Service';

  return {
    title: `${name} - ${category} Partner in Chennai | Buildogram`,
    description: `View ${name} profile on Buildogram. Explore services, project gallery, videos, and request a quote for ${category} services.`,
  };
}

export default async function PartnerProfilePage({ params }) {
  let partner = await getPartner(params.slug);
  
  if (!partner) {
    partner = DEMO_PARTNERS.find(p => p.metadata.slug === params.slug);
    if (!partner) {
      notFound();
    }
  }

  const meta = partner.metadata || {};
  const name = meta.business_name || meta.name || 'Partner';
  const category = meta.category || 'Service Provider';
  const logoUrl = meta.logoUrl || null;
  const coverImageUrl = meta.coverImageUrl || null;
  const shortDescription = meta.shortDescription || meta.message || '';
  const fullDescription = meta.fullDescription || '';
  const location = meta.location || partner.city || 'Chennai';
  const experience = meta.yearsExperience || '';
  
  const services = meta.services_offered || meta.services || [];
  const specializations = meta.specializations || [];
  const certifications = meta.certifications || [];
  const brands = meta.brandsHandled || [];
  const projectTypes = meta.projectTypes || [];
  
  const galleryImages = meta.galleryImages || [];
  const videoGallery = meta.videoGallery || [];
  const projects = meta.projects || [];

  const relatedPartners = await getRelatedPartners(category, params.slug);

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Cover Image & Header */}
      <div style={{ height: '300px', background: coverImageUrl ? `url(${coverImageUrl}) center/cover` : 'var(--secondary)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
      </div>

      <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
        <div className="card" style={{ padding: '32px', marginBottom: '32px', display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* Logo */}
          <div style={{ width: '120px', height: '120px', borderRadius: '16px', background: 'white', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            {logoUrl ? (
              <img src={logoUrl} alt={`${name} Logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : (
              <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--text-muted)' }}>{name[0]}</div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span className="badge badge-orange">{category}</span>
              <span className="badge badge-green">Verified Partner</span>
            </div>
            <h1 style={{ fontSize: '32px', margin: '0 0 12px 0', color: 'var(--primary-dark)' }}>{name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', margin: '0 0 16px 0', lineHeight: 1.6 }}>{shortDescription}</p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>📍 {location}</span>
              {experience && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>⭐ {experience} Years Exp.</span>}
            </div>
          </div>

          <div style={{ width: '100%', maxWidth: '300px', background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '4px' }}>Work With {name}</div>
            <Link href="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Request Quote Through Buildogram</Link>
            <Link href="/contact" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Contact via Buildogram</Link>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', margin: '8px 0 0' }}>Buildogram guarantees pricing transparency.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '32px' }}>
          
          {/* Main Content Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* About */}
            {fullDescription && (
              <div className="card" style={{ padding: '32px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>About {name}</h2>
                <div style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '15px', whiteSpace: 'pre-wrap' }}>{fullDescription}</div>
              </div>
            )}

            {/* Services & Specializations */}
            {(services.length > 0 || specializations.length > 0) && (
              <div className="card" style={{ padding: '32px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Services & Specializations</h2>
                
                {services.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Services Offered</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {services.map((s, i) => <span key={i} className="tag">{s}</span>)}
                    </div>
                  </div>
                )}

                {specializations.length > 0 && (
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Specializations</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {specializations.map((s, i) => <span key={i} className="tag" style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #dcfce7' }}>{s}</span>)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Image Gallery */}
            <div className="card" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Image Gallery</h2>
              {galleryImages.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                  {galleryImages.map((img, i) => (
                    <div key={i} style={{ aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                      <img src={img.url} alt={img.alt || `${name} Image ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No gallery images added yet.</p>
              )}
            </div>

            {/* Video Gallery */}
            <div className="card" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Video Gallery</h2>
              {videoGallery.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {videoGallery.map((vid, i) => (
                    <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', background: '#f8fafc' }}>
                      {vid.type === 'youtube' && vid.url.includes('embed') ? (
                        <iframe width="100%" height="200" src={vid.url} title={vid.title} frameBorder="0" allowFullScreen></iframe>
                      ) : (
                        <div style={{ padding: '24px', textAlign: 'center' }}>
                          <div style={{ fontSize: '32px', marginBottom: '12px' }}>▶️</div>
                          <h3 style={{ fontSize: '15px', marginBottom: '12px' }}>{vid.title || 'Watch Video'}</h3>
                          <a href={vid.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">Watch on {vid.type || 'Platform'}</a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No videos added yet.</p>
              )}
            </div>

            {/* Projects / Portfolio */}
            <div className="card" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Past Projects</h2>
              {projects.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {projects.map((proj, i) => (
                    <div key={i} style={{ display: 'flex', gap: '20px', padding: '20px', border: '1px solid var(--border)', borderRadius: '12px', background: '#f8fafc', flexWrap: 'wrap' }}>
                      {proj.imageUrl && (
                        <div style={{ width: '200px', height: '140px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src={proj.imageUrl} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h3 style={{ fontSize: '18px', margin: '0 0 8px' }}>{proj.title}</h3>
                          {proj.completionYear && <span className="badge badge-gray">{proj.completionYear}</span>}
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, margin: '0 0 12px' }}>📍 {proj.location}</p>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{proj.description}</p>
                        {proj.videoUrl && (
                          <div style={{ marginTop: '16px' }}>
                            <a href={proj.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">▶️ Watch Project Video</a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No projects added yet.</p>
              )}
            </div>
            
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Quick Facts */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>Business Facts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {projectTypes.length > 0 && (
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>Project Types</div>
                    <div style={{ fontWeight: 600 }}>{projectTypes.join(', ')}</div>
                  </div>
                )}
                {certifications.length > 0 && (
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>Certifications</div>
                    <div style={{ fontWeight: 600 }}>{certifications.join(', ')}</div>
                  </div>
                )}
                {brands.length > 0 && (
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>Brands Handled</div>
                    <div style={{ fontWeight: 600 }}>{brands.join(', ')}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Partners */}
            {relatedPartners.length > 0 && (
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>Other {category}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {relatedPartners.map(rp => {
                    const rpMeta = rp.metadata || {};
                    const rpName = rpMeta.business_name || rpMeta.name || 'Partner';
                    const rpSlug = rpMeta.slug || rp.id;
                    return (
                      <Link href={`/partners/${rpSlug}`} key={rp.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }} className="hover-opacity">
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px' }}>
                          {rpName[0]}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-dark)' }}>{rpName}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{rp.city || rpMeta.location || 'Chennai'}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
