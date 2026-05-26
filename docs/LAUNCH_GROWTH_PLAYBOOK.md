# Launch Growth Playbook: The First 10 Customers

Buildogram is now production-ready. This playbook dictates how to manually handle the first real customers while testing the system in real-world scenarios.

## 1. The First 10 Homeowner Leads (Construction / BOQ)
**Goal:** Prove the Engineer-Led value proposition.
1. When a lead enters via `/contact?type=construction` or `boq_audit`:
2. **Ops Action:** Immediately move the lead to "Qualified" in the Ops Pipeline.
3. **Manual Touch:** Call the client within 30 minutes. Use the `CLIENT_CONSTRUCTION_ENQUIRY` or `CLIENT_BOQ_REVIEW` script context.
4. **Data Collection:** Ask for their floor plan / architecture drawings.
5. **Execution:** Have an engineer review the drawings. Create a "BOQ Review Report" document.
6. **Delivery:** Upload the BOQ Review PDF via the Client Dashboard and share it with the homeowner.

## 2. The First 10 Material Enquiries
**Goal:** Test the supplier routing and rate comparison.
1. When a lead enters via `/materials`:
2. **Ops Action:** Note the `materialType` and `quantity`.
3. **Routing:** Manually ping 3-4 trusted local suppliers (Cement, Steel, etc.) on WhatsApp.
4. **Execution:** Consolidate the rates into a "Material Quote" document in Buildogram.
5. **Delivery:** Upload to the client's Property Passport. Notify them of the competitive rate.
6. **Closing:** Assist with the transaction and capture delivery photos for the logbook.

## 3. The First 10 Partner Registrations
**Goal:** Seed the network with high-quality, verified professionals.
1. Drive traffic to `/partners/register` via LinkedIn or direct builder outreach.
2. When a registration lead appears:
3. **Ops Action:** Call the partner to verify their experience and request a portfolio.
4. **Execution:** Manually create their User Account (Role: `partner_contractor`).
5. **Onboarding:** Teach them how to use the Partner Dashboard to update site progress photos.
6. **Activation:** Match them with one of the first 10 homeowner leads.

## 4. Feedback & Iteration Loop
- Do not automate too much too early. The Ops Dashboard allows manual control of the Pipeline.
- For every closed deal, create a "Case Study" and feature it on the social media reel / homepage.
- Track which `utmSource` generated the highest quality leads to double down on that marketing channel.
