// Mock AI Recovery Service Layer
// Future API Ready Structure: Replaces mock logic with real ML model backend endpoints later

import { actionMapping, paymentFailureTooltips } from '../data/paymentsData';

export const getRecoveryRecommendation = (payment) => {
  if (!payment) return null;

  const failureReason = payment.failureReason || 'Bank Unavailable';
  
  // Strategy mapping according to requirements
  let strategy = 'Delayed Retry';
  if (failureReason === 'Bank Unavailable') strategy = 'Delayed Retry';
  else if (failureReason === 'Network Error') strategy = 'Immediate Retry';
  else if (failureReason === 'Insufficient Funds') strategy = 'Delayed Retry';
  else if (failureReason === 'Card Expired') strategy = 'Update Payment Method';
  else if (failureReason === 'Payment Limit Exceeded') strategy = 'Alternate Payment Method';
  else if (failureReason === 'Authentication Failed') strategy = 'Send Payment Link';
  else if (payment.recommendedAction && payment.recommendedAction !== '—') {
    strategy = payment.recommendedAction;
  }

  // Deterministic Probability calculation
  const probability = payment.probability || (
    failureReason === 'Card Expired' ? 96 :
    failureReason === 'Bank Unavailable' ? 91 :
    failureReason === 'Authentication Failed' ? 93 :
    failureReason === 'Insufficient Funds' ? 74 :
    failureReason === 'Network Error' ? 68 : 62
  );

  const confidence = Math.min(99, Math.max(60, probability + 2));
  
  // Priority calculation: amount + probability
  const priorityScore = payment.priorityScore || Math.min(99, Math.round((payment.amount / 200) + (probability * 0.6)));
  const priority = priorityScore >= 80 ? 'HIGH' : priorityScore >= 50 ? 'MEDIUM' : 'LOW';

  const customerPrev = payment.customerStats?.previousPayments || 18;
  const customerSucc = payment.customerStats?.successfulPayments || 16;
  const successRate = Math.round((customerSucc / customerPrev) * 100);

  const reasoning = [
    `The payment failed because the customer's bank was temporarily unavailable (${failureReason}).`,
    `The customer has successfully completed ${customerSucc} of ${customerPrev} previous payments (${successRate}% success rate).`,
    `Similar temporary bank failures have a higher recovery rate when retried after a short cooldown.`,
    `Recommended strategy: ${strategy}`
  ];

  const signals = [
    { name: 'Failure reason', value: failureReason, pass: true, tooltip: `Validated via bank gateway telemetry: ${failureReason}` },
    { name: 'Payment history', value: `${customerPrev} past transactions`, pass: true, tooltip: `Verified customer transaction history: ${customerPrev} total attempts` },
    { name: 'Customer success rate', value: `${successRate}%`, pass: true, tooltip: `${customerSucc} successful payments out of ${customerPrev} attempts` },
    { name: 'Transaction value', value: payment.formattedAmount || `₹${payment.amount}`, pass: true, tooltip: 'Eligible for automated recovery threshold (<₹50,000)' },
    { name: 'Previous retry behavior', value: `${payment.attempts || 1} of 3 attempts`, pass: payment.attempts < 3, tooltip: payment.attempts >= 3 ? 'Max retry limit reached' : 'Within retry limit safety guardrail' },
    { name: 'Time since failure', value: payment.date || '3 minutes ago', pass: true, tooltip: 'Optimal window for recovery retry' }
  ];

  const decisionDetails = {
    failureReason,
    transactionValue: payment.formattedAmount || `₹${payment.amount}`,
    customerSuccessRate: `${successRate}%`,
    previousSimilarFailures: payment.attempts || 1,
    timeSinceFailure: payment.date || '3 minutes ago',
    recommendedStrategy: strategy,
    confidence: `${confidence}%`
  };

  return {
    strategy,
    probability,
    confidence,
    priority,
    priorityScore,
    estimatedRecovery: payment.amount,
    reasoning,
    signals,
    decisionDetails
  };
};

