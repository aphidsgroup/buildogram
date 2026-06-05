'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Knowledge Base"
      heroTitle="Construction Glossary"
      heroSub="Understand the jargon your contractor uses."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🗣️","title":"Jargon Confusion","desc":"Not knowing what \"PCC\", \"Lintel\", or \"Chajja\" means."}]}
      processSteps={[]}
      serviceDetails={[]}
      
      faqs={[]}
    />
  );
}
