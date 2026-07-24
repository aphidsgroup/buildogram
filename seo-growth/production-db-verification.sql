-- ============================================================================
-- Buildogram — Production partner-data verification (OWNER-SAFE)
-- Created: 2026-07-25 (P0 deployment-readiness phase)
--
-- HOW TO RUN: Neon console → SQL editor, or:  psql "$DATABASE_URL" -f this_file
-- SECTION A and B are strictly READ-ONLY. Run them first.
-- SECTION C (cleanup) is COMMENTED OUT and must only be run after the owner
-- reviews Section B output and explicitly approves.
-- No personal data (emails/phones) is printed — only IDs, slugs and flags.
-- ============================================================================

-- ── SECTION A: counts only ──────────────────────────────────────────────────

-- A1. Partners with explicit demo slugs (from ops/seed-partners: demo-builder,
--     demo-architect, demo-interior-designer, demo-material-supplier,
--     demo-home-automation, demo-solar, demo-elevator, demo-waterproofing)
SELECT count(*) AS demo_slug_partners
FROM partners WHERE slug LIKE 'demo-%';

-- A2. Pilot-seed users (from ops/seed-pilot)
SELECT count(*) AS pilot_seed_users
FROM users WHERE email LIKE '%@pilot.buildogram.in';

-- A3. Rows in seed-marked tables
SELECT 'leads' AS tbl, count(*) FROM leads WHERE source_type = 'pilot_seed'
UNION ALL SELECT 'projects', count(*) FROM projects WHERE source_type = 'pilot_seed'
UNION ALL SELECT 'partners', count(*) FROM partners WHERE source_type = 'pilot_seed';

-- ── SECTION B: identification export (IDs + slugs + indicator flags only) ───

-- B1. Explicit demo/seed partners
SELECT id, slug, approval_status, active, verification_status, public_profile_enabled,
       created_at
FROM partners
WHERE slug LIKE 'demo-%' OR source_type = 'pilot_seed'
ORDER BY created_at;

-- B2. Heuristic scan for fictional/seed partners under NON-demo slugs.
--     Indicators drawn from the seed script contents:
--     * seed phone patterns (9876543210, 9123456789, 93210987xx sequences)
--     * ui-avatars.com placeholder logos / images.unsplash.com stock covers
--     * example credentials ("RERA Registered", "ISO 9001:2015", "CREDAI Member")
--       with no registration number
--     * placeholder domains in website field
SELECT id, slug, approval_status, active, public_profile_enabled, created_at,
       (phone IN ('9876543210','9123456789','9321098765','9432109876','9543210987','9654321098'))            AS flag_seed_phone,
       (logo_url  LIKE '%ui-avatars.com%')                                                                    AS flag_placeholder_logo,
       (cover_url LIKE '%images.unsplash.com%')                                                               AS flag_stock_cover,
       (website   LIKE '%example.%' OR website LIKE '%demo%' OR website LIKE '%buildcraftconstructions.in%')  AS flag_placeholder_site,
       (certifications::text LIKE '%RERA Registered%' AND certifications::text NOT LIKE '%TN/%')              AS flag_unnumbered_rera,
       (certifications::text LIKE '%ISO 9001%')                                                               AS flag_iso_claim
FROM partners
WHERE slug NOT LIKE 'demo-%'
  AND ( phone IN ('9876543210','9123456789','9321098765','9432109876','9543210987','9654321098')
     OR logo_url  LIKE '%ui-avatars.com%'
     OR cover_url LIKE '%images.unsplash.com%'
     OR website   LIKE '%example.%'
     OR (certifications::text LIKE '%RERA Registered%' AND certifications::text NOT LIKE '%TN/%') )
ORDER BY created_at;

-- B3. Duplicate phone numbers across partners (same number reused = seed smell)
SELECT phone_hash, count(*) AS partners_sharing_number
FROM (SELECT md5(phone) AS phone_hash FROM partners WHERE phone IS NOT NULL) t
GROUP BY phone_hash HAVING count(*) > 1;

-- B4. Which flagged partners are currently PUBLICLY EXPOSED
--     (would render in the directory before the P0 code guard deploys)
SELECT id, slug, approval_status, active
FROM partners
WHERE (slug LIKE 'demo-%' OR logo_url LIKE '%ui-avatars.com%')
  AND approval_status = 'Approved' AND active = true;

-- ============================================================================
-- ── SECTION C: CLEANUP — DO NOT RUN WITHOUT EXPLICIT OWNER APPROVAL ─────────
-- Review Section B output first. Two options; archival (C1) is reversible.
-- ============================================================================

-- C1. ARCHIVAL (recommended): deactivate + hide, keep rows for audit trail
-- UPDATE partners
-- SET active = false, public_profile_enabled = false, approval_status = 'Archived-Demo'
-- WHERE slug LIKE 'demo-%';        -- extend with reviewed IDs from B2: OR id IN (...)

-- C2. HARD DELETE (irreversible; child rows first). Only if owner prefers purge.
-- DELETE FROM partner_gallery   WHERE partner_id IN (SELECT id FROM partners WHERE slug LIKE 'demo-%');
-- DELETE FROM partner_videos    WHERE partner_id IN (SELECT id FROM partners WHERE slug LIKE 'demo-%');
-- DELETE FROM partner_portfolio WHERE partner_id IN (SELECT id FROM partners WHERE slug LIKE 'demo-%');
-- DELETE FROM partner_documents WHERE partner_id IN (SELECT id FROM partners WHERE slug LIKE 'demo-%');
-- DELETE FROM partner_enquiries WHERE partner_id IN (SELECT id FROM partners WHERE slug LIKE 'demo-%');
-- DELETE FROM partners          WHERE slug LIKE 'demo-%';

-- C3. Pilot seed cleanup (mirrors ops/seed-pilot's own delete order) — only if
--     pilot data exists in production per A2/A3:
-- DELETE FROM issues WHERE source_type='pilot_seed'; ... (see seed-pilot route for full order)
