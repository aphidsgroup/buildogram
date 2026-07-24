'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Buildogram Build"
      heroTitle="Commercial Fit-Outs & Construction"
      heroSub="Fast-track execution for offices, retail stores, and commercial spaces."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"⏳","title":"Lost Rent/Revenue","desc":"Every day of delay costs the business money."},{"icon":"🔌","title":"Compliance Failures","desc":"Failing fire safety or electrical inspections delays opening."}]}
      processSteps={[{"step":"01","title":"Compliance Check","desc":"Ensuring plans meet local commercial building codes."},{"step":"02","title":"Fast-Track Procurement","desc":"Ordering long-lead items like HVAC and glass early."},{"step":"03","title":"Parallel Execution","desc":"Coordinating multiple teams to work simultaneously."}]}
      serviceDetails={[{"title":"MEP Heavy Management","desc":"Commercial spaces require intense electrical and HVAC coordination."},{"title":"Night Shift Coordination","desc":"Managing work in operational malls or office buildings."}]}
      proofData={{"title":"Commercial Speed","desc":"Keeping projects on track.","dashboardTitle":"Fast-Track Checks","items":["Fire Safety Approval","HVAC Commissioning","Network Cabling Sign-off"]}}
      faqs={[{"q":"Do you manage night shifts?","a":"Yes, we can coordinate with partners who execute outside business hours."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Build","path":"/build"},{"name":"Commercial","path":"/build/commercial"}]} />
    </>
  );
}
