'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Materials Dashboard"
      heroTitle="Electrical & Plumbing Sourcing"
      heroSub="FRLS Wires, CPVC/UPVC Pipes, and Switchgear."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=material_quote' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🔥","title":"Fire Hazards","desc":"Using counterfeit wires with low copper conductivity."}]}
      processSteps={[{"step":"01","title":"Brand Standardization","desc":"Locking Finolex, Polycab, Ashirvad, Supreme, etc."},{"step":"02","title":"Wholesale Routing","desc":"Bypassing retail hardware store markups."}]}
      serviceDetails={[{"title":"FRLS Wire Checks","desc":"Ensuring Flame Retardant Low Smoke wires."},{"title":"Pressure Pipe Verification","desc":"Ensuring correct schedule (SCH 40/80) for plumbing."}]}
      proofData={{"title":"MEP Checks","desc":"Safety and longevity.","dashboardTitle":"MEP Verification","items":["ISI Mark Authentication","FRLS Certification","Pipe Wall Thickness Check"]}}
      faqs={[{"q":"Why CPVC over UPVC?","a":"CPVC is designed to handle hot water, whereas UPVC is only for cold water."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Materials","path":"/materials"},{"name":"Electrical Plumbing","path":"/materials/electrical-plumbing"}]} />
    </>
  );
}
