// /src/lib/notifications/emailService.js
import { Resend } from 'resend';

export async function sendEmail({ to, subject, body, html }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log('[EMAIL SKIPPED] RESEND_API_KEY not configured.');
    console.log(`To: ${to}\nSubject: ${subject}\nBody:\n${body || html}`);
    return { sent: false, reason: 'not_configured' };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: 'Buildogram <notifications@buildogram.in>', // Update this to a verified domain if needed
      to,
      subject,
      text: body || 'No text content',
      html: html || `<p>${body}</p>`
    });

    if (error) {
      console.error('Email send failed (Resend API Error):', error);
      return { sent: false, reason: error.message };
    }

    console.log(`Email successfully sent to ${to} via Resend. ID: ${data.id}`);
    return { sent: true, data };
  } catch (error) {
    console.error('Email send failed (Exception):', error);
    return { sent: false, reason: error.message };
  }
}
