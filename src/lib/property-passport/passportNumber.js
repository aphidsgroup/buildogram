import prisma from "@/lib/prisma";

export async function generatePassportNumber(area = "") {
  // Extract 3 letters for area, fallback to GEN
  const cleanArea = area.trim().replace(/[^a-zA-Z]/g, "");
  const areaCode = cleanArea.length >= 3 ? cleanArea.substring(0, 3).toUpperCase() : "GEN";
  const year = new Date().getFullYear();

  // Find the count of passports created this year to generate the sequence
  const startOfYear = new Date(year, 0, 1);
  const count = await prisma.property_passports.count({
    where: {
      created_at: {
        gte: startOfYear,
      },
    },
  });

  // Sequence format: 0001
  const sequence = String(count + 1).padStart(4, "0");

  // BG-PP-YYYY-AREA-####
  return `BG-PP-${year}-${areaCode}-${sequence}`;
}
