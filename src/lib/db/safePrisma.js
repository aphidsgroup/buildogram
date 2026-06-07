import prisma from '@/lib/prisma';

/**
 * Check if the Prisma DATABASE_URL environment variable is provided and not empty.
 * This prevents the application from attempting to connect to a missing DB during build/SSG.
 */
export const isDatabaseConfigured = () => {
  return !!process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== '';
};

/**
 * Safely execute a Prisma DB call.
 * If the database URL is missing (e.g. during local build or preview deployments without DB),
 * it returns the fallback value without crashing the application.
 * 
 * @param {Function} fn The asynchronous function containing the Prisma query
 * @param {any} fallback The value to return if the DB is unavailable or the query fails
 */
export const safeDbCall = async (fn, fallback = []) => {
  if (!isDatabaseConfigured()) {
    console.warn('⚠️ safeDbCall: DATABASE_URL is missing or empty. Skipping DB query and returning fallback.');
    return fallback;
  }
  
  try {
    return await fn();
  } catch (error) {
    console.warn('⚠️ safeDbCall: Error executing DB query. Returning fallback.', error.message || error);
    return fallback;
  }
};
