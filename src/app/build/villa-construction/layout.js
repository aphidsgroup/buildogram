import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Villa Construction | Buildogram",
  description: "Professional villa construction services via Buildogram, the AI-driven, engineer-led construction and property ecosystem. We handle BOQ review, structural audit, survey, testing, and piling.",
  path: "/build/villa-construction"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