export const aiRecoveryService = {
  // Analyzes transaction signals and returns AI recovery recommendation
  async analyzePayment(payment) {
    // Simulated short deterministic delay for realistic AI telemetry calculation
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!payment) return null;
    
    const rec = getRecoveryRecommendation(payment);

    return {
      payment,
      strategy: rec.strategy,
      probability: rec.probability,
      confidence: rec.confidence,
      priority: rec.priority,
      priorityScore: rec.priorityScore,
      estimatedRecovery: payment.amount,
      formattedEstimated: payment.formattedAmount || `₹${payment.amount}`,
      reasoning: rec.reasoning,
      signals: rec.signals,
      decisionDetails: rec.decisionDetails
    };
  },

  // Returns strategy comparison matrix
  getAlternativeStrategies(payment, selectedStrategy) {
    const amount = payment?.amount || 4999;
    const rec = getRecoveryRecommendation(payment);
    const baseProb = rec ? rec.probability : 91;
    const primaryStrat = rec ? rec.strategy : 'Delayed Retry';

    const currentSel = selectedStrategy || primaryStrat;

    const list = [
      {
        id: 'Delayed Retry',
        name: 'Delayed Retry',
        probability: baseProb,
        estimatedValue: Math.round(amount * (baseProb / 100)),
        formattedEstimated: `₹${Math.round(amount * (baseProb / 100)).toLocaleString('en-IN')}`,
        riskLevel: 'Low',
        description: 'Retry payment after short cooldown to avoid bank rate limits',
        whySelected: 'Highest expected recovery probability with lower retry pressure.'
      },
      {
        id: 'Immediate Retry',
        name: 'Immediate Retry',
        probability: Math.max(30, baseProb - 24),
        estimatedValue: Math.round(amount * (Math.max(30, baseProb - 24) / 100)),
        formattedEstimated: `₹${Math.round(amount * (Math.max(30, baseProb - 24) / 100)).toLocaleString('en-IN')}`,
        riskLevel: 'Medium',
        description: 'Reroute via primary gateway node immediately',
        whySelected: 'Fast execution, but higher risk of secondary bank decline.'
      },
      {
        id: 'Alternate Payment Method',
        name: 'Alternate Payment Method',
        probability: 58,
        estimatedValue: Math.round(amount * 0.58),
        formattedEstimated: `₹${Math.round(amount * 0.58).toLocaleString('en-IN')}`,
        riskLevel: 'Low',
        description: 'Request customer to switch from NetBanking to UPI or Debit card',
        whySelected: 'Good backup option if primary payment instrument is degraded.'
      },
      {
        id: 'Manual Review',
        name: 'Manual Review',
        probability: 43,
        estimatedValue: Math.round(amount * 0.43),
        formattedEstimated: `₹${Math.round(amount * 0.43).toLocaleString('en-IN')}`,
        riskLevel: 'Low',
        description: 'Escalate to merchant support team for manual follow-up',
        whySelected: 'Recommended when retry limits or risk thresholds are exceeded.'
      }
    ];

    return list;
  },

  // Runs AI Safety Checks guardrail evaluation
  runSafetyChecks(payment, strategy) {
    const isOverLimit = payment?.attempts >= 3 || payment?.safetyBlocked;
    
    return [
      { id: 'duplicate', name: 'Duplicate action check', passed: true, status: 'Passed (Zero duplicate ID)' },
      { id: 'retryLimit', name: 'Retry limit check', passed: !isOverLimit, status: isOverLimit ? 'Failed (Retry limit exceeded 3/3)' : `Passed (${payment?.attempts || 1}/3 attempts)` },
      { id: 'eligibility', name: 'Transaction eligibility', passed: true, status: 'Passed (Eligible merchant account)' },
      { id: 'merchantApproval', name: 'Merchant approval requirement', passed: true, status: 'Passed (Human sign-off active)' },
      { id: 'simulation', name: 'Simulation environment', passed: true, status: 'Passed (Sandbox environment)' },
      { id: 'auditLogging', name: 'Audit logging enabled', passed: true, status: 'Passed (Immutable audit enabled)' }
    ];
  }
};
