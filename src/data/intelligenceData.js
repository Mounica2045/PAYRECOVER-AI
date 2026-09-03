// AI Recovery Intelligence & Predictive Analytics Dataset

import { mockFailedPayments, baseStrategyTemplates } from './strategyData';

export const mockOpportunities = [
  {
    id: "TXN_1042",
    customer: "Rahul Sharma",
    amount: 4999,
    formattedAmount: "₹4,999",
    failureReason: "Temporary Bank Failure",
    probability: 91,
    opportunityScore: 94,
    scoreCategory: "Very High",
    recommendedStrategy: "Delayed Retry",
    potentialRecovery: 4549,
    formattedPotentialRecovery: "₹4,549",
    confidence: 91
  },
  {
    id: "TXN_1038",
    customer: "Priya Reddy",
    amount: 9999,
    formattedAmount: "₹9,999",
    failureReason: "Card Expired",
    probability: 96,
    opportunityScore: 98,
    scoreCategory: "Very High",
    recommendedStrategy: "Update Payment Method",
    potentialRecovery: 9599,
    formattedPotentialRecovery: "₹9,599",
    confidence: 96
  },
  {
    id: "TXN_1021",
    customer: "Arjun Kumar",
    amount: 2499,
    formattedAmount: "₹2,499",
    failureReason: "Insufficient Funds",
    probability: 67,
    opportunityScore: 78,
    scoreCategory: "High",
    recommendedStrategy: "Delayed Retry",
    potentialRecovery: 1674,
    formattedPotentialRecovery: "₹1,674",
    confidence: 75
  },
  {
    id: "TXN_1017",
    customer: "Sneha Iyer",
    amount: 7499,
    formattedAmount: "₹7,499",
    failureReason: "Network Timeout",
    probability: 88,
    opportunityScore: 92,
    scoreCategory: "Very High",
    recommendedStrategy: "Immediate Retry",
    potentialRecovery: 6599,
    formattedPotentialRecovery: "₹6,599",
    confidence: 88
  },
  {
    id: "TXN_1012",
    customer: "Karthik N.",
    amount: 5499,
    formattedAmount: "₹5,499",
    failureReason: "Payment Limit Exceeded",
    probability: 62,
    opportunityScore: 74,
    scoreCategory: "Medium",
    recommendedStrategy: "Alternate Payment",
    potentialRecovery: 3409,
    formattedPotentialRecovery: "₹3,409",
    confidence: 65
  },
  {
    id: "TXN_1009",
    customer: "Ananya Deshmukh",
    amount: 3200,
    formattedAmount: "₹3,200",
    failureReason: "Temporary Bank Failure",
    probability: 89,
    opportunityScore: 90,
    scoreCategory: "Very High",
    recommendedStrategy: "Delayed Retry",
    potentialRecovery: 2848,
    formattedPotentialRecovery: "₹2,848",
    confidence: 89
  },
  {
    id: "TXN_1003",
    customer: "Kavita Nair",
    amount: 1200,
    formattedAmount: "₹1,200",
    failureReason: "Authentication Failure",
    probability: 93,
    opportunityScore: 91,
    scoreCategory: "Very High",
    recommendedStrategy: "Send Payment Link",
    potentialRecovery: 1116,
    formattedPotentialRecovery: "₹1,116",
    confidence: 93
  },
  {
    id: "TXN_0995",
    customer: "Tarun Gill",
    amount: 4500,
    formattedAmount: "₹4,500",
    failureReason: "Temporary Bank Failure",
    probability: 88,
    opportunityScore: 89,
    scoreCategory: "High",
    recommendedStrategy: "Delayed Retry",
    potentialRecovery: 3960,
    formattedPotentialRecovery: "₹3,960",
    confidence: 88
  },
  {
    id: "TXN_0987",
    customer: "Ishita Roy",
    amount: 950,
    formattedAmount: "₹950",
    failureReason: "Insufficient Funds",
    probability: 71,
    opportunityScore: 72,
    scoreCategory: "Medium",
    recommendedStrategy: "Delayed Retry",
    potentialRecovery: 674,
    formattedPotentialRecovery: "₹674",
    confidence: 73
  },
  {
    id: "TXN_0980",
    customer: "Pooja Hegde",
    amount: 3800,
    formattedAmount: "₹3,800",
    failureReason: "Card Expired",
    probability: 95,
    opportunityScore: 96,
    scoreCategory: "Very High",
    recommendedStrategy: "Update Payment Method",
    potentialRecovery: 3610,
    formattedPotentialRecovery: "₹3,610",
    confidence: 95
  },
  {
    id: "TXN_0971",
    customer: "Ritu Singhania",
    amount: 17500,
    formattedAmount: "₹17,500",
    failureReason: "Temporary Bank Failure",
    probability: 90,
    opportunityScore: 95,
    scoreCategory: "Very High",
    recommendedStrategy: "Delayed Retry",
    potentialRecovery: 15750,
    formattedPotentialRecovery: "₹15,750",
    confidence: 90
  },
  {
    id: "TXN_0964",
    customer: "Mohit Verma",
    amount: 6200,
    formattedAmount: "₹6,200",
    failureReason: "Network Timeout",
    probability: 85,
    opportunityScore: 88,
    scoreCategory: "High",
    recommendedStrategy: "Immediate Retry",
    potentialRecovery: 5270,
    formattedPotentialRecovery: "₹5,270",
    confidence: 85
  },
  {
    id: "TXN_0955",
    customer: "Vikram Malhotra",
    amount: 12500,
    formattedAmount: "₹12,500",
    failureReason: "Multiple Retries Failed",
    probability: 45,
    opportunityScore: 48,
    scoreCategory: "Low",
    recommendedStrategy: "Manual Review",
    potentialRecovery: 5625,
    formattedPotentialRecovery: "₹5,625",
    confidence: 80
  },
  {
    id: "TXN_0948",
    customer: "Siddharth Rao",
    amount: 8100,
    formattedAmount: "₹8,100",
    failureReason: "Temporary Bank Failure",
    probability: 89,
    opportunityScore: 91,
    scoreCategory: "Very High",
    recommendedStrategy: "Delayed Retry",
    potentialRecovery: 7209,
    formattedPotentialRecovery: "₹7,209",
    confidence: 89
  },
  {
    id: "TXN_0939",
    customer: "Aarti Mehra",
    amount: 2900,
    formattedAmount: "₹2,900",
    failureReason: "Insufficient Funds",
    probability: 65,
    opportunityScore: 68,
    scoreCategory: "Medium",
    recommendedStrategy: "Delayed Retry",
    potentialRecovery: 1885,
    formattedPotentialRecovery: "₹1,885",
    confidence: 70
  },
  {
    id: "TXN_0925",
    customer: "Gaurav Pandey",
    amount: 11400,
    formattedAmount: "₹11,400",
    failureReason: "Authentication Failure",
    probability: 92,
    opportunityScore: 94,
    scoreCategory: "Very High",
    recommendedStrategy: "Send Payment Link",
    potentialRecovery: 10488,
    formattedPotentialRecovery: "₹10,488",
    confidence: 92
  },
  {
    id: "TXN_0918",
    customer: "Bhavna Patel",
    amount: 4300,
    formattedAmount: "₹4,300",
    failureReason: "Temporary Bank Failure",
    probability: 87,
    opportunityScore: 88,
    scoreCategory: "High",
    recommendedStrategy: "Delayed Retry",
    potentialRecovery: 3741,
    formattedPotentialRecovery: "₹3,741",
    confidence: 87
  },
  {
    id: "TXN_0912",
    customer: "Manish Joshi",
    amount: 6800,
    formattedAmount: "₹6,800",
    failureReason: "Duplicate Action Exceeded",
    probability: 58,
    opportunityScore: 62,
    scoreCategory: "Medium",
    recommendedStrategy: "Delayed Retry",
    potentialRecovery: 3944,
    formattedPotentialRecovery: "₹3,944",
    confidence: 75
  },
  {
    id: "TXN_0905",
    customer: "Deepak Verma",
    amount: 8200,
    formattedAmount: "₹8,200",
    failureReason: "Temporary Bank Failure",
    probability: 92,
    opportunityScore: 93,
    scoreCategory: "Very High",
    recommendedStrategy: "Delayed Retry",
    potentialRecovery: 7544,
    formattedPotentialRecovery: "₹7,544",
    confidence: 92
  },
  {
    id: "TXN_0899",
    customer: "Alok Gupta",
    amount: 14500,
    formattedAmount: "₹14,500",
    failureReason: "Payment Method Issue",
    probability: 64,
    opportunityScore: 71,
    scoreCategory: "Medium",
    recommendedStrategy: "Alternate Payment",
    potentialRecovery: 9280,
    formattedPotentialRecovery: "₹9,280",
    confidence: 66
  },
  {
    id: "TXN_0884",
    customer: "Neha Saxena",
    amount: 3900,
    formattedAmount: "₹3,900",
    failureReason: "Temporary Bank Failure",
    probability: 91,
    opportunityScore: 92,
    scoreCategory: "Very High",
    recommendedStrategy: "Delayed Retry",
    potentialRecovery: 3549,
    formattedPotentialRecovery: "₹3,549",
    confidence: 91
  },
  {
    id: "TXN_0871",
    customer: "Suresh Menon",
    amount: 5200,
    formattedAmount: "₹5,200",
    failureReason: "Network Timeout",
    probability: 70,
    opportunityScore: 76,
    scoreCategory: "High",
    recommendedStrategy: "Immediate Retry",
    potentialRecovery: 3640,
    formattedPotentialRecovery: "₹3,640",
    confidence: 70
  },
  {
    id: "TXN_0862",
    customer: "Meera Bose",
    amount: 11000,
    formattedAmount: "₹11,000",
    failureReason: "Card Expired",
    probability: 95,
    opportunityScore: 97,
    scoreCategory: "Very High",
    recommendedStrategy: "Update Payment Method",
    potentialRecovery: 10450,
    formattedPotentialRecovery: "₹10,450",
    confidence: 95
  },
  {
    id: "TXN_0845",
    customer: "Vikas Kapoor",
    amount: 6700,
    formattedAmount: "₹6,700",
    failureReason: "Temporary Bank Failure",
    probability: 89,
    opportunityScore: 90,
    scoreCategory: "Very High",
    recommendedStrategy: "Delayed Retry",
    potentialRecovery: 5963,
    formattedPotentialRecovery: "₹5,963",
    confidence: 89
  },
  {
    id: "TXN_0832",
    customer: "Sunita Pandit",
    amount: 19800,
    formattedAmount: "₹19,800",
    failureReason: "High Value Threshold Limit",
    probability: 42,
    opportunityScore: 45,
    scoreCategory: "Low",
    recommendedStrategy: "Manual Review",
    potentialRecovery: 8316,
    formattedPotentialRecovery: "₹8,316",
    confidence: 78
  }
];

