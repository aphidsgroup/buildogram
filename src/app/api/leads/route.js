import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getLeads, addLead, updateLead, addLeadActivity } from '@/lib/storageProvider';
import { sendNotification } from '@/lib/notifications/notificationService';
import {
  buildLeadDuplicateKey,
  isValidPersistentLeadId,
  LeadSubmissionDeduper,
  normalizeLeadPayload,
} from '@/lib/leads/submission-contract.mjs';

// ── New source values (additive) ─────────────────────────────────────────────
// CONTEXTUAL_INLINE_FORM · WHATSAPP_FLOATING_WIDGET · PAGE_CTA · PHONE_CTA

// ── In-memory rate limiter (5 req / IP / 15 min) ─────────────────────────────
// Resets on cold start — acceptable for serverless; upgrade to Redis if needed.
const _rateLimitMap = new Map(); // ip → { count, resetAt }
const RATE_LIMIT    = 5;
const RATE_WINDOW   = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip) {
  const now   = Date.now();
  const entry = _rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    _rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true; // OK
  }
  if (entry.count >= RATE_LIMIT) return false; // blocked
  entry.count++;
  return true; // OK
}

// ── Duplicate guard: same phone + sourcePage within 60s ───────────────────────
const submissionDeduper = new LeadSubmissionDeduper();

export async function POST(req) {
  let reservation = null;
  try {
    // ── Payload size cap (8KB) ────────────────────────────────────────────────
    const contentLength = parseInt(req.headers.get('content-length') || '0', 10);
    if (contentLength > 8192) {
      return NextResponse.json(
        { success: false, created: false, error: 'Payload too large' },
        { status: 413 },
      );
    }

    // ── Rate limiting ─────────────────────────────────────────────────────────
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
             || req.headers.get('x-real-ip')
             || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, created: false, error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    const body = normalizeLeadPayload(await req.json());

    // ── Honeypot ──────────────────────────────────────────────────────────────
    if (body.website) {
      // Bot detected — return success silently (don't reveal the check)
      return NextResponse.json({
        success: true,
        created: false,
        duplicate: false,
        leadType: 'bot',
      });
    }

    if (!body.name || (!body.phone && body.leadType !== 'ai')) {
      return NextResponse.json(
        { success: false, created: false, error: 'Name and phone are required' },
        { status: 400 },
      );
    }

    // ── Duplicate submission guard ────────────────────────────────────────────
    const duplicateKey = buildLeadDuplicateKey(body);
    reservation = submissionDeduper.begin(duplicateKey);

    if (reservation.type === 'duplicate') {
      return NextResponse.json({
        success: true,
        created: false,
        duplicate: true,
        leadType: body.leadType,
      });
    }

    if (reservation.type === 'pending') {
      const outcome = await reservation.outcome;
      if (outcome.created) {
        return NextResponse.json({
          success: true,
          created: false,
          duplicate: true,
          leadType: body.leadType,
        });
      }
      return NextResponse.json(
        {
          success: false,
          created: false,
          error: 'The earlier submission did not complete. Please retry.',
        },
        { status: 503 },
      );
    }

    const leadType = body.leadType || 'general';
    const attr = body.attribution || {};
    const attributionData = {
      first_landing_page: attr.first_landing_page || null,
      conversion_page: attr.conversion_page || body.sourcePage || null,
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
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    let newLeadId = null;

    if (leadType === 'materials' || leadType === 'material_quote') {
      const res = await prisma.material_leads.create({
        data: {
          name: body.name,
          phone: body.phone || '',
          email: body.email,
          city: 'Chennai',
          locality: body.location,
          material: body.formData?.materialType,
          quantity: body.formData?.quantity,
          source_page: body.sourcePage,
          metadata: body.formData || {},
          ...attributionData
        }
      });
      newLeadId = res.id;
    } else if (leadType === 'audit' || leadType === 'boq_audit') {
      const res = await prisma.structural_audit_leads.create({
        data: {
          name: body.name,
          phone: body.phone || '',
          email: body.email,
          city: 'Chennai',
          locality: body.location,
          audit_type: body.formData?.auditType,
          concern: body.notes,
          source_page: body.sourcePage,
          metadata: body.formData || {},
          ...attributionData
        }
      });
      newLeadId = res.id;
    } else if (leadType === 'survey' || leadType === 'soil') {
      const res = await prisma.survey_leads.create({
        data: {
          name: body.name,
          phone: body.phone || '',
          email: body.email,
          city: 'Chennai',
          locality: body.location,
          survey_type: leadType === 'soil' ? 'Soil Testing' : body.formData?.surveyType,
          source_page: body.sourcePage,
          notes: body.notes,
          metadata: body.formData || {},
          ...attributionData
        }
      });
      newLeadId = res.id;
    } else if (leadType === 'piling') {
      const res = await prisma.piling_leads.create({
        data: {
          name: body.name,
          phone: body.phone || '',
          email: body.email,
          city: 'Chennai',
          locality: body.location,
          piling_type: body.formData?.pilingType,
          source_page: body.sourcePage,
          notes: body.notes,
          metadata: body.formData || {},
          ...attributionData
        }
      });
      newLeadId = res.id;
    } else if (leadType === 'ai') {
      const res = await prisma.ai_tool_submissions.create({
        data: {
          tool_name: body.sourcePage ? body.sourcePage.split('/').pop() : 'unknown',
          name: body.name,
          phone: body.phone || '',
          email: body.email,
          input_data: body.formData || {},
          source_page: body.sourcePage,
          ...attributionData
        }
      });
      newLeadId = res.id;
    } else {
      // General leads natively in Prisma
      const res = await prisma.leads.create({
        data: {
          name: body.name,
          phone: body.phone || '',
          email: body.email,
          city: body.city || 'Chennai',
          locality: body.location,
          lead_type: leadType,
          source: body.source || 'Website Form',
          notes: body.notes,
          metadata: body.formData || {},
          status: 'new',
          ...attributionData
        }
      });
      newLeadId = res.id;
    }

    if (!isValidPersistentLeadId(newLeadId)) {
      reservation.fail();
      throw new Error('Lead persistence did not return a valid identifier');
    }

    // Persistence defines creation success. Notifications are best-effort and
    // cannot turn a committed lead into a failed or duplicate retry.
    reservation.complete(newLeadId);
    try {
      await sendNotification('New Lead Created', { id: newLeadId, leadType, name: body.name });
    } catch (notificationError) {
      console.error('[leads notification]', notificationError?.message || 'Notification failed');
    }

    return NextResponse.json(
      {
        success: true,
        created: true,
        duplicate: false,
        id: newLeadId,
        leadType,
      },
      { status: 201 },
    );
  } catch (e) {
    reservation?.fail?.();
    console.error('[leads POST]', e.message);
    return NextResponse.json(
      { success: false, created: false, error: 'Unable to save enquiry' },
      { status: 500 },
    );
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
