'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Materials Dashboard"
      heroTitle="Sand & M-Sand Sourcing"
      heroSub="Verified suppliers for River Sand, M-Sand (Plastering & Concreting), and P-Sand."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=material_quote' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🪨","title":"High Silt Content","desc":"Adulterated sand weakens concrete and causes plastering cracks."}]}
      processSteps={[{"step":"01","title":"Requirement Mapping","desc":"M-Sand for concrete, P-Sand/River Sand for plastering."},{"step":"02","title":"Source Verification","desc":"Ensuring M-Sand is VSI processed and washed."}]}
      serviceDetails={[{"title":"Silt Testing","desc":"Guiding on basic site tests for silt and clay."},{"title":"Volume Verification","desc":"Checking truck box measurements to ensure you get the CFt you paid for."}]}
      proofData={{"title":"Sand Checks","desc":"Preventing weak concrete.","dashboardTitle":"Aggregate Verification","items":["VSI Processing Confirmation","Silt Content < 5%","Cubic Feet Measurement Check"]}}
      faqs={[{"q":"Is M-Sand safe to use?","a":"Yes, properly washed VSI M-Sand is structurally excellent for concreting."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Materials","path":"/materials"},{"name":"Sand","path":"/materials/sand"}]} />
    </>
  );
}
