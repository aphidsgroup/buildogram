import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: 'Warranty Documentation, Home Loan Support & Maintenance Plans | Buildogram',
  description: 'Partner structural warranty documentation, bank loan liaison coordination, and premium Annual Maintenance Contracts (AMC) for Chennai homeowners — all coordinated by Buildogram after project handover.',
  path: '/warranty-and-maintenance',
});




export default function Layout({ children }) {
  return <>{children}</>;
}
