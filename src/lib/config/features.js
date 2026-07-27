const TRUE_VALUES = new Set(['1', 'true', 'yes', 'on']);

function enabled(value) {
  return TRUE_VALUES.has(String(value || '').trim().toLowerCase());
}

function state(explicitlyEnabled, credentialsReady, disabledState = 'optional_disabled') {
  if (!explicitlyEnabled) return disabledState;
  return credentialsReady ? 'ready' : 'misconfigured';
}

export function getFeatureConfig(env = process.env) {
  const analyticsReady = Boolean(env.NEXT_PUBLIC_GA_ID);
  const providerAiEnabled = enabled(env.ENABLE_PROVIDER_AI);
  const paymentsEnabled = enabled(env.ENABLE_ONLINE_PAYMENTS);
  const whatsappEnabled = enabled(env.ENABLE_WHATSAPP_AUTOMATION);
  const cloudinaryEnabled = enabled(env.ENABLE_CLOUDINARY_UPLOADS);
  const emailEnabled = enabled(env.ENABLE_EMAIL_DELIVERY);

  return {
    analytics: {
      enabled: true,
      available: analyticsReady,
      status: analyticsReady ? 'ready' : 'misconfigured',
    },
    providerAi: {
      enabled: providerAiEnabled,
      available: providerAiEnabled
        && ['openai', 'gemini'].includes(env.AI_PROVIDER)
        && Boolean(env.AI_API_KEY),
      status: state(
        providerAiEnabled,
        ['openai', 'gemini'].includes(env.AI_PROVIDER) && Boolean(env.AI_API_KEY),
      ),
    },
    onlinePayments: {
      enabled: paymentsEnabled,
      available: paymentsEnabled
        && env.PAYMENT_PROVIDER === 'razorpay'
        && Boolean(env.RAZORPAY_KEY_ID)
        && Boolean(env.RAZORPAY_KEY_SECRET)
        && Boolean(env.RAZORPAY_WEBHOOK_SECRET),
      status: state(
        paymentsEnabled,
        env.PAYMENT_PROVIDER === 'razorpay'
          && Boolean(env.RAZORPAY_KEY_ID)
          && Boolean(env.RAZORPAY_KEY_SECRET)
          && Boolean(env.RAZORPAY_WEBHOOK_SECRET),
      ),
    },
    whatsappAutomation: {
      enabled: whatsappEnabled,
      available: whatsappEnabled
        && Boolean(env.WHATSAPP_CLOUD_API_TOKEN)
        && Boolean(env.WHATSAPP_PHONE_NUMBER_ID),
      status: state(
        whatsappEnabled,
        Boolean(env.WHATSAPP_CLOUD_API_TOKEN) && Boolean(env.WHATSAPP_PHONE_NUMBER_ID),
      ),
    },
    cloudinaryUploads: {
      enabled: cloudinaryEnabled,
      available: cloudinaryEnabled
        && Boolean(env.CLOUDINARY_CLOUD_NAME)
        && Boolean(env.CLOUDINARY_API_KEY)
        && Boolean(env.CLOUDINARY_API_SECRET),
      status: state(
        cloudinaryEnabled,
        Boolean(env.CLOUDINARY_CLOUD_NAME)
          && Boolean(env.CLOUDINARY_API_KEY)
          && Boolean(env.CLOUDINARY_API_SECRET),
      ),
    },
    emailDelivery: {
      enabled: emailEnabled,
      available: emailEnabled && Boolean(env.RESEND_API_KEY),
      status: state(emailEnabled, Boolean(env.RESEND_API_KEY), 'optional_degraded'),
    },
    whatsappClickToChat: {
      enabled: true,
      available: true,
      status: 'ready',
    },
  };
}

export function unavailableFeatureResponse() {
  return {
    success: false,
    available: false,
    reason: 'feature_disabled',
  };
}
