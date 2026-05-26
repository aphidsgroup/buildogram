const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;

export async function sendNotification(event, data) {
  console.log(`[NotificationService] Triggered event: ${event}`);
  
  if (process.env.APP_MODE === 'demo' || !process.env.DATABASE_URL) {
    console.log(`[NotificationService] Demo mode active. Suppressing actual dispatch for ${event}.`);
    console.log(data);
    return true;
  }

  // Placeholder logic for real integrations
  try {
    if (RESEND_API_KEY) {
      // await resend.emails.send({...})
      console.log(`[NotificationService] Mock sent Email for ${event}`);
    }

    if (SLACK_WEBHOOK_URL) {
      // await fetch(SLACK_WEBHOOK_URL, {...})
      console.log(`[NotificationService] Mock sent Slack alert for ${event}`);
    }

    if (WHATSAPP_API_TOKEN) {
      // await fetch(WHATSAPP_URL, {...})
      console.log(`[NotificationService] Mock sent WhatsApp for ${event}`);
    }

    return true;
  } catch (error) {
    console.error(`[NotificationService] Error sending notification:`, error);
    return false;
  }
}
