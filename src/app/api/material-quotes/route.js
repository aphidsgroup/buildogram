import { NextResponse } from 'next/server';
import { prisma } from '@/lib/storageProvider';
import { requireAuth, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

const CLOSED_REQUEST_STATUSES = new Set(['accepted', 'closed', 'completed', 'cancelled']);
const IMMUTABLE_RESPONSE_STATUSES = new Set(['accepted', 'rejected', 'expired']);

function finiteNumber(value, { min = 0, required = false } = {}) {
  if ((value === undefined || value === null || value === '') && !required) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < min) return undefined;
  return parsed;
}

function dateOnly(value) {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function isPast(date) {
  if (!date) return false;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return new Date(date) < today;
}

async function getSupplierPartner(userId) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      partner_id: true,
      partners: { select: { id: true, partner_type: true, active: true } },
    },
  });
  if (!user?.partner_id || !user.partners?.active) return null;
  if (!['supplier', 'material_supplier'].includes(user.partners.partner_type)) return null;
  return user.partners;
}

function compatibilityQuote(response) {
  const request = response.material_quote_requests;
  const quantity = response.quantity === null ? null : Number(response.quantity);
  const unitRate = response.unit_rate === null ? null : Number(response.unit_rate);
  const deliveryCharge = response.transport_cost === null ? 0 : Number(response.transport_cost);
  const total = quantity !== null && unitRate !== null
    ? (quantity * unitRate) + deliveryCharge
    : null;
  const deliveryDaysMatch = response.delivery_timeline?.match(/^(\d+)\s+days?$/i);

  return {
    id: response.id,
    requestId: response.quote_request_id,
    rfqId: response.quote_request_id,
    materialRequestId: response.quote_request_id,
    supplierId: response.supplier_partner_id,
    material: response.material_category,
    qty: quantity,
    unit: response.unit,
    rate: unitRate,
    ratePerUnit: unitRate,
    unitRate,
    gstIncluded: Boolean(response.gst_included),
    deliveryCharge,
    deliveryDays: deliveryDaysMatch ? Number(deliveryDaysMatch[1]) : null,
    deliveryTimeline: response.delivery_timeline,
    validUntil: response.validity_date,
    validTill: response.validity_date,
    notes: response.payment_terms,
    paymentTerms: response.payment_terms,
    status: response.status,
    selected: response.status === 'accepted',
    total,
    totalAmount: total,
    submittedAt: response.created_at,
    request: request ? {
      id: request.id,
      projectArea: request.project_area,
      materialCategories: request.material_categories,
      boqAvailable: request.boq_available,
      boqFileUrl: request.boq_file_url,
      requiredDate: request.required_date,
      deliveryLocation: request.delivery_location,
      status: request.status,
      createdAt: request.created_at,
    } : undefined,
  };
}

export async function POST(request) {
  const { user, error } = requireAuth(request);
  if (error) return error;

  try {
    const supplier = await getSupplierPartner(user.id);
    if (!supplier) return fail('Active supplier profile required', 403);

    const body = await request.json();
    const requestId = body.rfqId || body.materialRequestId || body.requestId;
    if (!requestId) return fail('Quotation request is required');

    const unitRate = finiteNumber(body.rate ?? body.ratePerUnit ?? body.unitRate, {
      min: 0.01,
      required: true,
    });
    const quantity = finiteNumber(body.qty ?? body.quantity, { min: 0.01 });
    const transportCost = finiteNumber(body.deliveryCharge ?? body.transportCost, { min: 0 });
    const deliveryDays = finiteNumber(body.deliveryDays, { min: 0 });
    const validityDate = dateOnly(body.validUntil ?? body.validityDate);
    if (unitRate === undefined) return fail('Unit rate must be a positive number');
    if (quantity === undefined) return fail('Quantity must be a positive number');
    if (transportCost === undefined) return fail('Delivery charge must be zero or greater');
    if (deliveryDays === undefined) return fail('Delivery days must be zero or greater');
    if (validityDate === undefined || isPast(validityDate)) {
      return fail('Quote validity date must be today or later');
    }

    const existing = await prisma.supplier_quote_responses.findFirst({
      where: {
        quote_request_id: requestId,
        supplier_partner_id: supplier.id,
      },
      include: { material_quote_requests: true },
    });
    if (!existing) return fail('Quotation request is not assigned to this supplier', 403);

    const quoteRequest = existing.material_quote_requests;
    if (CLOSED_REQUEST_STATUSES.has(String(quoteRequest.status).toLowerCase())) {
      return fail('Quotation request is closed', 409);
    }
    if (isPast(quoteRequest.required_date)) return fail('Quotation request has expired', 409);
    if (IMMUTABLE_RESPONSE_STATUSES.has(String(existing.status).toLowerCase())) {
      return fail('This supplier response can no longer be changed', 409);
    }

    const materialCategory = String(
      body.material
      || existing.material_category
      || (Array.isArray(quoteRequest.material_categories)
        ? quoteRequest.material_categories[0]
        : ''),
    ).trim();
    if (!materialCategory) return fail('Material category is required');

    const nextData = {
      material_category: materialCategory.slice(0, 200),
      quantity,
      unit: body.unit ? String(body.unit).trim().slice(0, 50) : existing.unit,
      unit_rate: unitRate,
      transport_cost: transportCost ?? 0,
      gst_included: Boolean(body.gstIncluded),
      delivery_timeline: deliveryDays === null
        ? (body.deliveryTimeline || existing.delivery_timeline)
        : `${deliveryDays} days`,
      payment_terms: body.paymentTerms || body.notes
        ? String(body.paymentTerms || body.notes).trim().slice(0, 1000)
        : null,
      validity_date: validityDate,
      status: existing.status === 'submitted' || existing.status === 'revised'
        ? 'revised'
        : 'submitted',
      updated_at: new Date(),
    };

    const updated = await prisma.$transaction(async tx => {
      const response = await tx.supplier_quote_responses.update({
        where: { id: existing.id },
        data: nextData,
        include: { material_quote_requests: true },
      });
      await tx.material_quote_requests.update({
        where: { id: requestId },
        data: { status: 'quotes_received', updated_at: new Date() },
      });
      return response;
    });

    return ok({ quote: compatibilityQuote(updated) }, existing.status === 'pending' ? 201 : 200);
  } catch (error) {
    console.error('[material-quotes POST] request failed');
    return NextResponse.json(
      { success: false, message: 'Unable to save quotation' },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  const { user, error } = requireAuth(request);
  if (error) return error;

  try {
    const supplier = await getSupplierPartner(user.id);
    if (!supplier) return fail('Active supplier profile required', 403);
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('rfqId')
      || searchParams.get('materialRequestId')
      || searchParams.get('requestId');

    const responses = await prisma.supplier_quote_responses.findMany({
      where: {
        supplier_partner_id: supplier.id,
        ...(requestId ? { quote_request_id: requestId } : {}),
      },
      include: {
        material_quote_requests: {
          select: {
            id: true,
            project_area: true,
            material_categories: true,
            boq_available: true,
            boq_file_url: true,
            required_date: true,
            delivery_location: true,
            status: true,
            created_at: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
      take: 50,
    });

    return ok({ quotes: responses.map(compatibilityQuote) });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Unable to load quotations', quotes: [] },
      { status: 500 },
    );
  }
}
