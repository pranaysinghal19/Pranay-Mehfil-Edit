# Mehfil Build Plan v9

This keeps Pulkit's learning-first phase structure and incorporates the architecture corrections agreed after v8.

## Phase 0 — Foundations
Build Express health endpoint, PostgreSQL pool, structured folders, config, error responses, request IDs, migration runner and a real Hostinger Socket.io echo-server test.

Exit:
- GET /health reports API + DB health
- migrations runner works
- .env.example committed and .env ignored
- decisions log exists
- Hostinger WebSocket verdict recorded

## Phase 1 — Identity and Mehfil Card
Build mock OTP behind a swappable interface, sessions/auth, card create/get/update and revocation basics.

Security note: localStorage JWT is acceptable only for prototype work; production Ops authentication must be revisited.

## Phase 2 — Cities, venues, events and staff
Build city/venue/event CRUD and invite-only staff profiles/assignments.

Authorization is role + event + shift + permission + resource scope.

HOST is guest-facing. EVENT_LEAD is operational.

## Phase 3 — Commerce and ticketing
Build Order → Payment → Ticket, state transitions, idempotency and payment-provider boundary. Ticket issuance is server-authoritative.

## Phase 4 — Check-in and hard ID
Idempotent check-in keyed by ticket. Store only pass/fail + reason for hard-ID checks, never raw identity documents. Document offline check-in queue/replay.

## Phase 5 — Live Core
Open/close Live, join-code validation, Live access, Socket rooms and REST catch-up after reconnect.

Rooms:
- event_<id>
- user_<id>
- staff_event_<id>

## Phase 6 — Connection QR
Issue opaque cryptographic tokens with roughly 120-second expiry. Server validates token hash, expiry, event/session state, user state and one-time-use rules.

QR refresh does not require server-pushed rotation. Live QR exchange requires connectivity in MVP.

## Phase 7 — Mutual connections
Build request/respond/confirm flow. Silent decline is non-negotiable. Duplicate operations must be idempotent and race-safe.

## Phase 8 — Safety
Build safety request, staff alert, marshal response and REMOVED cascade. All safety actions must be auditable with actor and reason.

## Phase 9 — Entitlement ledger
Generic lifecycle: ISSUED → RESERVED → REDEEMED / RELEASED / EXPIRED / REFUNDED.

Apply to monthly event credit, drink token, priority booking, member pricing and invite-only eligibility.

## Phase 10 — Feedback and research
One response per attendee/event. Research consent is separate from marketing consent.

## Phase 11 — Integration and split deployment
Run migrations against managed PostgreSQL, allow-list CORS, deploy API/Socket.io and both frontends, verify HTTPS and real production WebSockets.

Maintain four environments: DEMO, DEVELOPMENT, STAGING, PRODUCTION.

## Phase 12 — Membership
₹899 monthly membership issues benefits through the existing entitlement ledger. No duplicate active memberships.

## Phase 13 — Ops / Finance
Complete dashboard, reconciliation, staff admin, safety workflow, audit views and event close-out.

## Release gates
P0 Operating: foundations → identity → events/staff → commerce/tickets → check-in → deployment
P0 Live Exchange: Live → QR → mutual connections → safety
P1 Retention: membership/entitlements → feedback/research
