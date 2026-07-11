import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'Construction in Chennai | Building Support & Services | Buildogram',
  description: 'Expert construction support across Chennai. CMDA approvals, soil testing, BOQ reviews, material sourcing and site supervision — guided by structural engineers.',
  path: '/construction-in-chennai',
});

const CHALLENGES = [
  { icon: '🌊', title: 'Coastal Corrosion (ECR / OMR)', desc: 'Salt-laden sea breeze causes chloride-induced corrosion in rebar. Coastal Chennai zones require CRS (Corrosion Resistant Steel) and higher concrete cover depths per IS 456.' },
  { icon: '🌱', title: 'Expansive Clay (Velachery / Adyar)', desc: 'Marine clay deposits in low-lying areas have extremely low SBC (50–80 kN/m²). Pile foundations are mandatory. Shallow footings on clay risk differential settlement and structural cracking.' },
  { icon: '🌧️', title: 'Monsoon Flooding Risk', desc: 'Plinth height planning is critical. Areas like Porur, Koyambedu, and Perambur have flood-prone zones. CMDA mandates minimum plinth heights in flood-risk areas. Drainage planning during design prevents post-construction flooding.' },
  { icon: '📋', title: 'CMDA Approval Complexity', desc: 'FSI (Floor Space Index), setback rules, and height restrictions vary dramatically by zone (Residential, Commercial, Mixed Use). Incorrect drawings lead to rejection delays or demolition orders after construction.' },
];

const AREAS = [
  { name: 'OMR (Old Mahabalipuram Road)', slug: 'omr', note: 'IT corridor zone, sandy/mixed soil, CRS steel recommended' },
  { name: 'ECR (East Coast Road)', slug: 'ecr', note: 'Coastal zone, marine sand, high corrosion risk' },
  { name: 'Anna Nagar', slug: 'anna-nagar', note: 'Established zone, mixed soil, CMDA setback compliance critical' },
  { name: 'Velachery', slug: 'velachery', note: 'Marine clay, pile foundation mandatory, flood zone planning needed' },
  { name: 'Tambaram', slug: 'tambaram', note: 'Hard rock near surface, high SBC, good for all foundation types' },
  { name: 'Porur', slug: 'porur', note: 'Mixed residential zone, medium clay, moderate SBC' },
  { name: 'Adyar', slug: 'adyar', note: 'Coastal proximity, clay soil, waterproofing critical' },
  { name: 'Nungambakkam', slug: 'nungambakkam', note: 'Central Chennai, stiff soil, heritage zone restrictions' },
  { name: 'T Nagar', slug: 't-nagar', note: 'Dense commercial zone, strict CMDA oversight' },
  { name: 'Guindy', slug: 'guindy', note: 'Industrial-to-residential transition, mixed soil' },
  { name: 'Sholinganallur', slug: 'sholinganallur', note: 'OMR tech hub, newer layouts, mixed soil profiles' },
  { name: 'Chromepet', slug: 'chromepet', note: 'Hard ground, good drainage, southern suburbs' },
];

const SERVICES = [
  { icon: '🏗️', name: 'Home Construction', desc: 'Engineer-supervised residential builds from soil test to handover', link: '/home-construction-chennai' },
  { icon: '🔍', name: 'Structural Audit', desc: 'NDT testing, crack assessment, load capacity evaluation', link: '/structural-audit-chennai' },
  { icon: '📋', name: 'BOQ Review', desc: 'Itemized contractor quote analysis to prevent overquoting', link: '/boq-calculator' },
  { icon: '🧱', name: 'Material Sourcing', desc: 'Wholesale-rate, MTC-verified materials sourced to your site', link: '/materials' },
  { icon: '👷', name: 'Site Supervision', desc: 'Daily engineering monitoring with client portal updates', link: '/site-supervision-chennai' },
  { icon: '🌱', name: 'Soil Testing', desc: 'SBC determination and geotechnical investigation', link: '/soil-testing-chennai' },
];

