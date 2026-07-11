import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Legal Disclaimer | Buildogram',
  description: 'Read the legal disclaimer for Buildogram. Understand the nature of our platform services, partner agreements, material pricing estimates, and limitations of liability.',
  path: '/disclaimer',
});

const sections = [
  {
    id: 'nature-of-services',
    title: '1. Nature of Our Services',
    content: 'Buildogram is an engineering-led coordination and construction companion platform — not a direct construction execution company. We provide BOQ documentation, contractor quote reviews, partner discovery, material sourcing support, structural audit facilitation, and digital project monitoring. We act as an intermediary and advisory body between property owners and verified independent partners, contractors, suppliers, and engineers.',
  },
  {
    id: 'execution-responsibility',
    title: '2. Execution Responsibility',
    content: 'The final execution responsibility, site safety, structural integrity, workmanship quality, and project delivery timelines depend solely on the independent contractors, builders, vendors, and engineers you choose to engage through or outside of our platform. Any legal agreements, financial transactions, or contracts for actual construction or service execution are strictly between the property owner and the respective partner or contractor. Buildogram is not a party to these agreements.',
  },
  {
    id: 'material-pricing',
    title: '3. Material Pricing & Estimates',
    content: 'Material prices and construction cost estimates provided through our platform are indicative figures based on current market rates at the time of generation. Actual prices may vary based on supplier terms, geographic location, logistics costs, market fluctuations, order timing, and material grade specifications. We recommend obtaining fresh quotes from suppliers before finalizing procurement decisions. Buildogram is not responsible for price changes after an estimate is issued.',
  },
  {
    id: 'structural-advice',
    title: '4. Structural & Engineering Advice',
    content: 'While our platform involves qualified civil and structural engineers, information provided through AI tools, BOQ calculators, and online reports is for guidance purposes only. For any final structural decision — including foundation type, beam sizing, pile depth, or retrofit design — you must engage a licensed structural engineer who physically visits and assesses your site. No digital report or AI-generated estimate substitutes for a formal engineering stamp.',
  },
  {
    id: 'partner-verification',
    title: '5. Partner Verification',
    content: 'Buildogram verifies partner credentials including RERA registration, professional licenses, past project references, and documentation to the best of our ability. However, we do not guarantee the ongoing performance, quality of work, financial solvency, or conduct of any independent partner listed on our platform. Property owners are strongly advised to independently verify credentials, inspect past projects, and obtain written agreements with performance guarantees before engaging any partner.',
  },
  {
    id: 'property-information',
    title: '6. Property Listing Information',
    content: 'Information regarding properties listed via Buildogram or connected portals (including but not limited to RealPropRealty and ToLetBoard) is provided by the property owners or agents and has not been independently verified by Buildogram in all cases. All property details, pricing, legal status, encumbrances, and approvals should be independently verified by the user with the appropriate legal and government authorities before making any financial or legal commitments.',
  },
  {
    id: 'ai-tools',
    title: '7. AI Tools & Automated Estimates',
    content: 'AI-powered tools available on our platform (including the AI BOQ Checker, AI Cost Estimator, AI Material Estimator, and AI Structural Audit Intake) generate indicative estimates based on trained models and input data provided by the user. These outputs are preliminary in nature and should be treated as starting points for further professional review — not as final engineering or financial assessments. Accuracy depends heavily on the completeness and correctness of user inputs.',
  },
  {
    id: 'intellectual-property',
    title: '8. Intellectual Property',
    content: 'All content on the Buildogram platform — including BOQ templates, engineering checklists, articles, guides, and software tools — is the intellectual property of Buildogram and its licensors. You may not reproduce, distribute, or create derivative works from our content without explicit written permission. Property Passport documents generated for your project are issued for your personal use and may not be shared, sold, or transferred without authorization.',
  },
  {
    id: 'limitation-of-liability',
    title: '9. Limitation of Liability',
    content: 'To the maximum extent permitted by applicable law, Buildogram\'s total liability arising from or related to your use of our platform is limited to the total fees you have paid to Buildogram in the three months preceding the claim. Buildogram shall not be liable for any indirect, incidental, consequential, or punitive damages including loss of profits, data, or business opportunity — even if we have been advised of the possibility of such damages.',
  },
  {
    id: 'governing-law',
    title: '10. Governing Law',
    content: 'This disclaimer and all matters relating to Buildogram\'s services are governed by the laws of the State of Tamil Nadu, India. Any disputes arising under this disclaimer shall be subject to the exclusive jurisdiction of the courts located in Chennai, Tamil Nadu.',
  },
];

export default function Disclaimer() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--secondary)', padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(252,110,32,0.06) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(252,110,32,0.12)', border: '1px solid rgba(252,110,32,0.25)', borderRadius: '999px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Legal</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, marginBottom: '10px', lineHeight: 1.2 }}>Legal Disclaimer</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px' }}>Last updated: July 2026</p>
        </div>
      </section>

      {/* Table of Contents */}
      <div style={{ background: 'var(--bg-card2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '860px', padding: '20px 24px' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contents</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {sections.map((s, i) => (
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
          By accessing or using the Buildogram platform, you acknowledge that you have read, understood, and agree to the terms set out in this disclaimer. Please read it carefully before engaging any of our services.
        </p>

        {sections.map((section) => (
          <section key={section.id} id={section.id} style={{ marginBottom: '40px', scrollMarginTop: '90px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--secondary)', borderLeft: '4px solid var(--primary)', paddingLeft: '16px', marginBottom: '14px', lineHeight: 1.3 }}>
              {section.title}
            </h2>
            <p style={{ color: 'var(--text)', lineHeight: 1.85, fontSize: '15px' }}>{section.content}</p>
          </section>
        ))}

        {/* CTA */}
        <div style={{ marginTop: '56px', padding: '32px', background: 'var(--bg-card2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '8px' }}>Have a legal question about our services?</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>Our team is happy to clarify any aspect of how Buildogram works and what we are responsible for.</p>
          <Link href="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Legal Disclaimer', path: '/disclaimer' }]} />
    </>
  );
}
