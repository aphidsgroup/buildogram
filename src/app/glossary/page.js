import Link from 'next/link';
import { glossaryTerms } from '@/data/seo/glossary';

export const metadata = {
  title: 'Construction & Property Glossary | Buildogram',
  description: 'A comprehensive glossary of construction, structural, regulatory, and property terms for Indian homeowners. BOQ, RCC, PMC, FSI, UDS, and more — explained clearly.',
};

const categories = [...new Set(glossaryTerms.map((t) => t.category))];

const categoryLabels = {
  construction: 'Construction',
  structural: 'Structural Engineering',
  materials: 'Materials',
  regulatory: 'Regulatory & Legal',
  property: 'Property',
  building: 'Building Systems',
  design: 'Design',
  buildogram: 'Buildogram Platform',
};

export default function GlossaryHub() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Glossary</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>
            Construction & Property Glossary
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '560px', lineHeight: 1.7 }}>
            Plain-language explanations of construction, engineering, regulatory, and property terms — written for Indian homeowners.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 24px' }}>
        {categories.map((cat) => {
          const catTerms = glossaryTerms.filter((t) => t.category === cat);
          return (
            <div key={cat} style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid var(--border)' }}>
                {categoryLabels[cat] || cat}
              </h2>
              <div className="grid-3" style={{ gap: '16px' }}>
                {catTerms.map((term) => (
                  <Link key={term.slug} href={`/glossary/${term.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card card-hover" style={{ height: '100%' }}>
                      <h3 style={{ fontSize: '15px', color: 'var(--secondary)', fontWeight: 700, marginBottom: '8px' }}>{term.term}</h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{term.definition.slice(0, 90)}…</p>
                      <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>View definition →</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
