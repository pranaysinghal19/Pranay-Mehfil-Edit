const ALLOWED = Object.freeze({
  ISSUED: ['RESERVED', 'EXPIRED', 'REFUNDED'],
  RESERVED: ['REDEEMED', 'RELEASED', 'EXPIRED', 'REFUNDED'],
  RELEASED: ['RESERVED', 'EXPIRED', 'REFUNDED'],
  REDEEMED: [],
  EXPIRED: [],
  REFUNDED: [],
});

function canTransitionEntitlement(from, to) {
  return (ALLOWED[from] || []).includes(to);
}

function assertEntitlementTransition(from, to) {
  if (!canTransitionEntitlement(from, to)) {
    const error = new Error('Invalid entitlement transition: ' + from + ' -> ' + to);
    error.code = 'INVALID_ENTITLEMENT_TRANSITION';
    error.status = 409;
    throw error;
  }
}

module.exports = {
  ALLOWED,
  canTransitionEntitlement,
  assertEntitlementTransition,
};
