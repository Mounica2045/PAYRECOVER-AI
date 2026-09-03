import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { RotateCcw } from 'lucide-react';

export default function AuditFilters({
  filters,
  onFilterChange,
  onClearFilters
}) {
  const handleChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
      {/* Row 1: Search Input */}
      <Input 
        isSearch
        placeholder="Search audit events (TXN ID, customer, strategy, actor)..."
        value={filters.search}
        onChange={(e) => handleChange('search', e.target.value)}
      />

      {/* Row 2: Filter Toolbar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
        {/* Event Type Filter */}
        <Select 
          value={filters.eventType} 
          onChange={(e) => handleChange('eventType', e.target.value)}
        >
          <option value="All">Event Type: All</option>
          <option value="AI Recommendation">AI Recommendation</option>
          <option value="Merchant Approval">Merchant Approval</option>
          <option value="Merchant Rejection">Merchant Rejection</option>
          <option value="Simulation Started">Simulation Started</option>
          <option value="Simulation Completed">Simulation Completed</option>
          <option value="Safety Check Passed">Safety Check Passed</option>
          <option value="Safety Check Failed">Safety Check Failed</option>
          <option value="Manual Review">Manual Review</option>
          <option value="Strategy Changed">Strategy Changed</option>
        </Select>

        {/* Actor Filter */}
        <Select 
          value={filters.actor} 
          onChange={(e) => handleChange('actor', e.target.value)}
        >
          <option value="All">Actor: All</option>
          <option value="AI Agent">AI Agent</option>
          <option value="Merchant">Merchant</option>
          <option value="Safety Engine">Safety Engine</option>
          <option value="System">System</option>
          <option value="AI + Merchant">AI + Merchant</option>
        </Select>

        {/* Status Filter */}
        <Select 
          value={filters.status} 
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option value="All">Status: All</option>
          <option value="Recommended">Recommended</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Simulated">Simulated</option>
          <option value="Blocked">Blocked</option>
          <option value="Passed">Passed</option>
          <option value="Failed">Failed</option>
          <option value="Pending">Pending</option>
        </Select>

        {/* Strategy Filter */}
        <Select 
          value={filters.strategy} 
          onChange={(e) => handleChange('strategy', e.target.value)}
        >
          <option value="All">Strategy: All</option>
          <option value="Delayed Retry">Delayed Retry</option>
          <option value="Immediate Retry">Immediate Retry</option>
          <option value="Alternate Payment">Alternate Payment</option>
          <option value="Manual Review">Manual Review</option>
          <option value="Update Payment Method">Update Payment Method</option>
          <option value="Send Payment Link">Send Payment Link</option>
        </Select>

        {/* Date Filter */}
        <Select 
          value={filters.datePeriod} 
          onChange={(e) => handleChange('datePeriod', e.target.value)}
        >
          <option value="All">Date: All Time</option>
          <option value="today">Today</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </Select>

        {/* Clear Filters Button */}
        <Button 
          variant="secondary"
          size="sm"
          onClick={onClearFilters}
          className="flex items-center justify-center gap-1 text-slate-600 border-slate-200 hover:bg-slate-100"
        >
          <RotateCcw className="w-3 h-3 text-slate-400" />
          <span>Clear Filters</span>
        </Button>
      </div>
    </div>
  );
}
