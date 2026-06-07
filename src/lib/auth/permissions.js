import 'server-only';
import { cookies } from 'next/headers';
import { verifyTokenNode } from '@/lib/auth';
import { hasPermission } from './shared-permissions';
export { rolePermissions, hasPermission } from './shared-permissions';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('buildogram_token');
  if (!token?.value) return null;
  return await verifyTokenNode(token.value);
}

export async function requirePermission(permission) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  if (!hasPermission(user, permission)) throw new Error('Forbidden: Missing permission ' + permission);
  return user;
}

export async function requireAnyPermission(permissions) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  const hasAny = permissions.some(p => hasPermission(user, p));
  if (!hasAny) throw new Error('Forbidden: Missing any of permissions ' + permissions.join(', '));
  return user;
}

export async function requireRole(role) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  if (user.role !== role && user.role !== 'super_admin' && user.role !== 'ops_admin') {
    throw new Error('Forbidden: Role ' + role + ' required');
  }
  return user;
}
