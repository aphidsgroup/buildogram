'use client';
import { useEffect, useState } from 'react';

const ROLES = ['client','ops_admin','ops_pm','ops_engineer','partner_contractor','partner_supplier'];
const ROLE_COLOR = { client:'badge-blue', ops_admin:'badge-red', ops_pm:'badge-orange', ops_engineer:'badge-yellow', partner_contractor:'badge-green', partner_supplier:'badge-green' };

export default function OpsUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', role:'client' });
  const [msg, setMsg] = useState('');

  const load = () => fetch('/api/users').then(r => r.json()).then(d => { setUsers(d.users || []); setLoading(false); });
  useEffect(() => { load(); }, []);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));

  const create = async (e) => {
    e.preventDefault();
    const r = await fetch('/api/users', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
    const d = await r.json();
    if (r.ok) { setMsg('User created!'); setShowModal(false); load(); } else setMsg(d.error);
  };

  if (loading) return <div className="flex-center" style={{height:'60vh'}}><div className="spinner"/></div>;

  return (
    <div>
      <div className="page-header flex-between">
        <div><h1>Users</h1><p className="text-muted mt-2">{users.length} total users across all roles</p></div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">+ Add User</button>
      </div>
      {msg && <div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:'8px',padding:'12px 16px',marginBottom:'16px',color:'var(--success)',fontSize:'14px'}}>{msg}</div>}
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
          <table className="table" style={{ width: '100%', minWidth: '800px' }}>
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Status</th><th>Joined</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td style={{fontWeight:600}}>{u.name}</td>
                  <td className="text-muted">{u.email}</td>
                  <td className="text-muted">{u.phone || '—'}</td>
                  <td><span className={`badge ${ROLE_COLOR[u.role]||'badge-gray'}`}>{u.role}</span></td>
                  <td><span className={`badge ${u.is_active?'badge-green':'badge-red'}`}>{u.is_active?'Active':'Inactive'}</span></td>
                  <td className="text-muted text-xs">{new Date(u.created_at).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:999,display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
          <div className="card" style={{maxWidth:'440px',width:'100%'}}>
            <div className="flex-between mb-6"><h3>Add New User</h3><button onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">✕</button></div>
            <form onSubmit={create} style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div className="input-group"><label>Full Name *</label><input className="input" required value={form.name} onChange={e=>set('name',e.target.value)}/></div>
              <div className="input-group"><label>Email *</label><input className="input" type="email" required value={form.email} onChange={e=>set('email',e.target.value)}/></div>
              <div className="input-group"><label>Phone</label><input className="input" value={form.phone} onChange={e=>set('phone',e.target.value)}/></div>
              <div className="input-group"><label>Password *</label><input className="input" type="password" required value={form.password} onChange={e=>set('password',e.target.value)}/></div>
              <div className="input-group"><label>Role *</label>
                <select className="input" value={form.role} onChange={e=>set('role',e.target.value)}>
                  {ROLES.map(r=><option key={r}>{r}</option>)}
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{justifyContent:'center'}}>Create User</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
