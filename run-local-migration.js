const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const DATABASE_URL = "postgresql://neondb_owner:REDACTED_TOKEN@REDACTED-HOST.neon.tech/neondb?sslmode=require&channel_binding=require";

async function runDirectMigration() {
  const sql = postgres(DATABASE_URL, { ssl: 'require' });
  try {
    const files = ['001_leads_ecosystem_upgrade.sql', '002_properties_table.sql', '004_add_property_listing_lead_type.sql', '005_add_passport_json.sql', '006_add_owner_user_id.sql', '007_passport_documents.sql', '008_add_property_inquiry_lead_type.sql', '009_create_ai_requests_table.sql', '010_create_change_orders.sql', '011_document_consent.sql', '012_payment_orders.sql', '013_notification_settings.sql', '014_accounting_and_gst.sql', '015_performance_indexes.sql', '016_partner_ecosystem.sql', '017_partner_users_link.sql'];
    
    for (const f of files) {
      console.log(`Running ${f}...`);
      const content = fs.readFileSync(path.join(__dirname, 'migrations', f), 'utf8');
      await sql.unsafe(content);
    }
    console.log("✅ All Migrated successfully.");

  } catch(e) {
    console.error("❌ Migration failed:", e.message);
  } finally {
    await sql.end();
  }
}

runDirectMigration();
