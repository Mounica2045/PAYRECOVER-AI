import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { opportunityPriorities } from '../../data/dashboardData';

export default function RecoveryOpportunities({ onNavigateToAgent }) {
  const { high, medium, low } = opportunityPriorities;

  return (
    <Card className="p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Recovery Opportunities</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Prioritized opportunity pipeline categorized by AI recovery likelihood</p>
          </div>
          <Sparkles className="w-5 h-5 text-indigo-600" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          {/* High Priority */}
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100/80 text-center space-y-1">
            <span className="text-2xl font-black text-rose-600 tracking-tight">{high.count}</span>
            <p className="text-[11px] font-extrabold text-rose-900 uppercase tracking-wider">{high.label}</p>
            <p className="text-[10px] text-rose-600/80 font-medium">{high.description}</p>
          </div>

          {/* Medium Priority */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100/80 text-center space-y-1">
            <span className="text-2xl font-black text-amber-600 tracking-tight">{medium.count}</span>
            <p className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider">{medium.label}</p>
            <p className="text-[10px] text-amber-600/80 font-medium">{medium.description}</p>
          </div>

          {/* Low Priority */}
          <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80 text-center space-y-1">
            <span className="text-2xl font-black text-slate-700 tracking-tight">{low.count}</span>
            <p className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">{low.label}</p>
            <p className="text-[10px] text-slate-500 font-medium">{low.description}</p>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onNavigateToAgent}
          className="w-full flex items-center justify-center gap-1.5"
        >
          <span>View opportunities</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </Card>
  );
}
