'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Buildogram Support"
      heroTitle="Construction Warranty & Maintenance"
      heroSub="Protect your asset after handover with structured warranty management."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"👻","title":"Contractor Ghosting","desc":"Contractors disappear when cracks or leaks appear after handover."}]}
      processSteps={[{"step":"01","title":"Digital Handover","desc":"All warranty certificates logged in the Property Passport."},{"step":"02","title":"Snag Logging","desc":"Report issues directly through the app."},{"step":"03","title":"Resolution Tracking","desc":"We ensure the contractor fixes defects within the liability period."}]}
      serviceDetails={[{"title":"Defect Liability Period (DLP)","desc":"Enforcing the standard 1-year DLP."},{"title":"Waterproofing Guarantees","desc":"Tracking 5-10 year specialist warranties."}]}
      proofData={{"title":"Asset Protection","desc":"Records we maintain.","dashboardTitle":"Warranty Tracking","items":["Termite Treatment Cert","Waterproofing Cert","Lift AMC","Generator AMC"]}}
      faqs={[{"q":"How long is the standard warranty?","a":"Typically 1 year for general construction, and 5-10 years for waterproofing."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Build","path":"/build"},{"name":"Warranty","path":"/build/warranty"}]} />
    </>
  );
}
