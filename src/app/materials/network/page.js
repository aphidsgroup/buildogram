'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Materials Dashboard"
      heroTitle="Buildogram Supplier Network"
      heroSub="Join or browse the material supplier directory and request current quotations."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=material_quote' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🏢","title":"Fragmented Market","desc":"Finding reliable suppliers for 50 different materials is exhausting."}]}
      processSteps={[{"step":"01","title":"Supplier Onboarding Checks","desc":"We request GST registration, dealership documentation and past-supply references before listing a supplier."},{"step":"02","title":"Centralized Ordering","desc":"Route RFQs to multiple suppliers instantly."}]}
      serviceDetails={[{"title":"Trade Discounts","desc":"Leveraging aggregate volume for better rates."}]}
      proofData={{"title":"Network Quality","desc":"Who makes the cut.","dashboardTitle":"Supplier Onboarding Checks","items":["Dealership documentation requested","GST registration on record","Past-supply references"]}}
      faqs={[{"q":"Can I become a supplier?","a":"Yes, please use the partner registration page to apply."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Materials","path":"/materials"},{"name":"Network","path":"/materials/network"}]} />
    </>
  );
}
