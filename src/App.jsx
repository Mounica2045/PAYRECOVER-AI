import React, { useState } from 'react';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Payments from './pages/Payments';
import AIAgent from './pages/AIAgent';
import AgentOrchestrator from './pages/AgentOrchestrator';
import Simulator from './pages/Simulator';
import Campaigns from './pages/Campaigns';
import Intelligence from './pages/Intelligence';
import Audit from './pages/Audit';
import DesignShowcase from './pages/DesignShowcase';

import {
  AnalyticsPlaceholder,
  SettingsPlaceholder,
  HelpPlaceholder
} from './pages/placeholders/Placeholders';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedTxnId, setSelectedTxnId] = useState(null);

  const handleSearchResultClick = (result) => {
    if (result.type === 'Transaction') {
      setSelectedTxnId(result.id);
      setCurrentPage('ai-agent');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleNavigateToAgent = (txnId = null) => {
    if (txnId) setSelectedTxnId(txnId);
    setCurrentPage('ai-agent');
  };

  const handleNavigateToSimulator = (txnId = null) => {
    if (txnId) setSelectedTxnId(txnId);
    setCurrentPage('simulator');
  };

  const handleNavigateToAudit = (txnId = null) => {
    if (txnId) setSelectedTxnId(txnId);
    setCurrentPage('audit');
  };

  const handleSelectTransactionFromDashboard = (txn) => {
    if (txn && txn.id) {
      setSelectedTxnId(txn.id);
      setCurrentPage('ai-agent');
    } else {
      setCurrentPage('ai-agent');
    }
  };

  return (
    <AppShell 
      currentPage={currentPage}
      setCurrentPage={(pageId) => {
        setCurrentPage(pageId);
        if (pageId !== 'payments' && pageId !== 'ai-agent' && pageId !== 'simulator' && pageId !== 'audit') {
          setSelectedTxnId(null);
        }
      }}
      onSelectSearchResult={handleSearchResultClick}
    >
      {currentPage === 'dashboard' && (
        <Dashboard 
          onNavigateToPage={(pageId) => setCurrentPage(pageId)}
          onNavigateToAgent={handleNavigateToAgent}
          onNavigateToSimulator={handleNavigateToSimulator}
          onSelectTransaction={handleSelectTransactionFromDashboard}
        />
      )}
      {currentPage === 'payments' && (
        <Payments 
          initialSelectedTxnId={selectedTxnId} 
          onNavigateToAgent={handleNavigateToAgent}
          onNavigateToSimulator={handleNavigateToSimulator}
        />
      )}
      {currentPage === 'agent' && (
        <AgentOrchestrator 
          onNavigateToPage={(p) => setCurrentPage(p)}
          onNavigateToAgent={handleNavigateToAgent}
          onNavigateToSimulator={handleNavigateToSimulator}
          onNavigateToCampaigns={() => setCurrentPage('campaigns')}
          onNavigateToAudit={handleNavigateToAudit}
        />
      )}
      {currentPage === 'ai-agent' && (
        <AIAgent 
          initialSelectedTxnId={selectedTxnId} 
          onNavigateToSimulator={handleNavigateToSimulator}
        />
      )}
      {currentPage === 'simulator' && (
        <Simulator initialSelectedTxnId={selectedTxnId} />
      )}
      {currentPage === 'campaigns' && (
        <Campaigns />
      )}
      {currentPage === 'intelligence' && (
        <Intelligence 
          onNavigateToAgent={handleNavigateToAgent}
          onNavigateToSimulator={handleNavigateToSimulator}
          onNavigateToCampaigns={() => setCurrentPage('campaigns')}
        />
      )}
      {currentPage === 'audit' && (
        <Audit initialSelectedTxnId={selectedTxnId} />
      )}
      {currentPage === 'analytics' && <AnalyticsPlaceholder />}
      {currentPage === 'settings' && <SettingsPlaceholder />}
      {currentPage === 'help' && <HelpPlaceholder />}
      {currentPage === 'showcase' && <DesignShowcase />}
    </AppShell>
  );
}
