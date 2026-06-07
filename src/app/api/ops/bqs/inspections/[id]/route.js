import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const inspection = await prisma.bqs_inspections.findUnique({
      where: { id },
      include: {
        passport: true,
        engineer: {
          select: { name: true, email: true }
        },
        results: {
          include: {
            checklist_item: true,
            reworks: true
          },
          orderBy: {
            checklist_item: {
              item_text: 'asc'
            }
          }
        }
      }
    });

    if (!inspection) {
      return NextResponse.json({ success: false, error: "Inspection not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, inspection });
  } catch (error) {
    console.error("Error fetching inspection:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch inspection" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  await requirePermission('manage_bqs');
  try {
    const { id } = await params;
    const updates = await req.json();

    const inspection = await prisma.bqs_inspections.update({
      where: { id },
      data: updates
    });

    return NextResponse.json({ success: true, inspection });
  } catch (error) {
    console.error("Error updating inspection:", error);
    return NextResponse.json({ success: false, error: "Failed to update inspection" }, { status: 500 });
  }
}
