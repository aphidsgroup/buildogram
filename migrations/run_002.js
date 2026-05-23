const { neon } = require('@neondatabase/serverless');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
let dbUrl = '';
env.split('\n').forEach(line => {
  const match = line.match(/^DATABASE_URL\s*=\s*(.+)$/);
  if (match) dbUrl = match[1].trim().replace(/^['"]|['"]$/g, '');
});
if (!dbUrl) { console.error('DATABASE_URL not found'); process.exit(1); }

const sql = neon(dbUrl);

async function run() {
  try {
    console.log('Creating properties table...');

    await sql`
      CREATE TABLE IF NOT EXISTS properties (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        property_type TEXT NOT NULL DEFAULT 'home' CHECK (property_type IN ('home','villa','apartment','commercial','plot','other')),
        owner_name TEXT NOT NULL,
        owner_phone TEXT NOT NULL,
        owner_email TEXT,
        address TEXT,
        locality TEXT,
        city TEXT DEFAULT 'Chennai',
        pincode TEXT,
        plot_area_sqft NUMERIC,
        built_up_area_sqft NUMERIC,
        floors TEXT,
        bedrooms INTEGER,
        bathrooms INTEGER,
        facing TEXT,
        project_id UUID,
        spec_level TEXT,
        construction_year INTEGER,
        handover_date DATE,
        passport_status TEXT DEFAULT 'pending' CHECK (passport_status IN ('pending','collecting','verifying','active','archived')),
        passport_completeness INTEGER DEFAULT 0,
        has_legal_docs BOOLEAN DEFAULT FALSE,
        has_drawings BOOLEAN DEFAULT FALSE,
        has_boq BOOLEAN DEFAULT FALSE,
        has_materials BOOLEAN DEFAULT FALSE,
        has_quality_checks BOOLEAN DEFAULT FALSE,
        has_progress_media BOOLEAN DEFAULT FALSE,
        has_warranty BOOLEAN DEFAULT FALSE,
        has_maintenance_history BOOLEAN DEFAULT FALSE,
        listing_type TEXT DEFAULT 'none' CHECK (listing_type IN ('none','rental','resale')),
        listing_status TEXT DEFAULT 'unlisted' CHECK (listing_status IN ('unlisted','listed','under_negotiation','rented','sold')),
        listing_price NUMERIC,
        listing_rent_monthly NUMERIC,
        cover_image_url TEXT,
        images JSONB DEFAULT '[]',
        assigned_to UUID,
        notes TEXT,
        tags TEXT[] DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    console.log('✅ 1/3  properties table created');

    await sql`CREATE INDEX IF NOT EXISTS idx_properties_owner_phone ON properties(owner_phone)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_properties_passport_status ON properties(passport_status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city)`;
    console.log('✅ 2/3  indexes created');

    // Seed one example record so the ops page isn't empty
    await sql`
      INSERT INTO properties (title, property_type, owner_name, owner_phone, city, locality, passport_status, passport_completeness, has_legal_docs, has_drawings)
      VALUES ('Sample Property — 1200 sqft G+1 Home', 'home', 'Demo Owner', '9000000000', 'Chennai', 'Porur', 'collecting', 25, TRUE, TRUE)
      ON CONFLICT DO NOTHING
    `;
    console.log('✅ 3/3  seed record inserted');

    console.log('\n🎉 Migration 002 complete — properties table ready!');
  } catch (e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
  }
}

run();
