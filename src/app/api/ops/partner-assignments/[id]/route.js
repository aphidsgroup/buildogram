import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request, { params }) {
  await requirePermission('manage_partners');
  try {
    const { status, partner_feedback } = await request.json();

    const updated = await prisma.partner_lead_assignments.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(partner_feedback && { partner_feedback })
      }
    });

    if (status === 'won') {
      const { calculateSuggestedCommission } = await import('@/lib/finance/commissionRules');
      
      // Look up lead to estimate budget for commission
      const lead = await prisma.leads.findUnique({
        where: { id: updated.lead_id }
      });
      
      const estimatedBudget = lead?.budget_range ? 5000000 : 0; // fallback logic
      const suggestedAmount = calculateSuggestedCommission({
        type: 'percentage',
        base_amount: estimatedBudget,
        rate: 0.02 // 2% platform fee
      });

      await prisma.partner_commissions.create({
        data: {
          partner_id: updated.partner_id,
          assignment_id: updated.id,
          commission_type: "percentage",
          base_amount: estimatedBudget,
          commission_rate: 0.02,
          commission_amount: suggestedAmount,
          status: "pending"
        }
      });
    }

    return NextResponse.json({ success: true, assignment: updated });
  } catch (error) {
    console.error('Error updating assignment:', error);
    return NextResponse.json({ error: 'Failed to update assignment' }, { status: 500 });
  }
}
