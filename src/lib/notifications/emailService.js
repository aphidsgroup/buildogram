// /src/lib/notifications/emailService.js

export async function sendEmail({ to, subject, body }) {
  const provider = process.env.EMAIL_PROVIDER;
  const apiKey = process.env.EMAIL_API_KEY;

  if (!apiKey || !provider) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[EMAIL SKIPPED] Email credentials not configured.');
      console.log(`To: ${to}\nSubject: ${subject}\nBody:\n${body}`);
    }
    return { sent: false, reason: 'not_configured' };
  }

  try {
    // Stub for real email sending (Resend, SendGrid, etc.)
    console.log(`Sending email to ${to} via ${provider}`);
    return { sent: true };
  } catch (error) {
    console.error('Email send failed:', error);
    return { sent: false, reason: error.message };
  }
}
