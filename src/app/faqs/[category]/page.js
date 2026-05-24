import Link from 'next/link';
import { faqCategories, faqMap } from '@/data/seo/faqs';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return faqCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const cat = faqMap[params.category];
  if (!cat) return {};
  return { title: cat.metaTitle, description: cat.metaDescription };
}

export default function FaqCategoryPage({ params }) {
  const cat = faqMap[params.category];
  if (!cat) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cat.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px', fontSize: '13px' }}>
            <Link href="/faqs" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>FAQs</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ color: '#FFDA01' }}>{cat.title}</span>
          </nav>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>{cat.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '560px', lineHeight: 1.7 }}>{cat.intro}</p>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 24px', maxWidth: '860px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {cat.faqs.map((faq, i) => (
            <details key={i} style={{ borderBottom: '1px solid var(--border)', padding: '0' }} open={i === 0}>
              <summary style={{ padding: '20px 0', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--secondary)', lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ color: 'var(--primary)', fontSize: '20px', flexShrink: 0, fontWeight: 700 }}>+</span>
              </summary>
              <div style={{ paddingBottom: '20px', paddingRight: '32px' }}>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8 }}>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>

        {/* OTHER CATEGORIES */}
        <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '20px' }}>Other FAQ Categories</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {faqCategories.filter((c) => c.slug !== params.category).map((c) => (
              <Link key={c.slug} href={`/faqs/${c.slug}`} className="btn btn-outline btn-sm">{c.title}</Link>
            ))}
          </div>
        </div>

        <div className="card" style={{ background: 'var(--secondary)', border: 'none', textAlign: 'center', padding: '40px', marginTop: '40px' }}>
          <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '12px' }}>Have a question not listed here?</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', fontSize: '15px' }}>Our engineers answer specific questions about your project for free.</p>
          <Link href="/contact" className="btn btn-primary btn-lg">Ask Our Engineers</Link>
        </div>
      </div>
    </>
  );
}
