import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: 'Site Assistant | Buildogram',
  description: 'Engineer-led home construction companion in Chennai. Plan, build, source materials, verify site progress, and manage your Property.',
  path: '/ai/site-assistant',
});

export default function Layout({ children }) {
  return <>{children}</>;
}
