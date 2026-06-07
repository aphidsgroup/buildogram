import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Commercial | Buildogram",
  description: "Professional commercial services via Buildogram, the AI-driven, engineer-led construction and property ecosystem. We handle BOQ review, structural audit, survey, testing, and piling.",
  path: "/build/commercial"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
