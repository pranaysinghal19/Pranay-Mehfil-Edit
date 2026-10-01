# Architecture Decisions

## ADR-001 — Modular monolith first
Accepted. One Node/Express service organized by domain. Microservices add complexity before scale justifies them.

## ADR-002 — PostgreSQL is the system of record
Accepted. Raw SQL with tracked migrations. Production may use managed Supabase Postgres, but critical writes go through the Mehfil API.

## ADR-003 — localStorage auth is prototype-only
Accepted with revisit. It may be used during early prototype work. Reassess before production hardening and immediately if user-controlled or dynamic HTML enters the app. Ops should use revocable short-lived sessions and stronger browser protections.

## ADR-004 — staff authorization is scoped
Accepted. Permission = identity + organisation role + event assignment + shift + permission + resource scope.

## ADR-005 — Live QR requires online validation
Accepted. Do not queue an unverified Live scan offline and later pretend it was valid. Server time and token state are authoritative.

## ADR-006 — QR refresh is request-based
Accepted. Token expires after roughly 120 seconds. Client requests another token. Socket.io is not required merely to rotate a countdown.

## ADR-007 — declines are silent
Accepted. No rejection signal to requester and no identifiable decline audit record. Aggregate analytics may count funnel outcomes.

## ADR-008 — Order precedes Ticket
Accepted. Order → Payment → Ticket. Frontend payment state is never proof of purchase.

## ADR-009 — one entitlement ledger
Accepted. Membership benefits, event credits and drink tokens use a generic ledger rather than scattered booleans.

## ADR-010 — separate Socket audiences
Accepted. Use event, private-user and staff-event rooms to prevent private data broadcasting across audiences.
