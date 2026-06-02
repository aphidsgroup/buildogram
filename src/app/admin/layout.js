'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// /admin/* is an alias layer over /ops/* for external documentation/bookmark compatibility.
// Pages either redirect to /ops or render standalone admin UI using the same API layer.
export default function AdminLayout({ children }) {
  return <>{children}</>;
}
