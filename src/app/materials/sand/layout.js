import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Sand | Buildogram",
  description: "Explore sand material options and request current grading information and quotations through Buildogram.",
  path: "/materials/sand"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
