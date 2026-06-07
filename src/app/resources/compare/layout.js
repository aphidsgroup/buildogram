import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Compare | Buildogram",
  description: "Compare compare to make informed decisions. Buildogram provides an AI-driven, engineer-led construction and property ecosystem for BOQ review and structural audit.",
  path: "/resources/compare"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
