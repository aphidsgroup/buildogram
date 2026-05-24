import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);

  if (!u || u.role !== 'client') {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    // Only fetch leads linked to this client
    const rows = await sql`
      SELECT 
        id, 
        lead_type, 
        status, 
        created_at, 
        updated_at,
        metadata
      FROM leads
      WHERE metadata->>'client_user_id' = ${u.id}
      ORDER BY created_at DESC
    `;

    // Sanitize metadata
    const safeLeads = rows.map(r => {
      const m = r.metadata || {};
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
      };

      return {
        id: r.id,
        lead_type: r.lead_type,
        status: r.status,
        created_at: r.created_at,
        updated_at: r.updated_at,
        metadata: safeMetadata
      };
    });

    return NextResponse.json({ success: true, requests: safeLeads });
  } catch (err) {
    console.error('Failed to fetch client requests:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