export const failureCategoriesData = [
  { name: 'Temporary Bank Failure', percentage: 32, value: 820000, formattedValue: '₹8.2L', color: '#6366F1' },
  { name: 'Insufficient Funds', percentage: 24, value: 440000, formattedValue: '₹4.4L', color: '#EC4899' },
  { name: 'Network Timeout', percentage: 18, value: 330000, formattedValue: '₹3.3L', color: '#8B5CF6' },
  { name: 'Authentication Failure', percentage: 12, value: 180000, formattedValue: '₹1.8L', color: '#10B981' },
  { name: 'Payment Method Issue', percentage: 9, value: 120000, formattedValue: '₹1.2L', color: '#F59E0B' },
  { name: 'Other', percentage: 5, value: 70000, formattedValue: '₹70K', color: '#94A3B8' }
];

export const failureTrendData = [
  { day: 'Monday', rate: 6.4 },
  { day: 'Tuesday', rate: 7.1 },
  { day: 'Wednesday', rate: 8.2 },
  { day: 'Thursday', rate: 7.5 },
  { day: 'Friday', rate: 9.1 },
  { day: 'Saturday', rate: 6.8 },
  { day: 'Sunday', rate: 5.9 }
];

export const detectedPatterns = [
  {
    id: 'PAT_1',
    title: 'Temporary Bank Downtime Recovery',
    description: 'Temporary bank failures are 87% more likely to recover after a 15-minute delayed retry.',
    confidence: 87,
    impact: 'High',
    action: 'Apply Delayed Retry'
  },
  {
    id: 'PAT_2',
    title: 'High-Value Risk Review Threshold',
    description: 'High-value transactions above ₹15,000 show 2.4x higher recovery when manually reviewed.',
    confidence: 79,
    impact: 'Medium',
    action: 'Escalate to Risk Team'
  },
  {
    id: 'PAT_3',
    title: 'Repeated Retry Degradation',
    description: 'Repeated failures within a 5-minute window have a 91% lower recovery probability due to bank rate limiting.',
    confidence: 91,
    impact: 'High',
    action: 'Enforce Cooldown Guardrail'
  }
];

