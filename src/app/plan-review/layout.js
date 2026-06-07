import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Plan Review | Buildogram",
  description: "Comprehensive plan review services. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, and piling.",
  path: "/plan-review"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
