const fs = require('fs');
const path = require('path');

const REQUIRED_KEYS = [
  'DATABASE_URL',
  'JWT_SECRET',
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_GA_ID',
];

function loadLocalEnvironment() {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) return;
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      process.env[key] ||= match[2].trim();
    }
  } catch {
    console.warn('[verify-env] Unable to read local environment metadata.');
  }
}

function verifyEnv() {
  console.log('Running release environment verification...');
  loadLocalEnvironment();
  const missing = REQUIRED_KEYS.filter(key => !process.env[key]);
  if (missing.length) {
    console.warn('Missing required environment variables:');
    for (const key of missing) console.warn(`- ${key}`);
    console.warn('Required core or enabled Preview functionality is not fully configured.');
    return;
  }
  console.log('Required core and analytics environment is configured.');
}

verifyEnv();
