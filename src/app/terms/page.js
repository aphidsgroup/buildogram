import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

/*
  PROVISIONAL LEGAL DRAFT — requires approval by qualified Indian legal counsel. 
  Do not remove this marker until written approval is recorded.
*/

export const metadata = generateSEOMetadata({
  title: 'Terms of Service | Buildogram',
  description: 'Read Buildogram\'s Terms of Service. Understand your rights and obligations when using our engineering-led construction platform in Chennai.',
  path: '/terms',
});

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: 'By accessing, registering on, or using the Buildogram platform — whether through our website, mobile application, or any associated service — you agree to be bound by these Terms of Service and all policies referenced herein, including our Privacy Policy and Disclaimer. If you do not agree to these terms, please discontinue use of our platform immediately. These terms constitute a legally binding agreement between you and Buildogram.',
  },
  {
    id: 'platform-role',
    title: '2. Platform Role — Advisory & Coordination',
    content: `Buildogram operates as an independent, engineer-led Advisory, Construction Intelligence, Coordination, and Property Assurance Consultant. Our role includes:

• Plan and BOQ review
• Cost and quotation comparison
• Construction planning
• Partner identification and coordination
• Progress monitoring and stage-wise quality observations
• Material-document verification and issue documentation
• Reporting and Property Passport record management

Construction execution is performed by a separately appointed builder, contractor, specialist consultant, supplier, or execution partner under a separate agreement with the client.

Buildogram is NOT automatically the principal contractor, builder, developer, promoter, employer of the contractor's labour, supplier of materials, structural-warranty provider, insurer, or guarantor of the contractor's performance. However, Buildogram remains responsible for performing its own expressly contracted advisory, review, coordination, and documentation services with reasonable professional care, subject to the agreed scope, information available, exclusions, and limitations.`,
  },
  {
    id: 'warranty',
    title: '3. Warranty & Defect Liability',
    content: `Any structural, workmanship, waterproofing, material, equipment, or other construction warranty is provided only by the builder, contractor, specialist vendor, manufacturer, or execution partner identified in the applicable execution agreement or warranty document. Buildogram may coordinate, collect, record, and assist in tracking such warranty documentation but does not independently issue, insure, guarantee, or underwrite a third party’s warranty unless Buildogram expressly agrees to do so in a separately signed written contract.

Furthermore:
• Execution partners remain solely responsible for their own work.
• Buildogram’s inspections or observations do not transfer the contractor’s responsibility to Buildogram.
• A Buildogram report is not a guarantee that latent or future defects cannot arise.
• Visual or stage-wise reviews are limited to the areas, documents, and construction stages reasonably available for review.
• Concealed work, laboratory performance, design liability, and workmanship outside Buildogram’s scope cannot be guaranteed.
• Manufacturers remain responsible for their own product warranties.

Responsibility Allocation:
- Contractor: Execution, workmanship, labour, methods, site safety, structural implementation, statutory execution compliance, and delivery.
- Designer/Structural Consultant: Design calculations, drawings, and design adequacy within their appointment.
- Supplier/Manufacturer: Supplied products and manufacturer warranties.
- Buildogram: Only Buildogram’s expressly contracted advisory, review, coordination, reporting, and documentation duties.`,
  },
  {
    id: 'indemnity',
    title: '4. Indemnity & Hold Harmless',
    content: '[PLACEHOLDER FOR LEGAL REVIEW: Solicitor to draft an indemnity and hold-harmless clause covering claims arising from third-party (contractor/supplier) breaches, workmanship, site safety, statutory violations, or inaccurate client info, without unlawfully excluding Buildogram\'s own liability for its expressly contracted advisory/coordination services or professional negligence.]',
  },
  {
    id: 'cost-estimates',
    title: '5. Cost Estimates & Overruns',
    content: `Buildogram reduces cost uncertainty through itemised BOQ review, quotation comparison, scope clarification, and documented variation tracking. However, Buildogram does not guarantee zero cost overruns and does not warrant that the final cost will exactly match an estimate unless a separate signed contract expressly provides a fixed-price obligation.

BOQs, estimates, package comparisons, rate analyses, and cost forecasts prepared or displayed by Buildogram are based on the drawings, specifications, measurements, assumptions, quotations, market inputs, and site information available at the time of preparation. They are intended to support planning and comparison and are not an unconditional guarantee of the final construction cost.

Final costs can change because of:
• Client-requested changes or design revisions
• Differences between preliminary and issued-for-construction drawings
• Quantity variations or concealed/unforeseen site conditions
• Soil or groundwater conditions
• Statutory or authority requirements
• Contractor measurement and billing variations
• Taxes and government levies
• Labour availability and market-price changes
• Material-brand or specification changes
• Delays, force majeure, or approved variations
• Errors or omissions in information supplied by third parties.`,
  },
  {
    id: 'agreements',
    title: '6. Separate Client and Contractor Agreements',
    content: `When engaging services through the platform, you may enter into separate agreements:

A. Buildogram Advisory and Coordination Agreement: Between the client and Buildogram. This governs Buildogram’s professional scope, fees, deliverables, exclusions, limitations, communication, reporting, and documentation.

B. Construction Execution Agreement: Between the client and the appointed builder or contractor. This governs construction execution, scope, BOQ, specifications, price, payment schedule, variations, workmanship, labour, site safety, project programme, delay, defects, retention, warranties, termination, and dispute resolution.

C. Specialist or Supplier Agreements: Where applicable, separate agreements may exist with architects, structural consultants, soil-testing agencies, surveyors, NDT agencies, piling contractors, interior contractors, waterproofing contractors, suppliers, and manufacturers.

Listing a partner or coordinating communications does not mean Buildogram automatically becomes a party to every third-party contract.`,
  },
  {
    id: 'no-agency',
    title: '7. No Agency, Partnership, or Joint Venture',
    content: `Listing, recommending, verifying, introducing, coordinating, or communicating with a partner on the Buildogram platform does not by itself create an employment, legal partnership, joint venture, franchise, agency, or subcontracting relationship, nor does it provide authority for the partner to bind Buildogram.

The exact relationship in a specific project is governed strictly by the signed project documents. Companies listed on the platform are "appointed execution partners," "independent contractors," "verified partners," or "selected service providers" depending on the actual relationship, not automatically "Buildogram contractors."`,
  },
  {
    id: 'partner-verification',
    title: '8. Partner Verification',
    content: 'Partner verification means that Buildogram reviewed selected credentials, documents, or project information according to its published verification methodology as of the stated verification date. Verification is not a guarantee of future performance, financial capacity, regulatory compliance, workmanship, availability, or project outcome.',
  },
  {
    id: 'client-responsibilities',
    title: '9. Client Responsibilities',
    content: `As a client, you are obligated to:
• Provide accurate ownership, design, site, and project information.
• Review and approve drawings, specifications, budgets, and variations.
• Enter into appropriate contracts with execution partners and make contractual payments directly as agreed.
• Obtain legal, tax, financing, and statutory advice where required.
• Not direct unauthorised deviations or bypass reviewed drawings.
• Notify Buildogram of scope and design changes.
• Allow reasonable access for agreed inspections.
• Preserve reports and project records.`,
  },
  {
    id: 'precedence',
    title: '10. Precedence of Signed Project Contracts',
    content: 'If there is a conflict between general website information (including website pages, calculators, sample BOQs, package examples, and educational content) and a separately signed project-specific agreement, the signed project-specific agreement will govern that engagement to the extent of the conflict.',
  },
  {
    id: 'intellectual-property',
    title: '11. Intellectual Property',
    content: 'All software, content, tools, templates, branding, and materials on the Buildogram platform are the exclusive intellectual property of Buildogram or its licensors. Property Passport documents generated for your project are issued for your personal use and may not be shared, sold, or transferred without authorization.',
  },
  {
    id: 'termination',
    title: '12. Termination',
    content: 'Buildogram reserves the right to suspend or terminate your account at any time, with or without notice, if we have reason to believe you have violated these Terms of Service. You may terminate your account at any time by contacting us at support@buildogram.com.',
  },
];

export default function Terms() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--secondary)', padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(252,110,32,0.06) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(252,110,32,0.12)', border: '1px solid rgba(252,110,32,0.25)', borderRadius: '999px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Legal</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, marginBottom: '10px', lineHeight: 1.2 }}>Terms of Service</h1>
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
          These Terms of Service govern your use of the Buildogram platform. Please read them carefully. By using our services, you agree to be bound by these terms. For questions, contact us at{' '}
          <a href="mailto:support@buildogram.com" style={{ color: 'var(--primary)' }}>support@buildogram.com</a>.
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
          <h3 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '8px' }}>Questions about our Terms?</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>Our team is happy to explain any aspect of how Buildogram works and what these terms mean for you.</p>
          <Link href="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Terms of Service', path: '/terms' }]} />
    </>
  );
}
