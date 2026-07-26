import { generateSEOMetadata } from '@/lib/seo/metadata';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowItWorksClient from './HowItWorksClient';

export const metadata = generateSEOMetadata({
  title: 'How Buildogram Works | 9-Stage Construction Process',
  description: 'Learn how Buildogram coordinates engineer-led home construction stages, milestone payments, project checks and documentation in Chennai.',
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
