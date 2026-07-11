import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Construction Services by Location in Chennai | Buildogram',
  description: 'Buildogram delivers engineer-led home construction, structural audits, land surveys, and material sourcing across all major Chennai localities — OMR, ECR, Anna Nagar, Velachery, Tambaram, Porur, and more.',
  path: '/locations',
});

const SERVICE_AREAS = [
  { name: 'OMR (Old Mahabalipuram Road)', slug: 'omr', note: 'Sandy loam soil, IT corridor boom zone, CMDA regulated' },
  { name: 'ECR (East Coast Road)', slug: 'ecr', note: 'Sandy coastal soil, DTCP zones, sea breeze corrosion risk' },
  { name: 'Anna Nagar', slug: 'anna-nagar', note: 'Red laterite soil, CMC limits, dense residential mix' },
  { name: 'Velachery', slug: 'velachery', note: 'Clay & fill soil, flood-prone CRP bed zone, high plinth critical' },
  { name: 'Tambaram', slug: 'tambaram', note: 'Hard rock & red soil, DTCP & panchayat mix, good bearing capacity' },
  { name: 'Porur', slug: 'porur', note: 'Mixed loam, lake proximity zones, CMDA regulated parcels' },
  { name: 'Adyar', slug: 'adyar', note: 'Estuary proximity, silty soil near river, heritage building zones' },
  { name: 'Nungambakkam', slug: 'nungambakkam', note: 'Central Chennai, high FSI zones, CMC residential corridors' },
  { name: 'T Nagar', slug: 't-nagar', note: 'Dense urban core, narrow plots, mixed use CMDA zoning' },
  { name: 'Perambur', slug: 'perambur', note: 'North Chennai, old industrial belt, laterite over black cotton' },
  { name: 'Guindy', slug: 'guindy', note: 'Industrial estate proximity, varied soil, strong CMDA oversight' },
  { name: 'Sholinganallur', slug: 'sholinganallur', note: 'OMR South, IT parks, sandy fill plots, CMDA development zone' },
  { name: 'Chromepet', slug: 'chromepet', note: 'Peri-urban, mixed DTCP and panchayat plots, affordable land' },
  { name: 'Madipakkam', slug: 'madipakkam', note: 'Southward expansion, clay-sandy mix, emerging residential hub' },
  { name: 'Pallavaram', slug: 'pallavaram', note: 'Airport zone, ATC height restrictions apply, CMDA regulated' },
];

const GEO_FACTORS = [
  {
    icon: '🪨',
    title: 'Soil Type Varies by Zone',
    desc: 'Velachery and Pallikaranai sit on lake-bed clay and fill soil — requiring raft or pile foundations. Tambaram has hard rock at shallow depth — ideal for conventional strip footings. ECR and OMR plots have sandy coastal soil with high permeability. Knowing your local soil type before designing your foundation is critical to avoid differential settlement and slab cracking.',
  },
  {
    icon: '🏛️',
    title: 'CMDA vs DTCP vs Panchayat Zones',
    desc: 'Properties within the Chennai Metropolitan Area (CMDA) must follow stricter FSI and setback regulations than DTCP-approved plots in suburbs like Tambaram, Chromepet, and Pallavaram. Panchayat-limit plots have yet another set of approval norms. Buildogram\'s engineers verify your plot\'s jurisdictional zone before preparing architectural drawings — preventing costly rejection at CMDA or DTCP.',
  },
  {
    icon: '🌊',
    title: 'Flood Risk & Plinth Height',
    desc: 'The Adyar River estuary, Pallikaranai marshlands, and the Buckingham Canal corridor create flood risk zones across south and central Chennai. FEMA flood maps and CMDA\'s flood overlay zoning determine minimum plinth height. Buildogram mandates a plinth height survey and cross-references historical flood data before finalizing your foundation level.',
  },
  {
    icon: '🧂',
    title: 'Coastal Chloride Exposure',
    desc: 'Buildings within 5 km of the coastline (ECR, Besant Nagar, Adyar, OMR South) face aggressive chloride-ion penetration into concrete. This corrodes TMT steel reinforcement from inside, causing cover spalling and structural failure over 15–20 years. We specify Corrosion Resistant Steel (CRS) rebar and higher cement-to-water ratios as standard for all coastal-zone projects.',
  },
];

