# Shared frontend/backend contracts

This folder is deliberately framework-light.

Lovable, the consumer React app and Mehfil Ops should use these shapes as the common language between UI and API.

## Rules

- UI may add presentation-only fields locally.
- UI must not invent backend states.
- Changes to state enums should be reviewed with the backend.
- Socket event names are centralized here.
- Errors use stable machine-readable codes.
- Sensitive authorization logic never lives in these client contracts.

When Lovable creates or changes frontend code, it should import or mirror these contracts rather than creating unrelated duplicate models.
