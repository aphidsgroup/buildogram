import Link from 'next/link';
import { services } from '@/data/seo/services';
import { notFound } from 'next/navigation';
import RelatedLinksBlock from '@/components/seo/RelatedLinksBlock';
import ContextualCTA from '@/components/seo/ContextualCTA';
import { getContextualLinks } from '@/lib/seo/internalLinks';

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const svc = services.find((s) => s.slug === resolvedParams.slug);
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

export default async function ServicePage({ params }) {
  const resolvedParams = await params;
  const currentPath = `/services/${resolvedParams.slug}`;
  const relatedLinks = getContextualLinks('service', currentPath);

  const svc = services.find((s) => s.slug === resolvedParams.slug);
  if (!svc) notFound();

  return (
    <>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(svc)) }} />
<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(svc.faqs)) }}
      />

      {/* HERO */}
      <section style={{ background: '#0F172A', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', fontSize: '14px' }}>
            <Link href="/services" style={{ color: '#94A3B8', textDecoration: 'none' }}>Construction Services</Link>
            <span style={{ color: '#475569' }}>/</span>
            <span style={{ color: 'white', fontWeight: 600 }}>{svc.heroTitle}</span>
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: '1px solid rgba(59, 130, 246, 0.3)' }}>{svc.heroTag}</span>
            <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: '1px solid rgba(34, 197, 94, 0.3)' }}>✅ Buildogram Verified Service</span>
          </div>

          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.15, marginBottom: '20px', maxWidth: '800px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}>
            {svc.heroTitle}
          </h1>
          
          <p style={{ color: '#CBD5E1', fontSize: '18px', maxWidth: '700px', lineHeight: 1.6, marginBottom: '40px' }}>
            {svc.heroSubtitle}
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href={svc.cta.href} className="btn btn-primary" style={{ padding: '14px 24px', fontSize: '16px' }}>{svc.cta.text}</Link>
            {svc.ctaSecondary && (
              <Link href={svc.ctaSecondary.href} className="btn btn-outline-light" style={{ padding: '14px 24px', fontSize: '16px' }}>{svc.ctaSecondary.text}</Link>
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
                  <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', background: 'var(--secondary)', width: '24px', height: '24px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
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

        {/* MARKETPLACE DISCOVERY BLOCK */}
        <div style={{ marginBottom: '64px', background: '#F8FAFC', padding: '40px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#0F172A' }}>Explore Buildogram Marketplace</h2>
          <div className="grid-4" style={{ gap: '16px' }}>
            <Link href="/partners/directory?category=Builder" style={{ background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🏗️</span>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Hire Builders</span>
              <span style={{ color: '#64748B', fontSize: '13px' }}>Turnkey construction</span>
            </Link>
            <Link href="/materials" style={{ background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🧱</span>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Buy Materials</span>
              <span style={{ color: '#64748B', fontSize: '13px' }}>Direct from suppliers</span>
            </Link>
            <Link href="/partners/directory?category=Architect" style={{ background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>📐</span>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Find Architects</span>
              <span style={{ color: '#64748B', fontSize: '13px' }}>Planning & Design</span>
            </Link>
            <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" style={{ background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🏠</span>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Property Portal</span>
              <span style={{ color: '#64748B', fontSize: '13px' }}>Buy/Sell with 360° tours</span>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="card" style={{ background: '#0F172A', border: 'none', textAlign: 'center', padding: '44px', borderRadius: '16px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>Ready to get started?</h2>
          <p style={{ color: '#CBD5E1', fontSize: '16px', marginBottom: '28px' }}>Talk to our structural engineers and get a free initial consultation.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={svc.cta.href} className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>{svc.cta.text}</Link>
            {svc.ctaSecondary && <Link href={svc.ctaSecondary.href} className="btn btn-outline-light" style={{ padding: '14px 28px', fontSize: '16px' }}>{svc.ctaSecondary.text}</Link>}
          </div>
        </div>

      </div>
    
      <RelatedLinksBlock title="Explore Related Services" links={relatedLinks} variant="light" />
      <ContextualCTA pageType="service" currentPath={currentPath} />
</>
  );
}
