import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Steel | Buildogram",
  description: "Source verified steel materials directly through Buildogram, the AI-driven, engineer-led construction and property ecosystem. Ensure quality and transparent pricing.",
  path: "/materials/steel"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
