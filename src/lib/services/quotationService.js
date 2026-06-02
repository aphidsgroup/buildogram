/**
 * quotationService — Buildogram Phase E
 * ─────────────────────────────────────────────────────────────────────────
 * Supplier quotation submission, comparison, approval.
 */

import { mergeWithDemo, lsSet, genId, isDemoMode, apiFetch } from '@/lib/data/adapter';

const LS_KEY = 'bos_quotations';

const DEMO_QUOTATIONS = [
  { id: 'Q001', requestId: 'M001', supplierId: 'SUP001', supplierName: 'Sri Sai Cements', unitRate: 380, total: 76000, qty: 200, unit: 'Bags', material: 'OPC Cement 53', deliveryDays: 3, validTill: '2026-06-10', notes: 'Stock available. Free delivery above ₹50k.', status: 'submitted', selected: false, submittedAt: '2026-05-22' },
  { id: 'Q002', requestId: 'M001', supplierId: 'SUP002', supplierName: 'Ramco Supplies', unitRate: 370, total: 74000, qty: 200, unit: 'Bags', material: 'OPC Cement 53', deliveryDays: 5, validTill: '2026-06-10', notes: 'Price includes GST.', status: 'submitted', selected: false, submittedAt: '2026-05-23' },
  { id: 'Q003', requestId: 'M002', supplierId: 'SUP003', supplierName: 'Chennai Steel Hub', unitRate: 67000, total: 536000, qty: 8, unit: 'MT', material: 'TMT Steel Fe500D', deliveryDays: 2, validTill: '2026-06-08', notes: 'ISI certified. Same day delivery possible.', status: 'selected', selected: true, submittedAt: '2026-05-25' },
];

export async function getQuotationsForRequest(requestId) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/material-quotes?requestId=${requestId}`);
    if (data) return data.quotes || data.data || data;
  }
  return mergeWithDemo(LS_KEY, DEMO_QUOTATIONS).filter(q => q.requestId === requestId);
}

export async function getAllQuotations(filters = {}) {
  if (!isDemoMode()) {
    const data = await apiFetch('/api/material-quotes');
    if (data) return applyFilters(data.quotes || data.data || data, filters);
  }
  return applyFilters(mergeWithDemo(LS_KEY, DEMO_QUOTATIONS), filters);
}

export async function submitQuotation(payload) {
  const quote = {
    ...payload,
    id: genId('Q'),
    status: 'submitted',
    selected: false,
    submittedAt: new Date().toISOString(),
  };
  if (!isDemoMode()) {
    const data = await apiFetch('/api/material-quotes', {
      method: 'POST', body: JSON.stringify(payload),
    });
    if (data) return data.quote || data;
  }
  const all = mergeWithDemo(LS_KEY, DEMO_QUOTATIONS);
  lsSet(LS_KEY, [...all, quote]);
  return quote;
}

export async function selectQuotation(quoteId, requestId) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/material-quotes/${quoteId}`, {
      method: 'PATCH', body: JSON.stringify({ status: 'selected', selected: true }),
    });
    if (data) return data;
  }
  const all = mergeWithDemo(LS_KEY, DEMO_QUOTATIONS);
  const updated = all.map(q => {
    if (q.requestId !== requestId) return q;
    return { ...q, selected: q.id === quoteId, status: q.id === quoteId ? 'selected' : 'rejected' };
  });
  lsSet(LS_KEY, updated);
  return updated.find(q => q.id === quoteId);
}

/**
 * Find the best quote for a request (lowest price).
 */
export function getBestQuote(quotes) {
  if (!quotes?.length) return null;
  return quotes.reduce((best, q) => (!best || q.total < best.total) ? q : best, null);
}

/**
 * Find the fastest quote for a request.
 */
export function getFastestQuote(quotes) {
  if (!quotes?.length) return null;
  return quotes.reduce((fast, q) => (!fast || q.deliveryDays < fast.deliveryDays) ? q : fast, null);
}

function applyFilters(quotes, filters) {
  return quotes.filter(q => {
    if (filters.requestId && q.requestId !== filters.requestId) return false;
    if (filters.supplierId && q.supplierId !== filters.supplierId) return false;
    if (filters.status && q.status !== filters.status) return false;
    return true;
  });
}
