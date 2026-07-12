# Production hardening handoff

This branch removes the known fail-open authentication, credential, authorization, migration, upload, payment, and Next.js 16 blockers. It intentionally does not deploy or mutate the production database.

## Verification status

- Passed: Prisma schema validation and client generation (before the final API-only edits), JSON parsing, secret-pattern scans, dynamic-route `params` audit, client error-disclosure scan, and `git diff --check`.
- Pending: the final `npm run lint`, `npm run test:unit`, `npm audit --audit-level=high`, and `npm run build`. The local desktop sandbox prevented Node from traversing the user-profile path, and the required approved execution was unavailable because of the current usage limit.
- Do not deploy this branch until every pending command succeeds. The last dependency install reported three high-severity advisories; review and resolve the exact audit report before release.

## Mandatory external actions before deployment

1. Rotate every Neon/PostgreSQL credential that ever appeared in Git, the JWT secret, and affected administrator passwords.
2. Review database and hosting access logs from the first exposed commit onward.
3. Purge the removed credentials from Git history. Deleting them in a new commit is not sufficient.
4. Configure a protected `CI_DATABASE_URL` GitHub Actions secret for an isolated CI database.
5. Configure production environment variables from `.env.example`; do not commit or distribute local `.env` files.

## Database rollout

Apply SQL migrations from a trusted administrative shell, never through a web route:

1. Back up the production database and verify a restore.
2. For the existing production database, run the first deployment as `MIGRATION_BASELINE_BEFORE=019 npm run migrate:deploy`; this records the already-applied legacy migrations and executes 019 onward. For a new empty database, run `npm run migrate:deploy` without a baseline. The runner uses checksums, transactions, and a PostgreSQL advisory lock.
3. Confirm migrations `019_auth_role_hardening.sql` and `020_ops_workspaces.sql` are recorded in `schema_migrations`.
4. Run `npx prisma validate` and `npx prisma generate`.
5. Seed the first administrator with `ADMIN_EMAIL` and a temporary `ADMIN_PASSWORD` using `npm run seed:admin`.
6. Require that administrator to change the temporary password at first login.

## Release gate

Run `npm run verify`, then the launch, security, lead-routing, and payment smoke tests against a staging deployment. Confirm that:

- unsigned or expired session cookies are rejected;
- clients and partners cannot read or mutate another tenant's projects;
- diagnostic, migration, and seed URLs return 404;
- uploads reject unsupported types and files over 10 MB;
- Razorpay browser verification and webhook delivery settle a payment exactly once;
- reset links never appear in application logs;
- all dynamic Next.js routes resolve `params` asynchronously.

Deploy only after CI, staging smoke tests, credential rotation, migration backup, and rollback verification are complete.
