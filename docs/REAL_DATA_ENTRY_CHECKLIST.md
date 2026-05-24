# Real Data Entry & Launch Checklist

Before transitioning the Buildogram platform from development to production, complete this data entry checklist to ensure the platform operates seamlessly for the first batch of live clients.

## 1. System Users & RBAC
- [ ] **Ops Manager Account**: Register the primary administrative account (e.g., `admin@buildogram.in`) and manually assign the `ops` role in the database.
- [ ] **Engineering Leads**: Create accounts for Dr. Vignesh, Kavin, Lokesh, and Manoj, and ensure they have `ops` or specialized partner roles.
- [ ] **Data Deletion**: Ensure all records created by `scripts/seed-demo-data.js` have been hard-deleted from the production database.

## 2. Supplier & Partner Onboarding
- [ ] **Material Suppliers**: Invite the primary Broadway/Mannady suppliers via the Partner Join Form (`/partners/join`) and approve their accounts via the Ops Console.
- [ ] **Initial Quotes**: Upload standard material rate cards (Cement, Steel) so the system has baseline numbers for the Cost Estimator.
- [ ] **Vetted Contractors**: Onboard at least 3 active local Chennai contractors to receive Turnkey Build leads.

## 3. Product Configs
- [ ] **WhatsApp Templates**: Ensure all pre-approved Meta WhatsApp templates (e.g., `lead_welcome`, `milestone_payment_request`) are correctly linked in `/ops/whatsapp-templates` with matching template names from the Meta Business Manager.
- [ ] **Pricing Rules**: Verify the Cost Estimator baseline prices in the environment variables or database config tables match current Chennai market realities (e.g., Premium Spec at ₹2,200/sq.ft).

## 4. Live Projects Migration
- [ ] **Active Builds**: For existing off-platform projects, create new `projects` records via the Ops Console.
- [ ] **Historical Data**: Upload existing BOQs, structural drawings, and past site photos into the respective project's `Property Passport` for continuity.
- [ ] **Client Handover**: Generate magic login links for existing clients to securely access their new live dashboards without friction.

## 5. Security & Legal
- [ ] **Environment Variables**: Ensure `DATABASE_URL`, `CLOUDINARY_URL`, `RAZORPAY_KEY`, and `WHATSAPP_TOKEN` point strictly to production environments.
- [ ] **Database Backups**: Verify that Neon Database point-in-time recovery (PITR) is active for the production branch.
