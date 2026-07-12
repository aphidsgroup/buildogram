// GET    /api/boq-calculator/projects/[id]   → get project + all sections + rates
// PATCH  /api/boq-calculator/projects/[id]   → update project header
// DELETE /api/boq-calculator/projects/[id]   → delete project
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

const OPS_ROLES = ['ops_admin', 'ops_pm', 'ops_engineer'];

function requireOps(req) {
  const user = getUserFromRequest(req);
  if (!user || !OPS_ROLES.includes(user.role)) return null;
  return user;
}

export async function GET(req, { params }) {
  const user = requireOps(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const project = await prisma.boq_project.findUnique({
      where: { id },
      include: {
        sections: true,
        rates: { orderBy: { sno: 'asc' } },
        _count: { select: { exports: true } },
      },
    });
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ project });
  } catch (err) {
    console.error('[BOQ] get project error:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const user = requireOps(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const { title, client_name, client_phone, client_email, plot_address, floor_config, total_builtup, margin_pct, status, notes } = body;

    const project = await prisma.boq_project.update({
      where: { id },
      data: {
        ...(title          !== undefined && { title }),
        ...(client_name    !== undefined && { client_name }),
        ...(client_phone   !== undefined && { client_phone }),
        ...(client_email   !== undefined && { client_email }),
        ...(plot_address   !== undefined && { plot_address }),
        ...(floor_config   !== undefined && { floor_config }),
        ...(total_builtup  !== undefined && { total_builtup: parseFloat(total_builtup) || 0 }),
        ...(margin_pct     !== undefined && { margin_pct: parseFloat(margin_pct) || 12 }),
        ...(status         !== undefined && { status }),
        ...(notes          !== undefined && { notes }),
        updated_at: new Date(),
      },
    });
    return NextResponse.json({ project });
  } catch (err) {
    console.error('[BOQ] update project error:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const user = requireOps(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.boq_project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[BOQ] delete project error:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
