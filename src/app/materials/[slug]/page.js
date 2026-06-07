import Link from 'next/link';
import { materials } from '@/data/seo/materials';
import { notFound } from 'next/navigation';
import RelatedLinksBlock from '@/components/seo/RelatedLinksBlock';
import ContextualCTA from '@/components/seo/ContextualCTA';
import { getContextualLinks } from '@/lib/seo/internalLinks';

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
  const currentPath = `/materials${params.slug}`.replace('//', '/');
  const relatedLinks = getContextualLinks('material', currentPath);

  const mat = materialMap[params.slug];
  if (!mat) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(mat)) }} />
      {mat.faqs && mat.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(mat.faqs)) }} />
      )}

      <section style={{ background: '#0F172A', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', fontSize: '14px' }}>
            <Link href="/materials" style={{ color: '#94A3B8', textDecoration: 'none' }}>Materials Marketplace</Link>
            <span style={{ color: '#475569' }}>/</span>
            <span style={{ color: 'white', fontWeight: 600 }}>{mat.name}</span>
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: '1px solid rgba(59, 130, 246, 0.3)' }}>{mat.icon} Construction Material</span>
            <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: '1px solid rgba(34, 197, 94, 0.3)' }}>✅ Best Rates in Chennai</span>
          </div>

          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.15, marginBottom: '20px', maxWidth: '800px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}>
            {mat.name} Suppliers & Rates in <span style={{ color: '#3B82F6' }}>Chennai</span>
          </h1>
          
          <p style={{ color: '#CBD5E1', fontSize: '18px', maxWidth: '700px', lineHeight: 1.6, marginBottom: '40px' }}>
            {mat.intro} Source high-quality {mat.name} directly from verified suppliers for your construction project.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/materials/request-quote" className="btn btn-primary" style={{ padding: '14px 24px', fontSize: '16px' }}>Request Quote Now</Link>
            <Link href="/partners/directory?category=Supplier" className="btn btn-outline-light" style={{ padding: '14px 24px', fontSize: '16px' }}>Find Local Suppliers</Link>
          </div>
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

        {/* QUOTE MARKETPLACE EXPLAINER (SEO/AEO) */}
        <div style={{ marginBottom: '64px', background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '24px', color: '#0F172A' }}>The Buildogram Material Marketplace</h2>
          <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
            We simplify material procurement by connecting you with verified suppliers across Chennai. Instead of haggling with multiple vendors, our marketplace does the heavy lifting for you.
          </p>
          
          <div className="grid-3" style={{ gap: '24px', marginBottom: '32px' }}>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>⚖️</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>Quote Comparison</h3>
              <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.5 }}>Upload your BOQ or material requirements and receive side-by-side comparisons of landed costs, including GST and transport.</p>
            </div>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🔍</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>Brand & Spec Matching</h3>
              <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.5 }}>Our AI checks quotes to ensure suppliers match the exact brand and grade specifications you requested.</p>
            </div>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🛡️</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>Property Passport Connection</h3>
              <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.5 }}>Delivery proofs, weighbridge slips, and invoices are automatically saved to your digital Property Passport for lifetime warranty tracking.</p>
            </div>
          </div>
        </div>

        {/* MARKETPLACE DISCOVERY BLOCK */}
        <div style={{ marginBottom: '64px', background: '#F8FAFC', padding: '40px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#0F172A' }}>Buildogram Ecosystem Partners</h2>
          <div className="grid-4" style={{ gap: '16px' }}>
            <Link href="/partners/directory?category=Builder" style={{ background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🏗️</span>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Hire Builders</span>
              <span style={{ color: '#64748B', fontSize: '13px' }}>Experts in using {mat.name}</span>
            </Link>
            <Link href="/partners/directory?category=Supplier" style={{ background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🚚</span>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Find Suppliers</span>
              <span style={{ color: '#64748B', fontSize: '13px' }}>Verified Local Sellers</span>
            </Link>
            <Link href="/services/cost-estimator" style={{ background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>💰</span>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Estimate Cost</span>
              <span style={{ color: '#64748B', fontSize: '13px' }}>Calculate {mat.name} quantity</span>
            </Link>
            <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" style={{ background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🏠</span>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Property Portal</span>
              <span style={{ color: '#64748B', fontSize: '13px' }}>Buy/Sell with 360° tours</span>
            </a>
          </div>
        </div>

        <div className="card" style={{ background: '#0F172A', border: 'none', textAlign: 'center', padding: '44px', borderRadius: '16px' }}>
          <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Need {mat.name} for your project?</h3>
          <p style={{ color: '#CBD5E1', fontSize: '16px', marginBottom: '28px' }}>Get side-by-side quotes from verified suppliers. Upload your BOQ or request pricing directly.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/materials/request-quote?category=${mat.slug}`} className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>Request {mat.name} Quote</Link>
            <Link href={`/materials/request-quote?category=${mat.slug}&boq=true`} className="btn btn-outline-light" style={{ padding: '14px 28px', fontSize: '16px' }}>Upload BOQ</Link>
          </div>
        </div>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Link href="/materials" style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span>←</span> Explore All Materials
          </Link>
        </div>
      </div>
    
      <RelatedLinksBlock title="Explore Related Services" links={relatedLinks} variant="light" />
      <ContextualCTA pageType="material" currentPath={currentPath} />
    </>
  );
}
