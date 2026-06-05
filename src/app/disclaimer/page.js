import { generateSEOMetadata } from '@/lib/seo/metadata';
export const metadata = generateSEOMetadata({
title: 'Disclaimer | Buildogram',
  description: 'Legal disclaimer for Buildogram.',
  path: '/disclaimer',
});

export default function Disclaimer() {
  return (
    <main className="container" style={{ padding: '60px 24px', maxWidth: '800px', lineHeight: 1.7 }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--primary-dark)' }}>Legal Disclaimer</h1>
      
      <section style={{ marginTop: '32px' }}>
        <p><strong>Buildogram is a construction companion and property ecosystem, not a direct construction execution company.</strong></p>
        <p style={{ marginTop: '16px' }}>Buildogram facilitates engineering-led coordination, BOQ documentation, partner discovery, and material sourcing support.</p>
        <p style={{ marginTop: '16px' }}>The final execution responsibility, site safety, structural integrity, and project delivery depend solely on the independent contractors, builders, or vendors you choose to hire. Any agreements or financial transactions for execution are strictly between the property owner and the respective partner.</p>
        <p style={{ marginTop: '16px' }}>While we strive to provide transparent market rates for construction materials, prices are subject to change based on supplier terms, logistics, market fluctuations, and order timing.</p>
        <p style={{ marginTop: '16px' }}>Information regarding properties listed via our connected portals (e.g., RealPropRealty, ToLetBoard) should be independently verified by the user before making any financial or legal commitments.</p>
      </section>
    </main>
  );
}
