import React, { useState } from 'react';
import Card from '../ui/Card';
import Select from '../ui/Select';
import Badge from '../ui/Badge';
import { Sliders, Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import { runWhatIfAnalysis } from '../../utils/predictionUtils';

export default function WhatIfAnalysis() {
  const [strategy, setStrategy] = useState('Delayed Retry');
  const [reachPct, setReachPct] = useState(80);

  const analysis = runWhatIfAnalysis(740000, 'Delayed Retry', strategy, reachPct);

  return (
    <Card className="p-6 space-y-5 border border-indigo-100 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">What-If Recovery Analysis</h3>
            <Badge variant="indigo">Simulation Only</Badge>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Explore how different recovery strategies and reach targets affect potential revenue recovery.</p>
        </div>
      </div>

      {/* Interactive Controls (Requirement #24) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
        <div>
          <label className="text-slate-500 font-bold block mb-1">Target Strategy</label>
          <Select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
            <option value="Delayed Retry">Delayed Retry (Recommended)</option>
            <option value="Immediate Retry">Immediate Retry</option>
            <option value="Alternate Payment">Alternate Payment</option>
            <option value="Manual Review">Manual Review</option>
          </Select>
        </div>

        <div>
          <label className="text-slate-500 font-bold block mb-1">Estimated Reach Target ({reachPct}%)</label>
          <input 
            type="range"
            min="50"
            max="100"
            value={reachPct}
            onChange={(e) => setReachPct(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
          />
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex justify-between items-center">
          <span className="text-slate-500 font-bold">Strategy Base Prob:</span>
          <span className="font-mono font-black text-indigo-600 text-sm">
            {strategy === 'Delayed Retry' ? '86%' : strategy === 'Immediate Retry' ? '63%' : strategy === 'Alternate Payment' ? '57%' : '41%'}
          </span>
        </div>
      </div>

      {/* What-If Results Cards (Requirement #24) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Potential Recovery</span>
          <span className="text-xl font-black text-slate-900 font-mono">{analysis.formattedCurrentPotential}</span>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-950 space-y-1">
          <span className="text-[10px] text-indigo-700 font-bold uppercase block">What-If Potential Recovery</span>
          <span className="text-xl font-black text-indigo-700 font-mono">{analysis.formattedWhatIfPotential}</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-950 space-y-1">
          <span className="text-[10px] text-emerald-700 font-bold uppercase block">Estimated Difference</span>
          <span className="text-xl font-black text-emerald-700 font-mono">{analysis.formattedDifference}</span>
        </div>
      </div>
    </Card>
  );
}
