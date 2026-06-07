const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL;
const TEST_MODE = process.env.TEST_MODE;
const CONFIRM_PRODUCTION_TEST = process.env.CONFIRM_PRODUCTION_TEST;

if (!BASE_URL || TEST_MODE !== 'true') {
  console.error("ERROR: Missing BASE_URL or TEST_MODE=true environment variables.");
  process.exit(1);
}

if (BASE_URL.includes('buildogram.in') && CONFIRM_PRODUCTION_TEST !== 'true') {
  console.error("ERROR: Targeting production without CONFIRM_PRODUCTION_TEST=true. Aborting.");
  process.exit(1);
}

const categories = [
  { name: 'construction', endpoint: '/api/leads', payload: { leadType: 'construction' } },
  { name: 'material_quote', endpoint: '/api/leads', payload: { leadType: 'material_quote' } },
  { name: 'structural_audit', endpoint: '/api/leads', payload: { leadType: 'audit' } },
  { name: 'survey', endpoint: '/api/leads', payload: { leadType: 'survey' } },
  { name: 'piling', endpoint: '/api/leads', payload: { leadType: 'piling' } },
  { name: 'ai_tool', endpoint: '/api/leads', payload: { leadType: 'ai' } },
  { name: 'partner_application', endpoint: '/api/partner/applications', payload: { category: 'Contractor', business_name: 'Smoke Test - Buildogram QA', contact_person: 'QA Tester', consent_given: true } },
];

const commonPayload = {
  name: "Smoke Test - Buildogram QA",
  email: "qa+smoke@buildogram.in",
  phone: "9999999999",
  notes: "SAFE_TO_DELETE production smoke test",
  message: "SAFE_TO_DELETE production smoke test",
  test_lead: true,
  source: "production_lead_smoke_test",
  attribution: {
    utm_source: "smoke_test",
    utm_medium: "qa",
    utm_campaign: "production_launch_verification",
    conversion_page: "/smoke-test"
  }
};

let report = `# Production Lead Smoke Test Report\n\n`;
report += `**Timestamp:** ${new Date().toISOString()}\n`;
report += `**Base URL:** ${BASE_URL}\n\n`;

report += `## Cleanup Checklist for Ops\n`;
report += `Please log in to the Ops Dashboard and ensure these records are verified and then deleted or archived:\n`;
categories.forEach(c => {
  report += `- [ ] Verify and delete: ${c.name} lead\n`;
});
report += `\n---\n\n`;

async function runTests() {
  console.log(`Starting smoke test against ${BASE_URL}`);
  
  for (const category of categories) {
    console.log(`\nTesting category: ${category.name}`);
    
    const url = `${BASE_URL.replace(/\/$/, '')}${category.endpoint}`;
    const payload = { ...commonPayload, ...category.payload };
    
    let status = 0;
    let responseBody = '';
    let pass = false;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      status = res.status;
      const json = await res.json().catch(() => null);
      responseBody = json ? JSON.stringify(json, null, 2) : 'No JSON response';
      
      if (status >= 200 && status < 300) {
        pass = true;
      }

    } catch (e) {
      status = 'ERROR';
      responseBody = e.message;
    }

    console.log(`Endpoint: ${url}`);
    console.log(`Status: ${status}`);
    console.log(`Response: ${responseBody}`);
    console.log(`Result: ${pass ? 'PASS' : 'FAIL'}`);

    report += `### ${category.name}\n`;
    report += `- **Endpoint:** ${url}\n`;
    report += `- **Result:** ${pass ? '✅ PASS' : '❌ FAIL'}\n`;
    report += `- **Status Code:** ${status}\n`;
    report += `- **Response Body:**\n\`\`\`json\n${responseBody}\n\`\`\`\n\n`;
  }

  const reportPath = path.join(__dirname, '../PRODUCTION_LEAD_SMOKE_TEST_REPORT.md');
  fs.writeFileSync(reportPath, report, 'utf8');
  console.log(`\nSmoke test complete. Report saved to ${reportPath}`);
}

runTests();
