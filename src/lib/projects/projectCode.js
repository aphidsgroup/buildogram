import prisma from "@/lib/prisma";

export async function generateProjectCode(areaCode = "CHN") {
  const year = new Date().getFullYear();
  
  // Count projects created this year to generate sequential number
  const count = await prisma.projects.count({
    where: {
      created_at: {
        gte: new Date(`${year}-01-01T00:00:00Z`),
        lte: new Date(`${year}-12-31T23:59:59Z`)
      }
    }
  });

  const sequentialNumber = (count + 1).toString().padStart(4, "0");
  
  return `BG-PRJ-${year}-${areaCode.toUpperCase()}-${sequentialNumber}`;
}
