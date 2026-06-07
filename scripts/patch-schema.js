const fs = require('fs');

const path = './prisma/schema.prisma';
let content = fs.readFileSync(path, 'utf8');

const fields = `
  first_landing_page   String?
  conversion_page      String?
  referrer             String?
  utm_source           String?
  utm_medium           String?
  utm_campaign         String?
  utm_content          String?
  utm_term             String?
  gclid                String?
  session_id           String?
  device_type          String?
  page_category        String?
  attribution_json     Json?`;

const modelsToUpdate = [
  'leads',
  'material_leads',
  'structural_audit_leads',
  'survey_leads',
  'piling_leads',
  'ai_tool_submissions',
  'partner_enquiries'
];

for (const modelName of modelsToUpdate) {
  const regex = new RegExp(`(model ${modelName} \\{[\\s\\S]*?)(\\n\\s*@@|\\n\\})`, 'g');
  content = content.replace(regex, (match, p1, p2) => {
    // Only add if not already added
    if (p1.includes('first_landing_page')) {
      return match;
    }
    return `${p1}${fields}${p2}`;
  });
}

fs.writeFileSync(path, content, 'utf8');
console.log('Schema patched successfully.');
