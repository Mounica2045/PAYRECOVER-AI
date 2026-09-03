import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function RiskRewardChart({ strategies = [], selectedStrategyId, onSelectStrategy }) {
  return (
    <Card className="p-5 space-y-4 border border-slate-200/80">
      <div>
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Risk vs Recovery Matrix</h3>
        <p className="text-xs text-slate-500 font-medium">Visualizing tradeoff between recovery yield and operational risk</p>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 relative overflow-hidden">
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
          <span>↑ High Recovery Yield</span>
          <span>Risk Level →</span>
        </div>

        <div className="grid grid-cols-2 gap-3 py-2">
          {strategies.map((st) => {
            const isSel = st.id === selectedStrategyId;

            return (
              <div
                key={st.id}
                onClick={() => onSelectStrategy(st.id)}
                className={`
                  p-3 rounded-xl border transition-all cursor-pointer space-y-1.5
                  ${isSel 
                    ? 'bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-500/40 text-white' 
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-white">{st.name}</span>
                  <Badge variant={st.riskLevel === 'Low' ? 'emerald' : st.riskLevel === 'Medium' ? 'amber' : 'rose'}>
                    {st.riskLevel} Risk
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-white/10">
                  <span className="text-emerald-400 font-bold">{st.probability}% Prob</span>
                  <span className="text-white font-bold">{st.formattedEstimatedRecovery}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
