# Buildogram Security Launch Checklist

Before driving public traffic to Buildogram, verify the following security constraints are active.

## 1. Authentication & Credentials
- [ ] `NEXT_PUBLIC_APP_MODE` is strictly set to `production`.
- [ ] The `seed:admin` script was executed successfully.
- [ ] Legacy demo accounts (`admin@buildogram.in`, `partner@buildogram.in`, `client@buildogram.in`) cannot access the dashboard (automatically disabled by seed script).
- [ ] `JWT_SECRET` and `COOKIE_SECRET` are strong, cryptographically secure 32-byte strings.

## 2. Role-Based Access Control (RBAC)
- [ ] Navigate to `/ops/dashboard` while logged out -> **Redirects to /login**.
- [ ] Navigate to `/ops/dashboard` logged in as `client` -> **Forbidden / Error**.
- [ ] Navigate to `/client/dashboard` logged in as `partner` -> **Forbidden / Error**.

## 3. API & Data Isolation
- [ ] `GET /api/leads` returns 403 Forbidden for unauthenticated users and clients.
- [ ] `POST /api/documents/upload` strictly requires an authenticated session.
- [ ] File uploads restrict mime-types (PDF, JPG, PNG) and size (< 5MB) on both client and server.
- [ ] Printable HTML exports (e.g., `/api/documents/boq/123/download`) only render if the authenticated user owns the document or has an Ops role.

## 4. Frontend & Cookies
- [ ] `auth-token` cookie is set with `HttpOnly` and `Secure` flags (automatically handled by our auth middleware in production).
- [ ] No API keys or Database URLs are prefixed with `NEXT_PUBLIC_` except for safe analytics tags.
- [ ] Source maps are disabled in production build (default Next.js behavior).
