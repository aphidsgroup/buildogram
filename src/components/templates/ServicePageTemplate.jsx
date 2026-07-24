import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import EngineerCredibility from '@/components/seo/EngineerCredibility';

export default function ServicePageTemplate({ service }) {
  const {
    slug, h1, heroSubtitle, heroTag, hasHero, answerQuestion, answerText,
    processStepsTitle, steps, faqs, stats, ctaHref, ctaLabel,
    ctaSecondaryHref, ctaSecondaryLabel, breadcrumbLabel, relatedLinks, jsonLdType
  } = service;

  return (
    <>
      {/* JSON-LD Schemas - inject 3 schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchemas(service)) }}
      />

      {/* CONDITIONAL HERO: only if hasHero === true */}
      {hasHero && (
        <section style={{
          background: 'var(--secondary)',
          padding: 'clamp(60px, 8vw, 100px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
          <div className="container" style={{ position: 'relative' }}>
            {heroTag && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
                <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{heroTag}</span>
              </div>
            )}
            <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>{h1}</h1>
            {heroSubtitle && (
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>{heroSubtitle}</p>
            )}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href={ctaHref} className="btn btn-primary btn-lg">{ctaLabel}</Link>
              {ctaSecondaryHref && (
                <Link href={ctaSecondaryHref} className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>{ctaSecondaryLabel}</Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* STATS BAR: only if stats array has items */}
      {stats && stats.length > 0 && (
        <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ padding: '20px 24px', display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {stats.map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)' }}>{val}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAGE HEADER: for non-hero pages, show a simple header */}
      {!hasHero && (
        <section style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
          <div className="container">
            <Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: breadcrumbLabel, href: `/${slug}` }]} injectSchema={false} />
            <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--secondary)', marginTop: '16px', lineHeight: 1.2, maxWidth: '720px' }}>{h1}</h1>
          </div>
        </section>
      )}

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* ANSWER BLOCK: GEO direct-answer format (gingiris-seo-geo standard) */}
        {answerQuestion && answerText && (
          <section style={{ marginBottom: '48px' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(252,110,32,0.06) 0%, rgba(255,163,100,0.04) 100%)', border: '1px solid rgba(252,110,32,0.18)', borderLeft: '4px solid var(--primary)', borderRadius: 'var(--radius)', padding: '24px 28px' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>💡 {answerQuestion}</p>
              <p style={{ fontSize: '16px', color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{answerText}</p>
            </div>
          </section>
        )}

        {/* PROCESS STEPS SECTION */}
        {steps && steps.length > 0 && (
          <section style={{ marginBottom: '64px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="tag" style={{ marginBottom: '12px' }}>Our Process</div>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>{processStepsTitle}</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {steps.map(p => (
                <div key={p.step} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', background: 'white' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(252,110,32,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0, fontFamily: 'var(--font-space)' }}>{p.step}</div>
                  <div>
                    <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '6px' }}>{p.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ SECTION - gingiris-seo-geo FAQPage JSON-LD compatible */}
        {faqs && faqs.length > 0 && (
          <section style={{ marginBottom: '64px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="tag" style={{ marginBottom: '12px' }}>Common Questions</div>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>Frequently Asked Questions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="card"
                  style={{ background: 'white', cursor: 'pointer' }}
                  open={i === 0}
                >
                  <summary style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', padding: '20px 24px', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {faq.question}
                    <span style={{ color: 'var(--primary)', flexShrink: 0, marginLeft: '16px' }}>+</span>
                  </summary>
                  <div style={{ padding: '0 24px 20px', borderTop: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.8, marginTop: '16px' }}>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* E-E-A-T Trust Block */}
        <EngineerCredibility compact />

        {/* RELATED LINKS */}
        {relatedLinks && relatedLinks.length > 0 && (
          <div style={{ marginTop: '48px', padding: '24px', background: '#FFF7ED', borderRadius: 'var(--radius)', border: '1px solid #FED7AA' }}>
            <p style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '12px', fontSize: '14px' }}>Related Services</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {relatedLinks.map(([label, href]) => (
                <Link key={href} href={href} style={{ padding: '7px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: 'var(--text)', fontSize: '13px', fontWeight: 600 }}>{label}</Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA BLOCK - gingiris-seo-geo CTA Convert Block standard */}
        <div className="card" style={{ marginTop: '48px', background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h3 style={{ color: 'white', fontSize: '26px', marginBottom: '12px' }}>Ready to get started?</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '540px', margin: '0 auto 28px' }}>Talk to our verified engineers in Chennai for a free consultation on your project requirements.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={ctaHref} className="btn btn-primary btn-lg">{ctaLabel}</Link>
            {ctaSecondaryHref && (
              <Link href={ctaSecondaryHref} className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>{ctaSecondaryLabel}</Link>
            )}
          </div>
        </div>

      </div>

      {/* BREADCRUMB SCHEMA (for hero pages, show it at the bottom) */}
      {hasHero && (
        <Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: breadcrumbLabel, href: `/${slug}` }]} injectSchema={false} />
      )}
    </>
  );
}

function buildSchemas(service) {
  const baseUrl = 'https://www.buildogram.in';
  const url = `${baseUrl}/${service.slug}`;

  // Schema 1: BreadcrumbList (gingiris standard: always present)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: service.breadcrumbLabel, item: url },
    ],
  };

  // Schema 2: FAQPage (gingiris standard: FAQPage JSON-LD 5-8 Q&As)
  const faqSchema = service.faqs && service.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null;

  // Schema 3: Service/LocalBusiness based on jsonLdType
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.h1,
    description: service.metaDescription,
    url,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Buildogram',
      url: baseUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
      telephone: '+919360232456',
      areaServed: 'Chennai',
    },
  };

  return [breadcrumbSchema, faqSchema, serviceSchema].filter(Boolean);
}
