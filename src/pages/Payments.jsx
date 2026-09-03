import React, { useState, useMemo } from 'react';
import PageContainer from '../components/layout/PageContainer';
import PaymentsHeader from '../components/payments/PaymentsHeader';
import PaymentSummary from '../components/payments/PaymentSummary';
import PaymentFilters from '../components/payments/PaymentFilters';
import BulkActionBar from '../components/payments/BulkActionBar';
import PaymentTable from '../components/payments/PaymentTable';
import PaymentDrawer from '../components/payments/PaymentDrawer';
import SimulationModal from '../components/payments/SimulationModal';
import SimulationResultModal from '../components/payments/SimulationResultModal';

import { initialPaymentsData, exportPaymentsToCSV } from '../data/paymentsData';

export default function Payments({ initialSelectedTxnId, onNavigateToAgent }) {
  const [paymentsList, setPaymentsList] = useState(initialPaymentsData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter State
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    failureReason: 'All',
    method: 'All',
    recoveryStatus: 'All',
    amountRange: 'All',
    datePeriod: 'All'
  });

  // Sorting & Pagination State
  const [sortConfig, setSortConfig] = useState({ key: 'rawDate', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Selection & Modal States
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedDrawerPayment, setSelectedDrawerPayment] = useState(() => {
    if (initialSelectedTxnId) {
      return initialPaymentsData.find(p => p.id === initialSelectedTxnId) || null;
    }
    return null;
  });
  const [simModalPayment, setSimModalPayment] = useState(null);
  const [simResultData, setSimResultData] = useState(null);

  // Filtered & Sorted Payments Logic
  const filteredPayments = useMemo(() => {
    return paymentsList.filter((item) => {
      // 1. Search Query
      if (filters.search.trim() !== '') {
        const q = filters.search.toLowerCase();
        const matchesSearch = 
          item.id.toLowerCase().includes(q) ||
          item.customer.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.amount.toString().includes(q);
        if (!matchesSearch) return false;
      }

      // 2. Status Filter
      if (filters.status !== 'All' && item.status !== filters.status) {
        return false;
      }

      // 3. Failure Reason Filter
      if (filters.failureReason !== 'All' && item.failureReason !== filters.failureReason) {
        return false;
      }

      // 4. Method Filter
      if (filters.method !== 'All' && item.method !== filters.method) {
        return false;
      }

      // 5. Recovery Status Filter
      if (filters.recoveryStatus !== 'All' && item.recoveryStatus !== filters.recoveryStatus) {
        return false;
      }

      // 6. Amount Range Filter
      if (filters.amountRange !== 'All') {
        if (filters.amountRange === 'below-1000' && item.amount >= 1000) return false;
        if (filters.amountRange === '1000-5000' && (item.amount < 1000 || item.amount > 5000)) return false;
        if (filters.amountRange === '5000-10000' && (item.amount < 5000 || item.amount > 10000)) return false;
        if (filters.amountRange === 'above-10000' && item.amount <= 10000) return false;
      }

      return true;
    }).sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [paymentsList, filters, sortConfig]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage) || 1;
  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(start, start + itemsPerPage);
  }, [filteredPayments, currentPage, itemsPerPage]);

  // Sorting Toggle Handler
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Selection Handlers
  const handleToggleSelectAll = () => {
    if (paginatedPayments.every(p => selectedIds.includes(p.id))) {
      setSelectedIds(prev => prev.filter(id => !paginatedPayments.some(p => p.id === id)));
    } else {
      const pageIds = paginatedPayments.map(p => p.id);
      setSelectedIds(prev => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const handleToggleSelectRow = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Export CSV Handler
  const handleExportCSV = () => {
    exportPaymentsToCSV(filteredPayments);
  };

  // Refresh Handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setIsLoading(false);
    }, 400);
  };

  // Clear Filters Handler
  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'All',
      failureReason: 'All',
      method: 'All',
      recoveryStatus: 'All',
      amountRange: 'All',
      datePeriod: 'All'
    });
    setCurrentPage(1);
  };

  // Simulation Handlers
  const handleConfirmSimulation = (payment) => {
    // Update local payment state to Recovered (Simulated)
    setPaymentsList(prev => prev.map(p => p.id === payment.id ? { ...p, recoveryStatus: 'Recovered' } : p));
    setSimModalPayment(null);
    setSelectedDrawerPayment(null);
    setSimResultData({
      id: payment.id,
      amount: payment.formattedAmount,
      action: payment.recommendedAction || 'Delayed Retry'
    });
  };

  return (
    <PageContainer>
      {/* 1. Header with Export CSV & Refresh */}
      <PaymentsHeader 
        onExportCSV={handleExportCSV}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* 2. Summary Metric Cards */}
      <PaymentSummary />

      {/* 3. Filter Toolbar */}
      <PaymentFilters 
        filters={filters}
        onFilterChange={(newFilters) => { setFilters(newFilters); setCurrentPage(1); }}
        onClearFilters={handleClearFilters}
      />

      {/* 4. Bulk Action Bar */}
      <BulkActionBar 
        selectedCount={selectedIds.length}
        onSimulateBulk={() => {
          setSimModalPayment(paymentsList.find(p => p.id === selectedIds[0]) || paymentsList[0]);
        }}
        onAddToReview={() => setSelectedIds([])}
        onClearSelection={() => setSelectedIds([])}
      />

      {/* 5. Main Payment Data Table */}
      <PaymentTable 
        data={paginatedPayments}
        selectedIds={selectedIds}
        onToggleSelectAll={handleToggleSelectAll}
        onToggleSelectRow={handleToggleSelectRow}
        onSelectRow={(item) => setSelectedDrawerPayment(item)}
        onSimulateAction={(item) => setSimModalPayment(item)}
        onAddToReview={(item) => {
          setPaymentsList(prev => prev.map(p => p.id === item.id ? { ...p, recoveryStatus: 'Review' } : p));
        }}
        sortConfig={sortConfig}
        onSort={handleSort}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredPayments.length}
        onPageChange={(page) => setCurrentPage(page)}
        isLoading={isLoading}
      />

      {/* 6. Payment Detail Drawer */}
      <PaymentDrawer 
        payment={selectedDrawerPayment}
        isOpen={Boolean(selectedDrawerPayment)}
        onClose={() => setSelectedDrawerPayment(null)}
        onSimulateRecovery={(p) => setSimModalPayment(p)}
        onNavigateToAgent={onNavigateToAgent}
      />

      {/* 7. Simulation Confirmation Modal */}
      <SimulationModal 
        isOpen={Boolean(simModalPayment)}
        onClose={() => setSimModalPayment(null)}
        onConfirm={handleConfirmSimulation}
        payment={simModalPayment}
      />

      {/* 8. Simulation Result Modal */}
      <SimulationResultModal 
        isOpen={Boolean(simResultData)}
        onClose={() => setSimResultData(null)}
        resultData={simResultData}
      />
    </PageContainer>
  );
}
