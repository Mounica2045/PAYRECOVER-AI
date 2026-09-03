import React from 'react';
import StatCard from '../data-display/StatCard';
import { Bot, AlertTriangle, Clock, IndianRupee } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../data/dashboardData';

export default function AgentOverview({ 
  activeCount = 24, 
  highCount = 8, 
  pendingCount = 6, 
  recoveredToday = 18450 
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard 
        title="Active Opportunities"
        value={formatNumber(activeCount)}
        description="Identified by AI agent"
        icon={Bot}
      />
      <StatCard 
        title="High Priority"
        value={formatNumber(highCount)}
        change=">85% probability"
        changeType="positive"
        description="High recovery yield"
        icon={AlertTriangle}
      />
      <StatCard 
        title="Awaiting Approval"
        value={formatNumber(pendingCount)}
        change="Human-in-the-loop"
        changeType="neutral"
        description="Merchant review required"
        icon={Clock}
      />
      <StatCard 
        title="Recovered Today"
        value={formatCurrency(recoveredToday)}
        change="↑ 14.2%"
        changeType="positive"
        description="Simulated recoveries"
        icon={IndianRupee}
      />
    </div>
  );
}
