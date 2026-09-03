import React, { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import AgentHeader from '../components/ai-agent/AgentHeader';
import AgentOverview from '../components/ai-agent/AgentOverview';
import OpportunityList from '../components/ai-agent/OpportunityList';
import AIAnalysisPanel from '../components/ai-agent/AIAnalysisPanel';
import ActionCenter from '../components/ai-agent/ActionCenter';
import ApprovalModal from '../components/ai-agent/ApprovalModal';
import SimulationProgress from '../components/ai-agent/SimulationProgress';
import SimulationResult from '../components/ai-agent/SimulationResult';
import RejectModal from '../components/ai-agent/RejectModal';
import BulkReviewModal from '../components/ai-agent/BulkReviewModal';
import ActivityStream from '../components/ai-agent/ActivityStream';
import AgentTimeline from '../components/ai-agent/AgentTimeline';

import { initialOpportunitiesList, initialActivityStream } from '../data/aiAgentData';
import { aiRecoveryService, getRecoveryRecommendation } from '../services/aiRecoveryService';
import { auditService } from '../services/auditService';
import Button from '../components/ui/Button';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function AIAgent({ initialSelectedTxnId, onNavigateToSimulator }) {
  const [opportunities, setOpportunities] = useState(initialOpportunitiesList);
  const [activities, setActivities] = useState(initialActivityStream);

  // Currently Selected Opportunity
  const [selectedOpportunity, setSelectedOpportunity] = useState(() => {
    if (initialSelectedTxnId) {
      return initialOpportunitiesList.find(o => o.id === initialSelectedTxnId) || initialOpportunitiesList[0];
    }
    return initialOpportunitiesList[0];
  });

  // Strategy Override Selection State
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  // Analysis & Safety Checks State
  const [analysisData, setAnalysisData] = useState(null);
  const [safetyChecks, setSafetyChecks] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Modals & Dialogs
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isBulkReviewOpen, setIsBulkReviewOpen] = useState(false);
  const [bulkSelectedIds, setBulkSelectedIds] = useState([]);

  // Audit Events Array (Persistent state for Phase 8)
  const [auditEvents, setAuditEventList] = useState([]);

  // Fetch AI Analysis & Safety Guardrails whenever opportunity or strategy changes
  useEffect(() => {
    if (!selectedOpportunity) return;

    setIsAnalyzing(true);
    const activeStrat = selectedStrategy || selectedOpportunity.recommendedAction;

    aiRecoveryService.analyzePayment(selectedOpportunity).then((data) => {
      setAnalysisData(data);
      const checks = aiRecoveryService.runSafetyChecks(selectedOpportunity, activeStrat);
      setSafetyChecks(checks);
      setIsAnalyzing(false);
    });
  }, [selectedOpportunity, selectedStrategy]);

  // Handle Selection from Opportunity Queue
  const handleSelectOpportunity = (opp) => {
    setSelectedOpportunity(opp);
    setSelectedStrategy(null);
  };

  // Handle Strategy Selection
  const handleSelectStrategy = (stratId) => {
    setSelectedStrategy(stratId);
  };

  // Confirm Approval Flow
  const handleConfirmApproval = (payment) => {
    setIsApprovalOpen(false);
    setIsProgressOpen(true);
  };

  // On Simulation Execution Complete
  const handleSimulationComplete = () => {
    setIsProgressOpen(false);
    const activeStrat = selectedStrategy || selectedOpportunity.recommendedAction;

    // 1. Remove executed opportunity from queue
    setOpportunities(prev => prev.filter(o => o.id !== selectedOpportunity.id));

    // 2. Create local audit event structure
    auditService.createAuditEvent({
      transactionId: selectedOpportunity.id,
      customer: selectedOpportunity.customer,
      amount: selectedOpportunity.amount,
      formattedAmount: selectedOpportunity.formattedAmount,
      type: "Simulation Completed",
      actor: "AI + Merchant",
      strategy: activeStrat,
      status: "Simulated",
      description: `Merchant approved recovery simulation for ${activeStrat}. Estimated recovery yield calculated.`
    });

    // 3. Update Activity Stream
    setActivities(prev => [
      {
        id: `ACT_${Date.now()}`,
        title: `✓ Recovery simulation completed (${selectedOpportunity.id} • ${selectedOpportunity.formattedAmount})`,
        time: "Just now",
        type: "success"
      },
      ...prev
    ]);

    // 4. Show Result Dialog
    setSimulationResult({
      id: selectedOpportunity.id,
      customer: selectedOpportunity.customer,
      amount: selectedOpportunity.amount,
      formattedAmount: selectedOpportunity.formattedAmount,
      strategy: activeStrat
    });
  };

  // Confirm Rejection Flow
  const handleConfirmReject = (payment, reason) => {
    setIsRejectOpen(false);

    // Create audit event
    auditService.createAuditEvent({
      transactionId: payment.id,
      customer: payment.customer,
      amount: payment.amount,
      formattedAmount: payment.formattedAmount,
      type: "Merchant Rejection",
      actor: "Merchant",
      strategy: payment.recommendedAction || "Delayed Retry",
      status: "Rejected",
      description: `Merchant rejected AI recommendation for ${payment.id}. Reason: ${reason}.`
    });

    // Remove rejected item & add to activity stream
    setOpportunities(prev => prev.filter(o => o.id !== payment.id));
    setActivities(prev => [
      {
        id: `ACT_${Date.now()}`,
        title: `✕ Recovery recommendation rejected (${payment.id} — ${reason})`,
        time: "Just now",
        type: "danger"
      },
      ...prev
    ]);

    // Select next item if available
    const remaining = opportunities.filter(o => o.id !== payment.id);
    if (remaining.length > 0) {
      setSelectedOpportunity(remaining[0]);
    }
  };

  // Handle Manual Review Escalation
  const handleManualReview = () => {
    if (!selectedOpportunity) return;
    setOpportunities(prev => prev.filter(o => o.id !== selectedOpportunity.id));
    setActivities(prev => [
      {
        id: `ACT_${Date.now()}`,
        title: `⚠ Escalated to Manual Review (${selectedOpportunity.id} • ${selectedOpportunity.formattedAmount})`,
        time: "Just now",
        type: "warning"
      },
      ...prev
    ]);

    const remaining = opportunities.filter(o => o.id !== selectedOpportunity.id);
    if (remaining.length > 0) {
      setSelectedOpportunity(remaining[0]);
    }
  };

  // Cycle alternative strategies for "Try Another Strategy"
  const handleTryAnotherStrategy = () => {
    const strategies = ['Delayed Retry', 'Immediate Retry', 'Alternate Payment Method', 'Manual Review'];
    const active = selectedStrategy || selectedOpportunity?.recommendedAction || 'Delayed Retry';
    const nextIdx = (strategies.indexOf(active) + 1) % strategies.length;
    setSelectedStrategy(strategies[nextIdx]);
  };

  const activeStrategy = selectedStrategy || selectedOpportunity?.recommendedAction || 'Delayed Retry';
  const allPassed = safetyChecks.length > 0 && safetyChecks.every(c => c.passed);

  return (
    <PageContainer>
      {/* 1. Header with Compact Status Badges & Visual Pipeline */}
      <AgentHeader />

      {/* 2. Horizontal Overview Summary StatCards */}
      <AgentOverview 
        activeCount={opportunities.length}
        highCount={opportunities.filter(o => o.priority === 'HIGH').length}
        pendingCount={opportunities.length}
        recoveredToday={18450}
      />

      {/* 3. Main Workspace: Three Column Layout (Requirement #5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
        {/* Left Panel: Recovery Opportunities Queue (4 cols) */}
        <div className="lg:col-span-4">
          <OpportunityList 
            opportunities={opportunities}
            selectedTxnId={selectedOpportunity?.id}
            onSelectOpportunity={handleSelectOpportunity}
            onBulkReview={(ids) => {
              setBulkSelectedIds(ids);
              setIsBulkReviewOpen(true);
            }}
          />
        </div>

        {/* Center Panel: AI Analysis & Reasoning (5 cols - Visual Focus) */}
        <div className="lg:col-span-5 space-y-6">
          <AIAnalysisPanel 
            analysisData={analysisData}
            selectedStrategy={selectedStrategy}
            onSelectStrategy={handleSelectStrategy}
            onNavigateToSimulator={onNavigateToSimulator}
          />

          {/* Recovery Action Timeline */}
          {selectedOpportunity && (
            <AgentTimeline payment={selectedOpportunity} />
          )}
        </div>

        {/* Right Panel: Action Center & Safety (3 cols) */}
        <div className="lg:col-span-3">
          <ActionCenter 
            payment={selectedOpportunity}
            strategy={activeStrategy}
            safetyChecks={safetyChecks}
            onApprove={() => setIsApprovalOpen(true)}
            onReject={() => setIsRejectOpen(true)}
            onTryAnother={handleTryAnotherStrategy}
            onManualReview={handleManualReview}
          />
        </div>
      </div>

      {/* 4. AI Activity Stream Widget */}
      <div className="my-6">
        <ActivityStream activities={activities} />
      </div>

      {/* 5. Mobile Sticky Approval Bar (Requirement #49) */}
      {selectedOpportunity && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 z-40 flex items-center justify-between gap-2 shadow-2xl">
          <div>
            <p className="font-bold text-xs text-slate-900">{selectedOpportunity.customer}</p>
            <p className="text-[11px] font-mono text-indigo-600">{selectedOpportunity.id} • {selectedOpportunity.formattedAmount}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="danger" onClick={() => setIsRejectOpen(true)}>
              Reject
            </Button>
            <Button 
              size="sm" 
              variant="ai" 
              disabled={!allPassed}
              onClick={() => setIsApprovalOpen(true)}
            >
              Approve & Simulate
            </Button>
          </div>
        </div>
      )}

      {/* 6. Modals & Dialogs */}
      <ApprovalModal 
        isOpen={isApprovalOpen}
        onClose={() => setIsApprovalOpen(false)}
        onConfirm={handleConfirmApproval}
        payment={selectedOpportunity}
        strategy={activeStrategy}
        probability={analysisData?.probability || 91}
        confidence={analysisData?.confidence || 91}
      />

      <SimulationProgress 
        isOpen={isProgressOpen}
        onComplete={handleSimulationComplete}
      />

      <SimulationResult 
        isOpen={Boolean(simulationResult)}
        onClose={() => {
          setSimulationResult(null);
          const remaining = opportunities.filter(o => o.id !== selectedOpportunity.id);
          if (remaining.length > 0) setSelectedOpportunity(remaining[0]);
        }}
        result={simulationResult}
      />

      <RejectModal 
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirmReject={handleConfirmReject}
        payment={selectedOpportunity}
      />

      <BulkReviewModal 
        isOpen={isBulkReviewOpen}
        onClose={() => setIsBulkReviewOpen(false)}
        selectedOpportunities={opportunities.filter(o => bulkSelectedIds.includes(o.id))}
      />
    </PageContainer>
  );
}
