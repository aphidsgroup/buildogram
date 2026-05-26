import { NextResponse } from 'next/server';
import { materialQuoteRequests } from '@/lib/storageProvider';
import { logAudit } from '@/lib/auditService';

export async function GET(req, { params }) {
  const { id } = params;
  
  try {
    const allQuotes = await materialQuoteRequests.getAll({ id });
    const quote = allQuotes.find(q => q.id === id);

    if (!quote) {
      return new NextResponse('Material Quote Not Found', { status: 404 });
    }

    await logAudit('Material Quote Exported', 'MaterialQuoteRequest', id, {}, 'System', req);

    let items = [];
    try { if (quote.materialItems) items = JSON.parse(quote.materialItems); } catch(e){}

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Material Quote Summary - ${id.split('-')[0].toUpperCase()}</title>
        <style>
          body { font-family: 'Inter', sans-serif; color: #0F172A; padding: 40px; max-width: 800px; margin: auto; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #E2E8F0; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: 900; color: #FC6E20; }
          h1 { font-size: 24px; margin: 0 0 10px 0; }
          .section { margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th, td { border: 1px solid #E2E8F0; padding: 12px; text-align: left; font-size: 13px; }
          th { background: #F8FAFC; color: #475569; }
          @media print { body { padding: 0; } button { display: none; } }
          .print-btn { background: #0F172A; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; float: right; }
        </style>
      </head>
      <body>
        <button class="print-btn" onclick="window.print()">Save as PDF</button>
        <div class="header">
          <div>
            <div class="logo">Buildogram</div>
            <div style="font-size: 12px; color: #64748B; margin-top: 4px;">Material Sourcing Division</div>
          </div>
          <div style="text-align: right; font-size: 14px; color: #64748B;">
            Date: ${new Date().toLocaleDateString('en-IN')}<br/>
            Ref: MAT-${id.split('-')[0].toUpperCase()}
          </div>
        </div>

        <h1>Material Sourcing Summary</h1>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; background: #F8FAFC; padding: 20px; border-radius: 8px;">
          <div><strong>Category:</strong> <span style="text-transform: capitalize;">${quote.materialCategory || 'General'}</span></div>
          <div><strong>Location:</strong> ${quote.projectLocation || 'N/A'}</div>
          <div><strong>Delivery Timeline:</strong> ${quote.deliveryTimeline || 'Standard'}</div>
          <div><strong>Status:</strong> <span style="text-transform: capitalize;">${quote.quoteStatus}</span></div>
        </div>

        <div class="section">
          <h2 style="font-size: 16px; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px; margin-bottom: 16px;">Requested Items</h2>
          ${items.length === 0 ? '<p>No specific items listed.</p>' : `
            <table>
              <thead><tr><th>Item</th><th>Quantity</th><th>Unit</th></tr></thead>
              <tbody>
                ${items.map(i => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>${i.unit}</td></tr>`).join('')}
              </tbody>
            </table>
          `}
        </div>

        <div class="section" style="page-break-inside: avoid;">
          <h2 style="font-size: 16px; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px; margin-bottom: 16px;">Procurement Notes</h2>
          <ul style="font-size: 14px; color: #475569; line-height: 1.6;">
            <li>Invoice Required: ${quote.invoiceRequired ? 'Yes' : 'No'}</li>
            <li>Delivery Proof Required: ${quote.deliveryProofRequired ? 'Yes' : 'No'}</li>
            <li>Comparison Requested: ${quote.supplierComparisonRequired ? 'Yes' : 'No'}</li>
          </ul>
        </div>

        <div style="margin-top: 50px; border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 12px; color: #94A3B8; text-align: center;">
          Rates and availability are subject to market changes. Final invoice will reflect actual delivery quantities.
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
