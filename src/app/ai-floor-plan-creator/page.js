'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Construction Intelligence"
      heroTitle="AI Floor Plan Creator"
      heroSub="Generate conceptual layouts based on your plot dimensions instantly."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"⏳","title":"Slow Iterations","desc":"Waiting weeks for an architect just to see basic block layouts."}]}
      processSteps={[{"step":"01","title":"Input Dimensions","desc":"Enter your plot size, facing, and room requirements."},{"step":"02","title":"AI Generation","desc":"Get multiple spatial configurations in seconds."},{"step":"03","title":"Professional Handoff","desc":"Take the concept to a real architect for structural detailing."}]}
      serviceDetails={[{"title":"Vastu Presets","desc":"Generate layouts that adhere to basic Vastu principles."},{"title":"Setback Calculations","desc":"Automatically leaving space for CMDA rules."}]}
      proofData={{"title":"AI Capabilities","desc":"What the engine does.","dashboardTitle":"Generation Parameters","items":["FSI Optimization","Sunlight Routing","Circulation Efficiency"]}}
      faqs={[{"q":"Can I use this plan to build?","a":"No. AI generates a concept. A licensed structural engineer and architect MUST detail it for safety."}]}
    />
  );
}
