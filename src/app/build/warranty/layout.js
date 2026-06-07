import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Warranty | Buildogram",
  description: "Professional warranty services via Buildogram, the AI-driven, engineer-led construction and property ecosystem. We handle BOQ review, structural audit, survey, testing, and piling.",
  path: "/build/warranty"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
