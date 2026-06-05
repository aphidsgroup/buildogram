'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Materials Dashboard"
      heroTitle="Bricks & Blocks Quotes"
      heroSub="Compare Red Bricks, Fly Ash Bricks, AAC Blocks, and Solid Concrete Blocks."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🧱","title":"Breakage Wastage","desc":"Poorly baked bricks resulting in 15% wastage during transit."}]}
      processSteps={[{"step":"01","title":"Wall Type Analysis","desc":"Choosing AAC for load reduction vs Red Bricks for thermal mass."},{"step":"02","title":"Sample Testing","desc":"Checking compressive strength and water absorption."}]}
      serviceDetails={[{"title":"AAC Block Sourcing","desc":"Direct from major manufacturers."},{"title":"Chamber Brick Verification","desc":"Ensuring well-burnt, uniform red bricks."}]}
      proofData={{"title":"Masonry Checks","desc":"Ensuring strong walls.","dashboardTitle":"Block Verification","items":["Water Absorption Test","Compressive Strength Cert","Dimensional Tolerance Check"]}}
      faqs={[{"q":"Why are builders pushing AAC blocks?","a":"They are faster to lay, use less mortar, and reduce dead load on the structure."}]}
    />
  );
}
