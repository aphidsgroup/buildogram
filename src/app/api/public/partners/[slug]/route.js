import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    const slug = params.slug;
    
    // Fetch the specific partner by slug, or fallback to id if slug is not present but id matches
    const [partner] = await sql`
      SELECT id, city, metadata
      FROM leads
      WHERE lead_type = 'partner_application'
        AND metadata->>'public_status' = 'published'
        AND (metadata->>'slug' = ${slug} OR id::text = ${slug})
      LIMIT 1
    `;

    if (!partner) {
      return NextResponse.json({ success: false, error: 'Partner not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, partner });
  } catch (error) {
    console.error('Public Partner API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
