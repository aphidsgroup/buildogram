import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requireAuth, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

/**
 * POST /api/material-quotes
 * Submit a supplier quote for a material request.
 * Replaces the previous storageProvider (in-memory) implementation.
 */
export async function POST(request) {
  const { user, error } = requireAuth(request);
  if (error) return error;

  try {
    const b = await request.json();
    if (!b.rfqId && !b.materialRequestId) return fail('rfqId or materialRequestId required');
    if (!b.rate && !b.ratePerUnit) return fail('rate required');

    const rfqId = b.rfqId || b.materialRequestId;
    const rate = Number(b.rate || b.ratePerUnit || 0);
    const tax = Number(b.tax || b.gstPct || 18);
    const qty = Number(b.qty || 1);
    const deliveryCharge = Number(b.deliveryCharge || 0);
    const deliveryDays = Number(b.deliveryDays || 0);
    const total = (rate * qty * (1 + tax / 100)) + deliveryCharge;

    const [row] = await sql`
      INSERT INTO material_quotes (
        material_request_id, supplier_user_id,
        material_name, rate_per_unit, gst_pct,
        delivery_charge, delivery_days,
        valid_until, notes, total_amount, status
      ) VALUES (
        ${rfqId}, ${user.id},
        ${b.material || null},
        ${rate}, ${tax},
        ${deliveryCharge}, ${deliveryDays},
        ${b.validUntil || null},
        ${b.notes || null},
        ${total},
        'Submitted'
      ) RETURNING id, status, total_amount
    `;

    return ok({ quote: { id: row.id, status: row.status, totalAmount: row.total_amount } }, 201);
  } catch (e) {
    // Graceful: if table doesn't exist, return soft failure (client handles via localStorage)
    console.error('[material-quotes POST]', e.message);
    return NextResponse.json({
      success: false,
      message: e.message,
      fallback: 'Quote recorded in client cache only'
    }, { status: 500 });
  }
}

/**
 * GET /api/material-quotes
 * Returns quotes for a given material request or the current user's quotes.
 */
export async function GET(request) {
  const { user, error } = requireAuth(request);
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const rfqId = searchParams.get('rfqId') || searchParams.get('materialRequestId');

    let quotes;
    if (rfqId) {
      quotes = await sql`SELECT * FROM material_quotes WHERE material_request_id = ${rfqId} ORDER BY created_at DESC`;
    } else {
      quotes = await sql`SELECT * FROM material_quotes WHERE supplier_user_id = ${user.id} ORDER BY created_at DESC LIMIT 50`;
    }
    return ok({ quotes });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message, quotes: [] }, { status: 500 });
  }
}
