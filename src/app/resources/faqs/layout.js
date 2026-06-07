import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Faqs | Buildogram",
  description: "Learn about faqs with Buildogram's resources. We are an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, and testing in Chennai.",
  path: "/resources/faqs"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
