import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: 'Property Discovery & 360° Tours in Chennai | Buildogram',
  description: 'Discover plots, villas, and commercial spaces in Chennai with immersive 360° virtual tours. Connected with RealPropRealty for premium property buying and selling.',
  path: '/properties',
});

export default function Layout({ children }) {
  return <>{children}</>;
}
