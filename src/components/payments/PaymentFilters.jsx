import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Filter, RotateCcw } from 'lucide-react';

export default function PaymentFilters({
  filters,
  onFilterChange,
  onClearFilters
}) {
  const handleSelectChange = (key, val) => {
    onFilterChange({ ...filters, [key]: val });
  };

  return (
    <div className="fintech-card p-4 space-y-3">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="w-full lg:w-96">
          <Input 
            isSearch
            placeholder="Search payments by ID, customer, email, amount..."
            value={filters.search}
            onChange={(e) => handleSelectChange('search', e.target.value)}
          />
        </div>

        {/* Dropdown Filters Grid */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Status */}
          <Select
            value={filters.status}
            onChange={(e) => handleSelectChange('status', e.target.value)}
            className="w-32"
          >
            <option value="All">Status: All</option>
            <option value="Successful">Successful</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </Select>

          {/* Failure Reason */}
          <Select
            value={filters.failureReason}
            onChange={(e) => handleSelectChange('failureReason', e.target.value)}
            className="w-40"
          >
            <option value="All">Failure: All</option>
            <option value="Bank Unavailable">Bank Unavailable</option>
            <option value="Insufficient Funds">Insufficient Funds</option>
            <option value="Card Expired">Card Expired</option>
            <option value="Network Error">Network Error</option>
            <option value="Payment Limit Exceeded">Limit Exceeded</option>
            <option value="Authentication Failed">Auth Failed</option>
          </Select>

          {/* Payment Method */}
          <Select
            value={filters.method}
            onChange={(e) => handleSelectChange('method', e.target.value)}
            className="w-32"
          >
            <option value="All">Method: All</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Wallet">Wallet</option>
          </Select>

          {/* Recovery Status */}
          <Select
            value={filters.recoveryStatus}
            onChange={(e) => handleSelectChange('recoveryStatus', e.target.value)}
            className="w-36"
          >
            <option value="All">Recovery: All</option>
            <option value="Ready">Ready</option>
            <option value="Action Needed">Action Needed</option>
            <option value="Pending">Pending</option>
            <option value="Recovered">Recovered</option>
            <option value="Not Eligible">Not Eligible</option>
          </Select>

          {/* Amount Filter */}
          <Select
            value={filters.amountRange}
            onChange={(e) => handleSelectChange('amountRange', e.target.value)}
            className="w-36"
          >
            <option value="All">Amount: All</option>
            <option value="below-1000">Below ₹1,000</option>
            <option value="1000-5000">₹1,000 – ₹5,000</option>
            <option value="5000-10000">₹5,000 – ₹10,000</option>
            <option value="above-10000">Above ₹10,000</option>
          </Select>

          {/* Clear Filters Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-slate-500 hover:text-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
