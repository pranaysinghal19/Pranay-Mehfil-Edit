# Mehfil

Offline-first events and community for city life.

**Product loop:** City → Event → Anticipation → Attend → Live → Meet physically → Connect → Memory → Return.

This repository is Pranay's development fork. It preserves Pulkit's original Phase 0 work while adding the architecture, data model, staff/Ops boundaries, Live rules, design system, and beginner learning path required to grow Mehfil safely.

## Repository map

~~~
backend/             Express + PostgreSQL API
frontend/            Consumer app handoff/spec
ops/                 Mehfil Ops web handoff/spec
docs/                Architecture, product rules, learning path, API contract
design/              Brand and UI system
~~~

## Current status

The codebase is intentionally a **modular monolith**, not microservices. The working backend foundation includes a health route, environment config, database pool, error handling, request IDs, migration runner, and the initial domain schema.

Schema presence does not mean every feature is production-complete. The implementation roadmap remains phase-driven and test-gated.

## Quick start

1. Install Node.js and PostgreSQL.
2. Create a local database called 'mehfil_dev'.
3. Copy 'backend/.env.example' to 'backend/.env'.
4. From 'backend/', run 'npm install'.
5. Run 'npm run migrate:up'.
6. Run 'npm run dev'.
7. Visit 'http://localhost:3000/health'.

Start with 'docs/LEARNING_PATH.md' if you are new to development.

## Non-negotiables

- No searchable stranger profiles.
- No swipe feed.
- No attendee catalogue.
- Connections originate from real-world Live QR exchange.
- Declines are silent to the requester.
- Staff access is role + event + shift + permission scoped.
- Sensitive actions are server-authoritative.
- Live QR tokens are opaque, short-lived, and server-validated.
- Ticket/payment/check-in/entitlement operations are idempotent.
- Sensitive staff actions are auditable.
