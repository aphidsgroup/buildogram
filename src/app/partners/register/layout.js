import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: 'Register for the Construction Partner Directory | Buildogram',
  description: 'Join the Buildogram partner network. We connect reliable builders, contractors, architects, and material suppliers with serious property owners in Chennai.',
  path: '/partners/register',
});

export default function Layout({ children }) {
  return <>{children}</>;
}
