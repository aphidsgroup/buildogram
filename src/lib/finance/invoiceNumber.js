import prisma from "@/lib/prisma";

export async function generateInvoiceNumber(type = "customer_invoice") {
  const date = new Date();
  const year = date.getFullYear();

  let prefix = "BG-INV";
  if (type === "commission_invoice" || type === "partner_invoice") {
    prefix = "BG-COMM";
  } else if (type === "supplier_invoice") {
    prefix = "BG-SUP";
  }

  // Find the highest sequence number for the current year and prefix
  const searchPattern = `${prefix}-${year}-%`;

  // We have to use raw query because Prisma string filtering with 'startsWith' 
  // might be slow or we can just findFirst ordered by invoice_number desc
  const latestInvoice = await prisma.project_invoices.findFirst({
    where: {
      invoice_number: {
        startsWith: `${prefix}-${year}-`,
      },
    },
    orderBy: {
      invoice_number: "desc",
    },
  });

  let nextSequence = 1;

  if (latestInvoice && latestInvoice.invoice_number) {
    const parts = latestInvoice.invoice_number.split("-");
    const lastNumStr = parts[parts.length - 1];
    const lastNum = parseInt(lastNumStr, 10);
    if (!isNaN(lastNum)) {
      nextSequence = lastNum + 1;
    }
  }

  const sequenceString = nextSequence.toString().padStart(4, "0");
  return `${prefix}-${year}-${sequenceString}`;
}
