# Mehfil Architecture v9

Pulkit's v8 plan remains the base. This version fills the gaps identified during product and architecture review.

## Shape: modular monolith

Consumer app and Mehfil Ops both talk to one Node/Express + Socket.io API, which owns business logic and writes to PostgreSQL. Do not introduce microservices yet.

Production target:
- Consumer UI: Vercel/PWA first, Android packaging later.
- Ops: Vercel web app.
- API + Socket.io: Hostinger if the Phase 0 echo test proves stable WebSocket support.
- Database: PostgreSQL, with Supabase Postgres as the managed target.

Sensitive business operations go through the API. Frontends do not directly mutate ticket, Live, connection, safety, membership, payment, or entitlement state.

## Core domains

Identity/sessions; Mehfil Card; cities/venues; events; staff/permissions; orders/payments; tickets/check-in; Live; QR exchange; connections; safety; memberships/entitlements; feedback/research; notifications; analytics; audit.

## Staff authorization

Authorization is identity + organisation role + event assignment + active shift + required permission + resource scope.

A HOST is guest-facing. An EVENT_LEAD owns event operations. Staff registration is invite-only.

## Realtime rooms

- event_<eventId>: public event-wide Live state
- user_<userId>: private connection/user events
- staff_event_<eventId>: safety and operational events

Anything changed by another person's action is pushed. State changed only by the current user's own action is ordinary REST. On reconnect, perform a one-time REST catch-up.

## Live

Join requires authenticated user, valid event ticket, checked-in status, open Live window, correct event code and no suspension/removal.

QR tokens are opaque random values generated server-side, bound to user + event + Live session, expire around 120 seconds, and are validated using server time. The client countdown is visual only. Live QR exchange requires connectivity in MVP.

## Connections

Real-world meeting → QR scan → minimal Mehfil Card reveal → Connect/Not now → QR owner independently confirms → mutual connection.

No blind likes, profile shopping or attendee catalogue. Decline is silent to the requester and is not written to identifiable audit logs.

## Commerce

Use Order → Payment → Ticket. Frontend payment state is never proof of purchase. Provider confirmation/webhooks are authoritative and idempotent.

## Membership

₹899/month uses a generic entitlement ledger rather than booleans. Typical entitlements: MONTHLY_EVENT, DRINK_TOKEN, PRIORITY_BOOKING, MEMBER_PRICING and INVITE_ONLY_ACCESS.

## Offline boundaries

Offline/resilient: ticket check-in queue, feedback and some local UI state.

Online-required: Live join, Live QR validation, connection initiation/confirmation and safety actions changing another user's access.

## Security baseline

Allow-listed CORS, request validation, rate limiting on sensitive endpoints, short-lived/revocable sessions, idempotency on important writes, PostgreSQL constraints, audit of sensitive staff actions, request IDs, structured logs, no raw ID document storage and no committed secrets.
