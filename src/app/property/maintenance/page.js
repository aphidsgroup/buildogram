'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Property Management"
      heroTitle="Property Maintenance & AMC"
      heroSub="Annual Maintenance Contracts for your building systems."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🔧","title":"Reactive Repairs","desc":"Waiting for things to break before fixing them, causing major damage."}]}
      processSteps={[{"step":"01","title":"Asset Audit","desc":"Logging your ACs, lifts, pumps, and RO systems."},{"step":"02","title":"Preventative Schedule","desc":"Setting up automated reminders for servicing."}]}
      serviceDetails={[{"title":"Plumbing & Electrical Health Checks","desc":"Annual thermal scanning of DB boards and pressure testing."}]}
      proofData={{"title":"Maintenance Regimen","desc":"Keeping it running.","dashboardTitle":"AMC Checklist","items":["Lift Servicing","Sump/Tank Cleaning","AC Gas/Filter Check","Pest Control"]}}
      faqs={[{"q":"Do you provide the technicians?","a":"We coordinate with verified local AMC partners to execute the work."}]}
    />
  );
}
