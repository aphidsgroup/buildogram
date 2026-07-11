import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Resources | Buildogram',
  description: 'Guides, cost estimators, and resources for construction and property buying in Chennai.',
  path: '/resources',
});

const RESOURCES = [
  { title: 'Construction Guide', desc: 'Educational guide for home construction process, approvals, budgeting, and execution.', link: '/resources/construction-guide', icon: '🏗️' },
  { title: 'Material Guide', desc: 'Cement, steel, sand, electrical, plumbing, tiles, and finishing material guide.', link: '/resources/material-guide', icon: '🧱' },
  { title: 'Property Buying Guide', desc: 'Understand buying land, apartments, legal documents, and verification.', link: '/resources/property-buying-guide', icon: '🏠' },
  { title: 'Home Design Guide', desc: 'Floor planning, interior planning, elevation, vastu, lighting, and ventilation.', link: '/resources/home-design-guide', icon: '📐' },
  { title: 'Construction Glossary', desc: 'Plain-language definitions of construction, structural engineering, and legal terms.', link: '/glossary', icon: '📖' },
  { title: 'FAQs', desc: 'Frequently asked questions about Buildogram services, construction, and materials.', link: '/faqs', icon: '❓' },
  { title: 'Engineer-Written Guides', desc: 'BOQ, contractor selection, plan review, rental, and maintenance guides.', link: '/guides', icon: '📋' },
  { title: 'BOQ Calculator', desc: 'Get an itemized construction cost estimate based on your floor plan and specification.', link: '/boq-calculator', icon: '🧮' },
  { title: 'Case Studies', desc: 'Real-world outcomes from Buildogram projects — savings, structural finds, and builds.', link: '/case-studies', icon: '📊' },
];

export default function ResourcesPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Learning Center</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>Buildogram Resources</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7 }}>Comprehensive guides, tools, and answers to help you build or buy your dream property with confidence.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3" style={{ gap: '24px', marginBottom: '64px' }}>
            {RESOURCES.map((res) => (
              <Link href={res.link} key={res.title} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{res.icon}</div>
                <h3 style={{ fontSize: '18px', marginBottom: '10px', color: 'var(--secondary)' }}>{res.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>{res.desc}</p>
                <div style={{ marginTop: '16px', fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>Explore →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }]} />
    </>
  );
}
