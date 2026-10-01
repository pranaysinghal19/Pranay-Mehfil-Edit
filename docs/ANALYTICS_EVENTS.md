# Mehfil Product Analytics Events

Analytics must help improve attendance, Live activation, safety and retention without turning Mehfil into a hidden social-scoring system.

## Core events

EVENT_VIEWED
EVENT_SAVED
CHECKOUT_STARTED
ORDER_CREATED
PAYMENT_CONFIRMED
TICKET_ISSUED
CHECKED_IN
LIVE_JOINED
QR_CREATED
QR_SCANNED
PROFILE_REVEALED
CONNECT_REQUESTED
CONNECTION_CONFIRMED
CONNECTION_REMOVED
SAFETY_REPORT_CREATED
FEEDBACK_COMPLETED
MEMBERSHIP_STARTED
ENTITLEMENT_REDEEMED

## Useful metrics

- event detail → checkout conversion
- paid ticket → check-in conversion
- check-in → Live activation
- attendees with at least one mutual connection
- time from Live join to first QR scan
- repeat attendance
- membership retention
- safety reports per 100 attendees
- blocks per 100 attendees
- check-in exceptions
- payment reconciliation exceptions

## Do not optimize

Do not rank people by desirability, popularity, attractiveness or connection count.

Do not expose decline histories.

Do not create hidden user scores that affect who people can meet unless such a system is separately reviewed for fairness, privacy and product fit.

## Privacy

Prefer event/cohort-level analysis. Identifiable data access should be purpose-limited and logged when sensitive.
