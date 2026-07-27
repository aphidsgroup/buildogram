import { NextResponse } from 'next/server';
import { requireAdmin, ok, fail } from '@/lib/apiAuth';
import { prisma } from '@/lib/storageProvider';

export const dynamic = 'force-dynamic';

const PILOT_MARKER = '[pilot_seed]';

function productionEnvironment() {
  return process.env.VERCEL_ENV === 'production'
    || process.env.DEPLOYMENT_ENV === 'production'
    || process.env.APP_ENV === 'production';
}

export async function POST(request) {
  const { error } = requireAdmin(request);
  if (error) return error;
  if (productionEnvironment()) return fail('Pilot seed is unavailable in Production', 403);
  if (process.env.ENABLE_PILOT_SEED !== 'true') {
    return fail('Pilot seed is disabled', 403);
  }

  try {
    const result = await prisma.$transaction(async tx => {
      const existingRequests = await tx.material_quote_requests.findMany({
        where: { notes: { startsWith: PILOT_MARKER } },
        select: { id: true },
      });
      const requestIds = existingRequests.map(item => item.id);
      if (requestIds.length) {
        await tx.material_delivery_records.deleteMany({
          where: { quote_request_id: { in: requestIds } },
        });
        await tx.supplier_quote_responses.deleteMany({
          where: { quote_request_id: { in: requestIds } },
        });
        await tx.material_quote_requests.deleteMany({
          where: { id: { in: requestIds } },
        });
      }

      const supplier = await tx.partners.upsert({
        where: { slug: 'pilot-material-supplier' },
        update: { active: true, partner_type: 'material_supplier' },
        create: {
          slug: 'pilot-material-supplier',
          company_name: 'Pilot Material Supplier',
          services: ['Material supply'],
          specializations: ['Cement', 'Steel'],
          certifications: [],
          brands_handled: [],
          project_types: [],
          active: true,
          partner_type: 'material_supplier',
          verification_status: 'pending',
        },
      });

      await tx.users.upsert({
        where: { email: 'supplier@pilot.buildogram.invalid' },
        update: { partner_id: supplier.id, is_active: true },
        create: {
          name: 'Pilot Supplier',
          email: 'supplier@pilot.buildogram.invalid',
          password_hash: 'disabled-pilot-account',
          role: 'partner',
          is_active: true,
          partner_id: supplier.id,
        },
      });

      const quoteRequest = await tx.material_quote_requests.create({
        data: {
          customer_name: 'Pilot Customer',
          phone: '0000000000',
          project_area: 'Preview pilot',
          material_categories: ['Cement'],
          required_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          delivery_location: 'Preview test location',
          notes: `${PILOT_MARKER} canonical quotation readiness fixture`,
          status: 'quotes_received',
        },
      });
      const response = await tx.supplier_quote_responses.create({
        data: {
          quote_request_id: quoteRequest.id,
          supplier_partner_id: supplier.id,
          material_category: 'Cement',
          quantity: 200,
          unit: 'Bags',
          unit_rate: 380,
          transport_cost: 0,
          gst_included: true,
          delivery_timeline: '3 days',
          payment_terms: 'Preview-only pilot response',
          validity_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          status: 'submitted',
        },
      });
      return { requestId: quoteRequest.id, responseId: response.id };
    });

    return ok({ message: 'Canonical material quote pilot seed completed', ...result });
  } catch {
    console.error('[pilot-seed] Canonical material quote seed failed');
    return NextResponse.json(
      { success: false, message: 'Pilot seed failed' },
      { status: 500 },
    );
  }
}
