// Message Generation, Quality Check & Safety Validation Service

export const messageService = {
  // Generates tone-customized recovery message
  generateMessage(tone = 'Friendly', segmentName = 'High-Value Failed Payments', strategyName = 'Delayed Retry') {
    let subject = "Your payment could not be completed";
    let body = "Hi {{customer_name}},\n\nIt looks like your recent payment of {{payment_amount}} could not be completed due to a temporary bank issue.\n\nYou can try again after a short while.\n\nThank you,\n{{merchant_name}} Support";

    if (tone === 'Professional') {
      subject = "Notice regarding your recent payment ({{transaction_id}})";
      body = "Dear {{customer_name}},\n\nWe were unable to process your payment of {{payment_amount}} for transaction {{transaction_id}} due to bank gateway latency.\n\nOur system will attempt a scheduled retry in {{retry_time}}. No further action is required from your side.\n\nSincerely,\n{{merchant_name}} Payment Operations";
    } else if (tone === 'Concise') {
      subject = "Payment decline notice";
      body = "Hi {{customer_name}},\n\nYour payment of {{payment_amount}} for {{transaction_id}} was declined by the bank. Retrying in {{retry_time}}.\n\nRegards,\n{{merchant_name}}";
    } else if (tone === 'Helpful') {
      subject = "We're here to help with your {{payment_amount}} checkout";
      body = "Hi {{customer_name}},\n\nWe noticed your payment of {{payment_amount}} didn't go through smoothly due to a temporary bank error.\n\nDon't worry—your order reservation is active. We recommend retrying in {{retry_time}} or using an alternate payment method if preferred.\n\nWarm regards,\n{{merchant_name}} Customer Care";
    }

    return { subject, body, tone };
  },

  // Scans message text for sensitive financial credentials (Requirement #24)
  detectSensitiveData(text = '') {
    if (!text) return { hasSensitiveData: false, matches: [] };
    const str = text.toString().toLowerCase();

    const patterns = [
      { name: 'Card Number', regex: /\b(?:\d[ -]*?){13,16}\b/ },
      { name: 'CVV / CVC', regex: /\b(cvv|cvc|card verification|security code)\b/ },
      { name: 'ATM PIN / Password', regex: /\b(pin|password|otp|secret key|token)\b/ },
      { name: 'API Key', regex: /\b(sk_live|pk_live|bearer\s+[a-z0-9_-]+)\b/ }
    ];

    const matches = [];
    patterns.forEach(p => {
      if (p.regex.test(str)) {
        matches.push(p.name);
      }
    });

    return {
      hasSensitiveData: matches.length > 0,
      matches
    };
  },

  // Scans message text for misleading guaranteed claims (Requirement #25)
  detectMisleadingClaims(text = '') {
    if (!text) return { hasMisleadingClaims: false, claims: [] };
    const str = text.toString().toLowerCase();

    const forbidden = [
      'guaranteed recovery',
      'guaranteed refund',
      'guaranteed approval',
      '100% successful',
      '100% success',
      'guaranteed payment',
      'instant recovery guaranteed'
    ];

    const claims = forbidden.filter(claim => str.includes(claim));

    return {
      hasMisleadingClaims: claims.length > 0,
      claims
    };
  },

  // Computes demo quality score & breakdown (Requirement #23)
  calculateMessageQuality(subject = '', body = '') {
    const combined = `${subject} ${body}`;
    const sensitive = this.detectSensitiveData(combined);
    const claims = this.detectMisleadingClaims(combined);

    let score = 92;

    const hasVariables = combined.includes('{{customer_name}}') || combined.includes('{{payment_amount}}');
    const lengthValid = combined.length >= 30 && combined.length <= 500;

    if (sensitive.hasSensitiveData) score -= 30;
    if (claims.hasMisleadingClaims) score -= 25;
    if (!hasVariables) score -= 15;
    if (!lengthValid) score -= 10;

    score = Math.max(20, Math.min(99, score));

    return {
      score,
      clarity: lengthValid ? '✓ Good' : '⚠ Needs Adjustment',
      tone: '✓ Appropriate',
      length: lengthValid ? '✓ Good' : '⚠ Too Short/Long',
      personalization: hasVariables ? '✓ Good' : '⚠ Missing Variables',
      sensitiveData: sensitive.hasSensitiveData ? '⚠ Sensitive Data Detected' : '✓ Safe',
      paymentClaims: claims.hasMisleadingClaims ? '⚠ Misleading Claim' : '✓ Safe',
      sensitive,
      claims
    };
  }
};
