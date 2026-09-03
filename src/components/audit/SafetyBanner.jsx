import React from 'react';
import { ShieldCheck, PlayCircle, Lock } from 'lucide-react';

export default function SafetyBanner() {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-emerald-900/40 shadow-md">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
            <span>✓ AI Safety Controls Active</span>
          </h4>
          <p className="text-xs text-emerald-200/90 font-medium mt-0.5">
            All recovery actions require safety validation and merchant approval before simulation.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-violet-500/20 text-violet-200 border border-violet-500/30 rounded-full text-[11px] font-mono font-bold">
          <PlayCircle className="w-3.5 h-3.5 text-violet-400" />
          <span>Simulation Mode</span>
        </div>
      </div>
    </div>
  );
}
