import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'Home Construction in Adyar, Chennai | Verified Builders | Buildogram',
  description: 'Planning construction in Adyar? Connect with verified local builders, get BOQ reviews, and source construction materials with Buildogram\'s engineer-led support.',
  path: '/locations/chennai/adyar',
});

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <a href="/" style={{ color: '#FC6E20' }}>Home</a> / <a href="/locations/chennai" style={{ color: '#FC6E20' }}>Chennai</a> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Adyar</span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>
          Home Construction Support in Adyar
        </h1>

        <AnswerBlock 
          question="Building a house in Adyar?" 
          answer="Buildogram provides engineer-led construction support specifically tailored for property owners in Adyar. From initial BOQ audits to finding verified local contractors and sourcing building materials, our platform ensures your project runs smoothly." 
        />

        <ProcessSteps 
          title="How we support your project in Adyar"
          steps={[
            { title: '1. Local Verified Contractors', desc: 'We match you with builders who have a strong track record of executing projects in the Adyar and surrounding Chennai areas.' },
            { title: '2. Site Supervision', desc: 'Our engineers conduct regular site visits to ensure adherence to quality and safety standards.' },
            { title: '3. Material Delivery', desc: 'We coordinate with suppliers to guarantee timely delivery of cement, steel, and other materials directly to your site in Adyar.' }
          ]} 
        />

        <EntitySummary serviceName="Construction in Adyar" />

        <FAQBlock 
          title="Frequently Asked Questions"
          faqs={[
            { question: 'Do you verify contractors in Adyar?', answer: 'Yes, all our construction partners undergo a rigorous verification process to ensure they are qualified and reliable.' },
            { question: 'Can you help with building permits in Chennai?', answer: 'While we primarily focus on execution and quality control, our partner network includes architects who can assist with local CMDA approvals.' }
          ]} 
        />
      </div>
    </main>
  );
}
