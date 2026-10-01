const ALLOWED = Object.freeze({
  PENDING: ['CONFIRMED', 'DECLINED', 'CANCELLED', 'EXPIRED'],
  CONFIRMED: [],
  DECLINED: [],
  CANCELLED: [],
  EXPIRED: [],
});

function canTransitionConnectionRequest(from, to) {
  return (ALLOWED[from] || []).includes(to);
}

function assertConnectionRequestTransition(from, to) {
  if (!canTransitionConnectionRequest(from, to)) {
    const error = new Error(
      'Invalid connection-request transition: ' + from + ' -> ' + to
    );
    error.code = 'INVALID_CONNECTION_REQUEST_TRANSITION';
    error.status = 409;
    throw error;
  }
}

module.exports = {
  ALLOWED,
  canTransitionConnectionRequest,
  assertConnectionRequestTransition,
};
