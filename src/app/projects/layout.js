import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Projects | Buildogram",
  description: "Comprehensive projects services. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, and piling.",
  path: "/projects"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
