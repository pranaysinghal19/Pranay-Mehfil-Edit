# Lovable / React Build Spec

Use the approved Mehfil V5 prototype and current concept art as the visual source of truth. Do not embed or iframe the old HTML. Rebuild it as component-based React/TypeScript.

## Consumer app

Navigation: Home · Events · Live · Membership · Me

Required:
- dynamic My Social Life home
- event discovery by city/date/format
- event detail with ₹449 / ₹499 + drink token
- booking anticipation/countdown
- permanent Live tab
- six-digit code gate
- dark Live mode
- 120-second QR display
- scan → minimal profile reveal
- Connect / Not now
- mutual connection state
- Connections grouped by event context
- My Mehfil Card edit + preview
- Your Mehfils / post-event memory
- feedback/research opt-in
- single ₹899 membership

## Consumer non-negotiables

Do not build people search, swipe feed, attendee catalogue, public likes, nearby people or rejection notices.

## Mehfil Ops

Build a separate web app surface with:
Dashboard · Events · Check-in · Live · Safety · Staff · Attendees · Membership · Finance · Feedback/Research · Analytics · Audit · Settings

Lovable may scaffold UI and standard CRUD. Pulkit/backend owns permission enforcement, payment webhooks, Live-token validation, entitlement transitions, audit, session security and sensitive migrations.

## Data boundary

Frontend components call service modules, not database SDKs directly for sensitive operations.

Example:
UI → eventService.list() → HTTP API

Never:
UI → direct update of ticket/live/connection/entitlement table

## Brand

Ink #16181D
Bone #F6F2EA
Coral #FF5C4D
Indigo #4937A8

Use editorial photography and restrained motion. Avoid dating-app clichés and generic enterprise-dashboard styling.
