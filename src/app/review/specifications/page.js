'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Buildogram Review"
      heroTitle="Material Specification Audit"
      heroSub="Stop contractors from using vague terms like &quot;Basic Quality&quot; or &quot;Standard Brand&quot;."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🌫️","title":"Vague Terms","desc":"\"Vitrified Tiles\" could mean ₹40/sqft or ₹150/sqft. Vague terms cost you money."}]}
      processSteps={[{"step":"01","title":"Identify Ambiguities","desc":"Scanning the contract for undefined brands or grades."},{"step":"02","title":"Lock Down Grades","desc":"Defining exact IS codes, brands, and price limits (e.g., \"Kajaria 2x4 ₹60/sqft\")."}]}
      serviceDetails={[{"title":"Brand Matrix Creation","desc":"A clear table of approved brands for every single item."}]}
      proofData={{"title":"Spec Locking","desc":"Examples of fixed specs.","dashboardTitle":"Vague vs Fixed","items":["\"Standard Wires\" → \"Finolex FRLS\""," \"Teak Wood\" → \"1st Quality Burma Teak\""]}}
      faqs={[{"q":"Why do specifications matter?","a":"If a brand is not specified, the contractor is legally allowed to use the cheapest available option."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Review","path":"/review"},{"name":"Specifications","path":"/review/specifications"}]} />
    </>
  );
}
