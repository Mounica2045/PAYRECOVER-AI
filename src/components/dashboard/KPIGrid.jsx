import React from 'react';
import { IndianRupee, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';
import StatCard from '../data-display/StatCard';
import { formatCurrency, formatPercent, formatNumber } from '../../data/dashboardData';

export default function KPIGrid({ kpis, sparklines }) {
  if (!kpis) return null;

  // Mini sparkline SVG renderer
  const renderSparkline = (points, color) => {
    if (!points || points.length === 0) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 80;
    const height = 24;

    const pathData = points
      .map((val, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible">
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      
      {/* Card 1: Revenue at Risk */}
      <div className="relative group">
        <StatCard
          title="Revenue at Risk"
          value={formatCurrency(kpis.revenueAtRisk.value)}
          change={`↑ ${kpis.revenueAtRisk.change}`}
          changeType={kpis.revenueAtRisk.changeType}
          description={kpis.revenueAtRisk.period}
          icon={AlertTriangle}
          tooltipText="Estimated value of eligible failed payments that may still be recoverable."
        />
        <div className="absolute right-4 bottom-4 opacity-70 group-hover:opacity-100 transition-opacity">
          {renderSparkline(sparklines?.revenueAtRisk || [110, 115, 108, 120, 124.5], '#EF4444')}
        </div>
      </div>

      {/* Card 2: Recovered Revenue */}
      <div className="relative group">
        <StatCard
          title="Recovered Revenue"
          value={formatCurrency(kpis.recoveredRevenue.value)}
          change={`↑ ${kpis.recoveredRevenue.change}`}
          changeType={kpis.recoveredRevenue.changeType}
          description={kpis.recoveredRevenue.period}
          icon={IndianRupee}
          tooltipText="Revenue successfully recovered through the recovery workflow."
        />
        <div className="absolute right-4 bottom-4 opacity-70 group-hover:opacity-100 transition-opacity">
          {renderSparkline(sparklines?.recoveredRevenue || [32, 35, 38, 44, 48.75], '#10B981')}
        </div>
      </div>

      {/* Card 3: Recovery Rate */}
      <div className="relative group">
        <StatCard
          title="Recovery Rate"
          value={formatPercent(kpis.recoveryRate.value)}
          change={`↑ ${kpis.recoveryRate.change}`}
          changeType={kpis.recoveryRate.changeType}
          description={kpis.recoveryRate.period}
          icon={CheckCircle2}
          tooltipText="Percentage of eligible failed payments that were successfully recovered."
        />
        <div className="absolute right-4 bottom-4 opacity-70 group-hover:opacity-100 transition-opacity">
          {renderSparkline(sparklines?.recoveryRate || [32, 34, 36, 38, 39.2], '#4F46E5')}
        </div>
      </div>

      {/* Card 4: Failed Payments */}
      <div className="relative group">
        <StatCard
          title="Failed Payments"
          value={formatNumber(kpis.failedPayments.value)}
          change={`↓ ${kpis.failedPayments.change}`}
          changeType={kpis.failedPayments.changeType}
          description={kpis.failedPayments.period}
          icon={AlertTriangle}
          tooltipText="Number of payment attempts that failed during the selected period."
        />
        <div className="absolute right-4 bottom-4 opacity-70 group-hover:opacity-100 transition-opacity">
          {renderSparkline(sparklines?.failedPayments || [145, 138, 132, 128, 127], '#10B981')}
        </div>
      </div>

    </div>
  );
}
