import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Electrical Plumbing | Buildogram",
  description: "Source verified electrical plumbing materials directly through Buildogram, the AI-driven, engineer-led construction and property ecosystem. Ensure quality and transparent pricing.",
  path: "/materials/electrical-plumbing"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
