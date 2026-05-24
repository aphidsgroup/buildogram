export const metadata = {
  title: 'Terms of Use | Buildogram',
  description: 'Terms and conditions for using Buildogram.',
};

export default function TermsPage() {
  return (
    <main style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Terms of Use</h1>
      <p style={{ fontStyle: 'italic', color: 'var(--text-light)', marginBottom: '2rem' }}>
        This document is for platform usage guidance and may be updated. For legal disputes, consult the official agreement signed with Buildogram.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using Buildogram, you accept and agree to be bound by the terms and provision of this agreement.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        Buildogram provides users with access to a rich collection of resources, including property listings, construction tracking, AI estimators, and partner directories (the "Service").
      </p>

      <h2>3. User Conduct</h2>
      <p>
        You understand that all information, data, text, software, photographs, graphics, video, messages or other materials, whether publicly posted or privately transmitted, are the sole responsibility of the person from which such content originated.
      </p>

      <h2>4. Modifications to Service</h2>
      <p>
        Buildogram reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice.
      </p>
    </main>
  );
}