const FAQS = [
  { question: 'What is the minimum CMDA approval requirement for building a G+1 house in Chennai?', answer: 'CMDA requires an approved architectural plan submission with drawings showing setbacks (typically 3m front, 1.5m sides, 3m rear for residential zones), FAR calculations, and structural compliance. The process typically takes 3–6 months depending on the zone and plan complexity. A licensed architect registered with CMDA must submit the plans.' },
  { question: 'Do I need a soil test before getting CMDA approval?', answer: 'Technically, soil investigation is required before foundation design (IS 1904), and CMDA scrutiny may check if the structural drawings reflect appropriate foundation type for the soil conditions. Practically, most builders conduct soil testing and finalize the structural design before submitting for CMDA approval.' },
  { question: 'How does coastal soil in ECR/OMR affect construction?', answer: 'ECR and OMR locations require corrosion-resistant measures due to salt-laden sea breeze. This includes: using CRS (Corrosion Resistant Steel) or applying epoxy-coated rebar, increasing concrete cover to 50mm for exterior elements (vs standard 40mm), using higher water-cement ratio concrete (w/c ≤ 0.4), and applying external waterproof coatings on exterior concrete surfaces.' },
  { question: 'What is the typical construction timeline for a G+1 house in Chennai?', answer: 'For a standard G+1 residential build: Soil test (1 week) + Architectural design (4–6 weeks) + CMDA approval (3–6 months) + Structural design (2–3 weeks) + Construction (8–12 months) + Finishing (2–3 months). Total from decision to handover: typically 18–24 months including approvals.' },
  { question: 'Can you build in Chennai without an engineer?', answer: 'By law, CMDA-approved structures must have a structural engineer certifying the structural design. Many homeowners skip this for small structures — but IS 13920 (ductile detailing for seismic zones) and IS 456 (concrete design) require engineering compliance. Without engineering oversight, concrete mix, rebar placement, and foundation design can be seriously compromised.' },
];

export default function ConstructionInChennai() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Chennai Construction</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Building in Chennai? Start Right with Engineer-Led Support
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            Chennai's coastal soil, CMDA regulations, and monsoon conditions make construction uniquely challenging. Buildogram provides engineering support tailored to every Chennai zone — from Velachery clay to ECR sand.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=construction" className="btn btn-primary btn-lg">Talk to an Engineer</Link>
            <Link href="/boq-calculator" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Free BOQ Calculator</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* Chennai Challenges */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="tag" style={{ marginBottom: '12px' }}>Why Chennai is Different</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>Chennai Construction Challenges</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '12px auto 0', fontSize: '15px' }}>These are engineering realities unique to Chennai — not generic construction advice.</p>
          </div>
          <div className="grid-2" style={{ gap: '20px' }}>
            {CHALLENGES.map(c => (
              <div key={c.title} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{c.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Area Coverage */}
        <section style={{ marginBottom: '64px', background: 'var(--bg-card2)', borderRadius: 'var(--radius-lg)', padding: '48px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '26px', color: 'var(--secondary)' }}>Our Coverage Across Chennai</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
            {AREAS.map(area => (
              <Link key={area.slug} href={`/locations/chennai/${area.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius)', padding: '16px 20px', border: '1px solid var(--border)', transition: 'all 0.2s', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--secondary)', marginBottom: '4px' }}>{area.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{area.note}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '26px', color: 'var(--secondary)' }}>Chennai Construction Services</h2>
          </div>
          <div className="grid-3" style={{ gap: '16px' }}>
            {SERVICES.map(s => (
              <Link key={s.name} href={s.link} style={{ textDecoration: 'none' }}>
                <div className="card card-hover" style={{ textAlign: 'center', padding: '28px 20px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{s.name}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <FAQBlock title="Construction in Chennai — FAQs" faqs={FAQS} />

        <div className="card" style={{ marginTop: '48px', background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Ready to Build in Chennai the Right Way?</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>Talk to our Chennai structural engineers — free 30-minute consultation for your project.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=construction" className="btn btn-primary btn-lg">Talk to an Engineer</Link>
            <Link href="/how-it-works" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>How We Work</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Construction in Chennai', path: '/construction-in-chennai' }]} />
    </>
  );
}
