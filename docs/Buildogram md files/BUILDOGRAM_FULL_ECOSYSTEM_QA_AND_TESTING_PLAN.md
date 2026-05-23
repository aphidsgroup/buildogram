# BUILDOGRAM FULL ECOSYSTEM QA AND TESTING PLAN

# Purpose

This document defines the complete QA and testing plan for the Buildogram full ecosystem platform.

It is designed for:

- Founder/product owner
- Project manager
- Developers
- QA tester
- Operations team
- Sales team
- Customer support
- External implementation partners

This is not only a technical bug checklist.

It is a full ecosystem testing plan to make sure Buildogram works across:

- Public website
- Lead forms
- CRM
- Auth and roles
- Construction projects
- BOQ/advisory
- BQS quality system
- Material marketplace
- Partner ecosystem
- Property Registry
- Property Passport
- 360 rental/resale listings
- Maintenance/warranty
- Finance
- Analytics
- AI workflows
- Notifications
- Security
- Production launch

Core principle:

**Buildogram should not go live only because pages are built. It should go live only when leads, records, roles, workflows, evidence and follow-ups work correctly.**

---

# QA Philosophy

Buildogram is an operations-heavy platform.

Testing should verify:

1. Can the user complete the action?
2. Is the correct data stored?
3. Can the correct internal team see it?
4. Are unauthorized users blocked?
5. Is the next business action clear?
6. Is the workflow useful for actual operations?
7. Is the output safe for customer trust?

A feature is not complete until it works for the business workflow.

---

# Testing Levels

Buildogram QA should happen at 8 levels:

1. Unit testing
2. API testing
3. Database testing
4. UI testing
5. Role-based access testing
6. Workflow testing
7. UAT/business testing
8. Production readiness testing

---

# Testing Environments

## Local

Used by developers for feature-level testing.

## Staging

Used by QA, founder and operations team before release.

## Production

Live customer environment.

Rules:

- Never test destructive flows directly in production.
- Use staging for full flow testing.
- Keep demo users for each role.
- Keep demo project/property/partner records for testing.

---

# Test User Roles

Create test users for:

- super_admin
- ops_admin
- sales_user
- project_manager
- site_engineer
- customer
- partner
- supplier
- property_owner
- finance_user
- content_user

Each role should be tested separately.

---

# Global Acceptance Criteria

Every feature must pass:

- [ ] Page loads without error
- [ ] Mobile view is usable
- [ ] Form validation works
- [ ] Required fields are enforced
- [ ] Data saves correctly
- [ ] Data appears in correct dashboard
- [ ] Unauthorized role cannot access
- [ ] Error message is clear
- [ ] Empty state is clear
- [ ] Loading state exists
- [ ] Audit log is created where required
- [ ] File/media access is secure
- [ ] Business next step is clear

---

# SECTION 1: PUBLIC WEBSITE QA

# Pages To Test

- [ ] Home
- [ ] About
- [ ] Construction
- [ ] BOQ Audit
- [ ] Plan Review
- [ ] Materials
- [ ] Property Passport
- [ ] 360 Properties
- [ ] Rent
- [ ] Buy
- [ ] Partners
- [ ] Maintenance
- [ ] AI Tools
- [ ] Contact
- [ ] Blog/Learn pages
- [ ] Locality pages

---

## Public Website Test Cases

| Test Case | Expected Result |
|---|---|
| Open each public page | Page loads without error |
| Open on mobile | Layout does not break |
| Open on tablet | Layout remains readable |
| Click main navigation | Correct page opens |
| Click footer links | Correct page opens |
| Click WhatsApp CTA | WhatsApp link opens correctly |
| Click phone CTA | Phone link works |
| Click contact CTA | Form or contact section opens |
| Submit empty form | Validation appears |
| Submit valid form | Lead is created |
| Check SEO title | Page has correct title |
| Check meta description | Page has correct description |
| Check Open Graph | Social preview works |
| Check sitemap | Page is included |
| Check broken links | No broken internal links |

---

# SECTION 2: LEAD FORM QA

# Lead Forms

- Construction consultation
- BOQ upload
- Plan review
- Material quote
- Partner application
- Property listing
- Property Passport request
- Maintenance request
- General contact

---

## Lead Form Test Cases

