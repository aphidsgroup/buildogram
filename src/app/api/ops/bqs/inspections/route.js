import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const inspections = await prisma.bqs_inspections.findMany({
      include: {
        passport: true,
        _count: {
          select: { results: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json({ success: true, inspections });
  } catch (error) {
    console.error("Error fetching inspections:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch inspections" }, { status: 500 });
  }
}

export async function POST(req) {
  await requirePermission('manage_bqs');
  try {
    const body = await req.json();
    const { passport_id, project_name, project_area, project_type, stage, template_id, assigned_engineer } = body;

    // Create the inspection
    const inspection = await prisma.bqs_inspections.create({
      data: {
        passport_id: passport_id || null,
        project_name,
        project_area,
        project_type: project_type || 'residential',
        stage,
        assigned_engineer: assigned_engineer || null,
        status: "scheduled"
      }
    });

    // If a template was selected, seed the inspection results with the template items
    if (template_id) {
      const items = await prisma.bqs_checklist_items.findMany({
        where: { template_id }
      });

      if (items.length > 0) {
        const resultsData = items.map(item => ({
          inspection_id: inspection.id,
          checklist_item_id: item.id,
          status: "not_applicable", // default state
          severity: item.severity,
          rework_required: false,
          rework_status: "none"
        }));

        await prisma.bqs_inspection_results.createMany({
          data: resultsData
        });
      }
    }

    return NextResponse.json({ success: true, inspection });
  } catch (error) {
    console.error("Error creating inspection:", error);
    return NextResponse.json({ success: false, error: "Failed to create inspection" }, { status: 500 });
  }
}
