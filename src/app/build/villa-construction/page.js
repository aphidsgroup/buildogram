import Link from 'next/link';
import BuildLeadForm from '../BuildLeadForm';

export const metadata = {
  title: 'Villa Construction in Chennai | Premium Homes | Buildogram',
  description: 'Build a premium villa in Chennai with luxury finishes, 3D planning, BOQ transparency and complete Property Passport. Independent villa construction specialists.',
};

const features = [
  { icon: '🏛️', title: '3D Design Planning', desc: 'Full 3D visualisation of your villa before construction begins.' },
  { icon: '💎', title: 'Premium Materials', desc: 'Branded tiles, premium sanitary, quality wood and tested steel.' },
  { icon: '🌿', title: 'Landscape & Compound', desc: 'Compound wall, gate, driveway, landscaping and outdoor spaces.' },
  { icon: '🎨', title: 'Interior Options', desc: 'Modular kitchen, wardrobe, false ceiling and full interior fit-out.' },
  { icon: '✅', title: 'Premium QC', desc: '2500+ quality checks with special focus on finishes and waterproofing.' },
  { icon: '🛂', title: 'Property Passport', desc: 'Full documentation — legal, BOQ, materials, quality and warranty.' },
];

export default function VillaConstructionPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '40px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 30%, rgba(187,160,122,0.12) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <Link href="/build" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Build</Link>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
              <span style={{ color: '#BBA07A', fontSize: '14px' }}>Villa Construction</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(187,160,122,0.15)', border: '1px solid rgba(187,160,122,0.3)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
              <span style={{ color: '#BBA07A', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Premium Residential Construction</span>
            </div>
            <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1, marginBottom: '24px' }}>
              Your Dream Villa,<br />
              <span style={{ color: '#BBA07A' }}>Built to Perfection.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.7, marginBottom: '40px' }}>
              Premium villa construction with 3D planning, luxury material specification, detailed BOQ and a complete Property Passport at handover.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="#consult" className="btn btn-primary btn-lg">Start Villa Consultation</Link>
              <Link href="/cost-estimator" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>Calculate Cost</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#BBA07A', padding: '28px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[['₹2,200+', 'Per sqft (premium)'], ['3D', 'Design Planning'], ['Premium', 'Material Spec'], ['Passport', 'Included']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 800, color: 'white' }}>{n}</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">Villa Features</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px' }}>What makes a Buildogram villa different</h2>
          </div>
          <div className="grid-3">
            {features.map(f => (
              <div key={f.title} className="card card-hover">
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="consult" className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>Start Your Villa Consultation</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px' }}>Share your vision. We will plan your villa with full transparency.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px' }}>
            <BuildLeadForm leadType="construction" sourcePage="/build/villa-construction" ctaLabel="🏛️ Start Villa Consultation" />
          </div>
        </div>
      </section>
    </>
  );
}
