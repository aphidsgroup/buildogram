'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Buildogram Partners"
      heroTitle="Material Suppliers"
      heroSub="Verified dealers for all construction aggregates, steel, and cement."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🚚","title":"Delivery Scams","desc":"Suppliers promising next day delivery and taking weeks."}]}
      processSteps={[{"step":"01","title":"Logistics Check","desc":"Verifying their fleet capacity."},{"step":"02","title":"Credit & Reliability","desc":"Checking market reputation."}]}
      serviceDetails={[{"title":"Bulk Orders","desc":"Wholesale supply direct to site."}]}
      proofData={{"title":"Supplier Vetting","desc":"Ensuring reliability.","dashboardTitle":"Vetting Checklist","items":["Authorized Dealership Certificates","Weighbridge Calibration Records","Fleet Size Assessment"]}}
      faqs={[{"q":"How do you verify suppliers?","a":"We check their official dealership certificates with the parent brands."}]}
    />
  );
}
