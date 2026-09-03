import React, { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Tooltip from '../ui/Tooltip';
import AIConfidence from '../ai/AIConfidence';
import { Sparkles, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, Info, Zap, Layers } from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';

export default function AIAnalysisPanel({
  analysisData,
  selectedStrategy,
  onSelectStrategy,
  onNavigateToSimulator
}) {
  const [showDetails, setShowDetails] = useState(false);

  if (!analysisData) {
    return (
      <Card className="p-12 text-center text-slate-400">
        Select an opportunity from the queue to view AI analysis.
      </Card>
    );
  }

  const { payment, strategy, probability, confidence, reasoning, signals, decisionDetails } = analysisData;
  const activeStrategyName = selectedStrategy || strategy;

  // Alternative Strategies array as per requirement #14 & #15
  const alternativeOptions = [
    { 
      id: 'Delayed Retry', 
      name: 'Delayed Retry', 
      prob: probability, 
      est: payment.amount, 
      desc: 'Retry payment after a short cooldown to avoid repeatedly hitting a temporarily unavailable bank.',
      why: 'Highest expected recovery probability with lower retry pressure.' 
    },
    { 
      id: 'Immediate Retry', 
      name: 'Immediate Retry', 
      prob: Math.max(30, probability - 24), 
      est: Math.round(payment.amount * (Math.max(30, probability - 24) / 100)), 
      desc: 'Reroute via primary node instantly without cooldown.',
      why: 'Faster execution, but higher risk of bank rate limits.' 
    },
    { 
      id: 'Alternate Payment Method', 
      name: 'Alternate Payment Method', 
      prob: 58, 
      est: Math.round(payment.amount * 0.58), 
      desc: 'Prompt customer with alternative UPI / Card option.',
      why: 'Good fallback when primary payment channel is degraded.' 
    },
    { 
      id: 'Manual Review', 
      name: 'Manual Review', 
      prob: 43, 
      est: Math.round(payment.amount * 0.43), 
      desc: 'Escalate to merchant support team for manual handling.',
      why: 'Safest choice for high-value high-risk transactions.' 
    }
  ];

  const currentActiveOption = alternativeOptions.find(o => o.id === activeStrategyName) || alternativeOptions[0];

  return (
    <Card className="p-6 space-y-6 shadow-md border border-indigo-100/80">
      {/* Transaction Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-extrabold text-slate-900">✦ AI Recovery Analysis</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">Explainable AI diagnosis & recovery strategy evaluation</p>
        </div>

        <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80">
          <div>
            <p className="font-extrabold text-slate-900 text-xs">{payment.customer}</p>
            <p className="font-mono text-[11px] font-bold text-indigo-600">{payment.id} • {payment.formattedAmount}</p>
          </div>
          <Badge variant="rose">Failed ({payment.failureReason})</Badge>
        </div>
      </div>

      {/* Visual Recovery Probability Meter (Requirement #9) */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-white to-slate-50 border border-indigo-100/90 space-y-3 shadow-xs">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-slate-900 uppercase tracking-wider">Recovery Probability</span>
          <span className="font-black text-indigo-600 text-lg font-mono">{currentActiveOption.prob}%</span>
        </div>

        <div className="w-full bg-slate-200/80 rounded-full h-3.5 overflow-hidden p-0.5 shadow-inner">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-indigo-500 h-full rounded-full transition-all duration-500" 
            style={{ width: `${currentActiveOption.prob}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-500 font-medium">Estimated probability of successful recovery using selected strategy</p>
      </div>

      {/* Why This Recommendation? AI Reasoning (Requirement #10) */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Why this recommendation?</h4>
        <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-2 text-xs text-slate-700 leading-relaxed font-medium">
          {reasoning.map((text, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Signals Considered (Requirement #11) */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Signals considered</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {signals.map((sig, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-700">{sig.name}</span>
                <Tooltip text={sig.tooltip} />
              </div>
              <span className="font-mono font-bold text-slate-900">{sig.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Model Confidence with Tooltip (Requirement #12) */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">Model Confidence</span>
          <span className="text-xs font-mono font-extrabold text-indigo-600">{confidence}%</span>
        </div>
        <AIConfidence score={confidence} />
        <p className="text-[11px] text-slate-500 font-medium pt-1">
          Confidence reflects how strongly the available transaction signals support the recommended recovery strategy.
        </p>
      </div>

      {/* Recommended Action Prominent Section (Requirement #13) */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Recommended Action</span>
          </div>
          <Badge variant="indigo">{activeStrategyName}</Badge>
        </div>

        <p className="text-xs text-indigo-100 leading-relaxed font-medium">
          {currentActiveOption.desc}
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs">
          <div>
            <span className="text-[10px] text-indigo-300 font-medium uppercase tracking-wider">Estimated Recovery Value</span>
            <p className="font-black text-white text-base font-mono">{formatCurrency(currentActiveOption.est)}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-indigo-300 font-medium uppercase tracking-wider">Expected Recovery Prob.</span>
            <p className="font-black text-emerald-300 text-base font-mono">{currentActiveOption.prob}%</p>
          </div>
        </div>
      </div>

      {/* Alternative Strategies Cards (Requirement #14) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alternative Strategies</h4>
          {onNavigateToSimulator && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onNavigateToSimulator(payment.id)}
              className="text-[11px] py-1 px-2.5 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
            >
              Compare Strategies →
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {alternativeOptions.map((st) => {
            const isSel = activeStrategyName === st.id;
            return (
              <div 
                key={st.id}
                onClick={() => onSelectStrategy(st.id)}
                className={`
                  p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5
                  ${isSel 
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-500/20' 
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSel ? 'text-white' : 'text-slate-900'}`}>{st.name}</span>
                  <span className={`text-xs font-mono font-extrabold ${isSel ? 'text-indigo-100' : 'text-indigo-600'}`}>{st.prob}% Prob</span>
                </div>
                <p className={`text-[11px] ${isSel ? 'text-indigo-100' : 'text-slate-500'}`}>{st.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategy Comparison Table & Why Selected (Requirement #15) */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Strategy Comparison Matrix</h4>
        <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Strategy</th>
                <th className="py-2.5 px-3">Probability</th>
                <th className="py-2.5 px-3">Estimated Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {alternativeOptions.map((st) => (
                <tr 
                  key={st.id} 
                  onClick={() => onSelectStrategy(st.id)}
                  className={`cursor-pointer transition-colors ${activeStrategyName === st.id ? 'bg-indigo-50/80 font-bold text-slate-900' : 'hover:bg-slate-50 text-slate-700'}`}
                >
                  <td className="py-2.5 px-3 flex items-center gap-1.5">
                    {activeStrategyName === st.id && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                    <span>{st.name}</span>
                  </td>
                  <td className="py-2.5 px-3 text-indigo-600 font-mono font-bold">{st.prob}%</td>
                  <td className="py-2.5 px-3 font-mono font-bold">{formatCurrency(st.est)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Why selected box */}
        <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 font-medium">
          <span className="font-bold text-indigo-900">Why selected? </span>
          <span>{currentActiveOption.why}</span>
        </div>
      </div>

      {/* Collapsible Decision Details (Requirement #25) */}
      <div className="pt-2 border-t border-slate-100">
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 py-1"
        >
          <span>{showDetails ? 'Hide decision details' : 'View decision details'}</span>
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showDetails && (
          <div className="mt-3 p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs font-mono shadow-inner border border-slate-800">
            <h5 className="text-[10px] text-slate-400 font-sans font-bold uppercase tracking-wider mb-2">Decision Inputs & Parameters</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <p className="text-slate-400">Failure Reason: <span className="text-white font-bold">{decisionDetails?.failureReason || payment.failureReason}</span></p>
              <p className="text-slate-400">Transaction Value: <span className="text-white font-bold">{payment.formattedAmount}</span></p>
              <p className="text-slate-400">Customer Success Rate: <span className="text-white font-bold">{decisionDetails?.customerSuccessRate || '88.9%'}</span></p>
              <p className="text-slate-400">Previous Similar Failures: <span className="text-white font-bold">{payment.attempts || 1}</span></p>
              <p className="text-slate-400">Time Since Failure: <span className="text-white font-bold">{payment.date || '3 minutes'}</span></p>
              <p className="text-slate-400">Recommended Strategy: <span className="text-indigo-300 font-bold">{activeStrategyName}</span></p>
              <p className="text-slate-400">Model Confidence: <span className="text-emerald-400 font-bold">{confidence}%</span></p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
