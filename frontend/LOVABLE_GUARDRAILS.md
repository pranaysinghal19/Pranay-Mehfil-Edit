# Lovable Guardrails

Lovable is an acceleration layer for Mehfil's frontend and internal web tools. It is not the authority for trust-sensitive business logic.

## Lovable should build

- React/TypeScript component structure
- routing/navigation
- responsive layouts
- forms and validation UX
- loading/error/empty states
- local demo mode
- API service wrappers
- consumer Home / Events / Live / Membership / Me
- Mehfil Ops dashboard and standard CRUD surfaces
- accessibility and responsive polish
- PWA shell
- frontend tests around presentation behavior

## Lovable may scaffold, but backend decides

- authentication screens
- ticket checkout UI
- check-in UI
- Live controls
- QR display/scanner UI
- connection confirmation UI
- membership UI
- safety-report UI
- staff-assignment UI
- finance/refund UI

## Lovable must NOT own

- OTP verification truth
- JWT/session validity
- staff permission decisions
- ticket state transitions
- payment confirmation
- payment webhook processing
- check-in authority
- Live join eligibility
- QR token generation/expiry/validation
- mutual connection creation
- silent-decline privacy rules
- attendee removal cascade
- entitlement redemption
- audit logging
- production database migrations

## Data access rule

Preferred:
UI component → frontend service → Mehfil API → database

Never for sensitive writes:
UI component → Supabase table mutation

Direct Supabase reads/writes may be considered later for deliberately public/read-only data, but are not the default architecture.

## Source ownership

All Lovable output must live in this GitHub repository. Do not let the only copy of working UI exist inside a Lovable project.

## Before accepting a Lovable change

Check:
1. Does it reuse shared contracts?
2. Did it invent a new backend state?
3. Did it bypass the API?
4. Did it duplicate business rules inside components?
5. Did it expose profile/connection/safety information too broadly?
6. Does it preserve Home · Events · Live · Membership · Me?
7. Does it preserve the Mehfil brand and avoid dating-app discovery mechanics?
