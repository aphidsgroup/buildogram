'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Buildogram Review"
      heroTitle="Architectural Plan Review"
      heroSub="Structural safety, spatial flow, Vastu, and ventilation analysis."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🚪","title":"Dead Spaces","desc":"Poorly placed doors and corridors waste expensive square footage."},{"icon":"🌬️","title":"Poor Cross-Ventilation","desc":"Rooms that trap heat and require constant AC."},{"icon":"📏","title":"Furniture Mismatch","desc":"Bedrooms where a standard wardrobe and bed don’t actually fit."}]}
      processSteps={[{"step":"01","title":"Upload Drawings","desc":"Share your floor plans (PDF or CAD)."},{"step":"02","title":"Engineering Analysis","desc":"We check dimensions, FSI, and structural grid logic."},{"step":"03","title":"Optimization Report","desc":"We provide marked-up plans with suggested improvements."}]}
      serviceDetails={[{"title":"Spatial Flow Audit","desc":"Checking furniture layouts and clearances."},{"title":"Natural Light & Air","desc":"Window placement analysis."},{"title":"Basic Vastu","desc":"Checking key placements like Kitchen and Pooja."}]}
      proofData={{"title":"Plan Diagnostics","desc":"What we catch before you build.","dashboardTitle":"Common Plan Errors Found","items":["Missing Structural Columns","Inadequate Toilet Ducting","Staircase Headroom Violations","Door Swing Clashes"]}}
      faqs={[{"q":"Do you redesign the plan?","a":"We provide markups and suggestions. You take these back to your architect to implement."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Plan Review","path":"/plan-review"}]} />
    </>
  );
}
