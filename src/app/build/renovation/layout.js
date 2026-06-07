import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Renovation | Buildogram",
  description: "Professional renovation services via Buildogram, the AI-driven, engineer-led construction and property ecosystem. We handle BOQ review, structural audit, survey, testing, and piling.",
  path: "/build/renovation"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
