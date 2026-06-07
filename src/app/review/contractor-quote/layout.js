import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Contractor Quote | Buildogram",
  description: "Independent contractor quote for transparent pricing and quality assurance. Avoid hidden costs with Buildogram's structural audit and engineer-led construction ecosystem.",
  path: "/review/contractor-quote"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
