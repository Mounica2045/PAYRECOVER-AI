import React from 'react';
import { Sparkles } from 'lucide-react';
import AIConfidence from './AIConfidence';

export default function AIRecommendation({
  action = "Delayed Retry",
  probability = 91,
  reasoning = "Strong payment history combined with a temporary bank-side failure makes this transaction a strong retry candidate.",
  className = ''
}) {
  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white space-y-4 shadow-lg shadow-indigo-900/20 relative overflow-hidden ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">✦ AI Recommendation</span>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          {probability}% Recovery Prob.
        </span>
      </div>

      <div>
        <h4 className="text-lg font-black text-white">{action}</h4>
        <p className="text-xs text-indigo-200/90 mt-1 leading-relaxed">
          {reasoning}
        </p>
      </div>

      <div className="pt-2 border-t border-white/10">
        <AIConfidence score={probability} />
      </div>
    </div>
  );
}
