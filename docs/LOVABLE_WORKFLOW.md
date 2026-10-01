# Lovable + Pulkit Working Model

## Ownership

Pranay: product owner and final product direction.

Lovable: frontend acceleration, prototypes, consumer screens, Ops surfaces and routine component work.

Pulkit/backend: data model, API, security, migrations, permissions, payments, Live, connection rules, audit, deployment trust.

## Recommended sequence

1. Product rule is approved.
2. Shared contract is updated if required.
3. Lovable builds against demo services.
4. Pulkit exposes/updates the API.
5. Service wrapper switches from demo implementation to HTTP.
6. Integration tests run.
7. Staging review.
8. Production release.

## Demo mode

Demo is a supported environment, not a hack.

It contains fictitious profiles/events and deterministic states suitable for:
- investors
- usability tests
- design review
- Lovable iteration

Demo data must never be mixed with production.

## Branching

Suggested:
- main — reviewed baseline
- develop — integrated work if team wants it
- lovable/<feature> — generated UI work
- backend/<feature> — backend implementation
- hotfix/<issue> — production repair

Small teams may simplify this, but Lovable should not push unreviewed changes straight to protected main.

## Integration rule

The UI should be able to run with:
- DemoServices
- ApiServices

without rewriting screens.

That boundary is how Lovable can move quickly now while Pulkit replaces mock behavior with real endpoints later.
