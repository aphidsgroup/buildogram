import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export const metadata = {
  title: 'Property Passport OS | Digital Twin for Real Estate',
  description: 'The Property Passport is a permanent digital twin for your physical asset. Store architectural drawings, warranties, structural audits, and maintenance records securely.',
  keywords: 'property passport, real estate digital twin, construction records, property handover, home warranties, structural audit records, house plans vault, Chennai',
  openGraph: {
    title: 'Property Passport OS | Digital Twin for Real Estate',
    description: 'The permanent digital twin for your physical asset. Secure, transferable, and invaluable.',
    url: 'https://buildogram.in/property-passport',
    siteName: 'Buildogram',
    images: [
      {
        url: 'https://buildogram.in/og/property-passport.png',
        width: 1200,
        height: 630,
        alt: 'Property Passport Interface',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function Page() {
  return ( 
    <>
      <PublicServicePage
        heroEyebrow="Digital Property Records"
        heroTitle="The Property Passport"
        heroSub="A permanent digital twin for your physical asset. Securely store warranties, drawings, proofs, and structural audits in one transferrable vault."
        heroPrimaryCta={{ label: 'Generate Passport', href: '/contact?type=passport' }}
        heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
        problems={[
          {
            icon: "📁",
            title: "Lost Drawings",
            desc: "When a pipe bursts 5 years later, no one knows where the concealed plumbing lines are."
          },
          {
            icon: "🧾",
            title: "Missing Warranties",
            desc: "You can't claim a warranty on expensive fixtures because the ink on the bill faded or got lost."
          },
          {
            icon: "🏚️",
            title: "Undocumented Modifications",
            desc: "Future structural changes become dangerous because the original structural foundation plans are missing."
          }
        ]}
        processSteps={[
          {
            step: "01",
            title: "Asset Digitization",
            desc: "We scan, upload, and categorize all architectural, structural, and MEP drawings into the cloud vault."
          },
          {
            step: "02",
            title: "Material & Warranty Sync",
            desc: "All material purchase invoices, test certificates, and warranty cards are permanently linked."
          },
          {
            step: "03",
            title: "Continuous Auditing",
            desc: "Add periodic structural audit reports, soil testing data, and maintenance logs to build a history."
          },
          {
            step: "04",
            title: "Transferable Ownership",
            desc: "Selling the property? Securely transfer the entire digital Property Passport to the new owner."
          }
        ]}
        serviceDetails={[
          {
            title: "As-Built Drawings Archive",
            desc: "The final drawings of how it was actually built on-site, including any deviations from the original design."
          },
          {
            title: "Warranty & Invoice Vault",
            desc: "Never lose a bill. Access digital copies of paint, steel, cement, and appliance warranties anytime."
          },
          {
            title: "Checklists & Handover",
            desc: "Every construction stage checklist is tracked and verified before final handover."
          }
        ]}
        proofData={{
          title: "Inside The Passport",
          desc: "Everything you need to maintain and value your asset.",
          dashboardTitle: "Passport Contents",
          items: [
            "Structural Blueprints & CAD Files",
            "Concealed MEP Layouts",
            "Piling & Soil Test Reports",
            "Paint Shade Codes & Brands",
            "Material Invoices & Warranties",
            "Stage-wise Quality Checklists",
            "Structural Audit Certificates",
            "Handover Documentation"
          ]
        }}
        faqs={[
          {
            q: "Does a Property Passport increase resale value?",
            a: "Yes. Buyers pay a premium for a home with a fully documented history, structural guarantees, and readily available blueprints."
          },
          {
            q: "How secure is my data?",
            a: "Your property passport is accessible via a secure, unguessable cryptographic token. You control who sees the records."
          },
          {
            q: "Can I use this for an existing building?",
            a: "Absolutely. We can conduct a structural audit, digitize any existing physical plans, and create a retroactive Property Passport."
          }
        ]}
      />
      <BreadcrumbSchema items={[
        {name: "Home", path: "/"},
        {name: "Property Passport", path: "/property-passport"}
      ]} />
    </>
  );
}
