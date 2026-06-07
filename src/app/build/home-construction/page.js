'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Buildogram Build"
      heroTitle="Home Construction Guidance"
      heroSub="Engineer-led support from planning to execution for your dream home."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"⚠️","title":"Unrealistic Budgets","desc":"Contractors quote low to win the job, then add hidden costs during execution."},{"icon":"📉","title":"Substandard Materials","desc":"Use of lower-grade steel or cement without the owner realizing."},{"icon":"📅","title":"Endless Delays","desc":"No structured timeline or penalty clauses for late delivery."}]}
      processSteps={[{"step":"01","title":"Plot & Requirement Analysis","desc":"We map out your plot size, FSI, and lifestyle needs."},{"step":"02","title":"Partner Selection","desc":"We help you shortlist verified builders based on actual past projects."},{"step":"03","title":"Execution & Tracking","desc":"Site OS tracks every milestone, material delivery, and quality check."}]}
      serviceDetails={[{"title":"Contract Drafting","desc":"We ensure your contract protects you against delays and scope creep."},{"title":"Stage-wise Inspections","desc":"Our engineers verify rebar, concrete mix, and curing."},{"title":"Payment Certification","desc":"We certify bills only after verifying the work is complete."}]}
      proofData={{"title":"Verifiable Construction","desc":"How we track progress.","dashboardTitle":"Site OS Milestones","items":["Foundation Sign-off","Plinth Beam Concrete","Roof Slab Reinforcement","Brickwork Curing"]}}
      faqs={[{"q":"Do you build the house?","a":"We act as your Project Management Consultant (PMC) to manage the builder."},{"q":"Can I choose my own contractor?","a":"Yes, but we will audit their quote and past work first."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Build","path":"/build"},{"name":"Home Construction","path":"/build/home-construction"}]} />
    </>
  );
}
