/**
 * projectService — Buildogram Phase E
 * ─────────────────────────────────────────────────────────────────────────
 * All project data operations go through here.
 */

import { mergeWithDemo, lsSet, lsGet, genId, isDemoMode, apiFetch } from '@/lib/data/adapter';
import { DEMO_PROJECTS } from '@/app/partner/_shared/demoData';

const LS_KEY = 'bos_projects';

export async function getProjects(filters = {}) {
  if (!isDemoMode()) {
    const data = await apiFetch('/api/partner/projects');
    if (data) return applyFilters(data.projects || data.data || data, filters);
  }
  return applyFilters(mergeWithDemo(LS_KEY, DEMO_PROJECTS), filters);
}

export async function getProject(id) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/partner/projects/${id}`);
    if (data) return data.project || data;
  }
  const all = mergeWithDemo(LS_KEY, DEMO_PROJECTS);
  return all.find(p => p.id === id) || null;
}

export async function createProject(payload) {
  const project = {
    ...payload,
    id: genId('PRJ'),
    status: payload.status || 'Planning',
    progress: payload.progress ?? 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  if (!isDemoMode()) {
    const data = await apiFetch('/api/partner/projects', {
      method: 'POST', body: JSON.stringify(payload),
    });
    if (data) return data.project || data;
  }
  const all = mergeWithDemo(LS_KEY, DEMO_PROJECTS);
  lsSet(LS_KEY, [...all, project]);
  return project;
}

export async function updateProject(id, patch) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/partner/projects/${id}`, {
      method: 'PATCH', body: JSON.stringify(patch),
    });
    if (data) return data.project || data;
  }
  const all = mergeWithDemo(LS_KEY, DEMO_PROJECTS);
  const updated = all.map(p => p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p);
  lsSet(LS_KEY, updated);
  return updated.find(p => p.id === id);
}

export async function getProjectMilestones(projectId) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/milestones?projectId=${projectId}`);
    if (data) return data.milestones || data.data || data;
  }
  const stored = lsGet(`bos_milestones_${projectId}`);
  if (stored) return stored;
  const { DEMO_MILESTONES } = await import('@/app/partner/_shared/demoData');
  return DEMO_MILESTONES.filter(m => m.projectId === projectId);
}

export async function updateMilestone(milestoneId, patch) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/milestones/${milestoneId}`, {
      method: 'PATCH', body: JSON.stringify(patch),
    });
    if (data) return data;
  }
  return patch;
}

export async function getProjectSiteUpdates(projectId) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/partner/site-logs?projectId=${projectId}`);
    if (data) return data.logs || data.data || data;
  }
  const stored = lsGet(`bos_logs_${projectId}`);
  if (stored) return stored;
  const { DEMO_LOGBOOK } = await import('@/app/partner/_shared/demoData');
  return DEMO_LOGBOOK.filter(l => l.project === projectId);
}

function applyFilters(projects, filters) {
  return projects.filter(p => {
    if (filters.status && p.status !== filters.status) return false;
    if (filters.partnerId && p.partnerId !== filters.partnerId) return false;
    if (filters.clientId && p.clientId !== filters.clientId) return false;
    return true;
  });
}
