function evaluateLiveAccess({
  authenticated,
  ticketStatus,
  checkedIn,
  liveStatus,
  codeValid,
  restrictionActive,
}) {
  if (!authenticated) return { allowed: false, code: 'AUTH_REQUIRED' };

  if (!['BOOKED', 'CHECKED_IN'].includes(ticketStatus)) {
    return { allowed: false, code: 'TICKET_NOT_FOUND' };
  }

  if (!checkedIn && ticketStatus !== 'CHECKED_IN') {
    return { allowed: false, code: 'LIVE_ACCESS_DENIED' };
  }

  if (liveStatus !== 'OPEN') {
    return { allowed: false, code: 'LIVE_NOT_OPEN' };
  }

  if (!codeValid) {
    return { allowed: false, code: 'LIVE_CODE_INVALID' };
  }

  if (restrictionActive) {
    return { allowed: false, code: 'LIVE_ACCESS_DENIED' };
  }

  return { allowed: true, code: 'OK' };
}

module.exports = { evaluateLiveAccess };
