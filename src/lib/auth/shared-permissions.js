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
    'view_reports',
    'manage_notification_queue',
    'send_whatsapp_message',
  ],
  ops_finance: [
    'view_finance',
    'manage_finance',
    'view_projects',
    'view_partners',
    'view_revenue',
    'manage_revenue',
    'manage_invoices',
    'view_reports',
  ],
  ops_engineer: [
    'view_projects',
    'manage_projects',
    'view_passports',
    'view_bqs',
    'manage_bqs',
    'view_reports',
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
    'access_client_portal',
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
