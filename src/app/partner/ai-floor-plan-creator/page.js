import { generateSEOMetadata } from '@/lib/seo/metadata';
import AIFloorPlanStudio from '../../ai-floor-plan-creator/studio/page';

export const metadata = generateSEOMetadata({
title: 'AI Floor Plan Creator | Buildogram Partner OS',,
  path: '/partner/ai-floor-plan-creator',
});

export default function PartnerAIFloorPlan() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <AIFloorPlanStudio />
    </div>
  );
}
