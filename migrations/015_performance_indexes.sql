-- 015_performance_indexes.sql

-- 1. Index on accounting_ledger to speed up dashboard/export lookups
CREATE INDEX IF NOT EXISTS idx_accounting_ledger_account_name ON accounting_ledger(account_name);
CREATE INDEX IF NOT EXISTS idx_accounting_ledger_reference ON accounting_ledger(reference_type, reference_id);
CREATE INDEX IF NOT EXISTS idx_accounting_ledger_date ON accounting_ledger(transaction_date DESC);

-- 2. Index on invoice_records to speed up client/ops lookups by source
CREATE INDEX IF NOT EXISTS idx_invoice_records_source_id ON invoice_records(source_id);

-- 3. GIN Index on leads.metadata for fast public filtering
CREATE INDEX IF NOT EXISTS idx_leads_metadata_gin ON leads USING GIN (metadata);

-- 4. B-Tree Index on leads.lead_type
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON leads(lead_type);
