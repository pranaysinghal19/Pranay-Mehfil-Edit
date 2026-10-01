const test = require('node:test');
const assert = require('node:assert/strict');

const {
  issueLiveToken,
  isExpired,
  safelyMatchesToken,
} = require('../src/live/tokenService');

test('Live token is opaque and validates against its hash', () => {
  const issued = issueLiveToken({ now: 1_000 });
  assert.equal(typeof issued.token, 'string');
  assert.ok(issued.token.length > 20);
  assert.equal(safelyMatchesToken(issued.token, issued.tokenHash), true);
  assert.equal(safelyMatchesToken('wrong-token', issued.tokenHash), false);
});

test('Live token expires from server time', () => {
  const issued = issueLiveToken({ ttlMs: 120_000, now: 1_000 });
  assert.equal(isExpired(issued.expiresAt, 120_999), false);
  assert.equal(isExpired(issued.expiresAt, 121_000), true);
});