| Test Case | Expected Result |
|---|---|
| Submit form with required fields | Lead created in CRM |
| Submit form without name | Validation error |
| Submit invalid phone | Validation error |
| Submit invalid email | Validation error |
| Submit with file upload | File saved and linked |
| Submit without optional file | Lead still created |
| Submit from mobile | Lead created correctly |
| Submit duplicate phone | System handles duplicate logically |
| Submit special characters | System sanitizes safely |
| Submit very long message | System handles or limits safely |
| Check lead type | Correct lead type stored |
| Check source page | Correct source stored |
| Check lead status | Default status is new |
| Check assigned owner | Assignment rule works or remains unassigned |
| Check thank-you message | Correct message displayed |

---

# SECTION 3: AUTHENTICATION QA

## Auth Test Cases

| Test Case | Expected Result |
|---|---|
| Login with valid credentials | User enters dashboard |
| Login with wrong password | Error shown |
| Login with unknown email | Error shown |
| Logout | Session cleared |
| Open dashboard after logout | Redirect to login |
| Inactive user login | Access blocked |
| Expired session | Redirect to login |
| Refresh dashboard | Session persists if valid |
| Direct protected URL access | Unauthorized user blocked |
| Login role redirect | User lands on correct dashboard |

---

# SECTION 4: ROLE-BASED ACCESS QA

## Access Matrix

| Module | Super Admin | Ops Admin | Sales | PM | Engineer | Customer | Partner | Supplier | Finance | Content |
|---|---|---|---|---|---|---|---|---|---|---|
| Users | Full | Limited | No | No | No | No | No | No | No | No |
| CRM | Full | Full | Own/Assigned | View linked | No | No | No | No | Finance view | No |
| Projects | Full | Full | View linked | Full assigned | Assigned | Own | No | No | Finance view | No |
| BOQ | Full | Full | View | Full | View | Own view | No | No | Finance view | No |
| Quality | Full | Full | No | Full | Assigned | Own summary | No | No | No | No |
| Materials | Full | Full | View | View | View | Own related | Partner linked | Supplier own | Finance view | No |
| Partners | Full | Full | View | No | No | No | Own | No | Finance view | Content view |
| Properties | Full | Full | View | View linked | View linked | Own | No | No | Finance view | Content view |
| Passport | Full | Full | View | View linked | View linked | Own | No | No | Finance view | No |
| Finance | Full | Limited | No | No | No | No | No | No | Full | No |
| Content | Full | Limited | No | No | No | No | No | No | No | Full |

---

## RBAC Test Cases

- [ ] Sales user cannot access user management
- [ ] Customer cannot access CRM
- [ ] Partner cannot access other partner data
- [ ] Supplier cannot access customer project data
- [ ] Engineer can only access assigned projects
- [ ] Finance user can view revenue but not edit construction quality
- [ ] Content user can access content tools only
- [ ] API blocks unauthorized access even if URL is manually entered
- [ ] UI hides unauthorized menu items
- [ ] Direct API call with unauthorized token fails

---

# SECTION 5: CRM QA

## CRM Features To Test

- Lead list
- Lead detail
- Filters
- Lead status
- Assignment
- Notes
- Follow-ups
- Files
- Lost reason
- Conversion actions
- Export

---

## CRM Test Cases

| Test Case | Expected Result |
|---|---|
| New lead appears in CRM | Lead visible with correct data |
| Filter by lead type | Only matching leads show |
| Filter by status | Only matching status shows |
| Assign lead owner | Owner updated |
| Add note | Note appears in history |
| Add follow-up | Follow-up saved |
| Change status | Status updates |
| Mark lost | Lost reason required |
| Upload lead file | File linked |
| Convert lead to project | Project created and linked |
| Convert lead to partner | Partner created and linked |
| Convert lead to material request | Material request created |
| Convert lead to property | Property record created |
| Export leads | CSV/export generated correctly |

---

# SECTION 6: PROJECT MANAGEMENT QA

## Project Test Cases

| Test Case | Expected Result |
|---|---|
| Create project manually | Project saved |
| Create project from lead | Project linked to lead |
| Assign customer | Customer can see project |
| Assign PM | PM can manage project |
| Assign engineer | Engineer can submit logs |
| Add milestone | Milestone appears in timeline |
| Update milestone status | Status changes correctly |
| Add budget | Budget saved |
| Add project location | Location saved |
| Link property | Property link visible |
| Archive/close project | Status updates without deleting data |

---

# SECTION 7: CUSTOMER PORTAL QA

## Customer Portal Test Cases

