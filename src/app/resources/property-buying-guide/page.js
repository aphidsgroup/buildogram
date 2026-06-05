import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
title: 'Property Buying Guide | Buildogram Resources',
  description: 'Understand buying land, apartments, villas, legal documents, and verification.',
  path: '/resources/property-buying-guide',
});

export default function PropertyBuyingGuidePage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Buildogram Guide</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>Property Buying Guide</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>Navigate the complex world of real estate purchasing safely with our comprehensive verification guidelines.</p>
        </div>
      </section>

      <section className="section" style={{ background: '#F8FAFC', minHeight: '60vh' }}>
        <div className="container">
          <div className="card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontSize: '17px', lineHeight: 1.8 }}>
            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>1. Land Verification (Patta & Chitta)</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Always verify the ownership history of a plot through the Patta document. Obtain a 30-year Encumbrance Certificate (EC) to ensure there are no legal disputes or pending mortgages on the land.</p>

            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>2. CMDA & DTCP Approvals</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Never purchase unapproved plots. Ensure the layout is approved by the relevant local authority (like CMDA or DTCP). Unapproved plots will face extreme difficulty securing building plan approvals or bank loans.</p>

            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>3. Buying Apartments & Villas</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Verify the UDS (Undivided Share) percentage before buying an apartment. Ensure the builder has a valid RERA registration number and check for any structural deviations from the approved plan.</p>

            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>4. Physical Inspection & Property Passport</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Demand a Property Passport for a 360-degree digital overview, floor plans, and maintenance history of the property before making a final decision.</p>

            <div style={{ padding: '24px', background: 'rgba(252, 110, 32, 0.05)', borderRadius: '12px', border: '1px solid rgba(252, 110, 32, 0.1)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Want to explore verified properties?</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>View real estate listings safely through our partner networks.</p>
              <Link href="/properties/buy" className="btn btn-primary">Browse Properties</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
