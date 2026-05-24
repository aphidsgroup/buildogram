'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ClientInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch('/api/client/invoices');
        const data = await res.json();
        if (data.success) {
          setInvoices(data.records);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'issued': return <span className="badge badge-blue">Issued (Unpaid)</span>;
      case 'paid': return <span className="badge badge-green">Paid</span>;
      case 'partially_paid': return <span className="badge badge-yellow">Partial Payment</span>;
      default: return <span className="badge badge-gray">{status}</span>;
    }
  };

  return (
    <div className="pb-20 max-w-4xl mx-auto">
      <div className="page-header mb-8">
        <h1>My Invoices</h1>
        <p className="text-muted mt-2">View and download your finalized billing records for Buildogram services.</p>
      </div>

      <div className="card" style={{ padding: '0', overflowX: 'auto' }}>
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading invoices...</div>
        ) : invoices.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🧾</div>
            <h3 className="font-bold text-lg text-slate-700">No Invoices Found</h3>
            <p>You have no active or past invoices linked to your account at this time.</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Category</th>
                <th>Total</th>
                <th>Due</th>
                <th>Status</th>
                <th>Issue Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id}>
                  <td className="font-bold text-indigo-600">{inv.invoice_number}</td>
                  <td><span className="badge badge-gray">{inv.invoice_category.replace('_', ' ')}</span></td>
                  <td className="font-bold">₹{Number(inv.total_amount).toLocaleString('en-IN')}</td>
                  <td className="font-bold text-red-600">
                    {Number(inv.amount_due) > 0 ? `₹${Number(inv.amount_due).toLocaleString('en-IN')}` : '-'}
                  </td>
                  <td>{getStatusBadge(inv.status)}</td>
                  <td>{inv.issue_date ? new Date(inv.issue_date).toLocaleDateString('en-IN') : '-'}</td>
                  <td>
                    <Link href={`/client/invoices/${inv.id}/print`} target="_blank" className="btn btn-sm btn-outline text-xs">
                      View / PDF
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
