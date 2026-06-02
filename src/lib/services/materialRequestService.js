/**
 * materialRequestService — Buildogram Phase E
 * ─────────────────────────────────────────────────────────────────────────
 * All material request / RFQ operations in one place.
 */

import { mergeWithDemo, lsSet, lsGet, genId, isDemoMode, apiFetch } from '@/lib/data/adapter';
import { DEMO_MATERIALS } from '@/app/partner/_shared/demoData';

const LS_KEY = 'bos_material_requests';

export async function getMaterialRequests(filters = {}) {
  if (!isDemoMode()) {
    const params = new URLSearchParams(filters).toString();
    const data = await apiFetch(`/api/partner/material-requests${params ? '?' + params : ''}`);
    if (data) return data.requests || data.data || data;
  }
  return applyFilters(mergeWithDemo(LS_KEY, DEMO_MATERIALS), filters);
}

export async function getMaterialRequest(id) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/partner/material-requests/${id}`);
    if (data) return data.request || data;
  }
  return mergeWithDemo(LS_KEY, DEMO_MATERIALS).find(m => m.id === id) || null;
}

export async function createMaterialRequest(payload) {
  const req = {
    ...payload,
    id: genId('MR'),
    status: 'sent_to_buildogram',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  if (!isDemoMode()) {
    const data = await apiFetch('/api/partner/material-requests', {
      method: 'POST', body: JSON.stringify(payload),
    });
    if (data) return data.request || data;
  }
  const all = mergeWithDemo(LS_KEY, DEMO_MATERIALS);
  lsSet(LS_KEY, [...all, req]);
  return req;
}

export async function updateMaterialRequestStatus(id, status, meta = {}) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/partner/material-requests/${id}`, {
      method: 'PATCH', body: JSON.stringify({ status, ...meta }),
    });
    if (data) return data;
  }
  const all = mergeWithDemo(LS_KEY, DEMO_MATERIALS);
  const updated = all.map(m => m.id === id
    ? { ...m, status, ...meta, updatedAt: new Date().toISOString() }
    : m
  );
  lsSet(LS_KEY, updated);
  return updated.find(m => m.id === id);
}

export async function assignSupplierToRequest(requestId, supplierId) {
  return updateMaterialRequestStatus(requestId, 'quotation_pending', { assignedSupplierId: supplierId });
}

export async function approveQuoteForRequest(requestId, quoteId) {
  return updateMaterialRequestStatus(requestId, 'approved', { approvedQuoteId: quoteId });
}

function applyFilters(items, filters) {
  return items.filter(item => {
    if (filters.status && item.status !== filters.status) return false;
    if (filters.projectId && item.project !== filters.projectId && item.projectId !== filters.projectId) return false;
    if (filters.partnerId && item.partnerId !== filters.partnerId) return false;
    return true;
  });
}
