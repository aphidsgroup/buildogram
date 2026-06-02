/**
 * Buildogram Data Adapter
 * ─────────────────────────────────────────────────────────────────────────
 * Controls whether the app reads from localStorage/demo data or a real DB.
 *
 * Set NEXT_PUBLIC_DATA_MODE=demo        → localStorage + demo seed data
 * Set NEXT_PUBLIC_DATA_MODE=database_ready → real API calls (Phase F+)
 *
 * All services import getDataMode() before deciding what to do.
 */

export const DATA_MODES = {
  DEMO:           'demo',
  DATABASE_READY: 'database_ready',
};

/**
 * Returns the current data mode.
 * Defaults to 'demo' if env var is not set.
 * @returns {'demo'|'database_ready'}
 */
export function getDataMode() {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_DATA_MODE) {
    return process.env.NEXT_PUBLIC_DATA_MODE;
  }
  return DATA_MODES.DEMO;
}

export function isDemoMode() {
  return getDataMode() === DATA_MODES.DEMO;
}

export function isDatabaseReady() {
  return getDataMode() === DATA_MODES.DATABASE_READY;
}

/**
 * Safe localStorage read — returns null outside browser or on parse error.
 * @param {string} key
 * @returns {any|null}
 */
export function lsGet(key) {
  if (typeof window === 'undefined') return null;
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  } catch {
    return null;
  }
}

/**
 * Safe localStorage write.
 * @param {string} key
 * @param {any} value
 */
export function lsSet(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn('[adapter] localStorage write failed for key:', key);
  }
}

/**
 * Safe localStorage delete.
 * @param {string} key
 */
export function lsDel(key) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {}
}

/**
 * Generate a demo-safe unique ID.
 * Format: prefix + timestamp + random 4 chars
 * @param {string} prefix e.g. 'PRJ', 'LEAD', 'MAT'
 * @returns {string}
 */
export function genId(prefix = 'ID') {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}${Date.now()}${rand}`;
}

/**
 * Merge demo data with localStorage overrides.
 * localStorage always wins over demo seed.
 * @param {string} lsKey localStorage key
 * @param {Array} demoSeed fallback demo array
 * @returns {Array}
 */
export function mergeWithDemo(lsKey, demoSeed) {
  const stored = lsGet(lsKey);
  return stored !== null ? stored : demoSeed;
}

/**
 * API caller for database_ready mode.
 * Falls back gracefully if fetch fails.
 * @param {string} url
 * @param {object} options
 * @returns {Promise<any>}
 */
export async function apiFetch(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[adapter] apiFetch failed:', url, err.message);
    return null;
  }
}
