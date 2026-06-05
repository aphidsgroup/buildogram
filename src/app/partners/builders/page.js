'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Buildogram Partners"
      heroTitle="Verified Builders & Promoters"
      heroSub="Turnkey construction companies vetted for financial stability and quality."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🏃","title":"Absconding Builders","desc":"Builders who take the advance and abandon the project."}]}
      processSteps={[{"step":"01","title":"Background Check","desc":"Checking financial health and previous project delivery."},{"step":"02","title":"Site Visits","desc":"We inspect their currently running sites for quality."}]}
      serviceDetails={[{"title":"Turnkey Execution","desc":"From design to handover."}]}
      proofData={{"title":"Builder Verification","desc":"How we vet them.","dashboardTitle":"Vetting Checklist","items":["Past Project Quality Audit","Client Reference Calls","Legal & Financial Checks"]}}
      faqs={[{"q":"What is a turnkey builder?","a":"A builder who handles everything: architecture, approvals, structure, and finishes."}]}
    />
  );
}
