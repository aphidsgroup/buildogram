export const rolePermissions = {
  super_admin: ['*'],
  ops_admin: ['*'],
  ops_pm: [
    'view_leads',
    'manage_leads',
    'view_projects',
    'manage_projects',
    'view_partners',
    'manage_partners',
    'view_passports',
    'manage_passports',
  ],
  ops_finance: [
    'view_finance',
    'manage_finance',
    'view_projects',
    'view_partners',
  ],
  ops_engineer: [
    'view_projects',
    'manage_projects',
    'view_passports',
    'view_bqs',
    'manage_bqs',
  ],
  ops_content: [
    'view_content',
    'manage_content',
  ],
  partner_admin: [
    'view_projects',
    'manage_projects',
    'view_leads',
  ],
  partner_user: [
    'view_projects',
    'view_leads',
  ],
  client_user: [
    'view_projects',
    'view_passports',
  ],
  viewer: [
    'view_projects',
  ],
};

export function hasPermission(user, permission) {
  if (!user || !user.role) return false;
  const perms = rolePermissions[user.role] || [];
  if (perms.includes('*')) return true;
  return perms.includes(permission);
}
