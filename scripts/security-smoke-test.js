const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const OPS_ROUTES = [
  '/ops/analytics',
  '/ops/finance',
  '/ops/projects',
  '/ops/property-passports',
  '/ops/bqs',
  '/ops/exports',
  '/ops/audit-logs'
];

const TOKEN_PAGES = [
  '/project/fake-invalid-token-1234',
  '/property-passport/fake-invalid-token-5678'
];

async function runSecurityTest() {
  console.log(`Starting Security Smoke Test against ${BASE_URL}...`);
  
  const results = [];
  let passedCount = 0;
  let failedCount = 0;

  // Test Ops Routes
  for (const route of OPS_ROUTES) {
    const url = `${BASE_URL}${route}`;
    let passed = false;
    let detail = '';

    try {
      // Don't follow redirects automatically so we can see if it attempts a 307 to login
      const res = await fetch(url, { redirect: 'manual' });
      
      const status = res.status;
      
      if (status === 200) {
        passed = false;
        detail = `Failed: Returned 200 OK without auth!`;
      } else if (status === 401 || status === 403) {
        passed = true;
        detail = `Passed: Returned ${status} as expected`;
      } else if (status >= 300 && status < 400) {
        const location = res.headers.get('location');
        if (location && location.includes('/login')) {
          passed = true;
          detail = `Passed: Redirected to login (${status})`;
        } else {
          passed = false;
          detail = `Failed: Redirected to ${location} instead of login`;
        }
      } else {
        passed = false;
        detail = `Failed: Unexpected status ${status}`;
      }
      
    } catch (err) {
      passed = false;
      detail = `Fetch failed: ${err.message}`;
    }

    if (passed) passedCount++;
    else failedCount++;

    results.push({ route, passed, detail });
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${route} -> ${detail}`);
  }

  // Test Token Pages
  for (const route of TOKEN_PAGES) {
    const url = `${BASE_URL}${route}`;
    let passed = false;
    let detail = '';

    try {
      const res = await fetch(url);
      const status = res.status;
      
      // We expect a 404 or a 500/handled error that isn't a 200 exposing data
      if (status === 200) {
        passed = false;
        detail = `Failed: Returned 200 OK for an invalid token!`;
      } else {
        passed = true;
        detail = `Passed: Safely handled invalid token with status ${status}`;
      }
    } catch (err) {
      passed = false;
      detail = `Fetch failed: ${err.message}`;
    }

    if (passed) passedCount++;
    else failedCount++;

    results.push({ route, passed, detail });
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${route} -> ${detail}`);
  }

  generateReport(results, passedCount, failedCount);
}

function generateReport(results, passed, failed) {
  const timestamp = new Date().toISOString();
  let markdown = `# Security Smoke Test Report\n\n`;
  markdown += `**Date:** ${timestamp}\n`;
  markdown += `**Base URL:** ${BASE_URL}\n`;
  markdown += `**Result:** ${failed === 0 ? '✅ PASSED' : '❌ FAILED'}\n`;
  markdown += `**Summary:** ${passed} passed, ${failed} failed.\n\n`;

  if (failed > 0) {
    markdown += `## Failed Routes\n\n`;
    results.filter(r => !r.passed).forEach(r => {
      markdown += `- **${r.route}**: ${r.detail}\n`;
    });
    
    markdown += `\n## Recommended Fixes\n`;
    markdown += `- Verify that Next.js middleware is actively intercepting \`/ops/*\` routes.\n`;
    markdown += `- Ensure \`/lib/auth/permissions.js\` \`requirePermission\` is catching unauthenticated requests.\n`;
    markdown += `- Check that token lookups return \`notFound()\` when tokens are invalid.\n\n`;
  }

  markdown += `## All Results\n\n`;
  markdown += `| Route | Status | Details |\n`;
  markdown += `|---|---|---|\n`;
  results.forEach(r => {
    markdown += `| ${r.route} | ${r.passed ? '✅ PASS' : '❌ FAIL'} | ${r.detail} |\n`;
  });

  const reportPath = path.join(__dirname, '..', 'SECURITY_SMOKE_TEST_REPORT.md');
  fs.writeFileSync(reportPath, markdown);
  console.log(`\nReport generated at: ${reportPath}`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

runSecurityTest().catch(console.error);
