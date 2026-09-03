// Strategy Simulator Mock Dataset Architecture

export const mockFailedPayments = [
  {
    id: "TXN_1042",
    customer: "Rahul Sharma",
    initials: "RS",
    email: "rahul.sharma@example.com",
    amount: 4999,
    formattedAmount: "₹4,999",
    failureReason: "Bank Unavailable",
    probability: 91,
    priority: "HIGH",
    attempts: 1,
    date: "3 min ago",
    customerStats: { previousPayments: 18, successfulPayments: 16, failedPayments: 2, successRate: "88.9%" }
  },
  {
    id: "TXN_1038",
    customer: "Priya Reddy",
    initials: "PR",
    email: "priya.reddy@example.com",
    amount: 9999,
    formattedAmount: "₹9,999",
    failureReason: "Card Expired",
    probability: 96,
    priority: "HIGH",
    attempts: 2,
    date: "12 min ago",
    customerStats: { previousPayments: 24, successfulPayments: 23, failedPayments: 1, successRate: "95.8%" }
  },
  {
    id: "TXN_1021",
    customer: "Arjun Kumar",
    initials: "AK",
    email: "arjun.k@example.com",
    amount: 2499,
    formattedAmount: "₹2,499",
    failureReason: "Insufficient Funds",
    probability: 74,
    priority: "MEDIUM",
    attempts: 1,
    date: "25 min ago",
    customerStats: { previousPayments: 12, successfulPayments: 9, failedPayments: 3, successRate: "75.0%" }
  },
  {
    id: "TXN_1017",
    customer: "Sneha Iyer",
    initials: "SI",
    email: "sneha.i@example.com",
    amount: 7499,
    formattedAmount: "₹7,499",
    failureReason: "Network Error",
    probability: 68,
    priority: "MEDIUM",
    attempts: 1,
    date: "40 min ago",
    customerStats: { previousPayments: 15, successfulPayments: 11, failedPayments: 4, successRate: "73.3%" }
  },
  {
    id: "TXN_1012",
    customer: "Karthik N.",
    initials: "KN",
    email: "karthik.n@example.com",
    amount: 5499,
    formattedAmount: "₹5,499",
    failureReason: "Payment Limit Exceeded",
    probability: 62,
    priority: "LOW",
    attempts: 1,
    date: "1h ago",
    customerStats: { previousPayments: 8, successfulPayments: 5, failedPayments: 3, successRate: "62.5%" }
  },
  {
    id: "TXN_1009",
    customer: "Ananya Deshmukh",
    initials: "AD",
    email: "ananya.d@example.com",
    amount: 3200,
    formattedAmount: "₹3,200",
    failureReason: "Bank Unavailable",
    probability: 89,
    priority: "HIGH",
    attempts: 1,
    date: "1h 15m ago",
    customerStats: { previousPayments: 14, successfulPayments: 13, failedPayments: 1, successRate: "92.8%" }
  },
  {
    id: "TXN_1003",
    customer: "Kavita Nair",
    initials: "KN",
    email: "kavita.n@example.com",
    amount: 1200,
    formattedAmount: "₹1,200",
    failureReason: "Authentication Failed",
    probability: 93,
    priority: "HIGH",
    attempts: 1,
    date: "2h ago",
    customerStats: { previousPayments: 10, successfulPayments: 9, failedPayments: 1, successRate: "90.0%" }
  },
  {
    id: "TXN_0995",
    customer: "Tarun Gill",
    initials: "TG",
    email: "tarun.g@example.com",
    amount: 4500,
    formattedAmount: "₹4,500",
    failureReason: "Bank Unavailable",
    probability: 88,
    priority: "HIGH",
    attempts: 1,
    date: "2h 30m ago",
    customerStats: { previousPayments: 20, successfulPayments: 18, failedPayments: 2, successRate: "90.0%" }
  },
  {
    id: "TXN_0987",
    customer: "Ishita Roy",
    initials: "IR",
    email: "ishita.r@example.com",
    amount: 950,
    formattedAmount: "₹950",
    failureReason: "Insufficient Funds",
    probability: 71,
    priority: "LOW",
    attempts: 1,
    date: "3h ago",
    customerStats: { previousPayments: 6, successfulPayments: 4, failedPayments: 2, successRate: "66.7%" }
  },
  {
    id: "TXN_0980",
    customer: "Pooja Hegde",
    initials: "PH",
    email: "pooja.h@example.com",
    amount: 3800,
    formattedAmount: "₹3,800",
    failureReason: "Card Expired",
    probability: 95,
    priority: "HIGH",
    attempts: 2,
    date: "4h ago",
    customerStats: { previousPayments: 19, successfulPayments: 18, failedPayments: 1, successRate: "94.7%" }
  }
];

export const baseStrategyTemplates = [
  {
    id: "Delayed Retry",
    name: "Delayed Retry",
    description: "Retry the payment after a short cooldown period.",
    riskLevel: "Low",
    expectedTime: "15 minutes",
    customerImpact: "Low",
    baseModifier: 1.0,
    whyChoose: "The failure appears temporary and the customer has a strong payment history. A short cooldown reduces repeated failure attempts."
  },
  {
    id: "Immediate Retry",
    name: "Immediate Retry",
    description: "Retry the payment immediately through an alternate node.",
    riskLevel: "Medium",
    expectedTime: "1 minute",
    customerImpact: "Medium",
    baseModifier: 0.74,
    whyChoose: "Fast execution for transient network glitches, but carries moderate risk of hitting bank gateway rate limits."
  },
  {
    id: "Alternate Payment",
    name: "Alternate Payment",
    description: "Encourage another payment method (UPI / Debit Card).",
    riskLevel: "Low",
    expectedTime: "5 minutes",
    customerImpact: "Medium",
    baseModifier: 0.64,
    whyChoose: "Prompts the customer to switch payment instrument, bypassing permanent card/account issues."
  },
  {
    id: "Manual Review",
    name: "Manual Review",
    description: "Send the payment for human review by risk team.",
    riskLevel: "Low",
    expectedTime: "30 minutes",
    customerImpact: "High",
    baseModifier: 0.47,
    whyChoose: "Escalates transaction to merchant support team for high-risk or retry-exceeded payments."
  }
];
