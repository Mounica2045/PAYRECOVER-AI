// Dashboard Mock Data & Formatting Utility Functions

export const formatCurrency = (val) => {
  if (val === undefined || val === null) return '₹0';
  return `₹${val.toLocaleString('en-IN')}`;
};

export const formatPercent = (val) => {
  if (val === undefined || val === null) return '0%';
  return `${val}%`;
};

export const formatNumber = (val) => {
  if (val === undefined || val === null) return '0';
  return val.toLocaleString('en-IN');
};

// Date period dataset configurations
export const periodDatasets = {
  'Last 30 days': {
    kpis: {
      revenueAtRisk: { value: 124500, change: '12.4%', changeType: 'negative', period: 'vs previous period' },
      recoveredRevenue: { value: 48750, change: '18.7%', changeType: 'positive', period: 'vs previous period' },
      recoveryRate: { value: 39.2, change: '6.8%', changeType: 'positive', period: 'vs previous period' },
      failedPayments: { value: 127, change: '8.3%', changeType: 'positive', period: 'vs previous period' }
    },
    sparklines: {
      revenueAtRisk: [110, 115, 108, 120, 118, 122, 124.5],
      recoveredRevenue: [32, 35, 38, 41, 44, 46, 48.75],
      recoveryRate: [32, 34, 35, 36.5, 38, 38.5, 39.2],
      failedPayments: [145, 140, 138, 132, 130, 128, 127]
    }
  },
  'Last 7 days': {
    kpis: {
      revenueAtRisk: { value: 31200, change: '4.2%', changeType: 'positive', period: 'vs previous period' },
      recoveredRevenue: { value: 14200, change: '22.1%', changeType: 'positive', period: 'vs previous period' },
      recoveryRate: { value: 45.5, change: '9.4%', changeType: 'positive', period: 'vs previous period' },
      failedPayments: { value: 28, change: '12.5%', changeType: 'positive', period: 'vs previous period' }
    },
    sparklines: {
      revenueAtRisk: [38, 36, 35, 33, 32, 31.5, 31.2],
      recoveredRevenue: [9, 10, 11.2, 12.4, 13, 13.8, 14.2],
      recoveryRate: [38, 40, 41, 42.5, 43, 44, 45.5],
      failedPayments: [34, 32, 31, 30, 29, 29, 28]
    }
  },
  'Today': {
    kpis: {
      revenueAtRisk: { value: 8450, change: '1.2%', changeType: 'negative', period: 'vs yesterday' },
      recoveredRevenue: { value: 4999, change: '15.0%', changeType: 'positive', period: 'vs yesterday' },
      recoveryRate: { value: 59.1, change: '12.0%', changeType: 'positive', period: 'vs yesterday' },
      failedPayments: { value: 6, change: '25.0%', changeType: 'positive', period: 'vs yesterday' }
    },
    sparklines: {
      revenueAtRisk: [12, 10, 9, 8.8, 8.5, 8.5, 8.45],
      recoveredRevenue: [0, 1.2, 2.4, 3.1, 4.2, 4.9, 4.999],
      recoveryRate: [0, 25, 38, 42, 50, 55, 59.1],
      failedPayments: [1, 2, 3, 4, 5, 6, 6]
    }
  },
  'Last 90 days': {
    kpis: {
      revenueAtRisk: { value: 348000, change: '8.1%', changeType: 'negative', period: 'vs previous period' },
      recoveredRevenue: { value: 142500, change: '24.5%', changeType: 'positive', period: 'vs previous period' },
      recoveryRate: { value: 41.0, change: '8.2%', changeType: 'positive', period: 'vs previous period' },
      failedPayments: { value: 382, change: '5.1%', changeType: 'positive', period: 'vs previous period' }
    },
    sparklines: {
      revenueAtRisk: [300, 310, 325, 330, 340, 345, 348],
      recoveredRevenue: [90, 102, 115, 124, 132, 138, 142.5],
      recoveryRate: [30, 33, 35, 37, 39, 40, 41],
      failedPayments: [410, 400, 395, 390, 388, 385, 382]
    }
  },
  'This year': {
    kpis: {
      revenueAtRisk: { value: 892000, change: '14.2%', changeType: 'negative', period: 'vs 2025' },
      recoveredRevenue: { value: 412000, change: '31.4%', changeType: 'positive', period: 'vs 2025' },
      recoveryRate: { value: 46.1, change: '11.5%', changeType: 'positive', period: 'vs 2025' },
      failedPayments: { value: 942, change: '15.2%', changeType: 'positive', period: 'vs 2025' }
    },
    sparklines: {
      revenueAtRisk: [700, 750, 790, 820, 850, 875, 892],
      recoveredRevenue: [220, 260, 300, 340, 370, 395, 412],
      recoveryRate: [31, 35, 38, 41, 43, 45, 46.1],
      failedPayments: [1100, 1050, 1010, 980, 960, 950, 942]
    }
  }
};

