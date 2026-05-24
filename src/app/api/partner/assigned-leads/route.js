import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  try {
    const u = getUserFromRequest(req);
    if (!u) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    // Ensure the user actually has a linked partner application
    const [partnerProfile] = await sql`
      SELECT id FROM leads 
      WHERE lead_type = 'partner_application' 
      AND metadata->>'partner_user_id' = ${u.id}
    `;

    if (!partnerProfile) {
      return NextResponse.json({ success: true, leads: [] }); // Not a partner yet
    }

    // Fetch all leads assigned to this partner user
    const leads = await sql`
      SELECT 
        id, 
        name, 
        city, 
        locality, 
        lead_type, 
        created_at, 
        metadata
      FROM leads
      WHERE metadata->>'assigned_partner_user_id' = ${u.id}
      ORDER BY created_at DESC
    `;

    // Mask PII and strip internal data
    const safeLeads = leads.map(l => {
      const nameParts = l.name.split(' ');
      const maskedName = nameParts.length > 1 
        ? `${nameParts[0]} ${nameParts[1][0]}.` 
        : nameParts[0];

      return {
        id: l.id,
        masked_name: maskedName,
        city: l.city,
        locality: l.locality,
        lead_type: l.lead_type,
        created_at: l.created_at,
        assignment_status: l.metadata?.partner_assignment_status || 'assigned',
        assignment_date: l.metadata?.partner_assignment_created_at,
        requirement_summary: l.metadata?.customer_concern || l.metadata?.message || 'No specific details provided.',
        partner_response_note: l.metadata?.partner_response_note || '',
        ops_notes: l.metadata?.partner_assignment_notes || ''
      };
    });

    return NextResponse.json({ success: true, leads: safeLeads });
  } catch (err) {
    console.error('Fetch assigned leads error:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
