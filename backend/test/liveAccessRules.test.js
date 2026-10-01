const test = require('node:test');
const assert = require('node:assert/strict');

const { evaluateLiveAccess } = require('../src/live/accessRules');

function valid(overrides = {}) {
  return {
    authenticated: true,
    ticketStatus: 'CHECKED_IN',
    checkedIn: true,
    liveStatus: 'OPEN',
    codeValid: true,
    restrictionActive: false,
    ...overrides,
  };
}

test('checked-in attendee can join open Live with valid code', () => {
  assert.deepEqual(evaluateLiveAccess(valid()), { allowed: true, code: 'OK' });
});

test('correct code does not bypass check-in', () => {
  assert.equal(
    evaluateLiveAccess(valid({ ticketStatus: 'BOOKED', checkedIn: false })).allowed,
    false
  );
});

test('restricted attendee cannot join Live', () => {
  assert.equal(
    evaluateLiveAccess(valid({ restrictionActive: true })).allowed,
    false
  );
});

test('closed Live rejects otherwise valid attendee', () => {
  assert.equal(
    evaluateLiveAccess(valid({ liveStatus: 'CLOSED' })).code,
    'LIVE_NOT_OPEN'
  );
});
