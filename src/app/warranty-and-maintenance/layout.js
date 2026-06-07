import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Warranty And Maintenance | Buildogram",
  description: "Comprehensive warranty and maintenance services. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, and piling.",
  path: "/warranty-and-maintenance"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
