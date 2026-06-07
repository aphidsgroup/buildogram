import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  await requirePermission('manage_partners');
  try {
    const { lead_id, lead_source_table, partner_id, assignment_notes, priority_level } = await request.json();

    if (!lead_id || !lead_source_table || !partner_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Verify Partner
    const partner = await prisma.partners.findUnique({
      where: { id: partner_id }
    });

    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    // 2. Create Assignment
    const assignment = await prisma.partner_lead_assignments.create({
      data: {
        lead_id,
        lead_source_table,
        partner_id,
        status: 'pending',
        assignment_notes,
        priority_level: priority_level || 'standard'
      }
    });

    return NextResponse.json({ success: true, assignment }, { status: 201 });
  } catch (error) {
    console.error('Error assigning lead to partner:', error);
    return NextResponse.json({ error: 'Failed to assign lead' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const partnerId = searchParams.get('partner_id');
    const leadId = searchParams.get('lead_id');

    let where = {};
    if (partnerId) where.partner_id = partnerId;
    if (leadId) where.lead_id = leadId;

    const assignments = await prisma.partner_lead_assignments.findMany({
      where,
      include: {
        partner: {
          select: { company_name: true, partner_type: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json(assignments);
  } catch (error) {
    console.error('Error fetching partner assignments:', error);
    return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
  }
}
