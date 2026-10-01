# Audit and Privacy Boundaries

Audit logging exists to make privileged actions accountable, not to create a surveillance archive.

## Log

- staff login/session events where useful for security
- staff assignment/permission changes
- event publication/cancellation
- Live open/close
- Live suspension/removal
- attendee removal
- safety status/action changes
- refunds/credits
- entitlement administrative adjustments
- exports
- sensitive admin lookups where appropriate

## Do not log as identifiable audit history

- connection declines
- private message contents
- full QR token values
- OTP codes
- payment card details
- raw identity documents
- passwords/secrets
- unnecessary profile fields

## Metadata rule

Audit metadata is allow-listed. Do not dump req.body or database rows wholesale into audit_logs.

## Retention

Define retention periods before production. Security, finance and incident records may need different retention policies. This repo does not yet prescribe a legal retention period.
