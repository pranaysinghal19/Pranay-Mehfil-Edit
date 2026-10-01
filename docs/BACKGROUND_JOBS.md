# Background Jobs

Not every task belongs inside an HTTP request.

## Candidates

- expire Live tokens
- expire pending connection requests when Live closes
- expire entitlements
- issue new membership-cycle entitlements
- send post-event feedback email/push
- send research invitations when consent exists
- notification delivery/retry
- payment reconciliation retry
- stale idempotency-key cleanup
- analytics aggregation
- event close-out / NO_SHOW marking

## Rule

A request that changes user-visible state should commit the core database transaction first. Optional email, push and analytics work can then run asynchronously.

Do not make ticket purchase or check-in success depend on an email provider being online.

## MVP approach

A simple database-backed jobs table plus one worker process is enough initially. Do not introduce Kafka or a distributed queue platform until real scale requires it.
