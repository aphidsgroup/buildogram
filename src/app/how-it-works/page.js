import { generateSEOMetadata } from '@/lib/seo/metadata';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowItWorksClient from './HowItWorksClient';

export const metadata = generateSEOMetadata({
  title: 'How Buildogram Works | 9-Stage Construction Process',
  description: 'Learn how Buildogram delivers engineer-led home construction in Chennai through 9 verified stages, milestone payments, and 500+ quality checks.',
  path: '/how-it-works',
});

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksClient />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'How It Works', path: '/how-it-works' },
        ]}
      />
    </>
  );
}
