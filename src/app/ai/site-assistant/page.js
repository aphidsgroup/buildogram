'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Construction Intelligence"
      heroTitle="AI Site Assistant"
      heroSub="Chat with our AI trained on Indian construction standards."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"❓","title":"Unanswered Questions","desc":"Not knowing if 14 days of curing is enough for a roof slab."}]}
      processSteps={[{"step":"01","title":"Ask a Question","desc":"e.g., \"What is the mix ratio for M25 concrete?\""},{"step":"02","title":"Instant Answer","desc":"Get answers based on IS Codes (Indian Standard Codes)."}]}
      serviceDetails={[{"title":"IS Code Reference","desc":"Answers backed by official civil engineering standards."}]}
      proofData={{"title":"Knowledge Base","desc":"What it knows.","dashboardTitle":"Training Data","items":["IS 456 (Concrete)","National Building Code","CPWD Specifications"]}}
      faqs={[{"q":"Can it resolve contractor disputes?","a":"It provides standard engineering facts, which can help clarify arguments on site."}]}
    />
  );
}
