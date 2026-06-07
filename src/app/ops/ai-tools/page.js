'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AIToolsAdmin() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ tool: 'all', risk: 'all', priority: 'all', status: 'all' });
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetch('/api/ops/ai-tool-submissions')
      .then(r => r.json())
      .then(d => {
        setSubs(d.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/ops/ai-tool-submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_status: newStatus })
      });
      if (res.ok) {
        setSubs(prev => prev.map(s => s.id === id ? { ...s, lead_status: newStatus } : s));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const filtered = subs.filter(s => {
    if (filters.tool !== 'all' && s.tool_name !== filters.tool) return false;
    if (filters.risk !== 'all' && s.risk_level !== filters.risk) return false;
    if (filters.priority !== 'all' && s.follow_up_priority !== filters.priority) return false;
    if (filters.status !== 'all' && (s.lead_status || 'new') !== filters.status) return false;
    return true;
  });

  const tools = [...new Set(subs.map(s => s.tool_name).filter(Boolean))];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getPriorityColor = (prio) => {
    switch (prio) {
      case 'urgent': return 'text-red-600 font-bold';
      case 'same_day': return 'text-orange-600 font-semibold';
      case 'within_24_hours': return 'text-blue-600 font-medium';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="p-8 font-sans max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 m-0">AI Tool Leads CRM</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and convert submissions from AI-engineered tools</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select value={filters.tool} onChange={e => setFilters({...filters, tool: e.target.value})} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="all">All Tools</option>
            {tools.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={filters.risk} onChange={e => setFilters({...filters, risk: e.target.value})} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="all">Any Risk Level</option>
            <option value="urgent">Urgent Risk</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
          <select value={filters.priority} onChange={e => setFilters({...filters, priority: e.target.value})} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="all">Any Priority</option>
            <option value="urgent">Urgent</option>
            <option value="same_day">Same Day</option>
            <option value="within_24_hours">Within 24 Hours</option>
          </select>
          <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="all">Any Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-slate-500 py-16">Loading AI Leads...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-slate-500 py-16 bg-slate-50 rounded-xl border border-slate-200">No leads found matching criteria.</div>
      ) : (
        <div className="space-y-6">
          {filtered.map(s => (
            <div key={s.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
              {/* Left Column: Lead Info */}
              <div className="p-6 border-b md:border-b-0 md:border-r border-slate-100 md:w-1/3 bg-slate-50/50">
                <div className="flex justify-between items-start mb-4">
                  <div className="font-bold text-orange-600 text-sm uppercase tracking-wider">{s.tool_name}</div>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getRiskColor(s.risk_level || 'low')}`}>
                    {(s.risk_level || 'Low').toUpperCase()} RISK
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-1">{s.name || 'Anonymous User'}</h3>
                <div className="text-slate-600 text-sm mb-4 space-y-1">
                  <div>📞 {s.phone || 'No phone'}</div>
                  <div>✉️ {s.email || 'No email'}</div>
                </div>

                <div className="text-xs text-slate-500 mb-4">
                  Submitted: {new Date(s.created_at).toLocaleString()}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Lead Status</label>
                  <select 
                    value={s.lead_status || 'new'} 
                    onChange={e => handleStatusChange(s.id, e.target.value)}
                    disabled={updatingId === s.id}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm font-medium focus:ring-2 focus:ring-orange-500 outline-none disabled:opacity-50"
                  >
                    <option value="new">🆕 New</option>
                    <option value="contacted">📞 Contacted</option>
                    <option value="qualified">⭐ Qualified</option>
                    <option value="converted">✅ Converted</option>
                    <option value="lost">❌ Lost</option>
                    <option value="archived">📦 Archived</option>
                  </select>
                </div>
              </div>

              {/* Right Column: Workflow & Scripts */}
              <div className="p-6 md:w-2/3">
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Follow-up Priority</div>
                    <div className={`text-sm ${getPriorityColor(s.follow_up_priority || 'within_24_hours')}`}>
                      {(s.follow_up_priority || 'Within 24 Hours').replace(/_/g, ' ').toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Ops Routing</div>
                    <div className="text-sm font-medium text-slate-700">
                      {(s.recommended_ops_team || 'General Sales').replace(/_/g, ' ')}
                    </div>
                  </div>
                  <div className="col-span-2 mt-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Reason / Next Action</div>
                    <div className="text-sm font-medium text-slate-900 mb-1">{s.follow_up_reason || 'Standard lead.'}</div>
                    <div className="text-sm text-slate-600 bg-orange-50 p-3 rounded-lg border border-orange-100 mt-2 flex items-start gap-2">
                      <span>⚡</span> <span>{s.next_best_action || 'Review submission and contact lead.'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {s.suggested_call_script && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Suggested Call Script</label>
                        <button onClick={() => copyText(s.suggested_call_script)} className="text-xs text-orange-600 hover:text-orange-700 font-medium">Copy</button>
                      </div>
                      <div className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                        "{s.suggested_call_script}"
                      </div>
                    </div>
                  )}

                  {s.suggested_whatsapp_message && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">WhatsApp Message</label>
                        <button onClick={() => copyText(s.suggested_whatsapp_message)} className="text-xs text-green-600 hover:text-green-700 font-medium">Copy</button>
                      </div>
                      <div className="text-sm text-slate-700 bg-green-50 p-3 rounded-lg border border-green-100">
                        {s.suggested_whatsapp_message}
                      </div>
                    </div>
                  )}
                  
                  {s.recommended_service_url && (
                    <div className="pt-2">
                      <Link href={s.recommended_service_url} target="_blank" className="text-sm text-blue-600 hover:text-blue-800 font-medium underline">
                        Open Recommended Service Page →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
