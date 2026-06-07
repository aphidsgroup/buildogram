import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generatePassportNumber } from "@/lib/property-passport/passportNumber";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    const whereClause = search
      ? {
          OR: [
            { passport_number: { contains: search, mode: "insensitive" } },
            { property_name: { contains: search, mode: "insensitive" } },
            { owner_name: { contains: search, mode: "insensitive" } },
            { owner_phone: { contains: search } },
          ],
        }
      : {};

    const passports = await prisma.property_passports.findMany({
      where: whereClause,
      orderBy: { created_at: "desc" },
      include: {
        _count: {
          select: { records: true, checklists: true }
        }
      }
    });

    return NextResponse.json({ success: true, passports });
  } catch (error) {
    console.error("Error fetching passports:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch passports" }, { status: 500 });
  }
}

export async function POST(req) {
  await requirePermission('manage_passports');
  try {
    const body = await req.json();
    const {
      property_name,
      owner_name,
      owner_phone,
      owner_email,
      property_area,
      property_type,
      project_type,
      linked_lead_id,
      linked_partner_id,
    } = body;

    const passport_number = await generatePassportNumber(property_area);

    const passport = await prisma.property_passports.create({
      data: {
        passport_number,
        property_name,
        owner_name,
        owner_phone,
        owner_email,
        property_area,
        property_type,
        project_type,
        linked_lead_id,
        linked_partner_id,
        status: "draft",
      },
    });

    return NextResponse.json({ success: true, passport });
  } catch (error) {
    console.error("Error creating passport:", error);
    return NextResponse.json({ success: false, error: "Failed to create passport" }, { status: 500 });
  }
}
