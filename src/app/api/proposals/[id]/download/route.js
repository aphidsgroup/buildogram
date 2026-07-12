import { NextResponse } from 'next/server';
import { proposals } from '@/lib/storageProvider';
import { logAudit } from '@/lib/auditService';
import { requireOps } from '@/lib/apiAuth';
import { escapeHtml } from '@/lib/security/escapeHtml';

export async function GET(req, { params }) {
  const { user, error } = requireOps(req);
  if (error) return error;
  const { id } = await params;

  const [proposal] = await proposals.getAll({ id });
  if (!proposal) return new NextResponse('Proposal Not Found', { status: 404 });

  await logAudit('Proposal Exported', 'Proposal', id, {}, user.id, req);
  const safe = Object.fromEntries(Object.entries(proposal).map(([key, value]) => [key, escapeHtml(value)]));
  const reference = escapeHtml(id.split('-')[0].toUpperCase());
  const html = `<!doctype html>
    <html><head><meta charset="utf-8"><title>Proposal - ${safe.title}</title>
    <style>
      body{font-family:Arial,sans-serif;color:#0f172a;padding:40px;max-width:800px;margin:auto}
      header{border-bottom:2px solid #e2e8f0;padding-bottom:20px;margin-bottom:30px}
      h1{font-size:28px}.meta{color:#64748b;line-height:1.8}.section{margin:28px 0}
      @media print{body{padding:0}}
    </style></head><body>
      <header><strong style="font-size:24px;color:#fc6e20">Buildogram</strong><div>Reference: PRO-${reference}</div></header>
      <h1>${safe.title}</h1>
      <div class="meta">Type: ${safe.proposalType || 'N/A'}<br>Status: ${safe.proposalStatus || 'draft'}</div>
      <section class="section"><h2>Summary</h2><p>${safe.summary || 'No summary provided.'}</p></section>
      <section class="section"><h2>Scope of Work</h2><p>${safe.scopeOfWork || 'To be discussed.'}</p></section>
      <section class="section"><h2>Estimated Value</h2><p>${safe.estimatedValue || 'To be determined'}</p></section>
      <section class="section"><h2>Terms</h2><p>Timeline: ${safe.timeline || 'TBD'}</p><p>Payment Terms: ${safe.paymentTerms || 'Standard'}</p><p>Exclusions: ${safe.exclusions || 'None specified'}</p></section>
    </body></html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'",
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
