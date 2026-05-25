import Link from 'next/link';
import { comparisons, comparisonMap } from '@/data/seo/comparisons';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const comp = comparisonMap[params.slug];
  if (!comp) return {};
  return { title: comp.metaTitle, description: comp.metaDescription,
    alternates: { canonical: `https://buildogram.in/compare/${comp.slug}` },
  };
}


const breadcrumbSchema = (itemData) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://buildogram.in' },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://buildogram.in/compare' },
    { '@type': 'ListItem', position: 3, name: itemData.comp.title, item: `https://buildogram.in/compare/${itemData.comp.slug}` },
  ],
});

export default function ComparisonPage({ params }) {
  const comp = comparisonMap[params.slug];
  if (!comp) notFound();

  return (
    <>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(comp)) }} />
      <section style={{ background: '#0F172A', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', fontSize: '14px' }}>
            <Link href="/compare" style={{ color: '#94A3B8', textDecoration: 'none' }}>Comparisons</Link>
            <span style={{ color: '#475569' }}>/</span>
            <span style={{ color: 'white', fontWeight: 600 }}>{comp.title}</span>
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: '1px solid rgba(59, 130, 246, 0.3)' }}>⚖️ Market Comparison</span>
          </div>

          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.15, marginBottom: '20px', maxWidth: '800px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}>
            {comp.title}
          </h1>
          
          <p style={{ color: '#CBD5E1', fontSize: '18px', maxWidth: '700px', lineHeight: 1.6, marginBottom: '40px' }}>
            {comp.intro}
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px', maxWidth: '960px' }}>

        {/* COMPARISON TABLE */}
        <div style={{ marginBottom: '56px', overflowX: 'auto' }}>
          <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '24px' }}>Side-by-Side Comparison</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: 'var(--secondary)', color: 'white' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, width: '30%' }}>Feature</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, width: '35%' }}>Typical Approach</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, width: '35%', background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>Buildogram Approach</th>
              </tr>
            </thead>
            <tbody>
              {comp.table.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-alt)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--secondary)', borderBottom: '1px solid var(--border)' }}>{row.feature}</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{row.contractor}</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6, borderLeft: '2px solid var(--primary)' }}>{row.buildogram}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DISCLAIMER */}
        {comp.disclaimer && (
          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '12px', padding: '20px 24px', marginBottom: '40px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--warning)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>ℹ Note</div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{comp.disclaimer}</p>
          </div>
        )}

        {/* FAQS */}
        {comp.faqs && comp.faqs.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '24px' }}>Common Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {comp.faqs.map((faq, i) => (
                <div key={i} className="card">
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{faq.q}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              ))}
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
          <h3 style={{ color: 'white', fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>Make the right decision for your project</h3>
          <p style={{ color: '#CBD5E1', fontSize: '16px', marginBottom: '28px' }}>Talk to our engineers for free — no commitment required.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={comp.cta.href} className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>{comp.cta.text}</Link>
          </div>
        </div>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Link href="/compare" style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span>←</span> Explore All Comparisons
          </Link>
        </div>
      </div>
    </>
  );
}
