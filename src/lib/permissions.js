import { rolePermissions, hasPermission } from '@/lib/auth/shared-permissions';

export const PERMISSIONS = rolePermissions;

// Backwards compatibility layer
export function roleCan(role, permission) {
  return hasPermission({ role }, permission);
}
