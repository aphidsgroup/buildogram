import { NextResponse } from 'next/server';
import { getActiveUserFromRequest } from '@/lib/auth/currentUser';
import { isOpsRole } from '@/lib/roles';
import { getLeads, prisma, updateLead, addLeadActivity } from '@/lib/storageProvider';
import { sendNotification } from '@/lib/notifications/notificationService';
import { checkRateLimit } from '@/lib/security/rateLimit';

export async function POST(req) {
  const rateLimit = checkRateLimit(req, { namespace: 'lead-submit', limit: 10, windowMs: 60 * 60 * 1000 });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many submissions. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } },
    );
  }

  try {
    const body = await req.json();
    const leadType = body.leadType || body.lead_type || 'general';
    const sourcePage = body.sourcePage || body.source_page || null;
    const formData = body.formData || body.metadata || {};
    const locality = body.locality || body.location || null;
    const notes = body.notes || body.message || null;
    const phone = String(body.phone || '').replace(/\D/g, '');

    if (!body.name || (!phone && leadType !== 'ai')) {
      return NextResponse.json({ success: false, error: 'Name and phone are required' }, { status: 400 });
    }
    if (phone && !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ success: false, error: 'Enter a valid 10-digit mobile number' }, { status: 400 });
    }
    const attr = body.attribution || {};
    const attributionData = {
      first_landing_page: attr.first_landing_page || null,
      conversion_page: attr.conversion_page || sourcePage,
      referrer: attr.referrer || null,
      utm_source: attr.utm_source || body.utmSource || null,
      utm_medium: attr.utm_medium || body.utmMedium || null,
      utm_campaign: attr.utm_campaign || body.utmCampaign || null,
      utm_content: attr.utm_content || body.utmContent || null,
      utm_term: attr.utm_term || null,
      gclid: attr.gclid || null,
      session_id: attr.session_id || null,
      device_type: attr.device_type || body.deviceType || null,
      page_category: attr.page_category || null,
      attribution_json: attr || null
    };

    // Route to new specialized tables if applicable
    let newLeadId = null;

    if (leadType === 'materials' || leadType === 'material_quote') {
      const res = await prisma.material_leads.create({
        data: {
          name: body.name,
          phone,
          email: body.email,
          city: 'Chennai',
          locality,
          material: formData.materialType,
          quantity: formData.quantity,
          source_page: sourcePage,
          metadata: formData,
          ...attributionData
        }
      });
      newLeadId = res.id;
    } else if (leadType === 'audit' || leadType === 'boq_audit') {
      const res = await prisma.structural_audit_leads.create({
        data: {
          name: body.name,
          phone,
          email: body.email,
          city: 'Chennai',
          locality,
          audit_type: formData.auditType,
          concern: notes,
          source_page: sourcePage,
          metadata: formData,
          ...attributionData
        }
      });
      newLeadId = res.id;
    } else if (leadType === 'survey' || leadType === 'soil') {
      const res = await prisma.survey_leads.create({
        data: {
          name: body.name,
          phone,
          email: body.email,
          city: 'Chennai',
          locality,
          survey_type: leadType === 'soil' ? 'Soil Testing' : formData.surveyType,
          source_page: sourcePage,
          notes,
          metadata: formData,
          ...attributionData
        }
      });
      newLeadId = res.id;
    } else if (leadType === 'piling') {
      const res = await prisma.piling_leads.create({
        data: {
          name: body.name,
          phone,
          email: body.email,
          city: 'Chennai',
          locality,
          piling_type: formData.pilingType,
          source_page: sourcePage,
          notes,
          metadata: formData,
          ...attributionData
        }
      });
      newLeadId = res.id;
    } else if (leadType === 'ai') {
      const res = await prisma.ai_tool_submissions.create({
        data: {
          tool_name: sourcePage ? sourcePage.split('/').pop() : 'unknown',
          name: body.name,
          phone,
          email: body.email,
          input_data: formData,
          source_page: sourcePage,
          ...attributionData
        }
      });
      newLeadId = res.id;
    } else {
      // General leads natively in Prisma
      const res = await prisma.leads.create({
        data: {
          name: body.name,
          phone,
          email: body.email,
          city: body.city || 'Chennai',
          locality,
          lead_type: leadType,
          source: body.source || 'Website Form',
          notes,
          message: notes,
          source_page: sourcePage,
          metadata: formData,
          status: 'new',
          ...attributionData
        }
      });
      newLeadId = res.id;
    }

    // Fire notification placeholder
    await sendNotification('New Lead Created', { id: newLeadId, leadType: leadType, name: body.name });

    return NextResponse.json({ success: true, id: newLeadId, leadType: leadType });
  } catch (e) {
    console.error('[leads POST]', e.message);
    return NextResponse.json({ success: false, error: 'Unable to create lead' }, { status: 500 });
  }
}

export async function GET(req) {
  const u = await getActiveUserFromRequest(req);
  if (!u || !isOpsRole(u.role)) {
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
    return NextResponse.json({ success: false, error: 'Unable to load leads' }, { status: 500 });
  }
}

export async function PATCH(req) {
  const u = await getActiveUserFromRequest(req);
  if (!u || !isOpsRole(u.role)) {
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
    return NextResponse.json({ success: false, error: 'Unable to update lead' }, { status: 500 });
  }
}
