'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Local Guidance"
      heroTitle="Construction in Chennai"
      heroSub="Local expertise, local partners, local material rates."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore More', href: '/' }}
      problems={[
        { icon: '⚠️', title: 'Lack of clarity', desc: 'Owners struggle to understand technical details.' },
        { icon: '💸', title: 'Hidden costs', desc: 'Unplanned expenses disrupt the budget.' },
        { icon: '📉', title: 'Quality compromises', desc: 'Materials and workmanship fall below standards.' }
      ]}
      processSteps={[
        { step: '01', title: 'Consultation', desc: 'Understand your unique requirements.' },
        { step: '02', title: 'Analysis', desc: 'Deep dive into specifications and quotes.' },
        { step: '03', title: 'Execution', desc: 'Connect with right partners and start work.' }
      ]}
      serviceDetails={[
        { title: 'Detailed Reports', desc: 'Get itemized breakdowns of our findings.' },
        { title: 'Expert Guidance', desc: 'Speak directly with our senior engineers.' },
        { title: 'Verified Records', desc: 'All documents are stored in your Property Passport.' }
      ]}
      proofData={{
        title: 'Real Engineering Value',
        desc: 'See exactly what we check.',
        dashboardTitle: 'Sample Verification Checks',
        items: ['Specification Analysis', 'Quantity Takeoff Validation', 'Market Rate Comparison', 'Quality Benchmarking']
      }}
      faqs={[
        { q: 'How does this work?', a: 'Simply reach out to us and our engineers will guide you.' },
        { q: 'Is there a fee?', a: 'We offer a free initial consultation.' }
      ]}
    />
  );
}
