import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Why Vs Mason | Buildogram",
  description: "Comprehensive why vs mason services. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, and piling.",
  path: "/why-vs-mason"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
