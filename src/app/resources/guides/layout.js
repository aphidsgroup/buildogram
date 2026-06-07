import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Guides | Buildogram",
  description: "Learn about guides with Buildogram's resources. We are an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, and testing in Chennai.",
  path: "/resources/guides"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
