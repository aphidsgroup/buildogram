/**
 * notificationService — Buildogram Phase E
 * ─────────────────────────────────────────────────────────────────────────
 * Create, read, mark-read notifications.
 * Local-first. In DB mode, syncs with /api/notifications.
 *
 * Supported events (NOTIFICATION_EVENTS from models/index.js):
 * lead_assigned, lead_converted, project_created, site_update_added,
 * material_request_created, supplier_assigned, quote_submitted,
 * quote_approved, issue_raised, payment_updated, milestone_completed,
 * document_uploaded, partner_approved
 */

import { lsGet, lsSet, genId, isDemoMode, apiFetch } from '@/lib/data/adapter';

const LS_KEY = 'bos_notifications';

// Demo seed notifications
const DEMO_NOTIFICATIONS = [
  { id: 'N001', recipientRole: 'partner', event: 'lead_assigned', title: 'New Lead Assigned', body: 'Deepa Menon — Solar installation in Tambaram has been assigned to you.', linkUrl: '/partner/leads', read: false, createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 'N002', recipientRole: 'partner', event: 'quote_approved', title: 'Material Quote Approved', body: 'Your OPC Cement order (200 bags) has been approved by Buildogram Ops.', linkUrl: '/partner/materials', read: false, createdAt: new Date(Date.now() - 5 * 3600000).toISOString() },
  { id: 'N003', recipientRole: 'partner', event: 'issue_raised', title: 'Issue Needs Attention', body: 'Window frame size issue on P001 is awaiting your response.', linkUrl: '/partner/issues', read: true, createdAt: new Date(Date.now() - 24 * 3600000).toISOString() },
  { id: 'N004', recipientRole: 'supplier', event: 'supplier_assigned', title: 'New RFQ Request', body: 'Buildogram has assigned you a material request: TMT Steel 8 MT.', linkUrl: '/supplier/requests', read: false, createdAt: new Date(Date.now() - 1 * 3600000).toISOString() },
  { id: 'N005', recipientRole: 'ops', event: 'partner_approved', title: 'Partner Application', body: 'New partner application from StructSafe Engineers awaiting approval.', linkUrl: '/ops/partners', read: false, createdAt: new Date(Date.now() - 30 * 60000).toISOString() },
];

/**
 * Create a notification.
 * @param {{ recipientId?: string, recipientRole: string, event: string, title: string, body: string, linkUrl?: string }} payload
 */
export async function createNotification(payload) {
  const n = {
    ...payload,
    id: genId('N'),
    read: false,
    status: isDemoMode() ? 'skipped_demo' : 'pending',
    createdAt: new Date().toISOString(),
  };

  if (!isDemoMode()) {
    apiFetch('/api/notifications', { method: 'POST', body: JSON.stringify(n) })
      .then(() => { n.status = 'sent'; })
      .catch((e) => { 
        n.status = 'failed';
        n.error = e.message;
        console.warn('[NotificationService] Delivery failed:', e);
      });
  }

  const all = lsGet(LS_KEY) || [];
  lsSet(LS_KEY, [n, ...all].slice(0, 200));
  return n;
}

/**
 * Get notifications for a role (partner | supplier | ops | customer).
 * @param {string} role
 * @param {{ unreadOnly?: boolean }} opts
 */
export async function getNotifications(role, opts = {}) {
  let all = [];
  if (!isDemoMode()) {
    const data = await apiFetch('/api/notifications');
    if (data?.notifications) all = data.notifications;
  }
  if (!all.length) {
    all = lsGet(LS_KEY) || DEMO_NOTIFICATIONS;
  }
  let filtered = all.filter(n => !n.recipientRole || n.recipientRole === role);
  if (opts.unreadOnly) filtered = filtered.filter(n => !n.read);
  return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Count unread notifications for a role.
 * @param {string} role
 * @returns {number}
 */
export function getUnreadCount(role) {
  const all = lsGet(LS_KEY) || DEMO_NOTIFICATIONS;
  return all.filter(n => (!n.recipientRole || n.recipientRole === role) && !n.read).length;
}

/** Mark a notification as read. */
export async function markRead(id) {
  if (!isDemoMode()) {
    apiFetch(`/api/notifications`, { method: 'PATCH', body: JSON.stringify({ id, read: true }) }).catch(() => {});
  }
  const all = lsGet(LS_KEY) || DEMO_NOTIFICATIONS;
  lsSet(LS_KEY, all.map(n => n.id === id ? { ...n, read: true } : n));
}

/** Mark all notifications as read for a role. */
export function markAllRead(role) {
  const all = lsGet(LS_KEY) || DEMO_NOTIFICATIONS;
  lsSet(LS_KEY, all.map(n =>
    (!n.recipientRole || n.recipientRole === role) ? { ...n, read: true } : n
  ));
}

/**
 * Trigger notification for a standard event.
 * Call this after actions like lead assignment, project creation, etc.
 */
export async function notifyEvent(event, data = {}) {
  const templates = {
    lead_assigned:            { role: 'partner', title: 'New Lead Assigned', body: `${data.leadName || 'A new lead'} has been assigned to you.`, link: '/partner/leads' },
    lead_converted:           { role: 'ops',     title: 'Lead Converted', body: `Lead converted to project: ${data.projectName || ''}.`, link: '/ops/leads' },
    project_created:          { role: 'partner', title: 'Project Created', body: `Project "${data.projectName}" has been created.`, link: '/partner/projects' },
    site_update_added:        { role: 'ops',     title: 'Site Update Posted', body: `New update on ${data.projectName || 'a project'}.`, link: '/ops/projects' },
    material_request_created: { role: 'ops',     title: 'Material Request', body: `New RFQ from partner: ${data.material || ''}.`, link: '/admin/material-requests' },
    supplier_assigned:        { role: 'supplier',title: 'New RFQ Assigned', body: `You have a new material request: ${data.material || ''}.`, link: '/supplier/requests' },
    quote_submitted:          { role: 'ops',     title: 'Quote Submitted', body: `${data.supplierName || 'A supplier'} submitted a quote.`, link: '/admin/quotations' },
    quote_approved:           { role: 'partner', title: 'Quote Approved', body: `Your material request has been approved.`, link: '/partner/materials' },
    issue_raised:             { role: 'ops',     title: 'Issue Raised', body: `New issue on ${data.projectName || 'a project'}: ${data.title || ''}.`, link: '/ops/projects' },
    payment_updated:          { role: 'partner', title: 'Payment Updated', body: `Payment status changed on ${data.projectName || 'a project'}.`, link: '/partner/finance' },
    milestone_completed:      { role: 'ops',     title: 'Milestone Completed', body: `Milestone "${data.milestone || ''}" marked complete.`, link: '/ops/projects' },
    partner_approved:         { role: 'partner', title: '🎉 Application Approved!', body: `Welcome to Buildogram Partner OS. You can now log in.`, link: '/partner/dashboard' },
  };
  const tpl = templates[event];
  if (!tpl) return;
  return createNotification({
    recipientId:   data.recipientId,
    recipientRole: tpl.role,
    event,
    title:    tpl.title,
    body:     tpl.body,
    linkUrl:  tpl.link,
  });
}
