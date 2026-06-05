import { generateSEOMetadata } from '@/lib/seo/metadata';
export const metadata = generateSEOMetadata({
title: 'Privacy Policy | Buildogram',
  description: 'Privacy policy for Buildogram users.',
  path: '/privacy-policy',
});

export default function PrivacyPolicy() {
  return (
    <main className="container" style={{ padding: '60px 24px', maxWidth: '800px', lineHeight: 1.7 }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--primary-dark)' }}>Privacy Policy</h1>
      <p className="text-muted">Last updated: [Insert Date]</p>
      
      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--secondary)' }}>1. Information We Collect</h2>
        <p>Buildogram collects information you provide directly to us when you request BOQ reviews, register as a partner, or seek material quotes. This includes your name, phone number, email, and project details.</p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--secondary)' }}>2. How We Use Your Information</h2>
        <p>We use your information to facilitate engineering-led coordination, provide accurate material quotes, verify partner credentials, and maintain your digital Property Passport.</p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--secondary)' }}>3. Information Sharing</h2>
        <p>We may share your project requirements with verified partners and suppliers within our network to fulfill your requests (such as material sourcing or contractor matching). We do not sell your personal data to third parties.</p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--secondary)' }}>4. Data Security</h2>
        <p>We implement reasonable security measures to protect your documents, project photos, and personal information stored within the Buildogram ecosystem.</p>
      </section>
    </main>
  );
}
