import React, { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import IntelligenceHeader from '../components/intelligence/IntelligenceHeader';
import IntelligenceBanner from '../components/intelligence/IntelligenceBanner';
import IntelligenceKPIs from '../components/intelligence/IntelligenceKPIs';
import RecoveryForecast from '../components/intelligence/RecoveryForecast';
import OpportunityTable from '../components/intelligence/OpportunityTable';
import FailureIntelligence from '../components/intelligence/FailureIntelligence';
import CustomerIntelligence from '../components/intelligence/CustomerIntelligence';
import StrategyIntelligence from '../components/intelligence/StrategyIntelligence';
import WhatIfAnalysis from '../components/intelligence/WhatIfAnalysis';
import OpportunityMap from '../components/intelligence/OpportunityMap';
import AIRecommendations from '../components/intelligence/AIRecommendations';

import { intelligenceService } from '../services/intelligenceService';

export default function Intelligence({ 
  onNavigateToAgent, 
  onNavigateToSimulator, 
  onNavigateToCampaigns 
}) {
  const [selectedPeriod, setSelectedPeriod] = useState('30 Days');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Data states
  const [kpis, setKpis] = useState(() => intelligenceService.getExecutiveKPIs(selectedPeriod));
  const [forecast] = useState(() => intelligenceService.getForecast(selectedPeriod));
  const [opportunities] = useState(() => intelligenceService.getOpportunities());
  const [failureData] = useState(() => intelligenceService.getFailureIntelligence());
  const [customerData] = useState(() => intelligenceService.getCustomerIntelligence());
  const [strategyData] = useState(() => intelligenceService.getStrategyPerformance());
  const [insightsData] = useState(() => intelligenceService.getAIInsights());

  useEffect(() => {
    setKpis(intelligenceService.getExecutiveKPIs(selectedPeriod));
  }, [selectedPeriod]);

  const handleRefreshAnalysis = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      intelligenceService.refreshAnalysis();
      setKpis(intelligenceService.getExecutiveKPIs(selectedPeriod));
      setIsRefreshing(false);
    }, 700);
  };

  const handleExportReport = () => {
    intelligenceService.exportOpportunityReport(opportunities);
  };

  const handleExportInsights = () => {
    intelligenceService.exportOpportunityReport(opportunities);
  };

  return (
    <PageContainer>
      {/* 1. Header with Refresh Analysis & Export Actions */}
      <IntelligenceHeader 
        onRefresh={handleRefreshAnalysis}
        isRefreshing={isRefreshing}
        onExportReport={handleExportReport}
        onExportInsights={handleExportInsights}
      />

      {/* 2. Top AI Intelligence Banner */}
      <div className="mb-6">
        <IntelligenceBanner 
          onRefresh={handleRefreshAnalysis}
          isRefreshing={isRefreshing}
        />
      </div>

      {/* 3. Executive KPI Cards & Time Range Selector */}
      <div className="mb-6">
        <IntelligenceKPIs 
          kpis={kpis}
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
      </div>

      {/* 4. Recovery Forecast & Revenue at Risk Breakdown */}
      <div className="mb-6">
        <RecoveryForecast forecast={forecast} />
      </div>

      {/* 5. Top Recovery Opportunities Table */}
      <div className="mb-8">
        <OpportunityTable 
          opportunities={opportunities}
          onNavigateToAgent={onNavigateToAgent}
        />
      </div>

      {/* 6. Payment Failure Intelligence & Pattern Detection */}
      <div className="mb-8">
        <FailureIntelligence failureData={failureData} />
      </div>

      {/* 7. Customer Recovery Intelligence & Segments */}
      <div className="mb-8">
        <CustomerIntelligence 
          customerData={customerData}
          onNavigateToCampaigns={onNavigateToCampaigns}
        />
      </div>

      {/* 8. Strategy Intelligence & Yield Performance */}
      <div className="mb-8">
        <StrategyIntelligence 
          strategyData={strategyData}
          onNavigateToSimulator={onNavigateToSimulator}
        />
      </div>

      {/* 9. Interactive What-If Recovery Analysis */}
      <div className="mb-8">
        <WhatIfAnalysis />
      </div>

      {/* 10. Revenue Recovery Priority Matrix */}
      <div className="mb-8">
        <OpportunityMap 
          opportunities={opportunities}
          onNavigateToAgent={onNavigateToAgent}
        />
      </div>

      {/* 11. AI Priority Recommendations & Insights Feed */}
      <div className="mb-6">
        <AIRecommendations 
          insightsData={insightsData}
          onNavigateToAgent={onNavigateToAgent}
          onNavigateToCampaigns={onNavigateToCampaigns}
          onNavigateToSimulator={onNavigateToSimulator}
          onExportInsights={handleExportInsights}
        />
      </div>
    </PageContainer>
  );
}
