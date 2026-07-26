import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Bricks | Buildogram",
  description: "Explore brick material options and request current specifications and quotations through Buildogram.",
  path: "/materials/bricks"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
