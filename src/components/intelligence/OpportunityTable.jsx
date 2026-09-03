import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Sparkles, ArrowRight, Eye, Filter } from 'lucide-react';

export default function OpportunityTable({
  opportunities = [],
  onNavigateToAgent
}) {
  const [search, setSearch] = useState('');
  const [scoreFilter, setScoreFilter] = useState('All');
  const [strategyFilter, setStrategyFilter] = useState('All');
  const [reasonFilter, setReasonFilter] = useState('All');

  const filtered = useMemo(() => {
    return opportunities.filter((o) => {
      if (search.trim() !== '') {
        const q = search.toLowerCase();
        const matches = 
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          o.failureReason.toLowerCase().includes(q) ||
          o.recommendedStrategy.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (scoreFilter === '90+' && o.opportunityScore < 90) return false;
      if (scoreFilter === '75+' && o.opportunityScore < 75) return false;
      if (scoreFilter === '50+' && o.opportunityScore < 50) return false;

      if (strategyFilter !== 'All' && o.recommendedStrategy !== strategyFilter) return false;
      if (reasonFilter !== 'All' && !o.failureReason.includes(reasonFilter)) return false;

      return true;
    });
  }, [opportunities, search, scoreFilter, strategyFilter, reasonFilter]);

  const getScoreBadge = (score, category) => {
    if (score >= 90) return <Badge variant="indigo" className="font-mono font-black">{score} • Very High</Badge>;
    if (score >= 75) return <Badge variant="emerald" className="font-mono font-bold">{score} • High</Badge>;
    if (score >= 50) return <Badge variant="amber" className="font-mono font-bold">{score} • Medium</Badge>;
    return <Badge variant="rose" className="font-mono">{score} • Low</Badge>;
  };

  return (
    <Card className="p-0 overflow-hidden border border-slate-200/80 shadow-xs space-y-0">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Top Recovery Opportunities</h3>
            <p className="text-xs text-slate-500 font-medium">AI-scored failed payments prioritized by expected yield</p>
          </div>
          <span className="font-mono text-xs font-bold text-slate-500">{filtered.length} Opportunities Displayed</span>
        </div>

        {/* Filters Row (Requirement #12) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
          <Input 
            isSearch
            placeholder="Search opportunity (TXN ID, customer)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select value={scoreFilter} onChange={(e) => setScoreFilter(e.target.value)}>
            <option value="All">Opportunity Score: All</option>
            <option value="90+">90+ (Very High)</option>
            <option value="75+">75+ (High)</option>
            <option value="50+">50+ (Medium)</option>
          </Select>

          <Select value={strategyFilter} onChange={(e) => setStrategyFilter(e.target.value)}>
            <option value="All">Strategy: All</option>
            <option value="Delayed Retry">Delayed Retry</option>
            <option value="Immediate Retry">Immediate Retry</option>
            <option value="Alternate Payment">Alternate Payment</option>
            <option value="Update Payment Method">Update Payment Method</option>
            <option value="Manual Review">Manual Review</option>
          </Select>

          <Select value={reasonFilter} onChange={(e) => setReasonFilter(e.target.value)}>
            <option value="All">Failure Reason: All</option>
            <option value="Bank">Bank Failure</option>
            <option value="Card">Card Expired</option>
            <option value="Timeout">Network Timeout</option>
            <option value="Funds">Insufficient Funds</option>
          </Select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Transaction</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-4">Failure Reason</th>
              <th className="py-3 px-3 text-center">Probability</th>
              <th className="py-3 px-4 text-center">Opportunity Score</th>
              <th className="py-3 px-4">Recommended Strategy</th>
              <th className="py-3 px-4 text-right">Potential Recovery</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">{o.id}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{o.customer}</td>
                <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">{o.formattedAmount}</td>
                <td className="py-3.5 px-4 text-slate-700">{o.failureReason}</td>
                <td className="py-3.5 px-3 text-center font-mono font-extrabold text-indigo-600">{o.probability}%</td>
                <td className="py-3.5 px-4 text-center">{getScoreBadge(o.opportunityScore, o.scoreCategory)}</td>
                <td className="py-3.5 px-4"><span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 text-[11px]">{o.recommendedStrategy}</span></td>
                <td className="py-3.5 px-4 text-right font-mono font-black text-emerald-600">{o.formattedPotentialRecovery}</td>
                <td className="py-3.5 px-4 text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onNavigateToAgent && onNavigateToAgent(o.id)}
                    className="text-[11px] py-1 px-2.5 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                  >
                    <span>Review with AI</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <div className="md:hidden divide-y divide-slate-100">
        {filtered.map((o) => (
          <div key={o.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-indigo-600 font-bold text-xs">{o.id}</span>
              {getScoreBadge(o.opportunityScore, o.scoreCategory)}
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="font-bold text-slate-900">{o.customer}</span>
              <span className="font-mono font-black text-slate-900">{o.formattedAmount}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
              <span className="text-slate-500">{o.failureReason}</span>
              <span className="font-mono font-black text-emerald-600">{o.formattedPotentialRecovery}</span>
            </div>
            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigateToAgent && onNavigateToAgent(o.id)}
                className="w-full text-xs text-indigo-600 border-indigo-200"
              >
                <span>Review with AI →</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
