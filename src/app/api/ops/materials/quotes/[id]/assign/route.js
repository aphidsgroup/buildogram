import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req, { params }) {
  await requirePermission('manage_projects');
  try {
    const { id } = await params;
    const { supplier_partner_id, material_category } = await req.json();

    const existing = await prisma.supplier_quote_responses.findFirst({
      where: { quote_request_id: id, supplier_partner_id }
    });

    if (existing) {
      return NextResponse.json({ success: false, error: 'Supplier already assigned' }, { status: 400 });
    }

    const response = await prisma.supplier_quote_responses.create({
      data: {
        quote_request_id: id,
        supplier_partner_id,
        material_category,
        status: 'pending'
      }
    });

    await prisma.material_quote_requests.update({
      where: { id },
      data: { status: 'sent_to_suppliers' }
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error('Error assigning supplier:', error);
    return NextResponse.json({ success: false, error: 'Failed to assign supplier' }, { status: 500 });
  }
}
