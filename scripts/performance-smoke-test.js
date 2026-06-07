const { chromium } = require('playwright');

(async () => {
  console.log('Starting Performance Smoke Test...');
  const url = process.argv[2] || 'http://localhost:3000';
  console.log(`Target URL: ${url}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capture Console Errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`[Browser Error] ${msg.text()}`);
    }
  });

  // Calculate Cumulative Layout Shift (CLS)
  await page.addInitScript(() => {
    window.cumulativeLayoutShiftScore = 0;
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            window.cumulativeLayoutShiftScore += entry.value;
          }
        }
      });
      observer.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.error('Layout Shift Observer not supported.');
    }
  });

  await page.goto(url, { waitUntil: 'networkidle' });

  // Get Performance Metrics
  const metrics = await page.evaluate(() => {
    const lcpEntry = performance.getEntriesByType('paint').find(entry => entry.name === 'largest-contentful-paint');
    const fcpEntry = performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint');
    
    return {
      fcp: fcpEntry ? fcpEntry.startTime : null,
      lcp: lcpEntry ? lcpEntry.startTime : null,
      cls: window.cumulativeLayoutShiftScore || 0
    };
  });

  // Advanced LCP Capture
  const lcpScore = await page.evaluate(() => {
    return new Promise((resolve) => {
      let lcp = 0;
      try {
        const po = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          lcp = lastEntry.renderTime || lastEntry.loadTime;
        });
        po.observe({ type: 'largest-contentful-paint', buffered: true });
        
        setTimeout(() => {
          po.disconnect();
          resolve(lcp);
        }, 1000);
      } catch (e) {
        resolve(null);
      }
    });
  });

  if (lcpScore) metrics.lcp = lcpScore;

  console.log('--- Performance Results ---');
  console.log(`FCP: ${metrics.fcp ? metrics.fcp.toFixed(2) + 'ms' : 'N/A'}`);
  console.log(`LCP: ${metrics.lcp ? metrics.lcp.toFixed(2) + 'ms' : 'N/A'}`);
  console.log(`CLS: ${metrics.cls.toFixed(4)}`);

  let pass = true;

  if (metrics.lcp && metrics.lcp > 2500) {
    console.error('❌ LCP is greater than 2.5s limit.');
    pass = false;
  } else {
    console.log('✅ LCP is within acceptable limits (< 2.5s).');
  }

  if (metrics.cls > 0.1) {
    console.error('❌ CLS is greater than 0.1 limit.');
    pass = false;
  } else {
    console.log('✅ CLS is within acceptable limits (< 0.1).');
  }

  await browser.close();

  if (!pass) {
    console.error('Performance Smoke Test Failed!');
    process.exit(1);
  } else {
    console.log('Performance Smoke Test Passed!');
    process.exit(0);
  }
})();
