import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Tiles | Buildogram",
  description: "Source verified tiles materials directly through Buildogram, the AI-driven, engineer-led construction and property ecosystem. Ensure quality and transparent pricing.",
  path: "/materials/tiles"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
