'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function OpsReportsPage() {
  const [leadFilters, setLeadFilters] = useState({ status: 'all', type: 'all' });
  const [revenueFilters, setRevenueFilters] = useState({ status: 'all', type: 'all' });
  const [followupFilters, setFollowupFilters] = useState({ status: 'all' });
  
  const [downloading, setDownloading] = useState(null);

  const handleDownload = (reportName, url) => {
    setDownloading(reportName);
    
    // Simulate slight delay for UI feedback, then trigger download
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = url;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloading(null);
    }, 800);
  };

  return (
    <div className="pb-20">
      <div className="page-header mb-8">
        <h1>Advanced Reports & Exports</h1>
        <p className="text-muted mt-2">Generate and download secure CSV extracts for business intelligence.</p>
      </div>

      <div className="grid-2 gap-6 mb-8">
        
        {/* LEADS REPORT */}
        <div className="card p-6 border border-slate-200">
          <div className="flex-between mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2"><span className="text-2xl">👥</span> CRM Leads Report</h3>
          </div>
          <p className="text-sm text-slate-500 mb-6">Complete extract of all customer inquiries, leads, statuses, and assigned partners.</p>
          
          <div className="grid-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Status</label>
              <select className="input bg-slate-50 text-sm py-2" value={leadFilters.status} onChange={e => setLeadFilters(p => ({ ...p, status: e.target.value }))}>
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal Sent</option>
                <option value="won">Won / Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Lead Type</label>
              <select className="input bg-slate-50 text-sm py-2" value={leadFilters.type} onChange={e => setLeadFilters(p => ({ ...p, type: e.target.value }))}>
                <option value="all">All Types</option>
                <option value="construction">Construction</option>
                <option value="boq_audit">BOQ Audit</option>
                <option value="property_listing">Property Listing</option>
                <option value="partner_application">Partner App</option>
              </select>
            </div>
          </div>
          
          <button 
            className="btn btn-primary w-full"
            disabled={downloading === 'leads'}
            onClick={() => handleDownload('leads', `/api/ops/reports/leads.csv?status=${leadFilters.status}&type=${leadFilters.type}`)}
          >
            {downloading === 'leads' ? 'Generating CSV...' : '⬇️ Export Leads CSV'}
          </button>
        </div>

        {/* REVENUE REPORT */}
        <div className="card p-6 border border-slate-200">
          <div className="flex-between mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2"><span className="text-2xl">💰</span> Revenue & Ledger Report</h3>
          </div>
          <p className="text-sm text-slate-500 mb-6">Extract of expected amounts, received payments, commissions, and pending dues.</p>
          
          <div className="grid-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Payment Status</label>
              <select className="input bg-slate-50 text-sm py-2" value={revenueFilters.status} onChange={e => setRevenueFilters(p => ({ ...p, status: e.target.value }))}>
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="partial">Partial</option>
                <option value="received">Received</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
              <select className="input bg-slate-50 text-sm py-2" value={revenueFilters.type} onChange={e => setRevenueFilters(p => ({ ...p, type: e.target.value }))}>
                <option value="all">All Categories</option>
                <option value="fee">Service Fee</option>
                <option value="commission">Commission</option>
                <option value="milestone">Milestone</option>
              </select>
            </div>
          </div>
          
          <button 
            className="btn btn-primary w-full"
            disabled={downloading === 'revenue'}
            onClick={() => handleDownload('revenue', `/api/ops/reports/revenue.csv?status=${revenueFilters.status}&type=${revenueFilters.type}`)}
          >
            {downloading === 'revenue' ? 'Generating CSV...' : '⬇️ Export Revenue CSV'}
          </button>
        </div>

        {/* FOLLOW-UPS REPORT */}
        <div className="card p-6 border border-slate-200">
          <div className="flex-between mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2"><span className="text-2xl">📅</span> Follow-ups Report</h3>
          </div>
          <p className="text-sm text-slate-500 mb-6">Timeline extract of all scheduled tasks, due dates, and their associated leads.</p>
          
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-600 mb-1">Timeline Filter</label>
            <select className="input bg-slate-50 text-sm py-2" value={followupFilters.status} onChange={e => setFollowupFilters(p => ({ ...p, status: e.target.value }))}>
              <option value="all">All Follow-ups</option>
              <option value="overdue">Overdue Only</option>
              <option value="upcoming">Upcoming Only</option>
            </select>
          </div>
          
          <button 
            className="btn btn-primary w-full"
            disabled={downloading === 'followups'}
            onClick={() => handleDownload('followups', `/api/ops/reports/followups.csv?status=${followupFilters.status}`)}
          >
            {downloading === 'followups' ? 'Generating CSV...' : '⬇️ Export Follow-ups CSV'}
          </button>
        </div>
      </div>

      <h3 className="mb-4 font-bold" style={{ fontSize: '18px' }}>Coming Soon (V2)</h3>
      <div className="grid-3 gap-4 opacity-60 grayscale pointer-events-none">
        {['Property Passport Report', 'Material Quote Report', 'Maintenance Report', 'Partner Referral Report', 'BOQ Audit Report'].map(title => (
          <div key={title} className="card p-4 border border-slate-200">
            <div className="flex-between mb-2">
              <h4 className="font-bold text-sm">{title}</h4>
              <span className="badge badge-gray text-xs">V2</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">Export module in development.</p>
            <button className="btn btn-outline w-full text-sm py-1 cursor-not-allowed">Export Locked</button>
          </div>
        ))}
      </div>

    </div>
  );
}
