const fs = require('fs');

const schemaPath = 'prisma/schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const bqsModels = `
model bqs_templates {
  id              String                @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  template_name   String
  project_type    String?               @default("residential")
  stage           String?
  category        String?
  description     String?
  is_active       Boolean?              @default(true)
  created_at      DateTime?             @default(now()) @db.Timestamptz(6)
  updated_at      DateTime?             @default(now()) @db.Timestamptz(6)

  items           bqs_checklist_items[]

  @@index([project_type], map: "idx_bqs_templates_project_type")
  @@index([stage], map: "idx_bqs_templates_stage")
}

model bqs_checklist_items {
  id                  String         @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  template_id         String         @db.Uuid
  stage               String
  category            String
  item_text           String
  inspection_method   String?
  required_proof_type String?        @default("photo") // photo, video, document, measurement, remark, none
  severity            String?        @default("medium") // low, medium, high, critical
  is_required         Boolean?       @default(true)
  created_at          DateTime?      @default(now()) @db.Timestamptz(6)
  updated_at          DateTime?      @default(now()) @db.Timestamptz(6)

  template            bqs_templates  @relation(fields: [template_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  results             bqs_inspection_results[]

  @@index([template_id], map: "idx_bqs_items_template")
  @@index([stage], map: "idx_bqs_items_stage")
}

model bqs_inspections {
  id                String             @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  passport_id       String?            @db.Uuid
  project_name      String?
  project_area      String?
  project_type      String?
  stage             String
  assigned_engineer String?            @db.Uuid
  inspection_date   DateTime?          @db.Timestamptz(6)
  status            String?            @default("scheduled") // scheduled, in_progress, completed, rework_required, closed
  overall_score     Float?
  summary           String?
  created_at        DateTime?          @default(now()) @db.Timestamptz(6)
  updated_at        DateTime?          @default(now()) @db.Timestamptz(6)

  passport          property_passports? @relation(fields: [passport_id], references: [id], onDelete: SetNull, onUpdate: NoAction)
  engineer          users?              @relation(fields: [assigned_engineer], references: [id], onDelete: SetNull, onUpdate: NoAction)
  results           bqs_inspection_results[]

  @@index([passport_id], map: "idx_bqs_inspections_passport")
  @@index([status], map: "idx_bqs_inspections_status")
}

model bqs_inspection_results {
  id                 String             @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  inspection_id      String             @db.Uuid
  checklist_item_id  String             @db.Uuid
  status             String?            @default("not_applicable") // pass, fail, observation, not_applicable
  remarks            String?
  proof_urls         Json?              @default("[]")
  measurement_value  String?
  severity           String?
  rework_required    Boolean?           @default(false)
  rework_status      String?            @default("none") // none, open, in_progress, resolved, verified_closed
  created_at         DateTime?          @default(now()) @db.Timestamptz(6)
  updated_at         DateTime?          @default(now()) @db.Timestamptz(6)

  inspection         bqs_inspections     @relation(fields: [inspection_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  checklist_item     bqs_checklist_items @relation(fields: [checklist_item_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  reworks            bqs_rework_items[]

  @@index([inspection_id], map: "idx_bqs_results_inspection")
  @@index([checklist_item_id], map: "idx_bqs_results_item")
}

model bqs_rework_items {
  id                   String             @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  inspection_result_id String             @db.Uuid
  issue_title          String
  issue_description    String?
  assigned_to          String?            @db.Uuid
  due_date             DateTime?          @db.Date
  status               String?            @default("open") // open, in_progress, resolved, verified_closed
  closure_proof_urls   Json?              @default("[]")
  closure_remarks      String?
  created_at           DateTime?          @default(now()) @db.Timestamptz(6)
  updated_at           DateTime?          @default(now()) @db.Timestamptz(6)

  inspection_result    bqs_inspection_results @relation(fields: [inspection_result_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  assignee             users?                 @relation(fields: [assigned_to], references: [id], onDelete: SetNull, onUpdate: NoAction)

  @@index([inspection_result_id], map: "idx_bqs_reworks_result")
  @@index([status], map: "idx_bqs_reworks_status")
}
`;

if (!schema.includes('model bqs_templates {')) {
  schema += '\n' + bqsModels;
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

addField('property_passports', 'bqs_inspections bqs_inspections[]');
addField('users', 'bqs_inspections bqs_inspections[]');
addField('users', 'bqs_rework_items bqs_rework_items[]');

fs.writeFileSync(schemaPath, schema);
