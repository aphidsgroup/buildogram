import { NextResponse } from 'next/server';
import { prisma as db } from '@/lib/storageProvider';
import { requireAuth } from '@/lib/apiAuth';

export async function GET(req) {
  try {
    const { user, error } = requireAuth(req);
    if (error) return error;

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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { user, error } = requireAuth(req);
    if (error) return error;
    
    const body = await req.json();
    const requirements = body.roomRequirements || {};
    const enabledSpecialSpaces = Object.entries(requirements)
      .filter(([, value]) => value && typeof value === 'object' && value.enabled)
      .map(([key]) => key);

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
        family_size: body.familySize != null ? String(body.familySize) : null,
        parking: requirements.parking?.enabled ? String(requirements.parking.count || 1) : body.parking || null,
        special_spaces: body.specialSpaces || enabledSpecialSpaces,
        style: body.style,
        status: 'draft',
        metadata: {
          locationPreset: body.locationPreset || null,
          roadWidthFt: body.roadWidthFt || null,
          cornerPlot: Boolean(body.cornerPlot),
          setbackPreference: body.setbackPreference || 'standard',
          rentalUnit: Boolean(body.rentalUnit),
          elderlyFriendly: Boolean(body.elderlyFriendly),
          roomSizePreference: body.roomSizePreference || 'standard',
          layerPreference: body.layerPreference || 'cad_and_blocks',
          roomRequirements: requirements,
        },
      }
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error('Error creating AI project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
