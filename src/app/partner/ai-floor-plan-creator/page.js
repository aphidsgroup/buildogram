import AIFloorPlanStudio from '../../ai-floor-plan-creator/studio/page';

export const metadata = {
  title: 'AI Floor Plan Creator | Buildogram Partner OS',
};

export default function PartnerAIFloorPlan() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <AIFloorPlanStudio />
    </div>
  );
}
