import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Property Passport | Buildogram",
  description: "Comprehensive property passport services. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, and piling.",
  path: "/property-passport"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
