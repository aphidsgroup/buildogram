import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req, { params }) {
  await requirePermission('manage_passports');
  try {
    const { id } = await params;
    const body = await req.json();

    const checklist = await prisma.property_passport_checklists.create({
      data: {
        ...body,
        passport_id: id,
      },
    });

    return NextResponse.json({ success: true, checklist });
  } catch (error) {
    console.error("Error creating checklist item:", error);
    return NextResponse.json({ success: false, error: "Failed to create checklist item" }, { status: 500 });
  }
}
