import { NextResponse } from 'next/server';
import { prisma } from '@/lib/storageProvider';
import { requireAuth } from '@/lib/apiAuth';

async function supplierPartnerId(userId) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      partner_id: true,
      partners: { select: { partner_type: true, active: true } },
    },
  });
  if (!user?.partner_id || !user.partners?.active) return null;
  return ['supplier', 'material_supplier'].includes(user.partners.partner_type)
    ? user.partner_id
    : null;
}

export async function GET(req) {
  const { user, error } = requireAuth(req);
  if (error) return error;

  try {
    const partnerId = await supplierPartnerId(user.id);
    if (!partnerId) {
      return NextResponse.json({ success: false, error: 'Active supplier profile required' }, { status: 403 });
    }

    const quotes = await prisma.supplier_quote_responses.findMany({
      where: { supplier_partner_id: partnerId },
      select: {
        id: true,
        quote_request_id: true,
        material_category: true,
        brand: true,
        grade_spec: true,
        quantity: true,
        unit: true,
        unit_rate: true,
        transport_cost: true,
        gst_included: true,
        delivery_timeline: true,
        payment_terms: true,
        quote_file_url: true,
        validity_date: true,
        status: true,
        created_at: true,
        updated_at: true,
        material_quote_requests: {
          select: {
            project_area: true,
            delivery_location: true,
            boq_available: true,
            boq_file_url: true,
            required_date: true,
            status: true,
            created_at: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json({ success: true, data: quotes });
  } catch {
    console.error('[partner-material-quotes] Read failed');
    return NextResponse.json({ success: false, error: 'Unable to load quotations' }, { status: 500 });
  }
}

export async function PATCH(req) {
  const { user, error } = requireAuth(req);
  if (error) return error;

  try {
    const partnerId = await supplierPartnerId(user.id);
    if (!partnerId) {
      return NextResponse.json({ success: false, error: 'Active supplier profile required' }, { status: 403 });
    }

    const body = await req.json();
    if (!body.response_id) {
      return NextResponse.json({ success: false, error: 'Response id required' }, { status: 400 });
    }
    const existing = await prisma.supplier_quote_responses.findFirst({
      where: { id: body.response_id, supplier_partner_id: partnerId },
      select: { id: true, status: true, quote_request_id: true },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Quotation response not found' }, { status: 404 });
    }
    if (['accepted', 'rejected', 'expired'].includes(String(existing.status).toLowerCase())) {
      return NextResponse.json({ success: false, error: 'Quotation response is closed' }, { status: 409 });
    }

    const updated = await prisma.supplier_quote_responses.update({
      where: { id: existing.id },
      data: {
        brand: body.brand === undefined ? undefined : String(body.brand).trim().slice(0, 200),
        grade_spec: body.grade_spec === undefined ? undefined : String(body.grade_spec).trim().slice(0, 200),
        delivery_timeline: body.delivery_timeline === undefined ? undefined : String(body.delivery_timeline).trim().slice(0, 200),
        payment_terms: body.payment_terms === undefined ? undefined : String(body.payment_terms).trim().slice(0, 1000),
        status: existing.status === 'pending' ? 'submitted' : 'revised',
        updated_at: new Date(),
      },
    });

    await prisma.material_quote_requests.update({
      where: { id: existing.quote_request_id },
      data: { status: 'quotes_received', updated_at: new Date() },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch {
    console.error('[partner-material-quotes] Update failed');
    return NextResponse.json({ success: false, error: 'Unable to update quotation' }, { status: 500 });
  }
}
