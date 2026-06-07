const fs = require('fs');

const model = `
model partner_applications {
  id                  String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  business_name       String
  contact_person      String
  phone               String
  email               String
  category            String
  service_areas       String?   @default("[]")
  years_experience    Int?
  services_offered    String?   @default("[]")
  project_types       String?   @default("[]")
  website             String?
  gst_number          String?
  registration_number String?
  license_number      String?
  portfolio_links     String?   @default("[]")
  profile_summary     String?
  consent_given       Boolean   @default(true)
  status              String?   @default("new")
  internal_notes      String?
  assigned_to         String?   @db.Uuid
  created_at          DateTime? @default(now()) @db.Timestamptz(6)
  updated_at          DateTime? @default(now()) @db.Timestamptz(6)
  users               users?    @relation(fields: [assigned_to], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([status], map: "idx_partner_applications_status")
  @@index([category], map: "idx_partner_applications_category")
}
`;

let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

if (!schema.includes('model partner_applications')) {
  // Add relation array to users model
  schema = schema.replace(
    /model users \{/,
    'model users {\n  partner_applications partner_applications[]'
  );
  
  fs.writeFileSync('prisma/schema.prisma', schema + '\n' + model);
  console.log('Model and relation added to schema.');
} else {
  console.log('Model already exists.');
}
