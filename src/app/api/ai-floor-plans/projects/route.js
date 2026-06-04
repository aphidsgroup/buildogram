import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';

export async function GET(req) {
  try {
    const { user, error } = requireAuth(req);
    if (error) return error;
    const user = user;

    const projects = await db.ai_floor_plan_projects.findMany({
      where: {
        OR: [
          { owner_user_id: user.id },
          user.partner_id ? { partner_id: user.partner_id } : undefined
        ].filter(Boolean)
      },
      orderBy: { created_at: 'desc' },
      include: {
        versions: {
          select: { id: true, version_name: true }
        }
      }
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching AI projects:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { user, error } = requireAuth(req);
    if (error) return error;
    const user = user;
    
    const body = await req.json();

    const newProject = await db.ai_floor_plan_projects.create({
      data: {
        title: body.title || 'Untitled AI Project',
        owner_user_id: user.id,
        partner_id: user.partner_id || null,
        plot_width: parseFloat(body.plotWidth) || 30,
        plot_depth: parseFloat(body.plotDepth) || 40,
        unit: body.unit || 'feet',
        facing: body.facing,
        building_type: body.buildingType,
        floors: parseInt(body.floors) || 1,
        vastu_preference: body.vastuPreference,
        budget_range: body.budgetRange,
        family_size: body.familySize,
        parking: body.parking,
        special_spaces: body.specialSpaces || [],
        style: body.style,
        status: 'draft',
      }
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error('Error creating AI project:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
