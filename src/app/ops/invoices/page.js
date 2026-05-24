'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OpsInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [totals, setTotals] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: null, customer_name: '', customer_phone: '', customer_email: '', billing_address: '',
    invoice_category: 'boq_audit', subtotal: 0, tax_amount: 0, discount_amount: 0,
    amount_paid: 0, status: 'draft', issue_date: new Date().toISOString().split('T')[0],
    due_date: '', payment_mode: '', notes: ''
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/ops/invoices?status=${statusFilter}`);
      const data = await res.json();
      if (data.success) {
        setInvoices(data.records);
        setTotals(data.totals || {});
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    loadData(); 
    
    // Check for prefill query params from Revenue page
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'create') {
      setForm(prev => ({
        ...prev,
        revenue_record_id: params.get('rev_id') || null,
        customer_name: params.get('name') || '',
        invoice_category: params.get('cat') || 'other',
        subtotal: params.get('sub') || 0,
        amount_paid: params.get('paid') || 0,
      }));
      setShowModal(true);
      // Clean up URL to avoid re-triggering on refresh
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [statusFilter]);

  const openForm = (inv = null) => {
    if (inv) {
      setForm({
        id: inv.id, customer_name: inv.customer_name, customer_phone: inv.customer_phone || '', 
        customer_email: inv.customer_email || '', billing_address: inv.billing_address || '',
        invoice_category: inv.invoice_category, subtotal: inv.subtotal, tax_amount: inv.tax_amount, 
        discount_amount: inv.discount_amount, amount_paid: inv.amount_paid, status: inv.status, 
        issue_date: inv.issue_date ? inv.issue_date.split('T')[0] : '', 
        due_date: inv.due_date ? inv.due_date.split('T')[0] : '', 
        payment_mode: inv.payment_mode || '', notes: inv.notes || ''
      });
    } else {
      setForm({
        id: null, customer_name: '', customer_phone: '', customer_email: '', billing_address: '',
        invoice_category: 'boq_audit', subtotal: 0, tax_amount: 0, discount_amount: 0,
        amount_paid: 0, status: 'draft', issue_date: new Date().toISOString().split('T')[0],
        due_date: '', payment_mode: '', notes: ''
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = form.id ? 'PUT' : 'POST';
      const url = form.id ? `/api/ops/invoices/${form.id}` : `/api/ops/invoices`;
      
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        loadData();
      } else {
        alert(data.error || 'Failed to save');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const calcTotal = () => {
    return (Number(form.subtotal) + Number(form.tax_amount)) - Number(form.discount_amount);
  };
  const calcDue = () => {
    return Math.max(0, calcTotal() - Number(form.amount_paid));
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'draft': return <span className="badge badge-gray">Draft</span>;
      case 'issued': return <span className="badge badge-blue">Issued (Unpaid)</span>;
      case 'paid': return <span className="badge badge-green">Paid</span>;
      case 'partially_paid': return <span className="badge badge-yellow">Partial Payment</span>;
      case 'cancelled': return <span className="badge badge-red">Cancelled</span>;
      default: return <span className="badge badge-gray">{status}</span>;
    }
  };

  return (
    <div className="pb-20">
      <div className="page-header mb-8 flex-between">
        <div>
          <h1>Invoice Management</h1>
          <p className="text-muted mt-2">Generate and track internal invoices for services rendered.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openForm()}>+ Create Invoice</button>
      </div>

      <div className="grid-3 mb-8 gap-4">
        <div className="card p-6 border border-slate-200">
          <div className="text-sm font-bold text-slate-500 mb-2 uppercase">Total Invoiced</div>
          <div className="text-3xl font-bold text-slate-800">₹{Number(totals.total_invoiced || 0).toLocaleString('en-IN')}</div>
        </div>
        <div className="card p-6 border border-green-200 bg-green-50">
          <div className="text-sm font-bold text-green-700 mb-2 uppercase">Total Paid</div>
          <div className="text-3xl font-bold text-green-800">₹{Number(totals.total_paid || 0).toLocaleString('en-IN')}</div>
        </div>
        <div className="card p-6 border border-red-200 bg-red-50">
          <div className="text-sm font-bold text-red-700 mb-2 uppercase">Total Due</div>
          <div className="text-3xl font-bold text-red-800">₹{Number(totals.total_due || 0).toLocaleString('en-IN')}</div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        {['all', 'draft', 'issued', 'partially_paid', 'paid', 'cancelled'].map(s => (
          <button key={s} className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-outline'}`} onClick={() => setStatusFilter(s)}>
            {s.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: '0', overflowX: 'auto' }}>
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading...</div>
        ) : invoices.length === 0 ? (
          <div className="p-12 text-center text-slate-400">No invoices found.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Customer</th>
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
                  <td>
                    <div className="font-medium">{inv.customer_name}</div>
                    {inv.customer_phone && <div className="text-xs text-slate-500">{inv.customer_phone}</div>}
                  </td>
                  <td><span className="badge badge-gray">{inv.invoice_category.replace('_', ' ')}</span></td>
                  <td className="font-bold">₹{Number(inv.total_amount).toLocaleString('en-IN')}</td>
                  <td className="font-bold text-red-600">
                    {Number(inv.amount_due) > 0 ? `₹${Number(inv.amount_due).toLocaleString('en-IN')}` : '-'}
                  </td>
                  <td>{getStatusBadge(inv.status)}</td>
                  <td>{inv.issue_date ? new Date(inv.issue_date).toLocaleDateString('en-IN') : '-'}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-ghost" onClick={() => openForm(inv)}>Edit</button>
                      <Link href={`/ops/invoices/${inv.id}/print`} target="_blank" className="btn btn-sm btn-outline">Print/PDF</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ background: 'white', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}>
            <h2 className="text-xl font-bold mb-6">{form.id ? `Edit Invoice: ${form.invoice_number || ''}` : 'Create New Invoice'}</h2>
            
            <form onSubmit={handleSave}>
              <div className="grid-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Customer Name *</label>
                  <input type="text" className="input" required value={form.customer_name} onChange={e => setForm({...form, customer_name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Phone</label>
                  <input type="text" className="input" value={form.customer_phone} onChange={e => setForm({...form, customer_phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Email</label>
                  <input type="email" className="input" value={form.customer_email} onChange={e => setForm({...form, customer_email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Category *</label>
                  <select className="input" required value={form.invoice_category} onChange={e => setForm({...form, invoice_category: e.target.value})}>
                    <option value="boq_audit">BOQ Audit</option>
                    <option value="consultation">Consultation</option>
                    <option value="construction">Construction</option>
                    <option value="material_commission">Material Commission</option>
                    <option value="partner_package">Partner Package</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Billing Address</label>
                  <textarea className="input" rows="2" value={form.billing_address} onChange={e => setForm({...form, billing_address: e.target.value})}></textarea>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg mb-6">
                <h3 className="font-bold text-sm mb-4 border-b border-slate-200 pb-2">Financial Details</h3>
                <div className="grid-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Subtotal *</label>
                    <input type="number" step="0.01" className="input" required value={form.subtotal} onChange={e => setForm({...form, subtotal: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Tax Amount</label>
                    <input type="number" step="0.01" className="input" value={form.tax_amount} onChange={e => setForm({...form, tax_amount: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Discount Amount</label>
                    <input type="number" step="0.01" className="input" value={form.discount_amount} onChange={e => setForm({...form, discount_amount: e.target.value})} />
                  </div>
                </div>
                
                <div className="flex-between mb-4 pb-4 border-b border-slate-200">
                  <div className="text-sm font-bold text-slate-600">Calculated Total:</div>
                  <div className="text-xl font-bold">₹{calcTotal().toLocaleString('en-IN')}</div>
                </div>

                <div className="grid-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Amount Paid Already</label>
                    <input type="number" step="0.01" className="input" value={form.amount_paid} onChange={e => setForm({...form, amount_paid: e.target.value})} />
                  </div>
                  <div className="text-right">
                    <label className="block text-xs font-bold text-slate-600 mb-1">Calculated Due</label>
                    <div className="text-xl font-bold text-red-600">₹{calcDue().toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              <div className="grid-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Status</label>
                  <select className="input" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                    <option value="draft">Draft</option>
                    <option value="issued">Issued</option>
                    <option value="partially_paid">Partially Paid</option>
                    <option value="paid">Paid</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Issue Date *</label>
                  <input type="date" className="input" required value={form.issue_date} onChange={e => setForm({...form, issue_date: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Due Date</label>
                  <input type="date" className="input" value={form.due_date} onChange={e => setForm({...form, due_date: e.target.value})} />
                </div>
                <div style={{ gridColumn: 'span 3' }}>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Internal / Customer Notes</label>
                  <input type="text" className="input" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)} disabled={saving}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Invoice'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
