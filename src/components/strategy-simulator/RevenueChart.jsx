import React from 'react';
import Card from '../ui/Card';
import { formatCurrency } from '../../data/dashboardData';

export default function RevenueChart({ strategies = [], selectedStrategyId, onSelectStrategy }) {
  const maxVal = Math.max(...strategies.map(s => s.estimatedRecovery), 1);

  return (
    <Card className="p-5 space-y-4 border border-slate-200/80">
      <div>
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Expected Revenue Recovery</h3>
        <p className="text-xs text-slate-500 font-medium">Calculated potential revenue yield (Payment Amount × Probability)</p>
      </div>

      <div className="space-y-3.5 pt-1">
        {strategies.map((st) => {
          const isSel = st.id === selectedStrategyId;
          const pct = Math.round((st.estimatedRecovery / maxVal) * 100);

          return (
            <div 
              key={st.id} 
              onClick={() => onSelectStrategy(st.id)}
              className="space-y-1.5 cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`font-bold transition-colors ${isSel ? 'text-indigo-600' : 'text-slate-700 group-hover:text-slate-900'}`}>
                  {st.name}
                </span>
                <span className={`font-mono font-black ${isSel ? 'text-indigo-600' : 'text-slate-900'}`}>
                  {st.formattedEstimatedRecovery}
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${isSel ? 'bg-emerald-500' : 'bg-indigo-400 group-hover:bg-indigo-500'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
