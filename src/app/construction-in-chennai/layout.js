import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Construction In Chennai | Buildogram",
  description: "Expert construction in chennai in Chennai. Trust Buildogram, an AI-driven, engineer-led construction and property ecosystem for structural audit, survey, testing, piling, and Property Passport solutions.",
  path: "/construction-in-chennai"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
