'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Materials Dashboard"
      heroTitle="TMT Steel Rate Support"
      heroSub="Live quotes for Primary and Secondary TMT steel (Fe500D, Fe550D)."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=material_quote' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"⚖️","title":"Underweight Bundles","desc":"Paying for 1 tonne but receiving 950kg due to rolling margins or theft."}]}
      processSteps={[{"step":"01","title":"Bar Bending Schedule (BBS)","desc":"Calculating exact rod sizes needed."},{"step":"02","title":"Primary vs Secondary","desc":"Advising on Tata/JSW vs local rolling mills."}]}
      serviceDetails={[{"title":"Weighbridge Audits","desc":"Ensuring delivered weight matches billed weight."},{"title":"MTC Verification","desc":"Checking the Manufacturer Test Certificate for yield strength."}]}
      proofData={{"title":"Steel Checks","desc":"Protecting your investment.","dashboardTitle":"TMT Verification","items":["Section Weight Tolerance Check","Fe500D Ductility Verification","Brand Embossing Check"]}}
      faqs={[{"q":"What is the difference between Primary and Secondary steel?","a":"Primary (Tata, JSW) is made from iron ore with strict quality control. Secondary is melted scrap, which can be inconsistent."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Materials","path":"/materials"},{"name":"Steel","path":"/materials/steel"}]} />
    </>
  );
}
