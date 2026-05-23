# BUILDOGRAM BACKEND SERVICE MAP

# Purpose

This document defines the backend service structure for Buildogram.

It converts API endpoints into internal business services so the backend does not become messy as the platform grows.

The backend must support:

- Public lead capture
- CRM
- Project management
- BOQ management
- Quality inspections
- Material marketplace
- Supplier coordination
- Property Passport
- AI tools
- Notifications
- Documents
- Payments
- Content/SEO
- Analytics

Core principle:

**Controllers should be thin. Business logic should live inside services.**

---

# Backend Architecture Style

Recommended starting model:

**Modular Monolith**

This means:

- One main application
- Multiple internal modules
- Clear service boundaries
- Shared database
- Shared auth
- Easy future extraction into microservices

Recommended future model:

**Service-Oriented Platform**

Future extracted services:

- AI Service
- Notification Service
- Media Processing Service
- Search Service
- Analytics Service
- Content Generation Service
- Material Marketplace Service

---

# Layer Structure

## 1. Route Handler / Controller Layer

Responsibilities:

- Receive request
- Validate input
- Check authentication
- Call service
- Return response

Should not contain deep business logic.

---

## 2. Service Layer

Responsibilities:

- Business rules
- Workflow logic
- Permission logic
- Entity coordination
- Event creation
- Transaction management

---

## 3. Repository / Data Access Layer

Responsibilities:

- Database queries
- Insert/update/delete
- Joins
- Filtering
- Pagination
- Raw SQL if needed

---

## 4. Integration Layer

Responsibilities:

- Email
- WhatsApp
- SMS
- Payment gateway
- AI model provider
- Storage provider
- Maps
- Analytics

---

## 5. Event / Job Layer

Responsibilities:

- Async notifications
- Report generation
- AI processing
- Media processing
- Reminder jobs
- SEO generation
- Data aggregation

---

# Recommended Module Structure

```txt
/modules
  /auth
    auth.service.ts
    auth.repository.ts
    auth.validation.ts
    auth.permissions.ts

  /users
    users.service.ts
    users.repository.ts
    users.validation.ts

  /crm
    leads.service.ts
    leads.repository.ts
    lead-scoring.service.ts
    followup.service.ts

  /projects
    projects.service.ts
    projects.repository.ts
    project-health.service.ts
    milestones.service.ts

  /boq
    boq.service.ts
    boq.repository.ts
    boq-versioning.service.ts
    boq-audit.service.ts

  /quality
    quality.service.ts
    quality.repository.ts
    quality-score.service.ts
    rework.service.ts

  /materials
    materials.service.ts
    suppliers.service.ts
    purchase-orders.service.ts
    material-verification.service.ts
    commissions.service.ts

  /documents
    documents.service.ts
    storage.service.ts
    media.service.ts

  /payments
    payments.service.ts
    invoices.service.ts
    payment-approval.service.ts

  /passport
    passport.service.ts
    passport-score.service.ts
    passport-share.service.ts
    passport-export.service.ts

  /ai
    ai-orchestrator.service.ts
    boq-ai.service.ts
    cost-ai.service.ts
    plan-ai.service.ts
    delay-ai.service.ts
    passport-ai.service.ts

  /partners
    partners.service.ts
    partner-verification.service.ts
    partner-performance.service.ts

  /content
    content.service.ts
    seo.service.ts
    schema.service.ts
    programmatic-pages.service.ts

  /notifications
    notifications.service.ts
    whatsapp.service.ts
    email.service.ts
    sms.service.ts

  /analytics
    analytics.service.ts
    reporting.service.ts

  /audit
    audit.service.ts
```

---

# Core Services

# 1. Auth Service

## Responsibilities

- Register user
- Login user
- Logout user
- Hash password
- Verify password
- Generate session/JWT
- Refresh session
- Get current user
- Enforce role access

## Key Functions

```ts
registerUser(input)
loginUser(input)
logoutUser(userId)
getCurrentUser(session)
refreshToken(token)
verifyPassword(password, hash)
generateAccessToken(user)
generateRefreshToken(user)
```

## Business Rules

- Phone or email must be unique.
- Password must be hashed.
- Suspended users cannot login.
- Tokens must expire.
- Internal user creation should be admin-only.

---

# 2. Permission Service

## Responsibilities

- Check role permission
- Check project ownership
- Check partner assignment
- Check supplier ownership
- Check customer access
- Check admin privileges

## Key Functions

```ts
can(user, permission)
canAccessProject(user, projectId)
canAccessLead(user, leadId)
canAccessPassport(user, passportId)
canManageMaterialRequest(user, requestId)
canApprovePayment(user, paymentId)
```

