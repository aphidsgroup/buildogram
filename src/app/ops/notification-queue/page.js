'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotificationQueuePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending_review');
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/ops/notification-queue?status=${statusFilter}`);
      const data = await res.json();
      if (data.success) {
        setItems(data.items);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [statusFilter]);

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleAction = async (id, action) => {
    if (!confirm(`Are you sure you want to ${action} this message?`)) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/ops/notification-queue/${id}/${action}`, { method: 'POST' });
      const data = await res.json();
      
      if (data.success) {
        showToast(`Successfully ${action}ed.`);
        loadData();
      } else {
        showToast(data.error || 'Action failed', 'error');
        // Even if send fails, we reload to see the 'failed' status
        if (action === 'send') loadData();
      }
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending_review': return <span className="badge badge-yellow">Pending Review</span>;
      case 'approved': return <span className="badge badge-blue">Approved (Awaiting Send)</span>;
      case 'sent': return <span className="badge badge-green">Sent</span>;
      case 'cancelled': return <span className="badge badge-gray">Cancelled</span>;
      case 'failed': return <span className="badge badge-red">Failed</span>;
      default: return <span className="badge badge-gray">{status}</span>;
    }
  };

  return (
    <div className="pb-20">
      <div className="page-header mb-8">
        <h1>WhatsApp Approval Queue</h1>
        <p className="text-muted mt-2">Review, approve, and dispatch automated notification drafts.</p>
      </div>

      <div className="flex gap-4 mb-6">
        {['pending_review', 'approved', 'sent', 'failed', 'cancelled', 'all'].map(s => (
          <button
            key={s}
            className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setStatusFilter(s)}
          >
            {s.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex-center py-12"><div className="spinner" /></div>
      ) : items.length === 0 ? (
        <div className="card p-8 text-center text-slate-500">
          No items found in this queue state.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map(item => (
            <div key={item.id} className="card p-6" style={{ borderLeft: item.status === 'pending_review' ? '4px solid #f59e0b' : item.status === 'approved' ? '4px solid #3b82f6' : item.status === 'failed' ? '4px solid #ef4444' : '4px solid #e2e8f0' }}>
              <div className="flex-between mb-4 pb-4" style={{ borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <div className="flex gap-2 items-center mb-1">
                    {getStatusBadge(item.status)}
                    <span className="text-xs text-slate-500">{new Date(item.created_at).toLocaleString('en-IN')}</span>
                  </div>
                  <h3 className="font-bold">{item.rule_name || item.event_type}</h3>
                  <div className="text-sm text-slate-600 mt-1">
                    To: <strong>{item.recipient_name}</strong> ({item.recipient_phone}) 
                    {item.lead_id && <Link href="/ops/leads" className="ml-2 text-indigo-600 underline">View Lead</Link>}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 align-end text-right">
                  {item.status === 'pending_review' && (
                    <>
                      <button className="btn btn-sm btn-primary" style={{ background: '#3b82f6' }} onClick={() => handleAction(item.id, 'approve')} disabled={actionLoading === item.id}>✅ Approve</button>
                      <button className="btn btn-sm btn-outline" onClick={() => handleAction(item.id, 'cancel')} disabled={actionLoading === item.id}>🚫 Cancel</button>
                    </>
                  )}
                  {item.status === 'approved' && (
                    <>
                      <button className="btn btn-sm" style={{ background: '#10b981', color: 'white' }} onClick={() => handleAction(item.id, 'send')} disabled={actionLoading === item.id}>🚀 Send via API</button>
                      <button className="btn btn-sm btn-outline" onClick={() => handleAction(item.id, 'cancel')} disabled={actionLoading === item.id}>🚫 Cancel</button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Rendered Message</h4>
                  <div className="p-3 rounded-lg" style={{ background: '#dcf8c6', color: '#075e54', fontSize: '13px', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                    {item.rendered_message}
                  </div>
                  {item.template_name && <div className="text-xs text-slate-400 mt-2">Template: {item.template_name}</div>}
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Evaluation Metadata</h4>
                  <div className="p-3 rounded-lg bg-slate-50 text-xs text-slate-700" style={{ whiteSpace: 'pre-wrap' }}>
                    <strong>Preference Check:</strong> {item.preference_check_result?.reason || 'Passed'}<br/>
                    {item.error_message && (
                      <div className="mt-2 text-red-600">
                        <strong>API Error:</strong> {item.error_message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: toast.type === 'error' ? '#ef4444' : '#10b981', color: 'white', padding: '16px 20px',
          borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          animation: 'slideUp 0.3s ease',
        }}>
          <div style={{ fontWeight: 700, fontSize: '14px' }}>{toast.message}</div>
        </div>
      )}
    </div>
  );
}
