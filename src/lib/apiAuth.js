// src/lib/apiAuth.js
// Reusable auth guards for API routes
// Usage:
//   const { user, error } = await requireAuth(request);
//   if (error) return error;

import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

const OPS_ROLES = ['super_admin', 'ops_admin', 'ops_pm', 'ops_engineer'];

/**
 * Require any authenticated user.
 * Returns { user } or { error: NextResponse }
 */
export function requireAuth(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return {
      error: NextResponse.json(
        { success: false, message: 'Authentication required. Please log in.' },
        { status: 401 }
      )
    };
  }
  return { user };
}

/**
 * Require one of the specified roles.
 * Returns { user } or { error: NextResponse }
 */
export function requireRole(request, roles) {
  const { user, error } = requireAuth(request);
  if (error) return { error };
  if (!roles.includes(user.role)) {
    return {
      error: NextResponse.json(
        { success: false, message: `Access denied. Required roles: ${roles.join(', ')}` },
        { status: 403 }
      )
    };
  }
  return { user };
}

/**
 * Require ops role (ops_admin, ops_pm, ops_engineer).
 */
export function requireOps(request) {
  return requireRole(request, OPS_ROLES);
}

/**
 * Require ops_admin specifically.
 */
export function requireAdmin(request) {
  return requireRole(request, ['super_admin', 'ops_admin']);
}

/**
 * Require partner role.
 * Also checks that user has a partner_id set (passed in as param when needed).
 */
export function requirePartner(request) {
  return requireRole(request, ['partner_admin', 'partner_user']);
}

/**
 * Standard success response.
 */
export function ok(data, status = 200) {
  return NextResponse.json({ success: true, ...data }, { status });
}

/**
 * Standard error response.
 */
export function fail(message, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}
