import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Request | Buildogram",
  description: "Comprehensive request services. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, and piling.",
  path: "/maintenance/request"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
