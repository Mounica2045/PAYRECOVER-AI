// AI Intelligence Service Layer

import { 
  mockOpportunities, 
  failureCategoriesData, 
  failureTrendData, 
  detectedPatterns, 
  customerSegmentsData, 
  strategyPerformanceData, 
  aiRecommendationsList, 
  aiInsightFeed 
} from '../data/intelligenceData';
import { auditService } from './auditService';

export const intelligenceService = {
  // Returns KPI summary metrics for selected time range
  getExecutiveKPIs(period = '30 Days') {
    let multiplier = 1;
    if (period === 'Today') multiplier = 0.1;
    else if (period === '7 Days') multiplier = 0.35;
    else if (period === '90 Days') multiplier = 2.4;

    const risk = Math.round(18.4 * multiplier * 10) / 10;
    const recoverable = Math.round(12.7 * multiplier * 10) / 10;
    const highOppCount = Math.round(284 * multiplier);

    return {
      revenueAtRisk: `₹${risk}L`,
      recoverableValue: `₹${recoverable}L`,
      recoveryProbability: '68.9%',
      highOpportunityPayments: highOppCount,
      failureRate: '7.4%',
      predictedImprovement: '+14.8%'
    };
  },

  // Returns forecast data
  getForecast(period = '30 Days') {
    return {
      next7Days: {
        predictedFailedValue: '₹4.8L',
        potentialRecoverableValue: '₹3.1L',
        estimatedRecoveryRate: '65%',
        confidence: 82
      },
      chartData: [
        { week: 'Week 1', historical: 2.1, predicted: 2.1, potential: 3.2 },
        { week: 'Week 2', historical: 2.4, predicted: 2.5, potential: 3.8 },
        { week: 'Week 3', historical: 2.8, predicted: 3.1, potential: 4.4 },
        { week: 'Week 4', historical: null, predicted: 3.4, potential: 4.8 },
      ]
    };
  },

  getOpportunities() {
    return mockOpportunities;
  },

  getFailureIntelligence() {
    return {
      categories: failureCategoriesData,
      trend: failureTrendData,
      patterns: detectedPatterns
    };
  },

  getCustomerIntelligence() {
    return {
      segments: customerSegmentsData
    };
  },

  getStrategyPerformance() {
    return {
      performance: strategyPerformanceData
    };
  },

  getAIInsights() {
    return {
      recommendations: aiRecommendationsList,
      feed: aiInsightFeed
    };
  },

  // Triggers AI analysis refresh and registers audit log event (Requirement #33 & #39)
  refreshAnalysis() {
    auditService.createAuditEvent({
      type: "AI Recommendation",
      transactionId: "SYS_INTEL",
      customer: "Merchant Portfolio",
      amount: 1840000,
      actor: "AI Agent",
      strategy: "Delayed Retry",
      status: "Recommended",
      description: "AI Recovery Intelligence analysis refreshed across portfolio telemetry data."
    });
    return true;
  },

  // Export CSV report of opportunities (Requirement #35 & #39)
  exportOpportunityReport(opportunities = []) {
    if (!opportunities || opportunities.length === 0) return;

    const headers = ["Transaction ID", "Customer", "Amount", "Failure Reason", "Recovery Probability", "Opportunity Score", "Recommended Strategy", "Potential Recovery"];
    
    const rows = opportunities.map(o => [
      o.id,
      `"${o.customer}"`,
      o.amount,
      `"${o.failureReason}"`,
      `${o.probability}%`,
      o.opportunityScore,
      `"${o.recommendedStrategy}"`,
      `"${o.formattedPotentialRecovery}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `PayRecover_Intelligence_Opportunities_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Register Audit Event
    auditService.createAuditEvent({
      type: "Safety Check Passed",
      transactionId: "SYS_EXPORT",
      customer: "Merchant Portfolio",
      amount: 1840000,
      actor: "Merchant",
      strategy: "Export Report",
      status: "Passed",
      description: "Merchant exported AI Recovery Opportunities intelligence report to CSV."
    });
  }
};
