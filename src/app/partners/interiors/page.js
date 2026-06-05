'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Buildogram Partners"
      heroTitle="Interior Designers & Execution"
      heroSub="Specialists in modular kitchens, wardrobes, and premium finishes."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🪵","title":"Cheap Plywood","desc":"Using commercial MDF or particle board instead of BWP Marine plywood in wet areas."}]}
      processSteps={[{"step":"01","title":"Material Specification","desc":"Locking down plywood grades, laminates, and hardware brands (Hettich/Blum)."},{"step":"02","title":"Factory vs Carpentry","desc":"Matching you with factory-finish modular partners or skilled manual carpenters."}]}
      serviceDetails={[{"title":"3D Rendering","desc":"Photorealistic views of your interiors."},{"title":"Modular Execution","desc":"Precision cut boards assembled on site."}]}
      proofData={{"title":"Interior Checks","desc":"Ensuring longevity.","dashboardTitle":"Vetting Checklist","items":["Plywood Boiling Water Proof (BWP) Check","Hardware Brand Verification","Edge Banding Quality"]}}
      faqs={[{"q":"Factory finish vs Carpentry?","a":"Factory finish is faster and has cleaner edges. Carpentry allows for more custom, intricate designs."}]}
    />
  );
}
