'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { roleCan } from '@/lib/permissions';
import LeadDetailWorkspace from './LeadDetailWorkspace';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';
import styles from './dashboard.module.css';

const fmt = (value) => {
  if (value === null || value === undefined || value === "") return "₹0";
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) return String(value);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numberValue);
};

export default function OpsDashboard() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // CRM Filters
  const [pipelineFilter, setPipelineFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    Promise.all([
      fetch('/api/ops/dashboard', { credentials: 'include' }).then(async r => {
        if (!r.ok) {
          const errData = await r.json().catch(() => ({}));
          throw new Error(r.status + ':' + (errData.error || 'Unknown Error'));
        }
        return r.json();
      }),
      fetch('/api/auth/me', { credentials: 'include' }).then(r => r.json()),
      fetch('/api/leads', { credentials: 'include' }).then(r => r.json().catch(() => ({success: false})))
    ]).then(([d, u, lRes]) => {
      if (d.success) setData(d);
      if (u.user) setUser(u.user);
      if (lRes && lRes.success) setLeads(lRes.leads);
      setLoading(false);
    }).catch((err) => {
      const msg = err.message || '';
      if (msg.startsWith('401')) setErrorMsg('Session expired or not logged in.');
      else if (msg.startsWith('403')) setErrorMsg('You do not have admin permission.');
      else if (msg.startsWith('500')) setErrorMsg('Server error: ' + msg);
      else setErrorMsg('Cannot connect to backend API: ' + msg);
      setLoading(false);
    });
  }, []);

  const getBadgeVariant = (status) => {
    const s = String(status).toLowerCase();
    if (['new', 'requested'].includes(s)) return 'info';
    if (['contacted', 'pending'].includes(s)) return 'warning';
    if (['qualified', 'proposal'].includes(s)) return 'primary';
    if (['won', 'verified', 'published'].includes(s)) return 'success';
    if (['lost'].includes(s)) return 'danger';
    return 'default';
  };

  const getPriorityVariant = (priority) => {
    const p = String(priority).toLowerCase();
    if (p === 'high') return 'danger';
    if (p === 'medium') return 'warning';
    return 'default';
  };

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;
  if (errorMsg) return <div className="flex-center" style={{ height: '60vh' }}><div className="text-red-500 font-bold">{errorMsg}</div></div>;
  if (!data) return <div className="flex-center" style={{ height: '60vh' }}><div className="text-red-500 font-bold">Failed to load dashboard. Ensure you have admin access.</div></div>;

  const { kpis, breakdowns, alerts, recent, followUps } = data;

  return (
    <div className={styles.page}>
      
      {/* ── BANNER ── */}
      <AnimatedSection className={styles.banner}>
        <div>
          <h1 className={styles.bannerTitle}>Founder Dashboard</h1>
          <p className={styles.bannerSub}>Comprehensive overview of revenue, operations, and ecosystem health.</p>
        </div>
        <div>
          <Link href="/ops/pilot-launch" className={styles.pilotBtn}>
            🚀 Open Pilot Launch Control
          </Link>
        </div>
      </AnimatedSection>

      {/* ── ALERTS SECTION ── */}
      {(alerts.pendingPartners > 0 || alerts.urgentMaintenance > 0 || alerts.draftListings > 0 || alerts.overdueFollowUps > 0 || alerts.todayFollowUps > 0) && (
        <AnimatedSection className={styles.alertsWrap} delay={0.05}>
          {alerts.overdueFollowUps > 0 && (
            <div className={`${styles.alertBox} ${styles.alertRed}`}>
              <span className={styles.alertIcon}>⏰</span>
              <div>
                <div className={styles.alertTitle}>{alerts.overdueFollowUps} Overdue Follow-ups</div>
                <div className={styles.alertAction}>Action Required</div>
              </div>
            </div>
          )}
          {alerts.todayFollowUps > 0 && (
            <div className={`${styles.alertBox} ${styles.alertYellow}`}>
              <span className={styles.alertIcon}>📅</span>
              <div>
                <div className={styles.alertTitle}>{alerts.todayFollowUps} Follow-ups Due Today</div>
                <div className={styles.alertAction}>Attention Required</div>
              </div>
            </div>
          )}
          {alerts.urgentMaintenance > 0 && (
            <div className={`${styles.alertBox} ${styles.alertRed}`}>
              <span className={styles.alertIcon}>🚨</span>
              <div>
                <div className={styles.alertTitle}>{alerts.urgentMaintenance} Urgent Maintenance</div>
                <Link href="/ops/leads" className={styles.alertAction}>Review Requests →</Link>
              </div>
            </div>
          )}
          {alerts.pendingQueueApprovals > 0 && (
            <div className={`${styles.alertBox} ${styles.alertYellow}`}>
              <span className={styles.alertIcon}>⏳</span>
              <div>
                <div className={styles.alertTitle}>{alerts.pendingQueueApprovals} Pending Approvals</div>
                <Link href="/ops/notification-queue" className={styles.alertAction}>Review WhatsApp Queue →</Link>
              </div>
            </div>
          )}
          {alerts.failedQueueMessages > 0 && (
            <div className={`${styles.alertBox} ${styles.alertRed}`}>
              <span className={styles.alertIcon}>❌</span>
              <div>
                <div className={styles.alertTitle}>{alerts.failedQueueMessages} Failed Messages</div>
                <Link href="/ops/notification-queue" className={styles.alertAction}>Retry Failed Messages →</Link>
              </div>
            </div>
          )}
          {alerts.pendingPartners > 0 && (
            <div className={`${styles.alertBox} ${styles.alertYellow}`}>
              <span className={styles.alertIcon}>🤝</span>
              <div>
                <div className={styles.alertTitle}>{alerts.pendingPartners} Pending Partners</div>
                <Link href="/ops/leads" className={styles.alertAction}>Verify Applications →</Link>
              </div>
            </div>
          )}
          {alerts.draftListings > 0 && (
            <div className={`${styles.alertBox} ${styles.alertGray}`}>
              <span className={styles.alertIcon}>📝</span>
              <div>
                <div className={styles.alertTitle}>{alerts.draftListings} Draft Listings</div>
                <Link href="/ops/leads" className={styles.alertAction}>Publish Listings →</Link>
              </div>
            </div>
          )}
        </AnimatedSection>
      )}

      {/* ── CORE KPIs ── */}
      <div>
        <h2 className={styles.sectionTitle}>Core Metrics</h2>
        <AnimatedSection className={styles.metricsGrid} delay={0.1}>
          <div className={styles.metricCard}>
              <div className={styles.metricIcon} style={{ background: '#eff6ff' }}>👥</div>
              <div className={styles.metricVal}>{kpis.totalLeads}</div>
              <div className={styles.metricLabel}>Total CRM Leads</div>
              <div className={styles.metricSub}>+{kpis.newLeadsMonth} this month</div>
          </div>
          <div className={styles.metricCard}>
              <div className={styles.metricIcon} style={{ background: '#fdf4ff' }}>🏠</div>
              <div className={styles.metricVal}>{kpis.publishedListings}</div>
              <div className={styles.metricLabel}>Published Listings</div>
              <div className={styles.metricSub}>Public facing properties</div>
          </div>
          <div className={styles.metricCard} style={{ background: '#fdf2f8', borderColor: '#fbcfe8' }}>
              <div className={styles.metricIcon} style={{ background: '#fce7f3' }}>📞</div>
              <div className={styles.metricVal} style={{ color: '#831843' }}>{kpis.propertyInquiries}</div>
              <div className={styles.metricLabel} style={{ color: '#be185d' }}>Property Inquiries</div>
              <div className={styles.metricSub} style={{ color: '#9d174d' }}>From public listings</div>
          </div>
          <div className={styles.metricCard}>
              <div className={styles.metricIcon} style={{ background: '#ecfdf5' }}>🛂</div>
              <div className={styles.metricVal}>{kpis.activePassports}</div>
              <div className={styles.metricLabel}>Active Passports</div>
              <div className={styles.metricSub}>{kpis.avgCompleteness}% avg completeness</div>
          </div>
        </AnimatedSection>
      </div>

      {/* ── CRM PIPELINE ── */}
      <div>
        <h2 className={styles.sectionTitle}>CRM Pipeline</h2>
        
        <AnimatedSection className={styles.metricsGrid} delay={0.15}>
          <div className={styles.metricCard}>
              <div className={styles.metricVal}>{leads.length}</div>
              <div className={styles.metricLabel}>Total Leads</div>
          </div>
          <div className={styles.metricCard} style={{ background: '#eff6ff', borderColor: '#dbeafe' }}>
              <div className={styles.metricVal} style={{ color: '#1e40af' }}>{leads.filter(l => l.pipelineStage === 'New').length}</div>
              <div className={styles.metricLabel} style={{ color: '#1d4ed8' }}>New Leads</div>
          </div>
          <div className={styles.metricCard} style={{ background: '#fef2f2', borderColor: '#fecaca' }}>
              <div className={styles.metricVal} style={{ color: '#991b1b' }}>{leads.filter(l => l.priority === 'High').length}</div>
              <div className={styles.metricLabel} style={{ color: '#b91c1c' }}>High Priority</div>
          </div>
          <div className={styles.metricCard} style={{ background: '#fefce8', borderColor: '#fef08a' }}>
              <div className={styles.metricVal} style={{ color: '#854d0e' }}>
                {leads.filter(l => l.nextFollowUpDate && new Date(l.nextFollowUpDate) < new Date()).length}
              </div>
              <div className={styles.metricLabel} style={{ color: '#a16207' }}>Overdue Follow-ups</div>
          </div>
        </AnimatedSection>

        <AnimatedSection className={styles.filters} delay={0.2}>
          <select className="input" style={{ width: '200px' }} value={pipelineFilter} onChange={e => setPipelineFilter(e.target.value)}>
            <option value="All">All Stages</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Requirement Collected">Requirement Collected</option>
            <option value="BOQ / Scope Review">BOQ / Scope Review</option>
            <option value="Partner Matching">Partner Matching</option>
            <option value="Material Quote Shared">Material Quote Shared</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
          <select className="input" style={{ width: '200px' }} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="All">All Types</option>
            <option value="construction">Construction</option>
            <option value="boq_audit">BOQ Audit</option>
            <option value="material_quote">Materials</option>
            <option value="partner_application">Partner App</option>
            <option value="property_listing">Property</option>
          </select>
        </AnimatedSection>

        <AnimatedSection className={styles.tableWrap} delay={0.25}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Stage</th>
                <th>Priority</th>
                <th>Follow-up</th>
                <th className={styles.right}>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.filter(l => (pipelineFilter === 'All' || l.pipelineStage === pipelineFilter) && (typeFilter === 'All' || l.leadType === typeFilter)).length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No leads match the current filters.</td></tr>
              ) : leads.filter(l => (pipelineFilter === 'All' || l.pipelineStage === pipelineFilter) && (typeFilter === 'All' || l.leadType === typeFilter)).map(l => (
                <tr key={l.id}>
                  <td>
                    <div className={styles.leadName}>{l.name}</div>
                    <div className={styles.leadPhone}>{l.phone}</div>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>{l.leadType.replace('_', ' ')}</td>
                  <td>
                    <Badge variant={getBadgeVariant(l.pipelineStage)}>{l.pipelineStage}</Badge>
                  </td>
                  <td>
                    <Badge variant={getPriorityVariant(l.priority)}>{l.priority}</Badge>
                  </td>
                  <td>
                    {l.nextFollowUpDate ? new Date(l.nextFollowUpDate).toLocaleDateString('en-IN') : '—'}
                  </td>
                  <td className={styles.right}>
                    <button onClick={() => setSelectedLead(l)} className="btn btn-outline btn-sm">Workspace</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AnimatedSection>
      </div>

      <AnimatedSection className={styles.metricsGrid} delay={0.3}>
        <div className={styles.metricCard}>
            <div className={styles.metricIcon} style={{ background: '#eff6ff' }}>💬</div>
            <div className={styles.metricVal}>{data?.queue?.sentThisMonth || 0}</div>
            <div className={styles.metricLabel}>Messages Sent</div>
            <div className={styles.metricSub}>Via Auto-Queue this month</div>
        </div>
        <div className={styles.metricCard} style={{ background: '#fefce8', borderColor: '#fef08a' }}>
            <div className={styles.metricIcon} style={{ background: '#fef08a' }}>🤝</div>
            <div className={styles.metricVal} style={{ color: '#854d0e' }}>{kpis.referredLeads}</div>
            <div className={styles.metricLabel} style={{ color: '#a16207' }}>Partner Referrals</div>
            <div className={styles.metricSub} style={{ color: '#ca8a04' }}>{kpis.convertedReferrals} Converted</div>
        </div>
        {user && roleCan(user.role, 'view_revenue') && (
          <>
            <div className={styles.metricCard} style={{ background: '#fff7ed', borderColor: '#fed7aa' }}>
                <div className={styles.metricIcon} style={{ background: '#fed7aa' }}>💰</div>
                <div className={styles.metricVal} style={{ color: '#9a3412' }}>{fmt(kpis.referralExpected)}</div>
                <div className={styles.metricLabel} style={{ color: '#c2410c' }}>Exp. Referral Comm.</div>
            </div>
            <div className={styles.metricCard} style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                <div className={styles.metricIcon} style={{ background: '#bbf7d0' }}>💸</div>
                <div className={styles.metricVal} style={{ color: '#166534' }}>{fmt(kpis.referralPaid)}</div>
                <div className={styles.metricLabel} style={{ color: '#15803d' }}>Paid Referral Comm.</div>
            </div>
          </>
        )}
      </AnimatedSection>

      {user && roleCan(user.role, 'manage_invoices') && (
        <AnimatedSection delay={0.35}>
          <h3 className={styles.sectionTitle}>Invoicing Health</h3>
          <div className={styles.metricsGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className={styles.metricCard}>
                <div className={styles.metricIcon} style={{ background: '#f1f5f9' }}>🧾</div>
                <div className={styles.metricVal}>{fmt(data?.invoices?.total_invoiced)}</div>
                <div className={styles.metricLabel}>Total Invoiced</div>
            </div>
            <div className={styles.metricCard} style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                <div className={styles.metricIcon} style={{ background: '#dcfce7' }}>✅</div>
                <div className={styles.metricVal} style={{ color: '#166534' }}>{fmt(data?.invoices?.total_paid)}</div>
                <div className={styles.metricLabel} style={{ color: '#15803d' }}>Invoices Paid</div>
            </div>
            <div className={styles.metricCard} style={{ background: '#fef2f2', borderColor: '#fecaca' }}>
                <div className={styles.metricIcon} style={{ background: '#fee2e2' }}>⏳</div>
                <div className={styles.metricVal} style={{ color: '#991b1b' }}>{fmt(data?.invoices?.total_due)}</div>
                <div className={styles.metricLabel} style={{ color: '#b91c1c' }}>Invoices Due</div>
            </div>
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection className={styles.breakdownGrid} delay={0.4}>
        {/* ── LEAD BREAKDOWN ── */}
        <div className={styles.breakdownCard}>
          <h2 className={styles.breakdownTitle}>Lead Distribution by Type</h2>
          <div>
            {breakdowns.leadTypes.map(lt => (
              <div key={lt.lead_type} className={styles.breakdownItem}>
                <span className={styles.breakdownLabel}>{lt.lead_type.replace('_', ' ')}</span>
                <span className={styles.breakdownVal}>{lt.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── PIPELINE BREAKDOWN ── */}
        <div className={styles.breakdownCard}>
          <h2 className={styles.breakdownTitle}>Pipeline Status</h2>
          <div>
            {breakdowns.statuses.map(st => (
              <div key={st.status} className={styles.breakdownItem}>
                <span className={styles.breakdownLabel}>{st.status.replace('_', ' ')}</span>
                <span className={styles.breakdownVal}>{st.count}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── FOLLOW-UPS & PENDING ACTIONS ── */}
      <div>
        <h2 className={styles.sectionTitle}>Follow-ups & Pending Actions</h2>
        <AnimatedSection className={styles.fuCard} delay={0.45}>
          {followUps && (followUps.overdue.length > 0 || followUps.today.length > 0 || followUps.upcoming.length > 0) ? (
            <div>
              {/* Overdue */}
              {followUps.overdue.length > 0 && (
                <div className={`${styles.fuSection} ${styles.red}`}>
                  <h3 className={styles.fuTitle} style={{ color: '#991b1b' }}>Overdue Action Required</h3>
                  <div>
                    {followUps.overdue.map(f => (
                      <div key={f.activity_id} className={styles.fuItem} style={{ borderColor: '#fca5a5' }}>
                        <div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                            <span className={styles.fuLeadName}>{f.lead_name}</span>
                            <Badge variant={getBadgeVariant(f.lead_status)}>{f.lead_status}</Badge>
                            <span className={styles.fuTypeBadge}>{f.lead_type.replace('_', ' ')}</span>
                          </div>
                          <div className={styles.fuTaskTitle}>{f.title}</div>
                          {f.description && <div className={styles.fuTaskDesc}>{f.description}</div>}
                        </div>
                        <div className={styles.fuMeta}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#dc2626' }}>{new Date(f.follow_up_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                          {f.lead_phone && <span style={{ fontSize: '12px', color: '#64748b' }}>📞 {f.lead_phone}</span>}
                          <Link href="/ops/leads" className="btn btn-ghost btn-sm" style={{ padding: '2px 8px', fontSize: '11px', color: '#2563eb' }}>Go to Leads →</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Today */}
              {followUps.today.length > 0 && (
                <div className={`${styles.fuSection} ${styles.yellow}`}>
                  <h3 className={styles.fuTitle} style={{ color: '#92400e' }}>Due Today</h3>
                  <div>
                    {followUps.today.map(f => (
                      <div key={f.activity_id} className={styles.fuItem} style={{ borderColor: '#fde68a' }}>
                        <div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                            <span className={styles.fuLeadName}>{f.lead_name}</span>
                            <Badge variant={getBadgeVariant(f.lead_status)}>{f.lead_status}</Badge>
                            <span className={styles.fuTypeBadge}>{f.lead_type.replace('_', ' ')}</span>
                          </div>
                          <div className={styles.fuTaskTitle}>{f.title}</div>
                          {f.description && <div className={styles.fuTaskDesc}>{f.description}</div>}
                        </div>
                        <div className={styles.fuMeta}>
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
                <div className={`${styles.fuSection} ${styles.gray}`}>
                  <h3 className={styles.fuTitle} style={{ color: '#475569' }}>Upcoming This Week</h3>
                  <div>
                    {followUps.upcoming.map(f => (
                      <div key={f.activity_id} className={styles.fuItem} style={{ borderColor: '#e2e8f0' }}>
                        <div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                            <span className={styles.fuLeadName}>{f.lead_name}</span>
                            <Badge variant={getBadgeVariant(f.lead_status)}>{f.lead_status}</Badge>
                            <span className={styles.fuTypeBadge}>{f.lead_type.replace('_', ' ')}</span>
                          </div>
                          <div className={styles.fuTaskTitle}>{f.title}</div>
                        </div>
                        <div className={styles.fuMeta}>
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
        </AnimatedSection>
      </div>

      {/* ── RECENT ACTIVITY TABS ── */}
      <div>
        <h2 className={styles.sectionTitle}>Recent Ecosystem Activity</h2>
        
        <AnimatedSection className={styles.breakdownGrid} delay={0.5}>
          
          {/* Partners */}
          <div className={styles.actPanel}>
            <div className={styles.actHeader} style={{ background: '#f8fafc' }}>
              <h3 className={styles.actTitle} style={{ color: '#334155' }}>Recent Partner Applications</h3>
            </div>
            <div className={styles.actList}>
              {recent.partners.length === 0 ? <p className="text-muted text-sm py-4">No recent partners.</p> : recent.partners.map(p => (
                <div key={p.id} className={styles.actItem}>
                  <div>
                    <div className={styles.actName}>{p.name}</div>
                    <div className={styles.actType}>{p.category || 'General'}</div>
                  </div>
                  <Badge variant={getBadgeVariant(p.v_status)}>{p.v_status || 'pending'}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className={styles.actPanel}>
            <div className={styles.actHeader} style={{ background: '#fff7ed' }}>
              <h3 className={styles.actTitle} style={{ color: '#9a3412' }}>Recent Material Quotes</h3>
            </div>
            <div className={styles.actList}>
              {recent.materials.length === 0 ? <p className="text-muted text-sm py-4">No recent quotes.</p> : recent.materials.map(m => (
                <div key={m.id} className={styles.actItem}>
                  <div>
                    <div className={styles.actName}>{m.name}</div>
                    <div className={styles.actType}>{m.category || 'Materials'}</div>
                  </div>
                  <Badge variant={getBadgeVariant(m.status)}>{m.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Listings */}
          <div className={styles.actPanel}>
            <div className={styles.actHeader} style={{ background: '#fdf4ff' }}>
              <h3 className={styles.actTitle} style={{ color: '#86198f' }}>Recent Property Listings</h3>
            </div>
            <div className={styles.actList}>
              {recent.listings.length === 0 ? <p className="text-muted text-sm py-4">No recent listings.</p> : recent.listings.map(l => (
                <div key={l.id} className={styles.actItem}>
                  <div>
                    <div className={styles.actName}>{l.name}</div>
                    <div className={styles.actType}>{l.type || 'Listing'}</div>
                  </div>
                  <Badge variant={getBadgeVariant(l.p_status)}>{l.p_status || 'draft'}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance */}
          <div className={styles.actPanel}>
            <div className={styles.actHeader} style={{ background: '#f0fdfa' }}>
              <h3 className={styles.actTitle} style={{ color: '#115e59' }}>Recent Maintenance Requests</h3>
            </div>
            <div className={styles.actList}>
              {recent.maintenance.length === 0 ? <p className="text-muted text-sm py-4">No recent maintenance.</p> : recent.maintenance.map(m => (
                <div key={m.id} className={styles.actItem}>
                  <div>
                    <div className={styles.actName}>{m.name}</div>
                    <div className={styles.actType}>{m.category?.replace('_', ' ')}</div>
                  </div>
                  <Badge variant={getBadgeVariant(m.m_status)}>{m.m_status?.replace('_', ' ') || 'requested'}</Badge>
                </div>
              ))}
            </div>
          </div>

        </AnimatedSection>
      </div>

      {/* ── CRM WORKSPACE (DRAWER) ── */}
      {selectedLead && (
        <LeadDetailWorkspace 
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)} 
          onUpdate={async (id, updates) => {
            await fetch('/api/leads', { method: 'PATCH', body: JSON.stringify({ id, ...updates }) });
            // Re-fetch to get activity logs populated by backend
            const r = await fetch('/api/leads', { credentials: 'include' }).then(res => res.json());
            if (r.success) {
              setLeads(r.leads);
              setSelectedLead(r.leads.find(l => l.id === id));
            }
          }}
          onAddNote={async (id, action, note) => {
            await fetch('/api/leads', { method: 'PATCH', body: JSON.stringify({ id, action, note }) });
            const r = await fetch('/api/leads', { credentials: 'include' }).then(res => res.json());
            if (r.success) {
              setLeads(r.leads);
              setSelectedLead(r.leads.find(l => l.id === id));
            }
          }}
        />
      )}
    </div>
  );
}
