import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import {
  buildLeadDuplicateKey,
  classifyLeadSubmission,
  isCreatedLeadResponse,
  isDuplicateLeadResponse,
  isValidPersistentLeadId,
  LeadSubmissionDeduper,
  normalizeLeadPayload,
} from '../src/lib/leads/submission-contract.mjs';

const PERSISTED_UUID = '9d6938e7-9c37-4fca-a824-21bd582a0b73';

describe('lead submission response contract', () => {
  test('newly persisted UUID lead is a creation', () => {
    const response = {
      success: true,
      created: true,
      duplicate: false,
      id: PERSISTED_UUID,
    };
    assert.equal(isCreatedLeadResponse(response), true);
    assert.equal(classifyLeadSubmission(response), 'success');
  });

  test('positive integer IDs remain valid for compatible stores', () => {
    assert.equal(isValidPersistentLeadId(123), true);
    assert.equal(isCreatedLeadResponse({
      success: true,
      created: true,
      duplicate: false,
      id: 123,
    }), true);
  });

  test('zero, absent and malformed IDs never qualify as creation', () => {
    for (const id of [0, -1, null, undefined, '', 'not-an-id']) {
      assert.equal(isValidPersistentLeadId(id), false);
      assert.equal(isCreatedLeadResponse({
        success: true,
        created: true,
        duplicate: false,
        id,
      }), false);
    }
  });

  test('duplicate response is neutral and never a creation', () => {
    const response = {
      success: true,
      created: false,
      duplicate: true,
    };
    assert.equal(isDuplicateLeadResponse(response), true);
    assert.equal(isCreatedLeadResponse(response), false);
    assert.equal(classifyLeadSubmission(response), 'duplicate');
  });

  test('database failure cannot be classified as success', () => {
    assert.equal(classifyLeadSubmission({
      success: false,
      created: false,
    }), 'error');
  });
});
describe('lead payload normalization and duplicate identity', () => {
  test('legacy snake-case forms normalize to the API contract', () => {
    assert.deepEqual(
      normalizeLeadPayload({
        lead_type: 'maintenance',
        source_page: '/maintenance',
        message: 'Leak repair',
        locality: 'Adyar',
        metadata: { urgency: 'high' },
      }),
      {
        lead_type: 'maintenance',
        source_page: '/maintenance',
        message: 'Leak repair',
        locality: 'Adyar',
        metadata: { urgency: 'high' },
        leadType: 'maintenance',
        sourcePage: '/maintenance',
        notes: 'Leak repair',
        location: 'Adyar',
        formData: { urgency: 'high' },
      },
    );
  });

  test('same phone, source and enquiry are duplicates', () => {
    const first = {
      phone: '+91 98765 43210',
      sourcePage: '/services/boq-review',
      leadType: 'boq-review',
      notes: 'Planning stage',
      formData: { budget: '50L' },
    };
    const repeat = {
      ...first,
      phone: '9876543210',
      formData: { budget: '50L' },
    };
    assert.equal(buildLeadDuplicateKey(first), buildLeadDuplicateKey(repeat));
  });

  test('same phone and source with a materially different enquiry is not a duplicate', () => {
    const base = {
      phone: '9876543210',
      sourcePage: '/contact',
      leadType: 'general',
      notes: 'BOQ review',
    };
    assert.notEqual(
      buildLeadDuplicateKey(base),
      buildLeadDuplicateKey({ ...base, notes: 'Structural audit' }),
    );
  });
});

describe('rapid repeat coordination', () => {
  test('repeat is duplicate only after persistence completes', async () => {
    let now = 1_000;
    const deduper = new LeadSubmissionDeduper({ now: () => now });
    const first = deduper.begin('same-enquiry');
    assert.equal(first.type, 'owner');

    const concurrent = deduper.begin('same-enquiry');
    assert.equal(concurrent.type, 'pending');

    first.complete(PERSISTED_UUID);
    assert.deepEqual(await concurrent.outcome, {
      created: true,
      id: PERSISTED_UUID,
    });
    assert.equal(deduper.begin('same-enquiry').type, 'duplicate');

    now += 60_001;
    assert.equal(deduper.begin('same-enquiry').type, 'owner');
  });

  test('failed persistence releases the key and never creates false success', async () => {
    const deduper = new LeadSubmissionDeduper();
    const first = deduper.begin('failed-enquiry');
    const concurrent = deduper.begin('failed-enquiry');

    first.fail();
    assert.deepEqual(await concurrent.outcome, { created: false });
    assert.equal(deduper.begin('failed-enquiry').type, 'owner');
  });
});
