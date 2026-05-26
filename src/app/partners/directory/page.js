import DirectoryClient from './DirectoryClient';

export const metadata = {
  title: 'Verified Builders, Contractors, Architects & Suppliers | Buildogram',
  description: 'Explore verified construction partners connected through Buildogram\'s engineer-led ecosystem, including builders, contractors, architects, consultants, and material suppliers.',
};

// Server-rendered category and location data — always visible before JS hydration
const CATEGORIES = [
  { icon: '🏗️', label: 'Builders', desc: 'Residential, villa and turnkey construction', filter: 'Builder' },
  { icon: '🔧', label: 'Contractors', desc: 'RCC, MEP, finishing and civil work specialists', filter: 'Builder' },
  { icon: '📐', label: 'Architects', desc: 'Design, planning and structural coordination', filter: 'Architect' },
  { icon: '🎨', label: 'Interior Designers', desc: 'Residential and commercial interior fit-outs', filter: 'Interior Designer' },
  { icon: '🧱', label: 'Material Suppliers', desc: 'Cement, steel, sand, tiles and construction materials', filter: 'Material Supplier' },
  { icon: '☀️', label: 'Solar Installers', desc: 'Rooftop solar, net metering and AMC', filter: 'Solar' },
  { icon: '🔼', label: 'Elevator Companies', desc: 'Home lifts, hydraulic and MRL elevators', filter: 'Elevators' },
  { icon: '💧', label: 'Waterproofing', desc: 'Terrace, basement and bathroom waterproofing', filter: 'Waterproofing' },
];

const LOCATIONS = ['Chennai', 'OMR', 'ECR', 'Adyar', 'Anna Nagar', 'Tambaram', 'Velachery', 'Porur', 'Ambattur', 'Guindy', 'Nungambakkam'];

const HOW_IT_WORKS = [
  { step: '01', title: 'Browse Partner Profiles', desc: 'Explore professionals who have submitted credentials, project records, and service details to Buildogram.' },
  { step: '02', title: 'Review Credentials', desc: 'Check submitted certifications, portfolio images, and past project write-ups. Contact Buildogram for further verification.' },
  { step: '03', title: 'Request via Buildogram', desc: 'All enquiries are routed through Buildogram — ensuring transparency and proper coordination before any engagement.' },
];

