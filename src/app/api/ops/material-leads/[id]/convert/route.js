import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req, { params }) {
  await requirePermission('ops_admin');
  try {
    const { id } = await params;
    
    // Fetch the lead
    const lead = await prisma.leads.findUnique({ where: { id } });
    if (!lead) return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    
    if (lead.status === 'converted') {
      return NextResponse.json({ success: false, error: 'Lead already converted' }, { status: 400 });
    }

    // Convert lead to material_quote_request
    const quoteReq = await prisma.material_quote_requests.create({
      data: {
        lead_id: lead.id,
        customer_name: lead.name,
        phone: lead.phone,
        email: lead.email,
        project_area: lead.locality,
        material_categories: [lead.material].filter(Boolean),
        delivery_location: lead.locality,
        status: 'new'
      }
    });

    // Update lead status
    await prisma.leads.update({
      where: { id },
      data: { status: 'converted' }
    });

    return NextResponse.json({ success: true, data: quoteReq });
  } catch (error) {
    console.error('Error converting lead to quote request:', error);
    return NextResponse.json({ success: false, error: 'Failed to convert lead' }, { status: 500 });
  }
}
