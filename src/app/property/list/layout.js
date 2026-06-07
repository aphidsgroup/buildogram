import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "List | Buildogram",
  description: "Comprehensive list services. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, and piling.",
  path: "/property/list"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
