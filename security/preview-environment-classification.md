# Preview environment classification

- Checked: 2026-07-26 (Asia/Calcutta)
- Vercel project: `buildogram-app`
- Method: build-time required-key verifier plus `vercel env ls preview`
- Secret handling: names and presence only; no values were printed, copied, or committed

Vercel reported no Preview-scoped environment variables.

| Variable or group | Local build | Vercel Preview | Requirement |
| --- | --- | --- | --- |
| `DATABASE_URL` | MISSING | MISSING | REQUIRED for database-backed route, form, and lead-creation verification |
| `JWT_SECRET` | MISSING | MISSING | REQUIRED for authenticated application flows |
| `NEXT_PUBLIC_SITE_URL` | MISSING | MISSING | REQUIRED by the repository production-environment verifier and canonical configuration policy |
| `OPS_ADMIN_EMAIL` | MISSING | MISSING | REQUIRED by the repository production-environment verifier |
| `OPS_ADMIN_PHONE` | MISSING | MISSING | REQUIRED by the repository production-environment verifier |
| `NEXT_PUBLIC_GA_ID` | Not inspected locally | MISSING | NOT REQUIRED for protected preview; omitting it avoids contaminating production analytics |
| GSC credentials (`GOOGLE_APPLICATION_CREDENTIALS_JSON`, `GSC_SITE_URL`) | Not inspected locally | MISSING | NOT REQUIRED for public route/metadata verification |
| Payment credentials (`RAZORPAY_*`, `PAYMENT_PROVIDER`) | Not inspected locally | MISSING | NOT REQUIRED unless payment-flow verification is explicitly authorised |
| Messaging credentials (`WHATSAPP_*`, `RESEND_API_KEY`, `SLACK_WEBHOOK_URL`) | Not inspected locally | MISSING | NOT REQUIRED for read-only preview verification |
| AI/provider credentials (`AI_*`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `SERPER_API_KEY`) | Not inspected locally | MISSING | NOT REQUIRED for static route, metadata, sitemap, claim, or BOQ verification |
| Media credentials (`CLOUDINARY_*`, `FILE_STORAGE_PROVIDER`) | Not inspected locally | MISSING | NOT REQUIRED for the current read-only preview verification |
| `VERCEL_PROTECTION_BYPASS` / `BYPASS` | MISSING from current process | Not a project environment variable | REQUIRED locally to verify the protected preview; store only as an automation secret |

## Release impact

The preview build can render static/fallback content, but missing required variables prevent complete backend, authentication, and confirmed lead-creation verification. The protected-preview verifier must not be run past the auth wall until a local bypass secret is supplied securely.
