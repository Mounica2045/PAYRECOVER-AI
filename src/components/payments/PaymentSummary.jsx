import React from 'react';
import StatCard from '../data-display/StatCard';
import { CreditCard, CheckCircle2, AlertTriangle, IndianRupee } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../data/dashboardData';

export default function PaymentSummary({ metrics }) {
  const data = metrics || {
    total: 1284,
    successful: 1157,
    failed: 127,
    revenueAtRisk: 124500
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        title="Total Payments"
        value={formatNumber(data.total)}
        description="All payment attempts"
        icon={CreditCard}
      />
      <StatCard
        title="Successful"
        value={formatNumber(data.successful)}
        change="90.1%"
        changeType="positive"
        description="settled volume"
        icon={CheckCircle2}
      />
      <StatCard
        title="Failed"
        value={formatNumber(data.failed)}
        change="9.9%"
        changeType="negative"
        description="unsettled attempts"
        icon={AlertTriangle}
      />
      <StatCard
        title="Revenue at Risk"
        value={formatCurrency(data.revenueAtRisk)}
        change="127 transactions"
        changeType="negative"
        description="eligible for recovery"
        icon={IndianRupee}
      />
    </div>
  );
}
