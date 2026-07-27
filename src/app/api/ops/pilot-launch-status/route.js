import { NextResponse } from 'next/server';
import { requireAdmin, ok } from '@/lib/apiAuth';
import { prisma } from '@/lib/storageProvider';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const requests = await prisma.material_quote_requests.findMany({
      where: { notes: { startsWith: '[pilot_seed]' } },
      select: {
        id: true,
        supplier_quote_responses: { select: { id: true, status: true } },
      },
    });
    const responses = requests.flatMap(item => item.supplier_quote_responses);
    const blockers = [];
    if (requests.length < 1) blockers.push('Canonical pilot quote request is missing');
    if (responses.length < 1) blockers.push('Canonical pilot supplier response is missing');

    return ok({
      stats: {
        materialQuoteRequests: requests.length,
        supplierQuoteResponses: responses.length,
        deliveryRecords: 0,
        blockers,
      },
    });
  } catch {
    console.error('[pilot-status] Canonical workflow check failed');
    return NextResponse.json(
      { success: false, message: 'Unable to read pilot status' },
      { status: 500 },
    );
  }
}
