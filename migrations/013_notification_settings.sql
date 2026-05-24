CREATE TABLE IF NOT EXISTS notification_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_mode TEXT DEFAULT 'manual_approval' CHECK (automation_mode IN ('disabled', 'queue_only', 'manual_approval', 'auto_send_low_risk')),
  whatsapp_enabled BOOLEAN DEFAULT FALSE,
  email_enabled BOOLEAN DEFAULT FALSE,
  max_messages_per_hour INTEGER DEFAULT 100,
  max_messages_per_user_per_day INTEGER DEFAULT 5,
  respect_quiet_hours BOOLEAN DEFAULT TRUE,
  respect_user_preferences BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB
);

-- Insert a default row if it doesn't exist
INSERT INTO notification_settings (automation_mode) 
SELECT 'manual_approval' 
WHERE NOT EXISTS (SELECT 1 FROM notification_settings);
