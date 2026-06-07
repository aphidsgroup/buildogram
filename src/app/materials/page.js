'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Buildogram Materials"
      heroTitle="Construction Material Support"
      heroSub="Transparent pricing and verified sourcing for all major construction materials."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=material_quote' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🛒","title":"Retail Markup","desc":"Owners pay retail prices while contractors get wholesale discounts."},{"icon":"📉","title":"Fake Brands","desc":"Counterfeit cement and underweight steel flooding the market."}]}
      processSteps={[{"step":"01","title":"BOQ Extraction","desc":"We calculate exact quantities from your drawings."},{"step":"02","title":"Live Quotes","desc":"We pull live rates from our verified supplier network."},{"step":"03","title":"Direct Delivery","desc":"Materials delivered to your site with authentic weighbridge and batch slips."}]}
      serviceDetails={[{"title":"Quantity Takeoffs","desc":"Knowing exactly how many bags or tonnes you actually need."},{"title":"Quality Assurance","desc":"We check Manufacturer Test Certificates (MTC)."}]}
      proofData={{"title":"Material Tracking","desc":"What we verify upon delivery.","dashboardTitle":"Delivery Checks","items":["Weighbridge Slip Verification","Batch Date / Freshness Check","Brand Authenticity Marks"]}}
      faqs={[{"q":"Do you sell materials directly?","a":"No, we route your request to verified wholesale suppliers to get you the best direct rate."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Materials","path":"/materials"}]} />
    </>
  );
}
