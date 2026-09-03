import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { PlayCircle, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';

export default function SelectedStrategySummary({
  selectedStrategy,
  strategies = [],
  payment,
  onRunSimulation
}) {
  if (!selectedStrategy || !payment) return null;

  // Find best alternative strategy for dynamic revenue comparison (Requirement #27 & #28)
  const otherStrategies = strategies.filter(s => s.id !== selectedStrategy.id);
  const bestAlternative = otherStrategies.reduce((prev, curr) => (curr.estimatedRecovery > prev.estimatedRecovery ? curr : prev), otherStrategies[0] || selectedStrategy);

  const diff = selectedStrategy.estimatedRecovery - bestAlternative.estimatedRecovery;
  const isPositive = diff >= 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white space-y-6 shadow-xl border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Selected Recovery Strategy</span>
          <h3 className="text-2xl font-black text-white mt-0.5">{selectedStrategy.name}</h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest block">Expected Recovery</span>
            <span className="text-xl font-black text-emerald-400 font-mono">{selectedStrategy.formattedEstimatedRecovery}</span>
          </div>
          <Badge variant="indigo" className="bg-white/10 text-indigo-200 border-white/20">
            {selectedStrategy.probability}% Prob
          </Badge>
        </div>
      </div>

      {/* Strategy Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Recovery Probability</span>
          <span className="text-base font-extrabold text-white font-mono">{selectedStrategy.probability}%</span>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Expected Recovery</span>
          <span className="text-base font-extrabold text-white font-mono">{selectedStrategy.formattedEstimatedRecovery}</span>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Risk Level</span>
          <span className="text-base font-extrabold text-emerald-400">{selectedStrategy.riskLevel}</span>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Customer Impact</span>
          <span className="text-base font-extrabold text-white">{selectedStrategy.customerImpact}</span>
        </div>
      </div>

      {/* Potential Revenue Impact & What If Comparison (Requirements #27, #28) */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-indigo-300 font-extrabold">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Potential Revenue Impact vs Alternatives</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-slate-300">
          <div>
            <span className="text-[10px] text-indigo-300 font-bold uppercase">Chosen ({selectedStrategy.name})</span>
            <p className="text-sm font-black text-white font-mono">{selectedStrategy.formattedEstimatedRecovery} ({selectedStrategy.probability}%)</p>
          </div>

          <div>
            <span className="text-[10px] text-indigo-300 font-bold uppercase">Alternative ({bestAlternative.name})</span>
            <p className="text-sm font-black text-slate-300 font-mono">{bestAlternative.formattedEstimatedRecovery} ({bestAlternative.probability}%)</p>
          </div>

          <div>
            <span className="text-[10px] text-indigo-300 font-bold uppercase">Estimated Difference</span>
            <p className={`text-sm font-black font-mono ${isPositive ? 'text-emerald-400' : 'text-amber-400'}`}>
              {isPositive ? '+' : ''}{formatCurrency(diff)} expected recovery
            </p>
          </div>
        </div>
      </div>

      {/* Simulate Button */}
      <Button
        variant="ai"
        size="lg"
        onClick={onRunSimulation}
        className="w-full flex items-center justify-center gap-2 text-sm font-extrabold shadow-lg"
      >
        <PlayCircle className="w-5 h-5" />
        <span>Simulate Selected Strategy</span>
      </Button>
    </Card>
  );
}
