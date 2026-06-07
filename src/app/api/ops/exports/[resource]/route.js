import { NextResponse } from 'next/server';
import { requirePermission } from '@/lib/auth/permissions';
import { prisma } from '@/lib/storageProvider';
import { createAuditLog } from '@/lib/audit/auditLog';
import { redactPII } from '@/lib/utils/redaction';

function jsonToCsv(jsonArray) {
  if (!jsonArray || !jsonArray.length) return '';
  const keys = Object.keys(jsonArray[0]);
  const header = keys.join(',');
  const rows = jsonArray.map(obj => {
    return keys.map(key => {
      let val = obj[key];
      if (val === null || val === undefined) val = '';
      if (typeof val === 'object') val = JSON.stringify(val);
      // Escape quotes
      val = String(val).replace(/"/g, '""');
      return `"${val}"`;
    }).join(',');
  });
  return [header, ...rows].join('\n');
}

export async function GET(request, { params }) {
  try {
    const resource = params.resource;
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';

    // Map resources to required permissions
    const permissionMap = {
      leads: 'manage_leads',
      projects: 'manage_projects',
      partners: 'manage_partners',
      invoices: 'manage_invoices',
      revenue: 'manage_revenue'
    };

    const requiredPerm = permissionMap[resource];
    if (!requiredPerm) {
      return NextResponse.json({ error: 'Invalid resource type' }, { status: 400 });
    }

    // Explicit Finance Restrictions: finance endpoints are hard-coded to require ops_admin/ops_finance 
    // handled implicitly via our role setup if manage_finance/manage_revenue is used, but we can also double check role
    const { user } = await requirePermission(requiredPerm);

    let rawData = [];

    // Fetch data
    switch (resource) {
      case 'leads':
        rawData = await prisma.leads.findMany({ orderBy: { created_at: 'desc' } });
        break;
      case 'projects':
        rawData = await prisma.projects.findMany({ orderBy: { created_at: 'desc' } });
        break;
      case 'partners':
        rawData = await prisma.partners.findMany({ orderBy: { created_at: 'desc' } });
        break;
      case 'invoices':
        rawData = await prisma.invoice_records.findMany({ orderBy: { created_at: 'desc' } });
        break;
      case 'revenue':
        rawData = await prisma.revenue_records.findMany({ orderBy: { created_at: 'desc' } });
        break;
    }

    // Apply redaction rules
    const safeData = redactPII(rawData, user.role);

    // Log the export action
    await createAuditLog({
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role,
      action: 'EXPORT',
      resourceType: resource,
      before: { count: rawData.length, format },
      after: { format, redacted: !['super_admin', 'ops_admin'].includes(user.role) }
    });

    if (format === 'csv') {
      const csvContent = jsonToCsv(safeData);
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="export_${resource}_${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    }

    // Default to JSON
    return NextResponse.json({
      success: true,
      count: safeData.length,
      data: safeData
    }, {
      headers: {
        'Content-Disposition': `attachment; filename="export_${resource}_${new Date().toISOString().split('T')[0]}.json"`
      }
    });

  } catch (error) {
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'Unauthorized' ? 401 : 403 });
    }
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to process export request' }, { status: 500 });
  }
}
