-- 1. Add GST specific columns to existing invoice_records
ALTER TABLE invoice_records 
ADD COLUMN IF NOT EXISTS subtotal NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS cgst NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS sgst NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS igst NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS hsn_sac_code TEXT,
ADD COLUMN IF NOT EXISTS gst_rate NUMERIC DEFAULT 18;

-- Migrate existing total_amount back into subtotal where it's missing just for cleanliness
UPDATE invoice_records SET subtotal = total_amount WHERE subtotal = 0 AND total_amount > 0;

-- 2. Create the unified Accounting Ledger
CREATE TABLE IF NOT EXISTS accounting_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_date TIMESTAMPTZ DEFAULT NOW(),
  reference_type TEXT NOT NULL CHECK (reference_type IN ('invoice', 'payment', 'expense', 'refund', 'adjustment')),
  reference_id UUID,
  account_name TEXT NOT NULL,
  debit NUMERIC DEFAULT 0,
  credit NUMERIC DEFAULT 0,
  description TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
