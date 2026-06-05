import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const activeReel = await prisma.reels.findFirst({
      where: { active: true },
      orderBy: { updated_at: 'desc' }
    });

    if (!activeReel) {
      return NextResponse.json({ success: true, data: null });
    }

    return NextResponse.json({ success: true, data: activeReel });
  } catch (error) {
    console.error('Error fetching active reel:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch reel' }, { status: 500 });
  }
}
