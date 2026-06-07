import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "How It Works | Buildogram",
  description: "Comprehensive how it works services. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, and piling.",
  path: "/how-it-works"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
