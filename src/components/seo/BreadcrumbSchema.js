import React from 'react';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';

export default function BreadcrumbSchema({ items }) {
  if (!items || items.length === 0) return null;
  const schema = generateBreadcrumbSchema(items);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
