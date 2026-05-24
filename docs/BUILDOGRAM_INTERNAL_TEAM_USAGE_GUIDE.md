# Buildogram Internal Team Usage Guide

Welcome to the Ops Team! This guide outlines the standard operating procedures for managing the Buildogram platform via the `/ops` console.

## 1. Lead & Pipeline Management
- **Intake Flow:** All incoming leads (Contact forms, Estimator results, BOQ uploads, Material Quotes) land in `/ops/leads`.
- **Kanban Movement:** Drag and drop leads across stages (`New` -> `Contacted` -> `Qualified` -> `Proposal` -> `Won`/`Lost`).
- **Activity Logging:** Always log every phone call or email interaction using the "Log Activity" button on the lead detail view. This ensures the entire team has context.

## 2. Project Lifecycle
- **Creation:** Convert a "Won" lead into an active project via `/ops/projects`.
- **Milestones:** Establish 8-12 clear physical milestones for the project (e.g., "Plinth Level Completion").
- **Quality Audits (BQS):** Site engineers must upload photo evidence and cube test results for every structural phase. Do not mark a milestone as complete until the BQS checklist passes.
- **Client App:** Updates logged in `/ops/projects/[id]` are instantly visible on the client's dashboard (`/client/project`). Ensure all public-facing comments are professional and proof-read.

## 3. WhatsApp Notification Queue
- Buildogram uses the WhatsApp Cloud API for client and partner updates.
- **Approval Queue:** Go to `/ops/whatsapp-approvals`. Review AI-drafted messages or system notifications before approving them for delivery.
- **Templates:** Use `/ops/whatsapp-templates` to manage pre-approved Meta templates. Do not edit template names unless they have been explicitly updated in the Meta Business Manager.

## 4. Financial Operations
- **Invoices:** Generate invoices for design fees, consultancy, or material payments via `/ops/invoices`.
- **Payment Links:** The system automatically generates Razorpay links for active invoices. These links can be copied and sent via WhatsApp.
- **Revenue Tracking:** Update the status of inbound payments in `/ops/revenue`.

## 5. Property Passport Management
- The Property Passport (`/ops/properties`) is a permanent digital ledger for a client's asset.
- **Uploads:** Ensure final approved architectural drawings, CMDA permits, structural warranties, and material certificates are uploaded to the respective property's vault before final handover.

## Escalation Policy
- **Technical Errors:** If the portal throws an error or a Razorpay webhook fails, take a screenshot and slack the engineering team immediately.
- **Structural Concerns:** Any failed concrete compressive test (cube test) must trigger an immediate halt on the specific site and escalation to the Lead Structural Engineer.
