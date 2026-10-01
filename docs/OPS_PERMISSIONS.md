# Mehfil Ops — Staff Access Model

Staff use a separate web product, conceptually ops.mehfil.in. It shares the backend with the consumer app but has its own UI and stricter authorization.

## Login

Staff are invited by an authorized administrator. No public staff registration.

Production direction:
- verified email or phone
- short-lived session
- session revocation
- MFA for privileged roles
- sensitive permissions checked server-side at request time

## Permission examples

### VOLUNTEER
View assigned-event basics, scan/check ticket, search booking within assigned event, view attendance state and escalate safety issues.

### HOST
View schedule/event information, guest-facing tools and facilitate Live announcement. No default refund/safety/database privileges.

### MARSHAL
Safety queue, acknowledge/respond to reports, temporary Live suspension when policy allows, attendee-removal workflow and incident notes.

### EVENT_LEAD
Event controls, open/close Live, code lifecycle, revoke Live access, remove attendee and resolve staffing/check-in issues.

### OPS_FINANCE / CITY_OPS
Venue/event/staff operations, capacity, refunds/credits within permission scope and reconciliation.

### ORG_ADMIN
Organisation-wide administration.

## Authorization algorithm

For every privileged request:
1. authenticate
2. confirm active staff profile
3. evaluate organisation role
4. confirm active assignment to target event
5. confirm shift window
6. confirm event-role permission
7. confirm requested resource belongs to scope
8. write audit record if the action/access is sensitive

Hiding a button in the frontend is not security.

## Audit

Trace attendee removal, Live suspension, incident access/change, refund/credit, staff assignment change, permission change, export and sensitive admin lookup.

Identifiable decline events are explicitly excluded from audit logging.
