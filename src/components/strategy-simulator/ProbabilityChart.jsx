import React from 'react';
import Card from '../ui/Card';

export default function ProbabilityChart({ strategies = [], selectedStrategyId, onSelectStrategy }) {
  return (
    <Card className="p-5 space-y-4 border border-slate-200/80">
      <div>
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Recovery Probability</h3>
        <p className="text-xs text-slate-500 font-medium">Estimated probability of successful transaction recovery per strategy</p>
      </div>

      <div className="space-y-3.5 pt-1">
        {strategies.map((st) => {
          const isSel = st.id === selectedStrategyId;

          return (
            <div 
              key={st.id} 
              onClick={() => onSelectStrategy(st.id)}
              className="space-y-1.5 cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`font-bold transition-colors ${isSel ? 'text-indigo-600' : 'text-slate-700 group-hover:text-slate-900'}`}>
                  {st.name} {st.recommended && '★'}
                </span>
                <span className={`font-mono font-extrabold ${isSel ? 'text-indigo-600' : 'text-slate-800'}`}>
                  {st.probability}%
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${isSel ? 'bg-indigo-600' : 'bg-slate-400 group-hover:bg-slate-500'}`}
                  style={{ width: `${st.probability}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
