export const SESSION_KEY_TOTAL = 'bg_tooltip_total';
export const SESSION_KEY_ROUTE = 'bg_tooltip_route_';
export const SESSION_KEY_WA = 'bg_wa_clicked';
export const SESSION_KEY_FORM = 'bg_form_submitted';
export const CONVERSION_COMPLETE_EVENT = 'buildogram:conversion-complete';
export const MAX_TOTAL = 3;
export const APPEAR_DELAY_MS = 5000;
export const AUTO_DISMISS_MS = 7000;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function isTooltipEligible(storage, pathname) {
  try {
    if (storage.getItem(SESSION_KEY_WA)) return false;
    if (storage.getItem(SESSION_KEY_FORM)) return false;
    const total = Number.parseInt(storage.getItem(SESSION_KEY_TOTAL) || '0', 10);
    if (total >= MAX_TOTAL) return false;
    return !storage.getItem(SESSION_KEY_ROUTE + encodeURIComponent(pathname));
  } catch {
    return false;
  }
}

export function recordTooltipImpression(storage, pathname) {
  try {
    const total = Number.parseInt(storage.getItem(SESSION_KEY_TOTAL) || '0', 10);
    storage.setItem(SESSION_KEY_TOTAL, String(total + 1));
    storage.setItem(SESSION_KEY_ROUTE + encodeURIComponent(pathname), '1');
    return true;
  } catch {
    return false;
  }
}

export function createTooltipLifecycle({
  storage,
  pathname,
  onShow,
  onDismiss,
  setTimer = setTimeout,
  clearTimer = clearTimeout,
}) {
  let active = true;
  let shown = false;
  let appearTimer = null;
  let dismissTimer = null;

  const clearTimers = () => {
    if (appearTimer !== null) clearTimer(appearTimer);
    if (dismissTimer !== null) clearTimer(dismissTimer);
    appearTimer = null;
    dismissTimer = null;
  };

  const dismiss = (reason = 'manual') => {
    if (!active || !shown) return;
    if (dismissTimer !== null) clearTimer(dismissTimer);
    dismissTimer = null;
    shown = false;
    onDismiss(reason);
  };

  const suppress = () => {
    if (!active) return;
    clearTimers();
    if (shown) {
      shown = false;
      onDismiss('conversion');
    }
  };

  const start = () => {
    if (!active || !isTooltipEligible(storage, pathname)) return false;

    appearTimer = setTimer(() => {
      appearTimer = null;
      if (!active || shown || !isTooltipEligible(storage, pathname)) return;
      if (!recordTooltipImpression(storage, pathname)) return;

      shown = true;
      onShow();
      dismissTimer = setTimer(() => dismiss('auto'), AUTO_DISMISS_MS);
    }, APPEAR_DELAY_MS);

    return true;
  };

  const cleanup = () => {
    active = false;
    shown = false;
    clearTimers();
  };

  return { start, dismiss, suppress, cleanup };
}

export function subscribeReducedMotion(onChange) {
  const mediaQuery = globalThis.matchMedia?.(REDUCED_MOTION_QUERY);
  if (!mediaQuery) return () => {};

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }

  mediaQuery.addListener?.(onChange);
  return () => mediaQuery.removeListener?.(onChange);
}

export function getReducedMotionSnapshot() {
  return Boolean(globalThis.matchMedia?.(REDUCED_MOTION_QUERY).matches);
}

export function getServerReducedMotionSnapshot() {
  return false;
}
