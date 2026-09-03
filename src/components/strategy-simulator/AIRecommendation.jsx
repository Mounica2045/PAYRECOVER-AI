import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';

export default function AIRecommendation({ recommendedStrategy, payment }) {
  if (!recommendedStrategy) return null;

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white space-y-4 shadow-lg shadow-indigo-900/20 relative overflow-hidden border border-indigo-800/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-extrabold text-indigo-200 uppercase tracking-wider">✦ AI Recommended Strategy</span>
        </div>
        <Badge variant="indigo" className="bg-indigo-500/20 text-indigo-200 border-indigo-500/40">
          Optimal Choice
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-white">{recommendedStrategy.name}</h3>
          <p className="text-xs text-indigo-200 mt-1 max-w-xl leading-relaxed font-medium">
            Delayed Retry provides the strongest balance between recovery probability, expected revenue and customer impact for this payment.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10 shrink-0">
          <div className="text-center pr-3 border-r border-white/10">
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Probability</span>
            <span className="text-lg font-black text-emerald-300 font-mono">{recommendedStrategy.probability}%</span>
          </div>

          <div className="text-center pr-3 border-r border-white/10">
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Expected Recovery</span>
            <span className="text-lg font-black text-white font-mono">{recommendedStrategy.formattedEstimatedRecovery}</span>
          </div>

          <div className="text-center">
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Risk</span>
            <span className="text-sm font-black text-emerald-400">{recommendedStrategy.riskLevel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
