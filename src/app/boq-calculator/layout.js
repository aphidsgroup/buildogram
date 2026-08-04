import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: 'Free BOQ Calculator for House Construction Chennai | Buildogram',
  description: 'Create an indicative Bill of Quantities for your house construction project using your own dimensions, quantities and editable rate assumptions. 44 line items, per-floor breakdown and margin sensitivity. Free, no login required.',
  path: '/boq-calculator',
});

export default function BOQLayout({ children }) {
  return children;
}
