import { notFound } from 'next/navigation';
import { areas, areaMap } from '@/data/seo/areas';
import { localities, localityMap } from '@/data/seo/localities';
import { localServices } from '@/data/seo/localServices';
import { generateAreaPage } from '@/lib/seo/localPageGenerator';
import { generateLocalBusinessSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/seo/localSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { getConversionContext } from '@/lib/conversion/context';
import ContextualEnquiryForm from '@/components/conversion/ContextualEnquiryForm';

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
            Construction Services in {area.name}, Chennai
          </h1>
          <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '8px', fontWeight: 600 }}>
            {area.region} · {area.zone} · {area.approvalBody}
          </p>

          {/* GEO answer block - directly answers 'construction in [area]' for AI Overviews */}
          <div style={{ background: 'linear-gradient(135deg, rgba(252,110,32,0.06), rgba(252,110,32,0.02))', border: '1px solid rgba(252,110,32,0.2)', borderLeft: '3px solid var(--primary)', borderRadius: '8px', padding: '16px 20px', margin: '20px 0', maxWidth: '700px' }}>
            <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.8, margin: 0 }}>
              <strong>Building in {area.name}?</strong> {area.soilNote} {area.constructionTips}
            </p>
          </div>

          {/* SEO P0 (2026-07-25): locality cost figures and flood-risk ratings removed —
              unsourced categorical claims. Replaced with site-specific due-diligence guidance. */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px 24px', minWidth: '260px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Construction Cost</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)' }}>Project-specific</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Depends on specification, structural design and site conditions — request a written estimate.</div>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px 24px', minWidth: '260px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Site Due Diligence</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)' }}>Verify per plot</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Site-level drainage, road level and historical waterlogging should be verified during due diligence.</div>
            </div>
          </div>

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
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>Drainage & Waterlogging</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>
                  {area.floodRisk}
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>Construction Cost</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>
                  Cost depends on specification, structural design, number of floors and site conditions. Buildogram does not publish a fixed locality rate — request a project-specific estimate with a written scope and assumptions.
                </p>
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

          {/* CONTEXTUAL ENQUIRY FORM */}
          <div style={{ marginBottom: '48px', maxWidth: '640px', margin: '0 auto 48px' }}>
            <ContextualEnquiryForm context={getConversionContext(`/locations/chennai/${area.slug}`)} placement="inline" />
          </div>

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

          {area.materialLogistics && (
            <section style={{ background: '#F8FAFC', borderRadius: '12px', padding: '28px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '12px' }}>Material Logistics in {area.name}</h2>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7 }}>{area.materialLogistics}</p>
            </section>
          )}

          {/* Nearby Areas */}
          {area.nearbyAreas && area.nearbyAreas.length > 0 && (
            <section style={{ padding: '40px 0', borderTop: '1px solid var(--border)' }}>
              <div className="container">
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>Nearby Areas We Serve</h2>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {area.nearbyAreas.map(nearby => {
                    const nearbySlug = nearby.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    return (
                      <a key={nearby} href={`/locations/chennai/${nearbySlug}`}
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px', padding: '6px 14px', fontSize: '13px', color: 'var(--secondary)', textDecoration: 'none', fontWeight: 500 }}>
                        {nearby} →
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

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
              Get engineer-led guidance, contractors, and transparent pricing.
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
