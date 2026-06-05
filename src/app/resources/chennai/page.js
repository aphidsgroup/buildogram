'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Local Knowledge"
      heroTitle="Chennai Locality Guides"
      heroSub="Soil conditions, water tables, and approval nuances by area."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"📍","title":"Generic Advice","desc":"What works in Anna Nagar might not work in the sandy soils of ECR."}]}
      processSteps={[]}
      serviceDetails={[]}
      
      faqs={[]}
    />
  );
}
