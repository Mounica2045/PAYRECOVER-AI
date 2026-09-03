import React, { useState, useEffect, useMemo } from 'react';
import PageContainer from '../components/layout/PageContainer';
import SimulatorHeader from '../components/strategy-simulator/SimulatorHeader';
import SimulationBanner from '../components/strategy-simulator/SimulationBanner';
import PaymentSelector from '../components/strategy-simulator/PaymentSelector';
import PaymentContext from '../components/strategy-simulator/PaymentContext';
import AIRecommendation from '../components/strategy-simulator/AIRecommendation';
import StrategyCards from '../components/strategy-simulator/StrategyCards';
import StrategyComparison from '../components/strategy-simulator/StrategyComparison';
import ProbabilityChart from '../components/strategy-simulator/ProbabilityChart';
import RevenueChart from '../components/strategy-simulator/RevenueChart';
import RiskRewardChart from '../components/strategy-simulator/RiskRewardChart';
import StrategyDetails from '../components/strategy-simulator/StrategyDetails';
import SelectedStrategySummary from '../components/strategy-simulator/SelectedStrategySummary';
import SimulationModal from '../components/strategy-simulator/SimulationModal';
import SimulationProgress from '../components/strategy-simulator/SimulationProgress';
import SimulationResult from '../components/strategy-simulator/SimulationResult';
import BulkAnalysis from '../components/strategy-simulator/BulkAnalysis';

import { mockFailedPayments } from '../data/strategyData';
import { strategySimulator } from '../services/strategySimulator';
import { auditService } from '../services/auditService';

export default function Simulator({ initialSelectedTxnId }) {
  const [payments, setPayments] = useState(mockFailedPayments);
  const [mode, setMode] = useState('single');

  // Currently Selected Payment in Single Mode
  const [selectedPayment, setSelectedPayment] = useState(() => {
    if (initialSelectedTxnId) {
      return mockFailedPayments.find(p => p.id === initialSelectedTxnId) || mockFailedPayments[0];
    }
    return mockFailedPayments[0];
  });

  // Selected Strategy ID Override
  const [selectedStrategyId, setSelectedStrategyId] = useState('Delayed Retry');

  // Detailed Strategy Data generated dynamically via service layer
  const evaluatedStrategies = useMemo(() => {
    return strategySimulator.getPaymentStrategies(selectedPayment);
  }, [selectedPayment]);

  const activeStrategy = useMemo(() => {
    return evaluatedStrategies.find(s => s.id === selectedStrategyId) || evaluatedStrategies[0];
  }, [evaluatedStrategies, selectedStrategyId]);

  const recommendedStrategy = useMemo(() => {
    return evaluatedStrategies.find(s => s.recommended) || evaluatedStrategies[0];
  }, [evaluatedStrategies]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  // Reset Simulation Handler (Requirement #34)
  const handleResetSimulation = () => {
    setMode('single');
    setSelectedPayment(mockFailedPayments[0]);
    setSelectedStrategyId('Delayed Retry');
    setIsModalOpen(false);
    setIsProgressOpen(false);
    setSimulationResult(null);
  };

  const handleConfirmSimulation = () => {
    setIsModalOpen(false);
    setIsProgressOpen(true);
  };

  const handleSimulationComplete = () => {
    setIsProgressOpen(false);
    const outcome = strategySimulator.simulateStrategy(selectedPayment, selectedStrategyId);
    
    // Create audit event
    auditService.createAuditEvent({
      transactionId: selectedPayment.id,
      customer: selectedPayment.customer,
      amount: selectedPayment.amount,
      formattedAmount: selectedPayment.formattedAmount,
      type: "Simulation Completed",
      actor: "AI + Merchant",
      strategy: activeStrategy?.name || "Delayed Retry",
      status: "Simulated",
      description: `Strategy Simulator executed sandbox test for ${activeStrategy?.name}. Estimated recovery yield: ${activeStrategy?.formattedEstimatedRecovery}.`
    });

    setSimulationResult(outcome);
  };

  return (
    <PageContainer>
      {/* 1. Header with Reset Simulation & Simulation Mode Badge */}
      <SimulatorHeader onReset={handleResetSimulation} />

      {/* 2. Simulation Environment Banner */}
      <div className="mb-6">
        <SimulationBanner />
      </div>

      {/* 3. Payment Selector & Mode Switcher */}
      <div className="mb-6">
        <PaymentSelector 
          payments={payments}
          selectedPaymentId={selectedPayment?.id}
          onSelectPayment={(p) => {
            setSelectedPayment(p);
            setSelectedStrategyId('Delayed Retry');
          }}
          mode={mode}
          onModeChange={setMode}
        />
      </div>

      {mode === 'single' ? (
        <div className="space-y-6">
          {/* 4. Payment Context */}
          <PaymentContext payment={selectedPayment} />

          {/* 5. AI Recommended Strategy Banner */}
          <AIRecommendation 
            recommendedStrategy={recommendedStrategy}
            payment={selectedPayment}
          />

          {/* 6. Candidate Strategy Cards */}
          <StrategyCards 
            strategies={evaluatedStrategies}
            selectedStrategyId={selectedStrategyId}
            onSelectStrategy={setSelectedStrategyId}
            onCardClick={(st) => setSelectedStrategyId(st.id)}
          />

          {/* 7. Strategy Comparison Table */}
          <StrategyComparison 
            strategies={evaluatedStrategies}
            selectedStrategyId={selectedStrategyId}
            onSelectStrategy={setSelectedStrategyId}
          />

          {/* 8. Visualizations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ProbabilityChart 
              strategies={evaluatedStrategies}
              selectedStrategyId={selectedStrategyId}
              onSelectStrategy={setSelectedStrategyId}
            />
            <RevenueChart 
              strategies={evaluatedStrategies}
              selectedStrategyId={selectedStrategyId}
              onSelectStrategy={setSelectedStrategyId}
            />
            <RiskRewardChart 
              strategies={evaluatedStrategies}
              selectedStrategyId={selectedStrategyId}
              onSelectStrategy={setSelectedStrategyId}
            />
          </div>

          {/* 9. Strategy Detail Panel */}
          <StrategyDetails 
            strategy={activeStrategy}
            payment={selectedPayment}
          />

          {/* 10. Selected Strategy Summary & Simulation Action */}
          <SelectedStrategySummary 
            selectedStrategy={activeStrategy}
            strategies={evaluatedStrategies}
            payment={selectedPayment}
            onRunSimulation={() => setIsModalOpen(true)}
          />
        </div>
      ) : (
        /* Bulk Analysis Mode */
        <BulkAnalysis 
          payments={payments}
          onRunBulkSimulation={(selectedPayments, strategy) => {
            setIsModalOpen(true);
          }}
        />
      )}

      {/* 11. Simulation Execution Modals */}
      <SimulationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSimulation}
        payment={selectedPayment}
        strategy={activeStrategy}
      />

      <SimulationProgress 
        isOpen={isProgressOpen}
        onComplete={handleSimulationComplete}
      />

      <SimulationResult 
        isOpen={Boolean(simulationResult)}
        onClose={() => setSimulationResult(null)}
        result={simulationResult}
      />
    </PageContainer>
  );
}
