import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(req) {
  try {
    const apps = await prisma.partner_applications.findMany({
      orderBy: { created_at: 'desc' }
    });
    return NextResponse.json({ success: true, data: apps });
  } catch (error) {
    console.error('Error fetching partner applications:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: 500 });
  }
}
