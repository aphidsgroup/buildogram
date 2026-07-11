import { generateSEOMetadata } from '@/lib/seo/metadata';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = generateSEOMetadata({
  title: 'About Buildogram | Construction & Property Marketplace',
  description: 'Learn about Buildogram, an IIT-alumni, PhD structural engineer-led construction-as-a-service platform transforming home building in Chennai.',
  path: '/about',
});

const STATS = [
  { value: '500+', label: 'Projects Supported', icon: '🏗️' },
  { value: '₹50Cr+', label: 'Construction Value Managed', icon: '💰' },
  { value: '18%', label: 'Average Client Savings', icon: '📉' },
  { value: '10-Year', label: 'Structural Warranty', icon: '🛡️' },
];

const TIMELINE = [
  { year: '2021', event: 'Founded by Kavin, Lokesh & Manoj in Chennai', detail: 'Three engineers frustrated with opaque construction practices decided to build a transparent, engineer-led platform for homeowners.' },
  { year: '2022', event: 'First 50 BOQ Reviews Completed', detail: 'Helped Chennai homeowners collectively avoid over ₹2.5Cr in hidden contractor costs through rigorous BOQ auditing.' },
  { year: '2023', event: 'Launched Property Passport & Client Portal', detail: 'Introduced digital property records and a live client portal giving homeowners real-time access to their construction progress and test reports.' },
  { year: '2024', event: 'Expanded to NDT Testing & Pile Foundation Services', detail: 'Added Non-Destructive Testing (NDT) for structural audits and specialized pile foundation design for Chennai\'s challenging coastal soil conditions.' },
  { year: '2025', event: '500+ Projects Milestone & AI Tools Launched', detail: 'Reached 500+ supported projects and launched AI-assisted BOQ review tools, making construction cost verification faster and more accessible.' },
];

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
      img: 'https://ui-avatars.com/api/?name=Kavin&background=0F172A&color=FC6E20&size=200&bold=true&font-size=0.4'
    },
    {
      name: 'Lokesh',
      role: 'Co-Founder & Materials & Logistics Director',
      bio: 'Logistics and materials supply veteran in Tamil Nadu. Leads Buildogram\'s open-book material sourcing and Broadway/Mannady pricing benchmarks. Discloses and audits related-party procurement routes to secure wholesale rates for clients.',
      img: 'https://ui-avatars.com/api/?name=Lokesh&background=0F172A&color=FC6E20&size=200&bold=true&font-size=0.4'
    },
    {
      name: 'Manoj, B.E.',
      role: 'Co-Founder & Head of Construction Quality Control',
      bio: 'Onsite construction coordinator. Developed our 18-checkpoint phase checklist system and manages our field engineers, overseeing onsite concrete slump tests and laboratory cube compressions.',
      img: 'https://ui-avatars.com/api/?name=Manoj&background=0F172A&color=FC6E20&size=200&bold=true&font-size=0.4'
    }
  ];

  return (
    <>
      {/* HERO */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Engineering DNA</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>About Buildogram — The Construction &amp; Property Marketplace</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>Transforming unorganized residential construction in Chennai into an engineer-led, tech-enabled, and highly transparent construction platform — backed by soil tests, BOQ contracts, and 10-year structural warranties.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/contact" className="btn btn-primary btn-lg">Talk to Our Founders</a>
            <a href="/how-it-works" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>How We Work</a>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px' }}>

        {/* MISSION GRID */}
        <div className="grid-2 mb-8 animate-fade-in" style={{ alignItems: 'center', gap: '48px' }}>
          <div>
            <h2 style={{ fontSize: '28px', color: 'var(--secondary)', marginBottom: '20px' }}>Engineered &amp; Managed by Civil Specialists</h2>
            <p className="text-muted mb-4" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Historically, building a home meant dealing with high-stress per-square-foot contracts, sub-standard materials, and missed milestones. Contractors bid low, then cut corners on steel tie spacing and concrete covers to maximize their profit margins.
            </p>
            <p className="text-muted mb-4" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Buildogram was founded by Kavin, Lokesh, and Manoj to bring absolute scientific accuracy to residential home construction in Chennai. We don&apos;t quote generic sq.ft numbers. We detail every rebar and pipe in a capped Bill of Quantities (BOQ), ensuring every single rupee is accounted for.
            </p>
            <p className="text-muted mb-6" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              From mandatory Soil Bearing Capacity (SBC) lab tests to concrete cube compression reports, our structural engineering team safeguards your home&apos;s durability against coastal elements and seismic shifts.
            </p>
          </div>
          <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-premium)' }}>
            <Image src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80" alt="Engineers working in architectural drafting studio" width={800} height={400} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
          </div>
        </div>

        {/* CORE VALUES */}
        <section className="section" style={{ background: 'var(--bg-card2)', borderRadius: '20px', padding: '60px 40px', marginBottom: '48px' }}>
          <div className="text-center mb-8">
            <h2 style={{ fontSize: '30px', color: 'var(--secondary)' }}>Our Core Engineering Standards</h2>
          </div>
          <div className="grid-2" style={{ gap: '24px' }}>
            {coreValues.map(val => (
              <div key={val.title} className="card" style={{ background: 'white' }}>
                <h3 className="mb-2" style={{ fontSize: '18px', color: 'var(--secondary)' }}>{val.title}</h3>
                <p className="text-muted text-xs" style={{ lineHeight: '1.6' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM SECTION */}
        <section style={{ marginBottom: '56px' }}>
          <div className="text-center mb-8">
            <div className="tag mb-4">Our Founders</div>
            <h2 style={{ fontSize: '32px', color: 'var(--secondary)' }}>Engineer-Led Leadership</h2>
          </div>
          <div style={{ gap: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {team.map(member => (
              <div key={member.name} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={80}
                    height={80}
                    style={{ borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)', flexShrink: 0 }}
                    unoptimized
                  />
                  <div>
                    <h3 style={{ fontSize: '18px', color: 'var(--secondary)' }}>{member.name}</h3>
                    <span className="badge badge-blue mt-1" style={{ fontSize: '10px' }}>{member.role}</span>
                  </div>
                </div>
                <p className="text-muted text-xs" style={{ lineHeight: '1.6', flex: 1 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OUR NUMBERS */}
        <section style={{ background: 'var(--secondary)', borderRadius: '20px', padding: '56px 40px', marginBottom: '56px' }}>
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(252,110,32,0.15)', border: '1px solid rgba(252,110,32,0.3)', borderRadius: '999px', padding: '6px 18px', marginBottom: '16px' }}>
              <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Numbers</span>
            </div>
            <h2 style={{ color: 'white', fontSize: 'clamp(22px, 3vw, 36px)' }}>Proof in the Numbers</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {STATS.map(stat => (
              <div key={stat.label} style={{ textAlign: 'center', padding: '32px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginTop: '8px', lineHeight: 1.4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* OUR STORY TIMELINE */}
        <section style={{ marginBottom: '56px' }}>
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <div className="tag mb-4">Our Journey</div>
            <h2 style={{ fontSize: '32px', color: 'var(--secondary)' }}>Our Story</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '540px', margin: '12px auto 0', lineHeight: 1.6 }}>
              From a shared frustration over opaque construction to Chennai&apos;s most transparent engineering platform.
            </p>
          </div>
          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '15px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(to bottom, var(--primary), rgba(252,110,32,0.1))' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {TIMELINE.map((item) => (
                <div key={item.year} style={{ position: 'relative', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  {/* Dot */}
                  <div style={{ position: 'absolute', left: '-25px', top: '8px', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--primary)', border: '3px solid var(--bg-card)', boxShadow: '0 0 0 3px rgba(252,110,32,0.2)', flexShrink: 0 }} />
                  <div className="card" style={{ flex: 1, padding: '24px 28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span style={{ background: 'var(--primary)', color: 'white', fontWeight: 800, fontSize: '14px', padding: '4px 12px', borderRadius: '999px' }}>{item.year}</span>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>{item.event}</h3>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <div className="card text-center mb-8 animate-fade-in" style={{ padding: '40px', background: 'var(--gradient-dark)', color: 'white', border: 'none' }}>
          <h3 style={{ fontSize: '28px', color: 'white', marginBottom: '12px' }}>Have a technical structural query about your plot soil?</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '12px auto 24px', lineHeight: 1.65 }}>
            Book a direct, free consultation call with our IIT-alumni structural engineering team.
          </p>
          <div className="flex-center gap-4">
            <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--accent)' }}>
              Talk to Our Founders
            </Link>
            <Link href="/boq-calculator" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
              Open BOQ Calculator
            </Link>
          </div>
        </div>

      </div>

      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'About Buildogram', path: '/about' }
      ]} />
    </>
  );
}
