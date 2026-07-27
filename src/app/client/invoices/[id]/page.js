'use client';
import { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';

export default function ClientInvoiceDetail({ params }) {
  const { id } = use(params);
  const [invoice, setInvoice] = useState(null);
  const [onlinePayments, setOnlinePayments] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => fetch(`/api/client/invoices/${id}`).then(r => r.json()).then(d => {
    if (d.success) {
      setInvoice(d.invoice);
      setOnlinePayments(Boolean(d.features?.onlinePayments));
    }
    setLoading(false);
  }), [id]);

  useEffect(() => { void load(); }, [load]);

  if (loading) return <div className="p-12 text-center"><div className="spinner" /></div>;
  if (!invoice) return <div className="p-12 text-center text-red-500">Invoice not found.</div>;

  return (
    <div className="bg-gray" style={{ minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '800px', padding: '40px 20px' }}>
        
        <Link href="/client/invoices" className="btn btn-sm btn-outline mb-6">← Back to Invoices</Link>
        
        <div className="card shadow-lg" style={{ borderTop: '4px solid #4f46e5' }}>
          <div className="flex-between mb-8 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>Invoice {invoice.invoice_number}</h1>
              <p className="text-muted mt-1">Issued on {new Date(invoice.issue_date).toLocaleDateString('en-IN')}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', color: 'var(--text)' }}>Amount Due</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: Number(invoice.amount_due) > 0 ? '#dc2626' : '#16a34a' }}>
                ₹{Number(invoice.amount_due).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="mb-8 p-4 bg-gray-50 rounded" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: '600' }}>Summary</h3>
            <div className="flex-between mb-2"><span>Total Amount</span><span style={{ fontWeight: '500' }}>₹{Number(invoice.total_amount).toLocaleString('en-IN')}</span></div>
            <div className="flex-between mb-2"><span>Amount Paid</span><span style={{ fontWeight: '500', color: '#16a34a' }}>₹{Number(invoice.amount_paid).toLocaleString('en-IN')}</span></div>
            <div className="flex-between pt-2 mt-2" style={{ borderTop: '1px solid #cbd5e1' }}>
              <span style={{ fontWeight: '600' }}>Remaining Balance</span>
              <span style={{ fontWeight: '600' }}>₹{Number(invoice.amount_due).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {!onlinePayments && Number(invoice.amount_due) > 0 && (
            <div className="mb-6 p-4" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '8px' }}>
              Online payment is not currently enabled. Please use the payment instructions supplied with your invoice or contact Buildogram.
            </div>
          )}

          <div className="flex gap-4">
            <Link href={`/client/invoices/${invoice.id}/print`} target="_blank" className="btn btn-outline" style={{ flex: '1', padding: '14px', fontSize: '16px', textAlign: 'center' }}>
              Download PDF / Print
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
