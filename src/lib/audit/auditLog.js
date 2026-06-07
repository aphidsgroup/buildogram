import { prisma } from '@/lib/storageProvider';
import { getCurrentUser } from '@/lib/auth/permissions';
import { headers } from 'next/headers';

/**
 * Core function to create an audit log entry.
 */
export async function createAuditLog(params) {
  try {
    const headerStore = await headers();
    const ip = headerStore.get('x-forwarded-for') || headerStore.get('remote-addr') || null;
    const ua = headerStore.get('user-agent') || null;
    
    // Attempt to get user if not explicitly passed
    let actorId = params.actorId;
    let actorName = params.actorName;
    let actorRole = params.actorRole;
    
    if (!actorId) {
      try {
        const user = await getCurrentUser();
        if (user) {
          actorId = user.id;
          actorName = user.name;
          actorRole = user.role;
        }
      } catch (err) {
        // Ignore if we can't get current user (e.g. background job)
      }
    }

    await prisma.audit_logs.create({
      data: {
        actor_user_id: actorId || null,
        actor_name: actorName || 'System',
        actor_role: actorRole || 'system',
        action: params.action,
        resource_type: params.resourceType,
        resource_id: params.resourceId,
        before_json: params.before || null,
        after_json: params.after || null,
        ip_address: ip,
        user_agent: ua,
      }
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
}

/**
 * Log a CREATE action
 */
export async function auditCreate(resourceType, resourceId, afterData, actor = null) {
  await createAuditLog({
    action: 'CREATE',
    resourceType,
    resourceId,
    after: afterData,
    actorId: actor?.id,
    actorName: actor?.name,
    actorRole: actor?.role,
  });
}

/**
 * Log an UPDATE action
 */
export async function auditUpdate(resourceType, resourceId, beforeData, afterData, actor = null) {
  await createAuditLog({
    action: 'UPDATE',
    resourceType,
    resourceId,
    before: beforeData,
    after: afterData,
    actorId: actor?.id,
    actorName: actor?.name,
    actorRole: actor?.role,
  });
}

/**
 * Log a DELETE action
 */
export async function auditDelete(resourceType, resourceId, beforeData, actor = null) {
  await createAuditLog({
    action: 'DELETE',
    resourceType,
    resourceId,
    before: beforeData,
    actorId: actor?.id,
    actorName: actor?.name,
    actorRole: actor?.role,
  });
}

/**
 * Log a STATUS_CHANGE action
 */
export async function auditStatusChange(resourceType, resourceId, oldStatus, newStatus, actor = null) {
  await createAuditLog({
    action: 'STATUS_CHANGE',
    resourceType,
    resourceId,
    before: { status: oldStatus },
    after: { status: newStatus },
    actorId: actor?.id,
    actorName: actor?.name,
    actorRole: actor?.role,
  });
}

/**
 * Log a FINANCE_ACTION specifically
 */
export async function auditFinanceAction(actionDetails, resourceType, resourceId, beforeData, afterData, actor = null) {
  await createAuditLog({
    action: `FINANCE_${actionDetails}`,
    resourceType,
    resourceId,
    before: beforeData,
    after: afterData,
    actorId: actor?.id,
    actorName: actor?.name,
    actorRole: actor?.role,
  });
}
