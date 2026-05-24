import Link from 'next/link';
import { glossaryTerms, glossaryMap } from '@/data/seo/glossary';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return glossaryTerms.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }) {
  const term = glossaryMap[params.term];
  if (!term) return {};
  return {
    title: `${term.term} — Buildogram Construction Glossary`,
    description: `${term.definition} Learn the full meaning and importance of ${term.term} in home construction and property in India.`,
      alternates: { canonical: `https://buildogram.in/glossary/${term.slug}` },
  };
}

const termSchema = (term) => ({
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: term.term,
  description: term.definition,
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Buildogram Construction Glossary', url: 'https://buildogram.in/glossary' },
});


const breadcrumbSchema = (itemData) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://buildogram.in' },
    { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://buildogram.in/glossary' },
    { '@type': 'ListItem', position: 3, name: itemData.term.term, item: `https://buildogram.in/glossary/${itemData.term.slug}` },
  ],
});

export default function GlossaryTermPage({ params }) {
  const term = glossaryMap[params.term];
  if (!term) notFound();

  const categoryLabel = term.category.charAt(0).toUpperCase() + term.category.slice(1);

  return (
    <>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(term)) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termSchema(term)) }} />

      <section style={{ background: 'var(--secondary)', color: 'white', padding: '52px 0 64px' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px', fontSize: '13px' }}>
            <Link href="/glossary" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Glossary</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ color: '#FFDA01' }}>{categoryLabel}</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,218,1,0.1)', borderRadius: '6px', padding: '4px 12px', marginBottom: '16px', fontSize: '12px', color: '#FFDA01', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {categoryLabel} Term
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(24px, 3.5vw, 46px)', lineHeight: 1.2, marginBottom: '0' }}>
            {term.term}
          </h1>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px', maxWidth: '860px' }}>

        {/* DEFINITION */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', borderRadius: '0 12px 12px 0', marginBottom: '40px', background: 'rgba(255,218,1,0.04)' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Definition</div>
          <p style={{ fontSize: '17px', color: 'var(--secondary)', lineHeight: 1.7, fontWeight: 500 }}>{term.definition}</p>
        </div>

        {/* EXPLANATION */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '16px' }}>Explained Simply</h2>
          <p style={{ fontSize: '16px', color: 'var(--text)', lineHeight: 1.85 }}>{term.explanation}</p>
        </div>

        {/* WHY IT MATTERS */}
        <div className="card" style={{ borderLeft: '4px solid #22c55e', borderRadius: '0 12px 12px 0', marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Why This Matters for Homeowners</div>
          <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.75 }}>{term.whyMatters}</p>
        </div>

        {/* COMMON MISTAKE */}
        <div className="card" style={{ borderLeft: '4px solid #ef4444', borderRadius: '0 12px 12px 0', marginBottom: '40px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>⚠ Common Mistake</div>
          <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.75 }}>{term.commonMistake}</p>
        </div>

        {/* RELATED TERMS */}
        {term.relatedTerms && term.relatedTerms.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '14px' }}>Related Terms</h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {term.relatedTerms.map((rt) => {
                const related = glossaryMap[rt];
                return related ? (
                  <Link key={rt} href={`/glossary/${rt}`} style={{ fontSize: '13px', color: 'var(--secondary)', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '999px', padding: '6px 16px', textDecoration: 'none', fontWeight: 500 }}>
                    {related.term}
                  </Link>
                ) : (
                  <span key={rt} style={{ fontSize: '13px', color: 'var(--text-muted)', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '999px', padding: '6px 16px' }}>
                    {rt.replace(/-/g, ' ')}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* RELATED SERVICES */}
        {term.relatedServices && term.relatedServices.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '14px' }}>Related Buildogram Services</h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {term.relatedServices.map((href) => {
                const label = href.split('/').pop().replace(/-/g, ' ');
                return (
                  <Link key={href} href={href} className="btn btn-outline btn-sm">
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* BROWSE ALL */}
        <div style={{ paddingTop: '32px', borderTop: '1px solid var(--border)', marginTop: '8px' }}>
          <Link href="/glossary" style={{ fontSize: '14px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>← Browse All Glossary Terms</Link>
        </div>

      </div>
    </>
  );
}
