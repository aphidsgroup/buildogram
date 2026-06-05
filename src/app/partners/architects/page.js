'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Buildogram Partners"
      heroTitle="Verified Architects"
      heroSub="Council of Architecture (COA) registered professionals."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"📐","title":"Draftsmen posing as Architects","desc":"Unqualified individuals designing unsafe or non-compliant structures."}]}
      processSteps={[{"step":"01","title":"COA Verification","desc":"Checking their official registration."},{"step":"02","title":"Portfolio Review","desc":"Matching their design style with your vision."}]}
      serviceDetails={[{"title":"Concept to Execution","desc":"Floor plans, 3D elevations, and working drawings."}]}
      proofData={{"title":"Design Verification","desc":"Ensuring competence.","dashboardTitle":"Vetting Checklist","items":["COA License Validity","Working Drawing Detail Level","CMDA/DTCP Compliance Knowledge"]}}
      faqs={[{"q":"Do architects handle structural design?","a":"Usually, they partner with a Structural Engineer for the steel/concrete design."}]}
    />
  );
}
