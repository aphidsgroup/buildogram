// /src/lib/notifications/whatsappService.js

export async function sendWhatsApp({ to, message }) {
  const provider = process.env.WHATSAPP_PROVIDER;
  const apiKey = process.env.WHATSAPP_API_KEY;
  const senderId = process.env.WHATSAPP_SENDER_ID;

  if (!apiKey || !provider) {
    console.info('WHATSAPP_DELIVERY_SKIPPED reason=feature_disabled');
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
