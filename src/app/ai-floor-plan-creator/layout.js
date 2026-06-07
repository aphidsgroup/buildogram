import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Ai Floor Plan Creator | Buildogram",
  description: "Access our AI-driven ai floor plan creator tools. Buildogram combines technology with engineer-led construction support for BOQ review, planning, and Property Passport management.",
  path: "/ai-floor-plan-creator"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
