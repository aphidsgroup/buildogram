import { NextResponse } from 'next/server';
import { boqReviews } from '@/lib/storageProvider';
import { logAudit } from '@/lib/auditService';
import { requireOps } from '@/lib/apiAuth';
import { escapeHtml } from '@/lib/security/escapeHtml';

export async function GET(req, { params }) {
  const { user, error } = requireOps(req);
  if (error) return error;
  const { id } = await params;

  const [review] = await boqReviews.getAll({ id });
  if (!review) return new NextResponse('BOQ Review Not Found', { status: 404 });

  await logAudit('BOQ Review Exported', 'BoqReview', id, {}, user.id, req);
  const safe = Object.fromEntries(Object.entries(review).map(([key, value]) => [key, escapeHtml(value)]));
  const reference = escapeHtml(id.split('-')[0].toUpperCase());
  const withBreaks = (value, fallback) => value ? value.replace(/\r?\n/g, '<br>') : fallback;
  const html = `<!doctype html>
    <html><head><meta charset="utf-8"><title>BOQ Audit Report - ${reference}</title>
    <style>
      body{font-family:Arial,sans-serif;color:#0f172a;padding:40px;max-width:800px;margin:auto}
      header{border-bottom:2px solid #e2e8f0;padding-bottom:20px;margin-bottom:30px}
      h1{font-size:28px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;background:#f8fafc;padding:20px}
      .section{margin:28px 0}.alert{padding:16px;background:#fef2f2;border-left:4px solid #ef4444}
      @media print{body{padding:0}}
    </style></head><body>
      <header><strong style="font-size:24px;color:#fc6e20">Buildogram</strong><div>Reference: BOQ-${reference}</div></header>
      <h1>Engineer BOQ Audit Report</h1>
      <div class="grid"><div>Project Type: ${safe.projectType || 'N/A'}</div><div>Built-Up Area: ${safe.builtUpArea || 'N/A'}</div><div>Drawing: ${safe.drawingStatus || 'Pending'}</div><div>BOQ: ${safe.boqStatus || 'Pending'}</div></div>
      <section class="section"><h2>Executive Summary</h2><p>${safe.engineerSummary || 'Not provided.'}</p></section>
      <section class="section"><h2>Critical Risks</h2><div class="alert">${withBreaks(safe.riskItems, 'No critical risks identified.')}</div></section>
      <section class="section"><h2>Missing Items</h2><p>${withBreaks(safe.missingItems, 'None specified.')}</p></section>
      <section class="section"><h2>Cost Observations</h2><p>${withBreaks(safe.costObservation, 'None specified.')}</p></section>
      <section class="section"><h2>Review Notes</h2><p>${withBreaks(safe.reviewNotes, 'No additional notes.')}</p></section>
    </body></html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'",
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
