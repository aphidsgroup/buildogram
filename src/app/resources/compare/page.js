'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Knowledge Base"
      heroTitle="Material Comparisons"
      heroSub="Head-to-head comparisons of building materials."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"⚖️","title":"Decision Paralysis","desc":"Red Bricks vs AAC Blocks? Vitrified vs Marble?"}]}
      processSteps={[]}
      serviceDetails={[]}
      
      faqs={[]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Resources","path":"/resources"},{"name":"Compare","path":"/resources/compare"}]} />
    </>
  );
}
