import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a rework item for a result
export async function POST(req, { params }) {
  await requirePermission('manage_bqs');
  try {
    const { id } = await params; // inspection_id
    const body = await req.json();
    const { inspection_result_id, issue_title, issue_description, assigned_to, due_date } = body;

    // Create the rework item
    const rework = await prisma.bqs_rework_items.create({
      data: {
        inspection_result_id,
        issue_title,
        issue_description,
        assigned_to: assigned_to || null,
        due_date: due_date ? new Date(due_date) : null,
        status: "open"
      }
    });

    // Update the result to reflect rework is open
    await prisma.bqs_inspection_results.update({
      where: { id: inspection_result_id },
      data: { rework_status: "open", rework_required: true }
    });

    // Ensure the inspection status is rework_required
    await prisma.bqs_inspections.update({
      where: { id },
      data: { status: "rework_required" }
    });

    return NextResponse.json({ success: true, rework });
  } catch (error) {
    console.error("Error creating rework:", error);
    return NextResponse.json({ success: false, error: "Failed to create rework item" }, { status: 500 });
  }
}

// Update a rework item (e.g. resolve it)
export async function PATCH(req, { params }) {
  await requirePermission('manage_bqs');
  try {
    const { id } = await params;
    const body = await req.json();
    const { rework_id, status, closure_proof_urls, closure_remarks } = body;

    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (closure_proof_urls !== undefined) updateData.closure_proof_urls = closure_proof_urls;
    if (closure_remarks !== undefined) updateData.closure_remarks = closure_remarks;

    const rework = await prisma.bqs_rework_items.update({
      where: { id: rework_id },
      data: updateData
    });

    // Also sync the result's rework_status
    if (status !== undefined) {
      await prisma.bqs_inspection_results.update({
        where: { id: rework.inspection_result_id },
        data: { rework_status: status }
      });
    }

    return NextResponse.json({ success: true, rework });
  } catch (error) {
    console.error("Error updating rework:", error);
    return NextResponse.json({ success: false, error: "Failed to update rework item" }, { status: 500 });
  }
}
