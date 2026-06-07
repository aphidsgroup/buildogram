import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "List Your Property | Buildogram",
  description: "Professional list your property services via Buildogram, the AI-driven, engineer-led construction and property ecosystem. We handle BOQ review, structural audit, survey, testing, and piling.",
  path: "/properties/list-your-property"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
