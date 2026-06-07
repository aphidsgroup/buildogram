import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
export const metadata = generateSEOMetadata({
title: 'Terms of Service | Buildogram',
  description: 'Terms of service for Buildogram.',
  path: '/terms',
});

export default function Terms() {
  return ( <>
    <main className="container" style={{ padding: '60px 24px', maxWidth: '800px', lineHeight: 1.7 }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--primary-dark)' }}>Terms of Service</h1>
      <p className="text-muted">Last updated: [Insert Date]</p>
      
      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--secondary)' }}>1. Acceptance of Terms</h2>
        <p>By accessing or using Buildogram, you agree to be bound by these Terms of Service. Buildogram provides a platform for engineering-led construction coordination, material sourcing support, and partner discovery.</p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--secondary)' }}>2. Advisory Role</h2>
        <p>Buildogram facilitates engineering reviews, documentation, and vendor matching. However, the final execution responsibility, work quality, and liability depend entirely on the legal agreement between the property owner and the selected contractor or vendor.</p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--secondary)' }}>3. Material Pricing</h2>
        <p>Material prices provided through the platform are estimates based on supplier quotes. Final prices may vary based on location, availability, and the actual date of delivery/purchase.</p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--secondary)' }}>4. Partner Verification</h2>
        <p>While Buildogram verifies partner credentials to the best of our ability, we do not guarantee the performance of any independent contractor, architect, or supplier.</p>
      </section>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Terms of Service","path":"/terms"}]} />
    </>
  );
}
