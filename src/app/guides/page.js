import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import { guides, guideCategories } from '@/data/seo/guides';

export const metadata = generateSEOMetadata({
  title: 'Construction & Property Guides | Expert Advice for Homeowners | Buildogram',
  description: 'Expert guides for homeowners: BOQ review, construction cost estimation, contractor selection, structural plan review, soil testing, Property Passport and property maintenance — by Buildogram engineers.',
  path: '/guides',
});

const categoryLabels = {
  boq: 'BOQ & Cost',
  construction: 'Construction',
  'plan-review': 'Plan Review',
  rental: 'Rental',
  resale: 'Resale',
  maintenance: 'Maintenance',
  'property-passport': 'Property Passport',
};

const guidesListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Buildogram Construction & Property Guides',
  description: 'Expert guides for homeowners on BOQ, construction cost, contractor selection, plan review, property records and maintenance.',
  url: 'https://www.buildogram.in/guides',
  numberOfItems: guides.length,
  itemListElement: guides.map((g, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: g.title,
    url: `https://www.buildogram.in/guides/${g.slug}`,
    description: g.metaDescription || g.intro?.slice(0, 160),
  })),
};

export default function GuidesHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guidesListSchema) }} />
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Guides &amp; Resources</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>
            Construction &amp; Property Guides for Indian Homeowners
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '560px', lineHeight: 1.7 }}>
            Evidence-based, engineer-written guides to help you build, buy, rent, and maintain property with confidence.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 24px' }}>
        {guideCategories.map((cat) => {
          const catGuides = guides.filter((g) => g.category === cat);
          return (
            <div key={cat} style={{ marginBottom: '56px' }}>
              <h2 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid var(--border)', textTransform: 'capitalize' }}>
                {categoryLabels[cat] || cat}
              </h2>
              <div className="grid-3" style={{ gap: '20px' }}>
                {catGuides.map((guide) => (
                  <Link key={guide.slug} href={`/guides/${guide.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card card-hover" style={{ height: '100%' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                        {categoryLabels[guide.category] || guide.category}
                      </div>
                      <h3 style={{ fontSize: '15px', color: 'var(--secondary)', marginBottom: '10px', lineHeight: 1.4 }}>{guide.title}</h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{guide.metaDescription.slice(0, 100)}…</p>
                      <div style={{ marginTop: '16px', fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>Read guide →</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Buildogram Guides', path: '/guides' }]} />
    </>
  );
}
