'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchPartnerBySlug, fetchApprovedPartners } from '@/lib/partnerApi';
import { submitEnquiry } from '@/lib/enquiryApi';
import { BUDGET_RANGES } from '@/lib/leadStore';


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

// ── Lead Form ─────────────────────────────────────────────────────────
function LeadForm({ partner }) {
  const blank = { customerName: '', phone: '', email: '', requirement: '', location: '', budgetRange: '', message: '', companyWebsite: '' };
  const [form, setForm] = useState(blank);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mountTime, setMountTime] = useState(0);

  useEffect(() => {
    setMountTime(Date.now());
  }, []);


  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.customerName || !form.phone || !form.requirement) return alert('Name, phone, and requirement are required');
    if (submitting) return; // prevent double submit
    setSubmitting(true);
    setLoading(true);

    let spamStatus = 'clean';
    if (form.companyWebsite) spamStatus = 'spam'; // honeypot caught
    else if (Date.now() - mountTime < 2000) spamStatus = 'suspicious'; // too fast

    const result = await submitEnquiry({
      ...form,
      partnerSlug: partner.slug,
      partnerName: partner.companyName,
      category: partner.category,
      sourcePage: `/partners/${partner.slug}`,
      spamStatus,
      userAgent: navigator.userAgent
    });
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      alert('Submission failed: ' + (result.message || 'Please try again'));
      setSubmitting(false);
    }
  };


  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '32px 24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h3 style={{ marginBottom: '8px', color: '#10B981' }}>Enquiry Submitted!</h3>
        <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '20px' }}>
          Your enquiry has been sent to Buildogram. Our team will connect you with <strong>{partner.companyName}</strong> within 24 hours.
        </p>
        <button onClick={() => { setForm(blank); setSubmitted(false); }} style={{ background: 'none', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '8px 20px', cursor: 'pointer', fontSize: '14px', color: '#64748B' }}>
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Honeypot field - visually hidden */}
      <div style={{ position: 'absolute', opacity: 0, top: '-9999px', left: '-9999px' }} aria-hidden="true">
        <label>Website</label>
        <input type="text" value={form.companyWebsite} onChange={f('companyWebsite')} tabIndex="-1" autoComplete="off" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Your Name *</label>
          <input style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} value={form.customerName} onChange={f('customerName')} placeholder="Your full name" required />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Phone *</label>
          <input style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} value={form.phone} onChange={f('phone')} placeholder="10-digit mobile" type="tel" required />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Email</label>
          <input style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} value={form.email} onChange={f('email')} placeholder="your@email.com" type="email" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Location</label>
          <input style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} value={form.location} onChange={f('location')} placeholder="Your area / city" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Requirement *</label>
          <input style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} value={form.requirement} onChange={f('requirement')} placeholder="e.g. G+2 Home Construction" required />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Budget Range</label>
          <select style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', background: 'white', outline: 'none' }} value={form.budgetRange} onChange={f('budgetRange')}>
            <option value="">Select budget...</option>
            {BUDGET_RANGES.map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Message</label>
        <textarea style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', resize: 'vertical', minHeight: '80px', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} value={form.message} onChange={f('message')} placeholder="Describe your project or requirement..." />
      </div>
      <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', borderRadius: '12px', padding: '14px 24px', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'opacity 0.15s' }}>
        {loading ? 'Sending…' : '🚀 Submit Enquiry to Buildogram'}
      </button>
      <p style={{ fontSize: '12px', color: '#94A3B8', textAlign: 'center', margin: 0 }}>
        Buildogram guarantees pricing transparency and verified partner quality.
      </p>
    </form>
  );
}

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

// ── Not Found ─────────────────────────────────────────────────────────
function NotFoundView() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px 24px' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🤝</div>
        <h1 style={{ fontSize: '24px', marginBottom: '12px', color: '#1E293B' }}>Partner Not Found</h1>
        <p style={{ color: '#64748B', marginBottom: '24px', lineHeight: 1.7 }}>
          This partner profile does not exist or may have been removed.
        </p>
        <Link href="/partners/directory" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', padding: '12px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
          ← Browse Partner Directory
        </Link>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────
