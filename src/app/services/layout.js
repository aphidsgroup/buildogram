import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: 'Construction Services in Chennai | Buildogram',
  description: 'Engineer-led construction services in Chennai. We offer BOQ reviews, project management, and connections to builders, architects, and contractors.',
  path: '/services',
});

export default function Layout({ children }) {
  return <>{children}</>;
}
