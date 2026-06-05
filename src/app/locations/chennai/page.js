import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import { localities } from '@/data/seo/localities';

export const metadata = generateSEOMetadata({
title: 'House Construction in Chennai | All Localities | Buildogram',
  description: 'Buildogram provides engineer-led house construction services across Chennai. Browse all localities including OMR, ECR, Tambaram, Anna Nagar, Porur, Velachery, and more.',,
  path: '/locations/chennai',
});

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Buildogram',
  description: 'Engineer-led construction and property services across Chennai',
  url: 'https://buildogram.in',
  areaServed: { '@type': 'City', name: 'Chennai', containsPlace: localities.map((l) => ({ '@type': 'Place', name: `${l.name}, Chennai` })) },
};

export default function ChennaiHub() {
  const regions = [...new Set(localities.map((l) => l.region))];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>📍 Chennai</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 50px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            House Construction in Chennai — All Localities
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '580px', lineHeight: 1.7 }}>
            Buildogram provides engineer-led construction, BOQ-based contracts, and quality supervision across all major Chennai localities.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 24px' }}>
        {regions.map((region) => {
          const regionLocalities = localities.filter((l) => l.region === region);
          return (
            <div key={region} style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid var(--border)' }}>
                📍 {region}
              </h2>
              <div className="grid-3" style={{ gap: '16px' }}>
                {regionLocalities.map((loc) => (
                  <Link key={loc.slug} href={`/locations/chennai/${loc.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card card-hover">
                      <h3 style={{ fontSize: '16px', color: 'var(--secondary)', fontWeight: 700, marginBottom: '8px' }}>{loc.name}</h3>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '12px' }}>{loc.desc.slice(0, 90)}…</p>
                      <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>Construction & property guide →</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <div className="card" style={{ background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px', marginTop: '20px' }}>
          <h2 style={{ color: 'white', fontSize: '26px', marginBottom: '12px' }}>Not sure about your locality?</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>Our engineers are familiar with construction conditions across all Chennai localities. Get site-specific advice.</p>
          <Link href="/contact" className="btn btn-primary btn-lg">Talk to Our Engineers</Link>
        </div>
      </div>
    </>
  );
}