export default function PartnerProfilePage({ params }) {
  const { slug } = params;
  const [partner, setPartner] = useState(null);
  const [related, setRelated] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchPartnerBySlug(slug).then(p => {
      if (!p) { setNotFound(true); return; }
      setPartner(p);
      // Load related partners
      fetchApprovedPartners().then(all => {
        setRelated(all.filter(r => r.category === p.category && r.slug !== slug).slice(0, 3));
      }).catch(() => {});
    }).catch(() => setNotFound(true));
  }, [slug]);


  if (notFound) return <NotFoundView />;
  if (!partner) return (
    <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #FC6E20', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const catColor = CATEGORY_COLORS[partner.category] || '#FC6E20';
  const services = toArr(partner.services);
  const specializations = toArr(partner.specializations);
  const certifications = toArr(partner.certifications);
  const brands = toArr(partner.brands);
  const projectTypes = toArr(partner.projectTypes);
  const gallery = Array.isArray(partner.galleryImages) ? partner.galleryImages : [];
  const videos = Array.isArray(partner.videoGallery) ? partner.videoGallery : [];
  const portfolio = Array.isArray(partner.portfolio) ? partner.portfolio : [];

  return (
    <div className="has-sticky-cta" style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* ── COVER ── */}
      <div style={{ height: '280px', background: partner.coverUrl ? `url(${partner.coverUrl}) center/cover no-repeat` : `linear-gradient(135deg,${catColor}33,${catColor}66)`, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }} />
      </div>

      <div className="container" style={{ marginTop: '-70px', position: 'relative', zIndex: 10 }}>
        {/* ── HERO CARD ── */}
        <div className="partner-hero-grid" style={{ background: 'white', borderRadius: '24px', border: '1px solid #E2E8F0', padding: '28px', marginBottom: '28px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
          {/* Logo */}
          <div style={{ width: '100px', height: '100px', borderRadius: '18px', background: partner.logoUrl ? `url(${partner.logoUrl}) center/cover` : catColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 900, color: 'white', border: '4px solid white', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', flexShrink: 0 }}>
            {!partner.logoUrl && partner.companyName?.[0]}
          </div>

          {/* Info */}
          <div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
              <span style={{ background: `${catColor}15`, color: catColor, padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>{partner.category}</span>
              <span style={{ background: '#DCFCE7', color: '#166534', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>✅ Verified Partner</span>
              {partner.isFeatured && <span style={{ background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>⭐ Featured</span>}
            </div>
            <h1 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 900, color: '#1E293B', margin: '0 0 8px' }}>{partner.companyName}</h1>
            <p style={{ color: '#475569', fontSize: '15px', margin: '0 0 12px', lineHeight: 1.6 }}>{partner.shortDescription}</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', color: '#64748B', fontSize: '14px', fontWeight: 600 }}>
              <span>📍 {partner.location}</span>
              {partner.yearsExperience && <span>⭐ {partner.yearsExperience}+ Years Experience</span>}
              {partner.serviceAreas && <span>🗺️ {partner.serviceAreas}</span>}
            </div>
          </div>

          {/* CTA Box */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>Work With {partner.companyName}</div>
            <a href="#enquiry-form" style={{ display: 'block', textAlign: 'center', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', padding: '11px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
              🚀 Request Quote
            </a>
            {partner.whatsapp && (
              <a href={`https://wa.me/${partner.whatsapp.replace(/[^0-9]/g, '')}?text=Hi ${encodeURIComponent(partner.companyName)}, I found your profile on Buildogram and would like to discuss my requirement.`} target="_blank" rel="noreferrer"
                style={{ display: 'block', textAlign: 'center', background: '#DCFCE7', color: '#166534', padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
                💬 WhatsApp
              </a>
            )}
            {partner.phone && (
              <a href={`tel:${partner.phone}`} style={{ display: 'block', textAlign: 'center', background: '#EFF6FF', color: '#2563EB', padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
                📞 Call
              </a>
            )}
            {partner.website && (
              <a href={partner.website} target="_blank" rel="noreferrer" style={{ display: 'block', textAlign: 'center', background: 'white', color: '#64748B', border: '1px solid #E2E8F0', padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
                🌐 Website
              </a>
            )}
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="partner-main-grid">
          
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* About */}
            {partner.fullDescription && (
              <Section title={`About ${partner.companyName}`}>
                <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '15px', whiteSpace: 'pre-wrap', margin: 0 }}>{partner.fullDescription}</p>
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
                    <div key={i} style={{ aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', background: '#F1F5F9' }}>
                      <img src={img.url || img} alt={img.alt || `Gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
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
                      {proj.imageUrl && (
                        <div style={{ width: '200px', height: '140px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src={proj.imageUrl} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', gap: '12px' }}>
                          <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: '#1E293B' }}>{proj.title}</h3>
                          {proj.completionYear && <span style={{ background: '#F1F5F9', color: '#64748B', padding: '3px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>{proj.completionYear}</span>}
                        </div>
                        <div style={{ fontSize: '13px', color: catColor, fontWeight: 700, marginBottom: '10px' }}>📍 {proj.location}</div>
                        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.65, margin: 0 }}>{proj.description}</p>
                        {proj.videoUrl && (
                          <a href={proj.videoUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '14px', background: '#EFF6FF', color: '#2563EB', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>▶️ Watch Video</a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Enquiry Form */}
            <div id="enquiry-form">
              <Section title="📩 Request Quote / Contact Partner">
                <LeadForm partner={partner} />
              </Section>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '90px' }}>

            {/* Quick Facts */}
            <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>📋 Quick Facts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {partner.yearsExperience && <div><div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>Experience</div><div style={{ fontWeight: 700, color: '#1E293B' }}>{partner.yearsExperience}+ Years</div></div>}
                {partner.serviceAreas && <div><div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>Service Areas</div><div style={{ fontWeight: 600, color: '#475569', fontSize: '14px' }}>{partner.serviceAreas}</div></div>}
                {certifications.length > 0 && <div><div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>Certifications</div><div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>{certifications.map((c, i) => <span key={i} style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>✅ {c}</span>)}</div></div>}
                {brands.length > 0 && <div><div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>Brands Used</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{brands.map((b, i) => <Tag key={i} label={b} />)}</div></div>}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>Other {partner.category}s</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {related.map(rp => (
                    <Link href={`/partners/${rp.slug}`} key={rp.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: rp.logoUrl ? `url(${rp.logoUrl}) center/cover` : (CATEGORY_COLORS[rp.category] || '#FC6E20'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, color: 'white', flexShrink: 0 }}>
                        {!rp.logoUrl && rp.companyName?.[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>{rp.companyName}</div>
                        <div style={{ fontSize: '12px', color: '#94A3B8' }}>{rp.location}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/partners/directory" style={{ display: 'block', textAlign: 'center', marginTop: '16px', padding: '9px', background: '#F8FAFC', borderRadius: '10px', fontSize: '13px', fontWeight: 700, color: '#FC6E20', textDecoration: 'none' }}>
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
      <div className="mobile-sticky-cta">
        <a href="#enquiry-form" style={{ display: 'block', textAlign: 'center', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '15px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 4px 14px rgba(252,110,32,0.3)' }}>
          🚀 Request Quote
        </a>
      </div>

    </div>
  );
}
