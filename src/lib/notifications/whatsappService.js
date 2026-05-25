// /src/lib/notifications/whatsappService.js

export async function sendWhatsApp({ to, message }) {
  const provider = process.env.WHATSAPP_PROVIDER;
  const apiKey = process.env.WHATSAPP_API_KEY;
  const senderId = process.env.WHATSAPP_SENDER_ID;

  if (!apiKey || !provider) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[WHATSAPP SKIPPED] WhatsApp credentials not configured.');
      console.log(`To: ${to}\nMessage:\n${message}`);
    }
    return { sent: false, reason: 'not_configured' };
  }

  try {
    // Stub for real WhatsApp sending
    console.log(`Sending WhatsApp to ${to} via ${provider}`);
    return { sent: true };
  } catch (error) {
    console.error('WhatsApp send failed:', error);
    return { sent: false, reason: error.message };
  }
}
