'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Local Guidance"
      heroTitle="Construction in Chennai"
      heroSub="Navigating CMDA approvals, local soil conditions, and Chennai material rates."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"☀️","title":"Weather Extremes","desc":"High humidity and intense heat require specific curing and painting techniques."},{"icon":"🌊","title":"Waterlogging","desc":"Poor plinth height planning leads to flooding during monsoons."}]}
      processSteps={[{"step":"01","title":"CMDA/DTCP Check","desc":"Navigating local approval processes."},{"step":"02","title":"Soil Testing","desc":"Assessing clay/sandy soil common in OMR/ECR."},{"step":"03","title":"Weather-Proof Execution","desc":"Using correct waterproofing and anti-corrosive steel."}]}
      serviceDetails={[{"title":"Local Material Sourcing","desc":"Direct from Sriperumbudur and surrounding hubs."},{"title":"Monsoon Readiness","desc":"Planning plinth heights for Chennai rains."}]}
      proofData={{"title":"Chennai Specifics","desc":"Local checks we perform.","dashboardTitle":"Chennai Risk Checklist","items":["Coastal Corrosion Protection (ECR/OMR)","Plinth Height vs Road Level","CMDA Setback Verification"]}}
      faqs={[{"q":"Do you help with CMDA approvals?","a":"We connect you with licensed surveyors and architects who handle the paperwork."}]}
    />
  );
}
