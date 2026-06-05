import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: 'Warranty | Buildogram',
  description: 'Engineer-led home construction companion in Chennai. Plan, build, source materials, verify site progress, and manage your Property.',
  path: '/build/warranty',
});

export default function Layout({ children }) {
  return <>{children}</>;
}
