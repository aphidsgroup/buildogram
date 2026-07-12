import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function GET(req, { params }) {
  const { id } = await params;
  const u = getUserFromRequest(req);
  
  if (!u || !roleCan(u.role, 'access_client_portal')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Secure isolation constraint
    const [invoice] = await sql`
      SELECT * 
      FROM invoice_records 
      WHERE id = ${id} 
        AND metadata->>'client_user_id' = ${u.id}
        AND status NOT IN ('draft', 'cancelled')
    `;

    if (!invoice) return NextResponse.json({ error: 'Invoice not found or unauthorized' }, { status: 404 });

    // Scrub out metadata just to be absolutely sure no internal IDs leak
    const safeInvoice = { ...invoice };
    delete safeInvoice.metadata;
    delete safeInvoice.revenue_record_id;
    delete safeInvoice.source_id;
    delete safeInvoice.source_type;

    return NextResponse.json({ success: true, invoice: safeInvoice });
  } catch (error) {
    console.error('Client Invoice Detail GET Error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
