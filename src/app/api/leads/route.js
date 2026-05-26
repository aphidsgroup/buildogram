import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getLeads, addLead, updateLead, addLeadActivity } from '@/lib/storageProvider';
import { sendNotification } from '@/lib/notifications/notificationService';

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone) {
      return NextResponse.json({ success: false, error: 'Name and phone are required' }, { status: 400 });
    }

    const newLead = await addLead({
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      location: body.location || null,
      leadType: body.leadType || 'general',
      source: body.source || 'Website Form',
      sourcePage: body.sourcePage || null,
      sourceCta: body.sourceCta || null,
      utmSource: body.utmSource || null,
      utmMedium: body.utmMedium || null,
      utmCampaign: body.utmCampaign || null,
      utmContent: body.utmContent || null,
      referrer: body.referrer || null,
      deviceType: body.deviceType || null,
      notes: body.notes || null,
      formData: body.formData || {}
    });

    // Fire notification placeholder
    await sendNotification('New Lead Created', { id: newLead.id, leadType: newLead.leadType, name: newLead.name });

    return NextResponse.json({ success: true, id: newLead.id, leadType: newLead.leadType });
  } catch (e) {
    console.error('[leads POST]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function GET(req) {
  // Mock login bypass logic: ops_admin can view leads
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const filters = {
      leadType: searchParams.get('lead_type'),
      status: searchParams.get('status'),
      pipelineStage: searchParams.get('pipelineStage'),
      priority: searchParams.get('priority')
    };

    const leads = await getLeads(filters);
    return NextResponse.json({ success: true, leads });
  } catch (e) {
    console.error('[leads GET]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, status, priority, pipelineStage, assignedTo, nextFollowUpDate, note, action } = body;

    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (priority !== undefined) updates.priority = priority;
    if (pipelineStage !== undefined) updates.pipelineStage = pipelineStage;
    if (assignedTo !== undefined) updates.assignedTo = assignedTo;
    if (nextFollowUpDate !== undefined) updates.nextFollowUpDate = nextFollowUpDate;

    if (Object.keys(updates).length > 0) {
      const updatedLead = await updateLead(id, updates, u.name || 'Ops User');
      if (!updatedLead) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    
    if (note) {
      await addLeadActivity(id, action || 'Note Added', note, u.name || 'Ops User');
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('[leads PATCH]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
