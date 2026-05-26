# Buildogram Production Deployment Guide

This guide walks through deploying the Buildogram app to a production environment (e.g., Vercel, AWS, DigitalOcean).

## 1. Environment Variables
Ensure the following variables are securely set in your hosting provider:

```env
# Core Next.js Config
NEXT_PUBLIC_APP_MODE=production
NODE_ENV=production

# Database (Prisma Postgres / Neon / RDS)
DATABASE_URL="postgresql://user:pass@host:5432/buildogram?sslmode=require"

# Security Secrets (Generate using `openssl rand -base64 32`)
JWT_SECRET="your_jwt_secret"
COOKIE_SECRET="your_cookie_secret"

# Cloudinary (File Storage)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Analytics & SEO (Optional but recommended)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_GTM_ID="GTM-XXXXXX"
```

## 2. Database Migration
Before starting the app, run the Prisma migration against your production DB:
```bash
npx prisma db push
```

## 3. Seed Production Admin User
To safely create the first Ops Admin without using the default demo credentials, run the secure seed script. Provide strong credentials.

```bash
ADMIN_EMAIL="founder@buildogram.in" ADMIN_PASSWORD="SuperSecurePassword!" npm run seed:admin
```
*(This script will also automatically disable the demo 'admin', 'partner', and 'client' accounts for safety).*

## 4. Build & Start
For VPS/Docker deployments:
```bash
npm run build
npm start
```
For Vercel, simply push the repository and configure the environment variables in the Vercel dashboard.

## 5. Post-Deploy Verification
- [ ] Visit `/login` and log in with the new `founder@buildogram.in` credentials.
- [ ] Verify you can see the Ops Dashboard.
- [ ] Submit a test lead via `/contact` and ensure it appears in the pipeline.
- [ ] Upload a test document in the Client Dashboard to ensure Cloudinary connection works.
