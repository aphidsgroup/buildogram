import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const listingType = searchParams.get('listing_type') || 'all'; // 'buy', 'rent', 'all'
    const propertyType = searchParams.get('type') || 'all'; // 'villa', 'apartment', etc
    const budgetMax = parseInt(searchParams.get('budget_max') || '0', 10);

    let query = sql`
      SELECT id, city, locality, metadata
      FROM leads
      WHERE lead_type = 'property_listing'
        AND metadata->>'public_status' = 'published'
    `;

    if (listingType !== 'all') {
      if (listingType === 'buy') {
         query = sql`${query} AND metadata->>'listing_type' IN ('resale', 'buy')`;
      } else {
         query = sql`${query} AND metadata->>'listing_type' = ${listingType}`;
      }
    }

    if (propertyType !== 'all') {
      query = sql`${query} AND metadata->>'property_type' = ${propertyType}`;
    }

    if (budgetMax > 0) {
       // Need to cast the string in JSONB to integer for comparison.
       // Handle cases where expected_price or expected_rent might not be perfectly formatted ints.
       if (listingType === 'rent') {
           query = sql`${query} AND CAST(NULLIF(metadata->>'expected_rent', '') AS BIGINT) <= ${budgetMax}`;
       } else {
           query = sql`${query} AND CAST(NULLIF(metadata->>'expected_price', '') AS BIGINT) <= ${budgetMax}`;
       }
    }

    query = sql`${query} ORDER BY created_at DESC LIMIT 50`;

    const properties = await query;
    return NextResponse.json({ success: true, properties });
  } catch (error) {
    console.error('Public Properties API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
