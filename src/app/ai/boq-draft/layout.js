import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Boq Draft | Buildogram",
  description: "Access our AI-driven boq draft tools. Buildogram combines technology with engineer-led construction support for BOQ review, planning, and Property Passport management.",
  path: "/ai/boq-draft"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
