import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Home Construction | Buildogram",
  description: "Professional home construction services via Buildogram, the AI-driven, engineer-led construction and property ecosystem. We handle BOQ review, structural audit, survey, testing, and piling.",
  path: "/build/home-construction"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
