import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Chennai | Buildogram",
  description: "Expert chennai in Chennai. Trust Buildogram, an AI-driven, engineer-led construction and property ecosystem for structural audit, survey, testing, piling, and Property Passport solutions.",
  path: "/resources/chennai"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
