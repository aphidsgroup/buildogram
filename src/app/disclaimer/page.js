import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

/*
  PROVISIONAL LEGAL DRAFT — requires approval by qualified Indian legal counsel. 
  Do not remove this marker until written approval is recorded.
*/

export const metadata = generateSEOMetadata({
  title: 'Legal Disclaimer | Buildogram',
  description: 'Read the legal disclaimer for Buildogram. Understand the nature of our platform services, partner agreements, material pricing estimates, and limitations of liability.',
  path: '/disclaimer',
});

const sections = [
  {
    id: 'nature-of-services',
    title: '1. Nature of Our Services',
    content: 'Buildogram is an independent, engineer-led Advisory, Construction Intelligence, Coordination, and Property Assurance Consultant — not a direct construction execution company. We provide plan and BOQ review, cost and quotation comparison, construction planning, partner identification and coordination, progress monitoring, stage-wise quality observations, and documentation. We act as an intermediary and advisory body. Construction execution is performed by separately appointed execution partners.',
  },
  {
    id: 'execution-responsibility',
    title: '2. Execution Responsibility',
    content: 'The final execution responsibility, site safety, structural integrity, workmanship quality, and project delivery timelines depend solely on the independent contractors, builders, vendors, and engineers you choose to engage. Any legal agreements, financial transactions, or contracts for actual construction or service execution are strictly between the property owner and the respective partner or contractor. Buildogram is not a party to these execution agreements and does not automatically assume the role of principal contractor or developer.',
  },
  {
    id: 'material-pricing',
    title: '3. Cost Estimates & Pricing',
    content: 'BOQs, estimates, package comparisons, rate analyses, and cost forecasts prepared or displayed by Buildogram are based on the drawings, specifications, measurements, assumptions, quotations, market inputs, and site information available at the time of preparation. They are intended to support planning and comparison and are not an unconditional guarantee of the final construction cost. Buildogram does not guarantee zero cost overruns. Actual prices may vary based on client-requested changes, concealed site conditions, statutory requirements, and market fluctuations.',
  },
  {
    id: 'structural-advice',
    title: '4. Limitation of Review and Advice',
    content: 'Buildogram’s review and advisory services depend on the information supplied, access provided, construction stage visible during the visit, and scope purchased. A site visit or quality report is not continuous supervision, a certification of every concealed element, a structural-design certification, a guarantee against future defects, or a replacement for approvals by licensed professionals or authorities.',
  },
  {
    id: 'partner-verification',
    title: '5. Partner Verification',
    content: 'Partner verification means that Buildogram reviewed selected credentials, documents, or project information according to its published verification methodology as of the stated verification date. Verification is not a guarantee of future performance, financial capacity, regulatory compliance, workmanship, availability, or project outcome. Property owners are strongly advised to independently verify credentials and obtain written agreements with performance guarantees before engaging any partner.',
  },
  {
    id: 'site-safety',
    title: '6. Site Safety',
    content: 'The appointed construction contractor must retain full statutory and operational responsibility for labour control, construction methods, temporary works, tools and machinery, personal protective equipment, site security, accident prevention, and day-to-day site safety. Buildogram’s site visits, reports, or observations do not assume continuous safety supervision unless a signed contract expressly creates that obligation.',
  },
  {
    id: 'ai-tools',
    title: '7. AI Tools & Automated Estimates',
    content: 'AI-powered tools available on our platform generate indicative estimates based on trained models and input data provided by the user. These outputs are preliminary in nature and should be treated as starting points for further professional review — not as final engineering or financial assessments. Accuracy depends heavily on the completeness and correctness of user inputs.',
  },
  {
    id: 'intellectual-property',
    title: '8. Intellectual Property',
    content: 'All content on the Buildogram platform — including BOQ templates, engineering checklists, articles, guides, and software tools — is the intellectual property of Buildogram and its licensors. You may not reproduce, distribute, or create derivative works from our content without explicit written permission.',
  },
  {
    id: 'limitation-of-liability',
    title: '9. Limitation of Liability',
    content: 'To the maximum extent permitted by applicable law, Buildogram\'s total liability arising from or related to your use of our platform is limited to the total fees you have paid to Buildogram in the three months preceding the claim. Buildogram shall not be liable for any indirect, incidental, consequential, or punitive damages including loss of profits, data, or business opportunity — even if we have been advised of the possibility of such damages. Buildogram remains responsible only for performing its own expressly contracted advisory services with reasonable professional care.',
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
