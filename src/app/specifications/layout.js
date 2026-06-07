import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Specifications | Buildogram",
  description: "Comprehensive specifications services. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, and piling.",
  path: "/specifications"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
