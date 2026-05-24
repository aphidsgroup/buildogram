import Link from 'next/link';
import { comparisons, comparisonMap } from '@/data/seo/comparisons';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const comp = comparisonMap[params.slug];
  if (!comp) return {};
  return { title: comp.metaTitle, description: comp.metaDescription };
}

export default function ComparisonPage({ params }) {
  const comp = comparisonMap[params.slug];
  if (!comp) notFound();

  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px', fontSize: '13px' }}>
            <Link href="/compare" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Compare</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
          </nav>
          <h1 style={{ color: 'white', fontSize: 'clamp(24px, 3.5vw, 44px)', lineHeight: 1.2, marginBottom: '16px', maxWidth: '800px' }}>{comp.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '600px', lineHeight: 1.7 }}>{comp.intro}</p>
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
                <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, width: '35%', color: '#FFDA01' }}>Buildogram Approach</th>
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

        <div className="card" style={{ background: 'var(--secondary)', border: 'none', textAlign: 'center', padding: '44px' }}>
          <h3 style={{ color: 'white', fontSize: '22px', marginBottom: '12px' }}>Make the right decision for your project</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>Talk to our engineers for free — no commitment required.</p>
          <Link href={comp.cta.href} className="btn btn-primary btn-lg">{comp.cta.text}</Link>
        </div>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Link href="/compare" style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>← All Comparisons</Link>
        </div>
      </div>
    </>
  );
}
