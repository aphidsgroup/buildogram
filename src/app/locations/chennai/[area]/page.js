import { notFound } from 'next/navigation';
import { areas, areaMap } from '@/data/seo/areas';
import { localities, localityMap } from '@/data/seo/localities';
import { localServices } from '@/data/seo/localServices';
import { generateAreaPage } from '@/lib/seo/localPageGenerator';
import { generateLocalBusinessSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/seo/localSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';

const BASE_URL = 'https://www.buildogram.in';

export async function generateStaticParams() {
  // Combine both areas and old localities slugs
  const areaSlugs = areas.map(a => ({ area: a.slug }));
  const localitySlugs = localities
    .filter(l => !areaMap[l.slug]) // only add if not already in areas
    .map(l => ({ area: l.slug }));
  return [...areaSlugs, ...localitySlugs];
}

export async function generateMetadata({ params }) {
  const { area: areaSlug } = await params;
  const data = generateAreaPage(areaSlug);
  if (!data) return {};

  return generateSEOMetadata({
    title: data.title,
    description: data.description,
    path: `/locations/chennai/${areaSlug}`,
    noindex: !data.isIndexable,
  });
}

export default async function AreaPage({ params }) {
  const { area: areaSlug } = await params;
  const data = generateAreaPage(areaSlug);
  if (!data) notFound();

  const { area, faqs, internalLinks, services, isIndexable } = data;

  const localBusinessSchema = generateLocalBusinessSchema(area);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema({
    url: `${BASE_URL}/locations/chennai/${area.slug}`,
    title: data.title,
    description: data.description,
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Chennai', href: '/locations/chennai' },
      { name: area.name, href: `/locations/chennai/${area.slug}` },
    ],
  });

  return (
    <>
      {!isIndexable && (
        // Quality gate: noindex thin pages
        <meta name="robots" content="noindex, nofollow" />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sectionInner">

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '24px', fontSize: '14px', color: '#64748B' }}>
            <a href="/" style={{ color: '#FC6E20' }}>Home</a>{' / '}
            <a href="/locations/chennai" style={{ color: '#FC6E20' }}>Chennai</a>{' / '}
            <span style={{ color: '#0F172A', fontWeight: 600 }}>{area.name}</span>
          </nav>

          {/* H1 */}
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, color: '#0F172A', marginBottom: '16px', lineHeight: 1.2 }}>
            Home Construction in {area.name}, Chennai
          </h1>
          <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '8px', fontWeight: 600 }}>
            {area.region} · {area.approvalBody}
          </p>

          {/* Hero description */}
          <p style={{ fontSize: '17px', color: '#334155', lineHeight: 1.8, maxWidth: '780px', marginBottom: '40px' }}>
            {area.desc}
          </p>

          {/* Local Construction Context */}
          <section style={{ background: '#FFF7ED', border: '1px solid #FDBA74', borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#C2410C', marginBottom: '12px' }}>
              🏗 Local Construction Context — {area.name}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>Soil Type</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>{area.soilType}</p>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.7, marginTop: '8px' }}>{area.soilNote}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>Approval Body</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>{area.approvalBody}</p>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.7, marginTop: '8px' }}>{area.approvalNotes}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>Flood Risk</h3>
                <p style={{ fontSize: '14px', color: area.floodRisk === 'High' ? '#DC2626' : area.floodRisk?.startsWith('Moderate') ? '#D97706' : '#16A34A', fontWeight: 600 }}>
                  {area.floodRisk}
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>Estimated Construction Cost</h3>
                <p style={{ fontSize: '14px', color: '#FC6E20', fontWeight: 700 }}>
                  ₹{area.costRange.min.toLocaleString('en-IN')} – ₹{area.costRange.max.toLocaleString('en-IN')} per sqft
                </p>
                <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>Estimate only. Varies with specification and floor count.</p>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>Construction Tips for {area.name}</h3>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>{area.constructionTips}</p>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>Material Logistics</h3>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>{area.materialLogistics}</p>
            </div>
          </section>

          {/* Services Grid */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Construction Services Available in {area.name}
            </h2>
            <p style={{ fontSize: '15px', color: '#64748B', marginBottom: '24px' }}>
              Buildogram provides engineer-led support across the full construction journey in {area.name}:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {services.map(s => (
                <a
                  key={s.slug}
                  href={s.href}
                  style={{
                    display: 'block',
                    padding: '20px',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    color: '#0F172A',
                    fontWeight: 600,
                    fontSize: '15px',
                  }}
                >
                  {s.name} →
                </a>
              ))}
            </div>
          </section>

          {/* Nearby Areas */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>
              Nearby Areas We Also Serve
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {area.nearbyAreas.map(nearby => {
                const nearbySlug = nearby.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
                return (
                  <a
                    key={nearby}
                    href={`/locations/chennai/${nearbySlug}`}
                    style={{
                      padding: '8px 16px',
                      background: '#F1F5F9',
                      borderRadius: '999px',
                      color: '#334155',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: 500,
                      border: '1px solid #CBD5E1',
                    }}
                  >
                    {nearby}
                  </a>
                );
              })}
            </div>
          </section>

          {/* FAQ Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>
              Frequently Asked Questions — Construction in {area.name}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '20px 24px',
                  }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal Links */}
          <section style={{ background: '#0F172A', borderRadius: '16px', padding: '32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#F8FAFC', marginBottom: '16px' }}>
              Explore Buildogram Services
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {internalLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  style={{
                    padding: '10px 18px',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    color: '#FC6E20',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div style={{ textAlign: 'center', padding: '40px', background: 'linear-gradient(135deg, #FC6E20, #FF9A5C)', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
              Start Your {area.name} Construction Project
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '24px' }}>
              Get engineer-led guidance, verified contractors, and transparent pricing.
            </p>
            <a
              href="/contact?type=construction"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                background: '#fff',
                color: '#FC6E20',
                borderRadius: '999px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '16px',
              }}
            >
              Talk to an Engineer →
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
