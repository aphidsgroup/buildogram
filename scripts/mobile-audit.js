// Mobile UX Audit Script for Buildogram
// Emulates iPhone 14 Pro (390x844) and captures screenshots of all key pages

const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

const iPhone = devices['iPhone 14 Pro'];
const BASE = 'https://www.buildogram.in';
const OUT_DIR = path.join(__dirname, 'mobile-audit-screenshots');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const PUBLIC_PAGES = [
  { name: '01-homepage',          url: '/' },
  { name: '02-login',             url: '/login' },
  { name: '03-how-it-works',      url: '/how-it-works' },
  { name: '04-services',          url: '/services' },
  { name: '05-cost-estimator',    url: '/cost-estimator' },
  { name: '06-boq-audit',         url: '/boq-audit' },
  { name: '07-plan-review',       url: '/plan-review' },
  { name: '08-partners',          url: '/partners' },
  { name: '09-contact',           url: '/contact' },
  { name: '10-faqs',              url: '/faqs' },
  { name: '11-blog',              url: '/blog' },
  { name: '12-properties',        url: '/properties' },
  { name: '13-build',             url: '/build' },
];

const DASHBOARD_PAGES = [
  { name: '14-ops-dashboard',     url: '/ops/dashboard' },
  { name: '15-ops-leads',         url: '/ops/leads' },
  { name: '16-ops-pipeline',      url: '/ops/pipeline' },
  { name: '17-ops-partners',      url: '/ops/partners' },
  { name: '18-ops-projects',      url: '/ops/projects' },
  { name: '19-ops-users',         url: '/ops/users' },
  { name: '20-ops-reports',       url: '/ops/reports' },
  { name: '21-ops-revenue',       url: '/ops/revenue' },
  { name: '22-partner-dashboard', url: '/partner/dashboard' },
  { name: '23-partner-leads',     url: '/partner/leads' },
  { name: '24-client-dashboard',  url: '/client/dashboard' },
  { name: '25-supplier-dashboard',url: '/supplier/dashboard' },
];

const issues = [];

async function checkMobile(page, name, url) {
  console.log(`  📱 ${name}...`);
  await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(1500);

  const screenshotPath = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  // ── UX Checks ──────────────────────────────────────────────────────────────
  const checks = await page.evaluate(() => {
    const w = window.innerWidth;
    const results = {};

    // 1. Horizontal overflow
    const docWidth = document.documentElement.scrollWidth;
    results.horizontalOverflow = docWidth > w;
    results.overflowPx = docWidth - w;

    // 2. Tap targets too small (< 44px)
    const clickables = [...document.querySelectorAll('a, button, input, select, textarea, [role="button"]')];
    const tooSmall = clickables.filter(el => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
    });
    results.smallTapTargets = tooSmall.length;

    // 3. Text too small (< 12px)
    const allText = [...document.querySelectorAll('p, span, a, li, td, th, label, h1, h2, h3, h4, h5, h6')];
    const tinyText = allText.filter(el => {
      const fs = parseFloat(window.getComputedStyle(el).fontSize);
      return fs > 0 && fs < 12;
    });
    results.tinyTextElements = tinyText.length;

    // 4. Fixed-width elements wider than viewport
    const allEls = [...document.querySelectorAll('*')];
    const fixedWide = allEls.filter(el => {
      const r = el.getBoundingClientRect();
      return r.width > w + 5;
    });
    results.elementsWiderThanViewport = fixedWide.length;

    // 5. Has mobile nav / hamburger
    const hamburger = document.querySelector('[class*="hamburger"], [class*="menu-btn"], [class*="menuBtn"], [class*="mobile-nav"], [aria-label*="menu"], [aria-label*="Menu"]');
    results.hasMobileNav = !!hamburger;

    // 6. Viewport meta tag
    const metaViewport = document.querySelector('meta[name="viewport"]');
    results.hasViewportMeta = !!metaViewport;
    results.viewportContent = metaViewport ? metaViewport.content : 'MISSING';

    // 7. Images without responsive sizing
    const imgs = [...document.querySelectorAll('img')];
    const nonResponsiveImgs = imgs.filter(img => {
      const style = window.getComputedStyle(img);
      return style.maxWidth === 'none' || parseInt(style.width) > w;
    });
    results.nonResponsiveImages = nonResponsiveImgs.length;

    // 8. Tables without overflow scroll
    const tables = [...document.querySelectorAll('table')];
    const bareTablesCount = tables.filter(t => {
      let parent = t.parentElement;
      while (parent && parent !== document.body) {
        const overflow = window.getComputedStyle(parent).overflowX;
        if (overflow === 'auto' || overflow === 'scroll') return false;
        parent = parent.parentElement;
      }
      return true;
    });
    results.tablesWithoutScroll = bareTablesCount.length;

    return results;
  });

  // Record issues
  const pageIssues = [];
  if (checks.horizontalOverflow) pageIssues.push(`⚠️ Horizontal overflow: +${checks.overflowPx}px`);
  if (checks.smallTapTargets > 0) pageIssues.push(`⚠️ ${checks.smallTapTargets} tap targets < 44px`);
  if (checks.tinyTextElements > 0) pageIssues.push(`⚠️ ${checks.tinyTextElements} text elements < 12px`);
  if (checks.elementsWiderThanViewport > 0) pageIssues.push(`⚠️ ${checks.elementsWiderThanViewport} elements wider than viewport`);
  if (!checks.hasViewportMeta) pageIssues.push(`🚨 Missing viewport meta tag`);
  if (checks.tablesWithoutScroll > 0) pageIssues.push(`⚠️ ${checks.tablesWithoutScroll} tables without horizontal scroll`);

  issues.push({
    name, url,
    status: pageIssues.length === 0 ? '✅' : pageIssues.length <= 2 ? '⚠️' : '🚨',
    hasMobileNav: checks.hasMobileNav,
    hasViewportMeta: checks.hasViewportMeta,
    horizontalOverflow: checks.horizontalOverflow,
    smallTapTargets: checks.smallTapTargets,
    tablesWithoutScroll: checks.tablesWithoutScroll,
    screenshot: screenshotPath,
    issues: pageIssues
  });

  if (pageIssues.length === 0) {
    console.log(`     ✅ No issues`);
  } else {
    pageIssues.forEach(i => console.log(`     ${i}`));
  }
}

