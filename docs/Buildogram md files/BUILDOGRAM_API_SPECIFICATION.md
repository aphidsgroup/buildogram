# BUILDOGRAM API SPECIFICATION

# Purpose

This document defines the API structure for Buildogram.

It is designed for:

- Next.js Route Handlers
- Future Express/FastAPI microservices
- Frontend developers
- Backend developers
- Mobile app developers
- AI coding tools
- QA testers

The API must support:

- Public website
- Customer portal
- Operations dashboard
- Engineer app
- Contractor portal
- Architect portal
- Supplier portal
- Material marketplace
- Property Passport
- AI tools
- CRM
- Content engine

---

# API Design Principles

## 1. Consistent Response Format

Success response:

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {}
}
```

Error response:

```json
{
  "success": false,
  "message": "Something went wrong",
  "error": {
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

---

## 2. Role-Aware APIs

Every protected API must check:

- Authentication
- Role
- Permission
- Record ownership
- Project assignment

---

## 3. Validation

All input should be validated using Zod or equivalent schema validation.

---

## 4. Audit Logging

Important actions must create audit logs:

- User login
- Role change
- BOQ approval
- Payment approval
- Quality result change
- Material delivery verification
- Document deletion
- Passport public link creation

---

# API Groups

1. Auth APIs
2. User & Role APIs
3. Lead CRM APIs
4. Project APIs
5. BOQ APIs
6. Progress APIs
7. Quality APIs
8. Material Marketplace APIs
9. Supplier APIs
10. Document APIs
11. Payment APIs
12. Issue APIs
13. Property Passport APIs
14. AI APIs
15. Partner APIs
16. Content APIs
17. Notification APIs
18. Analytics APIs

---

# 1. Auth APIs

## POST /api/auth/register

Purpose:

Create a new user.

Access:

Public or admin-only depending use case.

Request:

```json
{
  "name": "Customer Name",
  "email": "customer@example.com",
  "phone": "9876543210",
  "password": "securePassword",
  "role": "customer"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user_id": "uuid",
    "role": "customer"
  }
}
```

---

## POST /api/auth/login

Purpose:

Authenticate user.

Request:

```json
{
  "emailOrPhone": "customer@example.com",
  "password": "securePassword"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "Customer Name",
      "role": "customer"
    }
  }
}
```

Cookie:

- httpOnly
- secure in production
- sameSite strict/lax

---

## POST /api/auth/logout

Purpose:

Clear session.

Response:

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## GET /api/auth/me

Purpose:

Return current logged-in user.

Response:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "User Name",
    "email": "user@example.com",
    "phone": "9876543210",
    "role": "project_manager",
    "permissions": []
  }
}
```

---

# 2. User & Role APIs

## GET /api/users

Purpose:

List users.

Access:

Admin only.

Query params:

- role
- status
- search
- page
- limit

---

## POST /api/users

Purpose:

Create internal user or partner user.

Request:

```json
{
  "name": "Engineer Name",
  "email": "engineer@example.com",
  "phone": "9876543210",
  "role": "site_engineer",
  "status": "active"
}
```

---

## PATCH /api/users/:id

Purpose:

Update user.

Request:

```json
{
  "name": "Updated Name",
  "phone": "9876543210",
  "status": "active"
}
```

---

## POST /api/users/:id/role

Purpose:

Update role.

Request:

```json
{
  "role": "project_manager"
}
```

Audit required.

---

# 3. Lead CRM APIs

## GET /api/leads

Purpose:

List leads.

Query params:

- status
- source
- lead_type
- assigned_to
- city
- date_from
- date_to
- search
- page
- limit

Response:

```json
{
  "success": true,
  "data": {
    "items": [],
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

---

## POST /api/leads

Purpose:

Create lead from public form, calculator, BOQ audit, plan upload, or admin entry.

Request:

```json
{
  "name": "Lead Name",
  "phone": "9876543210",
  "email": "lead@example.com",
  "city": "Chennai",
  "locality": "Porur",
  "lead_type": "construction",
  "source": "cost_calculator",
  "requirement": "G+1 house construction",
  "budget_range": "50-70 lakhs",
  "timeline": "3 months"
}
```

---

## GET /api/leads/:id

Purpose:

Get lead detail.

Includes:

- Lead info
- Activities
- Uploaded documents
- Follow-ups
- Proposal status

---

## PATCH /api/leads/:id

Purpose:

Update lead.

Request:

```json
{
  "status": "qualified",
  "lead_score": 82,
  "assigned_to": "user_uuid",
  "next_followup_at": "2026-06-01T10:00:00Z"
}
```

---

## POST /api/leads/:id/activities

Purpose:

Add lead activity.

Request:

```json
{
  "activity_type": "call",
  "notes": "Customer wants G+1 construction in Porur.",
  "next_followup_at": "2026-06-01T10:00:00Z"
}
```

---

## POST /api/leads/:id/convert

Purpose:

Convert lead into project/customer.

Request:

```json
{
  "project_name": "Porur G+1 Residence",
  "customer_id": "uuid"
}
```

---

# 4. Project APIs

## GET /api/projects

Purpose:

List projects based on user role.

Query params:

- status
- project_type
- city
- assigned_pm
- assigned_engineer
- customer_id
- page
- limit

---

## POST /api/projects

Purpose:

Create project after lead conversion.

Request:

```json
{
  "project_name": "Porur G+1 Residence",
  "customer_id": "uuid",
  "lead_id": "uuid",
  "project_type": "independent_house",
  "city": "Chennai",
  "locality": "Porur",
  "plot_area": 1200,
  "built_up_area": 2200,
  "floors": "G+1",
  "status": "planning",
  "project_manager_id": "uuid",
  "site_engineer_id": "uuid"
}
```

---

## GET /api/projects/:id

Purpose:

Get project details.

Includes:

- Summary
- Customer
- Team
- Milestones
- BOQ summary
- Quality summary
- Payment summary
- Recent progress
- Open issues

---

## PATCH /api/projects/:id

Purpose:

Update project.

Request:

```json
{
  "status": "active",
  "planned_start_date": "2026-06-10",
  "planned_end_date": "2027-02-10"
}
```

---

## POST /api/projects/:id/users

Purpose:

Assign user to project.

Request:

```json
{
  "user_id": "uuid",
  "project_role": "site_engineer"
}
```

---

## GET /api/projects/:id/health

Purpose:

Get project health scores.

Response:

```json
{
  "success": true,
  "data": {
    "progress_score": 75,
    "quality_score": 88,
    "budget_score": 92,
    "schedule_score": 70,
    "risk_score": 35
  }
}
```

---

# 5. Milestone APIs

## GET /api/projects/:id/milestones

Purpose:

List project milestones.

---

## POST /api/projects/:id/milestones

Request:

```json
{
  "title": "Foundation Completion",
  "description": "Excavation, PCC, footing and foundation concrete",
  "planned_start_date": "2026-06-15",
  "planned_end_date": "2026-07-05",
  "payment_percentage": 15
}
```

---

## PATCH /api/milestones/:id

Purpose:

Update milestone status.

Request:

```json
{
  "status": "completed",
  "actual_end_date": "2026-07-04"
}
```

---

# 6. BOQ APIs

## GET /api/projects/:id/boq

Purpose:

List BOQ versions for project.

---

## POST /api/projects/:id/boq/versions

Purpose:

Create BOQ version.

Request:

```json
{
  "version_name": "Initial BOQ",
  "notes": "Prepared after site visit",
  "items": [
    {
      "category": "RCC",
      "item_name": "M25 concrete",
      "unit": "cum",
      "quantity": 50,
      "rate": 7500,
      "brand_or_grade": "M25",
      "description": "Concrete for slab and beams"
    }
  ]
}
```

---

## GET /api/boq/:versionId

Purpose:

Get BOQ version details.

---

## PATCH /api/boq/:versionId/items/:itemId

Purpose:

Update BOQ item.

---

## POST /api/boq/:versionId/approve

Purpose:

Customer/admin approves BOQ.

Request:

```json
{
  "approval_status": "approved",
  "remarks": "Approved after discussion"
}
```

Audit required.

---

## POST /api/boq/:versionId/audit

Purpose:

Run AI/manual audit on BOQ.

Response:

```json
{
  "success": true,
  "data": {
    "boq_trust_score": 82,
    "missing_items": [],
    "overpriced_items": [],
    "risk_notes": []
  }
}
```

---

# 7. Progress APIs

## GET /api/projects/:id/progress-logs

Purpose:

List progress updates.

---

## POST /api/projects/:id/progress-logs

Purpose:

Create daily progress log.

Request:

```json
{
  "log_date": "2026-06-01",
  "work_completed": "Column reinforcement completed",
  "worker_count": 8,
  "materials_used": "Steel, binding wire",
  "next_day_plan": "Column shuttering",
  "issues": "None",
  "visibility": "customer_visible"
}
```

---

## POST /api/progress-logs/:id/media

Purpose:

Attach photos/videos to progress log.

Request:

Multipart form data.

Fields:

- files[]
- media_type
- caption

---

# 8. Quality APIs

## GET /api/quality/categories

Purpose:

List quality categories.

---

## GET /api/quality/checkpoints

Purpose:

List quality checkpoints.

Query params:

- category
- project_type
- stage
- severity

---

## POST /api/quality/checkpoints

Purpose:

Create checkpoint.

Admin only.

Request:

```json
{
  "category_id": "uuid",
  "checkpoint_code": "RCC-SLAB-001",
  "title": "Slab reinforcement spacing verified",
  "description": "Check spacing as per structural drawing",
  "severity": "critical",
  "evidence_required": ["photo", "measurement_photo"],
  "customer_visible": true
}
```

---

## POST /api/projects/:id/quality/inspections

Purpose:

Create inspection.

Request:

```json
{
  "milestone_id": "uuid",
  "category_id": "uuid",
  "inspection_date": "2026-06-01",
  "items": [
    {
      "checkpoint_id": "uuid",
      "result": "pass",
      "remarks": "Verified on site"
    }
  ]
}
```

---

## PATCH /api/quality/inspection-items/:id

Purpose:

Update inspection item.

Request:

```json
{
  "result": "fail",
  "remarks": "Cover blocks missing",
  "corrective_action": "Place cover blocks before concrete"
}
```

---

## POST /api/quality/inspection-items/:id/evidence

Purpose:

Upload quality evidence.

Multipart form data.

---

## POST /api/quality/inspections/:id/submit

Purpose:

Submit inspection for approval.

---

## GET /api/projects/:id/quality-report

Purpose:

Generate quality report.

---

# 9. Issue APIs

## GET /api/projects/:id/issues

Purpose:

List project issues.

---

## POST /api/projects/:id/issues

Purpose:

Create issue.

Request:

```json
{
  "title": "Waterproofing rework required",
  "description": "Flood test failed in bathroom",
  "category": "quality",
  "severity": "high",
  "assigned_to": "uuid",
  "due_date": "2026-06-05"
}
```

---

## PATCH /api/issues/:id

Purpose:

Update issue.

Request:

```json
{
  "status": "resolved",
  "resolution_notes": "Rework completed and retested"
}
```

---

## POST /api/issues/:id/evidence

Purpose:

Upload before/after evidence.

---

# 10. Material Marketplace APIs

## GET /api/materials/catalog

Purpose:

List materials.

Query params:

- category
- brand
- city
- search

---

## POST /api/materials/catalog

Purpose:

Create material catalog item.

Request:

```json
{
  "category": "cement",
  "product_name": "PPC Cement",
  "brand": "UltraTech",
  "grade": "PPC",
  "unit": "bag",
  "base_rate": 420,
  "gst_percentage": 28
}
```

---

## POST /api/material-requests

Purpose:

Create material quote request.

Request:

```json
{
  "project_id": "uuid",
  "material_category": "cement",
  "brand_preference": "UltraTech",
  "quantity": 500,
  "unit": "bags",
  "delivery_location": "Porur, Chennai",
  "required_date": "2026-06-10"
}
```

---

## GET /api/material-requests

Purpose:

List material requests.

---

## POST /api/material-requests/:id/quotes

Purpose:

Supplier submits quote.

Request:

```json
{
  "supplier_id": "uuid",
  "rate": 415,
  "delivery_charge": 2000,
  "gst_percentage": 28,
  "availability": "available",
  "delivery_date": "2026-06-10"
}
```

---

## POST /api/material-requests/:id/select-quote

Purpose:

Select supplier quote.

Request:

```json
{
  "quote_id": "uuid",
  "selected_by": "uuid",
  "remarks": "Best rate and delivery timeline"
}
```

---

## POST /api/purchase-orders

Purpose:

Create purchase order.

Request:

```json
{
  "material_request_id": "uuid",
  "supplier_id": "uuid",
  "project_id": "uuid",
  "items": [],
  "delivery_date": "2026-06-10",
  "payment_terms": "50% advance, 50% on delivery"
}
```

---

## POST /api/material-deliveries

Purpose:

Record material delivery.

Request:

```json
{
  "purchase_order_id": "uuid",
  "project_id": "uuid",
  "supplier_id": "uuid",
  "delivered_quantity": 500,
  "vehicle_number": "TN00AB0000",
  "received_by": "uuid",
  "verification_status": "accepted"
}
```

---

## POST /api/material-deliveries/:id/evidence

Purpose:

Upload delivery photos, invoice, certificate.

---

# 11. Supplier APIs

## GET /api/suppliers

Purpose:

List suppliers.

---

## POST /api/suppliers

Purpose:

Create supplier profile.

Request:

```json
{
  "company_name": "ABC Materials",
  "contact_person": "Name",
  "phone": "9876543210",
  "gst_number": "GSTIN",
  "service_locations": ["Chennai", "Tambaram"],
  "material_categories": ["cement", "steel"]
}
```

---

## PATCH /api/suppliers/:id

Purpose:

Update supplier.

---

## GET /api/suppliers/:id/performance

Purpose:

Get supplier performance metrics.

---

# 12. Document APIs

## POST /api/documents/upload

Purpose:

Upload document or media.

Multipart form data:

- file
- project_id
- document_type
- visibility
- linked_entity_type
- linked_entity_id

---

## GET /api/documents

Query params:

- project_id
- document_type
- visibility
- uploaded_by

---

## PATCH /api/documents/:id

Purpose:

Update metadata or visibility.

---

## DELETE /api/documents/:id

Purpose:

Soft delete document.

Audit required.

---

# 13. Payment APIs

## GET /api/projects/:id/payments

Purpose:

List project payment schedule.

---

## POST /api/projects/:id/payments

Purpose:

Create payment milestone.

Request:

```json
{
  "milestone_id": "uuid",
  "amount": 500000,
  "due_date": "2026-07-01",
  "description": "Foundation milestone payment"
}
```

---

## PATCH /api/payments/:id

Purpose:

Update payment status.

Request:

```json
{
  "status": "paid",
  "paid_amount": 500000,
  "paid_at": "2026-07-01T10:00:00Z"
}
```

---

## POST /api/payments/:id/approve

Purpose:

Approve payment request after milestone verification.

Audit required.

---

# 14. Property Passport APIs

## POST /api/passports

Purpose:

Create Property Passport.

Request:

```json
{
  "project_id": "uuid",
  "owner_id": "uuid",
  "property_name": "Porur Residence",
  "property_type": "independent_house",
  "address": "Porur, Chennai",
  "plot_area": 1200,
  "built_up_area": 2200,
  "floors": "G+1"
}
```

---

## GET /api/passports/:id

Purpose:

Get full passport.

---

## PATCH /api/passports/:id

Purpose:

Update passport metadata.

---

## GET /api/passports/:id/score

Purpose:

Get property trust score.

---

## POST /api/passports/:id/share-link

Purpose:

Create public share link.

Request:

```json
{
  "visibility": {
    "show_documents": false,
    "show_quality_summary": true,
    "show_material_summary": true,
    "show_360_tour": true
  },
  "expires_at": "2026-12-31T00:00:00Z"
}
```

---

## GET /api/passports/public/:shareCode

Purpose:

View public passport.

No login required.

---

## GET /api/passports/:id/export

Purpose:

Export PDF report.

---

# 15. AI APIs

## POST /api/ai/cost-estimate

Request:

```json
{
  "city": "Chennai",
  "locality": "Porur",
  "plot_area": 1200,
  "built_up_area": 2200,
  "floors": "G+1",
  "quality_level": "premium"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "estimated_min": 4800000,
    "estimated_max": 5600000,
    "category_breakdown": {},
    "timeline_months": 9,
    "risk_notes": []
  }
}
```

---

## POST /api/ai/boq-audit

Request:

```json
{
  "boq_version_id": "uuid"
}
```

Or file upload.

Response:

```json
{
  "success": true,
  "data": {
    "trust_score": 82,
    "missing_items": [],
    "rate_risks": [],
    "recommendations": []
  }
}
```

---

## POST /api/ai/plan-review

Request:

File upload or drawing ID.

Response:

```json
{
  "success": true,
  "data": {
    "plan_score": 78,
    "space_efficiency": 82,
    "ventilation_notes": [],
    "improvement_suggestions": []
  }
}
```

---

## POST /api/ai/delay-prediction

Request:

```json
{
  "project_id": "uuid"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "delay_probability": 68,
    "risk_reasons": [],
    "recommended_actions": []
  }
}
```

---

## POST /api/ai/project-summary

Purpose:

Generate customer-friendly project summary.

---

## POST /api/ai/passport-summary

Purpose:

Generate owner/buyer/tenant summary.

---

# 16. Partner APIs

## GET /api/partners

Purpose:

List partner profiles.

---

## POST /api/partners

Purpose:

Create partner profile.

Request:

```json
{
  "partner_type": "contractor",
  "company_name": "ABC Contractor",
  "contact_person": "Name",
  "phone": "9876543210",
  "service_locations": ["Chennai"],
  "experience_years": 10
}
```

---

## PATCH /api/partners/:id/verify

Purpose:

Update verification status.

Request:

```json
{
  "verification_status": "verified",
  "remarks": "Documents verified"
}
```

---

## GET /api/partners/:id/performance

Purpose:

Get partner performance.

---

# 17. Content APIs

## GET /api/content/pages

Purpose:

List content pages.

---

## POST /api/content/pages

Purpose:

Create SEO/content page.

Request:

```json
{
  "title": "Home Construction in Porur",
  "slug": "home-construction-porur",
  "page_type": "locality_service",
  "seo_title": "Home Construction in Porur",
  "meta_description": "Build your home in Porur with BOQ clarity and quality proof.",
  "content": "Markdown or rich text content",
  "status": "draft"
}
```

---

## PATCH /api/content/pages/:id

Purpose:

Update content page.

---

## POST /api/content/pages/:id/publish

Purpose:

Publish content.

---

## GET /api/content/faqs

Purpose:

List FAQs.

---

## POST /api/content/faqs

Purpose:

Create FAQ.

---

# 18. Notification APIs

## GET /api/notifications

Purpose:

List notifications for logged-in user.

---

## PATCH /api/notifications/:id/read

Purpose:

Mark as read.

---

## POST /api/notifications/send

Purpose:

Send notification.

Admin/system only.

Request:

```json
{
  "user_id": "uuid",
  "channel": "whatsapp",
  "template": "payment_due",
  "data": {}
}
```

---

# 19. Analytics APIs

## GET /api/analytics/sales

Returns:

- Leads
- Conversion rate
- Revenue
- Source performance

---

## GET /api/analytics/projects

Returns:

- Active projects
- Delayed projects
- Completion percentage
- Risk summary

---

## GET /api/analytics/quality

Returns:

- Average quality score
- Failed checks
- Rework count
- Engineer performance

---

## GET /api/analytics/materials

Returns:

- Material order value
- Supplier performance
- Commission earned
- Delivery delay rate

---

# API Security Checklist

Every API must check:

- Authentication
- Authorization
- Input validation
- Rate limit where needed
- Audit logging for sensitive actions
- Project ownership
- File type safety
- Error handling

---

# API Development Priority

## Phase 1

- Auth
- Users
- Leads
- Projects
- Documents

## Phase 2

- BOQ
- Milestones
- Progress
- Issues
- Payments

## Phase 3

- Quality
- Materials
- Suppliers
- Purchase orders

## Phase 4

- Property Passport
- AI
- Partners
- Content

## Phase 5

- Rental
- Resale
- Advanced analytics
- Public APIs

---

# Final API Principle

Every API should support Buildogram's core promise:

**Make construction and property decisions visible, verifiable and controllable.**
