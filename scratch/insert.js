const fs = require('fs');

const schemaPath = 'prisma/schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const newModels = `
model property_passports {
  id                      String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  passport_number         String    @unique
  property_name           String?
  owner_name              String?
  owner_phone             String?
  owner_email             String?
  property_area           String?
  property_type           String?
  project_type            String?
  status                  String?   @default("draft")
  linked_lead_id          String?   @db.Uuid
  linked_partner_id       String?   @db.Uuid
  linked_case_study_id    String?   @db.Uuid
  linked_quote_request_id String?   @db.Uuid
  privacy_level           String?   @default("private")
  share_token             String?   @unique @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  created_at              DateTime? @default(now()) @db.Timestamptz(6)
  updated_at              DateTime? @default(now()) @db.Timestamptz(6)

  leads                   leads?                    @relation(fields: [linked_lead_id], references: [id], onDelete: SetNull, onUpdate: NoAction)
  partners                partners?                 @relation(fields: [linked_partner_id], references: [id], onDelete: SetNull, onUpdate: NoAction)
  case_studies            case_studies?             @relation(fields: [linked_case_study_id], references: [id], onDelete: SetNull, onUpdate: NoAction)
  material_quote_requests material_quote_requests?  @relation(fields: [linked_quote_request_id], references: [id], onDelete: SetNull, onUpdate: NoAction)

  records                 property_passport_records[]
  checklists              property_passport_checklists[]

  @@index([passport_number], map: "idx_property_passports_number")
  @@index([share_token], map: "idx_property_passports_token")
}

model property_passport_records {
  id              String             @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  passport_id     String             @db.Uuid
  category        String
  title           String
  description     String?
  file_url        String?
  external_url    String?
  record_date     DateTime?          @db.Timestamptz(6)
  uploaded_by     String?            @db.Uuid
  visibility      String?            @default("private")
  metadata_json   Json?              @default("{}")
  created_at      DateTime?          @default(now()) @db.Timestamptz(6)
  updated_at      DateTime?          @default(now()) @db.Timestamptz(6)

  passport        property_passports @relation(fields: [passport_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  uploader        users?             @relation(fields: [uploaded_by], references: [id], onDelete: SetNull, onUpdate: NoAction)

  @@index([passport_id], map: "idx_passport_records_passport")
  @@index([category], map: "idx_passport_records_category")
}

model property_passport_checklists {
  id              String             @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  passport_id     String             @db.Uuid
  stage           String
  checklist_item  String
  status          String?            @default("pending")
  proof_record_id String?            @db.Uuid
  remarks         String?
  created_at      DateTime?          @default(now()) @db.Timestamptz(6)
  updated_at      DateTime?          @default(now()) @db.Timestamptz(6)

  passport        property_passports @relation(fields: [passport_id], references: [id], onDelete: Cascade, onUpdate: NoAction)

  @@index([passport_id], map: "idx_passport_checklists_passport")
}
`;

if (!schema.includes('model property_passports {')) {
  schema += '\n' + newModels;
}

// Simple insertion for opposite relations
function addField(modelName, field) {
  if (schema.includes(field)) return;
  
  let lines = schema.split('\n');
  let inModel = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(`model ${modelName} {`)) {
      inModel = true;
    } else if (inModel && lines[i].startsWith('}')) {
      lines.splice(i, 0, `  ${field}`);
      schema = lines.join('\n');
      return;
    }
  }
}

addField('leads', 'property_passports property_passports[]');
addField('partners', 'property_passports property_passports[]');
addField('case_studies', 'property_passports property_passports[]');
addField('material_quote_requests', 'property_passports property_passports[]');
addField('users', 'property_passport_records property_passport_records[]');

fs.writeFileSync(schemaPath, schema);