## Business Rules

- Customer can only see their own project.
- Site engineer can only see assigned projects.
- Contractor can only see assigned scope.
- Supplier can only see their own quotes/orders.
- Super admin can access everything.

---

# 3. Lead Service

## Responsibilities

- Create lead
- Assign lead
- Update lead status
- Add lead activity
- Score lead
- Schedule follow-up
- Convert lead to project
- Track source performance

## Key Functions

```ts
createLead(input)
assignLead(leadId, userId)
updateLeadStatus(leadId, status)
addLeadActivity(leadId, activity)
calculateLeadScore(leadId)
scheduleFollowup(leadId, date)
convertLeadToProject(leadId, projectInput)
```

## Business Rules

- Every lead must have source.
- Every qualified lead must have next follow-up.
- Lead conversion must create project record.
- Lost lead must have lost reason.
- Hot leads should trigger immediate notification.

---

# 4. Lead Scoring Service

## Responsibilities

Calculate lead score based on:

- Land ownership
- Budget clarity
- Timeline urgency
- BOQ availability
- Drawing availability
- Response speed
- Source quality
- Project value

## Score Ranges

- 80-100: Hot
- 60-79: Warm
- 40-59: Early
- Below 40: Low intent

## Key Functions

```ts
scoreLead(lead)
getLeadTemperature(score)
updateLeadScore(leadId)
```

---

# 5. Follow-Up Service

## Responsibilities

- Create follow-up reminders
- Notify sales team
- Mark overdue leads
- Move dormant leads
- Trigger nurture messages

## Key Functions

```ts
createFollowup(leadId, date)
getDueFollowups(userId)
markFollowupCompleted(followupId)
autoDormantLeads()
```

---

# 6. Project Service

## Responsibilities

- Create project
- Assign team
- Update project status
- Manage project summary
- Link customer
- Link BOQ
- Link milestones
- Calculate project health

## Key Functions

```ts
createProject(input)
assignProjectUser(projectId, userId, role)
updateProject(projectId, input)
getProjectDashboard(projectId)
getCustomerProjects(customerId)
archiveProject(projectId)
```

## Business Rules

- Every project must have customer.
- Active project must have PM.
- Active project must have site engineer.
- Completed project should trigger Property Passport completion.
- Customer should not see internal-only notes.

---

# 7. Project Health Service

## Responsibilities

Calculate:

- Progress score
- Quality score
- Budget score
- Schedule score
- Risk score

## Data Sources

- Milestones
- Progress logs
- Quality inspections
- Payments
- Issues
- Material deliveries
- AI predictions

## Key Functions

```ts
calculateProjectHealth(projectId)
createHealthSnapshot(projectId)
getHealthTrend(projectId)
```

---

# 8. Milestone Service

## Responsibilities

- Create milestones
- Update milestone status
- Track planned vs actual
- Link milestone to payment
- Link milestone to quality checks

## Key Functions

```ts
createMilestone(projectId, input)
updateMilestone(milestoneId, input)
completeMilestone(milestoneId)
getMilestoneTimeline(projectId)
```

## Business Rules

- Critical milestones should require quality approval.
- Payment milestone should not unlock without completion evidence.
- Customer should see milestone progress clearly.

---

# 9. BOQ Service

## Responsibilities

- Create BOQ version
- Add BOQ items
- Update BOQ items
- Calculate totals
- Lock approved BOQ
- Manage revisions
- Export BOQ

## Key Functions

```ts
createBOQVersion(projectId, input)
addBOQItem(versionId, item)
updateBOQItem(itemId, input)
calculateBOQTotal(versionId)
approveBOQ(versionId, userId)
supersedeBOQ(oldVersionId, newVersionId)
exportBOQPDF(versionId)
```

## Business Rules

- Approved BOQ cannot be edited.
- New changes must create new version.
- Customer approval must be recorded.
- Rate changes must be tracked.
- Missing item risks should be visible.

---

# 10. BOQ Audit Service

## Responsibilities

- Run rule-based BOQ checks
- Run AI BOQ checks
- Detect missing items
- Detect duplicate items
- Detect rate anomalies
- Detect quantity anomalies
- Generate trust score

## Key Functions

```ts
runBOQAudit(versionId)
detectMissingItems(versionId)
detectDuplicateItems(versionId)
compareRates(versionId)
generateBOQTrustScore(versionId)
```

---

# 11. Progress Service

## Responsibilities

- Create daily report
- Attach photos/videos
- Show customer-visible progress
- Generate weekly summaries
- Track progress percentage

