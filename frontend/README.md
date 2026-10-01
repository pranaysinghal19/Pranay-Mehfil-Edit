# Mehfil Consumer Frontend

React/Lovable consumer-app handoff.

## Navigation
Home · Events · Live · Membership · Me

## Required journeys
1. onboarding/auth
2. My Mehfil Card create/edit/preview
3. city/event discovery
4. event detail
5. ₹449 entry or ₹499 entry + drink token
6. booking anticipation/countdown
7. permanent Live tab
8. six-digit event-code entry
9. active Live + 120-second QR
10. scan → profile reveal
11. Connect / Not now
12. mutual connection
13. Connections grouped by event context
14. Your Mehfils / post-event memory
15. feedback/research opt-in
16. ₹899 membership

## Architecture rule
The UI may use demo services initially, but components must not own hardcoded business rules. Isolate data access behind services so real API calls can replace demo data later.

Never implement people search, nearby people, swipe feed, attendee catalogue, who-liked-you or rejection notices.
