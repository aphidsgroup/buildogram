import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projects = await prisma.project_finance.findMany();
    const commissions = await prisma.partner_commissions.findMany({
      where: { status: 'paid' }
    });
    const materials = await prisma.material_order_finance.findMany();

    const totalServiceRevenue = projects.reduce((sum, p) => sum + Number(p.buildogram_revenue_actual || 0), 0);
    const totalCommissions = commissions.reduce((sum, c) => sum + Number(c.commission_amount || 0), 0);
    const totalMaterialMargin = materials.reduce((sum, m) => sum + Number(m.buildogram_margin || 0), 0);

    return NextResponse.json({
      success: true,
      revenue: {
        totalServiceRevenue,
        totalCommissions,
        totalMaterialMargin,
        totalRevenue: totalServiceRevenue + totalCommissions + totalMaterialMargin
      }
    });
  } catch (error) {
    console.error('Error fetching revenue metrics:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
