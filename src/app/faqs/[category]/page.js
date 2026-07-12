import Link from 'next/link';
import { faqCategories, faqMap } from '@/data/seo/faqs';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return faqCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const cat = faqMap[resolvedParams.category];
  if (!cat) return {};
  return { title: cat.metaTitle, description: cat.metaDescription,
    alternates: { canonical: `https://buildogram.in/faqs/${cat.slug}` },
  };
}


const breadcrumbSchema = (itemData) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://buildogram.in' },
    { '@type': 'ListItem', position: 2, name: 'Faqs', item: 'https://buildogram.in/faqs' },
    { '@type': 'ListItem', position: 3, name: itemData.cat.title, item: `https://buildogram.in/faqs/${itemData.cat.slug}` },
  ],
});

export default async function FaqCategoryPage({ params }) {
  const resolvedParams = await params;
  const cat = faqMap[resolvedParams.category];
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
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(cat)) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ background: '#0F172A', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', fontSize: '14px' }}>
            <Link href="/faqs" style={{ color: '#94A3B8', textDecoration: 'none' }}>FAQs</Link>
            <span style={{ color: '#475569' }}>/</span>
            <span style={{ color: 'white', fontWeight: 600 }}>{cat.title}</span>
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: '1px solid rgba(59, 130, 246, 0.3)' }}>💡 Expert Answers</span>
          </div>

          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.15, marginBottom: '20px', maxWidth: '800px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}>
            {cat.title} FAQs
          </h1>
          
          <p style={{ color: '#CBD5E1', fontSize: '18px', maxWidth: '700px', lineHeight: 1.6, marginBottom: '40px' }}>
            {cat.intro}
          </p>
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
            {faqCategories.filter((c) => c.slug !== resolvedParams.category).map((c) => (
              <Link key={c.slug} href={`/faqs/${c.slug}`} className="btn btn-outline btn-sm">{c.title}</Link>
            ))}
          </div>
        </div>

        {/* MARKETPLACE DISCOVERY BLOCK */}
        <div style={{ marginBottom: '64px', marginTop: '48px', background: '#F8FAFC', padding: '40px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
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
          <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Have a question not listed here?</h3>
          <p style={{ color: '#CBD5E1', fontSize: '16px', marginBottom: '28px' }}>Our engineers answer specific questions about your project for free.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>Ask Our Engineers</Link>
          </div>
        </div>
      </div>
    </>
  );
}