| Test Case | Expected Result |
|---|---|
| Customer login | Sees own dashboard |
| View active project | Only own project visible |
| View documents | Only customer-visible docs shown |
| View progress logs | Only approved visible logs shown |
| View issues | Customer-visible issues shown |
| View quality summary | Summary shown, not internal notes |
| Direct access another project URL | Access blocked |
| Download document | Works only if allowed |
| Mobile dashboard | Usable on phone |

---

# SECTION 8: DOCUMENT AND FILE UPLOAD QA

## File Types To Test

- PDF
- JPG
- PNG
- WebP
- MP4
- DOC/DOCX if allowed
- XLS/XLSX if allowed

---

## File Upload Test Cases

| Test Case | Expected Result |
|---|---|
| Upload valid PDF | File stored |
| Upload image | Image stored |
| Upload large file | System handles limit |
| Upload unsupported file | Error shown |
| Upload empty file | Error shown |
| Upload file to lead | File linked to lead |
| Upload file to project | File linked to project |
| Upload file to property | File linked to property |
| Customer accesses allowed file | File opens |
| Unauthorized user accesses file URL | Access blocked |
| Delete file if allowed | File removed or archived |
| File metadata stored | Name/type/size/uploader saved |

---

# SECTION 9: PROGRESS LOG QA

## Progress Log Test Cases

| Test Case | Expected Result |
|---|---|
| Engineer submits log | Log saved |
| Upload photos | Photos saved |
| Upload video | Video saved if supported |
| Add worker count | Saved |
| Add material used | Saved |
| Add site notes | Saved |
| Mark customer visible | Appears in customer portal |
| Mark internal only | Hidden from customer |
| PM approves log | Approval status updated |
| Edit own draft log | Allowed if draft |
| Edit approved log | Controlled/restricted |

---

# SECTION 10: ISSUE TRACKING QA

## Issue Test Cases

| Test Case | Expected Result |
|---|---|
| Create issue | Issue saved |
| Add severity | Severity shown |
| Assign owner | Owner notified/visible |
| Add due date | Due date saved |
| Add comment | Comment appears |
| Upload issue media | Media linked |
| Change status | Status history updated |
| Close issue | Resolution required |
| Reopen issue | Status returns to open |
| Customer-visible issue | Shows in customer portal only if allowed |

---

# SECTION 11: BOQ AND ADVISORY QA

## BOQ Review Test Cases

| Test Case | Expected Result |
|---|---|
| Upload BOQ from public form | BOQ lead created |
| Convert lead to BOQ review | Review record created |
| Assign reviewer | Reviewer can access |
| Add missing item | Finding saved |
| Add risk note | Risk saved |
| Add final summary | Report saved |
| Mark review complete | Status updates |
| Customer report view/export | Final reviewed output shown |
| Internal notes hidden | Customer cannot see internal notes |

---

## BOQ Project Module Test Cases

| Test Case | Expected Result |
|---|---|
| Create BOQ version | Version saved |
| Add BOQ item | Item saved |
| Add quantity/rate | Amount calculated |
| Edit item | Total recalculates |
| Approve BOQ version | Status approved |
| Lock approved version | Editing blocked |
| Create new version | Old version remains |
| Compare versions | Difference visible |

---

# SECTION 12: BQS QUALITY QA

## Quality Template Test Cases

| Test Case | Expected Result |
|---|---|
| Create template | Template saved |
| Add checklist item | Item saved |
| Add evidence requirement | Requirement saved |
| Add severity | Severity saved |
| Assign template to stage | Template available for inspection |

---

## Quality Inspection Test Cases

| Test Case | Expected Result |
|---|---|
| Start inspection | Inspection created |
| Mark pass | Item saved as pass |
| Mark fail | Item saved as fail |
| Upload evidence | Evidence linked |
| Add engineer note | Note saved |
| Fail critical item | Issue auto-created |
| Submit inspection | Score calculated |
| Customer summary visible | Only approved summary shown |
| Internal QC notes hidden | Customer cannot see internal notes |

---

# SECTION 13: MATERIAL MARKETPLACE QA

## Material Catalog Test Cases

| Test Case | Expected Result |
|---|---|
| Create category | Category saved |
| Create material | Material saved |
| Add brand/spec | Data saved |
| Search material | Correct results |
| Deactivate material | Hidden from active list |

---

## Material Request Test Cases

