// Mock Data for PayRecover AI Dashboard

export const initialKpis = {
  revenueAtRisk: {
    value: 124500,
    formatted: "₹1,24,500",
    change: "+12.4%",
    isPositive: false, // More at risk is negative metric
    period: "vs previous period"
  },
  recoveredRevenue: {
    value: 48750,
    formatted: "₹48,750",
    change: "+18.7%",
    isPositive: true,
    period: "vs previous period"
  },
  recoveryRate: {
    value: 39.2,
    formatted: "39.2%",
    change: "+6.8%",
    isPositive: true,
    period: "vs previous period"
  },
  failedPayments: {
    value: 127,
    formatted: "127",
    change: "-8.3%",
    isPositive: true, // Fewer failed payments is positive
    period: "vs previous period"
  }
};

export const chart30DaysData = [
  { day: 'Day 1', recovered: 1200, atRisk: 4200 },
  { day: 'Day 3', recovered: 2400, atRisk: 4800 },
  { day: 'Day 5', recovered: 3100, atRisk: 4100 },
  { day: 'Day 7', recovered: 5200, atRisk: 6500 },
  { day: 'Day 9', recovered: 6800, atRisk: 7200 },
  { day: 'Day 11', recovered: 9400, atRisk: 8100 },
  { day: 'Day 13', recovered: 12100, atRisk: 9300 },
  { day: 'Day 15', recovered: 15400, atRisk: 11200 },
  { day: 'Day 17', recovered: 19800, atRisk: 12800 },
  { day: 'Day 19', recovered: 24200, atRisk: 14500 },
  { day: 'Day 21', recovered: 29500, atRisk: 16100 },
  { day: 'Day 23', recovered: 34800, atRisk: 17900 },
  { day: 'Day 25', recovered: 40100, atRisk: 19200 },
  { day: 'Day 27', recovered: 44300, atRisk: 21500 },
  { day: 'Day 30', recovered: 48750, atRisk: 23100 },
];

export const failureReasonsData = [
  { name: 'Insufficient Funds', value: 32, amount: '₹39,840', color: '#6366F1' },
  { name: 'Bank Unavailable', value: 24, amount: '₹29,880', color: '#EC4899' },
  { name: 'Card Expired', value: 18, amount: '₹22,410', color: '#F59E0B' },
  { name: 'Network Error', value: 14, amount: '₹17,430', color: '#10B981' },
  { name: 'Other', value: 12, amount: '₹14,940', color: '#94A3B8' },
];

export const recoveryOpportunitiesSummary = {
  high: 24,
  medium: 51,
  low: 52,
  totalAtRisk: 127
};

export const highValueOpportunities = [
  {
    id: "TXN_1042",
    customer: "Rahul Sharma",
    email: "rahul.s@example.com",
    amount: 4999,
    formattedAmount: "₹4,999",
    failureReason: "Bank unavailable",
    probability: 91,
    recommendedAction: "Delayed Retry",
    status: "Ready",
    risk: "High Value",
    method: "HDFC NetBanking",
    attempts: 1,
    ltv: "₹32,400",
    successfulPayments: 7,
    avgTxn: "₹4,200",
    why: "Strong payment history combined with a temporary bank-side failure makes this transaction a strong retry candidate."
  },
  {
    id: "TXN_1038",
    customer: "Priya Reddy",
    email: "priya.r@example.com",
    amount: 9999,
    formattedAmount: "₹9,999",
    failureReason: "Card expired",
    probability: 96,
    recommendedAction: "Update Payment Method",
    status: "Action Needed",
    risk: "High Value",
    method: "Visa Credit Card (•••• 4021)",
    attempts: 2,
    ltv: "₹68,500",
    successfulPayments: 14,
    avgTxn: "₹5,100",
    why: "Customer has updated their card on file in account settings. Triggering automated payment link update will resolve."
  },
  {
    id: "TXN_1021",
    customer: "Arjun Kumar",
    email: "arjun.k@example.com",
    amount: 2499,
    formattedAmount: "₹2,499",
    failureReason: "Insufficient funds",
    probability: 74,
    recommendedAction: "Retry Later",
    status: "Pending",
    risk: "Medium Value",
    method: "UPI (arjun@okaxis)",
    attempts: 1,
    ltv: "₹14,200",
    successfulPayments: 4,
    avgTxn: "₹2,800",
    why: "Salary credit pattern analysis suggests high probability of recovery if retried on 1st of next month."
  },
  {
    id: "TXN_1019",
    customer: "Sneha Patel",
    email: "sneha.p@example.com",
    amount: 14999,
    formattedAmount: "₹14,999",
    failureReason: "Bank network timeout",
    probability: 88,
    recommendedAction: "Smart Switch Gateway",
    status: "Ready",
    risk: "High Value",
    method: "ICICI NetBanking",
    attempts: 1,
    ltv: "₹1,12,000",
    successfulPayments: 18,
    avgTxn: "₹8,500",
    why: "Secondary ICICI processing node is operational. Rerouting transaction via secondary route will succeed."
  },
  {
    id: "TXN_1015",
    customer: "Vikram Malhotra",
    email: "vikram.m@example.com",
    amount: 7500,
    formattedAmount: "₹7,500",
    failureReason: "3D Secure auth failed",
    probability: 65,
    recommendedAction: "Send WhatsApp Link",
    status: "Action Needed",
    risk: "Medium Value",
    method: "Mastercard (•••• 8812)",
    attempts: 3,
    ltv: "₹45,000",
    successfulPayments: 9,
    avgTxn: "₹4,800",
    why: "SMS OTP timed out. Customer responds quickly to WhatsApp interactive payment links."
  }
];

