// /src/lib/notifications/notifyPartner.js
import { sendEmail } from './emailService';
import { sendWhatsApp } from './whatsappService';

export async function notifyPartner(partner, enquiry) {
  if (!partner) return;

  const partnerEmail = partner.email;
  const partnerPhone = partner.whatsapp || partner.phone;

  const subject = `New Buildogram Enquiry: ${enquiry.customerName}`;
  
  const message = `New enquiry received through Buildogram

Customer:
${enquiry.customerName}
${enquiry.phone}

Requirement:
${enquiry.requirement}

Location:
${enquiry.location || 'Not provided'}

Login to Partner OS to update lead status.`;

  const promises = [];
  
  if (partnerEmail) {
    promises.push(sendEmail({ to: partnerEmail, subject, body: message }));
  }
  
  if (partnerPhone) {
    promises.push(sendWhatsApp({ to: partnerPhone, message }));
  }

  await Promise.allSettled(promises);
}
