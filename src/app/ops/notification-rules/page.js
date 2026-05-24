'use client';
import { useEffect, useState } from 'react';

export default function NotificationRulesPage() {
  const [rules, setRules] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const [dryRun, setDryRun] = useState({ open: false, rule: null, client_id: '', lead_id: '', result: null, running: false });

  const loadData = async () => {
    try {
      const [rRes, tRes] = await Promise.all([
        fetch('/api/ops/notification-rules'),
        fetch('/api/ops/whatsapp/templates')
      ]);
      const rData = await rRes.json();
      const tData = await tRes.json();

      if (rData.success) setRules(rData.rules);
      if (tData.success) setTemplates(tData.templates);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 5000);
  };

  const updateRule = async (id, payload) => {
    setSaving(id);
    try {
      const res = await fetch(`/api/ops/notification-rules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setRules(rules.map(r => r.id === id ? { ...r, ...payload, ...data.rule } : r));
        showToast('Rule updated');
      } else {
        showToast(data.error, 'error');
      }
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const runDryRun = async () => {
    if (!dryRun.rule) return;
    setDryRun(p => ({ ...p, running: true, result: null }));
    try {
      const res = await fetch('/api/ops/notification-rules/dry-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          event_type: dryRun.rule.event_type,
          client_id: dryRun.client_id || undefined,
          lead_id: dryRun.lead_id || undefined
        })
      });
      const data = await res.json();
      setDryRun(p => ({ ...p, running: false, result: data }));
    } catch (e) {
      setDryRun(p => ({ ...p, running: false, result: { success: false, error: e.message } }));
    }
  };

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div className="pb-20">
      <div className="page-header mb-8">
        <h1>Notification Rules (Engine Foundation)</h1>
        <p className="text-muted mt-2">Map system events to templates and define rule logic.</p>
      </div>

      <div className="card p-6 mb-8" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '24px' }}>⚠️</div>
          <div>
            <div style={{ fontWeight: 700, color: '#92400e', marginBottom: '4px' }}>AUTOMATION DISABLED</div>
            <div style={{ fontSize: '14px', color: '#b45309', lineHeight: 1.5 }}>
              The automation engine is currently turned OFF platform-wide. Enabling a rule here simply means it is <strong>"eligible for future automation"</strong>. No automatic messages will be sent to any user. Use the Dry Run tool to simulate what <em>would</em> happen.
            </div>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Event / Rule</th>
              <th>Audience</th>
              <th>Template</th>
              <th>Settings</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map(rule => (
              <tr key={rule.id}>
                <td>
                  <div className="font-bold">{rule.rule_name}</div>
                  <div className="text-xs text-muted" style={{ fontFamily: 'monospace' }}>{rule.event_type}</div>
                </td>
                <td><span className="badge badge-gray">{rule.target_audience}</span></td>
                <td style={{ minWidth: '200px' }}>
                  <select 
                    className="input bg-slate-50 text-sm py-1" 
                    value={rule.template_id || ''} 
                    onChange={e => updateRule(rule.id, { ...rule, template_id: e.target.value })}
                    disabled={saving === rule.id}
                  >
                    <option value="">-- No Template --</option>
                    {templates.map(t => <option key={t.id} value={t.id}>{t.template_name}</option>)}
                  </select>
                </td>
                <td style={{ fontSize: '12px' }}>
                  <label className="flex items-center gap-2 mb-1 cursor-pointer">
                    <input type="checkbox" checked={rule.respect_user_preferences} onChange={e => updateRule(rule.id, { ...rule, respect_user_preferences: e.target.checked })} />
                    <span>Respect Consent</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={rule.respect_quiet_hours} onChange={e => updateRule(rule.id, { ...rule, respect_quiet_hours: e.target.checked })} />
                    <span>Respect Quiet Hrs</span>
                  </label>
                </td>
                <td>
                  <button 
                    className={`badge ${rule.is_enabled ? 'badge-green' : 'badge-gray'}`}
                    onClick={() => updateRule(rule.id, { ...rule, is_enabled: !rule.is_enabled })}
                    disabled={saving === rule.id}
                  >
                    {rule.is_enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => setDryRun({ open: true, rule, client_id: '', lead_id: '', result: null, running: false })}>
                    🧪 Dry Run
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DRY RUN MODAL */}
      {dryRun.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '600px', padding: '24px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex-between mb-4 pb-4" style={{ borderBottom: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>🧪 Dry Run Preview: {dryRun.rule.rule_name}</h3>
              <button onClick={() => setDryRun({ open: false, rule: null })} style={{ fontSize: '20px' }}>×</button>
            </div>
            
            <div className="grid-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mock Client ID (Optional)</label>
                <input type="text" className="input" placeholder="uuid..." value={dryRun.client_id} onChange={e => setDryRun(p => ({ ...p, client_id: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mock Lead ID (Optional)</label>
                <input type="text" className="input" placeholder="uuid..." value={dryRun.lead_id} onChange={e => setDryRun(p => ({ ...p, lead_id: e.target.value }))} />
              </div>
            </div>
            
            <button className="btn btn-primary w-full mb-6" onClick={runDryRun} disabled={dryRun.running}>
              {dryRun.running ? 'Evaluating...' : 'Run Simulation'}
            </button>

            {dryRun.result && (
              <div className="p-4 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <h4 className="font-bold text-sm mb-2">Evaluation Result</h4>
                {dryRun.result.evaluation?.should_send ? (
                  <div className="badge badge-green mb-2" style={{ display: 'inline-flex' }}>✅ PASS: {dryRun.result.evaluation.reason}</div>
                ) : (
                  <div className="badge badge-red mb-2" style={{ display: 'inline-flex' }}>❌ BLOCKED: {dryRun.result.evaluation?.reason || dryRun.result.error}</div>
                )}
                
                {dryRun.result.preview && (
                  <div className="mt-4">
                    <h4 className="font-bold text-sm mb-2">Rendered Output Preview</h4>
                    <div style={{ background: '#dcf8c6', padding: '12px', borderRadius: '8px', fontSize: '14px', whiteSpace: 'pre-wrap', color: '#075e54' }}>
                      {dryRun.result.preview}
                    </div>
                  </div>
                )}
              </div>
            )}
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
