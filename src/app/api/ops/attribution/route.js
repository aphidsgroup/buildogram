import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const leads = await prisma.leads.findMany({
      select: { id: true, name: true, lead_type: true, source_page: true, utm_source: true, utm_medium: true, utm_campaign: true, utm_content: true, referrer: true, device_type: true, created_at: true },
      orderBy: { created_at: 'desc' },
      take: 500
    });
    
    const materialLeads = await prisma.material_leads.findMany({
      select: { id: true, user_name: true, lead_type: true, source_page: true, utm_source: true, utm_medium: true, utm_campaign: true, utm_content: true, referrer: true, device_type: true, created_at: true },
      orderBy: { created_at: 'desc' },
      take: 500
    });
    
    const auditLeads = await prisma.structural_audit_leads.findMany({
      select: { id: true, user_name: true, lead_type: true, source_page: true, utm_source: true, utm_medium: true, utm_campaign: true, utm_content: true, referrer: true, device_type: true, created_at: true },
      orderBy: { created_at: 'desc' },
      take: 500
    });

    const surveyLeads = await prisma.survey_leads.findMany({
      select: { id: true, user_name: true, lead_type: true, source_page: true, utm_source: true, utm_medium: true, utm_campaign: true, utm_content: true, referrer: true, device_type: true, created_at: true },
      orderBy: { created_at: 'desc' },
      take: 500
    });

    const pilingLeads = await prisma.piling_leads.findMany({
      select: { id: true, user_name: true, lead_type: true, source_page: true, utm_source: true, utm_medium: true, utm_campaign: true, utm_content: true, referrer: true, device_type: true, created_at: true },
      orderBy: { created_at: 'desc' },
      take: 500
    });

    const aiLeads = await prisma.ai_tool_submissions.findMany({
      select: { id: true, name: true, tool_name: true, source_page: true, utm_source: true, utm_medium: true, utm_campaign: true, utm_content: true, referrer: true, device_type: true, created_at: true },
      orderBy: { created_at: 'desc' },
      take: 500
    });

    const partnerEnquiries = await prisma.partner_enquiries.findMany({
      select: { id: true, name: true, inquiry_type: true, source_page: true, utm_source: true, utm_medium: true, utm_campaign: true, utm_content: true, referrer: true, device_type: true, created_at: true },
      orderBy: { created_at: 'desc' },
      take: 500
    });

    // Normalize
    const allLeads = [
      ...leads.map(l => ({ ...l, type: l.lead_type || 'General Lead', name: l.name })),
      ...materialLeads.map(l => ({ ...l, type: l.lead_type || 'Material', name: l.user_name })),
      ...auditLeads.map(l => ({ ...l, type: l.lead_type || 'Audit', name: l.user_name })),
      ...surveyLeads.map(l => ({ ...l, type: l.lead_type || 'Survey', name: l.user_name })),
      ...pilingLeads.map(l => ({ ...l, type: l.lead_type || 'Piling', name: l.user_name })),
      ...aiLeads.map(l => ({ ...l, type: `AI Tool: ${l.tool_name}`, name: l.name })),
      ...partnerEnquiries.map(l => ({ ...l, type: l.inquiry_type || 'Partner Enquiry', name: l.name }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({
      success: true,
      data: allLeads
    });
  } catch (error) {
    console.error('Failed to fetch attribution:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
