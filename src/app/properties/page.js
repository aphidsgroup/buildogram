import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
title: '360° Property Discovery Portals | Buildogram',
  description: 'Discover connected property portals for buying, selling, renting, and leasing properties with immersive 360° property viewing — connected to the Buildogram construction ecosystem.',
  path: '/properties',
});

export default function PropertiesHubPage() {
  return (
    <div className="marketplacePage">
      {/* ── Hero ── */}
      <section className="fullBleedSection" style={{
        background: 'linear-gradient(to bottom, #0F172A, #1E293B)',
        color: 'white',
        padding: 'clamp(80px, 10vw, 120px) 0 clamp(64px, 8vw, 96px) 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(45deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 20%, rgba(252, 110, 32, 0.2) 0%, transparent 60%)' }} />

        <div className="sectionInnerWide" style={{ position: 'relative', textAlign: 'center', maxWidth: '900px', margin: '0 auto', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '8px 24px', marginBottom: '32px', backdropFilter: 'blur(8px)' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '13px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Connected Property Portals</span>
          </div>

          <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, marginBottom: '24px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
            360° Property Discovery<br />
            <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.8)' }}>Connected to Buildogram.</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto 40px' }}>
            Buildogram connects with dedicated property portals for buying, selling, renting, and leasing properties through immersive 360° viewing — while Buildogram supports the larger construction and property lifecycle.
          </p>
        </div>
      </section>

      {/* ── Portal Cards ── */}
      <section className="fullBleedSection" style={{ background: '#F8FAFC', padding: 'clamp(64px, 8vw, 112px) 0', marginTop: '-40px' }}>
        <div className="sectionInnerWide" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', position: 'relative', zIndex: 20 }}>

            {/* RealPropRealty */}
            <div className="card-hover" style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '240px', background: 'linear-gradient(45deg, #0ea5e9, #2563eb)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)' }}>360° Virtual Tours</div>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                </div>
              </div>
              <div style={{ padding: '40px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#2563eb', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'block' }}>Buy / Sell</span>
                <h3 style={{ fontSize: '32px', color: '#0F172A', marginBottom: '16px', fontFamily: '"Space Grotesk", sans-serif' }}>RealPropRealty</h3>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.7, marginBottom: '40px', flexGrow: 1 }}>
                  The premium real estate buying and selling platform. Explore verified plots, luxury villas, and commercial spaces with immersive 360° digital walkthroughs before your first site visit.
                </p>
                <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', background: '#2563eb', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  Visit RealPropRealty <span>↗</span>
                </a>
              </div>
            </div>

            {/* ToLetBoardChennai */}
            <div className="card-hover" style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '240px', background: 'linear-gradient(45deg, #f59e0b, #ea580c)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)' }}>Direct Owners</div>
                <div style={{ fontSize: '64px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>🔑</div>
              </div>
              <div style={{ padding: '40px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#ea580c', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'block' }}>Rent / Lease</span>
                <h3 style={{ fontSize: '32px', color: '#0F172A', marginBottom: '16px', fontFamily: '"Space Grotesk", sans-serif' }}>ToLetBoard Chennai</h3>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.7, marginBottom: '40px', flexGrow: 1 }}>
                  Verified rental and lease discovery across Chennai — residential homes, commercial spaces, and temporary accommodation with direct owner connections and 360° property viewing.
                </p>
                <a href="https://toletboardchennai.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', background: '#ea580c', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  Visit ToLetBoardChennai <span>↗</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Where Property Discovery Fits ── */}
      <section className="fullBleedSection" style={{ background: 'white', padding: 'clamp(64px, 8vw, 112px) 0' }}>
        <div className="sectionInnerWide" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: '999px', padding: '0.4rem 0.8rem', background: 'rgba(252, 110, 32, 0.1)', color: 'var(--primary)', border: '1px solid rgba(252, 110, 32, 0.2)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '24px' }}>Where Property Discovery Fits</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#0F172A', marginBottom: '24px', fontFamily: '"Space Grotesk", sans-serif' }}>The full property journey — discovery to lifetime records.</h2>
          <p style={{ color: '#475569', fontSize: '18px', lineHeight: 1.8, marginBottom: '48px' }}>
            Property portals help users discover spaces. Buildogram helps them build, improve, source materials, track work, verify partners, and maintain long-term property records. Together, they form a complete property journey.
          </p>

          <div style={{ padding: '48px', background: '#F8FAFC', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '16px', color: '#0F172A' }}>Already have your plot or property?</h3>
            <p style={{ color: '#64748B', fontSize: '16px', marginBottom: '32px' }}>
              If you already have your property and need construction guidance, BOQ review, verified contractors, or material support — Buildogram is your construction companion from here.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 28px' }}>Start Your Construction Journey</Link>
              <Link href="/partners/directory" className="btn btn-outline" style={{ padding: '14px 28px' }}>Explore Verified Partners</Link>
              <Link href="/materials" className="btn btn-outline" style={{ padding: '14px 28px' }}>Material Support</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
