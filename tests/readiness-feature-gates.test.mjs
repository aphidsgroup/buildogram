import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

async function source(relative) {
  return readFile(path.join(root, relative), 'utf8');
}

async function loadFeatureModule() {
  const contents = await source('src/lib/config/features.js');
  return import(`data:text/javascript;base64,${Buffer.from(contents).toString('base64')}`);
}

test('disabled integrations are documented without credentials', async () => {
  const { getFeatureConfig } = await loadFeatureModule();
  const features = getFeatureConfig({
    NEXT_PUBLIC_GA_ID: 'G-PREVIEW',
    ENABLE_PROVIDER_AI: 'false',
    ENABLE_ONLINE_PAYMENTS: 'false',
    ENABLE_WHATSAPP_AUTOMATION: 'false',
    ENABLE_CLOUDINARY_UPLOADS: 'false',
    ENABLE_EMAIL_DELIVERY: 'false',
  });
  assert.equal(features.analytics.status, 'ready');
  assert.equal(features.providerAi.status, 'optional_disabled');
  assert.equal(features.onlinePayments.status, 'optional_disabled');
  assert.equal(features.whatsappAutomation.status, 'optional_disabled');
  assert.equal(features.cloudinaryUploads.status, 'optional_disabled');
  assert.equal(features.emailDelivery.status, 'optional_degraded');
  assert.equal(features.whatsappClickToChat.status, 'ready');
});

test('enabled integration without credentials is misconfigured', async () => {
  const { getFeatureConfig } = await loadFeatureModule();
  const features = getFeatureConfig({
    ENABLE_PROVIDER_AI: 'true',
    ENABLE_ONLINE_PAYMENTS: 'true',
    ENABLE_WHATSAPP_AUTOMATION: 'true',
    ENABLE_CLOUDINARY_UPLOADS: 'true',
    ENABLE_EMAIL_DELIVERY: 'true',
  });
  assert.equal(features.analytics.status, 'misconfigured');
  assert.equal(features.providerAi.status, 'misconfigured');
  assert.equal(features.onlinePayments.status, 'misconfigured');
  assert.equal(features.whatsappAutomation.status, 'misconfigured');
  assert.equal(features.cloudinaryUploads.status, 'misconfigured');
  assert.equal(features.emailDelivery.status, 'misconfigured');
});

test('health contract separates core, enabled, and optional state without secret output', async () => {
  const health = await source('src/app/api/health/route.js');
  const database = await source('src/app/api/health/db/route.js');
  for (const contents of [health, database]) {
    assert.match(contents, /core/);
    assert.match(contents, /enabledFeatures/);
    assert.doesNotMatch(contents, /db_error|err\.message|connectionString|missing_keys/);
  }
  assert.match(database, /CORE_READINESS/);
  assert.match(database, /ALL_ENABLED_FEATURES/);
  assert.match(database, /OPTIONAL_DISABLED_FEATURES/);
});

test('environment example contains placeholders and safe disabled defaults', async () => {
  const env = await source('.env.example');
  assert.match(env, /^DATABASE_URL=$/m);
  assert.match(env, /^JWT_SECRET=$/m);
  assert.match(env, /^NEXT_PUBLIC_GA_ID=$/m);
  assert.match(env, /^ENABLE_PROVIDER_AI=false$/m);
  assert.match(env, /^ENABLE_ONLINE_PAYMENTS=false$/m);
  assert.doesNotMatch(env, /buildogram_super_secret|dautrievu|buildogram_uploads/);
});
