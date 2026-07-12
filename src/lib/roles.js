export const ROLES = Object.freeze({
  SUPER_ADMIN: 'super_admin',
  OPS_ADMIN: 'ops_admin',
  OPS_PM: 'ops_pm',
  OPS_FINANCE: 'ops_finance',
  OPS_ENGINEER: 'ops_engineer',
  OPS_CONTENT: 'ops_content',
  PARTNER_ADMIN: 'partner_admin',
  PARTNER_USER: 'partner_user',
  SUPPLIER_ADMIN: 'supplier_admin',
  SUPPLIER_USER: 'supplier_user',
  CLIENT_USER: 'client_user',
  VIEWER: 'viewer',
});

export const ALL_OPS_ROLES = [
  ROLES.SUPER_ADMIN,
  ROLES.OPS_ADMIN,
  ROLES.OPS_PM,
  ROLES.OPS_FINANCE,
  ROLES.OPS_ENGINEER,
  ROLES.OPS_CONTENT,
];

// Existing BOQ/project code imports OPS_ROLES; preserve its narrower meaning.
export const OPS_ROLES = [ROLES.OPS_ADMIN, ROLES.OPS_PM, ROLES.OPS_ENGINEER];
export const PROJECT_MUTATION_ROLES = [ROLES.SUPER_ADMIN, ...OPS_ROLES];
export const PARTNER_ROLES = [ROLES.PARTNER_ADMIN, ROLES.PARTNER_USER];
export const SUPPLIER_ROLES = [ROLES.SUPPLIER_ADMIN, ROLES.SUPPLIER_USER];

const LEGACY_ROLE_MAP = Object.freeze({
  admin: ROLES.OPS_ADMIN,
  client: ROLES.CLIENT_USER,
  customer: ROLES.CLIENT_USER,
  partner: ROLES.PARTNER_ADMIN,
  partner_contractor: ROLES.PARTNER_ADMIN,
  partner_supplier: ROLES.SUPPLIER_ADMIN,
  supplier: ROLES.SUPPLIER_ADMIN,
});

export function normalizeRole(role) {
  return LEGACY_ROLE_MAP[role] || role;
}

export function isOpsRole(role) {
  return ALL_OPS_ROLES.includes(normalizeRole(role));
}

export function isPartnerRole(role) {
  return PARTNER_ROLES.includes(normalizeRole(role));
}

export function isSupplierRole(role) {
  return SUPPLIER_ROLES.includes(normalizeRole(role));
}
