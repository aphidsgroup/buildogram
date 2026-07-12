import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { normalizeRole } from '@/lib/roles';

export async function getActiveUserFromRequest(request) {
  const tokenUser = getUserFromRequest(request);
  if (!tokenUser?.id) return null;

  const [user] = await sql`
    SELECT id, name, email, phone, role, partner_id, must_change_password
    FROM users
    WHERE id = ${tokenUser.id} AND is_active = true
    LIMIT 1
  `;
  if (!user) return null;
  return { ...user, role: normalizeRole(user.role) };
}
