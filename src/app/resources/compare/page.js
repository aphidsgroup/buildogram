'use client';
import PublicServicePage from '@/components/ui/PublicServicePage';

export default function Page() {
  return (
    <PublicServicePage
      heroEyebrow="Knowledge Base"
      heroTitle="Material Comparisons"
      heroSub="Head-to-head comparisons of building materials."
      heroPrimaryCta={{ label: 'Talk to an Engineer', href: '/contact?type=construction' }}
      heroSecondaryCta={{ label: 'Explore Platform', href: '/' }}
      problems={[{"icon":"⚖️","title":"Decision Paralysis","desc":"Red Bricks vs AAC Blocks? Vitrified vs Marble?"}]}
      processSteps={[]}
      serviceDetails={[]}
      
      faqs={[]}
    />
  );
}
