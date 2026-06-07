'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Property Market"
      heroTitle="List Your Property"
      heroSub="List your verified Buildogram property for sale or rent."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"📉","title":"Low Valuations","desc":"Buyers lowball because they cannot verify the build quality."}]}
      processSteps={[{"step":"01","title":"Quality Tagging","desc":"We attach your Property Passport to the listing."},{"step":"02","title":"Premium Placement","desc":"Highlighting the engineering rigor that went into your home."}]}
      serviceDetails={[{"title":"Verified Seller Tag","desc":"Proving to buyers that the home is structurally sound."}]}
      proofData={{"title":"Listing Power","desc":"Standing out.","dashboardTitle":"Buyer Trust Signals","items":["Buildogram Verified Tag","Access to BOQ summary","Maintenance History"]}}
      faqs={[{"q":"Can I list a non-Buildogram property?","a":"Yes, but it will not receive the \"Engineer Verified\" badge unless we audit it."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Property","path":"/property"},{"name":"List","path":"/property/list"}]} />
    </>
  );
}
