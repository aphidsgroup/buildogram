'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Buildogram Review"
      heroTitle="Contractor Quote Comparison"
      heroSub="Apples-to-apples comparison of multiple contractor bids."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🍎","title":"Apples to Oranges","desc":"Contractor A includes painting, Contractor B excludes it. How do you compare?"}]}
      processSteps={[{"step":"01","title":"Data Normalization","desc":"We map all quotes to a standard Buildogram BOQ template."},{"step":"02","title":"Scope Gap Analysis","desc":"Highlighting what each contractor conveniently left out."},{"step":"03","title":"Rate Benchmarking","desc":"Comparing their unit rates to live market data."}]}
      serviceDetails={[{"title":"Hidden Exclusion Catching","desc":"Finding the \"Client Scope\" items buried in fine print."}]}
      proofData={{"title":"Quote Clarity","desc":"How we visualize bids.","dashboardTitle":"Comparison Metrics","items":["Total Cost per SqFt","Material Grade Variance","Exclusion List Alignment"]}}
      faqs={[{"q":"Can you review 3 quotes at once?","a":"Yes, our comparative dashboard makes reviewing multiple quotes easy."}]}
    />
  );
}
