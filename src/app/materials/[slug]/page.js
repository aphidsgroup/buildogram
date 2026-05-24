import Link from 'next/link';
import { materials } from '@/data/seo/materials';
import { notFound } from 'next/navigation';

const materialMap = Object.fromEntries(materials.map((m) => [m.slug, m]));

export async function generateStaticParams() {
  return materials.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const mat = materialMap[params.slug];
  if (!mat) return {};
  return { title: mat.metaTitle, description: mat.metaDescription,
    alternates: { canonical: `https://buildogram.in/materials/${mat.slug}` },
  };
}

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
    { '@type': 'ListItem', position: 2, name: 'Materials', item: 'https://buildogram.in/materials' },
    { '@type': 'ListItem', position: 3, name: itemData.mat.name, item: `https://buildogram.in/materials/${itemData.mat.slug}` },
  ],
});

export default function MaterialPage({ params }) {
  const mat = materialMap[params.slug];
  if (!mat) notFound();

  return (
    <>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(mat)) }} />
{mat.faqs && mat.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(mat.faqs)) }} />
      )}

      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px', fontSize: '13px' }}>
            <Link href="/materials" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Materials</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>{mat.name}</span>
          </nav>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>{mat.icon}</div>
          <h1 style={{ color: 'white', fontSize: 'clamp(26px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            {mat.name} for Construction in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', maxWidth: '640px', lineHeight: 1.7 }}>
            {mat.intro}
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px' }}>

        {/* GRADES */}
        <div className="grid-2" style={{ gap: '32px', marginBottom: '48px', alignItems: 'start' }}>
          <div className="card">
            <h2 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '16px' }}>Types & Grades</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(mat.grades || []).map((g, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--text)', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800, flexShrink: 0 }}>▸</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '16px' }}>Top Brands</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(mat.topBrands || []).map((b, i) => (
                <span key={i} style={{ fontSize: '13px', padding: '6px 14px', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '999px', color: 'var(--secondary)', fontWeight: 500 }}>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* WHAT TO CHECK */}
        <div className="card" style={{ marginBottom: '40px', borderLeft: '4px solid #22c55e', borderRadius: '0 12px 12px 0' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '16px' }}>✅ What to Check at Delivery</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(mat.checkBefore || []).map((c, i) => (
              <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--text)', lineHeight: 1.6 }}>
                <span style={{ color: '#22c55e', flexShrink: 0, fontSize: '16px' }}>✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* COMMON MISTAKES */}
        <div className="card" style={{ marginBottom: '40px', borderLeft: '4px solid #ef4444', borderRadius: '0 12px 12px 0', background: 'rgba(239,68,68,0.03)' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '16px' }}>⚠ Common Mistakes to Avoid</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(mat.commonMistakes || []).map((m, i) => (
              <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--text)', lineHeight: 1.6 }}>
                <span style={{ color: '#ef4444', flexShrink: 0 }}>✕</span>
                {m}
              </li>
            ))}
          </ul>
        </div>

        {/* RATE NOTE */}
        {mat.rateNote && (
          <div style={{ background: 'rgba(252, 110, 32, 0.06)', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '12px', padding: '20px 24px', marginBottom: '40px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>💰 Pricing Note</div>
            <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.7 }}>{mat.rateNote}</p>
            <Link href="/materials/request-quote" className="btn btn-primary btn-sm" style={{ marginTop: '12px', display: 'inline-flex' }}>Request Material Quote</Link>
          </div>
        )}

        {/* FAQS */}
        {mat.faqs && mat.faqs.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '24px' }}>FAQs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '780px' }}>
              {mat.faqs.map((faq, i) => (
                <div key={i} className="card">
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{faq.q}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RELATED MATERIALS */}
        {mat.relatedMaterials && mat.relatedMaterials.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '16px' }}>Related Materials</h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {mat.relatedMaterials.map((rs) => {
                const rel = materials.find((m) => m.slug === rs);
                return rel ? (
                  <Link key={rs} href={`/materials/${rs}`} className="btn btn-outline btn-sm">{rel.icon} {rel.name}</Link>
                ) : null;
              })}
            </div>
          </div>
        )}

        <div className="card" style={{ background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '44px' }}>
          <h3 style={{ color: 'white', fontSize: '22px', marginBottom: '12px' }}>Need {mat.name} for your project?</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>Get verified delivery with invoice documentation and brand confirmation.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/materials/request-quote" className="btn btn-primary btn-lg">Request Quote</Link>
            <Link href="/contact" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>Speak to Engineer</Link>
          </div>
        </div>

        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <Link href="/materials" style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>← All Materials</Link>
        </div>
      </div>
    </>
  );
}
