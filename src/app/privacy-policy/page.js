import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Privacy Policy | Buildogram',
  description: 'Learn how Buildogram collects, uses, and protects your personal information. Read our full privacy policy covering data storage, sharing, cookies, and your rights.',
  path: '/privacy-policy',
});

const sections = [
  {
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you use our services. This includes:
    
• **Contact & Project Information**: Your name, phone number, email address, plot location, project type, budget range, and construction stage — collected when you submit enquiries, BOQ requests, or service quotes.

• **Property Details**: Plot size, building plans, floor drawings, and site photos — uploaded for BOQ reviews, plan analysis, or Property Passport creation.

• **Account Information**: If you create a client account, we store your login credentials (email and hashed password), project history, and uploaded documents.

• **Partner & Supplier Data**: If you register as a partner or supplier, we collect business credentials, license documents, GST details, portfolio information, and bank details for payments.

• **Communication Records**: Enquiry messages, support tickets, and consultations with our engineering team.

• **Usage Data**: Pages visited, features used, time spent, device type, browser, IP address, and referring URL — collected automatically via analytics tools.`,
  },
  {
    id: 'how-we-use',
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:

• Facilitate engineering-led coordination — providing BOQ reviews, structural audit assessments, material quotes, and site supervision reports based on your project data.
• Connect you with verified partners and suppliers that match your project requirements.
• Send you project updates, milestone notifications, and service-related communications.
• Manage your digital Property Passport — storing construction documentation, test reports, and handover documents securely.
• Improve our platform — analysing usage patterns to enhance features, fix issues, and personalise your experience.
• Comply with legal obligations and prevent fraud or misuse of our platform.`,
  },
  {
    id: 'information-sharing',
    title: '3. Information Sharing with Partners',
    content: 'We may share relevant project details (location, type, budget, requirements) with verified partners and suppliers within the Buildogram network to fulfil your service requests — such as material quotes, contractor matching, or structural audit coordination. Partners are bound by confidentiality agreements and may only use your data to fulfil the specific service requested. We do not sell, rent, or trade your personal data to third parties for marketing purposes.',
  },
  {
    id: 'cookies-analytics',
    title: '4. Cookies and Analytics',
    content: 'We use cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, and analyse site traffic. We use analytics tools (including Google Analytics) to understand how users interact with our platform. You may disable cookies through your browser settings, though this may affect some features of the platform. Our site does not use advertising cookies or cross-site tracking for ad targeting.',
  },
  {
    id: 'data-storage',
    title: '5. Data Storage and Security',
    content: 'Your data is stored on secured cloud infrastructure (including Vercel and Neon PostgreSQL) with encryption in transit (TLS/SSL) and at rest. We implement access controls, regular security reviews, and secure authentication to protect your account and documents. Construction documents, lab reports, and property plans stored in your Property Passport are accessible only to you and authorised team members. While we take reasonable security measures, no system is completely immune to breaches. In the event of a data security incident, we will notify affected users as required by applicable law.',
  },
  {
    id: 'your-rights',
    title: '6. Your Rights',
    content: `You have the following rights regarding your personal data:

• **Access**: Request a copy of the personal data we hold about you.
• **Correction**: Request correction of inaccurate or incomplete information.
• **Deletion**: Request deletion of your account and associated data (subject to legal retention requirements).
• **Portability**: Request your project data in a portable format (PDF, JSON).
• **Objection**: Object to certain types of processing, such as marketing communications.

To exercise any of these rights, contact us at privacy@buildogram.com. We will respond within 30 days.`,
  },
  {
    id: 'third-party-services',
    title: '7. Third-Party Services',
    content: 'Our platform integrates with third-party services including Razorpay (payment processing), Google Maps (location services), Vimeo (video content), and cloud storage providers. These services have their own privacy policies, and we encourage you to review them. We are not responsible for the data practices of third-party services linked from our platform.',
  },
  {
    id: 'childrens-privacy',
    title: '8. Children\'s Privacy',
    content: 'The Buildogram platform is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a child has provided us with personal information, please contact us immediately at privacy@buildogram.com and we will take steps to delete such information.',
  },
  {
    id: 'data-retention',
    title: '9. Data Retention',
    content: 'We retain your personal data for as long as your account is active or as needed to provide services. Project documents, Property Passport records, and BOQ reports are retained for up to 7 years to support warranty claims and legal compliance. When you delete your account, we remove identifiable personal data within 90 days, though some records may be retained in anonymised form for analytics purposes or as required by law.',
  },
  {
    id: 'policy-changes',
    title: '10. Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of significant changes via email or a prominent notice on our platform. The "Last updated" date at the top of this policy indicates when it was last revised. Continued use of our platform after a policy update constitutes your acceptance of the revised policy.',
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--secondary)', padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(252,110,32,0.06) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(252,110,32,0.12)', border: '1px solid rgba(252,110,32,0.25)', borderRadius: '999px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Legal</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, marginBottom: '10px', lineHeight: 1.2 }}>Privacy Policy</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px' }}>Last updated: July 2026</p>
        </div>
      </section>

      {/* Table of Contents */}
      <div style={{ background: 'var(--bg-card2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '860px', padding: '20px 24px' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contents</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} style={{ fontSize: '13px', color: 'var(--primary)', background: 'rgba(252,110,32,0.08)', borderRadius: '999px', padding: '4px 12px', textDecoration: 'none', border: '1px solid rgba(252,110,32,0.15)', whiteSpace: 'nowrap' }}>
                {s.title.split('.')[0].trim()}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ maxWidth: '860px', padding: '56px 24px 80px' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.8, marginBottom: '48px', padding: '20px 24px', background: 'var(--bg-card2)', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--primary)' }}>
          Your privacy matters to us. This policy explains exactly what data we collect, how we use it, who we share it with, and what rights you have. If you have any questions, contact us at{' '}
          <a href="mailto:privacy@buildogram.com" style={{ color: 'var(--primary)' }}>privacy@buildogram.com</a>.
        </p>

        {sections.map((section) => (
          <section key={section.id} id={section.id} style={{ marginBottom: '44px', scrollMarginTop: '90px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '14px', lineHeight: 1.3 }}>
              {section.title}
            </h2>
            <div style={{ color: 'var(--text)', lineHeight: 1.85, fontSize: '15px', whiteSpace: 'pre-line' }}>{section.content}</div>
          </section>
        ))}

        {/* Contact CTA */}
        <div style={{ marginTop: '56px', padding: '32px', background: 'var(--bg-card2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '8px' }}>Privacy Questions?</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '6px' }}>Email us at <a href="mailto:privacy@buildogram.com" style={{ color: 'var(--primary)' }}>privacy@buildogram.com</a></p>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>We respond within 30 business days.</p>
          <Link href="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy' }]} />
    </>
  );
}
