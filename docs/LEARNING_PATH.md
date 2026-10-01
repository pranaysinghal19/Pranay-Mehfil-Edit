# Mehfil — Beginner-to-Contributor Learning Path

**Who this is for:** someone who has never coded before, has no dev tools installed, and wants to understand every technology used in Mehfil well enough to contribute to real platform development in roughly 1–2 months.

**How to use it:** work top to bottom. Do the exercise, test it, explain what happened in your own words, then continue.

## Step 1 — Environment
Learn Node.js vs npm, PostgreSQL, terminals and PATH.

Exercise: install Node.js/PostgreSQL; verify node -v, npm -v and psql --version from a fresh terminal; deliberately break and repair PATH.

Resources:
- https://nodejs.org/en/download
- https://www.postgresql.org/download/
- https://www.postgresql.org/docs/

## Step 2 — Git basics
Learn working tree, untracked, staged, commit, branch, remote, push and pull.

Exercise: create a throwaway repo, add a dummy node_modules folder, observe git status, add .gitignore, verify with git status --ignored, then add/commit/push.

Resources:
- https://git-scm.com/doc
- https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

## Step 3 — First Express server
Learn HTTP, ports, routes, JSON and request/response.

Exercise: build /health and /hello/:name; test in browser and Postman; compare res.send with res.json.

Resources:
- https://expressjs.com/en/starter/basic-routing.html
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

## Step 4 — Modules, config and environment variables
Read backend/server.js, src/app.js and src/config.js. Understand why secrets live in .env, never Git.

## Step 5 — PostgreSQL fundamentals
Learn table, row, column, primary key, foreign key, unique/check constraints, indexes and transactions.

Exercise: deliberately violate a unique and foreign-key constraint and explain why database enforcement matters.

## Step 6 — pg, pools and transactions
Read src/db/pool.js. Run SELECT NOW(). Create a transaction where the second write fails and confirm the first write rolls back.

## Step 7 — Migrations
Read scripts/migrate.js and migrations/. Write a tiny migration, run up, inspect _migrations, then run down.

## Step 8 — API errors, request IDs and validation
Read middleware/. Learn middleware, stable error codes, 4xx vs 5xx and why each request gets an ID. Add schema validation before real write routes.

## Step 9 — OTP and authentication
Read src/auth/otp/. The mock accepts 123456 only inside the provider. Build send/verify endpoints later without hardcoding the code in route logic.

## Step 10 — Sessions and revocation
Use the sessions table. Learn why a permanent staff role inside a long-lived token is dangerous. Build logout-one-device and logout-all-devices.

## Step 11 — Staff authorization
Study docs/OPS_PERMISSIONS.md and src/authz/staffPermissions.js.

Check in order: authenticated → active staff profile → assignment → shift → permission → resource scope.

## Step 12 — State machines and idempotency
Model ticket states explicitly. Learn why BOOKED → CHECKED_IN is valid, REFUNDED → CHECKED_IN is invalid, and retries must not create duplicates.

## Step 13 — Orders, payments and tickets
Learn Order → Payment → Ticket. Mock payment first. Later the provider webhook is authoritative.

## Step 14 — Socket.io and realtime boundaries
Learn HTTP vs WebSocket, rooms, reconnect and pub/sub. Use event, private-user and staff-event rooms. Verify Hostinger with a real echo test before building Live.

Official docs: https://socket.io/docs/v4/

## Step 15 — Cryptographic Live tokens
Read src/live/tokenService.js. Understand why crypto.randomBytes is used instead of Math.random and why only the hash belongs in the database.

## Step 16 — Mehfil Live vertical slice
Build check-in → Live open → code join → Live access → issue QR → scan → card reveal.

## Step 17 — Mutual connection and silent decline
Build pending → mutual confirmation → connection. Prove the requester cannot learn a decline and identifiable decline events do not enter audit logs.

## Step 18 — Safety
Build safety request → marshal alert → response. Removal must invalidate Live access/tokens and be auditable.

## Step 19 — Entitlement ledger
Learn ISSUED → RESERVED → REDEEMED, or ISSUED → EXPIRED. Apply first to monthly event credit and drink token.

## Step 20 — React
Learn components, props, state, effects, forms, routing and API calls.

Consumer navigation: Home · Events · Live · Membership · Me.
Ops is a separate staff product.

Official docs: https://react.dev/learn

## Step 21 — Frontend/backend contract
Keep demo data behind service functions so the implementation can switch to real HTTP calls without rewriting screens.

## Step 22 — Testing
Learn unit, integration and end-to-end tests. Trust-layer test targets: auth, permission denial, idempotency, ticket transitions, Live expiry, connection races, entitlement double redemption and removal cascade.

## Step 23 — Environments and deployment
Maintain DEMO, DEVELOPMENT, STAGING and PRODUCTION. Verify CORS, HTTPS, secrets and WebSockets before production.

## Step 24 — Observability
Learn structured logs, request IDs, error tracking and metrics. A Live failure must be diagnosable by request/event/failure category without exposing unnecessary private information.

## Graduation project
Explain and demonstrate:
OTP login → profile → event → order/ticket → check-in → Live join → temporary QR → scan → mutual connection → safety path → entitlement redemption.

Also explain where authorization, idempotency, constraints, audit logging and realtime boundaries protect each step.