| Test Case | Expected Result |
|---|---|
| Submit material quote form | Material lead/request created |
| Add multiple items | Items saved |
| Assign coordinator | Owner updated |
| Add delivery location | Saved |
| Add preferred brand | Saved |
| Update request status | Status changes |
| Link to project/property | Link works |

---

## Supplier Quote And PO Test Cases

| Test Case | Expected Result |
|---|---|
| Add supplier | Supplier saved |
| Add supplier quote | Quote saved |
| Add quote items | Items saved |
| Compare quotes | Comparison shown |
| Select supplier | Supplier marked selected |
| Create PO | PO generated |
| Add delivery status | Status updated |
| Add commission | Commission recorded |

---

# SECTION 14: PARTNER ECOSYSTEM QA

## Partner Test Cases

| Test Case | Expected Result |
|---|---|
| Submit partner application | Partner lead created |
| Convert lead to partner | Partner record created |
| Add partner category | Category saved |
| Add service areas | Saved |
| Upload portfolio | Media linked |
| Add verification status | Status updated |
| Publish public profile | Profile page visible |
| Unpublish profile | Profile hidden |
| Partner login | Partner sees own dashboard |
| Partner accesses other partner | Access blocked |

---

# SECTION 15: PROPERTY REGISTRY QA

## Property Test Cases

| Test Case | Expected Result |
|---|---|
| Create property | Property saved |
| Link property owner | Owner linked |
| Add location | Location saved |
| Add area details | Area saved |
| Link project | Project link visible |
| Link lead | Lead source visible |
| Update verification status | Status changes |
| Search property | Correct property appears |
| Owner login | Owner sees own property only |

---

# SECTION 16: PROPERTY PASSPORT QA

## Passport Test Cases

| Test Case | Expected Result |
|---|---|
| Create Passport | Passport linked to property |
| Add documents | Section completion updates |
| Link BOQ | BOQ section updates |
| Link material records | Material section updates |
| Link quality records | Quality section updates |
| Link progress media | Media section updates |
| Link maintenance records | Maintenance section updates |
| Completion score calculates | Score updates correctly |
| Customer/owner view | Only permitted records shown |
| Share link if available | Access works with permission |
| Missing sections shown | Owner sees what is incomplete |

---

# SECTION 17: 360 RENTAL/RESALE QA

## 360 Tour Test Cases

| Test Case | Expected Result |
|---|---|
| Add tour URL | Tour saved |
| Embed tour | Tour displays |
| Link to property | Link works |
| Link to listing | Listing shows tour |
| Link to Passport | Passport shows tour reference |
| Invalid tour URL | Error/validation shown |

---

## Rental Listing Test Cases

| Test Case | Expected Result |
|---|---|
| Create rental listing | Listing saved |
| Add rent/deposit | Values saved |
| Add amenities | Amenities shown |
| Publish listing | Public page visible |
| Submit tenant inquiry | CRM lead created |
| Unpublish listing | Public page hidden |
| Add 360 tour | Tour visible |
| Owner view listing | Owner sees own listing |

---

## Resale Listing Test Cases

| Test Case | Expected Result |
|---|---|
| Create resale listing | Listing saved |
| Add asking price | Saved |
| Add document status | Saved |
| Add property condition | Saved |
| Publish listing | Public page visible |
| Submit buyer inquiry | CRM lead created |
| Show Passport summary | Summary visible if allowed |
| Unpublish listing | Public page hidden |

---

# SECTION 18: MAINTENANCE AND WARRANTY QA

## Maintenance Test Cases

| Test Case | Expected Result |
|---|---|
| Submit maintenance request | Request created |
| Add issue category | Saved |
| Add urgency | Saved |
| Assign vendor | Vendor linked |
| Add quote | Quote saved |
| Upload before photo | Photo saved |
| Upload after photo | Photo saved |
| Close request | Closure notes required |
| Customer rating | Rating saved |
| Passport sync | Maintenance record appears in Passport |

---

## Warranty Test Cases

| Test Case | Expected Result |
|---|---|
| Create warranty record | Warranty saved |
| Link to project/property | Link works |
| Submit warranty claim | Claim created |
| Assign claim owner | Owner updated |
| Resolve claim | Resolution saved |
| Show warranty history | Passport/project shows history |

---

# SECTION 19: FINANCE QA

## Finance Test Cases

