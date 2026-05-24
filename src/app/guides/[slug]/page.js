import Link from 'next/link';
import { guides, guideMap, guideCategories } from '@/data/seo/guides';
import { notFound } from 'next/navigation';

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

export default function GuidePage({ params }) {
  const guide = guideMap[params.slug];
  if (!guide) notFound();

  const categoryLabel = guide.category.charAt(0).toUpperCase() + guide.category.slice(1).replace(/-/g, ' ');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(guide)) }} />
      {guide.faqs && guide.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(guide.faqs)) }} />
      )}

      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', fontSize: '13px' }}>
            <Link href="/guides" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Guides</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ color: '#FFDA01', textTransform: 'capitalize' }}>{categoryLabel}</span>
          </nav>
          <h1 style={{ color: 'white', fontSize: 'clamp(24px, 3.5vw, 46px)', lineHeight: 1.2, marginBottom: '16px', maxWidth: '800px' }}>
            {guide.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '640px', lineHeight: 1.7 }}>
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
            <div className="card" style={{ background: 'rgba(255,218,1,0.05)', border: '1px solid rgba(255,218,1,0.2)', marginBottom: '48px' }}>
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

          {/* CTA */}
          <div className="card" style={{ background: 'var(--secondary)', border: 'none', textAlign: 'center', padding: '40px' }}>
            <h3 style={{ color: 'white', fontSize: '22px', marginBottom: '12px' }}>Need expert guidance?</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', fontSize: '15px' }}>Talk to our structural engineers for project-specific advice.</p>
            <Link href={guide.cta.href} className="btn btn-primary btn-lg">{guide.cta.text}</Link>
          </div>

        </article>

        {/* SIDEBAR */}
        <aside style={{ width: '280px', flexShrink: 0, display: 'none', paddingTop: '56px', paddingLeft: '40px' }}>
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
    </>
  );
}
