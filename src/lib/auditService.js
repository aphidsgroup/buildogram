import { prisma } from './storageProvider';

/**
 * Creates an immutable audit log entry for critical system events.
 */
export async function logAudit(action, entityType, entityId, metadata = {}, user = 'System', req = null) {
  try {
    const ipAddress = req?.headers?.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = req?.headers?.get('user-agent') || 'Unknown';

    await prisma.audit_logs.create({
      data: {
        actor_user_id: typeof user === 'string' && /^[0-9a-f-]{36}$/i.test(user) ? user : null,
        actor_role: typeof user === 'string' && !/^[0-9a-f-]{36}$/i.test(user) ? user : null,
        action,
        resource_type: entityType,
        resource_id: String(entityId),
        after_json: metadata,
        ip_address: ipAddress.split(',')[0].trim(),
        user_agent: userAgent,
      },
    });
    
    if (process.env.APP_MODE === 'demo') {
      console.log(`[AuditLog] ${action} on ${entityType} ${entityId} by ${user}`);
    }
  } catch (error) {
    console.error(`[AuditService] Failed to create audit log for ${action}`, error);
  }
}
