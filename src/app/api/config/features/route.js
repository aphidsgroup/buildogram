import { NextResponse } from 'next/server';
import { getFeatureConfig } from '@/lib/config/features';

export const dynamic = 'force-dynamic';

export async function GET() {
  const features = getFeatureConfig();
  return NextResponse.json({
    analytics: features.analytics.available,
    providerAi: features.providerAi.available,
    onlinePayments: features.onlinePayments.available,
    whatsappAutomation: features.whatsappAutomation.available,
    cloudinaryUploads: features.cloudinaryUploads.available,
    emailDelivery: features.emailDelivery.available,
    whatsappClickToChat: true,
  });
}
