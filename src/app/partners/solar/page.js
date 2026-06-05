'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Buildogram Partners"
      heroTitle="Solar Installers"
      heroSub="Rooftop solar integrators for residential and commercial grids."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"☀️","title":"Poor Mountings","desc":"Panels flying off during cyclones due to weak structural mounting."}]}
      processSteps={[{"step":"01","title":"Load Calculation","desc":"Sizing the kW requirement based on your EB bills."},{"step":"02","title":"Net Metering","desc":"Handling TANGEDCO/EB paperwork for grid feeding."}]}
      serviceDetails={[{"title":"On-Grid & Off-Grid","desc":"System design and installation."},{"title":"Structural Safety","desc":"Ensuring the roof can take the wind load."}]}
      proofData={{"title":"Solar Checks","desc":"Safety and efficiency.","dashboardTitle":"Vetting Checklist","items":["Wind Load Structural Check","Panel Tier-1 Verification","Inverter Efficiency Audit"]}}
      faqs={[{"q":"Do you help with subsidies?","a":"Yes, our partners assist with the PM Surya Ghar subsidy process."}]}
    />
  );
}
