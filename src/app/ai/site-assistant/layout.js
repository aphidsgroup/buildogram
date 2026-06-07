import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Site Assistant | Buildogram",
  description: "Access our AI-driven site assistant tools. Buildogram combines technology with engineer-led construction support for BOQ review, planning, and Property Passport management.",
  path: "/ai/site-assistant"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
