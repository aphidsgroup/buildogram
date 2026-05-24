export const PERMISSIONS = {
  ops_admin: ['*'],
  ops_pm: [
    'view_pipeline',
    'manage_leads',
    'view_properties',
    'view_documents',
    'view_partners',
    'manage_partners',
    'generate_boq',
    'view_revenue',
    'send_whatsapp_message',
    'manage_notification_rules',
    'view_reports',
  ],
  ops_engineer: [
    'view_pipeline',
    'manage_leads',
    'view_properties',
    'view_documents',
    'generate_boq',
  ],
};

export function roleCan(role, permission) {
  if (!role) return false;
  const perms = PERMISSIONS[role] || [];
  if (perms.includes('*')) return true;
  return perms.includes(permission);
}
