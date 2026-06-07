import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Why Vs Aggregators | Buildogram",
  description: "Comprehensive why vs aggregators services. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, and piling.",
  path: "/why-vs-aggregators"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
