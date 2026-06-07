import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Construction Material Sourcing in Chennai | Buildogram",
  description: "Transparent construction material sourcing in Chennai. Get competitive quotes for cement, steel, sand, electrical, and plumbing directly from verified suppliers.",
  path: "/materials"
});



export default function Layout({ children }) {
  return <>{children}</>;
}
