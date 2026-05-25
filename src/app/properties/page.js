import Link from 'next/link';

export const metadata = {
  title: 'Property Portals | Buy, Sell & Rent Properties | Buildogram',
  description: 'Explore Buildogram connected property portals. Discover premium real estate with RealPropRealty and verified rentals with ToLetBoardChennai.',
};

export default function PropertiesHubPage() {
  return (
    <div className="marketplacePage">
      {/* ── Premium Full Bleed Hero ── */}
      <section className="fullBleedSection" style={{ 
        background: 'linear-gradient(to bottom, #0F172A, #1E293B)', 
        color: 'white', 
        padding: 'clamp(80px, 10vw, 120px) 0 clamp(64px, 8vw, 96px) 0', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        {/* Abstract Architectural Background */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(45deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 20%, rgba(252, 110, 32, 0.2) 0%, transparent 60%)' }} />
        
        <div className="sectionInnerWide" style={{ position: 'relative', textAlign: 'center', maxWidth: '900px', margin: '0 auto', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '8px 24px', marginBottom: '32px', backdropFilter: 'blur(8px)' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '13px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Connected Property Portals</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, marginBottom: '24px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
            Find Your Space.<br />
            <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.8)' }}>Then Build With Us.</span>
          </h1>
          
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.6, marginBottom: '48px', maxWidth: '720px', margin: '0 auto' }}>
            Buildogram is your construction operating system. For finding the perfect plot, villa, or rental space to live in while you build, use our dedicated property networks.
          </p>
        </div>
      </section>

      {/* ── Premium Portal Cards ── */}
      <section className="fullBleedSection" style={{ background: '#F8FAFC', padding: 'clamp(64px, 8vw, 112px) 0', marginTop: '-40px' }}>
        <div className="sectionInnerWide" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', position: 'relative', zIndex: 20 }}>
            
            {/* RealPropRealty Card */}
            <div className="card-hover" style={{ 
              background: 'white', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.08)',
              border: '1px solid #E2E8F0',
              display: 'flex', 
              flexDirection: 'column' 
            }}>
              <div style={{ 
                height: '240px', 
                background: 'linear-gradient(45deg, #0ea5e9, #2563eb)', 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  360° Virtual Tours
                </div>
                {/* Mock 360 UI Element */}
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', cursor: 'pointer' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                </div>
              </div>
              
              <div style={{ padding: '40px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#2563eb', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'block' }}>Buy / Sell</span>
                <h3 style={{ fontSize: '32px', color: '#0F172A', marginBottom: '16px', fontFamily: '"Space Grotesk", sans-serif' }}>RealPropRealty</h3>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.7, marginBottom: '40px', flexGrow: 1 }}>
                  The premium real estate buying and selling platform. Explore verified plots, luxury villas, and commercial spaces with immersive 360° digital walkthroughs before you visit the site.
                </p>
                <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', background: '#2563eb', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  Explore Properties <span>↗</span>
                </a>
              </div>
            </div>

            {/* ToLetBoardChennai Card */}
            <div className="card-hover" style={{ 
              background: 'white', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.08)',
              border: '1px solid #E2E8F0',
              display: 'flex', 
              flexDirection: 'column' 
            }}>
              <div style={{ 
                height: '240px', 
                background: 'linear-gradient(45deg, #f59e0b, #ea580c)', 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  Direct Owners
                </div>
                <div style={{ fontSize: '64px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>🔑</div>
              </div>
              
              <div style={{ padding: '40px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#ea580c', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'block' }}>Rent / Lease</span>
                <h3 style={{ fontSize: '32px', color: '#0F172A', marginBottom: '16px', fontFamily: '"Space Grotesk", sans-serif' }}>ToLetBoardChennai</h3>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.7, marginBottom: '40px', flexGrow: 1 }}>
                  The largest verified rental network in Chennai. Connect directly with property owners for residential leasing, commercial spaces, and temporary accommodation while your home is under construction.
                </p>
                <a href="https://toletboardchennai.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', background: '#ea580c', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  Find Rentals <span>↗</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Marketplace Connection Explanation ── */}
      <section className="fullBleedSection" style={{ background: 'white', padding: 'clamp(64px, 8vw, 112px) 0' }}>
        <div className="sectionInnerWide" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#0F172A', marginBottom: '24px', fontFamily: '"Space Grotesk", sans-serif' }}>How this fits the ecosystem</h2>
          <p style={{ color: '#475569', fontSize: '18px', lineHeight: 1.8, marginBottom: '48px' }}>
            Buildogram focuses exclusively on <strong>construction, maintenance, and material procurement</strong>. We partner with specialized property networks to handle real estate transactions. This ensures you get expert construction management without diluting our core engineering focus.
          </p>
          
          <div style={{ padding: '48px', background: '#F8FAFC', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '16px', color: '#0F172A' }}>Ready to build or renovate?</h3>
            <p style={{ color: '#64748B', fontSize: '16px', marginBottom: '32px' }}>
              If you already have your property and need construction services, BOQ audits, or material quotes, head over to the Buildogram Marketplace.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/partners/directory" className="btn btn-primary" style={{ padding: '14px 28px' }}>Hire Verified Contractors</Link>
              <Link href="/materials" className="btn btn-outline" style={{ padding: '14px 28px' }}>Get Material Quotes</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
