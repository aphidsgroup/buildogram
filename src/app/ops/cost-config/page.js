'use client';
import { useEffect, useState } from 'react';

export default function OpsCostConfig() {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState('');

  const load = () => fetch('/api/cost-config').then(r=>r.json()).then(d=>{setConfigs(d.configs||[]);setLoading(false);});
  useEffect(()=>{load();},[]);

  const save = async () => {
    await fetch('/api/cost-config', {method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(editing)});
    setEditing(null);setMsg('Saved!');load();setTimeout(()=>setMsg(''),2000);
  };

  if(loading) return <div className="flex-center" style={{height:'60vh'}}><div className="spinner"/></div>;

  return (
    <div>
      <div className="page-header"><h1>Cost Configuration</h1><p className="text-muted mt-2">Manage per-sq.ft rate tables used by the public cost estimator</p></div>
      {msg && <div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:'8px',padding:'12px 16px',marginBottom:'16px',color:'var(--success)',fontSize:'14px'}}>{msg}</div>}
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>City</th><th>Spec Level</th><th>Min Rate (₹/sqft)</th><th>Max Rate (₹/sqft)</th><th>Structure %</th><th>Finishes %</th><th></th></tr></thead>
            <tbody>
              {configs.map(c=>(
                <tr key={c.id}>
                  <td style={{fontWeight:600}}>{c.city}</td>
                  <td><span className={`badge ${c.spec_level==='premium'?'badge-orange':c.spec_level==='standard'?'badge-blue':'badge-gray'}`}>{c.spec_level}</span></td>
                  <td>{editing?.id===c.id ? <input className="input" style={{width:'100px'}} type="number" value={editing.rate_per_sqft_min} onChange={e=>setEditing(f=>({...f,rate_per_sqft_min:e.target.value}))}/> : `₹${c.rate_per_sqft_min}`}</td>
                  <td>{editing?.id===c.id ? <input className="input" style={{width:'100px'}} type="number" value={editing.rate_per_sqft_max} onChange={e=>setEditing(f=>({...f,rate_per_sqft_max:e.target.value}))}/> : `₹${c.rate_per_sqft_max}`}</td>
                  <td className="text-muted">{c.structure_pct}%</td>
                  <td className="text-muted">{c.finishes_pct}%</td>
                  <td>
                    {editing?.id===c.id
                      ? <div className="flex gap-2"><button onClick={save} className="btn btn-success btn-sm">Save</button><button onClick={()=>setEditing(null)} className="btn btn-ghost btn-sm">Cancel</button></div>
                      : <button onClick={()=>setEditing({...c})} className="btn btn-ghost btn-sm">Edit</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card mt-6" style={{background:'rgba(15,118,110,0.05)',border:'1px solid rgba(15,118,110,0.2)'}}>
        <p className="text-sm"><span style={{color:'var(--primary)'}}>ℹ️ Note:</span> Changes take effect immediately on the public cost estimator. Floor multipliers: G=1×, G+1=1.85×, G+2=2.65× of plot area.</p>
      </div>
    </div>
  );
}
