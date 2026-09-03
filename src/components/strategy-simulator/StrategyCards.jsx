import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Check, Sparkles, Clock, AlertTriangle, UserCheck } from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';

export default function StrategyCards({
  strategies = [],
  selectedStrategyId,
  onSelectStrategy,
  onCardClick
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Candidate Strategies</h4>
        <span className="text-[11px] text-slate-500 font-medium">Select a strategy to evaluate parameters</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {strategies.map((st) => {
          const isSelected = st.id === selectedStrategyId;

          return (
            <div
              key={st.id}
              onClick={() => {
                onCardClick && onCardClick(st);
              }}
              className={`
                p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between space-y-4
                ${isSelected 
                  ? 'bg-gradient-to-br from-indigo-50/90 via-white to-indigo-50/30 border-indigo-600 ring-2 ring-indigo-500/20 shadow-md' 
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-subtle'}
              `}
            >
              <div className="space-y-3">
                {/* Header: Title & Badges */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-sm text-slate-900">{st.name}</h4>
                      {st.recommended && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-indigo-100 text-indigo-700 uppercase">
                          AI Top
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{st.description}</p>
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Probability</span>
                    <span className="font-mono font-extrabold text-indigo-600 text-sm">{st.probability}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Est. Recovery</span>
                    <span className="font-mono font-black text-slate-900">{st.formattedEstimatedRecovery}</span>
                  </div>
                </div>

                {/* Risk, Time, Customer Impact Badges */}
                <div className="space-y-1.5 text-[11px] pt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Risk Level:</span>
                    <Badge variant={st.riskLevel === 'Low' ? 'emerald' : st.riskLevel === 'Medium' ? 'amber' : 'rose'}>
                      {st.riskLevel}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Expected Time:</span>
                    <span className="font-mono font-bold text-slate-800">{st.expectedTime}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Customer Impact:</span>
                    <Badge variant={st.customerImpact === 'Low' ? 'slate' : st.customerImpact === 'Medium' ? 'amber' : 'rose'}>
                      {st.customerImpact}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Select Button */}
              <div className="pt-2">
                <Button
                  variant={isSelected ? "ai" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStrategy(st.id);
                  }}
                  className="w-full flex items-center justify-center gap-1.5"
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>✓ Selected</span>
                    </>
                  ) : (
                    <span>Select Strategy</span>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
