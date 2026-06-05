'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Buildogram Review"
      heroTitle="Hidden Cost Analysis"
      heroSub="Identify the top 20 items contractors intentionally omit to lower their initial bid."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🕳️","title":"The Low Bid Trap","desc":"The cheapest quote is often the most expensive once the \"extras\" are billed."}]}
      processSteps={[{"step":"01","title":"Site Condition Review","desc":"Checking if soil carting, rock breaking, or deep foundation costs are missing."},{"step":"02","title":"Statutory Cost Check","desc":"Checking if EB/Water connection deposits are included."}]}
      serviceDetails={[{"title":"Red Flag Report","desc":"A list of items that will definitely result in extra bills later."}]}
      proofData={{"title":"Cost Traps Avoided","desc":"Common omissions.","dashboardTitle":"Frequent Exclusions","items":["Soil Excavation Carting","Compound Wall & Gate","Elevation Works","Sump/Septic Tank"]}}
      faqs={[{"q":"How much do hidden costs usually add up to?","a":"Typically 15-25% of the total project value if not caught early."}]}
    />
  );
}
