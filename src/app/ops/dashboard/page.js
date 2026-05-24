'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { roleCan } from '@/lib/permissions';

export default function OpsDashboard() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/ops/dashboard').then(r => r.json()),
      fetch('/api/auth/me').then(r => r.json())
    ]).then(([d, u]) => {
      if (d.success) setData(d);
      if (u.user) setUser(u.user);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const stColor = { new: 'badge-blue', contacted: 'badge-yellow', qualified: 'badge-orange', proposal: 'badge-orange', won: 'badge-green', lost: 'badge-red', requested: 'badge-blue', pending: 'badge-yellow', verified: 'badge-green', published: 'badge-green', draft: 'badge-gray' };

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;
  if (!data) return <div className="text-center p-10 text-red-500">Failed to load dashboard. Ensure you have admin access.</div>;

  const { kpis, breakdowns, alerts, recent, followUps } = data;

  return (
    <div className="pb-20">
      <div className="page-header flex-between mb-8">
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>Founder Dashboard</h1>
          <p className="text-muted mt-2">Comprehensive overview of revenue, operations, and ecosystem health.</p>
        </div>
      </div>

      {/* ── ALERTS SECTION ── */}
      {(alerts.pendingPartners > 0 || alerts.urgentMaintenance > 0 || alerts.draftListings > 0 || alerts.overdueFollowUps > 0 || alerts.todayFollowUps > 0) && (
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {alerts.overdueFollowUps > 0 && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '12px', flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>⏰</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#991b1b' }}>{alerts.overdueFollowUps} Overdue Follow-ups</div>
                <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: 600 }}>Action Required</div>
              </div>
            </div>
          )}
          {alerts.todayFollowUps > 0 && (
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '12px 16px', borderRadius: '12px', flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>📅</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#92400e' }}>{alerts.todayFollowUps} Follow-ups Due Today</div>
                <div style={{ fontSize: '12px', color: '#d97706', fontWeight: 600 }}>Attention Required</div>
              </div>
            </div>
          )}
          {alerts.urgentMaintenance > 0 && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '12px', flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🚨</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#991b1b' }}>{alerts.urgentMaintenance} Urgent Maintenance</div>
                <Link href="/ops/leads" style={{ fontSize: '12px', color: '#dc2626', fontWeight: 600 }}>Review Requests →</Link>
              </div>
            </div>
          )}
          {alerts.pendingQueueApprovals > 0 && (
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '12px 16px', borderRadius: '12px', flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>⏳</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#92400e' }}>{alerts.pendingQueueApprovals} Pending Approvals</div>
                <Link href="/ops/notification-queue" style={{ fontSize: '12px', color: '#d97706', fontWeight: 600 }}>Review WhatsApp Queue →</Link>
              </div>
            </div>
          )}
          {alerts.failedQueueMessages > 0 && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '12px', flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>❌</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#991b1b' }}>{alerts.failedQueueMessages} Failed Messages</div>
                <Link href="/ops/notification-queue" style={{ fontSize: '12px', color: '#dc2626', fontWeight: 600 }}>Retry Failed Messages →</Link>
              </div>
            </div>
          )}
          {alerts.pendingPartners > 0 && (
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '12px 16px', borderRadius: '12px', flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🤝</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#92400e' }}>{alerts.pendingPartners} Pending Partners</div>
                <Link href="/ops/leads" style={{ fontSize: '12px', color: '#d97706', fontWeight: 600 }}>Verify Applications →</Link>
              </div>
            </div>
          )}
          {alerts.draftListings > 0 && (
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '12px', flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>📝</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#475569' }}>{alerts.draftListings} Draft Listings</div>
                <Link href="/ops/leads" style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Publish Listings →</Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── CORE KPIs ── */}
      <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#1e293b' }}>Core Metrics</h2>
      <div className="grid-4 mb-8" style={{ gap: '16px' }}>
        <div className="card" style={{ padding: '20px', border: '1px solid #e0e7ff', background: 'white' }}>
            <div style={{ background: '#eff6ff', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>👥</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{kpis.totalLeads}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total CRM Leads</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontWeight: 500 }}>+{kpis.newLeadsMonth} this month</div>
        </div>
        <div className="card" style={{ padding: '20px', border: '1px solid #fae8ff', background: 'white' }}>
            <div style={{ background: '#fdf4ff', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>🏠</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{kpis.publishedListings}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Published Listings</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontWeight: 500 }}>Public facing properties</div>
        </div>
        <div className="card" style={{ padding: '20px', border: '1px solid #fbcfe8', background: '#fdf2f8' }}>
            <div style={{ background: '#fce7f3', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>📞</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#831843', marginBottom: '4px' }}>{kpis.propertyInquiries}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#be185d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Property Inquiries</div>
            <div style={{ fontSize: '12px', color: '#9d174d', marginTop: '8px', fontWeight: 500 }}>From public listings</div>
        </div>
        <div className="card" style={{ padding: '20px', border: '1px solid #d1fae5', background: 'white' }}>
            <div style={{ background: '#ecfdf5', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>🛂</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{kpis.activePassports}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Passports</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontWeight: 500 }}>{kpis.avgCompleteness}% avg completeness</div>
        </div>
      </div>

      <div className="grid-4 mb-8" style={{ gap: '16px' }}>
        <div className="card" style={{ padding: '20px', border: '1px solid #e0e7ff', background: 'white' }}>
            <div style={{ background: '#eff6ff', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>💬</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{data?.queue?.sentThisMonth || 0}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Messages Sent</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontWeight: 500 }}>Via Auto-Queue this month</div>
        </div>
        <div className="card" style={{ padding: '20px', border: '1px solid #fef08a', background: '#fefce8' }}>
            <div style={{ background: '#fef08a', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>🤝</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#854d0e', marginBottom: '4px' }}>{kpis.referredLeads}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#a16207', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Partner Referrals</div>
            <div style={{ fontSize: '12px', color: '#ca8a04', marginTop: '8px', fontWeight: 500 }}>{kpis.convertedReferrals} Converted</div>
        </div>
        {user && roleCan(user.role, 'view_revenue') && (
          <>
            <div className="card" style={{ padding: '20px', border: '1px solid #fed7aa', background: '#fff7ed' }}>
                <div style={{ background: '#fed7aa', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>💰</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#9a3412', marginBottom: '4px' }}>{fmt(kpis.referralExpected)}</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#c2410c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Exp. Referral Comm.</div>
            </div>
            <div className="card" style={{ padding: '20px', border: '1px solid #bbf7d0', background: '#f0fdf4' }}>
                <div style={{ background: '#bbf7d0', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>💸</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#166534', marginBottom: '4px' }}>{fmt(kpis.referralPaid)}</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Paid Referral Comm.</div>
            </div>
          </>
        )}
      </div>

      {user && roleCan(user.role, 'manage_invoices') && (
        <>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Invoicing Health</h3>
          <div className="grid-3 mb-8" style={{ gap: '16px' }}>
            <div className="card" style={{ padding: '20px', border: '1px solid #e2e8f0', background: 'white' }}>
                <div style={{ background: '#f1f5f9', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>🧾</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{fmt(data?.invoices?.total_invoiced)}</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Invoiced</div>
            </div>
            <div className="card" style={{ padding: '20px', border: '1px solid #bbf7d0', background: '#f0fdf4' }}>
                <div style={{ background: '#dcfce7', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>✅</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#166534', marginBottom: '4px' }}>{fmt(data?.invoices?.total_paid)}</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Invoices Paid</div>
            </div>
            <div className="card" style={{ padding: '20px', border: '1px solid #fecaca', background: '#fef2f2' }}>
                <div style={{ background: '#fee2e2', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>⏳</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#991b1b', marginBottom: '4px' }}>{fmt(data?.invoices?.total_due)}</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#b91c1c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Invoices Due</div>
            </div>
          </div>
        </>
      )}

      <div className="grid-2" style={{ gap: '24px', marginBottom: '32px' }}>
        {/* ── LEAD BREAKDOWN ── */}
        <div className="card" style={{ background: 'white', padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>Lead Distribution by Type</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {breakdowns.leadTypes.map(lt => (
              <div key={lt.lead_type} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#475569', textTransform: 'capitalize' }}>{lt.lead_type.replace('_', ' ')}</span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', background: '#f1f5f9', padding: '4px 12px', borderRadius: '999px' }}>{lt.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── PIPELINE BREAKDOWN ── */}
        <div className="card" style={{ background: 'white', padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>Pipeline Status</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {breakdowns.statuses.map(st => (
              <div key={st.status} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#475569', textTransform: 'capitalize' }}>{st.status.replace('_', ' ')}</span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', background: '#f1f5f9', padding: '4px 12px', borderRadius: '999px' }}>{st.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOLLOW-UPS & PENDING ACTIONS ── */}
      <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#1e293b' }}>Follow-ups & Pending Actions</h2>
      <div className="card" style={{ padding: '0', background: 'white', marginBottom: '32px', overflow: 'hidden' }}>
        
        {followUps && (followUps.overdue.length > 0 || followUps.today.length > 0 || followUps.upcoming.length > 0) ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Overdue */}
            {followUps.overdue.length > 0 && (
              <div style={{ padding: '16px 20px', background: '#fef2f2', borderBottom: '1px solid #fecaca' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Overdue Action Required</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {followUps.overdue.map(f => (
                    <div key={f.activity_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid #fca5a5' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{f.lead_name}</span>
                          <span className={`badge ${stColor[f.lead_status] || 'badge-gray'}`}>{f.lead_status}</span>
                          <span style={{ fontSize: '10px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#64748b', textTransform: 'uppercase' }}>{f.lead_type.replace('_', ' ')}</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>{f.title}</div>
                        {f.description && <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{f.description}</div>}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0, minWidth: '150px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#dc2626' }}>{new Date(f.follow_up_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        {f.lead_phone && <span style={{ fontSize: '12px', color: '#64748b' }}>📞 {f.lead_phone}</span>}
                        {/* Note: In a future version, this can link directly to the modal using ?leadId= */}
                        <Link href="/ops/leads" className="btn btn-ghost btn-sm" style={{ padding: '2px 8px', fontSize: '11px', color: '#2563eb' }}>Go to Leads →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Today */}
            {followUps.today.length > 0 && (
              <div style={{ padding: '16px 20px', background: '#fffbeb', borderBottom: '1px solid #fde68a' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Due Today</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {followUps.today.map(f => (
                    <div key={f.activity_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid #fde68a' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{f.lead_name}</span>
                          <span className={`badge ${stColor[f.lead_status] || 'badge-gray'}`}>{f.lead_status}</span>
                          <span style={{ fontSize: '10px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#64748b', textTransform: 'uppercase' }}>{f.lead_type.replace('_', ' ')}</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>{f.title}</div>
                        {f.description && <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{f.description}</div>}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0, minWidth: '150px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#d97706' }}>{new Date(f.follow_up_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                        {f.lead_phone && <span style={{ fontSize: '12px', color: '#64748b' }}>📞 {f.lead_phone}</span>}
                        <Link href="/ops/leads" className="btn btn-ghost btn-sm" style={{ padding: '2px 8px', fontSize: '11px', color: '#2563eb' }}>Go to Leads →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Next 7 Days */}
            {followUps.upcoming.length > 0 && (
              <div style={{ padding: '16px 20px', background: '#f8fafc' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Upcoming This Week</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {followUps.upcoming.map(f => (
                    <div key={f.activity_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{f.lead_name}</span>
                          <span className={`badge ${stColor[f.lead_status] || 'badge-gray'}`}>{f.lead_status}</span>
                          <span style={{ fontSize: '10px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#64748b', textTransform: 'uppercase' }}>{f.lead_type.replace('_', ' ')}</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>{f.title}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0, minWidth: '150px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>{new Date(f.follow_up_at).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        <Link href="/ops/leads" className="btn btn-ghost btn-sm" style={{ padding: '2px 8px', fontSize: '11px', color: '#2563eb' }}>Go to Leads →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="text-center py-8">
            <div style={{ fontSize: '32px', marginBottom: '8px', opacity: 0.5 }}>🌴</div>
            <p className="text-muted text-sm">No follow-ups due right now.</p>
          </div>
        )}
      </div>

      {/* ── RECENT ACTIVITY TABS ── */}
      <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#1e293b' }}>Recent Ecosystem Activity</h2>
      
      <div className="grid-2" style={{ gap: '24px' }}>
        
        {/* Partners */}
        <div className="card" style={{ background: 'white', padding: '0' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#334155', margin: 0 }}>Recent Partner Applications</h3>
          </div>
          <div style={{ padding: '0 20px' }}>
            {recent.partners.length === 0 ? <p className="text-muted text-sm py-4">No recent partners.</p> : recent.partners.map(p => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{p.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'capitalize' }}>{p.category || 'General'}</div>
                </div>
                <span className={`badge ${stColor[p.v_status] || 'badge-gray'}`}>{p.v_status || 'pending'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div className="card" style={{ background: 'white', padding: '0' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', background: '#fff7ed', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#9a3412', margin: 0 }}>Recent Material Quotes</h3>
          </div>
          <div style={{ padding: '0 20px' }}>
            {recent.materials.length === 0 ? <p className="text-muted text-sm py-4">No recent quotes.</p> : recent.materials.map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{m.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'capitalize' }}>{m.category || 'Materials'}</div>
                </div>
                <span className={`badge ${stColor[m.status] || 'badge-gray'}`}>{m.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Listings */}
        <div className="card" style={{ background: 'white', padding: '0' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', background: '#fdf4ff', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#86198f', margin: 0 }}>Recent Property Listings</h3>
          </div>
          <div style={{ padding: '0 20px' }}>
            {recent.listings.length === 0 ? <p className="text-muted text-sm py-4">No recent listings.</p> : recent.listings.map(l => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{l.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'capitalize' }}>{l.type || 'Listing'}</div>
                </div>
                <span className={`badge ${stColor[l.p_status] || 'badge-gray'}`}>{l.p_status || 'draft'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance */}
        <div className="card" style={{ background: 'white', padding: '0' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', background: '#f0fdfa', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#115e59', margin: 0 }}>Recent Maintenance Requests</h3>
          </div>
          <div style={{ padding: '0 20px' }}>
            {recent.maintenance.length === 0 ? <p className="text-muted text-sm py-4">No recent maintenance.</p> : recent.maintenance.map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{m.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'capitalize' }}>{m.category?.replace('_', ' ')}</div>
                </div>
                <span className={`badge ${stColor[m.m_status] || 'badge-gray'}`}>{m.m_status?.replace('_', ' ') || 'requested'}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
