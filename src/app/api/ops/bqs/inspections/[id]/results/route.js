import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Update a specific inspection result
export async function PATCH(req, { params }) {
  await requirePermission('manage_bqs');
  try {
    const { id } = await params; // inspection_id
    const body = await req.json();
    const { result_id, status, remarks, proof_urls, measurement_value, rework_required } = body;

    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (remarks !== undefined) updateData.remarks = remarks;
    if (proof_urls !== undefined) updateData.proof_urls = proof_urls;
    if (measurement_value !== undefined) updateData.measurement_value = measurement_value;
    
    if (rework_required !== undefined) {
      updateData.rework_required = rework_required;
      if (rework_required && status === 'fail') {
        updateData.rework_status = 'open';
      } else if (!rework_required) {
        updateData.rework_status = 'none';
      }
    }

    const result = await prisma.bqs_inspection_results.update({
      where: { id: result_id, inspection_id: id },
      data: updateData
    });

    // Check if inspection needs status update based on result
    if (status === 'fail' && rework_required) {
       await prisma.bqs_inspections.update({
           where: { id },
           data: { status: 'rework_required' }
       });
    } else if (status === 'pass' || status === 'not_applicable') {
        // Just mark in progress if scheduled
        const ins = await prisma.bqs_inspections.findUnique({ where: { id } });
        if (ins.status === 'scheduled') {
            await prisma.bqs_inspections.update({
               where: { id },
               data: { status: 'in_progress' }
            });
        }
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating inspection result:", error);
    return NextResponse.json({ success: false, error: "Failed to update inspection result" }, { status: 500 });
  }
}
