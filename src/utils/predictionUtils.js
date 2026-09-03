// Prediction Engine & Opportunity Scoring Utilities

export function calculateOpportunityScore(amount = 4999, probability = 91, failureReason = 'Temporary Bank Failure') {
  // Score formula: 60% probability + 20% amount ratio + 20% recoverability of reason
  let normAmount = Math.min(20, Math.round((amount / 15000) * 20));
  let normProb = (probability / 100) * 60;

  let reasonBonus = 15;
  if (failureReason.includes('Bank') || failureReason.includes('Timeout')) reasonBonus = 20;
  else if (failureReason.includes('Card') || failureReason.includes('Authentication')) reasonBonus = 18;
  else if (failureReason.includes('Funds')) reasonBonus = 10;
  else if (failureReason.includes('Limit') || failureReason.includes('Retries')) reasonBonus = 5;

  const score = Math.min(99, Math.max(30, Math.round(normProb + normAmount + reasonBonus)));

  let category = "Low";
  if (score >= 90) category = "Very High";
  else if (score >= 75) category = "High";
  else if (score >= 50) category = "Medium";

  return { score, category };
}

export function predictRecovery({ amount = 5000, probability = 85, strategy = 'Delayed Retry' }) {
  let modProb = probability;
  if (strategy === 'Delayed Retry') modProb = Math.min(95, probability + 3);
  else if (strategy === 'Immediate Retry') modProb = Math.max(30, probability - 15);
  else if (strategy === 'Alternate Payment') modProb = 58;
  else if (strategy === 'Manual Review') modProb = 41;

  const potentialRecovery = Math.round(amount * (modProb / 100));

  return {
    recoveryProbability: modProb,
    potentialRecovery,
    formattedPotentialRecovery: `₹${potentialRecovery.toLocaleString('en-IN')}`,
    confidence: Math.round(modProb * 0.95),
    factors: [
      "Recent payment failure pattern telemetry",
      "Historical customer recovery behavior",
      "Failure reason distribution analysis",
      `Strategy modifier (${strategy})`
    ]
  };
}

export function runWhatIfAnalysis(totalVal = 740000, currentStrategy = 'Delayed Retry', newStrategy = 'Delayed Retry', reachPct = 80) {
  let baseProb = 86;
  if (newStrategy === 'Immediate Retry') baseProb = 63;
  else if (newStrategy === 'Alternate Payment') baseProb = 57;
  else if (newStrategy === 'Manual Review') baseProb = 41;

  const effectiveProb = (baseProb * (reachPct / 100));
  const whatIfPotential = Math.round(totalVal * (effectiveProb / 100));
  const currentPotential = Math.round(totalVal * 0.86);

  const diff = whatIfPotential - currentPotential;

  return {
    currentPotential,
    formattedCurrentPotential: `₹${(currentPotential / 100000).toFixed(1)}L`,
    whatIfPotential,
    formattedWhatIfPotential: `₹${(whatIfPotential / 100000).toFixed(1)}L`,
    difference: diff,
    formattedDifference: `${diff >= 0 ? '+' : ''}₹${(diff / 1000).toFixed(0)}K`
  };
}
