const test = require('node:test');
const assert = require('node:assert/strict');

const {
  canTransitionConnectionRequest,
  assertConnectionRequestTransition,
} = require('../src/domain/connectionRequestState');

test('pending request can be confirmed', () => {
  assert.equal(canTransitionConnectionRequest('PENDING', 'CONFIRMED'), true);
});

test('pending request can silently decline', () => {
  assert.equal(canTransitionConnectionRequest('PENDING', 'DECLINED'), true);
});

test('resolved request cannot be reopened', () => {
  assert.equal(canTransitionConnectionRequest('DECLINED', 'PENDING'), false);
  assert.throws(
    () => assertConnectionRequestTransition('DECLINED', 'PENDING'),
    { code: 'INVALID_CONNECTION_REQUEST_TRANSITION' }
  );
});
