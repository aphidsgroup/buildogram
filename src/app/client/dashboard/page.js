'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';
import styles from './dashboard.module.css';

export default function ClientDashboard() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requirements, setRequirements] = useState([]);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/me').then(r => r.json()), 
      fetch('/api/client/dashboard').then(r => r.json()),
      fetch('/api/requirements').then(r => r.json()).catch(() => ({ data: [] })),
      fetch('/api/proposals').then(r => r.json()).catch(() => ({ data: [] }))
    ])
      .then(([ud, dash, reqs, props]) => { 
        if (ud.user) setUser(ud.user); 
        if (dash.success) setData(dash.data); 
        if (reqs.data) setRequirements(reqs.data);
        if (props.data) setProposals(props.data);
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  const getBadgeVariant = (status) => {
    switch(status) {
      case 'design': return 'info';
      case 'boq_approval': return 'warning';
      case 'execution': return 'warning';
      case 'handover': return 'success';
      case 'complete': return 'success';
      case 'on_hold': return 'default';
      default: return 'default';
    }
  };
  
  const fmt = n => n ? '₹' + (n >= 10000000 ? (n/10000000).toFixed(1)+'Cr' : n >= 100000 ? (n/100000).toFixed(1)+'L' : n.toLocaleString('en-IN')) : '—';

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '60vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  const projects = data?.projects || [];
  const counts = data?.counts || { passports: 0, maintenance: 0, boq_reports: 0, active_requests: 0 };

  return (
    <div className={styles.page}>
      
      {/* ── BANNER ── */}
      <AnimatedSection className={styles.banner}>
        <h1 className={styles.bannerTitle}>Welcome, {user?.name?.split(' ')[0]} 👋</h1>
        <p className={styles.bannerSub}>Manage your property ecosystem</p>
      </AnimatedSection>

      {/* ── STATS GRID ── */}
      <AnimatedSection className={styles.statsGrid} delay={0.05}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🛂</div>
          <div className={styles.statVal}>{counts.passports}</div>
          <div className={styles.statLabel}>Property Passports</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📝</div>
          <div className={styles.statVal}>{counts.active_requests}</div>
          <div className={styles.statLabel}>Active Requests</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statVal}>{counts.boq_reports}</div>
          <div className={styles.statLabel}>BOQ Reports</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🔧</div>
          <div className={styles.statVal}>{counts.maintenance}</div>
          <div className={styles.statLabel}>Maintenance Logs</div>
        </div>
      </AnimatedSection>

      {/* ── ACTIVE PROJECTS ── */}
      <div className={styles.sectionWrap}>
        <h3 className={styles.sectionTitle}>Active Projects</h3>
        {projects.length === 0 ? (
          <AnimatedSection className={styles.emptyState} delay={0.1}>
            <div className={styles.emptyIcon}>🏗️</div>
            <h3 className={styles.emptyTitle}>No Active Construction</h3>
            <p className={styles.emptyDesc}>You don't have any live construction or renovation projects at the moment. Our engineers are ready when you are.</p>
            <button onClick={(e) => { e.preventDefault(); alert('Cost Estimator is being upgraded. Coming soon!'); }} className="btn btn-primary">
              Get a Free Estimate
            </button>
          </AnimatedSection>
        ) : projects.map((p, idx) => (
          <AnimatedSection key={p.id} className={styles.projectCard} delay={0.1 + (idx * 0.05)}>
            <div className={styles.projectHeader}>
              <div>
                <h2 className={styles.projectTitle}>{p.name}</h2>
                <p className={styles.projectMeta}>{p.city}{p.locality ? `, ${p.locality}` : ''} · {p.plot_area_sqft} sqft · {p.floors}</p>
              </div>
              <Badge variant={getBadgeVariant(p.status)}>{p.status?.replace('_', ' ')}</Badge>
            </div>

            <div className={styles.progressWrap}>
              <div className={styles.progressTop}>
                <span className={styles.progressLabel}>Overall Progress</span>
                <span className={styles.progressVal}>{p.completion_pct || 0}%</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${p.completion_pct || 0}%` }} />
              </div>
            </div>

            <div className={styles.projectDetails}>
              {[
                ['Contract Value', fmt(p.total_contract_value)], 
                ['Project Manager', p.pm_name || 'Being Assigned'], 
                ['Start Date', p.start_date ? new Date(p.start_date).toLocaleDateString('en-IN') : 'TBD']
              ].map(([k, v]) => (
                <div key={k} className={styles.detailBox}>
                  <div className={styles.detailLabel}>{k}</div>
                  <div className={styles.detailVal}>{v}</div>
                </div>
              ))}
            </div>

            <div className={styles.projectActions}>
              <button onClick={() => alert('Project details are being upgraded. Coming soon!')} className="btn btn-primary">View Full Project →</button>
              <button onClick={() => alert('Issue tracker is being upgraded. Coming soon!')} className="btn btn-outline">🚨 Raise Issue</button>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* ── REQUIREMENTS & PROPOSALS ── */}
      <div className={styles.sectionWrap}>
        <h3 className={styles.sectionTitle}>Your Requirement Journey</h3>
        <AnimatedSection className={styles.reqGrid} delay={0.15}>
          {requirements.length === 0 && proposals.length === 0 ? (
            <div className={styles.reqEmpty}>No active requirements or proposals yet.</div>
          ) : (
            <>
              {requirements.map(req => (
                <div key={req.id} className={styles.reqCard}>
                  <div className={styles.reqHeader}>
                    <span className={styles.reqTitle}>{req.requirementType.replace('_', ' ')}</span>
                    <Badge variant="info">{req.currentStage || 'Received'}</Badge>
                  </div>
                  <p className={styles.reqMeta}>{req.projectLocation || 'Location TBD'} · {req.budgetRange || 'Budget TBD'}</p>
                  <button className="btn btn-outline btn-sm" onClick={() => alert('Lead detail view is coming soon!')}>View Status</button>
                </div>
              ))}
              {proposals.map(prop => (
                <div key={prop.id} className={styles.reqCard}>
                  <div className={styles.reqHeader}>
                    <span className={styles.reqTitle}>{prop.title}</span>
                    <Badge variant={prop.proposalStatus === 'shared' ? 'success' : 'warning'}>{prop.proposalStatus}</Badge>
                  </div>
                  <p className={styles.reqMeta}>Estimated Value: {prop.estimatedValue || 'Pending'}</p>
                  <button className="btn btn-outline btn-sm" onClick={() => alert('View proposal PDF coming soon...')}>View Draft Proposal</button>
                </div>
              ))}
            </>
          )}
        </AnimatedSection>
      </div>

      {/* ── DOCUMENT VAULT ── */}
      <div className={styles.sectionWrap}>
        <h3 className={styles.sectionTitle}>Your Document Vault</h3>
        <AnimatedSection className={styles.docVault} delay={0.2}>
          <div className={styles.docHeader}>
            <p className={styles.docDesc}>Upload your drawings, floor plans, and BOQs safely here.</p>
            <button className="btn btn-primary btn-sm" onClick={() => alert('Client document upload will be enabled soon.')}>Upload Document</button>
          </div>
          <table className={styles.docTable}>
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan="3" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>No documents in your vault yet.</td></tr>
            </tbody>
          </table>
        </AnimatedSection>
      </div>

      {/* ── QUICK LINKS ── */}
      <div className={styles.sectionWrap}>
        <h3 className={styles.sectionTitle}>Quick Links</h3>
        <AnimatedSection className={styles.linksGrid} delay={0.25}>
          {[
            { icon: '📝', title: 'My Requests', desc: 'Track inquiries and quotes', href: '/client/requests' },
            { icon: '🛂', title: 'Property Passport', desc: 'Permanent property record', href: '/client/passport' },
            { icon: '👤', title: 'My Profile', desc: 'Update your contact preferences', href: '/client/profile' },
          ].map(c => (
            <a key={c.title} href={c.href} onClick={(e) => { e.preventDefault(); alert(`${c.title} module is being upgraded. Coming soon!`); }} className={styles.linkCard}>
              <div className={styles.linkIcon}>{c.icon}</div>
              <h4 className={styles.linkTitle}>{c.title}</h4>
              <p className={styles.linkDesc}>{c.desc}</p>
            </a>
          ))}
        </AnimatedSection>
      </div>

    </div>
  );
}
