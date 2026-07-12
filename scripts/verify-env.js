const fs = require('fs');
const path = require('path');

function verifyEnv() {
  console.log('Running environment verification...');
  
  const requiredKeys = [
    'DATABASE_URL',
    'JWT_SECRET',
    'NEXT_PUBLIC_SITE_URL',
    'OPS_ADMIN_EMAIL',
    'OPS_ADMIN_PHONE'
  ];

  const missing = [];

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

  requiredKeys.forEach((key) => {
    if (!process.env[key]?.trim()) missing.push(key);
  });

  const isProduction =
    process.env.NODE_ENV === 'production' ||
    process.env.VERCEL_ENV === 'production' ||
    process.env.APP_MODE === 'production';

  const errors = [];
  if (isProduction && process.env.APP_MODE === 'demo') {
    errors.push('APP_MODE=demo is forbidden in production.');
  }

  const jwtSecret = process.env.JWT_SECRET || '';
  if (jwtSecret && jwtSecret.length < 32) {
    errors.push('JWT_SECRET must contain at least 32 characters.');
  }
  if (jwtSecret.includes('buildogram_super_secret') || jwtSecret.includes('replace-me')) {
    errors.push('JWT_SECRET still contains a known development placeholder.');
  }

  const databaseUrl = process.env.DATABASE_URL || '';
  if (databaseUrl.includes('placeholder') || databaseUrl.includes('user:password@')) {
    errors.push('DATABASE_URL still contains a placeholder credential.');
  }

  if (missing.length) {
    errors.push(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (errors.length) {
    const message = `Environment verification failed:\n- ${errors.join('\n- ')}`;
    if (isProduction) {
      console.error(message);
      process.exit(1);
    }
    console.warn(`${message}\nDevelopment may continue only with explicit local configuration.`);
    return;
  }

  console.log('Environment verified successfully.');
}

verifyEnv();
