import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function PATCH(req, { params }) {
  await requirePermission('manage_partners');
  try {
    const { id } = await params;
    const body = await req.json();
    
    const updateData = {};
    if (body.status !== undefined) updateData.status = body.status;
    if (body.internal_notes !== undefined) updateData.internal_notes = body.internal_notes;
    
    const updated = await prisma.partner_applications.update({
      where: { id },
      data: updateData
    });
    
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 });
  }
}
