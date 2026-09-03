// Strategy Simulator Calculation & Logic Layer

import { baseStrategyTemplates, mockFailedPayments } from '../data/strategyData';

export const calculateExpectedRecovery = (amount, probability) => {
  if (!amount || !probability) return 0;
  return Math.round(amount * (probability / 100));
};

export const calculateStrategyScore = (strategyId, probability, amount, riskLevel, customerImpact, expectedTime) => {
  let score = probability * 0.65;
  
  // Risk modifier
  if (riskLevel === 'Low') score += 20;
  else if (riskLevel === 'Medium') score += 10;
  else if (riskLevel === 'High') score += 2;

  // Impact modifier
  if (customerImpact === 'Low') score += 15;
  else if (customerImpact === 'Medium') score += 8;
  else if (customerImpact === 'High') score += 2;

  return Math.min(99, Math.max(30, Math.round(score)));
};

export const strategySimulator = {
  // Evaluates 4 candidate strategies for a given failed payment
  getPaymentStrategies(payment) {
    if (!payment) return [];

    const amount = payment.amount || 4999;
    const baseProb = payment.probability || 91;

    return baseStrategyTemplates.map((template) => {
      let prob = baseProb;
      if (template.id === 'Delayed Retry') prob = baseProb;
      else if (template.id === 'Immediate Retry') prob = Math.max(30, Math.round(baseProb * 0.74));
      else if (template.id === 'Alternate Payment') prob = 58;
      else if (template.id === 'Manual Review') prob = 43;

      const expectedRecovery = calculateExpectedRecovery(amount, prob);
      const formattedExpectedRecovery = `₹${expectedRecovery.toLocaleString('en-IN')}`;

      const aiScore = calculateStrategyScore(
        template.id, 
        prob, 
        amount, 
        template.riskLevel, 
        template.customerImpact, 
        template.expectedTime
      );

      return {
        ...template,
        probability: prob,
        estimatedRecovery: expectedRecovery,
        formattedEstimatedRecovery: formattedExpectedRecovery,
        aiScore,
        recommended: template.id === 'Delayed Retry'
      };
    });
  },

  // Evaluates aggregated strategy outcomes for multiple selected payments
  getBulkStrategies(selectedPayments = []) {
    if (selectedPayments.length === 0) return [];

    const totalAmount = selectedPayments.reduce((sum, p) => sum + p.amount, 0);

    return baseStrategyTemplates.map((template) => {
      let totalProbSum = 0;
      let totalRecovery = 0;

      selectedPayments.forEach((payment) => {
        const baseProb = payment.probability || 88;
        let prob = baseProb;
        if (template.id === 'Delayed Retry') prob = baseProb;
        else if (template.id === 'Immediate Retry') prob = Math.max(30, Math.round(baseProb * 0.74));
        else if (template.id === 'Alternate Payment') prob = 58;
        else if (template.id === 'Manual Review') prob = 41;

        totalProbSum += prob;
        totalRecovery += calculateExpectedRecovery(payment.amount, prob);
      });

      const avgProb = Math.round(totalProbSum / selectedPayments.length);
      const formattedRecovery = `₹${totalRecovery.toLocaleString('en-IN')}`;

      const aiScore = calculateStrategyScore(
        template.id, 
        avgProb, 
        totalRecovery, 
        template.riskLevel, 
        template.customerImpact, 
        template.expectedTime
      );

      return {
        ...template,
        probability: avgProb,
        estimatedRecovery: totalRecovery,
        formattedEstimatedRecovery: formattedRecovery,
        aiScore,
        recommended: template.id === 'Delayed Retry'
      };
    });
  },

  // Simulates a single strategy execution
  simulateStrategy(payment, strategyId) {
    const strategies = this.getPaymentStrategies(payment);
    const selected = strategies.find(s => s.id === strategyId) || strategies[0];

    return {
      payment,
      strategy: selected,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      eligibleForRetry: true,
      recommendedCooldown: selected.expectedTime,
      estimatedRecovery: selected.estimatedRecovery,
      formattedEstimatedRecovery: selected.formattedEstimatedRecovery,
      simulatedOutcome: `Eligible for ${selected.name.toLowerCase()}. Recommended cooldown: ${selected.expectedTime}. Estimated recovery: ${selected.formattedEstimatedRecovery}.`
    };
  }
};
