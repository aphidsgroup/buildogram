// GET  /api/boq-calculator/projects          → list all projects
// POST /api/boq-calculator/projects          → create new project
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

const OPS_ROLES = ['ops_admin', 'ops_pm', 'ops_engineer'];

export async function GET(req) {
  const user = getUserFromRequest(req);
  if (!user || !OPS_ROLES.includes(user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const projects = await prisma.boq_project.findMany({
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        title: true,
        client_name: true,
        client_phone: true,
        floor_config: true,
        total_builtup: true,
        margin_pct: true,
        status: true,
        created_at: true,
        updated_at: true,
        _count: { select: { exports: true } },
      },
    });
    return NextResponse.json({ projects });
  } catch (err) {
    console.error('[BOQ] list projects error:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}

export async function POST(req) {
  const user = getUserFromRequest(req);
  if (!user || !OPS_ROLES.includes(user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, client_name, client_phone, client_email, plot_address, floor_config, margin_pct } = body;

    if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 });

    const project = await prisma.boq_project.create({
      data: {
        title: title.trim(),
        client_name: client_name || null,
        client_phone: client_phone || null,
        client_email: client_email || null,
        plot_address: plot_address || null,
        floor_config: floor_config || 'G',
        margin_pct: parseFloat(margin_pct) || 12,
        created_by: user.id || null,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    console.error('[BOQ] create project error:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
