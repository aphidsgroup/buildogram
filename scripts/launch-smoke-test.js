const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const PUBLIC_ROUTES = [
  '/',
  '/services',
  '/materials',
  '/structural-audit-chennai',
  '/land-survey-chennai',
  '/soil-investigation-chennai',
  '/pile-foundation-contractors-chennai',
  '/ai-tools',
  '/property-passport',
  '/quality-system',
  '/partners',
  '/case-studies',
  '/proof',
  '/locations/chennai',
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
  '/ai-sitemap.txt'
];

async function runSmokeTest() {
  console.log(`Starting Launch Smoke Test against ${BASE_URL}...`);
  
  const results = [];
  let passedCount = 0;
  let failedCount = 0;

  for (const route of PUBLIC_ROUTES) {
    const url = `${BASE_URL}${route}`;
    let passed = true;
    const errors = [];
    
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Buildogram-Smoke-Test/1.0' }
      });
      
      const status = res.status;
      
      if (status !== 200) {
        passed = false;
        errors.push(`Status code ${status} (Expected 200)`);
      }

      const text = await res.text();

      if (route.endsWith('.xml') || route.endsWith('.txt')) {
        // Basic verification for non-HTML
        if (!text || text.trim().length === 0) {
          passed = false;
          errors.push('File is empty');
        }
        if (route === '/robots.txt' && !text.includes('Disallow:')) {
          passed = false;
          errors.push('robots.txt missing Disallow directives');
        }
      } else {
        // HTML checks
        const $ = cheerio.load(text);
        
        // Canonical
        if ($('link[rel="canonical"]').length === 0) {
          passed = false;
          errors.push('Missing <link rel="canonical">');
        }
        
        // Meta description
        if ($('meta[name="description"]').length === 0) {
          passed = false;
          errors.push('Missing <meta name="description">');
        }
        
        // H1 present
        if ($('h1').length === 0) {
          passed = false;
          errors.push('Missing <h1> tag');
        }
        
        // JSON-LD (optional check, but good to flag if entirely absent on key pages)
        if (['/', '/services'].includes(route) && $('script[type="application/ld+json"]').length === 0) {
          passed = false;
          errors.push('Missing JSON-LD schema on primary page');
        }

        // No 500 error indicators
        if (text.includes('Internal Server Error')) {
          passed = false;
          errors.push('Contains "Internal Server Error" text');
        }
      }
      
    } catch (err) {
      passed = false;
      errors.push(`Fetch failed: ${err.message}`);
    }

    if (passed) passedCount++;
    else failedCount++;

    results.push({
      route,
      url,
      passed,
      errors
    });
    
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${route}`);
    if (!passed) {
      errors.forEach(e => console.log(`  -> ${e}`));
    }
  }

  generateReport(results, passedCount, failedCount);
}

function generateReport(results, passed, failed) {
  const timestamp = new Date().toISOString();
  let markdown = `# Launch Smoke Test Report\n\n`;
  markdown += `**Date:** ${timestamp}\n`;
  markdown += `**Base URL:** ${BASE_URL}\n`;
  markdown += `**Result:** ${failed === 0 ? '✅ PASSED' : '❌ FAILED'}\n`;
  markdown += `**Summary:** ${passed} passed, ${failed} failed.\n\n`;

  if (failed > 0) {
    markdown += `## Failed URLs\n\n`;
    results.filter(r => !r.passed).forEach(r => {
      markdown += `### ${r.route}\n`;
      markdown += `- **URL**: [${r.url}](${r.url})\n`;
      markdown += `- **Errors**:\n`;
      r.errors.forEach(e => {
        markdown += `  - ${e}\n`;
      });
      markdown += `\n`;
    });

    markdown += `## Recommended Fixes\n`;
    markdown += `- Check server logs for any 500 errors.\n`;
    markdown += `- Ensure all pages have \`generateMetadata\` exported correctly for SEO tags.\n`;
    markdown += `- Verify that \`robots.txt\` and \`sitemap.xml\` are generated properly at the root.\n\n`;
  }

  markdown += `## All Results\n\n`;
  markdown += `| Route | Status | Errors |\n`;
  markdown += `|---|---|---|\n`;
  results.forEach(r => {
    markdown += `| ${r.route} | ${r.passed ? '✅ PASS' : '❌ FAIL'} | ${r.errors.join(', ') || '-'} |\n`;
  });

  const reportPath = path.join(__dirname, '..', 'LAUNCH_SMOKE_TEST_REPORT.md');
  fs.writeFileSync(reportPath, markdown);
  console.log(`\nReport generated at: ${reportPath}`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

runSmokeTest().catch(console.error);
