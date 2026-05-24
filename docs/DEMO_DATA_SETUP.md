# Demo Data Setup Guide

This guide explains how to populate the local or staging Buildogram database with dummy data for sales demonstrations and testing.

> [!WARNING]
> This script modifies the database. **Never run this in production.**

## Prerequisites
- Node.js installed
- A valid PostgreSQL database connection string (`DATABASE_URL`) in your `.env` file.

## Running the Seed Script

To prevent accidental data corruption in production, the script enforces a strict safety check. You must explicitly pass the `DEMO_SEED_CONFIRM=true` environment variable when running the script.

### Windows (PowerShell)
```powershell
$env:DEMO_SEED_CONFIRM="true"; node scripts/seed-demo-data.js
```

### macOS / Linux
```bash
DEMO_SEED_CONFIRM=true node scripts/seed-demo-data.js
```

## What gets created?
Running this script will upsert the following records:
1. **Ops User**: `ops.demo@buildogram.in` (Role: `ops`)
2. **Client User**: `ramanathan.demo@example.com` (Role: `client`)
3. **Demo Project**: "ECR Coastal Villa (Demo)" at 45% progress linked to the client.
4. **Demo Leads**: Dummy leads for Construction Consultation and Material Quotes.
5. **Property Passport**: Dummy "Anna Nagar Plot" passport record.

These records use deterministic IDs (e.g., `op_usr_demo123`), so running the script multiple times is safe and will just update existing demo records rather than duplicating them.
