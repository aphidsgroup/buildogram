import Link from 'next/link';
import Navbar from '../Navbar';

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
      name: 'Dr. S. K. Vignesh, PhD',
      role: 'Co-Founder & Head of Structural Safety',
      bio: 'PhD in Structural Engineering from IIT Madras. 12+ years designing high-rise frames and earthquake-resistant residential concrete complexes. Oversees every plot soil test SBC analysis.',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Aravind Swaminathan, M.Tech',
      role: 'Co-Founder & Head of Operations',
      bio: 'M.Tech in Construction Management from NIT Trichy. Former senior project planner at L&T Infrastructure. Engineered Buildogram’s proprietary e-monitoring and automated BOQ pipeline.',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        {/* HEADER */}
        <div className="page-header text-center animate-fade-in" style={{ border: 'none', marginBottom: '60px' }}>
          <div className="tag mb-4">Our Engineering DNA</div>
          <h1 style={{ fontSize: '44px', color: 'var(--primary-dark)' }}>We Are Buildogram</h1>
          <p className="text-muted mt-4" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '17px' }}>
            Transforming unorganized residential construction into an engineer-led, tech-enabled, highly transparent CaaS aggregator platform.
          </p>
        </div>

        {/* MISSION GRID */}
        <div className="grid-2 mb-8 animate-fade-in" style={{ alignItems: 'center', gap: '48px' }}>
          <div>
            <h2 style={{ fontSize: '28px', color: 'var(--primary-dark)', marginBottom: '20px' }}>Built by IIT-Alumni Civil & Structural Engineers</h2>
            <p className="text-muted mb-4" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Historically, building a home meant dealing with high-stress per-square-foot contracts, sub-standard materials, and missed milestones. Contractors bid low, then cut corners on steel tie spacing and concrete covers to maximize their profit margins.
            </p>
            <p className="text-muted mb-4" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Buildogram was founded to bring absolute scientific accuracy to residential home construction. We don't quote generic sq.ft numbers. We detail every rebar and pipe in a capped Bill of Quantities (BOQ), ensuring every single rupee is accounted for.
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
            <h2 style={{ fontSize: '32px', color: 'var(--primary-dark)' }}>IIT-Alumni Leadership</h2>
          </div>
          <div className="grid-2">
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
    </div>
    </>
  );
}
