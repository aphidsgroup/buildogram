import { sendEmail } from './emailService';

export async function notifyOpsAdmin(details) {
  const adminEmail = process.env.OPS_ADMIN_EMAIL || 'admin@buildogram.in';
  
  await sendEmail({
    to: adminEmail,
    subject: `Buildogram Alert: ${details.requirement || 'New Activity'}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>New Buildogram Notification</h2>
        <pre style="background: #f4f4f4; padding: 15px; border-radius: 8px;">${JSON.stringify(details, null, 2)}</pre>
        <p>Log in to Ops Admin to view details.</p>
      </div>
    `
  });

  console.log(`[NOTIFY OPS ADMIN] -> ${adminEmail}`);
  console.log(JSON.stringify(details, null, 2));
}
