const ALLOWED = Object.freeze({
  AVAILABLE: ['HELD'],
  HELD: ['AVAILABLE', 'BOOKED', 'CANCELLED'],
  BOOKED: ['CHECKED_IN', 'CANCELLED', 'REFUNDED', 'NO_SHOW'],
  CHECKED_IN: [],
  CANCELLED: [],
  REFUNDED: [],
  NO_SHOW: [],
});

function canTransitionTicket(from, to) {
  return (ALLOWED[from] || []).includes(to);
}

function assertTicketTransition(from, to) {
  if (!canTransitionTicket(from, to)) {
    const error = new Error('Invalid ticket transition: ' + from + ' -> ' + to);
    error.code = 'INVALID_TICKET_TRANSITION';
    error.status = 409;
    throw error;
  }
}

module.exports = { ALLOWED, canTransitionTicket, assertTicketTransition };
