// Recovery Campaigns Dataset & Strategy Imports

import { baseStrategyTemplates, mockFailedPayments } from './strategyData';

export const segmentPresets = [
  {
    id: 'high-value',
    name: 'High-Value Failed Payments',
    description: 'Transactions greater than ₹5,000 with strong customer history.',
    customersCount: 142,
    totalValue: 348500,
    formattedTotalValue: '₹3,48,500',
    avgPayment: 2454,
    formattedAvgPayment: '₹2,454',
    avgProbability: 84,
    criteria: 'Amount > ₹5,000'
  },
  {
    id: 'recent-failures',
    name: 'Recent Payment Failures',
    description: 'Failures occurred within the last 2 hours.',
    customersCount: 215,
    totalValue: 412000,
    formattedTotalValue: '₹4,12,000',
    avgPayment: 1916,
    formattedAvgPayment: '₹1,916',
    avgProbability: 88,
    criteria: 'Time < 2 hours'
  },
  {
    id: 'bank-failures',
    name: 'Temporary Bank Failures',
    description: 'Failures caused by issuer bank downtime or rate limits.',
    customersCount: 386,
    totalValue: 520000,
    formattedTotalValue: '₹5,20,000',
    avgPayment: 1347,
    formattedAvgPayment: '₹1,347',
    avgProbability: 91,
    criteria: 'Reason = Bank Unavailable'
  },
  {
    id: 'multiple-attempts',
    name: 'Multiple Failed Attempts',
    description: 'Transactions with 2 prior failed retry attempts.',
    customersCount: 98,
    totalValue: 185000,
    formattedTotalValue: '₹1,85,000',
    avgPayment: 1887,
    formattedAvgPayment: '₹1,887',
    avgProbability: 71,
    criteria: 'Attempts >= 2'
  },
  {
    id: 'strong-history',
    name: 'Customers With Strong Payment History',
    description: 'Customers with previous success rate > 80%.',
    customersCount: 310,
    totalValue: 680000,
    formattedTotalValue: '₹6,80,000',
    avgPayment: 2193,
    formattedAvgPayment: '₹2,193',
    avgProbability: 92,
    criteria: 'Success Rate > 80%'
  },
  {
    id: 'custom',
    name: 'Custom Segment',
    description: 'User-defined dynamic filter rules.',
    customersCount: 135,
    totalValue: 329500,
    formattedTotalValue: '₹3,29,500',
    avgPayment: 2440,
    formattedAvgPayment: '₹2,440',
    avgProbability: 86,
    criteria: 'Custom Rules'
  }
];

