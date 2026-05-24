export const metadata = {
  title: 'Privacy Policy | Buildogram',
  description: 'Read the privacy policy and data practices of Buildogram.',
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Privacy Policy</h1>
      <p style={{ fontStyle: 'italic', color: 'var(--text-light)', marginBottom: '2rem' }}>
        This document is for platform usage guidance and may be updated. For legal disputes, consult the official agreement signed with Buildogram.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.
      </p>

      <h2>2. Use of Information</h2>
      <p>
        We may use the information we collect about you to provide, maintain, and improve our services, including to facilitate payments, send receipts, provide products and services you request, develop new features, provide customer support, and send updates.
      </p>

      <h2>3. Sharing of Information</h2>
      <p>
        We may share the information we collect about you with our vendors, consultants, marketing partners, and other service providers who need access to such information to carry out work on our behalf.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
      </p>
    </main>
  );
}