export const chart30DaysData = [
  { date: 'Apr 24', recovered: 1200, atRisk: 4200 },
  { date: 'Apr 27', recovered: 2400, atRisk: 4800 },
  { date: 'Apr 30', recovered: 3100, atRisk: 4100 },
  { date: 'May 03', recovered: 5200, atRisk: 6500 },
  { date: 'May 06', recovered: 6800, atRisk: 7200 },
  { date: 'May 09', recovered: 9400, atRisk: 8100 },
  { date: 'May 12', recovered: 12100, atRisk: 9300 },
  { date: 'May 15', recovered: 15400, atRisk: 11200 },
  { date: 'May 18', recovered: 19800, atRisk: 12800 },
  { date: 'May 21', recovered: 24200, atRisk: 14500 },
  { date: 'May 24', recovered: 29500, atRisk: 16100 },
  { date: 'May 27', recovered: 34800, atRisk: 17900 },
  { date: 'May 30', recovered: 40100, atRisk: 19200 },
  { date: 'Jun 02', recovered: 44300, atRisk: 21500 },
  { date: 'Jun 05', recovered: 48750, atRisk: 23100 },
];

export const failureCategoriesData = [
  { reason: 'Insufficient Funds', percentage: 32, paymentsCount: 41, atRiskAmount: 39840, color: '#6366F1' },
  { reason: 'Bank Unavailable', percentage: 24, paymentsCount: 31, atRiskAmount: 29880, color: '#EC4899' },
  { reason: 'Card Expired', percentage: 18, paymentsCount: 23, atRiskAmount: 22410, color: '#F59E0B' },
  { reason: 'Network Error', percentage: 14, paymentsCount: 18, atRiskAmount: 17430, color: '#10B981' },
  { reason: 'Other', percentage: 12, paymentsCount: 14, atRiskAmount: 14940, color: '#94A3B8' },
];

export const opportunityPriorities = {
  high: { count: 24, label: 'High Priority', description: 'High-value opportunities (>85% prob.)', badgeVariant: 'rose' },
  medium: { count: 51, label: 'Medium Priority', description: 'Moderate recovery potential (60-84%)', badgeVariant: 'amber' },
  low: { count: 52, label: 'Low Priority', description: 'Lower recovery potential (<60%)', badgeVariant: 'slate' },
};

export const aiInsightData = {
  title: 'Your highest recovery opportunity is temporary bank failures.',
  atRiskText: '₹18,450 is currently at risk across 23 transactions.',
  recommendationText: 'Based on customer payment history, delayed retries could recover an estimated ₹11,200.',
  confidence: 91,
  targetTxn: 'TXN_1042'
};

export const highValueOpportunitiesData = [
  {
    id: 'TXN_1042',
    customer: 'Rahul Sharma',
    initials: 'RS',
    email: 'rahul.s@example.com',
    amount: 4999,
    formattedAmount: '₹4,999',
    failureReason: 'Bank unavailable',
    probability: 91,
    recommendedAction: 'Delayed Retry',
    status: 'Ready',
    riskTag: 'High Value'
  },
  {
    id: 'TXN_1038',
    customer: 'Priya Reddy',
    initials: 'PR',
    email: 'priya.r@example.com',
    amount: 9999,
    formattedAmount: '₹9,999',
    failureReason: 'Card expired',
    probability: 96,
    recommendedAction: 'Update Payment Method',
    status: 'Action Needed',
    riskTag: 'High Value'
  },
  {
    id: 'TXN_1021',
    customer: 'Arjun Kumar',
    initials: 'AK',
    email: 'arjun.k@example.com',
    amount: 2499,
    formattedAmount: '₹2,499',
    failureReason: 'Insufficient funds',
    probability: 74,
    recommendedAction: 'Retry Later',
    status: 'Pending',
    riskTag: 'Medium Value'
  },
  {
    id: 'TXN_1017',
    customer: 'Sneha Iyer',
    initials: 'SI',
    email: 'sneha.i@example.com',
    amount: 7499,
    formattedAmount: '₹7,499',
    failureReason: 'Network error',
    probability: 68,
    recommendedAction: 'Retry After 1 Hour',
    status: 'Pending',
    riskTag: 'High Value'
  },
  {
    id: 'TXN_1012',
    customer: 'Karthik N.',
    initials: 'KN',
    email: 'karthik.n@example.com',
    amount: 5499,
    formattedAmount: '₹5,499',
    failureReason: 'Payment limit exceeded',
    probability: 62,
    recommendedAction: 'Alternate Payment Method',
    status: 'Review',
    riskTag: 'Medium Value'
  }
];