export const initialCampaignsList = [
  {
    id: 'CMP_1001',
    name: 'Failed Payments — High Value',
    description: 'Targeted recovery campaign for high-value transactions above ₹5,000.',
    audience: 'High-Value Failed Payments',
    segmentId: 'high-value',
    strategy: 'Delayed Retry',
    channels: ['Email', 'SMS'],
    customersCount: 142,
    totalValue: 348500,
    potentialRecovery: 292740,
    formattedPotentialRecovery: '₹2.9L',
    status: 'Active',
    createdAt: '2026-09-03',
    createdTime: '10:12 AM',
    recoveryRate: '72.4%',
    message: {
      subject: 'Your payment of {{payment_amount}} could not be completed',
      body: 'Hi {{customer_name}},\n\nIt looks like your recent payment of {{payment_amount}} for order {{transaction_id}} could not be completed due to a temporary bank issue.\n\nYou can try again shortly without entering details again.\n\nThank you,\n{{merchant_name}} Support',
      tone: 'Friendly'
    },
    analytics: {
      targeted: 142,
      reached: 135,
      engaged: 108,
      recovered: 91,
      recoveredValue: 251756,
      formattedRecoveredValue: '₹2,51,756'
    }
  },
  {
    id: 'CMP_1002',
    name: 'Bank Failure Recovery Campaign',
    description: 'Automated retry notifications for temporary bank outages.',
    audience: 'Temporary Bank Failures',
    segmentId: 'bank-failures',
    strategy: 'Delayed Retry',
    channels: ['Email', 'SMS', 'WhatsApp'],
    customersCount: 386,
    totalValue: 520000,
    potentialRecovery: 473200,
    formattedPotentialRecovery: '₹4.7L',
    status: 'Simulated',
    createdAt: '2026-09-02',
    createdTime: '04:30 PM',
    recoveryRate: '88.2%',
    message: {
      subject: 'Payment notice: Temporary bank issue detected',
      body: 'Hi {{customer_name}},\n\nYour payment of {{payment_amount}} was declined due to bank server maintenance. We have scheduled an automatic retry in {{retry_time}}.\n\nRegards,\n{{merchant_name}}',
      tone: 'Professional'
    },
    analytics: {
      targeted: 386,
      reached: 370,
      engaged: 310,
      recovered: 280,
      recoveredValue: 412000,
      formattedRecoveredValue: '₹4,12,000'
    }
  },
  {
    id: 'CMP_1003',
    name: 'Card Expiration Update Campaign',
    description: 'Prompt customers to update expired card credentials.',
    audience: 'High-Value Failed Payments',
    segmentId: 'high-value',
    strategy: 'Alternate Payment',
    channels: ['Email'],
    customersCount: 95,
    totalValue: 240000,
    potentialRecovery: 156000,
    formattedPotentialRecovery: '₹1.5L',
    status: 'Ready',
    createdAt: '2026-09-02',
    createdTime: '02:15 PM',
    recoveryRate: '65.0%',
    message: {
      subject: 'Action required: Update payment method',
      body: 'Hi {{customer_name}},\n\nYour card for transaction {{transaction_id}} appears to be expired. Please click below to select an alternate payment method or update card details.\n\nBest regards,\n{{merchant_name}}',
      tone: 'Concise'
    },
    analytics: { targeted: 95, reached: 90, engaged: 62, recovered: 50, recoveredValue: 126000, formattedRecoveredValue: '₹1,26,000' }
  },
  {
    id: 'CMP_1004',
    name: 'Recent Outage Fallback',
    description: 'Quick recovery campaign for recent network errors.',
    audience: 'Recent Payment Failures',
    segmentId: 'recent-failures',
    strategy: 'Immediate Retry',
    channels: ['SMS', 'In-App'],
    customersCount: 215,
    totalValue: 412000,
    potentialRecovery: 280160,
    formattedPotentialRecovery: '₹2.8L',
    status: 'Draft',
    createdAt: '2026-09-01',
    createdTime: '11:20 AM',
    recoveryRate: '68.0%',
    message: {
      subject: 'Retry your payment now',
      body: 'Hi {{customer_name}}, a network hiccup interrupted your {{payment_amount}} payment. Tap here to retry instantly.',
      tone: 'Concise'
    },
    analytics: { targeted: 215, reached: 200, engaged: 140, recovered: 110, recoveredValue: 220000, formattedRecoveredValue: '₹2,20,000' }
  },
  {
    id: 'CMP_1005',
    name: 'High-Risk Manual Review Group',
    description: 'Escalation campaign for transactions exceeding threshold limit.',
    audience: 'Multiple Failed Attempts',
    segmentId: 'multiple-attempts',
    strategy: 'Manual Review',
    channels: ['Email'],
    customersCount: 48,
    totalValue: 120000,
    potentialRecovery: 49200,
    formattedPotentialRecovery: '₹49K',
    status: 'Paused',
    createdAt: '2026-08-30',
    createdTime: '05:00 PM',
    recoveryRate: '41.0%',
    message: {
      subject: 'Merchant Support: Transaction Review',
      body: 'Hi {{customer_name}},\n\nOur support team is reviewing transaction {{transaction_id}} ({{payment_amount}}). We will reach out shortly to assist with your order.\n\nThank you,\n{{merchant_name}} Team',
      tone: 'Helpful'
    },
    analytics: { targeted: 48, reached: 45, engaged: 25, recovered: 15, recoveredValue: 38000, formattedRecoveredValue: '₹38,000' }
  },
  {
    id: 'CMP_1006',
    name: 'Loyalty VIP Payment Recovery',
    description: 'Tailored outreach for repeat customers with >80% success history.',
    audience: 'Customers With Strong Payment History',
    segmentId: 'strong-history',
    strategy: 'Delayed Retry',
    channels: ['WhatsApp', 'Email'],
    customersCount: 310,
    totalValue: 680000,
    potentialRecovery: 625600,
    formattedPotentialRecovery: '₹6.2L',
    status: 'Completed',
    createdAt: '2026-08-28',
    createdTime: '09:00 AM',
    recoveryRate: '92.0%',
    message: {
      subject: 'VIP Payment Support for {{customer_name}}',
      body: 'Hi {{customer_name}},\n\nWe noticed a minor error during your {{payment_amount}} checkout. As a valued customer, we have reserved your items while our payment node retries in {{retry_time}}.\n\nWarm regards,\n{{merchant_name}}',
      tone: 'Friendly'
    },
    analytics: { targeted: 310, reached: 305, engaged: 280, recovered: 265, recoveredValue: 580000, formattedRecoveredValue: '₹5,80,000' }
  }
];
