import sql from '@/lib/db';

/**
 * Offline evaluation helper for Ops Notification Rules.
 * Does NOT actually send messages. Used for Dry Run previews.
 * 
 * @param {string} eventType e.g., 'boq_report_ready'
 * @param {object} context e.g., { client_id: 'uuid' }
 * @returns {object} { should_send: boolean, reason: string, template_id?: string, channel?: string }
 */
export async function evaluateNotificationRule(eventType, context) {
  try {
    // 1. Find the active rule for this event
    const [rule] = await sql`
      SELECT * FROM notification_rules 
      WHERE event_type = ${eventType} AND is_enabled = true 
      LIMIT 1
    `;

    if (!rule) {
      return { should_send: false, reason: `Rule for '${eventType}' is disabled or does not exist.` };
    }

    if (!rule.template_id) {
      return { should_send: false, reason: 'Rule is enabled but no template is assigned.' };
    }

    // 2. Client preferences check
    if (rule.target_audience === 'client' && context.client_id && rule.respect_user_preferences) {
      const [client] = await sql`SELECT metadata FROM users WHERE id = ${context.client_id}`;
      if (!client) {
        return { should_send: false, reason: 'Target client not found.' };
      }

      const prefs = client.metadata?.notification_preferences || {};
      
      // Map event types to boolean preference keys
      const eventToPrefMap = {
        new_lead_created: 'receive_request_updates',
        boq_report_ready: 'receive_boq_report_updates',
        passport_document_uploaded: 'receive_passport_updates',
        passport_updated: 'receive_passport_updates',
        maintenance_status_changed: 'receive_maintenance_updates',
        material_quote_status_changed: 'receive_request_updates',
        property_listing_published: 'receive_property_listing_updates'
      };

      const prefKey = eventToPrefMap[eventType];
      if (prefKey && prefs[prefKey] === false) {
        return { should_send: false, reason: `Blocked: Client opted out of '${prefKey}'.` };
      }

      // Check quiet hours if requested
      if (rule.respect_quiet_hours && prefs.quiet_hours_start && prefs.quiet_hours_end) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMin = now.getMinutes();
        const currentTime = currentHour + currentMin / 60;

        const [startH, startM] = prefs.quiet_hours_start.split(':').map(Number);
        const [endH, endM] = prefs.quiet_hours_end.split(':').map(Number);
        const startTime = startH + startM / 60;
        const endTime = endH + endM / 60;

        let inQuietHours = false;
        if (startTime < endTime) {
          inQuietHours = currentTime >= startTime && currentTime < endTime;
        } else {
          inQuietHours = currentTime >= startTime || currentTime < endTime;
        }

        if (inQuietHours) {
          return { should_send: false, reason: `Blocked: Currently within client's quiet hours (${prefs.quiet_hours_start} - ${prefs.quiet_hours_end}).` };
        }
      }
    }

    // Passed all checks!
    return { 
      should_send: true, 
      reason: `Passed: Ready to send to ${rule.target_audience}.`,
      template_id: rule.template_id,
      channel: rule.channel
    };

  } catch (error) {
    console.error('Notification eval error:', error);
    return { should_send: false, reason: 'Internal error evaluating rule.' };
  }
}
