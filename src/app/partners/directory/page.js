import DirectoryClient from './DirectoryClient';

export const metadata = {
  title: 'Partner Directory | Buildogram Verified Partners',
  description: 'Find verified builders, architects, interior designers, and material suppliers in Chennai.',
};

export default function PartnerDirectoryPage() {
  return (
    <div className="marketplacePage">
      <section className="fullBleedSection" style={{ background: 'var(--secondary)', color: 'white', padding: 'clamp(48px, 6vw, 88px) 0 clamp(56px, 7vw, 104px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="sectionInnerWide" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Partner Directory</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '800px', fontFamily: '"Space Grotesk", sans-serif' }}>Verified Partner Directory — Chennai's Best Builders, Architects & Suppliers</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>Work with Buildogram-verified professionals who have been assessed for project quality, engineering credentials, and client satisfaction.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/partners" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>Join Partner Network</a>
            <a href="/contact" className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', borderColor: 'rgba(255,255,255,0.2)', padding: '16px 32px', fontSize: '16px' }}>Contact Us</a>
          </div>
        </div>
      </section>
      
      <section className="fullBleedSection" style={{ background: '#F8FAFC', padding: 'clamp(40px, 5vw, 72px) 0 clamp(64px, 8vw, 112px) 0', minHeight: '60vh' }}>
        <div className="sectionInnerWide">
          <DirectoryClient />
        </div>
      </section>
    </div>
  );
}
