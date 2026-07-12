ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;

UPDATE users SET role = 'ops_admin' WHERE role = 'admin';
UPDATE users SET role = 'client_user' WHERE role IN ('client', 'customer');
UPDATE users SET role = 'partner_admin' WHERE role IN ('partner', 'partner_contractor');
UPDATE users SET role = 'supplier_admin' WHERE role IN ('partner_supplier', 'supplier');

ALTER TABLE users
  ADD CONSTRAINT users_role_check CHECK (role IN (
    'super_admin',
    'ops_admin',
    'ops_pm',
    'ops_finance',
    'ops_engineer',
    'ops_content',
    'partner_admin',
    'partner_user',
    'supplier_admin',
    'supplier_user',
    'client_user',
    'viewer'
  ));
