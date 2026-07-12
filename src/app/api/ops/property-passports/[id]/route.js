import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const passport = await prisma.property_passports.findUnique({
      where: { id },
      include: {
        records: {
          orderBy: { record_date: "desc" },
          include: {
            uploader: {
              select: { name: true }
            }
          }
        },
        checklists: {
          orderBy: { created_at: "asc" }
        },
        leads: true,
        partners: true,
      },
    });

    if (!passport) {
      return NextResponse.json({ success: false, error: "Passport not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, passport });
  } catch (error) {
    console.error("Error fetching passport:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch passport" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  await requirePermission('manage_passports');
  try {
    const { id } = await params;
    const body = await req.json();

    const passport = await prisma.property_passports.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, passport });
  } catch (error) {
    console.error("Error updating passport:", error);
    return NextResponse.json({ success: false, error: "Failed to update passport" }, { status: 500 });
  }
}
