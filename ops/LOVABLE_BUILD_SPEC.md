# Mehfil Ops — Lovable Build Spec

Rebuild the approved Ops concepts as a real responsive React/TypeScript web app.

## Visual system

Ink sidebar, Bone workspace, Coral primary/urgent actions, Indigo secondary system state. Information-dense but still recognizably Mehfil rather than generic enterprise SaaS.

## Primary navigation

Dashboard
Events
Attendees & Check-in
Live
Safety & Support
People & Staff
Memberships
Revenue & Finance
Places & Venues
Feedback & Research
Analytics
Audit
Settings

Navigation items must be permission-aware, but backend authorization remains authoritative.

## Dashboard

Show:
- events today
- tickets sold
- checked-in count
- active Live events
- membership snapshot
- staff coverage
- open safety items
- payment/refund exceptions
- system health
- recent privileged activity

Do not fabricate production metrics. Demo mode should clearly use fixtures.

## Event workspace

Tabs:
Overview · Attendees · Check-in · Live · Staff · Safety · Revenue · Communications

Quick actions are shown only when relevant:
- open/close Live
- search booking
- scan ticket
- send event announcement
- log incident
- contact on-ground team

## Check-in

Fast scanner-first flow. Search fallback by booking reference/name/phone according to permissions.

Hard-ID handling stores only result + reason. Never store an ID image.

## Live

Show:
- session status
- active Live count
- join-code state
- help queue
- staff controls

Do not expose private attendee-to-attendee connection content.

## Safety

Open/in-progress/resolved queues with actor, timestamps and action audit. Include "marshal requested now" as a high-salience state.

## Staff

Invite-only onboarding. Event assignment includes event role, shift start/end and assignment status.

## Finance

Orders, payment reconciliation, refunds/credits and exception handling. Frontend does not mark payments paid without backend/provider confirmation.

## Audit

Restricted page for privileged activity. Identifiable connection declines must never appear here.
