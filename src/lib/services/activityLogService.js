/**
 * activityLogService — Buildogram Phase E
 * ─────────────────────────────────────────────────────────────────────────
 * Write and read project/lead activity logs.
 * Kept as a fast local-first service — activity is write-heavy.
 */

import { lsGet, lsSet, genId, isDemoMode, apiFetch } from '@/lib/data/adapter';
import { DEMO_ACTIVITY_LOG } from '@/app/partner/_shared/demoData';

export const ACTIVITY_ICONS = {
  milestone:     '✅',
  site_update:   '📸',
  material:      '🧱',
  finance:       '💰',
  issue:         '⚠️',
  document:      '📄',
  lead:          '🎯',
  status_change: '🔄',
  note:          '📝',
  system:        '🤖',
};

/**
 * Log a new activity entry.
 * @param {object} entry — { projectId?, leadId?, type, title, detail, actor, actorId? }
 */
export async function logActivity(entry) {
  const full = {
    id: genId('ACT'),
    icon: ACTIVITY_ICONS[entry.type] || '📋',
    timestamp: new Date().toISOString(),
    ...entry,
  };

  if (!isDemoMode()) {
    // In DB mode, fire-and-forget to the API (best effort)
    apiFetch('/api/leads/' + (entry.leadId || '_') + '/activities', {
      method: 'POST', body: JSON.stringify(full),
    }).catch(() => {});
  }

  // Always write to localStorage for instant UI update
  const key = entry.projectId
    ? `bos_activity_${entry.projectId}`
    : `bos_lead_activity_${entry.leadId}`;
  const existing = lsGet(key) || [];
  lsSet(key, [full, ...existing].slice(0, 100)); // cap at 100 entries
  return full;
}

/**
 * Get activity log for a project.
 * @param {string} projectId
 * @returns {Array}
 */
export async function getProjectActivity(projectId) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/projects/${projectId}/activity`).catch(() => null);
    if (data?.activities) return data.activities;
  }
  const stored = lsGet(`bos_activity_${projectId}`);
  if (stored) return stored;
  return DEMO_ACTIVITY_LOG.filter(a => a.projectId === projectId);
}

/**
 * Get recent activity across all projects (for dashboard feed).
 * @param {number} limit
 * @returns {Array}
 */
export function getRecentActivity(limit = 10) {
  // Collect all activity keys from localStorage
  if (typeof window === 'undefined') return DEMO_ACTIVITY_LOG.slice(0, limit);
  const all = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('bos_activity_')) {
      try {
        const entries = JSON.parse(localStorage.getItem(key) || '[]');
        all.push(...entries);
      } catch {}
    }
  }
  if (!all.length) return DEMO_ACTIVITY_LOG.slice(0, limit);
  return all
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
}
