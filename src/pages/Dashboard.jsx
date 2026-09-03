import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import KPIGrid from '../components/dashboard/KPIGrid';
import RevenueRecoveryChart from '../components/dashboard/RevenueRecoveryChart';
import PaymentFailureChart from '../components/dashboard/PaymentFailureChart';
import RecoveryOpportunities from '../components/dashboard/RecoveryOpportunities';
import AIRecoveryInsight from '../components/dashboard/AIRecoveryInsight';
import HighValueRecoveryTable from '../components/dashboard/HighValueRecoveryTable';

import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/data-display/ErrorState';
import EmptyState from '../components/data-display/EmptyState';

import { 
  periodDatasets, 
  chart30DaysData, 
  failureCategoriesData 
} from '../data/dashboardData';

export default function Dashboard({ onNavigateToPage, onNavigateToAgent, onSelectTransaction }) {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 days');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // Current dataset based on period selection
  const currentDataset = periodDatasets[selectedPeriod] || periodDatasets['Last 30 days'];

  const handlePeriodChange = (newPeriod) => {
    setSelectedPeriod(newPeriod);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const handleGoToAgent = (txnId = null) => {
    if (onNavigateToAgent) {
      onNavigateToAgent(txnId);
    } else if (onNavigateToPage) {
      onNavigateToPage('ai-agent');
    }
  };

  if (hasError) {
    return (
      <PageContainer>
        <DashboardHeader selectedPeriod={selectedPeriod} onPeriodChange={handlePeriodChange} />
        <div className="fintech-card p-12 my-8">
          <ErrorState 
            title="Unable to load dashboard data" 
            description="Something went wrong while loading your recovery overview telemetry. Please try again."
            onRetry={handleRetry} 
          />
        </div>
      </PageContainer>
    );
  }

  if (isEmpty) {
    return (
      <PageContainer>
        <DashboardHeader selectedPeriod={selectedPeriod} onPeriodChange={handlePeriodChange} />
        <div className="fintech-card p-12 my-8">
          <EmptyState 
            title="No failed payments" 
            description="Great news — there are currently no failed payments requiring recovery during this period."
            actionLabel="Refresh Data"
            onAction={() => setIsEmpty(false)}
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* 1. Header & Date Range Selector */}
      <DashboardHeader 
        selectedPeriod={selectedPeriod} 
        onPeriodChange={handlePeriodChange} 
      />

      {isLoading ? (
        <div className="space-y-6 animate-pulse">
          {/* Skeleton KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="fintech-card p-5 space-y-3">
                <Skeleton height="h-4" width="w-1/2" />
                <Skeleton height="h-8" width="w-3/4" />
                <Skeleton height="h-3" width="w-2/3" />
              </div>
            ))}
          </div>

          {/* Skeleton Chart & Section */}
          <div className="fintech-card p-6 space-y-4">
            <Skeleton height="h-6" width="w-1/4" />
            <Skeleton height="h-64" width="w-full" variant="card" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="fintech-card p-6 space-y-3"><Skeleton height="h-48" width="w-full" /></div>
            <div className="fintech-card p-6 space-y-3"><Skeleton height="h-48" width="w-full" /></div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 2. 4 Top KPI Cards */}
          <KPIGrid 
            kpis={currentDataset.kpis} 
            sparklines={currentDataset.sparklines} 
          />

          {/* 3. Large Revenue Recovery Chart Card */}
          <RevenueRecoveryChart data={chart30DaysData} />

          {/* 4. Payment Failure Analysis (Donut) & Recovery Opportunities (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PaymentFailureChart data={failureCategoriesData} />
            <RecoveryOpportunities onNavigateToAgent={() => handleGoToAgent()} />
          </div>

          {/* 5. AI Recovery Insight Banner */}
          <AIRecoveryInsight onNavigateToAgent={() => handleGoToAgent()} />

          {/* 6. High-Value Recovery Opportunities Table */}
          <HighValueRecoveryTable 
            onNavigateToPayments={() => onNavigateToPage && onNavigateToPage('payments')}
            onSelectRow={(item) => handleGoToAgent(item.id)}
          />
        </div>
      )}
    </PageContainer>
  );
}
