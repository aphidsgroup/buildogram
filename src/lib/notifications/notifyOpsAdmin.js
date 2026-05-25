// /src/lib/notifications/notifyOpsAdmin.js
import { sendEmail } from './emailService';
import { sendWhatsApp } from './whatsappService';

export async function notifyOpsAdmin(enquiry) {
  const adminEmail = process.env.OPS_ADMIN_EMAIL || 'admin@buildogram.in';
  const adminPhone = process.env.OPS_ADMIN_PHONE;

  const subject = `New Partner Enquiry: ${enquiry.customerName}`;
  
  const message = `New Buildogram Partner Enquiry

Partner:
${enquiry.partnerName || 'Unknown'} - ${enquiry.partnerCategory || 'Partner'}

Customer:
${enquiry.customerName}
${enquiry.phone}
${enquiry.email || 'No email provided'}

Requirement:
${enquiry.requirement}

Location:
${enquiry.location || 'Not provided'}

Budget:
${enquiry.budgetRange || 'Not provided'}

Source:
${enquiry.sourcePage || 'Partner Profile'}`;

  const promises = [];
  
  if (adminEmail) {
    promises.push(sendEmail({ to: adminEmail, subject, body: message }));
  }
  
  if (adminPhone) {
    promises.push(sendWhatsApp({ to: adminPhone, message }));
  }

  await Promise.allSettled(promises);
}
