'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Digital Records"
      heroTitle="The Property Passport"
      heroSub="A permanent digital twin for your physical asset."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"📁","title":"Lost Drawings","desc":"When a pipe bursts 5 years later, no one knows where the plumbing lines are."}]}
      processSteps={[{"step":"01","title":"Document Collection","desc":"Gathering all CAD files, BOQs, and invoices."},{"step":"02","title":"Cloud Vault","desc":"Securely storing them mapped to your property ID."},{"step":"03","title":"Transferable Asset","desc":"Transfer the passport to the new owner if you sell."}]}
      serviceDetails={[{"title":"As-Built Drawings","desc":"The final drawings of how it was actually built, not just the design."},{"title":"Warranty Vault","desc":"Never lose a bill or warranty card again."}]}
      proofData={{"title":"Passport Value","desc":"What is inside.","dashboardTitle":"Passport Contents","items":["Structural Drawings","MEP Layouts","Paint Shade Codes","Material Invoice Scans"]}}
      faqs={[{"q":"Does this increase resale value?","a":"Yes. Buyers pay a premium for a home with a fully documented history and guarantees."}]}
    />
  );
}
