import React, { useState, useEffect, useMemo } from 'react';
import PageContainer from '../components/layout/PageContainer';
import AuditHeader from '../components/audit/AuditHeader';
import SafetyBanner from '../components/audit/SafetyBanner';
import AuditOverview from '../components/audit/AuditOverview';
import AuditActivityChart from '../components/audit/AuditActivityChart';
import AuditFilters from '../components/audit/AuditFilters';
import AuditTable from '../components/audit/AuditTable';
import AuditEventDrawer from '../components/audit/AuditEventDrawer';
import SafetyCenter from '../components/audit/SafetyCenter';
import SafetyEvents from '../components/audit/SafetyEvents';

import { auditService } from '../services/auditService';

export default function Audit({ initialSelectedTxnId }) {
  const [allEvents, setAllEvents] = useState(() => auditService.getAuditEvents());
  const [safetyEvents] = useState(() => auditService.getSafetyEvents());
  const [safetyControls] = useState(() => auditService.getSafetyControls());
  const [safetyRules] = useState(() => auditService.getSafetyRules());

  // Filter State
  const [filters, setFilters] = useState({
    search: initialSelectedTxnId || '',
    eventType: 'All',
    actor: 'All',
    status: 'All',
    strategy: 'All',
    datePeriod: 'All'
  });

  // Sorting & Pagination State
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Selected Drawer Event State
  const [selectedDrawerEvent, setSelectedDrawerEvent] = useState(null);

  // Reload events from service
  const reloadEvents = () => {
    setAllEvents(auditService.getAuditEvents());
  };

  useEffect(() => {
    reloadEvents();
  }, []);

  // Filtered & Sorted Audit Events Logic
  const filteredEvents = useMemo(() => {
    return allEvents.filter((item) => {
      // 1. Search Query
      if (filters.search.trim() !== '') {
        const q = filters.search.toLowerCase();
        const matches = 
          item.transactionId.toLowerCase().includes(q) ||
          item.customer.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.actor.toLowerCase().includes(q) ||
          (item.strategy && item.strategy.toLowerCase().includes(q)) ||
          item.amount.toString().includes(q);
        if (!matches) return false;
      }

      // 2. Event Type Filter
      if (filters.eventType !== 'All' && item.type !== filters.eventType) {
        return false;
      }

      // 3. Actor Filter
      if (filters.actor !== 'All' && item.actor !== filters.actor) {
        return false;
      }

      // 4. Status Filter
      if (filters.status !== 'All' && item.status !== filters.status) {
        return false;
      }

      // 5. Strategy Filter
      if (filters.strategy !== 'All' && item.strategy !== filters.strategy) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      let aVal = a[sortConfig.key] || '';
      let bVal = b[sortConfig.key] || '';
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [allEvents, filters, sortConfig]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage) || 1;
  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(start, start + itemsPerPage);
  }, [filteredEvents, currentPage, itemsPerPage]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      eventType: 'All',
      actor: 'All',
      status: 'All',
      strategy: 'All',
      datePeriod: 'All'
    });
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    auditService.exportAuditEventsToCSV(filteredEvents);
  };

  // Transaction history for selected drawer event
  const transactionHistory = useMemo(() => {
    if (!selectedDrawerEvent) return [];
    return auditService.getAuditEventsByTransaction(selectedDrawerEvent.transactionId);
  }, [selectedDrawerEvent]);

  return (
    <PageContainer>
      {/* 1. Header with Export CSV */}
      <AuditHeader onExportCSV={handleExportCSV} />

      {/* 2. Top Safety Banner */}
      <div className="mb-6">
        <SafetyBanner />
      </div>

      {/* 3. Overview Metric StatCards */}
      <div className="mb-6">
        <AuditOverview 
          totalCount={1284 + (allEvents.length - 40)}
          recommendationsCount={347}
          approvalsCount={218}
          simulationsCount={205}
          safetyBlocksCount={19}
        />
      </div>

      {/* 4. Audit Activity Charts (Daily Activity & Event Distribution) */}
      <div className="mb-6">
        <AuditActivityChart />
      </div>

      {/* 5. Filter Toolbar */}
      <div className="mb-6">
        <AuditFilters 
          filters={filters}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1);
          }}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* 6. Main Audit Table */}
      <div className="mb-8">
        <AuditTable 
          events={paginatedEvents}
          onSelectEvent={(evt) => setSelectedDrawerEvent(evt)}
          sortConfig={sortConfig}
          onSort={handleSort}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredEvents.length}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* 7. Dedicated Safety Center & Control Cards */}
      <div className="mb-8">
        <SafetyCenter 
          controls={safetyControls}
          rules={safetyRules}
        />
      </div>

      {/* 8. Recent Safety Events Section */}
      <div className="mb-6">
        <SafetyEvents safetyEvents={safetyEvents} />
      </div>

      {/* 9. Event Detail Drawer */}
      <AuditEventDrawer 
        event={selectedDrawerEvent}
        isOpen={Boolean(selectedDrawerEvent)}
        onClose={() => setSelectedDrawerEvent(null)}
        transactionHistory={transactionHistory}
      />
    </PageContainer>
  );
}
