/**
 * onboardingService — Buildogram Phase E
 * ─────────────────────────────────────────────────────────────────────────
 * Partner onboarding flow:
 * 1. Partner submits /partners/register form
 * 2. Application stored with status = 'pending'
 * 3. Ops reviews at /ops/partners
 * 4. Ops approves → status = 'approved' → notification sent
 * 5. Partner can now access Partner OS
 *
 * Also manages onboarding checklist state for new partners.
 */

import { lsGet, lsSet, genId, isDemoMode, apiFetch } from '@/lib/data/adapter';
import { notifyEvent } from './notificationService';

const LS_APPS_KEY = 'bos_partner_applications';

/** Submit a partner registration application. */
export async function submitPartnerApplication(payload) {
  const application = {
    id: genId('APP'),
    ...payload,
    status: 'pending',
    submittedAt: new Date().toISOString(),
    reviewedAt: null,
    reviewedBy: null,
    rejectionReason: null,
  };

  if (!isDemoMode()) {
    const data = await apiFetch('/api/public/partner-apply', {
      method: 'POST', body: JSON.stringify(payload),
    });
    if (data?.success || data?.partner) return { success: true, applicationId: data.partnerId || application.id };
  }

  const all = lsGet(LS_APPS_KEY) || [];
  lsSet(LS_APPS_KEY, [application, ...all]);

  // Notify ops of new application
  await notifyEvent('material_request_created', {
    leadName: payload.companyName || payload.ownerName,
  });

  return { success: true, applicationId: application.id, demo: true };
}

/** Get all pending partner applications (for /ops/partners). */
export async function getPendingApplications() {
  if (!isDemoMode()) {
    const data = await apiFetch('/api/ops/partners?approvalStatus=pending');
    if (data) return data.partners || data.data || data;
  }
  return (lsGet(LS_APPS_KEY) || []).filter(a => a.status === 'pending');
}

/** Approve a partner application and notify them. */
export async function approveApplication(applicationId, reviewedBy = 'Ops Team') {
  if (!isDemoMode()) {
    await apiFetch(`/api/ops/partners/${applicationId}/status`, {
      method: 'PATCH', body: JSON.stringify({ approvalStatus: 'approved' }),
    });
  }
  _updateApplication(applicationId, { status: 'approved', reviewedAt: new Date().toISOString(), reviewedBy });
  await notifyEvent('partner_approved', { recipientId: applicationId });
  return { success: true };
}

/** Reject a partner application. */
export async function rejectApplication(applicationId, reason, reviewedBy = 'Ops Team') {
  if (!isDemoMode()) {
    await apiFetch(`/api/ops/partners/${applicationId}/status`, {
      method: 'PATCH', body: JSON.stringify({ approvalStatus: 'rejected', rejectionReason: reason }),
    });
  }
  _updateApplication(applicationId, { status: 'rejected', rejectionReason: reason, reviewedAt: new Date().toISOString(), reviewedBy });
  return { success: true };
}

/** Get onboarding checklist state for a partner. */
export function getOnboardingChecklist(partnerId) {
  const key = `bos_onboarding_${partnerId}`;
  const saved = lsGet(key);
  const defaults = {
    profile_completed:   false,
    first_project:       false,
    first_site_update:   false,
    first_material_req:  false,
    first_document:      false,
    first_milestone:     false,
    boq_generated:       false,
  };
  return saved || defaults;
}

/** Mark an onboarding step as complete. */
export function completeOnboardingStep(partnerId, step) {
  const key = `bos_onboarding_${partnerId}`;
  const current = getOnboardingChecklist(partnerId);
  lsSet(key, { ...current, [step]: true });
}

/** Check if onboarding is fully complete. */
export function isOnboardingComplete(partnerId) {
  const checklist = getOnboardingChecklist(partnerId);
  return Object.values(checklist).every(Boolean);
}

function _updateApplication(id, patch) {
  const all = lsGet(LS_APPS_KEY) || [];
  lsSet(LS_APPS_KEY, all.map(a => a.id === id ? { ...a, ...patch } : a));
}
