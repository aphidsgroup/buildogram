import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function run() {
  let output = '# Partner Data Verification Results\n\n';

  try {
    console.log('Running A1...');
    const a1 = await prisma.$queryRawUnsafe(`SELECT count(*) AS demo_slug_partners FROM partners WHERE slug LIKE 'demo-%';`);
    output += `## A1. Demo Slug Partners\n\`\`\`json\n${JSON.stringify(a1, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}\n\`\`\`\n\n`;

    console.log('Running A2...');
    try {
      const a2 = await prisma.$queryRawUnsafe(`SELECT count(*) AS pilot_seed_users FROM users WHERE email LIKE '%@pilot.buildogram.in';`);
      output += `## A2. Pilot Seed Users\n\`\`\`json\n${JSON.stringify(a2, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}\n\`\`\`\n\n`;
    } catch (e) {
      output += `## A2. Pilot Seed Users\nError: ${e.message}\n\n`;
    }

    console.log('Running A3...');
    try {
      const a3 = await prisma.$queryRawUnsafe(`
        SELECT 'leads' AS tbl, count(*) FROM leads WHERE source_type = 'pilot_seed'
        UNION ALL SELECT 'projects', count(*) FROM projects WHERE source_type = 'pilot_seed'
        UNION ALL SELECT 'partners', count(*) FROM partners WHERE source_type = 'pilot_seed';
      `);
      output += `## A3. Seed Marked Tables\n\`\`\`json\n${JSON.stringify(a3, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}\n\`\`\`\n\n`;
    } catch (e) {
      output += `## A3. Seed Marked Tables\nError (Likely column doesn't exist): ${e.message}\n\n`;
    }

    console.log('Running B1...');
    try {
      // Replaced approval_status with verification_status which exists in schema
      const b1 = await prisma.$queryRawUnsafe(`
        SELECT id, slug, verification_status, active, public_profile_enabled, created_at
        FROM partners
        WHERE slug LIKE 'demo-%' OR source_type = 'pilot_seed'
        ORDER BY created_at;
      `);
      output += `## B1. Explicit Demo/Seed Partners\n\`\`\`json\n${JSON.stringify(b1, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}\n\`\`\`\n\n`;
    } catch (e) {
      // Try without source_type if it failed
      try {
        const b1_fallback = await prisma.$queryRawUnsafe(`
          SELECT id, slug, verification_status, active, public_profile_enabled, created_at
          FROM partners
          WHERE slug LIKE 'demo-%'
          ORDER BY created_at;
        `);
        output += `## B1. Explicit Demo/Seed Partners (Fallback: no source_type column)\n\`\`\`json\n${JSON.stringify(b1_fallback, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}\n\`\`\`\n\n`;
      } catch (fallback_e) {
        output += `## B1. Explicit Demo/Seed Partners\nError: ${fallback_e.message}\n\n`;
      }
    }

    console.log('Running B2...');
    try {
      const b2 = await prisma.$queryRawUnsafe(`
        SELECT id, slug, verification_status, active, public_profile_enabled, created_at,
               (phone IN ('9876543210','9123456789','9321098765','9432109876','9543210987','9654321098')) AS flag_seed_phone,
               (logo_url LIKE '%ui-avatars.com%') AS flag_placeholder_logo,
               (cover_url LIKE '%images.unsplash.com%') AS flag_stock_cover,
               (website LIKE '%example.%' OR website LIKE '%demo%' OR website LIKE '%buildcraftconstructions.in%') AS flag_placeholder_site,
               (certifications::text LIKE '%RERA Registered%' AND certifications::text NOT LIKE '%TN/%') AS flag_unnumbered_rera,
               (certifications::text LIKE '%ISO 9001%') AS flag_iso_claim
        FROM partners
        WHERE slug NOT LIKE 'demo-%'
          AND ( phone IN ('9876543210','9123456789','9321098765','9432109876','9543210987','9654321098')
             OR logo_url LIKE '%ui-avatars.com%'
             OR cover_url LIKE '%images.unsplash.com%'
             OR website LIKE '%example.%'
             OR (certifications::text LIKE '%RERA Registered%' AND certifications::text NOT LIKE '%TN/%') )
        ORDER BY created_at;
      `);
      output += `## B2. Heuristic Scan for Fictional/Seed Partners\n\`\`\`json\n${JSON.stringify(b2, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}\n\`\`\`\n\n`;
    } catch (e) {
      output += `## B2. Heuristic Scan\nError: ${e.message}\n\n`;
    }

    console.log('Running B3...');
    try {
      const b3 = await prisma.$queryRawUnsafe(`
        SELECT phone_hash, count(*) AS partners_sharing_number
        FROM (SELECT md5(phone) AS phone_hash FROM partners WHERE phone IS NOT NULL) t
        GROUP BY phone_hash HAVING count(*) > 1;
      `);
      output += `## B3. Duplicate Phones across Partners\n\`\`\`json\n${JSON.stringify(b3, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}\n\`\`\`\n\n`;
    } catch(e) {
      output += `## B3. Duplicate Phones across Partners\nError: ${e.message}\n\n`;
    }

    console.log('Running B4...');
    try {
      const b4 = await prisma.$queryRawUnsafe(`
        SELECT id, slug, verification_status, active
        FROM partners
        WHERE (slug LIKE 'demo-%' OR logo_url LIKE '%ui-avatars.com%')
          AND verification_status = 'Approved' AND active = true;
      `);
      output += `## B4. Publicly Exposed Flagged Partners\n\`\`\`json\n${JSON.stringify(b4, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}\n\`\`\`\n\n`;
    } catch(e) {
      output += `## B4. Publicly Exposed Flagged Partners\nError: ${e.message}\n\n`;
    }

    fs.writeFileSync('partner-verification-report.md', output);
    console.log('Report generated at partner-verification-report.md');
    
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
