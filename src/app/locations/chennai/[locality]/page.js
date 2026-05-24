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

      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px', fontSize: '13px' }}>
            <Link href="/locations/chennai" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Chennai</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>{loc.name}</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', borderRadius: '6px', padding: '4px 12px', marginBottom: '16px', fontSize: '12px', background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontWeight: 700 }}>
            📍 {loc.region}
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(26px, 4vw, 50px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '800px' }}>
            House Construction in {loc.name}, Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', maxWidth: '620px', lineHeight: 1.7, marginBottom: '32px' }}>
            {loc.desc}
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">Start {loc.name} Construction</Link>
            <Link href="/cost-estimator" className="btn btn-lg btn-outline-light">Estimate Cost</Link>
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

        {/* BUILDOGRAM SERVICES IN AREA */}
        <div className="card" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '20px' }}>Buildogram Services in {loc.name}</h2>
          <div className="grid-3" style={{ gap: '12px' }}>
            {[
              { label: '🏗 House Construction', href: '/services/house-construction' },
              { label: '📋 Project Management (PMC)', href: '/services/construction-project-management' },
              { label: '🔍 Quality Inspection', href: '/services/quality-inspection' },
              { label: '👷 Site Supervision', href: '/services/site-supervision' },
              { label: '📊 BOQ Review', href: '/services/boq-review' },
              { label: '📐 Plan Review', href: '/services/house-plan-review' },
            ].map((svc) => (
              <Link key={svc.href} href={svc.href} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'var(--bg-alt)', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', color: 'var(--text)', fontWeight: 500, border: '1px solid var(--border)', lineHeight: 1.4 }}>
                {svc.label}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card" style={{ background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h2 style={{ color: 'white', fontSize: '26px', marginBottom: '12px' }}>Building in {loc.name}?</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', fontSize: '16px' }}>
            Get a free consultation with our structural engineers — including {loc.name}-specific site advice.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">Free Consultation</Link>
            <Link href="/cost-estimator" className="btn btn-lg btn-outline-light">Estimate Cost</Link>
          </div>
        </div>

        {/* BROWSE ALL */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Link href="/locations/chennai" style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>← All Chennai Locations</Link>
        </div>
      </div>
    </>
  );
}
