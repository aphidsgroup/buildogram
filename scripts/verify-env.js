// scripts/verify-env.js
const fs = require('fs');
const path = require('path');

function verifyEnv() {
  console.log('🔍 Running V2 Production Environment Verification...');
  
  const requiredKeys = [
    'DATABASE_URL',
    'JWT_SECRET',
    'CLOUDINARY_URL',
    'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
    'WHATSAPP_PHONE_NUMBER_ID',
    'WHATSAPP_TOKEN',
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET'
  ];

  let missing = [];

  // Try to load from .env.local if not present in process.env
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          process.env[match[1].trim()] = process.env[match[1].trim()] || match[2].trim();
        }
      });
    }
  } catch (e) {
    console.warn('⚠️ Could not parse .env.local', e.message);
  }

  requiredKeys.forEach(key => {
    if (!process.env[key]) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    console.error('\n❌ FATAL: Missing Required Environment Variables:');
    missing.forEach(m => console.error(`   - ${m}`));
    console.error('\nProduction boot aborted to prevent runtime crashes.\n');
    process.exit(1);
  }

  console.log('✅ Environment verified successfully. All V2 modules are ready.\n');
}

verifyEnv();
