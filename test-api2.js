const https = require('https');
const payload = JSON.stringify({
  customerName: "Test User",
  phone: "9876543210",
  requirement: "Production Smoke Test",
  location: "Chennai",
  budgetRange: "Under ₹10 Lakhs",
  partnerSlug: "demo-builder"
});
const options = {
  hostname: 'www.buildogram.in',
  path: '/api/partner-enquiries',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payload.length
  }
};
const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', data));
});
req.on('error', err => console.log('Error:', err.message));
req.write(payload);
req.end();
