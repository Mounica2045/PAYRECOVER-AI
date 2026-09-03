import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { baseStrategyTemplates } from '../../data/strategyData';

export default function StrategySelector({
  selectedStrategyId,
  onSelectStrategy,
  totalPaymentValue = 348500,
  onNext,
  onBack
}) {
  const evaluated = baseStrategyTemplates.map((st) => {
    let prob = 86;
    if (st.id === 'Delayed Retry') prob = 86;
    else if (st.id === 'Immediate Retry') prob = 63;
    else if (st.id === 'Alternate Payment') prob = 57;
    else if (st.id === 'Manual Review') prob = 41;

    const est = Math.round(totalPaymentValue * (prob / 100));

    return {
      ...st,
      probability: prob,
      estimatedRecovery: est,
      formattedEstimatedRecovery: `₹${est.toLocaleString('en-IN')}`,
      recommended: st.id === 'Delayed Retry'
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Choose Recovery Strategy</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Select the recovery execution strategy for your audience segment.</p>
      </div>

      {/* AI Recommended Strategy Banner (Requirement #16) */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white space-y-3 shadow-lg border border-indigo-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">✦ AI Recommended Strategy</span>
          </div>
          <Badge variant="indigo">Optimal Campaign Choice</Badge>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xl font-black text-white">Delayed Retry</h4>
            <p className="text-xs text-indigo-200 font-medium mt-0.5">
              Best balance of high recovery probability (86%), low customer friction, and high expected revenue yield.
            </p>
          </div>

          <Button 
            variant="ai"
            size="sm"
            onClick={() => onSelectStrategy('Delayed Retry')}
            className="shrink-0 font-bold shadow-md"
          >
            Use AI Recommendation
          </Button>
        </div>
      </div>

      {/* Strategy Candidate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {evaluated.map((st) => {
          const isSel = st.id === selectedStrategyId;

          return (
            <div
              key={st.id}
              onClick={() => onSelectStrategy(st.id)}
              className={`
                p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4
                ${isSel 
                  ? 'bg-indigo-50/80 border-indigo-600 ring-2 ring-indigo-500/20 shadow-md' 
                  : 'bg-white border-slate-200/80 hover:border-slate-300'}
              `}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900">{st.name}</h4>
                  {isSel && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{st.description}</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-500">Recovery Prob:</span>
                  <span className="font-mono font-extrabold text-indigo-600">{st.probability}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Est. Recovery:</span>
                  <span className="font-mono font-black text-slate-900">{st.formattedEstimatedRecovery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Risk Level:</span>
                  <Badge variant={st.riskLevel === 'Low' ? 'emerald' : 'amber'}>{st.riskLevel}</Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compact Strategy Comparison Table (Requirement #17) */}
      <Card className="p-5 space-y-3 border border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Strategy Comparison Matrix</h4>

        <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-4">Strategy</th>
                <th className="py-2.5 px-3 text-center">Probability</th>
                <th className="py-2.5 px-4 text-right">Expected Recovery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {evaluated.map((st) => (
                <tr key={st.id} className={st.id === selectedStrategyId ? 'bg-indigo-50/80 font-bold' : ''}>
                  <td className="py-2.5 px-4 font-bold text-slate-900">{st.name}</td>
                  <td className="py-2.5 px-3 text-center font-mono text-indigo-600 font-extrabold">{st.probability}%</td>
                  <td className="py-2.5 px-4 text-right font-mono font-black text-slate-900">{st.formattedEstimatedRecovery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <Button variant="ai" size="lg" onClick={onNext} className="px-8 font-extrabold">
          Continue to Message →
        </Button>
      </div>
    </div>
  );
}
