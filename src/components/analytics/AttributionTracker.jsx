'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { captureAttribution } from '@/lib/analytics/attribution';

function AttributionTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Run attribution capture every time the URL changes
    captureAttribution();
  }, [pathname, searchParams]);

  return null; // This component renders nothing
}

export default function AttributionTracker() {
  return (
    <Suspense fallback={null}>
      <AttributionTrackerInner />
    </Suspense>
  );
}
