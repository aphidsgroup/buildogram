'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AccountingDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/ops/accounting/ledger')
      .then(r => r.json())
      .then(d => {
        if (d.success) setData(d);
        else setError(d.error || 'Failed to load ledger');
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center"><div className="spinner mx-auto"></div></div>;
  if (error) return <div className="p-8 text-error">{error}</div>;

  return (
    <div className="container">
      <div className="page-header flex-between">
        <div>
          <h1>Accounting & GST</h1>
          <p className="text-muted">Double-entry ledger & tax liabilities</p>
        </div>
        <a href="/api/ops/accounting/export" className="btn btn-outline" download>
          ⬇️ Export for Tally/Zoho
        </a>
      </div>

      {data.balances && (
        <div className="grid-3 mb-8">
          <div className="stat-card">
            <div className="stat-label">Total Debits</div>
            <div className="stat-value text-success">₹{Number(data.balances.total_debits || 0).toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Credits</div>
            <div className="stat-value text-error">₹{Number(data.balances.total_credits || 0).toLocaleString()}</div>
          </div>
          <div className="stat-card" style={{ background: 'rgba(245,158,11,0.05)' }}>
            <div className="stat-label">Total GST Liabilities (C+S+I)</div>
            <div className="stat-value text-warning">
              ₹{(Number(data.gstSummary?.total_cgst || 0) + Number(data.gstSummary?.total_sgst || 0) + Number(data.gstSummary?.total_igst || 0)).toLocaleString()}
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <h3>General Ledger</h3>
        <div className="table-wrap mt-4">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Account</th>
                <th>Description</th>
                <th>Debit</th>
                <th>Credit</th>
              </tr>
            </thead>
            <tbody>
              {data.ledger?.length === 0 ? (
                <tr><td colSpan="6" className="text-center text-muted">No ledger entries found.</td></tr>
              ) : (
                data.ledger?.map(l => (
                  <tr key={l.id}>
                    <td>{new Date(l.transaction_date).toLocaleDateString()}</td>
                    <td><span className="badge badge-gray">{l.reference_type}</span></td>
                    <td className="font-semibold">{l.account_name}</td>
                    <td className="text-sm text-muted">{l.description || '-'}</td>
                    <td className="text-success">{Number(l.debit) > 0 ? `₹${Number(l.debit).toLocaleString()}` : '-'}</td>
                    <td className="text-error">{Number(l.credit) > 0 ? `₹${Number(l.credit).toLocaleString()}` : '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
