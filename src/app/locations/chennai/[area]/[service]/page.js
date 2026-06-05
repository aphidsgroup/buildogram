import { notFound } from 'next/navigation';
import { areas } from '@/data/seo/areas';
import { localServices } from '@/data/seo/localServices';
import { getAllAreaServiceCombinations, generateServiceAreaPage } from '@/lib/seo/localPageGenerator';
import { generateLocalBusinessSchema, generateFAQSchema, generateWebPageSchema, generateServiceSchema } from '@/lib/seo/localSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';

const BASE_URL = 'https://www.buildogram.in';

export async function generateStaticParams() {
  return getAllAreaServiceCombinations();
}

export async function generateMetadata({ params }) {
  const { area: areaSlug, service: serviceSlug } = await params;
  const data = generateServiceAreaPage(areaSlug, serviceSlug);
  if (!data) return {};

  return generateSEOMetadata({
    title: data.title,
    description: data.description,
    path: `/locations/chennai/${areaSlug}/${serviceSlug}`,
    noindex: !data.isIndexable,
  });
}

export default async function ServiceAreaPage({ params }) {
  const { area: areaSlug, service: serviceSlug } = await params;
  const data = generateServiceAreaPage(areaSlug, serviceSlug);
  if (!data) notFound();

  const { area, service, h1, intro, processSteps, faqs, internalLinks, isIndexable } = data;

  const localBusinessSchema = generateLocalBusinessSchema(area);
  const faqSchema = generateFAQSchema(faqs);
  const serviceSchema = generateServiceSchema(area, service);
  const webPageSchema = generateWebPageSchema({
    url: `${BASE_URL}/locations/chennai/${area.slug}/${service.slug}`,
    title: data.title,
    description: data.description,
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Chennai', href: '/locations/chennai' },
      { name: area.name, href: `/locations/chennai/${area.slug}` },
      { name: service.name, href: `/locations/chennai/${area.slug}/${service.slug}` },
    ],
  });

  return (
    <>
      {!isIndexable && (
        <meta name="robots" content="noindex, nofollow" />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sectionInner">

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '24px', fontSize: '14px', color: '#64748B' }}>
            <a href="/" style={{ color: '#FC6E20' }}>Home</a>{' / '}
            <a href="/locations/chennai" style={{ color: '#FC6E20' }}>Chennai</a>{' / '}
            <a href={`/locations/chennai/${area.slug}`} style={{ color: '#FC6E20' }}>{area.name}</a>{' / '}
            <span style={{ color: '#0F172A', fontWeight: 600 }}>{service.name}</span>
          </nav>

          {/* H1 + Intro */}
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 800, color: '#0F172A', marginBottom: '16px', lineHeight: 1.2 }}>
            {h1}
          </h1>
          <p style={{ fontSize: '17px', color: '#334155', lineHeight: 1.8, maxWidth: '780px', marginBottom: '40px' }}>
            {intro}
          </p>

          {/* Local Context Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
            {[
              { label: 'Region', value: area.region },
              { label: 'Approval Body', value: area.approvalBody },
              { label: 'Flood Risk', value: area.floodRisk },
              { label: 'Cost Range', value: `₹${area.costRange.min.toLocaleString('en-IN')}–₹${area.costRange.max.toLocaleString('en-IN')}/sqft` },
            ].map(item => (
              <div key={item.label} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 16px', minWidth: '180px' }}>
                <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '14px', color: '#0F172A', fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Local Soil / Challenge Note */}
          <section style={{ background: '#FFF7ED', border: '1px solid #FDBA74', borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#C2410C', marginBottom: '12px' }}>
              {area.name} — Local Construction Context
            </h2>
            <p style={{ fontSize: '14px', color: '#7C3011', lineHeight: 1.8, marginBottom: '12px' }}>
              <strong>Soil Type:</strong> {area.soilNote}
            </p>
            <p style={{ fontSize: '14px', color: '#7C3011', lineHeight: 1.8, marginBottom: '12px' }}>
              <strong>Construction Tips:</strong> {area.constructionTips}
            </p>
            <p style={{ fontSize: '14px', color: '#7C3011', lineHeight: 1.8 }}>
              <strong>Material Logistics:</strong> {area.materialLogistics}
            </p>
          </section>

          {/* Process Steps */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>
              How Buildogram Supports {service.name} in {area.name}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {processSteps.map(step => (
                <div
                  key={step.step}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '24px',
                  }}
                >
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#FC6E20', opacity: 0.3, marginBottom: '8px' }}>{step.step}</div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Nearby Areas for this service */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>
              {service.name} in Nearby Areas
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {area.nearbyAreas.map(nearby => {
                const nearbySlug = nearby.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
                return (
                  <a
                    key={nearby}
                    href={`/locations/chennai/${nearbySlug}/${service.slug}`}
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
                    {service.name} in {nearby}
                  </a>
                );
              })}
            </div>
          </section>

          {/* FAQ Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>
              Frequently Asked Questions — {service.name} in {area.name}
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
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#F8FAFC', marginBottom: '16px' }}>
              Related Buildogram Services
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {internalLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    color: '#FC6E20',
                    textDecoration: 'none',
                    fontSize: '13px',
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
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
              Get {service.name} Support in {area.name}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '24px' }}>
              Engineer-led transparency. Verified contractors. Competitive material pricing.
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
