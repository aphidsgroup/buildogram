import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export const revalidate = 60; // cache for 60 seconds

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'all';

    let query = sql`
      SELECT id, city, metadata
      FROM leads
      WHERE lead_type = 'partner_application'
        AND metadata->>'public_status' = 'published'
    `;

    if (type !== 'all') {
      // Look for the specific string in the services_offered JSON array text
      query = sql`${query} AND metadata->>'services_offered' ILIKE ${'%' + type + '%'}`;
    }

    query = sql`${query} ORDER BY created_at DESC LIMIT 50`;

    const partners = await query;
    return NextResponse.json({ success: true, partners });
  } catch (error) {
    console.error('Public Partners API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
