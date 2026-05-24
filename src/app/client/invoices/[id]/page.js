'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/Navbar';
import Link from 'next/link';

export default function ClientInvoiceDetail({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState('');

  const load = () => fetch(`/api/client/invoices/${id}`).then(r => r.json()).then(d => {
    if (d.success) setInvoice(d.invoice);
    setLoading(false);
  });

  useEffect(() => { load(); }, [id]);

  const handlePayment = async () => {
    setPayLoading(true);
    setPayError('');
    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice_id: id })
      });
      const data = await res.json();
      
      if (data.error) {
        setPayError(data.error);
        setPayLoading(false);
        return;
      }

      if (data.success && data.razorpay_order_id) {
        // Load Razorpay Script dynamically
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onerror = () => { setPayError('Razorpay SDK failed to load'); setPayLoading(false); };
        script.onload = () => {
          const options = {
            key: data.razorpay_key_id,
            amount: Math.round(invoice.amount_due * 100),
            currency: 'INR',
            name: 'Buildogram',
            description: `Payment for Invoice ${invoice.invoice_number}`,
            order_id: data.razorpay_order_id,
            handler: async function (response) {
              const verifyRes = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(response)
              });
              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                alert('Payment Successful!');
                load();
              } else {
                alert('Payment verification failed. Please contact support.');
              }
            },
            prefill: {
              name: invoice.customer_name,
              email: invoice.customer_email || '',
              contact: invoice.customer_phone || ''
            },
            theme: { color: '#4f46e5' }
          };
          const rzp = new window.Razorpay(options);
          rzp.on('payment.failed', function (response) {
            alert('Payment failed: ' + response.error.description);
          });
          rzp.open();
          setPayLoading(false);
        };
        document.body.appendChild(script);
      }
    } catch (e) {
      setPayError('An unexpected error occurred.');
      setPayLoading(false);
    }
  };

  if (loading) return <div className="p-12 text-center"><div className="spinner" /></div>;
  if (!invoice) return <div className="p-12 text-center text-red-500">Invoice not found.</div>;

  return (
    <div className="bg-gray" style={{ minHeight: '100vh' }}>
      <Navbar role="client" />
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

          {payError && (
            <div className="mb-6 p-4" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '8px' }}>
              {payError === 'Online payments are currently disabled' 
                ? 'Online payment is not enabled yet. Please contact Buildogram or pay via bank transfer.' 
                : payError}
            </div>
          )}

          <div className="flex gap-4">
            {Number(invoice.amount_due) > 0 && (
              <button onClick={handlePayment} disabled={payLoading} className="btn btn-primary" style={{ flex: '1', padding: '14px', fontSize: '16px' }}>
                {payLoading ? 'Processing...' : 'Pay Now Securely'}
              </button>
            )}
            <Link href={`/client/invoices/${invoice.id}/print`} target="_blank" className="btn btn-outline" style={{ flex: '1', padding: '14px', fontSize: '16px', textAlign: 'center' }}>
              Download PDF / Print
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
