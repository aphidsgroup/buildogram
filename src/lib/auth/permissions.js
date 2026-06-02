/**
 * Buildogram Auth Permissions
 * ─────────────────────────────────────────────────────────────────────────
 * Pure utility functions for role-based access control.
 * Works with current mock user/role pattern.
 * Wire real auth by replacing the mock user resolution in each check.
 *
 * Usage:
 *   import { canViewProject } from '@/lib/auth/permissions';
 *   if (!canViewProject(user, project)) return forbidden();
 */

import { ROLES } from '@/lib/models/index';

/* ── Role helpers ────────────────────────────────────────────────────── */
export const isOps    = u => u && [ROLES.ops_admin, ROLES.ops_manager, ROLES.ops_viewer].includes(u.role);
export const isAdmin  = u => u && u.role === ROLES.ops_admin;
export const isPartner= u => u && u.role === ROLES.partner;
export const isSupplier=u => u && u.role === ROLES.supplier;
export const isCustomer=u => u && u.role === ROLES.customer;

/* ── Project permissions ─────────────────────────────────────────────── */

/**
 * Can the user see this project at all?
 */
export function canViewProject(user, project) {
  if (!user || !project) return false;
  if (isAdmin(user) || isOps(user)) return true;

  // Partner: owns the project
  if (isPartner(user) && project.partnerId === user.partnerId) return true;

  // Customer: project must be shared with customer
  if (isCustomer(user)) {
    const clientMatch = project.clientId === user.id || project.clientId === user.customerId;
    const shared = ['shared_with_customer', 'shared_with_both'].includes(project.visibility);
    return clientMatch && shared;
  }

  return false;
}

/**
 * Can the user edit this project (add updates, milestones, materials)?
 */
export function canEditProject(user, project) {
  if (!user || !project) return false;
  if (isAdmin(user)) return true;
  if (isOps(user) && user.role !== ROLES.ops_viewer) return true;
  if (isPartner(user) && project.partnerId === user.partnerId) return true;
  return false;
}

/**
 * Can the user see ALL project data including expenses, margins, private notes?
 * Ops and the owning partner can. Customers cannot.
 */
export function canViewInternalProjectData(user, project) {
  if (!user || !project) return false;
  if (isAdmin(user) || isOps(user)) return true;
  if (isPartner(user) && project.partnerId === user.partnerId) return true;
  return false;
}

/**
 * Can the user see customer-facing data for this project?
 */
export function canViewCustomerData(user, project) {
  if (!user || !project) return false;
  if (isAdmin(user) || isOps(user)) return true;
  if (isPartner(user) && project.partnerId === user.partnerId) return true;
  if (isCustomer(user)) return canViewProject(user, project);
  return false;
}

/* ── Material Request permissions ────────────────────────────────────── */

/**
 * Can the user view a material request?
 */
export function canViewMaterialRequest(user, request) {
  if (!user || !request) return false;
  if (isAdmin(user) || isOps(user)) return true;
  if (isPartner(user) && request.partnerId === user.partnerId) return true;
  if (isSupplier(user) && request.assignedSupplierId === user.supplierId) return true;
  return false;
}

/**
 * Can the user manage RFQ assignment (assign/approve/reject)?
 */
export function canManageRFQ(user) {
  if (!user) return false;
  return isAdmin(user) || (isOps(user) && user.role !== ROLES.ops_viewer);
}

/* ── Quotation permissions ───────────────────────────────────────────── */

/**
 * Can the user submit a supplier quotation?
 */
export function canSubmitQuote(user) {
  if (!user) return false;
  return isSupplier(user) || isAdmin(user);
}

/**
 * Can the user approve/reject quotations?
 */
export function canApproveQuote(user) {
  if (!user) return false;
  return isAdmin(user) || (isOps(user) && user.role !== ROLES.ops_viewer);
}

/* ── Lead permissions ────────────────────────────────────────────────── */

/**
 * Can the user convert a lead to a project?
 */
export function canConvertLead(user) {
  if (!user) return false;
  return isAdmin(user) || (isOps(user) && user.role !== ROLES.ops_viewer);
}

/**
 * Can the user assign leads to partners?
 */
export function canAssignLead(user) {
  return canConvertLead(user);
}

/**
 * Can the user view all leads?
 */
export function canViewAllLeads(user) {
  if (!user) return false;
  return isAdmin(user) || isOps(user);
}

/* ── Partner permissions ─────────────────────────────────────────────── */

/**
 * Can the user approve/reject partner applications?
 */
export function canApprovePartner(user) {
  if (!user) return false;
  return isAdmin(user) || user.role === ROLES.ops_manager;
}

/**
 * Can the user view all partners?
 */
export function canViewAllPartners(user) {
  if (!user) return false;
  return isAdmin(user) || isOps(user);
}

/* ── Customer data guard ─────────────────────────────────────────────── */

/**
 * Can this user role see supplier quotes?
 */
export function canViewSupplierQuotes(user) {
  if (!user) return false;
  return isAdmin(user) || isOps(user);
}

/**
 * Can this user see internal partner notes?
 */
export function canViewInternalNotes(user) {
  if (!user) return false;
  return isAdmin(user) || isOps(user);
}

/* ── Plan limit check ────────────────────────────────────────────────── */
import { PLAN_LIMITS } from '@/lib/models/index';

/**
 * Check if a partner has hit a plan limit.
 * @param {object} partner — must have planType and usage
 * @param {'projects'|'materialRequests'|'documents'|'teamMembers'} resource
 * @returns {{ allowed: boolean, used: number, max: number, pct: number }}
 */
export function checkPlanLimit(partner, resource) {
  const plan  = partner?.planType || 'free';
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.free;
  const used  = partner?.usage?.[resource] ?? 0;
  const max   = limits[resource] ?? 0;
  return {
    allowed: max === Infinity || used < max,
    used,
    max,
    pct: max === Infinity ? 0 : Math.round((used / max) * 100),
  };
}
