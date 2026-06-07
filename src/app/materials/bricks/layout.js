import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Bricks | Buildogram",
  description: "Source verified bricks materials directly through Buildogram, the AI-driven, engineer-led construction and property ecosystem. Ensure quality and transparent pricing.",
  path: "/materials/bricks"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
