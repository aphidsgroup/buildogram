import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
  await requirePermission('ops_admin');
  try {
    const { id } = params;
    const body = await req.json();
    const { lead_status } = body;

    const submission = await prisma.ai_tool_submissions.update({
      where: { id },
      data: { lead_status, updated_at: new Date() }
    });

    return NextResponse.json({ success: true, data: submission });
  } catch (error) {
    console.error('Error updating AI tool submission status:', error);
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