export const customerSegmentsData = [
  {
    id: 'seg_very_high',
    name: 'Very High Recovery Potential',
    customersCount: 284,
    avgPayment: 3240,
    formattedAvgPayment: '₹3,240',
    recoveryProbability: 91,
    potentialRecovery: 810000,
    formattedPotentialRecovery: '₹8.1L',
    recommendedAction: 'Delayed Retry'
  },
  {
    id: 'seg_high',
    name: 'High Recovery Potential',
    customersCount: 417,
    avgPayment: 2190,
    formattedAvgPayment: '₹2,190',
    recoveryProbability: 78,
    potentialRecovery: 490000,
    formattedPotentialRecovery: '₹4.9L',
    recommendedAction: 'Immediate Retry'
  },
  {
    id: 'seg_medium',
    name: 'Medium Recovery Potential',
    customersCount: 563,
    avgPayment: 1840,
    formattedAvgPayment: '₹1,840',
    recoveryProbability: 61,
    potentialRecovery: 380000,
    formattedPotentialRecovery: '₹3.8L',
    recommendedAction: 'Alternate Payment'
  },
  {
    id: 'seg_low',
    name: 'Low Recovery Potential',
    customersCount: 220,
    avgPayment: 4200,
    formattedAvgPayment: '₹4,200',
    recoveryProbability: 38,
    potentialRecovery: 160000,
    formattedPotentialRecovery: '₹1.6L',
    recommendedAction: 'Manual Review'
  }
];

