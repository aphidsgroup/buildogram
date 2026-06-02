/**
 * supplierService — Buildogram Phase E
 * ─────────────────────────────────────────────────────────────────────────
 * Supplier profile, RFQ requests, quotation management.
 */

import { mergeWithDemo, lsSet, genId, isDemoMode, apiFetch } from '@/lib/data/adapter';

const LS_KEY = 'bos_suppliers';

export const DEMO_SUPPLIERS = [
  { id: 'SUP001', companyName: 'Sri Sai Cements', contactName: 'Senthil Kumar', phone: '9876501234', email: 'srisai@cements.in', city: 'Chennai', materialTypes: ['Cement', 'Sand', 'Aggregate'], approvalStatus: 'approved', rating: 4.5 },
  { id: 'SUP002', companyName: 'Ramco Supplies', contactName: 'Ramesh Babu', phone: '9765432100', email: 'ramco@supplies.in', city: 'Chennai', materialTypes: ['Cement', 'Steel'], approvalStatus: 'approved', rating: 4.2 },
  { id: 'SUP003', companyName: 'Chennai Steel Hub', contactName: 'Arumugam V', phone: '9988001122', email: 'csh@steel.in', city: 'Chennai', materialTypes: ['Steel', 'TMT'], approvalStatus: 'approved', rating: 4.8 },
  { id: 'SUP004', companyName: 'Tile World Anna Nagar', contactName: 'Preethi S', phone: '9654321000', email: 'tileworld@gmail.com', city: 'Chennai', materialTypes: ['Tiles', 'Flooring', 'Sanitary'], approvalStatus: 'approved', rating: 4.3 },
];

export async function getSuppliers(filters = {}) {
  if (!isDemoMode()) {
    const data = await apiFetch('/api/partners?category=Supplier');
    if (data) return applyFilters(data.partners || data.data || data, filters);
  }
  return applyFilters(mergeWithDemo(LS_KEY, DEMO_SUPPLIERS), filters);
}

export async function getSupplier(id) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/partners/${id}`);
    if (data) return data.partner || data;
  }
  return mergeWithDemo(LS_KEY, DEMO_SUPPLIERS).find(s => s.id === id) || null;
}

/** Get open RFQs assigned to this supplier. */
export async function getSupplierRequests(supplierId) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/partner/material-requests?supplierId=${supplierId}`);
    if (data) return data.requests || data.data || data;
  }
  const { DEMO_MATERIALS } = await import('@/app/partner/_shared/demoData');
  // In demo: show all requests in quotation_pending state
  return DEMO_MATERIALS.filter(m =>
    m.status === 'quotation_pending' || m.assignedSupplierId === supplierId
  );
}

/** Get quotations submitted by a supplier. */
export async function getSupplierQuotations(supplierId) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/material-quotes?supplierId=${supplierId}`);
    if (data) return data.quotes || data.data || data;
  }
  const { default: quotationService } = await import('./quotationService');
  return (await quotationService.getAllQuotations({ supplierId })) || [];
}

/** Register a new supplier. */
export async function registerSupplier(payload) {
  const supplier = {
    ...payload,
    id: genId('SUP'),
    approvalStatus: 'pending',
    createdAt: new Date().toISOString(),
  };
  if (!isDemoMode()) {
    const data = await apiFetch('/api/partners', {
      method: 'POST', body: JSON.stringify({ ...payload, category: 'Supplier' }),
    });
    if (data) return data;
  }
  const all = mergeWithDemo(LS_KEY, DEMO_SUPPLIERS);
  lsSet(LS_KEY, [...all, supplier]);
  return { success: true, supplier };
}

function applyFilters(suppliers, filters) {
  return suppliers.filter(s => {
    if (filters.city && s.city !== filters.city) return false;
    if (filters.materialType && !s.materialTypes?.includes(filters.materialType)) return false;
    if (filters.approvalStatus && s.approvalStatus !== filters.approvalStatus) return false;
    return true;
  });
}
