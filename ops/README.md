# Mehfil Ops

Separate staff-facing web application sharing the Mehfil API.

## Pages

### Dashboard
Tonight's events, capacity, sold/check-in/not-arrived, Live status, staff coverage, open safety items and refund/issues snapshot.

### Event Control
Status, venue/time, capacity, ticket types, staffing, Live open/close, join-code controls and operational notes.

### Check-in
Ticket scan, booking search, attendance state and hard-ID pass/fail+reason only. Never store raw ID images.

### Live
Live state, active attendee count, code lifecycle, suspend/revoke access and staff-only operational alerts.

### Safety
Open queue, severity/status, marshal response, attendee-removal workflow and incident notes.

### Staff
Invite staff, assign event role, shift start/end and revoke/cancel assignment.

### Finance
Orders, captured/refunded totals, reconciliation and credits/refunds according to permissions.

### Membership
Membership status and entitlement ledger, not manual booleans.

### Feedback & Research
Aggregated feedback and consent-aware research outreach.

### Audit
Sensitive staff-action history. Restricted to authorized roles.

## Permission principle
The UI hiding a button is not security. Every privileged API operation authorizes on the server using current assignment and permission data.
