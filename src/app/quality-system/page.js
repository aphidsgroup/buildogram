import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';
import { generateHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import EngineerCredibility from '@/components/seo/EngineerCredibility';

export const metadata = generateSEOMetadata({ 
  title: 'Buildogram Quality System (BQS) | Stage-Wise Construction Quality Verification', 
  description: 'The Buildogram Quality System provides up to 2,500+ engineer-led inspection checkpoints across every construction stage. Independent verification. Evidence-backed. Recorded in your Property Passport.', 
  path: '/quality-system' 
});

const STEPS = [
  { title: '1. Project Scope Mapping', desc: 'Our engineers map your project\u2019s specific requirements against the comprehensive 2500+ BQS checkpoint framework to determine the applicable checks.' }, 
  { title: '2. Stage-Wise Inspections', desc: 'At critical milestones (Foundation, RCC, MEP, Waterproofing), a qualified civil engineer performs targeted inspections against the checklist.' }, 
  { title: '3. Proof Uploads & Remarks', desc: 'Observations are documented with photographic or measurement-based evidence, providing an honest record of field conditions.' }, 
  { title: '4. Rework & Issue Closure', desc: 'Failed checkpoints generate rework tickets. The contractor addresses the issue, and the engineer verifies closure before the stage is marked complete.' }, 
  { title: '5. Property Passport Integration', desc: 'All completed inspection records and quality summaries are permanently attached to your digital Property Passport.' }
];

const FAQS = [
  { question: 'Does BQS guarantee zero defects?', answer: 'No system can guarantee zero defects in construction. BQS provides an evidence-backed framework for tracking observations, enforcing structured stage-wise checks, and ensuring identified issues are properly closed out with documentation.' }, 
  { question: 'Are all 2500+ checkpoints used on every project?', answer: 'No. The BQS is a vast framework covering everything from basic masonry to deep piling. Your project\u2019s specific scope dictates which checklists are activated.' }, 
  { question: 'Who performs the inspections?', answer: 'Inspections are led by independent, qualified civil and structural engineers from the Buildogram network.' }, 
  { question: 'Can I see the inspection results?', answer: 'Yes. Completed stage summaries and owner-visible proof records are automatically published to your secure Property Passport.' }
];

const howToSchema = generateHowToSchema({
  name: 'How the Buildogram Quality System (BQS) Works',
  description: 'A stage-wise, evidence-backed construction quality framework with up to 2500+ checkpoints, carried out by independent qualified engineers.',
  url: 'https://www.buildogram.in/quality-system',
  steps: STEPS.map(s => ({ name: s.title, text: s.desc })),
});

const faqSchema = generateFAQSchema(FAQS.map(f => ({ q: f.question, a: f.answer })));

export default function Page() { 
  return ( 
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: '96px' }}>
        
        {/* Hero Section */}
        <section style={{ background: 'var(--secondary)', color: 'white', padding: '128px 32px 80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.08) 0%, transparent 55%)' }} />
          <div style={{ maxWidth: '896px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div style={{ marginBottom: '16px', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '14px' }}>
              Buildogram Quality System
            </div>
            <h1 style={{ color: 'white', fontSize: 'clamp(28px, 5vw, 56px)', lineHeight: 1.15, marginBottom: '24px', fontWeight: 900 }}>
              Evidence-Backed Quality Tracking for Construction.
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.75)', maxWidth: '672px', margin: '0 auto 32px', fontWeight: 500, lineHeight: 1.6 }}>
              An operational framework of up to 2500+ potential checkpoints, ensuring stage-wise quality observations are documented, corrected, and stored permanently.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary btn-lg">Speak to an Engineer</Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section style={{ padding: '64px 32px' }}>
          <div style={{ maxWidth: '896px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px', fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>
              <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              {' / '}
              <span style={{ color: 'var(--secondary)', marginLeft: '4px' }}>Buildogram Quality System (BQS)</span>
            </div>
            
            <EngineerCredibility mode="full" />

            <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '24px' }}>
                What is the Buildogram Quality System?
              </h2>
              <div style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                <p style={{ marginBottom: '16px' }}>
                  The Buildogram Quality System (BQS) is an operational software layer used by our engineers to track field execution against defined standards. Rather than relying on generic promises of quality, BQS enforces <strong>evidence-backed accountability</strong>.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Engineers arrive at the site equipped with stage-specific checklists (e.g., Foundation, Masonry, MEP, Waterproofing). They document observations using photos, videos, and precise measurements. If an issue is flagged, a formal <strong>rework ticket</strong> is generated, requiring proof of correction before the stage is closed.
                </p>
                <p>
                  Ultimately, all verified checkpoint summaries are attached to your{' '}
                  <Link href="/property-passport" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                    Property Passport
                  </Link>
                  , creating a permanent digital twin of your home&apos;s construction history.
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '48px' }}>
              <ProcessSteps title="How The BQS Works" steps={STEPS} />
            </div>

            <div style={{ marginBottom: '48px' }}>
              <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>
                Legal &amp; Privacy Scope
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Buildogram provides an engineer-led, evidence-based quality tracking system. We document observations and facilitate rework closure. The BQS does not constitute an absolute guarantee of structural safety or zero defects, but rather a best-in-class risk mitigation framework. Project-specific checklist scopes vary based on the scale, design, and agreed requirements.
              </p>
            </div>

            <div style={{ background: 'rgba(252,110,32,0.06)', padding: '32px', borderRadius: 'var(--radius)', border: '1px solid rgba(252,110,32,0.2)', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>
                Related Engineering Services
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <Link href="/property-passport" style={{ background: 'var(--bg-card)', padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(252,110,32,0.25)', fontSize: '14px', fontWeight: 700, color: 'var(--text)', textDecoration: 'none' }}>Property Passport OS</Link>
                <Link href="/structural-audit-chennai" style={{ background: 'var(--bg-card)', padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(252,110,32,0.25)', fontSize: '14px', fontWeight: 700, color: 'var(--text)', textDecoration: 'none' }}>Structural Audits</Link>
                <Link href="/materials" style={{ background: 'var(--bg-card)', padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(252,110,32,0.25)', fontSize: '14px', fontWeight: 700, color: 'var(--text)', textDecoration: 'none' }}>Material Verification</Link>
                <Link href="/case-studies" style={{ background: 'var(--bg-card)', padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(252,110,32,0.25)', fontSize: '14px', fontWeight: 700, color: 'var(--text)', textDecoration: 'none' }}>Proof &amp; Case Studies</Link>
              </div>
            </div>

            <LocalIntentBlock />

          </div>
        </section>

      </main>
      
      <BreadcrumbSchema items={[
        {"name": "Home", "path": "/"},
        {"name": "Quality System", "path": "/quality-system"}
      ]} />
      
      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Buildogram Quality System (BQS)",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Buildogram"
            },
            "description": "An evidence-backed construction quality framework providing up to 2500+ checklists, stage-wise engineer inspections, and property passport integration.",
            "areaServed": "Chennai",
            "serviceType": "Construction Quality Inspection"
          })
        }}
      />
    </>
  ); 
}
