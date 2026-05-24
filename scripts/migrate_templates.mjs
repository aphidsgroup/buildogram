import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function run() {
  console.log('Creating whatsapp_templates table...');
  await sql`
    CREATE TABLE IF NOT EXISTS whatsapp_templates (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      template_key VARCHAR(100) UNIQUE NOT NULL,
      template_name VARCHAR(100) NOT NULL,
      category VARCHAR(50) NOT NULL,
      channel_type VARCHAR(20) DEFAULT 'both',
      message_body TEXT NOT NULL,
      variables JSONB DEFAULT '[]'::jsonb,
      is_active BOOLEAN DEFAULT true,
      requires_meta_approval BOOLEAN DEFAULT false,
      meta_template_name VARCHAR(100),
      created_by UUID,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  console.log('Table created!');

  const countRes = await sql`SELECT COUNT(*) FROM whatsapp_templates`;
  const count = parseInt(countRes[0].count);

  if (count === 0) {
    console.log('Seeding starter templates...');
    const starters = [
      ['general_followup', 'General Follow-up', 'general', 'Hi {{name}}, this is Buildogram. Thank you for contacting us. Our team will review your requirement and get back to you shortly.', '["name"]'],
      ['document_request', 'Request Documents', 'document_request', 'Hi {{name}}, we need a few documents to proceed with your {{lead_type}} request. Please share them here or upload them via your portal: {{portal_link}}', '["name", "lead_type", "portal_link"]'],
      ['boq_ready', 'BOQ Report Ready', 'boq_update', 'Hi {{name}}, your BOQ audit report is ready! You can view the details safely in your Buildogram portal.', '["name"]'],
      ['material_received', 'Material Quote Received', 'material_quote', 'Hi {{name}}, we received your material quote request for {{material_items}}. Our team is checking availability and rates.', '["name", "material_items"]'],
      ['material_shared', 'Material Quote Shared', 'material_quote', 'Hi {{name}}, your material quote for {{material_items}} is ready for review.', '["name", "material_items"]'],
      ['property_listing', 'Property Listing Received', 'property_listing', 'Hi {{name}}, we received your property listing request for {{location}}. Our team will review the details and contact you for the next step.', '["name", "location"]'],
      ['property_inquiry', 'Property Inquiry Received', 'property_inquiry', 'Hi {{name}}, thank you for inquiring about a property. Our team will assist you shortly.', '["name"]'],
      ['maintenance_received', 'Maintenance Request Received', 'maintenance', 'Hi {{name}}, we received your maintenance request for {{issue_category}}. Our team will review and update you.', '["name", "issue_category"]'],
      ['maintenance_update', 'Maintenance Status Update', 'maintenance', 'Hi {{name}}, the status of your maintenance request is now: {{status}}.', '["name", "status"]'],
      ['partner_received', 'Partner Application Received', 'partner_onboarding', 'Hi {{name}}, we received your partner application for {{business_name}}. Our team will review your profile.', '["name", "business_name"]'],
      ['partner_published', 'Partner Profile Published', 'partner_onboarding', 'Hi {{name}}, great news! Your partner profile for {{business_name}} has been verified and published on Buildogram.', '["name", "business_name"]'],
      ['passport_updated', 'Property Passport Updated', 'passport_update', 'Hi {{name}}, your Property Passport for {{location}} has been updated.', '["name", "location"]']
    ];

    for (const [key, name, cat, msg, vars] of starters) {
      await sql`
        INSERT INTO whatsapp_templates (template_key, template_name, category, message_body, variables)
        VALUES (${key}, ${name}, ${cat}, ${msg}, ${vars}::jsonb)
        ON CONFLICT (template_key) DO NOTHING
      `;
    }
    console.log('Templates seeded successfully!');
  } else {
    console.log('Templates already exist, skipping seed.');
  }
}

run().catch(console.error);
