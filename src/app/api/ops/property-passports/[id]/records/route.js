import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req, { params }) {
  await requirePermission('manage_passports');
  try {
    const { id } = await params;
    const body = await req.json();

    const record = await prisma.property_passport_records.create({
      data: {
        ...body,
        passport_id: id,
      },
    });

    return NextResponse.json({ success: true, record });
  } catch (error) {
    console.error("Error creating record:", error);
    return NextResponse.json({ success: false, error: "Failed to create record" }, { status: 500 });
  }
}
