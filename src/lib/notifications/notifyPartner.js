import { sendEmail } from './emailService';

export async function notifyPartner(partner, data) {
  const email = partner.email;
  
  if (!email) {
    console.error('[NOTIFY PARTNER] No email provided for partner', partner.id);
    return;
  }

  await sendEmail({
    to: email,
    subject: `Buildogram: ${data.type === 'welcome' ? 'Welcome!' : 'Notification'}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <p>Hi ${partner.contact_person || 'Partner'},</p>
        <p>${data.message || 'You have a new update in your Partner OS.'}</p>
        <br/>
        <a href="https://buildogram.in/partner/login" style="padding: 10px 20px; background: #e85d04; color: white; text-decoration: none; border-radius: 5px;">Go to Partner OS</a>
      </div>
    `
  });

  console.log(`[NOTIFY PARTNER] Sent notification type: ${data.type || 'general'}`);
}
