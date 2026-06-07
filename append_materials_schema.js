const fs = require('fs');

const models = `
model material_quote_requests {
  id                  String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  lead_id             String?   @db.Uuid
  summary_token       String    @unique @default(dbgenerated("gen_random_uuid()"))
  customer_name       String
  phone               String
  email               String?
  project_area        String?
  material_categories Json?     @default("[]")
  boq_available       Boolean?  @default(false)
  boq_file_url        String?
  required_date       DateTime? @db.Date
  delivery_location   String?
  notes               String?
  status              String?   @default("new")
  first_landing_page  String?
  conversion_page     String?
  referrer            String?
  utm_source          String?
  utm_medium          String?
  utm_campaign        String?
  utm_content         String?
  utm_term            String?
  created_at          DateTime? @default(now()) @db.Timestamptz(6)
  updated_at          DateTime? @default(now()) @db.Timestamptz(6)
  
  leads               leads?    @relation(fields: [lead_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  supplier_quote_responses supplier_quote_responses[]
  material_delivery_records material_delivery_records[]

  @@index([status], map: "idx_material_quote_requests_status")
  @@index([summary_token], map: "idx_material_quote_requests_token")
}

model supplier_quote_responses {
  id                  String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  quote_request_id    String    @db.Uuid
  supplier_partner_id String    @db.Uuid
  material_category   String
  brand               String?
  grade_spec          String?
  quantity            Decimal?  @db.Decimal
  unit                String?
  unit_rate           Decimal?  @db.Decimal
  transport_cost      Decimal?  @db.Decimal
  gst_included        Boolean?  @default(false)
  delivery_timeline   String?
  payment_terms       String?
  quote_file_url      String?
  validity_date       DateTime? @db.Date
  status              String?   @default("pending")
  created_at          DateTime? @default(now()) @db.Timestamptz(6)
  updated_at          DateTime? @default(now()) @db.Timestamptz(6)

  material_quote_requests material_quote_requests @relation(fields: [quote_request_id], references: [id], onDelete: Cascade)
  partners            partners  @relation(fields: [supplier_partner_id], references: [id], onDelete: Cascade)

  @@index([quote_request_id], map: "idx_supplier_quote_responses_request")
  @@index([supplier_partner_id], map: "idx_supplier_quote_responses_supplier")
}

model material_delivery_records {
  id                       String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  quote_request_id         String    @db.Uuid
  supplier_partner_id      String    @db.Uuid
  delivery_status          String    @default("dispatched")
  delivery_date            DateTime? @db.Timestamptz(6)
  invoice_url              String?
  weighbridge_slip_url     String?
  delivery_photos          Json?     @default("[]")
  quality_notes            String?
  property_passport_linked Boolean?  @default(false)
  created_at               DateTime? @default(now()) @db.Timestamptz(6)
  updated_at               DateTime? @default(now()) @db.Timestamptz(6)

  material_quote_requests material_quote_requests @relation(fields: [quote_request_id], references: [id], onDelete: Cascade)
  partners            partners  @relation(fields: [supplier_partner_id], references: [id], onDelete: Cascade)

  @@index([quote_request_id], map: "idx_material_delivery_records_request")
}
`;

let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

if (!schema.includes('model material_quote_requests')) {
  // Add relations to leads model
  schema = schema.replace(
    /model leads \{/,
    'model leads {\n  material_quote_requests material_quote_requests[]'
  );

  // Add relations to partners model
  schema = schema.replace(
    /model partners \{/,
    'model partners {\n  supplier_quote_responses supplier_quote_responses[]\n  material_delivery_records material_delivery_records[]'
  );
  
  fs.writeFileSync('prisma/schema.prisma', schema + '\n' + models);
  console.log('Models and relations added to schema.');
} else {
  console.log('Models already exist.');
}
