'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Buildogram Partners"
      heroTitle="Verified Civil Contractors"
      heroSub="Labor and material contractors for structure and brickwork."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"👷","title":"Unskilled Labor","desc":"Contractors who rely on cheap, unskilled labor leading to poor workmanship."}]}
      processSteps={[{"step":"01","title":"Skill Assessment","desc":"Verifying the quality of their shuttering and concrete finishing."},{"step":"02","title":"Capacity Check","desc":"Ensuring they have enough staging materials and labor strength."}]}
      serviceDetails={[{"title":"Item-Rate or Square-Foot","desc":"Contractors offering flexible billing modes."}]}
      proofData={{"title":"Contractor Verification","desc":"Ensuring capability.","dashboardTitle":"Vetting Checklist","items":["Shuttering Material Quality","Dedicated Supervisor on Site","Labor Camp Compliance"]}}
      faqs={[{"q":"Labor contract vs Material contract?","a":"Labor contract means you buy the materials. Material contract means the contractor buys them."}]}
    />
  );
}
