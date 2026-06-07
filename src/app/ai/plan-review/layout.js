import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Plan Review | Buildogram",
  description: "Access our AI-driven plan review tools. Buildogram combines technology with engineer-led construction support for BOQ review, planning, and Property Passport management.",
  path: "/ai/plan-review"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
