'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Materials Dashboard"
      heroTitle="Buildogram Supplier Network"
      heroSub="Join or browse our network of verified wholesale material suppliers."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🏢","title":"Fragmented Market","desc":"Finding reliable suppliers for 50 different materials is exhausting."}]}
      processSteps={[{"step":"01","title":"Vendor Vetting","desc":"We verify GST, dealership certificates, and track record."},{"step":"02","title":"Centralized Ordering","desc":"Route RFQs to multiple suppliers instantly."}]}
      serviceDetails={[{"title":"Trade Discounts","desc":"Leveraging aggregate volume for better rates."}]}
      proofData={{"title":"Network Quality","desc":"Who makes the cut.","dashboardTitle":"Supplier Vetting","items":["Authorized Dealer Verification","Financial Stability Check","Delivery Reliability Score"]}}
      faqs={[{"q":"Can I become a supplier?","a":"Yes, please use the partner registration page to apply."}]}
    />
  );
}
