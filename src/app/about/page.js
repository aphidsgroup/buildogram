import Link from 'next/link';

export const metadata = {
  title: 'About Us | Buildogram',
  description: 'Learn about Buildogram, an IIT-alumni, PhD structural engineer-led construction-as-a-service platform transforming home building in Chennai.',
};

export default function About() {
  const coreValues = [
    { title: '🔬 PhD-Grade Quality Audits', desc: 'We do not rely on sub-contractor opinions. All concrete mixes, soil bearings, and rebar sizing are calculated by doctoral structural design graduates.' },
    { title: '📋 Capped BOQ Security', desc: 'We generate an itemized Bill of Quantities (BOQ) detailing every bag of cement and wire foot. It is legally bound and locks your cost at signing.' },
    { title: '📱 Live App E-Monitoring', desc: 'Through your Client Portal, you see concrete compression test sheets, daily weather parameters, and live CCTV feeds. No hide-and-seek.' },
    { title: '🛡️ Registered 10-Yr Warranties', desc: 'Our footings, columns, beams, and slabs are backed by a legally binding 10-year structural warranty certified by structural engineering designers.' }
  ];

  const team = [
    {
      name: 'Kavin, M.Tech',
      role: 'Co-Founder & Structural Engineering Lead',
      bio: 'Civil & structural engineer specialized in foundation design in Chennai soil profiles. Focuses on pile foundation dynamics for clayey soil and salinity-shielding for coastal ECR/OMR sites. Oversees all geotechnical checks and structural code compliance.',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Lokesh',
      role: 'Co-Founder & Materials & Logistics Director',
      bio: 'Logistics and materials supply veteran in Tamil Nadu. Leads Buildogram’s open-book material sourcing and Broadway/Mannady pricing benchmarks. Discloses and audits related-party procurement routes to secure wholesale rates for clients.',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Manoj, B.E.',
      role: 'Co-Founder & Head of Construction Quality Control',
      bio: 'Onsite construction coordinator. Developed our 18-checkpoint phase checklist system and manages our field engineers, overseeing onsite concrete slump tests and laboratory cube compressions.',
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(255,218,1,0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,218,1,0.12)', border: '1px solid rgba(255,218,1,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ color: '#FFDA01', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Engineering DNA</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>We Are Buildogram — Build with Proof, Not Promises</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>Transforming unorganized residential construction in Chennai into an engineer-led, tech-enabled, and highly transparent construction platform — backed by soil tests, BOQ contracts, and 10-year structural warranties.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/contact" className="btn btn-primary btn-lg">Talk to Our Founders</a>
            <a href="/how-it-works" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>How We Work</a>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px' }}>

        {/* MISSION GRID */}
        <div className="grid-2 mb-8 animate-fade-in" style={{ alignItems: 'center', gap: '48px' }}>
          <div>
            <h2 style={{ fontSize: '28px', color: 'var(--primary-dark)', marginBottom: '20px' }}>Engineered & Managed by Civil Specialists</h2>
            <p className="text-muted mb-4" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Historically, building a home meant dealing with high-stress per-square-foot contracts, sub-standard materials, and missed milestones. Contractors bid low, then cut corners on steel tie spacing and concrete covers to maximize their profit margins.
            </p>
            <p className="text-muted mb-4" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Buildogram was founded by Kavin, Lokesh, and Manoj to bring absolute scientific accuracy to residential home construction in Chennai. We don't quote generic sq.ft numbers. We detail every rebar and pipe in a capped Bill of Quantities (BOQ), ensuring every single rupee is accounted for.
            </p>
            <p className="text-muted mb-6" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              From mandatory Soil Bearing Capacity (SBC) lab tests to concrete cube compression reports, our structural engineering team safeguards your home’s durability against coastal elements and seismic shifts.
            </p>
          </div>
          <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-premium)' }}>
            <img src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80" alt="Engineers working in architectural drafting studio" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
          </div>
        </div>

        {/* CORE VALUES */}
        <section className="section" style={{ background: 'var(--bg-card2)', borderRadius: '20px', padding: '60px 40px', marginBottom: '48px' }}>
          <div className="text-center mb-8">
            <h2 style={{ fontSize: '30px', color: 'var(--primary-dark)' }}>Our Core Engineering Standards</h2>
          </div>
          <div className="grid-2" style={{ gap: '24px' }}>
            {coreValues.map(val => (
              <div key={val.title} className="card" style={{ background: 'white' }}>
                <h3 className="mb-2" style={{ fontSize: '18px', color: 'var(--primary-dark)' }}>{val.title}</h3>
                <p className="text-muted text-xs" style={{ lineHeight: '1.6' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="mb-8">
          <div className="text-center mb-8">
            <div className="tag mb-4">Our Founders</div>
            <h2 style={{ fontSize: '32px', color: 'var(--primary-dark)' }}>Engineer-Led Leadership</h2>
          </div>
          <div className="grid-3" style={{ gap: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {team.map(member => (
              <div key={member.name} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <img src={member.img} alt={member.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }} />
                  <div>
                    <h3 style={{ fontSize: '18px', color: 'var(--primary-dark)' }}>{member.name}</h3>
                    <span className="badge badge-blue mt-1" style={{ fontSize: '10px' }}>{member.role}</span>
                  </div>
                </div>
                <p className="text-muted text-xs" style={{ lineHeight: '1.6', flex: 1 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <div className="card text-center mb-8 animate-fade-in" style={{ padding: '40px', background: 'var(--gradient-dark)', color: 'white', border: 'none' }}>
          <h3 style={{ fontSize: '28px', color: 'white', marginBottom: '12px' }}>Have a technical structural query about your plot soil?</h3>
          <p className="text-muted mb-6" style={{ color: 'rgba(255,255,255,0.7) !important', maxWidth: '600px', margin: '12px auto' }}>
            Book a direct, free consultation call with Dr. Vignesh and our IIT-alumni structural engineering team.
          </p>
          <div className="flex-center gap-4">
            <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--accent)' }}>
              Talk to Our Founders
            </Link>
            <Link href="/cost-estimator" className="btn btn-outline" style={{ color: 'white !important', borderColor: 'white !important' }}>
              Open Cost Estimator
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
