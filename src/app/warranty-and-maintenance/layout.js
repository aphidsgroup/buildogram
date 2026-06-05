import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: 'Warranty And Maintenance | Buildogram',
  description: 'Engineer-led home construction companion in Chennai. Plan, build, source materials, verify site progress, and manage your Property.',
  path: '/warranty-and-maintenance',
});

export default function Layout({ children }) {
  return <>{children}</>;
}
