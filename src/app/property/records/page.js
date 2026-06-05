'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Digital Records"
      heroTitle="360 Property Records"
      heroSub="Visual 360-degree logs of your concealed pipelines before plastering."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🔨","title":"Blind Drilling","desc":"Accidentally drilling into a concealed water pipe or electrical conduit."}]}
      processSteps={[{"step":"01","title":"Pre-Plaster Scanning","desc":"Taking 360 photos of every room before the walls are plastered."},{"step":"02","title":"Digital Mapping","desc":"Creating a virtual walkthrough of your home's \"skeleton\"."}]}
      serviceDetails={[{"title":"X-Ray Vision","desc":"See exactly where pipes run behind your finished walls."}]}
      proofData={{"title":"Record Value","desc":"Never guess again.","dashboardTitle":"360 Log Benefits","items":["Safe Wall Drilling","Leak Tracing","Renovation Planning"]}}
      faqs={[{"q":"When is the best time to do this?","a":"Right after plumbing and electrical chasing is done, but before plastering begins."}]}
    />
  );
}
