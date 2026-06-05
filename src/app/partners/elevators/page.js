'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Buildogram Partners"
      heroTitle="Elevator & Lift Providers"
      heroSub="Home lifts, passenger lifts, and commercial elevators."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"🛗","title":"Safety Gear Failures","desc":"Cheap unbranded lifts lacking Automatic Rescue Devices (ARD)."}]}
      processSteps={[{"step":"01","title":"Shaft Dimensioning","desc":"Ensuring the architect left enough space for the required lift car."},{"step":"02","title":"Safety Audit","desc":"Ensuring ARD and overspeed governors are standard."}]}
      serviceDetails={[{"title":"Machine Room Less (MRL)","desc":"Modern lifts that do not require a separate room on the roof."}]}
      proofData={{"title":"Elevator Checks","desc":"Life safety first.","dashboardTitle":"Vetting Checklist","items":["ARD Integration Check","Pit Depth & Headroom Validation","AMC Contract Terms"]}}
      faqs={[{"q":"What is ARD?","a":"Automatic Rescue Device. It brings the lift to the nearest floor during a power cut."}]}
    />
  );
}
