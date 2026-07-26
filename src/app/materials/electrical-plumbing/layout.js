import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Electrical Plumbing | Buildogram",
  description: "Explore electrical and plumbing material options and request current specifications and quotations through Buildogram.",
  path: "/materials/electrical-plumbing"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