export default function LocationsHub() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Service Locations</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Construction &amp; Engineering Services Across Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            Buildogram operates across all major Chennai localities. Each area has unique soil conditions, municipal zoning rules, and flood risk factors that directly impact your construction design. Our engineers account for every local variable.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">Get a Free Site Assessment</Link>
            <Link href="/services" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Browse All Services</Link>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA GRID ── */}
      <section style={{ padding: '72px 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(252,110,32,0.08)', color: 'var(--primary)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '999px', marginBottom: '16px' }}>
              All Chennai Areas
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--secondary)', marginBottom: '12px', lineHeight: 1.2 }}>
              Where We Build
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--text-muted)', maxWidth: '620px', lineHeight: 1.6 }}>
              Select your locality to see area-specific soil conditions, relevant regulations, and the Buildogram services most relevant for your project.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {SERVICE_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/chennai/${area.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="card-hover"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: '24px 28px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', lineHeight: 1.3 }}>
                      {area.name}
                    </h3>
                    <span style={{ color: 'var(--primary)', fontSize: '18px', flexShrink: 0, marginLeft: '8px' }}>→</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                    {area.note}
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>
                      View area services →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY LOCATION MATTERS ── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-card2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(252,110,32,0.08)', color: 'var(--primary)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '999px', marginBottom: '16px' }}>
              Location Intelligence
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--secondary)', marginBottom: '12px' }}>
              Why Chennai Location Matters for Construction
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
              A house designed for OMR will fail if built on Velachery clay without modifications. Chennai's diverse microzones demand site-specific engineering — not copy-paste designs.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
            {GEO_FACTORS.map((factor) => (
              <div
                key={factor.title}
                className="card"
                style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
              >
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{factor.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '12px', lineHeight: 1.3 }}>
                  {factor.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                  {factor.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK LINKS: TOP SERVICES ── */}
      <section style={{ padding: '72px 0', background: 'var(--bg)' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)', marginBottom: '32px', textAlign: 'center' }}>
            Services Available in All Chennai Areas
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '900px', margin: '0 auto' }}>
            {[
              ['House Construction', '/services/house-construction'],
              ['BOQ Review', '/services/boq-review'],
              ['Structural Audit', '/structural-audit-chennai'],
              ['Land Survey', '/land-survey-chennai'],
              ['Soil Testing', '/soil-testing-chennai'],
              ['Site Supervision', '/services/site-supervision'],
              ['Material Sourcing', '/building-materials-chennai'],
              ['Piling Works', '/piling-works-chennai'],
              ['Construction Cost Estimation', '/services/construction-cost-consultation'],
              ['Verified Contractors', '/verified-contractors-chennai'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                style={{
                  padding: '10px 20px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '999px',
                  color: 'var(--text)',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                className="card-hover"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 0', background: 'var(--secondary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(252, 110, 32, 0.12) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: 'clamp(24px, 3vw, 40px)', marginBottom: '16px', lineHeight: 1.2 }}>
            Ready to Build in Chennai? Start with a Free Site Review.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '17px', maxWidth: '600px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            Tell us your locality and plot details. Our structural engineer will assess your soil type, CMDA zone, and flood risk — and recommend the right foundation and construction approach.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">Book Free Site Assessment</Link>
            <Link
              href="/cost-estimator"
              className="btn btn-lg"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              Estimate My Construction Cost
            </Link>
          </div>
        </div>
      </section>

      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Construction Services by Location', path: '/locations' },
        ]}
      />
    </>
  );
}