## Key Functions

```ts
createProgressLog(projectId, input)
attachProgressMedia(logId, files)
getProgressTimeline(projectId)
generateWeeklyProgressSummary(projectId)
```

## Business Rules

- Daily report should be submitted by engineer.
- Customer sees only approved updates.
- Media should include timestamp and uploader.
- Missing reports should notify PM.

---

# 12. Quality Service

## Responsibilities

- Manage quality categories
- Manage checkpoints
- Create inspection
- Submit inspection
- Approve inspection
- Track failed checks
- Trigger rework
- Generate quality report

## Key Functions

```ts
createCheckpoint(input)
createInspection(projectId, input)
updateInspectionItem(itemId, result)
submitInspection(inspectionId)
approveInspection(inspectionId)
generateQualityReport(projectId)
```

## Business Rules

- Critical stage cannot proceed if critical check fails.
- Failed check must create issue.
- Rework must be verified.
- Customer-visible evidence should be controlled.

---

# 13. Quality Score Service

## Responsibilities

Calculate:

- Stage quality score
- Overall quality score
- Evidence completeness
- Critical failure count
- Rework count

## Key Functions

```ts
calculateStageScore(projectId, categoryId)
calculateOverallQualityScore(projectId)
calculateEvidenceCompleteness(projectId)
```

---

# 14. Rework Service

## Responsibilities

- Create rework from failed QC
- Assign contractor
- Track deadline
- Verify completion
- Update quality score

## Key Functions

```ts
createReworkIssue(inspectionItemId)
assignRework(issueId, contractorId)
verifyRework(issueId, evidence)
closeRework(issueId)
```

---

# 15. Issue Service

## Responsibilities

- Create issue
- Assign issue
- Update severity
- Track deadline
- Close issue
- Escalate issue

## Key Functions

```ts
createIssue(projectId, input)
assignIssue(issueId, userId)
updateIssueStatus(issueId, status)
escalateIssue(issueId)
closeIssue(issueId)
```

## Business Rules

- Critical issue should notify PM and founder.
- Customer-raised issue must be acknowledged within 24 hours.
- Closed issue should have resolution note.

---

# 16. Material Service

## Responsibilities

- Manage material catalog
- Create material request
- Compare supplier quotes
- Recommend supplier
- Track material demand

## Key Functions

```ts
createMaterialRequest(input)
getMaterialCatalog(filters)
compareSupplierQuotes(requestId)
recommendSupplier(requestId)
```

---

# 17. Supplier Service

## Responsibilities

- Create supplier
- Verify supplier
- Manage supplier categories
- Track supplier performance
- Supplier quote submission

## Key Functions

```ts
createSupplier(input)
verifySupplier(supplierId)
submitSupplierQuote(requestId, quote)
calculateSupplierPerformance(supplierId)
```

---

# 18. Purchase Order Service

## Responsibilities

- Create PO
- Approve PO
- Send PO to supplier
- Track status
- Close PO

## Key Functions

```ts
createPurchaseOrder(input)
approvePurchaseOrder(poId)
updatePOStatus(poId, status)
closePurchaseOrder(poId)
```

## Business Rules

- PO must be linked to supplier.
- PO should store agreed rate.
- PO should be linked to material request.
- Delivery should be matched against PO.

---

# 19. Material Verification Service

## Responsibilities

- Record delivery
- Verify brand
- Verify grade
- Verify quantity
- Upload invoice
- Upload test certificate
- Accept/reject delivery

## Key Functions

```ts
recordDelivery(input)
verifyMaterialDelivery(deliveryId, input)
rejectMaterialDelivery(deliveryId, reason)
createReplacementRequest(deliveryId)
```

---

# 20. Commission Service

## Responsibilities

- Calculate supplier commission
- Calculate brother shop commission
- Track commission status
- Mark commission paid
- Generate commission report

## Key Functions

```ts
calculateMaterialCommission(poId)
recordCommission(input)
markCommissionPaid(commissionId)
getCommissionSummary(filters)
```

---

# 21. Document Service

## Responsibilities

- Upload document
- Store metadata
- Control visibility
- Link document to entity
- Soft delete document
- Generate signed URLs

## Key Functions

```ts
uploadDocument(file, metadata)
getProjectDocuments(projectId)
updateDocumentVisibility(documentId, visibility)
softDeleteDocument(documentId)
generateSignedUrl(documentId)
```

## Business Rules

- Sensitive documents should not be public by default.
- Deleted documents should be soft-deleted.
- Document deletion should be audited.

---

# 22. Media Service

## Responsibilities

