import { NextResponse } from 'next/server';
import { boqReviews } from '@/lib/storageProvider';
import { logAudit } from '@/lib/auditService';

export async function GET(req, { params }) {
  const { id } = params;
  
  try {
    const allReviews = await boqReviews.getAll({ id });
    const review = allReviews.find(r => r.id === id);

    if (!review) {
      return new NextResponse('BOQ Review Not Found', { status: 404 });
    }

    await logAudit('BOQ Review Exported', 'BoqReview', id, {}, 'System', req);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>BOQ Audit Report - ${id.split('-')[0].toUpperCase()}</title>
        <style>
          body { font-family: 'Inter', sans-serif; color: #0F172A; padding: 40px; max-width: 800px; margin: auto; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #E2E8F0; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: 900; color: #FC6E20; }
          h1 { font-size: 24px; margin: 0 0 10px 0; }
          .section { margin-bottom: 30px; }
          .section h2 { font-size: 16px; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px; margin-bottom: 16px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; }
          .alert { padding: 16px; background: #FEF2F2; border-left: 4px solid #EF4444; margin-bottom: 20px; font-size: 14px; }
          .info { padding: 16px; background: #F0FDF4; border-left: 4px solid #10B981; margin-bottom: 20px; font-size: 14px; }
          @media print { body { padding: 0; } button { display: none; } }
          .print-btn { background: #0F172A; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; float: right; }
        </style>
      </head>
      <body>
        <button class="print-btn" onclick="window.print()">Save as PDF</button>
        <div class="header">
          <div>
            <div class="logo">Buildogram</div>
            <div style="font-size: 12px; color: #64748B; margin-top: 4px;">Independent BOQ Audit Division</div>
          </div>
          <div style="text-align: right; font-size: 14px; color: #64748B;">
            Date: ${new Date().toLocaleDateString('en-IN')}<br/>
            Ref: BOQ-${id.split('-')[0].toUpperCase()}
          </div>
        </div>

        <h1>Engineer BOQ Audit Report</h1>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; background: #F8FAFC; padding: 20px; border-radius: 8px;">
          <div><strong>Project Type:</strong> ${review.projectType || 'N/A'}</div>
          <div><strong>Built-Up Area:</strong> ${review.builtUpArea || 'N/A'}</div>
          <div><strong>Drawing Status:</strong> <span style="text-transform: capitalize;">${review.drawingStatus || 'Pending'}</span></div>
          <div><strong>BOQ Status:</strong> <span style="text-transform: capitalize;">${review.boqStatus || 'Pending'}</span></div>
        </div>

        <div class="section">
          <h2>Executive Summary</h2>
          <p style="font-size: 15px; line-height: 1.6;">${review.engineerSummary || 'Detailed summary not yet provided.'}</p>
        </div>

        <div class="section">
          <h2>Critical Risk Items</h2>
          <div class="alert">
            ${review.riskItems ? review.riskItems.replace(/\\n/g, '<br/>') : 'No critical risks identified.'}
          </div>
        </div>

        <div class="section">
          <h2>Cost & Scope Observations</h2>
          <div class="info">
            <strong>Missing Items:</strong><br/>
            ${review.missingItems ? review.missingItems.replace(/\\n/g, '<br/>') : 'None specified.'}<br/><br/>
            <strong>Cost Observations:</strong><br/>
            ${review.costObservation ? review.costObservation.replace(/\\n/g, '<br/>') : 'None specified.'}
          </div>
        </div>

        <div class="section" style="page-break-inside: avoid;">
          <h2>Review Notes</h2>
          <p style="font-size: 14px; color: #475569; white-space: pre-wrap;">${review.reviewNotes || 'No additional notes.'}</p>
        </div>

        <div style="margin-top: 50px; border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 12px; color: #94A3B8; text-align: center;">
          This report is strictly for advisory purposes. Buildogram recommends verifying measurements on-site.
        </div>
      </body>
      </html>
    `;

    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
  } catch (error) {
    console.error('Export error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
