import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import { services } from '@/data/seo/services';

export const metadata = generateSEOMetadata({
  title: "Services | Buildogram",
  description: "Comprehensive construction and engineering services in Chennai. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, and piling.",
  path: "/services"
});




const categories = [
  { label: 'Construction', slugs: ['house-construction', 'villa-construction', 'residential-construction', 'duplex-house-construction', 'turnkey-construction', 'renovation-construction', 'home-construction-for-rental-income', 'home-construction-for-resale-value'] },
  { label: 'Supervision & Advisory', slugs: ['construction-project-management', 'site-supervision', 'construction-consultation', 'quality-inspection'] },
  { label: 'BOQ & Plan', slugs: ['boq-review', 'house-plan-review', 'construction-cost-consultation'] },
];

export default function ServicesHub() {
  return ( <>
    <div className="marketplacePage">
      <section className="fullBleedSection" style={{ background: 'var(--secondary)', color: 'white', padding: 'clamp(48px, 6vw, 88px) 0 clamp(56px, 7vw, 104px) 0' }}>
        <div className="sectionInnerWide" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Services</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.15, marginBottom: '24px', maxWidth: '800px', margin: '0 auto', fontFamily: '"Space Grotesk", sans-serif' }}>
            Engineer-Led Construction & Property Services
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '600px', lineHeight: 1.7, margin: '24px auto 0' }}>
            Every Buildogram service is backed by structural engineers, itemized documentation, and transparent proof records.
          </p>
        </div>
      </section>

      <section className="fullBleedSection" style={{ padding: 'clamp(64px, 8vw, 112px) 0', background: '#F8FAFC' }}>
        <div className="sectionInnerWide">
          {categories.map((cat) => {
            const catServices = cat.slugs.map((s) => services.find((sv) => sv.slug === s)).filter(Boolean);
            return (
              <div key={cat.label} style={{ marginBottom: '80px' }}>
                <h2 style={{ fontSize: '28px', color: 'var(--secondary)', marginBottom: '32px', paddingBottom: '16px', borderBottom: '2px solid var(--border)', fontFamily: '"Space Grotesk", sans-serif' }}>
                  {cat.label}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                  {catServices.map((svc) => (
                    <Link key={svc.slug} href={`/services/${svc.slug}`} style={{ textDecoration: 'none' }}>
                      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }} className="card-hover">
                        <div style={{ fontSize: '40px', marginBottom: '20px' }}>{svc.icon}</div>
                        <h3 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '12px', lineHeight: 1.4, fontFamily: '"Space Grotesk", sans-serif' }}>{svc.title}</h3>
                        <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, flexGrow: 1 }}>{svc.heroSubtitle}</p>
                        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontSize: '14px', fontWeight: 600 }}>
                          Learn more <span>→</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <div style={{ padding: '64px', background: 'var(--secondary)', color: 'white', borderRadius: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden', marginTop: '40px' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(252, 110, 32, 0.15) 0%, transparent 60%)' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ color: 'white', fontSize: '36px', marginBottom: '16px', fontFamily: '"Space Grotesk", sans-serif' }}>Not sure where to start?</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px', fontSize: '18px', maxWidth: '600px', margin: '0 auto 32px' }}>Book a free 30-minute consultation with our structural engineers to discuss your project requirements.</p>
              <Link href="/contact" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>Book Free Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Buildogram Services","path":"/services"}]} />
    </>
  );
}
