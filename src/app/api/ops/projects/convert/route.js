import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateProjectCode } from "@/lib/projects/projectCode";
import { getMilestonesForType } from "@/lib/projects/milestoneTemplates";

export async function POST(req) {
  await requirePermission('manage_projects');
  try {
    const { leadId, leadType, assignedOpsOwnerId } = await req.json();

    if (!leadId) {
      return NextResponse.json({ error: "leadId is required" }, { status: 400 });
    }

    const lead = await prisma.leads.findUnique({ where: { id: leadId } });
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Determine project_type
    let projectType = "home_construction";
    if (leadType === "structural_audit" || lead.lead_type === "audit") projectType = "structural_audit";
    else if (leadType === "survey" || lead.lead_type === "survey") projectType = "land_survey";
    else if (leadType === "piling" || lead.lead_type === "piling") projectType = "piling";
    else if (leadType === "materials" || lead.lead_type === "materials") projectType = "materials";
    else if (lead.lead_type) projectType = lead.lead_type.replace(" ", "_").toLowerCase();

    const projectCode = await generateProjectCode("CHN");

    const clientUserId = lead.property_id ? (await prisma.properties.findUnique({ where: { id: lead.property_id } }))?.owner_user_id : null;
    
    // We need a dummy user if client_id is required in projects, but client_id is marked @db.Uuid, wait, let's verify if client_id is required in existing projects.
    // In schema.prisma: `client_id String @db.Uuid`. It's non-nullable.
    // If there is no clientUserId, we might need to find or create a user.
    // For safety, let's look for a user by email/phone or create one.
    
    let resolvedClientId = clientUserId;
    if (!resolvedClientId) {
      const existingUser = await prisma.users.findFirst({
        where: { OR: [{ phone: lead.phone }, { email: lead.email || "dummy@mail.com" }] }
      });
      if (existingUser) {
        resolvedClientId = existingUser.id;
      } else {
        const newUser = await prisma.users.create({
          data: {
            name: lead.name,
            phone: lead.phone,
            email: lead.email || `${lead.phone}@temp-buildogram.com`,
            role: "client"
          }
        });
        resolvedClientId = newUser.id;
      }
    }

    const project = await prisma.projects.create({
      data: {
        project_code: projectCode,
        name: `${lead.name}'s ${projectType.replace("_", " ")} Project`,
        client_id: resolvedClientId,
        client_name: lead.name,
        client_phone: lead.phone,
        client_email: lead.email,
        project_type: projectType,
        source_lead_table: "leads",
        source_lead_id: lead.id,
        status: "active",
        city: lead.city || "Chennai",
        locality: lead.locality,
        budget_range: lead.rough_budget ? lead.rough_budget.toString() : null,
        linked_partner_id: lead.assigned_partner_id || lead.partner_id,
        assigned_ops_owner: assignedOpsOwnerId,
        project_area: lead.plot_area_sqft ? lead.plot_area_sqft.toString() : null,
        property_type: lead.category || "home",
      }
    });

    // Generate milestones
    const templates = getMilestonesForType(projectType);
    if (templates.length > 0) {
      const milestoneRecords = templates.map(t => ({
        project_id: project.id,
        milestone_name: t.name,
        stage: t.stage,
        status: "pending"
      }));
      await prisma.project_milestones.createMany({ data: milestoneRecords });
    }

    // Update lead status
    await prisma.leads.update({
      where: { id: lead.id },
      data: { status: "converted" }
    });

    return NextResponse.json({ success: true, projectId: project.id, projectCode: project.project_code });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
