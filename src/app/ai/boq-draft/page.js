'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Construction Intelligence"
      heroTitle="AI BOQ Draft Assistant"
      heroSub="Convert your floor plan area into a baseline Bill of Quantities."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=ai' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"📝","title":"Blank Page Syndrome","desc":"Not knowing what items should even be in a construction contract."}]}
      processSteps={[{"step":"01","title":"Input Built-Up Area","desc":"Provide basic project parameters."},{"step":"02","title":"Generate Template","desc":"AI creates a standard 15-category BOQ structure."}]}
      serviceDetails={[{"title":"Baseline Metric Generation","desc":"Estimating rough bags of cement and tonnes of steel based on thumb rules."}]}
      proofData={{"title":"Drafting Speed","desc":"Getting started fast.","dashboardTitle":"BOQ Categories Generated","items":["Earthwork","RCC Structure","Masonry","Finishes","MEP"]}}
      faqs={[{"q":"Are the quantities accurate?","a":"They are thumb-rule estimates. An engineer must perform an exact quantity takeoff from final drawings."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Ai","path":"/ai"},{"name":"Boq Draft","path":"/ai/boq-draft"}]} />
    </>
  );
}
