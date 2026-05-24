import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'client') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [user] = await sql`SELECT metadata FROM users WHERE id = ${u.id}`;
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    
    const prefs = user.metadata?.notification_preferences || {};
    
    // Default structure for fresh loads
    const defaultPrefs = {
      receive_request_updates: true,
      receive_passport_updates: true,
      receive_boq_report_updates: true,
      receive_maintenance_updates: true,
      receive_property_listing_updates: true,
      receive_marketing_updates: false,
      preferred_channel: 'whatsapp',
      quiet_hours_start: '',
      quiet_hours_end: ''
    };

    return NextResponse.json({ success: true, preferences: { ...defaultPrefs, ...prefs } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'client') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    
    // Safely extract ONLY notification variables
    const { 
      receive_request_updates, 
      receive_passport_updates,
      receive_boq_report_updates,
      receive_maintenance_updates,
      receive_property_listing_updates,
      receive_marketing_updates,
      preferred_channel,
      quiet_hours_start,
      quiet_hours_end
    } = body;

    const newPrefs = {
      receive_request_updates: !!receive_request_updates,
      receive_passport_updates: !!receive_passport_updates,
      receive_boq_report_updates: !!receive_boq_report_updates,
      receive_maintenance_updates: !!receive_maintenance_updates,
      receive_property_listing_updates: !!receive_property_listing_updates,
      receive_marketing_updates: !!receive_marketing_updates,
      preferred_channel: ['whatsapp', 'phone', 'email'].includes(preferred_channel) ? preferred_channel : 'whatsapp',
      quiet_hours_start: quiet_hours_start || '',
      quiet_hours_end: quiet_hours_end || ''
    };

    // Retrieve existing metadata to deep-merge safely
    const [existing] = await sql`SELECT metadata FROM users WHERE id = ${u.id}`;
    const oldMeta = existing?.metadata || {};

    const newMeta = {
      ...oldMeta,
      notification_preferences: newPrefs
    };

    // Remove legacy flat key if it exists
    delete newMeta.preferred_channel;

    const [user] = await sql`
      UPDATE users SET
        metadata = ${JSON.stringify(newMeta)}::jsonb,
        updated_at = NOW()
      WHERE id = ${u.id}
      RETURNING id, metadata
    `;

    return NextResponse.json({ success: true, preferences: user.metadata.notification_preferences });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
