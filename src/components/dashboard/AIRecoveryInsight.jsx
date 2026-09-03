import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, PlayCircle } from 'lucide-react';
import Button from '../ui/Button';
import Tooltip from '../ui/Tooltip';
import { aiInsightData } from '../../data/dashboardData';

export default function AIRecoveryInsight({ onNavigateToAgent }) {
  return (
    <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl shadow-indigo-950/20 relative overflow-hidden flex flex-col justify-between">
      
      {/* Subtle Abstract Intelligence Visualization Background */}
      <div className="absolute top-0 right-0 p-6 opacity-15 pointer-events-none">
        <svg width="220" height="140" viewBox="0 0 220 140" fill="none">
          <path d="M10 100 Q 60 20 110 70 T 210 20" stroke="#6366F1" strokeWidth="3" fill="none" />
          <circle cx="110" cy="70" r="6" fill="#818CF8" />
          <circle cx="210" cy="20" r="6" fill="#10B981" />
          <line x1="110" y1="70" x2="160" y2="110" stroke="#818CF8" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="160" cy="110" r="5" fill="#F59E0B" />
        </svg>
      </div>

      <div className="relative z-10 space-y-4">
        {/* Header Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span className="text-xs font-extrabold text-indigo-300 uppercase tracking-widest">✦ AI Recovery Insight</span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              AI Confidence: {aiInsightData.confidence}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Safety Indicator Badge */}
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-200 text-[11px] font-medium border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safety checks passed</span>
              <Tooltip text="AI recommendations are subject to bounded actions, retry limits and merchant approval." />
            </div>

            {/* Simulation Mode Badge */}
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[11px] font-semibold border border-violet-500/30">
              <PlayCircle className="w-3.5 h-3.5 text-violet-400" />
              <span>Simulation Mode</span>
              <Tooltip text="All payment recovery actions in this demo are simulated. No real payments are processed." />
            </div>
          </div>
        </div>

        {/* Insight Title & Description */}
        <div className="space-y-2 max-w-2xl">
          <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug">
            {aiInsightData.title}
          </h3>

          <p className="text-xs text-indigo-200/90 leading-relaxed font-medium">
            <strong className="text-white font-bold">₹18,450</strong> is currently at risk across <strong className="text-white font-bold">23 transactions</strong>. Based on customer payment history, delayed retries could recover an estimated <strong className="text-white font-bold">₹11,200</strong>.
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-[11px] text-indigo-300 font-medium">
          Model target: <span className="font-mono text-white font-bold">{aiInsightData.targetTxn}</span>
        </span>

        <Button 
          variant="ai" 
          size="sm" 
          onClick={onNavigateToAgent}
          className="flex items-center gap-1.5"
        >
          <span>View Opportunities</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

    </div>
  );
}
