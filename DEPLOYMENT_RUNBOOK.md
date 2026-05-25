# Buildogram Deployment Runbook

This guide details the exact steps for deploying Buildogram to production and how to safely roll back if issues arise.

## 1. Initial Production Deployment

### Step 1: Clone & Install
```bash
git pull origin main
npm install
```

### Step 2: Configure Environment
Ensure the production server has the environment variables set.
```bash
cp .env.example .env.production
nano .env.production # Fill in real values (DATABASE_URL, JWT_SECRET, etc.)
```

### Step 3: Build the Application
```bash
npm run build
```
Verify that the output says **"Compiled successfully"** with **0 errors**. 

### Step 4: Start the Server
```bash
npm run start
```
Alternatively, if using PM2 for process management:
```bash
pm2 start npm --name "buildogram" -- run start
```

### Step 5: Database Activation
Now that the server is running, hit the Ops endpoints to set up the database:
1. Verify Connection: `GET https://www.buildogram.in/api/health/db`
2. Run Migrations: `POST https://www.buildogram.in/api/ops/run-migration` (Include admin token in headers)
3. Seed Database: `POST https://www.buildogram.in/api/ops/seed-partners` (Include admin token in headers)

> [!WARNING]
> **Post-Seed Security Actions:**
> - Change the `admin@buildogram.in` password immediately after running seed.
> - Do NOT share admin credentials with anyone.
> - The demo partner accounts created by the seed script are for testing only. Do not use them for real partner data.

## 2. Zero-Downtime Updates (If using PM2)

When releasing a new feature update:
1. `git pull origin main`
2. `npm install`
3. `npm run build`
4. `pm2 reload buildogram`

*Note: Vercel or AWS Amplify will handle zero-downtime deployments automatically upon pushing to the `main` branch.*

## 3. Rollback Procedure

If the production deployment fails or causes critical errors:

### Step 1: Revert Git Commit
```bash
git log --oneline
git checkout <previous_stable_commit_hash>
```

### Step 2: Rebuild & Restart
```bash
npm install
npm run build
pm2 reload buildogram
```

### Step 3: Verify & Monitor
1. Load `https://www.buildogram.in`.
2. Attempt a partner login.
3. Check the server logs (`pm2 logs buildogram` or Vercel Logs) for runtime crashes.
