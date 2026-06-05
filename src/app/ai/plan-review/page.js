'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Construction Intelligence"
      heroTitle="AI Plan Review Assistant"
      heroSub="Automated checks for Vastu, ventilation, and spatial errors."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🚪","title":"Missed Errors","desc":"Human error missing a door that clashes with a wardrobe."}]}
      processSteps={[{"step":"01","title":"Upload Floor Plan","desc":"Upload a clean PDF of your floor plan."},{"step":"02","title":"Computer Vision Scan","desc":"AI detects walls, doors, and windows."},{"step":"03","title":"Rule-Based Audit","desc":"Checking against standard architectural thumb rules."}]}
      serviceDetails={[{"title":"Door Swing Analysis","desc":"Highlighting clashes."},{"title":"Ventilation Ratio","desc":"Calculating Window-to-Floor-Area ratio."}]}
      proofData={{"title":"Automated Audits","desc":"What the AI catches.","dashboardTitle":"Detection Capabilities","items":["Bed Clearance","Kitchen Triangle Efficiency","Toilet Ducting Logic"]}}
      faqs={[{"q":"Does this replace human review?","a":"No. AI is a fast first-pass filter. Our engineers do the final comprehensive review."}]}
    />
  );
}
