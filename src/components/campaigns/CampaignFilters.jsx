import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { RotateCcw } from 'lucide-react';

export default function CampaignFilters({
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
      {/* Search Input */}
      <Input 
        isSearch
        placeholder="Search campaigns (name, strategy, audience, channel)..."
        value={filters.search}
        onChange={(e) => handleChange('search', e.target.value)}
      />

      {/* Filter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
        {/* Status Filter */}
        <Select 
          value={filters.status} 
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option value="All">Status: All</option>
          <option value="Draft">Draft</option>
          <option value="Ready">Ready</option>
          <option value="Simulated">Simulated</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Completed">Completed</option>
          <option value="Archived">Archived</option>
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
        </Select>

        {/* Channel Filter */}
        <Select 
          value={filters.channel} 
          onChange={(e) => handleChange('channel', e.target.value)}
        >
          <option value="All">Channel: All</option>
          <option value="Email">Email</option>
          <option value="SMS">SMS</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="In-App">In-App</option>
        </Select>

        {/* Audience Filter */}
        <Select 
          value={filters.audience} 
          onChange={(e) => handleChange('audience', e.target.value)}
        >
          <option value="All">Audience: All</option>
          <option value="High-Value Failed Payments">High-Value Failed Payments</option>
          <option value="Recent Payment Failures">Recent Payment Failures</option>
          <option value="Temporary Bank Failures">Temporary Bank Failures</option>
          <option value="Multiple Failed Attempts">Multiple Failed Attempts</option>
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
