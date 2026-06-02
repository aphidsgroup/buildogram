/**
 * leadService — Buildogram Phase E
 * ─────────────────────────────────────────────────────────────────────────
 * All lead data operations go through here.
 * In demo mode: localStorage + DEMO_LEADS fallback.
 * In database_ready mode: calls /api/leads (already built).
 */

import { mergeWithDemo, lsSet, lsGet, genId, isDemoMode, apiFetch } from '@/lib/data/adapter';
import { DEMO_LEADS } from '@/app/partner/_shared/demoData';

const LS_KEY = 'bos_leads';

/** Get all leads. */
export async function getLeads(filters = {}) {
  if (!isDemoMode()) {
    const data = await apiFetch('/api/leads');
    if (data) return applyFilters(data.leads || data.data || data, filters);
  }
  return applyFilters(mergeWithDemo(LS_KEY, DEMO_LEADS), filters);
}

/** Get a single lead by ID. */
export async function getLead(id) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/leads/${id}`);
    if (data) return data.lead || data;
  }
  const leads = mergeWithDemo(LS_KEY, DEMO_LEADS);
  return leads.find(l => l.id === id) || null;
}

/** Create a new lead. */
export async function createLead(payload) {
  const lead = { ...payload, id: genId('LEAD'), createdAt: new Date().toISOString(), status: payload.status || 'new' };
  if (!isDemoMode()) {
    const data = await apiFetch('/api/leads', { method: 'POST', body: JSON.stringify(payload) });
    if (data) return data.lead || data;
  }
  const leads = mergeWithDemo(LS_KEY, DEMO_LEADS);
  lsSet(LS_KEY, [lead, ...leads]);
  return lead;
}

/** Update a lead by ID. */
export async function updateLead(id, patch) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/leads/${id}`, { method: 'PATCH', body: JSON.stringify(patch) });
    if (data) return data.lead || data;
  }
  const leads = mergeWithDemo(LS_KEY, DEMO_LEADS);
  const updated = leads.map(l => l.id === id ? { ...l, ...patch, updatedAt: new Date().toISOString() } : l);
  lsSet(LS_KEY, updated);
  return updated.find(l => l.id === id);
}

/** Convert a lead to a project. */
export async function convertLeadToProject(leadId, payload) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/partner/leads/${leadId}/convert-to-project`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (data) return data;
  }
  // Demo: mark lead as won
  await updateLead(leadId, { status: 'won' });
  return { success: true, demo: true, projectId: genId('PRJ') };
}

/** Log an activity against a lead. */
export async function logLeadActivity(leadId, activity) {
  const key = `bos_lead_activity_${leadId}`;
  if (!isDemoMode()) {
    await apiFetch(`/api/leads/${leadId}/activities`, {
      method: 'POST', body: JSON.stringify(activity),
    });
  }
  const existing = lsGet(key) || [];
  lsSet(key, [{ ...activity, id: genId('ACT'), timestamp: new Date().toISOString() }, ...existing]);
}

/** Get activities for a lead. */
export async function getLeadActivities(leadId) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/leads/${leadId}/activities`);
    if (data) return data.activities || data.data || data;
  }
  return lsGet(`bos_lead_activity_${leadId}`) || [];
}

function applyFilters(leads, filters) {
  return leads.filter(l => {
    if (filters.status && l.status !== filters.status) return false;
    if (filters.leadType && l.lead_type !== filters.leadType) return false;
    if (filters.assignedPartnerId && l.assignedPartnerId !== filters.assignedPartnerId) return false;
    return true;
  });
}
