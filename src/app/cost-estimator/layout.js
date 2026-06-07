import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: "Cost Estimator | Buildogram",
  description: "Comprehensive cost estimator services. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, and piling.",
  path: "/cost-estimator"
});




export default function Layout({ children }) {
  return <>{children}</>;
}
