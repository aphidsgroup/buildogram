import { systemAuditLogs } from './storageProvider';

/**
 * Creates an immutable audit log entry for critical system events.
 */
export async function logAudit(action, entityType, entityId, metadata = {}, user = 'System', req = null) {
  try {
    const ipAddress = req?.headers?.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = req?.headers?.get('user-agent') || 'Unknown';

    await systemAuditLogs.create({
      action,
      entityType,
      entityId,
      metadata: JSON.stringify(metadata),
      userId: user,
      ipAddress,
      userAgent
    });
    
    if (process.env.APP_MODE === 'demo') {
      console.log(`[AuditLog] ${action} on ${entityType} ${entityId} by ${user}`);
    }
  } catch (error) {
    console.error(`[AuditService] Failed to create audit log for ${action}`, error);
  }
}
