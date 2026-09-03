import React from 'react';
import StatCard from '../data-display/StatCard';
import { AlertCircle, TrendingUp, Percent, Sparkles, ShieldAlert, Zap } from 'lucide-react';
import { formatNumber } from '../../data/dashboardData';

export default function IntelligenceKPIs({
  kpis,
  selectedPeriod,
  onPeriodChange
}) {
  const periods = ['Today', '7 Days', '30 Days', '90 Days'];

  return (
    <div className="space-y-4">
      {/* Time Range Selector Bar (Requirement #5) */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Executive Intelligence Metrics</h3>
          <p className="text-xs text-slate-500 font-medium">Predictive revenue portfolio summary</p>
        </div>

        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs">
          {periods.map((p) => {
            const isSel = p === selectedPeriod;
            return (
              <button
                key={p}
                onClick={() => onPeriodChange(p)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${isSel ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Six Executive KPI Cards (Requirement #4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
        <StatCard 
          title="Revenue at Risk"
          value={kpis.revenueAtRisk}
          description="Estimated failed payment value"
          icon={AlertCircle}
        />
        <StatCard 
          title="Recoverable Value"
          value={kpis.recoverableValue}
          change="Potential recovery"
          changeType="positive"
          description="Estimated potential yield"
          icon={TrendingUp}
        />
        <StatCard 
          title="Recovery Probability"
          value={kpis.recoveryProbability}
          change="Portfolio avg"
          changeType="neutral"
          description="Avg success probability"
          icon={Percent}
        />
        <StatCard 
          title="High-Opportunity"
          value={formatNumber(kpis.highOpportunityPayments)}
          change="High recovery potential"
          changeType="positive"
          description="Transactions > 75% score"
          icon={Sparkles}
        />
        <StatCard 
          title="Failure Rate"
          value={kpis.failureRate}
          change="-0.7% vs prev period"
          changeType="positive"
          description="Current portfolio period"
          icon={ShieldAlert}
        />
        <StatCard 
          title="Predicted Improvement"
          value={kpis.predictedImprovement}
          change="AI Optimization"
          changeType="positive"
          description="Potential yield lift"
          icon={Zap}
        />
      </div>
    </div>
  );
}
