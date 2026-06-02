/**
 * partnerService — Buildogram Phase E
 * ─────────────────────────────────────────────────────────────────────────
 * Partner CRUD, approval flow, profile management.
 */

import { mergeWithDemo, lsSet, lsGet, genId, isDemoMode, apiFetch } from '@/lib/data/adapter';

const LS_KEY = 'bos_partners';

const DEMO_PARTNERS = [
  { id: 'PT001', companyName: 'Kumar Construction Co.', ownerName: 'Rajesh Kumar', email: 'rajesh@kumarconstruction.com', phone: '9876543210', partnerType: 'builder', city: 'Chennai', approvalStatus: 'approved', planType: 'free', createdAt: '2026-04-01' },
  { id: 'PT002', companyName: 'Priya Interiors', ownerName: 'Priya Nair', email: 'priya@priyainteriors.com', phone: '9123456789', partnerType: 'interior_designer', city: 'Chennai', approvalStatus: 'approved', planType: 'free', createdAt: '2026-04-10' },
  { id: 'PT003', companyName: 'StructSafe Engineers', ownerName: 'Arjun Menon', email: 'arjun@structsafe.in', phone: '9988776655', partnerType: 'civil_engineer', city: 'Chennai', approvalStatus: 'pending', planType: 'free', createdAt: '2026-05-20' },
];

export async function getPartners(filters = {}) {
  if (!isDemoMode()) {
    const data = await apiFetch('/api/ops/partners');
    if (data) return applyFilters(data.partners || data.data || data, filters);
  }
  return applyFilters(mergeWithDemo(LS_KEY, DEMO_PARTNERS), filters);
}

export async function getPartner(id) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/ops/partners/${id}`);
    if (data) return data.partner || data;
  }
  return mergeWithDemo(LS_KEY, DEMO_PARTNERS).find(p => p.id === id) || null;
}

export async function getPartnerProfile() {
  if (!isDemoMode()) {
    const data = await apiFetch('/api/partner/profile');
    if (data) return data.partner || data;
  }
  return lsGet('bos_partner_profile') || DEMO_PARTNERS[0];
}

export async function updatePartnerProfile(patch) {
  if (!isDemoMode()) {
    const data = await apiFetch('/api/partner/profile', {
      method: 'PATCH', body: JSON.stringify(patch),
    });
    if (data) return data.partner || data;
  }
  const current = lsGet('bos_partner_profile') || DEMO_PARTNERS[0];
  const updated = { ...current, ...patch };
  lsSet('bos_partner_profile', updated);
  return updated;
}

export async function approvePartner(id) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/ops/partners/${id}/status`, {
      method: 'PATCH', body: JSON.stringify({ approvalStatus: 'approved' }),
    });
    if (data) return data;
  }
  return _updateLocalPartner(id, { approvalStatus: 'approved' });
}

export async function rejectPartner(id, reason = '') {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/ops/partners/${id}/status`, {
      method: 'PATCH', body: JSON.stringify({ approvalStatus: 'rejected', rejectionReason: reason }),
    });
    if (data) return data;
  }
  return _updateLocalPartner(id, { approvalStatus: 'rejected', rejectionReason: reason });
}

export async function registerPartner(payload) {
  const partner = {
    ...payload,
    id: genId('PT'),
    approvalStatus: 'pending',
    planType: 'free',
    createdAt: new Date().toISOString(),
  };
  if (!isDemoMode()) {
    const data = await apiFetch('/api/public/partner-apply', {
      method: 'POST', body: JSON.stringify(payload),
    });
    if (data) return data;
  }
  const all = mergeWithDemo(LS_KEY, DEMO_PARTNERS);
  lsSet(LS_KEY, [...all, partner]);
  return { success: true, partner };
}

function _updateLocalPartner(id, patch) {
  const all = mergeWithDemo(LS_KEY, DEMO_PARTNERS);
  const updated = all.map(p => p.id === id ? { ...p, ...patch } : p);
  lsSet(LS_KEY, updated);
  return updated.find(p => p.id === id);
}

function applyFilters(partners, filters) {
  return partners.filter(p => {
    if (filters.approvalStatus && p.approvalStatus !== filters.approvalStatus) return false;
    if (filters.partnerType && p.partnerType !== filters.partnerType) return false;
    if (filters.city && p.city !== filters.city) return false;
    return true;
  });
}
