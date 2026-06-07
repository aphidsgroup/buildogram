import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function PATCH(req, { params }) {
  await requirePermission('manage_projects');
  try {
    const { id } = await params;
    const body = await req.json();
    
    const updateData = {};
    if (body.status !== undefined) updateData.status = body.status;
    if (body.notes !== undefined) updateData.notes = body.notes;
    if (body.boq_file_url !== undefined) updateData.boq_file_url = body.boq_file_url;
    if (body.boq_available !== undefined) updateData.boq_available = body.boq_available;

    const updated = await prisma.material_quote_requests.update({
      where: { id },
      data: updateData
    });

    if (body.status === 'accepted' && body.accepted_quote_id && body.supplier_partner_id) {
      const { calculateSuggestedCommission } = await import('@/lib/finance/commissionRules');
      
      const supplierTotal = Number(body.supplier_total || 0);
      const customerTotal = Number(body.customer_total || supplierTotal * 1.1); // 10% default margin if not provided
      
      const margin = calculateSuggestedCommission({
        type: 'material_margin',
        base_amount: customerTotal,
        fixed_amount: customerTotal - supplierTotal
      });

      await prisma.material_order_finance.create({
        data: {
          quote_request_id: id,
          accepted_quote_id: body.accepted_quote_id,
          supplier_partner_id: body.supplier_partner_id,
          customer_total: customerTotal,
          supplier_total: supplierTotal,
          buildogram_margin: margin,
          payment_status: "pending"
        }
      });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating quote request:', error);
    return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 });
  }
}
