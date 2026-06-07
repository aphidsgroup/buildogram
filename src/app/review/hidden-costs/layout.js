import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Hidden Costs | Buildogram",
  description: "Independent hidden costs for transparent pricing and quality assurance. Avoid hidden costs with Buildogram's structural audit and engineer-led construction ecosystem.",
  path: "/review/hidden-costs"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
