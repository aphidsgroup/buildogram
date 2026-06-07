# Buildogram Disaster Recovery & Backup Playbook

## 1. Overview
This playbook outlines the procedures for exporting, backing up, and restoring the Buildogram operational database. Since Buildogram manages sensitive financial, partner, and project data, strict adherence to these procedures is mandatory.

## 2. Point-in-Time Recovery (PITR)
Buildogram uses **Neon (PostgreSQL)** for its primary database, which automatically supports Point-in-Time Recovery.
- **RPO (Recovery Point Objective):** 5 minutes.
- **Retention:** 7-30 days (depending on branch settings).

### How to Trigger PITR:
1. Log into the Neon Console.
2. Select the `buildogram-db` project.
3. Go to the **Branches** tab.
4. Click **Restore to Point in Time**.
5. Select the exact date and time (e.g., right before an accidental deletion).
6. Create a new branch from that state to verify data before merging it into `main`.

## 3. Manual Exports
For offline backups or local analysis, use the `/ops/exports` UI.
- All exports are logged in the `audit_logs` table (Action: `EXPORT`).
- **PII Redaction:** Any user exporting data who is not a `super_admin` or `ops_admin` will automatically have emails and phone numbers masked (e.g., `j***@gmail.com`, `******1234`).
- **Finance Restrictions:** Exporting `invoices` or `revenue` requires explicit `manage_invoices` or `manage_revenue` roles.

### Using the Export API:
```bash
# Export Leads (JSON)
GET /api/ops/exports/leads?format=json

# Export Projects (CSV)
GET /api/ops/exports/projects?format=csv
```

## 4. Disaster Recovery Import (Dry-Run)
Before performing a manual bulk restoration from an exported JSON file, you MUST validate the schema using the `dry-run-import.js` script.

### Running a Dry Run
1. Place the exported JSON file in your local directory (e.g., `export_leads.json`).
2. Run the validation script:
   ```bash
   node scripts/dry-run-import.js leads export_leads.json
   ```
3. The script will parse the JSON, validate required fields (like `name`, `phone`, `city`), and output a simulated result.
4. **Never run a production upsert without a successful dry run.**

## 5. Media & Asset Backups
- Buildogram stores files (proof assets, documents, property passports) in external buckets (e.g., Cloudinary/AWS S3).
- **Rule:** Do NOT delete media from buckets unless the corresponding database record is also purged. Ensure your bucket provider is configured for versioning to prevent accidental overwrites of critical site logs or payment proofs.

## 6. Incident Response Contacts
In the event of total data loss or corruption that cannot be fixed via Neon PITR:
- **Lead DevOps Engineer:** devops@buildogram.com
- **Database Administrator:** dba@buildogram.com
