const { execSync } = require('child_process');

const envVars = {
  DATABASE_URL: "postgresql://neondb_owner:npg_DfqJe86pAMyT@ep-empty-waterfall-ao1eruvv-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  JWT_SECRET: "buildogram_super_secret_jwt_key_2024_chennai_caas_platform",
  NEXT_PUBLIC_SITE_URL: "https://www.buildogram.in",
  OPS_ADMIN_EMAIL: "ops@buildogram.in",
  OPS_ADMIN_PHONE: "+919876543210"
};

for (const [key, value] of Object.entries(envVars)) {
  console.log(`Adding ${key}...`);
  try {
    // Remove if exists to avoid conflicts
    try {
      execSync(`npx vercel env rm ${key} production -y`, { stdio: 'ignore' });
    } catch (e) {
      // ignore error if not found
    }
    
    // Add new value
    execSync(`npx vercel env add ${key} production`, {
      input: value,
      stdio: ['pipe', 'inherit', 'inherit']
    });
    console.log(`✅ ${key} added successfully.`);
  } catch (err) {
    console.error(`❌ Failed to add ${key}: ${err.message}`);
  }
}
