import DirectoryClient from './DirectoryClient';

export const metadata = {
  title: 'Partner Directory | Buildogram Verified Partners',
  description: 'Find verified builders, architects, interior designers, and material suppliers in Chennai.',
};

export default function PartnerDirectoryPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(204,255,0,0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(204,255,0,0.12)', border: '1px solid rgba(204,255,0,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ color: '#CCFF00', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Partner Directory</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>Verified Partner Directory — Chennai's Best Builders, Architects & Suppliers</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>Work with Buildogram-verified professionals who have been assessed for project quality, engineering credentials, and client satisfaction.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/partners" className="btn btn-primary btn-lg">Join Partner Network</a>
            <a href="/contact" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>Contact Us</a>
          </div>
        </div>
      </section>
      
      <section className="section" style={{ background: '#F8FAFC', minHeight: '60vh' }}>
        <div className="container">
          <DirectoryClient />
        </div>
      </section>
    </>
  );
}
