import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'access_client_portal')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Strictly isolate invoices that are linked to this client AND not drafts/cancelled
    const records = await sql`
      SELECT id, invoice_number, invoice_category, total_amount, amount_paid, amount_due, status, issue_date, due_date
      FROM invoice_records
      WHERE metadata->>'client_user_id' = ${u.id}
        AND status NOT IN ('draft', 'cancelled')
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ success: true, records });
  } catch (error) {
    console.error('Client Invoices GET Error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
