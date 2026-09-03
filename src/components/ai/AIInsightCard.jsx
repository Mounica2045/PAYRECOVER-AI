import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';

export default function AIInsightCard({
  title = "Your highest recovery opportunity is temporary bank failures.",
  description = "₹18,450 is currently at risk across 23 transactions. Based on customer payment history, delayed retries could recover an estimated ₹11,200.",
  confidence = 91,
  actionLabel = "View Opportunities",
  onAction
}) {
  return (
    <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl shadow-indigo-950/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Sparkles className="w-48 h-48" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">✦ AI Recovery Insight</span>
            {confidence && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 ml-2">
                Model Confidence: {confidence}%
              </span>
            )}
          </div>

          <h3 className="text-xl font-extrabold text-white tracking-tight">
            {title}
          </h3>

          <p className="text-xs text-indigo-200/90 leading-relaxed">
            {description}
          </p>
        </div>

        {onAction && (
          <Button 
            variant="ai" 
            size="md" 
            onClick={onAction}
            className="self-start md:self-center shrink-0"
          >
            <span>{actionLabel}</span>
            <ArrowUpRight className="w-4 h-4 text-indigo-200" />
          </Button>
        )}
      </div>
    </div>
  );
}
