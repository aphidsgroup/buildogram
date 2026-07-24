import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import { areas, areaMap } from '@/data/seo/areas';
import { localities } from '@/data/seo/localities';
import { generateLocalBusinessSchema } from '@/lib/seo/schema';
import RelatedLinksBlock from '@/components/seo/RelatedLinksBlock';
import ContextualCTA from '@/components/seo/ContextualCTA';
import { getContextualLinks } from '@/lib/seo/internalLinks';

export const metadata = generateSEOMetadata({
  title: 'Construction Services in Chennai | BOQ, Structural Audit, Supervision | Buildogram',
  description: 'Buildogram provides engineer-led construction support across Chennai — BOQ review, structural audits, soil testing, site supervision, and material sourcing. Serving 28 localities.',
  path: '/locations/chennai',
});

// Combine both lists for the directory
const allLocations = [
  ...areas,
  ...localities.filter(l => !areaMap[l.slug])
].sort((a, b) => a.name.localeCompare(b.name));

const localBusinessSchema = generateLocalBusinessSchema();

export default function ChennaiHub() {
  const currentPath = '/locations/chennai';
  const relatedLinks = getContextualLinks('location', currentPath);

  const regions = [...new Set(allLocations.map((l) => l.region))].sort();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Chennai Service Area Hub</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 50px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '800px' }}>
            Chennai Construction & Property Ecosystem
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '580px', lineHeight: 1.7, marginBottom: '28px' }}>
            Buildogram serves Chennai with engineer-led construction support — BOQ reviews, structural audits, soil testing, material sourcing and site supervision across 28 localities.
          </p>
          {/* GEO answer block — directly answers 'construction services in Chennai' */}
          <div style={{ background: 'rgba(252,110,32,0.12)', border: '1px solid rgba(252,110,32,0.25)', borderLeft: '4px solid var(--primary)', borderRadius: '8px', padding: '16px 20px', maxWidth: '560px', marginBottom: '28px' }}>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: 'var(--primary)' }}>Quick answer:</strong> Buildogram is an engineer-led construction support platform in Chennai — not a contractor. We review BOQs, supervise sites, source materials, and audit structures independently on behalf of property owners.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">Talk to an Engineer</Link>
            <Link href="/boq-review-chennai" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>BOQ Review →</Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '20px 24px', display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['28+', 'Chennai Localities'], ['500+', 'Projects Supported'], ['18%', 'Average Savings'], ['₹50Cr+', 'Value Managed']].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)' }}>{val}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <section style={{ padding: '60px 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#1E293B' }}>Our Services in Chennai</h2>
          <div className="grid-3" style={{ gap: '20px' }}>
            <Link href="/home-construction-chennai" style={{ textDecoration: 'none' }}>
              <div className="card card-hover" style={{ height: '100%', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>🏠 Home Construction</h3>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>Engineer-led execution and BOQ-based transparency.</p>
              </div>
            </Link>
            <Link href="/materials" style={{ textDecoration: 'none' }}>
              <div className="card card-hover" style={{ height: '100%', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>🧱 Material Sourcing</h3>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>Procure cement, steel, sand, and more direct to site.</p>
              </div>
            </Link>
            <Link href="/structural-audit-chennai" style={{ textDecoration: 'none' }}>
              <div className="card card-hover" style={{ height: '100%', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>🔍 Structural Audit</h3>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>NDT testing and crack inspections for buildings.</p>
              </div>
            </Link>
            <Link href="/soil-testing-chennai" style={{ textDecoration: 'none' }}>
              <div className="card card-hover" style={{ height: '100%', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>🗺️ Survey & Piling</h3>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>Soil testing, land surveys, and pile foundations.</p>
              </div>
            </Link>
            <Link href="/partners/directory" style={{ textDecoration: 'none' }}>
              <div className="card card-hover" style={{ height: '100%', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>🤝 Verified Partners</h3>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>Find trusted architects, builders, and contractors.</p>
              </div>
            </Link>
            <Link href="/property-passport" style={{ textDecoration: 'none' }}>
              <div className="card card-hover" style={{ height: '100%', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>📱 Property Passport</h3>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>Digital documentation for handover and maintenance.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '32px', color: '#1E293B', textAlign: 'center' }}>Localities Served in Chennai</h2>
        {regions.map((region) => {
          const regionLocalities = allLocations.filter((l) => l.region === region);
          if (regionLocalities.length === 0) return null;
          
          return (
            <div key={region} style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid var(--border)' }}>
                📍 {region}
              </h2>
              <div className="grid-3" style={{ gap: '16px' }}>
                {regionLocalities.map((loc) => (
                  <Link key={loc.slug} href={`/locations/chennai/${loc.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card card-hover" style={{ padding: '20px' }}>
                      <h3 style={{ fontSize: '16px', color: 'var(--secondary)', fontWeight: 700, marginBottom: '8px' }}>{loc.name}</h3>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '12px' }}>{loc.desc.slice(0, 90)}…</p>
                      <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>View area details →</div>
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
      
      <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Locations","path":"/locations"},{"name":"Services in Chennai","path":"/locations/chennai"}]} />
    
      <RelatedLinksBlock title="Explore Related Services" links={relatedLinks} variant="light" />
      <ContextualCTA pageType="location" currentPath={currentPath} />
</>
  );
}
