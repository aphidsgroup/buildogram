const fs = require('fs');
const path = require('path');

// Usage: node scripts/dry-run-import.js <resource_type> <file_path>
// Example: node scripts/dry-run-import.js leads data/export_leads.json

const VALIDATORS = {
  leads: (record) => {
    const errors = [];
    if (!record.id) errors.push('Missing ID');
    if (!record.name) errors.push('Missing Name');
    if (!record.phone) errors.push('Missing Phone');
    return errors;
  },
  projects: (record) => {
    const errors = [];
    if (!record.id) errors.push('Missing ID');
    if (!record.project_name) errors.push('Missing Project Name');
    if (!record.client_id && !record.lead_id) errors.push('Missing Client ID / Lead ID');
    return errors;
  },
  partners: (record) => {
    const errors = [];
    if (!record.id) errors.push('Missing ID');
    if (!record.company_name) errors.push('Missing Company Name');
    if (!record.slug) errors.push('Missing Slug');
    return errors;
  },
  invoices: (record) => {
    const errors = [];
    if (!record.id) errors.push('Missing ID');
    if (!record.invoice_number) errors.push('Missing Invoice Number');
    if (!record.customer_name) errors.push('Missing Customer Name');
    return errors;
  }
};

function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node scripts/dry-run-import.js <resource_type> <file_path>');
    console.error('Available resources:', Object.keys(VALIDATORS).join(', '));
    process.exit(1);
  }

  const resource = args[0].toLowerCase();
  const filePath = path.resolve(args[1]);

  if (!VALIDATORS[resource]) {
    console.error(`Unknown resource type: ${resource}`);
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  console.log(`[DRY RUN] Validating import for: ${resource}`);
  console.log(`[DRY RUN] Reading file: ${filePath}`);

  let data = [];
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(content);
  } catch (err) {
    console.error('Failed to parse JSON file:', err.message);
    process.exit(1);
  }

  if (!Array.isArray(data)) {
    console.error('Invalid format: JSON file must contain an array of records.');
    process.exit(1);
  }

  console.log(`[DRY RUN] Found ${data.length} records.`);
  
  let validCount = 0;
  let errorCount = 0;
  const validator = VALIDATORS[resource];

  data.forEach((record, index) => {
    const errors = validator(record);
    if (errors.length > 0) {
      errorCount++;
      if (errorCount <= 10) { // Limit error output
        console.warn(`  - Row ${index + 1} (${record.id || 'NO_ID'}): ${errors.join(', ')}`);
      }
    } else {
      validCount++;
    }
  });

  console.log('\n==================================');
  console.log('         DRY RUN RESULTS          ');
  console.log('==================================');
  console.log(`Total Records Scanned : ${data.length}`);
  console.log(`Valid Records         : ${validCount}`);
  console.log(`Records with Errors   : ${errorCount}`);
  console.log('==================================');

  if (errorCount > 0) {
    console.log('⚠️  Warning: Attempting to import this file may result in rejected records or database constraints failures.');
  } else {
    console.log('✅ Success: File schema appears valid for import.');
  }
}

main();
