'use client';
import { useState, useEffect } from 'react';
import {
  calcProfileCompletion, PARTNER_CATEGORIES, APPROVAL_STATUSES
} from '@/lib/partnerStore';
import { opsGetPartners, opsCreatePartner, opsUpdatePartner, opsUpdatePartnerStatus, opsDeletePartner } from '@/lib/partnerApi';
import { opsGetEnquiries } from '@/lib/enquiryApi';


const APPROVAL_COLORS = {
  'verified':       { bg: '#DCFCE7', color: '#166534', label: 'Verified' },
  'pending_review': { bg: '#FEF9C3', color: '#854D0E', label: 'Pending Review' },
  'pending':        { bg: '#FEF9C3', color: '#854D0E', label: 'Pending Review' },
  'rejected':       { bg: '#FEE2E2', color: '#991B1B', label: 'Rejected' },
  'suspended':      { bg: '#F1F5F9', color: '#475569', label: 'Suspended' },
};

const BLANK_PARTNER = {
  slug: '', companyName: '', category: 'Builder', shortDescription: '', fullDescription: '',
  location: '', serviceAreas: '', yearsExperience: '', contactPerson: '',
  phone: '', email: '', whatsapp: '', website: '',
  logoUrl: '', coverUrl: '',
  approvalStatus: 'pending_review', isActive: false, isFeatured: false,
};

function Badge({ status }) {
  const c = APPROVAL_COLORS[status] || APPROVAL_COLORS['pending_review'];
  return <span style={{ background: c.bg, color: c.color, padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700 }}>{c.label || status}</span>;
}

function CompletionBar({ pct }) {
  const color = pct >= 80 ? '#10B981' : pct >= 50 ? '#F59E0B' : '#EF4444';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '3px' }} />
      </div>
      <span style={{ fontSize: '11px', fontWeight: 700, color, minWidth: '30px' }}>{pct}%</span>
    </div>
  );
}

