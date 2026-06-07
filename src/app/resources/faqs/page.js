'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Knowledge Base"
      heroTitle="Frequently Asked Questions"
      heroSub="Answers to the most common queries about building in India."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[]}
      processSteps={[]}
      serviceDetails={[]}
      
      faqs={[{"q":"What is the current construction rate?","a":"It varies between ₹1800 to ₹3500+ per sqft depending on specifications."},{"q":"How long does a house take to build?","a":"A standard 2000 sqft house takes 8-12 months."}]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Resources","path":"/resources"},{"name":"Faqs","path":"/resources/faqs"}]} />
    </>
  );
}
