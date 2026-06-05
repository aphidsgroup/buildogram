import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';

export const metadata = generateSEOMetadata({
  title: 'Site Supervision Services in Chennai | Engineer-Led Checks | Buildogram',
  description: 'Independent site supervision in Chennai. Our engineers verify quality, materials, and contractor progress to protect your investment.',
  path: '/site-supervision-chennai',
});

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        {/* Breadcrumbs could go here */}
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <a href="/" style={{ color: '#FC6E20' }}>Home</a> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Site Supervision in Chennai</span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>
          Site Supervision in Chennai
        </h1>

        <AnswerBlock 
          question="Why use Buildogram for your project?" 
          answer="Independent site supervision in Chennai. Our engineers verify quality, materials, and contractor progress to protect your investment." 
        />

        <ProcessSteps 
          title="Our Approach to Site Supervision in Chennai"
          steps={[
            { title: '1. Requirement Mapping', desc: 'We map out your plot size, location, budget, and specific construction needs.' },
            { title: '2. Plan & BOQ Review', desc: 'Our engineers audit architectural plans and contractor quotes to prevent hidden costs.' },
            { title: '3. Verified Partners', desc: 'We connect you with trusted builders and contractors tailored to your project.' },
            { title: '4. Site Tracking', desc: 'Monitor milestones and material deliveries via our digital platform.' }
          ]} 
        />

        <EntitySummary serviceName="Site Supervision in Chennai" />

        <LocalIntentBlock />

        <FAQBlock 
          title="Frequently Asked Questions"
          faqs={[
            { question: 'Do you provide direct construction services?', answer: 'We are an engineer-led support platform. We connect you with verified contractors and audit their work to ensure quality and transparency.' },
            { question: 'How much does BOQ review cost?', answer: 'Our BOQ review pricing varies based on project size. Contact our engineers for a custom quote.' },
            { question: 'Can I source materials through Buildogram?', answer: 'Yes, we provide transparent quotes for cement, steel, sand, and other materials directly from verified suppliers in Chennai.' }
          ]} 
        />

      </div>
    </main>
  );
}
