import React, { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ChevronDown, ChevronUp, CheckCircle2, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';

export default function StrategyDetails({ strategy, payment }) {
  const [showExplanation, setShowExplanation] = useState(true);

  if (!strategy) return null;

  const whyChecklist = [
    "Temporary failure pattern detected",
    "Strong customer payment history (high lifetime value)",
    `High estimated recovery probability (${strategy.probability}%)`,
    `Low customer impact (${strategy.customerImpact} impact)`,
    `Bounded retry risk (${strategy.riskLevel} risk profile)`,
    `Optimized expected revenue recovery (${strategy.formattedEstimatedRecovery})`
  ];

  return (
    <Card className="p-6 space-y-5 border border-indigo-100/80 shadow-xs">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Strategy Detail Panel</span>
          <h3 className="text-xl font-black text-slate-900 mt-0.5">{strategy.name}</h3>
        </div>

        {/* AI Score Badge (Requirement #19) */}
        <div className="text-right bg-indigo-50 p-2.5 rounded-2xl border border-indigo-100">
          <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">AI Strategy Score</span>
          <span className="text-xl font-black text-indigo-600 font-mono">{strategy.aiScore} <span className="text-xs font-normal text-slate-500">/ 100</span></span>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Recovery Prob.</span>
          <span className="font-mono font-extrabold text-indigo-600 text-sm">{strategy.probability}%</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Expected Recovery</span>
          <span className="font-mono font-black text-slate-900 text-sm">{strategy.formattedEstimatedRecovery}</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Risk Level</span>
          <Badge variant={strategy.riskLevel === 'Low' ? 'emerald' : strategy.riskLevel === 'Medium' ? 'amber' : 'rose'} className="mt-0.5">
            {strategy.riskLevel}
          </Badge>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estimated Time</span>
          <span className="font-mono font-bold text-slate-800 text-xs mt-0.5 block">{strategy.expectedTime}</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Customer Impact</span>
          <Badge variant={strategy.customerImpact === 'Low' ? 'slate' : strategy.customerImpact === 'Medium' ? 'amber' : 'rose'} className="mt-0.5">
            {strategy.customerImpact}
          </Badge>
        </div>
      </div>

      {/* Why Choose This Section (Requirement #15) */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Why choose this?</h4>
        <p className="text-xs text-slate-700 leading-relaxed font-medium p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          {strategy.whyChoose}
        </p>
      </div>

      {/* Expandable Why AI Chose This Strategy Section (Requirement #20) */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 py-1"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>{showExplanation ? `Hide why AI evaluated ${strategy.name}` : `Why did AI choose ${strategy.name}?`}</span>
          {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showExplanation && (
          <div className="mt-3 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2 text-xs">
            {whyChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-indigo-950 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
