'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/app/Navbar';

export default function OpsPayments() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ops/payments').then(r => r.json()).then(d => {
      setOrders(d.orders || []);
      setLoading(false);
    });
  }, []);

  const fmt = n => n ? '₹' + n.toLocaleString('en-IN') : '—';
  
  return (
    <div className="bg-gray">
      <Navbar role="ops_admin" />
      <div className="container">
        <div className="flex-between mb-6">
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Payment Gateway Orders</h1>
            <p className="text-muted mt-1">Track online payment links and statuses</p>
          </div>
        </div>

        <div className="card" style={{ padding: 0 }}>
          {loading ? (
            <div style={{ padding: '24px', textAlign: 'center' }}><div className="spinner" /></div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Client</th>
                    <th>Provider</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: '500' }}>{o.invoice_number}</td>
                      <td>{o.client_name || <span className="text-muted">Unknown</span>}</td>
                      <td><span className="badge badge-gray">{o.provider}</span></td>
                      <td style={{ fontWeight: '600' }}>{fmt(o.amount)}</td>
                      <td>
                        <span className={`badge ${o.status === 'paid' ? 'badge-green' : o.status === 'created' ? 'badge-blue' : o.status === 'failed' ? 'badge-red' : 'badge-yellow'}`}>
                          {o.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="text-muted text-sm">{new Date(o.created_at).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                  {!orders.length && (
                    <tr>
                      <td colSpan={6}>
                        <div className="empty-state">
                          <div className="empty-icon">💳</div>
                          <p>No online payments initiated yet.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
