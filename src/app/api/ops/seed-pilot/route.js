import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requireAdmin, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  await requirePermission('ops_admin');
  const { user, error } = requireAdmin(request);
  if (error) return error;

  if (process.env.ENABLE_PILOT_SEED !== 'true') {
    return fail('Pilot seed is disabled. Set ENABLE_PILOT_SEED=true in environment to run this.', 403);
  }

  try {
    // 1. Clean existing pilot data (Delete cascades if foreign keys are set, otherwise delete manually in reverse order)
    await sql`DELETE FROM issues WHERE source_type = 'pilot_seed'`;
    await sql`DELETE FROM documents WHERE source_type = 'pilot_seed'`;
    await sql`DELETE FROM site_updates WHERE source_type = 'pilot_seed'`;
    await sql`DELETE FROM material_quotes WHERE source_type = 'pilot_seed'`;
    await sql`DELETE FROM material_requests WHERE source_type = 'pilot_seed'`;
    await sql`DELETE FROM milestones WHERE source_type = 'pilot_seed'`;
    await sql`DELETE FROM projects WHERE source_type = 'pilot_seed'`;
    await sql`DELETE FROM leads WHERE source_type = 'pilot_seed'`;
    await sql`DELETE FROM partners WHERE source_type = 'pilot_seed'`;
    await sql`DELETE FROM users WHERE email LIKE '%@pilot.buildogram.in'`;

    // 2. Create Users
    const [opsAdmin] = await sql`
      INSERT INTO users (name, email, password_hash, role, is_active)
      VALUES ('Pilot Ops', 'ops@pilot.buildogram.in', 'dummy', 'ops_admin', true) RETURNING id
    `;
    const [partner1] = await sql`
      INSERT INTO users (name, email, password_hash, role, is_active)
      VALUES ('StructSafe Builders', 'builder1@pilot.buildogram.in', 'dummy', 'partner', true) RETURNING id
    `;
    const [partner2] = await sql`
      INSERT INTO users (name, email, password_hash, role, is_active)
      VALUES ('Elite Constructs', 'builder2@pilot.buildogram.in', 'dummy', 'partner', true) RETURNING id
    `;
    const [partner3] = await sql`
      INSERT INTO users (name, email, password_hash, role, is_active)
      VALUES ('Aura Architects', 'architect@pilot.buildogram.in', 'dummy', 'partner', true) RETURNING id
    `;
    const [siteEng] = await sql`
      INSERT INTO users (name, email, password_hash, role, is_active)
      VALUES ('Rahul Eng', 'rahul@pilot.buildogram.in', 'dummy', 'partner', true) RETURNING id
    `;
    const [supplier1] = await sql`
      INSERT INTO users (name, email, password_hash, role, is_active)
      VALUES ('UltraTech Cement Depo', 'supplier1@pilot.buildogram.in', 'dummy', 'supplier', true) RETURNING id
    `;
    const [supplier2] = await sql`
      INSERT INTO users (name, email, password_hash, role, is_active)
      VALUES ('JSW Steel Traders', 'supplier2@pilot.buildogram.in', 'dummy', 'supplier', true) RETURNING id
    `;
    const [customer1] = await sql`
      INSERT INTO users (name, email, password_hash, role, is_active)
      VALUES ('Rajesh Kumar', 'rajesh@pilot.buildogram.in', 'dummy', 'customer', true) RETURNING id
    `;
    const [customer2] = await sql`
      INSERT INTO users (name, email, password_hash, role, is_active)
      VALUES ('Priya Sharma', 'priya@pilot.buildogram.in', 'dummy', 'customer', true) RETURNING id
    `;

    // 3. Create Partners Profiles
    await sql`
      INSERT INTO partners (user_id, company_name, slug, category, approval_status, is_active, source_type) VALUES
      (${partner1.id}, 'StructSafe Builders', 'structsafe-pilot', 'General Contractor', 'Approved', true, 'pilot_seed'),
      (${partner2.id}, 'Elite Constructs', 'elite-pilot', 'General Contractor', 'Approved', true, 'pilot_seed'),
      (${partner3.id}, 'Aura Architects', 'aura-pilot', 'Architect', 'Approved', true, 'pilot_seed')
    `;

    // 4. Create Leads
    await sql`
      INSERT INTO leads (client_name, email, phone, project_type, location, status, partner_id, source_type) VALUES
      ('Karthik', 'karthik@example.com', '9876543210', 'Renovation', 'Adyar', 'New', NULL, 'pilot_seed'),
      ('Vikram', 'vikram@example.com', '9876543211', 'Commercial', 'T Nagar', 'Assigned', ${partner2.id}, 'pilot_seed'),
      ('Deepa', 'deepa@example.com', '9876543212', 'Villa', 'ECR', 'Converted', ${partner1.id}, 'pilot_seed')
    `;

    // 5. Create Projects
    const [proj1] = await sql`
      INSERT INTO projects (client_id, partner_id, name, location, city, project_type, budget, start_date, status, source_type, pm_id, visibility, progress_percent, current_stage) 
      VALUES (${customer1.id}, ${partner1.id}, 'Rajesh Villa G+2', 'Porur', 'Chennai', 'Villa Construction', 12000000, NOW() - INTERVAL '30 days', 'In Progress', 'pilot_seed', ${opsAdmin.id}, 'customer_visible', 35, 'Structure')
      RETURNING id
    `;
    const [proj2] = await sql`
      INSERT INTO projects (client_id, partner_id, name, location, city, project_type, budget, start_date, status, source_type, pm_id, visibility, progress_percent, current_stage) 
      VALUES (${customer2.id}, ${partner2.id}, 'Priya Home Renovation', 'Anna Nagar', 'Chennai', 'Renovation', 4500000, NOW() - INTERVAL '10 days', 'In Progress', 'pilot_seed', ${opsAdmin.id}, 'customer_visible', 15, 'Demolition')
      RETURNING id
    `;

    // 6. Create Milestones (2 customer visible, 1 internal)
    await sql`
      INSERT INTO milestones (project_id, name, stage, status, customer_visible, source_type) VALUES 
      (${proj1.id}, 'Foundation Completed', 'Foundation', 'Completed', true, 'pilot_seed'),
      (${proj1.id}, 'Ground Floor Slab', 'Structure', 'In Progress', true, 'pilot_seed'),
      (${proj1.id}, 'Plumbing Rough-in', 'MEP', 'Pending', false, 'pilot_seed')
    `;

    // 7. Material Requests & Quotes
    const [req1] = await sql`INSERT INTO material_requests (project_id, requested_by, material_name, qty, unit, required_date, priority, status, vendor_quote_status, source_type) VALUES (${proj1.id}, ${partner1.id}, 'OPC 53 Grade Cement', 200, 'Bags', NOW() + INTERVAL '3 days', 'High', 'Approved', 'Approved', 'pilot_seed') RETURNING id`;
    const [req2] = await sql`INSERT INTO material_requests (project_id, requested_by, material_name, qty, unit, required_date, priority, status, vendor_quote_status, source_type) VALUES (${proj1.id}, ${partner1.id}, 'Fe500D TMT Steel', 5, 'MT', NOW() + INTERVAL '5 days', 'High', 'Requested', 'Pending', 'pilot_seed') RETURNING id`;
    const [req3] = await sql`INSERT INTO material_requests (project_id, requested_by, material_name, qty, unit, required_date, priority, status, vendor_quote_status, source_type) VALUES (${proj2.id}, ${partner2.id}, 'River Sand', 3, 'Trucks', NOW() + INTERVAL '2 days', 'Medium', 'Requested', 'Pending', 'pilot_seed') RETURNING id`;
    const [req4] = await sql`INSERT INTO material_requests (project_id, requested_by, material_name, qty, unit, required_date, priority, status, vendor_quote_status, source_type) VALUES (${proj2.id}, ${partner2.id}, 'Vitrified Tiles 2x2', 1500, 'Sqft', NOW() + INTERVAL '14 days', 'Low', 'Requested', 'Not Required', 'pilot_seed') RETURNING id`;
    const [req5] = await sql`INSERT INTO material_requests (project_id, requested_by, material_name, qty, unit, required_date, priority, status, vendor_quote_status, source_type) VALUES (${proj1.id}, ${partner1.id}, 'M-Sand', 4, 'Trucks', NOW() + INTERVAL '4 days', 'Medium', 'Requested', 'Pending', 'pilot_seed') RETURNING id`;

    await sql`
      INSERT INTO material_quotes (request_id, supplier_id, rate, total_amount, delivery_date, remarks, status, source_type) VALUES
      (${req1.id}, ${supplier1.id}, 380, 76000, NOW() + INTERVAL '2 days', 'Free delivery', 'Approved', 'pilot_seed'),
      (${req1.id}, ${supplier2.id}, 395, 79000, NOW() + INTERVAL '1 days', 'Premium brand', 'Rejected', 'pilot_seed'),
      (${req2.id}, ${supplier2.id}, 62000, 310000, NOW() + INTERVAL '4 days', 'Includes GST', 'Submitted', 'pilot_seed'),
      (${req3.id}, ${supplier1.id}, 12000, 36000, NOW() + INTERVAL '2 days', 'Standard quality', 'Submitted', 'pilot_seed'),
      (${req5.id}, ${supplier2.id}, 8500, 34000, NOW() + INTERVAL '3 days', 'Washed M-Sand', 'Submitted', 'pilot_seed')
    `;

    // 8. Site Updates
    await sql`
      INSERT INTO site_updates (project_id, posted_by, title, content, client_visible, source_type) VALUES
      (${proj1.id}, ${siteEng.id}, 'Foundation Curing Started', 'Curing process for foundation columns has begun. Will continue for 7 days.', true, 'pilot_seed'),
      (${proj1.id}, ${siteEng.id}, 'Steel delivered', '5MT steel arrived. Need to check mill certificate.', false, 'pilot_seed'),
      (${proj1.id}, ${partner1.id}, 'Plinth Beam Concreting', 'Plinth beam shuttering and concreting completed today.', true, 'pilot_seed'),
      (${proj2.id}, ${partner2.id}, 'Demolition Complete', 'Internal walls demolished safely. Debris clearing in progress.', true, 'pilot_seed'),
      (${proj2.id}, ${partner2.id}, 'Delay in tile selection', 'Client is yet to confirm tile choices, delaying procurement.', false, 'pilot_seed')
    `;

    // 9. Documents
    await sql`
      INSERT INTO documents (project_id, uploader_id, name, file_url, file_type, document_category, customer_visible, source_type) VALUES
      (${proj1.id}, ${partner1.id}, 'Approved Floor Plan.pdf', 'https://example.com/plan.pdf', 'application/pdf', 'drawing', true, 'pilot_seed'),
      (${proj1.id}, ${opsAdmin.id}, 'Internal BOQ Markup.xlsx', 'https://example.com/boq.xlsx', 'application/vnd.ms-excel', 'contract', false, 'pilot_seed'),
      (${proj2.id}, ${partner2.id}, 'Renovation Agreement.pdf', 'https://example.com/agreement.pdf', 'application/pdf', 'contract', true, 'pilot_seed')
    `;

    // 10. Issues
    await sql`
      INSERT INTO issues (project_id, raised_by, title, description, status, severity, customer_visible, source_type) VALUES
      (${proj1.id}, ${partner1.id}, 'Water supply disruption', 'Local metro water supply stopped, arranging water tankers.', 'Open', 'High', false, 'pilot_seed'),
      (${proj1.id}, ${customer1.id}, 'Window frame change', 'Can we change the kitchen window to 4x4 instead of 3x4?', 'Resolved', 'Medium', true, 'pilot_seed'),
      (${proj2.id}, ${partner2.id}, 'Structural crack found', 'Minor hairline crack found after demolition, consulting engineer.', 'Open', 'High', false, 'pilot_seed')
    `;

    return ok({ message: 'Phase H Pilot seed completed successfully' });

  } catch (e) {
    console.error('Seed Error:', e);
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
