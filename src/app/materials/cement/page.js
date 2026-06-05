'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Materials Dashboard"
      heroTitle="Cement Rate & Quality Support"
      heroSub="Live market rates for OPC 53, OPC 43, and PPC cement grades."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🕰️","title":"Stale Cement","desc":"Cement loses 20% strength if it is over 3 months old."}]}
      processSteps={[{"step":"01","title":"Grade Selection","desc":"Selecting OPC for slabs, PPC for plastering."},{"step":"02","title":"Supplier Matching","desc":"Finding fresh stock from nearby verified dealers."}]}
      serviceDetails={[{"title":"Brand Comparisons","desc":"Ultratech, Ramco, Dalmia, Chettinad, etc."},{"title":"Freshness Guarantee","desc":"We mandate batch date verification on delivery."}]}
      proofData={{"title":"Cement Checks","desc":"Ensuring structural integrity.","dashboardTitle":"Quality Protocol","items":["Week of Manufacturing Check","Grade Verification (OPC/PPC)","Moisture/Lump Check on Delivery"]}}
      faqs={[{"q":"Which cement is best for roof slabs?","a":"Generally, OPC 53 grade is preferred for structural elements requiring quick setting."}]}
    />
  );
}
