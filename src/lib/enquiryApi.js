// src/lib/enquiryApi.js
// Client-side API service for partner enquiries.
// Replaces direct leadStore localStorage access with real API calls.
// Falls back to leadStore if API unavailable.

import { createLead, getAllLeads } from '@/lib/leadStore';

const API_BASE = '/api';

/**
 * Submit a public partner enquiry.
 * @param {object} data - { customerName, phone, email, requirement, location, budgetRange, message, partnerSlug, sourcePage }
 */
export async function submitEnquiry(data) {
  try {
    const res = await fetch(`${API_BASE}/partner-enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success) return { success: true, id: json.enquiry?.id };
    throw new Error(json.message || 'Submission failed');
  } catch (e) {
    // Fallback: save to localStorage
    try {
      const localId = createLead({
        customerName: data.customerName,
        phone: data.phone,
        email: data.email || '',
        requirement: data.requirement || '',
        location: data.location || '',
        budgetRange: data.budgetRange || '',
        message: data.message || '',
        partnerSlug: data.partnerSlug || '',
        sourcePage: data.sourcePage || 'partner_profile',
        status: 'New',
        createdAt: new Date().toISOString().slice(0, 10),
      });
      return { success: true, id: localId, fallback: true };
    } catch {
      return { success: false, message: e.message };
    }
  }
}

/**
 * Fetch partner's own enquiries (requires partner auth cookie).
 */
export async function fetchPartnerEnquiries({ status } = {}) {
  try {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    const res = await fetch(`${API_BASE}/partner/enquiries?${params}`, { cache: 'no-store' });
    const json = await res.json();
    if (json.success && Array.isArray(json.enquiries)) return json.enquiries;
    throw new Error('API error');
  } catch {
    // Fallback: get from localStorage
    return getAllLeads().map(l => ({
      id: l.id,
      customerName: l.customerName,
      phone: l.phone,
      email: l.email || '',
      requirement: l.requirement || '',
      location: l.location || '',
      budgetRange: l.budgetRange || '',
      source: '🌐 Partner Profile',
      status: l.status || 'New',
      followUpDate: l.followUpDate || '',
      notes: l.notes || '',
      createdAt: l.createdAt || '',
      isPublicEnquiry: true,
    }));
  }
}

/**
 * Update enquiry status/notes/follow-up (requires partner auth).
 */
export async function updateEnquiryStatus(id, data) {
  try {
    const res = await fetch(`${API_BASE}/partner/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (e) {
    return { success: false, message: e.message };
  }
}

/**
 * Fetch all enquiries (ops admin).
 */
export async function opsGetEnquiries() {
  const res = await fetch(`${API_BASE}/partner-enquiries`, { cache: 'no-store' });
  return res.json();
}
