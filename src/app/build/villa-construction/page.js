'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Buildogram Build"
      heroTitle="Premium Villa Construction"
      heroSub="End-to-end luxury villa construction management with strict quality controls."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"💰","title":"Premium Overpricing","desc":"Contractors overcharge simply because it is a \"luxury\" project."},{"icon":"🎨","title":"Design Deviations","desc":"The finished villa looks nothing like the 3D renders."},{"icon":"🔧","title":"Complex MEP Failures","desc":"Poorly planned plumbing and HVAC leads to leaks and cooling issues."}]}
      processSteps={[{"step":"01","title":"Architectural & MEP Sync","desc":"Ensuring structural, plumbing, and electrical drawings align perfectly."},{"step":"02","title":"Premium Material Sourcing","desc":"Direct sourcing of Italian marble, premium fixtures, and automation."},{"step":"03","title":"Precision Execution","desc":"Dedicated site engineers monitoring high-end finish quality."}]}
      serviceDetails={[{"title":"3D to Reality Check","desc":"We ensure dimensions and materials match the exact design intent."},{"title":"Vendor Coordination","desc":"Managing specialized vendors for pools, home theaters, and automation."},{"title":"Snagging & Handover","desc":"A 200-point inspection before you move in."}]}
      proofData={{"title":"Luxury Standard Checks","desc":"What we verify in premium builds.","dashboardTitle":"Villa Quality Checklist","items":["Waterproofing Warranty Check","HVAC Duct Alignment","Tile/Marble Leveling Tolerance","Smart Home Integration Test"]}}
      faqs={[{"q":"What makes villa construction different?","a":"Higher specifications, complex MEP, and tighter tolerances for finishes."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Build","path":"/build"},{"name":"Villa Construction","path":"/build/villa-construction"}]} />
    </>
  );
}