| Test Case | Expected Result |
|---|---|
| Create revenue record | Revenue saved |
| Select revenue stream | Correct stream saved |
| Link revenue to lead/project | Link works |
| Record payment | Payment saved |
| Mark collected | Collection status updated |
| Add commission record | Commission saved |
| View revenue dashboard | Totals shown correctly |
| Filter by date | Correct filtered totals |
| Finance-only access | Unauthorized users blocked |

---

# SECTION 20: ANALYTICS QA

## Analytics Test Cases

| Test Case | Expected Result |
|---|---|
| Founder dashboard loads | Key metrics visible |
| Sales dashboard loads | Lead metrics visible |
| Project dashboard loads | Project metrics visible |
| Quality dashboard loads | Quality metrics visible |
| Material dashboard loads | Material metrics visible |
| Partner dashboard loads | Partner metrics visible |
| Property dashboard loads | Listing/passport metrics visible |
| Finance dashboard loads | Revenue metrics visible |
| Date filter applied | Metrics update |
| Empty data state | Clear empty message |

---

# SECTION 21: AI QA

## AI Infrastructure Test Cases

| Test Case | Expected Result |
|---|---|
| Create AI request | Request logged |
| Store input JSON | Input saved |
| Store output JSON | Output saved |
| Prompt version stored | Version visible |
| Risk level stored | Risk visible |
| Human review required | Review workflow triggered |
| Reviewer approves | Final output saved |
| Reviewer edits | Edited output saved |
| Reviewer rejects | Rejection reason stored |

---

## AI Tool Test Cases

Test each AI module with:

- Complete input
- Incomplete input
- Unrealistic input
- High-risk input
- Very long input
- Tamil/Thanglish input if supported

AI modules:

- Cost Estimator
- BOQ Auditor
- Plan Review Assistant
- Material Advisor
- Project Summary Generator
- Delay Predictor
- Quality Risk Detector
- Property Passport Assistant
- Rental Readiness Checker
- Resale Readiness Checker
- Maintenance Advisor
- Partner Profile Generator
- Content/Reels Assistant
- CRM Lead Scorer
- Founder Insight Generator

---

## AI Safety Test Cases

| Test Case | Expected Result |
|---|---|
| BOQ AI output | Human review required |
| Plan review output | Disclaimer present |
| Cost estimate output | Not shown as final quotation |
| Legal/property output | Legal disclaimer present |
| Structural concern | Does not certify safety |
| Maintenance issue | Does not give unsafe repair steps |
| Content output | Does not exaggerate claims |
| Partner profile | Does not invent achievements |

---

# SECTION 22: NOTIFICATION QA

## Notification Test Cases

| Trigger | Expected Notification |
|---|---|
| New lead submitted | Sales/admin notified |
| Lead assigned | Owner notified |
| Follow-up due | Sales notified |
| Project progress added | PM notified |
| QC failed | PM/admin notified |
| Material request submitted | Material coordinator notified |
| Partner application submitted | Partner team notified |
| Property inquiry submitted | Property team notified |
| Maintenance request submitted | Maintenance owner notified |
| Payment due | Finance/PM notified |

---

# SECTION 23: SECURITY QA

## Security Checklist

- [ ] Passwords hashed
- [ ] JWT/session securely signed
- [ ] Cookies secure/httpOnly where applicable
- [ ] API authorization checked
- [ ] File access protected
- [ ] Customer data isolation tested
- [ ] Partner data isolation tested
- [ ] Supplier data isolation tested
- [ ] Input validation applied
- [ ] SQL injection protection verified
- [ ] XSS protection checked
- [ ] CSRF strategy reviewed
- [ ] Rate limiting for login/forms considered
- [ ] Audit logs created for sensitive actions
- [ ] Secrets not exposed in frontend
- [ ] Error messages do not leak sensitive data

---

# SECTION 24: PERFORMANCE QA

## Performance Test Cases

- [ ] Homepage loads fast on mobile
- [ ] Dashboard loads within acceptable time
- [ ] Lead list pagination works
- [ ] Project list pagination works
- [ ] Large file upload handled gracefully
- [ ] Image optimization works
- [ ] Analytics queries are not too slow
- [ ] Database indexes exist for common filters
- [ ] Search/filter does not freeze UI
- [ ] Public pages pass basic Core Web Vitals review

---

# SECTION 25: MOBILE QA

Test all major flows on mobile:

- [ ] Public website navigation
- [ ] All lead forms
- [ ] Cost calculator
- [ ] Login
- [ ] Admin lead view
- [ ] Customer dashboard
- [ ] Engineer progress log form
- [ ] Engineer quality inspection form
- [ ] Partner profile view
- [ ] Property listing view
- [ ] Maintenance request form

