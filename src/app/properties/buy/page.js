import { generateSEOMetadata } from '@/lib/seo/metadata';
import PropertyMarketplaceClient from '../PropertyMarketplaceClient';

export const metadata = generateSEOMetadata({
title: '360° Property Listings in Chennai | Buildogram Marketplace',
  description: 'Buy premium, verified properties in Chennai with 360° virtual tours.',
  path: '/properties/buy',
});

export default function PropertiesBuyPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Verified Resales</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Buy Verified Properties in Chennai — Full Transparency, Zero Surprises
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '620px', lineHeight: 1.7, marginBottom: '32px' }}>
            Every listing comes with a verified history, 360° virtual tours, and Buildogram's Property Passport — so you buy with complete confidence.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/property-passport" className="btn btn-primary btn-lg">What is Property Passport?</a>
            <a href="/contact" className="btn btn-lg btn-outline-light">Talk to an Advisor</a>
          </div>
        </div>
      </section>


      <section className="section" style={{ background: '#F8FAFC', minHeight: '60vh' }}>
        <div className="container">
          <PropertyMarketplaceClient initialListingType="buy" />
        </div>
      </section>
    </>
  );
}