export const strategyPerformanceData = [
  {
    strategy: 'Delayed Retry',
    recoveryProbability: 86,
    potentialRecovery: 740000,
    formattedPotentialRecovery: '₹7.4L',
    customerImpact: 'Low',
    usage: '42%'
  },
  {
    strategy: 'Immediate Retry',
    recoveryProbability: 63,
    potentialRecovery: 490000,
    formattedPotentialRecovery: '₹4.9L',
    customerImpact: 'Medium',
    usage: '31%'
  },
  {
    strategy: 'Alternate Payment',
    recoveryProbability: 57,
    potentialRecovery: 380000,
    formattedPotentialRecovery: '₹3.8L',
    customerImpact: 'Medium',
    usage: '18%'
  },
  {
    strategy: 'Manual Review',
    recoveryProbability: 41,
    potentialRecovery: 210000,
    formattedPotentialRecovery: '₹2.1L',
    customerImpact: 'High',
    usage: '9%'
  }
];

export const aiRecommendationsList = [
  {
    id: 'REC_1',
    num: 1,
    title: 'Prioritize 42 high-value transactions',
    description: 'Transactions with recovery probability above 85% and value > ₹5,000.',
    potentialRecovery: '₹2.1L',
    actionText: 'Open AI Recovery',
    actionRoute: 'ai-agent'
  },
  {
    id: 'REC_2',
    num: 2,
    title: 'Create a delayed-retry campaign for bank failures',
    description: 'Target 135 customers experiencing temporary issuer bank downtime.',
    potentialRecovery: '₹3.2L',
    actionText: 'Create Campaign',
    actionRoute: 'campaigns'
  },
  {
    id: 'REC_3',
    num: 3,
    title: 'Send repeated-failure transactions to manual review',
    description: '28 transactions hitting max retry limit guardrail require merchant sign-off.',
    potentialRecovery: '₹1.4L',
    actionText: 'Run Simulation',
    actionRoute: 'simulator'
  }
];

export const aiInsightFeed = [
  {
    id: 'INS_1',
    category: 'Opportunity',
    severity: 'positive',
    title: 'High-Value Recovery Opportunity',
    description: '42 high-value failed payments have strong recovery potential (>85% probability).',
    route: 'ai-agent',
    buttonText: 'Review'
  },
  {
    id: 'INS_2',
    category: 'Warning',
    severity: 'warning',
    title: 'Friday Failure Spike Detected',
    description: 'Friday shows elevated payment failure activity (9.1% failure rate) across bank gateways.',
    route: 'intelligence',
    buttonText: 'Analyze'
  },
  {
    id: 'INS_3',
    category: 'Trend',
    severity: 'indigo',
    title: 'Delayed Retry Outperforming',
    description: 'Delayed Retry is outperforming Immediate Retry by +23% expected yield in current dataset.',
    route: 'simulator',
    buttonText: 'Simulate'
  }
];
