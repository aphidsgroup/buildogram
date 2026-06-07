import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({ 
  title: 'Buildogram Quality System (BQS) | Evidence-Backed Construction Quality', 
  description: 'The Buildogram Quality System (BQS) provides an evidence-backed framework with up to 2500+ potential checkpoints. Stage-wise engineer-led inspections mapped directly to your Property Passport.', 
  path: '/quality-system' 
});

const STEPS = [
  { title: '1. Project Scope Mapping', desc: 'Our engineers map your project’s specific requirements against the comprehensive 2500+ BQS checkpoint framework to determine the applicable checks.' }, 
  { title: '2. Stage-Wise Inspections', desc: 'At critical milestones (Foundation, RCC, MEP, Waterproofing), a qualified civil engineer performs targeted inspections against the checklist.' }, 
  { title: '3. Proof Uploads & Remarks', desc: 'Observations are documented with photographic or measurement-based evidence, providing an honest record of field conditions.' }, 
  { title: '4. Rework & Issue Closure', desc: 'Failed checkpoints generate rework tickets. The contractor addresses the issue, and the engineer verifies closure before the stage is marked complete.' }, 
  { title: '5. Property Passport Integration', desc: 'All completed inspection records and quality summaries are permanently attached to your digital Property Passport.' }
];

const FAQS = [
  { question: 'Does BQS guarantee zero defects?', answer: 'No system can guarantee zero defects in construction. BQS provides an evidence-backed framework for tracking observations, enforcing structured stage-wise checks, and ensuring identified issues are properly closed out with documentation.' }, 
  { question: 'Are all 2500+ checkpoints used on every project?', answer: 'No. The BQS is a vast framework covering everything from basic masonry to deep piling. Your project’s specific scope dictates which checklists are activated.' }, 
  { question: 'Who performs the inspections?', answer: 'Inspections are led by independent, qualified civil and structural engineers from the Buildogram network.' }, 
  { question: 'Can I see the inspection results?', answer: 'Yes. Completed stage summaries and owner-visible proof records are automatically published to your secure Property Passport.' }
];

export default function Page() { 
  return ( 
    <>
      <main className="min-h-screen bg-slate-50 font-sans pb-24">
        
        {/* Hero Section */}
        <section className="bg-slate-900 text-white pt-32 pb-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 text-orange-500 font-bold tracking-widest uppercase text-sm">Buildogram Quality System</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">Evidence-Backed Quality Tracking for Construction.</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-medium">An operational framework of up to 2500+ potential checkpoints, ensuring stage-wise quality observations are documented, corrected, and stored permanently.</p>
            <div className="flex justify-center gap-4">
              <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">Speak to an Engineer</Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-sm font-medium text-slate-500">
              <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link> / 
              <span className="text-slate-900 ml-2">Buildogram Quality System (BQS)</span>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">What is the Buildogram Quality System?</h2>
              <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
                <p>The Buildogram Quality System (BQS) is an operational software layer used by our engineers to track field execution against defined standards. Rather than relying on generic promises of quality, BQS enforces <strong>evidence-backed accountability</strong>.</p>
                <p>Engineers arrive at the site equipped with stage-specific checklists (e.g., Foundation, Masonry, MEP, Waterproofing). They document observations using photos, videos, and precise measurements. If an issue is flagged, a formal <strong>rework ticket</strong> is generated, requiring proof of correction before the stage is closed.</p>
                <p>Ultimately, all verified checkpoint summaries are attached to your <Link href="/property-passport" className="text-orange-500 font-semibold hover:underline">Property Passport</Link>, creating a permanent digital twin of your home's construction history.</p>
              </div>
            </div>

            <div className="mb-12">
              <ProcessSteps title="How The BQS Works" steps={STEPS} />
            </div>

            <div className="mb-12">
              <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Legal & Privacy Scope</h2>
              <p className="text-slate-600 mb-4">Buildogram provides an engineer-led, evidence-based quality tracking system. We document observations and facilitate rework closure. The BQS does not constitute an absolute guarantee of structural safety or zero defects, but rather a best-in-class risk mitigation framework. Project-specific checklist scopes vary based on the scale, design, and agreed requirements.</p>
            </div>

            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-200 mb-12">
              <h2 className="text-lg font-bold text-orange-900 mb-4">Related Engineering Services</h2>
              <div className="flex flex-wrap gap-3">
                <Link href="/property-passport" className="bg-white px-4 py-2 rounded-lg border border-orange-200 text-sm font-bold text-slate-700 hover:border-orange-500 transition-colors">Property Passport OS</Link>
                <Link href="/structural-audit-chennai" className="bg-white px-4 py-2 rounded-lg border border-orange-200 text-sm font-bold text-slate-700 hover:border-orange-500 transition-colors">Structural Audits</Link>
                <Link href="/materials" className="bg-white px-4 py-2 rounded-lg border border-orange-200 text-sm font-bold text-slate-700 hover:border-orange-500 transition-colors">Material Verification</Link>
                <Link href="/case-studies" className="bg-white px-4 py-2 rounded-lg border border-orange-200 text-sm font-bold text-slate-700 hover:border-orange-500 transition-colors">Proof & Case Studies</Link>
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
