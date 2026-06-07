import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromRequest } from '@/lib/auth';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    let supplier_id = searchParams.get('supplier_id');

    if (!supplier_id) {
      // Attempt to resolve from user auth
      const u = getUserFromRequest(req);
      if (u && u.id) {
        const partner = await prisma.partners.findFirst({ where: { user_id: u.id } });
        if (partner) supplier_id = partner.id;
      }
    }

    if (!supplier_id) {
      return NextResponse.json({ success: false, error: 'Unauthorized. Missing supplier identity.' }, { status: 401 });
    }

    const quotes = await prisma.supplier_quote_responses.findMany({
      where: { supplier_partner_id: supplier_id },
      include: {
        material_quote_requests: {
          select: {
            customer_name: true,
            project_area: true,
            delivery_location: true,
            boq_available: true,
            boq_file_url: true,
            required_date: true,
            notes: true,
            created_at: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json({ success: true, data: quotes });
  } catch (error) {
    console.error('Error fetching supplier quotes:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { response_id, ...updates } = body;

    if (!response_id) return NextResponse.json({ success: false, error: 'Missing response id' }, { status: 400 });

    const updated = await prisma.supplier_quote_responses.update({
      where: { id: response_id },
      data: {
        ...updates,
        status: 'submitted'
      }
    });

    // Mark parent request as quotes_received if not already
    await prisma.material_quote_requests.update({
      where: { id: updated.quote_request_id },
      data: { status: 'quotes_received' }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating supplier quote:', error);
    return NextResponse.json({ success: false, error: 'Failed to update quote' }, { status: 500 });
  }
}
