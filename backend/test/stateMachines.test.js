const test = require('node:test');
const assert = require('node:assert/strict');

const {
  canTransitionTicket,
  assertTicketTransition,
} = require('../src/domain/ticketState');
const {
  canTransitionEntitlement,
  assertEntitlementTransition,
} = require('../src/domain/entitlementState');

test('ticket can progress from booked to checked in', () => {
  assert.equal(canTransitionTicket('BOOKED', 'CHECKED_IN'), true);
});

test('refunded ticket cannot be checked in', () => {
  assert.equal(canTransitionTicket('REFUNDED', 'CHECKED_IN'), false);
  assert.throws(
    () => assertTicketTransition('REFUNDED', 'CHECKED_IN'),
    { code: 'INVALID_TICKET_TRANSITION' }
  );
});

test('entitlement can reserve and redeem', () => {
  assert.equal(canTransitionEntitlement('ISSUED', 'RESERVED'), true);
  assert.equal(canTransitionEntitlement('RESERVED', 'REDEEMED'), true);
});

test('redeemed entitlement cannot be redeemed twice', () => {
  assert.equal(canTransitionEntitlement('REDEEMED', 'REDEEMED'), false);
  assert.throws(
    () => assertEntitlementTransition('REDEEMED', 'REDEEMED'),
    { code: 'INVALID_ENTITLEMENT_TRANSITION' }
  );
});
