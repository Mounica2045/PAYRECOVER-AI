import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../data/dashboardData';

export default function StrategyComparison({
  strategies = [],
  selectedStrategyId,
  onSelectStrategy
}) {
  return (
    <Card className="p-5 space-y-3 border border-slate-200/80">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Strategy Comparison Matrix</h3>
        <span className="text-xs text-slate-500 font-medium">Side-by-side evaluation metrics</span>
      </div>

      <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Strategy</th>
              <th className="py-3 px-3 text-center">Recovery Probability</th>
              <th className="py-3 px-3 text-center">Expected Recovery</th>
              <th className="py-3 px-3 text-center">Risk Level</th>
              <th className="py-3 px-3 text-center">Expected Time</th>
              <th className="py-3 px-3 text-center">Customer Impact</th>
              <th className="py-3 px-4 text-right">AI Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {strategies.map((st) => {
              const isSel = st.id === selectedStrategyId;

              return (
                <tr
                  key={st.id}
                  onClick={() => onSelectStrategy(st.id)}
                  className={`
                    cursor-pointer transition-colors
                    ${isSel 
                      ? 'bg-indigo-50/80 font-bold text-slate-900' 
                      : 'hover:bg-slate-50 text-slate-700'}
                  `}
                >
                  <td className="py-3 px-4 flex items-center gap-2">
                    {isSel && <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />}
                    <span className="font-extrabold text-slate-900">{st.name}</span>
                    {st.recommended && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-indigo-100 text-indigo-700 uppercase">
                        AI Recommended
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-extrabold text-indigo-600">{st.probability}%</td>
                  <td className="py-3 px-3 text-center font-mono font-black text-slate-900">{st.formattedEstimatedRecovery}</td>
                  <td className="py-3 px-3 text-center">
                    <Badge variant={st.riskLevel === 'Low' ? 'emerald' : st.riskLevel === 'Medium' ? 'amber' : 'rose'}>
                      {st.riskLevel}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-center font-mono">{st.expectedTime}</td>
                  <td className="py-3 px-3 text-center">
                    <Badge variant={st.customerImpact === 'Low' ? 'slate' : st.customerImpact === 'Medium' ? 'amber' : 'rose'}>
                      {st.customerImpact}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-black text-indigo-700 text-sm">
                    {st.aiScore} <span className="text-[10px] text-slate-400 font-normal">/ 100</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
