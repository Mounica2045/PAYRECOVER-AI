import React from 'react';
import PageHeader from '../layout/PageHeader';
import Button from '../ui/Button';
import Tooltip from '../ui/Tooltip';
import { PlayCircle, RotateCcw, Sliders, ShieldCheck } from 'lucide-react';

export default function SimulatorHeader({ onReset }) {
  return (
    <div className="space-y-4 mb-6">
      <PageHeader 
        title="Recovery Strategy Simulator"
        description="Compare recovery strategies and estimate potential revenue recovery before taking action."
        breadcrumbs={[{ label: 'Strategy Simulator' }]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            {/* Simulation Mode Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 border border-violet-200/80 rounded-full text-xs font-bold shadow-xs">
              <PlayCircle className="w-3.5 h-3.5 text-violet-600" />
              <span>Simulation Mode</span>
              <Tooltip text="No real payments will be processed. All strategy calculations are simulated." />
            </div>

            {/* Reset Simulation Button */}
            <Button 
              variant="outline"
              size="sm"
              onClick={onReset}
              className="flex items-center gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Simulation</span>
            </Button>
          </div>
        }
      />
    </div>
  );
}
