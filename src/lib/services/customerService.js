/**
 * customerService — Buildogram Phase E
 * ─────────────────────────────────────────────────────────────────────────
 * Customer-facing data access. Always applies safety filters.
 * Customers NEVER get raw project objects — use filterProjectForCustomer.
 */

import { lsGet, isDemoMode, apiFetch } from '@/lib/data/adapter';
import {
  filterProjectForCustomer,
  filterMilestoneForCustomer,
  filterSiteUpdateForCustomer,
  filterDocumentForCustomer,
  filterPaymentForCustomer,
  filterIssueForCustomer,
} from '@/lib/data/customerFilter';
import { DEMO_PROJECTS } from '@/app/partner/_shared/demoData';

/** Get all projects visible to a specific customer. */
export async function getCustomerProjects(customerId) {
  let projects = [];
  if (!isDemoMode()) {
    const data = await apiFetch('/api/client/dashboard');
    if (data?.projects) projects = data.projects;
  }
  if (!projects.length) {
    const allStored = lsGet('bos_projects') || DEMO_PROJECTS;
    projects = customerId
      ? allStored.filter(p => p.clientId === customerId || ['shared_with_customer', 'shared_with_both'].includes(p.visibility))
      : allStored; // no filter in demo mode
  }
  return projects.map(filterProjectForCustomer).filter(Boolean);
}

/** Get a single project safe for customer — returns {project, milestones, updates, documents, payments}. */
export async function getCustomerProject(projectId) {
  let project = null;
  let milestones = [];
  let updates = [];
  let documents = [];
  let payments = [];

  if (!isDemoMode()) {
    // Try API bundle first
    const data = await apiFetch(`/api/projects/${projectId}`);
    if (data?.project) {
      project = data.project;
      milestones = (data.milestones || []).map(filterMilestoneForCustomer).filter(Boolean);
      updates    = (data.updates    || []).map(filterSiteUpdateForCustomer).filter(Boolean);
      documents  = (data.documents  || []).map(filterDocumentForCustomer).filter(Boolean);
      payments   = (data.payments   || []).map(filterPaymentForCustomer).filter(Boolean);
      return { project: filterProjectForCustomer(project), milestones, updates, documents, payments };
    }
  }
  // localStorage fallback
  const all = lsGet('bos_projects') || DEMO_PROJECTS;
  project = all.find(p => p.id === projectId) || null;
  return project ? { project: filterProjectForCustomer(project), milestones, updates, documents, payments } : null;
}

/** Get customer-visible milestones. */
export async function getCustomerMilestones(projectId) {
  let milestones = lsGet(`bos_milestones_${projectId}`) || [];
  if (!milestones.length) {
    const { DEMO_MILESTONES } = await import('@/app/partner/_shared/demoData');
    milestones = DEMO_MILESTONES.filter(m => m.projectId === projectId);
  }
  return milestones.map(filterMilestoneForCustomer).filter(Boolean);
}

/** Get customer-visible site updates. */
export async function getCustomerSiteUpdates(projectId) {
  const updates = lsGet(`bos_logs_${projectId}`) || [];
  return updates.map(filterSiteUpdateForCustomer).filter(Boolean);
}

/** Get customer-visible documents. */
export async function getCustomerDocuments(projectId) {
  const docs = lsGet(`bos_docs_${projectId}`) || [];
  return docs.map(filterDocumentForCustomer).filter(Boolean);
}

/** Get customer-visible payments. */
export async function getCustomerPayments(projectId) {
  const { DEMO_PAYMENTS } = await import('@/app/partner/_shared/demoData');
  const payments = lsGet(`bos_payments_${projectId}`) || DEMO_PAYMENTS.filter(p => p.projectId === projectId);
  return payments.map(filterPaymentForCustomer).filter(Boolean);
}

/** Get customer-visible issues. */
export async function getCustomerIssues(projectId) {
  const issues = lsGet(`bos_issues_${projectId}`) || [];
  return issues.map(filterIssueForCustomer).filter(Boolean);
}

/** Customer query box — submit a question. */
export async function submitCustomerQuery(projectId, query) {
  const entry = {
    id: 'Q' + Date.now(),
    projectId,
    question: query.question,
    submittedBy: query.name || 'Customer',
    submittedAt: new Date().toISOString(),
    status: 'open',
    answer: null,
    answeredAt: null,
  };
  if (!isDemoMode()) {
    const data = await apiFetch('/api/client/requests', {
      method: 'POST',
      body: JSON.stringify({ projectId, ...query }),
    });
    if (data) return data;
  }
  const key = `bos_customer_queries_${projectId}`;
  const existing = lsGet(key) || [];
  lsGet(key); // read first
  const { lsSet } = await import('@/lib/data/adapter');
  lsSet(key, [entry, ...existing]);
  return entry;
}

/** Get customer queries for a project. */
export async function getCustomerQueries(projectId) {
  if (!isDemoMode()) {
    const data = await apiFetch(`/api/client/requests?projectId=${projectId}`);
    if (data?.requests) return data.requests;
  }
  return lsGet(`bos_customer_queries_${projectId}`) || [];
}
