import Link from 'next/link';
import { services } from '@/data/seo/services';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const svc = services.find((s) => s.slug === params.slug);
  if (!svc) return {};
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
    openGraph: { title: svc.metaTitle, description: svc.metaDescription, url: `https://buildogram.in/services/${svc.slug}` },
      alternates: { canonical: `https://buildogram.in/services/${svc.slug}` },
  };
}

const faqSchema = (faqs, pageUrl) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});


const breadcrumbSchema = (itemData) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://buildogram.in' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://buildogram.in/services' },
    { '@type': 'ListItem', position: 3, name: itemData.svc.title, item: `https://buildogram.in/services/${itemData.svc.slug}` },
  ],
});

export default function ServicePage({ params }) {
  const svc = services.find((s) => s.slug === params.slug);
  if (!svc) notFound();

  return (
    <>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(svc)) }} />
<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(svc.faqs)) }}
      />

      {/* HERO */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(255,218,1,0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,218,1,0.12)', border: '1px solid rgba(255,218,1,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ color: '#FFDA01', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{svc.heroTag}</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '20px', maxWidth: '760px' }}>
            {svc.heroTitle}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '600px', lineHeight: 1.7, marginBottom: '32px' }}>
            {svc.heroSubtitle}
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href={svc.cta.href} className="btn btn-primary btn-lg">{svc.cta.text}</Link>
            {svc.ctaSecondary && (
              <Link href={svc.ctaSecondary.href} className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>{svc.ctaSecondary.text}</Link>
            )}
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 24px' }}>

        {/* INTRO */}
        <div style={{ maxWidth: '780px', marginBottom: '56px' }}>
          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--text)' }}>{svc.intro}</p>
        </div>

        {/* WHO IT'S FOR + WHAT WE DO */}
        <div className="grid-2" style={{ gap: '40px', marginBottom: '60px', alignItems: 'start' }}>
          <div className="card">
            <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '20px' }}>Who is this for?</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {svc.whoFor.map((w, i) => (
                <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#FFDA01', background: 'var(--secondary)', width: '24px', height: '24px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
                  <span style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.5 }}>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '20px' }}>What Buildogram Does</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {svc.whatWeDo.map((item, i) => (
                <li key={i} style={{ borderBottom: i < svc.whatWeDo.length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: i < svc.whatWeDo.length - 1 ? '16px' : '0' }}>
                  <div style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '14px', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* PROCESS */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', color: 'var(--secondary)', marginBottom: '32px', textAlign: 'center' }}>Our Process</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {svc.process.map((step, i) => (
              <div key={i} className="card" style={{ borderTop: '3px solid var(--primary)' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '8px' }}>{step.step}</div>
                <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DELIVERABLES */}
        <div className="card" style={{ marginBottom: '60px', background: 'var(--bg-card2)' }}>
          <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '20px' }}>What You Receive</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {svc.deliverables.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: 'var(--success)', fontSize: '16px', flexShrink: 0 }}>✅</span>
                <span style={{ fontSize: '14px', color: 'var(--text)' }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DISCLAIMER */}
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '12px', padding: '20px 24px', marginBottom: '60px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--warning)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>⚠ Disclaimer</div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{svc.disclaimer}</p>
        </div>

        {/* FAQS */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', color: 'var(--secondary)', marginBottom: '32px' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '780px' }}>
            {svc.faqs.map((faq, i) => (
              <div key={i} className="card">
                <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '8px' }}>{faq.q}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RELATED SERVICES */}
        {svc.relatedServices && svc.relatedServices.length > 0 && (
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '20px' }}>Related Services</h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {svc.relatedServices.map((rs) => {
                const related = services.find((s) => s.slug === rs);
                return related ? (
                  <Link key={rs} href={`/services/${rs}`} className="btn btn-outline btn-sm">{related.heroTitle}</Link>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="card" style={{ background: 'var(--gradient-dark)', color: 'white', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '12px' }}>Ready to get started?</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', fontSize: '16px' }}>Talk to our structural engineers and get a free initial consultation.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={svc.cta.href} className="btn btn-primary btn-lg">{svc.cta.text}</Link>
            {svc.ctaSecondary && <Link href={svc.ctaSecondary.href} className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>{svc.ctaSecondary.text}</Link>}
          </div>
        </div>

      </div>
    </>
  );
}
