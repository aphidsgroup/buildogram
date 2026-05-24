'use client';
import { useEffect, useState } from 'react';

export default function ClientInvoicePrintPage({ params }) {
  const { id } = params;
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        const res = await fetch(`/api/client/invoices/${id}`);
        const data = await res.json();
        if (data.success) {
          setInvoice(data.invoice);
        } else {
          setError(data.error || 'Failed to load invoice');
        }
      } catch (e) {
        setError('Network Error');
      } finally {
        setLoading(false);
      }
    };
    loadInvoice();
  }, [id]);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Invoice...</div>;
  if (error || !invoice) return <div style={{ padding: '40px', textAlign: 'center', color: 'red', fontWeight: 'bold' }}>{error || 'Not Found'}</div>;

  const total = Number(invoice.total_amount) || 0;
  const paid = Number(invoice.amount_paid) || 0;
  const due = Number(invoice.amount_due) || 0;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-container { box-shadow: none !important; border: none !important; padding: 0 !important; }
        }
      `}} />

      <div className="no-print" style={{ maxWidth: '800px', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button onClick={() => window.close()} style={{ background: '#e2e8f0', color: '#475569', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Close
        </button>
        <button onClick={() => window.print()} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          🖨️ Print / Save PDF
        </button>
      </div>

      <div className="print-container" style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', color: '#1e293b', fontWeight: 900, letterSpacing: '-0.5px' }}>BUILDOGRAM</h1>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>The Smart Construction Ecosystem</p>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '12px' }}>Chennai, Tamil Nadu, India</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ margin: 0, fontSize: '24px', color: '#4f46e5', fontWeight: 800 }}>INVOICE</h2>
            <p style={{ margin: '4px 0 0 0', color: '#475569', fontSize: '14px', fontWeight: 'bold' }}>#{invoice.invoice_number}</p>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '12px' }}>Date: {invoice.issue_date ? new Date(invoice.issue_date).toLocaleDateString('en-IN') : '-'}</p>
            {invoice.due_date && <p style={{ margin: '4px 0 0 0', color: '#ef4444', fontSize: '12px', fontWeight: 'bold' }}>Due: {new Date(invoice.due_date).toLocaleDateString('en-IN')}</p>}
          </div>
        </div>

        {/* Customer Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div style={{ width: '45%' }}>
            <h3 style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Bill To</h3>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}>{invoice.customer_name}</p>
            {invoice.customer_phone && <p style={{ margin: '4px 0 0 0', color: '#475569', fontSize: '14px' }}>Phone: {invoice.customer_phone}</p>}
            {invoice.customer_email && <p style={{ margin: '4px 0 0 0', color: '#475569', fontSize: '14px' }}>Email: {invoice.customer_email}</p>}
            {invoice.billing_address && <p style={{ margin: '4px 0 0 0', color: '#475569', fontSize: '14px', whiteSpace: 'pre-wrap' }}>{invoice.billing_address}</p>}
          </div>
          <div style={{ width: '45%', textAlign: 'right' }}>
            <h3 style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Status</h3>
            <span style={{ 
              display: 'inline-block', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase',
              background: invoice.status === 'paid' ? '#dcfce7' : invoice.status === 'issued' ? '#dbeafe' : '#f1f5f9',
              color: invoice.status === 'paid' ? '#166534' : invoice.status === 'issued' ? '#1e40af' : '#475569'
            }}>
              {invoice.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Line Items */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '12px', color: '#475569', fontSize: '13px', textTransform: 'uppercase' }}>Description</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#475569', fontSize: '13px', textTransform: 'uppercase' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '16px 12px', borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                <strong style={{ display: 'block', marginBottom: '4px' }}>{invoice.invoice_category.replace('_', ' ')} Service</strong>
                <span style={{ fontSize: '13px', color: '#64748b' }}>As agreed per service terms.</span>
              </td>
              <td style={{ textAlign: 'right', padding: '16px 12px', borderBottom: '1px solid #f1f5f9', color: '#1e293b', fontWeight: 'bold' }}>
                ₹{Number(invoice.subtotal).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
          <div style={{ width: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: '#475569', borderBottom: '1px solid #f1f5f9' }}>
              <span>Subtotal:</span>
              <span>₹{Number(invoice.subtotal).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            {Number(invoice.tax_amount) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: '#475569', borderBottom: '1px solid #f1f5f9' }}>
                <span>Tax:</span>
                <span>₹{Number(invoice.tax_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            {Number(invoice.discount_amount) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: '#10b981', borderBottom: '1px solid #f1f5f9' }}>
                <span>Discount:</span>
                <span>- ₹{Number(invoice.discount_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', color: '#1e293b', fontWeight: 'bold', fontSize: '18px' }}>
              <span>Total:</span>
              <span>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: '#475569', borderBottom: '1px solid #f1f5f9' }}>
              <span>Amount Paid:</span>
              <span>₹{paid.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', color: '#ef4444', fontWeight: 'bold', fontSize: '18px', borderBottom: '2px solid #e2e8f0' }}>
              <span>Amount Due:</span>
              <span>₹{due.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '6px' }}>
          {invoice.notes && (
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#475569', textTransform: 'uppercase' }}>Customer Notes</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>{invoice.notes}</p>
            </div>
          )}
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#475569', textTransform: 'uppercase' }}>Terms & Conditions</h4>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>1. Payment is due upon receipt unless otherwise agreed.<br/>2. If you have any questions concerning this invoice, please contact your project manager.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
