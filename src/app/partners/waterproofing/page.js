'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Buildogram Partners"
      heroTitle="Waterproofing Specialists"
      heroSub="Expert applicators for terrace, bathroom, and sump waterproofing."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"💧","title":"Leaking Roofs","desc":"Using cheap tar instead of proper elastomeric membranes."}]}
      processSteps={[{"step":"01","title":"Methodology Review","desc":"Ensuring they use multi-coat chemical systems (Dr. Fixit, Fosroc, etc.)."},{"step":"02","title":"Warranty Enforcement","desc":"Ensuring they provide legal stamped warranties."}]}
      serviceDetails={[{"title":"Terrace Waterproofing","desc":"Polyurethane or crystalline treatments."},{"title":"Ponding Tests","desc":"Testing the bathroom/terrace by filling it with water for 48 hours."}]}
      proofData={{"title":"Waterproofing Checks","desc":"Zero leaks.","dashboardTitle":"Vetting Checklist","items":["Application Methodology Audit","Ponding Test Sign-offs","Warranty Certificate Issuance"]}}
      faqs={[{"q":"When should waterproofing be done?","a":"During construction, specifically before plastering and tiling of wet areas."}]}
    />
  );
}
