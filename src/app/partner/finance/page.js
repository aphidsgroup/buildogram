'use client';
import { useState, useEffect } from 'react';
import { StatusBadge, SectionHeader, Modal, FormField, EmptyState } from '../_shared/components';
import { DEMO_PAYMENTS, DEMO_EXPENSES, DEMO_PROJECTS, PAYMENT_STATUSES, EXPENSE_CATEGORIES } from '../_shared/demoData';

const fmt = (n) => n >= 10000000 ? '₹' + (n / 10000000).toFixed(2) + ' Cr'
  : n >= 100000 ? '₹' + (n / 100000).toFixed(1) + ' L'
  : n ? '₹' + Number(n).toLocaleString('en-IN') : '—';

export default function FinancePage() {
  const [payments,  setPayments]  = useState([]);
  const [expenses,  setExpenses]  = useState([]);
  const [projects,  setProjects]  = useState([]);
  const [section,   setSection]   = useState('payments');
  const [modal,     setModal]     = useState(false);
  const [form,      setForm]      = useState({});
  const [filterProject, setFilterProject] = useState('All');

  const BLANK_PAY = { projectId: '', milestone: '', amount: '', dueDate: '', paidDate: '', status: 'Pending', notes: '' };
  const BLANK_EXP = { projectId: '', category: 'Labour', amount: '', date: new Date().toISOString().slice(0, 10), paidTo: '', notes: '' };

  useEffect(() => {
    const sp = localStorage.getItem('bos_projects');
    const allProjects = sp ? JSON.parse(sp) : DEMO_PROJECTS;
    setProjects(allProjects);

    // Aggregate payments and expenses across all projects
    let allPay = [], allExp = [];
    allProjects.forEach(p => {
      const pp = localStorage.getItem('bos_payments_' + p.id);
      const ep = localStorage.getItem('bos_expenses_' + p.id);
      allPay = allPay.concat(pp ? JSON.parse(pp) : DEMO_PAYMENTS.filter(x => x.projectId === p.id));
      allExp = allExp.concat(ep ? JSON.parse(ep) : DEMO_EXPENSES.filter(x => x.projectId === p.id));
    });
    if (allPay.length === 0) allPay = DEMO_PAYMENTS;
    if (allExp.length === 0) allExp = DEMO_EXPENSES;
    setPayments(allPay);
    setExpenses(allExp);
  }, []);

  const saveAll = (type, arr) => {
    if (type === 'payments') {
      setPayments(arr);
      const byProject = {};
      arr.forEach(i => { if (!byProject[i.projectId]) byProject[i.projectId] = []; byProject[i.projectId].push(i); });
      Object.entries(byProject).forEach(([pid, items]) => localStorage.setItem('bos_payments_' + pid, JSON.stringify(items)));
    } else {
      setExpenses(arr);
      const byProject = {};
      arr.forEach(i => { if (!byProject[i.projectId]) byProject[i.projectId] = []; byProject[i.projectId].push(i); });
      Object.entries(byProject).forEach(([pid, items]) => localStorage.setItem('bos_expenses_' + pid, JSON.stringify(items)));
    }
  };

  const openAdd = () => { setForm(section === 'payments' ? BLANK_PAY : BLANK_EXP); setModal(true); };
  const handleSubmit = () => {
    if (!form.amount) return alert('Amount required');
    const entry = { ...form, id: (section === 'payments' ? 'PAY' : 'EXP') + Date.now(), amount: Number(form.amount) };
    if (section === 'payments') saveAll('payments', [entry, ...payments]);
    else saveAll('expenses', [entry, ...expenses]);
    setModal(false);
  };
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const getProjectName = (pid) => projects.find(p => p.id === pid)?.name || pid || '—';

  const filteredPay = payments.filter(p => filterProject === 'All' || p.projectId === filterProject);
  const filteredExp = expenses.filter(e => filterProject === 'All' || e.projectId === filterProject);

  // Summary metrics
  const totalReceived  = filteredPay.filter(p => p.status === 'Paid').reduce((s, p) => s + Number(p.amount), 0);
  const totalPending   = filteredPay.filter(p => p.status === 'Pending' || p.status === 'Overdue').reduce((s, p) => s + Number(p.amount), 0);
  const totalExpenses  = filteredExp.reduce((s, e) => s + Number(e.amount), 0);
  const overdueCount   = filteredPay.filter(p => p.status === 'Overdue').length;

  return (
    <div>
      <SectionHeader icon="💰" title="Finance Tracker"
        desc="Track payments received, pending milestones and all site expenses across your projects"
        action={<button className="btn btn-primary" onClick={openAdd}>+ Add {section === 'payments' ? 'Payment' : 'Expense'}</button>}
      />

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {[
          { label: 'Total Received',  value: fmt(totalReceived),  color: '#10B981', icon: '💚' },
          { label: 'Pending Payments',value: fmt(totalPending),   color: '#F59E0B', icon: '⏳' },
          { label: 'Total Expenses',  value: fmt(totalExpenses),  color: '#EF4444', icon: '📤' },
          { label: 'Overdue',         value: overdueCount + ' items', color: '#7C3AED', icon: '🚨' },
        ].map(c => (
          <div key={c.label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px 20px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>{c.icon}</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: c.color, marginBottom: '4px' }}>{c.value}</div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '10px', padding: '4px' }}>
          {[['payments', '💳 Payments'], ['expenses', '📤 Expenses']].map(([k, label]) => (
            <button key={k} onClick={() => setSection(k)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, background: section === k ? 'white' : 'transparent', color: section === k ? '#FC6E20' : '#64748B', boxShadow: section === k ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>{label}</button>
          ))}
        </div>
        <select className="input" style={{ maxWidth: '200px' }} value={filterProject} onChange={e => setFilterProject(e.target.value)}>
          <option value="All">All Projects</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {/* Payments Table */}
      {section === 'payments' && (
        filteredPay.length === 0 ? (
          <EmptyState icon="💳" title="No payment records" desc="Add payment milestones to track your collection status." action={<button className="btn btn-primary" onClick={openAdd}>+ Add Payment</button>} />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead><tr style={{ background: '#F8FAFC', borderBottom: '2px solid var(--border)' }}>
                {['Project', 'Milestone', 'Amount', 'Due Date', 'Paid Date', 'Status', 'Notes'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>{filteredPay.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FAFBFC'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '11px 14px', fontSize: '13px', color: '#64748B', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{getProjectName(p.projectId)}</td>
                  <td style={{ padding: '11px 14px', fontWeight: 600 }}>{p.milestone}</td>
                  <td style={{ padding: '11px 14px', fontWeight: 700, color: '#0F172A' }}>{fmt(p.amount)}</td>
                  <td style={{ padding: '11px 14px', whiteSpace: 'nowrap', color: '#64748B' }}>{p.dueDate || '—'}</td>
                  <td style={{ padding: '11px 14px', whiteSpace: 'nowrap', color: '#64748B' }}>{p.paidDate || '—'}</td>
                  <td style={{ padding: '11px 14px' }}><StatusBadge status={p.status} /></td>
                  <td style={{ padding: '11px 14px', color: '#94A3B8', fontSize: '13px' }}>{p.notes || '—'}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )
      )}

      {/* Expenses Table */}
      {section === 'expenses' && (
        filteredExp.length === 0 ? (
          <EmptyState icon="📤" title="No expenses logged" desc="Track where project money is being spent." action={<button className="btn btn-primary" onClick={openAdd}>+ Log Expense</button>} />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead><tr style={{ background: '#F8FAFC', borderBottom: '2px solid var(--border)' }}>
                {['Project', 'Category', 'Amount', 'Date', 'Paid To', 'Notes'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>{filteredExp.map(e => (
                <tr key={e.id} style={{ borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={ev => ev.currentTarget.style.background = '#FAFBFC'}
                  onMouseLeave={ev => ev.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '11px 14px', fontSize: '13px', color: '#64748B', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{getProjectName(e.projectId)}</td>
                  <td style={{ padding: '11px 14px' }}><span style={{ background: '#F1F5F9', border: '1px solid var(--border)', borderRadius: '999px', padding: '2px 10px', fontSize: '12px', fontWeight: 600 }}>{e.category}</span></td>
                  <td style={{ padding: '11px 14px', fontWeight: 700, color: '#EF4444' }}>{fmt(e.amount)}</td>
                  <td style={{ padding: '11px 14px', whiteSpace: 'nowrap', color: '#64748B' }}>{e.date}</td>
                  <td style={{ padding: '11px 14px' }}>{e.paidTo}</td>
                  <td style={{ padding: '11px 14px', color: '#94A3B8', fontSize: '13px' }}>{e.notes || '—'}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )
      )}

      {/* Add Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title={section === 'payments' ? 'Add Payment Record' : 'Log Expense'}
        footer={<><button className="btn" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>Save</button></>}>
        <FormField label="Project">
          <select className="input" value={form.projectId || ''} onChange={f('projectId')}>
            <option value="">Select project...</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </FormField>
        {section === 'payments' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <div style={{ gridColumn: '1/-1' }}><FormField label="Milestone Name" required><input className="input" value={form.milestone || ''} onChange={f('milestone')} placeholder="e.g. Foundation" /></FormField></div>
            <FormField label="Amount (₹)" required><input className="input" type="number" value={form.amount || ''} onChange={f('amount')} /></FormField>
            <FormField label="Status"><select className="input" value={form.status || 'Pending'} onChange={f('status')}>{PAYMENT_STATUSES.map(s => <option key={s}>{s}</option>)}</select></FormField>
            <FormField label="Due Date"><input className="input" type="date" value={form.dueDate || ''} onChange={f('dueDate')} /></FormField>
            <FormField label="Paid Date"><input className="input" type="date" value={form.paidDate || ''} onChange={f('paidDate')} /></FormField>
            <div style={{ gridColumn: '1/-1' }}><FormField label="Notes"><input className="input" value={form.notes || ''} onChange={f('notes')} /></FormField></div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <FormField label="Category"><select className="input" value={form.category || 'Labour'} onChange={f('category')}>{EXPENSE_CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></FormField>
            <FormField label="Amount (₹)" required><input className="input" type="number" value={form.amount || ''} onChange={f('amount')} /></FormField>
            <FormField label="Date"><input className="input" type="date" value={form.date || ''} onChange={f('date')} /></FormField>
            <FormField label="Paid To"><input className="input" value={form.paidTo || ''} onChange={f('paidTo')} placeholder="Vendor / name" /></FormField>
            <div style={{ gridColumn: '1/-1' }}><FormField label="Notes"><input className="input" value={form.notes || ''} onChange={f('notes')} /></FormField></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
