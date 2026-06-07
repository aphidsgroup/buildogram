import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import { guides, guideCategories } from '@/data/seo/guides';

export const metadata = generateSEOMetadata({
title: 'Buildogram Guides | Construction, BOQ, Property & Maintenance Guides',
  description: 'Expert guides for homeowners, landlords, and property investors. BOQ, construction cost, contractor selection, plan review, property records, rental, and maintenance.',
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

export default function GuidesHub() {
  return ( <>
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Guides & Resources</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>
            Construction & Property Guides for Indian Homeowners
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
    </>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Buildogram Guides","path":"/guides"}]} />
    </>
  );
}
