import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromRequest } from '@/lib/auth';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer', 'admin'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const reels = await prisma.reels.findMany({
      orderBy: { created_at: 'desc' }
    });
    return NextResponse.json({ success: true, data: reels });
  } catch (error) {
    console.error('[ops reels GET]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer', 'admin'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, video_url, provider, active, autoplay, start_muted, cta_label, cta_url } = body;

    // If making active, deactivate others
    if (active) {
      await prisma.reels.updateMany({
        where: { active: true },
        data: { active: false }
      });
    }

    const reel = await prisma.reels.create({
      data: {
        title,
        video_url,
        provider,
        active: active || false,
        autoplay: autoplay ?? true,
        start_muted: start_muted ?? false,
        cta_label,
        cta_url
      }
    });

    return NextResponse.json({ success: true, data: reel });
  } catch (error) {
    console.error('[ops reels POST]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
