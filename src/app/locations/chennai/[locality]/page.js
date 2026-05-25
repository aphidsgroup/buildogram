import Link from 'next/link';
import { localities, localityMap } from '@/data/seo/localities';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return localities.map((l) => ({ locality: l.slug }));
}

export async function generateMetadata({ params }) {
  const loc = localityMap[params.locality];
  if (!loc) return {};
  return {
    title: `House Construction in ${loc.name}, Chennai | Buildogram`,
    description: `Build your home in ${loc.name}, Chennai with Buildogram. Engineer-led construction, itemized BOQ, soil conditions, rental demand, and property types in ${loc.name}.`,
      alternates: { canonical: `https://buildogram.in/locations/chennai/${loc.slug}` },
  };
}

const localBusinessSchema = (loc) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: `House Construction in ${loc.name}`,
  description: loc.desc,
  provider: { '@type': 'Organization', name: 'Buildogram', url: 'https://buildogram.in' },
  areaServed: { '@type': 'Place', name: `${loc.name}, Chennai, Tamil Nadu, India` },
});


const breadcrumbSchema = (loc) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://buildogram.in' },
    { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://buildogram.in/locations/chennai' },
    { '@type': 'ListItem', position: 3, name: loc.name, item: `https://buildogram.in/locations/chennai/${loc.slug}` },
  ],
});

export default function LocalityPage({ params }) {
  const loc = localityMap[params.locality];
  if (!loc) notFound();

  return (
    <>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(loc)) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(loc)) }} />

      <section style={{ background: '#0F172A', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', fontSize: '14px' }}>
            <Link href="/locations/chennai" style={{ color: '#94A3B8', textDecoration: 'none' }}>Chennai Locations</Link>
            <span style={{ color: '#475569' }}>/</span>
            <span style={{ color: 'white', fontWeight: 600 }}>{loc.name}</span>
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ background: 'rgba(252, 110, 32, 0.15)', color: '#FFB347', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: '1px solid rgba(252, 110, 32, 0.3)' }}>📍 {loc.region} Region</span>
            <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: '1px solid rgba(34, 197, 94, 0.3)' }}>✅ Verified Partners Available</span>
          </div>

          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.15, marginBottom: '20px', maxWidth: '800px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}>
            Construction Services & Verified Builders in <span style={{ color: '#FC6E20' }}>{loc.name}</span>
          </h1>
          
          <p style={{ color: '#CBD5E1', fontSize: '18px', maxWidth: '700px', lineHeight: 1.6, marginBottom: '40px' }}>
            {loc.desc} Explore local property trends, soil conditions, and connect with top-rated construction professionals serving the {loc.name} area.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href={`/partners/directory?q=${encodeURIComponent(loc.name)}`} className="btn btn-primary" style={{ padding: '14px 24px', fontSize: '16px' }}>Find Verified Builders</Link>
            <Link href="/materials" className="btn btn-outline-light" style={{ padding: '14px 24px', fontSize: '16px' }}>Request Material Quotes</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 24px' }}>

        {/* KEY DETAILS */}
        <div className="grid-3" style={{ gap: '20px', marginBottom: '56px' }}>
          <div className="card" style={{ borderTop: '3px solid var(--primary)' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '10px' }}>🏗 Soil Conditions</div>
            <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.7 }}>{loc.soilNote}</p>
          </div>
          <div className="card" style={{ borderTop: '3px solid #22c55e' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '10px' }}>📈 Property Demand</div>
            <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.7 }}>{loc.demandNote}</p>
          </div>
          <div className="card" style={{ borderTop: '3px solid #3b82f6' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '10px' }}>🏠 Rental Demand</div>
            <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.7 }}>{loc.rentalDemand}</p>
          </div>
        </div>

        {/* CONSTRUCTION TIPS */}
        <div className="card" style={{ marginBottom: '48px', borderLeft: '4px solid var(--warning)', borderRadius: '0 12px 12px 0', background: 'rgba(245,158,11,0.04)' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--warning)', marginBottom: '10px' }}>⚠ Construction Note for {loc.name}</div>
          <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.75 }}>{loc.constructionTips}</p>
        </div>

        {/* PROPERTY TYPES */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '16px' }}>Property Types in {loc.name}</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {(loc.properties || []).map((p, i) => (
              <span key={i} style={{ fontSize: '14px', color: 'var(--secondary)', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '999px', padding: '6px 16px' }}>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* NEARBY LOCALITIES */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '16px' }}>Nearby Localities</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {(loc.nearbyLocalities || []).map((n) => {
              const nearby = localities.find((l) => l.name === n);
              return nearby ? (
                <Link key={n} href={`/locations/chennai/${nearby.slug}`} style={{ fontSize: '13px', color: 'var(--accent)', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '999px', padding: '6px 16px', textDecoration: 'none', fontWeight: 500 }}>
                  {n}
                </Link>
              ) : (
                <span key={n} style={{ fontSize: '13px', color: 'var(--text-muted)', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '999px', padding: '6px 16px' }}>{n}</span>
              );
            })}
          </div>
        </div>

        {/* MARKETPLACE DISCOVERY BLOCK */}
        <div style={{ marginBottom: '64px', background: '#F8FAFC', padding: '40px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#0F172A' }}>Find Trusted Partners for {loc.name}</h2>
          <div className="grid-4" style={{ gap: '16px' }}>
            <Link href="/partners/directory?category=Builder" style={{ background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🏗️</span>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Builders</span>
              <span style={{ color: '#64748B', fontSize: '13px' }}>Turnkey construction</span>
            </Link>
            <Link href="/partners/directory?category=Architect" style={{ background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>📐</span>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Architects</span>
              <span style={{ color: '#64748B', fontSize: '13px' }}>Planning & Design</span>
            </Link>
            <Link href="/materials" style={{ background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🧱</span>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Materials</span>
              <span style={{ color: '#64748B', fontSize: '13px' }}>Best rates in {loc.name}</span>
            </Link>
            <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" style={{ background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🏠</span>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Buy/Sell Plots</span>
              <span style={{ color: '#64748B', fontSize: '13px' }}>360° Property Tours</span>
            </a>
          </div>
        </div>

        {/* BROWSE ALL */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Link href="/locations/chennai" style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span>←</span> Explore All Chennai Locations
          </Link>
        </div>
      </div>
    </>
  );
}
