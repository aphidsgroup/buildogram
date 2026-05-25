const fs = require('fs');
const path = require('path');

// Extract JWT_SECRET to generate an ops_admin token
const envPath = path.join(__dirname, '.env.local');
let JWT_SECRET = 'buildogram_super_secret_jwt_key_2024_chennai_caas_platform';

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  const match = content.match(/^JWT_SECRET=(.*)$/m);
  if (match) JWT_SECRET = match[1].trim();
}

async function runTests() {
  const { signToken } = await import('./src/lib/auth.js');
  const baseUrl = 'https://buildogram-app-alpha.vercel.app'; // We will use the deployment URL later. Let's use www.buildogram.in as instructed.
  const targetUrl = 'https://www.buildogram.in';
  
  console.log(`Starting Production Verification for ${targetUrl}...`);

  // 1. Generate Ops Admin Token
  const token = await signToken({
    id: 'system_ops',
    email: 'ops@buildogram.in',
    role: 'ops_admin',
    name: 'System Admin'
  });

  const headers = {
    'Cookie': `buildogram_token=${token}`,
    'Content-Type': 'application/json'
  };

  const results = {};

  // Step 3: DB Health Check
  try {
    console.log('Testing DB Health...');
    const res = await fetch(`${targetUrl}/api/health/db`);
    const data = await res.json();
    results.dbHealth = data.success ? '✅ Pass' : '❌ Fail';
  } catch(e) {
    results.dbHealth = `❌ Error: ${e.message}`;
  }

  // Step 4: Run Migration
  try {
    console.log('Running Migrations...');
    const files = ['001', '002', '004', '005', '006', '007', '008', '009', '010', '011', '012', '013', '014', '015', '016', '017'];
    
    for (const f of files) {
      console.log(`Migrating ${f}...`);
      let res = await fetch(`${targetUrl}/api/ops/run-migration?file=${f}`, { method: 'GET', headers });
      let text = await res.text();
      let data = JSON.parse(text);
      console.log(`Migration ${f} result:`, JSON.stringify(data).substring(0, 200));
      if (!data.success) throw new Error(data.message);
    }
    results.migration = '✅ Pass';
  } catch(e) {
    results.migration = `❌ Error: ${e.message}`;
  }

  // Step 5: Run Seed
  try {
    console.log('Running Seed...');
    const res = await fetch(`${targetUrl}/api/ops/seed-partners`, { method: 'GET', headers });
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      results.seed = data.success ? '✅ Pass' : `❌ Fail (${data.message})`;
    } catch(e) {
      results.seed = `❌ Error (Status ${res.status}): ${text.substring(0, 100)}`;
    }
  } catch(e) {
    results.seed = `❌ Error: ${e.message}`;
  }

  // Step 6 & 7: Verify APIs
  try {
    console.log('Verifying Public APIs...');
    const pRes = await fetch(`${targetUrl}/api/partners`);
    const pData = await pRes.json();
    results.publicPartnersApi = (pData.success && pData.partners?.length > 0) ? '✅ Pass' : '❌ Fail';

    const p2Res = await fetch(`${targetUrl}/api/partners/demo-builder`);
    const p2Data = await p2Res.json();
    results.singlePartnerApi = (p2Data.success && p2Data.partner) ? '✅ Pass' : '❌ Fail';
  } catch(e) {
    results.publicPartnersApi = `❌ Error: ${e.message}`;
    results.singlePartnerApi = `❌ Error: ${e.message}`;
  }

  // Step 8: Test Enquiry Flow
  try {
    console.log('Testing Enquiry Flow...');
    const payload = {
      customerName: "Test User",
      phone: "9876543210",
      requirement: "Production Smoke Test",
      location: "Chennai",
      budgetRange: "Under ₹10 Lakhs",
      partnerSlug: "demo-builder"
    };
    const res = await fetch(`${targetUrl}/api/partner-enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    results.enquiryFlow = data.success ? '✅ Pass' : `❌ Fail (${data.message})`;
  } catch(e) {
    results.enquiryFlow = `❌ Error: ${e.message}`;
  }

  // Public URLs Test
  const urls = [
    '/',
    '/partners/directory',
    '/partners/demo-builder',
    '/partners/demo-solar',
    '/resources',
    '/resources/cost-estimator',
    '/contact',
    '/sitemap.xml',
    '/robots.txt',
    '/google3ce0987cdc8e1307.html'
  ];

  results.publicUrls = {};
  for(const u of urls) {
    try {
      const res = await fetch(`${targetUrl}${u}`);
      results.publicUrls[u] = res.ok ? '✅ 200 OK' : `❌ ${res.status}`;
    } catch(e) {
      results.publicUrls[u] = `❌ Error: ${e.message}`;
    }
  }

  console.log('\n--- Final Verification Report ---');
  console.log(JSON.stringify(results, null, 2));
}

runTests();