(async () => {
  console.log('\n🔍 Buildogram Mobile UX Audit — iPhone 14 Pro (390×844)\n');
  const browser = await chromium.launch({ headless: true });

  // ── PUBLIC PAGES ────────────────────────────────────────────────────────────
  console.log('📂 PUBLIC PAGES\n');
  const pubCtx = await browser.newContext({ ...iPhone });
  const pubPage = await pubCtx.newPage();
  for (const p of PUBLIC_PAGES) {
    await checkMobile(pubPage, p.name, p.url);
  }
  await pubCtx.close();

  // ── DASHBOARD PAGES (authenticated) ────────────────────────────────────────
  console.log('\n📂 DASHBOARD PAGES\n');
  const authCtx = await browser.newContext({ ...iPhone });
  const authPage = await authCtx.newPage();

  // Login first
  console.log('  🔐 Logging in...');
  await authPage.goto(BASE + '/login', { waitUntil: 'networkidle' });
  await authPage.fill('input[type="email"], input[name="email"]', 'aphidsgroup@gmail.com');
  const auditPassword = process.env.AUDIT_PASSWORD;
  if (!auditPassword) throw new Error('AUDIT_PASSWORD is required for authenticated mobile audits.');
  await authPage.fill('input[type="password"], input[name="password"]', auditPassword);
  await authPage.click('button[type="submit"]');
  await authPage.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
  console.log(`  → Navigated to: ${authPage.url()}\n`);

  for (const p of DASHBOARD_PAGES) {
    await checkMobile(authPage, p.name, p.url);
  }
  await authCtx.close();
  await browser.close();

  // ── REPORT ─────────────────────────────────────────────────────────────────
  console.log('\n\n══════════════════════════════════════════════════════');
  console.log('           MOBILE UX AUDIT REPORT — SUMMARY           ');
  console.log('══════════════════════════════════════════════════════\n');

  const critical = issues.filter(i => i.status === '🚨');
  const warnings = issues.filter(i => i.status === '⚠️');
  const passing  = issues.filter(i => i.status === '✅');

  console.log(`Total pages tested: ${issues.length}`);
  console.log(`✅ Passing: ${passing.length}`);
  console.log(`⚠️ Warnings: ${warnings.length}`);
  console.log(`🚨 Critical: ${critical.length}\n`);

  issues.forEach(i => {
    console.log(`${i.status} ${i.name}`);
    i.issues.forEach(issue => console.log(`    ${issue}`));
  });

  // Write JSON report
  const reportPath = path.join(OUT_DIR, '_audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(issues, null, 2));
  console.log(`\n📄 Full report: ${reportPath}`);
  console.log(`📸 Screenshots: ${OUT_DIR}`);
})();
