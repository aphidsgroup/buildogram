import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromRequest } from '@/lib/auth';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export const dynamic = 'force-dynamic';

export async function PATCH(req, { params }) {
  await requirePermission('manage_content');
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer', 'admin'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { active, ...rest } = body;

    // If making this active, deactivate others
    if (active) {
      await prisma.reels.updateMany({
        where: { active: true },
        data: { active: false }
      });
    }

    const reel = await prisma.reels.update({
      where: { id },
      data: {
        active,
        ...rest
      }
    });

    return NextResponse.json({ success: true, data: reel });
  } catch (error) {
    console.error('[ops reels PATCH]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await requirePermission('manage_content');
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer', 'admin'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  try {
    await prisma.reels.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[ops reels DELETE]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
