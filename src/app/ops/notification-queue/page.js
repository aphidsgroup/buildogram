'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const maskPhone = (phone) => {
  if (!phone) return 'N/A';
  const str = String(phone);
  if (str.length < 10) return str;
  return str.substring(0, 4) + '****' + str.substring(str.length - 3);
};

export default function NotificationQueuePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending_review');
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Detail Modal State
  const [selectedItem, setSelectedItem] = useState(null);

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
    if (action === 'cancel' && !confirm(`Are you sure you want to cancel this message?`)) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/ops/notification-queue/${id}/${action}`, { method: 'POST' });
      const data = await res.json();
      
      if (data.success) {
        showToast(action === 'send' ? 'Successfully Sent/Retried!' : `Successfully ${action}ed.`);
        if (selectedItem?.id === id) setSelectedItem(data.item); // Update modal if open
        loadData();
      } else {
        showToast(data.error || 'Action failed', 'error');
        if (action === 'send') loadData(); // Reload to see 'failed' status
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
      <div className="page-header mb-8 flex-between">
        <div>
          <h1>Message Center</h1>
          <p className="text-muted mt-2">Delivery log, approval queue, and WhatsApp audit history.</p>
        </div>
        <div>
          <a href="/api/ops/reports/notifications.csv" className="btn btn-outline">📥 Export CSV</a>
        </div>
      </div>

      <div className="flex gap-4 mb-6" style={{ overflowX: 'auto', paddingBottom: '8px' }}>
        {['pending_review', 'approved', 'sent', 'failed', 'cancelled', 'all'].map(s => (
          <button
            key={s}
            className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-outline'}`}
            style={{ whiteSpace: 'nowrap' }}
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
            <div key={item.id} className="card p-4" style={{ borderLeft: item.status === 'pending_review' ? '4px solid #f59e0b' : item.status === 'approved' ? '4px solid #3b82f6' : item.status === 'failed' ? '4px solid #ef4444' : '4px solid #e2e8f0' }}>
              <div className="flex-between">
                <div>
                  <div className="flex gap-2 items-center mb-1">
                    {getStatusBadge(item.status)}
                    <span className="text-xs text-slate-500">{new Date(item.created_at).toLocaleString('en-IN')}</span>
                  </div>
                  <h3 className="font-bold text-sm">{item.rule_name || item.event_type}</h3>
                  <div className="text-sm text-slate-600 mt-1">
                    To: <strong>{item.recipient_name || 'Unknown'}</strong> ({maskPhone(item.recipient_phone)}) 
                    {item.lead_id && <Link href="/ops/leads" className="ml-2 text-indigo-600 hover:underline">View Lead</Link>}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 align-end text-right">
                  {item.status === 'pending_review' && (
                    <div className="flex gap-2">
                      <button className="btn btn-sm" style={{ background: '#3b82f6', color: 'white' }} onClick={() => handleAction(item.id, 'approve')} disabled={actionLoading === item.id}>✅ Approve</button>
                      <button className="btn btn-sm btn-outline" onClick={() => handleAction(item.id, 'cancel')} disabled={actionLoading === item.id}>🚫 Cancel</button>
                    </div>
                  )}
                  {item.status === 'approved' && (
                    <div className="flex gap-2">
                      <button className="btn btn-sm" style={{ background: '#10b981', color: 'white' }} onClick={() => handleAction(item.id, 'send')} disabled={actionLoading === item.id}>🚀 Send via API</button>
                    </div>
                  )}
                  {item.status === 'failed' && (
                    <div className="flex gap-2">
                      <button className="btn btn-sm" style={{ background: '#f59e0b', color: 'white' }} onClick={() => handleAction(item.id, 'send')} disabled={actionLoading === item.id}>🔄 Retry Send</button>
                    </div>
                  )}
                  <button className="btn btn-sm btn-ghost text-indigo-600 mt-2" onClick={() => setSelectedItem(item)}>
                    📄 View Details & Audit Log →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ background: 'white', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}>
            <div className="flex-between mb-6">
              <h2 className="text-xl font-bold">Message Audit Record</h2>
              <button className="btn btn-ghost" onClick={() => setSelectedItem(null)}>✕</button>
            </div>

            <div className="grid-2 gap-6 mb-6">
              <div>
                <h4 className="text-xs font-bold text-slate-500 mb-1 uppercase">Recipient</h4>
                <div className="font-medium">{selectedItem.recipient_name || 'N/A'}</div>
                <div className="text-sm text-slate-600">{selectedItem.recipient_phone}</div>
                {selectedItem.lead_id && <Link href="/ops/leads" className="text-indigo-600 text-sm hover:underline mt-1 inline-block">Go to CRM Lead</Link>}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 mb-1 uppercase">Status</h4>
                <div>{getStatusBadge(selectedItem.status)}</div>
                <div className="text-xs text-slate-500 mt-1">Channel: {selectedItem.channel}</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase">Rendered Message Payload</h4>
              <div className="p-4 rounded-lg" style={{ background: '#dcf8c6', color: '#075e54', fontSize: '14px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', border: '1px solid #b2e2a8' }}>
                {selectedItem.rendered_message}
              </div>
            </div>

            <div className="mb-6 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase">System Checks & Errors</h4>
              <div className="text-sm">
                <strong>Preference Engine:</strong> {selectedItem.preference_check_result?.reason || 'Passed'}<br/>
                {selectedItem.error_message && (
                  <div className="mt-2 text-red-600 p-2 bg-red-50 rounded border border-red-100">
                    <strong>Provider Error:</strong> {selectedItem.error_message}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase">Timeline Audit</h4>
              <table className="w-100 text-sm text-left">
                <tbody>
                  <tr>
                    <td className="py-2 border-b font-medium text-slate-600">Draft Created</td>
                    <td className="py-2 border-b">{new Date(selectedItem.created_at).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 border-b font-medium text-slate-600">Approved At</td>
                    <td className="py-2 border-b">{selectedItem.approved_at ? new Date(selectedItem.approved_at).toLocaleString('en-IN') : '-'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 border-b font-medium text-slate-600">Sent via API</td>
                    <td className="py-2 border-b">{selectedItem.sent_at ? new Date(selectedItem.sent_at).toLocaleString('en-IN') : '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100">
              {selectedItem.status === 'failed' && (
                <button className="btn btn-primary" style={{ background: '#f59e0b', color: 'white' }} onClick={() => handleAction(selectedItem.id, 'send')} disabled={actionLoading === selectedItem.id}>
                  {actionLoading === selectedItem.id ? 'Retrying...' : '🔄 Retry Sending'}
                </button>
              )}
              <button className="btn btn-outline" onClick={() => setSelectedItem(null)}>Close</button>
            </div>
          </div>
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
