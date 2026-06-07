const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const TEST_LEADS = [
  {
    name: 'Smoke Test Construction',
    type: 'construction',
    payload: {
      leadType: 'construction',
      name: 'Smoke Test Construction',
      phone: '9999999999',
      email: 'smoke.construction@buildogram.com',
      test_lead: true,
      formData: { propertyType: 'Residential', details: 'Automated smoke test' }
    }
  },
  {
    name: 'Smoke Test Material',
    type: 'material_quote',
    payload: {
      leadType: 'material_quote',
      name: 'Smoke Test Material',
      phone: '9999999999',
      email: 'smoke.material@buildogram.com',
      test_lead: true,
      formData: { materials: ['Cement', 'Steel'], quantity: 'Bulk' }
    }
  },
  {
    name: 'Smoke Test Audit',
    type: 'structural_audit',
    payload: {
      leadType: 'structural_audit',
      name: 'Smoke Test Audit',
      phone: '9999999999',
      email: 'smoke.audit@buildogram.com',
      test_lead: true,
      formData: { propertyAge: '15 years', issues: 'Cracks' }
    }
  },
  {
    name: 'Smoke Test Survey',
    type: 'land_survey',
    payload: {
      leadType: 'land_survey',
      name: 'Smoke Test Survey',
      phone: '9999999999',
      email: 'smoke.survey@buildogram.com',
      test_lead: true,
      formData: { surveyType: 'Topographic', location: 'Chennai' }
    }
  },
  {
    name: 'Smoke Test Piling',
    type: 'piling',
    payload: {
      leadType: 'piling',
      name: 'Smoke Test Piling',
      phone: '9999999999',
      email: 'smoke.piling@buildogram.com',
      test_lead: true,
      formData: { pilingType: 'DMC', soilType: 'Clay' }
    }
  },
  {
    name: 'Smoke Test AI Tool',
    type: 'ai_tool',
    payload: {
      leadType: 'ai_tool',
      name: 'Smoke Test AI',
      phone: '9999999999',
      email: 'smoke.ai@buildogram.com',
      test_lead: true,
      formData: { tool: 'Floor Plan Creator', query: '3BHK Plan' }
    }
  }
];

async function runLeadTest() {
  console.log(`Starting Lead Routing Smoke Test against ${BASE_URL}...`);
  
  const results = [];
  let passedCount = 0;
  let failedCount = 0;

  for (const testCase of TEST_LEADS) {
    console.log(`Submitting lead type: ${testCase.type}...`);
    let passed = true;
    let errorMsg = null;
    let responseBody = null;

    try {
      const res = await fetch(`${BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCase.payload)
      });
      
      const status = res.status;
      responseBody = await res.json().catch(() => null);

      if (status !== 200 && status !== 201) {
        passed = false;
        errorMsg = `Status ${status}: ${responseBody?.error || 'Unknown error'}`;
      } else if (responseBody && responseBody.success === false) {
        passed = false;
        errorMsg = `API Success False: ${responseBody.error}`;
      }

    } catch (err) {
      passed = false;
      errorMsg = `Fetch failed: ${err.message}`;
    }

    if (passed) passedCount++;
    else failedCount++;

    results.push({
      type: testCase.type,
      passed,
      errorMsg,
      response: responseBody
    });
    
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${testCase.type} - ${errorMsg || 'Success'}`);
  }

  generateReport(results, passedCount, failedCount);
}

function generateReport(results, passed, failed) {
  const timestamp = new Date().toISOString();
  let markdown = `# Lead Routing Smoke Test Report\n\n`;
  markdown += `**Date:** ${timestamp}\n`;
  markdown += `**Base URL:** ${BASE_URL}\n`;
  markdown += `**Result:** ${failed === 0 ? '✅ PASSED' : '❌ FAILED'}\n`;
  markdown += `**Summary:** ${passed} passed, ${failed} failed.\n\n`;

  markdown += `## Cleanup Instructions\n`;
  markdown += `> Test leads have been tagged with \`test_lead: true\` or named "Smoke Test".\n`;
  markdown += `> To manually clean them up, run a database query:\n`;
  markdown += `> \`\`\`sql\n`;
  markdown += `> DELETE FROM leads WHERE email LIKE 'smoke.%@buildogram.com';\n`;
  markdown += `> \`\`\`\n\n`;

  markdown += `## All Results\n\n`;
  markdown += `| Lead Type | Status | Details |\n`;
  markdown += `|---|---|---|\n`;
  results.forEach(r => {
    markdown += `| ${r.type} | ${r.passed ? '✅ PASS' : '❌ FAIL'} | ${r.errorMsg || 'Routed properly'} |\n`;
  });

  const reportPath = path.join(__dirname, '..', 'LEAD_ROUTING_SMOKE_TEST_REPORT.md');
  fs.writeFileSync(reportPath, markdown);
  console.log(`\nReport generated at: ${reportPath}`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

runLeadTest().catch(console.error);
