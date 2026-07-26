import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Tiles | Buildogram",
  description: "Explore tile material options and request current specifications and quotations through Buildogram.",
  path: "/materials/tiles"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