export default function PartnerDirectoryPage() {
  return (
    <div className="marketplacePage">

      {/* ── Hero ── */}
      <section className="fullBleedSection" style={{ background: 'var(--secondary)', color: 'white', padding: 'clamp(48px, 6vw, 88px) 0 clamp(56px, 7vw, 104px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="sectionInnerWide" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Verified Construction Partner Network</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '800px', fontFamily: '"Space Grotesk", sans-serif' }}>
            Work With Verified Construction Partners
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '680px', lineHeight: 1.7, marginBottom: '32px' }}>
            Explore builders, contractors, architects, consultants, suppliers, and service providers connected through Buildogram’s engineer-led construction ecosystem. All enquiries are routed through Buildogram for transparency.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/partners/register" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>Become a Buildogram Partner</a>
            <a href="/contact" className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', borderColor: 'rgba(255,255,255,0.2)', padding: '16px 32px', fontSize: '16px' }}>Talk to Buildogram</a>
          </div>
        </div>
      </section>

      {/* ── Category Grid — server-rendered, always visible ── */}
      <section className="fullBleedSection" style={{ background: 'white', padding: 'clamp(48px, 6vw, 80px) 0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="sectionInnerWide">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ display: 'inline-flex', borderRadius: '999px', padding: '0.4rem 0.8rem', background: 'rgba(252, 110, 32, 0.08)', color: 'var(--primary)', border: '1px solid rgba(252, 110, 32, 0.18)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Browse by Category</span>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', marginTop: '16px', color: 'var(--secondary)', fontFamily: '"Space Grotesk", sans-serif' }}>All construction services. One platform.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {CATEGORIES.map(cat => (
              <a key={cat.label} href={`/partners/directory?cat=${encodeURIComponent(cat.filter)}`} className="dir-cat-card" style={{ textDecoration: 'none', display: 'block', background: '#F8FAFC', borderRadius: '18px', padding: '24px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>{cat.label}</h3>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>{cat.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location Chips — server-rendered ── */}
      <section className="fullBleedSection" style={{ background: '#F8FAFC', padding: '28px 0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="sectionInnerWide">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', whiteSpace: 'nowrap' }}>📍 Browse by location:</span>
            {LOCATIONS.map(loc => (
              <a key={loc} href={`/partners/directory?loc=${encodeURIComponent(loc)}`} className="dir-loc-chip"
                style={{ padding: '6px 16px', borderRadius: '999px', border: '1px solid #E2E8F0', background: 'white', fontSize: '13px', fontWeight: 600, color: '#475569', textDecoration: 'none' }}>
                {loc}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Partner Grid — client-rendered with shimmer fallback ── */}
      <section className="fullBleedSection" style={{ background: '#F8FAFC', padding: 'clamp(40px, 5vw, 72px) 0 clamp(64px, 8vw, 112px) 0', minHeight: '50vh' }}>
        <div className="sectionInnerWide">
          <DirectoryClient />
        </div>
      </section>

      {/* ── How Partner Review Works — server-rendered ── */}
      <section className="fullBleedSection" style={{ background: 'white', padding: 'clamp(56px, 7vw, 96px) 0', borderTop: '1px solid #E2E8F0' }}>
        <div className="sectionInnerWide">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ display: 'inline-flex', borderRadius: '999px', padding: '0.4rem 0.8rem', background: 'rgba(252, 110, 32, 0.08)', color: 'var(--primary)', border: '1px solid rgba(252, 110, 32, 0.18)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>How It Works</span>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', marginTop: '16px', color: 'var(--secondary)', fontFamily: '"Space Grotesk", sans-serif' }}>How partner review and enquiry works</h2>
            <p style={{ color: '#64748B', fontSize: '17px', maxWidth: '600px', margin: '12px auto 0', lineHeight: 1.7 }}>Buildogram acts as a coordination layer — not a blind directory. All enquiries are mediated to ensure quality and transparency.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {HOW_IT_WORKS.map(step => (
              <div key={step.step} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px' }}>{step.step}</div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Not Just Listed — server-rendered ── */}
      <section className="fullBleedSection" style={{ background: '#F8FAFC', padding: 'clamp(56px, 7vw, 96px) 0', borderTop: '1px solid #E2E8F0' }}>
        <div className="sectionInnerWide" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-flex', borderRadius: '999px', padding: '0.4rem 0.8rem', background: 'rgba(252, 110, 32, 0.08)', color: 'var(--primary)', border: '1px solid rgba(252, 110, 32, 0.18)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Not Just Listed</span>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', marginTop: '16px', marginBottom: '20px', color: 'var(--secondary)', fontFamily: '"Space Grotesk", sans-serif' }}>Not Just Listed — Reviewed for Construction Relevance</h2>
          <p style={{ color: '#64748B', fontSize: '17px', lineHeight: 1.8, maxWidth: '720px', margin: '0 auto 48px' }}>
            Buildogram focuses on building a trusted partner ecosystem where professionals are showcased based on work relevance, project proof, service category, and ability to support property owners with clarity. Every partner submits credentials, certifications, and project records before going live on the platform.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', textAlign: 'left' }}>
            {[{ icon: '📋', title: 'Credential Submission', desc: 'Partners submit certifications, licences, and proof of trade experience.' }, { icon: '🏗️', title: 'Project Proof', desc: 'Completed project records, photos, and client references submitted for review.' }, { icon: '🗂️', title: 'Service Category', desc: 'Categorised by specialisation — builder, architect, contractor, supplier, and more.' }, { icon: '🤝', title: 'Buildogram Coordination', desc: 'All owner enquiries are routed through Buildogram for transparency and accountability.' }].map((item, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '15px', marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join CTA — server-rendered ── */}
      <section className="fullBleedSection" style={{ background: 'var(--secondary)', padding: 'clamp(56px, 7vw, 96px) 0' }}>
        <div className="sectionInnerWide" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ color: 'white', fontSize: 'clamp(26px, 3.5vw, 40px)', marginBottom: '12px', fontFamily: '"Space Grotesk", sans-serif' }}>Are you a construction professional?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '520px', lineHeight: 1.7 }}>Builders, architects, interior designers, suppliers, solar installers, waterproofing specialists and contractors can apply to join Buildogram’s verified construction ecosystem.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', flexShrink: 0 }}>
            <a href="/partners/register" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px', whiteSpace: 'nowrap' }}>Become a Buildogram Partner</a>
            <a href="/contact" className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', borderColor: 'rgba(255,255,255,0.2)', padding: '16px 32px', fontSize: '16px', whiteSpace: 'nowrap' }}>Talk to Buildogram</a>
          </div>
        </div>
      </section>

      {/* CSS for hover states — safe in server component */}
      <style>{`
        .dir-cat-card:hover { background: white !important; box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-2px); transition: all 0.2s; }
        .dir-cat-card { transition: all 0.2s; }
        .dir-loc-chip:hover { background: #FC6E20 !important; color: white !important; border-color: #FC6E20 !important; }
        .dir-loc-chip { transition: all 0.15s; }
      `}</style>
    </div>
  );
}
