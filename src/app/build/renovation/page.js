'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Buildogram Build"
      heroTitle="Home Renovation & Remodeling"
      heroSub="Structured execution for major renovations, structural changes, and interior upgrades."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🏚️","title":"Structural Damage Risk","desc":"Breaking walls without understanding load-bearing paths."},{"icon":"💸","title":"Budget Spirals","desc":"Renovations often cost 50% more than planned due to \"unforeseen\" issues."},{"icon":"🕒","title":"Living in a Dustbowl","desc":"Contractors taking months longer than promised."}]}
      processSteps={[{"step":"01","title":"Structural Assessment","desc":"We evaluate the existing building health before any demolition."},{"step":"02","title":"Scope Freezing","desc":"Locking down the exact scope to prevent budget overruns."},{"step":"03","title":"Rapid Execution","desc":"Tightly scheduled work to minimize disruption to your life."}]}
      serviceDetails={[{"title":"Demolition Safety","desc":"Supervised breaking and debris removal."},{"title":"Retrofitting","desc":"Strengthening old structures if needed."},{"title":"Modernization","desc":"Upgrading plumbing and electrical to modern standards."}]}
      proofData={{"title":"Renovation Safety","desc":"How we protect your existing home.","dashboardTitle":"Pre-Renovation Checklist","items":["Load Bearing Wall ID","Plumbing Route Tracing","Electrical Load Calculation","Debris Disposal Plan"]}}
      faqs={[{"q":"Can you add a floor to my old house?","a":"Only after our structural engineers conduct a thorough foundation assessment."}]}
    />
  );
}
