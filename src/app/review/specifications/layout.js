import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Specifications | Buildogram",
  description: "Independent specifications for transparent pricing and quality assurance. Avoid hidden costs with Buildogram's structural audit and engineer-led construction ecosystem.",
  path: "/review/specifications"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
