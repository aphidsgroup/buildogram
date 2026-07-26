import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Steel | Buildogram",
  description: "Explore steel material options and request current specifications, documentation and quotations through Buildogram.",
  path: "/materials/steel"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
