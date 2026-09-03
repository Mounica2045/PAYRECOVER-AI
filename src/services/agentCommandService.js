// Deterministic Agent Command Interpreter Service

import { intelligenceService } from './intelligenceService';

export const agentCommandService = {
  interpretCommand(commandText = "") {
    const q = commandText.trim().toLowerCase();

    if (!q) {
      return {
        intent: "empty",
        confidence: 0,
        responseMessage: "Please enter a question or select a quick command."
      };
    }

    // Prohibited Action Guardrail check (Requirement #41)
    if (q.includes("charge") || q.includes("send real") || q.includes("cvv") || q.includes("pin") || q.includes("password")) {
      return {
        intent: "prohibited",
        confidence: 1.0,
        responseMessage: "I cannot perform real payments, send live customer messages, or access financial credentials in this simulation environment.",
        isProhibited: true
      };
    }

    // 1. Find Opportunities
    if (q.includes("opportunity") || q.includes("high-value") || q.includes("best payment") || q.includes("find")) {
      return {
        intent: "find_opportunities",
        confidence: 0.96,
        responseMessage: "✦ Agent: I identified 42 high-value failed payments with recovery probability above 85%. Potential recovery: ₹2.1L. Recommended strategy: Delayed Retry.",
        actionRoute: "intelligence",
        actionButtonText: "Review Opportunities",
        secondaryButtonText: "Simulate Recovery",
        dataPayload: { count: 42, potentialRecovery: "₹2.1L", strategy: "Delayed Retry" }
      };
    }

    // 2. Analyze Failures
    if (q.includes("fail") || q.includes("cause") || q.includes("reason") || q.includes("downtime")) {
      return {
        intent: "analyze_failures",
        confidence: 0.94,
        responseMessage: "✦ Agent: Analysis shows 32% of failures are Temporary Bank Downtimes (₹8.2L value), peaking on Friday due to bank clearing house latency.",
        actionRoute: "intelligence",
        actionButtonText: "View Failure Intelligence",
        dataPayload: { topReason: "Temporary Bank Failure", percentage: "32%", peakDay: "Friday" }
      };
    }

    // 3. Forecast Recovery
    if (q.includes("forecast") || q.includes("predict") || q.includes("next 7 days") || q.includes("trajectory")) {
      return {
        intent: "forecast_recovery",
        confidence: 0.92,
        responseMessage: "✦ Agent: Forecast for the next 7 days indicates ₹4.8L predicted failed value with ₹3.1L potential recoverable value (65% estimated recovery rate, 82% confidence).",
        actionRoute: "intelligence",
        actionButtonText: "View Recovery Forecast",
        dataPayload: { forecastValue: "₹3.1L", rate: "65%" }
      };
    }

    // 4. Create Campaign
    if (q.includes("campaign") || q.includes("bank failure campaign") || q.includes("audience")) {
      return {
        intent: "create_campaign",
        confidence: 0.95,
        responseMessage: "✦ Agent: I recommend launching a Delayed Retry campaign targeting 135 customers experiencing issuer bank failures. Estimated recovery: ₹2.24L.",
        actionRoute: "campaigns",
        actionButtonText: "Create Recovery Campaign",
        dataPayload: { audience: "Temporary Bank Failures", customers: 135, potentialRecovery: "₹2.24L" }
      };
    }

    // 5. Simulate Strategy
    if (q.includes("strategy") || q.includes("retry") || q.includes("simulate") || q.includes("compare")) {
      return {
        intent: "simulate_strategy",
        confidence: 0.93,
        responseMessage: "✦ Agent: Delayed Retry yields 86% recovery probability (+23% over Immediate Retry) with low customer impact.",
        actionRoute: "simulator",
        actionButtonText: "Run Strategy Simulator",
        dataPayload: { bestStrategy: "Delayed Retry", yield: "86%" }
      };
    }

    // 6. Review Safety / Guardrails
    if (q.includes("safety") || q.includes("cooldown") || q.includes("guardrail") || q.includes("rule")) {
      return {
        intent: "review_safety",
        confidence: 0.91,
        responseMessage: "✦ Agent: Safety Gate Active (8/8 Checks Passed). Cooldown guardrail excluded 7 duplicate customers in the last 15 minutes.",
        actionRoute: "audit",
        actionButtonText: "Review Safety Center",
        dataPayload: { score: "98/100", activeRules: 6 }
      };
    }

    // 7. Revenue at Risk
    if (q.includes("risk") || q.includes("revenue") || q.includes("unrecovered")) {
      return {
        intent: "show_revenue_risk",
        confidence: 0.95,
        responseMessage: "✦ Agent: Total Revenue at Risk is ₹18.4L. ₹12.7L (69%) is estimated as potentially recoverable with optimal AI strategies.",
        actionRoute: "intelligence",
        actionButtonText: "Analyze Revenue at Risk",
        dataPayload: { totalRisk: "₹18.4L", recoverable: "₹12.7L" }
      };
    }

    // Fallback unhandled intent (Requirement #7)
    return {
      intent: "unknown",
      confidence: 0.4,
      responseMessage: "I couldn't confidently understand that request. Try asking:\n• Find high-value recovery opportunities\n• Analyze payment failures\n• Forecast recovery\n• Create a campaign",
      isUnknown: true
    };
  }
};
