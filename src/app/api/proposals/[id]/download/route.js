import { NextResponse } from 'next/server';
import { proposals } from '@/lib/storageProvider';
import { logAudit } from '@/lib/auditService';

export async function GET(req, { params }) {
  const { id } = params;
  
  try {
    const allProposals = await proposals.getAll({ id });
    const proposal = allProposals.find(p => p.id === id);

    if (!proposal) {
      return new NextResponse('Proposal Not Found', { status: 404 });
    }

    await logAudit('Proposal Exported', 'Proposal', id, {}, 'System', req);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Proposal - ${proposal.title}</title>
        <style>
          body { font-family: 'Inter', sans-serif; color: #0F172A; padding: 40px; max-width: 800px; margin: auto; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #E2E8F0; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: 900; color: #FC6E20; }
          h1 { font-size: 28px; margin: 0 0 10px 0; }
          .meta { font-size: 14px; color: #64748B; margin-bottom: 30px; }
          .section { margin-bottom: 30px; }
          .section h2 { font-size: 18px; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px; margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #E2E8F0; padding: 12px; text-align: left; font-size: 14px; }
          th { background: #F8FAFC; }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
          .print-btn { background: #0F172A; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; float: right; }
        </style>
      </head>
      <body>
        <button class="print-btn" onclick="window.print()">Save as PDF</button>
        <div class="header">
          <div>
            <div class="logo">Buildogram</div>
            <div style="font-size: 12px; color: #64748B; margin-top: 4px;">Engineer-Led Construction Partner</div>
          </div>
          <div style="text-align: right; font-size: 14px; color: #64748B;">
            Date: ${new Date().toLocaleDateString('en-IN')}<br/>
            Ref: PRO-${id.split('-')[0].toUpperCase()}
          </div>
        </div>

        <h1>${proposal.title}</h1>
        <div class="meta">
          <strong>Type:</strong> <span style="text-transform: capitalize;">${proposal.proposalType?.replace('_', ' ')}</span><br/>
          <strong>Status:</strong> <span style="text-transform: capitalize;">${proposal.proposalStatus}</span>
        </div>

        <div class="section">
          <h2>Summary</h2>
          <p>${proposal.summary || 'No summary provided.'}</p>
        </div>

        <div class="section">
          <h2>Scope of Work</h2>
          <p>${proposal.scopeOfWork || 'Detailed scope of work to be discussed.'}</p>
        </div>

        <div class="section">
          <h2>Estimated Value</h2>
          <div style="font-size: 24px; font-weight: 700; color: #10B981;">
            ${proposal.estimatedValue || 'To Be Determined'}
          </div>
        </div>

        <div class="section" style="page-break-inside: avoid;">
          <h2>Terms & Exclusions</h2>
          <p><strong>Timeline:</strong> ${proposal.timeline || 'TBD'}</p>
          <p><strong>Payment Terms:</strong> ${proposal.paymentTerms || 'Standard'}</p>
          <p><strong>Exclusions:</strong> ${proposal.exclusions || 'None specified'}</p>
        </div>

        <div style="margin-top: 50px; border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 12px; color: #94A3B8; text-align: center;">
          This is an electronically generated proposal. For any queries, please contact operations@buildogram.in.
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
