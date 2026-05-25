// src/lib/partnerApi.js
// Client-side API service for partner data
// Replaces direct partnerStore localStorage access with real API calls.
// Falls back to partnerStore demo data when API is unavailable.

import { DEMO_PARTNERS_FULL, getApprovedPartners, getPartnerBySlug } from '@/lib/partnerStore';

const API_BASE = '/api';

// ── Public APIs (no auth) ──────────────────────────────────────────────────

/**
 * Get all approved+active partners.
 * @param {object} opts - { category?: string }
 */
export async function fetchApprovedPartners({ category } = {}) {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    const res = await fetch(`${API_BASE}/partners?${params}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    if (data.success && Array.isArray(data.partners) && data.partners.length > 0) {
      return data.partners;
    }
    throw new Error('Empty response');
  } catch {
    // Fallback to localStorage demo data
    const all = getApprovedPartners();
    return category && category !== 'all'
      ? all.filter(p => p.category === category)
      : all;
  }
}

/**
 * Get a single partner by slug.
 * @param {string} slug
 */
export async function fetchPartnerBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/partners/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    if (data.success && data.partner) return data.partner;
    throw new Error('Not found');
  } catch {
    return getPartnerBySlug(slug);
  }
}

// ── Ops Admin APIs ─────────────────────────────────────────────────────────

/**
 * Get all partners (ops admin view — any status).
 */
export async function opsGetPartners({ category, status, search } = {}) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (status) params.set('status', status);
  if (search) params.set('search', search);
  const res = await fetch(`${API_BASE}/ops/partners?${params}`, { cache: 'no-store' });
  return res.json();
}

/**
 * Create a new partner.
 */
export async function opsCreatePartner(data) {
  const res = await fetch(`${API_BASE}/ops/partners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

/**
 * Update a partner.
 */
export async function opsUpdatePartner(id, data) {
  const res = await fetch(`${API_BASE}/ops/partners/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

/**
 * Update partner status fields (approvalStatus, isActive, isFeatured).
 */
export async function opsUpdatePartnerStatus(id, data) {
  const res = await fetch(`${API_BASE}/ops/partners/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

/**
 * Soft-delete (deactivate) partner.
 */
export async function opsDeletePartner(id) {
  const res = await fetch(`${API_BASE}/ops/partners/${id}`, { method: 'DELETE' });
  return res.json();
}

// ── Partner Self APIs ──────────────────────────────────────────────────────

/**
 * Get own profile (partner role).
 */
export async function getOwnProfile() {
  const res = await fetch(`${API_BASE}/partner/profile`, { cache: 'no-store' });
  return res.json();
}

/**
 * Update own profile (partner role).
 */
export async function updateOwnProfile(data) {
  const res = await fetch(`${API_BASE}/partner/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
