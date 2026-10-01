# Mehfil API Contract — Directional v1

This maps the intended API and does not claim every route is implemented yet.

## Auth
POST /auth/otp/send
POST /auth/otp/verify
POST /auth/logout
POST /auth/logout-all
GET /me

## Mehfil Card
GET /me/card
PUT /me/card
GET /me/card/preview

## Events
GET /events
GET /events/:eventId
POST /events
PATCH /events/:eventId

## Orders / tickets
POST /orders
POST /payments/webhook/:provider
GET /me/tickets
GET /tickets/:ticketId
POST /tickets/:ticketId/check-in

Important writes use Idempotency-Key.

## Live
POST /events/:eventId/live/open
POST /events/:eventId/live/close
POST /events/:eventId/live/join
GET /events/:eventId/live/state
POST /events/:eventId/live/qr
POST /events/:eventId/live/scan

## Connections
POST /connection-requests/:requestId/connect
POST /connection-requests/:requestId/not-now
POST /connection-requests/:requestId/confirm
GET /me/connections

The requester API never exposes a decline signal.

## Safety
POST /events/:eventId/safety
GET /ops/events/:eventId/safety
POST /ops/safety/:requestId/acknowledge
POST /ops/events/:eventId/attendees/:userId/remove

## Membership / entitlements
GET /me/membership
POST /membership/subscribe
POST /membership/cancel
GET /me/entitlements
POST /entitlements/:id/reserve
POST /entitlements/:id/redeem
POST /entitlements/:id/release

## Ops
GET /ops/events/:eventId/dashboard
GET /ops/events/:eventId/attendees
GET /ops/events/:eventId/staff
POST /ops/staff/invite
POST /ops/events/:eventId/staff-assignments
GET /ops/audit