export const allPaymentsData = [
  ...highValueOpportunities,
  {
    id: "TXN_1012",
    customer: "Ananya Iyer",
    email: "ananya.i@example.com",
    amount: 3200,
    formattedAmount: "₹3,200",
    failureReason: "Insufficient funds",
    probability: 58,
    recommendedAction: "Scheduled Partial Retry",
    status: "Pending",
    risk: "Low Value",
    method: "UPI (ananya@ybl)",
    attempts: 2,
    ltv: "₹9,800",
    successfulPayments: 3,
    avgTxn: "₹2,100",
    why: "Multiple low balance responses. Recommend delayed retry after salary period."
  },
  {
    id: "TXN_1009",
    customer: "Rohan Verma",
    email: "rohan.v@example.com",
    amount: 18500,
    formattedAmount: "₹18,500",
    failureReason: "Card limit exceeded",
    probability: 82,
    recommendedAction: "Offer NetBanking Fallback",
    status: "Ready",
    risk: "High Value",
    method: "Axis Credit Card (•••• 1944)",
    attempts: 1,
    ltv: "₹94,000",
    successfulPayments: 11,
    avgTxn: "₹9,200",
    why: "Daily limit exceeded on primary card. Prompting user to switch to NetBanking or alternate card."
  },
  {
    id: "TXN_1005",
    customer: "Kavita Nair",
    email: "kavita.n@example.com",
    amount: 1200,
    formattedAmount: "₹1,200",
    failureReason: "Invalid CVV",
    probability: 93,
    recommendedAction: "CVV Re-prompt",
    status: "Action Needed",
    risk: "Low Value",
    method: "Visa Debit Card (•••• 6012)",
    attempts: 1,
    ltv: "₹18,600",
    successfulPayments: 6,
    avgTxn: "₹1,500",
    why: "Typo in security code. Immediate quick-fix checkout link resolves this failure mode."
  },
  {
    id: "TXN_1001",
    customer: "Siddharth Das",
    email: "siddharth.d@example.com",
    amount: 6400,
    formattedAmount: "₹6,400",
    failureReason: "Bank temporarily unavailable",
    probability: 95,
    recommendedAction: "Delayed Retry",
    status: "Recovered",
    risk: "Medium Value",
    method: "SBI NetBanking",
    attempts: 1,
    ltv: "₹41,200",
    successfulPayments: 8,
    avgTxn: "₹3,900",
    why: "SBI core banking system completed scheduled maintenance window. Retry executed successfully."
  }
];

