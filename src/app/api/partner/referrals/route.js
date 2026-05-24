import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'partner') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // A partner can see a lead if:
    // 1. The lead's metadata explicitly links to their user_id
    // OR 2. The lead's metadata explicitly links to one of their partner_application lead_ids.
    
    // First, find the partner's application lead(s)
    const partnerLeads = await sql`
      SELECT id FROM leads 
      WHERE lead_type='partner_application' 
      AND metadata->>'partner_user_id' = ${u.id}
    `;
    const partnerLeadIds = partnerLeads.map(pl => pl.id);

    // Fetch the referrals safely. We MUST NOT expose phone, email, or full message.
    let referrals;
    if (partnerLeadIds.length > 0) {
      referrals = await sql`
        SELECT 
          id, 
          lead_type, 
          city, 
          status, 
          created_at,
          -- Mask the name (e.g., John Doe -> John D.)
          CASE 
            WHEN position(' ' in name) > 0 THEN split_part(name, ' ', 1) || ' ' || substr(split_part(name, ' ', 2), 1, 1) || '.'
            ELSE name 
          END as masked_name,
          metadata->>'referral_status' as referral_status,
          metadata->>'referral_commission_expected' as expected_commission,
          metadata->>'referral_commission_paid' as paid_commission
        FROM leads
        WHERE 
          metadata->>'referral_partner_user_id' = ${u.id}
          OR metadata->>'referral_partner_lead_id' = ANY(${partnerLeadIds})
        ORDER BY created_at DESC
      `;
    } else {
      referrals = await sql`
        SELECT 
          id, lead_type, city, status, created_at,
          CASE WHEN position(' ' in name) > 0 THEN split_part(name, ' ', 1) || ' ' || substr(split_part(name, ' ', 2), 1, 1) || '.' ELSE name END as masked_name,
          metadata->>'referral_status' as referral_status,
          metadata->>'referral_commission_expected' as expected_commission,
          metadata->>'referral_commission_paid' as paid_commission
        FROM leads
        WHERE metadata->>'referral_partner_user_id' = ${u.id}
        ORDER BY created_at DESC
      `;
    }

    return NextResponse.json({ success: true, referrals });
  } catch (e) {
    console.error('[partner referrals GET]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
