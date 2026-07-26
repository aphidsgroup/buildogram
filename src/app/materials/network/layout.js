import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Network | Buildogram",
  description: "Explore construction material options and request current specifications and quotations through Buildogram.",
  path: "/materials/network"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
