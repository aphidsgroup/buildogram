# Buildogram 5-Partner Pilot Testing Plan

## Objective
Onboard 5 real partners and test the complete Buildogram operations flow with real users before proceeding to Phase 7. This pilot ensures that the operational pathways—from lead generation to project conversion—are robust and frictionless for our core users.

## 7-Day Pilot Schedule
- **Day 1**: Onboard 1 Builder and 1 Architect
- **Day 2**: Onboard 1 Interior Designer and 1 Material Supplier
- **Day 3**: Onboard 1 Solar/Home Automation/Waterproofing Partner
- **Day 4**: Submit test leads from public pages (Contact, Partner Profiles, Material Quotes)
- **Day 5**: Ask partners to interact with leads (Update statuses, Add notes, Convert to Project)
- **Day 6**: Collect qualitative feedback from all 5 partners
- **Day 7**: Triage issues and decide Phase 7 scope based on real-world feedback

---

## Partner Details Tracker

| Partner ID | Category | Company Name | Contact Person | Phone | Pilot Status |
|---|---|---|---|---|---|
| Partner 1 | Builder | [TBD] | [TBD] | [TBD] | Not Started |
| Partner 2 | Architect | [TBD] | [TBD] | [TBD] | Not Started |
| Partner 3 | Interior Designer | [TBD] | [TBD] | [TBD] | Not Started |
| Partner 4 | Material Supplier | [TBD] | [TBD] | [TBD] | Not Started |
| Partner 5 | Specialized (Solar/Waterproofing) | [TBD] | [TBD] | [TBD] | Not Started |

---

## Ops Admin Verification Checklist
_To be verified by the Buildogram Operations Team for each partner:_
- [ ] Add/Register partner via Ops Admin or public registration flow
- [ ] Approve partner in Ops Admin (`/ops/partners`)
- [ ] Confirm partner appears correctly in the public directory (`/partners/directory`)
- [ ] Confirm public profile page loads without errors
- [ ] Confirm initial profile data displays correctly

## Partner OS Login & Access Checklist
_To be verified by each Partner:_
- [ ] Receive login credentials via email/WhatsApp
- [ ] Log in successfully to the Partner OS
- [ ] Change password securely
- [ ] Confirm the correct category-based sidebar/dashboard appears
- [ ] Confirm data isolation (cannot access other partners' leads or projects)

## Public Profile Setup Checklist
_To be executed by each Partner (or Ops assisting):_
- [ ] Upload Company Logo
- [ ] Upload Cover Image
- [ ] Define Services offered
- [ ] Define Service Areas / Geographies
- [ ] Add to Gallery/Portfolio
- [ ] Ensure WhatsApp/Contact details are configured
- [ ] Verify that updates reflect correctly on the live public profile

## Lead Flow Checklist
_End-to-End Test:_
- [ ] **Ops/User:** Submit a test enquiry directly from the partner’s profile page
- [ ] **Ops/User:** Submit a generic test enquiry from the public Contact page
- [ ] **Ops:** Assign the generic lead to the specific partner from the Ops CRM (`/ops/leads`)
- [ ] **Partner:** Confirm receipt of both leads in Partner OS (`/partner/leads`)
- [ ] **Partner:** Update lead status (e.g., 'Contacted', 'Quoted')
- [ ] **Partner:** Add internal notes
- [ ] **Partner:** Set a follow-up date
- [ ] **Ops:** Confirm Ops CRM accurately reflects the partner’s status updates and notes

## Lead-to-Project Conversion Checklist
- [ ] **Partner:** Convert one successful lead into an official Project
- [ ] **Partner:** Confirm the new project appears in the Partner Projects dashboard (`/partner/projects`)
- [ ] **Ops:** Confirm Ops CRM reflects the lead as "Converted"
- [ ] **Ops:** Verify that `/api/ops/analytics` charts update correctly with the converted data

---

## Feedback Collection (Exit Interview)
_Ask each partner these core questions during Day 6 feedback sessions:_

1. **Usability**: Is the dashboard easy to understand at first glance?
2. **Friction**: Which module or action feels confusing or difficult to use?
3. **Value**: Is the lead management interface useful for your day-to-day operations?
4. **Lifecycle**: Is the lead-to-project conversion workflow logical and helpful?
5. **Data**: What specific data fields are missing that you need to track leads or projects effectively?
6. **Retention**: Would you or your team use this platform on a weekly basis?
7. **Simplification**: What feature should be simplified or removed entirely?

---

## Issues & Bugs Tracker

| ID | Module / Page | Description | Reported By | Severity (Low/Med/High) | Status |
|---|---|---|---|---|---|
| #1 | [Module] | [Description of issue] | [Partner Name] | [Severity] | Open |
| #2 | [Module] | [Description of issue] | [Partner Name] | [Severity] | Open |

---

## Go / No-Go Criteria for Phase 7

Before initiating Phase 7 development, the following criteria must be met:
1. **Zero Critical Bugs:** No data-leakage, cross-tenant access issues, or crash loops present.
2. **Core Flow Functional:** All 5 partners successfully received a lead, managed its status, and converted it to a project without system intervention.
3. **Usability Consensus:** At least 3 out of 5 partners indicate they would use the system weekly.
4. **Issue Triage:** All non-critical feedback from the pilot has been documented and categorized as either a bug fix, UX polish, or Phase 7 roadmap feature.
