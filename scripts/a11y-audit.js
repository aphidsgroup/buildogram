const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

(async () => {
  console.log('Starting Accessibility (a11y) Audit...');
  const url = process.argv[2] || 'http://localhost:3000';
  console.log(`Target URL: ${url}`);

  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Disable CSS animations for faster testing
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

    console.log('Loading page...');
    await page.goto(url, { waitUntil: 'networkidle0' });

    console.log('Running axe-core scan...');
    const results = await new AxePuppeteer(page)
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const violations = results.violations;

    if (violations.length === 0) {
      console.log('✅ Accessibility Audit Passed! No violations found.');
    } else {
      console.log(`❌ Found ${violations.length} accessibility violations:`);
      violations.forEach((violation, index) => {
        console.log(`\n--- Violation ${index + 1}: ${violation.id} (${violation.impact}) ---`);
        console.log(`Description: ${violation.description}`);
        console.log(`Help: ${violation.help}`);
        console.log(`Help URL: ${violation.helpUrl}`);
        console.log(`Nodes affected: ${violation.nodes.length}`);
        
        // Print max 3 nodes to avoid spam
        violation.nodes.slice(0, 3).forEach(node => {
          console.log(`  - Target: ${node.target.join(', ')}`);
          console.log(`    HTML: ${node.html}`);
        });
        if (violation.nodes.length > 3) {
          console.log(`  - ...and ${violation.nodes.length - 3} more`);
        }
      });
      process.exitCode = 1;
    }
  } catch (error) {
    console.error('Error during accessibility audit:', error);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