- Upload image/video
- Compress image
- Generate thumbnail
- Store GPS metadata
- Link media to progress/quality/material/passport

## Key Functions

```ts
uploadMedia(file, metadata)
generateThumbnail(mediaId)
compressImage(mediaId)
linkMediaToEntity(mediaId, entityType, entityId)
```

---

# 23. Payment Service

## Responsibilities

- Create payment milestone
- Track due payments
- Mark paid
- Upload invoice
- Upload receipt
- Trigger payment reminder

## Key Functions

```ts
createPayment(projectId, input)
markPaymentPaid(paymentId, input)
getProjectPayments(projectId)
getOverduePayments()
```

---

# 24. Payment Approval Service

## Responsibilities

- Check milestone completion
- Check quality status
- Approve payment request
- Notify customer

## Key Functions

```ts
requestPaymentApproval(paymentId)
approvePayment(paymentId, userId)
rejectPayment(paymentId, reason)
```

## Business Rules

- Payment should not be requested before milestone evidence.
- Critical failed QC should block payment approval.
- Approval should be audited.

---

# 25. Property Passport Service

## Responsibilities

- Create passport
- Link project data
- Add lifecycle events
- Add documents
- Add material records
- Add quality records
- Generate trust score
- Export report

## Key Functions

```ts
createPassport(projectId)
getPassport(passportId)
syncProjectDataToPassport(projectId)
addLifecycleEvent(passportId, event)
generatePassportReport(passportId)
```

## Business Rules

- Completed Buildogram project should have passport.
- Sensitive records should remain private.
- Passport should preserve historical records.

---

# 26. Passport Score Service

## Responsibilities

Calculate Property Trust Score.

Inputs:

- Document completeness
- BOQ records
- Material records
- Quality records
- Media evidence
- Warranty records
- Maintenance records

## Key Functions

```ts
calculatePassportScore(passportId)
getScoreBreakdown(passportId)
```

---

# 27. Passport Share Service

## Responsibilities

- Create share link
- Configure visibility
- Expire share link
- Track views

## Key Functions

```ts
createShareLink(passportId, config)
getPublicPassport(shareCode)
revokeShareLink(shareCode)
```

---

# 28. AI Orchestrator Service

## Responsibilities

- Receive AI request
- Identify module
- Fetch required context
- Call AI provider
- Validate output
- Store AI request/response
- Return structured result

## Key Functions

```ts
runAIRequest(module, input, user)
getProjectContext(projectId)
storeAIResponse(input, response)
```

---

# 29. AI BOQ Service

## Responsibilities

- Analyze BOQ
- Detect risk
- Summarize audit
- Store audit

## Key Functions

```ts
auditBOQ(versionId)
extractBOQFromFile(file)
compareBOQToBenchmarks(versionId)
```

---

# 30. AI Cost Service

## Responsibilities

- Estimate cost
- Generate category split
- Estimate timeline
- Show assumptions

## Key Functions

```ts
estimateConstructionCost(input)
generateCostBreakdown(input)
```

---

# 31. AI Plan Service

## Responsibilities

- Review floor plan
- Summarize design issues
- Score ventilation/space usage
- Suggest improvements

## Key Functions

```ts
reviewPlan(file)
generatePlanReviewReport(planId)
```

---

# 32. AI Delay Service

## Responsibilities

- Predict delay
- Explain reasons
- Recommend actions

## Key Functions

```ts
predictDelay(projectId)
getDelayRiskFactors(projectId)
```

---

# 33. Notification Service

## Responsibilities

- Create in-app notification
- Send WhatsApp
- Send email
- Send SMS
- Use templates
- Track delivery

## Key Functions

```ts
notifyUser(userId, message)
sendWhatsApp(phone, template, data)
sendEmail(email, template, data)
sendSMS(phone, message)
```

---

# 34. Content Service

## Responsibilities

- Create page
- Update page
- Publish page
- Manage FAQs
- Manage SEO metadata
- Generate sitemap

## Key Functions

```ts
createContentPage(input)
updateContentPage(pageId, input)
publishContentPage(pageId)
generateSitemap()
```

---

# 35. SEO Service

## Responsibilities

- Generate meta tags
- Generate schema
- Manage canonical URL
- Create internal links
- Track page status

## Key Functions

```ts
generateSEOMetadata(pageId)
generateSchemaMarkup(pageId)
createInternalLinks(pageId)
```

---

# 36. Programmatic Page Service

## Responsibilities

- Generate location pages
- Generate cost pages
- Generate material pages
- Generate house plan pages
- Avoid duplicate/thin pages

## Key Functions

