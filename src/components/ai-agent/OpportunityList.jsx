import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Search, Filter, ArrowUpDown, CheckSquare, Sparkles, ShieldAlert } from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';

export default function OpportunityList({
  opportunities = [],
  selectedTxnId,
  onSelectOpportunity,
  onBulkReview
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterReason, setFilterReason] = useState('All');
  const [filterProb, setFilterProb] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('priorityScore');
  const [selectedIds, setSelectedIds] = useState([]);

  // Multi-filtering & Sorting
  const filteredList = useMemo(() => {
    return opportunities.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches = 
          item.customer.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.failureReason.toLowerCase().includes(q) ||
          item.amount.toString().includes(q);
        if (!matches) return false;
      }

      // 2. Filters
      if (filterPriority !== 'All' && item.priority !== filterPriority) return false;
      if (filterReason !== 'All' && item.failureReason !== filterReason) return false;
      if (filterStatus !== 'All' && item.status !== filterStatus) return false;

      if (filterProb !== 'All') {
        if (filterProb === 'above90' && item.probability < 90) return false;
        if (filterProb === '75to90' && (item.probability < 75 || item.probability >= 90)) return false;
        if (filterProb === 'below75' && item.probability >= 75) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'probability') return b.probability - a.probability;
      if (sortBy === 'value') return b.amount - a.amount;
      if (sortBy === 'priorityScore') return b.priorityScore - a.priorityScore;
      if (sortBy === 'newest') return a.id < b.id ? 1 : -1;
      if (sortBy === 'oldest') return a.id > b.id ? 1 : -1;
      return 0;
    });
  }, [opportunities, searchQuery, filterPriority, filterReason, filterProb, filterStatus, sortBy]);

  const toggleSelectRow = (id, e) => {
    e.stopPropagation();
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAllInQueue = () => {
    if (selectedIds.length === filteredList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredList.map(o => o.id));
    }
  };

  return (
    <Card className="p-4 h-full flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Title */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Recovery Opportunities</h3>
            <p className="text-xs text-slate-500 font-medium">Payments identified by the AI agent</p>
          </div>
          <span className="px-2 py-0.5 text-xs font-mono font-bold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
            {opportunities.length} Total
          </span>
        </div>

        {/* Search Input */}
        <Input 
          isSearch
          placeholder="Search opportunities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Controls Toolbar */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="All">Priority: All</option>
            <option value="HIGH">HIGH Priority</option>
            <option value="MEDIUM">MEDIUM Priority</option>
            <option value="LOW">LOW Priority</option>
          </Select>

          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="priorityScore">Highest Priority Score</option>
            <option value="probability">Highest Probability</option>
            <option value="value">Highest Value</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </Select>
        </div>

        {/* Secondary Filter Row */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <Select value={filterReason} onChange={(e) => setFilterReason(e.target.value)}>
            <option value="All">Failure: All</option>
            <option value="Bank Unavailable">Bank Unavailable</option>
            <option value="Card Expired">Card Expired</option>
            <option value="Insufficient Funds">Insufficient Funds</option>
            <option value="Network Error">Network Error</option>
            <option value="Payment Limit Exceeded">Limit Exceeded</option>
          </Select>

          <Select value={filterProb} onChange={(e) => setFilterProb(e.target.value)}>
            <option value="All">Probability: All</option>
            <option value="above90">&gt; 90% Probability</option>
            <option value="75to90">75% – 90% Probability</option>
            <option value="below75">&lt; 75% Probability</option>
          </Select>
        </div>

        {/* Multi-selection Header Bar */}
        {selectedIds.length > 0 && (
          <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-between text-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={selectedIds.length === filteredList.length && filteredList.length > 0}
                onChange={handleSelectAllInQueue}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className="font-bold text-indigo-900">{selectedIds.length} opportunities selected</span>
            </div>
            <Button variant="ai" size="sm" onClick={() => onBulkReview && onBulkReview(selectedIds)}>
              Review Selected
            </Button>
          </div>
        )}

        {/* Opportunities Scrollable List */}
        <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
          {filteredList.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No recovery opportunities match your filter criteria.
            </div>
          ) : (
            filteredList.map((item) => {
              const isSelected = item.id === selectedTxnId;
              const isChecked = selectedIds.includes(item.id);
              const isBlocked = item.status === 'Safety Blocked' || item.safetyBlocked;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectOpportunity(item)}
                  className={`
                    p-3.5 rounded-2xl border transition-all cursor-pointer relative space-y-2.5
                    ${isSelected 
                      ? 'bg-gradient-to-r from-indigo-50/90 via-white to-indigo-50/30 border-indigo-500 ring-2 ring-indigo-500/20 shadow-md' 
                      : isBlocked 
                        ? 'bg-rose-50/40 border-rose-200/80 hover:border-rose-300'
                        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-subtle'}
                  `}
                >
                  {/* Row 1: Initials, Customer, TxnID, Priority */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => toggleSelectRow(item.id, e)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {item.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 leading-tight">{item.customer}</h4>
                        <span className="font-mono text-[11px] font-bold text-indigo-600">{item.id}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isBlocked ? (
                        <Badge variant="rose" className="flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" />
                          <span>BLOCKED</span>
                        </Badge>
                      ) : (
                        <Badge variant={item.priority === 'HIGH' ? 'rose' : item.priority === 'MEDIUM' ? 'amber' : 'slate'}>
                          {item.priority}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Amount, Failure Reason, Probability */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Amount & Reason</p>
                      <p className="font-black text-slate-900">{item.formattedAmount} • <span className="font-medium text-slate-700">{item.failureReason}</span></p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">AI Prob.</p>
                      <p className={`font-extrabold text-xs ${item.probability >= 85 ? 'text-indigo-600' : item.probability >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                        {item.probability}%
                      </p>
                    </div>
                  </div>

                  {/* Row 3: Priority Score & Timestamp */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                    <span>Priority Score: <strong className="text-slate-800 font-mono">{item.priorityScore}/100</strong></span>
                    <span>{item.date}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Card>
  );
}
