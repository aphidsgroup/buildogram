import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Network | Buildogram",
  description: "Source verified network materials directly through Buildogram, the AI-driven, engineer-led construction and property ecosystem. Ensure quality and transparent pricing.",
  path: "/materials/network"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