```ts
generateLocationPages(city, locations)
generateCostPages(city, sizes)
generateMaterialPages(city, materials)
validatePageUniqueness(pageInput)
```

---

# 37. Partner Service

## Responsibilities

- Create partner profile
- Verify partner
- Assign leads
- Track performance
- Manage partner tier

## Key Functions

```ts
createPartner(input)
verifyPartner(partnerId)
assignLeadToPartner(leadId, partnerId)
calculatePartnerPerformance(partnerId)
updatePartnerTier(partnerId)
```

---

# 38. Analytics Service

## Responsibilities

Generate metrics for:

- Sales
- Projects
- Quality
- Materials
- Finance
- Partners
- Content

## Key Functions

```ts
getSalesAnalytics(filters)
getProjectAnalytics(filters)
getQualityAnalytics(filters)
getMaterialAnalytics(filters)
getPartnerAnalytics(filters)
```

---

# 39. Audit Service

## Responsibilities

- Store audit log
- Retrieve audit logs
- Track before/after values
- Track actor and IP

## Key Functions

```ts
logAction(actorId, action, entityType, entityId, oldValue, newValue)
getAuditLogs(filters)
```

---

# Background Jobs

# Job 1: Follow-Up Reminder Job

Runs:

Every hour.

Responsibilities:

- Find due follow-ups
- Notify sales user
- Mark overdue follow-ups

---

# Job 2: Daily Site Report Reminder

Runs:

Every day evening.

Responsibilities:

- Find active projects without daily report
- Notify engineer
- Notify PM if overdue

---

# Job 3: Weekly Customer Report Job

Runs:

Weekly.

Responsibilities:

- Generate project summary
- Send to customer
- Store in project record

---

# Job 4: Payment Due Reminder Job

Runs:

Daily.

Responsibilities:

- Find upcoming payments
- Notify customer
- Notify finance

---

# Job 5: Quality Rework Reminder Job

Runs:

Daily.

Responsibilities:

- Find open rework issues
- Notify contractor
- Notify PM for overdue

---

# Job 6: Material Delivery Reminder Job

Runs:

Daily.

Responsibilities:

- Find upcoming deliveries
- Notify engineer
- Notify supplier

---

# Job 7: Passport Sync Job

Runs:

Nightly.

Responsibilities:

- Sync completed project records to Property Passport
- Update passport score
- Create lifecycle events

---

# Job 8: SEO Sitemap Job

Runs:

Daily.

Responsibilities:

- Generate sitemap
- Update last modified dates
- Validate published pages

---

# Event System

Use internal events to decouple workflows.

## Important Events

```txt
lead.created
lead.assigned
lead.converted
project.created
project.milestone.completed
boq.approved
quality.failed
quality.rework.completed
material.request.created
material.delivered
payment.due
payment.paid
passport.created
passport.shared
ai.audit.completed
```

---

# Event Examples

## Event: quality.failed

Triggered when:

Quality inspection item result is fail.

Actions:

- Create issue
- Notify contractor
- Notify PM
- Update quality score
- Show customer if customer_visible is true

---

## Event: material.delivered

Triggered when:

Engineer records material delivery.

Actions:

- Update PO status
- Create material record
- Sync to Property Passport
- Notify PM/customer if visible
- Calculate supplier performance

---

## Event: boq.approved

Triggered when:

Customer/admin approves BOQ.

Actions:

- Lock BOQ version
- Create audit log
- Notify PM
- Update project status
- Add passport lifecycle event

---

# Transaction Rules

Use database transaction for:

- Lead conversion to project
- BOQ version creation with items
- Quality inspection submission
- Material quote selection + PO creation
- Payment approval
- Property Passport creation
- Project completion

---

# Error Handling

Common error codes:

```txt
AUTH_REQUIRED
FORBIDDEN
VALIDATION_ERROR
NOT_FOUND
DUPLICATE_RECORD
INVALID_STATUS_TRANSITION
FILE_UPLOAD_FAILED
PAYMENT_APPROVAL_BLOCKED
QUALITY_CHECK_FAILED
BOQ_ALREADY_APPROVED
```

---

# Service Testing Strategy

Every service should have tests for:

- Happy path
- Validation failure
- Permission failure
- Status transition failure
- Database error
- Audit log creation
- Notification trigger

---

# Final Backend Principle

The backend should not simply store data.

It should enforce Buildogram's operating discipline:

- No unclear lead
- No unmanaged project
- No unapproved BOQ
- No unsupported payment request
- No invisible quality failure
- No unverified material delivery
- No property without permanent records

That is how software becomes the operating system of Buildogram.
