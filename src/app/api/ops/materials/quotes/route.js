import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const requests = await prisma.material_quote_requests.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        supplier_quote_responses: {
          include: {
            partners: {
              select: { company_name: true }
            }
          }
        }
      }
    });

    const suppliers = await prisma.partners.findMany({
      where: { partner_type: { in: ['material_supplier', 'supplier'] }, active: true },
      select: { id: true, company_name: true, service_areas: true }
    });

    return NextResponse.json({ success: true, data: requests, suppliers });
  } catch (error) {
    console.error('Error fetching material quotes:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: 500 });
  }
}