export const strategiesData = {
  conservative: {
    id: "conservative",
    name: "Conservative",
    tagline: "Low intervention & lowest customer risk",
    expectedRecovery: 31200,
    formattedRecovery: "₹31,200",
    recoveryRate: "34.0%",
    retries: 32,
    contacts: 18,
    risk: "Low",
    riskColor: "emerald",
    description: "Focuses only on high-confidence system retries without disturbing customers. Zero SMS/WhatsApp spam."
  },
  balanced: {
    id: "balanced",
    name: "Balanced",
    tagline: "Recommended default strategy",
    expectedRecovery: 43800,
    formattedRecovery: "₹43,800",
    recoveryRate: "47.2%",
    retries: 68,
    contacts: 34,
    risk: "Medium",
    riskColor: "amber",
    recommended: true,
    description: "Smart retries combined with gentle WhatsApp payment links for high-LTV customers after 24h grace period."
  },
  aggressive: {
    id: "aggressive",
    name: "Aggressive",
    tagline: "Maximum revenue recovery speed",
    expectedRecovery: 51600,
    formattedRecovery: "₹51,600",
    recoveryRate: "54.5%",
    retries: 104,
    contacts: 71,
    risk: "High",
    riskColor: "rose",
    description: "Multiple retry attempts across peak banking hours, active email/SMS nudges, and immediate alternative gateway routing."
  }
};

export const auditLogsInitial = [
  {
    id: "LOG_8842",
    timestamp: "10:42 AM",
    date: "Today",
    txnId: "TXN_1042",
    customer: "Rahul Sharma",
    amount: "₹4,999",
    decision: "Delayed Retry",
    action: "Approved",
    confidence: "91%",
    approver: "Merchant",
    result: "Recovered",
    statusBadge: "emerald"
  },
  {
    id: "LOG_8840",
    timestamp: "10:31 AM",
    date: "Today",
    txnId: "TXN_1038",
    customer: "Priya Reddy",
    amount: "₹9,999",
    decision: "Payment Update",
    action: "Approved",
    confidence: "96%",
    approver: "Merchant",
    result: "Pending",
    statusBadge: "amber"
  },
  {
    id: "LOG_8835",
    timestamp: "10:14 AM",
    date: "Today",
    txnId: "TXN_1021",
    customer: "Arjun Kumar",
    amount: "₹2,499",
    decision: "Manual Review",
    action: "Escalated",
    confidence: "68%",
    approver: "System",
    result: "Review",
    statusBadge: "slate"
  },
  {
    id: "LOG_8829",
    timestamp: "09:50 AM",
    date: "Today",
    txnId: "TXN_1019",
    customer: "Sneha Patel",
    amount: "₹14,999",
    decision: "Smart Switch Gateway",
    action: "Approved",
    confidence: "88%",
    approver: "Auto-Rules",
    result: "Recovered",
    statusBadge: "emerald"
  },
  {
    id: "LOG_8811",
    timestamp: "Yesterday",
    date: "Yesterday",
    txnId: "TXN_1001",
    customer: "Siddharth Das",
    amount: "₹6,400",
    decision: "Delayed Retry",
    action: "Approved",
    confidence: "95%",
    approver: "Merchant",
    result: "Recovered",
    statusBadge: "emerald"
  }
];

export const analyticsData = {
  recoveryByReason: [
    { reason: 'Bank Unavailable', recovered: 18450, total: 29880 },
    { reason: 'Card Expired', recovered: 14200, total: 22410 },
    { reason: 'Insufficient Funds', recovered: 8900, total: 39840 },
    { reason: 'Network Timeout', recovered: 7200, total: 17430 },
  ],
  recoveryByMethod: [
    { method: 'UPI Instant', amount: 22400, rate: 52 },
    { method: 'HDFC NetBanking', amount: 14800, rate: 48 },
    { method: 'Credit Cards', amount: 8250, rate: 31 },
    { method: 'Debit Cards', amount: 3300, rate: 24 },
  ],
  aiPerformance: [
    { action: 'Delayed Retry', successRate: 87, count: 48 },
    { action: 'Payment Update Link', successRate: 81, count: 32 },
    { action: 'Alternate Method Nudge', successRate: 74, count: 29 },
    { action: 'Manual Review', successRate: 62, count: 18 }
  ]
};
