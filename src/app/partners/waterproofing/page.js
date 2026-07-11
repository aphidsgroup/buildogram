import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Waterproofing Contractors in Chennai | Terrace & Bathroom Waterproofing | Buildogram',
  description: 'Find verified waterproofing contractors in Chennai. Brand-authorized applicators for Dr. Fixit, Fosroc, Sika — terrace, bathroom, basement waterproofing with 5-10 year guarantees.',
  path: '/partners/waterproofing',
});

const SYSTEMS = [
  { icon: '🏗️', name: 'Terrace Waterproofing', brands: 'Dr. Fixit · Fosroc · Sika', methods: ['Crystalline waterproofing (Xypex)', 'Elastomeric polymer coating (APP/SBS membrane)', 'Cement-based slurry systems'] },
  { icon: '🚿', name: 'Bathroom & Wet Areas', brands: 'Dr. Fixit · Weber · Fosroc', methods: ['Acrylic waterproofing membrane', 'Integral crystalline admixtures in concrete', '2-coat polymer-cement slurry below tiles'] },
  { icon: '🏛️', name: 'Basement & Underground', brands: 'Sika · MC Bauchemie', methods: ['Negative-side waterproofing (sodium silicate)', 'PVC waterstop at construction joints', 'Bentonite clay panels for earth-retaining walls'] },
  { icon: '💧', name: 'Plinth & Foundation', brands: 'Dr. Fixit · Bostik', methods: ['Bituminous coating with geo-textile layer', 'Crystalline waterproofing at construction joints', 'French drain + waterproof plinth beam'] },
];

const CRITERIA = [
  { icon: '🏅', title: 'Brand Authorized', desc: 'Must hold current authorization certificate from the waterproofing brand (Dr. Fixit, Fosroc, Sika, etc.). Unauthorized applicators void product warranty.' },
  { icon: '🛡️', title: 'Applicator Certification', desc: 'Field applicators trained and certified by the product manufacturer. Proper product mixing ratios, substrate preparation, and curing protocols followed.' },
  { icon: '📋', title: '5-Year Site Guarantee', desc: 'Provides a written site workmanship guarantee (separate from product warranty). Waterproofing failures within 5 years repaired at no cost.' },
  { icon: '📸', title: 'Photo Documentation', desc: 'Before, during, and after photos submitted for every project. Substrate condition, coat application, and coverage thickness documented.' },
];

const CHECKLIST = [
  'Substrate surface properly hacked and cleaned before application',
  'Cracks sealed with polymer putty or PU injection before waterproofing',
  'Minimum 2 coats applied at 90° to each other',
  'Upturn (skirting) at wall-slab junction minimum 150mm height',
  'Flood test conducted for minimum 24 hours before tiling',
  'Drain holes kept open during test for leakage check from below',
];

export default function WaterproofingPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Waterproofing Partners</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>Verified Waterproofing Contractors in Chennai</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '620px', lineHeight: 1.7, marginBottom: '32px' }}>Brand-authorized applicators for Dr. Fixit, Fosroc, and Sika — with written site guarantees, flood testing, and proper substrate preparation.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=waterproofing-quote" className="btn btn-primary btn-lg">Get Waterproofing Quote</Link>
            <Link href="/join-as-partner" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Join as Partner</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Waterproofing Systems We Offer</h2>
          <div className="grid-2" style={{ gap: '20px' }}>
            {SYSTEMS.map(s => (
              <div key={s.name} className="card">
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{s.icon}</span>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>{s.name}</h3>
                    <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>{s.brands}</div>
                  </div>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: 0 }}>
                  {s.methods.map(m => (
                    <li key={m} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--text-muted)', listStyle: 'none' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 700, flexShrink: 0 }}>•</span>{m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Contractor Verification Criteria</h2>
          <div className="grid-2" style={{ gap: '20px' }}>
            {CRITERIA.map(c => (
              <div key={c.title} className="card" style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '6px' }}>{c.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '56px', background: 'rgba(252,110,32,0.04)', border: '1px solid rgba(252,110,32,0.12)', borderRadius: 'var(--radius-lg)', padding: '32px 36px' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '16px' }}>Waterproofing Quality Checklist</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CHECKLIST.map(item => (
              <li key={item} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text)', lineHeight: 1.5, listStyle: 'none' }}>
                <span style={{ color: 'var(--success)', fontWeight: 800, flexShrink: 0 }}>✓</span>{item}
              </li>
            ))}
          </ul>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>💧</div>
            <h3 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '8px' }}>Get Waterproofing Quote</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>Terrace, bathroom, basement — get a site visit and quote from a brand-authorized applicator.</p>
            <Link href="/contact?type=waterproofing-quote" className="btn btn-primary">Get Quote</Link>
          </div>
          <div className="card" style={{ background: 'var(--secondary)', textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🏅</div>
            <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>Waterproofing Contractor?</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>Join our verified network and get leads from clients with real waterproofing needs.</p>
            <Link href="/join-as-partner" className="btn btn-primary">Apply to Join</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Partners', path: '/partners' }, { name: 'Waterproofing', path: '/partners/waterproofing' }]} />
    </>
  );
}
