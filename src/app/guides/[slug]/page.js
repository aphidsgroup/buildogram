import Link from 'next/link';
import { guides, guideMap, guideCategories } from '@/data/seo/guides';
import { notFound } from 'next/navigation';
import RelatedLinksBlock from '@/components/seo/RelatedLinksBlock';
import ContextualCTA from '@/components/seo/ContextualCTA';
import { getContextualLinks } from '@/lib/seo/internalLinks';

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const guide = guideMap[params.slug];
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    openGraph: { title: guide.metaTitle, description: guide.metaDescription },
      alternates: { canonical: `https://buildogram.in/guides/${guide.slug}` },
  };
}

const articleSchema = (guide) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: guide.title,
  description: guide.metaDescription,
  author: { '@type': 'Organization', name: 'Buildogram' },
  publisher: { '@type': 'Organization', name: 'Buildogram', url: 'https://buildogram.in' },
});

const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: (faqs || []).map((f) => ({
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
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://buildogram.in/guides' },
    { '@type': 'ListItem', position: 3, name: itemData.guide.title, item: `https://buildogram.in/guides/${itemData.guide.slug}` },
  ],
});

export default function GuidePage({ params }) {
  const currentPath = `/guides${params.slug}`.replace('//', '/');
  const relatedLinks = getContextualLinks('service', currentPath);

  const guide = guideMap[params.slug];
  if (!guide) notFound();

  const categoryLabel = guide.category.charAt(0).toUpperCase() + guide.category.slice(1).replace(/-/g, ' ');

  return (
    <>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(guide)) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(guide)) }} />
      {guide.faqs && guide.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(guide.faqs)) }} />
      )}

      <section style={{ background: '#0F172A', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', fontSize: '14px' }}>
            <Link href="/guides" style={{ color: '#94A3B8', textDecoration: 'none' }}>Guides</Link>
            <span style={{ color: '#475569' }}>/</span>
            <span style={{ color: 'white', fontWeight: 600, textTransform: 'capitalize' }}>{categoryLabel}</span>
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: '1px solid rgba(59, 130, 246, 0.3)' }}>📚 Construction Guide</span>
          </div>

          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.15, marginBottom: '20px', maxWidth: '800px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}>
            {guide.title}
          </h1>
          
          <p style={{ color: '#CBD5E1', fontSize: '18px', maxWidth: '700px', lineHeight: 1.6, marginBottom: '40px' }}>
            {guide.metaDescription}
          </p>
        </div>
      </section>

      <div style={{ display: 'flex', gap: '0', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* MAIN CONTENT */}
        <article style={{ flex: 1, minWidth: 0, padding: '56px 0' }}>

          <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--text)', marginBottom: '48px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
            {guide.intro}
          </p>

          {guide.sections.map((sec, i) => (
            <div key={i} style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '16px' }}>{sec.heading}</h2>
              {sec.content && <p style={{ fontSize: '16px', color: 'var(--text)', lineHeight: 1.8, marginBottom: sec.items ? '16px' : '0' }}>{sec.content}</p>}
              {sec.items && (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {sec.items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '18px', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>▸</span>
                      <span style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.7 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* CHECKLIST */}
          {guide.checklist && guide.checklist.length > 0 && (
            <div className="card" style={{ background: 'rgba(252, 110, 32, 0.05)', border: '1px solid rgba(252, 110, 32, 0.28)', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '20px' }}>📋 Quick Checklist</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {guide.checklist.map((item, i) => (
                  <label key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}>
                    <span style={{ width: '20px', height: '20px', border: '2px solid var(--primary)', borderRadius: '4px', flexShrink: 0, display: 'inline-block', marginTop: '2px' }} />
                    <span style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.6 }}>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* FAQS */}
          {guide.faqs && guide.faqs.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>FAQs</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {guide.faqs.map((faq, i) => (
                  <div key={i} className="card">
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{faq.q}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MARKETPLACE DISCOVERY BLOCK */}
          <div style={{ marginBottom: '64px', marginTop: '48px', background: '#F8FAFC', padding: '40px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#0F172A' }}>Explore Buildogram Marketplace</h2>
            <div className="grid-2" style={{ gap: '16px' }}>
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
            </div>
          </div>

          {/* CTA */}
          <div className="card" style={{ background: '#0F172A', border: 'none', textAlign: 'center', padding: '44px', borderRadius: '16px' }}>
            <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Need expert guidance?</h3>
            <p style={{ color: '#CBD5E1', fontSize: '16px', marginBottom: '28px' }}>Talk to our structural engineers for project-specific advice.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={guide.cta.href} className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>{guide.cta.text}</Link>
            </div>
          </div>

        </article>

        {/* SIDEBAR */}
        <aside className="hide-on-mobile" style={{ width: '280px', flexShrink: 0, display: 'block', paddingTop: '56px', paddingLeft: '40px' }}>
          <div className="card" style={{ position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Related Guides</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(guide.relatedGuides || []).map((slug) => {
                const rel = guideMap[slug];
                return rel ? (
                  <Link key={slug} href={`/guides/${slug}`} style={{ textDecoration: 'none', fontSize: '13px', color: 'var(--text)', padding: '8px', borderRadius: '8px', background: 'var(--bg-alt)', lineHeight: 1.4, display: 'block' }}>
                    → {rel.title}
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </aside>

      </div>
    
      <RelatedLinksBlock title="Explore Related Services" links={relatedLinks} variant="light" />
      <ContextualCTA pageType="service" currentPath={currentPath} />
</>
  );
}
