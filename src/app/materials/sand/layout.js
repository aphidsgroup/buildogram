import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Sand | Buildogram",
  description: "Source verified sand materials directly through Buildogram, the AI-driven, engineer-led construction and property ecosystem. Ensure quality and transparent pricing.",
  path: "/materials/sand"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
