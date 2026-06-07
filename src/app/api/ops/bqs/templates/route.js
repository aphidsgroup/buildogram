import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const templates = await prisma.bqs_templates.findMany({
      include: {
        _count: {
          select: { items: true }
        }
      },
      orderBy: { created_at: 'asc' }
    });

    return NextResponse.json({ success: true, templates });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch templates" }, { status: 500 });
  }
}
