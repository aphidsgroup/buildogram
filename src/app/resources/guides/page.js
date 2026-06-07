'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return ( <>
    <PublicServicePage
      heroEyebrow="Knowledge Base"
      heroTitle="Construction Guides"
      heroSub="In-depth articles and checklists for first-time home builders."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"📚","title":"Information Overload","desc":"Too much conflicting advice on YouTube and forums."}]}
      processSteps={[{"step":"01","title":"Select Topic","desc":"Choose from Planning, Approvals, Execution, or Finishes."},{"step":"02","title":"Read Engineer-Verified Content","desc":"No fluff, just technical facts."}]}
      serviceDetails={[{"title":"Downloadable Checklists","desc":"PDFs you can take to the site."}]}
      
      faqs={[]}
    />
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Resources","path":"/resources"},{"name":"Guides","path":"/resources/guides"}]} />
    </>
  );
}
