import React from 'react';
import StatCard from '../data-display/StatCard';
import { Send, Users, TrendingUp, Percent } from 'lucide-react';
import { formatNumber } from '../../data/dashboardData';

export default function CampaignOverview({
  activeCampaignsCount = 6,
  customersTargetedCount = 1284,
  potentialRecoveryValue = "₹8.4L",
  simulatedRecoveryRate = "72.4%"
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Active Campaigns"
        value={formatNumber(activeCampaignsCount)}
        description="Simulated active campaigns"
        icon={Send}
      />
      <StatCard 
        title="Customers Targeted"
        value={formatNumber(customersTargetedCount)}
        change="+18% vs last month"
        changeType="positive"
        description="Total audience size"
        icon={Users}
      />
      <StatCard 
        title="Potential Recovery"
        value={potentialRecoveryValue}
        change="Simulated yield"
        changeType="positive"
        description="Estimated recoverable value"
        icon={TrendingUp}
      />
      <StatCard 
        title="Simulated Recovery Rate"
        value={simulatedRecoveryRate}
        change="+4.2% AI optimization"
        changeType="positive"
        description="Average campaign success"
        icon={Percent}
      />
    </div>
  );
}
