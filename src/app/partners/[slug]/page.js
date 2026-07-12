import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { MobilePartnerCTA, DesktopPartnerCTA } from './PartnerEnquiryClient';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Script from 'next/script';
import Image from 'next/image';
import { safeDbCall } from '@/lib/db/safePrisma';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

// ── helpers ──────────────────────────────────────────────────────────
function toArr(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  return String(v).split(',').map(s => s.trim()).filter(Boolean);
}

function getYTEmbedUrl(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=))([a-zA-Z0-9_-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

const CATEGORY_COLORS = {
  'Builder': '#2563EB', 'Architect': '#7C3AED', 'Interior Designer': '#DB2777',
  'Material Supplier': '#D97706', 'Home Automation': '#0891B2',
  'Solar': '#F59E0B', 'Elevators': '#64748B', 'Waterproofing': '#0EA5E9',
};

// ── Tag ───────────────────────────────────────────────────────────────
function Tag({ label, color = '#64748B', bg = '#F1F5F9' }) {
  return <span style={{ background: bg, color, padding: '5px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>{label}</span>;
}

// ── Section ───────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px', color: '#1E293B' }}>{title}</h2>
      {children}
    </div>
  );
}

// ── Metadata ──────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  let partner = null;
  try {
    partner = await safeDbCall(() => prisma.partners.findUnique({
      where: { slug: resolvedParams.slug }
    }), null);
  } catch (err) {
    console.error('generateMetadata error:', err);
  }

  if (!partner || partner.verification_status !== 'verified' || !partner.public_profile_enabled) return {};

  return generateSEOMetadata({
    title: partner.seo_title || `${partner.company_name} | ${partner.partner_type?.replace(/_/g, ' ')} in ${partner.location} | Buildogram`,
    description: partner.seo_description || partner.short_description || `View credentials, portfolio, and reviews for ${partner.company_name}, a verified ${partner.partner_type?.replace(/_/g, ' ')} serving ${partner.service_areas?.join(', ') || partner.location}.`,
    path: `/partners/${partner.slug}`,
    image: partner.cover_url || partner.logo_url || 'https://www.buildogram.in/og-default.png'
  });
}

// ── Main Page ─────────────────────────────────────────────────────────
export default async function PartnerProfilePage({ params }) {
  const resolvedParams = await params;
  let partner = null;
  let related = [];
  try {
    partner = await safeDbCall(() => prisma.partners.findUnique({
      where: { slug: resolvedParams.slug },
      include: {
        partner_gallery: { orderBy: { sort_order: 'asc' } },
        partner_videos: true,
        partner_portfolio: true,
        partner_documents: true
      }
    }), null);

    if (partner) {
      related = await safeDbCall(() => prisma.partners.findMany({
        where: { 
          partner_type: partner.partner_type, 
          verification_status: 'verified', 
          public_profile_enabled: true,
          slug: { not: resolvedParams.slug }
        },
        take: 3,
        orderBy: { featured: 'desc' }
      }), []);
    }
  } catch (err) {
    console.error('Failed to fetch partner:', err);
  }

  if (!partner || partner.verification_status !== 'verified' || !partner.public_profile_enabled) {
    notFound();
  }

  const catColor = CATEGORY_COLORS[partner.partner_type] || '#FC6E20';
  const services = toArr(partner.services);
  const specializations = toArr(partner.specializations);
  const certifications = toArr(partner.certifications);
  const brands = toArr(partner.brands_handled);
  const projectTypes = toArr(partner.project_types);
  const gallery = partner.partner_gallery || [];
  const videos = partner.partner_videos || [];
  const portfolio = partner.partner_portfolio || [];
  const proofAssets = (partner.partner_documents || []).filter(d => d.status === 'Verified');

  // Schema.org
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.buildogram.in/' },
    { name: 'Partners', url: 'https://www.buildogram.in/partners' },
    { name: partner.company_name, url: `https://www.buildogram.in/partners/${partner.slug}` }
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": partner.company_name,
    "image": partner.logo_url || partner.cover_url || "https://www.buildogram.in/og-default.png",
    "@id": `https://www.buildogram.in/partners/${partner.slug}`,
    "url": `https://www.buildogram.in/partners/${partner.slug}`,
    "description": partner.short_description || `Verified ${partner.partner_type}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": partner.location,
      "addressRegion": "TN",
      "addressCountry": "IN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": partner.years_experience ? Math.max(1, partner.years_experience) : 1
    },
    "areaServed": partner.service_areas || [partner.location],
    "parentOrganization": {
      "@type": "Organization",
      "name": "Buildogram",
      "url": "https://www.buildogram.in/"
    }
  };

  // Convert for Client Component usage (camelCase expected by LeadForm)
  const clientPartnerData = {
    slug: partner.slug,
    companyName: partner.company_name,
    category: partner.partner_type
  };

  return (
    <div className="has-sticky-cta" style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      <BreadcrumbSchema items={breadcrumbs} />
      <Script id="partner-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* ── COVER ── */}
      <div style={{ height: '280px', background: partner.cover_url ? `url(${partner.cover_url}) center/cover no-repeat` : `linear-gradient(135deg,${catColor}33,${catColor}66)`, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }} />
      </div>

      <div className="container" style={{ marginTop: '-70px', position: 'relative', zIndex: 10 }}>
        {/* ── HERO CARD ── */}
        <div className="partner-hero-grid" style={{ background: 'white', borderRadius: '24px', border: '1px solid #E2E8F0', padding: '28px', marginBottom: '28px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
          {/* Logo */}
          <div style={{ width: '100px', height: '100px', borderRadius: '18px', background: partner.logo_url ? `url(${partner.logo_url}) center/cover` : catColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 900, color: 'white', border: '4px solid white', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', flexShrink: 0 }}>
            {!partner.logo_url && partner.company_name?.[0]}
          </div>

          {/* Info */}
          <div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
              <span style={{ background: `${catColor}15`, color: catColor, padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>{partner.partner_type?.replace(/_/g, ' ')}</span>
              <span style={{ background: '#DCFCE7', color: '#166534', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>✅ Verified Partner</span>
              {partner.featured && <span style={{ background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>⭐ Featured</span>}
            </div>
            <h1 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 900, color: '#1E293B', margin: '0 0 8px' }}>{partner.company_name}</h1>
            <p style={{ color: '#475569', fontSize: '15px', margin: '0 0 12px', lineHeight: 1.6 }}>{partner.short_description}</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', color: '#64748B', fontSize: '14px', fontWeight: 600 }}>
              <span>📍 {partner.location}</span>
              {partner.years_experience && <span>⭐ {partner.years_experience}+ Years Experience</span>}
              {partner.service_areas && <span>🗺️ {partner.service_areas}</span>}
            </div>
          </div>

          {/* Desktop CTA Box */}
          <DesktopPartnerCTA partner={clientPartnerData} />
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="partner-main-grid">
          
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* About */}
            {partner.full_description && (
              <Section title={`About ${partner.company_name}`}>
                <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '15px', whiteSpace: 'pre-wrap', margin: 0 }}>{partner.full_description}</p>
              </Section>
            )}

            {/* Services */}
            {(services.length > 0 || specializations.length > 0) && (
              <Section title="Services & Specializations">
                {services.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Services Offered</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {services.map((s, i) => <Tag key={i} label={s} color={catColor} bg={`${catColor}12`} />)}
                    </div>
                  </div>
                )}
                {specializations.length > 0 && (
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Specializations</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {specializations.map((s, i) => <Tag key={i} label={s} color="#166534" bg="#DCFCE7" />)}
                    </div>
                  </div>
                )}
                {projectTypes.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Project Types</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {projectTypes.map((s, i) => <Tag key={i} label={s} color="#7C3AED" bg="#F5F3FF" />)}
                    </div>
                  </div>
                )}
              </Section>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <Section title="📸 Image Gallery">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                  {gallery.map((img, i) => (
                    <div key={i} style={{ aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', background: '#F1F5F9', position: 'relative' }}>
                      <Image src={img.url} alt={img.alt || `Gallery ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Videos */}
            {videos.length > 0 && (
              <Section title="🎥 Video Gallery">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                  {videos.map((vid, i) => {
                    const embed = getYTEmbedUrl(vid.url);
                    return (
                      <div key={i} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                        {embed ? (
                          <iframe width="100%" height="200" src={embed} title={vid.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        ) : (
                          <div style={{ padding: '28px', textAlign: 'center' }}>
                            <div style={{ fontSize: '36px', marginBottom: '12px' }}>▶️</div>
                            <div style={{ fontWeight: 700, marginBottom: '12px', fontSize: '14px' }}>{vid.title || 'Watch Video'}</div>
                            <a href={vid.url} target="_blank" rel="noreferrer" style={{ background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
                              Watch on {vid.type || 'Platform'} →
                            </a>
                          </div>
                        )}
                        {vid.title && embed && <div style={{ padding: '10px 14px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>{vid.title}</div>}
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* Portfolio */}
            {portfolio.length > 0 && (
              <Section title="🏗️ Past Projects">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {portfolio.map((proj, i) => (
                    <div key={i} style={{ display: 'flex', gap: '20px', padding: '20px', background: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0', flexWrap: 'wrap' }}>
                      {proj.image_url && (
                        <div style={{ width: '200px', height: '140px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                          <Image src={proj.image_url} alt={proj.title} fill style={{ objectFit: 'cover' }} />
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', gap: '12px' }}>
                          <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: '#1E293B' }}>{proj.title}</h3>
                          {proj.completion_year && <span style={{ background: '#F1F5F9', color: '#64748B', padding: '3px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>{proj.completion_year}</span>}
                        </div>
                        <div style={{ fontSize: '13px', color: catColor, fontWeight: 700, marginBottom: '10px' }}>📍 {proj.location}</div>
                        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.65, margin: 0 }}>{proj.description}</p>
                        {proj.video_url && (
                          <a href={proj.video_url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '14px', background: '#EFF6FF', color: '#2563EB', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>▶️ Watch Video</a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Proof Assets */}
            {proofAssets.length > 0 && (
              <Section title="📄 Verified Proof Assets">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                  {proofAssets.map((doc, i) => (
                    <a href={doc.file_url} target="_blank" rel="noreferrer" key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#F1F5F9', borderRadius: '12px', textDecoration: 'none', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '24px' }}>📑</div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>{doc.document_name}</div>
                        <div style={{ fontSize: '12px', color: '#166534', fontWeight: 600 }}>✅ Verified</div>
                      </div>
                    </a>
                  ))}
                </div>
              </Section>
            )}

          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '90px' }}>

            {/* Quick Facts */}
            <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>📋 Quick Facts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {partner.years_experience && <div><div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>Experience</div><div style={{ fontWeight: 700, color: '#1E293B' }}>{partner.years_experience}+ Years</div></div>}
                {partner.service_areas && <div><div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>Service Areas</div><div style={{ fontWeight: 600, color: '#475569', fontSize: '14px' }}>{partner.service_areas}</div></div>}
                {certifications.length > 0 && <div><div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>Certifications</div><div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>{certifications.map((c, i) => <span key={i} style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>✅ {c}</span>)}</div></div>}
                {brands.length > 0 && <div><div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>Brands Used</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{brands.map((b, i) => <Tag key={i} label={b} />)}</div></div>}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>Other {partner.partner_type?.replace(/_/g, ' ')}s</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {related.map(rp => (
                    <Link href={`/partners/${rp.slug}`} key={rp.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: rp.logo_url ? `url(${rp.logo_url}) center/cover` : (CATEGORY_COLORS[rp.partner_type] || '#FC6E20'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, color: 'white', flexShrink: 0 }}>
                        {!rp.logo_url && rp.company_name?.[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>{rp.company_name}</div>
                        <div style={{ fontSize: '12px', color: '#94A3B8' }}>{rp.location}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/partners" style={{ display: 'block', textAlign: 'center', marginTop: '16px', padding: '9px', background: '#F8FAFC', borderRadius: '10px', fontSize: '13px', fontWeight: 700, color: '#FC6E20', textDecoration: 'none' }}>
                  View All Partners →
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html:`
        .partner-main-grid {
          display: grid;
          grid-template-columns: minmax(0,2fr) minmax(0,1fr);
          gap: 24px;
          align-items: start;
        }
        .partner-hero-grid {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 24px;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .mobile-sticky-cta {
          display: none;
        }
        @media(max-width: 900px){
          .partner-hero-grid { grid-template-columns: 1fr !important; text-align: center; justify-items: center; }
          .partner-main-grid { grid-template-columns: 1fr !important; }
          .mobile-sticky-cta {
            display: block;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            padding: 16px;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
            z-index: 1000;
            border-top: 1px solid #E2E8F0;
          }
          .has-sticky-cta {
            padding-bottom: 90px !important;
          }
        }
      `}} />

      {/* MOBILE STICKY CTA */}
      <MobilePartnerCTA partner={clientPartnerData} />

    </div>
  );
}
