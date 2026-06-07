/**
 * Core Attribution Tracker functions
 * Client-safe, does not use cookies to respect strict privacy without cookie banners.
 * Uses sessionStorage (for current session) and localStorage (for cross-session).
 */

const STORAGE_KEY = 'buildogram_attribution';
const SESSION_KEY = 'buildogram_session';

/**
 * Generate a basic session ID if none exists
 */
function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Get device type
 */
function getDeviceType() {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'mobile';
  return 'desktop';
}

/**
 * Categorize page based on path
 */
function getPageCategory(path) {
  if (!path || path === '/') return 'home';
  if (path.startsWith('/materials/')) return 'material';
  if (path.includes('structural-audit')) return 'structural_audit';
  if (path.includes('land-survey')) return 'survey';
  if (path.includes('pile-foundation') || path.includes('piling')) return 'piling';
  if (path.includes('ai-') || path.includes('calculator') || path.includes('estimator')) return 'ai_tool';
  if (path.startsWith('/proof/')) return 'proof';
  if (path.startsWith('/case-studies/')) return 'case_study';
  if (path.startsWith('/partners/') || path.includes('join-as-partner')) return 'partner';
  if (path.startsWith('/locations/')) return 'location';
  if (path.startsWith('/learn/')) return 'learn';
  return 'service';
}

/**
 * Capture attribution parameters from URL and Referrer
 */
export function captureAttribution() {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const currentPath = window.location.pathname;
  
  // Maintain session
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  // Current session/page data
  const newData = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_content: urlParams.get('utm_content'),
    utm_term: urlParams.get('utm_term'),
    gclid: urlParams.get('gclid'),
    referrer: document.referrer || null,
    first_landing_page: currentPath,
    session_id: sessionId,
    device_type: getDeviceType(),
    page_category: getPageCategory(currentPath),
    timestamp: new Date().toISOString()
  };

  // Load existing
  let existingData = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) existingData = JSON.parse(raw);
  } catch (e) {
    console.error('Error reading attribution storage', e);
  }

  // Update logic: 
  // - Always keep the very first landing page if we don't have UTMs forcing an override
  // - If new UTMs are present, update source/campaign data but optionally keep original first landing
  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  } else {
    // Only overwrite source if new UTMs are explicitly present in the URL
    if (newData.utm_source || newData.gclid) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...existingData,
        ...newData,
        first_landing_page: existingData.first_landing_page // keep original landing
      }));
    }
  }
}

/**
 * Get current attribution payload for forms
 */
export function getAttributionPayload() {
  if (typeof window === 'undefined') return {};
  
  let payload = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) payload = JSON.parse(raw);
  } catch (e) {
    console.error('Error parsing attribution payload', e);
  }

  // Always inject current page as the conversion page
  payload.conversion_page = window.location.pathname;
  
  // Always update page category to the conversion page's category
  payload.page_category = getPageCategory(window.location.pathname);
  
  // Re-verify session id exists
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  payload.session_id = sessionId;

  return payload;
}
