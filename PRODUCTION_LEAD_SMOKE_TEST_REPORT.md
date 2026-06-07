# Production Lead Smoke Test Report

**Timestamp:** 2026-06-07T20:18:52.256Z
**Base URL:** https://www.buildogram.in

## Cleanup Checklist for Ops
Please log in to the Ops Dashboard and ensure these records are verified and then deleted or archived:
- [ ] Verify and delete: construction lead
- [ ] Verify and delete: material_quote lead
- [ ] Verify and delete: structural_audit lead
- [ ] Verify and delete: survey lead
- [ ] Verify and delete: piling lead
- [ ] Verify and delete: ai_tool lead
- [ ] Verify and delete: partner_application lead

---

### construction
- **Endpoint:** https://www.buildogram.in/api/leads
- **Result:** ✅ PASS
- **Status Code:** 200
- **Response Body:**
```json
{
  "success": true,
  "id": "685b8557-a307-445b-ac63-5c60ac0b6ff5",
  "leadType": "construction"
}
```

### material_quote
- **Endpoint:** https://www.buildogram.in/api/leads
- **Result:** ✅ PASS
- **Status Code:** 200
- **Response Body:**
```json
{
  "success": true,
  "id": "73bd4d29-db5e-41aa-be2b-0fbc84b212d6",
  "leadType": "material_quote"
}
```

### structural_audit
- **Endpoint:** https://www.buildogram.in/api/leads
- **Result:** ✅ PASS
- **Status Code:** 200
- **Response Body:**
```json
{
  "success": true,
  "id": "0f78146e-b0c3-4445-a875-fbe2e96a01ea",
  "leadType": "audit"
}
```

### survey
- **Endpoint:** https://www.buildogram.in/api/leads
- **Result:** ✅ PASS
- **Status Code:** 200
- **Response Body:**
```json
{
  "success": true,
  "id": "cddbb9f4-8c51-4881-b5d8-f7f6bf09d373",
  "leadType": "survey"
}
```

### piling
- **Endpoint:** https://www.buildogram.in/api/leads
- **Result:** ✅ PASS
- **Status Code:** 200
- **Response Body:**
```json
{
  "success": true,
  "id": "59eb198a-ce5c-4843-8e23-448fc49e4d8d",
  "leadType": "piling"
}
```

### ai_tool
- **Endpoint:** https://www.buildogram.in/api/leads
- **Result:** ✅ PASS
- **Status Code:** 200
- **Response Body:**
```json
{
  "success": true,
  "id": "8b99b3e6-0948-4dbc-9331-98d02f228f85",
  "leadType": "ai"
}
```

### partner_application
- **Endpoint:** https://www.buildogram.in/api/partner/applications
- **Result:** ✅ PASS
- **Status Code:** 200
- **Response Body:**
```json
{
  "success": true,
  "data": {
    "id": "e301684a-c60b-454e-9da6-eb8a0d341f4a",
    "business_name": "Smoke Test - Buildogram QA",
    "contact_person": "QA Tester",
    "phone": "9999999999",
    "email": "qa+smoke@buildogram.in",
    "category": "Contractor",
    "service_areas": "[]",
    "years_experience": null,
    "services_offered": "[]",
    "project_types": "[]",
    "website": null,
    "gst_number": null,
    "registration_number": null,
    "license_number": null,
    "portfolio_links": "[]",
    "profile_summary": null,
    "consent_given": true,
    "status": "new",
    "internal_notes": null,
    "assigned_to": null,
    "created_at": "2026-06-07T20:19:07.152Z",
    "updated_at": "2026-06-07T20:19:07.152Z"
  }
}
```

