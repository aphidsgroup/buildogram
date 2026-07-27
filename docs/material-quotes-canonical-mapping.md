# Material quote canonical mapping

The legacy `material_quotes` row mixed a request, supplier response, and derived
totals. The canonical workflow keeps the customer request in
`material_quote_requests`, each supplier response in
`supplier_quote_responses`, and creates `material_delivery_records` only after
an accepted quote reaches delivery.

| Legacy field | Meaning | Canonical model.field | Transformation / relation | Null/default | Compatibility response | Data-loss risk |
| --- | --- | --- | --- | --- | --- | --- |
| `material_request_id`, `request_id`, `rfqId` | Requested quotation | `supplier_quote_responses.quote_request_id` | Resolve an existing `material_quote_requests.id`; never create a request during supplier submission | Required | `requestId`, `rfqId` | None |
| `supplier_user_id`, `supplier_id` | Supplier identity | `supplier_quote_responses.supplier_partner_id` | Resolve authenticated `users.partner_id`; never trust a client supplier id | Required | `supplierId` | None |
| `material_name`, `material` | Quoted material/category | `supplier_quote_responses.material_category` | Prefer request category; accept a non-empty submitted category only for an assigned draft | Required | `material` | Low when a request contains multiple categories |
| `qty` | Quoted quantity | `supplier_quote_responses.quantity` | Positive finite decimal | Optional | `qty` | None |
| `unit` | Quantity unit | `supplier_quote_responses.unit` | Trimmed text | Optional | `unit` | None |
| `rate_per_unit`, `rate` | Unit rate | `supplier_quote_responses.unit_rate` | Positive finite decimal | Required for submission | `rate`, `ratePerUnit`, `unitRate` | None |
| `gst_pct`, `tax` | GST treatment | `supplier_quote_responses.gst_included` | UI now records whether the quoted unit rate includes GST; arbitrary percentages are not persisted | Default `false` | `gstIncluded` | Medium for historical percentage values |
| `delivery_charge` | Transport/delivery charge | `supplier_quote_responses.transport_cost` | Non-negative finite decimal | Default `0` | `deliveryCharge` | None |
| `delivery_days` | Fulfilment timing | `supplier_quote_responses.delivery_timeline` | Store as `"<n> days"`; existing text is retained | Optional | `deliveryDays`, `deliveryTimeline` | Low for non-numeric text consumers |
| `valid_until` | Quote expiry | `supplier_quote_responses.validity_date` | ISO date; must be today or later | Optional | `validUntil`, `validTill` | None |
| `notes`, `remarks` | Supplier terms/notes | `supplier_quote_responses.payment_terms` | Trim and limit; treated as supplier-visible commercial terms | Optional | `notes`, `paymentTerms` | Low because canonical field is more specific |
| `status` | Supplier response state | `supplier_quote_responses.status` | `pending` → draft, first send → submitted, later send → revised; accepted/rejected/expired are immutable to suppliers | Default `pending` | `status`, `selected` | None |
| `total_amount` | Derived landed amount | Not stored | Derive from quantity, unit rate, and transport cost; quoted rate is explicitly marked GST-included or excluded | Derived | `total`, `totalAmount` | Medium compared with legacy arbitrary GST percentages |
| `delivery_date` | Actual delivery | `material_delivery_records.delivery_date` | Created only after acceptance and an actual delivery-stage event | Optional, post-acceptance | Not returned by quote submission | None |
| `source_type` | Pilot marker | Canonical request `notes` marker | Pilot routes use the non-PII marker `[pilot_seed]`; no compatibility column is added | Optional | Not exposed | Low |

Read operations return only the authenticated supplier's response together with
the operational request fields needed to quote. Customer phone, email, internal
attribution, other suppliers' rates, and internal notes are excluded.
