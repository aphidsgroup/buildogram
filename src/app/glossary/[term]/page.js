import Link from 'next/link';
import { glossaryTerms, glossaryMap } from '@/data/seo/glossary';
import { notFound } from 'next/navigation';
import RelatedLinksBlock from '@/components/seo/RelatedLinksBlock';
import ContextualCTA from '@/components/seo/ContextualCTA';
import { getContextualLinks } from '@/lib/seo/internalLinks';

export async function generateStaticParams() {
  return glossaryTerms.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const term = glossaryMap[resolvedParams.term];
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

export default async function GlossaryTermPage({ params }) {
  const resolvedParams = await params;
  const currentPath = `/glossary/${resolvedParams.term}`;
  const relatedLinks = getContextualLinks('service', currentPath);

  const term = glossaryMap[resolvedParams.term];
  if (!term) notFound();

  const categoryLabel = term.category.charAt(0).toUpperCase() + term.category.slice(1);

  return (
    <>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(term)) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termSchema(term)) }} />

      <section style={{ background: '#0F172A', color: 'white', padding: '52px 0 64px' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', fontSize: '14px' }}>
            <Link href="/glossary" style={{ color: '#94A3B8', textDecoration: 'none' }}>Glossary</Link>
            <span style={{ color: '#475569' }}>/</span>
            <span style={{ color: 'white', fontWeight: 600 }}>{categoryLabel}</span>
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: '1px solid rgba(59, 130, 246, 0.3)' }}>📖 {categoryLabel} Term</span>
          </div>

          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.15, marginBottom: '20px', maxWidth: '800px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}>
            {term.term}
          </h1>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px', maxWidth: '860px' }}>

        {/* DEFINITION */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', borderRadius: '0 12px 12px 0', marginBottom: '40px', background: 'rgba(252, 110, 32, 0.04)' }}>
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

        {/* BROWSE ALL */}
        <div style={{ paddingTop: '32px', borderTop: '1px solid #E2E8F0', marginTop: '8px' }}>
          <Link href="/glossary" style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span>←</span> Browse All Glossary Terms
          </Link>
        </div>

      </div>
    
      <RelatedLinksBlock title="Explore Related Services" links={relatedLinks} variant="light" />
      <ContextualCTA pageType="service" currentPath={currentPath} />
</>
  );
}
