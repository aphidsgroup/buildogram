import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Contact Buildogram | Engineer-Led Construction Support",
  description: "Contact Buildogram for home construction guidance, BOQ reviews, material sourcing, and property management in Chennai.",
  path: "/contact"
});



export default function Layout({ children }) {
  return <>{children}</>;
}