function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: '20px', width: '100%', maxWidth: '680px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8' }}>✕</button>
        </div>
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>{children}</div>
        {footer && <div style={{ padding: '18px 28px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>{footer}</div>}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748B', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = { width: '100%', padding: '9px 13px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' };

export default function OpsPartnersV2() {
  const [partners, setPartners] = useState([]);
  const [allLeads, setAllLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selected, setSelected] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [form, setForm] = useState(BLANK_PARTNER);
  const [editSlug, setEditSlug] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [activeTab, setActiveTab] = useState('partners');
  const [enquiries, setEnquiries] = useState([]);
  const [toast, setToast] = useState('');

  const showToast = (msg, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(''), 3500);
  };

  const load = async () => {
    setLoadingPartners(true);
    try {
      const [res, enqRes] = await Promise.all([
        opsGetPartners().catch(() => ({ success: false })),
        opsGetEnquiries().catch(() => ({ success: false }))
      ]);
      
      if (res.success && Array.isArray(res.partners)) {
        setPartners(res.partners);
      } else {
        const { getPartners } = await import('@/lib/partnerStore').catch(() => ({ getPartners: () => [] }));
        setPartners(typeof getPartners === 'function' ? getPartners() : []);
      }

      if (enqRes.success && Array.isArray(enqRes.enquiries)) {
        setEnquiries(enqRes.enquiries);
      }
    } catch {
      try {
        const { getPartners } = await import('@/lib/partnerStore');
        setPartners(getPartners());
      } catch {}
    } finally {
      setLoadingPartners(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggle = async (id, slug, field) => {
    const partner = partners.find(p => p.id === id || p.slug === slug);
    if (!partner) return;
    const update = { [field === 'isActive' ? 'isActive' : 'isFeatured']: !partner[field] };
    await opsUpdatePartnerStatus(id || slug, update).catch(() => {});
    load();
  };

  const setApproval = async (id, slug, status) => {
    let rejectionReason = null;
    if (status === 'rejected') {
      rejectionReason = prompt('Reason for rejection (optional but recommended):');
      if (rejectionReason === null) return; // user cancelled
    }
    const update = { approvalStatus: status };
    if (rejectionReason) update.rejectionReason = rejectionReason;
    
    await opsUpdatePartnerStatus(id || slug, update).catch(() => {});
    load();
  };

  const handleAdd = async () => {
    if (!form.companyName || !form.slug || !form.category) return alert('Company name, slug, and category are required');
    const res = await opsCreatePartner(form);
    if (res.success) {
      showToast('✅ Partner created!');
      load();
      setAddModal(false);
      setForm(BLANK_PARTNER);
    } else {
      alert('Error: ' + (res.message || 'Failed to create partner'));
    }
  };

  const handleEdit = async () => {
    if (!form.companyName) return alert('Company name is required');
    const res = await opsUpdatePartner(editId, form);
    if (res.success) {
      showToast('✅ Partner updated!');
      load();
      setEditModal(false);
      if (selected?.id === editId) setSelected({ ...selected, ...form });
    } else {
      alert('Error: ' + (res.message || 'Failed to update'));
    }
  };

  const openEdit = (partner) => {
    setForm({ ...partner });
    setEditSlug(partner.slug);
    setEditId(partner.id);
    setEditModal(true);
  };

  const handleDelete = async (id, slug) => {
    if (!confirm('Deactivate this partner? They will no longer appear on the public directory.')) return;
    await opsDeletePartner(id || slug).catch(() => {});
    load();
    if (selected?.id === id || selected?.slug === slug) setSelected(null);
  };


  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const fb = k => e => setForm(p => ({ ...p, [k]: e.target.checked }));

  const filtered = partners.filter(p => {
    const ms = !search || p.companyName?.toLowerCase().includes(search.toLowerCase()) || p.contactPerson?.toLowerCase().includes(search.toLowerCase()) || p.slug?.includes(search.toLowerCase());
    const fc = filterCat === 'All' || p.category === filterCat;
    const fs = filterStatus === 'All' || p.approvalStatus === filterStatus;
    return ms && fc && fs;
  });

  const counts = {
    total: partners.length,
    approved: partners.filter(p => p.approvalStatus === 'verified').length,
    pending: partners.filter(p => p.approvalStatus === 'pending_review' || p.approvalStatus === 'pending').length,
    featured: partners.filter(p => p.isFeatured).length,
    active: partners.filter(p => p.isActive).length,
  };

  const PartnerForm = () => (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Field label="Company Name *">
          <input style={inputStyle} value={form.companyName} onChange={f('companyName')} placeholder="Company or firm name" />
        </Field>
        <Field label="Slug * (URL: /partners/slug)">
          <input style={inputStyle} value={form.slug} onChange={f('slug')} placeholder="e.g. my-builder-co" />
        </Field>
        <Field label="Category *">
          <select style={inputStyle} value={form.category} onChange={f('category')}>
            {PARTNER_CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Approval Status">
          <select style={inputStyle} value={form.approvalStatus} onChange={f('approvalStatus')}>
            {APPROVAL_STATUSES.map(s => <option key={s} value={s}>{APPROVAL_COLORS[s]?.label || s}</option>)}
          </select>
        </Field>
        <Field label="Location">
          <input style={inputStyle} value={form.location} onChange={f('location')} placeholder="Area, City" />
        </Field>
        <Field label="Years of Experience">
          <input style={inputStyle} type="number" value={form.yearsExperience} onChange={f('yearsExperience')} placeholder="e.g. 10" />
        </Field>
        <Field label="Contact Person">
          <input style={inputStyle} value={form.contactPerson} onChange={f('contactPerson')} placeholder="Primary contact name" />
        </Field>
        <Field label="Phone">
          <input style={inputStyle} value={form.phone} onChange={f('phone')} placeholder="10-digit mobile" />
        </Field>
        <Field label="Email">
          <input style={inputStyle} value={form.email} onChange={f('email')} type="email" placeholder="business@email.com" />
        </Field>
        <Field label="WhatsApp">
          <input style={inputStyle} value={form.whatsapp} onChange={f('whatsapp')} placeholder="+91..." />
        </Field>
        <Field label="Website">
          <input style={inputStyle} value={form.website} onChange={f('website')} placeholder="https://..." />
        </Field>
        <Field label="Service Areas">
          <input style={inputStyle} value={form.serviceAreas} onChange={f('serviceAreas')} placeholder="Chennai, Coimbatore..." />
        </Field>
        <Field label="Logo URL">
          <input style={inputStyle} value={form.logoUrl} onChange={f('logoUrl')} placeholder="https://..." />
        </Field>
        <Field label="Cover Image URL">
          <input style={inputStyle} value={form.coverUrl} onChange={f('coverUrl')} placeholder="https://..." />
        </Field>
      </div>
      <Field label="Short Description (shown on directory card)">
        <textarea style={{ ...inputStyle, minHeight: '70px', resize: 'vertical' }} value={form.shortDescription} onChange={f('shortDescription')} placeholder="One-line summary shown on partner card..." />
      </Field>
      <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
          <input type="checkbox" checked={form.isActive} onChange={fb('isActive')} style={{ width: '16px', height: '16px', accentColor: '#10B981' }} />
          Active (visible on site)
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
          <input type="checkbox" checked={form.isFeatured} onChange={fb('isFeatured')} style={{ width: '16px', height: '16px', accentColor: '#FC6E20' }} />
          Featured Partner
        </label>
      </div>
    </div>
  );

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '24px', borderBottom: '2px solid #E2E8F0', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('partners')}
          style={{ background: 'none', border: 'none', borderBottom: activeTab === 'partners' ? '2px solid #FC6E20' : '2px solid transparent', padding: '12px 0', fontSize: '15px', fontWeight: 700, color: activeTab === 'partners' ? '#1E293B' : '#94A3B8', cursor: 'pointer', marginBottom: '-2px' }}
        >
          Partner Directory
        </button>
        <button
          onClick={() => setActiveTab('enquiries')}
          style={{ background: 'none', border: 'none', borderBottom: activeTab === 'enquiries' ? '2px solid #FC6E20' : '2px solid transparent', padding: '12px 0', fontSize: '15px', fontWeight: 700, color: activeTab === 'enquiries' ? '#1E293B' : '#94A3B8', cursor: 'pointer', marginBottom: '-2px' }}
        >
          Public Enquiries {enquiries.length > 0 && <span style={{ background: '#FC6E20', color: 'white', borderRadius: '99px', padding: '2px 8px', fontSize: '11px', marginLeft: '6px' }}>{enquiries.length}</span>}
        </button>
      </div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 900 }}>Partner Management</h1>
          <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>{partners.length} partners · {counts.approved} approved · {counts.pending} pending review</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="/partners/directory" target="_blank" rel="noreferrer" style={{ padding: '9px 18px', borderRadius: '10px', border: '1.5px solid #E2E8F0', background: 'white', fontSize: '13px', fontWeight: 700, color: '#64748B', textDecoration: 'none' }}>🔗 Public Directory</a>
          <button onClick={() => { setForm(BLANK_PARTNER); setAddModal(true); }} style={{ padding: '9px 18px', borderRadius: '10px', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            + Add Partner
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        {[
          { label: 'Total Partners', value: counts.total, color: '#FC6E20' },
          { label: 'Approved', value: counts.approved, color: '#10B981' },
          { label: 'Pending Review', value: counts.pending, color: '#F59E0B' },
          { label: 'Featured', value: counts.featured, color: '#6366F1' },
          { label: 'Active (Live)', value: counts.active, color: '#0EA5E9' },
          { label: 'Public Enquiries', value: allLeads.length, color: '#8B5CF6' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: 'white', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '16px 18px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>{label}</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#1E293B' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {activeTab === 'partners' ? (
        <>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center', background: 'white', padding: '16px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <input style={{ ...inputStyle, maxWidth: '260px' }} value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search by name or slug..." />
            <select style={{ ...inputStyle, maxWidth: '180px' }} value={filterCat} onChange={e => setFilterCat(e.target.value)}>
              <option value="All">All Categories</option>
              {PARTNER_CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select style={{ ...inputStyle, maxWidth: '180px' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="All">All Statuses</option>
              {APPROVAL_STATUSES.map(s => <option key={s} value={s}>{APPROVAL_COLORS[s]?.label || s}</option>)}
            </select>
            <span style={{ fontSize: '13px', color: '#94A3B8', marginLeft: 'auto' }}>{filtered.length} shown</span>
          </div>

          {/* Partner Table */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '900px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                {['Partner', 'Category', 'Location', 'Contact', 'Status', 'Profile', 'Leads', 'Active', 'Featured', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(partner => {
                const profileObj = calcProfileCompletion(partner);
                const completion = partner.profileCompletion || (typeof profileObj === 'object' ? profileObj.score : profileObj);
                const partnerLeads = partner.enquiryCount || 0;

                return (
                  <tr key={partner.id} style={{ borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FAFBFC'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    onClick={() => setSelected(partner)}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: partner.logoUrl ? `url(${partner.logoUrl}) center/cover` : '#FC6E2022', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, color: '#FC6E20', flexShrink: 0 }}>
                          {!partner.logoUrl && partner.companyName?.[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '13px' }}>{partner.companyName}</div>
                          <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'monospace' }}>/{partner.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: '#F1F5F9', color: '#475569', padding: '3px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 600 }}>{partner.category}</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#64748B', fontSize: '13px' }}>{partner.location || '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>{partner.contactPerson || '—'}</div>
                      <div style={{ fontSize: '12px', color: '#94A3B8' }}>{partner.phone || ''}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div>
                        <Badge status={partner.approvalStatus} />
                        <div style={{ marginTop: '6px' }}>
                          <select value={partner.approvalStatus} onChange={e => { e.stopPropagation(); setApproval(partner.id, partner.slug, e.target.value); }}
                            onClick={e => e.stopPropagation()}
                            style={{ fontSize: '11px', padding: '3px 6px', borderRadius: '6px', border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer' }}>
                            {APPROVAL_STATUSES.map(s => <option key={s} value={s}>{APPROVAL_COLORS[s]?.label || s}</option>)}
                          </select>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', minWidth: '120px' }}>
                      <CompletionBar pct={completion} />
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <span style={{ fontWeight: 700, color: partnerLeads > 0 ? '#8B5CF6' : '#94A3B8' }}>{partnerLeads}</span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }} onClick={e => { e.stopPropagation(); toggle(partner.id, partner.slug, 'isActive'); }}>
                      <div style={{ width: '36px', height: '20px', borderRadius: '10px', background: partner.isActive ? '#10B981' : '#E2E8F0', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                        <div style={{ position: 'absolute', top: '2px', left: partner.isActive ? '18px' : '2px', width: '16px', height: '16px', borderRadius: '50%', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }} onClick={e => { e.stopPropagation(); toggle(partner.id, partner.slug, 'isFeatured'); }}>
                      <span style={{ fontSize: '18px', cursor: 'pointer', opacity: partner.isFeatured ? 1 : 0.25 }}>⭐</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={e => { e.stopPropagation(); openEdit(partner); }} style={{ background: 'none', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', fontSize: '12px' }}>✏️ Edit</button>
                        <a href={`/partners/${partner.slug}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ background: 'none', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', fontSize: '12px', textDecoration: 'none', color: '#FC6E20', fontWeight: 600 }}>👁️</a>
                        <button onClick={e => { e.stopPropagation(); handleDelete(partner.id, partner.slug); }} style={{ background: 'none', border: '1px solid #FEE2E2', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', fontSize: '12px', color: '#EF4444' }}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94A3B8' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🤝</div>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>No partners found</div>
            <div style={{ fontSize: '14px' }}>Add your first partner or adjust the filters.</div>
          </div>
        )}
      </div>
        </>
      ) : (
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '900px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '16px 20px' }}>Date</th>
                  <th style={{ padding: '16px 20px' }}>Customer</th>
                  <th style={{ padding: '16px 20px' }}>Partner</th>
                  <th style={{ padding: '16px 20px' }}>Requirement</th>
                  <th style={{ padding: '16px 20px' }}>Status</th>
                  <th style={{ padding: '16px 20px' }}>Spam Flag</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map(enq => (
                  <tr key={enq.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '16px 20px', color: '#64748B' }}>{new Date(enq.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 700 }}>{enq.customer_name}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{enq.phone}</div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 600 }}>{enq.partner_name || 'N/A'}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{enq.category || 'N/A'}</div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div>{enq.requirement}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{enq.budget_range}</div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <Badge status={enq.status} />
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {enq.spam_status === 'spam' && <span style={{ background: '#FEE2E2', color: '#991B1B', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>SPAM</span>}
                      {enq.spam_status === 'suspicious' && <span style={{ background: '#FEF9C3', color: '#854D0E', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>SUSPICIOUS</span>}
                      {(enq.spam_status === 'clean' || !enq.spam_status) && <span style={{ background: '#DCFCE7', color: '#166534', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>CLEAN</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {enquiries.length === 0 && (
            <div style={{ padding: '48px', textAlign: 'center', color: '#94A3B8' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>📨</div>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>No enquiries found</div>
              <div style={{ fontSize: '14px' }}>Public enquiries will appear here.</div>
            </div>
          )}
        </div>
      )}

      {/* Partner Detail Slide-Over */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 999 }} onClick={() => setSelected(null)}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: '480px', background: 'white', overflowY: 'auto', boxShadow: '-20px 0 60px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800 }}>{selected.companyName}</h2>
                <div style={{ fontSize: '13px', color: '#94A3B8' }}>/{selected.slug} · {selected.category}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8' }}>✕</button>
            </div>
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Badge status={selected.approvalStatus} />
                {selected.isActive && <span style={{ background: '#DCFCE7', color: '#166534', padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700 }}>🟢 Active</span>}
                {selected.isFeatured && <span style={{ background: 'rgba(252,110,32,0.1)', color: '#FC6E20', padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700 }}>⭐ Featured</span>}
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '10px' }}>Profile Completion</div>
                <CompletionBar pct={calcProfileCompletion(selected)} />
              </div>

              {[['📞 Phone', selected.phone], ['📧 Email', selected.email], ['📍 Location', selected.location], ['🗺️ Service Areas', selected.serviceAreas], ['👤 Contact', selected.contactPerson], ['🌐 Website', selected.website], ['⏰ Experience', selected.yearsExperience ? `${selected.yearsExperience} years` : null]].filter(([, v]) => v).map(([k, v]) => (
                <div key={k} style={{ padding: '10px 12px', background: '#F8FAFC', borderRadius: '10px', marginBottom: '8px' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, marginBottom: '3px' }}>{k}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', wordBreak: 'break-all' }}>{v}</div>
                </div>
              ))}

              {selected.shortDescription && (
                <div style={{ padding: '14px', background: '#FFF7ED', borderRadius: '10px', borderLeft: '3px solid #FC6E20', fontSize: '14px', lineHeight: 1.65, color: '#7C2D12' }}>
                  {selected.shortDescription}
                </div>
              )}

              {/* Leads for this partner */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Public Enquiries ({allLeads.filter(l => l.partnerSlug === selected.slug).length})
                </div>
                {allLeads.filter(l => l.partnerSlug === selected.slug).slice(0, 5).map(lead => (
                  <div key={lead.id} style={{ padding: '10px 12px', background: '#F8FAFC', borderRadius: '10px', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px' }}>{lead.customerName} · {lead.phone}</div>
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{lead.requirement} · {lead.budgetRange} · {lead.createdAt}</div>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>
                      <span style={{ background: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>{lead.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button onClick={() => openEdit(selected)} style={{ flex: 1, padding: '10px', borderRadius: '10px', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}>✏️ Edit Partner</button>
                <a href={`/partners/${selected.slug}`} target="_blank" rel="noreferrer" style={{ padding: '10px 16px', borderRadius: '10px', background: '#EFF6FF', color: '#2563EB', textDecoration: 'none', fontWeight: 700, fontSize: '13px' }}>👁️ View Public</a>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['verified', 'pending_review', 'rejected', 'suspended'].map(s => (
                  <button key={s} onClick={() => { setApproval(selected.id, selected.slug, s); setSelected(p => ({ ...p, approvalStatus: s })); }}
                    style={{ padding: '7px 14px', borderRadius: '8px', border: '1.5px solid', cursor: 'pointer', fontSize: '12px', fontWeight: 700, background: selected.approvalStatus === s ? (APPROVAL_COLORS[s]?.color || '#FC6E20') : 'white', color: selected.approvalStatus === s ? 'white' : (APPROVAL_COLORS[s]?.color || '#64748B'), borderColor: APPROVAL_COLORS[s]?.color || '#E2E8F0', transition: 'all 0.15s' }}>
                    {APPROVAL_COLORS[s]?.label || s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      <Modal open={addModal} onClose={() => setAddModal(false)} title="Add New Partner"
        footer={<><button onClick={() => setAddModal(false)} style={{ padding: '9px 18px', borderRadius: '10px', border: '1.5px solid #E2E8F0', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>Cancel</button><button onClick={handleAdd} style={{ padding: '9px 20px', borderRadius: '10px', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>Create Partner</button></>}>
        <PartnerForm />
      </Modal>

      {/* Edit Modal */}
      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Partner"
        footer={<><button onClick={() => setEditModal(false)} style={{ padding: '9px 18px', borderRadius: '10px', border: '1.5px solid #E2E8F0', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>Cancel</button><button onClick={handleEdit} style={{ padding: '9px 20px', borderRadius: '10px', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>Save Changes</button></>}>
        <PartnerForm />
      </Modal>
    </div>
  );
}
