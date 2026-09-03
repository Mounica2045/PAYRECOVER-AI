// AI Agent Mock Dataset Architecture

export const initialOpportunitiesList = [
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
    priorityScore: 87,
    status: "Awaiting Approval",
    recommendedAction: "Delayed Retry",
    attempts: 1,
    date: "3 min ago",
    customerStats: { previousPayments: 18, successfulPayments: 16, failedPayments: 2, customerSince: "Jan 2024" }
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
    priorityScore: 94,
    status: "Action Needed",
    recommendedAction: "Update Payment Method",
    attempts: 2,
    date: "12 min ago",
    customerStats: { previousPayments: 24, successfulPayments: 23, failedPayments: 1, customerSince: "Nov 2023" }
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
    priorityScore: 68,
    status: "Awaiting Approval",
    recommendedAction: "Retry Later",
    attempts: 1,
    date: "25 min ago",
    customerStats: { previousPayments: 12, successfulPayments: 9, failedPayments: 3, customerSince: "Mar 2024" }
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
    priorityScore: 71,
    status: "Awaiting Approval",
    recommendedAction: "Immediate Retry",
    attempts: 1,
    date: "40 min ago",
    customerStats: { previousPayments: 15, successfulPayments: 11, failedPayments: 4, customerSince: "Feb 2024" }
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
    priorityScore: 56,
    status: "Review Required",
    recommendedAction: "Alternate Payment Method",
    attempts: 1,
    date: "1h ago",
    customerStats: { previousPayments: 8, successfulPayments: 5, failedPayments: 3, customerSince: "Apr 2024" }
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
    priorityScore: 82,
    status: "Awaiting Approval",
    recommendedAction: "Delayed Retry",
    attempts: 1,
    date: "1h 15m ago",
    customerStats: { previousPayments: 14, successfulPayments: 13, failedPayments: 1, customerSince: "Dec 2023" }
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
    priorityScore: 85,
    status: "Awaiting Approval",
    recommendedAction: "Send Payment Link",
    attempts: 1,
    date: "2h ago",
    customerStats: { previousPayments: 10, successfulPayments: 9, failedPayments: 1, customerSince: "Jan 2024" }
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
    priorityScore: 81,
    status: "Awaiting Approval",
    recommendedAction: "Delayed Retry",
    attempts: 1,
    date: "2h 30m ago",
    customerStats: { previousPayments: 20, successfulPayments: 18, failedPayments: 2, customerSince: "Oct 2023" }
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
    priorityScore: 42,
    status: "Awaiting Approval",
    recommendedAction: "Retry Later",
    attempts: 1,
    date: "3h ago",
    customerStats: { previousPayments: 6, successfulPayments: 4, failedPayments: 2, customerSince: "May 2024" }
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
    priorityScore: 91,
    status: "Action Needed",
    recommendedAction: "Update Payment Method",
    attempts: 2,
    date: "4h ago",
    customerStats: { previousPayments: 19, successfulPayments: 18, failedPayments: 1, customerSince: "Sep 2023" }
  },
  {
    id: "TXN_0971",
    customer: "Ritu Singhania",
    initials: "RS",
    email: "ritu.s@example.com",
    amount: 17500,
    formattedAmount: "₹17,500",
    failureReason: "Bank Unavailable",
    probability: 90,
    priority: "HIGH",
    priorityScore: 95,
    status: "Awaiting Approval",
    recommendedAction: "Delayed Retry",
    attempts: 1,
    date: "5h ago",
    customerStats: { previousPayments: 32, successfulPayments: 30, failedPayments: 2, customerSince: "Jul 2023" }
  },
  {
    id: "TXN_0955",
    customer: "Vikram Malhotra",
    initials: "VM",
    email: "vikram.m@example.com",
    amount: 12500,
    formattedAmount: "₹12,500",
    failureReason: "Network Error",
    probability: 35,
    priority: "LOW",
    priorityScore: 28,
    status: "Safety Blocked",
    recommendedAction: "Manual Review",
    attempts: 3,
    safetyBlocked: true,
    blockedReason: "Retry limit exceeded (3/3 max retries reached).",
    date: "6h ago",
    customerStats: { previousPayments: 5, successfulPayments: 2, failedPayments: 3, customerSince: "Jun 2024" }
  }
];

export const initialActivityStream = [
  {
    id: "ACT_101",
    title: "✦ AI identified 24 new recovery opportunities",
    time: "2 min ago",
    type: "ai"
  },
  {
    id: "ACT_102",
    title: "High-value payment detected (₹9,999 — TXN_1038)",
    time: "5 min ago",
    type: "warning"
  },
  {
    id: "ACT_103",
    title: "✓ Recovery simulation completed (TXN_1001 • ₹6,400)",
    time: "8 min ago",
    type: "success"
  },
  {
    id: "ACT_104",
    title: "⚠ Retry limit reached (TXN_0955)",
    time: "12 min ago",
    type: "danger"
  }
];

export const availableStrategies = [
  {
    id: "Delayed Retry",
    name: "Delayed Retry",
    description: "Retry payment after a short cooldown to avoid hitting a temporarily unavailable bank.",
    baseRisk: "Low"
  },
  {
    id: "Immediate Retry",
    name: "Immediate Retry",
    description: "Reroute payment immediately through an alternate node or backup gateway.",
    baseRisk: "Medium"
  },
  {
    id: "Update Payment Method",
    name: "Update Payment Method",
    description: "Send automated link to update tokenized payment card credentials.",
    baseRisk: "Low"
  },
  {
    id: "Alternate Payment Method",
    name: "Alternate Payment Method",
    description: "Prompt customer with UPI / NetBanking alternative payment option.",
    baseRisk: "Low"
  },
  {
    id: "Manual Review",
    name: "Manual Review",
    description: "Escalate transaction to merchant risk team for manual handling.",
    baseRisk: "Low"
  }
];
