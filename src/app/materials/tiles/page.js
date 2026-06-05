'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Materials Dashboard"
      heroTitle="Tiles & Flooring Quotes"
      heroSub="Vitrified tiles, ceramic, granite, and marble sourcing."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"📏","title":"Batch Variations","desc":"Mixing different manufacturing batches leads to color mismatches on your floor."}]}
      processSteps={[{"step":"01","title":"Quantity Calculation","desc":"Adding correct wastage percentages (5-10%)."},{"step":"02","title":"Batch Matching","desc":"Ensuring all boxes have the same batch number and date."}]}
      serviceDetails={[{"title":"Premium Brand Access","desc":"Kajaria, Somany, Qutone, etc."},{"title":"Granite/Marble Sourcing","desc":"Direct from factory yards."}]}
      proofData={{"title":"Flooring Checks","desc":"Ensuring a perfect finish.","dashboardTitle":"Tile Verification","items":["Batch Number Uniformity","Warpage / Bowing Checks","Thickness Consistency"]}}
      faqs={[{"q":"How much wastage should I order?","a":"Typically 5% for straight laying, and 10-15% for diagonal laying or large formats."}]}
    />
  );
}
