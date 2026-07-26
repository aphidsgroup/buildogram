import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  APPEAR_DELAY_MS,
  AUTO_DISMISS_MS,
  MAX_TOTAL,
  SESSION_KEY_FORM,
  SESSION_KEY_ROUTE,
  SESSION_KEY_TOTAL,
  SESSION_KEY_WA,
  createTooltipLifecycle,
  getReducedMotionSnapshot,
  getServerReducedMotionSnapshot,
  subscribeReducedMotion,
} from '../src/lib/conversion/tooltip-lifecycle.mjs';

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
  };
}

function createClock() {
  let now = 0;
  let nextId = 1;
  const tasks = new Map();

  function setTimer(callback, delay) {
    const id = nextId++;
    tasks.set(id, { callback, due: now + delay });
    return id;
  }

  function clearTimer(id) {
    tasks.delete(id);
  }

  function tick(duration) {
    const target = now + duration;
    while (true) {
      const due = [...tasks.entries()]
        .filter(([, task]) => task.due <= target)
        .sort((a, b) => a[1].due - b[1].due)[0];
      if (!due) break;
      const [id, task] = due;
      tasks.delete(id);
      now = task.due;
      task.callback();
    }
    now = target;
  }

  return { setTimer, clearTimer, tick, pending: () => tasks.size };
}

function createHarness({ storage = createStorage(), pathname = '/services/boq-review' } = {}) {
  const clock = createClock();
  const events = [];
  const lifecycle = createTooltipLifecycle({
    storage,
    pathname,
    setTimer: clock.setTimer,
    clearTimer: clock.clearTimer,
    onShow: () => events.push('show'),
    onDismiss: reason => events.push(`dismiss:${reason}`),
  });
  return { clock, events, lifecycle, storage };
}

test('uses the real five-second delay and seven-second auto-dismiss lifecycle', () => {
  const { clock, events, lifecycle, storage } = createHarness();
  assert.equal(lifecycle.start(), true);
  clock.tick(APPEAR_DELAY_MS - 1);
  assert.deepEqual(events, []);
  clock.tick(1);
  assert.deepEqual(events, ['show']);
  assert.equal(storage.getItem(SESSION_KEY_TOTAL), '1');
  clock.tick(AUTO_DISMISS_MS - 1);
  assert.deepEqual(events, ['show']);
  clock.tick(1);
  assert.deepEqual(events, ['show', 'dismiss:auto']);
});

test('manual dismissal cancels auto-dismiss', () => {
  const { clock, events, lifecycle } = createHarness();
  lifecycle.start();
  clock.tick(APPEAR_DELAY_MS);
  lifecycle.dismiss('manual');
  clock.tick(AUTO_DISMISS_MS);
  assert.deepEqual(events, ['show', 'dismiss:manual']);
  assert.equal(clock.pending(), 0);
});

test('enforces one impression per route and the three-impression session cap', () => {
  const storage = createStorage();
  for (const pathname of ['/one', '/two', '/three']) {
    const harness = createHarness({ storage, pathname });
    assert.equal(harness.lifecycle.start(), true);
    harness.clock.tick(APPEAR_DELAY_MS);
  }

  assert.equal(storage.getItem(SESSION_KEY_TOTAL), String(MAX_TOTAL));
  assert.equal(storage.getItem(SESSION_KEY_ROUTE + encodeURIComponent('/one')), '1');
  assert.equal(createHarness({ storage, pathname: '/one' }).lifecycle.start(), false);
  assert.equal(createHarness({ storage, pathname: '/four' }).lifecycle.start(), false);
});

test('route cleanup cancels timers while the next route can start independently', () => {
  const storage = createStorage();
  const first = createHarness({ storage, pathname: '/first' });
  first.lifecycle.start();
  first.clock.tick(APPEAR_DELAY_MS - 1);
  first.lifecycle.cleanup();
  first.clock.tick(1);
  assert.deepEqual(first.events, []);

  const second = createHarness({ storage, pathname: '/second' });
  second.lifecycle.start();
  second.clock.tick(APPEAR_DELAY_MS);
  assert.deepEqual(second.events, ['show']);
});

test('WhatsApp and successful-form flags suppress scheduled and future tooltips', () => {
  const before = createHarness({
    storage: createStorage({ [SESSION_KEY_WA]: '1' }),
  });
  assert.equal(before.lifecycle.start(), false);

  const during = createHarness();
  during.lifecycle.start();
  during.storage.setItem(SESSION_KEY_FORM, '1');
  during.lifecycle.suppress();
  during.clock.tick(APPEAR_DELAY_MS);
  assert.deepEqual(during.events, []);

  const visible = createHarness();
  visible.lifecycle.start();
  visible.clock.tick(APPEAR_DELAY_MS);
  visible.storage.setItem(SESSION_KEY_FORM, '1');
  visible.lifecycle.suppress();
  assert.deepEqual(visible.events, ['show', 'dismiss:conversion']);
});

test('cleanup prevents timer callbacks and post-unmount updates', () => {
  const { clock, events, lifecycle } = createHarness();
  lifecycle.start();
  lifecycle.cleanup();
  clock.tick(APPEAR_DELAY_MS + AUTO_DISMISS_MS);
  lifecycle.dismiss('manual');
  lifecycle.suppress();
  assert.deepEqual(events, []);
  assert.equal(clock.pending(), 0);
});

test('reduced-motion subscription tracks changes and removes its listener', () => {
  const originalMatchMedia = globalThis.matchMedia;
  let listener = null;
  let reduced = false;
  globalThis.matchMedia = () => ({
    get matches() { return reduced; },
    addEventListener: (type, callback) => {
      assert.equal(type, 'change');
      listener = callback;
    },
    removeEventListener: (type, callback) => {
      assert.equal(type, 'change');
      if (listener === callback) listener = null;
    },
  });

  try {
    let changes = 0;
    const unsubscribe = subscribeReducedMotion(() => { changes += 1; });
    assert.equal(getReducedMotionSnapshot(), false);
    assert.equal(getServerReducedMotionSnapshot(), false);
    reduced = true;
    listener();
    assert.equal(changes, 1);
    assert.equal(getReducedMotionSnapshot(), true);
    unsubscribe();
    assert.equal(listener, null);
  } finally {
    globalThis.matchMedia = originalMatchMedia;
  }
});

test('widget remains mounted independently when only the tooltip is suppressed', () => {
  const stack = fs.readFileSync('src/components/conversion/FloatingActionStack.jsx', 'utf8');
  assert.match(stack, /<ContextualWhatsAppWidget context=\{context\}\s*\/>/);
  assert.match(stack, /<ConversionTooltip key=\{pathname\} context=\{context\}\s*\/>/);
  assert.doesNotMatch(stack, /CONVERSION_COMPLETE_EVENT/);
});
