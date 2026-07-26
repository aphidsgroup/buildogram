import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import PropertyMarketplaceClient from '../PropertyMarketplaceClient';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
title: '360° Property Listings in Chennai | Buildogram Marketplace',
  description: 'Explore property listings in Chennai with available 360° virtual tours and documentation for independent review.',
  path: '/properties/buy',
});

export default function PropertiesBuyPage() {
  return ( <>
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Property Resales</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Explore Property Resales in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '620px', lineHeight: 1.7, marginBottom: '32px' }}>
            Review available listing history, 360° virtual tours and Property Passport records, and complete independent legal and technical due diligence before purchase.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/property-passport" className="btn btn-primary btn-lg">What is Property Passport?</Link>
            <Link href="/contact" className="btn btn-lg btn-outline-light">Talk to an Advisor</Link>
          </div>
        </div>
      </section>


      <section className="section" style={{ background: '#F8FAFC', minHeight: '60vh' }}>
        <div className="container">
          <PropertyMarketplaceClient initialListingType="buy" />
        </div>
      </section>
    </>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Properties","path":"/properties"},{"name":"360° Property Listings in Chennai","path":"/properties/buy"}]} />
    </>
  );
}
