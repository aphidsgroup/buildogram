import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

const FALLBACK_REEL = {
  id: 'buildogram-fallback-reel',
  title: 'Buildogram Reel',
  video_url: 'https://vimeo.com/1197711688',
  provider: 'vimeo',
  active: true,
  autoplay: true,
  start_muted: true,
  cta_label: 'Talk to an Engineer',
  cta_url: '/contact?type=construction'
};

function shouldServeFallback(error) {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes('PrismaClientInitializationError') ||
    message.includes("Can't reach database server") ||
    message.includes('Invalid `prisma.reels.findFirst()` invocation');
}

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const activeReel = await prisma.reels.findFirst({
      where: { active: true },
      orderBy: { updated_at: 'desc' }
    });

    if (!activeReel) {
      return NextResponse.json({ success: true, data: FALLBACK_REEL });
    }

    return NextResponse.json({ success: true, data: activeReel });
  } catch (error) {
    console.error('Error fetching active reel:', error);

    if (shouldServeFallback(error)) {
      return NextResponse.json({
        success: true,
        data: FALLBACK_REEL,
        fallback: true
      });
    }

    return NextResponse.json({ success: false, error: 'Failed to fetch reel' }, { status: 500 });
  }
}