---

# SECTION 26: BROWSER QA

Test on:

- [ ] Chrome
- [ ] Edge
- [ ] Firefox
- [ ] Safari if possible
- [ ] Android Chrome
- [ ] iPhone Safari if possible

---

# SECTION 27: LAUNCH QA CHECKLIST

Before launch:

- [ ] All public pages tested
- [ ] All lead forms tested
- [ ] CRM receives leads
- [ ] Admin login works
- [ ] Role access tested
- [ ] WhatsApp CTA works
- [ ] Phone CTA works
- [ ] Google Analytics/Search Console installed
- [ ] Sitemap submitted
- [ ] Robots.txt verified
- [ ] Privacy policy live
- [ ] Terms page live
- [ ] Contact details correct
- [ ] No placeholder text visible
- [ ] No broken links
- [ ] Mobile check passed
- [ ] First content/blog pages live
- [ ] Test leads deleted or marked test
- [ ] Backup configured
- [ ] Production environment variables verified

---

# SECTION 28: UAT CHECKLIST

Business users should test realistic scenarios.

## Scenario 1: Construction Lead

- User visits construction page
- Submits consultation form
- Lead appears in CRM
- Sales calls and updates note
- Follow-up added
- Lead converted to project
- Project appears in admin

## Scenario 2: BOQ Review

- User submits BOQ file
- Lead appears as BOQ audit
- Reviewer assigned
- Findings added
- Final report saved

## Scenario 3: Material Quote

- User requests cement/steel quote
- Material request created
- Coordinator adds quote
- Commission tracked

## Scenario 4: Partner Application

- Contractor submits partner form
- Lead appears
- Converted to partner
- Verification status updated
- Public profile published

## Scenario 5: Property Listing

- Owner submits rental/resale listing
- Property created
- Tour linked
- Listing published
- Inquiry creates CRM lead

## Scenario 6: Property Passport

- Property created
- Passport created
- Documents uploaded
- BOQ/material/quality linked
- Completion score shown

## Scenario 7: Maintenance

- Owner submits maintenance request
- Vendor assigned
- Before/after proof uploaded
- Request closed
- Passport updated

---

# SECTION 29: DEFECT PRIORITY

## P0 Critical

Production-breaking issue.

Examples:

- Login broken
- Lead forms not saving
- Data leak
- Payment/revenue data wrong
- Customer sees another customer's data
- File access exposed
- Site down

Fix before release.

---

## P1 High

Major workflow broken.

Examples:

- CRM status not updating
- File upload failing
- Project creation broken
- Role access incorrect
- Customer portal broken

Fix before release if related to launch scope.

---

## P2 Medium

Important but workaround exists.

Examples:

- Filter issue
- UI alignment issue
- Non-critical validation issue
- Report formatting issue

Can release with known workaround if approved.

---

## P3 Low

Minor improvement.

Examples:

- Text spacing
- Icon alignment
- Minor copy issue
- Non-blocking enhancement

Can go to backlog.

---

# SECTION 30: QA SIGN-OFF TEMPLATE

## Release Name

```txt
Buildogram Full Ecosystem Release: ___________
```

## Tested By

```txt
QA Name:
Product Owner:
Developer:
Operations Reviewer:
```

## Modules Tested

- [ ] Public website
- [ ] Lead forms
- [ ] CRM
- [ ] Auth/RBAC
- [ ] Projects
- [ ] BOQ
- [ ] BQS
- [ ] Materials
- [ ] Partners
- [ ] Properties
- [ ] Passport
- [ ] Listings
- [ ] Maintenance
- [ ] Finance
- [ ] Analytics
- [ ] AI
- [ ] Notifications
- [ ] Security
- [ ] Mobile

## Open Issues

| ID | Issue | Priority | Owner | Status |
|---|---|---|---|---|

## Release Decision

- [ ] Approved for release
- [ ] Approved with known issues
- [ ] Not approved

## Notes

```txt
Final notes:
```

---

# Final QA Principle

Buildogram is a trust platform.

A bug is not only a technical issue.

A bug can damage:

- Customer trust
- Project clarity
- Partner confidence
- Material commission tracking
- Property record accuracy
- Founder control

Final statement:

**If Buildogram promises proof, the platform itself must be tested with proof.**
