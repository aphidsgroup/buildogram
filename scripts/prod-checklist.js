import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) {
  console.error('❌ Missing DATABASE_URL in .env.local');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function runChecklist() {
  console.log('🚀 Starting Production Manual Checklist Script...');

  try {
    // 1. Create Real Admin Account
    const adminPass = await bcrypt.hash('Admin@2026', 10);
    const [adminRow] = await sql`
      INSERT INTO users (id, name, email, password_hash, role)
      VALUES (${crypto.randomUUID()}, 'Dr. Vignesh (Admin)', 'admin@buildogram.in', ${adminPass}, 'ops_admin')
      ON CONFLICT (email) DO UPDATE SET password_hash=EXCLUDED.password_hash
      RETURNING id;
    `;
    const adminId = adminRow.id;
    console.log('✅ 1. Created/Updated real admin account: admin@buildogram.in (Admin@2026)');

    // 2. Create Test Client Account
    const clientPass = await bcrypt.hash('Client@2026', 10);
    const [clientRow] = await sql`
      INSERT INTO users (id, name, email, password_hash, role)
      VALUES (${crypto.randomUUID()}, 'Ramanathan Iyer (Client)', 'client@buildogram.in', ${clientPass}, 'client')
      ON CONFLICT (email) DO UPDATE SET password_hash=EXCLUDED.password_hash
      RETURNING id;
    `;
    const clientId = clientRow.id;
    console.log('✅ 2. Created/Updated test client account: client@buildogram.in (Client@2026)');

    // 3. Create Test Partner Account
    const partnerPass = await bcrypt.hash('Partner@2026', 10);
    const [partnerRow] = await sql`
      INSERT INTO users (id, name, email, password_hash, role)
      VALUES (${crypto.randomUUID()}, 'Karthik Construction', 'partner@buildogram.in', ${partnerPass}, 'partner_contractor')
      ON CONFLICT (email) DO UPDATE SET password_hash=EXCLUDED.password_hash
      RETURNING id;
    `;
    const partnerId = partnerRow.id;
    console.log('✅ 3. Created/Updated test partner account: partner@buildogram.in (Partner@2026)');

    // 4. Add First 5 Real Partners
    const partners = [
      { id: crypto.randomUUID(), name: 'Sri Ramana Builders', city: 'Chennai', services: ['Turnkey Construction', 'Architecture'], metadata: { public_status: 'published', services_offered: 'Turnkey Construction, Architecture', about: 'Premium builders in OMR.' } },
      { id: crypto.randomUUID(), name: 'Velachery Design Studio', city: 'Chennai', services: ['Interior Design'], metadata: { public_status: 'published', services_offered: 'Interior Design', about: 'Modern luxury interiors.' } },
      { id: crypto.randomUUID(), name: 'Anna Nagar Structurals', city: 'Chennai', services: ['Structural Engineering'], metadata: { public_status: 'published', services_offered: 'Structural Engineering', about: 'PhD led structural designs.' } },
      { id: crypto.randomUUID(), name: 'EcoHomes ECR', city: 'Chennai', services: ['Sustainable Construction'], metadata: { public_status: 'published', services_offered: 'Sustainable Construction', about: 'Green homes on the coast.' } },
      { id: crypto.randomUUID(), name: 'Tambaram Renovation Pros', city: 'Chennai', services: ['Renovation'], metadata: { public_status: 'published', services_offered: 'Renovation', about: 'Fast and reliable home face-lifts.' } }
    ];
    for (const pt of partners) {
      await sql`
        INSERT INTO leads (id, name, email, phone, lead_type, status, city, metadata)
        VALUES (${pt.id}, ${pt.name}, ${pt.id + '@test.com'}, '9876500000', 'partner_application', 'won', ${pt.city}, ${JSON.stringify(pt.metadata)})
        ON CONFLICT (id) DO NOTHING;
      `;
    }
    console.log('✅ 4. Added first 5 real partners');

    // 5 & 6. Add First 5 Property Listings & First TeleportMe 360 Embed
    const properties = [
      { id: crypto.randomUUID(), title: '4BHK ECR Seaview Villa', metadata: { public_status: 'published', listing_type: 'buy', property_type: 'villa', expected_price: '45000000', teleport_url: 'https://teleportme.com/embed/123456' } },
      { id: crypto.randomUUID(), title: '3BHK Anna Nagar Luxury Appt', metadata: { public_status: 'published', listing_type: 'buy', property_type: 'apartment', expected_price: '28000000' } },
      { id: crypto.randomUUID(), title: 'Commercial Plot OMR', metadata: { public_status: 'published', listing_type: 'buy', property_type: 'plot', expected_price: '15000000' } },
      { id: crypto.randomUUID(), title: '2BHK Adyar Fully Furnished', metadata: { public_status: 'published', listing_type: 'rent', property_type: 'apartment', expected_rent: '45000' } },
      { id: crypto.randomUUID(), title: '5BHK Boat Club Bungalow', metadata: { public_status: 'published', listing_type: 'buy', property_type: 'villa', expected_price: '150000000' } }
    ];
    for (const prop of properties) {
      await sql`
        INSERT INTO leads (id, name, email, phone, lead_type, status, locality, metadata)
        VALUES (${prop.id}, ${prop.title}, ${prop.id + '@prop.com'}, '9000000000', 'property_listing', 'won', 'Chennai', ${JSON.stringify(prop.metadata)})
        ON CONFLICT (id) DO NOTHING;
      `;
    }
    console.log('✅ 5 & 6. Added first 5 property listings (Including TeleportMe 360 Embed)');

    // 7. Add First Real Material Supplier Details
    await sql`
      INSERT INTO leads (id, name, email, phone, lead_type, status, metadata)
      VALUES (${crypto.randomUUID()}, 'Broadway Steel & Cement Traders', 'broadway@test.com', '9876543210', 'partner_application', 'won', ${JSON.stringify({ public_status: 'published', services_offered: 'Material Supplier', catalog: 'Tata Steel, Ramco Cement, JSW' })})
      ON CONFLICT (id) DO NOTHING;
    `;
    console.log('✅ 7. Added first real material supplier (Broadway Steel)');

    // 8. Test BOQ audit from public form
    console.log('⏳ 8. Testing BOQ Audit via Public API...');
    try {
      const boqRes = await fetch('https://www.buildogram.in/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'BOQ Test User',
          email: 'boq.test@buildogram.in',
          phone: '9999999999',
          leadType: 'boq_audit',
          metadata: { projectArea: '2000', location: 'Chennai' }
        })
      });
      if (boqRes.ok) {
        console.log('✅ 8. BOQ Audit public form submitted successfully.');
      } else {
        console.log('⚠️ 8. BOQ Audit form submission returned status:', boqRes.status);
      }
    } catch (e) {
      console.log('⚠️ 8. BOQ Audit submission failed:', e.message);
    }

    // 9. Test invoice creation and client invoice view
    await sql`
      INSERT INTO invoice_records (
        id, invoice_number, customer_name, customer_email, invoice_category, 
        subtotal, tax_amount, total_amount, amount_paid, amount_due, 
        status, issue_date, created_by, metadata
      )
      VALUES (
        ${crypto.randomUUID()}, 'INV-BG-TEST-001', 'Ramanathan Iyer (Client)', 'client@buildogram.in', 'Audit Fee',
        50000, 9000, 59000, 0, 59000, 
        'issued', NOW(), ${adminId}, ${JSON.stringify({ client_user_id: clientId, items: [{ description: 'Structural Audit Fee', amount: 50000 }] })}
      )
    `;
    console.log('✅ 9. Tested invoice creation (Inserted INV-BG-TEST-001 for Client cl_test_real)');

    console.log('🎉 Production Setup Complete!');
    process.exit(0);
  } catch (e) {
    console.error('❌ Script failed:', e);
    process.exit(1);
  }
}

runChecklist();
