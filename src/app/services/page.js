import Link from 'next/link';
import { services } from '@/data/seo/services';

export const metadata = {
  title: 'Buildogram Services | Engineer-Led Construction & Property Services in Chennai',
  description: 'Explore all Buildogram construction services — house construction, PMC, quality inspection, BOQ review, site supervision, renovation, turnkey, and more.',
};

const categories = [
  { label: 'Construction', slugs: ['house-construction', 'villa-construction', 'residential-construction', 'duplex-house-construction', 'turnkey-construction', 'renovation-construction', 'home-construction-for-rental-income', 'home-construction-for-resale-value'] },
  { label: 'Supervision & Advisory', slugs: ['construction-project-management', 'site-supervision', 'construction-consultation', 'quality-inspection'] },
  { label: 'BOQ & Plan', slugs: ['boq-review', 'house-plan-review', 'construction-cost-consultation'] },
];

export default function ServicesHub() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(204,255,0,0.12)', border: '1px solid rgba(204,255,0,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ color: '#CCFF00', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Services</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '680px' }}>
            Engineer-Led Construction & Property Services
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '560px', lineHeight: 1.7 }}>
            Every Buildogram service is backed by structural engineers, itemized documentation, and transparent proof records.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 24px' }}>
        {categories.map((cat) => {
          const catServices = cat.slugs.map((s) => services.find((sv) => sv.slug === s)).filter(Boolean);
          return (
            <div key={cat.label} style={{ marginBottom: '56px' }}>
              <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid var(--border)' }}>
                {cat.label}
              </h2>
              <div className="grid-3" style={{ gap: '20px' }}>
                {catServices.map((svc) => (
                  <Link key={svc.slug} href={`/services/${svc.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card card-hover" style={{ height: '100%', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                      <div style={{ fontSize: '32px', marginBottom: '12px' }}>{svc.icon}</div>
                      <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '8px', lineHeight: 1.3 }}>{svc.title}</h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{svc.heroSubtitle}</p>
                      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', fontSize: '13px', fontWeight: 600 }}>
                        Learn more <span>→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <div className="card" style={{ background: 'var(--gradient-dark)', color: 'white', border: 'none', textAlign: 'center', padding: '48px', marginTop: '20px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '12px' }}>Not sure where to start?</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', fontSize: '16px' }}>Book a free 30-minute consultation with our structural engineers.</p>
          <Link href="/contact" className="btn btn-primary btn-lg">Book Free Consultation</Link>
        </div>
      </div>
    </>
  );
}
