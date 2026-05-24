import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request, { params }) {
  const { id } = await params;
  
  const u = getUserFromRequest(request);

  if (!u || u.role !== 'client') {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const [row] = await sql`
      SELECT 
        id, 
        lead_type, 
        status, 
        created_at, 
        updated_at,
        metadata
      FROM leads
      WHERE id = ${id} AND metadata->>'client_user_id' = ${u.id}
    `;

    if (!row) {
      return NextResponse.json({ success: false, error: 'Not Found' }, { status: 404 });
    }

    const m = row.metadata || {};
    const safeMetadata = {
      inquiry_type: m.inquiry_type,
      listing_type: m.listing_type,
      property_location: m.property_location,
      property_type: m.property_type,
      issue_category: m.issue_category,
      urgency: m.urgency,
      maintenance_status: m.maintenance_status,
      inquiry_status: m.inquiry_status,
      visit_scheduled_at: m.visit_scheduled_at,
      materials_required: m.materials_required,
      delivery_location: m.delivery_location,
      materials_status: m.materials_status,
      source_listing_lead_id: m.source_listing_lead_id
    };

    return NextResponse.json({ 
      success: true, 
      request: {
        id: row.id,
        lead_type: row.lead_type,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
        metadata: safeMetadata
      } 
    });
  } catch (err) {
    console.error('Failed to fetch client request detail:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
